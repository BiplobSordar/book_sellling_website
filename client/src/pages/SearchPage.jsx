import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearchBookQuery } from '../redux/features/books/booksApi';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResult = () => {
    const navigate=useNavigate()

    
  const query = useQuery().get('searchText') || '';
  
  const { data: books = [], isLoading, isError } = useSearchBookQuery(query);
  if (isLoading) return <div className="text-center py-16 text-lg font-medium">🔍 Searching books...</div>;
  if (isError) return <div className="text-center text-red-500 py-16">❌ Error loading search results</div>;




  return (
    <div className="bg-gray-50 min-h-screen py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">
          Search Results for: <span className="text-primary">"{query}"</span>
        </h1>

        {books?.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col"
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-60 object-cover rounded-xl mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800 mb-1">{book.title}</h2>
                <p className="text-gray-600 text-sm mb-2 italic">By {book.author || 'Unknown Author'}</p>
                <p className="text-gray-700 text-sm line-clamp-3 flex-grow">{book.description}</p>

                <button onClick={()=>{navigate(`/books/${book._id}`)}} className="mt-4 px-4 py-2 text-sm font-medium text-white bg-primary rounded hover:bg-primary/90 transition">
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-20">
            <h2 className="text-4xl font-bold text-gray-700 mb-3">No books found 😕</h2>
            <p className="text-gray-500">Try searching with a different keyword.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
