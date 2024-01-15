import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Fab,
  Grid,
  InputBase,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import View from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircle from "@mui/icons-material/CheckCircle";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { styled } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "../api/axios";
import activityGif from "../assets/activityFileLoader.gif";
import { useAuth } from "./AuthProvider";

const StyledCardAction = styled(CardActions)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "96%", sm: "80%" },
  boxShadow: 24,
  p: 4,
  height: "80%",
  overflow: "auto",
  backgroundColor: "white",
};

function ActivityCards(props) {
  console.log(props.cardArr);
  //controls form editing
  const [disable, setDisable] = useState(props.cardArr.map(() => true));
  //Image selection
  const [selectedImage, setSelectedImage] = useState(
    props.cardArr.map(() => [])
  );
  console.log(selectedImage);
  //Image files length
  const [imageLength, setImageLength] = useState(props.cardArr.map(() => 0));
  const [activityFileUpdate, setActivityFileUpdate] = useState(false);
  const [loadingActivityFiles, setLoadingActivityFiles] = useState(false);

  const { auth } = useAuth();
  const user = auth.username;

  //send Image files
  const handleImageChange = async (e, index) => {
    try {
      const fileInput = document.getElementById("fileInput");
      const files = e.target.files;
      if(files.length > 4){
        alert("You can only select 4 images");

        return fileInput.value = null
      }
      console.log(files);
      const formData = new FormData();
      console.log(formData);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append(`Activity_${i + 1}`, file);
      }

      const response = await axios.post("/activityFiles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          username: user,
          index: index,
        },
        withCredentials: true,
      });
      console.log("success");
      setLoadingActivityFiles(true);
      setActivityFileUpdate((prev) => !prev);
    } catch (err) {
      console.log("failure");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user !== "") {
          await getActivityFiles();
        }
      } catch (err) {
        console.error("Failed to fetch activity files", err);
      }
    };

    fetchData();

    // Do not include selectedImage in the dependency array
  }, [user, activityFileUpdate]);

  const getActivityFiles = async () => {
    try {
      const response = await axios.get("/getActivityFiles", {
        headers: {
          username: user,
        },
        withCredentials: true,
      });
      setLoadingActivityFiles(false);
      setSelectedImage(response?.data);
    } catch (err) {
      console.log("failed", err);
    }
  };

  function done(index) {
    setDisable((prevDisable) => {
      const updatedDisable = [...prevDisable];
      updatedDisable[index] = !updatedDisable[index];
      return updatedDisable;
    });
  }

  console.log(props.cardDetails);
  console.log(props.title);
  console.log(props.description);

  return (
    <Box flex={9} p={3} sx={{}}>
      <Grid container spacing={2}>
        {props.cardArr.map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{}}>
              <CardContent
                sx={{
                  backgroundColor:
                    (index + 1) % 2 === 0 ? "#E85F99" : "#4BE88D",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ color: "white", fontWeight: "600" }}
                >
                  Activity {index + 1}
                </Typography>
              </CardContent>

              <CardMedia
                sx={{ height: 140 }}
                image="https://source.unsplash.com/400x200/?college"
                //image="https://source.unsplash.com/random"
              />
              <CardContent>
                <StyledBox>
                  <InputBase
                    onChange={(e) => props.handleCardEdits(e, index)}
                    size="small"
                    name="title"
                    placeholder="Title..."
                    value={props.cardDetails[index].title}
                    sx={{
                      border: "2px solid skyblue",
                      p: 1,
                      display: props.title[index] ? "none" : "block",
                    }}
                  />

                  <Typography
                    color="primary"
                    variant="h5"
                    sx={{
                      display: props.title[index] ? "block" : "none",
                      fontWeight: 600,
                    }}
                  >
                    {props.cardDetails[index].title}
                  </Typography>

                  <CheckCircle
                    className={`check-${index}`}
                    onClick={() => props.handleTitleStatus(index)}
                    color="primary"
                    sx={{
                      ml: 2,
                      color: props.title[index] ? "green" : "",
                      "&:hover": { cursor: "pointer" },
                      fontSize: "20px",
                    }}
                  />
                </StyledBox>
              </CardContent>
              <CardContent>
                <StyledBox sx={{ mt: "-1rem" }}>
                  <Box>
                    <Typography color="primary" sx={{ fontWeight: 400 }}>
                      Description
                    </Typography>
                    <InputBase
                      fullWidth
                      onChange={(e) => props.handleCardEdits(e, index)}
                      name="description"
                      value={props.cardDetails[index].description}
                      sx={{
                        border: "2px solid skyblue",
                        p: 1,
                        display: props.description[index] ? "none" : "block",
                      }}
                    />
                  </Box>

                  <CheckCircle
                    className={`check-${index}`}
                    onClick={() => props.handleDescriptionStatus(index)}
                    color="primary"
                    sx={{
                      ml: 2,
                      color: props.description[index] ? "green" : "",
                      "&:hover": { cursor: "pointer" },
                      fontSize: "20px",
                    }}
                  />
                </StyledBox>
                <Typography
                  sx={{
                    display: props.description[index] ? "block" : "none",
                    fontWeight: 400,
                  }}
                >
                  {props.cardDetails[index].description}
                </Typography>
              </CardContent>

              <StyledCardAction>
                <Tooltip
                  title="view"
                  onClick={() => props.handleOpenModal(index)}
                >
                  <Button size="small">
                    <Typography>View</Typography>
                    <View sx={{ ml: 2 }} />
                  </Button>
                </Tooltip>

                <Tooltip
                  title="delete card"
                  onClick={() => props.deleteActivity(index)}
                >
                  <Button size="small">
                    <Typography>Delete</Typography>
                    <DeleteIcon sx={{ ml: 2 }} />
                  </Button>
                </Tooltip>
              </StyledCardAction>
            </Card>

            <Modal
              open={
                props.modalStates[index] === undefined
                  ? false
                  : props.modalStates[index]
              }
              onClose={() => props.handleCloseModal(index)}
            >
              <Box sx={style}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: "2rem",
                  }}
                >
                  <div className="activity--form--details">
                    {/*** ORGANIZATION NAME ***/}

                    <Box sx={{ display: "flex", mt: 3 }}>
                      <TextField
                        id={`organization-${index}`}
                        name="organization"
                        value={props.formData[index]?.organization}
                        label="Organization"
                        variant="outlined"
                        onChange={(e) => props.handleFormValueChange(e, index)}
                        sx={{ display: disable[index] ? "none" : "block" }}
                      />
                      <span>
                        <Typography
                          variant="h5"
                          color="primary"
                          sx={{
                            display: disable[index] ? "block" : "none",
                            fontWeight: 500,
                          }}
                        >
                          Organization Name
                        </Typography>

                        <Typography
                          sx={{
                            display: disable[index] ? "block" : "none",
                            border: "2px solid plum",
                            p: 2,
                            mt: 1,
                            borderRadius: 2,
                            fontSize: "15px",
                          }}
                        >
                          {props.formData[index]?.organization}
                        </Typography>
                      </span>
                    </Box>

                    {/*** TITLE / POSITION ***/}

                    <Box sx={{ display: "flex", mt: 3 }}>
                      <TextField
                        id={`position-${index}`}
                        name="position"
                        value={props.formData[index]?.position}
                        label="Position/Title"
                        variant="outlined"
                        onChange={(e) => props.handleFormValueChange(e, index)}
                        sx={{ display: disable[index] ? "none" : "block" }}
                      />
                      <Box>
                        <Typography
                          variant="h5"
                          color="primary"
                          sx={{
                            display: disable[index] ? "block" : "none",
                            fontWeight: 500,
                          }}
                        >
                          Position/Title
                        </Typography>

                        <Typography
                          sx={{
                            display: disable[index] ? "block" : "none",
                            border: "2px solid plum",
                            p: 2,
                            mt: 1,
                            borderRadius: 2,
                            fontSize: "15px",
                          }}
                        >
                          {props.formData[index]?.position}
                        </Typography>
                      </Box>
                    </Box>

                    {/*** DESCRIPTION ***/}
                    <Box sx={{ display: "flex", mt: 3 }}>
                      <Box sx={{ display: disable[index] ? "none" : "block" }}>
                        <TextField
                          fullWidth
                          id={`description-${index}`}
                          name="activityDesc"
                          value={props.formData[index]?.activityDesc}
                          label="Description"
                          variant="outlined"
                          inputProps={{ maxLength: 750 }}
                          onChange={(e) =>
                            props.handleFormValueChange(e, index)
                          }
                        />
                        <Typography
                          color="error"
                          sx={{
                            mt: 1,
                          }}
                        >
                          *Please you have a character limit of 750
                          <span>
                            {" "}
                            *For convenience,you may copy and paste from your
                            word editor.
                          </span>
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          variant="h5"
                          color="primary"
                          sx={{
                            display: disable[index] ? "block" : "none",
                            fontWeight: 500,
                          }}
                        >
                          Description
                        </Typography>

                        <Typography
                          sx={{
                            display: disable[index] ? "block" : "none",
                            border: "2px solid plum",
                            p: 2,
                            mt: 1,
                            borderRadius: 2,
                            fontSize: "15px",
                          }}
                        >
                          {props.formData[index]?.activityDesc}
                        </Typography>
                      </Box>
                    </Box>
                  </div>
                  {/**  IMAGES ** */}
                  <div className="activity--form--image">
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 400 }}>
                      Add Images Of Your Activity
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Badge badgeContent={imageLength[index]} color="error">
                        <AddAPhotoIcon color="secondary" />
                      </Badge>
                      <input
                        type="file"
                        accept="image/*"
                        id="fileInput"
                        multiple
                        onChange={(e) => handleImageChange(e, index)}
                      />
                    </Box>
                    <Grid container spacing={2} sx={{ mt: 4 }}>
                      {loadingActivityFiles ? (
                        <div >
                          <img style={{height:"100%",width:"100%"}} src={activityGif}/>
                        </div>
                      ) : (
                        selectedImage[index] &&
                        selectedImage[index].map((image, imageIndex) => (
                          <Grid item xs={12} sm={6} key={imageIndex}>
                            <img
                              key={imageIndex}
                              src={image}
                              alt={`activity-image-${imageIndex}`}
                              style={{
                                display: "block",
                                objectFit: "cover",
                                width: "100%",
                                marginTop: "10px",
                                boxShadow: "5px 10px 23px rgb(0,0,0,0.3)",
                              }}
                            />
                          </Grid>
                        ))
                      )}
                    </Grid>
                  </div>
                </Box>
                <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                  <Button
                    onClick={() => done(index)}
                    sx={{
                      bgcolor: "purple",
                      color: "white",
                      "&:hover": { bgcolor: "plum", color: "white" },
                    }}
                  >
                    {disable[index] ? "Edit" : "Done"}
                  </Button>
                </Box>
              </Box>
            </Modal>
          </Grid>
        ))}
      </Grid>

      {/* ADD CARD BUTTON */}
      <Box>
        <Tooltip title="Add Activity">
          <Fab
            onClick={props.addCard}
            aria-label="add"
            sx={{
              position: "fixed",
              bottom: "20px",
              left: { xs: "44%", sm: "5%" },
              backgroundColor: "#5FE88D",
              color: "white",
              "&:hover": {
                backgroundColor: "#4CD77E",
              },
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default ActivityCards;
