import { styled } from "styled-components";
import { ChatWindow } from "./ChatWindow";

const StyledActiveArea = styled.div`
  flex: 1 1 70%;
`;

export const ActiveArea: React.FC = () => {
  return (
    <StyledActiveArea>
      <ChatWindow></ChatWindow>
    </StyledActiveArea>
  );
}