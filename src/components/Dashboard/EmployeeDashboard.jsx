import React, { useEffect, useState, useContext } from 'react';
import Header from '../other/Header';
import TaskListNumbers from '../other/TaskListNumbers';
import TaskList from '../TaskList/TaskList';
import API from "../../api/api";
import { AuthContext } from '../../context/AuthProvider'; // maan ke chal rahe hain ke yeh hai

const EmployeeDashboard = ({ changeUser }) => {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext); // current logged-in employee

  useEffect(() => {
    if (!user || !user.name) return; // agar user info nahi mila to skip

    const fetchEmployeeTasks = async () => {
      try {
        const res = await API.get(`/tasks?assignedTo=${encodeURIComponent(user.name)}`);
        setData(res.data);
      } catch (error) {
        console.error('Error fetching employee tasks:', error);
      }
    };

    fetchEmployeeTasks();
  }, [user]);

  return (
    <div className="p-10 bg-[#1C1C1C] h-screen">
      <Header changeUser={changeUser} data={data} />
      <TaskListNumbers data={data} />
      <TaskList data={data} />
    </div>
  );
};

export default EmployeeDashboard;
