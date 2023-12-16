import React from "react";
import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../services/movies-api";
import { Result } from "../../models/models";

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

  return (
    <div>
      <h1>Trending today</h1>
      {trendingFilms.length !== 0 && (
        <div>
          {trendingFilms.map((film) => (
            <div key={film.id}>
              <img
                src={`https://image.tmdb.org/t/p/w400/${film.poster_path}`}
                alt={film.title}
              />
              <h2>{film.title}</h2>
            </div>
          ))}
        </div>
      )}
      {trendingFilms.length === 0 && error !== "" && <h3>Error</h3>}
    </div>
  );
}