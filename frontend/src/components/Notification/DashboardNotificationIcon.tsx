import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAdminNotificationContext } from "../../hooks/useAdminNotificationContext";

export default function DashboardNotificationIcon() {
  const { unreadNotifications } = useAdminNotificationContext();

  return (
    <>
      {unreadNotifications.length > 0 ? (
        <Badge badgeContent={unreadNotifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      ) : (
        <NotificationsIcon />
      )}
    </>
  );
}
