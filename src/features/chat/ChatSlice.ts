import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit"
import { ChatMessage } from "../../types/custom/ChatMessage";


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

