import type { Status } from "@/lib/demo-data";

export type ProviderPayoutState = "UNCLAIMED" | "FAILED" | "BLOCKED" | "ONHOLD" | "RETURNED" | "SUCCESS" | "UNKNOWN";
export type PolicyDecision = {
  allowed: boolean;
  action: "REVIEW_CANCELLATION" | "INVESTIGATE_FAILURE" | "ESCALATE" | "NO_ACTION";
  reason: string;
  requiresHumanApproval: true;
  requiresLiveStateRecheck: true;
};

export function evaluatePayoutPolicy(state: ProviderPayoutState | string): PolicyDecision {
  switch (state) {
    case "UNCLAIMED":
      return {
        allowed: false,
        action: "REVIEW_CANCELLATION",
        reason: "Cancellation may be available for an UNCLAIMED payout item. Re-fetch live provider state, verify the exact item and applicable policy, then require an explicit operator approval before any API request.",
        requiresHumanApproval: true,
        requiresLiveStateRecheck: true
      };
    case "FAILED":
      return {
        allowed: false,
        action: "INVESTIGATE_FAILURE",
        reason: "Investigate the provider response and failure details. Do not retry blindly or infer that a retry is safe.",
        requiresHumanApproval: true,
        requiresLiveStateRecheck: true
      };
    case "BLOCKED":
    case "ONHOLD":
      return {
        allowed: false,
        action: "ESCALATE",
        reason: "The provider state requires manual review or escalation. Do not bypass provider controls.",
        requiresHumanApproval: true,
        requiresLiveStateRecheck: true
      };
    case "RETURNED":
    case "SUCCESS":
      return {
        allowed: false,
        action: "NO_ACTION",
        reason: "The provider reports a terminal or completed state. Reconcile and verify before marking the case resolved; do not repeat a financial action.",
        requiresHumanApproval: true,
        requiresLiveStateRecheck: true
      };
    default:
      return {
        allowed: false,
        action: "INVESTIGATE_FAILURE",
        reason: "Provider state is unknown or unsupported. No action is permitted until fresh evidence is available.",
        requiresHumanApproval: true,
        requiresLiveStateRecheck: true
      };
  }
}

/** Status is a UI workflow status, not a provider payout state. Never use it to authorize a provider action. */
export function isClosedWorkflowStatus(status: Status): boolean {
  return status === "Verified";
}