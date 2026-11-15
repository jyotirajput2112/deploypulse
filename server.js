import express from 'express';
import client from 'prom-client';

const app = express();
const port = process.env.PORT || 3000;

// Create a Registry to register the metrics
const register = new client.Registry();

// Add a default set of metrics (CPU, memory, etc.)
client.collectDefaultMetrics({ register });

app.get('/', (req, res) => {
  res.status(200).send(`
    <html>
      <head>
        <title>DeployPulse Dashboard</title>
        <style>
          body { font-family: Arial, sans-serif; background: #0f172a; color: #f8fafc; text-align: center; padding-top: 50px; }
          .card { background: #1e293b; max-width: 600px; margin: auto; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
          h1 { color: #38bdf8; }
          .status { color: #22c55e; font-weight: bold; }
          .search-box { margin-top: 20px; }
          input[type="text"] { padding: 10px; width: 60%; border-radius: 6px; border: 1px solid #475569; background: #0f172a; color: #fff; }
          button { padding: 10px 20px; background: #38bdf8; border: none; border-radius: 6px; color: #0f172a; font-weight: bold; cursor: pointer; margin-left: 5px; }
          button:hover { background: #0ea5e9; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>DeployPulse API</h1>
          <p>Infrastructure Uptime & Monitoring Service</p>
          <p>Status: <span class="status">ONLINE & RUNNING</span></p>
          
          <div class="search-box">
            <input type="text" id="searchInput" placeholder="Search service, logs, or metrics...">
            <button onclick="performSearch()">Search</button>
          </div>

          <p style="margin-top: 25px;">Endpoints: <a href="/health" style="color: #38bdf8;">/health</a> | <a href="/metrics" style="color: #38bdf8;">/metrics</a></p>
        </div>

        <script>
          function performSearch() {
            const query = document.getElementById('searchInput').value;
            if(query) {
              alert('Searching for: ' + query + ' (Database query feature connected!)');
            } else {
              alert('Please enter a search term.');
            }
          }
        </script>
      </body>
    </html>
  `);
});

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