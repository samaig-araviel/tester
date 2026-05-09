"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import type { Coach, AvatarTone } from "@/lib/coaches";

/* ─── Types ─── */

type LeaveType = "maternity" | "paternity" | "shared" | "adoption";
type LeaveStage = "pre" | "during" | "returning";
type SessionFormat = "video" | "phone" | "no-preference";

interface LeaveOption {
  value: LeaveType;
  label: string;
}

interface StageOption {
  value: LeaveStage;
  label: string;
  helper: string;
}

interface FormState {
  leaveType: LeaveType | "";
  stage: LeaveStage | "";
  leaveStartDate: string;
  returnDate: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  preparation: string;
  sessionFormat: SessionFormat | "";
  coachId: string;
}

interface StepConfig {
  shortLabel: string;
  title: string;
  intro: string;
}

/* ─── Static config ─── */

const LEAVE_OPTIONS: LeaveOption[] = [
  { value: "maternity", label: "Maternity leave" },
  { value: "paternity", label: "Paternity leave" },
  { value: "shared", label: "Shared parental leave" },
  { value: "adoption", label: "Adoption leave" },
];

const STAGE_OPTIONS: StageOption[] = [
  {
    value: "pre",
    label: "Preparing to go on leave",
    helper: "I haven't started leave yet",
  },
  {
    value: "during",
    label: "Currently on leave",
    helper: "I'm in the middle of my leave",
  },
  {
    value: "returning",
    label: "Returning to work",
    helper: "I'm preparing to come back or have recently returned",
  },
];

const LEAVE_LABELS: Record<LeaveType, string> = {
  maternity: "Maternity leave",
  paternity: "Paternity leave",
  shared: "Shared parental leave",
  adoption: "Adoption leave",
};

const STAGE_LABELS: Record<LeaveStage, string> = {
  pre: "Preparing to go on leave",
  during: "Currently on leave",
  returning: "Returning to work",
};

const SESSION_FORMAT_OPTIONS: { value: SessionFormat; label: string }[] = [
  { value: "video", label: "Video call (Zoom / Teams)" },
  { value: "phone", label: "Phone call" },
  { value: "no-preference", label: "No preference" },
];

const STEPS: StepConfig[] = [
  {
    shortLabel: "Your leave",
    title: "Tell us about your leave",
    intro:
      "A few quick details help us match you with the right coach for where you are now.",
  },
  {
    shortLabel: "Your details",
    title: "A little about you",
    intro:
      "Share enough for your coach to prepare. The free-text box is optional — write as much or as little as you like.",
  },
  {
    shortLabel: "Pick a coach",
    title: "Choose your coach",
    intro:
      "Every coach is accredited and specialises in parental transitions. Pick whoever feels right.",
  },
  {
    shortLabel: "Confirm",
    title: "Review and confirm",
    intro:
      "One last look. Anything off? Step back and edit before we send your details to your coach.",
  },
];

