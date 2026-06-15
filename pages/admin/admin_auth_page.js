export class AdminAuthPage {
  constructor(page) {
    this.page = page;

    // login form controls
    this.usernameInput = page.getByLabel("Username");
    this.passwordInput = page.getByLabel("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.logoutButton = page.getByRole("button", { name: "Logout" });
  }

  // open admin login page
  async goto() {
    await this.page.goto("/admin");
  }

  // submit login form with credentials and wait for auth request completion
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    const loginResponse = this.page.waitForResponse(
      (response) =>
        response.url().includes("/api/auth/login") &&
        response.request().method() === "POST",
    );

    await this.loginButton.click();
    await loginResponse;
  }

  // clear login form for matrix scenarios
  async clearLoginForm() {
    await this.usernameInput.fill("");
    await this.passwordInput.fill("");
  }

  // log out authenticated admin user.
  // the demo backend can sporadically return 500 after successfully logging
  // out and redirecting — navigation away from /admin is the authoritative
  // success signal, not the HTTP response code.
  async logout() {
    const logoutResponse = this.page.waitForResponse(
      (response) =>
        response.url().includes("/api/auth/logout") &&
        response.request().method() === "POST",
    );

    const navigatedAway = this.page.waitForURL(
      (url) => !url.pathname.startsWith("/admin"),
    );

    await this.logoutButton.click();

    // race: whichever completes first — the POST response or SPA navigation.
    // if the SPA navigates away, logout succeeded regardless of response code.
    const winner = await Promise.race([
      logoutResponse.then((r) => ({ type: "response", value: r })),
      navigatedAway.then(() => ({ type: "navigation" })),
    ]);

    if (winner.type === "navigation") {
      // SPA redirected before the response resolved (or the response was 500
      // but the browser processed it fast). either way, logout succeeded.
      return logoutResponse.catch(() => null); // clean up, may already be settled
    }

    // got the response first; check if we're still on /admin
    const currentUrl = new URL(this.page.url());
    if (!currentUrl.pathname.startsWith("/admin")) {
      return winner.value;
    }

    // we have a response and are still on /admin — if status is ok, we're done
    if (winner.value.status() < 500) {
      // response was ok but page hasn't navigated yet — wait for it
      await navigatedAway;
      return winner.value;
    }

    // got a 500 while still on /admin — wait for the SPA to redirect.
    // the 500 may have been a phantom (backend logged us out anyway).
    await navigatedAway;
    return winner.value;
  }
}
