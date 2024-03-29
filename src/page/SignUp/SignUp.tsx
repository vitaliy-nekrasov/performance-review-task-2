import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as ReactLink } from "react-router-dom";
import { Notify } from "notiflix";
import PasswordStrengthBar from "react-password-strength-bar-with-style-item";

const defaultTheme = createTheme();

export default function SignUp() {
  const [password, setPassword] = useState<string>("");
  const [validPassword, setValidPassword] = useState<boolean>(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const isValid = passwordRegex.test(newPassword);
    setValidPassword(isValid);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData: {
      userName: string | null;
      email: string | null;
      password: string | null;
    } = {
      userName: data.get("userName") as string | null,
      email: data.get("email") as string | null,
      password: data.get("password") as string | null,
    };

    let usersData: {
      userName: string | null;
      email: string | null;
      password: string | null;
    }[] = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = usersData.some(
      (user) => user.email === userData.email
    );

    if (userExists) {
      Notify.failure("A user with this email already exists! =(");
      return;
    }

    usersData.push(userData);
    localStorage.setItem("users", JSON.stringify(usersData));
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    window.location.href = "/performance-review-task-2/";
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoFocus
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="off"
                  onChange={handlePasswordChange}
                  error={!validPassword && password.length > 0}
                  helperText={
                    !validPassword && password.length > 0
                      ? "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character."
                      : ""
                  }
                />
                {password !== "" && (
                  <PasswordStrengthBar
                    password={password}
                    scoreWords={["Weak", "Weak", "Okay", "Good", "Strong"]}
                    scoreWordClassName="!text-black !text-lg"
                    shortScoreWord="Too short"
                    minLength={8}
                  />
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!validPassword}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <ReactLink to={"/sign-in"}>
                  <Link variant="body2">Already have an account? Sign in</Link>
                </ReactLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
