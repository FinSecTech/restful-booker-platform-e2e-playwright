import { test, expect } from '@playwright/test';
import fs from 'node:fs';

const workflowPath = '.github/workflows/playwright-allure.yml';

function readWorkflow() {
  // load CI workflow yaml as text
  return fs.readFileSync(workflowPath, 'utf-8');
}

test.describe('CI/CD workflow coverage', () => {
  test('CI-001 @api @regression workflow suite routing exists', async () => {
    // read workflow and validate supported suites in dispatch switch
    const wf = readWorkflow();
    for (const suite of ['smoke', 'sanity', 'regression', 'api', 'visual', 'all']) {
      expect(wf).toContain(suite);
    }
    expect(wf).toContain('Unknown suite');
  });

  test('CI-002 @api @regression allure report generation configured', async () => {
    // read workflow and validate allure generation commands
    const wf = readWorkflow();
    expect(wf).toContain('allure generate');
    expect(wf).toContain('allure-results');
    expect(wf).toContain('Upload test artifacts');
  });

  test('CI-003 @api @regression allure history persistence configured', async () => {
    // read workflow and validate history restore/publish stages
    const wf = readWorkflow();
    expect(wf).toContain('Checkout gh-pages for history');
    expect(wf).toContain('gh-pages/history');
    expect(wf).toContain('Publish Allure report to gh-pages');
  });

  test('CI-004 @api @regression cross-browser matrix configured in Playwright config', async () => {
    // read Playwright config and validate browser projects matrix
    const cfg = fs.readFileSync('playwright.config.js', 'utf-8');
    expect(cfg).toContain('Desktop Chrome');
    expect(cfg).toContain('Desktop Firefox');
    expect(cfg).toContain('Desktop Safari');
  });
});
