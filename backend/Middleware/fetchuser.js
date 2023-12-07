const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');

// Log the current directory
console.log('__dirname:', __dirname);

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

// Access JWT_SECRET directly from process.env
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send("Token is Not Valid");
  }
  try {
    // Verify the token using JWT_SECRET
    const jwtverification = jwt.verify(token, JWT_SECRET);
    req.user = jwtverification.user;
    next();
  } catch (error) {
    res.status(401).send("Users not found with this Token");
  }
};

module.exports = fetchuser;
