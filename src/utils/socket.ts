import { io, Socket } from 'socket.io-client';
import config from '../config/config';

const socket: Socket = io(config.socketUrl, {
  autoConnect: false,
  withCredentials: false
});

const onRetroRoomJoin = (sprintId: string) => {
  socket.connect();
  socket.emit('join_retro_sprint_room', sprintId);
};

const onRetroRoomLeave = () => {
  socket.disconnect();
};

const onRetroItemChange = (fetchRetoItemHandler: (sprintId: string) => void) => {
  socket.on('retro_item_updated', (sprintId) => {
    fetchRetoItemHandler(sprintId);
  });
};

const onRetroItemBroadcast = (sprintId: string) => {
  socket.emit('retro_item_boardcast', sprintId);
};

export { socket, onRetroRoomJoin, onRetroRoomLeave, onRetroItemChange, onRetroItemBroadcast };
