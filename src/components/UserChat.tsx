import styled from "styled-components";
import profileImage from "../assets/profile-pic.jpeg";
import { useActiveChat } from "../hooks/useActiveChat";

const StyledUserChat = styled.div`
  background-color: rgba(255, 255, 255, 1);
  min-height: 30px;
  display: flex;
  align-items: center;
  padding: 8px;
  gap: 8px;
  cursor: default;
  user-select: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
  
  &:active {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const StyledUserChatImage = styled.img`
  max-height: 50px;
  border-radius: 50%;
`;

type UserChatProps = {
  userId: number;
}

export const UserChat: React.FC<UserChatProps> = ({ userId }) => {
  const { setActiveChatUserId } = useActiveChat();

  const setActiveChat = () => {
    setActiveChatUserId(userId);
  }

  return (
    <StyledUserChat onClick={setActiveChat}>
      <StyledUserChatImage src={profileImage}></StyledUserChatImage>
      <div>
        <h3>User #{userId}</h3>
        <p>lorem ipsum solor amet di...</p>
      </div>
    </StyledUserChat>
  );
}