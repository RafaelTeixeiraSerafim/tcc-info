import { Box, Button, TextField } from "@mui/material";
import NotificationTable from "./NotificationTable";
import { useEffect, useState } from "react";
import { useAdminNotificationContext } from "../../hooks/useAdminNotificationContext";
import { GridRowSelectionModel } from "@mui/x-data-grid";

export default function ReadTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );

  const {
    readNotifications,
    getReadNotifications,
    unreadSelectedNotifications,
  } = useAdminNotificationContext();

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    getReadNotifications();
  }, [getReadNotifications]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TextField
          placeholder="Pesquisar notificações"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            width: "40%",
          }}
        />
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <Button
            onClick={() =>
              unreadSelectedNotifications(selectionModel as number[])
            }
            variant="outlined"
            color={"secondary"}
            disabled={selectionModel.length === 0}
          >
            Marcar como não lido
          </Button>
        </Box>
      </Box>
      <NotificationTable
        notifications={readNotifications}
        searchQuery={searchQuery}
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
      />
    </Box>
  );
}
