# 2-7 Quiz: Choosing the Best Method for Solving Quadratics

An interactive, self-checking quiz (`index.html`) on picking the most efficient way to solve a quadratic equation:

- **Square roots**: no x-term (`ax² = c` or `(x − h)² = k`)
- **Factoring**: the trinomial factors nicely, or there's no constant term (GCF)
- **Completing the square**: `a = 1` and `b` is even, but it doesn't factor
- **Quadratic formula**: works every time; best when `a ≠ 1` and it doesn't factor

There are 12 questions, shown in random order. Each one has two steps:

1. Choose the best method (1 point). A method that also works earns credit too, along with a tip about the faster one.
2. Choose the correct solution(s) (1 point). The worked steps are shown after each answer.

A results table at the end lists each question and what the student missed.

## Using it

- **Locally:** open `index.html` in any browser. It's one file with no internet connection needed.
- **Online (GitHub Pages):** in the repository, go to *Settings → Pages*, set the source to this branch and the root folder, and share the link with students.

## Editing questions

The questions are in the `QUESTIONS` array near the bottom of `index.html`. Each entry sets the equation, the best method, any other acceptable methods, the correct answer, three wrong answers, and the worked solution.
