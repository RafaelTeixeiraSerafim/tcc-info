import React, { useCallback, useEffect } from "react";
import { createContext, useState } from "react";
import { IUser } from "../interfaces";
import { checkToken, logout } from "../service/api";
import { AxiosError } from "axios";

interface UserProviderProps {
  children: React.ReactNode;
}

interface IUserContextInterface {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  authenticate: () => Promise<void>;
  logoutUser: () => Promise<void>;
  hasCheckedToken: boolean;
}

const UserContext = createContext<IUserContextInterface | null>(null);

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [hasCheckedToken, setHasCheckedToken] = useState(false);

  const authenticate = useCallback(async () => {
    const user = await checkToken();
    setUser(user);
    setHasCheckedToken(true);
  }, []);

  const logoutUser = useCallback(async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      alert(`Erro ao deslogar o usuário: ${(error as AxiosError).message}`);
    }
  }, []);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        authenticate,
        logoutUser,
        hasCheckedToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserProvider };
