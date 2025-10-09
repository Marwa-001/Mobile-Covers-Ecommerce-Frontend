// Format currency
export const formatCurrency = (amount) => {
  return `Rs. ${amount.toLocaleString()}`;
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Get WhatsApp link
export const getWhatsAppLink = (phone, message) => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

// Get Instagram link
export const getInstagramLink = (handle) => {
  return `https://instagram.com/${handle.replace('@', '')}`;
};

// Calculate order total
export const calculateOrderTotal = (items, shippingPrice = 150, taxPrice = 0) => {
  const itemsTotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  return itemsTotal + shippingPrice + taxPrice;
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
};