# Vercel Best Practices

Reference for when you're actively building against Vercel features in `web/`. Load this file into context only when you need it — the short list in `CLAUDE.md` holds the two load-bearing corrections that apply every turn.

These defaults are optimized for AI coding agents (and humans) working on apps that deploy to Vercel.

## Functions and runtime

- Treat Vercel Functions as stateless + ephemeral (no durable RAM/FS, no background daemons). Use Blob or marketplace integrations for preserving state.
- Use `waitUntil` for post-response work; avoid the deprecated Function `context` parameter.
- Set Function regions near your primary data source; avoid cross-region DB/service roundtrips.
- Tune Fluid Compute knobs (e.g. `maxDuration`, memory/CPU) for long I/O-heavy calls (LLMs, APIs).

## Storage and caching

- Use Runtime Cache for fast **regional** caching + tag invalidation. Don't treat it as global KV.
- Use Vercel Blob for uploads/media.
- Use Edge Config for small, globally-read config.

## Environment and secrets

- Store secrets in Vercel Env Variables; not in git or `NEXT_PUBLIC_*`.
- Provision Marketplace native integrations with `vercel integration add` (CI/agent-friendly).
- Sync env + project settings with `vercel env pull` / `vercel pull` when you need local/offline parity.

## Scheduled work

- Use Cron Jobs for schedules; cron runs in UTC and triggers your production URL via HTTP GET.

## Observability and analytics

- Add OpenTelemetry via `@vercel/otel` on Node; don't expect OTEL support on the Edge runtime.
- Enable Web Analytics + Speed Insights early.

## Deployment protection

- If Deployment Protection is enabled, use a bypass secret to directly access deployments.

## AI Gateway

- Use AI Gateway for model routing: set `AI_GATEWAY_API_KEY`, use a model string (e.g. `'anthropic/claude-sonnet-4.6'`). Gateway is already the default in the AI SDK.
- Always `curl https://ai-gateway.vercel.sh/v1/models` first; never trust model IDs from memory.

## Durable agent loops and untrusted code

- Use Workflow (pause/resume/state) + Sandbox.
- Use Vercel MCP for secure infra access.
