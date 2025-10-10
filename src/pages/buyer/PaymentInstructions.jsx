import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar';
import { getOrderById } from '../../api/orderAPI';
import { getPaymentDetails } from '../../api/paymentAPI';
import { copyToClipboard, getWhatsAppLink, getInstagramLink } from '../../utils/helpers';
import toast from 'react-hot-toast';
import { Copy, Check, MessageCircle, Instagram, CreditCard, Smartphone } from 'lucide-react';

const PaymentInstructions = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedField, setCopiedField] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [orderData, paymentData] = await Promise.all([
        getOrderById(id),
        getPaymentDetails(),
      ]);
      setOrder(orderData);
      setPaymentDetails(paymentData);

      // Check if order requires payment
      if (orderData.paymentMethod !== 'Online_Manual') {
        navigate(`/orders/${id}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load payment details');
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text, field) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopiedField(null), 2000);
    } else {
      toast.error('Failed to copy');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (!order || !paymentDetails) {
    return null;
  }

  const CopyButton = ({ text, field }) => (
    <button
      onClick={() => handleCopy(text, field)}
      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
      title="Copy to clipboard"
    >
      {copiedField === field ? (
        <Check className="w-5 h-5 text-green-600" />
      ) : (
        <Copy className="w-5 h-5" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Payment Instructions</h1>
        <p className="text-gray-600 mb-8">Order ID: #{order._id}</p>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Total Amount to Pay:</span>
            <span className="text-3xl font-bold text-blue-600">Rs. {order.totalPrice}</span>
          </div>
        </div>

        {/* Bank Transfer Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-2 mb-6">
            <CreditCard className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Bank Transfer Details</h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Bank Name</p>
                <p className="font-semibold text-gray-800">{paymentDetails.bankName}</p>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Account Title</p>
                <p className="font-semibold text-gray-800">{paymentDetails.accountTitle}</p>
              </div>
              <CopyButton text={paymentDetails.accountTitle} field="accountTitle" />
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Account Number</p>
                <p className="font-semibold text-gray-800">{paymentDetails.accountNumber}</p>
              </div>
              <CopyButton text={paymentDetails.accountNumber} field="accountNumber" />
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">IBAN</p>
                <p className="font-semibold text-gray-800">{paymentDetails.iban}</p>
              </div>
              <CopyButton text={paymentDetails.iban} field="iban" />
            </div>
          </div>
        </div>

        {/* Mobile Payment Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* JazzCash */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Smartphone className="w-6 h-6 text-red-600" />
              <h3 className="text-xl font-bold text-gray-800">JazzCash</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Account</p>
                  <p className="font-semibold text-gray-800">
                    {paymentDetails.jazzCash.accountNumber}
                  </p>
                </div>
                <CopyButton
                  text={paymentDetails.jazzCash.accountNumber}
                  field="jazzCash"
                />
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Title</p>
                <p className="font-semibold text-gray-800">
                  {paymentDetails.jazzCash.accountTitle}
                </p>
              </div>
            </div>
          </div>

          {/* EasyPaisa */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Smartphone className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-bold text-gray-800">EasyPaisa</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Account</p>
                  <p className="font-semibold text-gray-800">
                    {paymentDetails.easyPaisa.accountNumber}
                  </p>
                </div>
                <CopyButton
                  text={paymentDetails.easyPaisa.accountNumber}
                  field="easyPaisa"
                />
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Title</p>
                <p className="font-semibold text-gray-800">
                  {paymentDetails.easyPaisa.accountTitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            {paymentDetails.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
          <div className="mt-4 p-4 bg-blue-100 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Important:</strong> {paymentDetails.note}
            </p>
          </div>
        </div>

        {/* Contact Options */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Contact us via WhatsApp or Instagram after making the payment:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={getWhatsAppLink(
                paymentDetails.contact.whatsapp,
                `Hi, I've made a payment for Order #${order._id}. Amount: Rs. ${order.totalPrice}`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp: {paymentDetails.contact.whatsapp}</span>
            </a>

            <a
              href={getInstagramLink(paymentDetails.contact.instagram)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-semibold"
            >
              <Instagram className="w-5 h-5" />
              <span>Instagram: {paymentDetails.contact.instagram}</span>
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate(`/orders/${order._id}`)}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            View Order Details
          </button>
          <button
            onClick={() => navigate('/orders')}
            className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-semibold"
          >
            My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInstructions;