import mongoose from 'mongoose';

export default async function connectToDatabase() {
  // Default to local MongoDB if MONGO_URI is not set
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
  const dbName = process.env.MONGO_DB || 'gu_hackconnect';
  
  try {
    await mongoose.connect(mongoUri, {
      dbName: dbName
    });
    console.log(`Connected to MongoDB at ${mongoUri.replace(/\/\/.*@/, '//localhost')}`);
    console.log(`Database: ${dbName}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    if (mongoUri.includes('localhost') || mongoUri.includes('127.0.0.1')) {
      console.error('\n💡 Make sure MongoDB is running locally.');
      console.error('   Start MongoDB service: net start MongoDB');
      console.error('   Or on Linux/Mac: sudo systemctl start mongod');
    }
    process.exit(1);
  }
}





