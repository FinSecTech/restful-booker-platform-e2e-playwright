import { expect } from '@playwright/test';
import { buildMessagePayload } from '../data-builders.js';
import { ProtectedApiBase } from './base-api.js';

export class MessageApi extends ProtectedApiBase {
  // create public contact message
  async create(payload = buildMessagePayload()) {
    return this.post('/api/message', payload);
  }

  // list messages in admin endpoint
  async list() {
    return this.get('/api/message');
  }

  // find message by subject text
  async findBySubject(subject) {
    const res = await this.list();
    expect(res.status()).toBe(200);

    const body = await res.json();
    return (body.messages || []).find(message => message.subject === subject);
  }

  // read message details by id
  async detail(id) {
    return this.get(`/api/message/${id}`);
  }

  // mark message as read
  async markAsRead(id) {
    return this.put(`/api/message/${id}/read`, {}, { headers: this.authHeaders() });
  }

  // delete message by id
  async delete(id) {
    return super.delete(`/api/message/${id}`, { headers: this.authHeaders() });
  }
}
