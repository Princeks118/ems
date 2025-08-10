import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const AllTask = () => {
  const [userData] = useContext(AuthContext);

  return (
    <div className='bg-gray-900 text-white p-4 rounded-md'>
      <h2 className='text-lg mb-4'>All Users Task Summary</h2>
      <div className='space-y-2'>
        {userData?.map((user) => (
          <div key={user.id} className='border-b border-gray-700 pb-2'>
            <h3 className='font-semibold'>{user.name}</h3>
            <p>Department: {user.department}</p>
            <p>Status: {user.status}</p>
            <p>Task Count: {user.tasks?.length || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTask;
