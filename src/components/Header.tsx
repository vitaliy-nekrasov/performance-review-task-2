import React, { useContext } from "react";
import { ReactComponent as ReactLogo } from "../movies-icon.svg";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthContext } from "../services/AuthContext";

const FavoritesButton = styled(Button)({
  border: "1px solid",
  backgroundColor: "#facc15",
  color: "#111",
  borderColor: "transparent",
  "&:hover": {
    backgroundColor: "#f7d962",
    borderColor: "#111",
  },
});

export function Header() {
  const { login, logout, isLoggedIn } = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    logout();
    if (loggedInUser !== null) {
      const userObject = JSON.parse(loggedInUser);
      login();
      setUserName(userObject.userName);
    }
  }, [login, logout]);

  function logOut() {
    localStorage.removeItem("loggedInUser");
    logout();
  }

  return (
    <header className="flex items-center h-24 w-full bg-gray-500">
      <div className="w-[1550px] ml-auto mr-auto flex items-center justify-between">
        <Link to={"/"}>
          <ReactLogo className="w-12 fill-yellow-400" />
        </Link>
        <div className="flex gap-16">
          {isLoggedIn && (
            <Link to={"favorites"}>
              <FavoritesButton variant="contained">Favorites</FavoritesButton>
            </Link>
          )}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <img src="/user.png" alt="User avatar" className="h-9" />
              <p className="text-yellow-400 font-bold">{userName}</p>
              <Button variant="contained" color="secondary" onClick={logOut}>
                Log out
              </Button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to={"sign-in"}>
                <Button variant="contained" onClick={()=>{window.location.href = "/performance-review-task-2/sign-in"}}>Log in</Button>
              </Link>
              <Link to={"sign-up"}>
                <Button variant="contained" color="secondary">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}