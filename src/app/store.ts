import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import authSlice, { sessionRemoved, sessionSet, userRemoved, userSet } from '../features/auth/AuthSlice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: userSet,
  effect: (action, _) => {
    localStorage.setItem("userId", `${action.payload.id}`);
  }
});

listenerMiddleware.startListening({
  actionCreator: userRemoved,
  effect: (action, _) => {
    localStorage.setItem("userId", "");
  }
});

listenerMiddleware.startListening({
  actionCreator: sessionSet,
  effect: (action, _) => {
    localStorage.setItem("sessionId", action.payload.id);
  }
})

listenerMiddleware.startListening({
  actionCreator: sessionRemoved,
  effect: (action, _) => {
    localStorage.setItem("sessionId", "");
  }
})

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(listenerMiddleware.middleware);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;