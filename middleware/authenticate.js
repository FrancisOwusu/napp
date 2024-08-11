const jwt = require('jsonwebtoken');
const  userService = require('../services/userService'); // Example user service

function authenticate(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];

    // if (
    //   req.headers.authorization &&
    //   req.headers.authorization.split(" ")[0] === "Bearer"
    // ) {
    //   return req.headers.authorization.split(" ")[1];
    // } else if (req.query && req.query.token) {
    //   return req.query.token;
    // }
  


    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Check if the user ID is valid (e.g., exists in the database)
    if (!isValidUserId(userId)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    
    // Attach the user ID to req.user
    req.user = { id: userId };

    // Call next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
}

// Example function to check if the user ID is valid (e.g., exists in the database)
async function isValidUserId(userId) {
  try {
    const user = await userService.findById(userId);
    return !!user; // Return true if user exists, false otherwise
  } catch (error) {
    console.error('Error checking user ID:', error);
    return false;
  }
}

module.exports = authenticate;
