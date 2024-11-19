import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import CustomTabPanel from "../CustomTabPanel";
import ReadTab from "./ReadTab";
import UnreadTab from "./UnreadTab";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function NotificationTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="h4" component={"h1"} textAlign={"left"}>
          Notificações
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Não lidas" {...a11yProps(0)} />
          <Tab label="Lidas" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <UnreadTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ReadTab />
      </CustomTabPanel>
    </Box>
  );
}
