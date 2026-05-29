const express = require('express');
const router = express.Router();
const { clientOnly } = require('../middleware/auth');
const User = require('../models/User');

// الحصول على بيانات الزبون
router.get('/profile', clientOnly, async (req, res) => {
  try {
    res.json({ data: req.user });
  } catch (error) {
    res.status(500).json({ message: 'خطأ' });
  }
});

// الحصول على قائمة المسؤولين (للتواصل معهم)
router.get('/admins', clientOnly, async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin', isActive: true }).select('name email phone');
    res.json({ data: admins });
  } catch (error) {
    res.status(500).json({ message: 'خطأ' });
  }
});

module.exports = router;
