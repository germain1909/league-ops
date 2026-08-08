# LeagueOps AI — Technical Requirements

Living document for implementation-level decisions. Product/feature decisions live in `league-ops-requirements.md`; architecture principles live in `claude.md`.

---

## Supabase Setup

### 1. Project creation
- Done via the Supabase dashboard (or `supabase` CLI if authenticated) — requires picking an org/region/plan, so this is a manual step, not something scripted.

### 2. Wiring
- Install `@supabase/supabase-js` in both `client` and `server`.
- Env vars:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY` — used client-side.
  - `SUPABASE_SERVICE_ROLE_KEY` — server-side only, never exposed to the client.

### 3. Schema & roles
- Supabase Auth (`auth.users`) provides identity only — it does not model our role hierarchy (Super Admin → Admin → League Manager → Coach/Team Captain/Player).
- **Decision: use a `memberships` table** rather than custom JWT claims.
  - Shape: `user_id`, `org_id`, `league_id` (nullable — null for org-scoped roles like Admin, set for league-scoped roles like League Manager), `role`.
  - Rationale: Admin is org-wide, League Manager is scoped to a specific league — a membership table models that scoping directly. Custom JWT claims are faster to read but awkward to keep in sync with per-league scoping and role changes.
  - Tradeoff accepted: one extra join on most authorization checks, in exchange for flexibility as the role hierarchy grows (e.g. team-level roles for Coach/Captain/Player later).
- **Super Admin is the exception: a flag, not a membership row.**
  - Shape: `profiles.is_super_admin` boolean (or an `app_metadata` claim on the Supabase user).
  - Rationale: Super Admin is platform-wide (you, for development), not scoped to any org/league, and there will only ever be a handful of these accounts — a membership row would model scoping that doesn't apply here.
  - Tradeoff accepted: Super Admin access is all-or-nothing (no partial/scoped super-admin), which is fine since it's not meant to be scoped.

### 4. Row Level Security (RLS)
- Deferred until the core schema (organizations, leagues, seasons, teams, venues, playing surfaces, games) is drafted.
- Policies will be written per-table against the `memberships` model above.

### 5. Auth method
- **Decision: email/password, with "Confirm email" required**, toggled on in Supabase Auth settings (Authentication → Settings). No custom code needed.
  - Rationale: standard/professional practice; the toggle is free, so there's no reason to skip it.
  - Demo note: since this is a job-interview demo, seed a pre-confirmed demo account ahead of time so the live demo isn't blocked on checking an inbox mid-interview.
- **Also offer Google OAuth ("Sign in with Google") as an option** alongside email/password.
  - Rationale: fast, no-password signup option for users who want it; Supabase supports both simultaneously.
  - Requires: a Google OAuth app (client ID/secret) configured in the Supabase dashboard.

---

## Open Questions

(none currently)
