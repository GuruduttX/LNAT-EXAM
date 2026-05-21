export type LNATStatus =
  | "Required"
  | "Recommended"
  | "Required for Specific Programs";

export interface University {
  id: string;
  name: string;
  location: string;
  image: string;
  country: string;
  established: string;
  lnatRequirement: LNATStatus;
  shortDescription: string;
  // Fields below are anticipating the Individual University Page
  overview: string;
  globalRanking: string;
  tuitionFee: string;
  applicationDeadline: string;
  acceptanceRate: string;
}

export const universitiesData: University[] = [
  {
    id: "oxford",
    name: "University of Oxford",
    location: "Oxford",
    image: "",
    country: "United Kingdom",
    established: "1096",
    lnatRequirement: "Required",
    shortDescription:
      "The oldest university in the English-speaking world, offering an unparalleled tutorial system and a globally revered law faculty.",
    overview:
      "Oxford's BA in Jurisprudence is uniquely rigorous. Students are taught primarily through the tutorial system, demanding exceptional analytical and argumentative capabilities.",
    globalRanking: "#1 in UK for Law",
    tuitionFee: "£38,540 / year (Intl)",
    applicationDeadline: "October 15",
    acceptanceRate: "Approx. 8%",
  },
  {
    id: "cambridge",
    name: "University of Cambridge",
    location: "Cambridge",
    image: "",
    country: "United Kingdom",
    established: "1209",
    lnatRequirement: "Required",
    shortDescription:
      "A bastion of academic excellence. Cambridge requires the LNAT to identify candidates with the highest caliber of critical reasoning.",
    overview:
      "Cambridge focuses heavily on the foundational understanding of legal systems. The LNAT is a critical discriminator in their highly competitive admissions process.",
    globalRanking: "#2 in UK for Law",
    tuitionFee: "£39,162 / year (Intl)",
    applicationDeadline: "October 15",
    acceptanceRate: "Approx. 10%",
  },
  {
    id: "ucl",
    name: "UCL (University College London)",
    location: "London",
    image: "",
    country: "United Kingdom",
    established: "1826",
    lnatRequirement: "Required",
    shortDescription:
      "Situated in the legal heart of London, UCL merges rigorous academic theory with unparalleled access to global legal institutions.",
    overview:
      "UCL Faculty of Laws is intensely competitive. They heavily weight the LNAT essay section to gauge a candidate's ability to construct persuasive narratives.",
    globalRanking: "#14 globally (QS)",
    tuitionFee: "£35,000 / year (Intl)",
    applicationDeadline: "January 31",
    acceptanceRate: "Approx. 12%",
  },
  {
    id: "lse",
    name: "LSE (London School of Economics)",
    location: "London",
    image: "",
    country: "United Kingdom",
    established: "1895",
    lnatRequirement: "Required",
    shortDescription:
      "A world-leading social science institution where law is taught within its broader economic, social, and political context.",
    overview:
      "LSE pioneered the study of law in context. The LNAT is essential here, as the curriculum demands high-level socio-political reasoning.",
    globalRanking: "#7 globally (QS)",
    tuitionFee: "£34,128 / year (Intl)",
    applicationDeadline: "January 31",
    acceptanceRate: "Approx. 9%",
  },
  {
    id: "kings",
    name: "King’s College London",
    location: "London",
    image: "",
    country: "United Kingdom",
    established: "1829",
    lnatRequirement: "Required",
    shortDescription:
      "Home to the Dickson Poon School of Law, King's offers a transnational approach to legal education in a historic setting.",
    overview:
      "KCL looks for dynamic thinkers. The LNAT helps them identify students capable of handling their diverse, globally-focused curriculum.",
    globalRanking: "#15 globally (QS)",
    tuitionFee: "£33,450 / year (Intl)",
    applicationDeadline: "January 31",
    acceptanceRate: "Approx. 14%",
  },
  {
    id: "durham",
    name: "Durham University",
    location: "Durham",
    image: "",
    country: "United Kingdom",
    established: "1832",
    lnatRequirement: "Required",
    shortDescription:
      "A prestigious collegiate university offering a traditional, highly respected legal education in a historic collegiate environment.",
    overview:
      "Durham Law School is a top-tier UK institution. They use the LNAT to filter for exceptional analytical talent prior to extending offers.",
    globalRanking: "#40 globally (QS)",
    tuitionFee: "£29,500 / year (Intl)",
    applicationDeadline: "January 31",
    acceptanceRate: "Approx. 18%",
  },
  {
    id: "bristol",
    name: "University of Bristol",
    location: "Bristol",
    image: "",
    country: "United Kingdom",
    established: "1876",
    lnatRequirement: "Required",
    shortDescription:
      "Known for its progressive approach and strong links to the legal profession, Bristol demands high LNAT scores for its LLB programs.",
    overview:
      "Bristol is heavily targeted by top UK law firms. Their LLB requires strong foundational logic, tested stringently via the LNAT.",
    globalRanking: "#59 globally (QS)",
    tuitionFee: "£27,200 / year (Intl)",
    applicationDeadline: "January 31",
    acceptanceRate: "Approx. 20%",
  },
  {
    id: "glasgow",
    name: "University of Glasgow",
    location: "Glasgow",
    image: "",
    country: "United Kingdom",
    established: "1451",
    lnatRequirement: "Required",
    shortDescription:
      "One of Scotland's ancient universities, offering unique dual-qualifying degrees in Scots and English Law.",
    overview:
      "Glasgow's law program is uniquely versatile. The LNAT is crucial for admission to their highly sought-after Common Law and Dual Qualifying LLB.",
    globalRanking: "#76 globally (QS)",
    tuitionFee: "£25,980 / year (Intl)",
    applicationDeadline: "January 31",
    acceptanceRate: "Approx. 22%",
  },
  {
    id: "soas",
    name: "SOAS University of London",
    location: "London",
    image: "",
    country: "United Kingdom",
    established: "1916",
    lnatRequirement: "Required",
    shortDescription:
      "The premier institution for the study of law relating to Asia, Africa, and the Middle East.",
    overview:
      "SOAS offers a distinctly global legal perspective. The LNAT ensures applicants have the cognitive flexibility for cross-jurisdictional study.",
    globalRanking: "Top 20 UK for Law",
    tuitionFee: "£24,500 / year (Intl)",
    applicationDeadline: "January 31",
    acceptanceRate: "Approx. 25%",
  },
  {
    id: "suss",
    name: "Singapore University of Social Sciences",
    location: "Singapore",
    image: "",
    country: "Singapore",
    established: "2017",
    lnatRequirement: "Required",
    shortDescription:
      "A rising force in Asian legal education, specifically focusing on family law, criminal law, and community justice.",
    overview:
      "SUSS is pioneering a socially-conscious approach to law in Asia. They utilize the LNAT to assess critical thinking beyond academic grades.",
    globalRanking: "Emerging Top Asian Univ",
    tuitionFee: "SGD $32,000 / year",
    applicationDeadline: "March 15",
    acceptanceRate: "Highly Selective",
  },
  {
    id: "ie-law",
    name: "IE School of Law",
    location: "Madrid",
    image: "",
    country: "Spain",
    established: "1973",
    lnatRequirement: "Required for Specific Programs",
    shortDescription:
      "An innovative, globally-oriented law school in Madrid, blending comparative law with entrepreneurship and technology.",
    overview:
      "IE Law prepares students for global practice. The LNAT is recognized for their dual-degree programs with UK institutions.",
    globalRanking: "Top Tier Europe",
    tuitionFee: "€26,000 / year",
    applicationDeadline: "Rolling",
    acceptanceRate: "Approx. 30%",
  },
  {
    id: "jindal",
    name: "Jindal Global Law School",
    location: "Sonipat",
    image: "",
    country: "India",
    established: "2009",
    lnatRequirement: "Recommended",
    shortDescription:
      "India's premier private law school, offering a globally standardized curriculum and recognizing international testing metrics.",
    overview:
      "JGLS is highly international in its outlook. While LSAT-India is primary, strong LNAT scores are highly regarded for demonstrating global readiness.",
    globalRanking: "#1 in India (QS)",
    tuitionFee: "₹6,50,000 / year",
    applicationDeadline: "May 31",
    acceptanceRate: "Competitive",
  },
];
