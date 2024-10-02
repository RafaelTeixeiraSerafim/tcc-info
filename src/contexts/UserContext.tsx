import React, { useEffect } from "react";
import { createContext, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { IUser, IUserContextInterface } from "../interfaces";

interface UserProviderProps {
  children: React.ReactElement;
}

const UserContext = createContext<IUserContextInterface>({});

const statusMap: { [key: string]: string } = {
  IN_PROGRESS: "Em andamento",
  PENDING: "Pendente",
  SHIPPED: "Enviado",
  DELIVERED: "Entregue",
};

export function UserProvider({ children }: UserProviderProps) {
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

  const translateStatus = (status: string): string => {
    return statusMap[status] || status; // Retorna a tradução ou o status original se não houver mapeamento
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
        translateStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
