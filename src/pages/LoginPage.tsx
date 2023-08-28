import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { styled } from "styled-components"
import { useAppSelector } from "../hooks/useAppSelector"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { backendInstance } from "../axios"
import { AuthenticatedUser, tokenSet, userSet } from "../features/auth/AuthSlice"

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
  gap: 32px;
  flex-direction: column;
`
const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
`

export const LoginPage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const navigate = useNavigate();

  const navigateToChat = () => {
    navigate('/chat');
  }

  useEffect(() => {
    user && navigateToChat();
  }, [user]);

  const sendLoginRequest = (endpoint: string, body: any) => {
    backendInstance.post('/auth/login' + endpoint, body)
    .then(response => {
      const authenticatedUser: AuthenticatedUser = response.data.user;
      dispatch(userSet(authenticatedUser));
      if (endpoint === '/') {
        const token = response.data.token;
        dispatch(tokenSet(token));
      }
    })
    .catch(error => console.error(error));
  }

  const handleOrganicLogin = () => {
    const body = {
      email: userEmail,
      password: userPassword
    }
    sendLoginRequest('/', body);
  }

  const handleGoogleLogin = async (credentials: CredentialResponse) => {
    const body = { 
      token: credentials.credential, 
      clientId: credentials.clientId 
    };
    sendLoginRequest('/google', body);
  }

  return (
    <StyledLoginPage>
      <StyledLoginFormCard>
          <h1>AdvancedChat</h1>
        <StyledLoginForm>
          <input autoComplete="true" placeholder="E-mail" type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} />
          <input autoComplete="false" placeholder="Password" type="password" value={userPassword} onChange={e => setUserPassword(e.target.value)} />
          <button onClick={handleOrganicLogin}>Login</button>
        </StyledLoginForm>
        <h3>or</h3>
        <GoogleLogin logo_alignment="center" locale="en" onSuccess={handleGoogleLogin}></GoogleLogin>
      </StyledLoginFormCard>
    </StyledLoginPage>
  );
}