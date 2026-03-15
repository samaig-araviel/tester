"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Leaf, LogOut, User } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

function UserMenu() {
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

  const avatarUrl = user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture;

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
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
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
        <div className="absolute right-0 top-12 w-64 bg-surface rounded-xl shadow-lg border border-border overflow-hidden animate-[fadeSlideIn_150ms_ease-out]">
          <div className="px-4 py-3 border-b border-border">
            <p className="font-heading text-sm font-semibold text-text-primary truncate">
              {displayName ?? "User"}
            </p>
            <p className="font-body text-xs text-text-secondary truncate">
              {user?.email}
            </p>
          </div>
          <div className="p-1.5">
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

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-primary" strokeWidth={2.5} />
            <span className="font-heading text-xl font-bold text-primary">
              Parentfits
            </span>
          </div>
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}
