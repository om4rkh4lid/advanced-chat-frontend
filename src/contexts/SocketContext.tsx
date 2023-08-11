import { ReactNode, createContext, useEffect, useState } from "react";
import { socket } from "../socket";
import { Session } from "../types/custom/Session";
import { Socket } from "socket.io-client";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { sessionSet } from "../features/auth/AuthSlice";

type WebSocketContext = {
  socket: Socket
  sessionId?: string
  userId?: number
  activeUsers?: number[]
}


export const SocketContext = createContext<WebSocketContext>({} as WebSocketContext);

type SocketProviderProps = {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [activeUsers, setActiveUsers] = useState<number[]>([]);
  const authenticatedUser = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {

    if (authenticatedUser.user?.id) {
      socket.auth = {
        userId: authenticatedUser.user.id
      };
    }

    socket.connect();

    socket.on('connect', () => {
      console.log('Connected');
    });

    socket.on('sessionCreated', (session: Session) => {
      dispatch(sessionSet({ id: session.sessionId }));
    });

    socket.on('activeUsers', (activeUsers: number[]) => {
      setActiveUsers(activeUsers.filter(user => user !== authenticatedUser?.user?.id));
    });

    return () => { socket.disconnect(); }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, sessionId: authenticatedUser.session?.id, userId: authenticatedUser.user?.id, activeUsers }}>
      {children}
    </SocketContext.Provider>
  );
}