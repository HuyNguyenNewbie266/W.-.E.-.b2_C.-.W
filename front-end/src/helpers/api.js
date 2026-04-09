import axios from "axios";

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
    throw error;
  }
};

export const api = {
  
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
  },

  responses: {
    getAll:   handleError(() => apiClient.get('responses')),
    getById:  handleError((id) => apiClient.get(`responses/${id}`)),
    create:   handleError((data) => apiClient.post('responses', data)),
    update:   handleError((id, data) => apiClient.put(`responses/${id}`, data)),
    delete:   handleError((id) => apiClient.delete(`responses/${id}`)),
  },

  messages: {
    getAll:   handleError(() => apiClient.get('messages')),
    getById:  handleError((id) => apiClient.get(`messages/${id}`)),
    create:   handleError((data) => apiClient.post('messages', data)),
    update:   handleError((id, data) => apiClient.put(`messages/${id}`, data)),
    delete:   handleError((id) => apiClient.delete(`messages/${id}`)),
  }
};