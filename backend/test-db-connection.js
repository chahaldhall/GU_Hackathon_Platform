import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env') });

async function testDatabaseConnection() {
  console.log('🔍 Testing database connection...\n');

  // Default to local MongoDB if MONGO_URI is not set
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
  
  // Check if MONGO_URI is still a placeholder (for Atlas)
  if (mongoUri.includes('<username>') || mongoUri.includes('<cluster-url>')) {
    console.error('❌ ERROR: MONGO_URI appears to be a placeholder');
    console.log('   Please update your .env file with your actual MongoDB connection string');
    console.log('   For local MongoDB: MONGO_URI=mongodb://localhost:27017\n');
    process.exit(1);
  }

  const dbName = process.env.MONGO_DB || 'gu_hackconnect';
  console.log(`📋 Database name: ${dbName}`);
  console.log(`🔗 Connection URI: ${mongoUri.replace(/\/\/.*@/, '//***:***@')}\n`);

  try {
    console.log('⏳ Attempting to connect...');
    
    // Connect to MongoDB
    await mongoose.connect(mongoUri, {
      dbName: dbName,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });

    // Check connection state
    const connectionState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };

    console.log(`✅ Connection state: ${states[connectionState]}`);

    if (connectionState === 1) {
      console.log('✅ Successfully connected to MongoDB!');
      
      // Try to perform a simple operation
      const db = mongoose.connection.db;
      const collections = await db.listCollections().toArray();
      console.log(`📊 Found ${collections.length} collections in database`);
      
      if (collections.length > 0) {
        console.log('   Collections:');
        collections.forEach(col => {
          console.log(`   - ${col.name}`);
        });
      }

      // Test a simple query on users collection if it exists
      if (collections.some(col => col.name === 'users')) {
        const User = mongoose.connection.collection('users');
        const userCount = await User.countDocuments();
        console.log(`\n👥 Users collection: ${userCount} document(s)`);
      }

      console.log('\n✅ Database connection test PASSED!');
      await mongoose.connection.close();
      console.log('🔌 Connection closed.');
      process.exit(0);
    } else {
      console.error(`❌ Connection failed. State: ${states[connectionState]}`);
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Database connection FAILED!');
    console.error('Error details:', error.message);
    
    if (error.message.includes('authentication')) {
      console.error('\n💡 This looks like an authentication error.');
      console.error('   Please check your username and password in MONGO_URI');
    } else if (error.message.includes('timeout')) {
      console.error('\n💡 Connection timed out.');
      console.error('   Please check your network connection and cluster URL');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.error('\n💡 Cannot reach MongoDB server.');
      console.error('   Please check your cluster URL and network settings');
    }
    
    process.exit(1);
  }
}

testDatabaseConnection();

