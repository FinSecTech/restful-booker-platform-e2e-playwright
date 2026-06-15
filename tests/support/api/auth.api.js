import { expect } from '@playwright/test';
import { creds } from '../env-config.js';
import { BaseApi } from './base-api.js';

export class AuthApi extends BaseApi {
  // login with provided or default admin credentials
  async login(credentials = { username: creds.username, password: creds.password }) {
    return this.post('/api/auth/login', credentials);
  }

  // obtain auth token and validate response contract
  async loginToken(credentials = { username: creds.username, password: creds.password }) {
    const res = await this.login(credentials);
    expect(res.status(), 'auth login status').toBe(200);

    const body = await res.json();
    expect(body.token, 'auth token present').toBeTruthy();
    return body.token;
  }
}
