"use client";

import { useState, useRef, useCallback } from "react";
import {
  ChevronRight,
  Info,
  Calculator,
  PoundSterling,
  CalendarDays,
  Briefcase,
  Building2,
  TrendingDown,
  Wallet,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Check,
} from "lucide-react";
import Link from "next/link";
import {
  calculateMaternityPay,
  validateInputs,
  formatCurrency,
  type CalculatorInputs,
  type CalculatorResult,
} from "@/lib/maternity-calculator";

/* ─── Step config ─── */

const STEPS = [
  { label: "Your Pay", icon: PoundSterling },
  { label: "Leave Plan", icon: CalendarDays },
  { label: "Tax & NI", icon: Briefcase },
  { label: "Enhanced Pay", icon: Building2 },
] as const;

const SIDEBAR_CONTENT = [
  {
    title: "Your Pay",
    description:
      "Enter your annual salary before tax. If you know your average weekly earnings from the last 8 weeks, enter that too. Otherwise we will calculate it from your salary.",
  },
  {
    title: "Leave Plan",
    description:
      "Choose when your leave starts and how long you plan to take. Statutory Maternity Pay (SMP) covers up to 39 weeks. Weeks 40 to 52 are unpaid unless your employer offers enhanced pay.",
  },
  {
    title: "Tax & NI",
    description:
      "We use your tax code, student loan plan and pension contributions to estimate your take-home pay. If you are unsure of your tax code, leave it blank and we will use the standard allowance.",
  },
  {
    title: "Enhanced Pay",
    description:
      "If your employer offers enhanced maternity pay, enter the details here. This could be full pay, half pay, or a custom arrangement. Some employers also pay SMP on top of their enhanced package.",
  },
];

/* ─── Form primitives ─── */

function FormLabel({
  children,
  htmlFor,
  helper,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  helper?: string;
}) {
  return (
    <div className="mb-2">
      <label
        htmlFor={htmlFor}
        className="block font-body text-[13px] font-medium text-muted-grey"
      >
        {children}
      </label>
      {helper && (
        <p className="font-body text-[11px] text-text-secondary mt-0.5">
          {helper}
        </p>
      )}
    </div>
  );
}

function FormInput({
  id,
  type = "text",
  prefix,
  suffix,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="relative">
      {prefix && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-[14px] text-muted-grey pointer-events-none">
          {prefix}
        </span>
      )}
      <input
        id={id}
        type={type}
        className={`w-full h-[48px] bg-surface border border-border rounded-xl font-body text-[15px] text-text-primary placeholder:text-text-secondary/40 transition-all duration-200 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary-light ${
          prefix ? "pl-9 pr-4" : suffix ? "pl-4 pr-12" : "px-4"
        }`}
        {...props}
      />
      {suffix && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-[13px] text-muted-grey pointer-events-none">
          {suffix}
        </span>
      )}
    </div>
  );
}

