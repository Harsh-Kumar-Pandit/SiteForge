# CODEX.md

This file is the primary AI-facing reference for adding or modifying features in this project. Use it as the first source of project context before making changes.

## Project Snapshot

- Framework: Next.js 16.2.2 with App Router
- Language: TypeScript
- UI: React 19, Tailwind CSS v4, shadcn/ui, Radix UI, Phosphor icons
- Auth: Clerk
- Database: Drizzle ORM with Neon HTTP via `drizzle-orm/neon-http`
- Notifications: Sonner

## Project Shape

- Landing page: `/` from `app/page.tsx`
- Protected app area: `/workspace` from `app/workspace`
- Auth routes: `app/(auth)/sign-in` and `app/(auth)/sign-up`
- API routes: `app/api`

## Important Directories

- `app`: App Router pages, layouts, API routes, and route-specific components
- `app/_components`: shared landing-page level components such as header and hero sections
- `app/workspace/_components`: workspace-specific UI such as sidebar and header
- `components/ui`: reusable shadcn-style UI primitives
- `context`: shared React context providers
- `hooks`: reusable client hooks
- `lib`: shared utilities
- `config`: database connection and schema definitions
- `public`: static assets

## Current Conventions

- Prefer App Router patterns already used in the repo instead of introducing Pages Router concepts.
- Use existing path aliases such as `@/components`, `@/lib`, `@/hooks`, and `@/config`.
- Reuse components from `components/ui` before creating new UI primitives.
- Keep feature-specific UI close to its route when possible.
- Keep API logic inside `app/api/.../route.ts`.
- Route all database schema changes through `config/schema.ts`.
- Use the shared database client from `config/db.ts`.
- Preserve Clerk-based route protection behavior defined in `proxy.ts`.

## Auth And User Flow

- Clerk is the authentication system.
- Public routes are defined in `proxy.ts` and currently include `/`, `/sign-in(.*)`, and `/sign-up(.*)`.
- Non-public routes are protected through Clerk middleware.
- `app/provider.tsx` uses Clerk's `useUser()` hook and creates or loads the signed-in user by POSTing to `/api/users`.
- User details are stored in `UserDetailContext`.

## Data Model Notes

- `usersTable`: stores `name`, `email`, and `credits`
- `projectsTable`: stores project records keyed by `projectId` and linked to the creator email
- `frameTable`: stores frames linked to a project by `projectId`
- `chatTable`: stores chat message payloads and the creator email

Current schema source of truth: `config/schema.ts`

## Existing Feature Entry Points

- Add landing-page features under `app` and `app/_components`
- Add protected workspace features under `app/workspace` and `app/workspace/_components`
- Add shared UI building blocks under `components/ui`
- Add backend endpoints under `app/api`
- Add shared utilities under `lib` or `hooks` only when reuse is clear

## Before Adding A Feature

1. Decide whether the change belongs to landing, auth, workspace, API, or shared UI.
2. Check for an existing component, hook, context, or utility before introducing a new pattern.
3. Reuse `components/ui` primitives wherever possible.
4. Keep auth-sensitive behavior aligned with Clerk and `proxy.ts`.
5. Put schema and DB access changes in `config/schema.ts` and `config/db.ts`-based flows.
6. Update metadata or placeholder app identity text if the feature affects user-facing branding.
7. Run relevant checks such as linting or targeted validation after changes.

## Notes For Future AI Agents

- This repo still has some default starter metadata and placeholder text, so do not assume all product copy is finalized.
- `README.md` is not the main implementation guide for feature work.
- `AGENTS.md` is a narrow warning about Next.js version differences.
- `CLAUDE.md` currently points back to `AGENTS.md`.
- When uncertain about framework behavior, prefer current repo patterns and the installed Next.js version over older assumptions.
