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
  ExternalLink,
  Shield,
  PoundSterling,
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
    <div className="group flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-surface border border-border transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-primary-light">
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

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Toolkits & Resources list */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-5">
            <Download className="w-4.5 h-4.5 text-warm-teal" />
            <h2 className="font-heading text-[20px] font-semibold text-soft-navy">
              Toolkits & Resources
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {TOOLKITS.map((tk) => (
              <ToolkitCard key={tk.id} toolkit={tk} />
            ))}
          </div>

          {/* External Resources */}
          <div className="mt-10">
            <div className="flex items-center gap-2 mb-5">
              <Shield className="w-4.5 h-4.5 text-warm-teal" />
              <h2 className="font-heading text-[20px] font-semibold text-soft-navy">
                Trusted External Resources
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EXTERNAL_RESOURCES.map((res) => (
                <a
                  key={res.id}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3.5 p-4 rounded-2xl bg-surface border border-border transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-primary-light"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-warm-teal-light flex items-center justify-center">
                    <span className="font-heading text-[14px] font-bold text-warm-teal">
                      {res.org.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-heading text-[14px] font-semibold text-charcoal group-hover:text-warm-teal transition-colors">
                        {res.org}
                      </h3>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-grey opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="font-body text-[12px] text-muted-grey mt-0.5 line-clamp-2">
                      {res.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Calculator Card */}
        <div className="lg:w-[380px] flex-shrink-0">
          <div className="lg:sticky lg:top-[96px]">
            <Link
              href="/parents-hub/maternity-calculator"
              className="group block rounded-2xl overflow-hidden border border-border bg-surface transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-warm-teal/30 hover:-translate-y-1"
            >
              {/* Card header gradient */}
              <div className="relative bg-gradient-to-br from-warm-teal to-primary p-6 sm:p-8">
                <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10" />
                <div className="absolute bottom-[-10px] right-8 w-12 h-12 rounded-full bg-white/5" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-[20px] font-bold text-white leading-snug">
                    Maternity Pay Calculator
                  </h3>
                  <p className="font-body text-[14px] text-white/80 mt-2 leading-relaxed">
                    Estimate your maternity pay, week by week, based on your
                    salary and employer&apos;s policy.
                  </p>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5 sm:p-6">
                <ul className="space-y-3 mb-5">
                  {[
                    "Week-by-week pay breakdown",
                    "SMP and enhanced pay calculations",
                    "Tax, NI and pension estimates",
                    "Monthly income comparison chart",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 font-body text-[13px] text-muted-grey"
                    >
                      <div className="w-5 h-5 rounded-full bg-warm-teal-light flex items-center justify-center flex-shrink-0">
                        <PoundSterling className="w-3 h-3 text-warm-teal" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between px-5 py-3.5 rounded-xl bg-warm-teal-light group-hover:bg-primary-light transition-colors">
                  <span className="font-body text-[14px] font-semibold text-warm-teal">
                    Calculate my pay
                  </span>
                  <ArrowRight className="w-4 h-4 text-warm-teal transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {/* Quick info */}
            <div className="mt-4 rounded-2xl bg-warm-sand p-4">
              <p className="font-body text-[12px] text-muted-grey leading-relaxed">
                Based on 2025/26 UK SMP rates. Supports enhanced employer pay,
                salary sacrifice pensions, student loans and multiple tax codes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
