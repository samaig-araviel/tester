"use client";

import { useState, useCallback } from "react";
import { User, Check, ChevronRight, Minus, Plus, Shield } from "lucide-react";
import Link from "next/link";
import AvatarModal, { getAvatarBg } from "./AvatarModal";
import {
  savePersonalInfo,
  saveFamilyProfile,
  saveWorkInfo,
  savePrivacyToggle,
  saveAvatar,
} from "@/app/profile/actions";

interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  identity_type: string | null;
  child_count: string;
  child_age_buckets: string[];
  is_expecting: boolean;
  town: string;
  employment_type: string;
  work_location: string;
  working_pattern: string;
  share_data: boolean;
  marketing_opt_in: boolean;
  avatar_url: string | null;
  onboarding_completed: boolean;
}

interface ProfileContentProps {
  profile: ProfileData;
  employerName: string | null;
}

const AGE_BUCKET_OPTIONS = [
  { value: "expecting", label: "Expecting" },
  { value: "0-6m", label: "Parent of child (0-6 months)" },
  { value: "6-24m", label: "Parent of child (6-24 months)" },
  { value: "2-5", label: "Parent of child (2-5 years)" },
  { value: "5-16", label: "Parent of child (5-16 years)" },
];

const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract", "Freelance"];
const WORKING_PATTERNS = ["Full-time", "Part-time", "Flexible"];
const COUNTRIES = [
  "United Kingdom",
  "Ireland",
  "United States",
  "Canada",
  "Australia",
  "Other",
];

