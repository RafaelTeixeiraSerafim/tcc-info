import { AxiosError } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { IUser, IUserContextInterface } from "../interfaces";
import { checkToken, logout } from "../service/api";
import { UserContext } from ".";
import { AlertProps } from "@mui/material";

interface UserProviderProps {
  children: React.ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [hasCheckedToken, setHasCheckedToken] = useState(false);
  const [alert, setAlert] = useState<IUserContextInterface["alert"]>(null);

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
      window.alert(
        `Erro ao deslogar o usuário: ${(error as AxiosError).message}`
      );
    }
  }, []);

  const newAlert = useCallback(
    (
      message: string,
      variant?: AlertProps["variant"],
      severity?: AlertProps["severity"]
    ) => setAlert({ message, variant, severity }),
    []
  );

  const clearAlert = () => setAlert(null);

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
        alert,
        newAlert,
        clearAlert,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
