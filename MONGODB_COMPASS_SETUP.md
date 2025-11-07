# MongoDB Compass Connection Guide

This guide will help you connect MongoDB Compass to your database for easy database management and visualization.

## Prerequisites

1. **Install MongoDB Compass** (if not already installed)
   - Download from: https://www.mongodb.com/try/download/compass
   - Install the application on your system

2. **MongoDB Server** must be running
   - Local MongoDB: Make sure MongoDB service is running
   - MongoDB Atlas: Your cluster should be accessible

## Connection Methods

### Option 1: Local MongoDB (Default)

If you're using local MongoDB (default setup):

1. **Start MongoDB Service** (if not running):
   - **Windows**: Open PowerShell as Administrator and run:
     ```powershell
     net start MongoDB
     ```
   - **Linux/Mac**: 
     ```bash
     sudo systemctl start mongod
     # or
     brew services start mongodb-community
     ```

2. **Open MongoDB Compass**

3. **Connection String**:
   ```
   mongodb://localhost:27017
   ```

4. **Click "Connect"**

5. **Select Database**: After connecting, select the database `gu_hackconnect` from the left sidebar

### Option 2: MongoDB Atlas (Cloud)

If you're using MongoDB Atlas:

1. **Get Connection String from Atlas**:
   - Log in to MongoDB Atlas: https://cloud.mongodb.com
   - Go to your cluster → Click "Connect"
   - Choose "Connect using MongoDB Compass"
   - Copy the connection string (it looks like):
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
     ```

2. **Replace placeholders**:
   - Replace `<username>` with your Atlas username
   - Replace `<password>` with your Atlas password
   - The connection string should look like:
     ```
     mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/
     ```

3. **Open MongoDB Compass**

4. **Paste the connection string** and click "Connect"

5. **Select Database**: Select the database `gu_hackconnect` from the left sidebar

### Option 3: Using Your .env Configuration

If you have a `.env` file in the `backend/` directory:

1. **Check your MONGO_URI** in `backend/.env`:
   ```
   MONGO_URI=mongodb://localhost:27017
   # or
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/
   ```

2. **Use the same connection string** in MongoDB Compass

3. **Database name** should be: `gu_hackconnect` (or whatever is in `MONGO_DB`)

## Quick Connection Strings

### Local MongoDB (Default)
```
mongodb://localhost:27017
```

### Local MongoDB with Authentication (if enabled)
```
mongodb://username:password@localhost:27017
```

### MongoDB Atlas
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/
```

## Verifying Connection

After connecting, you should see:

1. **Database**: `gu_hackconnect`
2. **Collections**:
   - `users` - User accounts
   - `teams` - Team information
   - `projects` - Project details
   - `messages` - Chat messages
   - (and any other collections you've created)

## Troubleshooting

### Connection Refused (Local MongoDB)

**Problem**: Can't connect to `mongodb://localhost:27017`

**Solutions**:
1. Make sure MongoDB service is running:
   ```powershell
   # Windows
   net start MongoDB
   
   # Check if running
   Get-Service MongoDB
   ```

2. Check if MongoDB is listening on port 27017:
   ```powershell
   # Windows
   netstat -an | findstr 27017
   ```

3. Verify MongoDB installation path and data directory

### Authentication Failed (MongoDB Atlas)

**Problem**: Authentication failed when connecting to Atlas

**Solutions**:
1. Verify username and password in connection string
2. Check if your IP address is whitelisted in Atlas Network Access
3. Make sure database user has proper permissions
4. Try resetting the database user password in Atlas

### Database Not Found

**Problem**: Can't see `gu_hackconnect` database

**Solutions**:
1. The database will be created automatically when you first run the application
2. Start your backend server: `cd backend && npm run dev`
3. Try registering a user through the app
4. Refresh MongoDB Compass

## Useful MongoDB Compass Features

1. **Browse Collections**: View and edit documents
2. **Query Documents**: Use filters to find specific data
3. **Indexes**: View and create indexes for better performance
4. **Schema Analysis**: Analyze your data structure
5. **Aggregation Pipeline**: Build complex queries visually

## Next Steps

After connecting:
1. Browse your `users` collection to see registered users
2. Check `teams` collection for team data
3. View `projects` for project information
4. Monitor `messages` for chat data

## Security Notes

⚠️ **Important**:
- Never commit your `.env` file with real credentials
- Use strong passwords for MongoDB Atlas
- Whitelist only necessary IP addresses in Atlas
- Use environment variables for sensitive data

