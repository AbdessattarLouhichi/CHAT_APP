import axios from '../../config/axios_config'
import { createAsyncThunk } from '@reduxjs/toolkit'


// Thunk get messages
export const getMessages = createAsyncThunk(
    'chat/getMessages',
    async (userToChatId: string, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/messages/${userToChatId}`);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }
  );



// Thunk Send message
export const sendMessage = createAsyncThunk(
    'chat/postMessage',
    async ({ userToChatId, message }: { userToChatId: string; message: { content: string; senderId: string } }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`/send/${userToChatId}`, message);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }

  );

// Thunk get users
export const getUsers = createAsyncThunk(
  'chat/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/users');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Subscribe to messages (using WebSocket or Socket.io)
export const subscribeToMessages = (socket: any, chatId: string, callback: (message: any) => void) => {
  socket.emit('joinChat', chatId); // Join the chat room
  socket.on('newMessage', callback); // Listen for new messages
};

// Unsubscribe from messages
export const unsubscribeFromMessages = (socket: any, chatId: string) => {
  socket.emit('leaveChat', chatId); // Leave the chat room
  socket.off('newMessage'); // Remove the listener for new messages
};