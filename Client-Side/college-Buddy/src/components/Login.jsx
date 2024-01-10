import React from "react";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled } from "@mui/material";
import axios from "../api/axios";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useAuth } from "./AuthProvider";

const ImageBox = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("md")]: {
    display: "block",
  },
}));

function Login() {
  const AUTH_LOGIN = "/auth";
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const sendlLogins = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        AUTH_LOGIN,
        JSON.stringify({ username, password }),
        {
          headers: {
            "Content-Type": "application/json",
            
          },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ username, password, accessToken, roles });
      setPassword("");
      setUsername("");
      if (response?.status === 200) {
        setMsg(response?.data?.message);
      }
      navigate("/profile");
      setTimeout(() => {
        setMsg("");
      }, 3000);
    } catch (err) {
      if (!err?.response) {
        setMsg("No Server Available");
      } else if (err?.response?.status === 400) {
        setMsg("Username or Password required");
      } else if(err?.response?.status === 401){
        setMsg("Login Unsuccessful")
      }
      else {
        setMsg("Login Failed");
      }
      console.log(err);
      setTimeout(() => {
        setMsg("");
      }, 3000);
    }
  };
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Box
          flex={{ xs: 12, sm: 12, md: 6 }}
          sx={{ width: { xs: "90%", sm: "90%", md: "50%" } }}
        >
          {msg && (
            <p
              style={{
                textAlign: "center",
                background: "#D00000",
                color: "white",
                padding: "5px",
                fontSize: "1rem",
                borderRadius: "3px",
                fontWeight: "600px",
              }}
            >
              {msg}
            </p>
          )}
          <Typography
            variant="h4"
            color="primary"
            sx={{
              fontSize: { xs: "50", sm: "100" },
              textAlign: { xs: "center", sm: "center", fontWeight: "bold" },
            }}
          >
            LOGIN
          </Typography>
          <form>
            <TextField
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="outlined-required"
              label="Username"
              placeholder="Username"
              size="small"
              fullWidth
              sx={{ mt: 5 }}
            />
            <br />
            <br />
            <TextField
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              label="Password"
              placeholder="Password"
              size="small"
              fullWidth
              sx={{ mt: 3 }}
            />
            <br />
            <br />

            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Link>
                <Button
                  variant="contained"
                  onClick={sendlLogins}
                  sx={{
                    backgroundColor: "#5FE88D",
                    "&:hover": { backgroundColor: "green" },
                  }}
                >
                  Sign In
                </Button>
              </Link>

              <Link to="/signup">
                <Button
                  variant="contained"
                  // onClick={navToProfile}
                  sx={{
                    backgroundColor: "#5FE88D",
                    "&:hover": { backgroundColor: "green" },
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </form>
          <Divider sx={{ mt: 3 }}>
            <Typography>Login With</Typography>
          </Divider>
          <br />
          <Button variant="contained" fullWidth>
            <GoogleIcon />
            <Typography sx={{ ml: 1 }}>Login with Google</Typography>
          </Button>
          <br />
          <br />
          <Button variant="contained" fullWidth>
            <FacebookIcon />
            <Typography sx={{ ml: 1 }}> Login with Facebook</Typography>
          </Button>
        </Box>

        <ImageBox flex={6}>
          <img
            src="https://images.pexels.com/photos/5588210/pexels-photo-5588210.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt="login-image"
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          ></img>
        </ImageBox>
      </Stack>
    </Box>
  );
}

export default Login;
