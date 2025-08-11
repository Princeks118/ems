import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../other/Header';
import CreateTask from '../other/CreateTask';
import AllTask from '../other/AllTask';

const AdminDashboard = ({ changeUser }) => {
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks/get', {
        withCredentials: true,
      });
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="h-screen w-full p-7">
      <Header changeUser={changeUser} />
      <CreateTask onTaskCreated={fetchTasks} /> 
      <AllTask data={tasks} />
    </div>
  );
};

export default AdminDashboard;
