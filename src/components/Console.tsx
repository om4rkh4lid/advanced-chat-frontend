import { styled } from "styled-components";
import { UserChat } from "./UserChat";
import { useAppSelector } from "../hooks/useAppSelector";

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
  const user = useAppSelector(state => state.auth.user);
  const onlineUsers = useAppSelector(state => state.chat.onlineUsers);
  
  return (
    <StyledConsole>
      <StyledUser>User #{user?.id}</StyledUser>
      {onlineUsers?.map( (userId, index) => {
        return <UserChat key={index} userId={userId}></UserChat>
      })}
    </StyledConsole>
  );
}