// تحديث واجهة المستخدم بناءً على الدور
const UIManager = {
  init() {
    this.updateRole();
    this.setupListeners();
  },

  updateRole() {
    const role = AuthSystem.user.role;
    document.body.setAttribute('data-role', role);
    document.getElementById('roleBadge').textContent = 
      role === 'admin' ? 'مسؤول' : 'زبون';
  },

  setupListeners() {
    // زر الخروج
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
      AuthSystem.logout();
      location.reload();
    });

    // تبديل المظهر
    document.getElementById('themeBtn')?.addEventListener('click', () => {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme') || 'light';
      const newTheme = current === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });

    // تطبيق المظهر المحفوظ
    const saved = localStorage.getItem('theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }
  },

  showMessage(message, type = 'info') {
    const toast = document.querySelector('.toast');
    if (toast) {
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }
  }
};

// تهيئة عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
  UIManager.init();
});
