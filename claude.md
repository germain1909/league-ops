# LeagueOps AI

## Project Overview

We are building LeagueOps AI, a full-stack sports league management platform.

Organizations can:

- Create organizations
- Create leagues
- Create seasons
- Add teams
- Add venues
- Add courts and fields
- Configure venue availability
- Configure team blackout dates
- Generate schedules
- View schedules on a calendar
- Reschedule games
- Use an AI assistant to interact with the system

The AI assistant is **not** the application.
It is one feature of the application.

---

# Long-Term Vision

The application should eventually support multiple sports.

Version 1 will implement **Basketball** only.

The architecture should make it easy to add additional sports later without requiring major rewrites.

The next sport planned is:

- Basketball
- Soccer

Avoid creating basketball-specific code when a more generic sports concept makes sense.

For example:

Good

- Venue
- PlayingSurface
- Game
- Team
- League
- Season

Avoid

- BasketballCourt
- BasketballGame

Instead prefer

PlayingSurface

with

- Basketball Court
- Soccer Field

as different surface types.

The scheduling engine should remain generic enough that sport-specific rules can be added later.


# Domain Model

Design the application around generic sports concepts.

Examples:

Organization

League

Season

Team

Venue

PlayingSurface

Game

Availability

Schedule

Proposal

Avoid naming classes after a single sport unless they truly are basketball-specific.

Future sports should require adding rules rather than redesigning the data model.



# Future-Proofing

Do not over-engineer for future sports.

Implement only what Version 1 needs.

However, if a naming decision can make future expansion significantly easier at little cost, prefer the generic solution.

Example:

Prefer

PlayingSurface

over

BasketballCourt

because a PlayingSurface can later represent:

- Basketball Court
- Soccer Field
- Tennis Court
- Baseball Diamond

without changing the overall architecture.

V1 only needs regular-season scheduling (round-robin style, avoid double-booking). Playoffs, brackets, and tournament formats are not part of V1, but the `Game` and `Schedule` model should be designed so a bracket/tournament structure can be layered on later without a redesign.