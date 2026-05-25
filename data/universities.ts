export type LNATStatus = "Required" | "Not Required" | "Recommended";
export interface University {
  basicInfo: {
    id: string;
    name: string;
    slug: string;
    logo: string;
    image: string;
    location: string;
    country: string;
    established: string;
  };
  academics: {
    globalRanking: string;
    ukLawRanking: string;
    degreeType: string;
    duration: string;
    teachingStyle: string;
    specializations: string[];
  };
  lnat: {
    required: boolean;
    averageScore: string;
    essayRequired: boolean;
    considersEssay: boolean;
    weightageDescription: string;
    preparationAdvice: string[];
  };
  admissions: {
    applicationPlatform: string;
    class12Requirements: {
      cbse: string;
      isc: string;
      ib: string;
      aLevels: string;
    };
    englishRequirements: {
      ielts: string;
      toefl: string;
      waiverAvailable: boolean;
    };
    requiredDocuments: string[];
    personalStatementImportance: string;
    interviewRequired: boolean;
    referenceLettersRequired: number;
    competitiveness:
      | "Moderate"
      | "Highly Competitive"
      | "Extremely Competitive";
  };
  timeline: {
    applicationOpens: string;
    oxbridgeDeadline?: string;
    finalDeadline: string;
    lnatDeadline: string;
    interviewPeriod?: string;
    decisionMonth: string;
    courseStartDate: string;
  };
  applicationProcess: {
    steps: {
      title: string;
      description: string;
    }[];
  };
  finance: {
    tuitionFee: string;
    livingCostEstimate: string;
    scholarshipsAvailable: boolean;
    scholarshipNames: string[];
  };
  career: {
    employabilityRank: string;
    topRecruiters: string[];
    averageGraduateSalary: string;
    notableAlumni: string[];
  };
  studentLife: {
    cityType: string;
    internationalStudentPercentage: string;
    accommodationAvailable: boolean;
    societies: string[];
  };
  lawSchool: {
    mootCourtAvailable: boolean;
    clinicalPrograms: boolean;
    studyAbroadOptions: boolean;
    internshipSupport: boolean;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
  ui: {
    featured: boolean;
    eliteUniversity: boolean;
    highlightTag: string;
    cardTheme: string;
  };
  media: {
    heroImage: string;

    gallery: {
      campus: string[];
      academics: string[];
      studentLife: string[];
      city: string[];
    };

    videoTour?: string;
  };
}
export const universities: University[] = [
  {
    basicInfo: {
      id: "oxford-law",
      name: "University of Oxford",
      slug: "university-of-oxford",
      logo: "/universities/oxford/logo.png",
      image: "/universities/oxford/hero.jpg",
      location: "Oxford, England",
      country: "United Kingdom",
      established: "1096",
    },

    academics: {
      globalRanking: "#1 UK / Top 5 Global",
      ukLawRanking: "#1",
      degreeType: "BA Jurisprudence",
      duration: "3 Years",
      teachingStyle: "Tutorial-Based Learning",
      specializations: [
        "Jurisprudence",
        "Human Rights Law",
        "Commercial Law",
        "Criminal Law",
      ],
    },

    lnat: {
      required: true,
      averageScore: "30+",
      essayRequired: true,
      considersEssay: true,
      weightageDescription:
        "Oxford places significant emphasis on both LNAT MCQ performance and essay quality.",
      preparationAdvice: [
        "Focus on argument analysis.",
        "Practice timed essays weekly.",
        "Read editorial journalism daily.",
      ],
    },

    admissions: {
      applicationPlatform: "UCAS",

      class12Requirements: {
        cbse: "95%+ overall",
        isc: "95%+ overall",
        ib: "39–40 points",
        aLevels: "AAA",
      },

      englishRequirements: {
        ielts: "7.5 overall",
        toefl: "110+",
        waiverAvailable: false,
      },

      requiredDocuments: [
        "Personal Statement",
        "Academic References",
        "Predicted Grades",
        "LNAT Score",
      ],

      personalStatementImportance: "Very High",

      interviewRequired: true,

      referenceLettersRequired: 1,

      competitiveness: "Extremely Competitive",
    },

    timeline: {
      applicationOpens: "May 2026",
      oxbridgeDeadline: "15 October 2026",
      finalDeadline: "15 October 2026",
      lnatDeadline: "15 October 2026",
      interviewPeriod: "November–December 2026",
      decisionMonth: "January 2027",
      courseStartDate: "September 2027",
    },

    applicationProcess: {
      steps: [
        {
          title: "Prepare UCAS Application",
          description:
            "Draft a highly analytical and academically mature personal statement.",
        },
        {
          title: "Take LNAT",
          description: "Complete LNAT before the Oxford admissions deadline.",
        },
        {
          title: "Attend Interview",
          description:
            "Shortlisted students are invited for rigorous tutorial-style interviews.",
        },
      ],
    },

    finance: {
      tuitionFee: "£38,000/year",
      livingCostEstimate: "£15,000/year",
      scholarshipsAvailable: true,
      scholarshipNames: ["Reach Oxford Scholarship", "Clarendon Fund"],
    },

    career: {
      employabilityRank: "Top Tier",
      topRecruiters: ["Linklaters", "Allen & Overy", "Clifford Chance"],
      averageGraduateSalary: "£55,000+",
      notableAlumni: ["Indira Gandhi", "Tony Blair"],
    },

    studentLife: {
      cityType: "Historic Academic City",
      internationalStudentPercentage: "45%",
      accommodationAvailable: true,
      societies: ["Oxford Union", "Law Society"],
    },

    lawSchool: {
      mootCourtAvailable: true,
      clinicalPrograms: true,
      studyAbroadOptions: true,
      internshipSupport: true,
    },

    seo: {
      metaTitle: "Oxford Law Admissions Guide | LNAT & UCAS",
      metaDescription:
        "Complete Oxford law admissions timeline, LNAT requirements, interview insights, and application strategy for international students.",
    },

    ui: {
      featured: true,
      eliteUniversity: true,
      highlightTag: "Most Competitive",
      cardTheme: "navy-gold",
    },
    media: {
      heroImage:
        "https://images.unsplash.com/photo-1605470207062-b72b5cbe2a87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      gallery: {
        campus: [],
        academics: [],
        studentLife: [],
        city: [],
      },
      videoTour: "",
    },
  },

