import { Middleware } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { activeChatSet, onlineUsersUpdated, receivedChatMessage } from "../features/chat/ChatSlice";
import { ChatMessage } from "../types/custom/ChatMessage";
import { Session } from "../types/custom/Session";
import { sessionSet } from "../features/auth/AuthSlice";
import { RootState } from "./store";

export const socketMiddleware: (socket: Socket) => Middleware = (socket) => (store) => (next) => (action) => {
  const { dispatch } = store;
  const { type, payload } = action;
  const state = store.getState() as RootState;

  switch (type) {
    case 'chat/userConnected':
      const authenticatedUser = state.auth.user;

      if (authenticatedUser) {
        socket.auth = {
          userId: authenticatedUser.id
        }
        socket.connect();
      }

      socket.on('sessionCreated', (session: Session) => {
        dispatch(sessionSet({ id: session.sessionId }));
      });

      socket.on('activeUsers', (onlineUsers: number[]) => {
        dispatch(onlineUsersUpdated(onlineUsers));
      });

      socket.on('chatMessage', (message: ChatMessage) => {
        dispatch(receivedChatMessage(message));
      })

      break;

    case 'chat/userDisconnected':
      socket.removeAllListeners();
      socket.disconnect();
      break;

    case 'chat/receivedChatMessage':
      const received = payload as ChatMessage
      if (!state.chat.lastActiveChat && received.from !== state.auth.user?.id) {
        dispatch(activeChatSet(received.from));
      }
      break;

    case 'chat/sentChatMessage':
      const message = payload as Partial<ChatMessage>
      message.from = state.auth.user?.id;
      message.to = state.chat.lastActiveChat;
      socket.emit('chatMessage', message);
      break;
  }

  return next(action)
}