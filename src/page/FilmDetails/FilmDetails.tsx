import { useEffect, useState, Suspense } from "react";
import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import { getMoviesById } from "../../services/movies-api";
import { FilmDetailsInterface, Genre } from "../../models/filmDetails";
import ReplyIcon from "@mui/icons-material/Reply";
import { AdditionalInformation } from "../../components/AdditionalInformation";

export default function FilmDetails() {
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState<FilmDetailsInterface | null>(null);
  const location = useLocation();
  
  useEffect(() => {
    getMoviesById(movieId).then(setMovieInfo);
  }, [movieId]);
  if (!movieInfo) {
    return null;
  }
  const movieYear = new Date(movieInfo.release_date).getFullYear();
  const getGenres = (genres: Genre[] | undefined) => {
    if (!genres) {
      return;
    }
    return genres.map((genre) => genre.name).join(", ");
  };
  const getPoster = (poster: string | undefined) => {
    if (!poster) {
      return;
    }
    return `https://image.tmdb.org/t/p/w400/${poster}`;
  };
    
  const backLinkHref = location.state?.from ?? { pathname: "/" };

  return (
    <div className="w-[1650px] ml-auto mr-auto mt-10">
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
          <div className="text-2xl font-medium">
            User score: {movieInfo.vote_average}
          </div>
          <div>
            <span className="text-2xl font-medium">Overview:</span>
            <p className="text-xl font-normal">{movieInfo.overview}</p>
          </div>
          <div>
            <span className="text-2xl font-medium">Genres:</span>
            <p className="text-xl font-normal">{getGenres(movieInfo.genres)}</p>
          </div>
        </div>
      </div>
      <AdditionalInformation link={backLinkHref} />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
}