function Toast({
  message,
  type,
  visible,
}: {
  message: string;
  type: "success" | "error";
  visible: boolean;
}) {
  if (!visible) return null;
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl shadow-lg font-body text-[14px] font-medium text-white transition-all duration-300 ${
        type === "success" ? "bg-primary" : "bg-error"
      }`}
    >
      {message}
    </div>
  );
}

export default function ProfileContent({
  profile: initialProfile,
  employerName,
}: ProfileContentProps) {
  const [profile, setProfile] = useState(initialProfile);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Personal info form state
  const [firstName, setFirstName] = useState(profile.first_name);
  const [lastName, setLastName] = useState(profile.last_name);
  const [country, setCountry] = useState(profile.country);
  const [personalErrors, setPersonalErrors] = useState<{
    first_name?: string;
    last_name?: string;
  }>({});
  const [personalSaving, setPersonalSaving] = useState(false);

  // Family form state
  const [ageBuckets, setAgeBuckets] = useState<string[]>(
    profile.child_age_buckets
  );
  const [isExpecting, setIsExpecting] = useState(profile.is_expecting);
  const [childCount, setChildCount] = useState(
    parseInt(profile.child_count) || 0
  );
  const [town, setTown] = useState(profile.town);
  const [familySaving, setFamilySaving] = useState(false);

  // Work form state
  const [employmentType, setEmploymentType] = useState(
    profile.employment_type
  );
  const [workLocation, setWorkLocation] = useState(profile.work_location);
  const [workingPattern, setWorkingPattern] = useState(
    profile.working_pattern
  );
  const [workSaving, setWorkSaving] = useState(false);

  // Privacy state
  const [shareData, setShareData] = useState(profile.share_data);
  const [marketingOptIn, setMarketingOptIn] = useState(
    profile.marketing_opt_in
  );
  const [savedField, setSavedField] = useState<string | null>(null);

  const initials =
    (firstName?.[0] ?? "").toUpperCase() +
    (lastName?.[0] ?? "").toUpperCase();

  const showToast = useCallback(
    (message: string, type: "success" | "error") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 2500);
    },
    []
  );

  // Save personal info
  async function handleSavePersonal() {
    const errors: typeof personalErrors = {};
    if (!firstName.trim()) errors.first_name = "This field is required";
    if (!lastName.trim()) errors.last_name = "This field is required";
    setPersonalErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setPersonalSaving(true);
    try {
      await savePersonalInfo({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        country,
      });
      setProfile((p) => ({
        ...p,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        country,
      }));
      showToast("Changes saved", "success");
    } catch {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setPersonalSaving(false);
    }
  }

  // Save family profile
  async function handleSaveFamily() {
    setFamilySaving(true);
    try {
      const buckets = [...ageBuckets];
      if (isExpecting && !buckets.includes("expecting")) {
        buckets.push("expecting");
      }
      if (!isExpecting) {
        const idx = buckets.indexOf("expecting");
        if (idx > -1) buckets.splice(idx, 1);
      }

      await saveFamilyProfile({
        child_age_buckets: buckets,
        child_count: childCount.toString(),
        is_expecting: isExpecting,
        town: town.trim(),
      });
      setProfile((p) => ({
        ...p,
        child_age_buckets: buckets,
        child_count: childCount.toString(),
        is_expecting: isExpecting,
        town: town.trim(),
        onboarding_completed: true,
      }));
      showToast("Changes saved", "success");
    } catch {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setFamilySaving(false);
    }
  }

  // Save work info
  async function handleSaveWork() {
    setWorkSaving(true);
    try {
      await saveWorkInfo({
        employment_type: employmentType,
        work_location: workLocation.trim(),
        working_pattern: workingPattern,
      });
      showToast("Changes saved", "success");
    } catch {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setWorkSaving(false);
    }
  }

  // Privacy toggle
  async function handlePrivacyToggle(
    field: "share_data" | "marketing_opt_in",
    value: boolean
  ) {
    const prev = field === "share_data" ? shareData : marketingOptIn;
    if (field === "share_data") setShareData(value);
    else setMarketingOptIn(value);

    try {
      await savePrivacyToggle(field, value);
      setSavedField(field);
      setTimeout(() => setSavedField(null), 1500);
    } catch {
      if (field === "share_data") setShareData(prev);
      else setMarketingOptIn(prev);
      showToast("Something went wrong. Please try again.", "error");
    }
  }

  // Avatar save
  async function handleAvatarSave(avatarId: string) {
    try {
      await saveAvatar(avatarId);
      setProfile((p) => ({ ...p, avatar_url: avatarId }));
      setShowAvatarModal(false);
      showToast("Avatar updated", "success");
    } catch {
      showToast("Something went wrong. Please try again.", "error");
    }
  }

  function toggleAgeBucket(value: string) {
    setAgeBuckets((prev) =>
      prev.includes(value)
        ? prev.filter((b) => b !== value)
        : [...prev, value]
    );
  }

  const identityLabel =
    profile.identity_type === "parent"
      ? "Parent"
      : profile.identity_type === "expectant"
        ? "Expectant Parent"
        : profile.identity_type
          ? profile.identity_type
          : null;

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-body text-[13px] text-muted-grey mb-6">
        <Link
          href="/dashboard"
          className="hover:text-charcoal transition-colors"
        >
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-charcoal font-medium">Profile</span>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-heading text-[28px] font-bold text-soft-navy mb-1">
          My Profile
        </h1>
        <p className="font-body text-[15px] text-muted-grey">
          Manage your personal details, preferences, and security.
        </p>
      </div>

      {/* Profile Summary Card */}
      <div className="bg-surface rounded-2xl border border-border p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-[72px] h-[72px] rounded-full flex items-center justify-center"
              style={{ backgroundColor: getAvatarBg(profile.avatar_url) }}
            >
              {initials ? (
                <span className="text-white text-xl font-heading font-semibold">
                  {initials}
                </span>
              ) : (
                <User className="w-8 h-8 text-white" />
              )}
            </div>
            <button
              onClick={() => setShowAvatarModal(true)}
              className="font-body text-[13px] text-warm-teal hover:text-primary-hover transition-colors cursor-pointer"
            >
              Change photo
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <h2 className="font-heading text-[20px] font-semibold text-soft-navy truncate">
              {profile.first_name} {profile.last_name}
            </h2>
            <p className="font-body text-[15px] text-muted-grey truncate">
              {profile.email}
            </p>
            {identityLabel && (
              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-warm-teal-light text-warm-teal font-body text-[12px] font-medium">
                {identityLabel}
              </span>
            )}
          </div>

          {/* Employer */}
          {employerName && (
            <div className="text-right">
              <span className="inline-block px-3 py-1.5 rounded-lg bg-primary-light font-body text-[13px] text-soft-navy font-medium">
                {employerName}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Personal Information */}
          <div className="bg-surface rounded-2xl border border-border p-6">
            <h3 className="font-heading text-[18px] font-semibold text-soft-navy mb-6">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-body text-[13px] font-medium text-charcoal mb-1.5">
                  First name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (personalErrors.first_name)
                      setPersonalErrors((p) => ({ ...p, first_name: undefined }));
                  }}
                  className={`w-full h-[44px] px-3 rounded-xl border font-body text-[14px] text-charcoal outline-none transition-colors ${
                    personalErrors.first_name
                      ? "border-error focus:border-error"
                      : "border-border focus:border-primary"
                  }`}
                />
                {personalErrors.first_name && (
                  <p className="mt-1 font-body text-[12px] text-error">
                    {personalErrors.first_name}
                  </p>
                )}
              </div>
              <div>
                <label className="block font-body text-[13px] font-medium text-charcoal mb-1.5">
                  Last name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    if (personalErrors.last_name)
                      setPersonalErrors((p) => ({ ...p, last_name: undefined }));
                  }}
                  className={`w-full h-[44px] px-3 rounded-xl border font-body text-[14px] text-charcoal outline-none transition-colors ${
                    personalErrors.last_name
                      ? "border-error focus:border-error"
                      : "border-border focus:border-primary"
                  }`}
                />
                {personalErrors.last_name && (
                  <p className="mt-1 font-body text-[12px] text-error">
                    {personalErrors.last_name}
                  </p>
                )}
              </div>
              <div className="sm:col-span-1">
                <label className="block font-body text-[13px] font-medium text-charcoal mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={profile.email}
                    readOnly
                    className="w-full h-[44px] px-3 pr-10 rounded-xl border border-border bg-primary-light/20 font-body text-[14px] text-muted-grey outline-none cursor-not-allowed"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <Shield className="w-4 h-4 text-muted-grey" />
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block font-body text-[13px] font-medium text-charcoal mb-1.5">
                  Country
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full h-[44px] px-3 rounded-xl border border-border font-body text-[14px] text-charcoal outline-none focus:border-primary transition-colors bg-surface appearance-none cursor-pointer"
                >
                  <option value="">Select country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSavePersonal}
                disabled={personalSaving}
                className="inline-flex items-center justify-center px-5 h-[40px] rounded-xl bg-primary text-white font-body text-[14px] font-medium transition-all duration-150 hover:bg-primary-hover disabled:opacity-50 cursor-pointer"
              >
                {personalSaving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>

          {/* Card 2: Family Profile */}
          <div className="bg-surface rounded-2xl border border-border p-6">
            <h3 className="font-heading text-[18px] font-semibold text-soft-navy mb-2">
              Family Profile
            </h3>
            <p className="font-body text-[13px] text-muted-grey mb-6">
              Used to personalise benefits and content. Never shared with your employer.
            </p>

            {/* Parental status checkboxes */}
            <div className="mb-5">
              <label className="block font-body text-[13px] font-medium text-charcoal mb-3">
                Parental status
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {AGE_BUCKET_OPTIONS.map((opt) => {
                  const checked =
                    opt.value === "expecting"
                      ? isExpecting
                      : ageBuckets.includes(opt.value);
                  return (
                    <label
                      key={opt.value}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${
                          checked
                            ? "bg-primary border-primary"
                            : "border-border group-hover:border-primary/40"
                        }`}
                      >
                        {checked && (
                          <Check className="w-3.5 h-3.5 text-white" />
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                          if (opt.value === "expecting") {
                            setIsExpecting(!isExpecting);
                          } else {
                            toggleAgeBucket(opt.value);
                          }
                        }}
                        className="sr-only"
                      />
                      <span className="font-body text-[14px] text-charcoal">
                        {opt.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Number of children */}
            <div className="mb-5">
              <label className="block font-body text-[13px] font-medium text-charcoal mb-2">
                Number of children
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setChildCount((c) => Math.max(0, c - 1))
                  }
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary-light transition-colors cursor-pointer"
                  aria-label="Decrease"
                >
                  <Minus className="w-4 h-4 text-charcoal" />
                </button>
                <span className="font-body text-[16px] font-semibold text-soft-navy w-8 text-center">
                  {childCount}
                </span>
                <button
                  onClick={() =>
                    setChildCount((c) => Math.min(10, c + 1))
                  }
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary-light transition-colors cursor-pointer"
                  aria-label="Increase"
                >
                  <Plus className="w-4 h-4 text-charcoal" />
                </button>
              </div>
            </div>

            {/* Town / Postcode */}
            <div className="mb-6">
              <label className="block font-body text-[13px] font-medium text-charcoal mb-1.5">
                Town or postcode
              </label>
              <input
                type="text"
                value={town}
                onChange={(e) => setTown(e.target.value)}
                placeholder="e.g. London, SW1A 1AA"
                className="w-full max-w-xs h-[44px] px-3 rounded-xl border border-border font-body text-[14px] text-charcoal outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveFamily}
                disabled={familySaving}
                className="inline-flex items-center justify-center px-5 h-[40px] rounded-xl bg-primary text-white font-body text-[14px] font-medium transition-all duration-150 hover:bg-primary-hover disabled:opacity-50 cursor-pointer"
              >
                {familySaving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>

          {/* Card 3: Work Information */}
          <div className="bg-surface rounded-2xl border border-border p-6">
            <h3 className="font-heading text-[18px] font-semibold text-soft-navy mb-6">
              Work Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-body text-[13px] font-medium text-charcoal mb-1.5">
                  Employer
                </label>
                <input
                  type="text"
                  value={employerName ?? "Not set"}
                  readOnly
                  className="w-full h-[44px] px-3 rounded-xl border border-border bg-primary-light/20 font-body text-[14px] text-muted-grey outline-none cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block font-body text-[13px] font-medium text-charcoal mb-1.5">
                  Employment type
                </label>
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="w-full h-[44px] px-3 rounded-xl border border-border font-body text-[14px] text-charcoal outline-none focus:border-primary transition-colors bg-surface appearance-none cursor-pointer"
                >
                  <option value="">Select type</option>
                  {EMPLOYMENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-body text-[13px] font-medium text-charcoal mb-1.5">
                  Work location
                </label>
                <input
                  type="text"
                  value={workLocation}
                  onChange={(e) => setWorkLocation(e.target.value)}
                  placeholder="e.g. London"
                  className="w-full h-[44px] px-3 rounded-xl border border-border font-body text-[14px] text-charcoal outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block font-body text-[13px] font-medium text-charcoal mb-1.5">
                  Working pattern
                </label>
                <select
                  value={workingPattern}
                  onChange={(e) => setWorkingPattern(e.target.value)}
                  className="w-full h-[44px] px-3 rounded-xl border border-border font-body text-[14px] text-charcoal outline-none focus:border-primary transition-colors bg-surface appearance-none cursor-pointer"
                >
                  <option value="">Select pattern</option>
                  {WORKING_PATTERNS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSaveWork}
                disabled={workSaving}
                className="inline-flex items-center justify-center px-5 h-[40px] rounded-xl bg-primary text-white font-body text-[14px] font-medium transition-all duration-150 hover:bg-primary-hover disabled:opacity-50 cursor-pointer"
              >
                {workSaving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5">
          <div className="bg-surface rounded-2xl border border-border p-6 sticky top-[88px]">
            <h3 className="font-heading text-[18px] font-semibold text-soft-navy mb-6">
              Preferences & Privacy
            </h3>

            {/* Share data toggle */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex-1">
                <p className="font-body text-[14px] font-medium text-charcoal">
                  Share anonymised usage data
                </p>
                <p className="font-body text-[12px] text-muted-grey mt-0.5">
                  Help us improve Parentfits by sharing anonymous usage patterns
                </p>
                {savedField === "share_data" && (
                  <p className="font-body text-[11px] text-primary mt-1 animate-[fadeSlideIn_150ms_ease-out]">
                    Saved
                  </p>
                )}
              </div>
              <button
                role="switch"
                aria-checked={shareData}
                aria-label="Share anonymised usage data"
                onClick={() => handlePrivacyToggle("share_data", !shareData)}
                className={`relative inline-flex h-6 w-12 shrink-0 items-center rounded-full transition-colors duration-150 cursor-pointer ${
                  shareData ? "bg-warm-teal" : "bg-border"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-150 ${
                    shareData ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Marketing toggle */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex-1">
                <p className="font-body text-[14px] font-medium text-charcoal">
                  Marketing communications
                </p>
                <p className="font-body text-[12px] text-muted-grey mt-0.5">
                  Receive updates about new offers and features
                </p>
                {savedField === "marketing_opt_in" && (
                  <p className="font-body text-[11px] text-primary mt-1 animate-[fadeSlideIn_150ms_ease-out]">
                    Saved
                  </p>
                )}
              </div>
              <button
                role="switch"
                aria-checked={marketingOptIn}
                aria-label="Marketing communications"
                onClick={() =>
                  handlePrivacyToggle("marketing_opt_in", !marketingOptIn)
                }
                className={`relative inline-flex h-6 w-12 shrink-0 items-center rounded-full transition-colors duration-150 cursor-pointer ${
                  marketingOptIn ? "bg-warm-teal" : "bg-border"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-150 ${
                    marketingOptIn ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            <div className="pt-4 border-t border-border">
              <Link
                href="/support#data-protection"
                className="font-body text-[13px] text-warm-teal hover:text-primary-hover transition-colors"
              >
                View Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Modal */}
      {showAvatarModal && (
        <AvatarModal
          currentAvatar={profile.avatar_url}
          initials={initials}
          onSave={handleAvatarSave}
          onClose={() => setShowAvatarModal(false)}
        />
      )}

      {/* Toast */}
      <Toast
        message={toast?.message ?? ""}
        type={toast?.type ?? "success"}
        visible={!!toast}
      />
    </>
  );
}
