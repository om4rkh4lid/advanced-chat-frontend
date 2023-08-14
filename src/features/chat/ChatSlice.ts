import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ChatMessage } from "../../types/custom/ChatMessage";
import { useAppSelector } from "../../hooks/useAppSelector";

interface ChatState {
  lastActiveChat?: number,
  onlineUsers: number[],
  messages: ChatMessage[]
}

const initialState = () => {
  const state = { 
    onlineUsers: [],
    messages: [],
  } as ChatState;

  return state;
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    userConnected(state) {

    },
    userDisconnected(state) {

    },
    activeChatSet(state, action: PayloadAction<number>) {
      state.lastActiveChat = action.payload;
    },
    onlineUsersUpdated(state, action: PayloadAction<number[]>) {
      state.onlineUsers = action.payload;
    },
    receivedChatMessage(state, action: PayloadAction<ChatMessage>) {
      state.messages.push(action.payload);
    },
    sentChatMessage(state, action: PayloadAction<Partial<ChatMessage>>) {

    }
  }
});

export const { userConnected, userDisconnected, activeChatSet, receivedChatMessage, onlineUsersUpdated, sentChatMessage } = chatSlice.actions;
export default chatSlice.reducer;

export const getLastActiveChatUser = () => useAppSelector(state => state.chat.lastActiveChat);
export const getActiveChatMessages = () => useAppSelector(state => state.chat.messages.filter(msg => msg.from === state.chat.lastActiveChat || msg.to === state.chat.lastActiveChat));
export const getOnlineUsers = () => useAppSelector(state => state.chat.onlineUsers.filter(user => state.auth.user && user !== state.auth.user?.id))