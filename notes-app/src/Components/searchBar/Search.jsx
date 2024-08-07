import React, { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'; // Import icons

const SearchBar = () => {
  const [form, setForm] = useState({
    name: ""
  });

  const [searchQuery, setSearchQuery] = useState('');

  const onHandleChange = (event) => {
    setForm({ ...form, name: event.target.value });
  };

  const onHandleClear = () => {
    setForm({ ...form, name: "" });
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(form.name); // Set the search query when the form is submitted
    // Implement search logic here
    setForm({...form,name:''})
    console.log("Searching for:", form.name);
  };

  return (
    <div className="flex justify-center mt-8">
      <form onSubmit={onHandleSubmit} className="relative w-full max-w-md flex items-center">
        <input
          type="search"
          placeholder="Search notes..."
          value={form.name}
          onChange={onHandleChange}
          className="block w-full px-4 py-2 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {form.name ? (
          <button
            type="button"
            onClick={onHandleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <XMarkIcon className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
          </button>
        ) : (
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
          </button>
        )}
      </form>
      
    </div>
  );
};

export default SearchBar;
