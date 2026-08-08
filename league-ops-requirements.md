# LeagueOps AI — Requirements

Living document. Architecture principles live in `claude.md`; this file tracks concrete product/feature decisions as we make them.

---

## Roles & Permissions (draft)

Role hierarchy (draft), broadest scope to narrowest:

- **Super Admin** — platform-level. For the developer (you), not customers. Cross-org access.
- **Admin** — organization-level. Manages a single org's leagues, seasons, teams, venues, users. Can approve reschedule proposals.
- **League Manager** — league-level. Manages scheduling for a specific league/season (generate schedules, adjust games). *(Note: this replaces "Tournament Director" from earlier discussion — same role, renamed. Flag if that's wrong.)*
- **Coach** — team-level. Future: can approve reschedule proposals on behalf of the team.
- **Team Captain** — team-level, player-side representative. Future: can approve reschedule proposals alongside/instead of Coach.
- **Player** — team member. Views schedules; may request availability/blackout changes.

Scoping is now resolved: Super Admin > Admin (org) > League Manager (league) > Coach/Captain/Player (team).

---

## Auth & Data

- **Supabase** for auth (sign up/login) and as the primary database (Postgres).
- Multi-org from day one — this is intentional so the auth/org layer can be reused across future apps, not just LeagueOps.
- Roles/permissions will need an org-membership model (user ↔ organization ↔ role), likely backed by Supabase Row Level Security once we design the schema.

---

## Scheduling Engine (V1)

- V1 constraint: **avoid double-booking** a venue/playing surface only.
- Team blackout dates, home/away balance, rest-between-games, etc. are deferred past V1.

---

## Reschedule Proposals

- A reschedule creates a `Proposal` rather than directly editing the `Game`.
- Approval rules:
  - **V1:** Admin can approve/reject a proposal directly.
  - **Future:** proposal can instead require both teams' Coaches or Captains to approve before it takes effect.

---

## AI Assistant (V1 scope)

- In scope for V1 — this is a **demo feature for a job interview**, so it should be functional but doesn't need to be fully general.
- Interface: a **natural-language command bar** (not a chat panel).
- Example commands: "reschedule Team A's game to Friday", schedule/status questions.

---

## Calendar UI

- Recommendation: **FullCalendar** (`@fullcalendar/react`) — most widely used React calendar library, has built-in drag-and-drop rescheduling, and its **resource-timeline view** maps well onto scheduling across multiple venues/courts/fields.
- Alternative considered: `react-big-calendar` — simpler, Google Calendar-style, but weaker support for multi-resource (per-court) views.
- Decision: pending confirmation.

---

## Open Questions

- Confirm "League Manager" is the renamed "Tournament Director," not a separate additional role.
- Do Players get login accounts in V1, or is login limited to Admin/League Manager/Coach initially?
- Is this a new Supabase project, or an existing one we're connecting to?
