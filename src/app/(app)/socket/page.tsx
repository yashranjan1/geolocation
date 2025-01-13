"use client"; 


import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Define the URL of the Socket.IO server
const SOCKET_SERVER_URL = 'http://localhost:3001';

// Define custom types for events if needed
interface ServerToClientEvents {
  message: (data: string) => void;
}

interface ClientToServerEvents {
  message: (msg: string) => void;
}

const SocketComponent: React.FC = () => {
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Connect to the socket server
    const socketInstance: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_SERVER_URL);

    // Set the socket instance to state
    setSocket(socketInstance);

    // Listen for "message" events from the server
    socketInstance.on('message', (data: string) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup when the component unmounts
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = (msg: string) => {
    if (socket) {
      socket.emit('message', msg);
    }
  };

  return (
    <div>
      <h1>Socket.IO with TypeScript</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <button onClick={() => sendMessage('Hello from Next.js with TypeScript!')}>
        Send Message
      </button>
    </div>
  );
};

export default SocketComponent;
