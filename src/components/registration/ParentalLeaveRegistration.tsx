"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Baby,
  Check,
  ChevronDown,
  ChevronRight,
  HeartHandshake,
  Sparkles,
  UserPlus,
  Users,
} from "lucide-react";

/* ─── Types ─── */

type LeaveType = "maternity" | "paternity" | "shared" | "adoption";
type LeaveStage = "pre" | "during" | "returning";
type SessionFormat = "video" | "phone" | "no-preference";
type AvatarTone = "teal" | "sage" | "gold" | "sand";

interface LeaveOption {
  value: LeaveType;
  label: string;
  helper?: string;
}

interface StageOption {
  value: LeaveStage;
  label: string;
  helper: string;
}

interface Coach {
  id: string;
  name: string;
  initials: string;
  specialism: string;
  tags: string[];
  avatarTone: AvatarTone;
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
  label: string;
  sidebarTitle: string;
  sidebarDescription: string;
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

const COACHES: Coach[] = [
  {
    id: "sarah-turner",
    name: "Sarah Turner",
    initials: "ST",
    specialism: "Parental transition & executive coaching",
    tags: ["Return to work", "Identity shift", "Leadership"],
    avatarTone: "teal",
  },
  {
    id: "lisa-boyd",
    name: "Lisa Boyd",
    initials: "LB",
    specialism: "Executive & parental transition coaching",
    tags: ["Confidence", "Career planning", "Balance"],
    avatarTone: "sage",
  },
  {
    id: "suzy-stollery",
    name: "Suzy Stollery",
    initials: "SS",
    specialism: "Accredited parental transition coach",
    tags: ["Pre-leave prep", "Wellbeing"],
    avatarTone: "gold",
  },
  {
    id: "ian-dinwiddy",
    name: "Ian Dinwiddy",
    initials: "ID",
    specialism: "Working parent coach",
    tags: ["Paternity", "Working dads", "Shared leave"],
    avatarTone: "sand",
  },
];

const STEPS: StepConfig[] = [
  {
    label: "Your leave",
    sidebarTitle: "Your leave",
    sidebarDescription:
      "Tell us about your leave so we can match you with the right coach and tailor your session to where you are right now.",
  },
  {
    label: "Your details",
    sidebarTitle: "A little about you",
    sidebarDescription:
      "Share a few details so your coach can prepare. Anything on your mind — worries, questions, hopes — helps them tailor the conversation.",
  },
  {
    label: "Pick a coach",
    sidebarTitle: "Choose your coach",
    sidebarDescription:
      "Every coach is accredited and specialises in parental transitions. Pick who feels right — they'll reach out to arrange a time that fits.",
  },
  {
    label: "Confirm",
    sidebarTitle: "Confirm your registration",
    sidebarDescription:
      "One last check before we send your details to your coach. You can update anything you need before confirming.",
  },
];

const AVATAR_TONE_CLASSES: Record<AvatarTone, string> = {
  teal: "bg-warm-teal-light text-warm-teal",
  sage: "bg-primary-light text-soft-navy",
  gold: "bg-[#F4E8CF] text-[#8A6B28]",
  sand: "bg-warm-sand text-muted-grey",
};

const LEAVE_ICON: Record<LeaveType, React.ElementType> = {
  maternity: Baby,
  paternity: Baby,
  shared: Users,
  adoption: UserPlus,
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
        className="block font-body text-[13px] font-medium text-muted-grey"
      >
        {children}
        {optional && (
          <span className="ml-1.5 font-normal text-muted-grey/70">
            (optional)
          </span>
        )}
      </label>
      {helper && (
        <p className="font-body text-[11px] text-text-secondary mt-0.5">
          {helper}
        </p>
      )}
    </div>
  );
}

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

