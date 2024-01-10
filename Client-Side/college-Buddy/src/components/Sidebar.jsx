import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddActivity from "@mui/icons-material/AddCard";
import MyActivities from "@mui/icons-material/FolderCopy";
import LogoutIcon from "@mui/icons-material/Logout";
import Profile from "@mui/icons-material/Person";
import Help from "@mui/icons-material/HelpOutline";
import { Link } from "react-router-dom";
import React from "react";
import {styled} from "@mui/material";

const StyledBox = styled(Box)(({theme})=>({
  display: "none",
  [theme.breakpoints.up("sm")]:{
    display: "block"
  }
}))

function Sidebar(props) {
  return (
    <StyledBox flex={1.5} p={3}>
      <Box
        position="fixed"
        sx={{
          height: "90vh",
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Dashboard" />
              <ListItemIcon sx={{ pl: 2 }}>
                <DashboardIcon color="secondary" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <Divider />

          <ListItem onClick={props.addCard} disablePadding>
            <ListItemButton>
              <ListItemText primary="Add Activity" />
              <ListItemIcon sx={{ pl: 2 }}>
                <AddActivity color="error" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <Divider />

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="My Activities" />
              <ListItemIcon sx={{ pl: 2 }}>
                <MyActivities color="success" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <Divider />

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Profile" />
              <ListItemIcon sx={{ pl: 2 }}>
                <Profile color="secondary" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <Divider />

          <Link style={{ textDecoration: "none" }} to="/">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Logout" />
                <ListItemIcon sx={{ pl: 2 }}>
                  <LogoutIcon color="error" />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Help" />
              <ListItemIcon sx={{ pl: 2 }}>
                <Help color="primary" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </StyledBox>
  );
}

export default Sidebar;