  {
    basicInfo: {
      id: "ucl-law",
      name: "University College London",
      slug: "ucl-law",
      logo: "/universities/ucl/logo.png",
      image: "/universities/ucl/hero.jpg",
      location: "London, England",
      country: "United Kingdom",
      established: "1826",
    },

    academics: {
      globalRanking: "Top 10 Global",
      ukLawRanking: "#3",
      degreeType: "LLB Law",
      duration: "3 Years",
      teachingStyle: "Research & Seminar Based",
      specializations: ["International Law", "Corporate Law", "Public Law"],
    },

    lnat: {
      required: true,
      averageScore: "29+",
      essayRequired: true,
      considersEssay: true,
      weightageDescription:
        "UCL considers LNAT as a major differentiator among high-performing applicants.",
      preparationAdvice: [
        "Improve reading speed.",
        "Practice logical inference questions.",
      ],
    },

    admissions: {
      applicationPlatform: "UCAS",

      class12Requirements: {
        cbse: "95%",
        isc: "95%",
        ib: "39 points",
        aLevels: "A*AA",
      },

      englishRequirements: {
        ielts: "7.5 overall",
        toefl: "109+",
        waiverAvailable: false,
      },

      requiredDocuments: [
        "Personal Statement",
        "Academic Reference",
        "Predicted Scores",
      ],

      personalStatementImportance: "High",

      interviewRequired: false,

      referenceLettersRequired: 1,

      competitiveness: "Extremely Competitive",
    },

    timeline: {
      applicationOpens: "May 2026",
      finalDeadline: "January 2027",
      lnatDeadline: "January 2027",
      decisionMonth: "March 2027",
      courseStartDate: "September 2027",
    },

    applicationProcess: {
      steps: [
        {
          title: "Submit UCAS",
          description:
            "Apply through UCAS with strong academics and law-focused statement.",
        },
        {
          title: "Complete LNAT",
          description: "LNAT performance is heavily considered for selection.",
        },
      ],
    },

    finance: {
      tuitionFee: "£31,000/year",
      livingCostEstimate: "£18,000/year",
      scholarshipsAvailable: true,
      scholarshipNames: ["UCL Global Scholarship"],
    },

    career: {
      employabilityRank: "Top Tier",
      topRecruiters: ["Freshfields", "Magic Circle Firms"],
      averageGraduateSalary: "£52,000+",
      notableAlumni: ["Mahatma Gandhi"],
    },

    studentLife: {
      cityType: "Metropolitan",
      internationalStudentPercentage: "50%",
      accommodationAvailable: true,
      societies: ["UCL Law Society"],
    },

    lawSchool: {
      mootCourtAvailable: true,
      clinicalPrograms: true,
      studyAbroadOptions: true,
      internshipSupport: true,
    },

    seo: {
      metaTitle: "UCL Law Admissions Guide",
      metaDescription:
        "UCL LLB admissions requirements, LNAT expectations, fees, and timelines.",
    },

    ui: {
      featured: true,
      eliteUniversity: true,
      highlightTag: "London Elite",
      cardTheme: "navy-gold",
    },
    media: {
      heroImage: "",
      gallery: {
        campus: [],
        academics: [],
        studentLife: [],
        city: [],
      },
      videoTour: "",
    },
  },

