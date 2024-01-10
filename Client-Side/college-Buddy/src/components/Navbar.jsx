import React from "react";
import Login from "./Login";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  Stack,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  CssBaseline,
  Modal,
  Button,
  //TextField,
  //Autocomplete,
  //Link
} from "@mui/material";
import { styled } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import DarkModeIcon from "@mui/icons-material/DarkMode"; //styled components
import { Link } from "react-router-dom";
const StyledToolbar = styled(Toolbar)({
  background: "#5FE88D",
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 8px",
});

const LogoTypography = styled(Typography)({
  fontFamily: "cursive",
  fontWeight: 600,
});


const LoginBox = styled(Box)(({ theme }) => ({
  width: "90%",
  [theme.breakpoints.up("sm")]: {
    width: "50%",
  },
}));
function Navbar() {
  const [rightmenu, setRightmenu] = React.useState(false);
  ///handle closing of rightmenu
  const handleClose = () => {
    setRightmenu((prevMenu) => !prevMenu);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const modalHandleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box>
      <AppBar sx={{ width: "100%", background: "#5FE88D" }}>
        <CssBaseline />
        <StyledToolbar>
          <Link to="/" style={{textDecoration:"none",color:"white"}}>
          <LogoTypography
            variant="h5"
            component="a"
            sx={{ fontSize: { xs: 20 } }}
          >
            College Buddy
          </LogoTypography>

          </Link>

          <Tooltip title="profile/login">
            <IconButton
              onClick={handleClose}
              sx={{ bgcolor: "rgb(225,225,225,0.6)", color: "palevioletred" }}
            >
              <PersonIcon />
            </IconButton>
          </Tooltip>
          {/**
           *           <StyledTooltip title="profile/login">
            <IconButton
              onClick={handleClose}
              sx={{ bgcolor: "rgb(225,225,225,0.6)", color: "palevioletred" }}
            >
              <PersonIcon />
            </IconButton>
          </StyledTooltip>

           */}

          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            open={rightmenu}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem
              onClick={handleOpen}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <LoginIcon />

              <Button>Login</Button>
            </MenuItem>
          </Menu>
        </StyledToolbar>
      </AppBar>
      <div>
        <Modal
          open={open}
          onClose={modalHandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <LoginBox sx={style}>
            <Login />
          </LoginBox>
        </Modal>
      </div>
    </Box>
  );
}

export default Navbar;
