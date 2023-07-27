import { ReactNode, createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Auth = {
  userId: number,
  authenticate: (id: number) => void
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<Auth>({} as Auth);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userId, setUserId] = useLocalStorage<number>('userId', 0);

  const authenticate = (id: number) => {
    setUserId(id);
  }
  
  return <AuthContext.Provider value={{ userId, authenticate }}>
    {children}
  </AuthContext.Provider>
}