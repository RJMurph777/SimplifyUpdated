// App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import { Button } from '@/components/ui/button';

function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/user')
      .then((res) => {
        if (!res.ok) throw new Error('Not logged in');
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => {
        window.location.href = '/api/auth/google';
      });
  }, []);

  useEffect(() => {
    if (user) {
      fetch('/api/gmail/messages')
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch Gmail messages');
          return res.json();
        })
        .then((data) => {
          setMessages(data);
          if (!data.length) setError('No Gmail messages returned.');
        })
        .catch((err) => {
          console.error(err);
          setError('Error loading Gmail messages.');
        });
    }
  }, [user]);

  const signOut = () => {
    window.location.href = '/api/logout';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl p-4">
        <h1 className="text-2xl font-bold mb-6">Simplify</h1>
        <ul className="space-y-4">
          <li className="text-blue-600 font-semibold">Inbox</li>
          <li>Today</li>
          <li>Delegated</li>
          <li>Completed</li>
        </ul>
        <div className="mt-8">
          {user && (
            <>
              <p className="text-sm text-gray-600">{user.email}</p>
              <Button onClick={signOut} className="mt-2 w-full">Logout</Button>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Inbox Tasks</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {user && messages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {messages.map((msg) => (
              <div key={msg.id} className="rounded-2xl shadow p-4 bg-white cursor-pointer border-l-4 border-blue-500">
                <h3 className="font-semibold text-lg truncate">{msg.subject}</h3>
                <p className="text-sm text-gray-600 truncate">From: {msg.from}</p>
                <p className="text-sm text-gray-500 mt-2">{msg.snippet}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
