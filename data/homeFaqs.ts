export interface HomeFAQ {
  id: string;
  question: string;
  answer: string;
}

export const homeFaqs: HomeFAQ[] = [
  {
    id: "01",
    question: "Do you coach for both UK universities and JGLS?",
    answer:
      "Yes. The LNAT is the entrance test for both, so one preparation covers UK law schools and JGLS. For JGLS, only your Section A score is used[cite: 1].",
  },
  {
    id: "02",
    question: "Is the coaching online?",
    answer:
      "Yes, we offer online live 1-to-1 mentorship and small batch formats.",
  },
  {
    id: "03",
    question: "When should I start preparing?",
    answer:
      "Ideally a few months before your deadline. Because the LNAT builds skills rather than knowledge, steady practice over 6–8+ weeks beats last-minute cramming[cite: 1].",
  },
  {
    id: "04",
    question: "How much does the LNAT itself cost?",
    answer:
      "About £120 (~₹13,000) from India, paid to the LNAT at booking — separate from any coaching fee[cite: 1].",
  },
  {
    id: "05",
    question: "What score should I aim for?",
    answer:
      "There's no fixed pass mark; the national average is around the mid-20s and top universities look higher. See our scoring guide[cite: 1].",
  },
];
