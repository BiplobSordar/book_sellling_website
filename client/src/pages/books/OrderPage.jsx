import React from 'react'
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi'
import { useAuth } from '../../context/AuthContext';
import { FiMail, FiPhone, FiMapPin, FiShoppingBag, FiUser } from "react-icons/fi";
import { Link } from 'react-router-dom';

const OrderPage = () => {
    const { currentUser } = useAuth()


    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error geting orders data</div>
    return (
        <div className='container mx-auto p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Your Orders</h2>
            {
                orders.length === 0 ? (<div>No orders found!</div>) : (<div>
                    {
                        orders.map((order, index) => (
                            <div key={order._id} className="bg-white shadow-md rounded-xl p-6 mb-6 border border-gray-200">
                                {/* Order Header */}
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm bg-secondary text-white px-3 py-1 rounded-full font-semibold">
                                            # {index + 1}
                                        </p>
                                        <h2 className="font-bold text-lg">Order ID: <span className="text-gray-700">{order._id}</span></h2>
                                    </div>
                                    <div className="flex flex-col md:items-end text-sm text-gray-600">
                                        <p>
                                            <span className="font-semibold text-gray-800">Order Status:</span>{' '}
                                            <span className={`inline-block px-3 py-1 rounded-full 
                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                                                            order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                                'bg-gray-100 text-gray-700'}`}>
                                                {order?.status ? order.status : 'Pending'}
                                            </span>
                                        </p>
                                        <p className="text-xs mt-1">
                                            Placed on: <span className="text-gray-800">{new Date(order.createdAt).toLocaleString()}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Customer Info */}
                                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
                                    <p className="flex items-center gap-2"><FiUser className="text-primary" /> Name: {order.name}</p>
                                    <p className="flex items-center gap-2"><FiMail className="text-primary" /> Email: {order.email}</p>
                                    <p className="flex items-center gap-2"><FiPhone className="text-primary" /> Phone: {order.phone}</p>
                                    <p className="flex items-center gap-2 font-semibold text-green-600">
                                        <FiShoppingBag className="text-primary" /> Total: ${order.totalPrice}
                                    </p>
                                </div>

                                {/* Address Section */}
                                <div className="mb-4">
                                    <h3 className="font-semibold text-gray-800 mb-1 flex items-center gap-1">
                                        <FiMapPin className="text-primary" /> Shipping Address:
                                    </h3>
                                    <p className="text-gray-600 ml-5 text-sm">
                                        {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}
                                    </p>
                                </div>

                                {/* Product IDs */}
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-2">Product IDs:</h3>
                                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                        {order.productIds.map((productId) => (
                                            <Link to={`/books/${productId}`}>
                                                <li key={productId} className="ml-2">{productId}</li>
                                            </Link>

                                        ))}
                                    </ul>
                                </div>
                            </div>


                        ))
                    }
                </div>)
            }
        </div>
    )
}

export default OrderPage