// Fixed E-E-A-T identities for every university page.
//
// The author and reviewer are predefined site-wide: they are enforced in the
// CMS form payload, overridden in the create/update API routes, and applied by
// scripts/importUniversity.ts — so no client input can change them. Mentors
// are no longer CMS data at all; they are rendered by a static component.

export const UNIVERSITY_AUTHOR = {
  name: "Anand Sharma",
  role: "Academic Mentor",
  credentials: "B.A. LL.B., National Law University, Bhopal",
  profileUrl: "/mentors/anand-sharma",
  bio: "Anand Sir is the Director & Academic Mentor at Law Prep Tutorial Delhi NCR",
} as const;

export const UNIVERSITY_REVIEWER = {
  name: "Mr. Alastair Murray",
  role: "Lead Trainer & Mentor",
} as const;
