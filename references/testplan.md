# Master Test Plan Revised

**Project:** Automation in Testing Platform (E2E)  
**Application Under Test:** https://automationintesting.online/  
**API Reference:** Restful Booker Platform Postman documentation  
**Document ID:** TP-E2E-002  
**Version:** 2.0
**Authors:** Eugene Popov, AI  
**Date:** May 16, 2026

---

## 1) Purpose and Quality Goals

This plan defines a robust automation strategy to detect regressions after updates and ensure a seamless user journey from browsing to checkout.

Primary goals:

- Protect critical business paths with stable, repeatable automation.
- Combine UI and API validation for faster feedback and stronger defect isolation.
- Reduce flaky tests through resilient selectors, dynamic waits, and deterministic test data.
- Provide actionable reporting via Allure with historical trends in CI.

---

## 2) Scope

### In Scope

1. Admin authentication (Login/Logout)
2. Frontend behavior (buttons, menu links, in-page anchors)
3. Shopping cart/booking management (add, update, remove)
4. Checkout flow (field validation + successful purchase)
5. Branding read/update validation
6. Contact form validation and submission
7. Message management CRUD
8. Room management CRUD
9. Calendar report generation (room-specific + all-room availability)
10. API automation layer for critical backend endpoints
11. Cross-browser runs (Chromium, Firefox, WebKit)
12. Visual regression checks (baseline-based)

### Out of Scope

- Load/performance/stress testing
- Penetration testing
- Third-party payment processor deep integration (if external/mocked)

---

## 3) Test Strategy

### 3.1 Test Levels

- **API Tests:** fast validation of backend contracts, status codes, payload integrity, and key business rules.
- **UI E2E Tests (Playwright):** real-user flows and UI behavior.
- **Visual Regression:** layout/snapshot checks for critical pages/components.
- **Cross-browser:** Chromium, Firefox, WebKit matrix.

### 3.2 Test Design Techniques (explicitly applied)

- **Equivalence Partitioning:** valid/invalid classes for login, contact, checkout, branding fields.
- **Boundary Value Analysis:** min/max length, date boundaries, numeric boundaries (prices/capacity where applicable).
- **Decision Tables:** checkout field combinations, required/optional logic, room update constraints.
- **State Transition Testing:** cart states (empty -> added -> updated -> removed -> checkout completed).
- **Pairwise/Combinatorial:** browser × suite × role × critical field combinations to optimize coverage.

---

## 4) Requirements Traceability (High-Level)

| Req ID | Requirement                      | UI E2E | API | Priority |
| ------ | -------------------------------- | -----: | --: | -------- |
| R1     | Admin login/logout               |     ✅ |  ✅ | P0       |
| R2     | Frontend links/buttons/anchors   |     ✅ |  ➖ | P1       |
| R3     | Cart/booking add-update-remove   |     ✅ |  ✅ | P0       |
| R4     | Checkout validation + completion |     ✅ |  ✅ | P0       |
| R5     | Branding read/update             |     ✅ |  ✅ | P1       |
| R6     | Contact form validation          |     ✅ |  ✅ | P1       |
| R7     | Message CRUD                     |     ✅ |  ✅ | P1       |
| R8     | Room CRUD                        |     ✅ |  ✅ | P0       |
| R9     | Calendar report generation       |     ✅ |  ✅ | P1       |

---

## 5) Automation Standards

### 5.1 Framework & Tooling

- **Playwright (JavaScript/TypeScript)**
- **Allure Report** (with history)
- **GitHub Actions**
- **Jira + QA Sphere** for test and defect management

### 5.2 Selector Policy

Priority order:

1. `getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`
2. stable `data-test-id` / `data-testid`
3. avoid long XPath and styling-based selectors

### 5.3 Assertions Policy

Each test must include meaningful assertions:

- URL/navigation correctness
- element visibility/enabled/disabled/state
- network/API response status + key payload assertions
- for visual tests: snapshot comparison with controlled threshold

### 5.4 Flakiness Prevention

- No fixed waits (`sleep`, `wait(5000)`)
- Use dynamic waits (`expect().toBeVisible`, `waitForResponse`, UI state readiness)
- Isolated test data (UUID-based entities)
- Cleanup via API in teardown hooks

### 5.5 Hooks and Reuse

- `beforeAll`: auth/session setup, test fixtures bootstrap
- `beforeEach`: per-test data setup
- `afterEach`: cleanup created entities
- `afterAll`: global cleanup, report attachment finalization
- Use POM + API client helpers

---

## 6) Test Suites and Tags

- `@smoke`: critical path sanity (login, add-to-cart, checkout happy path, room read)
- `@sanity`: core functional confidence after minor changes
- `@regression`: full UI + API coverage
- `@api`: backend-only suite
- `@visual`: snapshot suite
- `@cross-browser`: browser matrix executions

---

## 7) Environment & Data

- **Env:** stable test/staging target of automationintesting.online
- **Browsers:** Chromium, Firefox, WebKit
- **Data strategy:**
  - deterministic seed data where possible
  - unique runtime data for create/update/delete tests
  - strict cleanup to guarantee test independence

---

## 8) Entry / Exit Criteria

### Entry

- Environment reachable
- Required test credentials available
- Core APIs healthy
- Baseline visual snapshots approved

### Exit

- Smoke: 100% pass (blocking gate)
- Sanity/Regression: no open Critical/High defects for release
- API suite stable and passing for critical endpoints
- Allure report generated with trends and artifacts

---

## 9) Defect & Reporting Process

- Defects logged in **Jira** with severity, reproducibility, evidence.
- Test cases and execution mapped in **QA Sphere**.
- All runs publish to **Allure** with:
  - pass/fail trend
  - flaky test list
  - retries
  - screenshots/videos/traces
  - API request/response attachments for failed cases

---

## 10) CI/CD Plan (GitHub Actions)

Pipeline supports:

- manual and PR triggers
- selectable suite type (`smoke`, `sanity`, `regression`, `api`, `visual`, `all`)
- browser matrix
- parallel execution
- Allure history persistence (e.g., GitHub Pages artifact/history branch)

Expected workflow behavior:

1. Checkout + Node setup
2. Install deps + browsers
3. Run selected tagged suite(s)
4. Publish Playwright artifacts
5. Generate/publish Allure report with history
6. Fail pipeline on gate violations

---

## 11) Risks and Mitigation

| Risk                    | Impact      | Mitigation                                                 |
| ----------------------- | ----------- | ---------------------------------------------------------- |
| UI locator instability  | High        | enforce data-test-id + locator review checklist            |
| Flaky async behavior    | High        | dynamic waits, API-assisted setup/cleanup                  |
| Environment instability | Medium/High | health check before run, auto-rerun non-prod failures once |
| Visual false positives  | Medium      | stable viewport, font/env pinning, region masking          |

---

## 12) Deliverables

1. Revised Master Test Plan (this document)
2. Test scenario catalog in QA Sphere/Jira
3. Playwright automation project (UI + API + visual + cross-browser)
4. GitHub Actions workflow(s)
5. Allure report with historical trends
6. Traceability matrix (Requirements ↔ Tests ↔ Defects)
