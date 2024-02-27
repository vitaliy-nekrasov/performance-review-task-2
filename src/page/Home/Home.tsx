import React from "react";
import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../services/movies-api";
import { Result } from "../../models/models";
import FilmCard from "../../components/FilmCard";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Home() {
  const [trendingFilms, setTrendingFilms] = useState<Result[]>([]);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    loadTrendingMovies(currentPage);
  }, [currentPage]);

  const loadTrendingMovies = (page: number) => {
    getTrendingMovies(page)
      .then((movies) => {
        if (page === 1) {
          setTrendingFilms(movies);
        } else {
          setTrendingFilms((prevMovies) => [...prevMovies, ...movies]);
        }
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  
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
      <div className="flex justify-center">
        <Button
          variant="contained"
          color="secondary"
          className="w-[170px]"
          onClick={handleLoadMore}
        >
          Load more
        </Button>
      </div>
      {trendingFilms.length === 0 && error !== "" && <h3>Error</h3>}
    </div>
  );
}