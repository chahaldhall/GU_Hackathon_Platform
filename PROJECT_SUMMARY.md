# GU HackConnect - Project Summary

## 📋 Project Overview

**GU HackConnect** is a Hackathon Collaboration Platform for Geeta University. It's a full-stack web application that helps students find teammates, form teams, manage projects, and communicate in real-time during hackathons.

---

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling (GU colors: red, white, black, gold)
- **React Router** - Navigation
- **Axios** - HTTP client
- **Socket.io Client** - Real-time communication

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database (using Mongoose ODM)
- **JWT** - Authentication
- **Socket.io** - Real-time chat
- **bcryptjs** - Password hashing

---

## 🏗️ Project Structure

```
Project/
├── backend/
│   ├── src/
│   │   ├── config/db.js          # MongoDB connection
│   │   ├── middleware/auth.js    # JWT authentication
│   │   ├── models/               # Database models
│   │   │   ├── User.js
│   │   │   ├── Team.js
│   │   │   ├── Project.js
│   │   │   └── Message.js
│   │   ├── routes/               # API routes
│   │   │   ├── auth.js
│   │   │   ├── teams.js
│   │   │   ├── projects.js
│   │   │   ├── chat.js
│   │   │   └── admin.js
│   │   ├── sockets/chat.js       # Socket.io handlers
│   │   └── server.js             # Main server file
│   ├── .env                      # Environment variables
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/           # Reusable components
    │   │   ├── Navbar.jsx
    │   │   ├── TeamFinder.jsx
    │   │   ├── ProjectCard.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/                # Page components
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── ChatRoom.jsx
    │   ├── App.jsx               # Main app component
    │   └── main.jsx              # Entry point
    └── package.json
```

---

## ✨ Key Features

### 1. **User Authentication**
   - User registration with profile information
   - Login with JWT tokens
   - Protected routes
   - User roles (student, admin)

### 2. **Team Management**
   - Create teams
   - Find teammates by skills/interests
   - Send/approve/reject team requests
   - Team leader management

### 3. **Project Management**
   - Create and manage hackathon projects
   - Link projects to teams
   - View project details

### 4. **Real-time Chat**
   - Team-based chat rooms
   - Socket.io for instant messaging
   - Message history

### 5. **Admin Features**
   - Admin dashboard
   - Hackathon management

---

## 🔧 What We've Done in This Session

### 1. **Fixed Registration Issues** ✅
   - **Problem**: Registration was failing without clear error messages
   - **Solutions Implemented**:
     - Added comprehensive input validation (name, email, password)
     - Added password length validation (minimum 6 characters)
     - Improved error handling with detailed error messages
     - Added JWT_SECRET validation check
     - Enhanced email normalization (lowercase)
     - Better error logging for debugging
     - Added client-side validation before API calls

### 2. **MongoDB Configuration** ✅
   - **Changed from**: MongoDB Atlas (cloud)
   - **Changed to**: Local MongoDB (MongoDB Compass)
   - **Updates**:
     - Updated `.env` file to use `mongodb://localhost:27017`
     - Created MongoDB Compass setup guide
     - Added connection testing scripts

### 3. **Database Connection Tools** ✅
   - Created `check-mongo-connection.js` - Quick connection status checker
   - Created `get-compass-connection.js` - Helper to get connection string
   - Updated `package.json` with new scripts:
     - `npm run check:db` - Check MongoDB connection
     - `npm run compass` - Get Compass connection info

### 4. **Documentation** ✅
   - Created `MONGODB_COMPASS_SETUP.md` - Complete guide for MongoDB Compass
   - Updated `README.md` with MongoDB Compass references
   - Created this project summary

---

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Teams
- `GET /api/teams` - Get all teams
- `POST /api/teams` - Create team (auth required)
- `POST /api/teams/:teamId/request` - Request to join team (auth required)
- `POST /api/teams/:teamId/approve` - Approve team request (auth required)
- `POST /api/teams/:teamId/reject` - Reject team request (auth required)

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (leader only)

### Chat
- `GET /api/chat/team/:teamId` - Get chat messages (auth required)

### Admin
- `GET /api/admin/hackathons` - Get hackathons (admin only)
- `POST /api/admin/hackathons` - Create hackathon (admin only)

---

## 🗄️ Database Schema

### User Model
- `name` (required)
- `email` (required, unique, lowercase)
- `password` (required, hashed)
- `role` (student/admin, default: student)
- `year` (optional)
- `department` (optional)
- `skills` (array)
- `interests` (array)
- `avatarUrl` (optional)
- `googleId` (optional, for future OAuth)

### Team Model
- `name` (required)
- `leader` (User reference)
- `members` (User references array)
- `description` (optional)
- `skillsNeeded` (array)
- `maxMembers` (default: 4)

### Project Model
- `title` (required)
- `description` (required)
- `team` (Team reference)
- `technologies` (array)
- `githubUrl` (optional)
- `demoUrl` (optional)

### Message Model
- `team` (Team reference)
- `sender` (User reference)
- `content` (required)
- `timestamp` (auto-generated)

---

## 🚀 How to Run

### Prerequisites
1. **Node.js** installed
2. **MongoDB** installed and running locally
3. **MongoDB Compass** (optional, for database management)

### Setup Steps

1. **Start MongoDB Service** (Windows):
   ```powershell
   net start MongoDB
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   # .env file is already configured for local MongoDB
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access Application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Useful Commands

```bash
# Check MongoDB connection
cd backend
npm run check:db

# Get MongoDB Compass connection string
npm run compass

# Test database connection
npm run test:db
```

---

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
MONGO_URI=mongodb://localhost:27017
MONGO_DB=gu_hackconnect
JWT_SECRET=super_secret_change_me
JWT_EXPIRES_IN=7d
```

### Frontend (.env)
```env
VITE_API_ORIGIN=http://localhost:5000
```

---

## 📊 Current Status

### ✅ Completed
- User registration and login
- Team creation and management
- Project management
- Real-time chat with Socket.io
- MongoDB local setup
- Registration error handling improvements
- MongoDB Compass integration

### 🔄 In Progress / Future
- Google OAuth integration
- Notifications system
- AI-based teammate suggestions
- GitHub integration
- Admin analytics dashboard
- File sharing in chat
- User profile pages

---

## 🐛 Issues Fixed

1. **Registration Failures**
   - Added validation for all required fields
   - Improved error messages
   - Added JWT_SECRET check
   - Better error handling

2. **MongoDB Connection**
   - Switched from Atlas to local MongoDB
   - Created connection testing tools
   - Added MongoDB Compass setup guide

---

## 📚 Documentation Files

- `README.md` - Main project documentation
- `MONGODB_COMPASS_SETUP.md` - MongoDB Compass setup guide
- `PROJECT_SUMMARY.md` - This file

---

## 🎯 Next Steps

1. **Test the Application**:
   - Start MongoDB service
   - Run backend and frontend
   - Test registration and login
   - Create teams and projects
   - Test real-time chat

2. **Connect MongoDB Compass**:
   - Use connection string: `mongodb://localhost:27017`
   - Database name: `gu_hackconnect`
   - Browse collections and data

3. **Development**:
   - Add more features
   - Improve UI/UX
   - Add tests
   - Prepare for deployment

---

## 💡 Tips

- Always check MongoDB is running before starting the backend
- Use `npm run check:db` to verify database connection
- Check browser console for frontend errors
- Check backend terminal for API errors
- Use MongoDB Compass to view and manage your data

---

**Last Updated**: Current Session
**Project Status**: Active Development

