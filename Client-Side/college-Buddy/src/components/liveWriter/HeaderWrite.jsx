import { React, useEffect, useState } from "react";
import "./headerWrt.css";

function LiveLetter() {
  const [letters, setLetters] = useState("");
  const homepageLetters = "samuel";
  useEffect(() => {
    let letterIndex = 0;

    const writeLettersInterval = setInterval(() => {
      setLetters((prev) => {
        if (letterIndex < homepageLetters.length) {
          // const nextLetter = homepageLetters[letterIndex];
          // letterIndex = (letterIndex + 1) % homepageLetters.length;
          return prev + nextLetter;
        } else if(letterIndex > homepageLetters.length){
          letterIndex = 0;
          return "";
        }
      });
    }, 100);

    // Clean up the interval on component unmount
    return () => clearInterval(writeLettersInterval);
  }, [homepageLetters]);
  return <div className="container">{letters}</div>;
}

export default LiveLetter;
