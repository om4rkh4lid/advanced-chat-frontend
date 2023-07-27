import { styled } from "styled-components";
import { ChatHeader } from "./ChatHeader";
import { ActiveChat } from "./ActiveChat";
import { MessageInput } from "./MessageInput";

const StyledChatWindow = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ChatWindow: React.FC = () => {
  return (
    <StyledChatWindow>
      <ChatHeader></ChatHeader>
      <ActiveChat></ActiveChat>
      <MessageInput></MessageInput>
    </StyledChatWindow>
  );
};