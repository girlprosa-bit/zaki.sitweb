const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// دخول المسؤول
router.post('/admin-login', [
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('inviteCode').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, inviteCode } = req.body;
    const user = await User.findOne({ email, role: 'admin' }).select('+password');

    if (!user || user.inviteCode !== inviteCode) {
      return res.status(400).json({ message: 'بيانات دخول خاطئة' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'كلمة المرور غير صحيحة' });
    }

    user.lastLogin = Date.now();
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

// دخول الزبون
router.post('/client-login', [
  body('name').notEmpty(),
  body('company').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, company } = req.body;
    
    // البحث عن زبون موجود أو إنشاء جديد
    let user = await User.findOne({ name, role: 'client' });
    
    if (!user) {
      user = new User({
        name,
        company,
        email: `${name.replace(/\s+/g, '')}_${Date.now()}@client.local`,
        password: Math.random().toString(36).substring(7),
        role: 'client'
      });
      await user.save();
    }

    user.lastLogin = Date.now();
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        company: user.company,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

// التحقق من التوكن
router.get('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ valid: false });
    }
    
    jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true });
  } catch {
    res.status(401).json({ valid: false });
  }
});

module.exports = router;
