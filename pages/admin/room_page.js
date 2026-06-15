export class RoomPage {
  constructor(page) {
    this.page = page;

    // room form controls
    this.roomNameInput = page.locator('#roomName');
    this.typeSelect = page.locator('#type');
    this.accessibleSelect = page.locator('#accessible');
    this.roomPriceInput = page.locator('#roomPrice');
    this.wifiCheckbox = page.locator('#wifiCheckbox');
    this.tvCheckbox = page.locator('#tvCheckbox');
    this.createButton = page.getByRole('button', { name: 'Create' });
  }

  // open admin room management page
  async goto() {
    await this.page.goto('/admin/room');
  }

  // fill required room fields before create
  async fillRoomForm({ roomName, type = 'Single', accessible = 'true', roomPrice = '111' }) {
    await this.roomNameInput.fill(roomName);
    await this.typeSelect.selectOption({ label: type }).catch(async () => this.typeSelect.selectOption(type));
    await this.accessibleSelect.selectOption(accessible).catch(async () => this.accessibleSelect.selectOption({ label: accessible }));
    await this.roomPriceInput.fill(String(roomPrice));

    if (await this.wifiCheckbox.isVisible()) await this.wifiCheckbox.check();
    if (await this.tvCheckbox.isVisible()) await this.tvCheckbox.check();
  }

  // submit room create action
  async createRoom() {
    await this.createButton.click();
  }
}
