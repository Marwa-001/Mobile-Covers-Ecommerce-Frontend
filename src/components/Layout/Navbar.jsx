import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Menu, X, User, LogOut, Package, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={isAdmin ? '/admin/dashboard' : '/'} className="text-2xl font-bold flex items-center space-x-2">
            <ShoppingCart className="w-7 h-7" />
            <span>MobileCovers</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isAdmin ? (
              <>
                <Link to="/admin/dashboard" className="hover:text-blue-200 transition flex items-center space-x-1">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/admin/orders" className="hover:text-blue-200 transition">Orders</Link>
                <Link to="/admin/products" className="hover:text-blue-200 transition">Products</Link>
              </>
            ) : (
              <>
                <Link to="/" className="hover:text-blue-200 transition">Home</Link>
                <Link to="/products" className="hover:text-blue-200 transition">Products</Link>
                {user && <Link to="/orders" className="hover:text-blue-200 transition">My Orders</Link>}
              </>
            )}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon (Buyer Only) */}
            {!isAdmin && user && (
              <Link to="/cart" className="relative p-2 hover:bg-blue-500 rounded-lg transition">
                <ShoppingCart className="w-6 h-6" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {getCartCount()}
                  </span>
                )}
              </Link>
            )}

            {/* User Menu */}
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span className="text-sm">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 p-2 hover:bg-blue-500 rounded-lg transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Link to="/login" className="px-4 py-2 hover:bg-blue-500 rounded-lg transition">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-semibold">
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-blue-500 rounded-lg transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-4 space-y-3">
          {isAdmin ? (
            <>
              <Link to="/admin/dashboard" className="block py-2 hover:text-blue-200" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>
              <Link to="/admin/orders" className="block py-2 hover:text-blue-200" onClick={() => setMobileMenuOpen(false)}>
                Orders
              </Link>
              <Link to="/admin/products" className="block py-2 hover:text-blue-200" onClick={() => setMobileMenuOpen(false)}>
                Products
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="block py-2 hover:text-blue-200" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/products" className="block py-2 hover:text-blue-200" onClick={() => setMobileMenuOpen(false)}>
                Products
              </Link>
              {user && (
                <Link to="/orders" className="block py-2 hover:text-blue-200" onClick={() => setMobileMenuOpen(false)}>
                  My Orders
                </Link>
              )}
            </>
          )}

          {user ? (
            <>
              <div className="border-t border-blue-600 pt-3 mt-3">
                <p className="text-sm text-blue-200 mb-2">Logged in as: {user.name}</p>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 hover:text-blue-200"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="border-t border-blue-600 pt-3 mt-3 space-y-2">
              <Link to="/login" className="block py-2 hover:text-blue-200" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="block py-2 hover:text-blue-200" onClick={() => setMobileMenuOpen(false)}>
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;