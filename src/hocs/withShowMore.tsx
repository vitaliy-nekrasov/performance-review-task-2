import React, { useState } from "react";

export interface WithShowMoreProps {
  showAll: boolean;
  toggleShowMore: () => void;
}
function withShowMore<T extends WithShowMoreProps>(
  WrappedComponent: React.ComponentType<T>
) {
  const WithShowMore: React.FC<T> = (props) => {
    const [showAll, setShowAll] = useState(false);

    const toggleShowMore = () => {
      setShowAll(!showAll); 
    };

    return (
      <div>
        <WrappedComponent {...props} showAll={showAll} />
        <button
          className="px-2 py-3 bg-gray-800 text-white font-semibold rounded-xl mt-2"
          onClick={toggleShowMore}
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      </div>
    );
  };

  return WithShowMore;
}

export default withShowMore;
