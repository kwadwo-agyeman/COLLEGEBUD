import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'

function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
      }}
    >
      <Box
        sx={{
          // position: "absolute",
          // bottom: 0,
          // left: 0,
          width: "100%",  
          bgcolor: "#FF6392",
          p: 2,
          display: { xs: "block", sm: "flex" },
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <a href="#" style={{ textDecoration: "none", display: "block", padding: 15, color: "white" }}>
          &copy;{currentYear} College Bud
        </a>
        <a href="#" style={{ textDecoration: "none", display: "block", padding: 15, color: "white" }}>
          Terms
        </a>
        <a href="#" style={{ textDecoration: "none", display: "block", padding: 15, color: "white" }}>
          Privacy
        </a>
        <a href="#" style={{ textDecoration: "none", display: "block", padding: 15, color: "white" }}>
          Security
        </a>
        <a href="#" style={{ textDecoration: "none", display: "block", padding: 15, color: "white" }}>
          Contact
        </a>
      </Box>
    </Box>
  )
}

export default Footer
