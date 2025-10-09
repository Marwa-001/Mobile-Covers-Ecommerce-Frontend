import api from './axios';

// Get user's cart
export const getCart = async () => {
  const { data } = await api.get('/cart');
  return data;
};

// Add item to cart
export const addToCart = async (productId, quantity) => {
  const { data } = await api.post('/cart', { productId, quantity });
  return data;
};

// Update cart item quantity
export const updateCartItem = async (productId, quantity) => {
  const { data } = await api.put(`/cart/${productId}`, { quantity });
  return data;
};

// Remove item from cart
export const removeFromCart = async (productId) => {
  const { data } = await api.delete(`/cart/${productId}`);
  return data;
};

// Clear entire cart
export const clearCart = async () => {
  const { data } = await api.delete('/cart');
  return data;
};

export default {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};