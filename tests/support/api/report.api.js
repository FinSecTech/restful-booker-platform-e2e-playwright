import { ProtectedApiBase } from './base-api.js';

export class ReportApi extends ProtectedApiBase {
  // read authenticated admin report
  async read() {
    return this.get('/api/report', { headers: this.authHeaders() });
  }

  // read report endpoint without auth
  async readUnauthenticated() {
    return this.get('/api/report');
  }
}
