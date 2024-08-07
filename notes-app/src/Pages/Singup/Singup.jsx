import React, { useState } from 'react'
import axiosInstance from '../../axiosInstance'

const Singup = () => {

  const [form,setFrom] = useState({
    email:'',
    password:'',
    name:"",
  })
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFrom({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error message
  
    try {
      const response = await axiosInstance.post("/api/user/register", form);
  
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        window.location.href = "/";
        alert(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen relative ">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg absolute top-0  left-[50%]">
        <form onSubmit={handleSubmit}>
          <h4 className="text-2xl font-bold mb-4 text-center">singUp Form</h4>
          {error && (
            <div className="mb-4 text-red-500 text-center">
              {error}
            </div>
          )}
          <div className="mb-4">
            <input
              type="text"
              onChange={handleChange}
              value={form.name}
              name="name"
              required
              placeholder="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              onChange={handleChange}
              value={form.email}
              name="email"
              required
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              onChange={handleChange}
              value={form.password}
              name="password"
              required
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <a href="/login" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Singup