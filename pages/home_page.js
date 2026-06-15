export class HomePage {
  constructor(page) {
    this.page = page;

    // top-level actions
    this.checkAvailabilityButton = page.getByRole('button', { name: 'Check Availability' });
    this.submitContactButton = page.getByRole('button', { name: 'Submit' });

    // contact form controls
    this.contactName = page.locator('#name');
    this.contactEmail = page.locator('#email');
    this.contactPhone = page.locator('#phone');
    this.contactSubject = page.locator('#subject');
    this.contactDescription = page.locator('#description');
  }

  // open website home page
  async goto() {
    await this.page.goto('/');
  }

  // build a menu anchor locator by display name
  menuLink(name) {
    return this.page.getByRole('link', { name }).first();
  }

  // navigate to a specific in-page section
  async clickMenu(name) {
    await this.menuLink(name).click();
  }

  // focus a menu item for keyboard navigation scenarios
  async focusMenu(name) {
    await this.menuLink(name).focus();
  }

  // first room booking link in catalog
  firstBookNowLink() {
    return this.page.getByRole('link', { name: 'Book now' }).first();
  }

  // get footer links for link validation scenarios
  footerLinks() {
    return this.page.locator('footer a[href]');
  }

  // open contact section anchor
  async gotoContactSection() {
    await this.page.goto('/#contact');
  }

  // populate contact form fields
  async fillContactForm({ name, email, phone, subject, description }) {
    await this.contactName.fill(name);
    await this.contactEmail.fill(email);
    await this.contactPhone.fill(phone);
    await this.contactSubject.fill(subject);
    await this.contactDescription.fill(description);
  }
}
