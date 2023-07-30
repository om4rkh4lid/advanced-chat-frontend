import { styled } from "styled-components";
import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import { useChat } from "../hooks/useChat";

const StyledChat = styled.div`
  background-color: white;
  border-left: 1px solid green;
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

export const ActiveChat: React.FC = () => {
  const { messages } = useChat();

  return (
    <StyledChat>
      {messages.map((message, index) => <ChatMessage key={index}>{message.text}</ChatMessage>)}
    </StyledChat>
  );
}