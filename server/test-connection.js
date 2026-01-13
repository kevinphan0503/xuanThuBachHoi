import pool, { checkRenderConnection } from './db.js';

try {
  const info = await checkRenderConnection();
  if (info.ok) {
    console.log('Postgres connection OK');
    console.log(`Host: ${info.host} | Port: ${info.port}`);
    console.log(`User: ${info.user}`);
    console.log(info.version);
  } else {
    console.log('Postgres ping failed');
  }
} catch (err) {
  console.error('Postgres connection error:', err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
