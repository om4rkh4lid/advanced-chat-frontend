import { styled } from "styled-components";
import useSocket from "../hooks/useSocket";
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
  const { activeUsers } = useSocket();
  const user = useAppSelector(state => state.auth.user);
  
  return (
    <StyledConsole>
      <StyledUser>User #{user?.id}</StyledUser>
      {activeUsers?.map( (userId, index) => {
        return <UserChat key={index} userId={userId}></UserChat>
      })}
    </StyledConsole>
  );
}