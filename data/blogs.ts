import { BlogCategory } from "../types/blog";
import { IBlog } from "@/types/backend.types";
export const blogCategories: BlogCategory[] = [
  "All",
  "LNAT Preparation",
  "Essay Writing",
  "University Guides",
  "Admissions Process",
  "UCAS Guidance",
];

export const blogs: IBlog[] = [
  {
    _id: "blog-1",
    slug: "best-lnat-preparation-strategy",
    title: "The Ultimate LNAT Preparation Strategy for Top UK Universities",
    excerpt:
      "A comprehensive guide on how to approach Section A and Section B of the LNAT to secure a competitive score for Oxbridge and Russell Group institutions.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
    category: "LNAT Preparation",
    tags: ["Strategy", "Preparation", "Study Plan"],
    content: `
      <h2>Understanding the LNAT Landscape</h2>
      <p>
        The National Admissions Test for Law (LNAT) is a critical component for students aiming to secure a place at elite UK law schools. Unlike traditional exams, the LNAT assesses aptitude rather than substantive legal knowledge.
      </p>
      
      <h3>1. Mastering Section A: Logical Reasoning</h3>
      <p>
        Section A consists of 42 multiple-choice questions based on 12 passages. The primary skill evaluated here is the ability to extract relevant information, identify assumptions, and understand complex arguments.
      </p>
      <ul>
        <li><strong>Read Actively:</strong> Engage with the text by questioning the author's primary argument as you read.</li>
        <li><strong>Time Management:</strong> Allocate approximately 8 minutes per passage and its associated questions to maintain a steady pace.</li>
        <li><strong>Process of Elimination:</strong> Narrow down choices by immediately dismissing options that fall outside the passage's scope.</li>
      </ul>

      <h3>2. Acing Section B: The Essay</h3>
      <p>
        The essay section does not contribute to your numerical score but is forwarded directly to the universities. Admissions tutors read it to assess your capacity to construct a compelling, logically sound narrative under timed conditions.
      </p>
    `,
    author: "LNAT Editorial Desk",
    publishedAt: "10 Jan 2026",
    readTime: 8,
  },
  {
    id: "blog-2",
    slug: "oxford-lnat-admissions-guide",
    title: "University of Oxford: The Definitive LNAT Admissions Guide",
    excerpt:
      "Discover exactly what the Oxford Law Faculty looks for in an applicant's LNAT score and essay, and how it factors into the tutorial system.",
    featuredImage:
      "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&q=80&w=1200",
    category: "University Guides",
    tags: ["Oxford", "Top Tier", "Admissions"],
    content: `
      <h2>Why Oxford Requires the LNAT</h2>
      <p>
        The BA in Jurisprudence at Oxford relies heavily on the <strong>tutorial system</strong>, where students must debate and defend their ideas weekly. The LNAT is the ultimate litmus test for this argumentative rigor.
      </p>

      <h3>What is a Competitive Score?</h3>
      <p>
        While Oxford does not publish strict cut-offs, successful candidates historically average around <strong>28-30 out of 42</strong> in Section A. However, the score is evaluated contextually alongside your GCSEs/A-Levels and Personal Statement.
      </p>

      <h3>The Unspoken Importance of Section B</h3>
      <ul>
        <li>Oxford tutors place immense weight on the essay section.</li>
        <li>They look for clarity, nuance, and the ability to view a problem from multiple angles.</li>
        <li>A mediocre multiple-choice score can sometimes be rescued by an exceptional essay.</li>
      </ul>
    `,
    author: "UK Law Admissions Mentor",
    publishedAt: "15 Jan 2026",
    readTime: 6,
  },
  {
    _id: "blog-3",
    slug: "common-lnat-essay-mistakes",
    title: "5 Fatal LNAT Essay Mistakes You Must Avoid",
    excerpt:
      "Are you sabotaging your own argument? Learn the most common traps candidates fall into during Section B of the LNAT.",
    featuredImage:
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=1200",
    category: "Essay Writing",
    tags: ["Essay", "Common Mistakes", "Writing"],
    content: `
      <h2>The Anatomy of a Poor Essay</h2>
      <p>
        The LNAT essay is an exercise in logic, not a test of vocabulary. Many candidates make the mistake of prioritizing flowery language over structural integrity.
      </p>

      <h3>Mistake 1: Sitting on the Fence</h3>
      <p>
        Universities want decisive thinkers. Do not spend your essay arguing that "both sides have good points." Choose a stance early and defend it vigorously.
      </p>

      <h3>Mistake 2: Ignoring Counter-Arguments</h3>
      <p>
        A strong argument is one that acknowledges opposing views and dismantles them logically. 
      </p>
      <ul>
        <li>Dedicate a paragraph to the strongest counter-argument.</li>
        <li>Explain precisely why it is flawed or less critical than your main premise.</li>
      </ul>

      <h3>Mistake 3: Poor Time Management</h3>
      <p>
        You only have 40 minutes. Spending 15 minutes planning leaves you rushing the conclusion. Aim for 5-7 minutes of planning, followed by steady execution.
      </p>
    `,
    author: "Admissions Team",
    publishedAt: "22 Jan 2026",
    readTime: 5,
  },
  {
    id: "blog-4",
    slug: "ucas-timeline-law-students",
    title: "The UCAS Application Timeline for Prospective Law Students",
    excerpt:
      "A step-by-step breakdown of exactly when to write your personal statement, book the LNAT, and submit your UCAS application.",
    featuredImage:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200",
    category: "UCAS Guidance",
    tags: ["UCAS", "Timeline", "Planning"],
    content: `
      <h2>Strategic Timing is Everything</h2>
      <p>
        Applying to competitive UK law schools requires meticulous planning. Missing the Oxbridge deadline or booking the LNAT too late can jeopardize your entire application.
      </p>

      <h3>Summer Before Year 13</h3>
      <ul>
        <li><strong>June-July:</strong> Begin drafting your Personal Statement. Research universities.</li>
        <li><strong>August:</strong> Start LNAT Section A practice. Register for the LNAT (registration opens early August).</li>
      </ul>

      <h3>Autumn Term of Year 13</h3>
      <p>
        If you are applying to Oxford or Cambridge, your deadline is <strong>October 15th</strong>. You must also sit the LNAT around this period. 
      </p>
      <p>
        For other universities (UCL, LSE, King's), the UCAS deadline is late January, giving you slightly more time to sit the LNAT in November or December.
      </p>
    `,
    author: {
      name: "LNAT Editorial Desk",
    },
    publishedAt: "01 Feb 2026",
    readTime: 4,
  },
  {
    id: "blog-5",
    slug: "ucl-law-application-guide",
    title: "How to Secure an Offer from UCL Faculty of Laws",
    excerpt:
      "UCL is one of the most competitive law schools in the world. Discover how they utilize the LNAT to differentiate between top-tier candidates.",
    featuredImage:
      "https://images.unsplash.com/photo-1505664173696-0750587289ee?auto=format&fit=crop&q=80&w=1200",
    category: "University Guides",
    tags: ["UCL", "London", "Admissions"],
    content: `
      <h2>Inside UCL Laws Admissions</h2>
      <p>
        UCL looks for dynamic, independent thinkers capable of challenging established legal conventions. With acceptance rates often hovering around 12%, a stellar LNAT score is non-negotiable.
      </p>

      <h3>UCL's Approach to the LNAT</h3>
      <p>
        UCL states explicitly that they heavily weigh the essay portion (Section B). They are looking for applicants who can express themselves eloquently and construct a persuasive narrative.
      </p>
      
      <h3>Key Actionable Steps</h3>
      <ul>
        <li><strong>Holistic Review:</strong> Ensure your personal statement aligns with UCL's progressive ethos.</li>
        <li><strong>Score Target:</strong> Aim for a Section A score of 27 or higher.</li>
        <li><strong>Essay Style:</strong> Adopt a clear, formal tone. Avoid conversational language entirely.</li>
      </ul>
    `,
    author: {
      name: "UK Law Admissions Mentor",
    },
    publishedAt: "10 Feb 2026",
    readTime: 7,
  },
  {
    id: "blog-6",
    slug: "personal-statement-tips-law",
    title: "Crafting a Compelling Law Personal Statement",
    excerpt:
      "Your personal statement is your interview on paper. Learn how to highlight your critical reasoning and genuine passion for the law.",
    featuredImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    category: "Admissions Process",
    tags: ["Personal Statement", "UCAS", "Writing"],
    content: `
      <h2>Moving Beyond Clichés</h2>
      <p>
        "I have always wanted to be a lawyer since I was young" is the fastest way to make an admissions tutor stop reading. A successful personal statement must demonstrate <strong>intellectual curiosity</strong>.
      </p>

      <h3>The 80/20 Rule</h3>
      <p>
        Dedicate 80% of your statement to academic interests and super-curricular activities (reading, lectures, mooting). Reserve only 20% for extra-curriculars (sports, music), ensuring you tie them back to skills relevant to law, such as resilience or teamwork.
      </p>

      <h3>Show, Don't Tell</h3>
      <ul>
        <li>Instead of saying "I am analytical," discuss a specific legal book or case you read and critique its outcome.</li>
        <li>Highlight how studying your current A-Level subjects has prepared you for the rigor of law.</li>
      </ul>
    `,
    author: {
      name: "Admissions Team",
    },
    publishedAt: "18 Feb 2026",
    readTime: 6,
  },
  {
    id: "blog-7",
    slug: "understanding-lnat-sections",
    title: "Deconstructing the LNAT: What Are They Actually Testing?",
    excerpt:
      "An in-depth look at the psychology and methodology behind the LNAT questions.",
    featuredImage:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=1200",
    category: "LNAT Preparation",
    tags: ["Theory", "Exam Structure"],
    content: `
      <h2>The Science of the LNAT</h2>
      <p>
        Many students are frustrated by the LNAT because it feels subjective. However, every question is rigorously tested to ensure it has one objectively correct answer based purely on logical deduction.
      </p>
      <h3>Fact vs. Inference</h3>
      <p>
        The most common trap in Section A is mistaking a plausible real-world fact for an inference directly supported by the text. If the text doesn't say it, or directly imply it, it is wrong.
      </p>
    `,
    author: {
      name: "LNAT Editorial Desk",
    },
    publishedAt: "25 Feb 2026",
    readTime: 5,
  },
  {
    id: "blog-8",
    slug: "writing-better-lnat-essays",
    title: "Structuring the Perfect LNAT Essay: Paragraph by Paragraph",
    excerpt:
      "A foolproof template for structuring your 40-minute LNAT essay for maximum impact.",
    featuredImage:
      "https://images.unsplash.com/photo-1629470940428-eb0940562e1a?auto=format&fit=crop&q=80&w=1200",
    category: "Essay Writing",
    tags: ["Essay", "Structure", "Template"],
    content: `
      <h2>The Power of Structure</h2>
      <p>An essay with a brilliant premise will fail if the structure is chaotic. Follow this blueprint for consistency.</p>
      <ul>
        <li><strong>Introduction:</strong> Define the terms of the debate and clearly state your thesis.</li>
        <li><strong>Premise 1:</strong> Your strongest supporting argument.</li>
        <li><strong>Premise 2:</strong> Secondary supporting argument, providing a different angle (e.g., economic vs moral).</li>
        <li><strong>Counter-Argument & Rebuttal:</strong> Address the opposition and dismantle it.</li>
        <li><strong>Conclusion:</strong> Summarize the logic and reaffirm the thesis.</li>
      </ul>
    `,
    author: {
      name: "UK Law Admissions Mentor",
    },
    publishedAt: "05 Mar 2026",
    readTime: 6,
  },
  {
    id: "blog-9",
    slug: "applying-to-uk-law-schools-from-india",
    title: "Applying to UK Law Schools from India: What You Need to Know",
    excerpt:
      "A tailored guide for Indian students navigating the UCAS system, LNAT centers, and visa requirements.",
    featuredImage:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1200",
    category: "Admissions Process",
    tags: ["International", "India", "UCAS"],
    content: `
      <h2>The Global Prestige of a UK Law Degree</h2>
      <p>For Indian students, a UK law degree offers a globally recognized credential and a direct pathway to qualifying via the SQE or returning to practice in India.</p>
      <h3>LNAT Logistics in India</h3>
      <p>The LNAT can be taken at Pearson VUE centers across major Indian cities including Delhi, Mumbai, and Bangalore. Book early, as international slots fill up rapidly.</p>
    `,
    author: {
      name: "Admissions Team",
    },
    publishedAt: "12 Mar 2026",
    readTime: 5,
  },
  {
    id: "blog-10",
    slug: "kings-college-london-law-guide",
    title: "King’s College London: A Transnational Law Experience",
    excerpt:
      "Why King's College London is a top choice for aspiring lawyers and how they evaluate the LNAT.",
    featuredImage:
      "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?auto=format&fit=crop&q=80&w=1200",
    category: "University Guides",
    tags: ["KCL", "London"],
    content: `<h2>The Dickson Poon School of Law</h2><p>KCL places a strong emphasis on global, transnational law. They look for candidates with an awareness of international issues, which often shines through in the LNAT essay section.</p>`,
    author: { name: "LNAT Editorial Desk" },
    publishedAt: "20 Mar 2026",
    readTime: 4,
  },
  {
    id: "blog-11",
    slug: "lnat-study-plan",
    title: "The Ultimate 3-Month LNAT Study Plan",
    excerpt: "Break down your LNAT preparation into manageable weekly goals.",
    featuredImage:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1200",
    category: "LNAT Preparation",
    tags: ["Study Plan", "Strategy"],
    content: `<h2>Consistency Over Intensity</h2><p>Cramming for the LNAT does not work. This 12-week plan focuses on building incremental reading stamina and refining analytical logic.</p>`,
    author: { name: "UK Law Admissions Mentor" },
    publishedAt: "28 Mar 2026",
    readTime: 7,
  },
  {
    id: "blog-12",
    slug: "structuring-effective-law-argument",
    title: "Structuring an Effective Law Argument",
    excerpt:
      "Learn the core tenets of legal reasoning that you can apply directly to your LNAT essay.",
    featuredImage:
      "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=1200",
    category: "Essay Writing",
    tags: ["Law Logic", "Essay"],
    content: `<h2>Legal Reasoning 101</h2><p>A good lawyer anticipates the opposing counsel's arguments. Practice applying IRAC (Issue, Rule, Application, Conclusion) to your LNAT essay prompts for a highly structured response.</p>`,
    author: { name: "Admissions Team" },
    publishedAt: "04 Apr 2026",
    readTime: 5,
  },
];
