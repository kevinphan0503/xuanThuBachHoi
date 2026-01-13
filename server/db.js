import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
    DATABASE_URL,
    DB_SSL = 'true',
    DB_HOST = 'localhost',
    DB_PORT = '5432',
    DB_USER = 'postgres',
    DB_PASSWORD = '',
    DB_NAME = 'boardgame_festival',
    PGSSLMODE = '',
} = process.env;

// Auto-detect SSL usage (Render requires SSL on External URL)
const shouldUseSSL = (
    (PGSSLMODE && PGSSLMODE.toLowerCase() === 'require') ||
    (DB_SSL && DB_SSL.toLowerCase() === 'true') ||
    (DATABASE_URL && /render\.com/.test(DATABASE_URL))
);
const sslOption = shouldUseSSL ? { rejectUnauthorized: false } : undefined;

let pool;
if (DATABASE_URL) {
    // Use connection string (e.g., Render External/Internal URL)
    pool = new Pool({
        connectionString: DATABASE_URL,
        ssl: sslOption,
        max: 10,
        idleTimeoutMillis: 30000,
    });
} else {
    // Fallback to discrete connection fields
    pool = new Pool({
        host: DB_HOST,
        port: Number(DB_PORT),
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME || 'boardgame_festival',
        ssl: sslOption,
        max: 10,
        idleTimeoutMillis: 30000,
    });
}

export default pool;

export async function ping() {
    const result = await pool.query('SELECT 1 AS ok');
    return Number(result.rows[0].ok) === 1;
}

export async function checkRenderConnection() {
    const pingResult = await pool.query('SELECT 1 AS ok');
    const serverInfo = await pool.query('SELECT inet_server_addr() AS host, inet_server_port() AS port');
    const userInfo = await pool.query('SELECT version() AS version, current_user AS user, current_database() AS database');

    const url = process.env.DATABASE_URL || '';
    const usesRenderUrl = /render\.com/.test(url);
    const hostOpt = pool?.options?.host || pool?.options?.connectionString || null;
    const usesRenderHost = typeof hostOpt === 'string' && /render\.com/.test(hostOpt);

    return {
        ok: Number(pingResult.rows[0].ok) === 1,
        host: serverInfo.rows?.[0]?.host ?? null,
        port: Number(serverInfo.rows?.[0]?.port ?? 0),
        version: userInfo.rows?.[0]?.version ?? null,
        user: userInfo.rows?.[0]?.user ?? null,
        database: userInfo.rows?.[0]?.database ?? null,
        ssl: Boolean(pool?.options?.ssl),
        uses_render_url: usesRenderUrl,
        uses_render_host: usesRenderHost,
    };
}

export async function getFestivals() {
    const result = await pool.query('SELECT * FROM festival');
    return result.rows;
}
