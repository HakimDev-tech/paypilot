# Server-side integration boundaries

This folder is deliberately small until providers are connected.

- `demo-data.ts`: static illustrative fixtures; never a source of financial truth.
- `policies/payout-policy.ts`: deterministic deny-by-default policy guidance.
- Future `paypal/`: server-only OAuth client, payout reads, permitted actions, webhook signature validation, idempotency.
- Future `ai/`: server-only structured investigation with validated schemas and evidence provenance.
- Future `db/`: privileged server client and typed persistence layer.

Keep secrets out of client components and `NEXT_PUBLIC_*` variables. A policy decision is not an API execution. Re-check provider state immediately before any permitted action and independently read back the result afterward.