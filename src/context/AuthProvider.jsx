import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <AuthContext.Provider value={[userData, setUserData]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
