"use client";

import type { ExternalResource } from "@/lib/hub-data";

interface ExternalResourcesProps {
  resources: ExternalResource[];
}

export default function ExternalResources({ resources }: ExternalResourcesProps) {
  return (
    <section>
      <div className="mb-6">
        <h2 className="font-heading text-[22px] font-semibold text-soft-navy">
          Trusted External Resources
        </h2>
        <p className="font-body text-[14px] text-muted-grey mt-1">
          Organisations offering expert guidance for working parents.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {resources.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center text-center transition-all duration-200"
          >
            {/* Logo container */}
            <div className="w-full aspect-[4/3] rounded-2xl bg-surface border border-border flex items-center justify-center p-5 transition-all duration-200 group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] group-hover:border-primary-light group-hover:-translate-y-0.5">
              <span className="font-heading text-[22px] sm:text-[26px] font-bold text-charcoal leading-tight tracking-tight select-none">
                {resource.org}
              </span>
            </div>
            {/* Label */}
            <p className="font-body text-[13px] text-muted-grey mt-3 group-hover:text-charcoal transition-colors leading-snug">
              {resource.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
