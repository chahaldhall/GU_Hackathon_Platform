import { Router } from 'express';
import Project from '../models/Project.js';
import Team from '../models/Team.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Create project for a team (leader only)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { teamId, title, description, tags, repoUrl, demoUrl } = req.body;
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    if (String(team.leader) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    const project = await Project.create({ team: teamId, title, description, tags, repoUrl, demoUrl });
    res.status(201).json(project);
  } catch (e) {
    res.status(500).json({ message: 'Failed to create project', error: e.message });
  }
});

// List projects (ongoing and past)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query; // ongoing | completed
    const filter = {};
    if (status) filter.status = status;
    const projects = await Project.find(filter).populate('team', 'name domain').limit(50).sort({ createdAt: -1 });
    res.json(projects);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch projects', error: e.message });
  }
});

export default router;








