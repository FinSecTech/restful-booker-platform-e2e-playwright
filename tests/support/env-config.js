// return required runtime environment variable
export const requiredEnv = name => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env variable: ${name}. Run tests with dotenvx and .env.production.`);
  }
  return value;
};

// provide admin credentials from dotenvx-injected env vars
export const getAdminCreds = () => ({
  username: requiredEnv('ADMIN_USERNAME'),
  password: requiredEnv('ADMIN_PASSWORD'),
});

// provide backward-compatible lazy credential getters
export const creds = {
  get username() {
    return requiredEnv('ADMIN_USERNAME');
  },
  get password() {
    return requiredEnv('ADMIN_PASSWORD');
  },
};
