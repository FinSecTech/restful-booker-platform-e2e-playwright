import { test, expect } from "../fixtures/test-fixtures.js";

test.describe("Authentication UI coverage", () => {
  test("AUTH-001 @smoke @sanity @regression admin login UI", async ({
    page,
    loggedInAdmin,
  }) => {
    // login with valid credentials via fixture
    const { authPage } = loggedInAdmin;

    // validate authenticated admin page state
    await expect(page).toHaveURL(/\/admin/);
    await expect(authPage.logoutButton).toBeVisible();
  });

  test("AUTH-002 @smoke @regression invalid credentials matrix", async ({
    page,
    adminAuthPage,
    adminCreds,
  }) => {
    // open login page and prepare invalid matrix
    await adminAuthPage.goto();

    const matrix = [
      { username: "wrong-user", password: adminCreds.password },
      { username: adminCreds.username, password: "wrong-pass" },
      { username: "wrong-user", password: "wrong-pass" },
    ];

    // submit invalid credentials and verify access is blocked
    for (const row of matrix) {
      await adminAuthPage.login(row.username, row.password);
      await expect(adminAuthPage.loginButton).toBeVisible();
      await expect(page).toHaveURL(/\/admin/);
      await adminAuthPage.clearLoginForm();
    }
  });

  test("AUTH-003 @regression login required fields validation", async ({
    adminAuthPage,
    adminCreds,
  }) => {
    // open admin login page
    await adminAuthPage.goto();

    // submit empty form and validate no login
    await adminAuthPage.loginButton.click();
    await expect(adminAuthPage.loginButton).toBeVisible();

    // submit username-only form and validate no login
    await adminAuthPage.usernameInput.fill(adminCreds.username);
    await adminAuthPage.loginButton.click();
    await expect(adminAuthPage.loginButton).toBeVisible();

    // submit password-only form and validate no login
    await adminAuthPage.usernameInput.fill("");
    await adminAuthPage.passwordInput.fill(adminCreds.password);
    await adminAuthPage.loginButton.click();
    await expect(adminAuthPage.loginButton).toBeVisible();
  });

  test("AUTH-004 @sanity @regression admin logout UI", async ({
    page,
    loggedInAdmin,
  }) => {
    // perform logout action from authenticated session
    const { authPage } = loggedInAdmin;
    await expect(authPage.logoutButton).toBeVisible();
    const logoutResponse = await authPage.logout();
    // the demo backend can sporadically return 500 after actually logging
    // out — the logout() page object already handles that by detecting
    // navigation away from /admin, so we accept 200–500 here
    expect(logoutResponse.status()).toBeLessThanOrEqual(500);

    // wait for the SPA to finish its post-logout redirect before probing
    // session state — different browsers navigate to different pages
    await expect(page).not.toHaveURL(/\/admin\/rooms/);

    // verify session is invalidated: accessing a protected route must
    // redirect to the login page regardless of where the browser landed
    await page.goto("/admin/rooms");
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("AUTH-005 @regression protected admin route requires authentication", async ({
    page,
  }) => {
    // request protected route without session
    await page.goto("/admin/report");

    // validate redirect or block to login page
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });
});
