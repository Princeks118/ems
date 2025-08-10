import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [category, setCategory] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    const newTask = {
      title: taskTitle,
      description: taskDescription,
      dueDate: taskDate,
      category: category,
      status: 'new',
      assignedTo: assignedTo,
    };

    try {
      await axios.post('http://localhost:5000/tasks', newTask);

      const res = await axios.get('http://localhost:5000/users');
      setUserData(res.data);

      alert("Task added successfully!");
      setTaskTitle('');
      setTaskDescription('');
      setTaskDate('');
      setCategory('');
      setAssignedTo('');
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <div className='bg-gray-800 p-4 rounded-md mb-4'>
      <h2 className='text-white mb-2'>Create New Task</h2>
      <form onSubmit={submitHandler} className='flex flex-col gap-3'>
        <input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder='Task Title' required className='p-2 rounded' />
        <input value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} placeholder='Task Description' required className='p-2 rounded' />
        <input value={taskDate} onChange={(e) => setTaskDate(e.target.value)} type='date' required className='p-2 rounded' />
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Category' required className='p-2 rounded' />
        <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required className='p-2 rounded'>
          <option value=''>Assign To</option>
          {userData.map(user => (
            <option key={user.id} value={user.name}>{user.name}</option>
          ))}
        </select>
        <button type='submit' className='bg-blue-600 text-white py-2 rounded hover:bg-blue-700'>Create Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
