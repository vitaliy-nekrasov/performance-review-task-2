import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FilmDetailsInterface } from "../models/filmDetails";

interface FilmCardProps {
  film: FilmDetailsInterface;
}

const Content = styled(CardContent)({
  height: '225px'
});
const Overview = styled(Typography)({
  height: "120px",
});
const FilmCards = styled(Card)({
  transition: 'all .5s ease',
  "&:hover": {
    scale: '1.05',
    transition: 'all .5s ease'
  },
});

export default function FilmCardFavorites({ film }: FilmCardProps) {
  return (
    <FilmCards sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`https://image.tmdb.org/t/p/w400/${film.poster_path}`}
          alt={film.title}
        />
        <Content>
          <Typography
            className="h-[64px]"
            gutterBottom
            variant="h5"
            component="div"
          >
            {film.title}
          </Typography>
          <Overview
            variant="body2"
            color="text.secondary"
            className="line-clamp-6"
          >
            {film.overview}
          </Overview>
        </Content>
      </CardActionArea>
    </FilmCards>
  );
}
