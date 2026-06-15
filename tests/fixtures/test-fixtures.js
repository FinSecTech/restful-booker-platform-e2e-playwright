import { test as base, expect } from '@playwright/test';
import { getAdminCreds } from '../support/env-config.js';
import { AuthApi } from '../support/api/auth.api.js';
import { ApiClientFactory } from '../support/api/factory.js';
import { AdminAuthPage } from '../../pages/admin/admin_auth_page.js';
import { AdminNavPage } from '../../pages/admin/admin_nav_page.js';
import { HomePage } from '../../pages/home_page.js';
import { ReservationPage } from '../../pages/reservation_page.js';

// extend Playwright test with dependency-injected domain fixtures
export const test = base.extend({
  // provide admin credentials once per worker
  adminCreds: [async ({}, use) => {
    await use(getAdminCreds());
  }, { scope: 'worker' }],

  // provide low-level auth API client
  authApi: async ({ request }, use) => {
    await use(new AuthApi(request));
  },

  // provide authenticated API domain factory
  api: async ({ request, adminCreds }, use) => {
    const api = new ApiClientFactory(request);
    await api.authenticate(adminCreds);
    await use(api);
  },

  // expose authenticated domain APIs directly
  roomApi: async ({ api }, use) => {
    await use(api.rooms);
  },
  bookingApi: async ({ api }, use) => {
    await use(api.bookings);
  },
  messageApi: async ({ api }, use) => {
    await use(api.messages);
  },
  brandingApi: async ({ api }, use) => {
    await use(api.branding);
  },
  reportApi: async ({ api }, use) => {
    await use(api.reports);
  },

  // provide page-object fixtures
  adminAuthPage: async ({ page }, use) => {
    await use(new AdminAuthPage(page));
  },
  adminNavPage: async ({ page }, use) => {
    await use(new AdminNavPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  reservationPage: async ({ page }, use) => {
    await use(new ReservationPage(page));
  },

  // provide an authenticated admin UI session fixture
  loggedInAdmin: async ({ page, adminCreds }, use) => {
    const authPage = new AdminAuthPage(page);
    await authPage.goto();
    await authPage.login(adminCreds.username, adminCreds.password);
    await expect(authPage.logoutButton).toBeVisible();

    const navPage = new AdminNavPage(page);
    await use({ authPage, navPage });
  },
});

export { expect };
