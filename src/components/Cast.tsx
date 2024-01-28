import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMoviesCast } from "../services/movies-api";
import { Casts } from "../models/castDetails";

export default function Cast() {
  const { movieId } = useParams();
  const [castInfo, setCastInfo] = useState<Casts[]>([]);

  useEffect(() => {
    getMoviesCast(movieId).then(setCastInfo);
  }, [movieId]);
  
  const getPicture = (picture: string | undefined) => {
    if (picture === undefined || picture === null) {
      return "https://static.wikia.nocookie.net/couple-up-love-show/images/e/ea/Not_avaliable.jpg/revision/latest?cb=20210808205307";
    }    
    return `https://image.tmdb.org/t/p/w400${picture}`;
  };

  return (
    <div className="w-[1650px] ml-auto mr-auto mt-10">
      <ul className="grid grid-cols-4 gap-4">
        {castInfo.map((cast) => (
          <li key={cast.id}>
            <img
              className="w-[100%] h-[90%] object-cover"
              src={getPicture(cast.profile_path)}
              alt={cast.original_name}
            />
            <p>{cast.original_name}</p>
            <div>
              <span>Character:</span> {cast.character}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
