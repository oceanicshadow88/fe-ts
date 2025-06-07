import { io, Socket } from 'socket.io-client';
import { useEffect } from 'react';
import config from '../config/config';

const socket: Socket = io(config.socketUrl, {
  autoConnect: false,
  withCredentials: false
});

const RegisterRetroSocketHandler = (sprintId: string) => {
  useEffect(() => {
    socket.connect();
    socket.emit('join_retro_sprint_room', sprintId);

    return () => {
      socket.disconnect();
    };
  }, [sprintId]);
};

export { socket, RegisterRetroSocketHandler };
