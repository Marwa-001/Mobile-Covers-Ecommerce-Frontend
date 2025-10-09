import api from './axios';

// Get payment details (bank, JazzCash, EasyPaisa info)
export const getPaymentDetails = async () => {
  const { data } = await api.get('/payment/details');
  return data;
};

export default {
  getPaymentDetails,
};