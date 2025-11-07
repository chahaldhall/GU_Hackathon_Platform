import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();

// Allowed email domain
const ALLOWED_EMAIL_DOMAIN = '@geetauniversity.edu.in';

function signToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

// Validate email domain
function isValidGeetaEmail(email) {
  if (!email) return false;
  const normalizedEmail = email.toLowerCase().trim();
  
  // Check if email ends with allowed domain
  if (!normalizedEmail.endsWith(ALLOWED_EMAIL_DOMAIN)) {
    return false;
  }
  
  // Ensure there's at least one character before @
  const atIndex = normalizedEmail.indexOf('@');
  // @ should exist, be at position > 0, and the domain should start right after @
  return atIndex > 0 && normalizedEmail.substring(atIndex) === ALLOWED_EMAIL_DOMAIN;
}

// Register (email/password)
router.post('/register', async (req, res) => {
  try {
    // Validate required fields
    const { name, email, password, year, department, skills, interests } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    // Validate email domain
    if (!isValidGeetaEmail(email)) {
      return res.status(400).json({ message: 'Only @geetauniversity.edu.in email addresses are allowed' });
    }
    
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password is required and must be at least 6 characters' });
    }

    // Check if JWT_SECRET is configured
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not configured in environment variables');
      return res.status(500).json({ message: 'Server configuration error. Please contact administrator.' });
    }

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check if user already exists
    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create user
    const user = await User.create({ 
      name: name.trim(), 
      email: normalizedEmail, 
      password, 
      year, 
      department, 
      skills, 
      interests 
    });
    
    const token = signToken(user);
    res.status(201).json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (e) {
    // Handle Mongoose validation errors
    if (e.name === 'ValidationError') {
      const errors = Object.values(e.errors).map(err => err.message).join(', ');
      return res.status(400).json({ message: `Validation error: ${errors}` });
    }
    // Handle duplicate key error (unique constraint)
    if (e.code === 11000) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    // Log the full error for debugging
    console.error('Registration error:', e);
    res.status(500).json({ message: 'Registration failed', error: e.message });
  }
});

// Login (email/password)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate email domain
    if (!email || !email.trim()) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    if (!isValidGeetaEmail(email)) {
      return res.status(400).json({ message: 'Only @geetauniversity.edu.in email addresses are allowed' });
    }
    
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const valid = await user.comparePassword(password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
    const token = signToken(user);
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (e) {
    res.status(500).json({ message: 'Login failed', error: e.message });
  }
});

export default router;