function FormSelect({
  id,
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        id={id}
        className="w-full h-[48px] bg-surface border border-border rounded-xl font-body text-[15px] text-text-primary px-4 pr-10 transition-all duration-200 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary-light appearance-none cursor-pointer"
        {...props}
      >
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

function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 cursor-pointer flex-shrink-0 ${
        checked ? "bg-warm-teal" : "bg-border"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
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
      {Array.from({ length: totalSteps }).map((_, i) => {
        const isCompleted = i < currentStep;
        const isCurrent = i === currentStep;
        const isLast = i === totalSteps - 1;

        return (
          <div key={i} className="flex items-center flex-1 last:flex-initial">
            {/* Step circle + label */}
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
                {STEPS[i].label}
              </span>
            </div>

            {/* Connector line */}
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

/* ─── Results Components ─── */

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
  subtitle,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  accent?: "teal" | "red" | "navy";
  subtitle?: string;
}) {
  const colors = {
    teal: { bg: "bg-warm-teal-light", icon: "text-warm-teal", value: "text-warm-teal" },
    red: { bg: "bg-error/10", icon: "text-error", value: "text-error" },
    navy: { bg: "bg-primary-light", icon: "text-soft-navy", value: "text-soft-navy" },
  };
  const c = colors[accent ?? "navy"];

  return (
    <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6">
      <div className="flex items-center gap-2.5 mb-3">
        <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center`}>
          <Icon className={`w-4.5 h-4.5 ${c.icon}`} />
        </div>
        <p className="font-body text-[13px] text-muted-grey">{label}</p>
      </div>
      <p className={`font-heading text-[28px] sm:text-[32px] font-bold ${c.value} leading-none`}>
        {value}
      </p>
      {subtitle && (
        <p className="font-body text-[12px] text-muted-grey mt-2">{subtitle}</p>
      )}
    </div>
  );
}

function BarChart({ months }: { months: { month: string; grossPay: number }[] }) {
  const maxPay = Math.max(...months.map((m) => m.grossPay), 1);

  return (
    <div className="flex items-end gap-1.5 sm:gap-2.5 h-[180px] sm:h-[220px] w-full pt-4">
      {months.map((m, i) => {
        const heightPercent = maxPay > 0 ? (m.grossPay / maxPay) * 100 : 0;
        return (
          <div
            key={m.month}
            className="flex-1 flex flex-col items-center justify-end gap-1.5 min-w-0"
          >
            <p className="font-body text-[10px] text-muted-grey font-medium truncate">
              {formatCurrency(m.grossPay)}
            </p>
            <div
              className="w-full rounded-t-lg transition-all duration-700 ease-out"
              style={{
                height: `${Math.max(heightPercent, 3)}%`,
                background:
                  heightPercent > 60
                    ? "var(--warm-teal)"
                    : heightPercent > 20
                    ? "var(--primary-light)"
                    : "#F0D5BF",
                transitionDelay: `${i * 50}ms`,
              }}
            />
            <p className="font-body text-[10px] text-muted-grey truncate max-w-full">
              {m.month.split(" ")[0]}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Main Component ─── */

export default function MaternityCalculator() {
  const [currentStep, setCurrentStep] = useState(0);

  // Form state
  const [salary, setSalary] = useState("");
  const [weeklyEarnings, setWeeklyEarnings] = useState("");
  const [leaveStartDate, setLeaveStartDate] = useState("");
  const [totalWeeks, setTotalWeeks] = useState("39");
  const [taxYear, setTaxYear] = useState("2025/2026");
  const [studentLoan, setStudentLoan] = useState("none");
  const [taxCode, setTaxCode] = useState("");
  const [pensionMode, setPensionMode] = useState<"percent" | "fixed">("percent");
  const [pensionValue, setPensionValue] = useState("");
  const [enhancedEnabled, setEnhancedEnabled] = useState(false);
  const [enhancedType, setEnhancedType] = useState("full");
  const [enhancedCustomPercent, setEnhancedCustomPercent] = useState("");
  const [enhancedTopupAmount, setEnhancedTopupAmount] = useState("");
  const [enhancedWeeks, setEnhancedWeeks] = useState("6");
  const [smpOnTop, setSmpOnTop] = useState(false);

  // Result & error state
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToTop = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
      scrollToTop();
    }
  }, [currentStep, scrollToTop]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      scrollToTop();
    }
  }, [currentStep, scrollToTop]);

  const handleCalculate = useCallback(() => {
    const inputs: CalculatorInputs = {
      annualSalary: parseFloat(salary) || 0,
      weeklyEarnings: weeklyEarnings ? parseFloat(weeklyEarnings) : null,
      leaveStartDate,
      totalWeeksOfLeave: parseInt(totalWeeks, 10),
      taxYear: taxYear as CalculatorInputs["taxYear"],
      studentLoan: studentLoan as CalculatorInputs["studentLoan"],
      taxCode,
      pensionPercent: pensionMode === "percent" ? (parseFloat(pensionValue) || 0) : null,
      pensionFixed: pensionMode === "fixed" ? (parseFloat(pensionValue) || 0) : null,
      pensionMode,
      enhancedPayEnabled: enhancedEnabled,
      enhancedPayType: enhancedType as CalculatorInputs["enhancedPayType"],
      enhancedPayCustomPercent: parseFloat(enhancedCustomPercent) || undefined,
      enhancedPayTopupAmount: parseFloat(enhancedTopupAmount) || undefined,
      enhancedPayWeeks: parseInt(enhancedWeeks, 10),
      smpOnTopOfEnhanced: smpOnTop,
    };

    const validationErrors = validateInputs(inputs);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setShowResults(false);
      setResult(null);
      return;
    }

    setErrors([]);
    const calcResult = calculateMaternityPay(inputs);
    setResult(calcResult);
    setShowResults(true);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, [
    salary, weeklyEarnings, leaveStartDate, totalWeeks, taxYear,
    studentLoan, taxCode, pensionMode, pensionValue, enhancedEnabled,
    enhancedType, enhancedCustomPercent, enhancedTopupAmount, enhancedWeeks, smpOnTop,
  ]);

  const isLastStep = currentStep === STEPS.length - 1;

  /* ─── Step content ─── */

  const stepContent = [
    // Step 1: Your Pay
    <div key="step-0" className="space-y-6">
      <div>
        <FormLabel htmlFor="salary">Annual gross (pre-tax) income</FormLabel>
        <FormInput
          id="salary"
          type="number"
          prefix="£"
          placeholder="e.g. 35000"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          min="0"
          step="100"
        />
      </div>
      <div>
        <FormLabel
          htmlFor="awe"
          helper="Leave blank to auto-calculate from salary"
        >
          Average weekly earnings (last 8 wks)
        </FormLabel>
        <FormInput
          id="awe"
          type="number"
          prefix="£"
          placeholder="Auto"
          value={weeklyEarnings}
          onChange={(e) => setWeeklyEarnings(e.target.value)}
          min="0"
          step="1"
        />
      </div>
    </div>,

    // Step 2: Leave Plan
    <div key="step-1" className="space-y-6">
      <div>
        <FormLabel htmlFor="startDate">Leave start date</FormLabel>
        <FormInput
          id="startDate"
          type="date"
          value={leaveStartDate}
          onChange={(e) => setLeaveStartDate(e.target.value)}
        />
      </div>
      <div>
        <FormLabel
          htmlFor="totalWeeks"
          helper="SMP is paid for up to 39 weeks. Weeks 40 to 52 are unpaid unless enhanced."
        >
          Total weeks of leave
        </FormLabel>
        <FormSelect
          id="totalWeeks"
          value={totalWeeks}
          onChange={(e) => setTotalWeeks(e.target.value)}
          options={[
            { value: "12", label: "12 weeks" },
            { value: "26", label: "26 weeks" },
            { value: "39", label: "39 weeks" },
            { value: "52", label: "52 weeks (full year)" },
          ]}
        />
      </div>
    </div>,

    // Step 3: Tax & NI
    <div key="step-2" className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FormLabel htmlFor="taxYear">Tax year</FormLabel>
          <FormSelect
            id="taxYear"
            value={taxYear}
            onChange={(e) => setTaxYear(e.target.value)}
            options={[
              { value: "2025/2026", label: "2025/2026" },
              { value: "2024/2025", label: "2024/2025" },
            ]}
          />
        </div>
        <div>
          <FormLabel htmlFor="studentLoan">Student loan</FormLabel>
          <FormSelect
            id="studentLoan"
            value={studentLoan}
            onChange={(e) => setStudentLoan(e.target.value)}
            options={[
              { value: "none", label: "None" },
              { value: "plan1", label: "Plan 1" },
              { value: "plan2", label: "Plan 2" },
              { value: "plan4", label: "Plan 4" },
            ]}
          />
        </div>
      </div>
      <div>
        <FormLabel
          htmlFor="taxCode"
          helper="Your tax code is on your payslip or P60. It tells us your personal allowance."
        >
          Tax code (optional)
        </FormLabel>
        <FormInput
          id="taxCode"
          placeholder="e.g. 1257L"
          value={taxCode}
          onChange={(e) => setTaxCode(e.target.value)}
        />
      </div>
      <div>
        <FormLabel
          htmlFor="pension"
          helper="Salary-sacrifice pension reduces your taxable income"
        >
          Pension contribution
        </FormLabel>
        <div className="flex gap-3 items-start">
          <div className="flex rounded-xl border border-border overflow-hidden flex-shrink-0 h-[48px]">
            <button
              type="button"
              onClick={() => setPensionMode("percent")}
              className={`px-4 h-full font-body text-[13px] font-medium transition-colors cursor-pointer ${
                pensionMode === "percent"
                  ? "bg-warm-teal text-white"
                  : "bg-surface text-muted-grey hover:text-charcoal"
              }`}
            >
              %
            </button>
            <button
              type="button"
              onClick={() => setPensionMode("fixed")}
              className={`px-4 h-full font-body text-[13px] font-medium transition-colors cursor-pointer ${
                pensionMode === "fixed"
                  ? "bg-warm-teal text-white"
                  : "bg-surface text-muted-grey hover:text-charcoal"
              }`}
            >
              £/mo
            </button>
          </div>
          <div className="flex-1">
            <FormInput
              id="pension"
              type="number"
              placeholder={pensionMode === "percent" ? "5" : "250"}
              suffix={pensionMode === "percent" ? "%" : ""}
              prefix={pensionMode === "fixed" ? "£" : ""}
              value={pensionValue}
              onChange={(e) => setPensionValue(e.target.value)}
              min="0"
            />
          </div>
        </div>
      </div>
    </div>,

    // Step 4: Enhanced Pay
    <div key="step-3" className="space-y-6">
      <div className="flex items-center justify-between py-1">
        <span className="font-body text-[14px] font-medium text-text-primary">
          My employer offers enhanced pay
        </span>
        <ToggleSwitch
          checked={enhancedEnabled}
          onChange={setEnhancedEnabled}
          label="My employer offers enhanced pay"
        />
      </div>

      {enhancedEnabled && (
        <div className="space-y-5 pt-1 animate-[fadeSlideIn_250ms_ease-out]">
          <div>
            <FormLabel htmlFor="enhancedType">Enhanced pay type</FormLabel>
            <FormSelect
              id="enhancedType"
              value={enhancedType}
              onChange={(e) => setEnhancedType(e.target.value)}
              options={[
                { value: "full", label: "Full pay (100%)" },
                { value: "half", label: "Half pay (50%)" },
                { value: "custom", label: "Custom % of salary" },
                { value: "topup", label: "Top-up to £/week" },
              ]}
            />
          </div>

          {enhancedType === "custom" && (
            <div className="animate-[fadeSlideIn_200ms_ease-out]">
              <FormLabel htmlFor="customPercent">Custom percentage</FormLabel>
              <FormInput
                id="customPercent"
                type="number"
                suffix="%"
                placeholder="e.g. 75"
                value={enhancedCustomPercent}
                onChange={(e) => setEnhancedCustomPercent(e.target.value)}
                min="1"
                max="100"
              />
            </div>
          )}

          {enhancedType === "topup" && (
            <div className="animate-[fadeSlideIn_200ms_ease-out]">
              <FormLabel htmlFor="topupAmount">Top-up amount (per week)</FormLabel>
              <FormInput
                id="topupAmount"
                type="number"
                prefix="£"
                placeholder="e.g. 500"
                value={enhancedTopupAmount}
                onChange={(e) => setEnhancedTopupAmount(e.target.value)}
                min="0"
              />
            </div>
          )}

          <div>
            <FormLabel htmlFor="enhancedWeeks">Enhanced pay lasts for</FormLabel>
            <FormSelect
              id="enhancedWeeks"
              value={enhancedWeeks}
              onChange={(e) => setEnhancedWeeks(e.target.value)}
              options={[
                { value: "4", label: "4 weeks" },
                { value: "6", label: "6 weeks" },
                { value: "8", label: "8 weeks" },
                { value: "12", label: "12 weeks" },
                { value: "16", label: "16 weeks" },
                { value: "24", label: "24 weeks" },
                { value: "26", label: "26 weeks" },
                { value: "39", label: "39 weeks" },
                { value: "52", label: "52 weeks" },
              ]}
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <span className="font-body text-[14px] font-medium text-text-primary">
                SMP paid on top of enhanced pay
              </span>
              <p className="font-body text-[11px] text-text-secondary mt-0.5">
                Some employers pay SMP in addition to enhanced pay.
              </p>
            </div>
            <ToggleSwitch
              checked={smpOnTop}
              onChange={setSmpOnTop}
              label="SMP paid on top of enhanced pay"
            />
          </div>
        </div>
      )}
    </div>,
  ];

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
            Maternity Pay Calculator
          </span>
        </nav>
      </div>

      {/* Main content */}
      <div ref={formRef} className="max-w-[960px] mx-auto px-5 sm:px-8 pt-4 pb-16">
        {/* Step Indicator */}
        <div className="bg-surface rounded-2xl border border-border px-5 sm:px-8 py-5 mb-6">
          <StepIndicator currentStep={currentStep} totalSteps={STEPS.length} />
        </div>

        {/* Two-column: form + sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Form card */}
          <div className="flex-1 min-w-0">
            <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8">
              {/* Section title */}
              <div className="mb-8">
                <h2 className="font-heading text-[22px] sm:text-[24px] font-bold text-soft-navy">
                  {SIDEBAR_CONTENT[currentStep].title}
                </h2>
                <div className="w-12 h-[3px] rounded-full bg-warm-teal mt-3" />
              </div>

              {/* Animated step content */}
              <div
                key={currentStep}
                className="animate-[fadeSlideIn_250ms_ease-out]"
              >
                {stepContent[currentStep]}
              </div>

              {/* Errors */}
              {errors.length > 0 && isLastStep && (
                <div className="mt-6 rounded-xl bg-error/5 border border-error/20 p-4 animate-[fadeSlideIn_200ms_ease-out]">
                  <ul className="space-y-1.5">
                    {errors.map((err, i) => (
                      <li
                        key={i}
                        className="font-body text-[13px] text-error flex items-start gap-2"
                      >
                        <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-error flex-shrink-0" />
                        {err}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Navigation buttons */}
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
                    onClick={handleCalculate}
                    className="flex items-center gap-2 px-7 h-[48px] rounded-xl bg-warm-teal text-white font-body text-[15px] font-semibold transition-all duration-200 hover:bg-primary-hover hover:-translate-y-px hover:shadow-lg active:translate-y-0 cursor-pointer"
                  >
                    Calculate
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

          {/* Right: Sidebar */}
          <div className="lg:w-[300px] flex-shrink-0 hidden lg:block">
            <div className="sticky top-[96px]">
              <div className="bg-surface rounded-2xl border border-border p-6">
                <div className="w-10 h-10 rounded-xl bg-warm-teal-light flex items-center justify-center mb-4">
                  <Calculator className="w-5 h-5 text-warm-teal" />
                </div>
                <h3 className="font-heading text-[20px] font-bold text-soft-navy leading-snug">
                  {SIDEBAR_CONTENT[currentStep].title}
                </h3>
                <p className="font-body text-[13px] text-muted-grey mt-3 leading-relaxed">
                  {SIDEBAR_CONTENT[currentStep].description}
                </p>
              </div>

              {/* Quick info */}
              <div className="mt-4 rounded-2xl bg-warm-sand/60 p-4">
                <p className="font-body text-[11px] text-muted-grey leading-relaxed">
                  Based on 2025/26 UK SMP rates. Supports enhanced employer pay,
                  salary sacrifice pensions, student loans and multiple tax codes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {showResults && result && (
          <div
            ref={resultsRef}
            className="mt-10 animate-[fadeSlideIn_400ms_ease-out]"
          >
            {/* Results header */}
            <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="font-body text-[11px] font-semibold tracking-widest uppercase text-warm-teal mb-1">
                    Results
                  </p>
                  <h2 className="font-heading text-[24px] sm:text-[28px] font-bold text-soft-navy">
                    Your Maternity Pay Estimate
                  </h2>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-warm-sand">
                  <CalendarDays className="w-4 h-4 text-muted-grey" />
                  <p className="font-body text-[13px] text-charcoal">
                    Return:{" "}
                    <span className="font-medium">
                      {new Date(result.returnDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <StatCard
                label="Total gross pay"
                value={formatCurrency(result.totalGrossPay)}
                icon={Wallet}
                accent="teal"
                subtitle={`Over ${totalWeeks} weeks of leave`}
              />
              <StatCard
                label="Monthly income drop"
                value={formatCurrency(result.monthlyIncomeDrop)}
                icon={TrendingDown}
                accent="red"
                subtitle={`vs ${formatCurrency(result.normalMonthlyGross)}/mo normal`}
              />
              <StatCard
                label="Average monthly income"
                value={formatCurrency(result.averageMonthlyIncome)}
                icon={PoundSterling}
                accent="navy"
                subtitle="Gross, during leave"
              />
              <StatCard
                label="Lowest monthly income"
                value={formatCurrency(result.lowestMonthlyIncome)}
                icon={ArrowDown}
                accent="navy"
                subtitle="Gross, single month"
              />
            </div>

            {/* Monthly Bar Chart */}
            {result.monthBreakdown.length > 0 && (
              <div className="bg-surface rounded-2xl border border-border p-5 sm:p-7 mb-6">
                <h3 className="font-heading text-[16px] font-semibold text-soft-navy mb-1">
                  Monthly income during leave
                </h3>
                <p className="font-body text-[12px] text-muted-grey mb-5">
                  Gross pay per calendar month across your leave period
                </p>
                <BarChart months={result.monthBreakdown} />
              </div>
            )}

            {/* Breakdown table */}
            <div className="bg-surface rounded-2xl border border-border overflow-hidden mb-6">
              <div className="px-5 sm:px-7 py-5 border-b border-border">
                <h3 className="font-heading text-[16px] font-semibold text-soft-navy">
                  Pay by period (gross)
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-warm-sand/30">
                      <th className="text-left px-5 sm:px-7 py-3 font-body text-[11px] font-semibold text-muted-grey uppercase tracking-wider">
                        Month
                      </th>
                      <th className="text-left px-4 py-3 font-body text-[11px] font-semibold text-muted-grey uppercase tracking-wider">
                        Type
                      </th>
                      <th className="text-right px-5 sm:px-7 py-3 font-body text-[11px] font-semibold text-muted-grey uppercase tracking-wider">
                        Gross Pay
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.monthBreakdown.map((m, i) => (
                      <tr
                        key={m.month}
                        className={`border-b border-border/60 last:border-b-0 transition-colors ${
                          i % 2 === 1 ? "bg-warm-sand/20" : ""
                        }`}
                      >
                        <td className="px-5 sm:px-7 py-4 font-body text-[14px] font-medium text-charcoal">
                          {m.month}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full font-body text-[11px] font-medium ${
                              m.type.includes("Enhanced")
                                ? "bg-warm-teal-light text-warm-teal"
                                : m.type.includes("SMP")
                                ? "bg-primary-light text-primary"
                                : "bg-warm-sand text-muted-grey"
                            }`}
                          >
                            {m.type}
                          </span>
                        </td>
                        <td className="px-5 sm:px-7 py-4 font-body text-[14px] font-semibold text-soft-navy text-right">
                          {formatCurrency(m.grossPay)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="rounded-2xl bg-warm-sand p-5 flex gap-3">
              <Info className="w-5 h-5 text-muted-grey flex-shrink-0 mt-0.5" />
              <p className="font-body text-[13px] text-muted-grey italic leading-relaxed">
                Estimates only. SMP rates shown are for 2025/26 (£184.03/wk flat
                rate). Tax is calculated on a simplified annual basis. Your actual
                monthly deductions will vary as SMP is paid gross and you are taxed
                through PAYE. Consult your employer&apos;s HR team and HMRC for
                exact figures.
              </p>
            </div>

            {/* Recalculate */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setShowResults(false);
                  setResult(null);
                  setCurrentStep(0);
                  scrollToTop();
                }}
                className="inline-flex items-center gap-2 px-6 h-[44px] rounded-xl font-body text-[14px] font-medium text-warm-teal border border-warm-teal transition-all duration-200 hover:bg-warm-teal-light cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Start a new calculation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
