import React from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../services/AuthContext";
import { useContext } from "react";

export default function PrivateRoute({
  component: Component,
  redirectTo = "/",
  ...rest
}: {
  component: React.ComponentType<any>;
  redirectTo?: string;
  [key: string]: any;
}) {
  const { isLoggedIn } = useContext(AuthContext);
  const shouldRedirect = !isLoggedIn;

  return shouldRedirect ? (
    <Navigate to={redirectTo} />
  ) : (
    <Component {...rest} />
  );
}
