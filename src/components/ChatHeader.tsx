import { styled } from "styled-components";
import profileImgPlaceholder from '../assets/profile-pic.jpeg';
import { useActiveChat } from "../hooks/useActiveChat";

const StyledChatHeader = styled.div`
  background-color: green;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
`;

const StyledProfilePic = styled.img`
  max-height: 80%;
  border-radius: 50%;
`;

const StyledContactInfo = styled.div`
  padding: 0 8px;
`

const StyledContactName = styled.div`
  color: white;
  font-size: 1.25rem;
`

const StyledContactStatus = styled.div`
  color: white;
  font-size: 0.75rem;
  margin-inline-start: 4px;
`

export const ChatHeader: React.FC = () => {
  const { activeChatUserId } = useActiveChat();

  return (
    <StyledChatHeader>
      <StyledProfilePic src={profileImgPlaceholder as string}></StyledProfilePic>
      <StyledContactInfo>
        <StyledContactName>User #{activeChatUserId}</StyledContactName>
        <StyledContactStatus>Typing...</StyledContactStatus>
      </StyledContactInfo>
    </StyledChatHeader>
  );
}