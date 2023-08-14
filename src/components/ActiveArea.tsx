import { styled } from "styled-components";
import { ChatWindow } from "./ChatWindow";
import { useAppSelector } from "../hooks/useAppSelector";
import { getLastActiveChatUser } from "../features/chat/ChatSlice";

const StyledActiveArea = styled.div`
  flex: 1 1 70%;
`;

export const ActiveArea: React.FC = () => {
  const activeChatUserId = getLastActiveChatUser();

  return (
    <StyledActiveArea>
      { activeChatUserId && <ChatWindow></ChatWindow> }
    </StyledActiveArea>
  );
}