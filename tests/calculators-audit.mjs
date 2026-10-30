/**
 * HM Wealth Financial Calculator Mathematical Verification & Regression Audit Test Suite
 *
 * Verifies all 10 financial calculators against independent mathematical models,
 * closed-form identities, and edge cases.
 */

import {
  calculateSIP,
  calculateStepUpSIP,
  calculateLumpsum,
  calculateAnnualSIP,
  calculateTargetSIP,
  calculateTargetLumpsum,
  calculateRetirement,
  calculateSWP,
  calculateEMI,
  adjustForInflation,
  calculateRealInvestedCapital,
  formatCurrency,
  formatCurrencyExact,
  RETURN_LIMITS,
} from "../lib/finance-math.ts";

let passed = 0;
let failed = 0;

function assert(condition, testName, details = "") {
  if (condition) {
    passed++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${testName} ${details ? `(${details})` : ""}`);
  }
}

function assertClose(actual, expected, tolerancePercent, testName) {
  const diff = Math.abs(actual - expected);
  const maxDiff = (Math.abs(expected) * tolerancePercent) / 100;
  if (diff <= maxDiff || diff <= 2) {
    passed++;
    console.log(`  ✓ PASS: ${testName} (Actual: ${actual}, Expected: ${expected})`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${testName} (Actual: ${actual}, Expected: ${expected}, Diff: ${diff} > allowed ${maxDiff})`);
  }
}

console.log("======================================================================");
console.log("  HM WEALTH — COMPLETE 10-CALCULATOR MATHEMATICAL AUDIT & VERIFICATION");
console.log("======================================================================\n");

// -----------------------------------------------------------------------------
// 1. SIP Calculator
// -----------------------------------------------------------------------------
console.log("--- 1. SIP Calculator Verification ---");
const sip = calculateSIP(10000, 12, 10);
assertClose(sip.totalInvestment, 1200000, 0.01, "SIP Total Investment (10k/mo, 10y)");
assertClose(sip.maturityValue, 2323391, 0.1, "SIP Maturity Value (10k/mo, 12%, 10y)");
assert(sip.totalInvestment + sip.estimatedReturns === sip.maturityValue, "SIP Mathematical Identity: Total + Gains === Maturity");

// High return test (20%)
const sipHigh = calculateSIP(10000, 20, 10);
assert(sipHigh.maturityValue > sip.maturityValue, "SIP 20% Return delivers higher FV than 12%");

// Zero return rate edge case
const sipZero = calculateSIP(10000, 0, 10);
assert(sipZero.maturityValue === 1200000, "SIP Zero Return: Maturity equals capital");
assert(sipZero.estimatedReturns === 0, "SIP Zero Return: Estimated returns are 0");

// -----------------------------------------------------------------------------
// 2. Step-Up SIP Calculator & Reported Discrepancy Investigation
// -----------------------------------------------------------------------------
console.log("\n--- 2. Step-Up SIP Calculator & Inflation Discrepancy Audit ---");
// Client's exact reported inputs from screenshot
const stepUp = calculateStepUpSIP(10000, 10, 13, 40);
assertClose(stepUp.totalInvestment, 53111107, 0.01, "Step-Up SIP Invested Capital matches ₹5.31 Cr");
assertClose(stepUp.maturityValue, 443671606, 0.01, "Step-Up SIP Future Value matches ₹44.37 Cr");
assertClose(stepUp.estimatedReturns, 390560499, 0.01, "Step-Up SIP Estimated Gains matches ₹39.06 Cr");
assertClose(stepUp.finalMonthlySIP, 411448, 0.05, "Step-Up SIP Final Monthly SIP matches ₹4.11 Lakhs");
assert(stepUp.totalInvestment + stepUp.estimatedReturns === stepUp.maturityValue, "Step-Up SIP Identity: Total + Gains === Maturity");

