import React, { useState } from 'react';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-black to-gray-800">
      
      {/* App Name */}
     <h1 className="text-white text-5xl font-bold italic tracking-widest mb-12 drop-shadow-md animate-fade-slide">
  WorkSphere Pro
</h1>


      {/* Login Box */}
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome Back 👋</h2>
        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-md transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
