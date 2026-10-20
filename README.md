# PayPilot

**Evidence-first payout exception operations.** Move from a detected exception to a justified decision, controlled action, and verified outcome.

> Current state: interactive demo foundation. PayPal, AI, authentication, persistence, and real execution are not connected. All records are illustrative; no real payouts are changed.

## Stack
Next.js App Router · TypeScript · React · Tailwind CSS v4 · Lucide React.

## Run
1. Install a Node.js version compatible with the selected Next.js release.
2. Run `npm install`.
3. Run `npm run dev`, then open http://localhost:3000.

## Routes
- `/` operational overview
- `/exceptions` searchable, filterable exception register with CSV export
- `/exceptions/PY-88421` evidence-first investigation workspace
- `/approvals` human approval queue
- `/activity` audit/event timeline
- `/settings` integration readiness

## Design direction
Ledger Mechanical, refined as Evidence-First Operations: disciplined ink/navy surfaces, paper-like evidence, selective industrial amber, semantic state colors, explicit decision gates, and purposeful motion. No decorative charts or theatrical AI effects.

## Production prerequisites
Implement Supabase schema and RLS; PayPal OAuth and webhook signature verification; idempotent event ingestion; deterministic action policy; structured AI output with provenance and uncertainty; authenticated server-side approval; provider-state recheck before execution; independent read-back verification; append-only audit storage; integration/security tests. AI output must never authorize a financial action. Only expose actions supported by current provider state and the real API.

## Safety
Demo buttons never call PayPal. Do not expose credentials in client components or commit secrets. Do not claim audit immutability or verified resolution until technically implemented.