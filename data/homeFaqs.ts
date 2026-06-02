export interface HomeFAQ {
  id: string;
  question: string;
  answer: string;
}

export const homeFaqs: HomeFAQ[] = [
  {
    id: "01",
    question: "What exactly is the LNAT exam?",
    answer:
      "The Law National Aptitude Test (LNAT) is a standardized admissions assessment utilized by leading UK universities. It evaluates your aptitude for studying law by testing logical reasoning, comprehension, and the ability to articulate a persuasive argument, rather than substantive legal knowledge.",
  },
  {
    id: "02",
    question: "Which universities require the LNAT for admission?",
    answer:
      "Elite institutions including Oxford, Cambridge, UCL, LSE, King’s College London, and Bristol mandate the LNAT for their undergraduate law programmes. The specific list may vary slightly year by year, requiring careful review of each university’s admissions criteria.",
  },
  {
    id: "03",
    question: "Can Indian students successfully apply to UK law schools?",
    answer:
      "Absolutely. UK law schools highly value the academic rigor of Indian applicants. Your Class 12 board marks, combined with a competitive LNAT score and a compelling personal statement, form the foundation of a strong international application.",
  },
  {
    id: "04",
    question: "When is the optimal time to take the LNAT?",
    answer:
      "Testing typically occurs between September and January of your application cycle. We advise early testing—ideally by mid-October—especially to ensure alignment with early Oxbridge application deadlines.",
  },
  {
    id: "05",
    question: "How should I structure my LNAT preparation?",
    answer:
      "Effective preparation demands consistent engagement with complex texts, refining logical deduction techniques, and practicing timed essay writing. Focus on mastering the architecture of arguments rather than relying on rote memorization.",
  },
];
