import { AxiosError } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { IUser } from "../interfaces";
import { checkToken, logout } from "../service/api";
import { UserContext } from ".";

interface UserProviderProps {
  children: React.ReactNode;
}

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

export default UserProvider;