// Inflation discounting audit
const realFV = adjustForInflation(stepUp.maturityValue, 6, 40);
assertClose(realFV, 43135014, 0.01, "Discounted FV at 6% inflation over 40y is ₹4.31 Cr");

const realInvested = calculateRealInvestedCapital(10000, 10, 40, 6);
assertClose(realInvested, 10529180, 0.5, "Discounted Capital at 6% inflation over 40y is ~₹1.05 Cr");
assert(realFV > realInvested, "REAL WEALTH CREATION CONFIRMED: Real FV (₹4.31 Cr) beats Real Capital (₹1.05 Cr) by +₹3.26 Cr (4.1x real purchasing-power growth)!");

// -----------------------------------------------------------------------------
// 3. Lump Sum Calculator
// -----------------------------------------------------------------------------
console.log("\n--- 3. Lump Sum Calculator Verification ---");
const lump = calculateLumpsum(100000, 12, 10);
assertClose(lump.investedAmount, 100000, 0.01, "Lump Sum Invested Amount");
assertClose(lump.maturityValue, 310585, 0.01, "Lump Sum Maturity Value (1L, 12%, 10y)");
assert(lump.investedAmount + lump.estimatedReturns === lump.maturityValue, "Lump Sum Identity: Invested + Gains === Maturity");

// -----------------------------------------------------------------------------
// 4. Annual SIP Calculator
// -----------------------------------------------------------------------------
console.log("\n--- 4. Annual SIP Calculator Verification ---");
const annual = calculateAnnualSIP(100000, 12, 10);
assertClose(annual.totalInvestment, 1000000, 0.01, "Annual SIP Total Invested (1L/yr, 10y)");
assertClose(annual.maturityValue, 1965458, 0.01, "Annual SIP Maturity Value (1L/yr, 12%, 10y)");
assert(annual.totalInvestment + annual.estimatedReturns === annual.maturityValue, "Annual SIP Identity: Invested + Gains === Maturity");

// -----------------------------------------------------------------------------
// 5. Target Goal SIP Calculator
// -----------------------------------------------------------------------------
console.log("\n--- 5. Target Goal SIP Calculator Verification ---");
const target = calculateTargetSIP(2500000, 12, 10);
assertClose(target.requiredMonthlySIP, 10760, 0.1, "Target SIP Required Monthly for ₹25L Goal in 10y at 12%");
assert(target.totalInvestment + target.estimatedReturns === target.targetCorpus, "Target SIP Identity: Invested + Gains === Target Corpus");

// -----------------------------------------------------------------------------
// 6. Target Lump Sum Calculator
// -----------------------------------------------------------------------------
console.log("\n--- 6. Target Lump Sum Calculator Verification ---");
const targetLump = calculateTargetLumpsum(5000000, 12, 15);
assertClose(targetLump.requiredLumpSum, 913492, 0.05, "Target Lump Sum required today for ₹50L in 15y at 12%");
assert(targetLump.requiredLumpSum + targetLump.estimatedReturns === targetLump.targetCorpus, "Target Lump Identity: Required + Gains === Target Corpus");

// -----------------------------------------------------------------------------
// 7. Retirement Calculator
// -----------------------------------------------------------------------------
console.log("\n--- 7. Retirement Calculator Verification ---");
const ret = calculateRetirement({
  currentAge: 30,
  retirementAge: 60,
  lifeExpectancy: 85,
  currentMonthlyExpense: 50000,
  inflationPercent: 6,
  preRetirementReturn: 12,
  postRetirementReturn: 7,
});
assert(ret.yearsToRetire === 30, "Retirement Horizon: 30 years to retirement");
assert(ret.yearsInRetirement === 25, "Retirement Duration: 25 years in retirement");
assertClose(ret.monthlyExpenseAtRetirement, 287175, 0.1, "Future Monthly Expense at Age 60 (₹50k escalated at 6% for 30y)");
assert(ret.requiredCorpus > 0, "Retirement Required Corpus is positive and calculated");
assert(ret.requiredMonthlySIP > 0, "Retirement Required Monthly SIP is positive and calculated");

