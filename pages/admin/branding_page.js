export class BrandingPage {
  constructor(page) {
    this.page = page;

    // branding form controls
    this.nameInput = page.locator('#name').first();
    this.emailInput = page.locator('#email').first();
    this.phoneInput = page.locator('#phone').first();
    this.saveButton = page.getByRole('button', { name: /save|update/i }).first();
  }

  // open branding page directly
  async goto() {
    await this.page.goto('/admin/branding');
  }

  // update the brand name when field is editable
  async updateNameIfEditable(newName) {
    if (await this.nameInput.isVisible()) {
      await this.nameInput.fill(newName);
      if (await this.saveButton.isVisible()) {
        await this.saveButton.click();
      }
      return true;
    }

    return false;
  }
}
