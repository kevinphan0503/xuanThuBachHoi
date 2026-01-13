import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const {
    DB_HOST = 'localhost',
    DB_PORT = '3306',
    DB_USER = 'root',
    DB_PASSWORD = 'Nhatquy103',
    DB_NAME = 'boardgame_festival',
} = process.env;

const pool = mysql.createPool({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME || 'boardgame_festival',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4',
});

export default pool;

export async function ping() {
    const [rows] = await pool.query('SELECT 1 AS ok');
    return rows[0].ok === 1;
}

export async function getFestivals() {
    const [rows] = await pool.query('SELECT * FROM `Festival`');
    return rows;
}
