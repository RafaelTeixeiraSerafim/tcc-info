import React, { useEffect } from "react";
import { createContext, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { IUser } from "../interfaces";

interface UserProviderProps {
  children: React.ReactElement;
}

interface IUserContextInterface {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  authenticate: () => Promise<void>;
  logoutUser: () => void;
  hasCheckedToken: boolean;
  addedToCart: boolean;
  setAddedToCart: React.Dispatch<React.SetStateAction<boolean>>;
  hasErrorCart: boolean;
  setHasErrorCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<IUserContextInterface | null>(null);

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [hasCheckedToken, setHasCheckedToken] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [hasErrorCart, setHasErrorCart] = useState(false);

  const authenticate = async () => {
    try {
      const response = await axiosInstance.post("/api/v1/auth/check-token");

      console.log(response);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
    setHasCheckedToken(true);
  };

  const logoutUser = async () => {
    try {
      const response = await axiosInstance.post("/api/v1/auth/logout");

      console.log(response);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        authenticate,
        logoutUser,
        hasCheckedToken,
        addedToCart,
        setAddedToCart,
        hasErrorCart,
        setHasErrorCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserProvider };
