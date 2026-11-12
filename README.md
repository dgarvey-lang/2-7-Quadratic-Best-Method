# 2-7 Quiz: Choosing the Best Method for Solving Quadratics

Students look at a quadratic equation and choose the most efficient way to solve it:

- **Square roots**: no x-term (`ax² = c` or `(x − h)² = k`)
- **Factoring**: the trinomial factors nicely, or there's no constant term (GCF)
- **Quadratic formula**: works every time; best when it doesn't factor

There are 12 questions. A method that also works earns credit too, along with a tip about the faster one.

## Two ways to use it

### Live, teacher-paced (`teacher.html` + `index.html`)

You run the quiz from the projector. Everyone sees the same question at the same time. After each one, you click **Reveal** to show what percent of the class got it right and what percent got it wrong, plus a breakdown of which methods students chose. A summary at the end shows each question and each student's score.

**This needs a one-time setup with a Google Sheet. See [SETUP.md](SETUP.md).**

- `teacher.html`: your control and projector screen (PIN protected)
- `index.html`: the student page (the main link)

### Self-paced practice (`practice.html`)

Students work through all 12 questions on their own, in random order, with instant feedback and a results table. No setup needed.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Live quiz: student page |
| `teacher.html` | Live quiz: teacher / projector page |
| `practice.html` | Self-paced practice quiz |
| `questions.js` | The 12 questions, used by all pages |
| `config.js` | Where the Google Apps Script URL goes |
| `apps-script/Code.gs` | Backend to paste into a Google Sheet |
| `style.css`, `live-api.js` | Shared styles and helpers |

## Hosting

Turn on **GitHub Pages** in *Settings → Pages* (choose this branch and the root folder).

## Editing questions

Edit the `QUESTIONS` list in `questions.js`. Each entry sets the equation, the best method, any other acceptable methods (`ok`, plus a `tip`), and the explanation (`why`).
