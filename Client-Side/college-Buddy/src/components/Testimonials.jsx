import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";

export default function Faq() {
  const data = [
    {
      image:
        "https://images.pexels.com/photos/1820919/pexels-photo-1820919.jpeg?auto=compress&cs=tinysrgb&w=600",
      testimonial:
        "Incredible app! It made managing my college activities a breeze. The intuitive design and useful features saved me time and stress. A must-have for every student striving for efficiency and success!",
    },
    {
      image:
        "https://images.pexels.com/photos/718978/pexels-photo-718978.jpeg?auto=compress&cs=tinysrgb&w=600",
      testimonial:
        "Life-changing app! Streamlined my college activities effortlessly. User-friendly and essential for every student. Highly recommend for efficiency!",
    },
    {
      image:
        "https://images.pexels.com/photos/1757281/pexels-photo-1757281.jpeg?auto=compress&cs=tinysrgb&w=600",
      testimonial:
        "Life-saver! This app transformed how I handle my college activities. It's user-friendly, organized, and efficient. Highly recommended for students looking to optimize their academic and extracurricular tasks.",
    },
    {
      image:
        "https://images.pexels.com/photos/2701660/pexels-photo-2701660.jpeg?auto=compress&cs=tinysrgb&w=600",
      testimonial:
        "Essential for students! This app simplified my college life. It's user-friendly, visually appealing, and packed with features that made managing activities enjoyable. I recommend it to every college student out there!",
    },
  ];

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#5FE88D",
          fontWeight: 600,
        }}
      >
        TESTIMONIALS
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "fit-content",
          mt: 4,
          mb: 5,
          ml: 2,
          mr: 2,
        }}
      >
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            // When window width is >= 768px
            768: {
              slidesPerView: 2,
            },
            // When window width is < 768px
            0: {
              slidesPerView: 1,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
          centeredSlides={true}
          centeredSlidesBounds={true}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Avatar
                  alt={`Testimonial ${index + 1}`}
                  src={item.image}
                  sx={{ width: 80, height: 80, border: "1rem solid plum" }}
                />
              </Box>
              <Card
                sx={{
                  mt: 3,
                  color: "white",
                  bgcolor: "#5AA9E6",
                  fontWeight: 500,
                  width: { sx: "95%", sm: "30vw" },
                  margin: "10px auto",
                }}
              >
                <CardContent>{item.testimonial}</CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
}
