"use client";

import { useState } from "react";
import { X, User } from "lucide-react";

const AVATAR_OPTIONS = [
  { id: "avatar-01", bg: "#0F7B6C", label: "Teal" },
  { id: "avatar-02", bg: "#E8927C", label: "Coral" },
  { id: "avatar-03", bg: "#7C9EB2", label: "Steel Blue" },
  { id: "avatar-04", bg: "#B8860B", label: "Gold" },
  { id: "avatar-05", bg: "#8FBC8F", label: "Sage" },
  { id: "avatar-06", bg: "#CD853F", label: "Sandy" },
  { id: "avatar-07", bg: "#6B5B95", label: "Purple" },
  { id: "avatar-08", bg: "#88B04B", label: "Green" },
  { id: "avatar-09", bg: "#F7786B", label: "Salmon" },
  { id: "avatar-10", bg: "#5B5EA6", label: "Indigo" },
  { id: "avatar-11", bg: "#9B2335", label: "Berry" },
  { id: "avatar-12", bg: "#55B4B0", label: "Aqua" },
];

interface AvatarModalProps {
  currentAvatar: string | null;
  initials: string;
  onSave: (avatarId: string) => void;
  onClose: () => void;
}

export default function AvatarModal({
  currentAvatar,
  initials,
  onSave,
  onClose,
}: AvatarModalProps) {
  const [selected, setSelected] = useState(currentAvatar ?? "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-surface rounded-2xl shadow-xl w-full max-w-[480px] mx-4 p-8 animate-[fadeSlideIn_150ms_ease-out]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary-light transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-muted-grey" />
        </button>

        <h2 className="font-heading text-[20px] font-semibold text-soft-navy mb-6">
          Choose your avatar
        </h2>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {AVATAR_OPTIONS.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => setSelected(avatar.id)}
              className={`flex items-center justify-center w-[72px] h-[72px] rounded-full mx-auto transition-all duration-150 cursor-pointer ${
                selected === avatar.id
                  ? "ring-[3px] ring-warm-teal ring-offset-2"
                  : "hover:ring-2 hover:ring-border"
              }`}
              style={{ backgroundColor: avatar.bg }}
              aria-label={avatar.label}
            >
              {initials ? (
                <span className="text-white text-lg font-heading font-semibold">
                  {initials}
                </span>
              ) : (
                <User className="w-7 h-7 text-white" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            onClick={onClose}
            className="font-body text-[14px] text-muted-grey hover:text-charcoal transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selected) onSave(selected);
            }}
            disabled={!selected}
            className="inline-flex items-center justify-center px-6 h-[44px] rounded-xl bg-primary text-white font-body text-[15px] font-medium transition-all duration-150 hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export function getAvatarBg(avatarId: string | null): string {
  if (!avatarId) return "#0F7B6C";
  const avatar = AVATAR_OPTIONS.find((a) => a.id === avatarId);
  return avatar?.bg ?? "#0F7B6C";
}
