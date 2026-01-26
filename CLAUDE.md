# commerce-store — Frontend (Vite + React + TypeScript)

## Language

- ALWAYS reply in Korean (한국어로만 답변).
- Keep responses concise, actionable, and structured.

## Tech Stack

- React + TypeScript + Vite
- Styling: Tailwind CSS
- Server state (fetch/cache): TanStack Query (required)
- Client state (optional): Zustand (only when clearly justified)

## Scope

- Frontend only (no backend implementation unless explicitly requested).
- Package manager: pnpm

## Core Principle: Separation of Concerns

- UI logic and business logic must be separated.
  - UI (presentational): rendering, styling, accessibility, local UI state (toggle/input), and event wiring.
  - Business (domain): state transitions, domain rules, validation, data shaping, side effects, caching, server communication.
- UI components should be thin: receive data/handlers via props and avoid embedding domain rules.

## Suggested Structure (FSD-ish)

src/

- app/ providers, app entry, routing setup
- pages/ route-level composition only (no heavy logic)
- widgets/ page sections (composition)
- features/ user actions (e.g., add-to-cart, checkout)
- entities/ domain models, mappers, entity-level UI
- shared/ ui kit, lib, api client, config, utilities

## Feature Directory Convention

- Under `src/features/*`, use the following subfolders as needed:
  - ui/
  - api/
  - utils/
  - lib/
  - types/
- Default rule:
  - `ui/` = presentational components only
  - `api/` = TanStack Query hooks + local API functions + local DTO/types
  - `types/` = shared feature-level types (only if reused across multiple files)
  - `lib/` = domain/logic helpers for the feature (no UI)
  - `utils/` = feature-scoped helpers (prefer `shared/lib` if truly generic)

## TanStack Query Rules (File Organization)

- For TanStack Query hooks (`useQuery`, `useMutation`):
  - Keep the hook, the API function used by the hook, and any file-local types in the SAME file when they are only used there.
  - Response/request types that are only used by that hook should stay in the same file (do not over-extract).
- Place query/mutation hook files under `api/` directories, NOT under `hooks/`.
- Do not call raw `fetch` inside React components.

## State Rules

- Server data MUST use TanStack Query (no raw fetch in components).
- UI/local state => React state first.
- Global client state => Zustand only when state is shared across distant components and not suitable for local state.

## Data & Side Effects

- Use ONE data fetching/caching approach consistently: TanStack Query only.
- All shared/common API client code goes through `src/shared/api/*` (e.g., client wrapper, error normalization).
- Feature-specific query/mutation hooks live in `src/features/**/api/*`.
- Data mapping/normalization belongs to `entities/*` (or `shared/lib` if truly generic).
- Every async view must handle: loading / error / empty states.

## UI Rules

- `shared/ui` contains reusable presentational components only (no business logic).
- `pages`/`widgets` primarily compose components; keep them light.
- Prefer explicit props/types; avoid `any`.

## API Client Contract

- All network calls must use `src/shared/api/client.ts`.
- Normalize errors to a single shape: `{ message: string; status?: number; code?: string }`.
- API functions return typed data only (no raw Response objects).

## Coding Rules

- No secrets in code. Keep `.env.example` updated.
- Remove `console.log` before finalizing changes.
- Work in small diffs: 1–3 files at a time when possible.
- When changing behavior, also update types/tests (if present).

## Workflow (How you should work)

1. Restate the goal in Korean and list the files to touch.
2. Implement with minimal, clean changes.
3. Provide verification steps:
   - pnpm dev
   - pnpm build
   - pnpm lint (if configured)

## Commands

- pnpm dev
- pnpm build
- pnpm lint (if configured)
