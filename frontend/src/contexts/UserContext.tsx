import React, { useCallback, useEffect } from "react";
import { createContext, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { IUser } from "../interfaces";

interface UserProviderProps {
  children: React.ReactNode;
}

interface IUserContextInterface {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  authenticate: () => Promise<void>;
  logoutUser: () => void;
  hasCheckedToken: boolean;
}

const UserContext = createContext<IUserContextInterface | null>(null);

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [hasCheckedToken, setHasCheckedToken] = useState(false);

  const authenticate = useCallback(async () => {
    try {
      const response = await axiosInstance.post("/auth/check-token");

      console.log(response);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
    setHasCheckedToken(true);
  }, []);

  const logoutUser = useCallback(async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");

      console.log(response);
      setUser(null);
    } catch (error) {
      console.log(error);
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
