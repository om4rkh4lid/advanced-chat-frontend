import { styled } from "styled-components";
import useSocket from "../hooks/useSocket";

const StyledConsole = styled.div`
  background-color: blue;
  flex: 1 1 30%;
`

export const Console: React.FC = () => {
  const activeUsers = [] as number[];
  const { userId } = useSocket();

  return (
    <StyledConsole>
      <h1>I am {userId}</h1>
      <h1>Online Users</h1>
      {activeUsers?.map( userId => {
        return <p>User {userId}</p>
      })}
    </StyledConsole>
  );
}