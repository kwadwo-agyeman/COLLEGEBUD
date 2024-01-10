import React, { useState } from "react";
import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function Education(props) {
  const [edit, setEdit] = useState(true);
  // const [edu, setEdu] = useState({ highschool: "", address: "", year: "" });
  const handleEdu = (e) => {
    const { name, value } = e.target;
    props.setEdu((prevEdu) => ({ ...prevEdu, [name]: value }));
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
            Education
          </Typography>
          <br />
          <Box sx={{ mt: 1, mb: 3 }}>
            <Box>
              <Typography sx={{color:"white"}}>Highschool Name</Typography>
              <TextField
                fullWidth
                id="highschool"
                name="highschool"
                // label="Highschool Name"
                value={props.edu.highschool}
                onChange={handleEdu}
                sx={{
                  display: edit ? "block" : "none",
                  mt: 2,
                  bgcolor: "white",
                  borderRadius: 1,
                }}
                placeholder="Highschool"
                variant="outlined"
              />
              <br />
              
              <Typography sx={{color:"white"}}>Highschool location</Typography>

              <TextField
                fullWidth
                id="address"
                name="address"
                // label="Highschool location"
                value={props.edu.address}
                onChange={handleEdu}
                sx={{
                  display: edit ? "block" : "none",
                  mt: 2,
                  bgcolor: "white",
                  borderRadius: 1,
                }}
                placeholder="Highschool Address"
                variant="outlined"
              />
              <br />

              <Typography sx={{color:"white"}}>
                Date of Completion/Expected Date of Completion
              </Typography>

              <TextField
                fullWidth
                id="yaer"
                name="year"
                // label="Date of Completion/Expected Date of Completion"
                value={props.edu.year}
                onChange={handleEdu}
                sx={{
                  display: edit ? "block" : "none",
                  mt: 2,
                  bgcolor: "white",
                  borderRadius: 1,
                }}
                placeholder="mm/dd/yyyy"
                variant="outlined"
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default Education;
