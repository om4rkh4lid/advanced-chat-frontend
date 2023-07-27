import { styled } from "styled-components";
import { useState } from "react";
import useSocket from "../hooks/useSocket";
import { useAuth } from "../hooks/useAuth";

const StyledMessageInput = styled.div`
  background-color: green;
  min-height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
`;

const StyledMessageTextInput = styled.input.attrs(_=> ({
  type: 'text'
}))`
  flex: 19;
  font-size: 16px;
  padding: 0 4px;
`

const SendButton = styled.button`
  flex: 1;
`

const StyledInputsContainer = styled.div`
  width: 100%;
  min-height: 2.5rem;
  display: flex;
  gap: 8px;
`

export const MessageInput: React.FC = () => {
  const { socket } = useSocket();
  const { userId } = useAuth();
  const [messageText, setMessageText] = useState("")
  
  const clearMessageText = () => {
    setMessageText("");
  }

  const sendMessage = () => {
    socket.emit("chatMessage", {
      text: messageText,
      from: userId,
      to: 35,
    }, (serverAck: any) => {
      console.log("message received:", serverAck);
    })
    clearMessageText();
  }

  return (
    <StyledMessageInput>
      <StyledInputsContainer>
        <StyledMessageTextInput value={messageText} onChange={e => setMessageText(e.target.value)}></StyledMessageTextInput>
        <SendButton onClick={sendMessage}>Send</SendButton>
      </StyledInputsContainer>
    </StyledMessageInput>
  );
}