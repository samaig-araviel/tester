"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Leaf,
  LogOut,
  User,
  Heart,
  ChevronDown,
  Bookmark,
} from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import Link from "next/link";

/* ─── Profile Menu ─── */
function ProfileMenu() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email;

  const initials = displayName
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const avatarUrl =
    user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture;

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 cursor-pointer rounded-full transition-all duration-200 hover:ring-2 hover:ring-primary/20"
        aria-label="User menu"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt=""
            className="w-9 h-9 rounded-full object-cover border border-border"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center border border-border">
            {initials ? (
              <span className="text-white text-sm font-heading font-semibold">
                {initials}
              </span>
            ) : (
              <User className="w-4 h-4 text-white" />
            )}
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-64 bg-surface rounded-xl shadow-lg border border-border overflow-hidden animate-[fadeSlideIn_150ms_ease-out] z-50">
          <div className="px-4 py-3 border-b border-border">
            <p className="font-heading text-sm font-semibold text-text-primary truncate">
              {displayName ?? "User"}
            </p>
            <p className="font-body text-xs text-text-secondary truncate">
              {user?.email}
            </p>
          </div>
          <div className="p-1.5">
            <Link
              href="/saved"
              className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-left font-body text-sm text-text-primary hover:bg-primary-light transition-colors"
              onClick={() => setOpen(false)}
            >
              <Bookmark className="w-4 h-4" />
              Saved perks
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-left font-body text-sm text-text-primary hover:bg-primary-light transition-colors"
              onClick={() => setOpen(false)}
            >
              <User className="w-4 h-4" />
              My Profile
            </Link>
            <div className="my-1 border-t border-border" />
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-left font-body text-sm text-text-primary hover:bg-error/5 hover:text-error transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Explore Dropdown ─── */
function ExploreDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 font-body text-[0.9rem] font-medium uppercase tracking-[1px] text-[#2A2A2A] hover:text-[#C96846] transition-colors cursor-pointer"
      >
        Explore Services
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-10 w-52 bg-surface rounded-lg shadow-lg border border-border overflow-hidden animate-[fadeSlideIn_150ms_ease-out] z-50 p-2">
          <Link
            href="/explore/online"
            className="flex items-center h-[44px] px-3 rounded-lg font-body text-[14px] text-charcoal hover:bg-primary-light hover:text-warm-teal transition-colors"
            onClick={() => setOpen(false)}
          >
            Shop online
          </Link>
          <Link
            href="/explore/in-person"
            className="flex items-center h-[44px] px-3 rounded-lg font-body text-[14px] text-charcoal hover:bg-primary-light hover:text-warm-teal transition-colors"
            onClick={() => setOpen(false)}
          >
            Shop in-person
          </Link>
        </div>
      )}
    </div>
  );
}

/* ─── Main Navbar ─── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 4);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 bg-[#F5F1E8] transition-[border-color] duration-200 px-12 py-6 ${
        scrolled ? "border-b border-black/5" : "border-b border-transparent"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <Leaf className="w-9 h-9 text-[#2A2A2A]" strokeWidth={2.5} />
          <span className="font-heading text-[2.5rem] leading-none font-bold tracking-[-1px] text-[#2A2A2A]">
            Parentfits
          </span>
        </Link>

        {/* Centre: Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <ExploreDropdown />
          <Link
            href="/parents-hub"
            className="font-body text-[0.9rem] font-medium uppercase tracking-[1px] text-[#2A2A2A] hover:text-[#C96846] transition-colors"
          >
            Parents Hub
          </Link>
          <Link
            href="/resources"
            className="font-body text-[0.9rem] font-medium uppercase tracking-[1px] text-[#2A2A2A] hover:text-[#C96846] transition-colors"
          >
            Resources
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/saved"
            className="flex items-center justify-center w-[45px] h-[45px] rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:scale-110 transition-transform"
            aria-label="Saved perks"
          >
            <Heart className="w-5 h-5 text-[#C96846] fill-[#C96846]" />
          </Link>
          <ProfileMenu />
        </div>
      </div>
    </nav>
  );
}