  {
    basicInfo: {
      id: "lse-law",
      name: "London School of Economics",
      slug: "lse-law",
      logo: "/universities/lse/logo.png",
      image: "/universities/lse/hero.jpg",
      location: "London, England",
      country: "United Kingdom",
      established: "1895",
    },

    academics: {
      globalRanking: "Top 50 Global",
      ukLawRanking: "#4",
      degreeType: "LLB Law",
      duration: "3 Years",
      teachingStyle: "Research Intensive",
      specializations: [
        "Commercial Law",
        "Economic Regulation",
        "International Law",
      ],
    },

    lnat: {
      required: true,
      averageScore: "28+",
      essayRequired: true,
      considersEssay: false,
      weightageDescription:
        "LSE strongly values analytical reasoning and academic consistency.",
      preparationAdvice: [
        "Focus on comprehension accuracy.",
        "Practice under timed conditions.",
      ],
    },

    admissions: {
      applicationPlatform: "UCAS",

      class12Requirements: {
        cbse: "95%+",
        isc: "95%+",
        ib: "38–39 points",
        aLevels: "A*AA",
      },

      englishRequirements: {
        ielts: "7.0 overall",
        toefl: "107+",
        waiverAvailable: false,
      },

      requiredDocuments: ["UCAS Application", "Reference", "Predicted Grades"],

      personalStatementImportance: "Very High",

      interviewRequired: false,

      referenceLettersRequired: 1,

      competitiveness: "Extremely Competitive",
    },

    timeline: {
      applicationOpens: "May 2026",
      finalDeadline: "January 2027",
      lnatDeadline: "January 2027",
      decisionMonth: "March–April 2027",
      courseStartDate: "September 2027",
    },

    applicationProcess: {
      steps: [
        {
          title: "Submit UCAS",
          description: "Apply with strong academic profile.",
        },
        {
          title: "Complete LNAT",
          description: "LNAT is mandatory for all applicants.",
        },
      ],
    },

    finance: {
      tuitionFee: "£29,000/year",
      livingCostEstimate: "£17,000/year",
      scholarshipsAvailable: true,
      scholarshipNames: ["LSE Undergraduate Support Scheme"],
    },

    career: {
      employabilityRank: "Top Tier",
      topRecruiters: ["White & Case", "Slaughter and May"],
      averageGraduateSalary: "£53,000+",
      notableAlumni: ["Mick Jagger"],
    },

    studentLife: {
      cityType: "Urban",
      internationalStudentPercentage: "70%",
      accommodationAvailable: true,
      societies: ["LSESU Law Society"],
    },

    lawSchool: {
      mootCourtAvailable: true,
      clinicalPrograms: true,
      studyAbroadOptions: true,
      internshipSupport: true,
    },

    seo: {
      metaTitle: "LSE Law Admissions",
      metaDescription:
        "Complete LSE law admissions guide for LNAT and UCAS applicants.",
    },

    ui: {
      featured: true,
      eliteUniversity: true,
      highlightTag: "Corporate Law Focus",
      cardTheme: "navy-gold",
    },
    media: {
      heroImage: "",
      gallery: {
        campus: [],
        academics: [],
        studentLife: [],
        city: [],
      },
      videoTour: "",
    },
  },

