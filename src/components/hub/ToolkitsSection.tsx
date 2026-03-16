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

export default function ToolkitsSection({ toolkits }: ToolkitsSectionProps) {
  const VISIBLE = 3;
  const [scrollIndex, setScrollIndex] = useState(0);
  const maxIndex = Math.max(0, toolkits.length - VISIBLE);
  const visible = toolkits.slice(scrollIndex, scrollIndex + VISIBLE);

  return (
    <section className="flex-[0_0_38%]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-[20px] font-semibold text-soft-navy">
          Toolkits & Resources
        </h2>
        {toolkits.length > VISIBLE && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setScrollIndex((i) => Math.max(0, i - 1))}
              disabled={scrollIndex === 0}
              className="w-7 h-7 rounded-full border border-border flex items-center justify-center disabled:opacity-30 cursor-pointer hover:border-warm-teal transition-colors"
              aria-label="Previous toolkit"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setScrollIndex((i) => Math.min(maxIndex, i + 1))}
              disabled={scrollIndex >= maxIndex}
              className="w-7 h-7 rounded-full border border-border flex items-center justify-center disabled:opacity-30 cursor-pointer hover:border-warm-teal transition-colors"
              aria-label="Next toolkit"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {visible.map((tk) => {
          const IconComp = ICON_MAP[tk.icon] ?? FileText;
          return (
            <div
              key={tk.id}
              className="bg-surface border border-border rounded-xl p-4 transition-all duration-150 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-warm-teal-light flex items-center justify-center">
                  <IconComp className="w-4 h-4 text-warm-teal" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-[15px] font-semibold text-charcoal">
                    {tk.title}
                  </h3>
                  <p className="font-body text-[13px] text-muted-grey mt-0.5">
                    {tk.description}
                  </p>
                  {tk.tags.length > 0 && (
                    <p className="font-body text-[12px] text-muted-grey mt-1">
                      {tk.tags.join(", ")}
                    </p>
                  )}
                </div>
              </div>
              <a
                href={tk.fileUrl}
                className="mt-3 flex items-center justify-center w-full h-9 rounded-full bg-warm-teal text-white font-body text-[13px] font-medium transition-all duration-150 hover:opacity-90"
              >
                Download
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