const AVATAR_TONE_CLASSES: Record<AvatarTone, string> = {
  teal: "bg-warm-teal-light text-warm-teal",
  sage: "bg-primary-light text-soft-navy",
  gold: "bg-[#F4E8CF] text-[#8A6B28]",
  sand: "bg-warm-sand text-muted-grey",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_STATE: FormState = {
  leaveType: "",
  stage: "",
  leaveStartDate: "",
  returnDate: "",
  firstName: "",
  lastName: "",
  email: "",
  jobTitle: "",
  preparation: "",
  sessionFormat: "",
  coachId: "",
};

/* ─── Form primitives ─── */

function FieldLabel({
  children,
  htmlFor,
  helper,
  optional,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  helper?: string;
  optional?: boolean;
}) {
  return (
    <div className="mb-2">
      <label
        htmlFor={htmlFor}
        className="block font-body text-[13px] font-medium text-charcoal"
      >
        {children}
        {optional && (
          <span className="ml-1.5 font-normal text-muted-grey">(optional)</span>
        )}
      </label>
      {helper && (
        <p className="font-body text-[12px] text-muted-grey mt-0.5">{helper}</p>
      )}
    </div>
  );
}

function SectionHeading({
  children,
  helper,
}: {
  children: React.ReactNode;
  helper?: string;
}) {
  return (
    <div className="mb-4">
      <h2 className="font-heading text-[18px] font-semibold text-soft-navy leading-snug">
        {children}
      </h2>
      {helper && (
        <p className="mt-1 font-body text-[13px] text-muted-grey">{helper}</p>
      )}
    </div>
  );
}

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

function TextInput({ id, ...props }: TextInputProps) {
  return (
    <input
      id={id}
      className="w-full h-[48px] bg-surface border border-border rounded-lg px-4 font-body text-[15px] text-text-primary placeholder:text-text-secondary/40 transition-colors duration-150 focus:outline-none focus:border-warm-teal focus:ring-2 focus:ring-warm-teal/20"
      {...props}
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className="w-full min-h-[112px] bg-surface border border-border rounded-lg px-4 py-3 font-body text-[15px] text-text-primary placeholder:text-text-secondary/40 transition-colors duration-150 focus:outline-none focus:border-warm-teal focus:ring-2 focus:ring-warm-teal/20 resize-vertical"
      {...props}
    />
  );
}

function Select({
  id,
  options,
  placeholder,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        className="w-full h-[48px] bg-surface border border-border rounded-lg px-4 pr-10 font-body text-[15px] text-text-primary transition-colors duration-150 focus:outline-none focus:border-warm-teal focus:ring-2 focus:ring-warm-teal/20 appearance-none cursor-pointer"
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-grey pointer-events-none" />
    </div>
  );
}

/* ─── Choice cards (radio-style) ─── */

function RadioDot({ selected }: { selected: boolean }) {
  return (
    <span
      className={`flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full border transition-colors ${
        selected
          ? "border-warm-teal bg-warm-teal"
          : "border-border bg-surface"
      }`}
    >
      {selected && (
        <span className="block h-[7px] w-[7px] rounded-full bg-white" />
      )}
    </span>
  );
}

function ChoiceRow({
  label,
  helper,
  selected,
  onSelect,
}: {
  label: string;
  helper?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`flex w-full items-start gap-3.5 rounded-lg border bg-surface px-4 py-3.5 text-left transition-colors duration-150 cursor-pointer ${
        selected
          ? "border-warm-teal bg-warm-teal-light/30"
          : "border-border hover:border-warm-teal/50"
      }`}
    >
      <span className="mt-[3px]">
        <RadioDot selected={selected} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="font-body text-[15px] font-medium text-charcoal leading-tight">
          {label}
        </span>
        {helper && (
          <span className="mt-1 font-body text-[12.5px] text-muted-grey">
            {helper}
          </span>
        )}
      </span>
    </button>
  );
}

