# Job Tracker – Full Stack Application

A complete Full Stack Job Tracker application built using:

- React (Frontend)
- Node.js + Express (Backend)
- MySQL (Database)
- JWT Authentication

This project allows users to register, login, and manage their job applications securely.

---

## Features

- User Registration (Password hashed using bcrypt)
- Secure Login (JWT-based authentication)
- Protected routes
- Add Job Applications
- View User-Specific Jobs
- Logout functionality
- Modern responsive UI

---

## Tech Stack

### Frontend
- React
- Axios
- React Router DOM
- CSS

### Backend
- Node.js
- Express.js
- MySQL2
- bcryptjs
- jsonwebtoken
- dotenv

### Database
- MySQL

---

## System Architecture

Browser (React)
        ↓ HTTP (JSON)
Node.js + Express API
        ↓ SQL
MySQL Database

- React handles UI and sends HTTP requests.
- Express handles API logic and authentication.
- MySQL stores user and job data.
- JWT ensures secure communication.

---

## Project Structure

job-tracker-fullstack/
│
├── job-tracker-backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── job-tracker-frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md

---

## How To Run Locally

### Clone the Repository

git clone https://github.com/YOUR_USERNAME/job-tracker-fullstack.git
cd job-tracker-fullstack

---

## Backend Setup

cd job-tracker-backend
npm install

Create a `.env` file inside job-tracker-backend:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=job_tracker
JWT_SECRET=your_secret_key

Start backend server:

npm run dev

Backend runs at:
http://localhost:5000

---

## Frontend Setup

Open a new terminal:

cd job-tracker-frontend
npm install
npm start

Frontend runs at:
http://localhost:3000

---

## Authentication Flow

1. User registers → password is hashed using bcrypt.
2. User logs in → server verifies password.
3. Server generates JWT token.
4. Token is stored in browser (localStorage).
5. Token is sent in Authorization header for protected routes.
6. Backend verifies token before allowing access.

---

## Database Tables

### Users Table
- id
- name
- email
- password (hashed)
- created_at

### Jobs Table
- id
- title
- company
- status
- location
- notes
- applied_date
- user_id (foreign key)

---

## Future Improvements

- Edit Job Feature
- Delete Job Feature
- Status Filtering
- Pagination
- Deploy to Cloud (Render / Railway / Vercel)
- Docker Support

---

## Author

Ruchit Kumar  
MCA Student – Chandigarh University  
Aspiring Full Stack Developer  