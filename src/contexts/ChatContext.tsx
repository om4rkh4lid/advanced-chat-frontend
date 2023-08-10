import { ReactNode, createContext, useEffect, useState } from "react";
import { ChatMessage } from "../types/custom/ChatMessage";
import useSocket from "../hooks/useSocket";
import { useAuth } from "../hooks/useAuth";
import { useAppSelector } from "../hooks/useAppSelector";

type ChatContext = {
  activeChatUserId: number;
  setActiveChatUserId: (id: number) => void;
  messages: ChatMessage[];
  appendNewMessage: (message: ChatMessage) => void;
  sendNewMessage: (message: Partial<ChatMessage>) => void;
  getActiveUserChat: () => ChatMessage[];
}

type ChatProps = {
  children: ReactNode;
}

export const ChatContext = createContext<ChatContext>({} as ChatContext);

export const ChatProvider: React.FC<ChatProps> = ({ children }) => {
  const { socket } = useSocket();
  const user = useAppSelector((state) => state.auth.user);
  const [activeChatUserId, setIdForActiveUser] = useState<number>(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const getActiveUserChat = () => {
    return messages.filter(message => message.from === activeChatUserId || message.to === activeChatUserId);
  }

  const setActiveChatUserId = (id: number) => {
    setIdForActiveUser(id);
  }

  const appendNewMessage = (message: ChatMessage) => {
    setMessages(prev => { return [...prev, message] });
  }

  const sendNewMessage = (message: Partial<ChatMessage>) => {
    message.from = user?.id;
    message.to = activeChatUserId;
    socket.emit('chatMessage', message);
  }

  const onNewChatMessage = (message: ChatMessage) => {
    if (activeChatUserId === 0 && message.from !== user?.id) {
      setIdForActiveUser(message.from);
    }
    appendNewMessage(message);
  }

  useEffect(() => {
    socket.on('chatMessage', onNewChatMessage);
    return () => { socket.off('chatMessage', onNewChatMessage) };
  }, []);

  return (
    <ChatContext.Provider value={{ activeChatUserId, setActiveChatUserId, messages, appendNewMessage, sendNewMessage, getActiveUserChat }}>
      {children}
    </ChatContext.Provider>
  );
};
