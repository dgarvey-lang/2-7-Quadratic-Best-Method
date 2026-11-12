// Shared by practice.html, index.html (live student view) and teacher.html.
window.METHODS = ["Square roots", "Factoring", "Quadratic formula"];

// best: the most efficient method. ok: methods that also work well (full credit, with a tip).
window.QUESTIONS = [
  {
    eq: "x² = 49",
    best: "Square roots", ok: [],
    why: "There is no x-term, so just take the square root of both sides."
  },
  {
    eq: "x² + 5x + 6 = 0",
    best: "Factoring", ok: [],
    why: "a = 1 and two numbers multiply to 6 and add to 5 (2 and 3), so it factors quickly."
  },
  {
    eq: "(x − 3)² = 16",
    best: "Square roots", ok: [],
    why: "It is already a perfect square equal to a number. Square root both sides — don't expand!"
  },
  {
    eq: "2x² + 3x − 7 = 0",
    best: "Quadratic formula", ok: [],
    why: "a ≠ 1 and the discriminant (65) is not a perfect square, so it won't factor. Use the formula."
  },
  {
    eq: "x² + 6x − 5 = 0",
    best: "Quadratic formula", ok: [],
    why: "No factors of −5 add to 6, so it won't factor. Use the formula."
  },
  {
    eq: "x² − 9x = 0",
    best: "Factoring", ok: [],
    why: "There is no constant term, so factor out the GCF, x."
  },
  {
    eq: "3x² − 75 = 0",
    best: "Square roots", ok: ["Factoring"],
    tip: "Factoring 3(x − 5)(x + 5) works too, but isolating x² is quicker.",
    why: "No x-term. Isolate x² and take the square root."
  },
  {
    eq: "x² − 10x + 18 = 0",
    best: "Quadratic formula", ok: [],
    why: "No factors of 18 add to −10, so it won't factor. Use the formula."
  },
  {
    eq: "2x² + x − 3 = 0",
    best: "Factoring", ok: ["Quadratic formula"],
    tip: "The formula works, but the discriminant is 25 (a perfect square), so it factors.",
    why: "The discriminant 1 + 24 = 25 is a perfect square, so it factors: (2x + 3)(x − 1)."
  },
  {
    eq: "5x² − 2x − 1 = 0",
    best: "Quadratic formula", ok: [],
    why: "a ≠ 1 and the discriminant (24) is not a perfect square. Use the formula."
  },
  {
    eq: "4x² − 12x + 9 = 0",
    best: "Factoring", ok: [],
    why: "It is a perfect square trinomial: (2x)² − 2(2x)(3) + 3² = (2x − 3)²."
  },
  {
    eq: "x² + 4x + 13 = 0",
    best: "Quadratic formula", ok: [],
    why: "The discriminant 16 − 52 = −36 is negative, so it won't factor. Use the formula (expect complex roots!)."
  }
];

// A pick earns credit if it is the best method or another method that also works well.
window.isCorrect = (q, method) => method === q.best || q.ok.includes(method);
