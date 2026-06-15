import { getAdminCreds } from '../env-config.js';
import { AuthApi } from './auth.api.js';
import { BookingApi } from './booking.api.js';
import { BrandingApi } from './branding.api.js';
import { MessageApi } from './message.api.js';
import { ReportApi } from './report.api.js';
import { RoomApi } from './room.api.js';

// create all API domain clients for a single request context
export class ApiClientFactory {
  constructor(request, token = '') {
    this.request = request;
    this.token = token;

    // initialize all domain clients
    this.auth = new AuthApi(request);
    this.rooms = new RoomApi(request, () => this.token);
    this.messages = new MessageApi(request, () => this.token);
    this.bookings = new BookingApi(request, () => this.token);
    this.branding = new BrandingApi(request, () => this.token);
    this.reports = new ReportApi(request, () => this.token);
  }

  // authenticate and cache token for protected client methods
  async authenticate(credentials = getAdminCreds()) {
    this.token = await this.auth.loginToken(credentials);
    return this.token;
  }
}

// helper for one-call authenticated api factory creation
export async function createAuthenticatedApi(request, credentials = getAdminCreds()) {
  const api = new ApiClientFactory(request);
  await api.authenticate(credentials);
  return api;
}
