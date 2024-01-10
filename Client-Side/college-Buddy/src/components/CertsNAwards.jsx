import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import certHeaderImg from "../assets/cert-header.jpg";
import DownloadIcon from "@mui/icons-material/Download";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "80%" },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const downloadBtnStyles = {
  position: "absolute",
  top: "0%",
  right: "5%",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  bgcolor: "#BC69AA",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "200 all ease",
  "&:hover": {
    cursor: "pointer",
    bgcolor: "white",
    border: "1px solid #BC69AA",
    color: "#BC69AA",
  },
};
function CertsNAwards(props) {
  console.log(props.selectedImage);
  const [zoomCert, setZoomCert] = useState("");
  const [open, setOpen] = React.useState(false);
  ///handle display of certs and awards
  const handleImageChange = (e) => {
    const files = e.target.files;
    props.setCertFiles(files);
    const newImages = Array.from(files).map((file) => ({
      fileName: URL.createObjectURL(file),
    }));
    props.setSelectedImage(newImages);
  };
  //open cert --see the cert bigger
  const handleClose = () => setOpen(false);
  const viewCert = (image) => {
    setOpen(true);
    setZoomCert(image);
  };
  //download the certificate
  const handleCertDownload = (zoomCert) => {
    let index = 0;
    const anchor = document.createElement("a");
    anchor.href = zoomCert;
    anchor.download = `Certificate-${new Date().getTime()}.jpg`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };
  return (
    <div>
      <Card
        sx={{
          backdropFilter: "blur(8px)",
          backgroundColor: "rgb(125, 125, 255,0.3)",
          height: { xs: "fit-content", sm: "25rem" },
          overflow: "auto",
          "&:hover": { boxShadow: "5px 5px 1rem rgb(0,0,0,0.3)" },
        }}
      >
        <Box>
          <CardMedia sx={{ height: "4rem" }} image={certHeaderImg} />
        </Box>
        <CardContent>
          <Typography sx={{ fontWeight: 500, color: "white" }}>
            Certificates and Awards
          </Typography>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <Grid container spacing={2} sx={{ mt: 3 }}>
            {props.getCertFiles.length > 0 
              ? props.getCertFiles.map((Img, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <img
                      key={i}
                      src={Img}
                      alt=""
                      style={{
                        width: "100%",
                        objectFit: "cover",
                        border: "0.5rem solid white",
                        boxShadow: "3px 3px 15px rgb(0,0,0,0.3)",
                        cursor: "pointer",
                      }}
                      onClick={() => viewCert(Img, i)}
                    />
                  </Grid>
                ))
              : props.selectedImage.map((Img, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <img
                      key={i}
                      src={Img.fileName}
                      alt=""
                      style={{
                        width: "100%",
                        objectFit: "cover",
                        border: "0.5rem solid white",
                        boxShadow: "3px 3px 15px rgb(0,0,0,0.3)",
                        cursor: "pointer",
                      }}
                      onClick={() => viewCert(Img.fileName, i)}
                    />
                  </Grid>
                ))}
          </Grid>
        </CardContent>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="zoom--cert"
        aria-describedby="zoom--cert"
      >
        <Box sx={style}>
          <Box
            sx={{ display: "grid", placeItems: "center", position: "relative" }}
          >
            <img
              src={zoomCert}
              alt=""
              style={{
                width: "50vw",
                boxShadow: "5px 3px 10px rgb(0,0,0,0.3) ",
              }}
            />
            <Box
              sx={downloadBtnStyles}
              onClick={() => handleCertDownload(zoomCert)}
            >
              <Tooltip title={"download cert"}>
                <DownloadIcon />
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default CertsNAwards;
