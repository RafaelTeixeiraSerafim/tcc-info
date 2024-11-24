import { useContext } from 'react';
import { AdminNotificationContext } from '../contexts';

export const useAdminNotificationContext = () => {
  const context = useContext(AdminNotificationContext)

  if (!context) {
    throw new Error("useAdminNotificationContext must be used within a provider");
  }
  return context;
}
