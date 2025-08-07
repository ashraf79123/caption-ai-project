import axios from 'axios';

const API = axios.create({
  baseURL: 'https://caption-ai-3.onrender.com',
  withCredentials: true,
});

export default API;
