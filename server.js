import express from 'express';
import client from 'prom-client';

const app = express();
const port = process.env.PORT || 3000;

// Create a Registry to register the metrics
const register = new client.Registry();

// Add a default set of metrics (CPU, memory, etc.)
client.collectDefaultMetrics({ register });

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', database: 'Connected' });
});

// Metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

app.listen(port, () => {
  console.log(`DeployPulse API running on port ${port}`);
});