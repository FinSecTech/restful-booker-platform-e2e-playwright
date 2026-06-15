import { test, expect } from '../fixtures/test-fixtures.js';
import { buildMessagePayload } from '../support/data-builders.js';

test.describe('Contact UI coverage', () => {
  test('CNT-001 @sanity @regression contact form required fields validation', async ({ homePage }) => {
    // open contact section and submit empty form
    await homePage.gotoContactSection();
    await homePage.submitContactButton.click();

    // validate form remains visible for correction
    await expect(homePage.contactName).toBeVisible();
  });

  test('CNT-002 @sanity @regression contact form valid submission', async ({ page, homePage }) => {
    // open contact section and fill valid payload
    await homePage.gotoContactSection();
    await homePage.fillContactForm(buildMessagePayload());

    // submit request and capture POST response
    const postPromise = page.waitForResponse(response => response.url().includes('/api/message') && response.request().method() === 'POST');
    await homePage.submitContactButton.click();
    const response = await postPromise;

    // validate successful contact submission
    expect([200, 201]).toContain(response.status());
  });
});
