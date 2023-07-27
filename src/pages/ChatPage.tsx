import styled from "styled-components";
import { ActiveArea } from "../components/ActiveArea";
import { Console } from "../components/Console";
import { SocketProvider } from "../contexts/SocketContext";


const StyledChatPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

export const ChatPage: React.FC = () => {
  return (
    <SocketProvider>
      <StyledChatPage>
        <Console></Console>
        <ActiveArea></ActiveArea>
      </StyledChatPage>
    </SocketProvider>
  );
}