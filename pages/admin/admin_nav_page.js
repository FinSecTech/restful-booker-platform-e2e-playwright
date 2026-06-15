import { RoomPage } from './room_page.js';
import { ReportPage } from './report_page.js';
import { BrandingPage } from './branding_page.js';
import { MessagePage } from './message_page.js';

export class AdminNavPage {
  constructor(page) {
    this.page = page;

    // admin area navigation controls
    this.roomsLink = page.getByRole('link', { name: /Rooms/i });
    this.reportLink = page.getByRole('link', { name: 'Report' });
    this.brandingLink = page.getByRole('link', { name: 'Branding' });
    this.messagesLink = page.getByRole('link', { name: /Messages/i });
  }

  // navigate to Rooms section
  async openRooms() {
    await this.roomsLink.click();
    return new RoomPage(this.page);
  }

  // navigate to Report section
  async openReport() {
    await this.reportLink.click();
    return new ReportPage(this.page);
  }

  // navigate to Branding section
  async openBranding() {
    await this.brandingLink.click();
    return new BrandingPage(this.page);
  }

  // navigate to Messages section
  async openMessages() {
    await this.messagesLink.click();
    return new MessagePage(this.page);
  }
}
