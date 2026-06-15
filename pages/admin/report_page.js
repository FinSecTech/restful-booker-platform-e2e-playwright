export class ReportPage {
  constructor(page) {
    this.page = page;

    // report page controls
    this.rootHeading = page.getByText(/report/i).first();
    this.selects = page.locator("select");
    this.calendarRoot = page.locator(".rbc-calendar").first();
    this.calendarEvents = page.locator(".rbc-event");
  }

  // open report page directly
  async goto() {
    await this.page.goto("/admin/report");
  }
}
