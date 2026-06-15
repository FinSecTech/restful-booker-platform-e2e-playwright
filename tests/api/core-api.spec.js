import { test, expect } from '../fixtures/test-fixtures.js';
import { buildMessagePayload, uid } from '../support/data-builders.js';

test.describe('Core API contracts', () => {
  test('API-001 @api @smoke @regression auth login contract', async ({ authApi, adminCreds }) => {
    // create login requests with valid and invalid credentials
    const ok = await authApi.login(adminCreds);
    const bad = await authApi.login({ ...adminCreds, password: `${adminCreds.password}-wrong` });

    // validate status codes and token presence
    expect(ok.status()).toBe(200);
    expect((await ok.json()).token).toBeTruthy();
    expect(bad.status()).toBe(401);
  });

  test('API-002 @api @regression room CRUD contract', async ({ api }) => {
    // create room then validate list-update-delete flow
    const roomName = uid('ROOM');
    const createRes = await api.rooms.create({
      roomName,
      type: 'Single',
      accessible: true,
      roomPrice: 120,
      features: ['WiFi', 'TV'],
      description: 'Room created for API-002 coverage',
      image: '/images/room1.jpg',
    });
    expect([200, 201, 202]).toContain(createRes.status());

    const room = await api.rooms.findByName(roomName);
    expect(room).toBeTruthy();
    expect(room.roomName).toBe(roomName);

    const updateRes = await api.rooms.update(room.roomid, { ...room, roomPrice: room.roomPrice + 5 });
    expect([200, 202]).toContain(updateRes.status());

    const deleteRes = await api.rooms.delete(room.roomid);
    expect([200, 202, 204]).toContain(deleteRes.status());
  });

  test('API-003 @api @regression message CRUD contract', async ({ api }) => {
    // create message then validate detail and delete flow
    const payload = buildMessagePayload({ subjectSuffix: uid('MSG') });
    const createRes = await api.messages.create(payload);
    expect([200, 201]).toContain(createRes.status());

    const listed = await api.messages.findBySubject(payload.subject);
    expect(listed).toBeTruthy();

    const detailRes = await api.messages.detail(listed.id);
    expect(detailRes.status()).toBe(200);
    expect((await detailRes.json()).subject).toBe(payload.subject);

    const deleteRes = await api.messages.delete(listed.id);
    expect([200, 202, 204]).toContain(deleteRes.status());
  });

  test('API-004 @api @regression contact validation contract', async ({ api }) => {
    // submit invalid and valid contact payloads
    const invalidRes = await api.messages.create({ name: 'A', email: 'bad', phone: '12', subject: 'x', description: 'short' });
    const validRes = await api.messages.create(buildMessagePayload({ subjectSuffix: uid('VALID') }));

    // validate contract behavior for both requests
    expect([400, 422]).toContain(invalidRes.status());
    expect([200, 201]).toContain(validRes.status());
  });

  test('API-005 @api @regression calendar/report auth + room-specific details', async ({ api }) => {
    // validate report auth requirement and room details endpoint
    const unauthRes = await api.reports.readUnauthenticated();
    const roomRes = await api.rooms.detail(1);

    expect(unauthRes.status()).toBe(401);
    expect(roomRes.status()).toBe(200);
    expect((await roomRes.json()).roomid).toBe(1);
  });
});
