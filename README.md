# GU HackConnect (MVP)

A Hackathon Collaboration Platform for Geeta University.

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- Auth: JWT
- Real-time Chat: Socket.io

## Project Structure
```
Project/
  backend/
    env.example
    package.json
    src/
      config/db.js
      middleware/auth.js
      models/{User.js,Team.js,Project.js,Message.js}
      routes/{auth.js,teams.js,projects.js,chat.js,admin.js}
      sockets/chat.js
      server.js
  frontend/
    env.example
    index.html
    package.json
    postcss.config.js
    tailwind.config.js
    vite.config.js
    src/
      index.css
      main.jsx
      App.jsx
      components/{Navbar.jsx,TeamFinder.jsx,ProjectCard.jsx,ProtectedRoute.jsx}
      pages/{Home.jsx,Dashboard.jsx,ChatRoom.jsx,Login.jsx,Register.jsx}
```

## Environment Variables
- Copy and configure both env samples:
  - `backend/env.example` -> create `.env` in `backend/`
  - `frontend/env.example` -> create `.env` in `frontend/`

## MongoDB Compass Setup
- See [MONGODB_COMPASS_SETUP.md](./MONGODB_COMPASS_SETUP.md) for detailed instructions on connecting MongoDB Compass to your database.
- **Quick connection** (local MongoDB): `mongodb://localhost:27017`
- **Database name**: `gu_hackconnect`

### Backend .env
```
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/
MONGO_DB=gu_hackconnect
JWT_SECRET=super_secret_change_me
JWT_EXPIRES_IN=7d
```

### Frontend .env
```
VITE_API_ORIGIN=http://localhost:5000
```

## Run Locally
Open two terminals.

### Backend
```
cd backend
npm install
npm run dev
```

### Frontend
```
cd frontend
npm install
npm run dev
```

Visit http://localhost:5173

## Backend API Overview
- Auth: `POST /api/auth/register`, `POST /api/auth/login`
- Teams: `GET /api/teams`, `POST /api/teams` (auth), `POST /api/teams/:teamId/request` (auth), approve/reject
- Projects: `GET /api/projects`, `POST /api/projects` (leader-only)
- Chat: `GET /api/chat/team/:teamId` (auth)
- Admin: `GET /api/admin/hackathons`, `POST /api/admin/hackathons` (admin only)

## Socket.io
- Server mounts Socket.io in `server.js` and registers handlers in `sockets/chat.js`.
- Client connects from `ChatRoom.jsx` and uses events:
  - `joinTeamRoom`, `leaveTeamRoom`, `sendMessage`, `newMessage`

## UI Guidelines Applied
- GU colors: red, white, black, gold (see `tailwind.config.js`)
- Modern cards and buttons via Tailwind utility classes
- Navbar with avatar and auth actions
- Mobile responsive layout

## Deployment Plan
- Backend: Render (Node service), set env vars, enable WebSockets.
- Frontend: Vercel (Vite static), set `VITE_API_ORIGIN` to Render backend URL.
- Database: MongoDB Atlas (create cluster, user, IP allowlist, grab connection string).
- CORS: Set `CLIENT_ORIGIN` to your Vercel URL.

## Phase 2 Ideas
- Notifications for team requests and messages
- Google OAuth with Firebase Auth or Google OAuth 2.0
- AI-based teammate suggestions by skills/interests (simple TF-IDF or embeddings)
- GitHub repository linking and commit activity on project cards
- Admin analytics dashboard (active users, teams, messages)
- File sharing in chat and pinned messages
- User profile pages with badges and contributions

## Notes
- This MVP favors clarity and simplicity. Strengthen validation, error handling, rate limiting, and add production logging before launch.






