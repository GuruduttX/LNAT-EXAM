// components/Admin/Components/Sidebar.tsx
"use client";

import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  HelpCircle,
  FolderDown,
  Layers3,
  LogOutIcon,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, slug: "/admin" },
  { name: "Universities", icon: GraduationCap, slug: "/admin/universities" },
  { name: "Categories", icon: Layers3, slug: "/admin/categories" },
  { name: "Blogs", icon: FileText, slug: "/admin/blogs" },
  { name: "FAQs", icon: HelpCircle, slug: "/admin/faqs" },
  { name: "Resources", icon: FolderDown, slug: "/admin/resources" },
];

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 z-50
      bg-[#0B1221] border-r border-slate-800
      transform transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Logo Area */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
        <span className="text-[#FDFBF7] font-semibold text-lg tracking-wide">
          LNAT <span className="text-[#C4A47C]">Admin</span>
        </span>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-[#FDFBF7] transition-colors"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-1">
        {menu.map((item) => {
          const isActive =
            pathname === item.slug || pathname?.startsWith(`${item.slug}/`);

          return (
            <Link key={item.name} href={item.slug} onClick={onClose}>
              <div
                className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors ${
                  isActive
                    ? "bg-slate-800/50 text-[#C4A47C]"
                    : "text-slate-400 hover:bg-slate-800/30 hover:text-[#FDFBF7]"
                }`}
              >
                <item.icon size={18} />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            </Link>
          );
        })}

        {/* Divider */}
        <div className="my-4 border-t border-slate-800" />

        {/* Logout */}
        <button
          onClick={async () => {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/admin/login");
            router.refresh();
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md
          text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOutIcon size={18} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </nav>
    </aside>
  );
}
