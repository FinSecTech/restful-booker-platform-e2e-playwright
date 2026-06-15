import { test, expect } from "../fixtures/test-fixtures.js";

test.describe("Frontend UI coverage", () => {
  test("FE-001 @sanity @regression menu anchors navigate to expected sections", async ({
    page,
    homePage,
  }) => {
    // open home page and click top menu anchors
    await homePage.goto();

    for (const section of [
      "Rooms",
      "Booking",
      "Amenities",
      "Location",
      "Contact",
    ]) {
      await homePage.clickMenu(section);
      await expect(page).toHaveURL(new RegExp(`#${section.toLowerCase()}`));
    }
  });

  test("FE-002 @sanity @regression check availability CTA exposes booking links", async ({
    homePage,
  }) => {
    // open home and click availability CTA
    await homePage.goto();
    await homePage.checkAvailabilityButton.click();

    // validate first booking link is visible in the booking section
    const firstBookNow = homePage.firstBookNowLink();
    await expect(firstBookNow).toBeVisible();
    await expect(firstBookNow).toHaveAttribute(
      "href",
      /#booking|\/reservation\//,
    );
  });

  test("FE-003 @regression internal links return healthy responses", async ({
    request,
  }) => {
    // request critical site pages directly
    for (const url of ["/", "/admin", "/reservation/1"]) {
      const res = await request.get(url);
      expect(res.status()).toBeLessThan(500);
    }
  });

  test("FE-004 @regression keyboard navigation works for top menu actions", async ({
    page,
    homePage,
  }) => {
    // focus top menu item and activate by keyboard
    await homePage.goto();
    await homePage.focusMenu("Rooms");
    await page.keyboard.press("Enter");

    // validate hash navigation for focused section
    await expect(page).toHaveURL(/#rooms/);
  });

  test("FE-005 @regression footer links have valid targets", async ({
    request,
    homePage,
  }) => {
    // collect footer links and validate target availability
    await homePage.goto();

    const footerLinks = homePage.footerLinks();
    await expect(footerLinks.first()).toHaveAttribute("href", /.+/);

    const count = await footerLinks.count();

    for (let index = 0; index < Math.min(count, 5); index += 1) {
      const href = await footerLinks.nth(index).getAttribute("href");
      expect(href).toBeTruthy();

      if (href.startsWith("/")) {
        const res = await request.get(href);
        expect(res.status()).toBeLessThan(500);
      }
    }
  });
});
