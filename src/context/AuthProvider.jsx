import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/user/me', {
      withCredentials: true,
    })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setUserData(null);
        } else {
          console.error(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  return (
    <AuthContext.Provider value={{ userData, setUserData, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
