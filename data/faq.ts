export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const faqCategories = [
  "Admissions Process",
  "LNAT Preparation",
  "University Specifics",
  "Logistics & Scoring",
];

export const faqData: FAQItem[] = [
  // Admissions Process
  {
    id: "admin-1",
    category: "Admissions Process",
    question: "How does the LNAT factor into the overall UCAS application?",
    answer:
      "Elite universities use the LNAT holistically alongside your personal statement, academic transcripts, and references. It acts as a primary filter; an exceptional score can compensate for a slight weakness elsewhere, while a poor score can hinder an otherwise strong application.",
  },
  {
    id: "admin-2",
    category: "Admissions Process",
    question: "Do I need to take the LNAT before submitting my UCAS form?",
    answer:
      "Not necessarily, but you must register for and sit the LNAT within the specific testing window designated by your chosen universities. For Oxford and Cambridge, you must usually sit the exam by mid-October of the application year.",
  },

  // LNAT Preparation
  {
    id: "prep-1",
    category: "LNAT Preparation",
    question: "How many months of preparation does the LNAT require?",
    answer:
      "We recommend a disciplined 3 to 4 months of preparation. The LNAT is an aptitude test, not a knowledge test; cramming is highly ineffective. Consistent practice with complex reading materials and timed essay writing is crucial.",
  },
  {
    id: "prep-2",
    category: "LNAT Preparation",
    question: "Is Section B (The Essay) actually graded?",
    answer:
      "The essay is not scored by the LNAT consortium itself. Instead, it is sent directly to the admissions tutors at your selected universities. They read it to assess your ability to construct a compelling, logically sound argument under time pressure.",
  },

  // University Specifics
  {
    id: "uni-1",
    category: "University Specifics",
    question: "What is considered a 'good' LNAT score for Oxford or UCL?",
    answer:
      "While averages fluctuate yearly, securing a score of 27 or above (out of 42) in the multiple-choice section typically places you in a highly competitive bracket for institutions like Oxford, UCL, and LSE. However, Oxford places immense weight on the qualitative essay section.",
  },
  {
    id: "uni-2",
    category: "University Specifics",
    question: "Do all UK law schools require the LNAT?",
    answer:
      "No. Only a specific consortium of highly selective universities requires the LNAT. Institutions like Oxford, Cambridge, UCL, LSE, King's College, and Durham mandate it. Many excellent universities do not require it.",
  },

  // Logistics & Scoring
  {
    id: "log-1",
    category: "Logistics & Scoring",
    question: "When are the LNAT results released to candidates?",
    answer:
      "If you sit the test on or before January 26th, you will receive your results by mid-February. If you sit the test after January 26th, results are released in mid-August. Note that universities receive your scores directly before you do.",
  },
  {
    id: "log-2",
    category: "Logistics & Scoring",
    question: "Can I retake the LNAT if I perform poorly?",
    answer:
      "No. You may only take the LNAT once per admissions cycle (September to July). If you are unsuccessful, you must wait until the next academic year's cycle to sit the examination again.",
  },
];
