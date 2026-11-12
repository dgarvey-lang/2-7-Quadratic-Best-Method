// Talks to the Google Apps Script backend (apps-script/Code.gs).
window.api = {
  configured: () => !!window.QUIZ_API_URL,

  async get(params) {
    const qs = new URLSearchParams({ ...params, _: Date.now() });
    const res = await fetch(`${window.QUIZ_API_URL}?${qs}`);
    return res.json();
  },

  // A plain-text body keeps this a "simple" request, which Apps Script accepts from other sites.
  async post(data) {
    const res = await fetch(window.QUIZ_API_URL, { method: "POST", body: JSON.stringify(data) });
    return res.json();
  }
};

window.escapeHtml = s => String(s).replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
