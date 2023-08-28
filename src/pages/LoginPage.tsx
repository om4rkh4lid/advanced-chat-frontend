import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppSelector } from "../hooks/useAppSelector"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { backendInstance } from "../axios"
import { AuthenticatedUser, tokenSet, userSet } from "../features/auth/AuthSlice"
import { StyledFormCard } from "../components/styled/StyledFormCard"
import { StyledForm } from "../components/styled/StyledForm"
import { CenteredContentPage } from "../components/styled/CenteredContentPage"

export const LoginPage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
      email: email,
      password: password
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
    <CenteredContentPage>
      <StyledFormCard>
        <h1>Login</h1>
        <StyledForm>
          <input autoComplete="true" placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <input autoComplete="false" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button onClick={handleOrganicLogin}>Login</button>
        </StyledForm>
        <h3>or</h3>
        <GoogleLogin logo_alignment="center" locale="en" onSuccess={handleGoogleLogin}></GoogleLogin>
        <p>Don't have an account? {<Link to="/signup">Sign Up</Link>}</p>
      </StyledFormCard>
    </CenteredContentPage>
  );
}