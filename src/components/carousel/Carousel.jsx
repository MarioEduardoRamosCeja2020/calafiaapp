import React from "react";
import Slider from "react-slick";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const images = [
  { url: "https://picsum.photos/800/300?1", title: "Imagen 1" },
  { url: "https://picsum.photos/800/300?2", title: "Imagen 2" },
  { url: "https://picsum.photos/800/300?3", title: "Imagen 3" },
];

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      {images.map((img, i) => (
        <Card key={i} sx={{ margin: "auto" }}>
          <CardMedia
            component="img"
            height="300"
            image={img.url}
            alt={img.title}
          />
          <CardContent>
            <Typography variant="h6" align="center">
              {img.title}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Slider>
  );
}
