import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { AuthContext } from './context/AuthProvider';

axios.defaults.withCredentials = true;

const App = () => {
  const { userData, setUserData, loading } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  useEffect(() => {
    if (userData?.role) {
      setRole(userData.role);
    } else {
      setRole(null);
    }
  }, [userData]);

  const handleLogin = async (email, password) => {
    try {
      await axios.post(
        'http://localhost:5000/api/user/login',
        { email, password },
        { withCredentials: true }
      );
      const res = await axios.get('http://localhost:5000/api/user/me', {
        withCredentials: true,
      });
      setUserData(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/user/logout', {}, { withCredentials: true });
      setUserData(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <>
      {!role ? (
        <Login handleLogin={handleLogin} />
      ) : role === 'admin' ? (
        <AdminDashboard changeUser={handleLogout} />
      ) : role === 'employee' ? (
        <EmployeeDashboard changeUser={handleLogout} data={userData} />
      ) : null}
    </>
  );
};

export default App;
