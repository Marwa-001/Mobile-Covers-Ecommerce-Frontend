import { Link } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar';
import { Smartphone } from 'lucide-react';

const Home = () => {
  // Brand data with colors and emojis
  const brands = [
    {
      name: 'iPhone',
      slug: 'iphone',
      icon: '🍎',
      gradient: 'from-gray-900 to-gray-700',
      description: 'Premium cases for iPhone',
    },
    {
      name: 'Samsung',
      slug: 'samsung',
      icon: '📱',
      gradient: 'from-blue-600 to-blue-800',
      description: 'Cases for Galaxy series',
    },
    {
      name: 'Vivo',
      slug: 'vivo',
      icon: '💙',
      gradient: 'from-sky-500 to-blue-600',
      description: 'Stylish Vivo covers',
    },
    {
      name: 'Techno',
      slug: 'techno',
      icon: '⚡',
      gradient: 'from-purple-600 to-indigo-700',
      description: 'Trendy Techno cases',
    },
    {
      name: 'Infinix',
      slug: 'infinix',
      icon: '🌟',
      gradient: 'from-orange-500 to-red-600',
      description: 'Durable Infinix covers',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Smartphone className="w-20 h-20" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Premium Mobile Covers</h1>
          <p className="text-xl md:text-2xl mb-8">Protect Your Phone in Style</p>
          <p className="text-lg text-blue-100">Choose your brand to explore our collection</p>
        </div>
      </div>

      {/* Brand Selection Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Shop by Brand</h2>
          <p className="text-xl text-gray-600">Select your phone brand to find the perfect case</p>
        </div>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              to={`/brand/${brand.slug}`}
              className="group"
            >
              <div className={`bg-gradient-to-br ${brand.gradient} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden`}>
                <div className="p-8 text-center">
                  {/* Brand Icon */}
                  <div className="text-8xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {brand.icon}
                  </div>
                  
                  {/* Brand Name */}
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {brand.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-lg text-white/90 mb-6">
                    {brand.description}
                  </p>
                  
                  {/* CTA Button */}
                  <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg text-white font-semibold group-hover:bg-white/30 transition-all duration-300">
                    Browse Cases →
                  </div>
                </div>
                
                {/* Bottom Accent */}
                <div className="h-2 bg-white/30"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-6xl mb-4">🚚</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Fast Delivery</h3>
              <p className="text-gray-600 text-lg">Quick and reliable shipping across Pakistan</p>
            </div>
            <div className="p-6">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Quality Guarantee</h3>
              <p className="text-gray-600 text-lg">Premium quality mobile covers</p>
            </div>
            <div className="p-6">
              <div className="text-6xl mb-4">💳</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Easy Payment</h3>
              <p className="text-gray-600 text-lg">COD & Online payment options</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl mb-3">🎨</div>
              <h4 className="font-bold text-lg mb-2 text-gray-800">Wide Variety</h4>
              <p className="text-gray-600 text-sm">Hundreds of designs to choose from</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl mb-3">🛡️</div>
              <h4 className="font-bold text-lg mb-2 text-gray-800">Protection</h4>
              <p className="text-gray-600 text-sm">Military-grade drop protection</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl mb-3">💰</div>
              <h4 className="font-bold text-lg mb-2 text-gray-800">Affordable</h4>
              <p className="text-gray-600 text-sm">Best prices in the market</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl mb-3">🔄</div>
              <h4 className="font-bold text-lg mb-2 text-gray-800">Easy Returns</h4>
              <p className="text-gray-600 text-sm">Hassle-free return policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Protect Your Phone?</h2>
          <p className="text-xl mb-8">Choose your brand and find the perfect case today!</p>
          <div className="flex flex-wrap justify-center gap-4">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                to={`/brand/${brand.slug}`}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;