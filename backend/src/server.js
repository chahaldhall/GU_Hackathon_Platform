import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { Server as SocketIOServer } from 'socket.io';
import connectToDatabase from './config/db.js';

// Routes
import authRoutes from './routes/auth.js';
import teamRoutes from './routes/teams.js';
import projectRoutes from './routes/projects.js';
import chatRoutes from './routes/chat.js';
import adminRoutes from './routes/admin.js';

// Sockets
import { registerChatHandlers } from './sockets/chat.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Connect to MongoDB
await connectToDatabase();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'GU HackConnect API' });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);

// Socket.io
io.on('connection', (socket) => {
  registerChatHandlers(io, socket);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});








