// نظام المصادقة الآمن
const AuthSystem = {
  API_URL: 'http://localhost:5000/api',
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user') || '{}'),

  // دخول المسؤول
  async adminLogin(email, password, inviteCode) {
    try {
      const response = await fetch(`${this.API_URL}/auth/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, inviteCode })
      });

      const data = await response.json();
      if (response.ok) {
        this.setSession(data.token, data.user);
        return data;
      }
      throw new Error(data.message);
    } catch (error) {
      console.error('خطأ في الدخول:', error);
      throw error;
    }
  },

  // دخول الزبون
  async clientLogin(name, company) {
    try {
      const response = await fetch(`${this.API_URL}/auth/client-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company })
      });

      const data = await response.json();
      if (response.ok) {
        this.setSession(data.token, data.user);
        return data;
      }
      throw new Error(data.message);
    } catch (error) {
      console.error('خطأ في الدخول:', error);
      throw error;
    }
  },

  // حفظ الجلسة
  setSession(token, user) {
    this.token = token;
    this.user = user;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  // خروج
  logout() {
    this.token = null;
    this.user = {};
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // إرسال طلب محمي
  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
      ...options.headers
    };

    return fetch(`${this.API_URL}${endpoint}`, {
      ...options,
      headers
    });
  },

  // التحقق من الدخول
  isLoggedIn() {
    return !!this.token && !!this.user.id;
  },

  // التحقق من الدور
  isAdmin() {
    return this.user.role === 'admin';
  },

  isClient() {
    return this.user.role === 'client';
  }
};
