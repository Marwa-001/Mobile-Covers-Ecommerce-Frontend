import React, { useState } from 'react';
// FIX: Adjusting path back to '../../' as the file is two levels deep from src/
import { useAuth } from '../../context/AuthContext'; 

/**
 * AdminProductForm Component Placeholder
 * This component acts as a placeholder for both creating new products 
 * and editing existing ones.
 */
const AdminProductForm = () => {
  const { userId } = useAuth();
  
  // Simple state management for the placeholder form
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: 'mobile_cover',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Placeholder submit data:', product);
    // Placeholder logic: Show a success message (you'd replace this with API calls)
    // NOTE: Using a custom modal instead of alert() to follow best practices
    console.log('Product form submitted successfully! (Placeholder action)'); 
  };

  // Temporarily replacing alert with console.log, as per environment rule
  const handlePlaceholderAlert = (message) => {
      console.log('Placeholder Alert:', message);
  };

  const isEditMode = false; // Mocking the state for now

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEditMode ? 'Edit Product' : 'Create New Product'}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Administrator ID: {userId || 'N/A'}. Use this form to manage inventory.
        </p>
      </header>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10">
        <form onSubmit={(e) => { handleSubmit(e); handlePlaceholderAlert('Product form submitted successfully! (Placeholder action)'); }} className="space-y-6">
          
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={product.name}
              onChange={handleChange}
              placeholder="e.g., Slim Fit Phone Case"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
          </div>

          {/* Price and Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                id="price"
                value={product.price}
                onChange={handleChange}
                placeholder="0.00"
                min="0.01"
                step="0.01"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white transition duration-150"
              >
                <option value="mobile_cover">Mobile Covers</option>
                <option value="screen_protector">Screen Protectors</option>
                <option value="accessory">Accessories</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={product.description}
              onChange={handleChange}
              placeholder="Detailed description of the product features."
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-none"
            ></textarea>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 transform hover:scale-[1.01]"
            >
              {isEditMode ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>

      {/* Warning Message */}
      <div className="mt-8 p-4 max-w-4xl mx-auto bg-red-100 text-red-800 rounded-lg border border-red-300">
        **NOTE:** This is a placeholder form. Actual product creation logic (API calls, image uploads, database persistence) must be implemented here.
      </div>
    </div>
  );
};

export default AdminProductForm;
