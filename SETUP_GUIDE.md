# 📖 دليل التثبيت والتشغيل الكامل

## 🎯 المرحلة 1: التحضير الأساسي

### 1️⃣ تثبيت البرامج المطلوبة

قبل البدء، تأكد من تثبيت:

#### **Node.js و npm**
- اذهب إلى: https://nodejs.org/
- حمّل **LTS Version** (النسخة المستقرة)
- تحقق من التثبيت:
```bash
node --version
npm --version
```

#### **MongoDB**
- اذهب إلى: https://www.mongodb.com/try/download/community
- حمّل النسخة المجانية
- أو استخدم **MongoDB Atlas** (السحابة): https://www.mongodb.com/cloud/atlas

---

## 🚀 المرحلة 2: تشغيل الموقع

### الخطوة 1: فتح Terminal/Command Prompt

#### على Windows:
- اضغط `Win + R`
- اكتب `cmd` واضغط Enter

#### على Mac/Linux:
- افتح Terminal من البرامج

### الخطوة 2: انتقل إلى مجلد المشروع

```bash
cd path/to/zaki.sitweb
```

### الخطوة 3: تثبيت المكتبات

```bash
npm install
```

هذا سيثبت جميع المكتبات المطلوبة (Express, MongoDB, JWT, إلخ).

---

## 🔧 المرحلة 3: إعداد متغيرات البيئة

### 1. نسخ ملف البيئة

```bash
cp .env.example .env
```

### 2. فتح ملف `.env` وتعديله

**استخدم محرر نصوص مثل VS Code أو Notepad++**

```env
# عنوان قاعدة البيانات
# إذا استخدمت MongoDB محليا:
MONGODB_URI=mongodb://localhost:27017/agencyos

# إذا استخدمت MongoDB Atlas (السحابة):
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agencyos

# مفتاح التشفير - اختر شيء معقد وآمن
JWT_SECRET=your-super-secret-key-change-this-2026

# منفذ الخادم
PORT=5000

# عنوان الموقع الأمامي
FRONTEND_URL=http://localhost:3000

# نمط العمل
NODE_ENV=development
```

**⚠️ مهم: غير `JWT_SECRET` إلى شيء آمن وطويل!**

---

## 🎬 المرحلة 4: تشغيل الخادم

### في Terminal/Command Prompt:

```bash
npm run dev
```

ستظهر لك هذه الرسالة:
```
✅ متصل بقاعدة البيانات
🚀 الخادم يعمل على المنفذ 5000
```

**لا تغلق هذا النافذة! الخادم يجب أن يبقى مشغل.**

---

## 🌐 المرحلة 5: فتح الموقع

افتح متصفحك واذهب إلى:

```
http://localhost:3000
```

أو

```
http://localhost:5000
```

---

## 👤 المرحلة 6: أول دخول

### دخول المسؤول:
1. اختر **دخول المسؤول**
2. أدخل:
   - **البريد الإلكتروني**: admin@example.com
   - **كلمة المرور**: Password123 (يجب 8 أحرف فأكثر)
   - **كود الإذن**: OWNER-2026

### دخول الزبون:
1. اختر **دخول الزبون**
2. أدخل:
   - **اسم الزبون**: اسمك أو اسم الشركة
   - **الشركة**: اختياري

---

## 📁 هيكل المشروع

```
zaki.sitweb/
├── server/
│   ├── models/
│   │   ├── User.js          (نموذج المستخدمين)
│   │   └── Message.js       (نموذج الرسائل)
│   ├── routes/
│   │   ├── auth.js          (تسجيل الدخول)
│   │   ├── admin.js         (مسارات المسؤول)
│   │   ├── client.js        (مسارات الزبون)
│   │   └── messages.js      (نظام الرسائل)
│   ├── middleware/
│   │   └── auth.js          (التحقق من الهوية)
│   └── index.js             (نقطة البداية)
├── public/
│   ├── js/
│   │   ├── auth.js          (نظام المصادقة)
│   │   ├── messages.js      (نظام الرسائل)
│   │   └── ui.js            (إدارة الواجهة)
│   └── index.html           (الصفحة الرئيسية)
├── .env                     (متغيرات البيئة)
├── package.json             (المكتبات)
└── README.md                (الوثائق)
```

