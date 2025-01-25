import { useEffect, useState, Suspense, useContext } from "react";
import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import { getMoviesById } from "../../services/movies-api";
import { FilmDetailsInterface, Genre } from "../../models/filmDetails";
import ReplyIcon from "@mui/icons-material/Reply";
import { AdditionalInformation } from "../../components/AdditionalInformation";
import { Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { User, Result } from "../../models/models";
import { AuthContext } from "../../services/AuthContext";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import StringList from "../../components/StringList";
import {
  Wrapper,
  BackLink,
  ContentWrapper,
  PosterImage,
  InfoWrapper,
  Title,
  UserScore,
  Section,
  StyledButton,
} from "./FilmDetails.styled";

export default function FilmDetails() {
  const { isLoggedIn } = useContext(AuthContext);
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState<FilmDetailsInterface | null>(null);
  const [inFavorites, setInFavorites] = useState(false);
  const location = useLocation();

  const loggedInUser = useLoggedInUser();

  let usersData: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  const userInArrayIndex = usersData.findIndex(
    (user) => user.email === loggedInUser?.email
  );

  useEffect(() => {
    getMoviesById(movieId).then(setMovieInfo);

    if (userInArrayIndex !== -1) {
      const isDuplicate = usersData[userInArrayIndex].favorites?.some(
        (favorite) => favorite.id === movieInfo?.id
      );
      if (isDuplicate) {
        setInFavorites(true);
      }
    }
  }, [movieId, movieInfo?.id, userInArrayIndex, usersData, loggedInUser]);
  if (!movieInfo) {
    return null;
  }
  const movieYear = new Date(movieInfo.release_date).getFullYear();
  const getGenres = (genres: Genre[]) => {
    return genres.map((genre) => genre.name);
  };
  const getPoster = (poster: string | undefined) => {
    if (!poster) {
      return;
    }
    return `https://image.tmdb.org/t/p/w400/${poster}`;
  };

  const backLinkHref = location.state?.from ?? { pathname: "/" };

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#eb3211",
    },
  });

  function addToFavorites(movieInfo: FilmDetailsInterface) {
    if (userInArrayIndex !== -1) {
      if (!usersData[userInArrayIndex].favorites) {
        usersData[userInArrayIndex].favorites = [];
      }

      const isDuplicate = usersData[userInArrayIndex].favorites?.some(
        (favorite) => favorite.id === movieInfo.id
      );

      if (!isDuplicate) {
        usersData[userInArrayIndex].favorites?.push(movieInfo);
        localStorage.setItem("users", JSON.stringify(usersData));
      } else {
        console.error("This movie is already in favorites.");
      }

      return usersData;
    } else {
      console.error("Logged in user not found in users data.");
      return null;
    }
  }

  function removeFromFavorites(movieId: number) {
    if (userInArrayIndex !== -1) {
      if (usersData[userInArrayIndex].favorites) {
        const indexToRemove: number | undefined = usersData[
          userInArrayIndex
        ].favorites?.findIndex((favorite) => favorite.id === movieId);

        if (indexToRemove !== -1 && indexToRemove !== undefined) {
          usersData[userInArrayIndex].favorites?.splice(indexToRemove, 1);
          localStorage.setItem("users", JSON.stringify(usersData));
          setInFavorites(false);
        } else {
          console.error("Movie not found in favorites.");
        }
      }
      return usersData;
    }
  }

  return (
  <Wrapper>
    <BackLink to={backLinkHref}>
      <ReplyIcon />
      <p>Go Back</p>
    </BackLink>
    <ContentWrapper>
      <PosterImage src={getPoster(movieInfo.poster_path)} alt="" />
      <InfoWrapper>
        <Title>
          {movieInfo.original_title} ({movieYear})
        </Title>
        <UserScore>
          User score:
          <StyledRating name="read-only" value={movieInfo.vote_average} readOnly max={10} />
        </UserScore>
        <Section>
          <span>Overview:</span>
          <p>{movieInfo.overview}</p>
        </Section>
        <Section>
          <span>Genres:</span>
          <StringList strings={getGenres(movieInfo.genres)} />
        </Section>
        {isLoggedIn && (
          <div>
            {inFavorites ? (
              <StyledButton
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => removeFromFavorites(Number(movieId))}
              >
                Remove from favorites
              </StyledButton>
            ) : (
              <StyledButton
                variant="contained"
                color="secondary"
                onClick={() => addToFavorites(movieInfo)}
              >
                Add to favorites
              </StyledButton>
            )}
          </div>
        )}
      </InfoWrapper>
    </ContentWrapper>
    <AdditionalInformation link={backLinkHref} />
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
  </Wrapper>
  );
}
