const router = require("express").Router();
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const { signup, login, logout } = require("../controllers/auth.controller");
const checkAuth = require('../middlewares/isAuthenticated')

router.post("/signup", signup);
router.post("/login", login);

router.get('/login', async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.render('login'); // No token, show login page
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (user) {
      return res.redirect('/api/dashboard'); 
    } else {
      return res.render('login'); // Token is invalid, show login
    }
  } catch (err) {
    return res.render('login'); // Token error, show login page
  }
});


router.post("/logout", logout);
router.get("/check-auth", checkAuth, (req, res) => {
    res.status(200).json({
      message: "User authenticated",
      success: true,
      user: req.user,
    });
  });
module.exports = router;