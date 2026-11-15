<img width="2730" height="1536" alt="Gemini_Generated_Image_udm7tnudm7tnudm7" src="https://github.com/user-attachments/assets/7928f009-bf63-4eb6-b4c0-63083856fd7d" />
# 🚀 DeployPulse
### Infrastructure Uptime & Monitoring Service

<p align="center">
  <img src="https://img.shields.io/badge/Status-ONLINE_%26_RUNNING-22c55e?style=for-the-badge&logo=icloud&logoColor=white" alt="Status">
  <img src="https://img.shields.io/badge/Platform-Render-000000?style=for-the-badge&logo=render&logoColor=white" alt="Render">
  <img src="https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/CI%2FCD-Automated-38bdf8?style=for-the-badge&logo=githubactions&logoColor=white" alt="CI/CD">
</p>

---

## 📖 About the Project
**DeployPulse** is a modern, cloud-native Uptime & Monitoring Service built specifically for DevOps and Cloud Engineers. It provides a real-time, interactive dashboard designed to monitor system health, service uptime, and key infrastructure metrics. The project showcases a robust CI/CD deployment pipeline, branch-based environment parity, and containerized cloud workflows.

---

## 📊 Architecture & CI/CD Workflow
<p align="center">
  <img width="2730" height="1536" alt="DeployPulse Workflow" src="https://github.com/user-attachments/assets/7928f009-bf63-4eb6-b4c0-63083856fd7d" />
</p>

---

## ✨ Key Features
* **Interactive Search Dashboard:** A sleek, dark-themed UI allowing users to search specific infrastructure services, system logs, or performance metrics (e.g., `cpu`, `database`, `auth`).
* **Dynamic Results & Alert Integration:** Combines instant JavaScript popup alerts with an expandable detailed infrastructure report card displaying real-time data.
* **Gitflow Branching Strategy:** Isolated environments mapped cleanly across branches:
  * `main` branch $\rightarrow$ Live Production Environment
  * `develop` branch $\rightarrow$ Staging & Testing Environment
* **Automated CI/CD Pipelines:** Integrated with Render for instant containerized builds and automatic deployments upon pushing code to GitHub.
* **Production-Ready Dockerization:** Standardized container builds using `Dockerfile` ensuring consistent execution across local and cloud environments.
* **Prometheus Metrics Support:** Exposes standard runtime and infrastructure metrics via `prom-client` and `/metrics`.

---

## 🛠️ Tech Stack
* **Backend Runtime:** Node.js, Express.js (ES Modules)
* **Frontend UI:** HTML5, CSS3, Vanilla JavaScript (Dark-themed glassmorphism style)
* **Cloud Platform:** Render (Web Services)
* **Containerization:** Docker, Docker Compose
* **Version Control & CI/CD:** Git, GitHub Repositories

---

## 🌐 Live Application Links
* **Production Environment:** [https://deploypulse-prod.onrender.com](https://deploypulse-prod.onrender.com)
* **Staging Environment:** [https://deploypulse-staging.onrender.com](https://deploypulse-staging.onrender.com)

---

## 🔌 API Endpoints Documentation

| Endpoint | Method | Description |
| :--- | :---: | :--- |
| **`/`** | `GET` | Renders the interactive uptime monitoring dashboard with live search & report cards. |
| **`/health`** | `GET` | Returns system health status (`{ status: "UP", database: "Connected" }`). |
| **`/metrics`** | `GET` | Exposes Prometheus-compatible container and runtime metrics (`prom-client`). |

---

## 📁 Project Directory Structure
```text
deploypulse/
├── .github/workflows/    # CI/CD automation and scanning configurations
├── node_modules/         # Project dependencies
├── server.js             # Main Express application & dashboard UI logic
├── server.test.js        # Automated unit tests
├── Dockerfile            # Multi-stage production container configuration
├── docker-compose.yml    # Local multi-container setup
├── package.json          # Project metadata, dependencies, and type: module
└── README.md             # Project documentation

🚀 Local Setup & Development
1. Clone the Repository
 git clone https://github.com/jyotirajput2112/deploypulse.git
cd deploypulse

2. Install Dependencies
npm install

3. Run Locally
npm start

4 Run via Docker
docker build -t deploypulse .
docker run -p 3000:3000 deploypulse



