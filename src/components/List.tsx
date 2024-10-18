import React from "react";

type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  className?: string;
};

function List<T>({ items, renderItem, className }: ListProps<T>) {
  return (
    <ul className={className ? className : ""}>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

export default List;
