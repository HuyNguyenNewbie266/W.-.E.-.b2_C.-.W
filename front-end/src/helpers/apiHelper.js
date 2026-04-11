import axios from "axios";
import { useToast } from 'vue-toastification';

const toast = useToast();
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  }
});

const handleError = (fn) => async (...params) => {
  try {
    const res = await fn(...params);
    return res.data;
  } catch (error) {
    console.error("Error API:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    throw error;
  }
};

export const api = {

  auth:{
    googleLogin: handleError((data) => apiClient.post('login', data)),
  },
  
  users: {
    getAll:   handleError(() => apiClient.get('users')),
    getById:  handleError((id) => apiClient.get(`users/${id}`)),
    create:   handleError((data) => apiClient.post('users', data)),
    update:   handleError((id, data) => apiClient.put(`users/${id}`, data)),
    delete:   handleError((id) => apiClient.delete(`users/${id}`)),
  },

  tickets: {
    getAll:   handleError(() => apiClient.get('tickets')),
    getById:  handleError((id) => apiClient.get(`tickets/${id}`)),
    create:   handleError((data) => apiClient.post('tickets', data)),
    update:   handleError((id, data) => apiClient.put(`tickets/${id}`, data)),
    delete:   handleError((id) => apiClient.delete(`tickets/${id}`)),
    getByUser: handleError((id, params) => apiClient.get(`tickets/user/${id}`, { params })),
  },

  responses: {
    getAll:   handleError(() => apiClient.get('responses')),
    getById:  handleError((id) => apiClient.get(`responses/${id}`)),
    create:   handleError((data) => apiClient.post('responses', data)),
    update:   handleError((id, data) => apiClient.put(`responses/${id}`, data)),
    delete:   handleError((id) => apiClient.delete(`responses/${id}`)),
    getCounts: handleError(() => apiClient.get('responses/stats/counts')),
    getRecent: handleError((limit = 4) => apiClient.get(`responses/stats/recent?limit=${limit}`)),
    search:    handleError((params) => apiClient.get('responses/search', { params })),
  getRandomTest: handleError(() => apiClient.get('responses/test/random')),
  askAI:     handleError((data) => apiClient.post('responses/ask-ai', data)),
  },

  messages: {
    getAll:   handleError(() => apiClient.get('messages')),
    getById:  handleError((id) => apiClient.get(`messages/${id}`)),
    create:   handleError((data) => apiClient.post('messages', data)),
    update:   handleError((id, data) => apiClient.put(`messages/${id}`, data)),
    delete:   handleError((id) => apiClient.delete(`messages/${id}`)),
    getByTicket: handleError((ticketId, params) => apiClient.get(`messages/ticket/${ticketId}`, { params })),
  },

  universal: {
    universalSearch: handleError((q) => apiClient.get(`/universal-search?q=${q}`)),
  }
};