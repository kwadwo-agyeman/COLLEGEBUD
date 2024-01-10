import React, { useState } from "react";
import ActivitiesPage from "./ActivitiesPage";
import Home from "./Home";
import SignUp from "./Signup";
import Profile from "./Profile";
import Preloader from "./components/Preloader";
import { Route, Routes } from "react-router-dom";
import ControlAcess from "./components/ControlAcess";
function App() {
  const [fileInput, setFileInput] = useState(null);
  const [rawProfileFile,setRawProfileFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  console.log(rawProfileFile)

  console.log(selectedFile);
  const handleProfPic = () => {
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const rawFile = e.target.files
    setRawProfileFile(rawFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile(URL.createObjectURL(file));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <Preloader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<ControlAcess />}>
          
          <Route
            path="/profile"
            element={
              <Profile
                selectedFile={selectedFile}
                setFileInput={setFileInput}
                handleFileChange={handleFileChange}
                handleProfPic={handleProfPic}
                rawProfileFile={rawProfileFile}
              />
            }
          />

          <Route
            path="/activitiesPage"
            element={<ActivitiesPage selectedFile={selectedFile} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
