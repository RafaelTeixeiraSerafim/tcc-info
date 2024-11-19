import { AxiosError } from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { useUserContext } from "../hooks";
import { INotification } from "../interfaces";
import {
  fetchAdminReadNotifications,
  fetchAdminUnreadNotifications,
} from "../service/api";
import axiosInstance from "../config/axiosInstance";

interface IAdminNotificationContext {
  unreadNotifications: INotification[];
  readNotifications: INotification[];
  getReadNotifications: () => Promise<void>;
  readSelectedNotifications: (ids: number[]) => Promise<void>;
  unreadSelectedNotifications: (ids: number[]) => Promise<void>;
}

const AdminNotificationContext =
  createContext<IAdminNotificationContext | null>(null);

interface AdminNotificationProviderProps {
  children: React.ReactNode;
}

const AdminNotificationProvider = ({
  children,
}: AdminNotificationProviderProps) => {
  const [unreadNotifications, setUnreadNotifications] = useState<
    INotification[]
  >([]);
  const [readNotifications, setReadNotifications] = useState<INotification[]>(
    []
  );
  const { user } = useUserContext();

  const getReadNotifications = useCallback(async () => {
    if (!user) return;

    try {
      const notifications = await fetchAdminReadNotifications(user.id);
      setReadNotifications(notifications);
    } catch (error) {
      alert(`Erro ao pegar notificações: ${(error as AxiosError).message}`);
    }
  }, [user]);

  const getUnreadNotifications = useCallback(async () => {
    if (!user) return;

    try {
      const notifications = await fetchAdminUnreadNotifications(user.id);
      setUnreadNotifications(notifications);
    } catch (error) {
      alert(`Erro ao pegar notificações: ${(error as AxiosError).message}`);
    }
  }, [user]);

  useEffect(() => {
    getUnreadNotifications();
  }, [getUnreadNotifications]);

  const readSelectedNotifications = async (ids: number[]) => {
    try {
      const response = await axiosInstance.patch(`/users/notifications`, {
        ids,
        read: true,
      });
      console.log(response);
      getUnreadNotifications();
      getUnreadNotifications();
    } catch (error) {
      alert(
        `Erro ao mudar status da notificação: ${(error as AxiosError).message}`
      );
    }
  };

  const unreadSelectedNotifications = async (ids: number[]) => {
    try {
      const response = await axiosInstance.patch(`/users/notifications`, {
        ids,
        read: false,
      });
      console.log(response);
      getReadNotifications();
      getUnreadNotifications();
    } catch (error) {
      alert(
        `Erro ao mudar status da notificação: ${(error as AxiosError).message}`
      );
    }
  };

  return (
    <AdminNotificationContext.Provider
      value={{
        unreadNotifications,
        readNotifications,
        getReadNotifications,
        readSelectedNotifications,
        unreadSelectedNotifications,
      }}
    >
      {children}
    </AdminNotificationContext.Provider>
  );
};

export { AdminNotificationContext, AdminNotificationProvider };
