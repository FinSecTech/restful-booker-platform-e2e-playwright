import { ProtectedApiBase } from "./base-api.js";

// Fields accepted by PUT /api/branding — read-only fields must be excluded
const UPDATABLE_BRANDING_FIELDS = ["name", "description", "logo", "contact"];

export class BrandingApi extends ProtectedApiBase {
  // read branding data
  async read() {
    return this.get("/api/branding", { headers: this.authHeaders() });
  }

  // update branding payload — strips read-only fields before sending
  async update(payload) {
    const clean = {};
    for (const key of UPDATABLE_BRANDING_FIELDS) {
      if (payload[key] !== undefined) {
        clean[key] = payload[key];
      }
    }
    return this.put("/api/branding", clean, { headers: this.authHeaders() });
  }
}
