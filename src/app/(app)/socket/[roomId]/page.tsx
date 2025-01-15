"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';

export default function ChatRoom() {
  const { roomId } = useParams();  
  const room = roomId as string;

  const { data: session } = useSession(); // Get user session
  const role = session?.user.role; // Get role from session

  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (!room || !role) return; // Wait until room and role are available

    // Initialize the socket connection
    const newSocket = io('http://localhost:3001'); // Replace with your server's URL if needed
    setSocket(newSocket);

    // Join the room with role
    newSocket.emit('init', { room, role });

    // Handle incoming messages
    newSocket.on('recv-location', (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Handle error events
    newSocket.on('error', (error: string) => {
      alert(error);
      newSocket.disconnect(); // Disconnect if an error occurs
      setSocket(null); // Clear socket state
    });

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [room, role]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    socket?.emit('send-location', { room, message });
    setMessage(''); // Clear the input field
  };

  if (!session) {
    return <div>Please sign in to chat</div>;
  }

  return (
    <div>
      <h1>Chat Room: {room}</h1>
      <h2>Role: {role}</h2>

      {/* Chat Messages */}
      <div style={{ marginTop: '20px' }}>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg}</strong>
            </li>
          ))}
        </ul>
      </div>

      {/* Message Input */}
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}
