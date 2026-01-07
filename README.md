# LabTrack Lite 🧪

LabTrack Lite is a lightweight **full-stack web application** designed to manage R&D laboratory assets and track issues using a simple ticketing system.  
It replaces manual methods like Excel sheets, registers, or verbal communication with a **centralized, web-based solution**.

---

## 🚨 Problem Statement

In many R&D laboratories:

- Assets are tracked manually (Excel, notebooks)
- Issues are reported verbally or informally
- No centralized system exists to track asset problems
- No visibility into open, ongoing, or resolved issues

This results in **poor traceability, delayed maintenance, and operational confusion**.

---

## 💡 Solution Overview

**LabTrack Lite** provides:

- A centralized web interface to manage lab assets
- A ticketing system to report and track asset-related issues
- A role-based dashboard experience
- A simple AI-style chatbot to query system information

---

## ✨ Key Features

- Add and view laboratory assets
- Create and track issue tickets
- Ticket status visibility (Open / In Progress / Closed)
- Role-based views (Admin, Technician, Viewer)
- Rule-based chatbot for natural language queries
- Clean, responsive, and user-friendly UI
- Full-stack client–server architecture

---

## 👥 User Roles (Demo-based)

- **Admin**
  - Add and manage lab assets
  - View all tickets and asset status

- **Technician**
  - Create and track maintenance tickets

- **Viewer**
  - Read-only access to assets and tickets

> ⚠️ Authentication is intentionally skipped for hackathon demo simplicity.

---

## 🛠️ Tech Stack

**Frontend**
- React (Create React App)
- HTML, CSS (custom styling)
- REST API integration

**Backend**
- ASP.NET Core (Minimal APIs)
- In-memory data storage (demo purpose)

**Communication**
- REST APIs using JSON

---

## 🧠 Design Approach

The application follows a **Client–Server Architecture**:

- **React Frontend**
  - Handles UI, role-based rendering, and user interaction
- **ASP.NET Core Backend**
  - Handles business logic and API endpoints
- **REST APIs**
  - Used for communication between frontend and backend

This separation ensures **clarity, scalability, and maintainability**.

---

## 🏗️ System Architecture



User
↓
React Frontend
↓ (REST APIs)
ASP.NET Core Backend
↓
In-Memory Data Storage


---

## ▶️ How to Run the Project

### Prerequisites

Ensure the following are installed:

- Node.js (v16 or later)
- npm
- .NET SDK (v7 or later)

---

### Step 1: Run the Backend

```bash
cd LabTrackLite
dotnet run


Backend runs at:

http://localhost:5128

Step 2: Run the Frontend
cd frontend
npm install
npm start


Frontend runs at:

http://localhost:3000

🧪 How to Use the Application

Open browser and go to http://localhost:3000

Select a role (Admin / Technician / Viewer)

Add lab assets (Admin role)

View assets in the Assets section

Create issue tickets (Technician role)

View tickets and their status

Use the chatbot to ask:

"Tell me about assets"

"Tell me about tickets"

"Help with equipment"

📌 Assumptions

Single lab environment

Single-user demo

Authentication & authorization not implemented

In-memory database used for hackathon demo

🔮 Future Enhancements

PostgreSQL database integration

Proper authentication & authorization

Role-Based Access Control (RBAC)

Cloud deployment (Netlify / Azure / AWS)

Advanced NLP-based chatbot

Analytics and reporting dashboard

✅ Conclusion

LabTrack Lite demonstrates how a simple yet structured full-stack application can effectively solve real-world laboratory asset and issue management problems.
The project emphasizes clarity, usability, and role-based system design, making it suitable for real-world extension.

👨‍💻 Author

Hari Priya
Hackathon Submission – LabTrack Lite


---



From **project root**:

```bash
git add README.md
git commit -m "Improve README with architecture, roles, and setup instructions"
git push