import React from 'react';
import { FiLogOut } from 'react-icons/fi';

const ProfileInfo = ({ Logout, userinfo, error }) => {

  const getInitials = (name) => {
    if (!name) {
      return "";
    }
    const words = name.split(' ');
    let initials = "";
    for (let i = 0; i < words.length; i++) {
      initials += words[i][0];
    }
    return initials.toUpperCase();
  }

  return (
    <div className="p-2 bg-white rounded-lg shadow-md flex items-center justify-between max-w-xs mx-auto">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold mr-4">
          {getInitials(userinfo?.name || 'User')}
        </div>
        <div className="text-lg font-medium text-gray-800 mr-2">{userinfo?.name}</div>
      </div>
      <button
        onClick={Logout}
        className="px-4 py-2 bg-red-400 text-white rounded-lg flex items-center hover:bg-red-600 focus:outline-none gap-5 focus:ring-2 focus:ring-red-400"
      >
        <FiLogOut className="mr-2" />
        Logout
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}

export default ProfileInfo;
