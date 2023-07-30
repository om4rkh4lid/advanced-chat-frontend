import styled from "styled-components";
import { ActiveArea } from "../components/ActiveArea";
import { Console } from "../components/Console";
import { SocketProvider } from "../contexts/SocketContext";
import { ChatProvider } from "../contexts/ChatContext";


const StyledChatPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

export const ChatPage: React.FC = () => {
  return (
    <SocketProvider>
      <ChatProvider>
        <StyledChatPage>
          <Console></Console>
          <ActiveArea></ActiveArea>
        </StyledChatPage>
      </ChatProvider>
    </SocketProvider>
  );
}