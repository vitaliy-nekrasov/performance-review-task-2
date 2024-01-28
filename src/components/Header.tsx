import React from "react";
import { ReactComponent as ReactLogo } from "../movies-icon.svg";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

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
  return (
    <header className="flex items-center h-24 w-full bg-gray-500">
      <div className="w-[1650px] ml-auto mr-auto flex items-center justify-between">
        <Link to={"/"}>
          <ReactLogo className="w-12 fill-yellow-400" />
        </Link>
        <div className="flex gap-16">
          <FavoritesButton variant="contained">Favorites</FavoritesButton>
          <div className="flex gap-4">
            <Link to={'sign-in'}>
              <Button variant="contained">Log in</Button>
            </Link>
            <Link to={"sign-up"}>
              <Button variant="contained" color="secondary">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}