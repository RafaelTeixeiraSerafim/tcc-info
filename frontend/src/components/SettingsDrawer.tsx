import AccountCircle from "@mui/icons-material/AccountCircle";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PlaceIcon from "@mui/icons-material/Place";
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import SettingsIcon from "@mui/icons-material/Settings";
import { Collapse } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SettingsDrawer() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            flex: 1,
            width: "100%",
            position: "absolute",
            boxSizing: "border-box",
            zIndex: 1,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/account/profile">
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary={"Meu perfil"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/account/addresses">
              <ListItemIcon>
                <PlaceIcon />
              </ListItemIcon>
              <ListItemText primary={"Meus endereços"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Configurações"} />
              {isSettingsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={isSettingsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} component={Link} to={"/account/settings/privacy"}>
                <ListItemIcon>
                  <PrivacyTipIcon />
                </ListItemIcon>
                <ListItemText primary="Privacidade e Segurança" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        {/* <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
    </Box>
  );
}
