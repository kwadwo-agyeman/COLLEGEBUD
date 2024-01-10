import { Box, ImageList, ImageListItem } from "@mui/material";
import HeaderWrite from "./liveWriter/HeaderWrite"
import React from "react";
import HomeVid from "../assets/home-vid.mp4";
import './header.css'

function Header() {
  return (
    <Box
      sx={{
        mt: "3rem",
        position: "relative",
        height: "100vh",
        width: "100%",
      }}
    >
      <div className="container">
      <div className="overlayer"></div>
        <video
        className="video-player"
          src={HomeVid}
          loop
          autoPlay
          muted
        ></video>
      </div>
      <Box
        sx={{
          position: "absolute",
          left:"50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: 444,
        }}
      >
        {/* <HeaderWrite /> */}
      </Box>
    </Box>
  );
}

export default Header;
