import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../../hooks/useAppSelector";

export interface AuthenticatedUserSession {
  id: string;
}
export interface AuthenticatedUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl?: string;
}

interface AuthState {
  user?: AuthenticatedUser,
  session?: AuthenticatedUserSession,
  token?: string
}

const initialState = () => {
  const storedUser = localStorage.getItem("user");
  const storedSessionId = localStorage.getItem("sessionId");
  const state = { } as AuthState;
  
  if (storedUser) {
    try {
      const user: AuthenticatedUser = JSON.parse(storedUser);
      state.user = user;
    } catch (error) {
      console.error('Failed to deserialized AuthenticatedUser from local storage', error);
    }
  } 
  
  if (storedSessionId) {
    state.session = {
      id: storedSessionId
    }
  }

  return state;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userSet(state, action: PayloadAction<AuthenticatedUser>) {
      state.user = action.payload;
    },
    userRemoved(state) {
      delete state.user;
    },
    sessionSet(state, action: PayloadAction<AuthenticatedUserSession>) {
      state.session = action.payload;
    },
    sessionRemoved(state) {
      delete state.session;
    },
    tokenSet(state, action: PayloadAction<string>) {
      state.token = action.payload;
    }
  }
});

export const { userSet, userRemoved, sessionSet, sessionRemoved, tokenSet } = authSlice.actions;
export default authSlice.reducer;

export const getAuthenticatedUser = () => useAppSelector(state => state.auth.user);