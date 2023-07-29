import { styled } from "styled-components";
import useSocket from "../hooks/useSocket";
import { UserChat } from "./UserChat";

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
  const { userId, activeUsers } = useSocket();
  
  return (
    <StyledConsole>
      <StyledUser>User #{userId}</StyledUser>
      {activeUsers?.map( userId => {
        return <UserChat userId={userId}></UserChat>
      })}
    </StyledConsole>
  );
}