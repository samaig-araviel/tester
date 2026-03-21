/* ─── Maternity Pay Calculator ─── */
/* Pure utility functions. No side effects, no React, no DOM. */

export interface CalculatorInputs {
  annualSalary: number;
  weeklyEarnings: number | null; // null = auto-calculate from salary
  leaveStartDate: string; // ISO date string
  totalWeeksOfLeave: number;
  taxYear: "2024/2025" | "2025/2026";
  studentLoan: "none" | "plan1" | "plan2" | "plan4";
  taxCode: string; // e.g. "1257L", empty string if not provided
  pensionPercent: number | null; // null if using fixed amount
  pensionFixed: number | null; // null if using percent
  pensionMode: "percent" | "fixed";
  enhancedPayEnabled: boolean;
  enhancedPayType: "full" | "half" | "custom" | "topup";
  enhancedPayCustomPercent?: number;
  enhancedPayTopupAmount?: number; // weekly
  enhancedPayWeeks: number;
  smpOnTopOfEnhanced: boolean;
}

export interface WeekBreakdown {
  week: number;
  grossPay: number;
  type: "Enhanced" | "Enhanced + SMP" | "SMP (90%)" | "SMP (flat rate)" | "Unpaid";
}

export interface MonthBreakdown {
  month: string; // "Jun 2025"
  grossPay: number;
  netPay: number;
  type: string;
}

export interface CalculatorResult {
  totalGrossPay: number;
  monthlyIncomeDrop: number;
  averageMonthlyIncome: number;
  lowestMonthlyIncome: number;
  normalMonthlyGross: number;
  normalMonthlyNet: number;
  weekBreakdown: WeekBreakdown[];
  monthBreakdown: MonthBreakdown[];
  returnDate: string; // ISO date string
}

// SMP rates for 2025/26
const SMP_FLAT_RATE_2025_26 = 184.03;
const SMP_FLAT_RATE_2024_25 = 172.48;

// Tax thresholds for 2025/26
const TAX_CONFIG = {
  "2025/2026": {
    personalAllowance: 12570,
    basicRateLimit: 50270,
    basicRate: 0.2,
    higherRate: 0.4,
    niLowerThreshold: 12570,
    niUpperThreshold: 50270,
    niRate: 0.08,
    niHigherRate: 0.02,
    studentLoanThresholds: {
      plan1: 24990,
      plan2: 27295,
      plan4: 31395,
    },
    smpFlatRate: SMP_FLAT_RATE_2025_26,
  },
  "2024/2025": {
    personalAllowance: 12570,
    basicRateLimit: 50270,
    basicRate: 0.2,
    higherRate: 0.4,
    niLowerThreshold: 12570,
    niUpperThreshold: 50270,
    niRate: 0.08,
    niHigherRate: 0.02,
    studentLoanThresholds: {
      plan1: 22015,
      plan2: 27295,
      plan4: 27660,
    },
    smpFlatRate: SMP_FLAT_RATE_2024_25,
  },
};

function getPersonalAllowance(taxCode: string, defaultAllowance: number): number {
  if (!taxCode) return defaultAllowance;
  const cleaned = taxCode.trim().toUpperCase();

  // Common codes
  if (cleaned === "BR") return 0;
  if (cleaned === "D0") return 0;
  if (cleaned === "NT") return Infinity; // no tax
  if (cleaned.startsWith("K")) {
    // K codes reduce allowance (negative allowance - adds to taxable)
    const num = parseInt(cleaned.slice(1), 10);
    if (!isNaN(num)) return -(num * 10);
  }

  // Standard codes like 1257L
  const match = cleaned.match(/^(\d+)[A-Z]$/);
  if (match) {
    return parseInt(match[1], 10) * 10;
  }

  return defaultAllowance;
}

function calculateAnnualTax(annualIncome: number, config: typeof TAX_CONFIG["2025/2026"], taxCode: string): number {
  const personalAllowance = getPersonalAllowance(taxCode, config.personalAllowance);

  if (personalAllowance === Infinity) return 0; // NT code

  const taxableIncome = Math.max(0, annualIncome - Math.max(0, personalAllowance));

  let tax = 0;

  // If K code, personal allowance is negative so it increases taxable income
  if (personalAllowance < 0) {
    const adjustedIncome = annualIncome + Math.abs(personalAllowance);
    const basicBand = Math.min(adjustedIncome, config.basicRateLimit);
    tax += basicBand * config.basicRate;
    if (adjustedIncome > config.basicRateLimit) {
      tax += (adjustedIncome - config.basicRateLimit) * config.higherRate;
    }
    return Math.max(0, tax);
  }

  // Basic rate band
  const basicBand = Math.min(taxableIncome, config.basicRateLimit - config.personalAllowance);
  tax += Math.max(0, basicBand) * config.basicRate;

  // Higher rate
  if (taxableIncome > config.basicRateLimit - config.personalAllowance) {
    tax += (taxableIncome - (config.basicRateLimit - config.personalAllowance)) * config.higherRate;
  }

  return Math.max(0, tax);
}

