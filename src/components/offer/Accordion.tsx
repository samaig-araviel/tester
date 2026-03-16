"use client";

import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  activeId: string | null;
  onToggle: (id: string) => void;
}

export default function Accordion({ items, activeId, onToggle }: AccordionProps) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = activeId === item.id;
        return (
          <div
            key={item.id}
            className="border border-border rounded-xl overflow-hidden transition-all duration-150"
          >
            <button
              onClick={() => onToggle(item.id)}
              className="w-full flex items-center justify-between px-4 cursor-pointer"
              style={{ minHeight: 56 }}
            >
              <span className="font-body text-[16px] font-medium text-charcoal">
                {item.title}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-muted-grey flex-shrink-0 transition-transform duration-150 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-150 ease-in-out ${
                isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-4 pb-4 font-body text-[14px] text-charcoal leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
