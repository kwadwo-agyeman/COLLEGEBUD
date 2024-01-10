import React, { useEffect } from "react";
import PreloadImg from "../assets/preloaderImgCB.gif";
const style = {
  background: `rgb(240, 248, 255) url(${PreloadImg}) no-repeat center `,
  backgroundSize: "140px",
  height: "100vh",
  width: "100%",
  position: "fixed",
  paddingBottom: "1rem",
  zIndex: 999,
};
function Preloader() {
  useEffect(() => {
    const preLoad = document.getElementById("pre--loader");
    preLoad.style.display = "block"; // Show preloader on route change

    // Simulate some async operation (e.g., loading data)
    const delay = setTimeout(() => {
      preLoad.style.display = "none"; // Hide preloader after a delay (simulating loading completion)
    }, 2000);

    return () => {
      clearTimeout(delay); // Clear the timeout if the component unmounts before the delay
    };
  }, [location.pathname]); // Run the effect whenever the pathname changes

  return <div id="pre--loader" style={style}></div>;
}

export default Preloader;
