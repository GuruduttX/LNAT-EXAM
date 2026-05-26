import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  Globe2,
  GraduationCap,
  Landmark,
  MapPin,
  Trophy,
  Users,
} from "lucide-react";

import {
  getPublishedUniversitySlugs,
  getUniversityBySlug,
} from "@/services/universityService";
import { IUniversity } from "@/types/backend.types";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getPublishedUniversitySlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const university = await getUniversityBySlug(slug);

  if (!university) {
    return {
      title: "University Not Found | LNAT Exam India",
    };
  }

  return {
    title:
      university.metaTitle ||
      `${university.name} LNAT Guide | LNAT Exam India`,
    description:
      university.metaDescription ||
      university.shortDescription ||
      `Explore LNAT admissions, student life, and application guidance for ${university.name}.`,
  };
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: string;
}) {
  if (!value) return null;

  return (
    <div className="rounded-2xl border border-[#d9d2c4] bg-white/80 p-5">
      <div className="mb-3 flex items-center gap-2 text-[#b08d4f]">
        <Icon className="h-4 w-4" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          {label}
        </span>
      </div>
      <p className="text-lg font-medium text-[#0e1b2a]">{value}</p>
    </div>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b08d4f]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0e1b2a] md:text-4xl">
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export default async function UniversityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const universityDocument = await getUniversityBySlug(slug);

  if (!universityDocument || universityDocument.status !== "published") {
    notFound();
  }

  const university = JSON.parse(
    JSON.stringify(universityDocument),
  ) as IUniversity;

  const campusImages = university.gallery?.campusImages || [];
  const cityImages = university.gallery?.cityLifeImages || [];
  const galleryImages = [...campusImages, ...cityImages];
  const leadImage = galleryImages[0]?.url || university.image;
  const leadImageAlt =
    galleryImages[0]?.alt || university.cardImage?.alt || university.name;

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#0e1b2a]">
      <section className="relative overflow-hidden bg-[#15293e] text-[#f7f3ec]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,141,79,0.22),transparent_35%)]" />
        <div className="mx-auto grid min-h-[80vh] max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="relative z-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d9c39a]">
              {university.hero?.headline ? "University Guide" : "LNAT University Profile"}
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              {university.hero?.headline || university.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d9e0e7]">
              {university.hero?.subheadline ||
                university.excerpt40to60 ||
                university.shortDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-white/15 px-4 py-2 text-[#f7f3ec]">
                {university.locationLabel || `${university.location}, ${university.country}`}
              </span>
              <span className="rounded-full border border-white/15 px-4 py-2 text-[#f7f3ec]">
                LNAT {university.lnatRequirement}
              </span>
              {university.established ? (
                <span className="rounded-full border border-white/15 px-4 py-2 text-[#f7f3ec]">
                  Est. {university.established}
                </span>
              ) : null}
            </div>

            {university.whyBestSummary ? (
              <p className="mt-8 max-w-2xl text-base leading-7 text-[#c7d2dc]">
                {university.whyBestSummary}
              </p>
            ) : null}
          </div>

          <div className="relative z-10">
            <div className="overflow-hidden rounded-[28px] border border-white/10 shadow-2xl">
              {leadImage ? (
                <Image
                  src={leadImage}
                  alt={leadImageAlt}
                  width={1200}
                  height={900}
                  className="h-[460px] w-full object-cover"
                />
              ) : (
                <div className="flex h-[460px] items-center justify-center bg-[#0e1b2a] text-[#d9c39a]">
                  No university image available
                </div>
              )}
            </div>

            {galleryImages.length > 1 ? (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {galleryImages.slice(0, 4).map((image, index) => (
                  <div
                    key={`${image.url}-${index}`}
                    className="overflow-hidden rounded-2xl border border-white/10"
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      width={400}
                      height={260}
                      className="h-24 w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-y border-[#e3ddd1] bg-white/70">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-10 md:grid-cols-2 xl:grid-cols-5">
          <StatCard
            icon={Globe2}
            label="Global Ranking"
            value={university.globalRanking}
          />
          <StatCard
            icon={Trophy}
            label="Law Ranking"
            value={university.lawSchoolRanking}
          />
          <StatCard
            icon={Calendar}
            label="Application Deadline"
            value={university.applicationDeadline}
          />
          <StatCard
            icon={GraduationCap}
            label="Tuition Fee"
            value={university.tuitionFee}
          />
          <StatCard
            icon={Users}
            label="Acceptance Rate"
            value={university.acceptanceRate}
          />
        </div>
      </section>

      <Section eyebrow="Quick Answer" title={`Why study at ${university.name}?`}>
        <div className="max-w-4xl">
          <p className="text-lg leading-8 text-slate-700">
            {university.excerpt40to60 ||
              university.shortDescription ||
              `${university.name} offers a strong academic environment, a credible law-school reputation, and a distinctive student experience for ambitious law applicants.`}
          </p>
        </div>
      </Section>

      <Section eyebrow="Overview" title="University Overview">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div
            className="prose prose-lg max-w-none text-slate-700"
            dangerouslySetInnerHTML={{ __html: university.overview }}
          />

          <aside className="rounded-[28px] border border-[#e3ddd1] bg-white p-6">
            <h3 className="text-xl font-semibold text-[#0e1b2a]">
              Key Facts
            </h3>
            <dl className="mt-6 space-y-4 text-sm text-slate-700">
              <div className="flex items-start justify-between gap-4 border-b border-[#efe8db] pb-3">
                <dt className="font-medium text-slate-500">Location</dt>
                <dd className="text-right">
                  {university.locationLabel ||
                    `${university.location}, ${university.country}`}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4 border-b border-[#efe8db] pb-3">
                <dt className="font-medium text-slate-500">LNAT Requirement</dt>
                <dd className="text-right">{university.lnatRequirement}</dd>
              </div>
              <div className="flex items-start justify-between gap-4 border-b border-[#efe8db] pb-3">
                <dt className="font-medium text-slate-500">Course Duration</dt>
                <dd className="text-right">
                  {university.courseDuration || "Check official course page"}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4 border-b border-[#efe8db] pb-3">
                <dt className="font-medium text-slate-500">Website</dt>
                <dd className="text-right">
                  {university.officialWebsite ? (
                    <a
                      href={university.officialWebsite}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#b08d4f] hover:text-[#0e1b2a]"
                    >
                      Visit site
                    </a>
                  ) : (
                    "Not added"
                  )}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </Section>

      {university.whyChooseThisUniversity?.length ? (
        <Section eyebrow="Why Choose" title={`Why choose ${university.shortName || university.name}?`}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {university.whyChooseThisUniversity.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="rounded-[28px] border border-[#e3ddd1] bg-white p-6"
              >
                <h3 className="text-xl font-semibold text-[#0e1b2a]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {university.cityLife?.cityOverview || cityImages.length ? (
        <Section eyebrow="City Life" title={`Life in ${university.city || university.location}`}>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-lg leading-8 text-slate-700">
                {university.cityLife?.cityOverview}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {cityImages.slice(0, 4).map((image, index) => (
                <div
                  key={`${image.url}-${index}`}
                  className="overflow-hidden rounded-[24px] border border-[#e3ddd1] bg-white"
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={600}
                    height={420}
                    className="h-52 w-full object-cover"
                  />
                  {image.caption ? (
                    <p className="px-4 py-3 text-sm text-slate-600">
                      {image.caption}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {university.admissions?.overview ||
      university.admissions?.howLNATIsUsed ||
      university.admissions?.applicationTips?.length ? (
        <Section eyebrow="Admissions" title="LNAT and Admissions Guidance">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[28px] border border-[#e3ddd1] bg-white p-6">
              <h3 className="text-xl font-semibold text-[#0e1b2a]">
                Admissions Snapshot
              </h3>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-700">
                <li className="flex gap-3">
                  <Landmark className="mt-1 h-4 w-4 text-[#b08d4f]" />
                  <span>LNAT status: {university.lnatRequirement}</span>
                </li>
                {university.admissions?.targetLNATScore ? (
                  <li className="flex gap-3">
                    <Trophy className="mt-1 h-4 w-4 text-[#b08d4f]" />
                    <span>
                      Indicative LNAT target: {university.admissions.targetLNATScore}
                    </span>
                  </li>
                ) : null}
                <li className="flex gap-3">
                  <Calendar className="mt-1 h-4 w-4 text-[#b08d4f]" />
                  <span>Application deadline: {university.applicationDeadline}</span>
                </li>
              </ul>
            </div>

            <div>
              {university.admissions?.overview ? (
                <p className="text-lg leading-8 text-slate-700">
                  {university.admissions.overview}
                </p>
              ) : null}
              {university.admissions?.howLNATIsUsed ? (
                <div className="mt-6 rounded-[28px] border border-[#e3ddd1] bg-white p-6">
                  <h3 className="text-xl font-semibold text-[#0e1b2a]">
                    How this university uses the LNAT
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    {university.admissions.howLNATIsUsed}
                  </p>
                </div>
              ) : null}
              {university.admissions?.applicationTips?.length ? (
                <div className="mt-6 rounded-[28px] border border-[#e3ddd1] bg-white p-6">
                  <h3 className="text-xl font-semibold text-[#0e1b2a]">
                    Application Tips
                  </h3>
                  <ol className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                    {university.admissions.applicationTips.map((tip, index) => (
                      <li key={`${tip}-${index}`} className="flex gap-3">
                        <span className="text-[#b08d4f]">{index + 1}.</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}
            </div>
          </div>
        </Section>
      ) : null}

      {university.careers?.employabilityOverview ||
      university.careers?.topRecruiters?.length ||
      university.famousAlumni?.length ? (
        <Section eyebrow="Outcomes" title="Careers and Credibility">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="rounded-[28px] border border-[#e3ddd1] bg-white p-6">
              <h3 className="text-xl font-semibold text-[#0e1b2a]">
                Career Prospects
              </h3>
              {university.careers?.employabilityOverview ? (
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  {university.careers.employabilityOverview}
                </p>
              ) : null}
              {university.careers?.topRecruiters?.length ? (
                <div className="mt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Recruiters and Pathways
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {university.careers.topRecruiters.map((recruiter, index) => (
                      <span
                        key={`${recruiter}-${index}`}
                        className="rounded-full border border-[#e3ddd1] px-4 py-2 text-sm text-slate-700"
                      >
                        {recruiter}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {university.famousAlumni?.length ? (
              <div className="rounded-[28px] border border-[#e3ddd1] bg-white p-6">
                <h3 className="text-xl font-semibold text-[#0e1b2a]">
                  Famous Alumni
                </h3>
                <div className="mt-6 space-y-4">
                  {university.famousAlumni.map((alumnus, index) => (
                    <div
                      key={`${alumnus.name}-${index}`}
                      className="rounded-2xl border border-[#efe8db] px-5 py-4"
                    >
                      <p className="font-medium text-[#0e1b2a]">
                        {alumnus.name}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {alumnus.designation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}

      {university.faqs?.length ? (
        <Section eyebrow="FAQ" title="Frequently Asked Questions">
          <div className="space-y-4">
            {university.faqs.map((faq, index) => (
              <details
                key={`${faq.question}-${index}`}
                className="rounded-[24px] border border-[#e3ddd1] bg-white px-6 py-5"
              >
                <summary className="cursor-pointer list-none text-lg font-medium text-[#0e1b2a]">
                  {faq.question}
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Section>
      ) : null}

      {university.sourceReferences?.length ? (
        <Section eyebrow="Sources" title="References and Source Material">
          <div className="rounded-[28px] border border-[#e3ddd1] bg-white p-6">
            <ul className="space-y-4">
              {university.sourceReferences.map((source, index) => (
                <li key={`${source.url}-${index}`} className="flex gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#b08d4f]" />
                  <div>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-[#0e1b2a] hover:text-[#b08d4f]"
                    >
                      {source.label}
                    </a>
                    <p className="mt-1 text-sm text-slate-500 capitalize">
                      {source.type || "official"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      <section className="pb-20 pt-6">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-[32px] bg-[#15293e] px-8 py-10 text-[#f7f3ec] md:px-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d9c39a]">
              Need guidance?
            </p>
            <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold tracking-tight">
                  Build a smarter LNAT strategy for {university.name}
                </h2>
                <p className="mt-4 text-base leading-8 text-[#d9e0e7]">
                  Use this profile as your starting point, then map your LNAT preparation,
                  admissions narrative, and university shortlist around your real targets.
                </p>
              </div>
              <a
                href="/how-to-apply"
                className="inline-flex items-center gap-2 rounded-full bg-[#b08d4f] px-6 py-3 text-sm font-semibold text-[#15293e] transition hover:bg-[#d9c39a]"
              >
                Explore Application Guidance
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
