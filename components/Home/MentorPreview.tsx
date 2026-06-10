import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  GraduationCap,
  MessageCircle,
} from "lucide-react";

const whatsappMessage = encodeURIComponent(
  "Hi, I want help choosing the right LNAT preparation plan for my target universities.",
);

const mentorSignals = [
  "Former British Council & IDP IELTS Examiner",
  "Language & Program Director at Chitkara University",
  "Lead Trainer & Mentor at Austech Language Institute",
  "Academic writing, communication and exam strategy expertise",
];

const mentorCredentials = [
  {
    title: "British Council & IDP IELTS Examiner",
    description:
      "Interviewed candidates for spoken English proficiency and examined academic and general writing skills.",
    icon: Award,
  },
  {
    title: "Language & Program Director",
    description:
      "Mentored students in French, Spanish and English proficiency at Chitkara University through Inlingua Institute.",
    icon: GraduationCap,
  },
  {
    title: "Lead Trainer & Mentor",
    description:
      "Prepared professionals, MBA students and undergraduates for advanced English tests and effective communication.",
    icon: Building2,
  },
];

export default function MentorPreview() {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-[#E8DEC9] bg-[#0D1B3E] shadow-[0_22px_54px_rgba(13,27,62,0.16)]">
        <div className="grid gap-0 lg:grid-cols-[1fr_0.82fr]">
          <div className="overflow-hidden p-6 text-center sm:p-8 lg:p-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
              Lead Mentor
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-white">
              Learn with Mr. Alastair Murray, former IELTS Examiner and language mentor.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/68">
              With years of experience assessing candidates for the British
              Council and IDP, Mr. Murray brings strong academic writing,
              communication and exam-assessment insight into LNAT preparation.
              His guidance keeps the work practical: faster reasoning, clearer
              argument structure and confident test-day communication.
            </p>

            <div className="mt-7 flex max-w-full snap-x snap-mandatory gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0">
              {mentorSignals.map((signal) => (
                <div
                  key={signal}
                  className="flex w-[min(74vw,18rem)] shrink-0 snap-center items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-center text-sm font-medium text-white/82 sm:w-auto"
                >
                  <CheckCircle2 size={17} className="shrink-0 text-[#C9A84C]" />
                  <span>{signal}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/about#mentor"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl px-5 py-3 text-sm font-bold text-[#0D1B3E] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(135deg, #C9A84C 0%, #E8C96A 60%, #C9A84C 100%)",
                  boxShadow: "0 4px 20px rgba(201,168,76,0.28)",
                }}
              >
                View mentor details
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href={`https://wa.me/9479982443?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.07] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/[0.12]"
              >
                <MessageCircle size={15} className="text-[#C9A84C]" />
                Ask for a plan
              </Link>
            </div>
          </div>

          <div className="border-t border-white/10 bg-white/[0.04] p-6 text-center sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="rounded-[28px] border border-[#C9A84C]/25 bg-white/[0.08] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
                Experience Snapshot
              </p>
              <h3 className="mt-3 text-xl font-bold text-white">
                Why his background matters for LNAT preparation
              </h3>
              <div className="mt-6 space-y-3 text-left">
                {mentorCredentials.map((credential) => {
                  const Icon = credential.icon;

                  return (
                    <div
                      key={credential.title}
                      className="rounded-2xl border border-white/10 bg-[#071226]/60 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C9A84C]/15 text-[#C9A84C]">
                          <Icon size={18} strokeWidth={1.7} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">
                            {credential.title}
                          </h4>
                          <p className="mt-1 text-[12px] leading-6 text-white/62">
                            {credential.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
