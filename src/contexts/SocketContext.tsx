import { ReactNode, createContext, useEffect, useState } from "react";
import { socket } from "../socket";
import { Session } from "../types/custom/Session";
import { Socket } from "socket.io-client";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAppSelector } from "../hooks/useAppSelector";

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
  const [sessionId, setSessionId] = useLocalStorage<string>("sessionId", "");
  const [activeUsers, setActiveUsers] = useState<number[]>([]);
  const authenticatedUser = useAppSelector(state => state.auth.user);

  useEffect(() => {

    if (authenticatedUser?.id) {
      socket.auth = {
        userId: authenticatedUser.id
      };
    }

    socket.connect();

    socket.on('connect', () => {
      console.log('Connected');
    });

    socket.on('sessionCreated', (session: Session) => {
      setSessionId(session.sessionId);
    });

    socket.on('activeUsers', (activeUsers: number[]) => {
      setActiveUsers(activeUsers.filter(user => user !== authenticatedUser?.id));
    });

    return () => { socket.disconnect(); }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, sessionId, userId: authenticatedUser?.id, activeUsers }}>
      {children}
    </SocketContext.Provider>
  );
}