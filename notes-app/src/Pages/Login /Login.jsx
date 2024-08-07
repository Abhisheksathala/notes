import { useState } from 'react';
import axiosInstance from '../../axiosInstance';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous error message

    try {
      const response = await axiosInstance.post("/api/user/login", form);

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
    <div className="flex justify-center items-center min-h-screen bg-transparent  relative">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg top-0 left-[50%] absolute">
        <form onSubmit={handleSubmit}>
          <h4 className="text-2xl font-bold mb-4 text-center">Login Form</h4>
          {error && (
            <div className="mb-4 text-red-500 text-center">
              {error}
            </div>
          )}
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
          Don't have an account? <a href="/singup" className="text-blue-500">Signup</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
