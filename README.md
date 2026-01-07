# LabTrack Lite

LabTrack Lite is a lightweight full-stack web application built to manage R&D lab assets and track issues using a simple ticketing system.  
It helps replace manual tracking methods like Excel sheets or notebooks with a centralized web-based solution.

---

## Problem Statement

In many R&D labs:
- Assets are tracked manually
- Issues are reported verbally or informally
- There is no centralized system for tracking problems
- No visibility into open or resolved issues

This leads to poor tracking, delays, and confusion.

---

## Solution Overview

LabTrack Lite provides:
- A web interface to add and view lab assets
- A ticketing system to report and track asset-related issues
- A chatbot to help users query system information

---

## Features

- Add and view lab assets
- Create and view issue tickets
- Track ticket status
- Rule-based chatbot for natural language queries
- Simple and responsive user interface

---

## Tech Stack

- **Frontend:** React
- **Backend:** ASP.NET Core Minimal APIs
- **Database:** In-memory storage (used for demo purposes)
- **API Communication:** REST APIs using JSON

---

## Design Approach

The application follows a **client–server architecture**:

- The **React frontend** handles user interaction and displays data
- The **ASP.NET Core backend** handles business logic and exposes REST APIs
- The frontend communicates with the backend using HTTP requests

This separation makes the system easy to understand and extend.

---

## System Architecture

User
↓
React Frontend
↓ REST APIs
ASP.NET Core Backend
↓
In-Memory Data Storage


---

## How to Run the Project

### Prerequisites

Make sure the following are installed:
- Node.js (v16 or later)
- .NET SDK (v7 or later)
- npm (comes with Node.js)

---

### Step 1: Run the Backend

1. Open a terminal
2. Navigate to the project root folder:
   ```bash
   cd LabTrackLite
3. Run the backend:
   dotnet run
Backend will start at:
   http://localhost:5128

 ### Step 2: Run the Frontend

Open a new terminal
Navigate to the frontend folder:
cd frontend
Install dependencies (first time only):
npm install
Start the frontend:
npm start
Frontend will start at:
http://localhost:3000

### How to Use the Application:
Open browser and go to http://localhost:3000
Add lab assets using the Add Asset section
View added assets in the Assets list
Create issue tickets using the Create Ticket section
View tickets in the Tickets list
Use the chatbot to ask questions like:
"Tell me about assets"
"Tell me about tickets"

### Assumptions:
Single lab environment
Single-user demo
Authentication and RBAC are out of scope
In-memory database used for hackathon demo

### Future Enhancements:
PostgreSQL database integration
Role-Based Access Control (Admin, Engineer, Technician)
Authentication and authorization
Cloud deployment
Advanced NLP-based chatbot

### Conclusion:
LabTrack Lite demonstrates how a simple full-stack solution can effectively solve real-world lab asset and issue management problems.
