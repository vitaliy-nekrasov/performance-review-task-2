import { useState, useEffect } from "react";
import { User } from "../models/models";

export const useLoggedInUser = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const userDataString = localStorage.getItem("loggedInUser");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setLoggedInUser(userData);
      } else {
        setLoggedInUser(null);
      }
    } catch (error) {
      console.error("Invalid JSON in localStorage:", error);
      setLoggedInUser(null);
    }
  }, []);

  return loggedInUser;
};