function TextInput({ id, ...props }: TextInputProps) {
  return (
    <input
      id={id}
      className="w-full h-[48px] bg-surface border border-border rounded-xl px-4 font-body text-[15px] text-text-primary placeholder:text-text-secondary/40 transition-all duration-200 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary-light"
      {...props}
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className="w-full min-h-[96px] bg-surface border border-border rounded-xl px-4 py-3 font-body text-[15px] text-text-primary placeholder:text-text-secondary/40 transition-all duration-200 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary-light resize-vertical"
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
        className="w-full h-[48px] bg-surface border border-border rounded-xl px-4 pr-10 font-body text-[15px] text-text-primary transition-all duration-200 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary-light appearance-none cursor-pointer"
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

/* ─── Selection cards ─── */

function LeaveTypeCard({
  option,
  selected,
  onSelect,
}: {
  option: LeaveOption;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = LEAVE_ICON[option.value];
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`group flex w-full items-center gap-4 rounded-xl border bg-surface p-4 text-left transition-all duration-200 cursor-pointer ${
        selected
          ? "border-warm-teal bg-warm-teal-light/60 shadow-[0_8px_24px_-16px_rgba(20,130,124,0.35)]"
          : "border-border hover:border-warm-teal/50 hover:bg-warm-sand/40"
      }`}
    >
      <span
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-colors ${
          selected
            ? "bg-warm-teal text-white"
            : "bg-warm-sand text-soft-navy group-hover:bg-warm-teal-light"
        }`}
      >
        <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
      </span>
      <span className="font-body text-[14px] font-medium text-charcoal">
        {option.label}
      </span>
      <span className="ml-auto">
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
            selected
              ? "border-warm-teal bg-warm-teal"
              : "border-border bg-surface"
          }`}
        >
          {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
        </span>
      </span>
    </button>
  );
}

function StageCard({
  option,
  selected,
  onSelect,
}: {
  option: StageOption;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`group flex w-full items-start gap-4 rounded-xl border bg-surface p-4 text-left transition-all duration-200 cursor-pointer ${
        selected
          ? "border-warm-teal bg-warm-teal-light/60 shadow-[0_8px_24px_-16px_rgba(20,130,124,0.35)]"
          : "border-border hover:border-warm-teal/50 hover:bg-warm-sand/40"
      }`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border transition-all ${
          selected
            ? "border-warm-teal bg-warm-teal"
            : "border-border bg-surface"
        }`}
      >
        {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="font-body text-[14px] font-medium text-charcoal">
          {option.label}
        </span>
        <span className="mt-0.5 font-body text-[12px] text-muted-grey">
          {option.helper}
        </span>
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
      className={`group relative flex flex-col rounded-xl border bg-surface p-4 text-left transition-all duration-200 cursor-pointer ${
        selected
          ? "border-warm-teal bg-warm-teal-light/40 shadow-[0_10px_30px_-18px_rgba(20,130,124,0.45)]"
          : "border-border hover:border-warm-teal/50 hover:bg-warm-sand/40"
      }`}
    >
      <span
        className={`absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
          selected
            ? "border-warm-teal bg-warm-teal"
            : "border-border bg-surface"
        }`}
      >
        {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </span>
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-full font-heading text-[14px] font-bold ${AVATAR_TONE_CLASSES[coach.avatarTone]}`}
      >
        {coach.initials}
      </span>
      <p className="mt-3 font-body text-[14px] font-semibold text-charcoal">
        {coach.name}
      </p>
      <p className="mt-1 font-body text-[12px] text-muted-grey leading-relaxed">
        {coach.specialism}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {coach.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2 py-0.5 rounded-md border border-border bg-warm-sand/60 font-body text-[11px] text-muted-grey"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}

/* ─── Step indicator ─── */

function StepIndicator({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <div className="flex items-center w-full">
      {STEPS.map((step, i) => {
        const isCompleted = i < currentStep;
        const isCurrent = i === currentStep;
        const isLast = i === totalSteps - 1;

        return (
          <div key={step.label} className="flex items-center flex-1 last:flex-initial">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-heading font-semibold transition-all duration-300 ${
                  isCompleted
                    ? "bg-warm-teal text-white"
                    : isCurrent
                    ? "bg-warm-teal text-white ring-4 ring-warm-teal-light"
                    : "bg-warm-sand text-muted-grey border border-border"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" strokeWidth={3} />
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`font-body text-[11px] sm:text-[12px] font-medium whitespace-nowrap ${
                  isCurrent ? "text-charcoal" : "text-muted-grey"
                }`}
              >
                {step.label}
              </span>
            </div>

            {!isLast && (
              <div className="flex-1 mx-2 sm:mx-3 mt-[-18px]">
                <div
                  className={`h-[2px] rounded-full transition-all duration-300 ${
                    isCompleted ? "bg-warm-teal" : "bg-border"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
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
    <div className="bg-surface rounded-2xl border border-border px-6 py-12 sm:py-14">
      <div className="max-w-[460px] mx-auto text-center">
        <div className="w-14 h-14 rounded-full bg-warm-teal-light flex items-center justify-center mx-auto mb-5">
          <Check className="w-7 h-7 text-warm-teal" strokeWidth={2.5} />
        </div>
        <h2 className="font-heading text-[26px] sm:text-[28px] font-bold text-soft-navy leading-tight">
          You&apos;re all set
        </h2>
        <p className="font-body text-[14px] text-muted-grey mt-3 leading-relaxed">
          Your details have been sent to <span className="font-medium text-charcoal">{coachName}</span>. They&apos;ll be in touch within 2 working days to arrange your session.
        </p>

        <div className="mt-8 text-left bg-warm-sand/60 border border-border/80 rounded-xl p-5">
          <p className="font-body text-[11px] font-semibold tracking-widest uppercase text-warm-teal mb-3">
            What happens next
          </p>
          <ul className="space-y-2.5">
            {[
              "Your coach receives your registration details",
              "They reach out by email to agree a session time",
              "Your 45–60 minute session takes place by video or phone",
              "You share feedback after your session",
            ].map((item, i) => (
              <li
                key={item}
                className="flex gap-3 font-body text-[13px] text-charcoal leading-relaxed"
              >
                <span className="mt-[7px] flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warm-teal" />
                <span>
                  <span className="font-medium text-muted-grey mr-1.5">
                    {i + 1}.
                  </span>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/parents-hub"
            className="inline-flex items-center justify-center gap-2 h-[44px] px-5 rounded-xl bg-warm-teal text-white font-body text-[14px] font-semibold transition-all duration-200 hover:bg-primary-hover hover:-translate-y-px hover:shadow-lg"
          >
            Back to Parents Hub
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center justify-center gap-2 h-[44px] px-5 rounded-xl border border-border bg-surface font-body text-[14px] font-medium text-muted-grey hover:text-charcoal hover:border-charcoal transition-all duration-200 cursor-pointer"
          >
            Register another leave
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ─── */

export default function ParentalLeaveRegistration() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const selectedCoach = useMemo(
    () => COACHES.find((c) => c.id === form.coachId) ?? null,
    [form.coachId]
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
  const activeStep = submitted ? STEPS.length : currentStep;

  /* ─── Step bodies ─── */

  const stepContent: React.ReactNode[] = [
    // Step 1 — Your leave
    <div key="step-0" className="space-y-7">
      <div>
        <FieldLabel>Type of leave</FieldLabel>
        <div role="radiogroup" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LEAVE_OPTIONS.map((option) => (
            <LeaveTypeCard
              key={option.value}
              option={option}
              selected={form.leaveType === option.value}
              onSelect={() => update("leaveType", option.value)}
            />
          ))}
        </div>
      </div>

      <div>
        <FieldLabel>Where are you in your leave journey?</FieldLabel>
        <div role="radiogroup" className="flex flex-col gap-3">
          {STAGE_OPTIONS.map((option) => (
            <StageCard
              key={option.value}
              option={option}
              selected={form.stage === option.value}
              onSelect={() => update("stage", option.value)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FieldLabel htmlFor="leaveStartDate" optional>
            Expected leave start date
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
            Expected return date
          </FieldLabel>
          <TextInput
            id="returnDate"
            type="date"
            value={form.returnDate}
            onChange={(e) => update("returnDate", e.target.value)}
          />
        </div>
      </div>
    </div>,

    // Step 2 — Your details
    <div key="step-1" className="space-y-6">
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
          helper="Your coach will use this to get in touch to arrange your session."
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
        <FieldLabel
          htmlFor="preparation"
          helper="Optional — coaches find this really helpful for tailoring the session."
        >
          What&apos;s on your mind going into this transition?
        </FieldLabel>
        <TextArea
          id="preparation"
          placeholder="Share anything you'd like your coach to know — worries, goals, questions, or anything else on your mind. There are no wrong answers."
          value={form.preparation}
          onChange={(e) => update("preparation", e.target.value)}
        />
      </div>

      <div>
        <FieldLabel htmlFor="sessionFormat">
          Preferred session format
        </FieldLabel>
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
      <div className="flex items-start gap-3 rounded-xl border border-warm-teal/30 bg-warm-teal-light/70 px-4 py-3.5">
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-warm-teal">
          <Sparkles className="w-4 h-4 text-white" strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <p className="font-body text-[13px] font-semibold text-soft-navy leading-snug">
            1 coaching session credit ready to use
          </p>
          <p className="mt-0.5 font-body text-[12px] text-muted-grey leading-relaxed">
            Your employer has covered the cost — this session is free for you.
          </p>
        </div>
      </div>

      <div role="radiogroup" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {COACHES.map((coach) => (
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
    <div key="step-3" className="space-y-5">
      <div className="rounded-xl border border-border overflow-hidden">
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
            label="Leave start date"
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
          value={
            `${form.firstName} ${form.lastName}`.trim() || "—"
          }
        />
        <SummaryRow label="Work email" value={form.email || "—"} />
        {form.jobTitle && (
          <SummaryRow label="Job title" value={form.jobTitle} />
        )}
        {form.sessionFormat && (
          <SummaryRow
            label="Session format"
            value={
              SESSION_FORMAT_OPTIONS.find(
                (o) => o.value === form.sessionFormat
              )?.label ?? "—"
            }
          />
        )}
        <SummaryRow
          label="Your coach"
          value={selectedCoach?.name ?? "—"}
        />
        <SummaryRow
          label="Session cost"
          value="Free (employer credit)"
          accent
        />
      </div>

      <div className="rounded-xl bg-warm-sand/70 border border-border/70 p-4 flex gap-3">
        <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-warm-teal-light">
          <HeartHandshake
            className="w-[14px] h-[14px] text-warm-teal"
            strokeWidth={2}
          />
        </span>
        <p className="font-body text-[13px] text-muted-grey leading-relaxed">
          Once you confirm, your coach will receive your details by email and will reach out within{" "}
          <span className="font-semibold text-charcoal">2 working days</span>{" "}
          to arrange a time that works for you. Sessions are 45–60 minutes and take place by video or phone.
        </p>
      </div>
    </div>,
  ];

  /* ─── Render ─── */

  return (
    <div className="min-h-screen bg-onboarding-bg">
      {/* Breadcrumb */}
      <div className="max-w-[960px] mx-auto px-5 sm:px-8 pt-6 pb-2">
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
        className="max-w-[960px] mx-auto px-5 sm:px-8 pt-4 pb-16"
      >
        {/* Step indicator */}
        <div className="bg-surface rounded-2xl border border-border px-5 sm:px-8 py-5 mb-6">
          <StepIndicator currentStep={activeStep} totalSteps={STEPS.length} />
        </div>

        {submitted ? (
          <div className="animate-[fadeSlideIn_400ms_ease-out]">
            <SuccessScreen
              coachName={selectedCoach?.name ?? "your coach"}
              onRestart={handleRestart}
            />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Form card */}
            <div className="flex-1 min-w-0">
              <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8">
                <div className="mb-8">
                  <h2 className="font-heading text-[22px] sm:text-[24px] font-bold text-soft-navy">
                    {STEPS[currentStep].sidebarTitle}
                  </h2>
                  <div className="w-12 h-[3px] rounded-full bg-warm-teal mt-3" />
                </div>

                <div
                  key={currentStep}
                  className="animate-[fadeSlideIn_250ms_ease-out]"
                >
                  {stepContent[currentStep]}
                </div>

                {errors.length > 0 && (
                  <div className="mt-6 rounded-xl bg-error/5 border border-error/20 p-4 animate-[fadeSlideIn_200ms_ease-out]">
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
                    className="flex items-center gap-2 px-5 h-[44px] rounded-xl font-body text-[14px] font-medium text-muted-grey border border-border transition-all duration-200 hover:border-charcoal hover:text-charcoal disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>

                  {isLastStep ? (
                    <button
                      type="button"
                      onClick={handleConfirm}
                      className="flex items-center gap-2 px-7 h-[48px] rounded-xl bg-warm-teal text-white font-body text-[15px] font-semibold transition-all duration-200 hover:bg-primary-hover hover:-translate-y-px hover:shadow-lg active:translate-y-0 cursor-pointer"
                    >
                      Confirm &amp; send to coach
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-2 px-7 h-[48px] rounded-xl bg-warm-teal text-white font-body text-[15px] font-semibold transition-all duration-200 hover:bg-primary-hover hover:-translate-y-px hover:shadow-lg active:translate-y-0 cursor-pointer"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-[300px] flex-shrink-0 hidden lg:block">
              <div className="sticky top-[96px]">
                <div className="bg-surface rounded-2xl border border-border p-6">
                  <div className="w-10 h-10 rounded-xl bg-warm-teal-light flex items-center justify-center mb-4">
                    <HeartHandshake
                      className="w-5 h-5 text-warm-teal"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="font-heading text-[20px] font-bold text-soft-navy leading-snug">
                    {STEPS[currentStep].sidebarTitle}
                  </h3>
                  <p className="font-body text-[13px] text-muted-grey mt-3 leading-relaxed">
                    {STEPS[currentStep].sidebarDescription}
                  </p>
                </div>

                <div className="mt-4 rounded-2xl bg-warm-sand/60 p-4">
                  <p className="font-body text-[11px] text-muted-grey leading-relaxed">
                    Your coaching session is covered by your employer. You&apos;ll never see a bill — just a friendly intro email from your coach.
                  </p>
                </div>
              </div>
            </div>
          </div>
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
    <div className="flex items-center justify-between gap-4 px-4 sm:px-5 py-3.5 border-b border-border last:border-b-0">
      <span className="font-body text-[13px] text-muted-grey">{label}</span>
      <span
        className={`font-body text-[13px] text-right ${
          accent ? "font-semibold text-warm-teal" : "font-medium text-charcoal"
        }`}
      >
        {value}
      </span>
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
