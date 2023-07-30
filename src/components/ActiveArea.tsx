import { styled } from "styled-components";
import { ChatWindow } from "./ChatWindow";
import { useChat } from "../hooks/useChat";
import useSocket from "../hooks/useSocket";

const StyledActiveArea = styled.div`
  flex: 1 1 70%;
`;

export const ActiveArea: React.FC = () => {
  const { activeChatUserId } = useChat();

  return (
    <StyledActiveArea>
      { activeChatUserId !== 0 && <ChatWindow></ChatWindow> }
    </StyledActiveArea>
  );
}