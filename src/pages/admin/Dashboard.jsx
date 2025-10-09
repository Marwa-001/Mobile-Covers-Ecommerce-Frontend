import React from 'react';
// FIX: Adjusted path from '../../context/AuthContext' to '../../../context/AuthContext' 
// to correctly resolve the AuthContext file, assuming the structure is:
// src/pages/admin/Dashboard.jsx -> src/context/AuthContext.jsx
import { useAuth } from '../../context/AuthContext';
/**
 * AdminDashboard Component
 * This is the main landing page for administrators.
 * It provides a basic layout and access to admin functions.
 */
const AdminDashboard = () => {
  const { user, userId } = useAuth();
  
  // Mock data for dashboard summary cards
  const summaryData = [
    { title: "Total Orders", value: "1,200", icon: "📦" },
    { title: "New Products", value: "45", icon: "✨" },
    { title: "Total Users", value: "350", icon: "👥" },
    { title: "Revenue (MTD)", value: "$12,500", icon: "💰" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-1">Welcome back, Administrator (UID: {userId || 'Loading...'})</p>
      </header>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {summaryData.map((item, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border-b-4 border-indigo-400"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500 uppercase">{item.title}</p>
              <span className="text-2xl">{item.icon}</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">{item.value}</p>
            <p className="text-xs text-green-500 mt-1">+10% since last month</p>
          </div>
        ))}
      </div>

      {/* Quick Actions Section */}
      <section className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-5 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition duration-150">
            Manage Products
          </button>
          <button className="px-5 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition duration-150">
            View New Orders
          </button>
          <button className="px-5 py-3 bg-yellow-600 text-white font-medium rounded-lg shadow-md hover:bg-yellow-700 transition duration-150">
            Update Site Settings
          </button>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
