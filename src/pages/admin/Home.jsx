import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar';
import { getTopProducts } from '../../api/productAPI';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { Star, ShoppingCart } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchTopProducts();
  }, []);

  const fetchTopProducts = async () => {
    try {
      const data = await getTopProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success('Added to cart!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Premium Mobile Cases</h1>
          <p className="text-xl mb-8">Protect Your Phone in Style</p>
          <Link
            to="/products"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Products</h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No products available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
              >
                <Link to={`/products/${product.slug}`}>
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    {product.image && product.image[0] ? (
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-6xl">📱</div>
                    )}
                  </div>
                </Link>

                <div className="p-4">
                  <Link to={`/products/${product.slug}`}>
                    <h3 className="font-semibold text-gray-800 mb-2 hover:text-blue-600 transition">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">
                      {product.rating} ({product.numReviews} reviews)
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mb-3">{product.deviceModel}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      Rs. {product.price}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm flex items-center space-x-1"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            View All Products →
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable shipping across Pakistan</p>
            </div>
            <div>
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">Premium quality mobile covers</p>
            </div>
            <div>
              <div className="text-5xl mb-4">💳</div>
              <h3 className="text-xl font-bold mb-2">Easy Payment</h3>
              <p className="text-gray-600">COD & Online payment options</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;