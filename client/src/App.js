
import React, { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleLogin = () => {
    if (email.trim()) {
      setUser({ email });
    }
  };

  useEffect(() => {
    if (user) {
      fetch('https://simplify-backend-k0ni.onrender.com/tasks')
        .then(response => response.json())
        .then(data => setTasks(data))
        .catch(error => console.error('Error fetching tasks:', error));
    }
  }, [user]);

  if (!user) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
        <h1>Project Simplify Login</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ padding: '0.5rem', fontSize: '1rem', marginRight: '1rem' }}
        />
        <button onClick={handleLogin} style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Welcome, {user.email}</h1>
      <h2>Project Simplify Dashboard</h2>
      {tasks.map((task, index) => (
        <div key={index} style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1rem',
          backgroundColor: '#f9f9f9'
        }}>
          <h3>{task.title}</h3>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
