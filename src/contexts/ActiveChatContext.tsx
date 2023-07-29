import { ReactNode, createContext, useState } from "react";

type ActiveChatContext = {
  activeChatUserId: number;
  setActiveChatUserId: (id: number) => void;
}

type ActiveChatProps = {
  children: ReactNode;
}

export const ActiveChatContext = createContext<ActiveChatContext>({} as ActiveChatContext);

export const ActiveChatProvider: React.FC<ActiveChatProps> = ({ children }) => {
  const [activeChatUserId, setIdForActiveUser] = useState<number>(0);

  const setActiveChatUserId = (id: number) => {
    setIdForActiveUser(id);
  }

  return (
    <ActiveChatContext.Provider value={{ activeChatUserId, setActiveChatUserId }}>
      {children}
    </ActiveChatContext.Provider>
  );
};
