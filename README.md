# LabTrack Lite

LabTrack Lite is a full-stack web application designed to manage laboratory assets and track maintenance issues using a ticketing system.

The project replaces manual tracking (Excel, registers, verbal communication) with a centralized web-based solution.

---

## Problem Statement

In many laboratories:
- Assets are tracked manually
- Issues are reported informally
- No proper tracking of open or resolved problems
- Data is lost when systems restart

This leads to inefficiency and poor visibility.

---

## Solution Overview

LabTrack Lite provides:
- Centralized asset management
- Ticket-based issue tracking
- Role-based access (Admin, Technician, Viewer)
- Persistent database storage using SQLite
- Simple chatbot for system guidance

---

## Features

- Add and view lab assets
- Create and track maintenance tickets
- Role-based UI (Admin / Technician / Viewer)
- Rule-based chatbot
- Persistent data storage using SQLite
- Responsive frontend UI

---

## Tech Stack

### Frontend
- React
- HTML, CSS, JavaScript
- Deployed on **Netlify**

### Backend
- ASP.NET Core Minimal APIs
- Entity Framework Core
- SQLite Database
- Deployed on **Railway**

---

## Architecture

User Browser
↓
React Frontend (Netlify)
↓ REST APIs
ASP.NET Core Backend (Railway)
↓
SQLite Database



---

## Database

- SQLite is used for persistent storage
- Data is stored in `labtrack.db`
- Assets and Tickets are saved permanently
- Data remains even after server restart

---

## API Endpoints

| Method | Endpoint | Description |
|------|---------|------------|
| GET | /assets | Fetch all assets |
| POST | /assets | Add new asset |
| GET | /tickets | Fetch all tickets |
| POST | /tickets | Create ticket |
| POST | /chat | Chatbot queries |

---

## How to Run Locally

### Prerequisites
- Node.js
- .NET SDK
- npm

### Backend
```bash
cd LabTrackLite
dotnet run

Backend runs at:
http://localhost:5128

Frontend
cd frontend
npm install
npm start

Frontend runs at:
http://localhost:3000

Deployment:
Frontend: Netlify
Backend: Railway
Database: SQLite (inside Railway backend)

Future Enhancements:
PostgreSQL / MySQL support
Authentication & Authorization
Advanced chatbot using NLP
Cloud storage for QR codes
Admin analytics dashboard

Conclusion
LabTrack Lite demonstrates a complete full-stack system with real-world relevance, clean architecture, database persistence, and cloud deployment.



---

## 🟢 STEP 2: SAVE → COMMIT → PUSH TO GITHUB

### 📌 In project root (`LabTrackLite`)

```bash
git status
git add .
git commit -m "Updated README and finalized SQLite-based deployment"
git push