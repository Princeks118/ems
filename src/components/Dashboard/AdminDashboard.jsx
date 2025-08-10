import React, { useEffect, useState } from 'react';
import Header from '../other/Header';
import CreateTask from '../other/CreateTask';
import AllTask from '../other/AllTask';
import API from "../../api/api";
 // centralized API import

const AdminDashboard = ({ changeUser }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await API.get('/tasks');
        setTasks(res.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="h-screen w-full p-7">
      <Header changeUser={changeUser} />
      <CreateTask onTaskCreated={() => {
        // Task create hone ke baad list refresh
        API.get('/tasks').then(res => setTasks(res.data));
      }} />
      <AllTask data={tasks} />
    </div>
  );
};

export default AdminDashboard;
