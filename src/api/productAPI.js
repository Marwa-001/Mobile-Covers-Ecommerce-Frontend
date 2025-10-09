import api from './axios';

// Get all products with filters
export const getProducts = async (params = {}) => {
  const { data } = await api.get('/products', { params });
  return data;
};

// Get single product by slug
export const getProductBySlug = async (slug) => {
  const { data } = await api.get(`/products/${slug}`);
  return data;
};

// Get top rated products
export const getTopProducts = async () => {
  const { data } = await api.get('/products/top');
  return data;
};

// Create product (Admin only)
export const createProduct = async (productData) => {
  const { data } = await api.post('/products', productData);
  return data;
};

// Update product (Admin only)
export const updateProduct = async (id, productData) => {
  const { data } = await api.put(`/products/${id}`, productData);
  return data;
};

// Delete product (Admin only)
export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

// Get product reviews
export const getProductReviews = async (id) => {
  const { data } = await api.get(`/products/${id}/reviews`);
  return data;
};

// Create product review
export const createProductReview = async (id, review) => {
  const { data } = await api.post(`/products/${id}/reviews`, review);
  return data;
};

export default {
  getProducts,
  getProductBySlug,
  getTopProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductReviews,
  createProductReview,
};