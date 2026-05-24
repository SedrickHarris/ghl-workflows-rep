# Pattern: Lead Nurture Sequence

## When to use
Long-cycle leads who aren't ready to buy yet but need to stay warm. Goal: keep mindshare, educate, route back to sales when engagement signals fire.

## Trigger
- Event: **Tag added** (e.g. `nurture-cold`) OR opportunity moved to a nurture stage
- Filter: opted-in; not in active sales conversation

## Shape
A cadenced multi-touch sequence over weeks/months.

1. **Welcome / value piece** (Day 0) — email + soft SMS.
2. **Educational touches** (Day 3, 7, 14, 21, 30+) — alternate email/SMS, mostly content, occasional CTA.
3. **Engagement scoring** — increment a score field on email open, link click, SMS reply, page visit.
4. **Hand-off branch** — when score crosses a threshold OR contact replies to SMS OR books a call → tag `sales-ready`, notify owner, exit nurture.
5. **Long-tail** — after the initial cadence, drop to monthly check-ins indefinitely (or until unsubscribe / sales-ready / DNC).

## Copy considerations
- Lead with value, not pitch. Pattern: 3–5 value touches per pitch.
- Vary channel to avoid fatigue.
- Every email needs a one-click unsubscribe; SMS needs STOP language periodically.

## Common pitfalls
- Treating nurture as a drip of pitches → unsubscribes spike.
- No exit on reply → contact responds to email and still gets the next pre-scheduled SMS.
- No suppression for active opportunities → sales rep is talking to a lead who's also getting marketing touches.
