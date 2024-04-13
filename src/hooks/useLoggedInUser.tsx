import { useState, useEffect } from "react";
import { User } from "../models/models";

export const useLoggedInUser = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    setLoggedInUser(userData);
  }, []);

  return loggedInUser;
};
