import { styled } from "styled-components";
import { getAuthenticatedUser } from "../features/auth/AuthSlice";
import { getActiveChatMessages } from "../features/chat/selectors";

const StyledChat = styled.div`
  background-color: white;
  border-left: 1px solid green;
  flex: 1;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const ChatMessage = styled.p`
color: white;
padding: 8px;
margin: 1px 0;
border-radius: 4px;
max-width: max-content;
`
const SentChatMessage = styled(ChatMessage)`
  background-color: blue;
  align-self: end;
`;

const ReceivedChatMessage = styled(ChatMessage)`
  background-color: green;
  align-self: start;
`;

export const ActiveChat: React.FC = () => {
  const user = getAuthenticatedUser();
  const messages = getActiveChatMessages();

  return (
    <StyledChat>
      {messages.map((message, index) => {
        return user && message.from === user?.id 
        ? <SentChatMessage key={index}>{message.text}</SentChatMessage>
        : <ReceivedChatMessage key={index}>{message.text}</ReceivedChatMessage>
      })}
    </StyledChat>
  );
}