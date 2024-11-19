import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AdminTab from "./AdminTab";
import ClientTab from "./ClientTab";
import { Typography } from "@mui/material";
import CustomTabPanel from "./CustomTabPanel";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function UserTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={{display: "flex", justifyContent: "space-between", borderBottom: 1, borderColor: "divider"}}>
      <Typography variant="h4" component={"h1"} textAlign={"left"}>
        Usuários
      </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Admins" {...a11yProps(0)} />
          <Tab label="Clientes" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <AdminTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ClientTab />
      </CustomTabPanel>
    </Box>
  );
}
