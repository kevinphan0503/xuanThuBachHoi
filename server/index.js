import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool, { ping, getFestivals } from './db.js';

dotenv.config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ ok: true, service: 'api', time: new Date().toISOString() });
});

app.get('/api/db/ping', async (req, res) => {
    try {
        const ok = await ping();
        res.json({ ok });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
});

app.get('/api/festivals', async (req, res) => {
    try {
        const rows = await getFestivals();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/festivals/:festival_id', async (req, res) => {
    try {
        const id = req.params.festival_id || req.params.id;
        // console.log(`Fetching festival with id: ${id}`);
        const [rows] = await pool.query('SELECT * FROM `Festival` WHERE festival_id = ?', [id]);
        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.API_PORT || process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
});
