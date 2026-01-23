import { useState } from 'react';
import ProfileForm from '../components/ProfileForm';
import OrderHistory from '../components/OrderHistory';

const Account = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`text-left px-4 py-3 rounded-lg font-medium transition ${
                activeTab === 'profile' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Profile Details
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`text-left px-4 py-3 rounded-lg font-medium transition ${
                activeTab === 'orders' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Order History
            </button>
          </nav>
        </aside>
        <main className="w-full md:w-3/4 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          {activeTab === 'profile' ? <ProfileForm /> : <OrderHistory />}
        </main>
      </div>
    </div>
  );
};

export default Account;