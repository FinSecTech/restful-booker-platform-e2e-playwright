import { authCookie } from '../data-builders.js';

export class BaseApi {
  constructor(request) {
    this.request = request;
  }

  // send GET request to endpoint
  async get(path, options = {}) {
    return this.request.get(path, options);
  }

  // send POST request to endpoint
  async post(path, data, options = {}) {
    return this.request.post(path, { data, ...options });
  }

  // send PUT request to endpoint
  async put(path, data, options = {}) {
    return this.request.put(path, { data, ...options });
  }

  // send DELETE request to endpoint
  async delete(path, options = {}) {
    return this.request.delete(path, options);
  }
}

export class ProtectedApiBase extends BaseApi {
  constructor(request, getToken) {
    super(request);
    this.getToken = getToken;
  }

  // create auth header from current token provider
  authHeaders() {
    const token = this.getToken?.();
    if (!token) {
      throw new Error('Missing auth token for protected API call.');
    }
    return authCookie(token);
  }
}
