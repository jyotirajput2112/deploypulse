import express from 'express';
import pkg from 'pg';
import client from 'prom-client';

const { Pool } = pkg;
const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Database Table Initialization on startup
const initDb = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS monitors (
      id SERIAL PRIMARY KEY,
      url TEXT NOT NULL,
      status VARCHAR(50) DEFAULT 'UNKNOWN',
      response_time INT DEFAULT 0,
      checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log("Database connected & 'monitors' table verified successfully.");
  } catch (err) {
    console.error("Database connection error:", err.message);
  }
};

initDb();

// Prometheus Metrics Setup
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ prefix: 'deploypulse_' });

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'deploypulse_http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.5, 1, 1.5, 5]
});

app.use((req, res, next) => {
  const startTimer = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    startTimer({ method: req.method, route: req.route ? req.route.path : req.path, code: res.statusCode });
  });
  next();
});

// 1. Health Check Endpoint
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ status: 'UP', database: 'Connected' });
  } catch (err) {
    res.status(500).json({ status: 'DOWN', error: err.message });
  }
});

// 2. Get all monitors
app.get('/monitors', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM monitors ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Add a new monitor URL
app.post('/monitors', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });
  
  try {
    const result = await pool.query(
      'INSERT INTO monitors (url, status, response_time) VALUES ($1, $2, $3) RETURNING *',
      [url, 'PENDING', 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Metrics Endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', client.register.contentType);
  res.send(await client.register.metrics());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`DeployPulse API running on port ${PORT}`);
});