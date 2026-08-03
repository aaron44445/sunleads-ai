// Assumptions behind these ranges — tune here if pricing or lead economics change.
// Sourced from Retell's published per-minute pricing and GHL's SMS/A2P rates (2026).
const AVG_CPL_LOW = 20; // $/lead — aggressive end, more leads per ad dollar
const AVG_CPL_HIGH = 35; // $/lead — conservative end, fewer leads per ad dollar
const CALL_MINUTES_PER_LEAD = 4; // ~2 call attempts, ~2 min blended average
const RETELL_RATE_LOW = 0.1; // $/min all-in (voice + TTS + LLM + telephony)
const RETELL_RATE_HIGH = 0.2; // $/min all-in, premium LLM config
const SMS_PER_LEAD = 3;
const SMS_RATE = 0.013; // $/segment, GHL base rate + carrier surcharge
export const A2P_ONE_TIME_FEE = 25; // one-time carrier registration, month one only
const A2P_MONTHLY_LOW = 2;
const A2P_MONTHLY_HIGH = 10;

export interface MonthlyCostEstimate {
  leadsLow: number;
  leadsHigh: number;
  retellLow: number;
  retellHigh: number;
  smsLow: number;
  smsHigh: number;
  totalLow: number;
  totalHigh: number;
}

export function estimateMonthlyCost(dailyAdBudget: number): MonthlyCostEstimate {
  const monthlySpend = Math.max(dailyAdBudget, 0) * 30;
  const leadsLow = monthlySpend / AVG_CPL_HIGH;
  const leadsHigh = monthlySpend / AVG_CPL_LOW;

  const retellLow = leadsLow * CALL_MINUTES_PER_LEAD * RETELL_RATE_LOW;
  const retellHigh = leadsHigh * CALL_MINUTES_PER_LEAD * RETELL_RATE_HIGH;

  const smsLow = leadsLow * SMS_PER_LEAD * SMS_RATE;
  const smsHigh = leadsHigh * SMS_PER_LEAD * SMS_RATE;

  const totalLow = retellLow + smsLow + A2P_MONTHLY_LOW;
  const totalHigh = retellHigh + smsHigh + A2P_MONTHLY_HIGH;

  return {
    leadsLow: Math.round(leadsLow),
    leadsHigh: Math.round(leadsHigh),
    retellLow: Math.round(retellLow),
    retellHigh: Math.round(retellHigh),
    smsLow: Math.round(smsLow * 10) / 10,
    smsHigh: Math.round(smsHigh * 10) / 10,
    totalLow: Math.round(totalLow),
    totalHigh: Math.round(totalHigh),
  };
}
