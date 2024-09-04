import * as React from "react";
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
import PasswordStrengthBar from "react-password-strength-bar-with-style-item";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const defaultTheme = createTheme();

export default function SignUp() {
  const initialValues = {
    userName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Required"),
  });

  const handleSubmit = (values: {
    userName: string;
    email: string;
    password: string;
  }) => {
    let usersData = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = usersData.some(
      (user: { email: string }) => user.email === values.email
    );

    if (userExists) {
      Notify.failure("A user with this email already exists! =(");
      return;
    }

    usersData.push(values);
    localStorage.setItem("users", JSON.stringify(usersData));
    localStorage.setItem("loggedInUser", JSON.stringify(values));
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, setFieldValue }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="userName"
                      required
                      fullWidth
                      id="userName"
                      label="User Name"
                      autoFocus
                      autoComplete="off"
                      helperText={<ErrorMessage name="userName" />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="email"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      type="email"
                      autoComplete="off"
                      helperText={<ErrorMessage name="email" />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="password"
                      required
                      fullWidth
                      id="password"
                      label="Password"
                      type="password"
                      autoComplete="off"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                        setFieldValue("password", e.target.value);
                      }}
                      helperText={<ErrorMessage name="password" />}
                    />
                    {values.password !== "" && (
                      <PasswordStrengthBar
                        password={values.password}
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
                  disabled={!validationSchema.isValidSync(values)}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <ReactLink to={"/sign-in"}>
                      Already have an account? Sign in
                    </ReactLink>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}