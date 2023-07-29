import { useEffect, useId, useState } from "react"
import { useNavigate } from "react-router-dom"
import { styled } from "styled-components"
import { useAuth } from "../hooks/useAuth"

const StyledLoginPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledLoginFormCard = styled.div`
  background-color: green;
  border-radius: 25px;
  width: 33%;
  height: 66%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledLoginForm = styled.div`
`

export const LoginPage: React.FC = () => {
  const { userId, authenticate } = useAuth();
  const [userIdInput, setUserIdInput] = useState<string>("");
  const navigate = useNavigate();

  const navigateToChat = () => {
    navigate('chat');
  }

  useEffect(() => {
    userId && navigateToChat();
  }, [userId]);

  const handleLogin = () => {
    const userId = parseInt(userIdInput);
    authenticate(userId);
  }

  return (
    <StyledLoginPage>
      <StyledLoginFormCard>
        <StyledLoginForm>
          <h3>AdvancedChatApp</h3>
          <input type="email" value={userIdInput} onChange={e => setUserIdInput(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </StyledLoginForm>
      </StyledLoginFormCard>
    </StyledLoginPage>
  );
}