import { test, expect } from '../fixtures/test-fixtures.js';
import { DateTime } from 'luxon';
import { buildBookingPayload } from '../support/data-builders.js';
import { futureWindow } from '../support/helpers/date-window.js';

test.describe('Cart API coverage', () => {
  test('CART-002 @api @regression booking date update persists in API response', async ({ bookingApi }) => {
    // create booking and update its date range
    const createRes = await bookingApi.create(buildBookingPayload(futureWindow(1450, 2)));
    expect([200, 201]).toContain(createRes.status());
    const created = await createRes.json();

    const updatedWindow = futureWindow(1455, 4);
    const updateRes = await bookingApi.update(created.bookingid, {
      ...created,
      bookingdates: updatedWindow,
    });
    expect(updateRes.status()).toBe(200);

    const updated = await updateRes.json();
    expect(updated.booking.bookingdates.checkin).toBe(updatedWindow.checkin);
    expect(updated.booking.bookingdates.checkout).toBe(updatedWindow.checkout);

    const deleteRes = await bookingApi.delete(created.bookingid);
    expect([200, 202, 204]).toContain(deleteRes.status());
  });

  test('CART-003 @api @regression remove one booking item from multi-booking setup', async ({ bookingApi }) => {
    // create two bookings and remove only one of them
    const firstRes = await bookingApi.create(buildBookingPayload(futureWindow(1500, 2)));
    const secondRes = await bookingApi.create(buildBookingPayload(futureWindow(1510, 2)));
    expect([200, 201]).toContain(firstRes.status());
    expect([200, 201]).toContain(secondRes.status());

    const first = await firstRes.json();
    const second = await secondRes.json();

    const deleteFirst = await bookingApi.delete(first.bookingid);
    expect([200, 202, 204]).toContain(deleteFirst.status());

    const listRes = await bookingApi.query({ roomid: 1 });
    expect(listRes.status()).toBe(200);
    const ids = ((await listRes.json()).bookings || []).map(booking => booking.bookingid);
    expect(ids).toContain(second.bookingid);

    const deleteSecond = await bookingApi.delete(second.bookingid);
    expect([200, 202, 204]).toContain(deleteSecond.status());
  });

  test('CART-004 @api @regression clear all booking items from setup', async ({ bookingApi }) => {
    // create bookings and clear all of them
    const firstRes = await bookingApi.create(buildBookingPayload(futureWindow(1520, 2)));
    const secondRes = await bookingApi.create(buildBookingPayload(futureWindow(1530, 2)));
    expect([200, 201]).toContain(firstRes.status());
    expect([200, 201]).toContain(secondRes.status());

    const first = await firstRes.json();
    const second = await secondRes.json();

    const deleteFirst = await bookingApi.delete(first.bookingid);
    const deleteSecond = await bookingApi.delete(second.bookingid);
    expect([200, 202, 204]).toContain(deleteFirst.status());
    expect([200, 202, 204]).toContain(deleteSecond.status());
  });

  test('CART-005 @api @regression booking list is stable across repeated reads', async ({ bookingApi }) => {
    // create booking and compare repeated query results
    const createRes = await bookingApi.create(buildBookingPayload(futureWindow(1540, 2)));
    expect([200, 201]).toContain(createRes.status());
    const created = await createRes.json();

    const firstRead = await bookingApi.query({ roomid: 1 });
    const secondRead = await bookingApi.query({ roomid: 1 });
    expect(firstRead.status()).toBe(200);
    expect(secondRead.status()).toBe(200);

    const ids1 = ((await firstRead.json()).bookings || []).map(booking => booking.bookingid);
    const ids2 = ((await secondRead.json()).bookings || []).map(booking => booking.bookingid);
    expect(ids1).toContain(created.bookingid);
    expect(ids2).toContain(created.bookingid);

    const deleteRes = await bookingApi.delete(created.bookingid);
    expect([200, 202, 204]).toContain(deleteRes.status());
  });

  test('CART-006 @api @regression overlapping booking is rejected', async ({ bookingApi }) => {
    // create baseline booking and submit overlapping booking
    const baseWindow = futureWindow(1550, 3);
    const baseRes = await bookingApi.create(buildBookingPayload(baseWindow));
    expect([200, 201]).toContain(baseRes.status());
    const base = await baseRes.json();

    const overlapWindow = {
      checkin: DateTime.fromISO(baseWindow.checkin).plus({ days: 1 }).toISODate(),
      checkout: DateTime.fromISO(baseWindow.checkout).plus({ days: 1 }).toISODate(),
    };
    const overlapRes = await bookingApi.create(buildBookingPayload(overlapWindow));
    expect([400, 409]).toContain(overlapRes.status());

    const deleteRes = await bookingApi.delete(base.bookingid);
    expect([200, 202, 204]).toContain(deleteRes.status());
  });

  test('CART-007 @api @regression booking duration recalculates after update', async ({ bookingApi }) => {
    // create booking then update to longer stay
    const createRes = await bookingApi.create(buildBookingPayload(futureWindow(1560, 2)));
    expect([200, 201]).toContain(createRes.status());
    const created = await createRes.json();

    const updateRes = await bookingApi.update(created.bookingid, {
      ...created,
      bookingdates: futureWindow(1565, 5),
    });
    expect(updateRes.status()).toBe(200);

    const updated = await updateRes.json();
    const checkin = DateTime.fromISO(updated.booking.bookingdates.checkin);
    const checkout = DateTime.fromISO(updated.booking.bookingdates.checkout);
    expect(checkout.diff(checkin, 'days').days).toBe(5);

    const deleteRes = await bookingApi.delete(created.bookingid);
    expect([200, 202, 204]).toContain(deleteRes.status());
  });
});