function CoachCard({
  coach,
  selected,
  onSelect,
}: {
  coach: Coach;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`group relative flex flex-col rounded-lg border bg-surface p-5 text-left transition-colors duration-150 cursor-pointer ${
        selected
          ? "border-warm-teal bg-warm-teal-light/25"
          : "border-border hover:border-warm-teal/50"
      }`}
    >
      <span className="absolute top-4 right-4">
        <RadioDot selected={selected} />
      </span>
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full font-heading text-[13px] font-bold ${AVATAR_TONE_CLASSES[coach.avatarTone]}`}
      >
        {coach.initials}
      </span>
      <p className="mt-3 font-heading text-[16px] font-semibold text-soft-navy leading-snug">
        {coach.name}
      </p>
      <p className="mt-1 font-body text-[13px] text-muted-grey leading-relaxed">
        {coach.specialism}
      </p>
      {coach.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {coach.tags.map((tag) => (
            <span
              key={tag}
              className="font-body text-[11.5px] text-muted-grey"
            >
              · {tag}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}

/* ─── Page header ─── */

function PageHeader({
  currentStep,
  total,
}: {
  currentStep: number;
  total: number;
}) {
  const step = STEPS[currentStep];
  return (
    <header className="mb-8">
      <p className="font-body text-[11px] tracking-[0.18em] uppercase text-warm-teal">
        Step {String(currentStep + 1).padStart(2, "0")} of{" "}
        {String(total).padStart(2, "0")}
      </p>
      <h1 className="mt-3 font-heading text-[30px] sm:text-[36px] leading-[1.1] font-bold text-soft-navy">
        {step.title}
      </h1>
      <p className="mt-3 font-body text-[15px] text-muted-grey leading-relaxed max-w-[560px]">
        {step.intro}
      </p>

      <div className="mt-7 grid grid-cols-4 gap-2">
        {STEPS.map((s, i) => {
          const reached = i <= currentStep;
          const current = i === currentStep;
          return (
            <div key={s.shortLabel} className="flex flex-col gap-2">
              <div
                className={`h-[2px] rounded-full transition-colors duration-300 ${
                  reached ? "bg-warm-teal" : "bg-border"
                }`}
              />
              <p
                className={`font-body text-[11px] sm:text-[12px] tracking-wide leading-tight ${
                  current
                    ? "text-charcoal font-medium"
                    : reached
                    ? "text-warm-teal"
                    : "text-muted-grey"
                }`}
              >
                {s.shortLabel}
              </p>
            </div>
          );
        })}
      </div>
    </header>
  );
}

/* ─── Success screen ─── */

function SuccessScreen({
  coachName,
  onRestart,
}: {
  coachName: string;
  onRestart: () => void;
}) {
  return (
    <article className="bg-surface rounded-2xl border border-border px-6 sm:px-10 py-12 sm:py-16">
      <div className="max-w-[520px] mx-auto">
        <p className="font-body text-[11px] tracking-[0.18em] uppercase text-warm-teal">
          Confirmed
        </p>
        <h1 className="mt-3 font-heading text-[32px] sm:text-[40px] leading-[1.1] font-bold text-soft-navy">
          Your coach is on the way.
        </h1>
        <p className="mt-5 font-body text-[15px] text-charcoal leading-relaxed">
          We&apos;ve passed your details to{" "}
          <span className="font-semibold text-soft-navy">{coachName}</span>.
          They&apos;ll be in touch within two working days to arrange a time
          that fits.
        </p>

        <hr className="my-8 border-t border-border" />

        <p className="font-body text-[11px] tracking-[0.18em] uppercase text-muted-grey">
          What happens next
        </p>
        <ol className="mt-4 space-y-3.5">
          {[
            "Your coach receives your registration details.",
            "They reach out by email to agree a session time.",
            "Your 45–60 minute session takes place by video or phone.",
            "You share feedback after your session.",
          ].map((item, i) => (
            <li
              key={item}
              className="flex gap-4 font-body text-[14px] text-charcoal leading-relaxed"
            >
              <span className="font-heading text-[14px] font-semibold text-warm-teal w-5 flex-shrink-0 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link
            href="/parents-hub"
            className="inline-flex items-center justify-center gap-2 h-[48px] px-6 rounded-lg bg-warm-teal text-white font-body text-[14px] font-semibold transition-colors duration-200 hover:bg-primary-hover"
          >
            Back to Parents Hub
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center justify-center h-[48px] px-6 rounded-lg font-body text-[14px] font-medium text-muted-grey hover:text-charcoal transition-colors duration-200 cursor-pointer"
          >
            Register another leave
          </button>
        </div>
      </div>
    </article>
  );
}

/* ─── Main component ─── */

export default function ParentalLeaveRegistration({
  coaches,
}: {
  coaches: Coach[];
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const selectedCoach = useMemo(
    () => coaches.find((c) => c.id === form.coachId) ?? null,
    [coaches, form.coachId]
  );

  const update = useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors([]);
    },
    []
  );

  const scrollToTop = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const validateStep = useCallback(
    (step: number): string[] => {
      const issues: string[] = [];
      if (step === 0) {
        if (!form.leaveType) issues.push("Please select the type of leave.");
        if (!form.stage)
          issues.push("Let us know where you are in your leave journey.");
        if (
          form.leaveStartDate &&
          form.returnDate &&
          form.returnDate < form.leaveStartDate
        ) {
          issues.push("Return date can't be before your leave start date.");
        }
      }
      if (step === 1) {
        if (!form.firstName.trim()) issues.push("Please add your first name.");
        if (!form.lastName.trim()) issues.push("Please add your last name.");
        if (!form.email.trim()) issues.push("Please add your work email.");
        else if (!EMAIL_PATTERN.test(form.email.trim()))
          issues.push("That email doesn't look quite right — can you check it?");
        if (!form.sessionFormat)
          issues.push("Please choose your preferred session format.");
      }
      if (step === 2) {
        if (!form.coachId) issues.push("Please choose a coach to continue.");
      }
      return issues;
    },
    [form]
  );

  const handleNext = useCallback(() => {
    const issues = validateStep(currentStep);
    if (issues.length > 0) {
      setErrors(issues);
      return;
    }
    setErrors([]);
    setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
    scrollToTop();
  }, [currentStep, validateStep, scrollToTop]);

  const handleBack = useCallback(() => {
    setErrors([]);
    setCurrentStep((s) => Math.max(s - 1, 0));
    scrollToTop();
  }, [scrollToTop]);

  const handleConfirm = useCallback(() => {
    setSubmitted(true);
    scrollToTop();
  }, [scrollToTop]);

  const handleRestart = useCallback(() => {
    setForm(INITIAL_STATE);
    setErrors([]);
    setCurrentStep(0);
    setSubmitted(false);
    scrollToTop();
  }, [scrollToTop]);

  const isLastStep = currentStep === STEPS.length - 1;

  /* ─── Step bodies ─── */

  const stepContent: React.ReactNode[] = [
    // Step 1 — Your leave
    <div key="step-0" className="space-y-9">
      <section>
        <SectionHeading>Type of leave</SectionHeading>
        <div role="radiogroup" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LEAVE_OPTIONS.map((option) => (
            <ChoiceRow
              key={option.value}
              label={option.label}
              selected={form.leaveType === option.value}
              onSelect={() => update("leaveType", option.value)}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading>Where are you in your leave journey?</SectionHeading>
        <div role="radiogroup" className="flex flex-col gap-3">
          {STAGE_OPTIONS.map((option) => (
            <ChoiceRow
              key={option.value}
              label={option.label}
              helper={option.helper}
              selected={form.stage === option.value}
              onSelect={() => update("stage", option.value)}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading helper="Approximate dates are fine — your coach won't hold you to them.">
          Your dates
        </SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <FieldLabel htmlFor="leaveStartDate" optional>
              Expected leave start
            </FieldLabel>
            <TextInput
              id="leaveStartDate"
              type="date"
              value={form.leaveStartDate}
              onChange={(e) => update("leaveStartDate", e.target.value)}
            />
          </div>
          <div>
            <FieldLabel htmlFor="returnDate" optional>
              Expected return
            </FieldLabel>
            <TextInput
              id="returnDate"
              type="date"
              value={form.returnDate}
              onChange={(e) => update("returnDate", e.target.value)}
            />
          </div>
        </div>
      </section>
    </div>,

    // Step 2 — Your details
    <div key="step-1" className="space-y-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FieldLabel htmlFor="firstName">First name</FieldLabel>
          <TextInput
            id="firstName"
            placeholder="Sarah"
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            autoComplete="given-name"
          />
        </div>
        <div>
          <FieldLabel htmlFor="lastName">Last name</FieldLabel>
          <TextInput
            id="lastName"
            placeholder="Johnson"
            value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            autoComplete="family-name"
          />
        </div>
      </div>

      <div>
        <FieldLabel
          htmlFor="email"
          helper="We'll only use this to put your coach in touch."
        >
          Work email
        </FieldLabel>
        <TextInput
          id="email"
          type="email"
          placeholder="sarah.johnson@company.com"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          autoComplete="email"
        />
      </div>

      <div>
        <FieldLabel htmlFor="jobTitle" optional>
          Job title
        </FieldLabel>
        <TextInput
          id="jobTitle"
          placeholder="e.g. Senior Marketing Manager"
          value={form.jobTitle}
          onChange={(e) => update("jobTitle", e.target.value)}
          autoComplete="organization-title"
        />
      </div>

      <div>
        <FieldLabel htmlFor="preparation" optional>
          Anything you&apos;d like your coach to know?
        </FieldLabel>
        <TextArea
          id="preparation"
          placeholder="Worries, questions, hopes for the session — whatever's useful."
          value={form.preparation}
          onChange={(e) => update("preparation", e.target.value)}
        />
      </div>

      <div>
        <FieldLabel htmlFor="sessionFormat">Preferred session format</FieldLabel>
        <Select
          id="sessionFormat"
          value={form.sessionFormat}
          onChange={(e) =>
            update("sessionFormat", e.target.value as SessionFormat | "")
          }
          options={SESSION_FORMAT_OPTIONS}
          placeholder="Select a preference"
        />
      </div>
    </div>,

    // Step 3 — Pick a coach
    <div key="step-2" className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border pb-4">
        <p className="font-heading text-[15px] font-semibold text-soft-navy">
          {coaches.length} coaches available
        </p>
        <p className="font-body text-[12.5px] text-muted-grey">
          Funded by your employer · Free to you
        </p>
      </div>

      <div role="radiogroup" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {coaches.map((coach) => (
          <CoachCard
            key={coach.id}
            coach={coach}
            selected={form.coachId === coach.id}
            onSelect={() => update("coachId", coach.id)}
          />
        ))}
      </div>
    </div>,

    // Step 4 — Confirm
    <div key="step-3" className="space-y-6">
      <dl className="divide-y divide-border">
        <SummaryRow
          label="Leave type"
          value={form.leaveType ? LEAVE_LABELS[form.leaveType] : "—"}
        />
        <SummaryRow
          label="Stage"
          value={form.stage ? STAGE_LABELS[form.stage] : "—"}
        />
        {form.leaveStartDate && (
          <SummaryRow
            label="Leave start"
            value={formatDate(form.leaveStartDate)}
          />
        )}
        {form.returnDate && (
          <SummaryRow
            label="Expected return"
            value={formatDate(form.returnDate)}
          />
        )}
        <SummaryRow
          label="Your name"
          value={`${form.firstName} ${form.lastName}`.trim() || "—"}
        />
        <SummaryRow label="Work email" value={form.email || "—"} />
        {form.jobTitle && <SummaryRow label="Job title" value={form.jobTitle} />}
        {form.sessionFormat && (
          <SummaryRow
            label="Session format"
            value={
              SESSION_FORMAT_OPTIONS.find((o) => o.value === form.sessionFormat)
                ?.label ?? "—"
            }
          />
        )}
        <SummaryRow label="Your coach" value={selectedCoach?.name ?? "—"} />
        <SummaryRow label="Cost" value="Free — covered by your employer" accent />
      </dl>

      <p className="font-body text-[13px] text-muted-grey leading-relaxed">
        Once you confirm, your coach will reach out within{" "}
        <span className="font-semibold text-charcoal">two working days</span>{" "}
        to arrange a time that works for you. Sessions run 45–60 minutes by video
        or phone.
      </p>
    </div>,
  ];

  /* ─── Render ─── */

  return (
    <div className="min-h-screen bg-onboarding-bg">
      {/* Breadcrumb */}
      <div className="max-w-[800px] mx-auto px-5 sm:px-8 pt-6 pb-2">
        <nav className="flex items-center gap-1.5 font-body text-[13px]">
          <Link
            href="/parents-hub"
            className="text-muted-grey hover:text-warm-teal transition-colors"
          >
            Parents Hub
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-muted-grey" />
          <span className="text-charcoal font-medium">
            Register your parental leave
          </span>
        </nav>
      </div>

      <div
        ref={formRef}
        className="max-w-[800px] mx-auto px-5 sm:px-8 pt-6 pb-20"
      >
        {submitted ? (
          <div className="animate-[fadeSlideIn_400ms_ease-out]">
            <SuccessScreen
              coachName={selectedCoach?.name ?? "your coach"}
              onRestart={handleRestart}
            />
          </div>
        ) : (
          <>
            <PageHeader currentStep={currentStep} total={STEPS.length} />

            <div className="bg-surface rounded-2xl border border-border p-6 sm:p-9">
              <div
                key={currentStep}
                className="animate-[fadeSlideIn_250ms_ease-out]"
              >
                {stepContent[currentStep]}
              </div>

              {errors.length > 0 && (
                <div className="mt-7 rounded-lg bg-error/5 border border-error/20 p-4 animate-[fadeSlideIn_200ms_ease-out]">
                  <ul className="space-y-1.5">
                    {errors.map((err) => (
                      <li
                        key={err}
                        className="font-body text-[13px] text-error flex items-start gap-2"
                      >
                        <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-error flex-shrink-0" />
                        {err}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-4 h-[44px] rounded-lg font-body text-[14px] font-medium text-muted-grey transition-colors duration-150 hover:text-charcoal disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                {isLastStep ? (
                  <button
                    type="button"
                    onClick={handleConfirm}
                    className="flex items-center gap-2 px-6 h-[48px] rounded-lg bg-warm-teal text-white font-body text-[15px] font-semibold transition-colors duration-200 hover:bg-primary-hover cursor-pointer"
                  >
                    Confirm &amp; send to coach
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 h-[48px] rounded-lg bg-warm-teal text-white font-body text-[15px] font-semibold transition-colors duration-200 hover:bg-primary-hover cursor-pointer"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Helpers ─── */

function SummaryRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3.5">
      <dt className="font-body text-[13px] text-muted-grey flex-shrink-0">
        {label}
      </dt>
      <dd
        className={`font-body text-[14px] text-right ${
          accent ? "font-semibold text-warm-teal" : "font-medium text-charcoal"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
