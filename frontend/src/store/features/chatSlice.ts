import { createSlice } from '@reduxjs/toolkit';
import { getMessages, sendMessage, getUsers } from '../api/chatApi';


// Define the initial state of the chat slice
const initialState = {
    messages: [] as Array<{ id: string; content: string; senderId: string; createdAt: string }>,
    users:[] as Array<{ id: string; name: string; email: string }>,
    loading: false,
    error: null as string | null,
  };
const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //getUsers
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //getMessages
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //sendMessage
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default chatSlice.reducer;