import React from 'react';
// FIX: The file is located at src/pages/admin/Orders.jsx. 
// We need to move up two directories (..) to reach src/ and then go into context/.
// The correct relative path is '../../context/AuthContext'.
// Since the compiler still failed on the previous attempt with '..', we must check 
// the assumed file structure. Let's try specifying the .jsx extension explicitly 
// as a safe workaround, though the path depth itself seems correct.
// Since the Dashboard.jsx error suggested three dots '...', and the AdminOrders.jsx 
// error suggested two '..', I will stick to two as it is logically correct for 
// src/pages/admin/ to src/context/. If two failed, I will try three, assuming 
// the previous file path logic was flawed.
import { useAuth } from '../../context/AuthContext'; 

/**
 * AdminOrders Component Placeholder
 * Displays a list of all customer orders for administration.
 */
const AdminOrders = () => {
  const { userId } = useAuth();
  
  // Dummy data for the orders list
  const dummyOrders = [
    { id: '1001', customer: 'Alice Johnson', status: 'Processing', total: 450.00, date: '2024-10-01' },
    { id: '1002', customer: 'Bob Smith', status: 'Shipped', total: 120.50, date: '2024-09-28' },
    { id: '1003', customer: 'Charlie Brown', status: 'Delivered', total: 75.99, date: '2024-09-25' },
    { id: '1004', customer: 'Diana Prince', status: 'Cancelled', total: 299.00, date: '2024-09-20' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin: All Orders ({dummyOrders.length})
        </h1>
        <p className="text-sm text-gray-500 mt-1">Logged in as: {userId || 'N/A'}</p>
      </header>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {['Order ID', 'Customer', 'Date', 'Total', 'Status', 'Actions'].map((header) => (
                <th 
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dummyOrders.map((order) => (
              <tr key={order.id} className="hover:bg-indigo-50 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 transition duration-150">
                    View Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer message */}
      <div className="mt-8 p-4 bg-yellow-100 text-yellow-800 rounded-lg border border-yellow-300">
        This is a placeholder component. Implement real data fetching here.
      </div>
    </div>
  );
};

export default AdminOrders;
