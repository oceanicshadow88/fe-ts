import { io, Socket } from 'socket.io-client';
import { useEffect } from 'react';
import config from '../config/config';

const socket: Socket = io(config.socketUrl, {
  autoConnect: false,
  withCredentials: false
});

const useProjectSocket = (projectId: string) => {
  useEffect(() => {
    socket.connect();
    socket.emit('join_project', projectId);

    return () => {
      socket.disconnect();
    };
  }, [projectId]);
};

export { socket, useProjectSocket };
