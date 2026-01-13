import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const {
    DB_HOST = 'localhost',
    DB_PORT = '5432',
    DB_USER = 'postgres',
    DB_PASSWORD = '123456',
    DB_NAME = 'boardgame_festival',
} = process.env;

const pool = new Pool({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME || 'boardgame_festival',
    max: 10,
    idleTimeoutMillis: 30000,
});

export default pool;

export async function ping() {
    const res = await pool.query('SELECT 1 AS ok');
    return res.rows?.[0]?.ok === 1;
}

export async function getFestivals() {
    const res = await pool.query('SELECT * FROM "festival"');
    return res.rows;
}
