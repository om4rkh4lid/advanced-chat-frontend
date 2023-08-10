import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthenticatedUser {
  id: number;
}

interface AuthState {
  user?: AuthenticatedUser,
}

const initialState = () => {
  const storedId = localStorage.getItem("userId")
  if (storedId) {
    const id = parseInt(storedId)
    return {
      user: {
        id
      }
    }
  } else {
    return { };
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userSet(state, action: PayloadAction<AuthenticatedUser>) {
      state.user = action.payload;
    },
    userRemoved(state) {
      state.user = undefined;
    }
  }
});

export const { userSet, userRemoved } = authSlice.actions;
export default authSlice.reducer;