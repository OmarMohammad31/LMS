# LMS Backend — Setup & Verification

## Run
```
npm install
cp .env.example .env   # fill in MONGO_URI, JWT_SECRET, GOOGLE_* (see integration guide)
npm run dev             # or: npm start
node seed.js             # optional: seeds 1 instructor + 3 students, password: password123
```

## Manual test flow (Postman)
1. `POST /auth/register` or use seeded accounts, then `POST /auth/login` → copy `token`.
2. `POST /sessions` (instructor token) → creates session + calendar event.
3. `GET /sessions` → confirm it's listed.
4. `POST /sessions/:id/book` (student token) → confirm attendee added, book again to confirm FR1.5 rejection.
5. `POST /tutoring-requests` (student A) → `{ "topic": "Algebra" }`.
6. `POST /tutoring-requests` again immediately → should return 409 (FR3.3 partial unique index).
7. `POST /tutoring-requests/:id/accept` (student B) → `{ "startTime": "...", "durationMinutes": 30 }`.
8. `POST /tutoring-requests/:id/confirm` as each side → after both, check `CreditTransaction` collection for the new record and both balances.
9. Disconnect internet or use a bad `googleEventId` → confirm booking/session still saves, `meetLink` stays empty.

## Endpoints
- `POST /auth/register`, `POST /auth/login`
- `GET /users/me`
- `POST /sessions`, `GET /sessions`, `POST /sessions/:id/book`, `GET /sessions/:id/roster`
- `POST /tutoring-requests`, `GET /tutoring-requests`, `POST /tutoring-requests/:id/accept`, `POST /tutoring-requests/:id/confirm`

## Not built (see PROJECT_CONTEXT.md Section 6/10 for scope)
Frontend, session cancellation, admin dashboard — out of scope per requirements.
