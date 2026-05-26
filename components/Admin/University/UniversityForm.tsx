"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import CMSHeader from "@/components/Admin/CMS/CMSHeader";
import CMSMediaSection from "@/components/Admin/CMS/CMSMediaSection";
import CMSSeoSection from "@/components/Admin/CMS/CMSSeoSection";
import CMSSchema from "@/components/Admin/CMS/CMSSchema";
import CMSActions from "@/components/Admin/CMS/CMSActions";
import RichTextEditor from "@/shared/RichTextEditor";
import { IUniversity, IMediaAsset } from "@/types/backend.types";
import UniversityGallerySection from "./UniversityGallerySection";

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

type FeatureBlock = { title: string; description: string; iconName?: string };
type FAQItem = { question: string; answer: string };
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
    famousAlumni: normalizeFamousAlumni(initialData?.famousAlumni),
    heroHeadline: initialData?.hero?.headline || "",
    heroSubheadline: initialData?.hero?.subheadline || "",
    cityOverview: initialData?.cityLife?.cityOverview || "",
    admissionsOverview: initialData?.admissions?.overview || "",
    howLNATIsUsed: initialData?.admissions?.howLNATIsUsed || "",
    targetLNATScore: initialData?.admissions?.targetLNATScore || "",
    applicationTips: (initialData?.admissions?.applicationTips || []).join("\n"),
    employabilityOverview: initialData?.careers?.employabilityOverview || "",
    topRecruiters: (initialData?.careers?.topRecruiters || []).join("\n"),
    galleryCampus: initialData?.gallery?.campusImages?.length
      ? initialData.gallery.campusImages
      : [emptyMedia()],
    galleryCity: initialData?.gallery?.cityLifeImages?.length
      ? initialData.gallery.cityLifeImages
      : [emptyMedia()],
    whyChooseThisUniversity: initialData?.whyChooseThisUniversity?.length
      ? initialData.whyChooseThisUniversity
      : [emptyFeature()],
    faqs: initialData?.faqs?.length ? initialData.faqs : [emptyFaq()],
    sourceReferences: initialData?.sourceReferences?.length
      ? initialData.sourceReferences
      : [emptySource()],
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

  const updateForm = (field: string, value: string) => {
    setForm((prev: typeof form) => {
      const next = { ...prev, [field]: value };
      persistDraft(next);
      return next;
    });
  };

  const updateListItem = (
    field:
      | "galleryCampus"
      | "galleryCity"
      | "whyChooseThisUniversity"
      | "faqs"
      | "sourceReferences"
      | "famousAlumni",
    index: number,
    key: string,
    value: string,
  ) => {
    setForm((prev: typeof form) => {
      const nextList = [...prev[field]];
      nextList[index] = {
        ...(nextList[index] as Record<string, string | undefined>),
        [key]: value,
      } as (typeof nextList)[number];
      const next = { ...prev, [field]: nextList };
      persistDraft(next);
      return next;
    });
  };

  const addListItem = (
    field:
      | "galleryCampus"
      | "galleryCity"
      | "whyChooseThisUniversity"
      | "faqs"
      | "sourceReferences"
      | "famousAlumni",
  ) => {
    const emptyMap = {
      galleryCampus: emptyMedia(),
      galleryCity: emptyMedia(),
      whyChooseThisUniversity: emptyFeature(),
      faqs: emptyFaq(),
      sourceReferences: emptySource(),
      famousAlumni: emptyAlumnus(),
    };
    setForm((prev: typeof form) => {
      const next = { ...prev, [field]: [...prev[field], emptyMap[field]] };
      persistDraft(next);
      return next;
    });
  };

  const removeListItem = (
    field:
      | "galleryCampus"
      | "galleryCity"
      | "whyChooseThisUniversity"
      | "faqs"
      | "sourceReferences"
      | "famousAlumni",
    index: number,
  ) => {
    setForm((prev: typeof form) => {
      const filtered = prev[field].filter((_: unknown, itemIndex: number) => itemIndex !== index);
      const next = {
        ...prev,
        [field]: filtered.length ? filtered : [createInitialState()[field][0]],
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
      hero: {
        headline: form.heroHeadline || undefined,
        subheadline: form.heroSubheadline || undefined,
      },
      gallery: {
        campusImages: form.galleryCampus.filter((item: IMediaAsset) => item.url && item.alt),
        cityLifeImages: form.galleryCity.filter((item: IMediaAsset) => item.url && item.alt),
      },
      whyChooseThisUniversity: form.whyChooseThisUniversity.filter(
        (item: FeatureBlock) => item.title && item.description,
      ),
      cityLife: {
        cityOverview: form.cityOverview || undefined,
      },
      admissions: {
        overview: form.admissionsOverview || undefined,
        howLNATIsUsed: form.howLNATIsUsed || undefined,
        targetLNATScore: form.targetLNATScore || undefined,
        applicationTips: form.applicationTips
          .split("\n")
          .map((item: string) => item.trim())
          .filter(Boolean),
      },
      careers: {
        employabilityOverview: form.employabilityOverview || undefined,
        topRecruiters: form.topRecruiters
          .split("\n")
          .map((item: string) => item.trim())
          .filter(Boolean),
      },
      famousAlumni: form.famousAlumni.filter(
        (item: FamousAlumnusItem) => item.name && item.designation,
      ),
      faqs: form.faqs.filter((item: FAQItem) => item.question && item.answer),
      sourceReferences: form.sourceReferences.filter(
        (item: SourceItem) => item.label && item.url,
      ),
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

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to ${statusOverride === "draft" ? "save draft" : "publish"} university`,
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
    } catch {
      toast.error("Failed to save draft");
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
    } catch {
      toast.error(
        mode === "create"
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
          </div>
        </div>

        <CMSMediaSection image={form.image} alt={form.alt} onChange={updateForm as (field: "image" | "alt", value: string) => void} editorType="University" />

        <div className={sectionClass}>
          <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
            Hero Story
          </h2>
          <div className="grid grid-cols-1 gap-4">
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

        <UniversityGallerySection
          campusImages={form.galleryCampus}
          cityImages={form.galleryCity}
          onCampusChange={updateCampusImage}
          onCityChange={updateCityImage}
          onAddCampus={() => addListItem("galleryCampus")}
          onAddCity={() => addListItem("galleryCity")}
          onRemoveCampus={(index) => removeListItem("galleryCampus", index)}
          onRemoveCity={(index) => removeListItem("galleryCity", index)}
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
            <textarea rows={8} value={form.cityOverview} onChange={(e) => updateForm("cityOverview", e.target.value)} className={`${inputClass} resize-none`} placeholder="Describe what student life around the university feels like, including neighbourhoods, culture, transport, and atmosphere." />
          </div>

          <div className={sectionClass}>
            <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
              LNAT & Admissions
            </h2>
            <textarea rows={3} value={form.admissionsOverview} onChange={(e) => updateForm("admissionsOverview", e.target.value)} className={`${inputClass} resize-none`} placeholder="How admissions work at this university" />
            <textarea rows={3} value={form.howLNATIsUsed} onChange={(e) => updateForm("howLNATIsUsed", e.target.value)} className={`${inputClass} resize-none`} placeholder="Explain exactly how LNAT is used here" />
            <input value={form.targetLNATScore} onChange={(e) => updateForm("targetLNATScore", e.target.value)} className={inputClass} placeholder="Suggested LNAT score range" />
            <textarea rows={5} value={form.applicationTips} onChange={(e) => updateForm("applicationTips", e.target.value)} className={`${inputClass} resize-none`} placeholder="One application tip per line" />
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
            Careers & Outcomes
          </h2>
          <textarea rows={4} value={form.employabilityOverview} onChange={(e) => updateForm("employabilityOverview", e.target.value)} className={`${inputClass} resize-none`} placeholder="Describe employability, reputation, chambers/firms, and overall career outcomes." />
          <textarea rows={5} value={form.topRecruiters} onChange={(e) => updateForm("topRecruiters", e.target.value)} className={`${inputClass} resize-none`} placeholder="One recruiter / employer / chamber per line" />
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
        </div>
        <CMSSchema schemaTitle={form.schemaTitle} schemaDescription={form.schemaDescription} onChange={updateForm} editorType="University" />

        <div className={sectionClass}>
          <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
            Publishing
          </h2>
          <div className="max-w-xs">
            <label className={labelClass}>Status</label>
            <select className={inputClass} value={form.status} onChange={(e) => updateForm("status", e.target.value)}>
              <option value="draft">draft</option>
              <option value="published">published</option>
            </select>
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