  {
    basicInfo: {
      id: "kcl-law",
      name: "King’s College London",
      slug: "kings-college-london-law",
      logo: "/universities/kcl/logo.png",
      image: "/universities/kcl/hero.jpg",
      location: "London, England",
      country: "United Kingdom",
      established: "1829",
    },

    academics: {
      globalRanking: "Top 40 Global",
      ukLawRanking: "#6",
      degreeType: "LLB Law",
      duration: "3 Years",
      teachingStyle: "Lecture & Seminar",
      specializations: ["Medical Law", "Public Law", "Commercial Law"],
    },

    lnat: {
      required: true,
      averageScore: "27+",
      essayRequired: true,
      considersEssay: true,
      weightageDescription:
        "KCL evaluates both LNAT performance and academic profile holistically.",
      preparationAdvice: [
        "Read legal commentary regularly.",
        "Strengthen argument structure.",
      ],
    },

    admissions: {
      applicationPlatform: "UCAS",

      class12Requirements: {
        cbse: "92–95%",
        isc: "92–95%",
        ib: "35–38 points",
        aLevels: "A*AA",
      },

      englishRequirements: {
        ielts: "7.0 overall",
        toefl: "100+",
        waiverAvailable: true,
      },

      requiredDocuments: ["Personal Statement", "Academic Reference"],

      personalStatementImportance: "High",

      interviewRequired: false,

      referenceLettersRequired: 1,

      competitiveness: "Highly Competitive",
    },

    timeline: {
      applicationOpens: "May 2026",
      finalDeadline: "January 2027",
      lnatDeadline: "January 2027",
      decisionMonth: "March 2027",
      courseStartDate: "September 2027",
    },

    applicationProcess: {
      steps: [
        {
          title: "Apply via UCAS",
          description: "Submit application with predicted grades.",
        },
        {
          title: "Take LNAT",
          description: "Strong LNAT scores improve competitiveness.",
        },
      ],
    },

    finance: {
      tuitionFee: "£30,000/year",
      livingCostEstimate: "£17,000/year",
      scholarshipsAvailable: true,
      scholarshipNames: ["KCL International Scholarship"],
    },

    career: {
      employabilityRank: "Excellent",
      topRecruiters: ["Herbert Smith Freehills", "Deloitte Legal"],
      averageGraduateSalary: "£48,000+",
      notableAlumni: ["Desmond Tutu"],
    },

    studentLife: {
      cityType: "Metropolitan",
      internationalStudentPercentage: "48%",
      accommodationAvailable: true,
      societies: ["KCL Mooting Society"],
    },

    lawSchool: {
      mootCourtAvailable: true,
      clinicalPrograms: true,
      studyAbroadOptions: true,
      internshipSupport: true,
    },

    seo: {
      metaTitle: "KCL Law Admissions",
      metaDescription:
        "LNAT requirements and admissions strategy for King’s College London Law.",
    },

    ui: {
      featured: true,
      eliteUniversity: true,
      highlightTag: "Strong International Reputation",
      cardTheme: "navy-gold",
    },
    media: {
      heroImage: "",
      gallery: {
        campus: [],
        academics: [],
        studentLife: [],
        city: [],
      },
      videoTour: "",
    },
  },
  {
    basicInfo: {
      id: "bristol-law",
      name: "University of Bristol",
      slug: "university-of-bristol-law",
      logo: "/universities/bristol/logo.png",
      image: "/universities/bristol/hero.jpg",
      location: "Bristol, England",
      country: "United Kingdom",
      established: "1909",
    },

    academics: {
      globalRanking: "Top 60 Global",
      ukLawRanking: "#7",
      degreeType: "LLB Law",
      duration: "3 Years",
      teachingStyle: "Research & Seminar Based",
      specializations: [
        "Commercial Law",
        "International Law",
        "Human Rights Law",
      ],
    },

    lnat: {
      required: true,
      averageScore: "26+",
      essayRequired: true,
      considersEssay: false,
      weightageDescription:
        "Bristol uses LNAT as a significant admissions differentiator.",
      preparationAdvice: [
        "Practice logical reasoning daily.",
        "Improve reading comprehension speed.",
      ],
    },

    admissions: {
      applicationPlatform: "UCAS",

      class12Requirements: {
        cbse: "90–95%",
        isc: "90–95%",
        ib: "36 points",
        aLevels: "AAA",
      },

      englishRequirements: {
        ielts: "7.0 overall",
        toefl: "95+",
        waiverAvailable: true,
      },

      requiredDocuments: [
        "UCAS Application",
        "Personal Statement",
        "Academic Reference",
      ],

      personalStatementImportance: "High",

      interviewRequired: false,

      referenceLettersRequired: 1,

      competitiveness: "Highly Competitive",
    },

    timeline: {
      applicationOpens: "May 2026",
      finalDeadline: "January 2027",
      lnatDeadline: "January 2027",
      decisionMonth: "March 2027",
      courseStartDate: "September 2027",
    },

    applicationProcess: {
      steps: [
        {
          title: "Complete UCAS",
          description:
            "Submit strong academics and law-focused personal statement.",
        },
        {
          title: "Take LNAT",
          description:
            "LNAT is mandatory and should be completed before the deadline.",
        },
      ],
    },

    finance: {
      tuitionFee: "£27,000/year",
      livingCostEstimate: "£13,000/year",
      scholarshipsAvailable: true,
      scholarshipNames: ["Think Big Scholarship"],
    },

    career: {
      employabilityRank: "Excellent",
      topRecruiters: ["PwC Legal", "Burges Salmon"],
      averageGraduateSalary: "£44,000+",
      notableAlumni: ["David Walliams"],
    },

    studentLife: {
      cityType: "Creative Student City",
      internationalStudentPercentage: "30%",
      accommodationAvailable: true,
      societies: ["Bristol Law Club"],
    },

    lawSchool: {
      mootCourtAvailable: true,
      clinicalPrograms: true,
      studyAbroadOptions: true,
      internshipSupport: true,
    },

    seo: {
      metaTitle: "University of Bristol Law Admissions",
      metaDescription:
        "Complete guide to Bristol law admissions, LNAT requirements, and UCAS timeline.",
    },

    ui: {
      featured: true,
      eliteUniversity: true,
      highlightTag: "Strong Commercial Law",
      cardTheme: "navy-gold",
    },
    media: {
      heroImage: "",
      gallery: {
        campus: [],
        academics: [],
        studentLife: [],
        city: [],
      },
      videoTour: "",
    },
  },

