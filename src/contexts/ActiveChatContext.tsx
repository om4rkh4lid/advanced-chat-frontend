import { ReactNode, createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useSocket from "../hooks/useSocket";

type ActiveChatContext = {
  activeChatUserId: number;
  setActiveChatUserId: (id: number) => void;
}

type ActiveChatProps = {
  children: ReactNode;
}

export const ActiveChatContext = createContext<ActiveChatContext>({} as ActiveChatContext);

export const ActiveChatProvider: React.FC<ActiveChatProps> = ({ children }) => {
  const { activeUsers } = useSocket();
  const [activeChatUserId, setIdForActiveUser] = useLocalStorage<number>('activeChatUserId', activeUsers ? activeUsers[0] : 0);

  const setActiveChatUserId = (id: number) => {
    setIdForActiveUser(id);
  }

  return (
    <ActiveChatContext.Provider value={{ activeChatUserId, setActiveChatUserId }}>
      {children}
    </ActiveChatContext.Provider>
  );
};
