# k8scape

## Kubernetes Dashboard (k8s-dashboard)

A lightweight, containerized Kubernetes dashboard built with React, Node.js, Docker, and TailwindCSS.

Monitor Nodes, Pods, Deployments, Namespaces, and Pod Resource Usage (CPU/Memory) — all from a clean and fast web UI.

⸻

## 📚 Project Structure

k8scape
├── backend
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
├── deploy
│   └── docker-compose.yml
├── frontend
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── api
│   │   │   └── k8s.ts
│   │   ├── App.tsx
│   │   ├── components
│   │   │   ├── DeploymentList.tsx
│   │   │   ├── NamespaceFilter.tsx
│   │   │   ├── NodeList.tsx
│   │   │   ├── PodDetails.tsx
│   │   │   ├── PodList.tsx
│   │   │   └── PodMetrics.tsx
│   │   ├── index.css
│   │   └── index.tsx
│   ├── tailwind.config.js
│   └── tsconfig.json
└── README.md


---

## 🚀 Quick Start

### 1. Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- Kubernetes cluster access ([kubectl](https://kubernetes.io/docs/tasks/tools/) configured)

---

### 2. Build and Run (Docker Compose)

```bash
docker-compose up --build
```

This command:
	•	Builds the backend Node.js API
	•	Builds and serves the frontend React app via Nginx
	•	Creates a private Docker network between services


⸻

3. Access the Dashboard
	•	Frontend: http://localhost:3000
	•	Backend: Internal network (backend:4000, proxied via Nginx)

⸻

🛠️ Features
	•	✅ Node Overview — view all cluster nodes
	•	✅ Pod List — view and filter pods across namespaces
	•	✅ Deployment List — view all deployments
	•	✅ Namespace Filter — select pods/deployments by namespace
	•	✅ Pod Details — labels, status, node info
	•	✅ Resource Metrics — basic CPU/memory usage per pod
	•	✅ Auto-refresh every 30 seconds
	•	✅ Production-ready Docker builds

⸻

📂 Docker Compose Setup

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
```
⸻

🐳 Docker Overview

Service     Description
backend     Node.js API server using Kubernetes client
frontend    React app built and served by Nginx
nginx.conf  Proxies /api/* requests from frontend to backend

Port Mapping:
	•	localhost:3000 → frontend (Nginx serving static React files)
	•	backend:4000 → backend (internal Docker network)

⸻

📝 Local Development Without Docker (Optional)

Run services separately if needed:

Backend

```bash 
cd backend
npm install
npm run start
```

Frontend

```bash 
cd frontend
npm install
npm start
```

⸻

🛠️ Backend Overview
	•	Built with Node.js
	•	Uses @kubernetes/client-node
	•	Exposes endpoints:
	•	/api/nodes
	•	/api/pods
	•	/api/deployments
	•	/api/namespaces

⸻

🛠️ Frontend Overview
	•	Built with React + TypeScript
	•	TailwindCSS styling
	•	React Query for data fetching and caching
	•	Axios HTTP client
	•	Nginx serves final production build
	•	Auto-refresh every 30 seconds for data

⸻

📜 License

This project is licensed under the MIT License.
Free to use, modify, and deploy.

⸻

🙌 Built With
	•	Kubernetes
	•	React
	•	Node.js
	•	Docker
	•	Nginx
	•	TailwindCSS

⸻

🚀 Future Enhancements (Ideas)
	•	Add authentication (JWT or OAuth)
	•	Improve pod metrics display with CPU/memory graphs
	•	Deploy dashboard inside a Kubernetes cluster using a Helm chart
	•	Support dark mode
	•	Add alerting for pod crashloops and other errors

⸻

📈 Example Architecture Diagram

+-----------+          +-----------+
|           |  API     |           |
| Frontend  +--------->+  Backend  |
| (React +  |          | (Node.js  |
|  Nginx)   |          |  Express) |
+-----------+          +-----------+
       |                     |
       | Static Files         | Kubernetes API
       |                      |
       +-----------<----------+

⸻

📋 Commands Summary
	•	Start containers:
docker-compose up –build
	•	Stop containers:
docker-compose down
	•	Rebuild everything:
docker-compose build –no-cache
	•	Local dev backend only:
cd backend && npm install && npm run start
	•	Local dev frontend only:
cd frontend && npm install && npm start

⸻

💬 Questions or Contributions

Feel free to open issues or pull requests!
PRs are welcome to improve functionality, documentation, or add new features.
