const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'لا توجد توكن - الوصول مرفوض' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'المستخدم غير موجود أو غير نشط' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'توكن غير صحيح' });
  }
};

// تحقق من أن المستخدم مسؤول
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'مسؤول فقط' });
  }
  next();
};

// تحقق من أن المستخدم زبون
const clientOnly = (req, res, next) => {
  if (req.user.role !== 'client') {
    return res.status(403).json({ message: 'زبون فقط' });
  }
  next();
};

module.exports = { auth, adminOnly, clientOnly };
