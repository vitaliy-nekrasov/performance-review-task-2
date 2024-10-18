import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMoviesCast } from "../services/movies-api";
import { CastsInfo } from "../models/castDetails";
import List from "./List";

export default function CastList() {
  const { movieId } = useParams();
  const [castInfo, setCastInfo] = useState<CastsInfo[]>([]);

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
    <div className="w-[1550px] ml-auto mr-auto mt-10">
      <List
        items={castInfo}
        renderItem={(item) => (
          <>
            <img
              className="w-[100%] h-[90%] object-cover"
              src={getPicture(item.profile_path)}
              alt={item.original_name}
            />
            <p>{item.original_name}</p>
            <div>
              <span>Character:</span> {item.character}
            </div>
          </>
        )}
        className="grid grid-cols-4 gap-4"
      />
    </div>
  );
}