---

## 🔐 الميزات الأمنية

### ✅ فصل الأدوار
- **المسؤول**: يرى لوحة التحكم الكاملة + إدارة العملاء
- **الزبون**: يرى فقط بوابته الخاصة والرسائل مع المسؤول

### ✅ المصادقة الآمنة
- تسجيل دخول بـ Email + Password (للمسؤول)
- تسجيل دخول بـ الاسم (للزبون)
- توكن JWT ينتهي بعد 24 ساعة (مسؤول) أو 30 يوم (زبون)

### ✅ حماية البيانات
- تشفير كلمات المرور بـ bcryptjs
- رسائل مشفرة في قاعدة البيانات
- فصل تام بين بيانات المسؤول والزبون

### ✅ حماية من الهجمات
- CORS محمي (فقط من المصادر المسموحة)
- Validation على جميع المدخلات
- Protection من XSS و CSRF

---

## 🛠️ التطوير والتعديل

### تعديل الواجهة
اعدل ملفات:
- `public/index.html` - الصفحة الرئيسية
- `public/js/*.js` - السلوك والتفاعلات

### إضافة ميزات جديدة
اضف مسارات جديدة في:
- `server/routes/admin.js` (للمسؤول)
- `server/routes/client.js` (للزبون)

### تعديل نموذج البيانات
اعدل:
- `server/models/User.js` (لإضافة حقول جديدة)
- `server/models/Message.js` (لتعديل الرسائل)

---

## 🐛 حل المشاكل الشائعة

### ❌ "Cannot find module 'express'"
**الحل:**
```bash
npm install
```

### ❌ "Port 5000 is already in use"
**الحل:** غير المنفذ في `.env`:
```env
PORT=5001
```

### ❌ "MongoDB connection failed"
**الحل:** تأكد من:
1. MongoDB مشغّل على جهازك
2. أو أن رابط `MONGODB_URI` صحيح في `.env`

### ❌ "JWT Secret is not defined"
**الحل:** تأكد من إضافة `JWT_SECRET` في `.env`

---

## 📱 الاستخدام

### مسارات API الرئيسية

#### تسجيل الدخول
```
POST /api/auth/admin-login
POST /api/auth/client-login
GET /api/auth/verify
```

#### إدارة المسؤولين
```
GET /api/admin/admins          (عرض جميع المسؤولين)
POST /api/admin/add-admin       (إضافة مسؤول جديد)
DELETE /api/admin/remove-admin/:id (حذف مسؤول)
GET /api/admin/clients         (عرض جميع العملاء)
```

#### العملاء
```
GET /api/client/profile        (بيانات الزبون)
GET /api/client/admins         (عرض المسؤولين)
```

#### الرسائل
```
POST /api/messages/send        (إرسال رسالة)
GET /api/messages/conversation/:userId (احصل على محادثة)
```

---

## 🔒 نصائح أمان إضافية

1. **غير `JWT_SECRET`** قبل الإطلاق
2. **استخدم HTTPS** في الإنتاج
3. **حدّث المكتبات** بانتظام
4. **لا تحفظ`.env`** في Git
5. **استخدم كلمات مرور قوية** للمسؤولين

---

## 📞 الدعم والمساعدة

إذا واجهت أي مشكلة:
1. تحقق من رسائل الخطأ في Terminal
2. تأكد من تثبيت جميع البرامج المطلوبة
3. أعد تشغيل الخادم

---

**تم إنشاؤه بواسطة**: GitHub Copilot ✨
**آخر تحديث**: 29 مايو 2026
