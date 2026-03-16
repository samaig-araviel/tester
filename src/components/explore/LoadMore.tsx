"use client";

interface LoadMoreProps {
  visibleCount: number;
  totalCount: number;
  onLoadMore: () => void;
}

export default function LoadMore({
  visibleCount,
  totalCount,
  onLoadMore,
}: LoadMoreProps) {
  if (visibleCount >= totalCount) {
    // Show total count only when all are visible and there are results
    if (totalCount > 0) {
      return (
        <p className="text-center font-body text-[13px] text-muted-grey mt-8">
          Showing all {totalCount} partner{totalCount === 1 ? "" : "s"}
        </p>
      );
    }
    return null;
  }

  return (
    <div className="flex flex-col items-center mt-8 gap-3">
      <button
        onClick={onLoadMore}
        className="h-11 px-8 rounded-xl border border-border bg-surface font-body text-[15px] font-medium text-charcoal transition-all duration-150 hover:bg-warm-sand cursor-pointer"
      >
        Load more
      </button>
      <p className="font-body text-[13px] text-muted-grey">
        Showing {visibleCount} of {totalCount} partner{totalCount === 1 ? "" : "s"}
      </p>
    </div>
  );
}
