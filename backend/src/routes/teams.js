import { Router } from 'express';
import Team from '../models/Team.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Create team
router.post('/', requireAuth, async (req, res) => {
  try {
    const { name, description, domain, skillsNeeded, isLookingForMembers } = req.body;
    const team = await Team.create({
      name,
      description,
      domain,
      skillsNeeded,
      isLookingForMembers,
      leader: req.user.id,
      members: [req.user.id]
    });
    res.status(201).json(team);
  } catch (e) {
    res.status(500).json({ message: 'Failed to create team', error: e.message });
  }
});

// List/search teams (filters: domain, skill, department via leader relation omitted for brevity)
router.get('/', async (req, res) => {
  try {
    const { domain, skill, looking } = req.query;
    const filter = {};
    if (domain) filter.domain = domain;
    if (looking) filter.isLookingForMembers = looking === 'true';
    if (skill) filter.skillsNeeded = { $in: [skill] };
    const teams = await Team.find(filter).populate('leader', 'name department').limit(50).sort({ createdAt: -1 });
    res.json(teams);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch teams', error: e.message });
  }
});

// Request to join a team
router.post('/:teamId/request', requireAuth, async (req, res) => {
  try {
    const { message } = req.body;
    const team = await Team.findById(req.params.teamId);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    const alreadyRequested = team.requests.some((r) => String(r.user) === req.user.id);
    if (alreadyRequested) return res.status(400).json({ message: 'Already requested' });
    team.requests.push({ user: req.user.id, message });
    await team.save();
    res.json({ message: 'Request submitted' });
  } catch (e) {
    res.status(500).json({ message: 'Failed to submit request', error: e.message });
  }
});

// Approve/Reject request (leader only)
router.post('/:teamId/requests/:requestId/:action', requireAuth, async (req, res) => {
  try {
    const { action } = req.params; // 'approve' | 'reject'
    const team = await Team.findById(req.params.teamId);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    if (String(team.leader) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    const request = team.requests.id(req.params.requestId);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    request.status = action === 'approve' ? 'approved' : 'rejected';
    if (action === 'approve') {
      team.members.addToSet(request.user);
    }
    await team.save();
    res.json(team);
  } catch (e) {
    res.status(500).json({ message: 'Failed to update request', error: e.message });
  }
});

export default router;








