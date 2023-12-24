import React from "react";
import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../services/movies-api";
import { Result } from "../../models/models";
import FilmCard from "../../components/FilmCard";
import { Link } from "react-router-dom";

export default function Home() {
  const [trendingFilms, setTrendingFilms] = useState<Result[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getTrendingMovies()
      .then((movies) => setTrendingFilms(movies))
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  }, []);
  console.log(trendingFilms);
  
  return (
    <div>
      <h1 className="text-center p-9 text-5xl font-bold text-gray-700">
        Trending today
      </h1>
      {trendingFilms.length !== 0 && (
        <div className="grid grid-cols-4 w-[1650px] ml-auto mr-auto gap-x-[90px]">
          {trendingFilms.map((film) => (
            <Link to={`/movies/${film.id}`} key={film.id} className="h-[785px]">
              <FilmCard film={film} />
            </Link>
          ))}
        </div>
      )}
      {trendingFilms.length === 0 && error !== "" && <h3>Error</h3>}
    </div>
  );
}