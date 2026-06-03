"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import CMSLoading from "@/components/Admin/CMS/CMSLoading";
import { ADMIN_TOKEN_STORAGE_KEY } from "@/lib/adminSession";

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const verifySession = async () => {
      const token = window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);

      if (!token) {
        router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
        return;
      }

      try {
        const response = await fetch("/api/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
          router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
          return;
        }

        if (isMounted) {
          setIsVerified(true);
        }
      } catch {
        window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
        router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
      }
    };

    void verifySession();

    return () => {
      isMounted = false;
    };
  }, [pathname, router]);

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-slate-950 p-6 md:p-8">
        <CMSLoading
          title="Checking Admin Session"
          message="Verifying your CMS access before opening the dashboard..."
        />
      </div>
    );
  }

  return children;
}
