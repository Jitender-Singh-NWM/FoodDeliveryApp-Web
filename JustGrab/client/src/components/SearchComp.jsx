import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";


// Sample data




const BookSearch = ({ data, index }) => {
  
    const books = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  
  var filteredBooks='';
  // Filter books based on search term
  if(books){
   filteredBooks =  books.filter(
    book =>
      book.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.product_price.toLowerCase().includes(searchTerm.toLowerCase())
  );
  }
  

  return (
    <div className="p-4">
      <input 
        type="text"
        placeholder="Search by Dishes here"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"

      />
      
      <ul>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {searchTerm.length >0 ? filteredBooks.length > 0 ? (filteredBooks.map(book => (
                        <div key={book.id} className="bg-white overflow-hidden shadow rounded-lg">
                          
                        <img src={book.imageURL} alt={book.title} className="w-full h-48 object-cover rounded-t-lg"/>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold">{book.product_name}</h3>
                          <p className="text-gray-600"> for  ${book.product_price}</p>
                          
                        </div>
                      </div>
        ))) : (
            <li>No Product found.</li>
          ) : (
            <li>Start Searching.</li>
          ) }
          </div>
      </ul>
      
    </div>
  );
};

export default BookSearch;
