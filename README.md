# 🛡️ Military Asset Management System

A full-stack web application designed to help manage military assets, personnel, purchases, and transfers across various bases with role-based access control.

---

## 🧪 Admin Demo Credentials

> Use the following credentials to log in:
Email: admin@gmail.com
Password: admin123

---

## 📌 Project Overview

The Military Asset Management System provides a secure platform to manage defense resources efficiently. It enables authorized users to track asset purchases, handle asset transfers between bases, assign assets to personnel, and monitor expenditures.

This system supports multiple user roles including Admin, Logistics Officer, and Base Commander—each with specific privileges and dashboards.

---

## 🔧 Tech Stack & Architecture

**Frontend:**
- React.js (Vite)
- Tailwind CSS
- Redux Toolkit
- Axios

**Backend:**
- Node.js
- Express.js
- Sequelize (ORM)

**Database:**
- PostgreSQL (hosted on Render)

**Deployment:**
- Frontend: Vercel
- Backend + DB: Render
- Email: Nodemailer via Brevo SMTP

**Architecture:**
- JWT-based authentication
- Role-Based Access Control (RBAC) middleware
- MVC structure with modular route/controller/model folders

---

## 🚀 Features

✅ User Authentication with JWT  
✅ Role-Based Access (Admin, Commander, Logistics)  
✅ Asset Purchase and Transfer Workflow  
✅ Assign Assets to Personnel  
✅ Dashboard Metrics by Role  
✅ Email Notification on User Registration  
✅ Clean UI with Conditional Navigation  

---

## 🔑 Environment Variables

Create a `.env` file in `backend/` with:

```env
PORT=5000
DB_HOST=your_host
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=militarydb
JWT_SECRET=your_jwt_secret
```

Create a `.env` file in `frontend/` with:

```env
VITE_BACKEND_URL=http://localhost:5000
```

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/teja-86/Military-Asset-Management-System.git
cd Military-Asset-Management-System
```
### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install
```

```bash
# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Set Up Database

Import the provided `militarydb.sql` file into your PostgreSQL instance.

You can do this in two ways:

#### 📌 Option A: Using pgAdmin (GUI)

1. Open **pgAdmin** and connect to your PostgreSQL server.
2. Right-click on the `Databases` section → Click **Create > Database** → Name it `militarydb`.
3. Right-click on the `militarydb` database → Click **Query Tool**.
4. Open the `militarydb.sql` file and execute the script.
5. The schema and data will be inserted automatically.

#### 📌 Option B: Using psql CLI

```bash
psql -U your_username -d militarydb -f path/to/militarydb.sql
```

### 4. Configure .env Files
1. Navigate to the backend/ directory.
2. Copy the env.example to .env:

### 5. Run the App Locally
```bash
# Start backend server
cd backend
npm run dev
```

```bash
# Start frontend (in new terminal)
cd ../frontend
npm run dev
```

## 🔗 API Routes

```bash
POST   /api/auth/login             # User login
POST   /api/auth/register          # Register new user
GET    /api/dashboard              # Role-based dashboard data
POST   /api/purchases              # Create new asset purchase
GET    /api/transfers              # View asset transfers
POST   /api/asset-assignments      # Assign asset to personnel
GET    /api/assets                 # Fetch assets
GET    /api/bases                  # Fetch military bases
GET    /api/personnel              # Fetch personnel by base
```

