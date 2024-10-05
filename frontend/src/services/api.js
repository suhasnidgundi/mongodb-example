import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const createItem = (item) => axios.post(`${API_URL}/items`, item);
export const getItems = () => axios.get(`${API_URL}/items`).then(res => res.data);
export const updateItem = (id, item) => axios.put(`${API_URL}/items/${id}`, item);
export const deleteItem = (id) => axios.delete(`${API_URL}/items/${id}`);