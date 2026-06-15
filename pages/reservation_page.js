import { DateTime } from "luxon";

export class ReservationPage {
  constructor(page) {
    this.page = page;

    // booking form controls
    this.reserveNowButton = page.getByRole("button", { name: "Reserve Now" });
    this.firstNameInput = page.getByPlaceholder("Firstname");
    this.lastNameInput = page.getByPlaceholder("Lastname");
    this.emailInput = page.getByPlaceholder("Email");
    this.phoneInput = page.getByPlaceholder("Phone");
  }

  // open reservation page for room and dates
  async goto(roomId = 1, checkin, checkout) {
    const defaultCheckin = DateTime.utc().plus({ days: 14 }).toISODate();
    const defaultCheckout = DateTime.utc().plus({ days: 16 }).toISODate();

    await this.page.goto(
      `/reservation/${roomId}?checkin=${checkin || defaultCheckin}&checkout=${checkout || defaultCheckout}`,
    );
  }

  // open checkout form modal/section
  async openBookingForm() {
    await this.reserveNowButton.click();
    await this.firstNameInput.waitFor({ state: "visible" });
  }

  // fill reservation guest details
  async fillGuestDetails({ firstName, lastName, email, phone }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
  }

  // submit reservation form
  async submitReservation() {
    await this.reserveNowButton.click();
  }

  // submit reservation and return captured POST response
  // matches response by request body fields to ensure correctness
  // under same-page parallel submits
  async submitReservationAndCapture(guestData = {}) {
    const { firstName, lastName, email } = guestData;

    const hasMatch = (postData) => {
      if (!postData) return false;
      const matchesFirstName = !firstName || postData.firstname === firstName;
      const matchesLastName = !lastName || postData.lastname === lastName;
      const matchesEmail = !email || postData.email === email;
      return matchesFirstName && matchesLastName && matchesEmail;
    };

    const postResponsePromise = this.page.waitForResponse((response) => {
      if (response.request().method() !== "POST") return false;
      try {
        const postData = response.request().postDataJSON();
        return hasMatch(postData);
      } catch {
        return false;
      }
    });

    await this.submitReservation();
    return postResponsePromise;
  }
}
