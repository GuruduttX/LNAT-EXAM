import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  tone?: "light" | "dark";
}

export default function Breadcrumbs({
  items,
  className = "",
  tone = "light",
}: BreadcrumbsProps) {
  const mutedText = tone === "dark" ? "text-white/55" : "text-slate-400";
  const activeText = tone === "dark" ? "text-[#E8C96A]" : "text-[#0D1B3E]";
  const separator = tone === "dark" ? "text-white/25" : "text-slate-300";

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex max-w-full items-center gap-2 overflow-x-auto whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.18em] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={item.href} className="flex shrink-0 items-center gap-2">
            {isLast ? (
              <span aria-current="page" className={`${activeText} shrink-0`}>
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className={`${mutedText} shrink-0 transition-colors hover:text-[#C9A84C]`}
              >
                {item.label}
              </Link>
            )}
            {!isLast ? (
              <ChevronRight
                aria-hidden
                size={11}
                className={`${separator} shrink-0`}
              />
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
