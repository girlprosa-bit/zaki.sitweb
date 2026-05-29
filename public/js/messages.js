// نظام الرسائل الآمن
const MessagingSystem = {
  currentConversation: null,

  async sendMessage(receiverId, content) {
    try {
      const response = await AuthSystem.request('/messages/send', {
        method: 'POST',
        body: JSON.stringify({
          receiverId,
          content,
          messageType: 'text'
        })
      });

      const data = await response.json();
      if (response.ok) {
        UIManager.showMessage('تم إرسال الرسالة بنجاح');
        return data;
      }
      throw new Error(data.message);
    } catch (error) {
      console.error('خطأ في إرسال الرسالة:', error);
      UIManager.showMessage('خطأ في إرسال الرسالة', 'error');
    }
  },

  async getConversation(userId) {
    try {
      const response = await AuthSystem.request(`/messages/conversation/${userId}`);
      const data = await response.json();
      
      if (response.ok) {
        this.currentConversation = data.data;
        this.renderConversation();
      }
    } catch (error) {
      console.error('خطأ في استرجاع الرسائل:', error);
    }
  },

  renderConversation() {
    const messageList = document.querySelector('.message-list');
    if (!messageList) return;

    messageList.innerHTML = this.currentConversation.map(msg => `
      <div class="message ${msg.senderId === AuthSystem.user.id ? 'sent' : 'received'}">
        <strong>${msg.senderId === AuthSystem.user.id ? 'أنت' : 'المسؤول'}</strong>
        <p>${msg.content}</p>
        <small>${new Date(msg.createdAt).toLocaleTimeString('ar')}</small>
      </div>
    `).join('');

    messageList.scrollTop = messageList.scrollHeight;
  }
};
