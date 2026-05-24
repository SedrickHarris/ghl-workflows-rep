# Pattern: Missed-Call Text-Back

## When to use
Inbound caller didn't connect (no answer, busy, after hours). Goal: recover the lead within seconds with an SMS.

## Trigger
- Event: **Missed inbound call**
- Filter: contact has a mobile number; not on DNC list

## Shape
1. **Immediate SMS (within 30s)** — acknowledge, offer next step (callback time, link to book, "reply with question").
2. **Wait** for reply OR fixed delay (e.g. 4h).
3. **Branch:**
   - Reply received → route to live SMS conversation / AI agent / human inbox.
   - No reply → second-touch SMS later that day or next morning (respect quiet hours).
4. **Exit** on reply, booked appointment, or `DNC` tag.

## Copy considerations
- Identify the business by name in the first message.
- Include opt-out language on the first SMS (compliance).
- Keep under 160 chars where possible to avoid concatenation / MMS surprises.

## Common pitfalls
- Sending from a number the caller doesn't recognize as the business.
- Firing during quiet hours — wrap the immediate send in a business-hours check or use a softer "we'll text you in the morning" pattern.
- Re-firing on the same caller's repeat missed calls within a short window — add a re-entry cooldown.

## Variants
- Add a voicemail-drop step before the SMS.
- Route by call source (Google LSA vs. organic) to different copy.
