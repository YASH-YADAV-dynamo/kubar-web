import { Pool } from 'pg';

// Create a connection pool
const pool = new Pool({
  host: process.env.DB_HOST || '34.131.183.158',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // Enable SSL for remote connections (required for most cloud databases)
  ssl: {
    rejectUnauthorized: false, // Set to false for self-signed certificates
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000, // Increased timeout for remote connections
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export default pool;

