"use client";

import {
  Calculator,
  Calendar,
  FileText,
  CheckSquare,
  ClipboardList,
  BookOpen,
  FileCheck,
  ArrowRight,
  Sparkles,
  Download,
} from "lucide-react";
import Link from "next/link";
import { TOOLKITS, EXTERNAL_RESOURCES } from "@/lib/hub-data";
import type { HubToolkit } from "@/lib/hub-data";

const ICON_MAP = {
  Calendar,
  FileText,
  CheckSquare,
  ClipboardList,
  BookOpen,
  FileCheck,
} as const;

function ToolkitCard({ toolkit }: { toolkit: HubToolkit }) {
  const IconComp = ICON_MAP[toolkit.icon] ?? FileText;

  return (
    <div className="group flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-surface border border-border transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-primary-light hover:scale-[1.03]">
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-warm-teal-light flex items-center justify-center transition-colors duration-200 group-hover:bg-primary-light">
        <IconComp className="w-5 h-5 text-warm-teal" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-heading text-[15px] font-semibold text-charcoal group-hover:text-warm-teal transition-colors">
              {toolkit.title}
            </h3>
            <p className="font-body text-[13px] text-muted-grey mt-1">
              {toolkit.description}
            </p>
          </div>
          <span className="flex-shrink-0 inline-flex items-center px-2.5 py-1 rounded-full bg-warm-sand font-body text-[11px] font-medium text-muted-grey">
            {toolkit.format}
          </span>
        </div>
        {toolkit.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {toolkit.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary-light/60 font-body text-[11px] text-warm-teal"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResourcesContent() {
  return (
    <>
      {/* Page Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-warm-teal-light flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-warm-teal" />
          </div>
          <div>
            <h1 className="font-heading text-[28px] sm:text-[32px] font-bold text-soft-navy leading-tight">
              Resources
            </h1>
          </div>
        </div>
        <p className="font-body text-[15px] text-muted-grey max-w-[600px] leading-relaxed">
          Toolkits, calculators and guides to help you plan your leave, manage
          your finances and navigate the return to work.
        </p>
      </div>

      {/* Calculator Hero Section - full width */}
      <Link
        href="/parents-hub/maternity-calculator"
        className="group block rounded-2xl overflow-hidden border border-border bg-surface transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-warm-teal/30 hover:scale-[1.01] mb-10"
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left: info side */}
          <div className="flex-1 p-7 sm:p-10 flex flex-col justify-center">
            <p className="font-body text-[11px] font-semibold tracking-widest uppercase text-warm-teal mb-3">
              Interactive Tool
            </p>
            <h2 className="font-heading text-[24px] sm:text-[28px] font-bold text-soft-navy leading-tight">
              Maternity Pay Calculator
            </h2>
            <p className="font-body text-[15px] text-muted-grey mt-3 leading-relaxed max-w-[440px]">
              Estimate your maternity pay week by week, based on your salary,
              employer&apos;s policy, tax code and pension contributions.
            </p>

            <ul className="mt-6 space-y-2.5">
              {[
                "Week-by-week pay breakdown",
                "SMP and enhanced pay calculations",
                "Tax, NI and pension estimates",
                "Monthly income comparison chart",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 font-body text-[13px] text-charcoal"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-warm-teal flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-warm-teal text-white font-body text-[14px] font-semibold transition-all duration-200 group-hover:bg-primary-hover group-hover:shadow-md self-start">
              Calculate my pay
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </div>

          {/* Right: visual preview */}
          <div className="lg:w-[420px] flex-shrink-0 bg-gradient-to-br from-warm-teal to-primary p-7 sm:p-10 flex flex-col justify-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-[-20px] right-[-20px] w-40 h-40 rounded-full bg-white/5" />
            <div className="absolute bottom-[-30px] left-[-15px] w-28 h-28 rounded-full bg-white/5" />
            <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-white/5" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-6">
                <Calculator className="w-6 h-6 text-white" />
              </div>

              {/* Mock summary stats */}
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <p className="font-body text-[11px] text-white/60 uppercase tracking-wider">
                    Total gross pay
                  </p>
                  <p className="font-heading text-[28px] font-bold text-white mt-1">
                    £52,433
                  </p>
                  <p className="font-body text-[12px] text-white/50 mt-0.5">
                    Over 52 weeks of leave
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/10 rounded-xl p-3.5 backdrop-blur-sm">
                    <p className="font-body text-[10px] text-white/60 uppercase tracking-wider">
                      Avg per week
                    </p>
                    <p className="font-heading text-[20px] font-bold text-white mt-1">
                      £1,008
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3.5 backdrop-blur-sm">
                    <p className="font-body text-[10px] text-white/60 uppercase tracking-wider">
                      Monthly drop
                    </p>
                    <p className="font-heading text-[20px] font-bold text-accent mt-1">
                      £2,038
                    </p>
                  </div>
                </div>

                {/* Mini bar chart */}
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-end gap-1 h-12">
                    {[85, 85, 85, 85, 85, 85, 50, 50, 50, 50, 50, 20].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm"
                          style={{
                            height: `${h}%`,
                            background:
                              h > 60
                                ? "rgba(255,255,255,0.5)"
                                : h > 30
                                ? "rgba(255,255,255,0.3)"
                                : "rgba(255,255,255,0.15)",
                          }}
                        />
                      )
                    )}
                  </div>
                  <p className="font-body text-[10px] text-white/40 mt-2 text-center">
                    Monthly income during leave
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Toolkits Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-5">
          <Download className="w-4.5 h-4.5 text-warm-teal" />
          <h2 className="font-heading text-[20px] font-semibold text-soft-navy">
            Toolkits & Resources
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TOOLKITS.map((tk) => (
            <ToolkitCard key={tk.id} toolkit={tk} />
          ))}
        </div>
      </div>

      {/* External Resources - full width, logo style */}
      <div>
        <div className="mb-6">
          <h2 className="font-heading text-[22px] font-semibold text-soft-navy">
            Trusted External Resources
          </h2>
          <p className="font-body text-[14px] text-muted-grey mt-1">
            Organisations offering expert guidance for working parents.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {EXTERNAL_RESOURCES.map((resource) => (
            <a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center transition-all duration-200"
            >
              <div className="w-full aspect-[4/3] rounded-2xl bg-surface border border-border flex items-center justify-center p-5 transition-all duration-200 group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] group-hover:border-primary-light group-hover:-translate-y-0.5">
                <span className="font-heading text-[22px] sm:text-[26px] font-bold text-charcoal leading-tight tracking-tight select-none">
                  {resource.org}
                </span>
              </div>
              <p className="font-body text-[13px] text-muted-grey mt-3 group-hover:text-charcoal transition-colors leading-snug">
                {resource.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
