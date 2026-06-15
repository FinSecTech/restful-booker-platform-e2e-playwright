# Playwright QA Automation Framework

[![Playwright](https://img.shields.io/badge/Playwright-1.60+-45ba4b?logo=playwright)](https://playwright.dev/)
[![Allure](https://img.shields.io/badge/Allure-2.41-orange?logo=allure)](https://allurereport.org/)
[![GitHub Actions](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions)](https://github.com/features/actions)
[![License](https://img.shields.io/badge/License-CC%20BY--NC-lightgrey)](LICENSE)

End-to-end automated test framework for **[Restful-Booker-Platform](https://automationintesting.online/)** — a hotel booking demo application. Built with **Playwright + Allure + GitHub Actions** for stable CI regression detection, strong API/UI coverage, and report history with trend analytics.

```
61 test cases · 3 browsers · 9 requirements · 100% automated · all requirements fully covered
Allure raw pass rate: 100% (183/183) · functional pass rate: 93.4% (see "Quality & Conformance")
```

---

## ☕ Support the Project

If this project saves you time or helps you learn, consider tossing a coin my way. I expect donations of a **random value somewhere between your minimum and your maximum** — no pressure, no expectations, just good karma. 😊

<table>
  <tr>
    <td align="center">
      <img src="references/bitcoin.png" width="140" alt="Bitcoin QR" /><br />
      <strong>Bitcoin</strong><br />
      <code>bc1qxh5fu8m7wufgnjsuccp85l7gnrd5udq4lux3x8</code>
    </td>
    <td align="center">
      <img src="references/ethereum.png" width="140" alt="Ethereum QR" /><br />
      <strong>Ethereum</strong><br />
      <code>0xed1b82d666058e984f2f7c71b75306d68314e426</code>
    </td>
    <td align="center">
      <img src="references/solana.png" width="140" alt="Solana QR" /><br />
      <strong>Solana</strong><br />
      <code>8hjdfPEGuA5tDKfgxsRnMw9QZrxEiMBttTHybcqYqTNL</code>
    </td>
  </tr>
</table>

---

## 📚 Documentation

| Document                                                              | Description                                                  |
| --------------------------------------------------------------------- | ------------------------------------------------------------ |
| [`testplan.md`](./references/testplan.md)                             | Master Test Plan — scope, strategy, quality goals, CI gates  |
| [`test_cases.md`](./references/test_cases.md)                         | Full test case catalog — 61 cases with steps and techniques  |
| [`review_final.md`](./references/review_final.md)                     | Conformance review — Allure ↔ CSV ↔ Test Plan reconciliation |
| [`review_failedAPI_by_AI.md`](./references/review_failedAPI_by_AI.md) | Root cause analysis of known backend bugs                    |

---

## 🎯 Coverage Summary

### Requirements Traceability

| Req | Description               | Priority | Tests | UI  | API |
| --- | ------------------------- | -------- | ----- | :-: | :-: |
| R1  | Admin login/logout        | **P0**   | 7     | ✅  | ✅  |
| R2  | Frontend navigation       | P1       | 6     | ✅  | ➖  |
| R3  | Cart / booking management | **P0**   | 8     | ✅  | ✅  |
| R4  | Checkout flow             | **P0**   | 8     | ✅  | ✅  |
| R5  | Branding read/update      | P1       | 4     | ✅  | ✅  |
| R6  | Contact form              | P1       | 6     | ✅  | ✅  |
| R7  | Message CRUD              | P1       | 6     | ✅  | ✅  |
| R8  | Room CRUD                 | **P0**   | 7     | ✅  | ✅  |
| R9  | Calendar reports          | P1       | 5     | ✅  | ✅  |

### Priority Distribution

- **P0** — 14 critical path tests
- **P1** — 41 core functional tests
- **P2** — 6 edge case tests

### Test Design Techniques

Equivalence Partitioning · Boundary Value Analysis · Decision Tables · State Transition · Pairwise/Combinatorial · Negative Testing · Contract Testing · Snapshot/Pixel Comparison

---

## 🧰 Tech Stack

| Tool                                                                                        | Purpose                                              |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [Playwright](https://playwright.dev/)                                                       | UI + API test automation                             |
| [Allure Playwright](https://www.npmjs.com/package/allure-playwright) + `allure-commandline` | Rich test reporting with history trends              |
| [dotenvx](https://dotenvx.com/)                                                             | Encrypted environment configuration                  |
| [GitHub Actions](https://github.com/features/actions)                                       | CI/CD pipeline with suite selection & browser matrix |
| [Luxon](https://moment.github.io/luxon/)                                                    | Date/time utilities                                  |
| [Faker](https://fakerjs.dev/)                                                               | Deterministic test data generation                   |

---

## 📁 Project Structure

```text
.
├── pages/                          # Page Object Models
│   ├── home_page.js
│   ├── reservation_page.js
│   └── admin/
│       ├── admin_auth_page.js
│       ├── admin_nav_page.js
│       ├── room_page.js
│       ├── report_page.js
│       ├── branding_page.js
│       └── message_page.js
├── tests/
│   ├── fixtures/
│   │   └── test-fixtures.js        # Dependency injection setup
│   ├── support/
│   │   ├── env-config.js           # Environment configuration
│   │   ├── data-builders.js        # Test data builders
│   │   ├── api/                    # Domain-specific API clients
│   │   │   ├── base-api.js
│   │   │   ├── auth.api.js
│   │   │   ├── room.api.js
│   │   │   ├── booking.api.js
│   │   │   ├── message.api.js
│   │   │   ├── branding.api.js
│   │   │   ├── report.api.js
│   │   │   └── factory.js
│   │   └── helpers/
│   │       └── date-window.js
│   ├── ui/                         # UI E2E test specs
│   ├── api/                        # API test specs
│   └── visual/                     # Visual regression specs
├── references/                     # Project documentation
│   ├── testplan.md                 # Master Test Plan (v2.0)
│   ├── test_cases.md               # Test case catalog
│   ├── review_final.md             # Conformance review
│   ├── review_failedAPI_by_AI.md   # API bug analysis
│   ├── wallets.md                  # Donation wallet addresses
│   ├── bitcoin.png                 # BTC donation QR
│   ├── ethereum.png                # ETH donation QR
│   └── solana.png                  # SOL donation QR
├── .github/workflows/
│   └── playwright-allure.yml       # CI pipeline
├── playwright.config.js
├── .gitignore
├── .env.production
└── package.json
```

> Generated/test artifacts (`allure-results/`, `allure-report/`, `test-results/`, `playwright-report/`, `execution_packs/`, `node_modules/`, and others) are gitignored and excluded from the repository — see [`.gitignore`](./.gitignore).

---

## 🧪 Test Suites & Tags

| Suite              | Tag           | Tests | Description                                                    |
| ------------------ | ------------- | :---: | -------------------------------------------------------------- |
| **Smoke**          | `@smoke`      |   9   | Critical path sanity — login, add-to-cart, checkout, room read |
| **Sanity**         | `@sanity`     |  17   | Core functional confidence after minor changes                 |
| **Regression-UI**  | `@regression` |  46   | Full UI + API behavioral coverage                              |
| **Regression-API** | `@api`        |  29   | Backend-only contract & business rule validation               |
| **Visual**         | `@visual`     |   4   | Snapshot-based layout comparison                               |
| **Cross-Browser**  | _(implicit)_  |   6   | P0 flows across Chromium, Firefox, WebKit                      |
| **Full**           | _(CI)_        |   4   | Pipeline integrity checks                                      |

---

## ⚙️ Prerequisites

- **Node.js** 20+
- **npm**
- **Java 17+** (required for local Allure report generation)
- **Playwright browsers**

---

## 🔧 Setup

### 1) Install dependencies

```bash
npm ci
```

### 2) Install Playwright browsers

```bash
npx playwright install --with-deps
```

### 3) Configure environment

This project uses `dotenvx` with an encrypted `.env.production` file. Set the decryption key:

```bash
export DOTENV_PRIVATE_KEY_PRODUCTION="<your_key>"
```

> In CI, this is provided via the `DOTENV_PRIVATE_KEY_PRODUCTION` secret.

### 4) Verify

```bash
npm test -- --grep @smoke
```

---

## 🚀 Run Tests

### All tests

```bash
npm test
```

### Tagged suites

```bash
npm run test:smoke
npm run test:sanity
npm run test:regression
npm run test:api
npm run test:visual
```

### Single file / grep

```bash
npx dotenvx run -f .env.production -- npx playwright test tests/api/core-api.spec.js --project=chromium

npx dotenvx run -f .env.production -- npx playwright test --grep "AUTH-001"
```

---

## 📊 Allure Reporting

### Generate & open locally

```bash
npm run allure:generate
npm run allure:open
```

Results land in `allure-results/`; the HTML report is built into `allure-report/`.

### CI trend widgets

The CI workflow preserves report history across runs, enabling trend charts for pass rate, duration, and flaky tests over time.

---

## 🤖 CI/CD (GitHub Actions)

**Workflow:** `.github/workflows/playwright-allure.yml`

**Capabilities:**

- Trigger on **push** / **PR** / **manual dispatch**
- **Suite selection** — `smoke` | `sanity` | `regression` | `api` | `visual` | `all`
- **Browser matrix** — Chromium, Firefox, WebKit
- **Parallel execution** within each browser project
- **Artifact upload** — screenshots, videos, traces on failure
- **Allure report** — auto-generated, published to `gh-pages` with history persistence

### Gate policy

| Gate               | Required Pass Rate | Blocking |
| ------------------ | :----------------: | :------: |
| **Smoke**          |      100% P0       |   Yes    |
| **Sanity**         |  100% P0, ≥95% P1  |   Yes    |
| **Regression-API** |  100% P0, ≥95% P1  |   Yes    |
| **Regression-UI**  |  100% P0, ≥95% P1  |   Yes    |
| **Visual**         |      ≥95% P1       | Advisory |

---

## 🧹 Quality & Conformance

This project undergoes **automated conformance reviews** to ensure alignment between the test plan, test case catalog, execution packs, and Allure results.

### Summary

| Metric                                     |                      Result                      |
| ------------------------------------------ | :----------------------------------------------: |
| **Allure raw pass rate** (183/183 results) |                   ✅ **100%**                    |
| **Requirements coverage** (R1–R9)          |            ✅ **All 9 fully covered**            |
| **CSV ↔ Allure match**                     | ✅ 61/61 tests matched, zero missing, zero extra |
| **Execution pack consistency**             |   ✅ 7/7 suite packs verified against mapping    |
| **XRay export consistency**                |             ✅ 2/2 exports verified              |
| **RTM accuracy**                           |           ✅ 9/9 requirements correct            |

### Functional pass rate: 93.4% — what this means

The Allure raw pass rate is 100%, but **4 test cases** use Playwright's `test.fail()` API, which inverts pass/fail semantics. These tests are _expected_ to fail because they validate against known backend bugs — they "pass" in Allure only because the bugs are still present. The _true_ functional pass rate (what would happen if we ran the tests without `test.fail()`) is **57/61 = 93.4%**.

| Test         | Backend Bug                            | Expected                 | Actual                          |
| ------------ | -------------------------------------- | ------------------------ | ------------------------------- |
| **CHK-006**  | `POST /booking` accepts empty fields   | 400 error                | 201 success with empty data     |
| **ROOM-005** | `DELETE /room` ignores active bookings | Block deletion (400/409) | Deletes room + orphaned booking |
| **BR-002**   | `PUT /branding` doesn't persist fields | Values survive re-read   | Revert on re-read               |
| **BR-004**   | Same as BR-002 (branding restore)      | Restore works            | Doesn't persist                 |

**Bottom line:** The framework, test design, and coverage are solid — all 61 tests correctly implement the specification. The 93.4% figure reflects **backend API deficiencies**, not test quality. See [`review_failedAPI_by_AI.md`](./references/review_failedAPI_by_AI.md) for full root cause analysis and [`review_final.md`](./references/review_final.md) for the complete conformance audit.

---

## 🏗 Design Principles

- **Page Object Models** split by responsibility (`AdminAuthPage` vs `AdminNavPage`)
- **Dependency injection** via Playwright test fixtures (`tests/fixtures/test-fixtures.js`)
- **Modular API clients** — one file per domain (`tests/support/api/*.api.js`)
- **Data builders** + **env config** separated for SRP compliance
- **No fixed waits** — dynamic waits (`toBeVisible`, `waitForResponse`, UI state readiness)
- **Isolated test data** — UUID-based entities with API cleanup in teardown hooks
- **Selector priority**: `getByRole` / `getByLabel` → `data-testid` → avoid XPath/styling selectors

---

## 🔍 Troubleshooting

| Problem                          | Likely Cause             | Fix                                                 |
| -------------------------------- | ------------------------ | --------------------------------------------------- |
| `Cannot navigate to invalid URL` | `BASE_URL` missing       | Run through `dotenvx` with decrypt key set          |
| `allure` command fails           | Java 17+ not installed   | `export JAVA_HOME=/path/to/java17`                  |
| Visual tests fail unexpectedly   | Viewport / font mismatch | Pin viewport in config, run in CI with matching env |
| Flaky API tests                  | Test data collision      | Ensure `afterEach` cleanup runs, use unique names   |

---

## 📄 License

**CC BY-NC 4.0** — This project is licensed under Creative Commons Attribution-NonCommercial 4.0 International.

---

_Built with ❤️ using Playwright & Allure — because good testing is the best sleeping pill._

---

> **Enjoyed this?** If you found this project useful, donations of a random value (between your minimum and maximum, of course) are always welcome at the crypto addresses above. Every bit helps keep the motivation going! 🚀
