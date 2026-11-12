/**
 * Backend for the live, teacher-paced quiz.
 *
 * Paste this whole file into a Google Sheet's Apps Script editor
 * (Extensions → Apps Script), change TEACHER_PIN, then deploy it as a
 * web app. SETUP.md in the repository walks through every step.
 *
 * Every join and answer is saved to the "Players" and "Responses" tabs.
 */

// Change this before deploying. The teacher page asks for it.
const TEACHER_PIN = "1234";

const PROPS = PropertiesService.getScriptProperties();
const RESP_HEADERS = ["Time", "Session", "Student ID", "Name", "Question #", "Equation", "Method picked", "Correct"];
const PLAYER_HEADERS = ["Time", "Session", "Student ID", "Name"];

function doGet(e) {
  return respond_((e && e.parameter) || {});
}

function doPost(e) {
  let p = {};
  try { p = JSON.parse(e.postData.contents); } catch (err) { /* ignore */ }
  return respond_(p);
}

function respond_(p) {
  let out;
  try {
    out = route_(p);
  } catch (err) {
    out = { error: String((err && err.message) || err) };
  }
  return ContentService.createTextOutput(JSON.stringify(out))
    .setMimeType(ContentService.MimeType.JSON);
}

function route_(p) {
  const state = getState_();
  switch (p.action) {
    // ----- Student actions -----
    case "state":
      return state;

    case "join": {
      if (!p.session || p.session !== state.session) return { error: "stale", state };
      const name = cleanName_(p.name);
      if (!name || !p.id) return { error: "Missing name" };
      withLock_(() => {
        const sh = sheet_("Players", PLAYER_HEADERS);
        const rows = sh.getDataRange().getValues();
        const already = rows.some(r => r[1] === state.session && r[2] === p.id);
        if (!already) sh.appendRow([new Date(), state.session, p.id, name]);
      });
      return { ok: true, state };
    }

    case "answer": {
      if (p.session !== state.session || state.phase !== "question" || Number(p.q) !== state.q) {
        return { error: "closed", state };
      }
      const name = cleanName_(p.name);
      withLock_(() => {
        const sh = sheet_("Responses", RESP_HEADERS);
        const rows = sh.getDataRange().getValues();
        const already = rows.some(r => r[1] === state.session && r[2] === p.id && Number(r[4]) === state.q + 1);
        if (!already) {
          sh.appendRow([new Date(), state.session, p.id, name, state.q + 1,
                        String(p.eq || ""), String(p.method || ""), p.correct ? "Yes" : "No"]);
        }
      });
      return { ok: true };
    }

    // ----- Teacher actions (need the PIN) -----
    case "start":
    case "show":
    case "reveal":
    case "end":
    case "stats":
    case "summary":
      if (String(p.pin) !== TEACHER_PIN) return { error: "Wrong PIN" };
      return teacher_(p, state);

    default:
      return { error: "Unknown action" };
  }
}

function teacher_(p, state) {
  switch (p.action) {
    case "start": {
      const s = { session: "S-" + Utilities.getUuid().slice(0, 8), phase: "lobby", q: -1, total: Number(p.total) || 0 };
      setState_(s);
      return s;
    }
    case "show": {
      const s = { session: state.session, phase: "question", q: Number(p.q), total: state.total };
      setState_(s);
      return s;
    }
    case "reveal": {
      const s = { session: state.session, phase: "reveal", q: state.q, total: state.total,
                  stats: questionStats_(state.session, state.q) };
      setState_(s);
      return s;
    }
    case "end": {
      const s = { session: state.session, phase: "done", q: state.q, total: state.total };
      setState_(s);
      return s;
    }
    case "stats":
      return {
        state,
        players: players_(state.session),
        stats: state.q >= 0 ? questionStats_(state.session, state.q) : null
      };
    case "summary":
      return summary_(state.session);
  }
}

// ----- Helpers -----

function getState_() {
  const raw = PROPS.getProperty("state");
  return raw ? JSON.parse(raw) : { session: "", phase: "off", q: -1, total: 0 };
}

function setState_(s) {
  PROPS.setProperty("state", JSON.stringify(s));
}

function sheet_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
    sh.setFrozenRows(1);
  }
  return sh;
}

function withLock_(fn) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try { return fn(); } finally { lock.releaseLock(); }
}

// Keep names short, and stop a name like "=SUM(...)" from becoming a formula.
function cleanName_(name) {
  let n = String(name || "").trim().slice(0, 40);
  if (/^[=+\-@]/.test(n)) n = "'" + n;
  return n;
}

function players_(session) {
  const rows = sheet_("Players", PLAYER_HEADERS).getDataRange().getValues().slice(1);
  return rows.filter(r => r[1] === session).map(r => String(r[3]));
}

function responses_(session) {
  return sheet_("Responses", RESP_HEADERS).getDataRange().getValues().slice(1)
    .filter(r => r[1] === session)
    .map(r => ({ id: r[2], name: String(r[3]), q: Number(r[4]) - 1, method: String(r[6]), correct: r[7] === "Yes" }));
}

function questionStats_(session, q) {
  const rows = responses_(session).filter(r => r.q === q);
  const byMethod = {};
  rows.forEach(r => { byMethod[r.method] = (byMethod[r.method] || 0) + 1; });
  return {
    answered: rows.length,
    correct: rows.filter(r => r.correct).length,
    byMethod
  };
}

function summary_(session) {
  const rows = responses_(session);
  const perQuestion = {};
  const perStudent = {};
  rows.forEach(r => {
    const pq = perQuestion[r.q] = perQuestion[r.q] || { answered: 0, correct: 0 };
    pq.answered++;
    if (r.correct) pq.correct++;
    const ps = perStudent[r.id] = perStudent[r.id] || { name: r.name, answered: 0, correct: 0 };
    ps.answered++;
    if (r.correct) ps.correct++;
  });
  return {
    perQuestion,
    students: Object.keys(perStudent).map(k => perStudent[k]).sort((a, b) => a.name.localeCompare(b.name))
  };
}
