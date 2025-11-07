/**
 * Test Backend Startup and Routes
 * Run with: node test-backend-startup.js
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

console.log('🔍 Testing Backend Configuration\n');
console.log('='.repeat(60));

// Check environment variables
console.log('📋 Environment Variables:');
console.log(`   PORT: ${process.env.PORT || '5000 (default)'}`);
console.log(`   CLIENT_ORIGIN: ${process.env.CLIENT_ORIGIN || 'http://localhost:5173 (default)'}`);
console.log(`   MONGO_URI: ${process.env.MONGO_URI ? process.env.MONGO_URI.replace(/\/\/.*@/, '//***:***@') : 'mongodb://localhost:27017 (default)'}`);
console.log(`   MONGO_DB: ${process.env.MONGO_DB || 'gu_hackconnect (default)'}`);
console.log(`   JWT_SECRET: ${process.env.JWT_SECRET ? '✅ Set' : '❌ NOT SET'}`);
console.log(`   JWT_EXPIRES_IN: ${process.env.JWT_EXPIRES_IN || '7d (default)'}\n`);

// Check if JWT_SECRET is set
if (!process.env.JWT_SECRET) {
  console.log('⚠️  WARNING: JWT_SECRET is not set!');
  console.log('   Registration and login will fail without JWT_SECRET.\n');
  console.log('   Please add JWT_SECRET to your .env file:\n');
  console.log('   JWT_SECRET=your-secret-key-here\n');
  process.exit(1);
}

// Test importing auth routes
try {
  console.log('📦 Testing route imports...');
  const authModule = await import('./src/routes/auth.js');
  console.log('   ✅ Auth routes imported successfully');
  
  const dbModule = await import('./src/config/db.js');
  console.log('   ✅ Database config imported successfully');
  
  const userModel = await import('./src/models/User.js');
  console.log('   ✅ User model imported successfully\n');
  
  console.log('✅ All imports successful!\n');
  console.log('💡 Backend should start successfully.');
  console.log('   If you\'re still having issues, check:');
  console.log('   1. MongoDB service is running');
  console.log('   2. Port 5000 is not already in use');
  console.log('   3. Check backend console for error messages\n');
  
} catch (error) {
  console.error('❌ Error importing modules:');
  console.error(`   ${error.message}\n`);
  console.error('Stack trace:');
  console.error(error.stack);
  process.exit(1);
}


