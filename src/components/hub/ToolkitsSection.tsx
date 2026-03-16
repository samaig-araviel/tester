"use client";

import { useState } from "react";
import {
  Calendar,
  FileText,
  CheckSquare,
  ClipboardList,
  BookOpen,
  FileCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { HubToolkit } from "@/lib/hub-data";

const ICON_MAP = {
  Calendar,
  FileText,
  CheckSquare,
  ClipboardList,
  BookOpen,
  FileCheck,
} as const;

interface ToolkitsSectionProps {
  toolkits: HubToolkit[];
}

const ITEMS_PER_PAGE = 4;

export default function ToolkitsSection({ toolkits }: ToolkitsSectionProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const totalPages = Math.max(1, Math.ceil(toolkits.length / ITEMS_PER_PAGE));
  const visible = toolkits.slice(
    pageIndex * ITEMS_PER_PAGE,
    (pageIndex + 1) * ITEMS_PER_PAGE
  );

  return (
    <section className="flex-[0_0_38%] min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-[20px] font-semibold text-soft-navy">
          Toolkits &amp; Resources
        </h2>
        {toolkits.length > ITEMS_PER_PAGE && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPageIndex((i) => Math.max(0, i - 1))}
              disabled={pageIndex === 0}
              className="w-7 h-7 rounded-lg border border-border flex items-center justify-center disabled:opacity-30 cursor-pointer hover:border-warm-teal transition-colors disabled:cursor-default"
              aria-label="Previous toolkits"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() =>
                setPageIndex((i) => Math.min(totalPages - 1, i + 1))
              }
              disabled={pageIndex >= totalPages - 1}
              className="w-7 h-7 rounded-lg border border-border flex items-center justify-center disabled:opacity-30 cursor-pointer hover:border-warm-teal transition-colors disabled:cursor-default"
              aria-label="Next toolkits"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* List card */}
      <div className="bg-surface rounded-2xl border border-border">
        {visible.map((tk, idx) => {
          const IconComp = ICON_MAP[tk.icon] ?? FileText;
          return (
            <div
              key={tk.id}
              className={`flex items-center gap-4 px-4 py-4 transition-all duration-150 hover:bg-warm-sand/40 ${
                idx < visible.length - 1 ? "border-b border-border" : ""
              }`}
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-warm-teal-light flex items-center justify-center">
                <IconComp className="w-5 h-5 text-warm-teal" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-[15px] font-semibold text-charcoal">
                  {tk.title}
                </h3>
                <p className="font-body text-[13px] text-muted-grey mt-0.5">
                  {tk.description}
                </p>
                {tk.tags.length > 0 && (
                  <p className="font-body text-[12px] text-muted-grey mt-0.5">
                    {tk.tags.join(", ")}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
