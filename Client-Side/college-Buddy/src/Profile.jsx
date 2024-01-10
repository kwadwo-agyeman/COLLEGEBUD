import React, { useEffect, useState } from "react";
import CertsNAwards from "./components/CertsNAwards";
import PersonalInfo from "./components/PersonalInfo";
import PersonalInfo2 from "./components/PersonalInfo2";
import Navbar2 from "./components/Navbar2";
import Footer from "./components/Footer";
import profileHead from "./assets/profileHead.jpg";
import profileBg from "./assets/profileImg.jpg";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "./api/axios";
import { useAuth } from "./components/AuthProvider";

function Profile(props) {
  const UPDATE_URL = "/updateProfile";
  const [selectedImage, setSelectedImage] = useState([]);
  const [certFiles, setCertFiles] = useState([]);
  console.log(certFiles);
  const [getCertFiles, setGetCertFiles] = useState([]);
  const [bio, setBio] = useState({ bio: "" });
  const [personalInfoData, setPersonalInfoData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    address: "",
    country: "",
  });
  const [edu, setEdu] = useState({ highschool: "", address: "", year: "" });
  const [user, setUser] = useState("");
  console.log(user);
  const [formCreated, setFormCreated] = useState(false);
  const [certCreated,setCertCreated] = useState(false);
  console.log(formCreated);

  const firstname = personalInfoData.firstname;
  const middlename = personalInfoData.middlename;
  const lastname = personalInfoData.lastname;
  const address = personalInfoData.address;
  const country = personalInfoData.country;
  const highschool = edu.highschool;
  const highschoolLoc = edu.address;
  const dateOfComplete = edu.year;
  const profileImg = props.selectedFile;
  const Bio = bio.bio;
  // console.log(profileImg)

  const { auth, profImg, setProfImg } = useAuth();

  useEffect(() => {
    // Accessing username from auth
    const user = auth.username;
    setUser(user);
    console.log(user);
  }, [auth.user]);

  //Fetch Profile Image for Profile Page
  const fetchProfileImg = async () => {
    try {
      const response = await axios.get("/getProfilePic", {
        headers: {
          username: user,
        },
      });
      console.log("success");
      setProfImg(response?.data?.dataUrl);
    } catch (err) {
      console.log(err.response.data);
      console.log("failed");
    }
  };

  useEffect(() => {
    if (formCreated ? user !== " " && formCreated : user !== " ") {
      setTimeout(() => {
        fetchProfileImg();
      }, 200);
    }
  }, [user, formCreated, props.selectedFile]);

  // Fetch Profile Page Data text
  const fetchProfileData = async () => {
    try {
      console.log(user);
      const response = await axios.get(`getUserData`, {
        headers: {
          username: user,
        },
      });
      console.log(response?.data);
      setBio(response?.data[1]);
      setEdu(response?.data[2]);
      setPersonalInfoData(response?.data[0]);
    } catch (err) {
      console.log("Failed");
      console.log(err?.response?.data);
    }
  };

  useEffect(() => {
    if (user !== " ") {
      fetchProfileData();
    }
  }, [user]);

  useEffect(() => {
    user !== "" && handleUpdate();
  }, [
    // user,
    bio,
    firstname,
    middlename,
    lastname,
    address,
    country,
    highschool,
    highschoolLoc,
    dateOfComplete,
  ]);

  const handleUpdate = async () => {
    try {
      const response = await axios.post(
        UPDATE_URL,
        JSON.stringify({
          user,
          firstname,
          middlename,
          lastname,
          address,
          country,
          highschool,
          highschoolLoc,
          dateOfComplete,
          profileImg,
          selectedImage,
          Bio,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
    } catch (err) {
      console.log(err?.response?.data);
    }
  };

  ////Send Profile Image
  useEffect(() => {
    user !== "" && myProfFile();
  }, [user, props.selectedFile]);

  const myProfFile = async () => {
    const formData = new FormData();
    const rawProfileFiles = props.rawProfileFile;
    const file = rawProfileFiles[0];

    try {
      formData.append("file", file);

      const response = await axios.post("/uploadFiles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          username: user,
        },
        withCredentials: true,
      });
      console.log("success");
      setFormCreated(true);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
      setFormCreated(false);
    }
  };

  useEffect(() => {
    user !== "" && handleCertsUpload();
  }, [selectedImage]);

  const handleCertsUpload = async () => {
    try {
      const certsFormData = new FormData();

      for (let i = 0; i < certFiles.length; i++) {
        const file = certFiles[i];
        certsFormData.append(`CertAwards_${i + 1}`, file);
      }

      const response = await axios.post(
        "/uploadCertsAndAwards",
        certsFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            username: user,
          },
          withCredentials: true,
        }
      );
      console(response?.data);
      setCertCreated(true)
    } catch (err) {
      console.log(err);
      setCertCreated(false)
    }
  };

  //Get Certs And Awards from API;

  const handleGetCertNAwards = async () => {
    try {
      const response = await axios.get("/getCertsNAwards", {
        headers: {
          username: user,
        },
      });
      console.log(response?.data);
      setGetCertFiles(response?.data?.certsArray)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (certCreated ? user !== " " && certCreated : user !== " ") {
      setTimeout(() => {
        handleGetCertNAwards()
      }, 200);
    }
  }, [user, certCreated, certFiles]);

  return (
    <>
      <div
        style={{ backgroundImage: `url(${profileBg})`, paddingBottom: "3rem" }}
      >
        <Navbar2 profPic={profImg !== "" ? profImg : props.selectedFile} />
        <div style={{}}>
          <div
            style={{
              background: `url(${profileHead}) center/cover no-repeat`,
              marginTop: "0rem",
              padding: "1rem",
              height: "18vh",
              boxShadow: "5px 5px 8px rgb(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ position: "relative" }}>
              <Avatar
                alt="Remy Sharp"
                src={profImg !== "" ? profImg : props.selectedFile}
                sx={{
                  width: { xs: 120, sm: 120, md: 80 },
                  height: { xs: 120, sm: 120, md: 80 },
                  border: "0.8rem solid rgb(128,0,128,0.8)",
                }}
              />
              <Tooltip
                sx={{ position: "absolute", bottom: -2, right: -1 }}
                title="Add Profile Pic"
                onClick={props.handleProfPic}
              >
                <IconButton>
                  <AddAPhotoIcon sx={{ fontSize: "25px", color: "white" }} />
                </IconButton>
              </Tooltip>
            </div>
            <Link to="/activitiesPage" style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  mt: 2.5,
                  color: "white",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                <Typography variant="h6">Activities</Typography>
                <KeyboardArrowRightIcon />
              </Box>
            </Link>
          </div>
          <div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", top: "60%", right: "0%" }}>
                {/* Hidden file input */}
                <input
                  ref={(input) => props.setFileInput(input)}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={props.handleFileChange}
                />
              </div>
            </div>
          </div>
        </div>

        <Container sx={{ m: "3rem auto" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <PersonalInfo2
                personalInfoData={personalInfoData}
                setPersonalInfoData={setPersonalInfoData}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CertsNAwards
                setSelectedImage={setSelectedImage}
                selectedImage={selectedImage}
                certFiles={certFiles}
                setCertFiles={setCertFiles}
                setGetCertFiles = {setGetCertFiles}
                getCertFiles={getCertFiles}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <PersonalInfo
                setBio={setBio}
                bio={bio}
                edu={edu}
                setEdu={setEdu}
              />
            </Grid>
          </Grid>
        </Container>

        {/* Footer section */}
      </div>
      <Footer />
    </>
  );
}

export default Profile;
