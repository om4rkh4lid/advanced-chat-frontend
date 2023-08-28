import React, { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { useAppSelector } from "../hooks/useAppSelector"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { backendInstance } from "../axios"
import { StyledFormCard } from "../components/styled/StyledFormCard"
import { StyledForm } from "../components/styled/StyledForm"
import { CenteredContentPage } from "../components/styled/CenteredContentPage"

export const SignupPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  }

  const sendSignupRequest = (endpoint: string, body: any) => {
    backendInstance.post('/user/signup' + endpoint, body)
      .then(response => {
        navigateToLogin()
      })
      .catch(error => console.error(error));
  }

  const handleOrganicSignup = () => {
    const body = {
      email,
      firstName,
      lastName,
      password
    }
    sendSignupRequest('/', body);
  }

  const handleGoogleSignup = async (credentials: CredentialResponse) => {
    const body = {
      token: credentials.credential,
      clientId: credentials.clientId
    };
    sendSignupRequest('/google', body);
  }

  return (
    <CenteredContentPage>
      <StyledFormCard>
        <h1>Sign Up</h1>
        <StyledForm>
          <input required autoComplete="true" placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <input required autoComplete="false" placeholder="First Name" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
          <input required autoComplete="false" placeholder="Last Name" type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
          <input required autoComplete="false" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button onClick={handleOrganicSignup}>Login</button>
        </StyledForm>
        <h3>or</h3>
        <GoogleLogin text="signup_with" logo_alignment="center" locale="en" onSuccess={handleGoogleSignup}></GoogleLogin>
        <p>Already have an account? {<Link to="/login">Log In</Link>}</p>
      </StyledFormCard>
    </CenteredContentPage>
  );
}