function calculateAnnualNI(annualIncome: number, config: typeof TAX_CONFIG["2025/2026"]): number {
  let ni = 0;
  if (annualIncome > config.niLowerThreshold) {
    const niableBand = Math.min(annualIncome, config.niUpperThreshold) - config.niLowerThreshold;
    ni += Math.max(0, niableBand) * config.niRate;
  }
  if (annualIncome > config.niUpperThreshold) {
    ni += (annualIncome - config.niUpperThreshold) * config.niHigherRate;
  }
  return Math.max(0, ni);
}

function calculateStudentLoan(annualIncome: number, plan: string, thresholds: Record<string, number>): number {
  if (plan === "none") return 0;
  const threshold = thresholds[plan] ?? 0;
  if (annualIncome <= threshold) return 0;
  return (annualIncome - threshold) * 0.09;
}

function calculateNetFromGross(
  annualGross: number,
  config: typeof TAX_CONFIG["2025/2026"],
  taxCode: string,
  studentLoan: string,
  pensionAnnual: number
): number {
  // Salary sacrifice pension is deducted before tax
  const taxableGross = Math.max(0, annualGross - pensionAnnual);
  const tax = calculateAnnualTax(taxableGross, config, taxCode);
  const ni = calculateAnnualNI(taxableGross, config);
  const sl = calculateStudentLoan(taxableGross, studentLoan, config.studentLoanThresholds);
  return annualGross - pensionAnnual - tax - ni - sl;
}

function getMonthLabel(date: Date): string {
  return date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

function addWeeks(date: Date, weeks: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + weeks * 7);
  return result;
}

export function validateInputs(inputs: CalculatorInputs): string[] {
  const errors: string[] = [];
  if (!inputs.annualSalary || inputs.annualSalary <= 0) {
    errors.push("Please enter a valid annual salary.");
  }
  if (!inputs.leaveStartDate) {
    errors.push("Please select a leave start date.");
  }
  if (!inputs.totalWeeksOfLeave || inputs.totalWeeksOfLeave <= 0) {
    errors.push("Please select the total weeks of leave.");
  }
  if (inputs.enhancedPayEnabled && inputs.enhancedPayType === "custom") {
    if (!inputs.enhancedPayCustomPercent || inputs.enhancedPayCustomPercent <= 0 || inputs.enhancedPayCustomPercent > 100) {
      errors.push("Please enter a valid custom percentage (1-100).");
    }
  }
  if (inputs.enhancedPayEnabled && inputs.enhancedPayType === "topup") {
    if (!inputs.enhancedPayTopupAmount || inputs.enhancedPayTopupAmount <= 0) {
      errors.push("Please enter a valid top-up amount.");
    }
  }
  return errors;
}

