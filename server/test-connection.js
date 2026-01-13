import pool, { ping } from './db.js';

try {
  const ok = await ping();
  if (ok) {
    console.log('Postgres connection OK');
  } else {
    console.log('Postgres ping failed');
  }
} catch (err) {
  console.error('Postgres connection error:', err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
