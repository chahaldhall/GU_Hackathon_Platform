import { Router } from 'express';
import Message from '../models/Message.js';
import Team from '../models/Team.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Fetch recent messages for a team chat
router.get('/team/:teamId', requireAuth, async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    const isMember = team.members.some((m) => String(m) === req.user.id) || String(team.leader) === req.user.id;
    if (!isMember) return res.status(403).json({ message: 'Forbidden' });
    const messages = await Message.find({ team: teamId }).populate('sender', 'name avatarUrl').sort({ createdAt: 1 }).limit(200);
    res.json(messages);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch messages', error: e.message });
  }
});

export default router;








