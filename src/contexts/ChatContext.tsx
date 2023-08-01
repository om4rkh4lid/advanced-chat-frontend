import { ReactNode, createContext, useEffect, useState } from "react";
import { ChatMessage } from "../types/custom/ChatMessage";
import useSocket from "../hooks/useSocket";
import { useAuth } from "../hooks/useAuth";

type ChatContext = {
  activeChatUserId: number;
  setActiveChatUserId: (id: number) => void;
  messages: ChatMessage[];
  appendNewMessage: (message: ChatMessage) => void;
  sendNewMessage: (message: Partial<ChatMessage>) => void;
}

type ChatProps = {
  children: ReactNode;
}

export const ChatContext = createContext<ChatContext>({} as ChatContext);

export const ChatProvider: React.FC<ChatProps> = ({ children }) => {
  const { socket } = useSocket();
  const { userId } = useAuth();
  const [activeChatUserId, setIdForActiveUser] = useState<number>(0);
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const setActiveChatUserId = (id: number) => {
    if (activeChatUserId !== 0) {
      clearMessages();
    }
    setIdForActiveUser(id);
  }

  const clearMessages = () => {
    setMessages([]);
  }

  const appendNewMessage = (message: ChatMessage) => {
    setMessages(prev => { return [...prev, message] });
  }

  const sendNewMessage = (message: Partial<ChatMessage>) => {
    console.log(message);
    message.from = userId;
    message.to = activeChatUserId;
    socket.emit('chatMessage', message);
  }

  const onNewChatMessage = (message: ChatMessage) => {
    console.log(message);
    if (activeChatUserId === 0 && message.from !== userId) {
      setIdForActiveUser(message.from);
    }
    appendNewMessage(message);
  }

  useEffect(() => {
    socket.on('chatMessage', onNewChatMessage);
    return () => { socket.off('chatMessage', onNewChatMessage) };
  }, []);

  return (
    <ChatContext.Provider value={{ activeChatUserId, setActiveChatUserId, messages, appendNewMessage, sendNewMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
