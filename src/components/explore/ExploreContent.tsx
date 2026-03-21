"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import ExploreHero from "./ExploreHero";
import CategoryStrip from "./CategoryStrip";
import FilterSortRow from "./FilterSortRow";
import FilterDrawer from "./FilterDrawer";
import VendorGrid from "./VendorGrid";
import LoadMore from "./LoadMore";
import {
  type PageType,
  type ExploreVendor,
  type UserProfile,
  SORT_OPTIONS_ONLINE,
  SORT_OPTIONS_IN_PERSON,
  recommendationScore,
} from "@/lib/explore";

const PAGE_SIZE = 16;

interface ExploreContentProps {
  pageType: PageType;
  vendors: ExploreVendor[];
  userProfile: UserProfile;
  userId: string;
}

export default function ExploreContent({
  pageType,
  vendors,
  userProfile,
  userId,
}: ExploreContentProps) {
  const router = useRouter();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [ageFilters, setAgeFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("recommended");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Debounce search
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(value);
      setVisibleCount(PAGE_SIZE); // Reset pagination on search
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  // Sort options
  const sortOptions =
    pageType === "online" ? SORT_OPTIONS_ONLINE : SORT_OPTIONS_IN_PERSON;

  // Filter + sort pipeline
  const filteredVendors = useMemo(() => {
    let result = [...vendors];

    // Search filter
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.trim().toLowerCase();
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          (v.short_descriptor ?? "").toLowerCase().includes(q)
      );
    }

    // Category filter
    if (activeCategories.length > 0) {
      result = result.filter((v) => {
        const cat = v.category ?? "";
        return activeCategories.some((c) =>
          cat.toLowerCase().includes(c.toLowerCase())
        );
      });
    }

    // Age filter
    if (ageFilters.length > 0) {
      result = result.filter((v) => {
        const ageRel = v.age_relevance ?? [];
        const ageRelJoined = (Array.isArray(ageRel) ? ageRel.join(" ") : String(ageRel)).toLowerCase();
        return ageFilters.some((bucket) =>
          ageRelJoined.includes(bucket.toLowerCase())
        );
      });
    }

    // Sort
    switch (sortBy) {
      case "recommended":
        result.sort(
          (a, b) =>
            recommendationScore(b, userProfile) -
            recommendationScore(a, userProfile)
        );
        break;
      case "popular":
        result.sort(
          (a, b) => (b.priority_weight ?? 0) - (a.priority_weight ?? 0)
        );
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
    }

    return result;
  }, [vendors, debouncedSearch, activeCategories, ageFilters, sortBy, userProfile]);

  // Visible slice
  const visibleVendors = filteredVendors.slice(0, visibleCount);

  // Category toggle
  function toggleCategory(key: string) {
    setActiveCategories((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
    setVisibleCount(PAGE_SIZE);
  }

  function clearCategories() {
    setActiveCategories([]);
    setVisibleCount(PAGE_SIZE);
  }

  // Filters
  const filterCount = ageFilters.length;

  function clearAllFilters() {
    setAgeFilters([]);
    setActiveCategories([]);
    setVisibleCount(PAGE_SIZE);
  }

  function clearSearch() {
    setSearchQuery("");
    setDebouncedSearch("");
    setVisibleCount(PAGE_SIZE);
  }

  // Navigation
  function handleVendorClick(offerId: string) {
    router.push(`/offer/${offerId}`);
  }

  return (
    <>
      <ExploreHero
        pageType={pageType}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <CategoryStrip
        pageType={pageType}
        activeCategories={activeCategories}
        onToggle={toggleCategory}
        onClear={clearCategories}
      />

      <FilterSortRow
        sortBy={sortBy}
        onSortChange={(key) => {
          setSortBy(key);
          setVisibleCount(PAGE_SIZE);
        }}
        filterCount={filterCount}
        onOpenFilter={() => setFilterDrawerOpen(true)}
        sortOptions={sortOptions}
      />

      <VendorGrid
        vendors={visibleVendors}
        pageType={pageType}
        onVendorClick={handleVendorClick}
        hasActiveFilters={activeCategories.length > 0 || ageFilters.length > 0}
        hasSearchQuery={debouncedSearch.trim().length > 0}
        onClearFilters={clearAllFilters}
        onClearSearch={clearSearch}
      />

      <LoadMore
        visibleCount={visibleVendors.length}
        totalCount={filteredVendors.length}
        onLoadMore={() => setVisibleCount((c) => c + PAGE_SIZE)}
      />

      <FilterDrawer
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        ageFilters={ageFilters}
        onApply={setAgeFilters}
        onClear={() => setAgeFilters([])}
      />
    </>
  );
}
