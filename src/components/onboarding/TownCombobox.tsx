"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Search, X } from "lucide-react";
import ukTowns from "@/data/uk-towns.json";

interface Town {
  name: string;
  county: string;
}

interface TownComboboxProps {
  value: string | null;
  county: string | null;
  onSelect: (town: string, county: string) => void;
}

const ITEM_HEIGHT = 56;
const MAX_VISIBLE = 6;

export default function TownCombobox({ value, county, onSelect }: TownComboboxProps) {
  const [query, setQuery] = useState(value || "");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () =>
      (ukTowns as Town[]).filter((t) =>
        t.name.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  const listHeight = Math.min(filtered.length, MAX_VISIBLE) * ITEM_HEIGHT;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setHighlightIndex(0);
    if (listContainerRef.current) {
      listContainerRef.current.scrollTop = 0;
    }
  }, [query]);

  const handleSelect = useCallback(
    (town: Town) => {
      setQuery(town.name);
      setIsOpen(false);
      onSelect(town.name, town.county);
    },
    [onSelect]
  );

  function scrollToIndex(index: number) {
    const container = listContainerRef.current;
    if (!container) return;
    const itemTop = index * ITEM_HEIGHT;
    const itemBottom = itemTop + ITEM_HEIGHT;
    if (itemTop < container.scrollTop) {
      container.scrollTop = itemTop;
    } else if (itemBottom > container.scrollTop + container.clientHeight) {
      container.scrollTop = itemBottom - container.clientHeight;
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightIndex((i) => {
          const next = Math.min(i + 1, filtered.length - 1);
          scrollToIndex(next);
          return next;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightIndex((i) => {
          const next = Math.max(i - 1, 0);
          scrollToIndex(next);
          return next;
        });
        break;
      case "Enter":
        e.preventDefault();
        if (filtered[highlightIndex]) {
          handleSelect(filtered[highlightIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-secondary pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Start typing your town or city..."
          className="w-full pl-10 pr-10 py-3 rounded-xl border-2 border-border bg-white font-body text-[14px] text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light transition-colors"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
              onSelect("", "");
              inputRef.current?.focus();
            }}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Selected display */}
      {value && county && !isOpen && (
        <p className="mt-2 font-body text-[13px] text-text-secondary">
          Selected: <span className="font-medium text-text-primary">{value}</span>, {county}
        </p>
      )}

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-border rounded-xl shadow-lg overflow-hidden">
          {filtered.length > 0 ? (
            <div
              ref={listContainerRef}
              style={{ maxHeight: listHeight }}
              className="overflow-y-auto"
            >
              {filtered.map((town, index) => (
                <div
                  key={`${town.name}-${town.county}`}
                  style={{ height: ITEM_HEIGHT }}
                  className={`flex flex-col justify-center px-4 cursor-pointer transition-colors ${
                    index === highlightIndex
                      ? "bg-primary-light/50"
                      : "hover:bg-gray-50"
                  }`}
                  onMouseEnter={() => setHighlightIndex(index)}
                  onClick={() => handleSelect(town)}
                >
                  <span className="font-body text-[14px] font-medium text-text-primary">
                    {town.name}
                  </span>
                  <span className="font-body text-[12px] text-text-secondary">
                    {town.county}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-6 text-center">
              <p className="font-body text-[14px] text-text-secondary">
                We couldn&apos;t find that town. Try a different spelling.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
