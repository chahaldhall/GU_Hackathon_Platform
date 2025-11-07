# Backend Troubleshooting Guide

## ✅ Backend Status Check

Your backend configuration is correct:
- ✅ MongoDB connected
- ✅ Environment variables set
- ✅ All modules import successfully
- ✅ Health endpoint responding

## Common Issues and Solutions

### 1. Backend Not Starting

**Check if backend is actually running:**
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Or test the health endpoint
curl http://localhost:5000/api/health
```

**If backend won't start:**
```bash
# Make sure you're in the backend directory
cd backend

# Check if MongoDB is running
npm run check:db

# Start the backend
npm run dev
```

### 2. ECONNRESET Error (Connection Reset)

This error usually means:
- Backend crashed while handling a request
- Backend is restarting (due to file watching)
- Network/connection issue

**Solutions:**
1. Check backend console for error messages
2. Look for unhandled errors in routes
3. Check if MongoDB connection is stable
4. Restart the backend server

### 3. Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Windows - Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or use a different port
# In .env file, set: PORT=5001
```

### 4. MongoDB Connection Issues

**Error:** `MongoDB connection error`

**Solutions:**
```bash
# Check if MongoDB service is running
net start MongoDB

# Test MongoDB connection
npm run check:db

# If using local MongoDB, make sure service is started
# Windows: net start MongoDB
```

### 5. JWT_SECRET Not Set

**Error:** `Server configuration error. Please contact administrator.`

**Solution:**
Make sure `.env` file has:
```
JWT_SECRET=your-secret-key-here
```

### 6. Registration/Login Errors

**Check:**
1. Email domain validation (must be @geetauniversity.edu.in)
2. Password length (minimum 6 characters)
3. All required fields are filled
4. Backend console for specific error messages

## Quick Diagnostic Commands

```bash
# Test MongoDB connection
npm run check:db

# Test backend configuration
node test-backend-startup.js

# Check if backend is responding
curl http://localhost:5000/api/health

# Get MongoDB Compass connection info
npm run compass
```

## Restart Backend Properly

1. **Stop the backend:**
   - Press `Ctrl+C` in the backend terminal

2. **Check for any running Node processes:**
   ```bash
   tasklist | findstr node
   ```

3. **Start fresh:**
   ```bash
   cd backend
   npm run dev
   ```

## Still Having Issues?

1. Check the backend console output for specific errors
2. Verify MongoDB is running: `npm run check:db`
3. Check environment variables are set correctly
4. Make sure port 5000 is not blocked by firewall
5. Restart both backend and MongoDB service


