"use client";

import { useState, useRef, useCallback } from "react";
import {
  ChevronRight,
  Info,
  Calculator,
  Briefcase,
  PoundSterling,
  Building2,
  CalendarDays,
  TrendingDown,
  Wallet,
  ArrowDown,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import {
  calculateMaternityPay,
  validateInputs,
  formatCurrency,
  type CalculatorInputs,
  type CalculatorResult,
} from "@/lib/maternity-calculator";

/* ─── Shared form styling ─── */

function FormCard({
  title,
  icon: Icon,
  children,
  step,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  step: number;
}) {
  return (
    <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-warm-teal-light flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-warm-teal" />
        </div>
        <div>
          <p className="font-body text-[11px] font-semibold tracking-widest uppercase text-warm-teal">
            Step {step}
          </p>
          <h3 className="font-heading text-[17px] font-semibold text-soft-navy">
            {title}
          </h3>
        </div>
      </div>
      {children}
    </div>
  );
}

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
    <div className="mb-1.5">
      <label
        htmlFor={htmlFor}
        className="block font-body text-[14px] font-medium text-text-primary"
      >
        {children}
      </label>
      {helper && (
        <p className="font-body text-[12px] text-muted-grey mt-0.5">
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
        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-[15px] text-muted-grey pointer-events-none">
          {prefix}
        </span>
      )}
      <input
        id={id}
        type={type}
        className={`w-full h-[44px] bg-surface border border-border rounded-xl font-body text-[15px] text-text-primary placeholder:text-text-secondary/50 transition-all duration-200 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary-light ${
          prefix ? "pl-8 pr-4" : suffix ? "pl-4 pr-10" : "px-4"
        }`}
        {...props}
      />
      {suffix && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-[14px] text-muted-grey pointer-events-none">
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
        className="w-full h-[44px] bg-surface border border-border rounded-xl font-body text-[15px] text-text-primary px-4 pr-10 transition-all duration-200 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary-light appearance-none cursor-pointer"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-grey pointer-events-none" />
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
    teal: {
      bg: "bg-warm-teal-light",
      icon: "text-warm-teal",
      value: "text-warm-teal",
    },
    red: {
      bg: "bg-error/10",
      icon: "text-error",
      value: "text-error",
    },
    navy: {
      bg: "bg-primary-light",
      icon: "text-soft-navy",
      value: "text-soft-navy",
    },
  };
  const c = colors[accent ?? "navy"];

  return (
    <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <div
          className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center`}
        >
          <Icon className={`w-4.5 h-4.5 ${c.icon}`} />
        </div>
        <p className="font-body text-[13px] text-muted-grey">{label}</p>
      </div>
      <p className={`font-heading text-[26px] sm:text-[30px] font-bold ${c.value} leading-none`}>
        {value}
      </p>
      {subtitle && (
        <p className="font-body text-[12px] text-muted-grey">{subtitle}</p>
      )}
    </div>
  );
}

function BarChart({ months }: { months: { month: string; grossPay: number }[] }) {
  const maxPay = Math.max(...months.map((m) => m.grossPay), 1);

  return (
    <div className="flex items-end gap-1.5 sm:gap-2 h-[180px] sm:h-[200px] w-full">
      {months.map((m, i) => {
        const heightPercent = maxPay > 0 ? (m.grossPay / maxPay) * 100 : 0;
        return (
          <div
            key={m.month}
            className="flex-1 flex flex-col items-center justify-end gap-1 min-w-0"
          >
            <p className="font-body text-[10px] text-muted-grey font-medium truncate">
              {formatCurrency(m.grossPay)}
            </p>
            <div
              className="w-full rounded-t-md transition-all duration-500 ease-out"
              style={{
                height: `${Math.max(heightPercent, 2)}%`,
                background:
                  heightPercent > 60
                    ? "var(--warm-teal)"
                    : heightPercent > 20
                    ? "var(--primary-light)"
                    : "#F0D5BF",
                animationDelay: `${i * 60}ms`,
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

  // Result state
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

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

    // Smooth scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, [
    salary, weeklyEarnings, leaveStartDate, totalWeeks, taxYear,
    studentLoan, taxCode, pensionMode, pensionValue, enhancedEnabled,
    enhancedType, enhancedCustomPercent, enhancedTopupAmount, enhancedWeeks, smpOnTop,
  ]);

  return (
    <div className="min-h-screen bg-onboarding-bg">
      {/* Breadcrumb */}
      <div className="max-w-[720px] mx-auto px-5 pt-6 pb-2">
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

      {/* Page Header */}
      <div className="max-w-[720px] mx-auto px-5 pt-4 pb-8 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-warm-teal-light mb-4">
          <Calculator className="w-7 h-7 text-warm-teal" />
        </div>
        <h1 className="font-heading text-[28px] sm:text-[34px] font-bold text-soft-navy leading-tight">
          Maternity Pay Calculator
        </h1>
        <p className="font-body text-[15px] sm:text-[16px] text-muted-grey mt-3 max-w-[520px] mx-auto leading-relaxed">
          Get a personalised estimate of your maternity pay, week by week.
          Enter your details below.
        </p>
      </div>

      {/* Calculator Form */}
      <div className="max-w-[720px] mx-auto px-5 pb-12">
        <div className="flex flex-col gap-6">
          {/* Section 1: Your Pay */}
          <FormCard title="Your Pay" icon={PoundSterling} step={1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <FormLabel htmlFor="salary">
                  Annual gross (pre-tax) income
                </FormLabel>
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
            </div>
          </FormCard>

          {/* Section 2: Leave Plan */}
          <FormCard title="Leave Plan" icon={CalendarDays} step={2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                  helper="SMP is paid for up to 39 weeks. Weeks 40 to 52 are unpaid unless your employer offers enhanced pay."
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
            </div>
          </FormCard>

          {/* Section 3: Tax & NI */}
          <FormCard title="Tax & National Insurance" icon={Briefcase} step={3}>
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
              <div>
                <FormLabel
                  htmlFor="taxCode"
                  helper="Your tax code is on your payslip or P60. It tells us your personal allowance."
                >
                  What is your tax code? (optional)
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
                <div className="flex gap-2">
                  <div className="flex rounded-xl border border-border overflow-hidden flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setPensionMode("percent")}
                      className={`px-3.5 py-2 font-body text-[13px] font-medium transition-colors cursor-pointer ${
                        pensionMode === "percent"
                          ? "bg-warm-teal text-white"
                          : "bg-surface text-muted-grey hover:text-charcoal"
                      }`}
                    >
                      % of salary
                    </button>
                    <button
                      type="button"
                      onClick={() => setPensionMode("fixed")}
                      className={`px-3.5 py-2 font-body text-[13px] font-medium transition-colors cursor-pointer ${
                        pensionMode === "fixed"
                          ? "bg-warm-teal text-white"
                          : "bg-surface text-muted-grey hover:text-charcoal"
                      }`}
                    >
                      £ per month
                    </button>
                  </div>
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
          </FormCard>

          {/* Section 4: Employer Enhanced Pay */}
          <FormCard title="Employer Enhanced Pay" icon={Building2} step={4}>
            <div className="flex items-center justify-between mb-5">
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
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-[fadeSlideIn_300ms_ease-out]"
              >
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
                    <FormLabel htmlFor="topupAmount">
                      Top-up amount (per week)
                    </FormLabel>
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
                  <FormLabel htmlFor="enhancedWeeks">
                    Enhanced pay lasts for
                  </FormLabel>
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

                <div className="sm:col-span-2 flex items-center justify-between pt-2 border-t border-border">
                  <div>
                    <span className="font-body text-[14px] font-medium text-text-primary">
                      SMP paid on top of enhanced pay
                    </span>
                    <p className="font-body text-[12px] text-muted-grey mt-0.5">
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
          </FormCard>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="rounded-2xl bg-error/5 border border-error/20 p-4 animate-[fadeSlideIn_200ms_ease-out]">
              <ul className="space-y-1">
                {errors.map((err, i) => (
                  <li
                    key={i}
                    className="font-body text-[14px] text-error flex items-start gap-2"
                  >
                    <span className="mt-0.5 block w-1.5 h-1.5 rounded-full bg-error flex-shrink-0" />
                    {err}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Calculate Button */}
          <button
            type="button"
            onClick={handleCalculate}
            className="w-full h-[52px] rounded-xl bg-warm-teal text-white font-body text-[16px] font-semibold transition-all duration-200 hover:bg-primary-hover hover:-translate-y-px hover:shadow-lg active:translate-y-0 cursor-pointer"
          >
            Calculate my maternity pay
          </button>
        </div>

        {/* Results */}
        {showResults && result && (
          <div ref={resultsRef} className="mt-10 animate-[fadeSlideIn_400ms_ease-out]">
            {/* Results Header */}
            <div className="text-center mb-8">
              <h2 className="font-heading text-[24px] sm:text-[28px] font-bold text-soft-navy">
                Your Maternity Pay Estimate
              </h2>
              <p className="font-body text-[14px] text-muted-grey mt-2">
                Based on your details. Return date:{" "}
                <span className="font-medium text-charcoal">
                  {new Date(result.returnDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </p>
            </div>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
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
              <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 mb-6">
                <h3 className="font-heading text-[16px] font-semibold text-soft-navy mb-5">
                  Monthly income during leave
                </h3>
                <BarChart months={result.monthBreakdown} />
              </div>
            )}

            {/* Month-by-month breakdown table */}
            <div className="bg-surface rounded-2xl border border-border overflow-hidden mb-6">
              <div className="px-5 sm:px-6 py-4 border-b border-border">
                <h3 className="font-heading text-[16px] font-semibold text-soft-navy">
                  Pay by period (gross)
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-5 sm:px-6 py-3 font-body text-[12px] font-semibold text-muted-grey uppercase tracking-wider">
                        Month
                      </th>
                      <th className="text-left px-4 py-3 font-body text-[12px] font-semibold text-muted-grey uppercase tracking-wider">
                        Type
                      </th>
                      <th className="text-right px-5 sm:px-6 py-3 font-body text-[12px] font-semibold text-muted-grey uppercase tracking-wider">
                        Gross Pay
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.monthBreakdown.map((m, i) => (
                      <tr
                        key={m.month}
                        className={`border-b border-border last:border-b-0 ${
                          i % 2 === 1 ? "bg-warm-sand/30" : ""
                        }`}
                      >
                        <td className="px-5 sm:px-6 py-3.5 font-body text-[14px] font-medium text-charcoal">
                          {m.month}
                        </td>
                        <td className="px-4 py-3.5">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full font-body text-[12px] font-medium ${
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
                        <td className="px-5 sm:px-6 py-3.5 font-body text-[14px] font-semibold text-soft-navy text-right">
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
          </div>
        )}
      </div>
    </div>
  );
}
