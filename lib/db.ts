import { Pool } from 'pg';

declare global {
  // eslint-disable-next-line no-var
  var postgresPool: Pool | undefined;
}

const createPool = () => {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined. Please set it in your environment.');
  }

  const sslPreference = process.env.DATABASE_SSL?.toLowerCase();
  let sslSetting: boolean | { rejectUnauthorized: boolean } | undefined;

  if (sslPreference === 'false') {
    sslSetting = false;
  } else if (sslPreference === 'allow-invalid') {
    sslSetting = { rejectUnauthorized: false };
  } else if (sslPreference === 'true' || sslPreference === 'strict') {
    sslSetting = { rejectUnauthorized: true };
  } else if (sslPreference) {
    sslSetting = { rejectUnauthorized: true };
  } else {
    sslSetting = undefined;
  }

  return new Pool({
    connectionString,
    ssl: sslSetting,
    max: Number(process.env.DATABASE_POOL_MAX ?? 5),
    idleTimeoutMillis: 30_000,
  });
};

export const getPool = () => {
  if (!globalThis.postgresPool) {
    globalThis.postgresPool = createPool();
  }

  return globalThis.postgresPool;
};
