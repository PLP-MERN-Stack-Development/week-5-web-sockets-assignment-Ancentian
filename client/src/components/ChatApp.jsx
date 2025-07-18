import React, { useEffect, useState } from 'react';
import { useSocket } from '../socket/socket';

export default function ChatApp() {
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);
  const { connect, sendMessage, messages, users, typingUsers, setTyping } = useSocket();

  const handleJoin = () => {
    if (username.trim()) {
      connect(username.trim());
      setJoined(true);
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim());
      setInput('');
      setTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {!joined ? (
          <div className="bg-gray-800 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Join Chat</h2>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleJoin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
            >
              Join
            </button>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center">Chat Room</h2>
            <div className="h-64 overflow-y-auto bg-gray-700 p-4 rounded mb-4 border border-gray-600">
              {messages.map((msg) => (
                <div key={msg.id} className="mb-2">
                  <span className="font-semibold text-blue-400">{msg.sender || 'System'}</span>:
                  <span className="ml-2">{msg.message}</span>
                  <span className="block text-sm text-gray-400">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setTyping(true);
                }}
                onBlur={() => setTyping(false)}
                placeholder="Type your message"
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold transition duration-200"
              >
                Send
              </button>
            </div>

            {typingUsers.length > 0 && (
              <div className="mt-2 text-sm italic text-gray-400">
                {typingUsers.join(', ')} typing...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