  {
    basicInfo: {
      id: "durham-law",
      name: "Durham University",
      slug: "durham-university-law",
      logo: "/universities/durham/logo.png",
      image: "/universities/durham/hero.jpg",
      location: "Durham, England",
      country: "United Kingdom",
      established: "1832",
    },

    academics: {
      globalRanking: "Top 100 Global",
      ukLawRanking: "#5",
      degreeType: "LLB Law",
      duration: "3 Years",
      teachingStyle: "Collegiate Tutorial Style",
      specializations: [
        "Corporate Law",
        "Public Law",
        "International Trade Law",
      ],
    },

    lnat: {
      required: false,
      averageScore: "N/A",
      essayRequired: false,
      considersEssay: false,
      weightageDescription:
        "Durham does not currently require LNAT for standard law admissions.",
      preparationAdvice: [
        "Focus on academic excellence.",
        "Build strong personal statement depth.",
      ],
    },

    admissions: {
      applicationPlatform: "UCAS",

      class12Requirements: {
        cbse: "90%+",
        isc: "90%+",
        ib: "36–38 points",
        aLevels: "A*AA",
      },

      englishRequirements: {
        ielts: "7.0 overall",
        toefl: "102+",
        waiverAvailable: true,
      },

      requiredDocuments: ["Personal Statement", "Reference Letter"],

      personalStatementImportance: "Very High",

      interviewRequired: false,

      referenceLettersRequired: 1,

      competitiveness: "Highly Competitive",
    },

    timeline: {
      applicationOpens: "May 2026",
      finalDeadline: "January 2027",
      lnatDeadline: "Not Applicable",
      decisionMonth: "March 2027",
      courseStartDate: "September 2027",
    },

    applicationProcess: {
      steps: [
        {
          title: "Apply via UCAS",
          description:
            "Submit academic records and law-focused personal statement.",
        },
      ],
    },

    finance: {
      tuitionFee: "£25,000/year",
      livingCostEstimate: "£12,000/year",
      scholarshipsAvailable: true,
      scholarshipNames: ["Durham Inspiring Excellence Scholarship"],
    },

    career: {
      employabilityRank: "Excellent",
      topRecruiters: ["Eversheds", "KPMG Legal"],
      averageGraduateSalary: "£42,000+",
      notableAlumni: ["Jeremy Vine"],
    },

    studentLife: {
      cityType: "Historic College Town",
      internationalStudentPercentage: "35%",
      accommodationAvailable: true,
      societies: ["Durham Mooting Society"],
    },

    lawSchool: {
      mootCourtAvailable: true,
      clinicalPrograms: true,
      studyAbroadOptions: true,
      internshipSupport: true,
    },

    seo: {
      metaTitle: "Durham University Law Admissions",
      metaDescription:
        "Durham law school admissions guide for international and Indian students.",
    },

    ui: {
      featured: true,
      eliteUniversity: true,
      highlightTag: "Collegiate Experience",
      cardTheme: "navy-gold",
    },
    media: {
      heroImage: "",
      gallery: {
        campus: [],
        academics: [],
        studentLife: [],
        city: [],
      },
      videoTour: "",
    },
  },

