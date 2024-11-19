import {
  Box,
  Divider,
  List,
  ListItem,
  ListSubheader,
  Paper,
} from "@mui/material";
import { CSSProperties } from "react";
import { useAdminNotificationContext } from "../../hooks/useAdminNotificationContext";
import RouterLink from "../RouterLink";

interface DashboardNotificationDisplayProps {
  style?: CSSProperties;
}

export default function DashboardNotificationDisplay({
  style,
}: DashboardNotificationDisplayProps) {
  const { unreadNotifications } = useAdminNotificationContext();

  return (
    <Paper
      sx={{
        ...style,
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#121212",
        backgroundImage: "none",
      }}
    >
      <List
        subheader={
          <ListSubheader
            sx={{ bgcolor: "#191919", borderRadius: "4px 4px 0 0" }}
          >
            Notificações
          </ListSubheader>
        }
      >
        <Divider />
        {unreadNotifications.length === 0 && <ListItem>Nenhuma notificação não lida</ListItem>}
        {unreadNotifications.map((notification) => (
          <>
            <ListItem key={notification.id} sx={{ fontSize: "0.875rem" }}>
              {notification.description}
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
      <Box flex={1}></Box>
      <Divider />

      <ListItem component={"div"}>
        <RouterLink
          to={"/admin/notifications"}
          style={{ fontSize: "0.875rem" }}
        >
          Mostrar todas
        </RouterLink>
      </ListItem>
    </Paper>
  );
}
