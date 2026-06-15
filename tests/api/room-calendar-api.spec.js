import { test, expect } from "../fixtures/test-fixtures.js";
import {
  buildBookingPayload,
  buildRoomPayload,
  uid,
} from "../support/data-builders.js";
import { futureWindow } from "../support/helpers/date-window.js";

test.describe("Room and calendar API coverage", () => {
  test("ROOM-001 @api @regression room record can be created", async ({
    roomApi,
  }) => {
    // create room and verify presence in room list
    const payload = buildRoomPayload({ roomName: uid("ROOM1") });
    const createRes = await roomApi.create(payload);
    expect([200, 201, 202]).toContain(createRes.status());

    const listed = await roomApi.findByName(payload.roomName);
    expect(listed).toBeTruthy();

    const deleteRes = await roomApi.delete(listed.roomid);
    expect([200, 202, 204]).toContain(deleteRes.status());
  });

  test("ROOM-002 @api @regression room validation rejects invalid boundaries", async ({
    roomApi,
  }) => {
    // submit invalid room payload
    const invalidRes = await roomApi.create({
      roomName: "A",
      type: "Single",
      accessible: true,
      roomPrice: -1,
      features: [],
      description: "x",
      image: "/images/room1.jpg",
    });

    // validate server-side validation
    expect([400, 422]).toContain(invalidRes.status());
  });

  test("ROOM-003 @api @regression room record can be updated", async ({
    roomApi,
  }) => {
    // create room then update room price
    const roomName = uid("ROOM3");
    const createRes = await roomApi.create(buildRoomPayload({ roomName }));
    expect([200, 201, 202]).toContain(createRes.status());

    const room = await roomApi.findByName(roomName);
    expect(room).toBeTruthy();

    const updateRes = await roomApi.update(room.roomid, {
      ...room,
      roomPrice: Number(room.roomPrice) + 10,
    });
    expect([200, 202]).toContain(updateRes.status());

    const deleteRes = await roomApi.delete(room.roomid);
    expect([200, 202, 204]).toContain(deleteRes.status());
  });

  test("ROOM-004 @api @regression room record can be deleted", async ({
    roomApi,
  }) => {
    // create room then delete it
    const roomName = uid("ROOM4");
    const createRes = await roomApi.create(buildRoomPayload({ roomName }));
    expect([200, 201, 202]).toContain(createRes.status());

    const room = await roomApi.findByName(roomName);
    expect(room).toBeTruthy();

    const deleteRes = await roomApi.delete(room.roomid);
    expect([200, 202, 204]).toContain(deleteRes.status());
  });

  test.fail(
    "ROOM-005 @api @regression room deletion is blocked when bookings exist",
    async ({ roomApi, bookingApi }) => {
      // create room and dependent booking
      const roomName = uid("ROOM5");
      const createRes = await roomApi.create(buildRoomPayload({ roomName }));
      expect([200, 201, 202]).toContain(createRes.status());

      const room = await roomApi.findByName(roomName);
      expect(room).toBeTruthy();

      const bookingRes = await bookingApi.create(
        buildBookingPayload({ roomid: room.roomid, ...futureWindow(1800, 2) }),
      );
      expect([200, 201]).toContain(bookingRes.status());
      const booking = await bookingRes.json();

      const blockedDelete = await roomApi.delete(room.roomid);
      expect([400, 409]).toContain(blockedDelete.status());

      const deleteBooking = await bookingApi.delete(booking.bookingid);
      expect([200, 202, 204]).toContain(deleteBooking.status());

      const deleteRoom = await roomApi.delete(room.roomid);
      expect([200, 202, 204]).toContain(deleteRoom.status());
    },
  );

  test("ROOM-006 @api @regression unauthorized room mutation is blocked", async ({
    request,
  }) => {
    // create room request without auth headers
    const res = await request.post("/api/room", {
      data: {
        roomName: uid("ROOM6"),
        type: "Single",
        accessible: true,
        roomPrice: 100,
      },
    });

    // validate unauthorized/forbidden response
    expect([401, 403]).toContain(res.status());
  });

  test("CAL-003 @api @regression booking date boundary queries are handled", async ({
    bookingApi,
  }) => {
    // query booking endpoint with edge date windows
    const sameDayRes = await bookingApi.query({
      roomid: 1,
      checkin: "2030-07-01",
      checkout: "2030-07-01",
    });
    const reversedRes = await bookingApi.query({
      roomid: 1,
      checkin: "2030-07-10",
      checkout: "2030-07-01",
    });

    // validate boundary behavior response codes
    expect([200, 400]).toContain(sameDayRes.status());
    expect([200, 400]).toContain(reversedRes.status());
  });
});
