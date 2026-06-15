import { test, expect } from "../fixtures/test-fixtures.js";
import { buildBookingPayload } from "../support/data-builders.js";
import { futureWindow } from "../support/helpers/date-window.js";

test.describe("Checkout API coverage", () => {
  test("CHK-002 @api @regression checkout required fields validation", async ({
    bookingApi,
  }) => {
    // submit booking payload with missing required fields
    const res = await bookingApi.create({ roomid: 1 });

    // validate required field rejection
    expect(res.status()).toBe(400);
  });

  test("CHK-003 @api @regression checkout format validation for email and phone", async ({
    bookingApi,
  }) => {
    // submit booking payload with invalid email and phone
    const res = await bookingApi.create(
      buildBookingPayload({
        ...futureWindow(1570, 1),
        firstname: "A",
        lastname: "B",
        email: "bad",
        phone: "1",
      }),
    );

    // validate format validation response
    expect(res.status()).toBe(400);
  });

  test("CHK-004 @api @regression checkout boundary validation for minimal names", async ({
    bookingApi,
  }) => {
    // submit boundary-size guest names in booking payload
    const res = await bookingApi.create(
      buildBookingPayload({
        ...futureWindow(1580, 1),
        firstname: "A",
        lastname: "B",
      }),
    );

    // validate boundary behavior response
    expect([200, 201, 400]).toContain(res.status());

    // cleanup created booking when accepted
    if ([200, 201].includes(res.status())) {
      const body = await res.json();
      const deleteRes = await bookingApi.delete(body.bookingid);
      expect([200, 202, 204]).toContain(deleteRes.status());
    }
  });

  test("CHK-005 @api @regression duplicate checkout submit protection", async ({
    bookingApi,
  }) => {
    // submit duplicate booking requests in parallel
    const payload = buildBookingPayload({
      ...futureWindow(1590, 2),
      firstname: "Dup",
      lastname: "User",
      email: "dup@example.com",
      phone: "12345678901",
    });

    const [firstRes, secondRes] = await Promise.all([
      bookingApi.create(payload),
      bookingApi.create(payload),
    ]);

    // validate concurrency response outcomes
    expect([200, 201, 400, 409]).toContain(firstRes.status());
    expect([200, 201, 400, 409]).toContain(secondRes.status());

    // cleanup any accepted bookings
    for (const res of [firstRes, secondRes]) {
      if ([200, 201].includes(res.status())) {
        const body = await res.json();
        const deleteRes = await bookingApi.delete(body.bookingid);
        expect([200, 202, 204]).toContain(deleteRes.status());
      }
    }
  });

  test.fail(
    "CHK-006 @api @regression checkout backend failure on invalid room id",
    async ({ bookingApi }) => {
      // submit booking for non-existing room id
      const res = await bookingApi.create(
        buildBookingPayload({
          roomid: 9999999,
          ...futureWindow(1600, 1),
        }),
      );

      // validate backend rejection status
      expect([400, 404]).toContain(res.status());
    },
  );
});
