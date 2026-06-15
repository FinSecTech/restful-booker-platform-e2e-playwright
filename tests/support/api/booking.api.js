import { buildBookingPayload } from '../data-builders.js';
import { ProtectedApiBase } from './base-api.js';

export class BookingApi extends ProtectedApiBase {
  // create booking with payload or generated defaults
  async create(payload = buildBookingPayload()) {
    return this.post('/api/booking', payload, { headers: this.authHeaders() });
  }

  // update booking by id
  async update(bookingid, payload) {
    return this.put(`/api/booking/${bookingid}`, payload, { headers: this.authHeaders() });
  }

  // delete booking by id
  async delete(bookingid) {
    return super.delete(`/api/booking/${bookingid}`, { headers: this.authHeaders() });
  }

  // query bookings by optional filter params
  async query({ roomid, checkin, checkout } = {}) {
    const params = new URLSearchParams();
    if (roomid !== undefined) params.set('roomid', String(roomid));
    if (checkin) params.set('checkin', checkin);
    if (checkout) params.set('checkout', checkout);

    const qs = params.toString();
    const path = `/api/booking${qs ? `?${qs}` : ''}`;
    return this.get(path, { headers: this.authHeaders() });
  }
}
