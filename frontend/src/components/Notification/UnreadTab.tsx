import { Box, Button, TextField } from "@mui/material";
import NotificationTable from "./NotificationTable";
import { useState } from "react";
import { useAdminNotificationContext } from "../../hooks/useAdminNotificationContext";
import { GridRowSelectionModel } from "@mui/x-data-grid";

export default function UnreadTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );

  const { unreadNotifications, readSelectedNotifications } =
    useAdminNotificationContext();

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(event.target.value);
  };

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
          placeholder="Pesquise notificações"
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
              readSelectedNotifications(selectionModel as number[])
            }
            variant="outlined"
            color={"secondary"}
            disabled={selectionModel.length === 0}
          >
            Marcar como lido
          </Button>
        </Box>
      </Box>

      <NotificationTable
        notifications={unreadNotifications}
        searchQuery={searchQuery}
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
      />
    </Box>
  );
}
