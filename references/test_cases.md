# Test Cases Documentation

> **Source:** `test_cases.csv`  
> **Total Test Cases:** 61  
> **Generated:** 2026-06-13

---

## Table of Contents

1. [Authentication (AUTH)](#1-authentication-auth)
2. [Frontend Navigation (FE)](#2-frontend-navigation-fe)
3. [Cart Booking (CART)](#3-cart-booking-cart)
4. [Checkout (CHK)](#4-checkout-chk)
5. [Branding Management (BR)](#5-branding-management-br)
6. [Contact Form (CNT)](#6-contact-form-cnt)
7. [Message Management (MSG)](#7-message-management-msg)
8. [Room Management (ROOM)](#8-room-management-room)
9. [Calendar Reports (CAL)](#9-calendar-reports-cal)
10. [API Contracts (API)](#10-api-contracts-api)
11. [Visual Regression (VIS)](#11-visual-regression-vis)
12. [CI Pipeline (CI)](#12-ci-pipeline-ci)

---

## 1. Authentication (AUTH)

**Requirement:** R1 — Admin Authentication

| ID       | Summary                                    | Priority | Suite Types                                 | Automation   |
| -------- | ------------------------------------------ | -------- | ------------------------------------------- | ------------ |
| AUTH-001 | Valid admin login                          | P0       | Smoke; Sanity; Regression-UI; Cross-Browser | ✅ Automated |
| AUTH-002 | Invalid credentials matrix                 | P0       | Smoke; Regression-UI                        | ✅ Automated |
| AUTH-003 | Login required fields validation           | P1       | Sanity; Regression-UI                       | ✅ Automated |
| AUTH-004 | Logout invalidates session                 | P0       | Smoke; Regression-UI; Cross-Browser         | ✅ Automated |
| AUTH-005 | Protected admin route blocked without auth | P1       | Sanity; Regression-UI; Regression-API       | ✅ Automated |

### AUTH-001 — Valid admin login

| Field               | Value                                                                        |
| ------------------- | ---------------------------------------------------------------------------- |
| **ID**              | AUTH-001                                                                     |
| **Requirement**     | R1                                                                           |
| **Priority**        | P0                                                                           |
| **Labels**          | `auth` `ui` `smoke`                                                          |
| **Component**       | Admin Authentication                                                         |
| **Issue Type**      | Test                                                                         |
| **Suite Types**     | Smoke; Sanity; Regression-UI; Cross-Browser                                  |
| **Technique**       | Equivalence Partitioning (EP)                                                |
| **Preconditions**   | Valid admin credentials exist                                                |
| **Test Steps**      | 1. Open login page<br>2. Enter valid username and password<br>3. Click Login |
| **Expected Result** | Dashboard opens and logout control is visible                                |
| **Automation**      | ✅ Automated                                                                 |

### AUTH-002 — Invalid credentials matrix

| Field               | Value                                                                       |
| ------------------- | --------------------------------------------------------------------------- |
| **ID**              | AUTH-002                                                                    |
| **Requirement**     | R1                                                                          |
| **Priority**        | P0                                                                          |
| **Labels**          | `auth` `ui` `negative`                                                      |
| **Component**       | Admin Authentication                                                        |
| **Issue Type**      | Test                                                                        |
| **Suite Types**     | Smoke; Regression-UI                                                        |
| **Technique**       | Decision Table                                                              |
| **Preconditions**   | Login page is accessible                                                    |
| **Test Steps**      | Submit invalid credential combinations (wrong user, wrong pass, both wrong) |
| **Expected Result** | Error is shown and user stays on login page                                 |
| **Automation**      | ✅ Automated                                                                |

### AUTH-003 — Login required fields validation

| Field               | Value                                                                      |
| ------------------- | -------------------------------------------------------------------------- |
| **ID**              | AUTH-003                                                                   |
| **Requirement**     | R1                                                                         |
| **Priority**        | P1                                                                         |
| **Labels**          | `auth` `ui` `validation`                                                   |
| **Component**       | Admin Authentication                                                       |
| **Issue Type**      | Test                                                                       |
| **Suite Types**     | Sanity; Regression-UI                                                      |
| **Technique**       | Decision Table                                                             |
| **Preconditions**   | Login page is accessible                                                   |
| **Test Steps**      | 1. Submit empty form<br>2. Submit only username<br>3. Submit only password |
| **Expected Result** | Field validation appears and login is blocked                              |
| **Automation**      | ✅ Automated                                                               |

### AUTH-004 — Logout invalidates session

| Field               | Value                                           |
| ------------------- | ----------------------------------------------- |
| **ID**              | AUTH-004                                        |
| **Requirement**     | R1                                              |
| **Priority**        | P0                                              |
| **Labels**          | `auth` `ui` `session`                           |
| **Component**       | Admin Authentication                            |
| **Issue Type**      | Test                                            |
| **Suite Types**     | Smoke; Regression-UI; Cross-Browser             |
| **Technique**       | State Transition                                |
| **Preconditions**   | Admin is logged in                              |
| **Test Steps**      | 1. Click Logout<br>2. Open protected admin URL  |
| **Expected Result** | Redirect to login and no active session remains |
| **Automation**      | ✅ Automated                                    |

### AUTH-005 — Protected admin route blocked without auth

| Field               | Value                                    |
| ------------------- | ---------------------------------------- |
| **ID**              | AUTH-005                                 |
| **Requirement**     | R1                                       |
| **Priority**        | P1                                       |
| **Labels**          | `auth` `ui` `api` `security`             |
| **Component**       | Admin Authentication                     |
| **Issue Type**      | Test                                     |
| **Suite Types**     | Sanity; Regression-UI; Regression-API    |
| **Technique**       | Negative Testing                         |
| **Preconditions**   | No active authenticated session          |
| **Test Steps**      | Navigate directly to protected admin URL |
| **Expected Result** | Access is denied and redirected to login |
| **Automation**      | ✅ Automated                             |

---

## 2. Frontend Navigation (FE)

**Requirement:** R2 — Frontend Navigation

| ID     | Summary                                     | Priority | Suite Types                          | Automation   |
| ------ | ------------------------------------------- | -------- | ------------------------------------ | ------------ |
| FE-001 | Header menu anchors map correctly           | P1       | Sanity; Regression-UI; Cross-Browser | ✅ Automated |
| FE-002 | All primary and secondary buttons clickable | P1       | Regression-UI                        | ✅ Automated |
| FE-003 | Internal links return healthy responses     | P1       | Sanity; Regression-UI                | ✅ Automated |
| FE-004 | Keyboard navigation for top actions         | P2       | Regression-UI                        | ✅ Automated |
| FE-005 | Footer links correctness                    | P2       | Regression-UI                        | ✅ Automated |

### FE-001 — Header menu anchors map correctly

| Field               | Value                                              |
| ------------------- | -------------------------------------------------- |
| **ID**              | FE-001                                             |
| **Requirement**     | R2                                                 |
| **Priority**        | P1                                                 |
| **Labels**          | `frontend` `ui` `navigation`                       |
| **Component**       | Frontend Navigation                                |
| **Issue Type**      | Test                                               |
| **Suite Types**     | Sanity; Regression-UI; Cross-Browser               |
| **Technique**       | Decision Table                                     |
| **Preconditions**   | Home page is loaded                                |
| **Test Steps**      | Click each header menu item                        |
| **Expected Result** | Correct section is focused and fragment is correct |
| **Automation**      | ✅ Automated                                       |

### FE-002 — All primary and secondary buttons clickable

| Field               | Value                                              |
| ------------------- | -------------------------------------------------- |
| **ID**              | FE-002                                             |
| **Requirement**     | R2                                                 |
| **Priority**        | P1                                                 |
| **Labels**          | `frontend` `ui` `clickability`                     |
| **Component**       | Frontend Navigation                                |
| **Issue Type**      | Test                                               |
| **Suite Types**     | Regression-UI                                      |
| **Technique**       | Combinatorial                                      |
| **Preconditions**   | Home page is loaded                                |
| **Test Steps**      | Click each visible button once                     |
| **Expected Result** | Each button executes expected navigation or action |
| **Automation**      | ✅ Automated                                       |

### FE-003 — Internal links return healthy responses

| Field               | Value                                                |
| ------------------- | ---------------------------------------------------- |
| **ID**              | FE-003                                               |
| **Requirement**     | R2                                                   |
| **Priority**        | P1                                                   |
| **Labels**          | `frontend` `ui` `links`                              |
| **Component**       | Frontend Navigation                                  |
| **Issue Type**      | Test                                                 |
| **Suite Types**     | Sanity; Regression-UI                                |
| **Preconditions**   | Site is reachable                                    |
| **Test Steps**      | Open key internal links                              |
| **Expected Result** | All links resolve and destination content is visible |
| **Automation**      | ✅ Automated                                         |

### FE-004 — Keyboard navigation for top actions

| Field               | Value                                       |
| ------------------- | ------------------------------------------- |
| **ID**              | FE-004                                      |
| **Requirement**     | R2                                          |
| **Priority**        | P2                                          |
| **Labels**          | `frontend` `ui` `accessibility`             |
| **Component**       | Frontend Navigation                         |
| **Issue Type**      | Test                                        |
| **Suite Types**     | Regression-UI                               |
| **Preconditions**   | Home page is loaded                         |
| **Test Steps**      | Navigate with Tab and activate with Enter   |
| **Expected Result** | Focus order is logical and activation works |
| **Automation**      | ✅ Automated                                |

### FE-005 — Footer links correctness

| Field               | Value                                             |
| ------------------- | ------------------------------------------------- |
| **ID**              | FE-005                                            |
| **Requirement**     | R2                                                |
| **Priority**        | P2                                                |
| **Labels**          | `frontend` `ui` `links`                           |
| **Component**       | Frontend Navigation                               |
| **Issue Type**      | Test                                              |
| **Suite Types**     | Regression-UI                                     |
| **Preconditions**   | Home page is loaded                               |
| **Test Steps**      | Click footer links and validate destination       |
| **Expected Result** | Footer links open expected targets with no errors |
| **Automation**      | ✅ Automated                                      |

---

## 3. Cart Booking (CART)

**Requirement:** R3 — Cart Booking

| ID       | Summary                             | Priority | Suite Types                                 | Automation   |
| -------- | ----------------------------------- | -------- | ------------------------------------------- | ------------ |
| CART-001 | Add booking to cart                 | P0       | Smoke; Sanity; Regression-UI; Cross-Browser | ✅ Automated |
| CART-002 | Update booking in cart              | P0       | Sanity; Regression-UI                       | ✅ Automated |
| CART-003 | Remove booking from cart            | P0       | Smoke; Regression-UI                        | ✅ Automated |
| CART-004 | Clear multi item cart               | P1       | Regression-UI                               | ✅ Automated |
| CART-005 | Cart persistence across refresh     | P1       | Sanity; Regression-UI                       | ✅ Automated |
| CART-006 | Prevent overlapping invalid booking | P1       | Regression-UI; Regression-API               | ✅ Automated |
| CART-007 | Price recalculation on updates      | P1       | Sanity; Regression-UI                       | ✅ Automated |

### CART-001 — Add booking to cart

| Field               | Value                                             |
| ------------------- | ------------------------------------------------- |
| **ID**              | CART-001                                          |
| **Requirement**     | R3                                                |
| **Priority**        | P0                                                |
| **Labels**          | `cart` `ui` `smoke`                               |
| **Component**       | Cart Booking                                      |
| **Issue Type**      | Test                                              |
| **Suite Types**     | Smoke; Sanity; Regression-UI; Cross-Browser       |
| **Preconditions**   | At least one room and date are available          |
| **Test Steps**      | 1. Select room and date<br>2. Add booking         |
| **Expected Result** | Cart count increases and item details are correct |
| **Automation**      | ✅ Automated                                      |

### CART-002 — Update booking in cart

| Field               | Value                                      |
| ------------------- | ------------------------------------------ |
| **ID**              | CART-002                                   |
| **Requirement**     | R3                                         |
| **Priority**        | P0                                         |
| **Labels**          | `cart` `ui`                                |
| **Component**       | Cart Booking                               |
| **Issue Type**      | Test                                       |
| **Suite Types**     | Sanity; Regression-UI                      |
| **Preconditions**   | Cart contains at least one booking         |
| **Test Steps**      | Edit booking dates or options in cart      |
| **Expected Result** | Cart line and totals recalculate correctly |
| **Automation**      | ✅ Automated                               |

### CART-003 — Remove booking from cart

| Field               | Value                                       |
| ------------------- | ------------------------------------------- |
| **ID**              | CART-003                                    |
| **Requirement**     | R3                                          |
| **Priority**        | P0                                          |
| **Labels**          | `cart` `ui` `smoke`                         |
| **Component**       | Cart Booking                                |
| **Issue Type**      | Test                                        |
| **Suite Types**     | Smoke; Regression-UI                        |
| **Preconditions**   | Cart contains at least one booking          |
| **Test Steps**      | Remove item from cart                       |
| **Expected Result** | Item is removed and totals update correctly |
| **Automation**      | ✅ Automated                                |

### CART-004 — Clear multi item cart

| Field               | Value                                            |
| ------------------- | ------------------------------------------------ |
| **ID**              | CART-004                                         |
| **Requirement**     | R3                                               |
| **Priority**        | P1                                               |
| **Labels**          | `cart` `ui`                                      |
| **Component**       | Cart Booking                                     |
| **Issue Type**      | Test                                             |
| **Suite Types**     | Regression-UI                                    |
| **Preconditions**   | Cart contains multiple items                     |
| **Test Steps**      | Use clear cart action                            |
| **Expected Result** | All items removed and empty cart state displayed |
| **Automation**      | ✅ Automated                                     |

### CART-005 — Cart persistence across refresh

| Field               | Value                                        |
| ------------------- | -------------------------------------------- |
| **ID**              | CART-005                                     |
| **Requirement**     | R3                                           |
| **Priority**        | P1                                           |
| **Labels**          | `cart` `ui` `state`                          |
| **Component**       | Cart Booking                                 |
| **Issue Type**      | Test                                         |
| **Suite Types**     | Sanity; Regression-UI                        |
| **Preconditions**   | Cart has at least one item                   |
| **Test Steps**      | 1. Refresh page<br>2. Navigate away and back |
| **Expected Result** | Cart state remains consistent                |
| **Automation**      | ✅ Automated                                 |

### CART-006 — Prevent overlapping invalid booking

| Field               | Value                                       |
| ------------------- | ------------------------------------------- |
| **ID**              | CART-006                                    |
| **Requirement**     | R3                                          |
| **Priority**        | P1                                          |
| **Labels**          | `cart` `ui` `api` `negative`                |
| **Component**       | Cart Booking                                |
| **Issue Type**      | Test                                        |
| **Suite Types**     | Regression-UI; Regression-API               |
| **Technique**       | Negative Testing                            |
| **Preconditions**   | Existing booking overlaps selected dates    |
| **Test Steps**      | Attempt to add overlapping booking          |
| **Expected Result** | User sees conflict and booking is not added |
| **Automation**      | ✅ Automated                                |

### CART-007 — Price recalculation on updates

| Field               | Value                                          |
| ------------------- | ---------------------------------------------- |
| **ID**              | CART-007                                       |
| **Requirement**     | R3                                             |
| **Priority**        | P1                                             |
| **Labels**          | `cart` `ui` `pricing`                          |
| **Component**       | Cart Booking                                   |
| **Issue Type**      | Test                                           |
| **Suite Types**     | Sanity; Regression-UI                          |
| **Preconditions**   | Cart has editable item                         |
| **Test Steps**      | Modify booking affecting price                 |
| **Expected Result** | Displayed total equals expected computed total |
| **Automation**      | ✅ Automated                                   |

---

## 4. Checkout (CHK)

**Requirement:** R4 — Checkout

| ID      | Summary                                    | Priority | Suite Types                                 | Automation   |
| ------- | ------------------------------------------ | -------- | ------------------------------------------- | ------------ |
| CHK-001 | Successful checkout                        | P0       | Smoke; Sanity; Regression-UI; Cross-Browser | ✅ Automated |
| CHK-002 | Checkout required fields matrix            | P0       | Smoke; Regression-UI                        | ✅ Automated |
| CHK-003 | Checkout email and phone format validation | P1       | Sanity; Regression-UI                       | ✅ Automated |
| CHK-004 | Checkout boundary value validation         | P1       | Regression-UI                               | ✅ Automated |
| CHK-005 | Duplicate submit protection                | P1       | Regression-UI; Regression-API               | ✅ Automated |
| CHK-006 | Checkout backend failure handling          | P1       | Regression-UI; Regression-API               | ✅ Automated |
| CHK-007 | Post purchase state reset                  | P1       | Sanity; Regression-UI                       | ✅ Automated |

### CHK-001 — Successful checkout

| Field               | Value                                                 |
| ------------------- | ----------------------------------------------------- |
| **ID**              | CHK-001                                               |
| **Requirement**     | R4                                                    |
| **Priority**        | P0                                                    |
| **Labels**          | `checkout` `ui` `smoke`                               |
| **Component**       | Checkout                                              |
| **Issue Type**      | Test                                                  |
| **Suite Types**     | Smoke; Sanity; Regression-UI; Cross-Browser           |
| **Technique**       | Equivalence Partitioning (EP)                         |
| **Preconditions**   | Cart contains valid item                              |
| **Test Steps**      | 1. Fill mandatory fields with valid data<br>2. Submit |
| **Expected Result** | Confirmation is displayed with booking reference      |
| **Automation**      | ✅ Automated                                          |

### CHK-002 — Checkout required fields matrix

| Field               | Value                                                  |
| ------------------- | ------------------------------------------------------ |
| **ID**              | CHK-002                                                |
| **Requirement**     | R4                                                     |
| **Priority**        | P0                                                     |
| **Labels**          | `checkout` `ui` `validation`                           |
| **Component**       | Checkout                                               |
| **Issue Type**      | Test                                                   |
| **Suite Types**     | Smoke; Regression-UI                                   |
| **Technique**       | Decision Table (Pairwise)                              |
| **Preconditions**   | Checkout page is open with item in cart                |
| **Test Steps**      | Submit with required fields missing by pairwise matrix |
| **Expected Result** | Validation shown and order not created                 |
| **Automation**      | ✅ Automated                                           |

### CHK-003 — Checkout email and phone format validation

| Field               | Value                                    |
| ------------------- | ---------------------------------------- |
| **ID**              | CHK-003                                  |
| **Requirement**     | R4                                       |
| **Priority**        | P1                                       |
| **Labels**          | `checkout` `ui` `validation`             |
| **Component**       | Checkout                                 |
| **Issue Type**      | Test                                     |
| **Suite Types**     | Sanity; Regression-UI                    |
| **Preconditions**   | Checkout page is open                    |
| **Test Steps**      | Enter invalid email and phone and submit |
| **Expected Result** | Field errors shown and submit blocked    |
| **Automation**      | ✅ Automated                             |

### CHK-004 — Checkout boundary value validation

| Field               | Value                                      |
| ------------------- | ------------------------------------------ |
| **ID**              | CHK-004                                    |
| **Requirement**     | R4                                         |
| **Priority**        | P1                                         |
| **Labels**          | `checkout` `ui` `bva`                      |
| **Component**       | Checkout                                   |
| **Issue Type**      | Test                                       |
| **Suite Types**     | Regression-UI                              |
| **Technique**       | Boundary Value Analysis (BVA)              |
| **Preconditions**   | Checkout page is open                      |
| **Test Steps**      | Test min-1, min, max, max+1 for key fields |
| **Expected Result** | Boundary behavior matches validation rules |
| **Automation**      | ✅ Automated                               |

### CHK-005 — Duplicate submit protection

| Field               | Value                                |
| ------------------- | ------------------------------------ |
| **ID**              | CHK-005                              |
| **Requirement**     | R4                                   |
| **Priority**        | P1                                   |
| **Labels**          | `checkout` `ui` `api` `idempotency`  |
| **Component**       | Checkout                             |
| **Issue Type**      | Test                                 |
| **Suite Types**     | Regression-UI; Regression-API        |
| **Preconditions**   | Checkout form has valid data         |
| **Test Steps**      | Click submit rapidly twice           |
| **Expected Result** | Only one successful order is created |
| **Automation**      | ✅ Automated                         |

### CHK-006 — Checkout backend failure handling

| Field               | Value                                             |
| ------------------- | ------------------------------------------------- |
| **ID**              | CHK-006                                           |
| **Requirement**     | R4                                                |
| **Priority**        | P1                                                |
| **Labels**          | `checkout` `ui` `api` `negative`                  |
| **Component**       | Checkout                                          |
| **Issue Type**      | Test                                              |
| **Suite Types**     | Regression-UI; Regression-API                     |
| **Technique**       | Negative Testing                                  |
| **Preconditions**   | Fault simulation or error response is available   |
| **Test Steps**      | Submit checkout during forced backend failure     |
| **Expected Result** | User sees error and no duplicate or partial order |
| **Automation**      | ✅ Automated                                      |

### CHK-007 — Post purchase state reset

| Field               | Value                                                    |
| ------------------- | -------------------------------------------------------- |
| **ID**              | CHK-007                                                  |
| **Requirement**     | R4                                                       |
| **Priority**        | P1                                                       |
| **Labels**          | `checkout` `ui` `state`                                  |
| **Component**       | Checkout                                                 |
| **Issue Type**      | Test                                                     |
| **Suite Types**     | Sanity; Regression-UI                                    |
| **Preconditions**   | Successful checkout is completed                         |
| **Test Steps**      | 1. Return to cart area<br>2. Return to confirmation area |
| **Expected Result** | Cart is empty and confirmation reference is visible      |
| **Automation**      | ✅ Automated                                             |

---

## 5. Branding Management (BR)

**Requirement:** R5 — Branding Management

| ID     | Summary                         | Priority | Suite Types                           | Automation   |
| ------ | ------------------------------- | -------- | ------------------------------------- | ------------ |
| BR-001 | Read branding details           | P1       | Sanity; Regression-UI; Regression-API | ✅ Automated |
| BR-002 | Update branding valid values    | P1       | Regression-UI; Regression-API         | ✅ Automated |
| BR-003 | Invalid branding input rejected | P2       | Regression-UI; Regression-API         | ✅ Automated |
| BR-004 | Restore branding baseline       | P1       | Regression-UI; Regression-API         | ✅ Automated |

### BR-001 — Read branding details

| Field               | Value                                    |
| ------------------- | ---------------------------------------- |
| **ID**              | BR-001                                   |
| **Requirement**     | R5                                       |
| **Priority**        | P1                                       |
| **Labels**          | `branding` `ui` `api`                    |
| **Component**       | Branding Management                      |
| **Issue Type**      | Test                                     |
| **Suite Types**     | Sanity; Regression-UI; Regression-API    |
| **Preconditions**   | Admin is logged in                       |
| **Test Steps**      | Open branding section                    |
| **Expected Result** | Branding fields load with current values |
| **Automation**      | ✅ Automated                             |

### BR-002 — Update branding valid values

| Field               | Value                                                              |
| ------------------- | ------------------------------------------------------------------ |
| **ID**              | BR-002                                                             |
| **Requirement**     | R5                                                                 |
| **Priority**        | P1                                                                 |
| **Labels**          | `branding` `ui` `api`                                              |
| **Component**       | Branding Management                                                |
| **Issue Type**      | Test                                                               |
| **Suite Types**     | Regression-UI; Regression-API                                      |
| **Preconditions**   | Admin is on branding edit page                                     |
| **Test Steps**      | 1. Change branding fields with valid data<br>2. Save<br>3. Refresh |
| **Expected Result** | Updated values persist and success is shown                        |
| **Automation**      | ✅ Automated                                                       |

### BR-003 — Invalid branding input rejected

| Field               | Value                                             |
| ------------------- | ------------------------------------------------- |
| **ID**              | BR-003                                            |
| **Requirement**     | R5                                                |
| **Priority**        | P2                                                |
| **Labels**          | `branding` `ui` `api` `validation`                |
| **Component**       | Branding Management                               |
| **Issue Type**      | Test                                              |
| **Suite Types**     | Regression-UI; Regression-API                     |
| **Technique**       | Validation Testing                                |
| **Preconditions**   | Branding edit page is open                        |
| **Test Steps**      | Enter invalid values and save                     |
| **Expected Result** | Validation shown and invalid values are not saved |
| **Automation**      | ✅ Automated                                      |

### BR-004 — Restore branding baseline

| Field               | Value                                 |
| ------------------- | ------------------------------------- |
| **ID**              | BR-004                                |
| **Requirement**     | R5                                    |
| **Priority**        | P1                                    |
| **Labels**          | `branding` `ui` `api` `cleanup`       |
| **Component**       | Branding Management                   |
| **Issue Type**      | Test                                  |
| **Suite Types**     | Regression-UI; Regression-API         |
| **Technique**       | Cleanup Testing                       |
| **Preconditions**   | Branding was modified by test         |
| **Test Steps**      | Run restore baseline step             |
| **Expected Result** | Original branding values are restored |
| **Automation**      | ✅ Automated                          |

---

## 6. Contact Form (CNT)

**Requirement:** R6 — Contact Form

| ID      | Summary                            | Priority | Suite Types                   | Automation   |
| ------- | ---------------------------------- | -------- | ----------------------------- | ------------ |
| CNT-001 | Contact form valid submission      | P1       | Sanity; Regression-UI         | ✅ Automated |
| CNT-002 | Contact required field validation  | P1       | Regression-UI                 | ✅ Automated |
| CNT-003 | Contact invalid email format       | P1       | Sanity; Regression-UI         | ✅ Automated |
| CNT-004 | Contact message boundary checks    | P2       | Regression-UI                 | ✅ Automated |
| CNT-005 | Contact special character handling | P2       | Regression-UI; Regression-API | ✅ Automated |

### CNT-001 — Contact form valid submission

| Field               | Value                                                  |
| ------------------- | ------------------------------------------------------ |
| **ID**              | CNT-001                                                |
| **Requirement**     | R6                                                     |
| **Priority**        | P1                                                     |
| **Labels**          | `contact` `ui`                                         |
| **Component**       | Contact Form                                           |
| **Issue Type**      | Test                                                   |
| **Suite Types**     | Sanity; Regression-UI                                  |
| **Preconditions**   | Contact form is accessible                             |
| **Test Steps**      | 1. Fill required fields with valid values<br>2. Submit |
| **Expected Result** | Success confirmation is displayed                      |
| **Automation**      | ✅ Automated                                           |

### CNT-002 — Contact required field validation

| Field               | Value                              |
| ------------------- | ---------------------------------- |
| **ID**              | CNT-002                            |
| **Requirement**     | R6                                 |
| **Priority**        | P1                                 |
| **Labels**          | `contact` `ui` `validation`        |
| **Component**       | Contact Form                       |
| **Issue Type**      | Test                               |
| **Suite Types**     | Regression-UI                      |
| **Technique**       | Validation Testing                 |
| **Preconditions**   | Contact form is accessible         |
| **Test Steps**      | Submit with mandatory fields empty |
| **Expected Result** | Validation messages are displayed  |
| **Automation**      | ✅ Automated                       |

### CNT-003 — Contact invalid email format

| Field               | Value                                           |
| ------------------- | ----------------------------------------------- |
| **ID**              | CNT-003                                         |
| **Requirement**     | R6                                              |
| **Priority**        | P1                                              |
| **Labels**          | `contact` `ui` `validation`                     |
| **Component**       | Contact Form                                    |
| **Issue Type**      | Test                                            |
| **Suite Types**     | Sanity; Regression-UI                           |
| **Technique**       | Validation Testing                              |
| **Preconditions**   | Contact form is accessible                      |
| **Test Steps**      | Enter malformed email and submit                |
| **Expected Result** | Email validation appears and submission blocked |
| **Automation**      | ✅ Automated                                    |

### CNT-004 — Contact message boundary checks

| Field               | Value                                            |
| ------------------- | ------------------------------------------------ |
| **ID**              | CNT-004                                          |
| **Requirement**     | R6                                               |
| **Priority**        | P2                                               |
| **Labels**          | `contact` `ui` `bva`                             |
| **Component**       | Contact Form                                     |
| **Issue Type**      | Test                                             |
| **Suite Types**     | Regression-UI                                    |
| **Technique**       | Boundary Value Analysis (BVA)                    |
| **Preconditions**   | Contact form is accessible                       |
| **Test Steps**      | Test message with min-1, min, max, max+1 lengths |
| **Expected Result** | Only valid boundary values are accepted          |
| **Automation**      | ✅ Automated                                     |

### CNT-005 — Contact special character handling

| Field               | Value                                                          |
| ------------------- | -------------------------------------------------------------- |
| **ID**              | CNT-005                                                        |
| **Requirement**     | R6                                                             |
| **Priority**        | P2                                                             |
| **Labels**          | `contact` `ui` `api` `negative`                                |
| **Component**       | Contact Form                                                   |
| **Issue Type**      | Test                                                           |
| **Suite Types**     | Regression-UI; Regression-API                                  |
| **Technique**       | Security / Negative Testing                                    |
| **Preconditions**   | Contact form is accessible                                     |
| **Test Steps**      | Submit payload with special characters and script-like strings |
| **Expected Result** | Input is sanitized or rejected safely                          |
| **Automation**      | ✅ Automated                                                   |

---

## 7. Message Management (MSG)

**Requirement:** R7 — Message Management

| ID      | Summary                           | Priority | Suite Types                           | Automation   |
| ------- | --------------------------------- | -------- | ------------------------------------- | ------------ |
| MSG-001 | Create message record             | P1       | Regression-UI; Regression-API         | ✅ Automated |
| MSG-002 | Read message list                 | P1       | Sanity; Regression-UI; Regression-API | ✅ Automated |
| MSG-003 | Update message record             | P1       | Regression-UI; Regression-API         | ✅ Automated |
| MSG-004 | Delete message record             | P1       | Regression-UI; Regression-API         | ✅ Automated |
| MSG-005 | Unauthorized message CRUD blocked | P1       | Regression-API                        | ✅ Automated |

### MSG-001 — Create message record

| Field               | Value                                            |
| ------------------- | ------------------------------------------------ |
| **ID**              | MSG-001                                          |
| **Requirement**     | R7                                               |
| **Priority**        | P1                                               |
| **Labels**          | `message` `ui` `api` `crud`                      |
| **Component**       | Message Management                               |
| **Issue Type**      | Test                                             |
| **Suite Types**     | Regression-UI; Regression-API                    |
| **Preconditions**   | Admin authenticated and message module available |
| **Test Steps**      | Create a new message                             |
| **Expected Result** | Create succeeds and message appears in list      |
| **Automation**      | ✅ Automated                                     |

### MSG-002 — Read message list

| Field               | Value                                   |
| ------------------- | --------------------------------------- |
| **ID**              | MSG-002                                 |
| **Requirement**     | R7                                      |
| **Priority**        | P1                                      |
| **Labels**          | `message` `ui` `api` `crud`             |
| **Component**       | Message Management                      |
| **Issue Type**      | Test                                    |
| **Suite Types**     | Sanity; Regression-UI; Regression-API   |
| **Preconditions**   | At least one message exists             |
| **Test Steps**      | Open message list or call list endpoint |
| **Expected Result** | Expected message fields are present     |
| **Automation**      | ✅ Automated                            |

### MSG-003 — Update message record

| Field               | Value                                         |
| ------------------- | --------------------------------------------- |
| **ID**              | MSG-003                                       |
| **Requirement**     | R7                                            |
| **Priority**        | P1                                            |
| **Labels**          | `message` `ui` `api` `crud`                   |
| **Component**       | Message Management                            |
| **Issue Type**      | Test                                          |
| **Suite Types**     | Regression-UI; Regression-API                 |
| **Preconditions**   | Existing message record exists                |
| **Test Steps**      | Edit message fields and save                  |
| **Expected Result** | Updated values are visible in detail and list |
| **Automation**      | ✅ Automated                                  |

### MSG-004 — Delete message record

| Field               | Value                                     |
| ------------------- | ----------------------------------------- |
| **ID**              | MSG-004                                   |
| **Requirement**     | R7                                        |
| **Priority**        | P1                                        |
| **Labels**          | `message` `ui` `api` `crud`               |
| **Component**       | Message Management                        |
| **Issue Type**      | Test                                      |
| **Suite Types**     | Regression-UI; Regression-API             |
| **Preconditions**   | Existing message record exists            |
| **Test Steps**      | 1. Delete message<br>2. Query it again    |
| **Expected Result** | Record is removed and cannot be retrieved |
| **Automation**      | ✅ Automated                              |

### MSG-005 — Unauthorized message CRUD blocked

| Field               | Value                                         |
| ------------------- | --------------------------------------------- |
| **ID**              | MSG-005                                       |
| **Requirement**     | R7                                            |
| **Priority**        | P1                                            |
| **Labels**          | `message` `api` `security` `negative`         |
| **Component**       | Message Management                            |
| **Issue Type**      | Test                                          |
| **Suite Types**     | Regression-API                                |
| **Technique**       | Security / Negative Testing                   |
| **Preconditions**   | No valid auth token                           |
| **Test Steps**      | Call create, update, delete message endpoints |
| **Expected Result** | API returns unauthorized or forbidden         |
| **Automation**      | ✅ Automated                                  |

---

## 8. Room Management (ROOM)

**Requirement:** R8 — Room Management

| ID       | Summary                            | Priority | Suite Types                           | Automation   |
| -------- | ---------------------------------- | -------- | ------------------------------------- | ------------ |
| ROOM-001 | Create room with valid payload     | P0       | Smoke; Regression-UI; Regression-API  | ✅ Automated |
| ROOM-002 | Create room invalid boundaries     | P1       | Regression-UI; Regression-API         | ✅ Automated |
| ROOM-003 | Update room details                | P0       | Sanity; Regression-UI; Regression-API | ✅ Automated |
| ROOM-004 | Delete eligible room               | P0       | Regression-UI; Regression-API         | ✅ Automated |
| ROOM-005 | Prevent delete with active booking | P1       | Regression-UI; Regression-API         | ✅ Automated |
| ROOM-006 | Unauthorized room mutation blocked | P1       | Regression-API                        | ✅ Automated |

### ROOM-001 — Create room with valid payload

| Field               | Value                                |
| ------------------- | ------------------------------------ |
| **ID**              | ROOM-001                             |
| **Requirement**     | R8                                   |
| **Priority**        | P0                                   |
| **Labels**          | `room` `ui` `api` `crud` `smoke`     |
| **Component**       | Room Management                      |
| **Issue Type**      | Test                                 |
| **Suite Types**     | Smoke; Regression-UI; Regression-API |
| **Preconditions**   | Admin authenticated                  |
| **Test Steps**      | Create room with valid payload       |
| **Expected Result** | Room is created and appears in list  |
| **Automation**      | ✅ Automated                         |

### ROOM-002 — Create room invalid boundaries

| Field               | Value                                                          |
| ------------------- | -------------------------------------------------------------- |
| **ID**              | ROOM-002                                                       |
| **Requirement**     | R8                                                             |
| **Priority**        | P1                                                             |
| **Labels**          | `room` `ui` `api` `validation`                                 |
| **Component**       | Room Management                                                |
| **Issue Type**      | Test                                                           |
| **Suite Types**     | Regression-UI; Regression-API                                  |
| **Technique**       | Boundary Value Analysis (BVA)                                  |
| **Preconditions**   | Admin authenticated                                            |
| **Test Steps**      | Submit invalid boundary payloads for price, capacity, and name |
| **Expected Result** | Validation errors shown and room not created                   |
| **Automation**      | ✅ Automated                                                   |

### ROOM-003 — Update room details

| Field               | Value                                 |
| ------------------- | ------------------------------------- |
| **ID**              | ROOM-003                              |
| **Requirement**     | R8                                    |
| **Priority**        | P0                                    |
| **Labels**          | `room` `ui` `api` `crud`              |
| **Component**       | Room Management                       |
| **Issue Type**      | Test                                  |
| **Suite Types**     | Sanity; Regression-UI; Regression-API |
| **Preconditions**   | Existing room exists                  |
| **Test Steps**      | Edit room fields and save             |
| **Expected Result** | Updated values persist after reload   |
| **Automation**      | ✅ Automated                          |

### ROOM-004 — Delete eligible room

| Field               | Value                                                         |
| ------------------- | ------------------------------------------------------------- |
| **ID**              | ROOM-004                                                      |
| **Requirement**     | R8                                                            |
| **Priority**        | P0                                                            |
| **Labels**          | `room` `ui` `api` `crud`                                      |
| **Component**       | Room Management                                               |
| **Issue Type**      | Test                                                          |
| **Suite Types**     | Regression-UI; Regression-API                                 |
| **Preconditions**   | Existing deletable room exists (no active booking dependency) |
| **Test Steps**      | 1. Delete room<br>2. Query list                               |
| **Expected Result** | Room is removed from UI and API list                          |
| **Automation**      | ✅ Automated                                                  |

### ROOM-005 — Prevent delete with active booking

| Field               | Value                                |
| ------------------- | ------------------------------------ |
| **ID**              | ROOM-005                             |
| **Requirement**     | R8                                   |
| **Priority**        | P1                                   |
| **Labels**          | `room` `ui` `api` `negative`         |
| **Component**       | Room Management                      |
| **Issue Type**      | Test                                 |
| **Suite Types**     | Regression-UI; Regression-API        |
| **Technique**       | Negative Testing / Business Rule     |
| **Preconditions**   | Room has active booking              |
| **Test Steps**      | Attempt to delete room               |
| **Expected Result** | Deletion is blocked with clear error |
| **Automation**      | ✅ Automated                         |

### ROOM-006 — Unauthorized room mutation blocked

| Field               | Value                                                     |
| ------------------- | --------------------------------------------------------- |
| **ID**              | ROOM-006                                                  |
| **Requirement**     | R8                                                        |
| **Priority**        | P1                                                        |
| **Labels**          | `room` `api` `security` `negative`                        |
| **Component**       | Room Management                                           |
| **Issue Type**      | Test                                                      |
| **Suite Types**     | Regression-API                                            |
| **Technique**       | Security / Negative Testing                               |
| **Preconditions**   | No valid auth token                                       |
| **Test Steps**      | Call mutation endpoints for room (create, update, delete) |
| **Expected Result** | API returns unauthorized or forbidden                     |
| **Automation**      | ✅ Automated                                              |

---

## 9. Calendar Reports (CAL)

**Requirement:** R9 — Calendar Reports

| ID      | Summary                           | Priority | Suite Types                   | Automation   |
| ------- | --------------------------------- | -------- | ----------------------------- | ------------ |
| CAL-001 | Room specific availability report | P1       | Regression-UI; Regression-API | ✅ Automated |
| CAL-002 | All rooms availability report     | P1       | Regression-UI; Regression-API | ✅ Automated |
| CAL-003 | Calendar date range boundaries    | P2       | Regression-UI; Regression-API | ✅ Automated |
| CAL-004 | UI report equals API report       | P1       | Regression-UI; Regression-API | ✅ Automated |

### CAL-001 — Room specific availability report

| Field               | Value                                                                           |
| ------------------- | ------------------------------------------------------------------------------- |
| **ID**              | CAL-001                                                                         |
| **Requirement**     | R9                                                                              |
| **Priority**        | P1                                                                              |
| **Labels**          | `calendar` `ui` `api` `report`                                                  |
| **Component**       | Calendar Reports                                                                |
| **Issue Type**      | Test                                                                            |
| **Suite Types**     | Regression-UI; Regression-API                                                   |
| **Preconditions**   | Room data with known bookings exists                                            |
| **Test Steps**      | Generate room-specific availability report for one room and selected date range |
| **Expected Result** | Reported slots match expected booking data                                      |
| **Automation**      | ✅ Automated                                                                    |

### CAL-002 — All rooms availability report

| Field               | Value                                     |
| ------------------- | ----------------------------------------- |
| **ID**              | CAL-002                                   |
| **Requirement**     | R9                                        |
| **Priority**        | P1                                        |
| **Labels**          | `calendar` `ui` `api` `report`            |
| **Component**       | Calendar Reports                          |
| **Issue Type**      | Test                                      |
| **Suite Types**     | Regression-UI; Regression-API             |
| **Preconditions**   | Multiple rooms with mixed occupancy exist |
| **Test Steps**      | Generate all rooms availability report    |
| **Expected Result** | Totals and per-room status are correct    |
| **Automation**      | ✅ Automated                              |

### CAL-003 — Calendar date range boundaries

| Field               | Value                                                                  |
| ------------------- | ---------------------------------------------------------------------- |
| **ID**              | CAL-003                                                                |
| **Requirement**     | R9                                                                     |
| **Priority**        | P2                                                                     |
| **Labels**          | `calendar` `ui` `api` `bva`                                            |
| **Component**       | Calendar Reports                                                       |
| **Issue Type**      | Test                                                                   |
| **Suite Types**     | Regression-UI; Regression-API                                          |
| **Technique**       | Boundary Value Analysis (BVA)                                          |
| **Preconditions**   | Calendar report page is accessible                                     |
| **Test Steps**      | Run reports for boundary date ranges (same day, reversed, edge ranges) |
| **Expected Result** | Valid ranges work and invalid ranges are blocked                       |
| **Automation**      | ✅ Automated                                                           |

### CAL-004 — UI report equals API report

| Field               | Value                                                 |
| ------------------- | ----------------------------------------------------- |
| **ID**              | CAL-004                                               |
| **Requirement**     | R9                                                    |
| **Priority**        | P1                                                    |
| **Labels**          | `calendar` `ui` `api` `consistency`                   |
| **Component**       | Calendar Reports                                      |
| **Issue Type**      | Test                                                  |
| **Suite Types**     | Regression-UI; Regression-API                         |
| **Technique**       | Consistency / Cross-layer Testing                     |
| **Preconditions**   | Same date filter available in UI and API              |
| **Test Steps**      | 1. Generate UI report<br>2. Call API with same filter |
| **Expected Result** | UI totals and API totals are identical                |
| **Automation**      | ✅ Automated                                          |

---

## 10. API Contracts (API)

**Requirements:** R1, R6, R7, R8, R9 — API Layer

| ID      | Summary                                 | Priority | Suite Types           | Automation   |
| ------- | --------------------------------------- | -------- | --------------------- | ------------ |
| API-001 | Auth endpoint contract                  | P0       | Smoke; Regression-API | ✅ Automated |
| API-002 | Room endpoint contract                  | P1       | Regression-API        | ✅ Automated |
| API-003 | Message endpoint contract               | P1       | Regression-API        | ✅ Automated |
| API-004 | Contact endpoint contract               | P1       | Regression-API        | ✅ Automated |
| API-005 | Calendar availability endpoint contract | P1       | Regression-API        | ✅ Automated |

### API-001 — Auth endpoint contract

| Field               | Value                                                   |
| ------------------- | ------------------------------------------------------- |
| **ID**              | API-001                                                 |
| **Requirement**     | R1                                                      |
| **Priority**        | P0                                                      |
| **Labels**          | `api` `auth` `contract` `smoke`                         |
| **Component**       | API                                                     |
| **Issue Type**      | Test                                                    |
| **Suite Types**     | Smoke; Regression-API                                   |
| **Technique**       | Contract Testing                                        |
| **Preconditions**   | API base URL and test credentials are available         |
| **Test Steps**      | Call auth with valid and invalid credentials            |
| **Expected Result** | Expected status codes and response contract are correct |
| **Automation**      | ✅ Automated                                            |

### API-002 — Room endpoint contract

| Field               | Value                                            |
| ------------------- | ------------------------------------------------ |
| **ID**              | API-002                                          |
| **Requirement**     | R8                                               |
| **Priority**        | P1                                               |
| **Labels**          | `api` `room` `contract`                          |
| **Component**       | API                                              |
| **Issue Type**      | Test                                             |
| **Suite Types**     | Regression-API                                   |
| **Technique**       | Contract Testing                                 |
| **Preconditions**   | API is reachable                                 |
| **Test Steps**      | Call room create, read, update, delete endpoints |
| **Expected Result** | Schema and status codes match contract           |
| **Automation**      | ✅ Automated                                     |

### API-003 — Message endpoint contract

| Field               | Value                                      |
| ------------------- | ------------------------------------------ |
| **ID**              | API-003                                    |
| **Requirement**     | R7                                         |
| **Priority**        | P1                                         |
| **Labels**          | `api` `message` `contract`                 |
| **Component**       | API                                        |
| **Issue Type**      | Test                                       |
| **Suite Types**     | Regression-API                             |
| **Technique**       | Contract Testing                           |
| **Preconditions**   | API is reachable and auth token available  |
| **Test Steps**      | Call message CRUD endpoints                |
| **Expected Result** | Responses match expected schema and status |
| **Automation**      | ✅ Automated                               |

### API-004 — Contact endpoint contract

| Field               | Value                                           |
| ------------------- | ----------------------------------------------- |
| **ID**              | API-004                                         |
| **Requirement**     | R6                                              |
| **Priority**        | P1                                              |
| **Labels**          | `api` `contact` `contract`                      |
| **Component**       | API                                             |
| **Issue Type**      | Test                                            |
| **Suite Types**     | Regression-API                                  |
| **Technique**       | Contract Testing                                |
| **Preconditions**   | API is reachable                                |
| **Test Steps**      | Submit valid and invalid contact payloads       |
| **Expected Result** | Validation and success responses match contract |
| **Automation**      | ✅ Automated                                    |

### API-005 — Calendar availability endpoint contract

| Field               | Value                                                    |
| ------------------- | -------------------------------------------------------- |
| **ID**              | API-005                                                  |
| **Requirement**     | R9                                                       |
| **Priority**        | P1                                                       |
| **Labels**          | `api` `calendar` `contract`                              |
| **Component**       | API                                                      |
| **Issue Type**      | Test                                                     |
| **Suite Types**     | Regression-API                                           |
| **Technique**       | Contract Testing                                         |
| **Preconditions**   | API is reachable with seed data                          |
| **Test Steps**      | Call availability endpoint with valid and invalid ranges |
| **Expected Result** | Response schema and validation behavior are correct      |
| **Automation**      | ✅ Automated                                             |

---

## 11. Visual Regression (VIS)

**Requirements:** R1, R2, R3, R4 — Visual Baseline

| ID      | Summary                                      | Priority | Suite Types       | Automation   |
| ------- | -------------------------------------------- | -------- | ----------------- | ------------ |
| VIS-001 | Visual baseline homepage                     | P1       | Visual Regression | ✅ Automated |
| VIS-002 | Visual baseline cart page                    | P1       | Visual Regression | ✅ Automated |
| VIS-003 | Visual baseline checkout page                | P1       | Visual Regression | ✅ Automated |
| VIS-004 | Visual baseline admin login dashboard blocks | P1       | Visual Regression | ✅ Automated |

### VIS-001 — Visual baseline homepage

| Field               | Value                                          |
| ------------------- | ---------------------------------------------- |
| **ID**              | VIS-001                                        |
| **Requirement**     | R2                                             |
| **Priority**        | P1                                             |
| **Labels**          | `visual` `ui` `snapshot`                       |
| **Component**       | Visual                                         |
| **Issue Type**      | Test                                           |
| **Suite Types**     | Visual Regression                              |
| **Technique**       | Snapshot / Pixel Comparison                    |
| **Preconditions**   | Stable viewport and baseline snapshot exist    |
| **Test Steps**      | Open homepage and capture snapshot             |
| **Expected Result** | Screenshot matches approved baseline threshold |
| **Automation**      | ✅ Automated                                   |

### VIS-002 — Visual baseline cart page

| Field               | Value                                          |
| ------------------- | ---------------------------------------------- |
| **ID**              | VIS-002                                        |
| **Requirement**     | R3                                             |
| **Priority**        | P1                                             |
| **Labels**          | `visual` `ui` `snapshot`                       |
| **Component**       | Visual                                         |
| **Issue Type**      | Test                                           |
| **Suite Types**     | Visual Regression                              |
| **Technique**       | Snapshot / Pixel Comparison                    |
| **Preconditions**   | Stable viewport and baseline snapshot exist    |
| **Test Steps**      | Open cart booking page and capture snapshot    |
| **Expected Result** | Screenshot matches approved baseline threshold |
| **Automation**      | ✅ Automated                                   |

### VIS-003 — Visual baseline checkout page

| Field               | Value                                          |
| ------------------- | ---------------------------------------------- |
| **ID**              | VIS-003                                        |
| **Requirement**     | R4                                             |
| **Priority**        | P1                                             |
| **Labels**          | `visual` `ui` `snapshot`                       |
| **Component**       | Visual                                         |
| **Issue Type**      | Test                                           |
| **Suite Types**     | Visual Regression                              |
| **Technique**       | Snapshot / Pixel Comparison                    |
| **Preconditions**   | Stable viewport and baseline snapshot exist    |
| **Test Steps**      | Open checkout page and capture snapshot        |
| **Expected Result** | Screenshot matches approved baseline threshold |
| **Automation**      | ✅ Automated                                   |

### VIS-004 — Visual baseline admin login dashboard blocks

| Field               | Value                                                      |
| ------------------- | ---------------------------------------------------------- |
| **ID**              | VIS-004                                                    |
| **Requirement**     | R1                                                         |
| **Priority**        | P1                                                         |
| **Labels**          | `visual` `ui` `snapshot`                                   |
| **Component**       | Visual                                                     |
| **Issue Type**      | Test                                                       |
| **Suite Types**     | Visual Regression                                          |
| **Technique**       | Snapshot / Pixel Comparison                                |
| **Preconditions**   | Admin credentials and baseline snapshots exist             |
| **Test Steps**      | Capture snapshots for admin login and dashboard key blocks |
| **Expected Result** | Snapshots match approved baseline threshold                |
| **Automation**      | ✅ Automated                                               |

---

## 12. CI Pipeline (CI)

**Requirement:** NFR-CI/CD, NFR-CrossBrowser — CI Reporting

| ID     | Summary                    | Priority | Suite Types         | Automation   |
| ------ | -------------------------- | -------- | ------------------- | ------------ |
| CI-001 | Workflow suite routing     | P0       | Full                | ✅ Automated |
| CI-002 | Allure report generation   | P0       | Full                | ✅ Automated |
| CI-003 | Allure history persistence | P1       | Full                | ✅ Automated |
| CI-004 | CI cross browser matrix    | P1       | Cross-Browser; Full | ✅ Automated |

### CI-001 — Workflow suite routing

| Field               | Value                                  |
| ------------------- | -------------------------------------- |
| **ID**              | CI-001                                 |
| **Requirement**     | NFR-CI/CD                              |
| **Priority**        | P0                                     |
| **Labels**          | `ci` `pipeline`                        |
| **Component**       | CI Reporting                           |
| **Issue Type**      | Test                                   |
| **Suite Types**     | Full                                   |
| **Preconditions**   | GitHub Actions workflow file exists    |
| **Test Steps**      | Trigger workflow with each suite input |
| **Expected Result** | Only intended suite jobs run           |
| **Automation**      | ✅ Automated                           |

### CI-002 — Allure report generation

| Field               | Value                                                   |
| ------------------- | ------------------------------------------------------- |
| **ID**              | CI-002                                                  |
| **Requirement**     | NFR-CI/CD                                               |
| **Priority**        | P0                                                      |
| **Labels**          | `ci` `allure` `reporting`                               |
| **Component**       | CI Reporting                                            |
| **Issue Type**      | Test                                                    |
| **Suite Types**     | Full                                                    |
| **Preconditions**   | Pipeline run completed                                  |
| **Test Steps**      | Inspect build artifacts and published report            |
| **Expected Result** | Allure report is generated with results and attachments |
| **Automation**      | ✅ Automated                                            |

### CI-003 — Allure history persistence

| Field               | Value                                      |
| ------------------- | ------------------------------------------ |
| **ID**              | CI-003                                     |
| **Requirement**     | NFR-CI/CD                                  |
| **Priority**        | P1                                         |
| **Labels**          | `ci` `allure` `history`                    |
| **Component**       | CI Reporting                               |
| **Issue Type**      | Test                                       |
| **Suite Types**     | Full                                       |
| **Preconditions**   | At least two completed pipeline runs exist |
| **Test Steps**      | Compare latest run report trend tab        |
| **Expected Result** | History and trend data persist across runs |
| **Automation**      | ✅ Automated                               |

### CI-004 — CI cross browser matrix

| Field               | Value                                                                               |
| ------------------- | ----------------------------------------------------------------------------------- |
| **ID**              | CI-004                                                                              |
| **Requirement**     | NFR-CI/CD; NFR-CrossBrowser                                                         |
| **Priority**        | P1                                                                                  |
| **Labels**          | `ci` `cross-browser` `pipeline`                                                     |
| **Component**       | CI Reporting                                                                        |
| **Issue Type**      | Test                                                                                |
| **Suite Types**     | Cross-Browser; Full                                                                 |
| **Preconditions**   | Browser matrix configured in workflow                                               |
| **Test Steps**      | Trigger cross browser run                                                           |
| **Expected Result** | All three browser jobs (Chromium, Firefox, WebKit) execute and report independently |
| **Automation**      | ✅ Automated                                                                        |

---

## Summary

### Priority Distribution

| Priority | Count |
| -------- | ----- |
| P0       | 14    |
| P1       | 41    |
| P2       | 6     |

### By Requirement

| Requirement                   | Count |
| ----------------------------- | ----- |
| R1 — Admin Authentication     | 5     |
| R2 — Frontend Navigation      | 5     |
| R3 — Cart Booking             | 7     |
| R4 — Checkout                 | 7     |
| R5 — Branding Management      | 4     |
| R6 — Contact Form             | 5     |
| R7 — Message Management       | 5     |
| R8 — Room Management          | 6     |
| R9 — Calendar Reports         | 4     |
| NFR-CI/CD — CI Pipeline       | 4     |
| API Contracts (Cross-req)     | 5     |
| Visual Regression (Cross-req) | 4     |

### Test Techniques Used

| Technique                     | Test Cases                                                        |
| ----------------------------- | ----------------------------------------------------------------- |
| Equivalence Partitioning (EP) | AUTH-001, CHK-001                                                 |
| Decision Table                | AUTH-002, AUTH-003, FE-001, CHK-002                               |
| State Transition              | AUTH-004                                                          |
| Negative Testing              | AUTH-005, CART-006, CHK-006, ROOM-005, MSG-005, ROOM-006, CNT-005 |
| Combinatorial                 | FE-002                                                            |
| Boundary Value Analysis (BVA) | CHK-004, CNT-004, ROOM-002, CAL-003                               |
| Validation Testing            | BR-003, CNT-002, CNT-003                                          |
| Contract Testing              | API-001, API-002, API-003, API-004, API-005                       |
| Snapshot / Pixel Comparison   | VIS-001, VIS-002, VIS-003, VIS-004                                |
| Consistency / Cross-layer     | CAL-004                                                           |
| Cleanup Testing               | BR-004                                                            |
| Security Testing              | MSG-005, ROOM-006                                                 |

### All Test Cases Are Automated ✅

All 61 test cases have `AutomationStatus: Automated`.
