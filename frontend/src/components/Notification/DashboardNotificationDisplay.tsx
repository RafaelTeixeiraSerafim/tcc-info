import {
  Box,
  Divider,
  List,
  ListItem,
  ListSubheader,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { CSSProperties } from "react";
import { useAdminNotificationContext } from "../../hooks/useAdminNotificationContext";
import RouterLink from "../RouterLink";
import { severityMap } from "../../utils/maps";

interface DashboardNotificationDisplayProps {
  style?: CSSProperties;
}

export default function DashboardNotificationDisplay({
  style,
}: DashboardNotificationDisplayProps) {
  const theme = useTheme();
  const { unreadNotifications } = useAdminNotificationContext();

  return (
    <Paper
      sx={{
        ...style,
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        bgcolor: theme.palette.mode === "dark" ? "#121212" : "#fafafa",
        backgroundImage: "none",
      }}
    >
      <List
        subheader={
          <ListSubheader
            sx={{
              bgcolor: theme.palette.mode === "dark" ? "#191919" : "#f3f3f3",
              borderRadius: "4px 4px 0 0",
            }}
          >
            Notificações
          </ListSubheader>
        }
      >
        <Divider />
        {unreadNotifications.length === 0 && (
          <ListItem>Nenhuma notificação não lida</ListItem>
        )}
        {unreadNotifications.map((notification) => (
          <>
            <ListItem component={Box} key={notification.id}>
              <Typography
                color={severityMap[notification.severity].color}
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  fontSize: "0.875rem",
                }}
              >
                {notification.description}
              </Typography>
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
