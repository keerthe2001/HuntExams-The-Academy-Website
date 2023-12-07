// Importing required modules
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

// Access MONGODB_URI directly in mongoose.connect
async function ConnectToMongoose() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to HuntExams Database');
    console.log('Connection String:', process.env.MONGODB_URI);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

ConnectToMongoose();
module.exports = ConnectToMongoose;
