import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';

const Tags = ({ setTags, tags }) => {
  const [inputValue, setInputValue] = useState({ 
    name: '' 
  });

  const handleInputChange = (e) => {
    setInputValue({ ...inputValue, name: e.target.value });
  };

  const handleAddTags = (e) => {
    e.preventDefault();
    if (inputValue.name.trim()) {
      const newTags = [...tags, ...inputValue.name.split(',').map(tag => tag.trim())];
      setTags(newTags);
      setInputValue({ name: '' });
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue.name}
          onChange={handleInputChange}
          placeholder="Enter tags separated by commas"
          className="flex-grow border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTags}
          className="ml-2 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
          >
            {tag}
            <button 
              onClick={() => handleRemoveTag(index)} 
              className="ml-1 text-blue-800 hover:text-blue-900 focus:outline-none"
            >
              <MdClose />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tags;
