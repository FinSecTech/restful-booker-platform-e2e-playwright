import { test, expect } from "@playwright/test";
import { bookingWindow } from "../support/data-builders.js";

/**
 * Stabilise page content before taking a visual snapshot:
 * - Wait for DOM + all <img> elements to be fully loaded.
 * - Dismiss the cookie consent banner if it appeared (it shifts layout).
 */
async function stabiliseForScreenshot(page) {
  await page.waitForLoadState("domcontentloaded");

  // Wait for every <img> to reach `complete` state (decoded + painted)
  await expect
    .poll(() =>
      page.evaluate(() =>
        Array.from(document.images).every((img) => img.complete),
      ),
    )
    .toBe(true);

  // Cookie banner – dismiss if visible, otherwise skip silently
  const cookieDismiss = page.locator(
    "#cookie-consent-dismiss, [data-action='dismiss-cookie']",
  );
  await expect(cookieDismiss.first())
    .toBeVisible({ timeout: 1200 })
    .catch(() => {});
  if (
    await cookieDismiss
      .first()
      .isVisible()
      .catch(() => false)
  ) {
    await cookieDismiss.first().click();
    // Let the slide-out animation finish
    await page.waitForTimeout(500);
  }
}

test.describe("Visual baselines", () => {
  test("VIS-001 @visual @regression homepage", async ({ page }) => {
    // open homepage for baseline capture
    await page.goto("/");
    await stabiliseForScreenshot(page);

    // validate homepage visual snapshot
    // fullPage captures the entire scrollable height.
    // The Pigeon Maps tile canvas can produce minor pixel differences
    // on each render — allow a small diff budget to absorb that noise
    // while still catching real visual regressions.
    await expect(page).toHaveScreenshot("homepage.png", {
      fullPage: true,
      maxDiffPixels: 12000,
    });
  });

  test("VIS-002 @visual @regression reservation page", async ({ page }) => {
    // open reservation page with future checkin/checkout dates
    const booking = bookingWindow({ startInDays: 15, nights: 2 });
    await page.goto(
      `/reservation/1?checkin=${booking.checkin}&checkout=${booking.checkout}`,
    );
    await stabiliseForScreenshot(page);

    // validate reservation page visual snapshot
    await expect(page).toHaveScreenshot("reservation-page.png", {
      fullPage: true,
      maxDiffPixels: 800,
    });
  });

  test("VIS-003 @visual @regression checkout booking form", async ({
    page,
  }) => {
    // open reservation page and display checkout form
    const booking = bookingWindow({ startInDays: 20, nights: 2 });
    await page.goto(
      `/reservation/1?checkin=${booking.checkin}&checkout=${booking.checkout}`,
    );
    await page.getByRole("button", { name: "Reserve Now" }).click();
    await stabiliseForScreenshot(page);

    // validate checkout form visual snapshot
    await expect(page).toHaveScreenshot("checkout-form.png", {
      fullPage: true,
      maxDiffPixels: 800,
    });
  });

  test("VIS-004 @visual @regression admin login", async ({ page }) => {
    // open admin login page for baseline capture
    await page.goto("/admin");
    await stabiliseForScreenshot(page);

    // validate admin login visual snapshot
    await expect(page).toHaveScreenshot("admin-login.png", {
      fullPage: true,
      maxDiffPixels: 300,
    });
  });
});
