import { test, expect } from "../fixtures/test-fixtures.js";
import { bookingWindow, buildGuestData } from "../support/data-builders.js";

test.describe("Booking and checkout UI coverage", () => {
  test("CART-001 @smoke @regression reservation page booking action is accessible", async ({
    reservationPage,
  }) => {
    // open reservation page with future booking dates
    const window = bookingWindow({ startInDays: 12, nights: 2 });
    await reservationPage.goto(1, window.checkin, window.checkout);

    // validate booking CTA is visible and form can be opened
    await expect(reservationPage.reserveNowButton).toBeVisible();
    await reservationPage.openBookingForm();
    await expect(reservationPage.firstNameInput).toBeVisible();
  });

  test("CHK-001 @smoke @regression checkout form accepts valid guest details", async ({
    reservationPage,
  }) => {
    // open booking form and create valid guest payload
    const window = bookingWindow({ startInDays: 15, nights: 2 });
    const guest = buildGuestData();

    await reservationPage.goto(1, window.checkin, window.checkout);
    await reservationPage.openBookingForm();
    await reservationPage.fillGuestDetails(guest);

    // submit booking and capture backend response
    const response = await reservationPage.submitReservationAndCapture(guest);

    // validate submit does not trigger server failure
    expect(response.status()).toBeLessThan(500);
  });

  test("CHK-007 @regression checkout form fields can be reset by user input changes", async ({
    reservationPage,
  }) => {
    // open booking form and fill guest details
    const window = bookingWindow({ startInDays: 20, nights: 2 });

    await reservationPage.goto(1, window.checkin, window.checkout);
    await reservationPage.openBookingForm();
    await reservationPage.fillGuestDetails({
      firstName: "Reset",
      lastName: "State",
      email: "reset@example.com",
      phone: "12345678901",
    });

    // clear first name field to validate reset behavior
    await reservationPage.firstNameInput.fill("");

    // validate field value was reset
    await expect(reservationPage.firstNameInput).toHaveValue("");
  });
});
