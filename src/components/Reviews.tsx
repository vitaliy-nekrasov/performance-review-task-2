import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMoviesReviews } from "../services/movies-api";
import { Result } from "../models/reviewsDetails";

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState<Result[]>([]);

  useEffect(() => {
    getMoviesReviews(movieId).then(setReviews);
  }, [movieId]);
    
  return (
    <div>
      {reviews.length === 0 ? (
        <h3>We don`t have any reviews for this movie!</h3>
      ) : (
        <ul className="flex flex-col gap-4">
          {reviews.map((review) => (
            <li key={review.id} className="flex flex-col gap-1">
              <p className="text-2xl font-medium">
                <span>Author:</span> {review.author}
              </p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
