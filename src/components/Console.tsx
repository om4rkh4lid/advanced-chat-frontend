import { styled } from "styled-components";
import useSocket from "../hooks/useSocket";
import { UserChat } from "./UserChat";

const StyledConsole = styled.div`
  background-color: blue;
  border: 1px solid blue;
  flex: 1 1 30%;
`

export const Console: React.FC = () => {
  const { userId, activeUsers } = useSocket();
  
  return (
    <StyledConsole>
      <h1>I am {userId}</h1>
      {activeUsers?.map( userId => {
        return <UserChat userId={userId}></UserChat>
      })}
    </StyledConsole>
  );
}