// -----------------------------------------------------------------------------
// 8. SWP Calculator & Exhaustion Bug Fix
// -----------------------------------------------------------------------------
console.log("\n--- 8. SWP Calculator & Depletion Audit ---");
// Portfolio with rapid depletion: 10 Lakhs corpus, 50,000/mo withdrawal, 8% return
const swpDepleted = calculateSWP(1000000, 50000, 8, 5);
assert(swpDepleted.isExhausted === true, "SWP correctly identifies portfolio depletion");
assert(swpDepleted.finalBalance === 0, "SWP final balance does not go negative when exhausted");
assert(swpDepleted.totalWithdrawn < 50000 * 60, "SWP DEPLETION FIX CONFIRMED: Total withdrawn is capped at available corpus, eliminating phantom withdrawals!");
assert(swpDepleted.exhaustedMonth !== null && swpDepleted.exhaustedMonth < 60, "SWP records exact month of exhaustion");

// Sustainable SWP: 50 Lakhs corpus, 25,000/mo withdrawal, 8% return
const swpSustainable = calculateSWP(5000000, 25000, 8, 15);
assert(swpSustainable.isExhausted === false, "SWP marks sustainable withdrawal as not exhausted");
assert(swpSustainable.finalBalance > 5000000, "SWP sustainable corpus grows over time");

// -----------------------------------------------------------------------------
// 9. Loan EMI Calculator
// -----------------------------------------------------------------------------
console.log("\n--- 9. Loan EMI Calculator Verification ---");
const emi = calculateEMI(2500000, 8.5, 20);
assertClose(emi.monthlyEMI, 21696, 0.05, "Loan EMI for ₹25 Lakhs at 8.5% over 20 years");
assertClose(emi.totalInterest, 2706944, 0.05, "Total Loan Interest over 20 years");
assertClose(emi.totalPayable, 5206944, 0.05, "Total Loan Repayment over 20 years");
assert(emi.principal + emi.totalInterest === emi.totalPayable, "Loan EMI Identity: Principal + Interest === Total Payable");

// -----------------------------------------------------------------------------
// 10. Inflation Discounting & Formatting
// -----------------------------------------------------------------------------
console.log("\n--- 10. Inflation Discounting & Formatting Verification ---");
const inflDiscount = adjustForInflation(100000, 6, 10);
assertClose(inflDiscount, 55839, 0.01, "adjustForInflation: ₹1 Lakh after 10y at 6% = ₹55,839 in Year 0 purchasing power");

assert(formatCurrency(12000000) === "₹1.20 Cr", "formatCurrency handles Crores correctly");
assert(formatCurrency(2323391) === "₹23.23 Lakhs", "formatCurrency handles Lakhs correctly");
assert(formatCurrency(45000) === "₹45,000", "formatCurrency handles Thousands correctly");

// -----------------------------------------------------------------------------
// 11. Centralized Return Limits Audit
// -----------------------------------------------------------------------------
console.log("\n--- 11. Return Limits Configuration Audit ---");
assert(RETURN_LIMITS.equity.max === 30, "Equity return limit max is 30%");
assert(RETURN_LIMITS.equity.maxInput === 50, "Equity return manual input ceiling is 50%");
assert(RETURN_LIMITS.swp.max === 20, "SWP return limit max is 20%");
assert(RETURN_LIMITS.emi.max === 25, "EMI rate limit max is 25%");
assert(RETURN_LIMITS.inflation.max === 15, "Inflation rate limit max is 15%");

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log("\n======================================================================");
console.log(`  AUDIT RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log("======================================================================\n");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("ALL MATHEMATICAL AND FUNCTIONAL AUDIT TESTS PASSED SUCCESSFULLY!\n");
}
