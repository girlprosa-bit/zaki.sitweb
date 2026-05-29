const express = require('express');
const router = express.Router();
const { adminOnly } = require('../middleware/auth');
const User = require('../models/User');
const crypto = require('crypto');

// الحصول على جميع المسؤولين
router.get('/admins', adminOnly, async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' }).select('-password');
    res.json({ data: admins });
  } catch (error) {
    res.status(500).json({ message: 'خطأ' });
  }
});

// إضافة مسؤول جديد
router.post('/add-admin', adminOnly, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const inviteCode = `OWNER-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    const user = new User({
      name,
      email,
      password,
      role: 'admin',
      inviteCode
    });

    await user.save();
    res.json({
      message: 'تم إضافة مسؤول جديد',
      inviteCode,
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في إضافة المسؤول' });
  }
});

// إزالة مسؤول
router.delete('/remove-admin/:id', adminOnly, async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({ message: 'لا يمكن حذف نفسك' });
    }

    await User.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'تم إزالة المسؤول' });
  } catch (error) {
    res.status(500).json({ message: 'خطأ' });
  }
});

// الحصول على جميع العملاء
router.get('/clients', adminOnly, async (req, res) => {
  try {
    const clients = await User.find({ role: 'client' }).select('-password');
    res.json({ data: clients });
  } catch (error) {
    res.status(500).json({ message: 'خطأ' });
  }
});

module.exports = router;
