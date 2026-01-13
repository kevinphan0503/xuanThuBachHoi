import pool, { ping } from './db.js';

try {
  const ok = await ping();
  if (ok) {
    console.log('MySQL connection OK');
  } else {
    console.log('MySQL ping failed');
  }
} catch (err) {
  console.error('MySQL connection error:', err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
