
import React, { useEffect, useState } from 'react';
import TaskTile from './TaskTile';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('https://simplify-backend-k0ni.onrender.com/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => {
        console.error('❌ Failed to fetch tasks from backend:', err);
      });
  }, []);

  return (
    <div style={{ padding: '24px' }}>
      <h1>Project Simplify Dashboard</h1>
      <p>Welcome to your new task-based email platform.</p>
      {tasks.length === 0 ? (
        <p>Loading tasks...</p>
      ) : (
        tasks.map((task, index) => (
          <TaskTile key={index} title={task.title} status={task.status} />
        ))
      )}
    </div>
  );
}

export default App;
