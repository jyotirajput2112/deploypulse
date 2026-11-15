import express from 'express';
import client from 'prom-client';

const app = express();
const PORT = process.env.PORT || 3000;

// Create a Registry to register the metrics
const register = new client.Registry();

// Add a default set of metrics (CPU, memory, etc.)
client.collectDefaultMetrics({ register });

// Root Route - Interactive Search Dashboard with Popup & Details Box
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
          .results-box { margin-top: 20px; background: #0f172a; padding: 15px; border-radius: 8px; text-align: left; display: none; border: 1px solid #334155; }
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

          <div id="resultsBox" class="results-box">
            <h4 style="color: #38bdf8; margin: 0 0 10px 0;">Detailed Infrastructure Report:</h4>
            <div id="resultContent" style="color: #cbd5e1; font-size: 14px; line-height: 1.5;"></div>
          </div>

          <p style="margin-top: 25px;">Endpoints: <a href="/health" style="color: #38bdf8;">/health</a> | <a href="/metrics" style="color: #38bdf8;">/metrics</a></p>
        </div>

        <script>
          function performSearch() {
            const query = document.getElementById('searchInput').value.trim();
            const resultsBox = document.getElementById('resultsBox');
            const resultContent = document.getElementById('resultContent');
            
            if(query) {
              alert('Searching database for: ' + query);
              resultsBox.style.display = 'block';
              
              let details = "";
              const lowerQuery = query.toLowerCase();
              
              if (lowerQuery.includes('cpu')) {
                details = "<b>Service:</b> Compute Node (Render Container)<br><b>CPU Usage:</b> 24.8% (Normal)<br><b>Load Average:</b> 0.42, 0.55<br><span style='color: #22c55e;'>● Status: Optimal & Stable</span>";
              } else if (lowerQuery.includes('auth') || lowerQuery.includes('service')) {
                details = "<b>Service Name:</b> Auth Microservice<br><b>Uptime:</b> 99.98%<br><b>Active Sessions:</b> 1,420<br><span style='color: #22c55e;'>● Status: Healthy</span>";
              } else if (lowerQuery.includes('db') || lowerQuery.includes('database')) {
                details = "<b>Database:</b> PostgreSQL (Render Managed)<br><b>Connections:</b> 14 active / 100 max<br><b>Latency:</b> 4ms<br><span style='color: #22c55e;'>● Status: Connected</span>";
              } else {
                details = "<b>Search Query:</b> " + query + "<br><b>Matched Records:</b> Found in system logs.<br><b>Timestamp:</b> " + new Date().toLocaleString() + "<br><span style='color: #38bdf8;'>● Status: Indexed successfully</span>";
              }
              
              resultContent.innerHTML = details;
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});