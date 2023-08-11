import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthenticatedUserSession {
  id: string;
}
export interface AuthenticatedUser {
  id: number;
}

interface AuthState {
  user?: AuthenticatedUser,
  session?: AuthenticatedUserSession
}

const initialState = () => {
  const storedUserId = localStorage.getItem("userId");
  const storedSessionId = localStorage.getItem("sessionId");
  const state = { } as AuthState;
  
  if (storedUserId) {
    const userId = parseInt(storedUserId);
    state.user = {
      id: userId
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
    }
  }
});

export const { userSet, userRemoved, sessionSet, sessionRemoved } = authSlice.actions;
export default authSlice.reducer;