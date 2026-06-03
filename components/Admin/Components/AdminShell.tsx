"use client";

import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

import DashboardLayout from "@/components/Admin/Components/DashboardLayout";
import AdminAuthGuard from "@/components/Admin/Components/AdminAuthGuard";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-slate-950">
        {children}
        <Toaster />
      </div>
    );
  }

  return (
    <AdminAuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
      <Toaster />
    </AdminAuthGuard>
  );
}
