# Setting up the live quiz (one time, about 10 minutes)

The live quiz needs a place to collect everyone's answers. A free Google Sheet does that job. You only do this once. After that, every class period is just "open the teacher page, click Start."

## 1. Make the Google Sheet and add the script

1. Go to [sheets.new](https://sheets.new) to create a blank Google Sheet. Name it something like **2-7 Live Quiz Responses**.
2. In the Sheet, click **Extensions → Apps Script**.
3. Delete the starter code in the editor (`function myFunction() {...}`).
4. Open [`apps-script/Code.gs`](apps-script/Code.gs) in this repository, copy all of it, and paste it into the editor.
5. Near the top, change the PIN to one only you know:
   ```js
   const TEACHER_PIN = "1234";
   ```
6. Click the **Save** icon (💾).

## 2. Deploy it as a web app

1. Click **Deploy → New deployment**.
2. Click the gear icon ⚙ next to "Select type" and choose **Web app**.
3. Fill in:
   - **Execute as:** Me
   - **Who has access:** **Anyone**. This must be *Anyone*, not "Anyone with a Google account" or "Anyone within your school," or the quiz pages can't reach it.
4. Click **Deploy**. Google will ask you to authorize the script:
   - Click **Authorize access** and pick your account.
   - If you see "Google hasn't verified this app," click **Advanced → Go to (project name)**. This is normal for scripts you write yourself.
   - Click **Allow**.
5. Copy the **Web app URL**. It ends in `/exec`.

> If **Anyone** isn't offered under "Who has access," your school's Google admin has turned it off. Ask them to allow it, or use a personal Gmail account for the Sheet.

## 3. Connect the quiz to the Sheet

Open [`config.js`](config.js) and paste the URL between the quotes:

```js
window.QUIZ_API_URL = "https://script.google.com/macros/s/XXXXXXXX/exec";
```

On GitHub, you can do this right in the browser: open `config.js`, click the ✏️ pencil, paste, and **Commit changes**. (Or send the URL to Claude and it can do it.)

## 4. Run it in class

| Who | Page |
| --- | --- |
| **You** (on the projector) | `…/teacher.html` |
| **Students** | the main link (`…/`, which is `index.html`) |

1. Open `teacher.html` and enter your PIN. Your browser remembers it.
2. Click **Start a new session**. The screen shows the student link, and names appear as students join.
3. Click **Show question 1**. Students see the equation and pick a method. Your screen counts the answers as they come in.
4. Click **Reveal results** to show **% right vs. % wrong**, plus how many picked each method and why the best method is best. Students see the same percentages and whether *they* got it right.
5. Click **Next question**, and so on. After question 12 (or **End quiz** at any time), you'll see a summary for each question and each student.

All answers are also saved in the **Responses** tab of your Google Sheet. Joins are in the **Players** tab.

## Changing things later

- **Edited `Code.gs`?** In Apps Script, use **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**. That keeps the same URL. Making a *New deployment* instead would give you a new URL, which you'd then need to put in `config.js`.
- **Changing the questions:** edit `questions.js`. Both the live quiz and the practice quiz use it.
- **New PIN:** change `TEACHER_PIN` in `Code.gs` and redeploy as described above.

## Good to know

- The pages check for updates every 2–3 seconds, so screens change within a few seconds of your click.
- Each browser counts as one student. A student who refreshes the page stays signed in with their answers. **Not you? Change name** lets a student switch on a shared computer.
- Google's free limits easily cover a class of 30–35. If a few screens lag with a very large group, give it a second. They'll catch up.
