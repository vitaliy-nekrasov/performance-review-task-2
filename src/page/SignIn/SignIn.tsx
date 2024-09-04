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
import OTPInput from "react-otp-input";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
    if (code !== "") {
      alert("Your OTP: " + code);
    }
  }, [code]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = (values: { email: string; password: string }) => {
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
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Field
                    as={TextField}
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoFocus
                    autoComplete="off"
                    helperText={
                      <ErrorMessage name="email" />
                    }
                  />
                  <Field
                    as={TextField}
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="off"
                    helperText={
                      <ErrorMessage name="password" />
                    }
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
                </Form>
              </Formik>
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
            </>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}