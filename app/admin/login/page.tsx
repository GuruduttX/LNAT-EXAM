"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

import { ADMIN_TOKEN_STORAGE_KEY } from "@/lib/adminSession";

function getNextPath() {
  if (typeof window === "undefined") return "/admin";

  const next = new URLSearchParams(window.location.search).get("next");
  return next?.startsWith("/admin") && next !== "/admin/login"
    ? next
    : "/admin";
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
    if (!token) return;

    const verifyExistingSession = async () => {
      try {
        const response = await fetch("/api/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          router.replace(getNextPath());
        } else {
          window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
        }
      } catch {
        window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
      }
    };

    void verifyExistingSession();
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json()) as {
        token?: string;
        error?: string;
      };

      if (!response.ok || !data.token) {
        throw new Error(data.error || "Invalid admin email or password.");
      }

      window.localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, data.token);
      toast.success("Admin login successful");
      router.replace(getNextPath());
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to login as admin.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 text-[#FDFBF7]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,164,124,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.9),transparent_34%)]" />
      <div className="absolute left-1/2 top-12 h-64 w-64 -translate-x-1/2 rounded-full bg-[#C4A47C]/10 blur-3xl" />

      <section className="relative grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-slate-800 bg-[#0B1221] shadow-2xl shadow-black/30 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden border-r border-slate-800 bg-slate-950/40 p-10 lg:block">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#C4A47C]/30 bg-[#C4A47C]/10 text-[#C4A47C]">
            <ShieldCheck size={26} />
          </div>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.24em] text-[#C4A47C]">
            LNAT Admin
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            Secure CMS access for editors.
          </h1>
          <p className="mt-5 text-sm leading-7 text-slate-400">
            Manage universities, topic hubs, blogs, FAQs, resources, and
            enquiries from one protected dashboard.
          </p>

          <div className="mt-10 space-y-3">
            {["JWT protected session", "Local admin credentials", "CMS route guard"].map(
              (item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 px-4 py-3 text-sm text-slate-300"
                >
                  <span className="h-2 w-2 rounded-full bg-[#C4A47C]" />
                  {item}
                </div>
              ),
            )}
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="mx-auto max-w-md">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#C4A47C]/30 bg-[#C4A47C]/10 text-[#C4A47C] lg:hidden">
              <ShieldCheck size={22} />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-[#C4A47C]">
                <LockKeyhole size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C4A47C]">
                  Login
                </p>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Admin Dashboard
                </h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-[#FDFBF7] outline-none transition-colors placeholder:text-slate-600 focus:border-[#C4A47C]/50 focus:ring-1 focus:ring-[#C4A47C]/40"
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-[#FDFBF7] outline-none transition-colors placeholder:text-slate-600 focus:border-[#C4A47C]/50 focus:ring-1 focus:ring-[#C4A47C]/40"
                  placeholder="Enter admin password"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C4A47C] px-5 py-3 font-semibold text-slate-950 transition-colors hover:bg-[#D5B98C] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Checking access..." : "Login to CMS"}
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
