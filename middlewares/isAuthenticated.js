const jwt = require('jsonwebtoken')
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.redirect('/api/auth/login')
        
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({message:error.message,success:false})
  }
};

module.exports = isAuthenticated;