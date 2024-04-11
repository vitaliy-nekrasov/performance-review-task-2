import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMoviesReviews } from "../services/movies-api";
import { Result } from "../models/reviewsDetails";
import ReviewItemWithShowMore from "./ReviewItem";

function Reviews() {
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
            <ReviewItemWithShowMore
              key={review.id}
              review={review}
              showAll={false}
              toggleShowMore={()=>{}}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Reviews;
