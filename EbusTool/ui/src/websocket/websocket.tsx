import {io} from 'socket.io-client';

// Connect to server:
const socket = io('http://localhost:8080');

// socket.on takes in any event (at the moment the event is 'connect')
// but we can set it up to work with custom events and other types of events!

socket.on('connect', () => {
  console.log('You have now connected with id: ' + socket.id);
});

export function GetSocket() {
  return socket;
}

export function emitMsg(eventName: string, data: any) {
  // console.log(`Emitting to: ${eventName}: `, data);
  socket.emit(eventName, data);
}
