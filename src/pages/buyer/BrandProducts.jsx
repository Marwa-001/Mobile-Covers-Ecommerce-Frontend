import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar';
import { getProducts } from '../../api/productAPI';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { Star, ShoppingCart, Filter, X, ArrowLeft, Package } from 'lucide-react';

const BrandProducts = () => {
  const { brand } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const { addToCart } = useCart();

  // Filters
  const [selectedModel, setSelectedModel] = useState('');
  const [caseType, setCaseType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Available models for each brand
  const brandModels = {
    iphone: [
      'iPhone 15 Pro Max',
      'iPhone 15 Pro',
      'iPhone 15 Plus',
      'iPhone 15',
      'iPhone 14 Pro Max',
      'iPhone 14 Pro',
      'iPhone 14 Plus',
      'iPhone 14',
      'iPhone 13 Pro Max',
      'iPhone 13 Pro',
      'iPhone 13',
      'iPhone 12 Pro Max',
      'iPhone 12 Pro',
      'iPhone 12',
      'iPhone 11 Pro Max',
      'iPhone 11 Pro',
      'iPhone 11',
    ],
    samsung: [
      'Samsung Galaxy S24 Ultra',
      'Samsung Galaxy S24+',
      'Samsung Galaxy S24',
      'Samsung Galaxy S23 Ultra',
      'Samsung Galaxy S23+',
      'Samsung Galaxy S23',
      'Samsung Galaxy S22 Ultra',
      'Samsung Galaxy A54',
      'Samsung Galaxy A34',
      'Samsung Galaxy A24',
      'Samsung Galaxy Z Fold 5',
      'Samsung Galaxy Z Flip 5',
    ],
    vivo: [
      'Vivo V29 Pro',
      'Vivo V29',
      'Vivo V27 Pro',
      'Vivo V27',
      'Vivo Y100',
      'Vivo Y56',
      'Vivo Y36',
      'Vivo Y22',
      'Vivo X90 Pro',
      'Vivo X80 Pro',
    ],
    techno: [
      'Techno Camon 20 Pro',
      'Techno Camon 20',
      'Techno Spark 10 Pro',
      'Techno Spark 10',
      'Techno Pova 5 Pro',
      'Techno Pova 5',
      'Techno Phantom X2',
    ],
    infinix: [
      'Infinix Note 30 Pro',
      'Infinix Note 30',
      'Infinix Hot 30',
      'Infinix Hot 20',
      'Infinix Zero 30',
      'Infinix Smart 8',
    ],
  };

  const caseTypes = [
    'Hard Case',
    'Silicone',
    'Leather',
    'Clear',
    'Wallet',
    'Bumper',
    'Rugged',
  ];

  const brandInfo = {
    iphone: {
      name: 'iPhone',
      icon: '🍎',
      gradient: 'from-gray-900 to-gray-700',
      description: 'Premium cases for your iPhone',
    },
    samsung: {
      name: 'Samsung',
      icon: '📱',
      gradient: 'from-blue-600 to-blue-800',
      description: 'Quality cases for Galaxy series',
    },
    vivo: {
      name: 'Vivo',
      icon: '💙',
      gradient: 'from-sky-500 to-blue-600',
      description: 'Stylish cases for Vivo phones',
    },
    techno: {
      name: 'Techno',
      icon: '⚡',
      gradient: 'from-purple-600 to-indigo-700',
      description: 'Trendy cases for Techno phones',
    },
    infinix: {
      name: 'Infinix',
      icon: '🌟',
      gradient: 'from-orange-500 to-red-600',
      description: 'Durable cases for Infinix phones',
    },
  };

  const currentBrand = brandInfo[brand] || null;

  useEffect(() => {
    if (!currentBrand) {
      navigate('/');
      return;
    }
    fetchProducts();
  }, [page, selectedModel, caseType, minPrice, maxPrice, brand]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Create search keyword for brand
      const brandKeyword = currentBrand.name;
      
      const params = {
        pageNumber: page,
        keyword: brandKeyword,
        deviceModel: selectedModel,
        caseType,
        minPrice,
        maxPrice,
      };
      
      const data = await getProducts(params);
      setProducts(data.products);
      setPages(data.pages);
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (product.countInStock === 0) {
      toast.error('Product out of stock');
      return;
    }
    addToCart(product, 1);
  };

  const clearFilters = () => {
    setSelectedModel('');
    setCaseType('');
    setMinPrice('');
    setMaxPrice('');
    setPage(1);
  };

  if (!currentBrand) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Brand Header */}
      <div className={`bg-gradient-to-r ${currentBrand.gradient} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Brands</span>
          </button>

          <div className="flex items-center space-x-4 mb-4">
            <div className="text-6xl">{currentBrand.icon}</div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">{currentBrand.name} Cases</h1>
              <p className="text-xl text-white/90 mt-2">{currentBrand.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
            >
              <Filter className="w-5 h-5" />
              <span className="font-semibold">
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </span>
            </button>

            {(selectedModel || caseType || minPrice || maxPrice) && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition"
              >
                <X className="w-4 h-4" />
                <span className="text-sm font-semibold">Clear Filters</span>
              </button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Phone Model Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Model
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => {
                      setSelectedModel(e.target.value);
                      setPage(1);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">All Models</option>
                    {brandModels[brand]?.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Case Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Case Type
                  </label>
                  <select
                    value={caseType}
                    onChange={(e) => {
                      setCaseType(e.target.value);
                      setPage(1);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">All Types</option>
                    {caseTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Min Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Price (Rs)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                      setPage(1);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Max Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Price (Rs)
                  </label>
                  <input
                    type="number"
                    placeholder="10000"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                      setPage(1);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{products.length}</span> of{' '}
            <span className="font-semibold">{total}</span> products
            {selectedModel && (
              <span className="ml-2 text-blue-600 font-semibold">
                for {selectedModel}
              </span>
            )}
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h3>
            <p className="text-gray-600 mb-6">
              {selectedModel
                ? `No cases available for ${selectedModel} yet.`
                : `No ${currentBrand.name} cases available yet.`}
            </p>
            {(selectedModel || caseType || minPrice || maxPrice) && (
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Clear filters to see all products
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
                >
                  <Link to={`/products/${product.slug}`}>
                    <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
                      {product.image && product.image[0] ? (
                        <img
                          src={product.image[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-6xl">📱</div>
                      )}
                      {product.countInStock === 0 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">Out of Stock</span>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-4">
                    <Link to={`/products/${product.slug}`}>
                      <h3 className="font-semibold text-gray-800 mb-2 hover:text-blue-600 transition line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">
                        {product.rating} ({product.numReviews})
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 mb-1">{product.deviceModel}</p>
                    <p className="text-xs text-blue-600 mb-3">{product.caseType}</p>

                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-blue-600">
                        Rs. {product.price}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.countInStock === 0}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {[...Array(pages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`px-4 py-2 rounded-lg ${
                      page === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === pages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BrandProducts;