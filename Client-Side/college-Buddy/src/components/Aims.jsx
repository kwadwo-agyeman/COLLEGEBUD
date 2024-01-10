import React from "react";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";

import {
  Card,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  Typography,
  styled,
  Box,
  
} from "@mui/material";
import Assist from "@mui/icons-material/ImportContacts";
import Essay from "@mui/icons-material/BorderColor";
import SchoolSelect from "@mui/icons-material/Apartment";
import Forums from "@mui/icons-material/People";
import FinAid from "@mui/icons-material/MonetizationOn";
import BookIcon from "@mui/icons-material/Book";

const StyledContainer = styled(Container)({
  background: "",
  marginTop: 50,
  marginBottom: 50,
  padding: "10px 0",
  borderRadius: "20px",
});
const AimBox = styled(Box)({
  padding: "20px",
});

function Aims() {
  return (
    <StyledContainer sx={{}}>
      <CssBaseline />
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#5FE88D",
          fontWeight: 600
        }}
      >
        AIMS
      </Typography>
      <AimBox>
        <Grid container spacing={4}>
          {aimsArr.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  boxShadow: "1rem 1rem 2rem rgb(0,0,0,0.1)",
                  background: "#7FC8F8",
                  height: "fit-content"
                  // height:{xs:"40vh",sm:"40vh",md:"65vh"}
                }}
              >
                <CardContent sx={{display:"flex",flexDirection:"column",justifyContent:"space-evenly"}}>
                  <Box
                    sx={{
                      background: "white",
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      border: "4px solid plum",
                      p: "2px 0",
                      
                
                    }}
                  >
                    <Box sx={{ display: "grid", placeItems: "center"}}>
                      {card.icon}
                    </Box>
                  </Box>
                  <Typography
                    gutterBottom
                    variant="h6"
                    sx={{ textAlign: "center", color:"white",fontWeight: 600 }}
                  >
                    {card.heading}
                  </Typography>
                  <Typography
                    sx={{
                      background: "#5AA9E6",
                      color: "white",
                      p: 3,
                      borderRadius: 5,
                      textAlign: "center",
                      fontWeight: 500,
                    }}
                  >
                    {card.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </AimBox>
    </StyledContainer>
  );
}

export default Aims;

const aimsArr = [
  {
    icon: <Assist color="primary" sx={{marginTop: "3px", fontSize: "30px"}}/>,
    heading: "Guidance on Application Process",
    content:
      "Provide step-by-step guidance on the college application process, helping students understand the requirements, deadlines, and necessary documents.",
  },
  {
    icon: <Essay color="error" sx={{marginTop: "3px", fontSize: "30px"}}/>,
    heading: "Resource Repository",
    content:
      "Offer a comprehensive repository of resources, including sample essays, recommendation letter guidelines, and tips for crafting a standout application.",
  },
  {
    icon: <SchoolSelect color="secondary" sx={{marginTop: "3px", fontSize: "30px"}}/>,
    heading: "College Selection Assistance",
    content:
      "Assist students in researching and selecting colleges that align with their academic and personal goals. Provide information on admission criteria, campus culture, and available programs.",
  },
  {
    icon: <BookIcon color="error" sx={{marginTop: "3px", fontSize: "30px"}}/>,
    heading: "Test Preparation Support",
    content:
      "Offer resources and advice for standardized test preparation, including SAT or ACT guidance, practice exams, and tips for improving test scores.",
  },
  {
    icon: <FinAid color="secondary" sx={{marginTop: "3px", fontSize: "30px"}}/>,
    heading: "Financial Aid Information",
    content:
      "Provide information on scholarships, grants, and financial aid options. Help students understand the financial aspects of attending college and how to navigate the application for financial assistance.",
  },
  {
    icon: <Forums color="success" sx={{marginTop: "3px", fontSize: "30px"}}/>,
    heading: "Community and Forums",
    content:
      "Create a supportive online community or forums where students can connect, share experiences, and seek advice from peers who have gone through the application process or are currently applying to colleges.",
  },
];
