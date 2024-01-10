import React, { useState } from "react";
import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function Bio(props) {
  const [edit, setEdit] = useState(false);
  // const [bio, setBio] = useState({ bio: "" });
  const handleBio = (e) => {
    const { name, value } = e.target;
    props.setBio((prevBio) => ({ ...prevBio, [name]: value }));
  };
  const toggleEdit = () => {
    setEdit((prev) => !prev);
  };

  return (
    <div>
      <Card
        sx={{
          backgroundColor: "rgb(162, 143, 227,0.8)",
          backdropFilter: "blur(8px)",
          borderRadius: "10px",
          position: "relative",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: "white",
              backgroundColor: "purple",
              p: "3px 10px",
              width: "fit-content",
              borderRadius: "5px",
              fontWeight: 500,
            }}
          >
            Bio
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
            <Box sx={{ display: edit ? "block" : "none" }}>
              <TextField
                id="bio"
                name="bio"
                placeholder="Let Colleges Know You ?"
                variant="standard"
                value={props.bio.bio}
                onChange={handleBio}
                inputProps={{ maxLength: 250 }}
              />
              <Typography color="error">
                *You have a 250 character limit
              </Typography>
            </Box>
            <Typography
              sx={{
                color: "white",
                display: edit ? "none" : "block",
              }}
            >
              {props.bio.bio}
            </Typography>
            <EditIcon
              onClick={toggleEdit}
              sx={{
                color: "purple",
                position: "absolute",
                right: "5%",
                bottom: "5%",
                "&:hover":{
                    cursor:"pointer"
                }
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default Bio;
