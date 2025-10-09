import React from 'react';
// FIX: Explicitly adding the .jsx extension to resolve persistent path errors
import { useAuth } from '../../context/AuthContext.jsx'; 

/**
 * AdminUsers Component Placeholder
 * Displays a list of all registered users for administrative management.
 */
const AdminUsers = () => {
  const { userId } = useAuth();
  
  // Dummy data for the users list
  const dummyUsers = [
    { id: 'usr-001', name: 'Jane Doe', email: 'jane.d@example.com', role: 'Admin', registered: '2023-01-15' },
    { id: 'usr-002', name: 'John Smith', email: 'john.s@example.com', role: 'Buyer', registered: '2023-03-20' },
    { id: 'usr-003', name: 'Lisa Chen', email: 'lisa.c@example.com', role: 'Buyer', registered: '2024-05-10' },
    { id: 'usr-004', name: 'Mike Ross', email: 'mike.r@example.com', role: 'Buyer', registered: '2024-09-01' },
  ];

  const getRoleBadge = (role) => {
    return role === 'Admin' 
      ? 'bg-red-100 text-red-800' 
      : 'bg-green-100 text-green-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin: Manage Users ({dummyUsers.length})
        </h1>
        <p className="text-sm text-gray-500 mt-1">Logged in as: {userId || 'N/A'}</p>
      </header>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {['User ID', 'Name', 'Email', 'Role', 'Registered', 'Actions'].map((header) => (
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
            {dummyUsers.map((user) => (
              <tr key={user.id} className="hover:bg-indigo-50 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadge(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.registered}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 transition duration-150">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900 transition duration-150">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer message */}
      <div className="mt-8 p-4 bg-yellow-100 text-yellow-800 rounded-lg border border-yellow-300">
        This is a placeholder component. User data management logic must be implemented here.
      </div>
    </div>
  );
};

export default AdminUsers;
