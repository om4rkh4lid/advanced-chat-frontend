import { styled } from "styled-components";
import { UserChat } from "./UserChat";
import { useAppSelector } from "../hooks/useAppSelector";
import { getAuthenticatedUser } from "../features/auth/AuthSlice";
import { getOnlineUsers } from "../features/chat/ChatSlice";

const StyledConsole = styled.div`
  background-color: blue;
  flex: 1 1 30%;
`

const StyledUser = styled.h1`
  text-align: center;
  color: white;
  height: 70px;
  line-height: 70px;
`;

export const Console: React.FC = () => {
  const user = getAuthenticatedUser();
  const onlineUsers = getOnlineUsers();
  
  return (
    <StyledConsole>
      <StyledUser>User #{user?.id}</StyledUser>
      {onlineUsers?.map( (userId, index) => {
        return <UserChat key={index} userId={userId}></UserChat>
      })}
    </StyledConsole>
  );
}