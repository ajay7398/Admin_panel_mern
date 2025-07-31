# Admin Panel - MERN Stack Project

This is a full-stack Admin Panel built with **MERN Stack (MongoDB, Express.js, React.js, Node.js)** that allows:

- Admin login
- Agent creation (up to 5 agents only)
- CSV upload of customer data
- Automatic distribution of records equally among agents
- View and manage agents and their assigned records

---

## 🧩 Features

- ✅ Admin Authentication (JWT + Cookies)
- ✅ Add up to 5 Agents
- ✅ Upload CSV files
- ✅ Distribute customer records equally among agents
- ✅ View distributed records per agent
- ✅ Protected routes (frontend and backend)
- ✅ Password hashing using `bcrypt`

---

##  Tech Stack

| Frontend | Backend | Database | Other |
|---------|---------|----------|-------|
| React.js | Node.js | MongoDB | Express.js, JWT, Bcrypt, Multer (CSV Upload) |

---

##  Getting Started

### Backend Setup

```bash
cd backend
npm install
npm node index.js

## Frontend Setup
cd frontend
npm install
npm run dev

## Admin Login

Email: admin@example.com
Password: admin123

