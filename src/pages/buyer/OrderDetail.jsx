import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar';
import { getOrderById, cancelOrder } from '../../api/orderAPI';
import toast from 'react-hot-toast';
import { 
  ArrowLeft, 
  Package, 
  MapPin, 
  CreditCard, 
  CheckCircle, 
  XCircle,
  Clock,
  Truck,
  AlertCircle
} from 'lucide-react';
import { ORDER_STATUS_COLORS } from '../../utils/constants';
import { formatDate, formatCurrency } from '../../utils/helpers';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const data = await getOrderById(id);
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order:', error);
      toast.error('Order not found');
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    try {
      setCancelling(true);
      await cancelOrder(id);
      toast.success('Order cancelled successfully');
      fetchOrder(); // Refresh order data
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to cancel order';
      toast.error(message);
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const canCancel = order.orderStatus !== 'Cancelled' && 
                    order.orderStatus !== 'Delivered' && 
                    (!order.isPaid || order.paymentMethod === 'COD');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/orders')}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Orders</span>
        </button>

        {/* Order Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Order #{order._id.slice(-8).toUpperCase()}
              </h1>
              <div className="flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    ORDER_STATUS_COLORS[order.orderStatus] || 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {order.orderStatus}
                </span>
                <span className="text-gray-600">{formatDate(order.createdAt)}</span>
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
              <p className="text-3xl font-bold text-blue-600">
                {formatCurrency(order.totalPrice)}
              </p>
              {canCancel && (
                <button
                  onClick={handleCancelOrder}
                  disabled={cancelling}
                  className="mt-3 text-red-600 hover:text-red-700 font-semibold disabled:opacity-50"
                >
                  {cancelling ? 'Cancelling...' : 'Cancel Order'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Package className="w-5 h-5" />
                <span>Order Items</span>
              </h2>

              <div className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 pb-4 border-b border-gray-200 last:border-0">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-3xl">📱</div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.qty}</p>
                      <p className="text-sm text-blue-600 mt-1">
                        {formatCurrency(item.price)} × {item.qty} = {formatCurrency(item.price * item.qty)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Shipping Address</span>
              </h2>

              <div className="text-gray-700 space-y-1">
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>

            {/* Payment Screenshot */}
            {order.paymentScreenshot && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Payment Screenshot</span>
                </h2>

                <img
                  src={order.paymentScreenshot}
                  alt="Payment Screenshot"
                  className="w-full max-w-md rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Status Timeline */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Status</h2>

              <div className="space-y-4">
                {/* Payment Status */}
                <div className="flex items-start space-x-3">
                  {order.isPaid ? (
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <Clock className="w-6 h-6 text-orange-500 flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-semibold text-gray-800">
                      {order.isPaid ? 'Payment Received' : 'Waiting for Payment'}
                    </p>
                    {order.isPaid && order.paidAt && (
                      <p className="text-sm text-gray-600">{formatDate(order.paidAt)}</p>
                    )}
                    {order.paymentResult?.verificationNote && (
                      <p className="text-xs text-gray-500 mt-1">
                        {order.paymentResult.verificationNote}
                      </p>
                    )}
                  </div>
                </div>

                {/* Delivery Status */}
                <div className="flex items-start space-x-3">
                  {order.isDelivered ? (
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <Truck className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-semibold text-gray-800">
                      {order.isDelivered ? 'Delivered' : 'In Transit'}
                    </p>
                    {order.isDelivered && order.deliveredAt && (
                      <p className="text-sm text-gray-600">{formatDate(order.deliveredAt)}</p>
                    )}
                  </div>
                </div>

                {/* Cancelled */}
                {order.orderStatus === 'Cancelled' && (
                  <div className="flex items-start space-x-3">
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">Order Cancelled</p>
                    </div>
                  </div>
                )}

                {/* Payment Rejected */}
                {order.orderStatus === 'Payment Rejected' && (
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">Payment Rejected</p>
                      {order.paymentResult?.verificationNote && (
                        <p className="text-sm text-red-600 mt-1">
                          {order.paymentResult.verificationNote}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Payment Method</span>
              </h2>

              <p className="text-gray-700">
                {order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Bank Transfer'}
              </p>

              {order.paymentMethod === 'Online_Manual' && !order.isPaid && (
                <Link
                  to={`/orders/payment/${order._id}`}
                  className="mt-4 block w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold text-center"
                >
                  Upload Payment Screenshot
                </Link>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Items</span>
                  <span>{formatCurrency(order.totalPrice - order.shippingPrice - order.taxPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>{formatCurrency(order.shippingPrice)}</span>
                </div>
                {order.taxPrice > 0 && (
                  <div className="flex justify-between text-gray-700">
                    <span>Tax</span>
                    <span>{formatCurrency(order.taxPrice)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span>{formatCurrency(order.totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;