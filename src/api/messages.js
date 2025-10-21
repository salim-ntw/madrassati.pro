import axios from './axios';

export const messageAPI = {
  // Get all conversations for a user
  getConversations: (userId) => {
    return axios.get(`/messages/${userId}`);
  },

  // Get conversation history between two users about a specific child
  getConversationHistory: (userId, receiverId, childId) => {
    return axios.get(`/messages/conversation/${userId}/${receiverId}/${childId}`);
  },

  // Get available contacts for a user
  getContacts: (userId) => {
    return axios.get(`/messages/contacts/${userId}`);
  },

  // Send a new message
  sendMessage: (messageData) => {
    return axios.post('/messages', messageData);
  },

  // Start a new conversation
  startConversation: (messageData) => {
    return axios.post('/messages/start-conversation', messageData);
  }
};
