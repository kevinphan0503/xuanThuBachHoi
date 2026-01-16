import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
    DATABASE_URL,
    LOCAL_DATABASE_URL = 'postgresql://postgres:123456@localhost:5432/boardgame_festival',
    USE_LOCAL_DB,
    DB_SSL = '',
    DB_HOST = 'localhost',
    DB_PORT = '5432',
    DB_USER = 'postgres',
    DB_PASSWORD = '123456',
    DB_NAME = 'boardgame_festival',
    PGSSLMODE = '',
} = process.env;

// Force local DB when running server on port 5001
const SERVER_PORT = process.env.API_PORT || process.env.PORT || '';
const forceLocalByPort = Number(SERVER_PORT) === 5001 ? true : null;

// Toggle to use local database while testing:
// 1) Set env USE_LOCAL_DB=true, OR
// 2) Temporarily uncomment the `forceLocal` option in createPool() below.
// In Render, we default to remote DB unless USE_LOCAL_DB is explicitly true.
const hasRender = Boolean(process.env.RENDER || process.env.RENDER_INTERNAL_HOSTNAME);
const envUseLocal = (() => {
    if (typeof USE_LOCAL_DB === 'string') {
        return USE_LOCAL_DB.toLowerCase() === 'true';
    }
    if (hasRender || DATABASE_URL) {
        return false;
    }
    return true;
})();

function createPool({ forceLocal = null } = {}) {
    const useLocal = forceLocal ?? envUseLocal;

    // Auto-detect SSL usage (Render requires SSL on External URL); skip for local
    const dbSslFlag = (DB_SSL || '').toLowerCase() === 'true';
    const shouldUseSSL = !useLocal && (
        (PGSSLMODE && PGSSLMODE.toLowerCase() === 'require') ||
        dbSslFlag ||
        (DATABASE_URL && /render\.com/.test(DATABASE_URL))
    );
    const sslOption = shouldUseSSL ? { rejectUnauthorized: false } : undefined;

    // Prefer explicit local connection string if provided when useLocal is true
    const preferredLocalUrl = LOCAL_DATABASE_URL || '';
    const localHost = DB_HOST || 'localhost';
    const localPort = Number(DB_PORT) || 5432;
    const localUser = DB_USER || 'postgres';
    const localPassword = DB_PASSWORD || '123456';
    const localDatabase = DB_NAME || 'boardgame_festival';

    if (!useLocal && DATABASE_URL) {
        // Use remote/dev connection string (e.g., Render External/Internal URL)
        return new Pool({
            connectionString: DATABASE_URL,
            ssl: sslOption,
            max: 10,
            idleTimeoutMillis: 30000,
        });
    }

    if (useLocal && preferredLocalUrl) {
        // Use local connection string (override dev)
        return new Pool({
            connectionString: preferredLocalUrl,
            ssl: sslOption,
            max: 10,
            idleTimeoutMillis: 30000,
        });
    }

    // Fallback to discrete connection fields (works for both local + dev)
    return new Pool({
        host: useLocal ? localHost : DB_HOST,
        port: useLocal ? localPort : Number(DB_PORT),
        user: useLocal ? localUser : DB_USER,
        password: useLocal ? localPassword : DB_PASSWORD,
        database: useLocal ? localDatabase : (DB_NAME || 'boardgame_festival'),
        ssl: sslOption,
        max: 10,
        idleTimeoutMillis: 30000,
    });
}

// Factories for explicit local vs. render connections
export function createLocalPool() {
    return createPool({ forceLocal: true });
}

export function createRenderPool() {
    return createPool({ forceLocal: false });
}

// Pre-created pools for convenience:
// - `localPool`: uses your local Postgres (LOCAL_DATABASE_URL or local fields)
// - `renderPool`: uses Render/Postgres via DATABASE_URL with SSL when needed
const localPool = createLocalPool();
const renderPool = createRenderPool();
// Default pool: force local when server runs on port 5001; otherwise follow env
const pool = createPool({ forceLocal: forceLocalByPort });

export { createPool, localPool, renderPool };

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
