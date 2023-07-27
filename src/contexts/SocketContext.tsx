import { ReactNode, createContext, useEffect, useState } from "react";
import { socket } from "../socket";
import { Session } from "../types/custom/Session";
import { Socket } from "socket.io-client";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAuth } from "../hooks/useAuth";

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
  const { userId } = useAuth();

  useEffect(() => {

    if (userId) {
      socket.auth = {
        userId
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
      setActiveUsers(activeUsers.filter(user => user !== userId));
    });


    return () => { socket.disconnect(); }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, sessionId, userId, activeUsers }}>
      {children}
    </SocketContext.Provider>
  );
}