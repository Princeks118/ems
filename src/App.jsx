import React, { useContext, useEffect, useState } from 'react';
import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { AuthContext } from './context/AuthProvider';


const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userData, setUserData] = useContext(AuthContext);

  // Run once to initialize localStorage (remove or comment after first run)
  useEffect(() => {
    // setLocalStorag // ⚠️ comment this after 1st use
  }, []);

  // Load logged-in user from localStorage
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData.role);
      setLoggedInUserData(userData.data);
    }
  }, []);

  const handleLogin = (email, password) => {
    // Admin Login
    if (email === 'inder@me.com' && password === '123') {
      const adminUser = {
        firstName: 'Inder',
        email: 'inder@me.com',
        role: 'admin',
      };
      setUser('admin');
      setLoggedInUserData(adminUser);
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin', data: adminUser }));
    }

    // Employee Login (only after userData is available)
    else if (userData && Array.isArray(userData)) {
      const employee = userData.find((e) => e.email === email && e.password === password);
      if (employee) {
        setUser('employee');
        setLoggedInUserData(employee);
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employee }));
      } else {
        alert('Invalid Credentials');
      }
    }

    // If employee data not yet loaded
    else {
      alert('Please wait... employee data is still loading.');
    }

    // Debug: Log current employee data
    console.log("Employee data: ", userData);
  };

  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : null}
      {user === 'admin' ? (
        <AdminDashboard changeUser={setUser} />
      ) : user === 'employee' ? (
        <EmployeeDashboard changeUser={setUser} data={loggedInUserData} />
      ) : null}
    </>
  );
};

export default App;
