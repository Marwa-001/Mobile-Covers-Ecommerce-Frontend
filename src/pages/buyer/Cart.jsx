import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar';
import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleUpdateQty = (productId, currentQty, change) => {
    const newQty = currentQty + change;
    if (newQty < 1) {
      return;
    }
    updateQuantity(productId, newQty);
  };

  const handleRemove = (productId, productName) => {
    removeFromCart(productId);
    toast.success(`${productName} removed from cart`);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      toast.success('Cart cleared');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/products"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Shopping Cart</h1>
          <button
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-700 font-semibold"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center p-6 border-b border-gray-200 last:border-0"
                >
                  {/* Product Image */}
                  <Link
                    to={`/products/${item.slug}`}
                    className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
                  >
                    {item.image && item.image[0] ? (
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-4xl">📱</div>
                    )}
                  </Link>

                  {/* Product Details */}
                  <div className="ml-6 flex-1">
                    <Link
                      to={`/products/${item.slug}`}
                      className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">{item.deviceModel}</p>
                    <p className="text-sm text-blue-600 mt-1">{item.caseType}</p>
                    <p className="text-lg font-bold text-blue-600 mt-2">Rs. {item.price}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleUpdateQty(item._id, item.qty, -1)}
                        className="p-2 hover:bg-gray-100 transition"
                        disabled={item.qty <= 1}
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="px-4 py-2 font-semibold">{item.qty}</span>
                      <button
                        onClick={() => handleUpdateQty(item._id, item.qty, 1)}
                        className="p-2 hover:bg-gray-100 transition"
                        disabled={item.qty >= item.countInStock}
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item._id, item.name)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Subtotal (Mobile) */}
                  <div className="ml-4 text-right hidden md:block">
                    <p className="text-sm text-gray-600">Subtotal</p>
                    <p className="text-lg font-bold text-gray-800">
                      Rs. {(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Items ({cart.reduce((sum, item) => sum + item.qty, 0)})</span>
                  <span>Rs. {getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>Rs. 150.00</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span>Rs. {(getCartTotal() + 150).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold mb-4"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="block text-center text-blue-600 hover:text-blue-700 font-semibold"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;