export function calculateMaternityPay(inputs: CalculatorInputs): CalculatorResult {
  const config = TAX_CONFIG[inputs.taxYear];
  const awe = inputs.weeklyEarnings ?? inputs.annualSalary / 52;
  const smpFlatRate = Math.min(config.smpFlatRate, awe * 0.9);

  // Calculate pension deduction (annual)
  let pensionAnnual = 0;
  if (inputs.pensionMode === "percent" && inputs.pensionPercent) {
    pensionAnnual = (inputs.annualSalary * inputs.pensionPercent) / 100;
  } else if (inputs.pensionMode === "fixed" && inputs.pensionFixed) {
    pensionAnnual = inputs.pensionFixed * 12;
  }

  // Normal monthly calculations
  const normalMonthlyGross = inputs.annualSalary / 12;
  const normalAnnualNet = calculateNetFromGross(
    inputs.annualSalary,
    config,
    inputs.taxCode,
    inputs.studentLoan,
    pensionAnnual
  );
  const normalMonthlyNet = normalAnnualNet / 12;

  // Build week-by-week breakdown
  const weeks: WeekBreakdown[] = [];
  const totalWeeks = inputs.totalWeeksOfLeave;

  for (let w = 1; w <= totalWeeks; w++) {
    let grossPay = 0;
    let type: WeekBreakdown["type"] = "Unpaid";

    // Determine SMP entitlement for this week
    let smpForWeek = 0;
    if (w <= 6) {
      smpForWeek = awe * 0.9; // First 6 weeks: 90% AWE
    } else if (w <= 39) {
      smpForWeek = smpFlatRate; // Weeks 7-39: flat rate
    }
    // Weeks 40+: no SMP

    if (inputs.enhancedPayEnabled && w <= inputs.enhancedPayWeeks) {
      // Enhanced pay period
      let enhancedAmount = 0;
      switch (inputs.enhancedPayType) {
        case "full":
          enhancedAmount = awe; // 100% of salary
          break;
        case "half":
          enhancedAmount = awe * 0.5; // 50% of salary
          break;
        case "custom":
          enhancedAmount = awe * ((inputs.enhancedPayCustomPercent ?? 100) / 100);
          break;
        case "topup":
          enhancedAmount = inputs.enhancedPayTopupAmount ?? 0;
          break;
      }

      if (inputs.smpOnTopOfEnhanced && smpForWeek > 0) {
        grossPay = enhancedAmount + smpForWeek;
        type = "Enhanced + SMP";
      } else {
        // Enhanced replaces SMP
        grossPay = Math.max(enhancedAmount, smpForWeek);
        type = "Enhanced";
      }
    } else if (smpForWeek > 0) {
      grossPay = smpForWeek;
      type = w <= 6 ? "SMP (90%)" : "SMP (flat rate)";
    } else {
      grossPay = 0;
      type = "Unpaid";
    }

    weeks.push({ week: w, grossPay: Math.round(grossPay * 100) / 100, type });
  }

  // Aggregate into monthly breakdown
  const startDate = new Date(inputs.leaveStartDate);
  const monthMap = new Map<string, { grossPay: number; weeks: number; types: Set<string> }>();

  for (let w = 0; w < weeks.length; w++) {
    const weekDate = addWeeks(startDate, w);
    const label = getMonthLabel(weekDate);
    const existing = monthMap.get(label) ?? { grossPay: 0, weeks: 0, types: new Set() };
    existing.grossPay += weeks[w].grossPay;
    existing.weeks += 1;
    existing.types.add(weeks[w].type);
    monthMap.set(label, existing);
  }

  // Convert to monthly breakdown with net pay estimates
  const monthBreakdown: MonthBreakdown[] = [];
  const totalLeaveMonths = monthMap.size;
  let totalGrossPay = 0;

  for (const [month, data] of monthMap) {
    // Annualize this month's gross for tax calculation
    const annualizedGross = data.grossPay * (52 / data.weeks);
    const annualNet = calculateNetFromGross(
      annualizedGross,
      config,
      inputs.taxCode,
      inputs.studentLoan,
      0 // pension usually not deducted during mat leave from SMP
    );
    const monthlyNet = Math.max(0, annualNet / 12);

    const types = Array.from(data.types);
    const typeLabel = types.length === 1 ? types[0] : types.filter(t => t !== "Unpaid").join(" / ") || "Unpaid";

    monthBreakdown.push({
      month,
      grossPay: Math.round(data.grossPay * 100) / 100,
      netPay: Math.round(monthlyNet * 100) / 100,
      type: typeLabel,
    });

    totalGrossPay += data.grossPay;
  }

  totalGrossPay = Math.round(totalGrossPay * 100) / 100;

  const avgMonthlyIncome = totalLeaveMonths > 0 ? totalGrossPay / totalLeaveMonths : 0;
  const lowestMonth = monthBreakdown.length > 0
    ? Math.min(...monthBreakdown.map((m) => m.grossPay))
    : 0;
  const monthlyDrop = normalMonthlyGross - avgMonthlyIncome;

  const returnDate = addWeeks(startDate, totalWeeks);

  return {
    totalGrossPay: Math.round(totalGrossPay * 100) / 100,
    monthlyIncomeDrop: Math.round(Math.max(0, monthlyDrop) * 100) / 100,
    averageMonthlyIncome: Math.round(avgMonthlyIncome * 100) / 100,
    lowestMonthlyIncome: Math.round(Math.max(0, lowestMonth) * 100) / 100,
    normalMonthlyGross: Math.round(normalMonthlyGross * 100) / 100,
    normalMonthlyNet: Math.round(normalMonthlyNet * 100) / 100,
    weekBreakdown: weeks,
    monthBreakdown,
    returnDate: returnDate.toISOString().split("T")[0],
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyPrecise(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
