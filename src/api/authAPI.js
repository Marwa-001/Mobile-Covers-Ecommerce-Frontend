import api from './axios';

// Login user
export const loginUser = async (email, password) => {
  const { data } = await api.post('/users/login', { email, password });
  return data;
};

// Register user
export const registerUser = async (name, email, password) => {
  const { data } = await api.post('/users', { name, email, password });
  return data;
};

// Get user profile
export const getUserProfile = async () => {
  const { data } = await api.get('/users/profile');
  return data;
};

// Update user profile
export const updateUserProfile = async (userData) => {
  const { data } = await api.put('/users/profile', userData);
  return data;
};

export default {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
};