import React from "react";
import Navbar from "./components/Navbar";
import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SignUpImg from "./assets/signUpBg.jpg";
import axios from "./api/axios";
import View from "@mui/icons-material/RemoveRedEyeOutlined";
import Footer from "./components/Footer";
import {
  Box,
  Card,
  TextField,
  FormControl,
  InputLabel,
  Button,
  Divider,
} from "@mui/material";

function SignUp() {
  //standards for password and useraname
  const REGEX_USER = /^[a-zA-Z][a-zA-Z0-9-_]{5,20}$/;
  const REGEX_PWD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@%$#]).{8,24}$/;
  const REGISTER_URL = "/register";

  //useRefs
  const firstnameRef = useRef();
  const errRef = useRef();

  //useStates
  const [startDate, setStartDate] = useState(new Date());

  const dob = startDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
  console.log(dob)
  
  const [showPwd, setShowPwd] = useState({
    password: false,
    confirmPwd: false,
  });
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    highschool: "",
    address: "",
    username: "",
    password: "",
    confirmPwd: "",
  });
  console.log(formData);
  const [correctPwd, setCorrectPwd] = useState(false);
  const [correctUser, setCorrectUser] = useState(false);
  const [correctMatch, setMatchPwd] = useState(false);

  const [pwdFocus, setPwdFocus] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  console.log(correctUser, correctPwd);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [registeredUser, setRegisteredUser] = useState("");
  console.log(registeredUser);

  const firstname = formData.firstname;
  const lastname = formData.lastname;
  const email = formData.email;
  const highschool = formData.highschool;
  const address = formData.address;
  const user = formData.username;
  const pwd = formData.password;
  const matchPwd = formData.confirmPwd;

  useEffect(() => {
    setTimeout(() => {
      firstnameRef.current.focus();
    }, 0);
  }, []);

  useEffect(() => {
    setCorrectUser(REGEX_USER.test(user));
  }, [user]);

  useEffect(() => {
    setCorrectPwd(REGEX_PWD.test(pwd));
    const match = pwd === matchPwd;
    if (match) {
      setMatchPwd(true);
    } else {
      setMatchPwd(!true);
    }
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [pwd, user, matchPwd]);

  //store form data
  const signUpData = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  //handle password display
  const handlePwdDisplay = (field) => {
    setShowPwd((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  ///send form data
  const sendFormData = async (e) => {
    e.preventDefault();
    const hackuser = REGEX_USER.test(user);
    const hackpwd = REGEX_PWD.test(pwd);
    if (!hackpwd || !hackuser) {
      setErrMsg("Invalid Entry!");
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({firstname,lastname,email,address,highschool, user, pwd, dob}),
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );

      setSuccess(true);
      setRegisteredUser(response.data.message);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server connected");
      } else if (err.response?.status === 409) {
        setErrMsg("Username already exists");
      } else {
        setErrMsg("Registration failed!");
      }
    }
  };
  return (
    <Box
      sx={{
        background: `linear-gradient(145deg, rgba(0,0,0,0.3), rgb(59, 126, 152,0.7)), url(${SignUpImg}) center/cover no-repeat`,
        padding: "5rem 0",
        height: { xs: "160vh", sm: "120vh", md: "200vh" },
        position: "relative",
      }}
    >
      <Navbar />
      <Card
        sx={{
          width: {
            xs: "90%",
            sm: "90%",
            md: "50%",
            position: success && "absolute",
            top: "50%",
            left: "50%",
            transform: success && "translate(-50%,-50%)",
          },
          margin: "2rem auto",
          borderLeft: "0.5rem solid plum",
          p: "5rem 2rem",
        }}
      >
        {" "}
        {success ? (
          <div style={{ margin: "0 auto" }}>
            <div>{registeredUser}</div>
          </div>
        ) : (
          <form>
            {errMsg && (
              <p
                ref={errRef}
                style={{
                  margin: "-20px auto 3rem",
                  borderRadius: "10px",
                  background: "red",
                  color: "white",
                  padding: "5px 0",
                  textAlign: "center",
                }}
              >
                {errMsg}
              </p>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 5,
                // alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <FormControl sx={{ width: { xs: "100%", sm: "48%" } }}>
                <TextField
                  ref={firstnameRef}
                  required
                  id="first-name"
                  name="firstname"
                  value={formData.firstname}
                  label="First Name"
                  placeholder="College"
                  variant="outlined"
                  onChange={signUpData}
                />
              </FormControl>
              <FormControl sx={{ width: { xs: "100%", sm: "48%" } }}>
                <TextField
                  required
                  id="last-name"
                  name="lastname"
                  value={formData.lastname}
                  label="Last Name"
                  placeholder="Buddy"
                  variant="outlined"
                  onChange={signUpData}
                />
              </FormControl>
            </Box>

            <FormControl fullWidth sx={{ mt: 3 }}>
              <TextField
                required
                id="email"
                name="email"
                value={formData.email}
                label="Email"
                placeholder="collegebud23@gmail.com"
                variant="outlined"
                type="email"
                onChange={signUpData}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mt: 3 }}>
              <TextField
                required
                id="highschool-name"
                name="highschool"
                value={formData.highschool}
                label="Highschool Name"
                placeholder="Highschool"
                variant="outlined"
                onChange={signUpData}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mt: 3 }}>
              <TextField
                required
                id="physical-address"
                name="address"
                value={formData.address}
                label="Physical Address"
                placeholder="Physical Address"
                variant="outlined"
                onChange={signUpData}
              />
            </FormControl>

            <div
              style={{
                border: "1px solid grey",
                marginTop: "1.5rem",
                padding: "1rem",
                borderRadius: "5px",
              }}
            >
              <InputLabel sx={{ marginBottom: "0.5rem" }}>
                Date of Birth
              </InputLabel>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showYearDropdown
                dateFormat="dd/MM/yyyy"
                className="form-control"
              />
            </div>

            <Divider sx={{ mt: 2 }}></Divider>

            {/*************************************** *********************************************/}

            <FormControl fullWidth sx={{ mt: 3 }}>
              <TextField
                required
                id="username"
                name="username"
                value={formData.username}
                label="Username"
                placeholder="kwadwo234"
                variant="outlined"
                color={correctUser ? "secondary" : "error"}
                aria-invalid={correctUser ? "false" : "true"}
                aria-describedby="usernote"
                onChange={signUpData}
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />

              <p
                id="usernote"
                style={{
                  display: userFocus && !correctUser ? "block" : "none",
                }}
              >
                Username must be between 5 to 20 characters <br />
                Username should start with a letter, either capital letters or
                small letters <br />
                There should be no addition of special characters, hyphens and
                underscores are exceptions, in useraname, just numericals and
                letters <br />
              </p>
            </FormControl>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <FormControl
                fullWidth
                sx={{
                  mt: 3,
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "95% 5%",
                    gap: "3px",
                  }}
                >
                  <TextField
                    required
                    id="password"
                    name="password"
                    value={formData.password}
                    label="Password"
                    placeholder="col34BUD@"
                    variant="outlined"
                    color={correctPwd ? "secondary" : "error"}
                    aria-invalid={correctPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    type={showPwd.password ? "text" : "password"}
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    onChange={signUpData}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    <View
                      sx={{ m: "auto 0" }}
                      onClick={() => handlePwdDisplay("password")}
                    />
                  </Box>
                </Box>
                <p
                  id="pwdnote"
                  style={{
                    display: pwdFocus && !correctPwd ? "block" : "none",
                  }}
                >
                  Pasword must be between 8 to 24 characters. <br />
                  Password must include at least a number and a unique character
                  like <span aria-label="at sign">@</span>
                  <span aria-label="percentage sign">%</span>{" "}
                  <span aria-label="ampersand sign">&</span>{" "}
                  <span aria-label="hashtag sign">#</span>
                </p>
              </FormControl>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <FormControl
                fullWidth
                sx={{
                  mt: 3,
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "95% 5%",
                    gap: "3px",
                  }}
                >
                  <TextField
                    required
                    id="confirm-password"
                    name="confirmPwd"
                    value={formData.confirmPwd}
                    label="Confirm Password"
                    variant="outlined"
                    color={correctMatch ? "secondary" : "error"}
                    aria-invalid={correctMatch ? "false" : "true"}
                    aria-describedby="matchnote"
                    type={showPwd.confirmPwd ? "text" : "password"}
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    onChange={signUpData}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    <View
                      sx={{ m: "auto 0" }}
                      onClick={() => handlePwdDisplay("confirmPwd")}
                    />
                  </Box>
                </Box>

                <p
                  id="matchnote"
                  style={{
                    display: matchFocus && !correctMatch ? "block" : "none",
                  }}
                >
                  Confirm Password should match password.
                </p>
              </FormControl>
            </Box>

            <Box sx={{ mb: -5, mt: 2, display: "grid", placeItems: "center" }}>
              <Button
                sx={{
                  backgroundColor: "plum",
                  "&:hover": {
                    backgroundColor: "rgb(249, 156, 249)",
                  },
                }}
                variant="contained"
                disabled={
                  !correctUser ||
                  !correctPwd ||
                  !correctMatch ||
                  email === "" ||
                  highschool === "" ||
                  firstname === "" ||
                  lastname === "" ||
                  address === ""
                    ? true
                    : false
                }
                onClick={sendFormData}
              >
                Create Account
              </Button>
            </Box>
          </form>
        )}
      </Card>
      <Box sx={{ position: "absolute", bottom: 0, left: 0, width: "100%" }}>
        <Footer />
      </Box>
    </Box>
  );
}
export default SignUp;
