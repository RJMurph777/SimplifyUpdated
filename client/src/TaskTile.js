import React from 'react';

function TaskTile({ title, status }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '16px',
      marginBottom: '12px',
      borderRadius: '8px',
      background: '#f9f9f9'
    }}>
      <h3>{title}</h3>
      <p>Status: {status}</p>
    </div>
  );
}

export default TaskTile;
