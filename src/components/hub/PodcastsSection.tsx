import type { HubPodcast } from "@/lib/hub-data";

interface PodcastsSectionProps {
  podcasts: HubPodcast[];
}

const MAX_PODCASTS = 6;

function formatDuration(totalMinutes: number): string {
  if (totalMinutes < 60) return `${totalMinutes} minutes`;
  const hours = Math.round(totalMinutes / 60);
  return `${hours} hours`;
}

export default function PodcastsSection({ podcasts }: PodcastsSectionProps) {
  const visible = podcasts.slice(0, MAX_PODCASTS);

  return (
    <aside className="flex-[0_0_32%] min-w-0 lg:sticky lg:top-[124px] lg:self-start">
      <div className="bg-[#5A7D6F] text-white p-10">
        <h2 className="font-heading text-[1.6rem] lg:text-[1.8rem] font-bold leading-tight mb-6">
          Podcasts for You
        </h2>

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
