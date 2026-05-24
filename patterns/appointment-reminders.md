# Pattern: Appointment Reminders

## When to use
Reduce no-shows for booked appointments (consults, services, sales calls).

## Trigger
- Event: **Appointment booked** (or status = confirmed)
- Filter: appointment is in the future; calendar in scope

## Shape
1. **Booking confirmation** (immediate) — email + SMS with date, time, location/link, what to bring, reschedule link.
2. **T-24h reminder** — email (richer content) + SMS.
3. **T-3h reminder** — SMS.
4. **T-30m reminder** — SMS with directions / join link.
5. **Branches:**
   - Reschedule click → exit; re-enter on new booking.
   - Cancel → exit; optionally route to win-back nurture.
   - No-show (after appointment time, status = no-show) → no-show recovery sequence.

## Copy considerations
- Always include reschedule + cancel links so changes don't require a phone call.
- For virtual appointments, surface the join link in the T-30m SMS.
- Personalize with first name and appointment time in the contact's timezone.

## Common pitfalls
- Reminder firing for already-cancelled appointments — add a "status = confirmed" guard on each step.
- Time-zone bugs — verify which timezone the workflow's date math uses.
- Sending email to invalid addresses tanks sender reputation — validate at booking time.

## Variants
- Add a "prep" message (T-48h) for high-value appointments.
- Branch on appointment type for different copy.
