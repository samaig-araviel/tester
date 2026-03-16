"use client";

import { Shield, ChevronRight } from "lucide-react";
import type { ExternalResource } from "@/lib/hub-data";

interface ExternalResourcesProps {
  resources: ExternalResource[];
}

export default function ExternalResources({ resources }: ExternalResourcesProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-5 h-5 text-warm-teal" />
        <h2 className="font-heading text-[22px] font-semibold text-soft-navy">
          Trusted External Resources
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="bg-surface border border-border rounded-xl p-5 flex flex-col transition-all duration-150 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          >
            {/* Org icon placeholder */}
            <div className="w-10 h-10 rounded-lg bg-warm-teal-light flex items-center justify-center mb-3">
              <span className="font-heading text-[14px] font-bold text-warm-teal">
                {resource.org.charAt(0)}
              </span>
            </div>
            <h3 className="font-heading text-[16px] font-semibold text-charcoal">
              {resource.org}
            </h3>
            <p className="font-body text-[13px] text-muted-grey mt-1 line-clamp-2 flex-1">
              {resource.description}
            </p>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-1 w-full h-9 rounded-full bg-warm-teal text-white font-body text-[13px] font-medium transition-all duration-150 hover:opacity-90"
            >
              {resource.ctaLabel}
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
