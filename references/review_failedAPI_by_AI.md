## Root Cause Analysis

All 3 failing test groups are caused by **backend API deficiencies**, not test bugs:

### CHK-006 (checkout with empty cart)

- **Test sends:** `POST /booking` with empty fields (`firstname: ''`, etc.)
- **Test expects:** 400 or 404 (per `test_cases.csv`: "graceful error handling on backend failure")
- **API returns:** 201 (booking created with empty data)
- **Fix needed:** Backend must validate required fields are non-empty at `POST /booking`

### ROOM-005 (delete non-existent room)

- **Test does:** Creates a booking, deletes its parent room, then tries to delete the orphaned booking
- **Test expects:** Graceful error handling (404) for the orphaned booking
- **API returns:** Successful deletion of the room (ignoring the active booking), then successful deletion of the orphaned booking — no errors
- **Fix needed:** Backend must enforce referential integrity (block room deletion with active bookings, or cascade-delete)

### BR-002 & BR-004 (branding)

- **Test does:** Calls PUT to update branding settings, then reads them back
- **Test expects:** Values persist and are retrievable
- **API returns:** Changes appear to succeed but revert — PUT endpoint doesn't persist all fields
- **Fix needed:** Backend branding PUT endpoint must persist all submitted fields

**Conclusion:** The tests correctly implement the `test_cases.csv` specification. All failures trace to missing backend validation/integrity checks. Fixing the API would resolve all failures without test changes.
