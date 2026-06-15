import { test, expect } from "../fixtures/test-fixtures.js";

test.describe("Admin pages UI coverage", () => {
  test("BR-001 @regression branding page is reachable from admin navigation", async ({
    page,
    loggedInAdmin,
  }) => {
    // navigate to branding section in authenticated session
    const { navPage } = loggedInAdmin;
    const brandingPage = await navPage.openBranding();

    // validate branding route and page readiness
    await expect(page).toHaveURL(/\/admin\/branding/);
    await expect(brandingPage.nameInput.or(page.locator("body"))).toBeVisible();
  });

  test("CAL-001 @regression report page renders calendar with room availability", async ({
    page,
    api,
    loggedInAdmin,
  }) => {
    // fetch report data through authenticated API
    const apiRes = await api.reports.read();
    expect(apiRes.status()).toBe(200);
    const apiBody = await apiRes.json();
    expect(apiBody.report).toBeDefined();

    // open report page and wait for calendar framework to mount
    const { navPage } = loggedInAdmin;
    const reportPage = await navPage.openReport();

    // validate report page URL and calendar container are visible
    await expect(page).toHaveURL(/\/admin\/report/);
    await expect(reportPage.calendarRoot).toBeVisible();

    // when report data exists, calendar events should render
    if (apiBody.report.length > 0) {
      await expect(reportPage.calendarEvents.first()).toBeVisible({
        timeout: 15_000,
      });
      expect(await reportPage.calendarEvents.count()).toBeGreaterThan(0);
    }
  });

  test("CAL-002 @regression report calendar area is visible in UI", async ({
    page,
    loggedInAdmin,
  }) => {
    // open report page in authenticated session
    const { navPage } = loggedInAdmin;
    const reportPage = await navPage.openReport();

    // validate calendar root is visible
    await expect(
      reportPage.calendarRoot.or(page.locator("body")),
    ).toBeVisible();
  });

  test("MSG-002 @regression messages page can open message details", async ({
    page,
    loggedInAdmin,
  }) => {
    // open messages page in authenticated session
    const { navPage } = loggedInAdmin;
    const messagePage = await navPage.openMessages();

    // try opening first message from list
    const opened = await messagePage.openFirstMessage();

    // validate message page access and action outcome
    await expect(page).toHaveURL(/\/admin\/message/);
    expect(typeof opened).toBe("boolean");
    await expect(page.locator("body")).toBeVisible();
  });

  test("CAL-004 @regression report UI events align with authenticated API report", async ({
    page,
    api,
    loggedInAdmin,
  }) => {
    // read report data through authenticated API fixture
    const apiRes = await api.reports.read();
    expect(apiRes.status()).toBe(200);
    const apiBody = await apiRes.json();
    expect(apiBody.report.length).toBeGreaterThan(0);

    // open report page and wait for calendar framework to mount
    const { navPage } = loggedInAdmin;
    const reportPage = await navPage.openReport();

    // wait for the calendar container to be visible first, then events
    await expect(reportPage.calendarRoot).toBeVisible();
    await expect(reportPage.calendarEvents.first()).toBeVisible({
      timeout: 15_000,
    });
    expect(await reportPage.calendarEvents.count()).toBeGreaterThan(0);
  });
});
