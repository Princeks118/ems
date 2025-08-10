import React from 'react';

const TaskListNumbers = ({ data }) => {
  const totalTasks = data?.tasks?.length || 0;
  const completedTasks = data?.tasks?.filter(task => task.status === 'Completed')?.length || 0;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className='text-white mb-4'>
      <h2 className='text-lg mb-2'>Your Task Summary</h2>
      <div className='flex gap-4'>
        <div>Total: {totalTasks}</div>
        <div>Completed: {completedTasks}</div>
        <div>Pending: {pendingTasks}</div>
      </div>
    </div>
  );
};

export default TaskListNumbers;
