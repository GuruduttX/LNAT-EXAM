"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import CMSHeader from "@/components/Admin/CMS/CMSHeader";
import CMSMediaSection from "@/components/Admin/CMS/CMSMediaSection";
import CMSSeoSection from "@/components/Admin/CMS/CMSSeoSection";
import CMSSchema from "@/components/Admin/CMS/CMSSchema";
import CMSActions from "@/components/Admin/CMS/CMSActions";
import { getCmsErrorMessage } from "@/components/Admin/CMS/getCmsErrorMessage";
import { adminFetch } from "@/lib/adminApiClient";
import RichTextEditor from "@/shared/RichTextEditor";
import { IUniversity, IMediaAsset } from "@/types/backend.types";
import UniversityGallerySection from "./UniversityGallerySection";
import GalleryImageField from "./GalleryImageField";

const lnatStatuses = ["Required", "Not Required", "Optional"] as const;

const inputClass = `
  w-full px-4 py-3 rounded-md
  bg-slate-900/50 text-[#FDFBF7]
  placeholder:text-slate-600
  border border-slate-800
  focus:outline-none focus:ring-1 focus:ring-[#C4A47C]/50 focus:border-[#C4A47C]/50
  transition-colors
`;

const labelClass = "block text-sm font-medium text-slate-400 mb-2";
const sectionClass =
  "bg-[#0B1221] p-6 rounded-xl border border-slate-800 space-y-5 shadow-sm";

