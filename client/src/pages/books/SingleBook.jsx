

import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';

const SingleBook = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading book info</div>;

    return (
        <div className="max-w-4xl mx-auto p-5 shadow-md rounded-md space-y-6">
            {/* Section 1: Cover Image + Details */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* Book Cover */}
                <div className="md:w-1/3">
                    <img
                        src={book?.coverImage}
                        alt={book.title}
                        className="w-full h-auto rounded"
                    />
                </div>

                {/* Book Details */}
                <div className="md:w-2/3 space-y-4">
                    <h1 className="text-3xl font-bold">{book.title}</h1>
                    <p className="text-gray-700">
                        <strong>Author:</strong> {book.author || 'admin'}
                    </p>
                    <p className="text-gray-700">
                        <strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 capitalize">
                        <strong>Category:</strong> {book?.category}
                    </p>
                    <div className="flex items-center gap-4">
                        <p className="text-lg font-semibold text-green-600">
                            ${book.newPrice?.toFixed(2)}
                        </p>
                        {book.oldPrice && (
                            <span className="text-gray-500 line-through text-sm">
                                ${book.oldPrice.toFixed(2)}
                            </span>
                        )}
                    </div>

                    <button
                        onClick={() => handleAddToCart(book)}
                        className="btn-primary px-6 py-2 flex items-center gap-2"
                    >
                        <FiShoppingCart />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>

            {/* Section 3: Full-width Description */}
            <div className="pt-4 border-t">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{book.description}</p>
            </div>
        </div>
    );
};

export default SingleBook;
