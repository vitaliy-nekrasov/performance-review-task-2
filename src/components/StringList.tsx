import React from "react";
import List from "./List";

type StringListProps = {
  strings: string[];
};

const StringList: React.FC<StringListProps> = ({ strings }) => {
  return <List items={strings} renderItem={(item) => <span>{item}</span>} />;
};

export default StringList;