function FormField({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}

type FeatureBlock = { title: string; description: string; iconName?: string };
type FAQItem = { question: string; answer: string };
type StatItem = { label: string; value: string; note?: string };
type CTAItem = { label: string; href: string; type?: "primary" | "secondary" };
type RelatedLinkItem = { label: string; href: string };
type TestimonialItem = {
  name: string;
  course?: string;
  quote: string;
  outcome?: string;
  consentVerified?: boolean;
};
type SourceItem = {
  label: string;
  url: string;
  type?: "official" | "ranking" | "news" | "internal";
};
type FamousAlumnusItem = { name: string; designation: string };

interface UniversityFormProps {
  mode: "create" | "edit";
  initialData?: Partial<IUniversity> & { _id?: string; id?: string };
}

const emptyMedia = (): IMediaAsset => ({ url: "", alt: "", caption: "" });
const emptyFeature = (): FeatureBlock => ({ title: "", description: "" });
const emptyFaq = (): FAQItem => ({ question: "", answer: "" });
const emptyStat = (): StatItem => ({ label: "", value: "", note: "" });
const emptyRelatedLink = (): RelatedLinkItem => ({ label: "", href: "" });
const emptyTestimonial = (): TestimonialItem => ({
  name: "",
  course: "",
  quote: "",
  outcome: "",
  consentVerified: false,
});
const emptySource = (): SourceItem => ({ label: "", url: "", type: "official" });
const emptyAlumnus = (): FamousAlumnusItem => ({ name: "", designation: "" });

function normalizeFamousAlumni(
  value: unknown,
): FamousAlumnusItem[] {
  if (Array.isArray(value)) {
    const normalized = value
      .map((item) => {
        if (typeof item === "string") {
          return { name: item, designation: "" };
        }

        if (
          item &&
          typeof item === "object" &&
          "name" in item
        ) {
          const alumnus = item as {
            name?: unknown;
            designation?: unknown;
          };

          return {
            name: typeof alumnus.name === "string" ? alumnus.name : "",
            designation:
              typeof alumnus.designation === "string"
                ? alumnus.designation
                : "",
          };
        }

        return emptyAlumnus();
      })
      .filter((item) => item.name || item.designation);

    return normalized.length ? normalized : [emptyAlumnus()];
  }

  if (typeof value === "string") {
    const normalized = value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((name) => ({ name, designation: "" }));

    return normalized.length ? normalized : [emptyAlumnus()];
  }

  return [emptyAlumnus()];
}

function normalizeDraftShape(
  draft: unknown,
  initialData?: Partial<IUniversity> & { _id?: string; id?: string },
) {
  const base = createInitialState(initialData);

  if (!draft || typeof draft !== "object") {
    return base;
  }

  const parsedDraft = draft as Record<string, unknown>;

  return {
    ...base,
    ...parsedDraft,
    famousAlumni: normalizeFamousAlumni(parsedDraft.famousAlumni),
  };
}

function createInitialState(
  initialData?: Partial<IUniversity> & { _id?: string; id?: string },
) {
  return {
    name: initialData?.name || "",
    shortName: initialData?.shortName || "",
    slug: initialData?.slug || "",
    primaryCategorySlug: initialData?.primaryCategorySlug || "",
    relatedCategorySlugs: (initialData?.relatedCategorySlugs || []).join("\n"),
    location: initialData?.location || "",
    locationLabel: initialData?.locationLabel || "",
    city: initialData?.city || "",
    region: initialData?.region || "",
    country: initialData?.country || "",
    established: initialData?.established || "",
    lnatRequirement: initialData?.lnatRequirement || "",
    globalRanking: initialData?.globalRanking || "",
    nationalRanking: initialData?.nationalRanking || "",
    lawSchoolRanking: initialData?.lawSchoolRanking || "",
    acceptanceRate: initialData?.acceptanceRate || "",
    applicationDeadline: initialData?.applicationDeadline || "",
    tuitionFee: initialData?.tuitionFee || "",
    courseDuration: initialData?.courseDuration || "",
    intake: initialData?.intake || "",
    officialWebsite: initialData?.officialWebsite || "",
    shortDescription: initialData?.shortDescription || "",
    excerpt40to60: initialData?.excerpt40to60 || "",
    whyBestSummary: initialData?.whyBestSummary || "",
    overview: initialData?.overview || "",
    image: initialData?.image || "",
    alt: initialData?.cardImage?.alt || "",
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    focusKeyword: initialData?.focusKeyword || "",
    secondaryKeywords: (initialData?.secondaryKeywords || []).join(", "),
    schemaTitle: initialData?.schemaTitle || "",
    schemaDescription: initialData?.schemaDescription || "",
    schemaType: initialData?.schemaType || "CollegeOrUniversity",
    sameAs: (initialData?.sameAs || []).join("\n"),
    famousAlumni: normalizeFamousAlumni(initialData?.famousAlumni),
    notableAlumni: (initialData?.notableAlumni || []).join("\n"),
    awardsAndRecognition: (initialData?.awardsAndRecognition || []).join("\n"),
    testimonials: initialData?.testimonials?.length
      ? initialData.testimonials
      : [emptyTestimonial()],
    heroEyebrow: initialData?.hero?.eyebrow || "",
    heroHeadline: initialData?.hero?.headline || "",
    heroSubheadline: initialData?.hero?.subheadline || "",
    heroPrimaryCtaLabel: initialData?.hero?.primaryCTA?.label || "",
    heroPrimaryCtaHref: initialData?.hero?.primaryCTA?.href || "",
    heroSecondaryCtaLabel: initialData?.hero?.secondaryCTA?.label || "",
    heroSecondaryCtaHref: initialData?.hero?.secondaryCTA?.href || "",
    heroStats: initialData?.hero?.heroStats?.length
      ? initialData.hero.heroStats
      : [emptyStat()],
    heroCarouselImages: initialData?.hero?.carouselImages?.length
      ? initialData.hero.carouselImages
      : [emptyMedia()],
    whatIsSpecial: initialData?.directAnswers?.whatIsSpecial || "",
    whyStudyLawHere: initialData?.directAnswers?.whyStudyLawHere || "",
    doesItRequireLNAT: initialData?.directAnswers?.doesItRequireLNAT || "",
    whatKindOfStudentFits:
      initialData?.directAnswers?.whatKindOfStudentFits || "",
    academicStrengths: initialData?.strengths?.academicStrengths?.length
      ? initialData.strengths.academicStrengths
      : [emptyFeature()],
    facultyHighlights: initialData?.strengths?.facultyHighlights?.length
      ? initialData.strengths.facultyHighlights
      : [emptyFeature()],
    teachingStyle: initialData?.strengths?.teachingStyle || "",
    notableFacilities: initialData?.strengths?.notableFacilities?.length
      ? initialData.strengths.notableFacilities
      : [emptyFeature()],
    standoutPrograms: (initialData?.strengths?.standoutPrograms || []).join("\n"),
    cityOverview: initialData?.cityLife?.cityOverview || "",
    whyStudentsLoveTheCity: initialData?.cityLife?.whyStudentsLoveTheCity?.length
      ? initialData.cityLife.whyStudentsLoveTheCity
      : [emptyFeature()],
    neighbourhoodHighlights:
      initialData?.cityLife?.neighbourhoodHighlights?.length
        ? initialData.cityLife.neighbourhoodHighlights
        : [emptyFeature()],
    transportAndConnectivity:
      initialData?.cityLife?.transportAndConnectivity || "",
    cultureAndLifestyle: initialData?.cityLife?.cultureAndLifestyle || "",
    safetyAndPracticality: initialData?.cityLife?.safetyAndPracticality || "",
    costOfLiving: initialData?.cityLife?.costOfLiving || "",
    campusAtmosphere: initialData?.studentExperience?.campusAtmosphere || "",
    societiesAndClubs: initialData?.studentExperience?.societiesAndClubs || "",
    accommodation: initialData?.studentExperience?.accommodation || "",
    internationalStudentSupport:
      initialData?.studentExperience?.internationalStudentSupport || "",
    lifeOutsideClassroom:
      initialData?.studentExperience?.lifeOutsideClassroom || "",
    admissionsOverview: initialData?.admissions?.overview || "",
    howLNATIsUsed: initialData?.admissions?.howLNATIsUsed || "",
    targetLNATScore: initialData?.admissions?.targetLNATScore || "",
    essayPolicy: initialData?.admissions?.essayPolicy || "",
    applicationTips: (initialData?.admissions?.applicationTips || []).join("\n"),
    requiredQualifications:
      initialData?.admissions?.requiredQualifications || "",
    deadlinesNotes: initialData?.admissions?.deadlinesNotes || "",
    interviewRequired: Boolean(initialData?.admissions?.interviewRequired),
    essayConsidered: Boolean(initialData?.admissions?.essayConsidered),
    employabilityOverview: initialData?.careers?.employabilityOverview || "",
    topRecruiters: (initialData?.careers?.topRecruiters || []).join("\n"),
    alumniOutcomes: initialData?.careers?.alumniOutcomes || "",
    internshipsAndPlacements:
      initialData?.careers?.internshipsAndPlacements || "",
    reputationForLaw: initialData?.careers?.reputationForLaw || "",
    galleryCampus: initialData?.gallery?.campusImages?.length
      ? initialData.gallery.campusImages
      : [emptyMedia()],
    galleryCity: initialData?.gallery?.cityLifeImages?.length
      ? initialData.gallery.cityLifeImages
      : [emptyMedia()],
    galleryStudentLife: initialData?.gallery?.studentLifeImages?.length
      ? initialData.gallery.studentLifeImages
      : [emptyMedia()],
    galleryAcademic: initialData?.gallery?.academicImages?.length
      ? initialData.gallery.academicImages
      : [emptyMedia()],
    whyChooseThisUniversity: initialData?.whyChooseThisUniversity?.length
      ? initialData.whyChooseThisUniversity
      : [emptyFeature()],
    faqs: initialData?.faqs?.length ? initialData.faqs : [emptyFaq()],
    relatedBlogs: (initialData?.relatedBlogs || []).join("\n"),
    relatedResources: (initialData?.relatedResources || []).join("\n"),
    relatedUniversities: (initialData?.relatedUniversities || []).join("\n"),
    comparisonLinks: initialData?.comparisonLinks?.length
      ? initialData.comparisonLinks
      : [emptyRelatedLink()],
    sourceReferences: initialData?.sourceReferences?.length
      ? initialData.sourceReferences
      : [emptySource()],
    lastFactCheckedAt: initialData?.lastFactCheckedAt
      ? new Date(initialData.lastFactCheckedAt).toISOString().slice(0, 10)
      : "",
    reviewedByName: initialData?.reviewedBy?.name || "",
    reviewedByRole: initialData?.reviewedBy?.role || "",
    featured: Boolean(initialData?.featured),
    status: initialData?.status || "draft",
  };
}

export default function UniversityForm({
  mode,
  initialData,
}: UniversityFormProps) {
  const router = useRouter();
  const storageKey = useMemo(
    () =>
      mode === "create"
        ? "lnat_uni_draft_v2"
        : `lnat_uni_edit_${initialData?.id || initialData?._id || "draft"}`,
    [initialData?._id, initialData?.id, mode],
  );

  const [isPublishing, setIsPublishing] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [form, setForm] = useState(() => {
    if (mode === "create" && typeof window !== "undefined") {
      const savedDraft = window.localStorage.getItem(storageKey);
      if (savedDraft) {
        try {
          return normalizeDraftShape(JSON.parse(savedDraft), initialData);
        } catch {
          return createInitialState(initialData);
        }
      }
    }
    return createInitialState(initialData);
  });

  const persistDraft = (nextForm: typeof form) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, JSON.stringify(nextForm));
    }
  };

  const updateForm = (field: string, value: string | boolean) => {
    setForm((prev: typeof form) => {
      const next = { ...prev, [field]: value };
      persistDraft(next);
      return next;
    });
  };

  type ListField =
    | "galleryCampus"
    | "galleryCity"
    | "galleryStudentLife"
    | "galleryAcademic"
    | "heroCarouselImages"
    | "heroStats"
    | "whyChooseThisUniversity"
    | "academicStrengths"
    | "facultyHighlights"
    | "notableFacilities"
    | "whyStudentsLoveTheCity"
    | "neighbourhoodHighlights"
    | "faqs"
    | "sourceReferences"
    | "famousAlumni"
    | "testimonials"
    | "comparisonLinks";

  const getEmptyListItem = (field: ListField) => {
    const emptyMap = {
      galleryCampus: emptyMedia(),
      galleryCity: emptyMedia(),
      galleryStudentLife: emptyMedia(),
      galleryAcademic: emptyMedia(),
      heroCarouselImages: emptyMedia(),
      heroStats: emptyStat(),
      whyChooseThisUniversity: emptyFeature(),
      academicStrengths: emptyFeature(),
      facultyHighlights: emptyFeature(),
      notableFacilities: emptyFeature(),
      whyStudentsLoveTheCity: emptyFeature(),
      neighbourhoodHighlights: emptyFeature(),
      faqs: emptyFaq(),
      sourceReferences: emptySource(),
      famousAlumni: emptyAlumnus(),
      testimonials: emptyTestimonial(),
      comparisonLinks: emptyRelatedLink(),
    };

    return emptyMap[field];
  };

  const updateListItem = (
    field: ListField,
    index: number,
    key: string,
    value: string | boolean,
  ) => {
    setForm((prev: typeof form) => {
      const nextList = [...prev[field]];
      nextList[index] = {
        ...(nextList[index] as Record<string, string | boolean | undefined>),
        [key]: value,
      } as (typeof nextList)[number];
      const next = { ...prev, [field]: nextList };
      persistDraft(next);
      return next;
    });
  };

  const addListItem = (field: ListField) => {
    setForm((prev: typeof form) => {
      const next = { ...prev, [field]: [...prev[field], getEmptyListItem(field)] };
      persistDraft(next);
      return next;
    });
  };

  const removeListItem = (field: ListField, index: number) => {
    setForm((prev: typeof form) => {
      const filtered = prev[field].filter((_: unknown, itemIndex: number) => itemIndex !== index);
      const next = {
        ...prev,
        [field]: filtered.length ? filtered : [getEmptyListItem(field)],
      };
      persistDraft(next);
      return next;
    });
  };

  const updateCampusImage = (
    index: number,
    key: keyof IMediaAsset,
    value: string,
  ) => {
    updateListItem("galleryCampus", index, key, value);
  };

  const updateCityImage = (
    index: number,
    key: keyof IMediaAsset,
    value: string,
  ) => {
    updateListItem("galleryCity", index, key, value);
  };

  const updateStudentLifeImage = (
    index: number,
    key: keyof IMediaAsset,
    value: string,
  ) => {
    updateListItem("galleryStudentLife", index, key, value);
  };

  const updateAcademicImage = (
    index: number,
    key: keyof IMediaAsset,
    value: string,
  ) => {
    updateListItem("galleryAcademic", index, key, value);
  };

  const toLines = (value: string) =>
    value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

  const cleanFeatureBlocks = (items: FeatureBlock[]) =>
    items.filter((item) => item.title && item.description);

  const cleanMediaAssets = (items: IMediaAsset[]) =>
    items.filter((item) => item.url && item.alt);

  const buildPayload = (statusOverride?: "draft" | "published"): Partial<IUniversity> => {
    const cardImage =
      form.image || form.alt
        ? {
            url: form.image,
            alt: form.alt || `${form.name} hero image`,
          }
        : undefined;

    return {
      name: form.name,
      shortName: form.shortName || undefined,
      primaryCategorySlug: form.primaryCategorySlug || undefined,
      relatedCategorySlugs: toLines(form.relatedCategorySlugs),
      slug: form.slug,
      location: form.location,
      locationLabel: form.locationLabel || undefined,
      city: form.city || undefined,
      region: form.region || undefined,
      country: form.country,
      established: form.established,
      lnatRequirement: form.lnatRequirement as IUniversity["lnatRequirement"],
      globalRanking: form.globalRanking,
      nationalRanking: form.nationalRanking || undefined,
      lawSchoolRanking: form.lawSchoolRanking || undefined,
      acceptanceRate: form.acceptanceRate,
      applicationDeadline: form.applicationDeadline,
      tuitionFee: form.tuitionFee,
      courseDuration: form.courseDuration || undefined,
      intake: form.intake || undefined,
      officialWebsite: form.officialWebsite || undefined,
      shortDescription: form.shortDescription,
      excerpt40to60: form.excerpt40to60 || undefined,
      whyBestSummary: form.whyBestSummary || undefined,
      overview: form.overview,
      image: form.image,
      cardImage,
      metaTitle: form.metaTitle,
      metaDescription: form.metaDescription,
      focusKeyword: form.focusKeyword || undefined,
      secondaryKeywords: form.secondaryKeywords
        .split(",")
        .map((item: string) => item.trim())
        .filter(Boolean),
      schemaTitle: form.schemaTitle,
      schemaDescription: form.schemaDescription,
      schemaType: form.schemaType as IUniversity["schemaType"],
      sameAs: toLines(form.sameAs),
      hero: {
        eyebrow: form.heroEyebrow || undefined,
        headline: form.heroHeadline || undefined,
        subheadline: form.heroSubheadline || undefined,
        primaryCTA:
          form.heroPrimaryCtaLabel && form.heroPrimaryCtaHref
            ? {
                label: form.heroPrimaryCtaLabel,
                href: form.heroPrimaryCtaHref,
                type: "primary",
              }
            : undefined,
        secondaryCTA:
          form.heroSecondaryCtaLabel && form.heroSecondaryCtaHref
            ? {
                label: form.heroSecondaryCtaLabel,
                href: form.heroSecondaryCtaHref,
                type: "secondary",
              }
            : undefined,
        heroStats: form.heroStats.filter(
          (item: StatItem) => item.label && item.value,
        ),
        carouselImages: cleanMediaAssets(form.heroCarouselImages),
      },
      gallery: {
        campusImages: cleanMediaAssets(form.galleryCampus),
        cityLifeImages: cleanMediaAssets(form.galleryCity),
        studentLifeImages: cleanMediaAssets(form.galleryStudentLife),
        academicImages: cleanMediaAssets(form.galleryAcademic),
      },
      directAnswers: {
        whatIsSpecial: form.whatIsSpecial || undefined,
        whyStudyLawHere: form.whyStudyLawHere || undefined,
        doesItRequireLNAT: form.doesItRequireLNAT || undefined,
        whatKindOfStudentFits: form.whatKindOfStudentFits || undefined,
      },
      whyChooseThisUniversity: cleanFeatureBlocks(form.whyChooseThisUniversity),
      strengths: {
        academicStrengths: cleanFeatureBlocks(form.academicStrengths),
        facultyHighlights: cleanFeatureBlocks(form.facultyHighlights),
        teachingStyle: form.teachingStyle || undefined,
        notableFacilities: cleanFeatureBlocks(form.notableFacilities),
        standoutPrograms: toLines(form.standoutPrograms),
      },
      cityLife: {
        cityOverview: form.cityOverview || undefined,
        whyStudentsLoveTheCity: cleanFeatureBlocks(form.whyStudentsLoveTheCity),
        neighbourhoodHighlights: cleanFeatureBlocks(
          form.neighbourhoodHighlights,
        ),
        transportAndConnectivity: form.transportAndConnectivity || undefined,
        cultureAndLifestyle: form.cultureAndLifestyle || undefined,
        safetyAndPracticality: form.safetyAndPracticality || undefined,
        costOfLiving: form.costOfLiving || undefined,
      },
      studentExperience: {
        campusAtmosphere: form.campusAtmosphere || undefined,
        societiesAndClubs: form.societiesAndClubs || undefined,
        accommodation: form.accommodation || undefined,
        internationalStudentSupport:
          form.internationalStudentSupport || undefined,
        lifeOutsideClassroom: form.lifeOutsideClassroom || undefined,
      },
      admissions: {
        overview: form.admissionsOverview || undefined,
        howLNATIsUsed: form.howLNATIsUsed || undefined,
        targetLNATScore: form.targetLNATScore || undefined,
        essayPolicy: form.essayPolicy || undefined,
        applicationTips: form.applicationTips
          .split("\n")
          .map((item: string) => item.trim())
          .filter(Boolean),
        requiredQualifications: form.requiredQualifications || undefined,
        deadlinesNotes: form.deadlinesNotes || undefined,
        interviewRequired: form.interviewRequired,
        essayConsidered: form.essayConsidered,
      },
      careers: {
        employabilityOverview: form.employabilityOverview || undefined,
        topRecruiters: form.topRecruiters
          .split("\n")
          .map((item: string) => item.trim())
          .filter(Boolean),
        alumniOutcomes: form.alumniOutcomes || undefined,
        internshipsAndPlacements: form.internshipsAndPlacements || undefined,
        reputationForLaw: form.reputationForLaw || undefined,
      },
      famousAlumni: form.famousAlumni.filter(
        (item: FamousAlumnusItem) => item.name && item.designation,
      ),
      notableAlumni: toLines(form.notableAlumni),
      awardsAndRecognition: toLines(form.awardsAndRecognition),
      testimonials: form.testimonials.filter(
        (item: TestimonialItem) => item.name && item.quote,
      ),
      faqs: form.faqs.filter((item: FAQItem) => item.question && item.answer),
      relatedBlogs: toLines(form.relatedBlogs),
      relatedResources: toLines(form.relatedResources),
      relatedUniversities: toLines(form.relatedUniversities),
      comparisonLinks: form.comparisonLinks.filter(
        (item: RelatedLinkItem) => item.label && item.href,
      ),
      sourceReferences: form.sourceReferences.filter(
        (item: SourceItem) => item.label && item.url,
      ),
      lastFactCheckedAt: form.lastFactCheckedAt
        ? new Date(form.lastFactCheckedAt)
        : undefined,
      reviewedBy:
        form.reviewedByName || form.reviewedByRole
          ? {
              name: form.reviewedByName,
              role: form.reviewedByRole || undefined,
            }
          : undefined,
      featured: form.featured,
      status: statusOverride || form.status,
    };
  };

  const submitUniversity = async (
    statusOverride: "draft" | "published",
  ) => {
    const payload = buildPayload(statusOverride);
    const endpoint =
      mode === "create"
        ? "/api/universities"
        : `/api/universities/${initialData?.id || initialData?._id}`;
    const method = mode === "create" ? "POST" : "PUT";

    const response = await adminFetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(
        await getCmsErrorMessage(
          response,
          `Failed to ${
            statusOverride === "draft" ? "save draft" : "publish"
          } university`,
        ),
      );
    }

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(storageKey);
    }
  };

  const handleSaveDraft = async () => {
    persistDraft(form);
    setIsSavingDraft(true);

    try {
      await submitUniversity("draft");
      toast.success("University draft saved");
      router.push("/admin/universities");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save draft");
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const requiredFields = [
      form.name,
      form.slug,
      form.location,
      form.country,
      form.established,
      form.lnatRequirement,
      form.globalRanking,
      form.acceptanceRate,
      form.applicationDeadline,
      form.tuitionFee,
      form.shortDescription,
      form.overview,
      form.image,
      form.metaTitle,
      form.metaDescription,
      form.schemaTitle,
      form.schemaDescription,
    ];

    if (requiredFields.some((value) => !value)) {
      toast.error("Please fill in all required fields before publishing.");
      return;
    }

    setIsPublishing(true);

    try {
      await submitUniversity("published");

      toast.success(
        mode === "create"
          ? "University created successfully"
          : "University updated successfully",
      );
      router.push("/admin/universities");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : mode === "create"
            ? "Failed to create university"
            : "Failed to update university",
      );
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500 pb-12">
      <CMSHeader editorType="University" />

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className={sectionClass}>
            <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>University Name *</label>
                <input value={form.name} onChange={(e) => updateForm("name", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Slug *</label>
                <input value={form.slug} onChange={(e) => updateForm("slug", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Short Name</label>
                <input value={form.shortName} onChange={(e) => updateForm("shortName", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Official Website</label>
                <input value={form.officialWebsite} onChange={(e) => updateForm("officialWebsite", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Primary Category Slug</label>
                <input value={form.primaryCategorySlug} onChange={(e) => updateForm("primaryCategorySlug", e.target.value)} className={inputClass} placeholder="lnat-required-universities" />
              </div>
              <div>
                <label className={labelClass}>Region</label>
                <input value={form.region} onChange={(e) => updateForm("region", e.target.value)} className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Location *</label>
                <input value={form.location} onChange={(e) => updateForm("location", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Location Label</label>
                <input value={form.locationLabel} onChange={(e) => updateForm("locationLabel", e.target.value)} className={inputClass} placeholder="Oxford, England" />
              </div>
              <div>
                <label className={labelClass}>City</label>
                <input value={form.city} onChange={(e) => updateForm("city", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Country *</label>
                <input value={form.country} onChange={(e) => updateForm("country", e.target.value)} className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Short Description *</label>
              <textarea rows={3} value={form.shortDescription} onChange={(e) => updateForm("shortDescription", e.target.value)} className={`${inputClass} resize-none`} />
            </div>
            <div>
              <label className={labelClass}>40–60 Word Direct Answer</label>
              <textarea rows={3} value={form.excerpt40to60} onChange={(e) => updateForm("excerpt40to60", e.target.value)} className={`${inputClass} resize-none`} placeholder="A concise answer-shaped summary for snippets and LLM extraction." />
            </div>
            <div>
              <label className={labelClass}>Related Category Slugs</label>
              <textarea rows={4} value={form.relatedCategorySlugs} onChange={(e) => updateForm("relatedCategorySlugs", e.target.value)} className={`${inputClass} resize-none`} placeholder="One topic/category slug per line" />
            </div>
          </div>

          <div className={sectionClass}>
            <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
              Admissions & Credibility
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Established *</label>
                <input value={form.established} onChange={(e) => updateForm("established", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>LNAT Requirement *</label>
                <select value={form.lnatRequirement} onChange={(e) => updateForm("lnatRequirement", e.target.value)} className={inputClass}>
                  <option value="">Select Status</option>
                  {lnatStatuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Global Ranking *</label>
                <input value={form.globalRanking} onChange={(e) => updateForm("globalRanking", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>National Ranking</label>
                <input value={form.nationalRanking} onChange={(e) => updateForm("nationalRanking", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Law School Ranking</label>
                <input value={form.lawSchoolRanking} onChange={(e) => updateForm("lawSchoolRanking", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Acceptance Rate *</label>
                <input value={form.acceptanceRate} onChange={(e) => updateForm("acceptanceRate", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Application Deadline *</label>
                <input value={form.applicationDeadline} onChange={(e) => updateForm("applicationDeadline", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Tuition Fee *</label>
                <input value={form.tuitionFee} onChange={(e) => updateForm("tuitionFee", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Course Duration</label>
                <input value={form.courseDuration} onChange={(e) => updateForm("courseDuration", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Annual Intake</label>
                <input value={form.intake} onChange={(e) => updateForm("intake", e.target.value)} className={inputClass} />
              </div>
            </div>

            <div className="space-y-4">
              <label className={labelClass}>Famous Alumni</label>
              {form.famousAlumni.map((item: FamousAlumnusItem, index: number) => (
                <div
                  key={`alumnus-${index}`}
                  className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-start"
                >
                  <input
                    value={item.name}
                    onChange={(e) =>
                      updateListItem(
                        "famousAlumni",
                        index,
                        "name",
                        e.target.value,
                      )
                    }
                    className={inputClass}
                    placeholder="Alumnus name"
                  />
                  <input
                    value={item.designation}
                    onChange={(e) =>
                      updateListItem(
                        "famousAlumni",
                        index,
                        "designation",
                        e.target.value,
                      )
                    }
                    className={inputClass}
                    placeholder="Designation / why they are notable"
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem("famousAlumni", index)}
                    className="pt-3 text-sm text-red-400"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addListItem("famousAlumni")}
                className="text-sm text-[#C4A47C]"
              >
                + Add famous alumnus
              </button>
            </div>
            <div>
              <label className={labelClass}>Notable Alumni</label>
              <textarea rows={4} value={form.notableAlumni} onChange={(e) => updateForm("notableAlumni", e.target.value)} className={`${inputClass} resize-none`} placeholder="One notable alumnus per line" />
            </div>
            <div>
              <label className={labelClass}>Awards & Recognition</label>
              <textarea rows={4} value={form.awardsAndRecognition} onChange={(e) => updateForm("awardsAndRecognition", e.target.value)} className={`${inputClass} resize-none`} placeholder="One award/recognition per line" />
            </div>
          </div>
        </div>

        <CMSMediaSection image={form.image} alt={form.alt} onChange={updateForm as (field: "image" | "alt", value: string) => void} editorType="University" />

        <div className={sectionClass}>
          <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
            Hero Story
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className={labelClass}>Hero Eyebrow</label>
              <input value={form.heroEyebrow} onChange={(e) => updateForm("heroEyebrow", e.target.value)} className={inputClass} placeholder="University Guide" />
            </div>
            <div>
              <label className={labelClass}>Hero Headline</label>
              <input value={form.heroHeadline} onChange={(e) => updateForm("heroHeadline", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Hero Subheadline</label>
              <textarea rows={3} value={form.heroSubheadline} onChange={(e) => updateForm("heroSubheadline", e.target.value)} className={`${inputClass} resize-none`} />
            </div>
            <div>
              <label className={labelClass}>Why This University Is Special</label>
              <textarea rows={3} value={form.whyBestSummary} onChange={(e) => updateForm("whyBestSummary", e.target.value)} className={`${inputClass} resize-none`} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Primary CTA Label</label>
                <input value={form.heroPrimaryCtaLabel} onChange={(e) => updateForm("heroPrimaryCtaLabel", e.target.value)} className={inputClass} placeholder="Review Admissions Fit" />
              </div>
              <div>
                <label className={labelClass}>Primary CTA URL</label>
                <input value={form.heroPrimaryCtaHref} onChange={(e) => updateForm("heroPrimaryCtaHref", e.target.value)} className={inputClass} placeholder="/contact" />
              </div>
              <div>
                <label className={labelClass}>Secondary CTA Label</label>
                <input value={form.heroSecondaryCtaLabel} onChange={(e) => updateForm("heroSecondaryCtaLabel", e.target.value)} className={inputClass} placeholder="Compare Universities" />
              </div>
              <div>
                <label className={labelClass}>Secondary CTA URL</label>
                <input value={form.heroSecondaryCtaHref} onChange={(e) => updateForm("heroSecondaryCtaHref", e.target.value)} className={inputClass} placeholder="/universities" />
              </div>
            </div>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
            Hero Stats & Carousel
          </h2>
          {form.heroStats.map((item: StatItem, index: number) => (
            <div key={`hero-stat-${index}`} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-4 items-start">
              <input className={inputClass} placeholder="Label" value={item.label} onChange={(e) => updateListItem("heroStats", index, "label", e.target.value)} />
              <input className={inputClass} placeholder="Value" value={item.value} onChange={(e) => updateListItem("heroStats", index, "value", e.target.value)} />
              <input className={inputClass} placeholder="Optional note" value={item.note || ""} onChange={(e) => updateListItem("heroStats", index, "note", e.target.value)} />
              <button type="button" onClick={() => removeListItem("heroStats", index)} className="text-sm text-red-400 pt-3">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addListItem("heroStats")} className="text-sm text-[#C4A47C]">+ Add hero stat</button>

          <div className="pt-5 border-t border-slate-800 space-y-4">
            <h3 className="text-sm font-medium text-slate-300">Hero Carousel Images</h3>
            {form.heroCarouselImages.map((image: IMediaAsset, index: number) => (
              <GalleryImageField
                key={`hero-carousel-${index}`}
                folder="LNAT_EXAM/UniversityGallery/HeroCarousel"
                image={image}
                onChange={(key, value) => updateListItem("heroCarouselImages", index, key, value)}
                onRemove={() => removeListItem("heroCarouselImages", index)}
              />
            ))}
            <button type="button" onClick={() => addListItem("heroCarouselImages")} className="text-sm text-[#C4A47C]">+ Add carousel image</button>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
            Why Choose This University
          </h2>
          {form.whyChooseThisUniversity.map((item: FeatureBlock, index: number) => (
            <div key={`why-${index}`} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4 items-start">
              <input className={inputClass} placeholder="Block title" value={item.title} onChange={(e) => updateListItem("whyChooseThisUniversity", index, "title", e.target.value)} />
              <textarea rows={2} className={`${inputClass} resize-none`} placeholder="Why this point matters" value={item.description} onChange={(e) => updateListItem("whyChooseThisUniversity", index, "description", e.target.value)} />
              <button type="button" onClick={() => removeListItem("whyChooseThisUniversity", index)} className="text-sm text-red-400 pt-3">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addListItem("whyChooseThisUniversity")} className="text-sm text-[#C4A47C]">+ Add strength block</button>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
            Direct Answers for AEO/GEO
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="What is special about this university?">
              <textarea rows={4} value={form.whatIsSpecial} onChange={(e) => updateForm("whatIsSpecial", e.target.value)} className={`${inputClass} resize-none`} placeholder="Write a direct answer for AEO/GEO extraction." />
            </FormField>
            <FormField label="Why should students study law here?">
              <textarea rows={4} value={form.whyStudyLawHere} onChange={(e) => updateForm("whyStudyLawHere", e.target.value)} className={`${inputClass} resize-none`} placeholder="Explain the law-specific value of this university." />
            </FormField>
            <FormField label="Does this university require LNAT?">
              <textarea rows={4} value={form.doesItRequireLNAT} onChange={(e) => updateForm("doesItRequireLNAT", e.target.value)} className={`${inputClass} resize-none`} placeholder="Give a clear LNAT requirement answer." />
            </FormField>
            <FormField label="What kind of student is the best fit?">
              <textarea rows={4} value={form.whatKindOfStudentFits} onChange={(e) => updateForm("whatKindOfStudentFits", e.target.value)} className={`${inputClass} resize-none`} placeholder="Describe the student profile this university suits." />
            </FormField>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
            Academic Strengths
          </h2>
          <FormField label="Teaching style and academic approach">
            <textarea rows={4} value={form.teachingStyle} onChange={(e) => updateForm("teachingStyle", e.target.value)} className={`${inputClass} resize-none`} placeholder="Teaching style and academic approach" />
          </FormField>
          <FormField label="Standout programs (one per line)">
            <textarea rows={4} value={form.standoutPrograms} onChange={(e) => updateForm("standoutPrograms", e.target.value)} className={`${inputClass} resize-none`} placeholder="Example: BA Jurisprudence" />
          </FormField>

          {([
            ["academicStrengths", "Academic Strength"],
            ["facultyHighlights", "Faculty Highlight"],
            ["notableFacilities", "Notable Facility"],
          ] as const).map(([field, title]) => (
            <div key={field} className="space-y-4 rounded-xl border border-slate-800 p-4">
              <h3 className="text-sm font-medium text-slate-300">{title}s</h3>
              {form[field].map((item: FeatureBlock, index: number) => (
                <div key={`${field}-${index}`} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4 items-start">
                  <FormField label={`${title} title`}>
                    <input className={inputClass} placeholder={`${title} title`} value={item.title} onChange={(e) => updateListItem(field, index, "title", e.target.value)} />
                  </FormField>
                  <FormField label={`${title} description`}>
                    <textarea rows={2} className={`${inputClass} resize-none`} placeholder="Description" value={item.description} onChange={(e) => updateListItem(field, index, "description", e.target.value)} />
                  </FormField>
                  <button type="button" onClick={() => removeListItem(field, index)} className="text-sm text-red-400 pt-3">Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => addListItem(field)} className="text-sm text-[#C4A47C]">+ Add {title.toLowerCase()}</button>
            </div>
          ))}
        </div>

        <UniversityGallerySection
          campusImages={form.galleryCampus}
          cityImages={form.galleryCity}
          studentLifeImages={form.galleryStudentLife}
          academicImages={form.galleryAcademic}
          onCampusChange={updateCampusImage}
          onCityChange={updateCityImage}
          onStudentLifeChange={updateStudentLifeImage}
          onAcademicChange={updateAcademicImage}
          onAddCampus={() => addListItem("galleryCampus")}
          onAddCity={() => addListItem("galleryCity")}
          onAddStudentLife={() => addListItem("galleryStudentLife")}
          onAddAcademic={() => addListItem("galleryAcademic")}
          onRemoveCampus={(index) => removeListItem("galleryCampus", index)}
          onRemoveCity={(index) => removeListItem("galleryCity", index)}
          onRemoveStudentLife={(index) => removeListItem("galleryStudentLife", index)}
          onRemoveAcademic={(index) => removeListItem("galleryAcademic", index)}
        />

        <div className={sectionClass}>
          <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
            Overview
          </h2>
          <div className="text-gray-900 border border-slate-800 rounded-xl overflow-hidden">
            <RichTextEditor value={form.overview} onChange={(val) => updateForm("overview", val)} minHeight="50vh" maxHeight="60vh" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className={sectionClass}>
            <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
              City Life
            </h2>
            <FormField label="City overview">
              <textarea rows={8} value={form.cityOverview} onChange={(e) => updateForm("cityOverview", e.target.value)} className={`${inputClass} resize-none`} placeholder="Describe what student life around the university feels like, including neighbourhoods, culture, transport, and atmosphere." />
            </FormField>
            <FormField label="Transport and connectivity">
              <textarea rows={3} value={form.transportAndConnectivity} onChange={(e) => updateForm("transportAndConnectivity", e.target.value)} className={`${inputClass} resize-none`} placeholder="Transport and connectivity" />
            </FormField>
            <FormField label="Culture and lifestyle">
              <textarea rows={3} value={form.cultureAndLifestyle} onChange={(e) => updateForm("cultureAndLifestyle", e.target.value)} className={`${inputClass} resize-none`} placeholder="Culture and lifestyle" />
            </FormField>
            <FormField label="Safety and practical considerations">
              <textarea rows={3} value={form.safetyAndPracticality} onChange={(e) => updateForm("safetyAndPracticality", e.target.value)} className={`${inputClass} resize-none`} placeholder="Safety and practical considerations" />
            </FormField>
            <FormField label="Cost of living">
              <textarea rows={3} value={form.costOfLiving} onChange={(e) => updateForm("costOfLiving", e.target.value)} className={`${inputClass} resize-none`} placeholder="Cost of living" />
            </FormField>

            {([
              ["whyStudentsLoveTheCity", "Why Students Love The City"],
              ["neighbourhoodHighlights", "Neighbourhood Highlight"],
            ] as const).map(([field, title]) => (
              <div key={field} className="space-y-4 rounded-xl border border-slate-800 p-4">
                <h3 className="text-sm font-medium text-slate-300">{title}</h3>
                {form[field].map((item: FeatureBlock, index: number) => (
                  <div key={`${field}-${index}`} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4 items-start">
                    <FormField label={`${title} title`}>
                      <input className={inputClass} placeholder="Title" value={item.title} onChange={(e) => updateListItem(field, index, "title", e.target.value)} />
                    </FormField>
                    <FormField label={`${title} description`}>
                      <textarea rows={2} className={`${inputClass} resize-none`} placeholder="Description" value={item.description} onChange={(e) => updateListItem(field, index, "description", e.target.value)} />
                    </FormField>
                    <button type="button" onClick={() => removeListItem(field, index)} className="text-sm text-red-400 pt-3">Remove</button>
                  </div>
                ))}
                <button type="button" onClick={() => addListItem(field)} className="text-sm text-[#C4A47C]">+ Add item</button>
              </div>
            ))}
          </div>

          <div className={sectionClass}>
            <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
              LNAT & Admissions
            </h2>
            <FormField label="Admissions overview">
              <textarea rows={3} value={form.admissionsOverview} onChange={(e) => updateForm("admissionsOverview", e.target.value)} className={`${inputClass} resize-none`} placeholder="How admissions work at this university" />
            </FormField>
            <FormField label="How LNAT is used">
              <textarea rows={3} value={form.howLNATIsUsed} onChange={(e) => updateForm("howLNATIsUsed", e.target.value)} className={`${inputClass} resize-none`} placeholder="Explain exactly how LNAT is used here" />
            </FormField>
            <FormField label="Suggested LNAT score range">
              <input value={form.targetLNATScore} onChange={(e) => updateForm("targetLNATScore", e.target.value)} className={inputClass} placeholder="Suggested LNAT score range" />
            </FormField>
            <FormField label="LNAT essay policy">
              <textarea rows={3} value={form.essayPolicy} onChange={(e) => updateForm("essayPolicy", e.target.value)} className={`${inputClass} resize-none`} placeholder="LNAT essay policy" />
            </FormField>
            <FormField label="Required qualifications">
              <textarea rows={3} value={form.requiredQualifications} onChange={(e) => updateForm("requiredQualifications", e.target.value)} className={`${inputClass} resize-none`} placeholder="Required qualifications" />
            </FormField>
            <FormField label="Deadline notes">
              <textarea rows={3} value={form.deadlinesNotes} onChange={(e) => updateForm("deadlinesNotes", e.target.value)} className={`${inputClass} resize-none`} placeholder="Deadline notes" />
            </FormField>
            <FormField label="Application tips (one per line)">
              <textarea rows={5} value={form.applicationTips} onChange={(e) => updateForm("applicationTips", e.target.value)} className={`${inputClass} resize-none`} placeholder="Example: Register for LNAT before submitting UCAS." />
            </FormField>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-3 text-sm text-slate-300">
                <input type="checkbox" checked={form.interviewRequired} onChange={(e) => updateForm("interviewRequired", e.target.checked)} />
                Interview required
              </label>
              <label className="flex items-center gap-3 text-sm text-slate-300">
                <input type="checkbox" checked={form.essayConsidered} onChange={(e) => updateForm("essayConsidered", e.target.checked)} />
                LNAT essay considered
              </label>
            </div>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
            Student Experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Campus atmosphere">
              <textarea rows={4} value={form.campusAtmosphere} onChange={(e) => updateForm("campusAtmosphere", e.target.value)} className={`${inputClass} resize-none`} placeholder="Campus atmosphere" />
            </FormField>
            <FormField label="Societies and clubs">
              <textarea rows={4} value={form.societiesAndClubs} onChange={(e) => updateForm("societiesAndClubs", e.target.value)} className={`${inputClass} resize-none`} placeholder="Societies and clubs" />
            </FormField>
            <FormField label="Accommodation">
              <textarea rows={4} value={form.accommodation} onChange={(e) => updateForm("accommodation", e.target.value)} className={`${inputClass} resize-none`} placeholder="Accommodation" />
            </FormField>
            <FormField label="International student support">
              <textarea rows={4} value={form.internationalStudentSupport} onChange={(e) => updateForm("internationalStudentSupport", e.target.value)} className={`${inputClass} resize-none`} placeholder="International student support" />
            </FormField>
            <FormField label="Life outside classroom" className="md:col-span-2">
              <textarea rows={4} value={form.lifeOutsideClassroom} onChange={(e) => updateForm("lifeOutsideClassroom", e.target.value)} className={`${inputClass} resize-none`} placeholder="Life outside classroom" />
            </FormField>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
            Careers & Outcomes
          </h2>
          <FormField label="Employability overview">
            <textarea rows={4} value={form.employabilityOverview} onChange={(e) => updateForm("employabilityOverview", e.target.value)} className={`${inputClass} resize-none`} placeholder="Describe employability, reputation, chambers/firms, and overall career outcomes." />
          </FormField>
          <FormField label="Top recruiters / employers / chambers (one per line)">
            <textarea rows={5} value={form.topRecruiters} onChange={(e) => updateForm("topRecruiters", e.target.value)} className={`${inputClass} resize-none`} placeholder="Example: Allen & Overy" />
          </FormField>
          <FormField label="Alumni outcomes">
            <textarea rows={3} value={form.alumniOutcomes} onChange={(e) => updateForm("alumniOutcomes", e.target.value)} className={`${inputClass} resize-none`} placeholder="Alumni outcomes" />
          </FormField>
          <FormField label="Internships and placements">
            <textarea rows={3} value={form.internshipsAndPlacements} onChange={(e) => updateForm("internshipsAndPlacements", e.target.value)} className={`${inputClass} resize-none`} placeholder="Internships and placements" />
          </FormField>
          <FormField label="Reputation for law">
            <textarea rows={3} value={form.reputationForLaw} onChange={(e) => updateForm("reputationForLaw", e.target.value)} className={`${inputClass} resize-none`} placeholder="Reputation for law" />
          </FormField>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
            FAQs
          </h2>
          {form.faqs.map((item: FAQItem, index: number) => (
            <div key={`faq-${index}`} className="grid grid-cols-1 gap-4 border border-slate-800 rounded-lg p-4">
              <input className={inputClass} placeholder="Question" value={item.question} onChange={(e) => updateListItem("faqs", index, "question", e.target.value)} />
              <textarea rows={3} className={`${inputClass} resize-none`} placeholder="Answer" value={item.answer} onChange={(e) => updateListItem("faqs", index, "answer", e.target.value)} />
              <button type="button" onClick={() => removeListItem("faqs", index)} className="text-sm text-red-400 text-left">Remove FAQ</button>
            </div>
          ))}
          <button type="button" onClick={() => addListItem("faqs")} className="text-sm text-[#C4A47C]">+ Add FAQ</button>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
            Testimonials
          </h2>
          {form.testimonials.map((item: TestimonialItem, index: number) => (
            <div key={`testimonial-${index}`} className="grid grid-cols-1 gap-4 border border-slate-800 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Student / alumnus name">
                  <input className={inputClass} placeholder="Student / alumnus name" value={item.name} onChange={(e) => updateListItem("testimonials", index, "name", e.target.value)} />
                </FormField>
                <FormField label="Course">
                  <input className={inputClass} placeholder="Course" value={item.course || ""} onChange={(e) => updateListItem("testimonials", index, "course", e.target.value)} />
                </FormField>
              </div>
              <FormField label="Quote">
                <textarea rows={3} className={`${inputClass} resize-none`} placeholder="Quote" value={item.quote} onChange={(e) => updateListItem("testimonials", index, "quote", e.target.value)} />
              </FormField>
              <FormField label="Outcome">
                <input className={inputClass} placeholder="Outcome" value={item.outcome || ""} onChange={(e) => updateListItem("testimonials", index, "outcome", e.target.value)} />
              </FormField>
              <label className="flex items-center gap-3 text-sm text-slate-300">
                <input type="checkbox" checked={Boolean(item.consentVerified)} onChange={(e) => updateListItem("testimonials", index, "consentVerified", e.target.checked)} />
                Consent verified
              </label>
              <button type="button" onClick={() => removeListItem("testimonials", index)} className="text-sm text-red-400 text-left">Remove testimonial</button>
            </div>
          ))}
          <button type="button" onClick={() => addListItem("testimonials")} className="text-sm text-[#C4A47C]">+ Add testimonial</button>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
            Related Content & Comparison Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Related blog slugs (one per line)">
              <textarea rows={5} value={form.relatedBlogs} onChange={(e) => updateForm("relatedBlogs", e.target.value)} className={`${inputClass} resize-none`} placeholder="Example: lnat-essay-guide" />
            </FormField>
            <FormField label="Related resource slugs (one per line)">
              <textarea rows={5} value={form.relatedResources} onChange={(e) => updateForm("relatedResources", e.target.value)} className={`${inputClass} resize-none`} placeholder="Example: lnat-practice-checklist" />
            </FormField>
            <FormField label="Related university slugs (one per line)">
              <textarea rows={5} value={form.relatedUniversities} onChange={(e) => updateForm("relatedUniversities", e.target.value)} className={`${inputClass} resize-none`} placeholder="Example: university-of-cambridge" />
            </FormField>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-300">Comparison Links</h3>
            {form.comparisonLinks.map((item: RelatedLinkItem, index: number) => (
              <div key={`comparison-${index}`} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4 items-start">
                <FormField label="Comparison link label">
                  <input className={inputClass} placeholder="Label" value={item.label} onChange={(e) => updateListItem("comparisonLinks", index, "label", e.target.value)} />
                </FormField>
                <FormField label="Comparison link URL">
                  <input className={inputClass} placeholder="URL" value={item.href} onChange={(e) => updateListItem("comparisonLinks", index, "href", e.target.value)} />
                </FormField>
                <button type="button" onClick={() => removeListItem("comparisonLinks", index)} className="text-sm text-red-400 pt-3">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => addListItem("comparisonLinks")} className="text-sm text-[#C4A47C]">+ Add comparison link</button>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
            Sources
          </h2>
          {form.sourceReferences.map((item: SourceItem, index: number) => (
            <div key={`source-${index}`} className="grid grid-cols-1 md:grid-cols-[1.2fr_2fr_1fr_auto] gap-4 items-start">
              <input className={inputClass} placeholder="Label" value={item.label} onChange={(e) => updateListItem("sourceReferences", index, "label", e.target.value)} />
              <input className={inputClass} placeholder="URL" value={item.url} onChange={(e) => updateListItem("sourceReferences", index, "url", e.target.value)} />
              <select className={inputClass} value={item.type || "official"} onChange={(e) => updateListItem("sourceReferences", index, "type", e.target.value)}>
                <option value="official">official</option>
                <option value="ranking">ranking</option>
                <option value="news">news</option>
                <option value="internal">internal</option>
              </select>
              <button type="button" onClick={() => removeListItem("sourceReferences", index)} className="text-sm text-red-400 pt-3">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addListItem("sourceReferences")} className="text-sm text-[#C4A47C]">+ Add source</button>
        </div>

        <CMSSeoSection metaTitle={form.metaTitle} metaDescription={form.metaDescription} onChange={updateForm} editorType="University" />
        <div className={sectionClass}>
          <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
            Search Strategy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Focus Keyword</label>
              <input value={form.focusKeyword} onChange={(e) => updateForm("focusKeyword", e.target.value)} className={inputClass} placeholder="LNAT for Oxford" />
            </div>
            <div>
              <label className={labelClass}>Secondary Keywords</label>
              <input value={form.secondaryKeywords} onChange={(e) => updateForm("secondaryKeywords", e.target.value)} className={inputClass} placeholder="Comma-separated keywords" />
            </div>
          </div>
          <div>
            <label className={labelClass}>SameAs URLs</label>
            <textarea rows={4} value={form.sameAs} onChange={(e) => updateForm("sameAs", e.target.value)} className={`${inputClass} resize-none`} placeholder="Official/Wikipedia/social profile URLs, one per line" />
          </div>
        </div>
        <CMSSchema schemaTitle={form.schemaTitle} schemaDescription={form.schemaDescription} onChange={updateForm} editorType="University" />

        <div className={sectionClass}>
          <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
            Schema, Review & Freshness
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Schema Type</label>
              <select value={form.schemaType} onChange={(e) => updateForm("schemaType", e.target.value)} className={inputClass}>
                <option value="CollegeOrUniversity">CollegeOrUniversity</option>
                <option value="EducationalOrganization">EducationalOrganization</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Last Fact Checked At</label>
              <input type="date" value={form.lastFactCheckedAt} onChange={(e) => updateForm("lastFactCheckedAt", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Reviewed By Name</label>
              <input value={form.reviewedByName} onChange={(e) => updateForm("reviewedByName", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Reviewed By Role</label>
              <input value={form.reviewedByRole} onChange={(e) => updateForm("reviewedByRole", e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
            Publishing
          </h2>
          <p className="text-sm leading-6 text-slate-400">
            Use the action buttons below to publish the university or save it as
            a draft. Marking a university as featured lets public pages highlight
            it without adding manual ordering complexity.
          </p>
          <div>
            <label className="flex items-center gap-3 text-sm text-slate-300">
              <input type="checkbox" checked={form.featured} onChange={(e) => updateForm("featured", e.target.checked)} />
              Featured university
            </label>
          </div>
        </div>

        <CMSActions
          actionType={mode === "create" ? "create" : "update"}
          editorType="University"
          onSaveDraft={handleSaveDraft}
          loading={isPublishing || isSavingDraft}
        />
      </form>
    </div>
  );
}
