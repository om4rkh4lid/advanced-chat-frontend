import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { styled } from "styled-components"
import { useAppSelector } from "../hooks/useAppSelector"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { userSet } from "../features/auth/AuthSlice"

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
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [userIdInput, setUserIdInput] = useState<string>("");
  const navigate = useNavigate();

  const navigateToChat = () => {
    navigate('/chat');
  }

  useEffect(() => {
    user && navigateToChat();
  }, [user]);

  const handleLogin = () => {
    const userId = parseInt(userIdInput);
    const authenticatedUser = { id: userId };
    dispatch(userSet(authenticatedUser));
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