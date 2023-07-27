import { styled } from "styled-components";
import { ChatHeader } from "./ChatHeader";
import { Chat } from "./Chat";
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
      <Chat></Chat>
      <MessageInput></MessageInput>
    </StyledChatWindow>
  );
};