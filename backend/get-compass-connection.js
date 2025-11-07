/**
 * Helper script to generate MongoDB Compass connection string
 * Run with: node get-compass-connection.js
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env') });

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGO_DB || 'gu_hackconnect';

console.log('\n📊 MongoDB Compass Connection Information\n');
console.log('=' .repeat(50));
console.log('\n🔗 Connection String:');
console.log(`   ${mongoUri}\n`);

console.log('📁 Database Name:');
console.log(`   ${dbName}\n`);

console.log('📝 Instructions:');
console.log('   1. Open MongoDB Compass');
console.log('   2. Paste the connection string above');
console.log('   3. Click "Connect"');
console.log('   4. Select the database:', dbName);
console.log('\n' + '='.repeat(50));

// Check if MongoDB URI is a placeholder
if (mongoUri.includes('<username>') || mongoUri.includes('<password>') || mongoUri.includes('<cluster-url>')) {
  console.log('\n⚠️  WARNING: Your MONGO_URI contains placeholders!');
  console.log('   Please update your .env file with actual values.\n');
}

// Check if it's local MongoDB
if (mongoUri.includes('localhost') || mongoUri.includes('127.0.0.1')) {
  console.log('\n💡 Local MongoDB Detected');
  console.log('   Make sure MongoDB service is running:');
  console.log('   Windows: net start MongoDB');
  console.log('   Linux/Mac: sudo systemctl start mongod\n');
}

console.log('');

