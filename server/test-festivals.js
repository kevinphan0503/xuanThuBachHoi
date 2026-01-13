import { getFestivals } from './db.js';

try {
  const rows = await getFestivals();
  console.log(JSON.stringify(rows, null, 2));
} catch (err) {
  console.error('Failed to fetch festivals:', err.message);
  process.exitCode = 1;
}
