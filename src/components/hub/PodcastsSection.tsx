"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
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
    <aside className="flex-[0_0_32%] min-w-0 lg:sticky lg:top-[124px] lg:self-start">
      <div className="bg-[#5A7D6F] text-white p-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-[1.6rem] lg:text-[1.8rem] font-bold leading-tight">
            Podcasts for You
          </h2>
          {podcasts.length > ITEMS_PER_PAGE && (
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                type="button"
                onClick={() => setPageIndex((i) => Math.max(0, i - 1))}
                disabled={pageIndex === 0}
                className="w-8 h-8 border border-white/30 flex items-center justify-center disabled:opacity-30 cursor-pointer hover:border-white transition-colors disabled:cursor-default"
                aria-label="Previous podcasts"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setPageIndex((i) => Math.min(totalPages - 1, i + 1))
                }
                disabled={pageIndex >= totalPages - 1}
                className="w-8 h-8 border border-white/30 flex items-center justify-center disabled:opacity-30 cursor-pointer hover:border-white transition-colors disabled:cursor-default"
                aria-label="Next podcasts"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        <ul className="flex flex-col">
          {visible.map((pod) => (
            <li key={pod.id} className="border-b border-white/20 last:border-b-0">
              <a
                href={pod.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Listen to ${pod.title} on ${pod.platform} (opens in a new tab)`}
                className="block py-5 transition-opacity duration-200 hover:opacity-70"
              >
                <p className="font-body text-[1.05rem] font-bold">{pod.title}</p>
                <p className="font-body text-[0.85rem] opacity-80 mt-1">
                  {pod.episodeCount} Episodes · {formatDuration(pod.totalMinutes)}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
