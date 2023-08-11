import { styled } from "styled-components";
import { ChatWindow } from "./ChatWindow";
import { useAppSelector } from "../hooks/useAppSelector";

const StyledActiveArea = styled.div`
  flex: 1 1 70%;
`;

export const ActiveArea: React.FC = () => {
  const activeChatUserId = useAppSelector(state => state.chat.lastActiveChat);

  return (
    <StyledActiveArea>
      { activeChatUserId && <ChatWindow></ChatWindow> }
    </StyledActiveArea>
  );
}