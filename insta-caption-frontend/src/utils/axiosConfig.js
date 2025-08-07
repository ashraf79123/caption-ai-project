import axios from 'axios';

const API = axios.create({
  baseURL: 'https://caption-ai-project.onrender.com',
  withCredentials: true,
});

export default API;
