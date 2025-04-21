// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6500', // match backend route
});

export default api;
