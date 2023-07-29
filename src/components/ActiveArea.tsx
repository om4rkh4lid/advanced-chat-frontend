import { styled } from "styled-components";
import { ChatWindow } from "./ChatWindow";
import { useActiveChat } from "../hooks/useActiveChat";

const StyledActiveArea = styled.div`
  flex: 1 1 70%;
`;

export const ActiveArea: React.FC = () => {
  const { activeChatUserId } = useActiveChat();
  return (
    <StyledActiveArea>
      { activeChatUserId !== 0 && <ChatWindow></ChatWindow> }
    </StyledActiveArea>
  );
}