  {
    basicInfo: {
      id: "glasgow-law",
      name: "University of Glasgow",
      slug: "university-of-glasgow-law",
      logo: "/universities/glasgow/logo.png",
      image: "/universities/glasgow/hero.jpg",
      location: "Glasgow, Scotland",
      country: "United Kingdom",
      established: "1451",
    },

    academics: {
      globalRanking: "Top 100 Global",
      ukLawRanking: "#9",
      degreeType: "LLB Law",
      duration: "4 Years",
      teachingStyle: "Lecture & Practical Learning",
      specializations: [
        "Scottish Law",
        "International Law",
        "Human Rights Law",
      ],
    },

    lnat: {
      required: false,
      averageScore: "N/A",
      essayRequired: false,
      considersEssay: false,
      weightageDescription:
        "University of Glasgow does not require LNAT for undergraduate law admissions.",
      preparationAdvice: [
        "Strengthen academic profile.",
        "Highlight extracurricular leadership.",
      ],
    },

    admissions: {
      applicationPlatform: "UCAS",

      class12Requirements: {
        cbse: "85–90%",
        isc: "85–90%",
        ib: "34 points",
        aLevels: "AAA",
      },

      englishRequirements: {
        ielts: "6.5 overall",
        toefl: "90+",
        waiverAvailable: true,
      },

      requiredDocuments: ["UCAS Application", "Personal Statement"],

      personalStatementImportance: "Moderate",

      interviewRequired: false,

      referenceLettersRequired: 1,

      competitiveness: "Moderate",
    },

    timeline: {
      applicationOpens: "May 2026",
      finalDeadline: "January 2027",
      lnatDeadline: "Not Applicable",
      decisionMonth: "April 2027",
      courseStartDate: "September 2027",
    },

    applicationProcess: {
      steps: [
        {
          title: "Submit UCAS Application",
          description:
            "Apply with academic transcripts and supporting documents.",
        },
      ],
    },

    finance: {
      tuitionFee: "£22,000/year",
      livingCostEstimate: "£11,000/year",
      scholarshipsAvailable: true,
      scholarshipNames: ["Glasgow International Scholarship"],
    },

    career: {
      employabilityRank: "Strong",
      topRecruiters: ["Scottish Legal Firms", "EY"],
      averageGraduateSalary: "£38,000+",
      notableAlumni: ["Nicola Sturgeon"],
    },

    studentLife: {
      cityType: "Cultural Urban City",
      internationalStudentPercentage: "32%",
      accommodationAvailable: true,
      societies: ["Glasgow Law Society"],
    },

    lawSchool: {
      mootCourtAvailable: true,
      clinicalPrograms: true,
      studyAbroadOptions: true,
      internshipSupport: true,
    },

    seo: {
      metaTitle: "University of Glasgow Law Admissions",
      metaDescription:
        "University of Glasgow law admissions requirements and student guide.",
    },

    ui: {
      featured: false,
      eliteUniversity: false,
      highlightTag: "Scottish Law Pathway",
      cardTheme: "navy-gold",
    },
    media: {
      heroImage: "",
      gallery: {
        campus: [],
        academics: [],
        studentLife: [],
        city: [],
      },
      videoTour: "",
    },
  },

