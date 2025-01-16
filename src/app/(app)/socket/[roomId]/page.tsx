"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';

interface LocationData {
  latitude: number;
  longitude: number;
}

export default function ChatRoom() {
  const { roomId } = useParams();
  const room = roomId as string;

  const { data: session } = useSession();
  const role = session?.user.role;

  const [socket, setSocket] = useState<Socket | null>(null);
  const [location, setLocation] = useState<LocationData[]>([]);

  useEffect(() => {
    if (!room || !role) return;

    const socketServerUrl = process.env.NEXT_PUBLIC_SOCKETSERVER_URL;
    if (!socketServerUrl) {
      console.error('Please set the NEXT_PUBLIC_SOCKETSERVER_URL environment variable.');
      return;
    }

    console.log('Connecting to socket server...', socketServerUrl);
    const newSocket = io(socketServerUrl);
    setSocket(newSocket);

    newSocket.emit('init', { room, role });


    newSocket.on('recv-location', ({ latitude, longitude }: LocationData) => {
      console.log('Received location:', { latitude, longitude });
      setLocation((prevData) => [...prevData, { latitude, longitude }]);
    });


    newSocket.on('error', (error: string) => {
      alert(error);
      newSocket.disconnect();
      setSocket(null);
    });


    let locationInterval: NodeJS.Timer;
    if (navigator.geolocation) {
      locationInterval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log('Sending location:', { latitude, longitude });
            newSocket.emit('send-location', { room, latitude, longitude });
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      }, 10000);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }


    return () => {
      newSocket.disconnect();
    };
  }, [room, role]);

  if (!session) {
    return <div>Please sign in to chat</div>;
  }

  return (
    <div>
      <h1>Chat Room: {room}</h1>
      <h2>Role: {role}</h2>

      {/* Display Received Locations */}
      <div style={{ marginTop: '20px' }}>
        <ul>
          {location.map(({ latitude, longitude }, index) => (
            <li key={index}>
              <strong>Latitude:</strong> {latitude}, <strong>Longitude:</strong> {longitude}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
