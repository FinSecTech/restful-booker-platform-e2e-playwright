# Conformance Review FINAL: allure-results ↔ test_cases.csv ↔ testplan.md

**Date:** June 13, 2026  
**Previous versions:** review_allure_vs_csv_vs_testplan.md (June 11), review2.md (May 18)
**Additional inputs:** review_failedAPI_by_AI.md, execution_packs/\*, test source files  
**Scope:** All three core artifacts reconciled against each other and against live test execution data.

---

## Table of Contents

1. [Part 1 — Artifact Inventory & Scope](#part-1--artifact-inventory--scope)
2. [Part 2 — Allure Results vs test_cases.csv](#part-2--allure-results-vs-test_casescsv)
3. [Part 3 — test_cases.csv vs Master Test Plan (testplan.md)](#part-3--test_casescsv-vs-master-test-plan-testplanmd)
4. [Part 4 — Execution Pack Integrity](#part-4--execution-pack-integrity)
5. [Part 5 — Known Defects & `test.fail()` Analysis](#part-5--known-defects--testfail-analysis)
6. [Part 6 — Untested Issues Found](#part-6--untested-issues-found)
7. [Part 7 — RTM Status Assessment](#part-7--rtm-status-assessment)
8. [Part 8 — Final Verdict](#part-8--final-verdict)
9. [Appendix A — Defect Register](#appendix-a--defect-register)
10. [Appendix B — Recommendations](#appendix-b--recommendations)

---

## Part 1 — Artifact Inventory & Scope

### Reviewed Artifacts

| Artifact             | Path                                                  | Description                                                      |
| -------------------- | ----------------------------------------------------- | ---------------------------------------------------------------- |
| Master Test Plan     | `testplan.md`                                         | Revised v2.0, 12 sections, 9 requirements (R1-R9), 6 suite types |
| Test Case Catalog    | `test_cases.csv`                                      | 61 test cases, all marked `Automated`                            |
| Allure Results       | `allure-results/*-result.json`                        | 183 files (61 tests × 3 browsers: chromium, firefox, webkit)     |
| Suite Mapping        | `execution_packs/suite_mapping.csv`                   | 115 suite-to-test assignments                                    |
| Execution Pack Files | `execution_packs/*.csv`                               | 7 per-suite pack CSVs + manifest + summaries                     |
| RTM                  | `execution_packs/requirement_traceability_matrix.csv` | R1-R9 traceability                                               |
| Checklists           | `execution_packs/checklists.csv`                      | Execution checklist with metadata                                |
| XRay Exports         | `execution_packs/test_cases_xray_v2*.csv`             | QA Sphere/Jira-compatible exports                                |
| Failed API Review    | `review_failedAPI_by_AI.md`                           | Root cause analysis of `test.fail()` tests                       |
| E2E Test Sources     | `tests/api/*.spec.js`                                 | Actual Playwright spec files                                     |

---

## Part 2 — Allure Results vs test_cases.csv

### Methodology

All 183 `*result.json` files from `allure-results/` (June 10 execution) were parsed. Test case IDs were extracted from the `name` field (e.g. `"CAL-002 @regression report calendar area is visible in UI"` → `CAL-002`) and cross-referenced against the 61 rows in `test_cases.csv`.

### Results

| Metric                                | Value                                        |
| ------------------------------------- | -------------------------------------------- |
| Test cases defined in CSV             | **61**                                       |
| Allure result files processed         | **183**                                      |
| Unique test case IDs found in results | **61**                                       |
| Tests in CSV but missing from results | **0**                                        |
| Tests in results but not in CSV       | **0**                                        |
| Raw pass rate                         | **100%** (all 183/183 show `status: passed`) |

### Critical Nuance — `test.fail()` Tests

While Allure reports 100% pass rate, **4 test cases** are implemented using Playwright's `test.fail()` API:

| Test ID  | Source File                                   | Issue                                                   |
| -------- | --------------------------------------------- | ------------------------------------------------------- |
| BR-002   | `tests/api/branding-api.spec.js` line 5       | Branding PUT doesn't persist all fields                 |
| BR-004   | `tests/api/branding-api.spec.js` line 38      | Branding restore fails to revert to baseline            |
| CHK-006  | `tests/api/checkout-api.spec.js` line 88      | POST /booking accepts empty fields (201 instead of 400) |
| ROOM-005 | `tests/api/room-calendar-api.spec.js` line 79 | DELETE /room succeeds despite active bookings           |

**How `test.fail()` affects the pass rate:**

- `test.fail()` **inverts** the pass/fail logic: a test that fails as expected is reported as "passed" in Allure
- These 4 tests are "passing" _only because the backend bugs still exist_
- If the backend bugs were fixed, these tests would **break** (they'd pass when run, but `test.fail()` would mark them as failed because the expected failure did not occur)
- **The actual functional pass rate is 57/61 = 93.4%** when de-inverting `test.fail()` semantics

### Verdict

**✅ No contradictions in test coverage.** Every test case from `test_cases.csv` has corresponding Allure result files. However, the 100% pass rate is **misleading** without the `test.fail()` disclosure. Four tests pass only because backend bugs are expected.

---

## Part 3 — test_cases.csv vs Master Test Plan (testplan.md)

### 3.1 Requirements Coverage (MTP §4)

All 9 requirements (R1-R9) are fully covered:

| Req | Description                      | MTP Priority | CSV Priority(s) | UI Tests               | API Tests              | Status    |
| --- | -------------------------------- | ------------ | --------------- | ---------------------- | ---------------------- | --------- |
| R1  | Admin login/logout               | **P0**       | P0, P1          | AUTH-001..005, VIS-004 | AUTH-005, API-001      | ✅ Full   |
| R2  | Frontend links/buttons/anchors   | P1           | P1, P2          | FE-001..005, VIS-001   | N/A (UI only)          | ✅ Full   |
| R3  | Cart/booking management          | **P0**       | P0, P1          | CART-001..007, VIS-002 | CART-006               | ✅ Full   |
| R4  | Checkout validation + completion | **P0**       | P0, P1          | CHK-001..007, VIS-003  | CHK-005, CHK-006       | ✅ Full\* |
| R5  | Branding read/update             | P1           | P1, P2          | BR-001..004            | BR-001..004            | ✅ Full\* |
| R6  | Contact form validation          | P1           | P1, P2          | CNT-001..005           | CNT-005, API-004       | ✅ Full   |
| R7  | Message CRUD                     | P1           | P1              | MSG-001..005           | MSG-001..005, API-003  | ✅ Full   |
| R8  | Room CRUD                        | **P0**       | P0, P1          | ROOM-001..005          | ROOM-001..006, API-002 | ✅ Full\* |
| R9  | Calendar reports                 | P1           | P1, P2          | CAL-001..004           | CAL-001..004, API-005  | ✅ Full   |

**`*` = Some tests for this requirement use `test.fail()` (backend bugs), see Part 5**

**Extra RequirementIDs** found in CSV (not in MTP §4):

- `NFR-CI/CD` — used by CI-001, CI-002, CI-003 (CI/CD pipeline tests, aligns with MTP §10)
- `NFR-CI/CD;NFR-CrossBrowser` — used by CI-004 (cross-browser CI test)

**✅ PASS** — All 9 requirements fully covered with appropriate UI+API layers.

### 3.2 Suite Type Coverage (MTP §6)

MTP defines 6 suite types. CSV represents all of them:

| MTP Suite        | CSV Equivalent                     | Test Count             | Notes                             |
| ---------------- | ---------------------------------- | ---------------------- | --------------------------------- |
| `@smoke`         | `Smoke`                            | **9**                  | All P0 critical path tests        |
| `@sanity`        | `Sanity`                           | **17**                 | Core functional confidence        |
| `@regression`    | `Regression-UI` + `Regression-API` | 46 + 29 = **75 total** | Split into UI/API sub-categories  |
| `@api`           | `Regression-API`                   | **29**                 | Mapped from regression-api        |
| `@visual`        | `Visual Regression`                | **4**                  | Snapshot-based                    |
| `@cross-browser` | `Cross-Browser`                    | **6**                  | Browser matrix                    |
| _(CI/CD)_        | `Full`                             | **4**                  | CI-001..004 (supplementary suite) |

**✅ PASS**

### 3.3 Test Design Techniques (MTP §3.2)

All 5 required techniques are applied and tagged in the Description column:

| Technique                    | Shortcut             | Applied In                                                                        |
| ---------------------------- | -------------------- | --------------------------------------------------------------------------------- |
| **Equivalence Partitioning** | `[EP]`               | AUTH-001, CHK-001, CART-005, ROOM-004, CAL-001, CAL-002, CAL-004, VIS-001, CI-002 |
| **Boundary Value Analysis**  | `[BVA]`              | CHK-004, CNT-004, ROOM-002, CAL-003                                               |
| **Decision Tables**          | `[Decision Table]`   | AUTH-002, AUTH-003, FE-001, CHK-002                                               |
| **State Transition Testing** | `[State Transition]` | AUTH-004                                                                          |
| **Pairwise/Combinatorial**   | `[Pairwise]`         | CHK-002 (combined with Decision Table)                                            |

**✅ PASS** — All 5 techniques present.

### 3.4 Automation Status (MTP §5)

All 61 test cases are marked as `Automated`.

**✅ PASS**

### 3.5 Scope Coverage — In Scope (MTP §2)

| In-Scope Item                                          | Covered By                                    | Status |
| ------------------------------------------------------ | --------------------------------------------- | ------ |
| Admin authentication (Login/Logout)                    | AUTH-001..005, API-001                        | ✅     |
| Frontend behavior (buttons, menu links, anchors)       | FE-001..005, VIS-001                          | ✅     |
| Shopping cart/booking management (add, update, remove) | CART-001..007                                 | ✅     |
| Checkout flow (field validation + successful purchase) | CHK-001..007                                  | ✅     |
| Branding read/update validation                        | BR-001..004                                   | ✅     |
| Contact form validation and submission                 | CNT-001..005, API-004                         | ✅     |
| Message management CRUD                                | MSG-001..005, API-003                         | ✅     |
| Room management CRUD                                   | ROOM-001..006, API-002                        | ✅     |
| Calendar report generation                             | CAL-001..004, API-005                         | ✅     |
| API automation layer                                   | API-001..005                                  | ✅     |
| Cross-browser runs                                     | AUTH-001, AUTH-004, FE-001, CART-001, CHK-001 | ✅     |
| Visual regression checks                               | VIS-001..004                                  | ✅     |

### 3.6 Scope Coverage — Out of Scope (MTP §2)

| Out-of-Scope Item             | Tests Found? | Status     |
| ----------------------------- | ------------ | ---------- |
| Load testing                  | No           | ✅ Correct |
| Performance testing           | No           | ✅ Correct |
| Stress testing                | No           | ✅ Correct |
| Penetration testing           | No           | ✅ Correct |
| Security testing              | No           | ✅ Correct |
| Third-party payment processor | No           | ✅ Correct |

### 3.7 CI/CD Coverage (MTP §10)

| Test ID | Summary                    | Status |
| ------- | -------------------------- | ------ |
| CI-001  | Workflow suite routing     | ✅     |
| CI-002  | Allure report generation   | ✅     |
| CI-003  | Allure history persistence | ✅     |
| CI-004  | CI cross-browser matrix    | ✅     |

**✅ PASS**

---

## Part 4 — Execution Pack Integrity

### 4.1 Pack File Synchronization

All 7 per-suite pack files were verified against `suite_mapping.csv`:

| Pack File                     | Tests in Pack | Tests in Mapping (same suite) | Match?     |
| ----------------------------- | ------------- | ----------------------------- | ---------- |
| `smoke_cases.csv`             | 9             | 9                             | ✅ Perfect |
| `sanity_cases.csv`            | 17            | 17                            | ✅ Perfect |
| `regression_ui_cases.csv`     | 46            | 46                            | ✅ Perfect |
| `regression_api_cases.csv`    | 29            | 29                            | ✅ Perfect |
| `cross_browser_cases.csv`     | 6             | 6                             | ✅ Perfect |
| `visual_regression_cases.csv` | 4             | 4                             | ✅ Perfect |
| `full_cases.csv`              | 4             | 4                             | ✅ Perfect |

**✅ All 7 pack files match `suite_mapping.csv` perfectly.**

### 4.2 Suite Mapping Consistency with test_cases.csv

All 115 suite-test mappings in `suite_mapping.csv` were checked against the `SuiteType` field in `test_cases.csv`. **Zero contradictions** — every test is assigned only to suites that are declared in its `SuiteType` column.

**✅ PASS**

### 4.3 Summary File Counts

| Suite             | suite_mapping | manifest | suite_summary | gate_recommendation | release_gate | suite_prio_wide | suite_prio |
| ----------------- | ------------- | -------- | ------------- | ------------------- | ------------ | --------------- | ---------- |
| Smoke             | 9             | 9        | 9             | ✅                  | 9            | 9               | ✅         |
| Sanity            | 17            | 17       | 17            | ✅                  | 17           | 17              | ✅         |
| Regression-UI     | 46            | 46       | 46            | ✅                  | 40 (P0+P1)   | 46              | ✅         |
| Regression-API    | 29            | 29       | 29            | ✅                  | 26 (P0+P1)   | 29              | ✅         |
| Cross-Browser     | 6             | 6        | 6             | ✅                  | 6            | 6               | ✅         |
| Visual Regression | 4             | 4        | 4             | ✅                  | 4            | 4               | ✅         |
| Full              | 4             | 4        | 4             | ✅                  | 4            | 4               | ✅         |

**Count discrepancies explained:**

- `release_gate_summary.csv` reports P0+P1 totals (excludes P2): Regression-UI shows 40 (46 − 6 P2), Regression-API shows 26 (29 − 3 P2) — **intentional and correct**
- `gate_recommendation.csv` has the same P0+P1 filtering logic

**✅ PASS**

### 4.4 XRay Export Consistency

| Check                             | test_cases_xray_v2.csv | test_cases_xray_v2_one_row_per_step.csv | Status |
| --------------------------------- | ---------------------- | --------------------------------------- | ------ |
| Test count matches test_cases.csv | 61/61                  | 61/61                                   | ✅     |
| SuiteType matches test_cases.csv  | 0 mismatches           | 0 mismatches                            | ✅     |
| Priority matches test_cases.csv   | 0 mismatches           | 0 mismatches                            | ✅     |
| No extra tests                    | ✅                     | ✅                                      | ✅     |
| No missing tests                  | ✅                     | ✅                                      | ✅     |

**✅ PASS**

---

## Part 5 — Known Defects & `test.fail()` Analysis

### 5.1 Overview

Four tests are explicitly marked with Playwright's `test.fail()` — meaning they are **expected to fail** due to known backend deficiencies. These are not test bugs; the tests correctly implement the specification from `test_cases.csv` and the Master Test Plan.

### 5.2 Defect Details

| #   | Test ID      | Requirement    | Priority | Source File                 | Line | API Issue               | Expected Behavior                            | Actual Behavior                              |
| --- | ------------ | -------------- | -------- | --------------------------- | ---- | ----------------------- | -------------------------------------------- | -------------------------------------------- |
| 1   | **CHK-006**  | R4 (Checkout)  | P1       | `checkout-api.spec.js`      | 88   | `POST /booking`         | Reject empty fields with 400/404             | Returns 201, creates booking with empty data |
| 2   | **ROOM-005** | R8 (Room CRUD) | P1       | `room-calendar-api.spec.js` | 79   | `DELETE /room`          | Block deletion with active booking (400/409) | Deletes room and orphaned booking silently   |
| 3   | **BR-002**   | R5 (Branding)  | P1       | `branding-api.spec.js`      | 5    | `PUT /branding`         | Persist all submitted fields                 | Changes appear to save but revert on re-read |
| 4   | **BR-004**   | R5 (Branding)  | P1       | `branding-api.spec.js`      | 38   | `PUT /branding` restore | Restore original values                      | Restore does not persist                     |

### 5.3 Root Cause Summary (from review_failedAPI_by_AI.md)

```
All 3 failing test groups are caused by backend API deficiencies, not test bugs:

1. CHK-006: Backend must validate required fields are non-empty at POST /booking
2. ROOM-005: Backend must enforce referential integrity (block room deletion with active bookings)
3. BR-002/BR-004: Backend branding PUT endpoint must persist all submitted fields
```

### 5.4 Impact on Gate Compliance

| Gate                                  | Relevant Suite    | Affected Tests                                        | Gate Impact                  |
| ------------------------------------- | ----------------- | ----------------------------------------------------- | ---------------------------- |
| **Smoke** (100% P0 pass required)     | Smoke             | None (CHK-006 is P1, not in Smoke)                    | ✅ No impact                 |
| **Sanity** (100% P0, ≥95% P1)         | Sanity            | None (BR-002 is P1 but in Regression, not Sanity)     | ✅ No impact                 |
| **Regression-API** (100% P0, ≥95% P1) | Regression-API    | BR-002 (P1), BR-004 (P1), CHK-006 (P1), ROOM-005 (P1) | ⚠️ 4 of 22 P1 tests affected |
| **Regression-UI** (100% P0, ≥95% P1)  | Regression-UI     | BR-002 (P1), BR-004 (P1) — UI + API layers            | ⚠️ 2 of 29 P1 tests affected |
| **Visual** (≥95% P1)                  | Visual Regression | None                                                  | ✅ No impact                 |

**Gate Compliance with `test.fail()`:** Because `test.fail()` inverts the pass/fail semantics, these tests still "pass" in Allure. The gates are technically **satisfied** from a reporting perspective, but **not from a functional perspective** — the backend does not implement the specified business rules.

---

## Part 6 — Untested Issues Found

### 6.1 Logout Button Visible When Not Logged In

A known UI issue that has **not been tested**:

**Description:** On the `Admin` page (`/admin`), the logout button is always visible even when the user is not authenticated. If a non-authenticated user clicks this button, it triggers a logout action against a non-existent session, which has no meaningful effect but creates a confusing UX.

**Why this was not tested:**

- The existing test `AUTH-005` ("Protected admin route blocked without auth") verifies that **direct navigation** to the admin URL redirects to login
- But `AUTH-005` does not check whether UI elements (specifically the logout button) are hidden when unauthenticated
- The test case catalog (`test_cases.csv`) does not contain a dedicated test for this scenario
- The "Admin page element visibility when unauthenticated" scenario falls in a gap between AUTH-005 (navigation redirect) and FE-002 (button clickability — tested only on the home page)

**Recommendation:** Add a new test case (e.g., `AUTH-006` or extend `AUTH-005`) to:

1. Navigate directly to `/admin` while unauthenticated
2. Assert that the logout button is NOT visible
3. Assert that login form elements ARE visible

### 6.2 Other Potential Gaps Identified

| Gap                                                                             | Assessment                                             | Recommendation                                                                        |
| ------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| Visual regression coverage limited to 4 pages (homepage, cart, checkout, admin) | Acceptable as MVP — covers the 4 highest-traffic pages | Extend to message management and room management UI if visual drift is observed there |
| No performance/load testing                                                     | Explicitly out of scope in MTP §2                      | No action needed                                                                      |
| Cross-browser coverage: only 5 tests                                            | These 5 are high-value P0 flows; acceptable for MVP    | Consider expanding to cover at least one test per requirement                         |

---

## Part 7 — RTM Status Assessment

### 7.1 RTM vs test_cases.csv

`requirement_traceability_matrix.csv` was checked against the actual `test_cases.csv` data:

| Requirement | Stated Count | Actual Count | Mapped Tests                    | Status |
| ----------- | ------------ | ------------ | ------------------------------- | ------ |
| R1          | 7            | 7            | API-001; AUTH-001..005; VIS-004 | ✅     |
| R2          | 6            | 6            | FE-001..005; VIS-001            | ✅     |
| R3          | 8            | 8            | CART-001..007; VIS-002          | ✅     |
| R4          | 8            | 8            | CHK-001..007; VIS-003           | ✅     |
| R5          | 4            | 4            | BR-001..004                     | ✅     |
| R6          | 6            | 6            | API-004; CNT-001..005           | ✅     |
| R7          | 6            | 6            | API-003; MSG-001..005           | ✅     |
| R8          | 7            | 7            | API-002; ROOM-001..006          | ✅     |
| R9          | 5            | 5            | API-005; CAL-001..004           | ✅     |

### 7.2 RTM Status Field

The `CoverageStatus` field for R3, R4, R5 now shows `Covered` with `GapNotes: None`. This is correct — all three requirements have both UI and API tests mapped. The previous "Partially Covered — API evidence missing" status was a data error that has since been corrected.

**✅ PASS** — RTM is accurate and consistent with `test_cases.csv`.

---

## Part 8 — Final Verdict

### Summary Table

| Check                                       | Previous (June 11)       | Current (June 13)        | Delta     |
| ------------------------------------------- | ------------------------ | ------------------------ | --------- |
| Requirements coverage (R1–R9)               | ✅ PASS                  | ✅ PASS                  | Same      |
| Suite type coverage                         | ✅ PASS                  | ✅ PASS                  | Same      |
| Test design techniques                      | ✅ PASS                  | ✅ PASS                  | Same      |
| All tests marked 'Automated'                | ✅ PASS                  | ✅ PASS                  | Same      |
| In-Scope items fully covered                | ✅ PASS                  | ✅ PASS                  | Same      |
| Out-of-Scope items not tested               | ✅ PASS                  | ✅ PASS                  | Same      |
| CI/CD pipeline tests present                | ✅ PASS                  | ✅ PASS                  | Same      |
| Allure results match CSV (no missing/extra) | ✅ PASS                  | ✅ PASS                  | Same      |
| Allure results raw pass rate                | ✅ 100% (183/183)        | ✅ 100% (183/183)        | Same      |
| **`test.fail()` disclosure**                | **❌ NOT MENTIONED**     | **✅ DOCUMENTED**        | **New**   |
| **Functional pass rate (de-inverted)**      | **❌ NOT CALCULATED**    | **⚠️ 93.4% (57/61)**     | **New**   |
| **Known backend bugs enumerated**           | **❌ NOT MENTIONED**     | **✅ 3 bugs documented** | **New**   |
| **Known untested issue (logout button)**    | **❌ NOT MENTIONED**     | **✅ DOCUMENTED**        | **New**   |
| **RTM contradiction (R3, R4, R5) resolved** | **⚠️ Partially Covered** | **✅ Covered**           | **Fixed** |
| **Execution pack consistency verified**     | Not covered              | ✅ 7/7 packs match       | **New**   |
| **XRay export consistency verified**        | Not covered              | ✅ 2/2 exports match     | **New**   |

### Overall Assessment

**test_cases.csv is fully conformant with the Master Test Plan (testplan.md). The execution packs, suite mapping, checklists, XRay exports, and RTM are internally consistent with test_cases.csv. Allure results show 100% raw pass rate.**

**However, 3 significant caveats require attention:**

1. **4 tests use `test.fail()`** masking 3 backend bugs (branding persistence, empty booking acceptance, referential integrity on room deletion). The real functional pass rate is 93.4%.

2. **The logout button visibility bug** (always shown on `/admin` even when unauthenticated) is not covered by any existing test.

3. **The June 10 Allure 100% pass rate is technically correct but semantically misleading** — 4 tests "pass" only because the backend is still broken. If the backend were fixed, these 4 tests would need their `test.fail()` wrappers removed to report correctly.

---

## Appendix A — Defect Register

| ID      | Test ID       | Requirement     | Severity | Component   | Description                                                                    | Status |
| ------- | ------------- | --------------- | -------- | ----------- | ------------------------------------------------------------------------------ | ------ |
| DEF-001 | CHK-006       | R4 (Checkout)   | High     | Backend API | POST /booking accepts empty fields (returns 201 instead of 400/404)            | Open   |
| DEF-002 | ROOM-005      | R8 (Room CRUD)  | High     | Backend API | DELETE /room succeeds despite active bookings — no referential integrity check | Open   |
| DEF-003 | BR-002/BR-004 | R5 (Branding)   | Medium   | Backend API | PUT /branding doesn't persist all fields; values revert on re-read             | Open   |
| DEF-004 | (none)        | R1 (Admin Auth) | Low      | Frontend UI | Logout button visible on `/admin` when not authenticated                       | Open   |

---

## Appendix B — Recommendations

1. **Fix backend API bugs** (DEF-001, DEF-002, DEF-003) — these are the root cause of all `test.fail()` tests
2. **Add test for unauthenticated admin page** to cover the logout button visibility issue (DEF-004)
3. **Remove `test.fail()` wrappers** once backend fixes are deployed and verified
4. **Run a fresh Allure report** after backend fixes to establish a genuine 100% functional pass rate
5. **Add automated consistency checks in CI** to detect drift between `test_cases.csv`, `suite_mapping.csv`, and execution pack files
6. **Expand cross-browser coverage** to at least one test per requirement (currently only 5 tests across 3 requirements)
7. **Update the gate policy** to account for `test.fail()` tests — either exclude them from pass-rate calculations or track them separately

---

_Conformance review generated by automated analysis of Allure results (183 files), test_cases.csv (61 tests), execution_packs (17 CSV files), test spec sources, and supplementary review documents._