  {
    basicInfo: {
      id: "soas-law",
      name: "SOAS University of London",
      slug: "soas-university-law",
      logo: "/universities/soas/logo.png",
      image: "/universities/soas/hero.jpg",
      location: "London, England",
      country: "United Kingdom",
      established: "1916",
    },

    academics: {
      globalRanking: "Top Specialist Institution",
      ukLawRanking: "#20",
      degreeType: "LLB Law",
      duration: "3 Years",
      teachingStyle: "Interdisciplinary & Global",
      specializations: [
        "Human Rights",
        "Asian Law",
        "International Relations & Law",
      ],
    },

    lnat: {
      required: false,
      averageScore: "N/A",
      essayRequired: false,
      considersEssay: false,
      weightageDescription: "SOAS does not require LNAT for law admissions.",
      preparationAdvice: [
        "Demonstrate global awareness.",
        "Build strong written communication.",
      ],
    },

    admissions: {
      applicationPlatform: "UCAS",

      class12Requirements: {
        cbse: "80–85%",
        isc: "80–85%",
        ib: "32 points",
        aLevels: "AAB",
      },

      englishRequirements: {
        ielts: "6.5 overall",
        toefl: "92+",
        waiverAvailable: true,
      },

      requiredDocuments: ["Personal Statement", "Academic Records"],

      personalStatementImportance: "High",

      interviewRequired: false,

      referenceLettersRequired: 1,

      competitiveness: "Moderate",
    },

    timeline: {
      applicationOpens: "May 2026",
      finalDeadline: "January 2027",
      lnatDeadline: "Not Applicable",
      decisionMonth: "April 2027",
      courseStartDate: "September 2027",
    },

    applicationProcess: {
      steps: [
        {
          title: "Apply Through UCAS",
          description:
            "Submit personal statement with global and interdisciplinary interests.",
        },
      ],
    },

    finance: {
      tuitionFee: "£21,000/year",
      livingCostEstimate: "£16,000/year",
      scholarshipsAvailable: true,
      scholarshipNames: ["SOAS International Excellence Scholarship"],
    },

    career: {
      employabilityRank: "Strong",
      topRecruiters: ["NGOs", "International Organizations"],
      averageGraduateSalary: "£35,000+",
      notableAlumni: ["Aung San Suu Kyi"],
    },

    studentLife: {
      cityType: "Global Metropolitan",
      internationalStudentPercentage: "55%",
      accommodationAvailable: true,
      societies: ["SOAS Law Society"],
    },

    lawSchool: {
      mootCourtAvailable: true,
      clinicalPrograms: true,
      studyAbroadOptions: true,
      internshipSupport: true,
    },

    seo: {
      metaTitle: "SOAS Law Admissions Guide",
      metaDescription:
        "SOAS law admissions process and international student requirements.",
    },

    ui: {
      featured: false,
      eliteUniversity: false,
      highlightTag: "Global Law Perspective",
      cardTheme: "navy-gold",
    },
    media: {
      heroImage: "",
      gallery: {
        campus: [],
        academics: [],
        studentLife: [],
        city: [],
      },
      videoTour: "",
    },
  },

  // Continue similarly for:
  // - University of Nottingham
  // - Queen Mary University of London
];