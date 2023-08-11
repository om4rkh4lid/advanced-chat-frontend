import styled from "styled-components";
import { ActiveArea } from "../components/ActiveArea";
import { Console } from "../components/Console";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { userConnected, userDisconnected } from "../features/chat/ChatSlice";


const StyledChatPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

export const ChatPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userConnected());
    return () => { dispatch(userDisconnected()) }
  }, []);

  return (
    <StyledChatPage>
      <Console></Console>
      <ActiveArea></ActiveArea>
    </StyledChatPage>
  );
}