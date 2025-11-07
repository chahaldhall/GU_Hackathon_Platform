import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';

// Simple in-memory hackathon list for MVP. Replace with a real model later.
const hackathons = [];

const router = Router();

// Admin: add upcoming hackathon
router.post('/hackathons', requireAuth, requireRole('admin'), (req, res) => {
  const { title, date, location, description } = req.body;
  const item = { id: String(Date.now()), title, date, location, description };
  hackathons.unshift(item);
  res.status(201).json(item);
});

// Public: list hackathons
router.get('/hackathons', (req, res) => {
  res.json(hackathons);
});

export default router;








