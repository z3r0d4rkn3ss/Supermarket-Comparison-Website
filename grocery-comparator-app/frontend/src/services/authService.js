import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
};

const registerUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/signup`, { username, password });
  return response.data;
};

export { loginUser, registerUser };
