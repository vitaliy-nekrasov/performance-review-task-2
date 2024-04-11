import React from "react";
import { Result } from "../models/reviewsDetails";
import withShowMore from "../hocs/withShowMore";
import { CSSTransition } from "react-transition-group";

interface ReviewItemProps {
  review: Result;
  showAll: boolean;
  toggleShowMore: () => void;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  review,
  showAll,
  toggleShowMore,
}) => {

  return (
    <li className="flex flex-col gap-1">
      <p className="text-2xl font-medium">
        <span>Author:</span> {review.author}
      </p>
      <CSSTransition in={showAll} timeout={300} classNames="fade" unmountOnExit>
        <p>{review.content}</p>
      </CSSTransition>
    </li>
  );
};

const ReviewItemWithShowMore = withShowMore(ReviewItem);

export default ReviewItemWithShowMore;
