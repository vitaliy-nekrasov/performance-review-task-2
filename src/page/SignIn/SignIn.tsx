import * as React from "react";
import { useState, useEffect } from "react";
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
import OTPInput from "react-otp-input";

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
  
  useEffect(() => {
    if (code !== '') {
      alert("Your OTP:" + code);     
    }
  }, [code]);
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData: { email: string | null; password: string | null } = {
      email: data.get("email") as string | null,
      password: data.get("password") as string | null,
    };
    
    const loggedInUser = usersData.find(
      (user) =>
        user.email === userData.email && user.password === userData.password
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
          <div>
            {!getOtp && (
              <div>
                <Avatar
                  sx={{
                    m: 1,
                    bgcolor: "#1976d2",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <LockOutlinedIcon />
                </Avatar>
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  Sign in
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoFocus
                    autoComplete="off"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="off"
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
                        <Link variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </ReactLink>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            )}
          </div>
          <div>
            {getOtp && (
              <div>
                <Typography
                  component="h2"
                  variant="h5"
                  sx={{
                    marginBottom: "24px",
                  }}
                >
                  Enter one-time password:
                </Typography>
                <OTPInput
                  value={otp}
                  onChange={handleChange}
                  numInputs={6}
                  containerStyle="justify-evenly"
                  renderInput={(inputProps, index) => (
                    <input
                      {...inputProps}
                      key={index}
                      style={{
                        width: "30px",
                        height: "40px",
                        fontSize: "22px",
                        textAlign: "center",
                        fontWeight: "500",
                        borderRadius: "6px",
                      }}
                    />
                  )}
                />
                <Button
                  onClick={handleOtpSubmit}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </div>
            )}
          </div>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
