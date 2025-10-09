import api from './axios';

// Create new order
export const createOrder = async (orderData) => {
  const { data } = await api.post('/orders', orderData);
  return data;
};

// Get order by ID
export const getOrderById = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};

// Get my orders
export const getMyOrders = async () => {
  const { data } = await api.get('/orders/myorders');
  return data;
};

// Cancel order
export const cancelOrder = async (id) => {
  const { data } = await api.put(`/orders/${id}/cancel`);
  return data;
};

// Admin: Get all orders
export const getAllOrders = async () => {
  const { data } = await api.get('/orders');
  return data;
};

// Admin: Get orders by status
export const getOrdersByStatus = async (status) => {
  const { data } = await api.get(`/orders/status/${status}`);
  return data;
};

// Admin: Mark order as paid
export const markOrderAsPaid = async (id, verificationNote) => {
  const { data } = await api.put(`/orders/${id}/pay`, { verificationNote });
  return data;
};

// Admin: Reject payment
export const rejectPayment = async (id, rejectionReason) => {
  const { data } = await api.put(`/orders/${id}/reject-payment`, { rejectionReason });
  return data;
};

// Admin: Update order status
export const updateOrderStatus = async (id, status) => {
  const { data } = await api.put(`/orders/${id}/status`, { status });
  return data;
};

// Admin: Mark order as delivered
export const markOrderAsDelivered = async (id) => {
  const { data } = await api.put(`/orders/${id}/deliver`);
  return data;
};

export default {
  createOrder,
  getOrderById,
  getMyOrders,
  cancelOrder,
  getAllOrders,
  getOrdersByStatus,
  markOrderAsPaid,
  rejectPayment,
  updateOrderStatus,
  markOrderAsDelivered,
};