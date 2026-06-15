export class MessagePage {
  constructor(page) {
    this.page = page;

    // list/details locators
    this.messageLinks = page.locator('a[href*="/admin/message/"]');
    this.deleteButton = page.getByRole('button', { name: /delete/i }).first();
    this.backToMessagesLink = page.getByRole('link', { name: /messages/i }).first();
  }

  // open messages list page
  async goto() {
    await this.page.goto('/admin/message');
  }

  // open first available message details page
  async openFirstMessage() {
    if (await this.messageLinks.count()) {
      await this.messageLinks.first().click();
      return true;
    }
    return false;
  }

  // remove currently opened message if button is available
  async deleteCurrentMessageIfPossible() {
    if (await this.deleteButton.isVisible()) {
      await this.deleteButton.click();
      return true;
    }
    return false;
  }
}
