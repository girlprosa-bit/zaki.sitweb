const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// إرسال رسالة
router.post('/send', async (req, res) => {
  try {
    const { receiverId, content, messageType } = req.body;

    const message = new Message({
      senderId: req.user._id,
      receiverId,
      content,
      messageType
    });

    await message.save();
    res.json({ message: 'تم إرسال الرسالة بنجاح', data: message });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في إرسال الرسالة' });
  }
});

// الحصول على محادثة
router.get('/conversation/:userId', async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.user._id, receiverId: req.params.userId },
        { senderId: req.params.userId, receiverId: req.user._id }
      ]
    }).sort({ createdAt: -1 }).limit(50);

    res.json({ data: messages.reverse() });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في استرجاع الرسائل' });
  }
});

module.exports = router;
