import React from "react";
import { LucideIcon } from "lucide-react";

// --- Types ---

export interface MetaItem {
  /** Unique identifier for the item */
  id: string;
  /** Lucide icon component */
  icon: LucideIcon;
  /** The primary label (e.g., "Location", "Ranking") */
  label: string;
  /** Optional value to display next to the label (e.g., "UK", "#4") */
  value?: string;
  /** If true, renders as a premium bordered badge instead of inline text */
  isHighlight?: boolean;
}

export interface UniversityMetaProps {
  /** Array of metadata items to display */
  items: MetaItem[];
  /** Optional class name for overriding container styles */
  className?: string;
}

// --- Component ---

export default function UniversityMeta({
  items,
  className = "",
}: UniversityMetaProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 ${className}`}>
      {items.map((item, index) => {
        const Icon = item.icon;
        const isLast = index === items.length - 1;

        // Determine if the next item is a highlight (to hide standard dividers)
        const nextIsHighlight = !isLast && items[index + 1].isHighlight;

        if (item.isHighlight) {
          return (
            <span
              key={item.id}
              className="inline-flex items-center gap-1.5 px-2 py-[3px] rounded-sm border border-[#C4A47C]/30 bg-[#C4A47C]/5 text-[10px] font-medium tracking-[0.1em] uppercase text-[#C4A47C]"
            >
              <Icon size={12} strokeWidth={2} />
              {item.label}
              {item.value && (
                <span className="ml-0.5 text-[#0F172A]">{item.value}</span>
              )}
            </span>
          );
        }

        return (
          <React.Fragment key={item.id}>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-light tracking-wide">
              <Icon size={14} strokeWidth={1.5} className="text-[#C4A47C]" />
              <span>
                {item.label}
                {item.value && (
                  <>
                    <span className="mx-1 text-slate-300">:</span>
                    <strong className="text-[#0F172A] font-medium">
                      {item.value}
                    </strong>
                  </>
                )}
              </span>
            </span>

            {/* Subtle Editorial Divider */}
            {!isLast && !nextIsHighlight && (
              <span
                className="w-[3px] h-[3px] rounded-full bg-slate-200"
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
