import { styled } from "styled-components";
import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

const StyledChat = styled.div`
  background-color: white;
  flex: 1;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 16px 24px;
`;

const ChatMessage = styled.p`
  background-color: green;
  color: white;
  padding: 8px;
  margin: 1px 0;
  border-radius: 4px;
  max-width: max-content;
`

export const Chat: React.FC = () => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState([] as string[]);

  const onNewMessage = (message: any) => {
    setMessages(prev => {
      return [...prev, message.text];
    })
  }

  useEffect(() => {
    socket.on('chatMessage', onNewMessage)
    return () => { socket.off('chatMessage', onNewMessage) }
  }, []);

  return (
    <StyledChat>
      {messages.map((message, index) => <ChatMessage key={index}>{message}</ChatMessage>)}
    </StyledChat>
  );
}