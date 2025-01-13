import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as ReactLink } from "react-router-dom";
import { Notify } from "notiflix";
import OTPInput from "../../utils/OTPInput";
import { useForm, Controller } from "react-hook-form";

const defaultTheme = createTheme();

interface UserData {
  email: string;
  password: string;
}

export default function SignIn() {
  const [getOtp, setGetOtp] = useState<boolean>(false);
  const [usersData, setUsersData] = useState<UserData[]>(
    JSON.parse(localStorage.getItem("users") || "[]")
  );
  const [loggedInUser, setLoggedInUser] = useState<object>({});
  const [otp, setOtp] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (code !== "") {
      alert("Your OTP: " + code);
    }
  }, [code]);

  const onSubmit = (values: { email: string; password: string }) => {
    const loggedInUser = usersData.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (!loggedInUser) {
      Notify.failure("Incorrect email or password =(");
      return;
    }
    const newCode = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    setLoggedInUser(loggedInUser);
    setGetOtp(true);
    setCode(newCode);
  };

  const handleChange = (otp: string) => {
    setOtp(otp);
  };

  const handleOtpSubmit = () => {
    if (otp === code) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      window.location.href = "/performance-review-task-2/";
    } else {
      Notify.failure("Incorrect OTP =(");
      setGetOtp(false);
    }
    setOtp("");
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
          {!getOtp ? (
            <>
              <Avatar
                sx={{
                  m: 1,
                  bgcolor: "#1976d2",
                }}
              >
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      fullWidth
                      id="email"
                      label="Email Address"
                      autoFocus
                      autoComplete="off"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="off"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  )}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <ReactLink to={"/sign-up/"}>
                      Don't have an account? Sign Up
                    </ReactLink>
                  </Grid>
                </Grid>
              </Box>
            </>
          ) : (
            <>
              <Typography
                component="h2"
                variant="h5"
                sx={{ marginBottom: "24px" }}
              >
                Enter one-time password:
              </Typography>
              <OTPInput
                numInputs={6}
                value={otp}
                onChange={handleChange}
                onSubmit={handleOtpSubmit}
              />
              <Button
                onClick={handleOtpSubmit}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}