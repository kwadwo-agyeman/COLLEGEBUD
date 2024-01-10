import React from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  Stack,
  Tooltip,
  IconButton,
  CssBaseline,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material";
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


const StyledStack = styled(Stack)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

function Navbar2(props) {
  return (
    <AppBar sx={{ position: "sticky", width: "100%" }}>
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

        <StyledStack direction="row" spacing={2}>
          <Tooltip title="profile/login">
            <Link to="/profile">
              <IconButton
                sx={{ bgcolor: "rgb(225,225,225,0.6)", color: "palevioletred" }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={props.profPic}
                  sx={{ width: 25, height: 25 }}
                />
              </IconButton>
            </Link>
          </Tooltip>
        </StyledStack>
        <StyledBox>
          <Tooltip title="profile/login">
            <Link to="/profile">
              <IconButton
                sx={{ bgcolor: "rgb(225,225,225,0.6)", color: "palevioletred" }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={props.profPic}
                  sx={{ width: 25, height: 25 }}
                />
              </IconButton>
            </Link>
          </Tooltip>
        </StyledBox>
      </StyledToolbar>
    </AppBar>
  );
}

export default Navbar2;
