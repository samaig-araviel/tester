"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, PlayCircle } from "lucide-react";
import type { HubPodcast } from "@/lib/hub-data";

interface PodcastsSectionProps {
  podcasts: HubPodcast[];
}

const ITEMS_PER_PAGE = 4;

function formatDuration(totalMinutes: number): string {
  if (totalMinutes < 60) return `${totalMinutes} minutes`;
  const hours = Math.round(totalMinutes / 60);
  return `${hours} hours`;
}

export default function PodcastsSection({ podcasts }: PodcastsSectionProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const totalPages = Math.max(1, Math.ceil(podcasts.length / ITEMS_PER_PAGE));
  const visible = podcasts.slice(
    pageIndex * ITEMS_PER_PAGE,
    (pageIndex + 1) * ITEMS_PER_PAGE
  );

  return (
    <section className="flex-[0_0_32%] min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-[20px] font-semibold text-soft-navy">
          Podcasts for You
        </h2>
        {podcasts.length > ITEMS_PER_PAGE && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPageIndex((i) => Math.max(0, i - 1))}
              disabled={pageIndex === 0}
              className="w-7 h-7 rounded-lg border border-border flex items-center justify-center disabled:opacity-30 cursor-pointer hover:border-warm-teal transition-colors disabled:cursor-default"
              aria-label="Previous podcasts"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() =>
                setPageIndex((i) => Math.min(totalPages - 1, i + 1))
              }
              disabled={pageIndex >= totalPages - 1}
              className="w-7 h-7 rounded-lg border border-border flex items-center justify-center disabled:opacity-30 cursor-pointer hover:border-warm-teal transition-colors disabled:cursor-default"
              aria-label="Next podcasts"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* List of cards */}
      <div className="flex flex-col gap-3">
        {visible.map((pod) => (
          <a
            key={pod.id}
            href={pod.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Listen to ${pod.title} on ${pod.platform} (opens in a new tab)`}
            className="group flex items-center gap-4 p-3 rounded-2xl bg-surface transition-all duration-200 hover:bg-warm-sand/40 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          >
            {/* Cover art */}
            <div className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden">
              <Image
                src={pod.imageUrl}
                alt=""
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="64px"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-[15px] font-semibold text-charcoal truncate">
                {pod.title}
              </h3>
              <p className="font-body text-[12px] text-muted-grey mt-0.5">
                {pod.episodeCount} Episodes · {formatDuration(pod.totalMinutes)}
              </p>
              <div className="flex items-center gap-1.5 mt-1.5 text-warm-teal">
                <PlayCircle
                  className="w-4 h-4"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className="font-body text-[12px] font-medium">
                  Listen now
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
