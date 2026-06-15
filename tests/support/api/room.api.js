import { expect } from '@playwright/test';
import { buildRoomPayload } from '../data-builders.js';
import { ProtectedApiBase } from './base-api.js';

export class RoomApi extends ProtectedApiBase {
  // create room with payload or generated defaults
  async create(payload = buildRoomPayload()) {
    return this.post('/api/room', payload, { headers: this.authHeaders() });
  }

  // retrieve room list
  async list() {
    return this.get('/api/room');
  }

  // retrieve room details by id
  async detail(roomid) {
    return this.get(`/api/room/${roomid}`);
  }

  // find room object by roomName
  async findByName(roomName) {
    const res = await this.list();
    expect(res.status()).toBe(200);

    const body = await res.json();
    return (body.rooms || []).find(room => room.roomName === roomName);
  }

  // update room by id
  async update(roomid, payload) {
    return this.put(`/api/room/${roomid}`, payload, { headers: this.authHeaders() });
  }

  // delete room by id
  async delete(roomid) {
    return super.delete(`/api/room/${roomid}`, { headers: this.authHeaders() });
  }
}
