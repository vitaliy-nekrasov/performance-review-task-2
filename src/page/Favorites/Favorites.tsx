import React from "react";
import { useState, useEffect } from "react";
import FilmCardFavorites from "../../components/FilmCardFavorites";
import { Link } from "react-router-dom";
import { User } from "../../models/models";
import { FilmDetailsInterface } from "../../models/filmDetails";

export default function Favorites() {
  const [favoritesFilms, setFavoritesFilms] = useState<FilmDetailsInterface[]>(
    []
  );

  useEffect(() => {
    const loggedInUser: User = JSON.parse(
      localStorage.getItem("loggedInUser") || "{}"
    );
    let usersData: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const userInArray = usersData.find((user) => {
      return user.email === loggedInUser.email;
    });

    if (userInArray && userInArray.favorites === undefined) {
      setFavoritesFilms([]);
    } else {
      setFavoritesFilms(userInArray?.favorites || []);
    }
  }, []);

  return (
    <div>
      <h1 className="text-center p-9 text-5xl font-bold text-gray-700">
        Favorites
      </h1>
      {favoritesFilms.length !== 0 && (
        <div className="grid grid-cols-4 w-[1650px] ml-auto mr-auto gap-x-[90px]">
          {favoritesFilms.map((film) => (
            <Link to={`/movies/${film.id}`} key={film.id} className="h-[785px]">
              <FilmCardFavorites film={film} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}