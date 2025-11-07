/**
 * Quick MongoDB Connection Status Checker
 * Run with: node check-mongo-connection.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGO_DB || 'gu_hackconnect';

console.log('\n🔍 MongoDB Connection Status Check\n');
console.log('='.repeat(60));

// Check connection type
if (mongoUri.includes('mongodb+srv://')) {
  console.log('📍 Connection Type: MongoDB Atlas (Cloud)');
  console.log('⚠️  Common Issue: IP Address Whitelisting Required\n');
} else if (mongoUri.includes('localhost') || mongoUri.includes('127.0.0.1')) {
  console.log('📍 Connection Type: Local MongoDB');
  console.log('💡 Make sure MongoDB service is running\n');
} else {
  console.log('📍 Connection Type: Custom MongoDB Server\n');
}

console.log(`📋 Database: ${dbName}`);
console.log(`🔗 URI: ${mongoUri.replace(/\/\/.*@/, '//***:***@')}\n`);

async function checkConnection() {
  try {
    console.log('⏳ Testing connection...\n');
    
    await mongoose.connect(mongoUri, {
      dbName: dbName,
      serverSelectionTimeoutMS: 10000,
    });

    const state = mongoose.connection.readyState;
    const states = {
      0: '❌ Disconnected',
      1: '✅ Connected',
      2: '⏳ Connecting',
      3: '⏳ Disconnecting'
    };

    console.log(`Status: ${states[state]}\n`);

    if (state === 1) {
      console.log('✅ SUCCESS! MongoDB is connected!\n');
      
      const db = mongoose.connection.db;
      const collections = await db.listCollections().toArray();
      
      console.log(`📊 Collections (${collections.length}):`);
      if (collections.length > 0) {
        collections.forEach(col => console.log(`   - ${col.name}`));
      } else {
        console.log('   (No collections yet - database is empty)');
      }
      
      // Check users collection
      if (collections.some(col => col.name === 'users')) {
        const userCount = await mongoose.connection.collection('users').countDocuments();
        console.log(`\n👥 Users: ${userCount} registered`);
      }
      
      await mongoose.connection.close();
      console.log('\n✅ Connection test completed successfully!');
      process.exit(0);
    }
  } catch (error) {
    console.log('❌ FAILED! MongoDB is NOT connected\n');
    console.log('Error:', error.message, '\n');
    
    // Provide specific solutions based on error
    if (error.message.includes('IP') || error.message.includes('whitelist')) {
      console.log('🔧 SOLUTION: Whitelist Your IP Address in MongoDB Atlas\n');
      console.log('1. Go to: https://cloud.mongodb.com');
      console.log('2. Select your cluster');
      console.log('3. Click "Network Access" (or "Security" → "Network Access")');
      console.log('4. Click "Add IP Address"');
      console.log('5. Click "Add Current IP Address" (or "Allow Access from Anywhere" for 0.0.0.0/0)');
      console.log('6. Wait 1-2 minutes for changes to take effect');
      console.log('7. Try connecting again\n');
    } else if (error.message.includes('authentication')) {
      console.log('🔧 SOLUTION: Check Your Credentials\n');
      console.log('1. Verify username and password in your .env file');
      console.log('2. Make sure there are no special characters that need URL encoding');
      console.log('3. Check if the database user exists in MongoDB Atlas\n');
    } else if (error.message.includes('timeout') || error.message.includes('ENOTFOUND')) {
      console.log('🔧 SOLUTION: Check Network Connection\n');
      console.log('1. Verify your internet connection');
      console.log('2. Check if the cluster URL is correct');
      console.log('3. Try pinging the MongoDB Atlas cluster\n');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.log('🔧 SOLUTION: Start MongoDB Service (Local)\n');
      console.log('Windows:');
      console.log('  net start MongoDB');
      console.log('\nLinux/Mac:');
      console.log('  sudo systemctl start mongod');
      console.log('  # or');
      console.log('  brew services start mongodb-community\n');
    }
    
    console.log('💡 Need help? Check MONGODB_COMPASS_SETUP.md for detailed instructions\n');
    process.exit(1);
  }
}

checkConnection();

