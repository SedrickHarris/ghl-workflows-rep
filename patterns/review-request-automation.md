# Pattern: Review Request Automation

## When to use
Generate a steady flow of public reviews after a positive customer interaction (completed appointment, paid invoice, delivered service).

## Trigger
- Event: **Appointment status = showed** OR **Invoice paid** OR custom tag like `service-complete`
- Filter: contact not already reviewed in last N days; valid mobile/email

## Shape
1. **Wait** a short delay (e.g. 2h–24h) so the experience is fresh but not pushy.
2. **First touch:** SMS asking "How was your experience? Reply 1–5."
3. **Branch on reply:**
   - **4 or 5 (positive)** → send public review link (Google / preferred platform). Tag `review-requested-public`.
   - **1–3 (negative)** → send private feedback form / route to owner. Tag `feedback-private`. Do **not** ask for a public review.
   - **No reply** → one follow-up after 2–3 days, then exit.
4. **Exit** on review submitted, negative routed, or follow-up exhausted.

## Copy considerations
- Make the public review link a direct deep-link to the review form (not just the business profile).
- Negative path should feel like genuine recovery, not a pitch.
- Comply with platform TOS — never offer incentives for positive reviews.

## Common pitfalls
- Sending to every customer regardless of sentiment → public bad reviews.
- Triggering on bookings instead of completions → reviews from people who never came.
- Re-asking the same contact every appointment → annoyance + complaints.
