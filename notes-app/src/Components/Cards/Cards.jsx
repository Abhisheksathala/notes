import React from 'react';
import { MdOutlinePushPin } from 'react-icons/md';

const Cards = ({
  title,
  date,
  content,
  tags,
  ispinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4 w-full sm:w-96 transform transition-transform hover:scale-105">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-20 rounded-lg shadow-md"></div>
        <div className="relative z-10 p-4">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <div>
              <h6 className="text-lg font-semibold">{title}</h6>
              <span className="text-sm text-gray-500">{date}</span>
            </div>
            <MdOutlinePushPin 
              onClick={onPinNote} 
              className={`cursor-pointer ${ispinned ? 'text-yellow-500' : 'text-gray-500'}`} 
            />
          </div>
          <p className="text-gray-700 mb-2">{content?.slice(0, 60)}...</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={onEdit} 
              className="text-blue-500 hover:underline"
            >
              Edit
            </button>
            <button 
              onClick={onDelete} 
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
