import { useState, useEffect } from "react";
import { User } from "../models/models";

export const useLoggedInUser = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
      setLoggedInUser(userData);
    } catch (error) {
      console.error("Invalid JSON in localStorage:", error);
      setLoggedInUser(null);
    }
  }, []);

  return loggedInUser;
};
