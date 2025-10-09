import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import * as cartAPI from '../api/cartAPI';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Fetch cart from database when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      // Clear cart when user logs out
      setCart([]);
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await cartAPI.getCart();
      // Transform cart data to match frontend format
      const transformedCart = data.items.map(item => ({
        _id: item.product._id,
        name: item.product.name,
        slug: item.product.slug,
        image: item.product.image,
        price: item.product.price,
        countInStock: item.product.countInStock,
        deviceModel: item.product.deviceModel,
        caseType: item.product.caseType,
        qty: item.quantity,
      }));
      setCart(transformedCart);
    } catch (error) {
      console.error('Error fetching cart:', error);
      // Don't show error toast on initial load
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      setLoading(true);
      await cartAPI.addToCart(product._id, quantity);
      await fetchCart(); // Refresh cart
      toast.success('Added to cart!');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add to cart';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      return;
    }

    try {
      setLoading(true);
      await cartAPI.removeFromCart(productId);
      await fetchCart(); // Refresh cart
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to remove item';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      return;
    }

    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    try {
      setLoading(true);
      await cartAPI.updateCartItem(productId, quantity);
      await fetchCart(); // Refresh cart
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update quantity';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      return;
    }

    try {
      setLoading(true);
      await cartAPI.clearCart();
      setCart([]);
      toast.success('Cart cleared');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to clear cart';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.qty, 0);
  };

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export default CartContext;