import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../../redux/features/orders/ordersApi';
import { FiShoppingBag, FiCalendar, FiDollarSign, FiPackage } from 'react-icons/fi';

const UserDashboard = () => {
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

    if (isLoading) return <div className="text-center py-10">Loading...</div>;
    if (isError) return <div className="text-center text-red-500 py-10">Error getting orders data</div>;

    return (
        <div className="bg-gray-100 py-16 px-4">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold mb-2 text-primary">Welcome, {currentUser?.name || 'User'} 👋</h1>
                <p className="text-gray-600 mb-8">Here's a quick look at your recent orders:</p>

                <div className="space-y-6">
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div
                                key={order._id}
                                className="border border-gray-200 rounded-lg p-6 bg-gray-50 shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex flex-col md:flex-row justify-between mb-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <FiShoppingBag className="text-primary" />
                                        <span className="font-semibold">Order ID:</span>
                                        <span className="text-gray-800">{order._id}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-2 md:mt-0">
                                        <FiCalendar className="text-primary" />
                                        <span>{new Date(order?.createdAt).toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-2">
                                    <div className="flex items-center gap-2">
                                        <FiDollarSign className="text-green-600" />
                                        <span className="font-medium text-green-600">${order.totalPrice}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FiPackage className="text-primary" />
                                        <span>{order.productIds.length} item(s)</span>
                                    </div>
                                </div>

                                <div className="text-sm text-gray-600 ml-1 mt-2">
                                    <p className="font-semibold mb-1">Product IDs:</p>
                                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                                        {order.productIds.map((productId) => (
                                            <li key={productId}>{productId}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">You have no recent orders.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
