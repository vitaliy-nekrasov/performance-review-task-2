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
    <div className="w-[1550px] ml-auto mr-auto mt-10">
      <Link
        to={backLinkHref}
        className="flex gap-x-[4px] w-[120px] h-[40px] bg-gray-500 text-white font-semibold justify-center items-center rounded-md"
      >
        <ReplyIcon />
        <p>Go Back</p>
      </Link>
      <div className="mt-10 flex gap-x-[42px]">
        <img src={getPoster(movieInfo.poster_path)} alt="" />
        <div className="flex flex-col gap-y-[24px]">
          <h1 className="text-4xl font-bold">
            {movieInfo.original_title} ({movieYear})
          </h1>
          <div className="text-2xl font-medium flex items-center gap-2">
            User score:
            <StyledRating
              name="read-only"
              value={movieInfo.vote_average}
              readOnly
              max={10}
            />
          </div>
          <div>
            <span className="text-2xl font-medium">Overview:</span>
            <p className="text-xl font-normal">{movieInfo.overview}</p>
          </div>
          <div>
            <span className="text-2xl font-medium">Genres:</span>
            <StringList strings={getGenres(movieInfo.genres)} />
          </div>
          {isLoggedIn && (
            <div>
              {inFavorites ? (
                <Button
                  variant="contained"
                  color="secondary"
                  className="w-[220px]"
                  onClick={() => removeFromFavorites(Number(movieId))}
                >
                  Remove from favorites
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  className="w-[170px]"
                  onClick={() => addToFavorites(movieInfo)}
                >
                  Add to favorites
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <AdditionalInformation link={backLinkHref} />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
}
