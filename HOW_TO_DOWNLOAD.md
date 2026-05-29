# 📥 كيفية تحميل الملفات على جهازك

## 🎯 الطريقة الأولى: استخدام Git (الأسهل والأفضل)

### الخطوة 1️⃣: تثبيت Git
1. اذهب إلى: https://git-scm.com/
2. حمّل النسخة المناسبة لنظام التشغيل لديك
3. ثبتها بالطريقة العادية

### الخطوة 2️⃣: فتح Command Prompt أو Terminal

**على Windows:**
- اضغط `Win + R`
- اكتب `cmd` واضغط Enter

**على Mac/Linux:**
- افتح Terminal من البرامج

### الخطوة 3️⃣: اختر مكان حفظ المشروع

اختر مجلد على جهازك (مثلاً سطح المكتب):

```bash
cd Desktop
```

أو أي مجلد آخر:

```bash
cd path/to/your/folder
```

### الخطوة 4️⃣: استنساخ المستودع (الكود)

انسخ هذا الأمر واضغط إدخال:

```bash
git clone https://github.com/girlprosa-bit/zaki.sitweb.git
```

**سيتم تحميل المشروع كاملاً على جهازك!** ✅

### الخطوة 5️⃣: ادخل إلى مجلد المشروع

```bash
cd zaki.sitweb
```

### الخطوة 6️⃣: انتقل للفرع الأمني (اختياري حالياً)

```bash
git checkout security-setup
```

---

## 🎯 الطريقة الثانية: تحميل ZIP مباشرة (بدون Git)

### الخطوة 1️⃣: اذهب إلى المستودع
https://github.com/girlprosa-bit/zaki.sitweb

### الخطوة 2️⃣: اضغط زر "Code" الأخضر

### الخطوة 3️⃣: اختر "Download ZIP"

### الخطوة 4️⃣: فك ضغط الملف
- انقر يمين على الملف `.zip`
- اختر "Extract All" أو "فك الضغط"

### الخطوة 5️⃣: انسخ المجلد
ضع المجلد المفكوك الضغط في المكان الذي تريده

---

## 🔄 تحديث الملفات (بعد التعديلات)

إذا أضفت تعديلات جديدة على الكود، حدّث المشروع:

```bash
git pull origin security-setup
```

---

## 📂 ماذا بعد التحميل؟

بعد تحميل الملفات، اتبع هذه الخطوات:

### 1. افتح المجلد في محرر الأكواد

**استخدم VS Code (الأفضل):**
- حمّل من: https://code.visualstudio.com/
- افتحه واختر `File > Open Folder`
- اختر مجلد `zaki.sitweb`

### 2. افتح Terminal في VS Code
- اضغط `Ctrl + ~` (أو من View > Terminal)

### 3. ثبّت المكتبات

```bash
npm install
```

### 4. أعدّ الملف `.env`

```bash
cp .env.example .env
```

ثم اعدّل الملف بـ VS Code:

**تغيير مهم:**
```env
JWT_SECRET=اختر-شيء-معقد-وآمن-جداً-2026
MONGODB_URI=mongodb://localhost:27017/agencyos
PORT=5000
```

### 5. شغّل الخادم

```bash
npm run dev
```

---

## 🌐 فتح الموقع

افتح متصفحك واذهب إلى:

```
http://localhost:5000
```

---

## 📁 ماذا يوجد في الملفات المحملة؟

```
zaki.sitweb/
├── server/                 # الخادم (Backend)
│   ├── models/            # نماذج البيانات
│   ├── routes/            # مسارات API
│   ├── middleware/        # التحقق من الهوية
│   └── index.js           # نقطة البداية
├── public/                # الواجهة الأمامية
│   ├── js/               # ملفات JavaScript
│   └── index.html        # الصفحة الرئيسية
├── .env                  # متغيرات البيئة (غيّر هذا)
├── .env.example          # مثال للـ .env
├── package.json          # المكتبات
├── README.md             # شرح عام
├── SETUP_GUIDE.md        # شرح مفصل
└── QUICK_START.md        # البدء السريع
```

---

## ⚠️ نقاط مهمة

### ✅ قبل التشغيل تأكد من:
1. ✔️ Node.js و npm مثبتين
2. ✔️ MongoDB مثبت أو حساب MongoDB Atlas
3. ✔️ تغيير `JWT_SECRET` في `.env`
4. ✔️ تشغيل `npm install`

### ❌ المشاكل الشائعة:

**"git: command not found"**
- نعم Git غير مثبت، حمّله من: https://git-scm.com/

**"MongoDB connection failed"**
- شغّل MongoDB على جهازك
- أو استخدم MongoDB Atlas (السحابة)

**"Port 5000 is already in use"**
- غيّر PORT في `.env` إلى رقم آخر (مثلاً 5001)

---

## 🎉 تم بنجاح!

عندما ترى هذه الرسالة في Terminal:

```
✅ متصل بقاعدة البيانات
🚀 الخادم يعمل على المنفذ 5000
```

**الموقع جاهز للاستخدام!** ✨

---

## 📞 تحتاج مساعدة؟

1. اقرأ `SETUP_GUIDE.md` للتفاصيل الكاملة
2. تحقق من رسائل الخطأ في Terminal
3. جرّب إعادة تشغيل الخادم

---

**آخر تحديث**: 29 مايو 2026
