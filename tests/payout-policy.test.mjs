import test from "node:test";
import assert from "node:assert/strict";
import { evaluatePayoutPolicy, isClosedWorkflowStatus } from "../src/lib/policies/payout-policy.ts";

test("all provider states remain non-executable by default", () => {
  for (const state of ["UNCLAIMED", "FAILED", "BLOCKED", "ONHOLD", "RETURNED", "SUCCESS", "UNKNOWN", "UNRECOGNIZED"]) {
    const decision = evaluatePayoutPolicy(state);
    assert.equal(decision.allowed, false, `${state} must never authorize an action`);
    assert.equal(decision.requiresHumanApproval, true);
    assert.equal(decision.requiresLiveStateRecheck, true);
    assert.ok(decision.reason.length > 20);
  }
});

test("UNCLAIMED is a review recommendation, not authorization", () => {
  const decision = evaluatePayoutPolicy("UNCLAIMED");
  assert.equal(decision.action, "REVIEW_CANCELLATION");
  assert.equal(decision.allowed, false);
});

test("failure and blocked states cannot trigger blind retries", () => {
  assert.equal(evaluatePayoutPolicy("FAILED").action, "INVESTIGATE_FAILURE");
  assert.equal(evaluatePayoutPolicy("BLOCKED").action, "ESCALATE");
  assert.equal(evaluatePayoutPolicy("ONHOLD").action, "ESCALATE");
});

test("completed provider states do not permit repeated actions", () => {
  assert.equal(evaluatePayoutPolicy("SUCCESS").action, "NO_ACTION");
  assert.equal(evaluatePayoutPolicy("RETURNED").action, "NO_ACTION");
});

test("only the Verified workflow state is considered closed", () => {
  assert.equal(isClosedWorkflowStatus("Verified"), true);
  assert.equal(isClosedWorkflowStatus("Needs review"), false);
  assert.equal(isClosedWorkflowStatus("Awaiting approval"), false);
});
