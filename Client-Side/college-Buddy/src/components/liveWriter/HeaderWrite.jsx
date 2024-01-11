import React, { useEffect, useState } from "react";
import "./headerWrt.css";

function LiveLetter() {
  const [letters, setLetters] = useState("COLLEGE BUDDY");
  const words = [
    "EXPLORE PASSIONS",
    "ACADEMIC EXCELLENCE",
    "NAVIGATE APPLICATIONS",
    "EMBRACE LEADERSHIP",
    "CULTIVATE SUCCESS"
  ];
    let index = 0;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLetters(words[index++ % words.length]);
    }, 700);

    // Clear interval on component unmount or cleanup
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container" >
      <span className="firstLetter" style={{ color: "#7DDF64" }}>{letters.split(" ")[0]}</span>{" "}
      <span className="secondLetter" style={{ color: "#3399FF" }}>{letters.split(" ")[1]}</span>
    </div>
  );
}

export default LiveLetter;
