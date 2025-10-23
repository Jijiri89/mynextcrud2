import axios from 'axios';

export const api = axios.create({
  baseURL: '/api', // so you can call api.get('/products')
  headers: { 'Content-Type': 'application/json' },
});
