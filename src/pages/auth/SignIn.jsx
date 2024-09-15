import { useCallback, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormControl, IconButton, InputAdornment, Stack } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { BootstrapInput } from "../../utils/Input/textfield";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import encryptData from "../../helpers/encryption";
import decryptData from "../../helpers/decryption";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
// import OnBoardingLogo from "../../components/logo";
import ResponsiveImage from "../../components/Logo";
import { useGlobalHook } from "../../context/Contexts";

export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { darkMode } = useGlobalHook();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSendOtp = useCallback(
    async (mobilNo) => {
      const body = {
        MobileNumber: String(mobilNo),
      };

      try {
        const encryptedData = encryptData(body);
        const response = await fetch("/BoardMeetingApi/api/OTP/GenerateOTP", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            iPadId: "B9952D24-61A4-4D7F-8302-4702B5387BD5",
          },
          body: encryptedData,
        });

        const result = await response.text();

        const responseData = decryptData(result);

        if (responseData?.success && responseData?.message === "Successful.") {
          navigate("/boardmeeting/verify-otp");
        } else {
          toast.error(responseData?.message || "something went wrong");
        }
      } catch (error) {
        console.error("Error making POST request:", error);
        toast.error("Something went wrong");
      }
    },
    [navigate]
  );
  const handleGet2FASetting = useCallback(
    async (Input, mobileNumber) => {
      try {
        const encryptedData = encryptData({
          Input,
        });
        const response = await fetch(
          "/BoardMeetingApi/api/Login/Get2FASetting",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              iPadId: "B9952D24-61A4-4D7F-8302-4702B5387BD5",
            },
            body: encryptedData,
          }
        );

        const result = await response.text();
        const responseData = decryptData(result);
        if (
          responseData?.success &&
          responseData?.data?.[0]?.TwoFactorEnable === "Yes"
        ) {
          sessionStorage.setItem("requires2FA", "true");
          await handleSendOtp(mobileNumber);
        } else {
          navigate("/boardmeeting/companies");
          // resetForm();
        }
      } catch (error) {
        console.error("Error making POST request:", error);
        toast.error("Something went wrong");
      }
    },
    [handleSendOtp, navigate]
  );

  const handleSubmit = async (values, { setSubmitting }) => {
    const body = {
      iPadId: "B9952D24-61A4-4D7F-8302-4702B5387BD5",
      authType: "client_credentials",
      // clientCode: "kailash.purohit@motilaloswal.com",
      // password: "bW9zbEAxMjM0",
      clientCode: values?.email,
      password: values?.password,
      clientToken: "",
    };

    try {
      const encryptedData = encryptData(body);

      const response = await fetch("/BoardMeetingApi/api/Login/authorize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          iPadId: "B9952D24-61A4-4D7F-8302-4702B5387BD5",
        },
        body: encryptedData,
      });

      const result = await response.text();
      const responseData = decryptData(result);
      if (responseData?.success) {
        sessionStorage.setItem("loginData", JSON.stringify(responseData?.data));
        sessionStorage.setItem(
          "a3YvZ1qP",
          encryptData(
            JSON.stringify({
              clientCode: values?.email,
            })
          )
        );
        // call two auth api here
        await handleGet2FASetting(values?.email, responseData?.data?.MobileNo);
        // navigate("/boardmeeting/companies");
        // resetForm();
      } else if (responseData?.message) {
        toast.error(responseData?.message);
      }
    } catch (error) {
      console.error("Error making POST request:", error);
      toast.error("Something went wrong");
    }
    setSubmitting(false);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  useEffect(() => {
    sessionStorage.removeItem("requires2FA");
  }, []);
  return (
    <Box
      className="poppins"
      sx={{
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        sx={{
          minHeight: "100vh",
          minWidth: "100vw",
        }}
      >
        <Grid container spacing={3}>
          <ResponsiveImage />

          <Grid item xs={12}>
            <Container component="main" maxWidth="2xl">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Stack alignItems="center">
                  <Typography
                    variant="h5"
                    sx={{ color: "primary.main", fontWeight: 500 }}
                  >
                    Login
                  </Typography>
                </Stack>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  validateOnBlur={false}
                  validateOnChange={true}
                >
                  {({
                    values,
                    handleChange,
                    errors,
                    touched,
                    submitCount,
                    isSubmitting,
                  }) => (
                    <Form style={{ width: "100%" }}>
                      <Grid
                        container
                        spacing={2}
                        direction="column"
                        sx={{
                          mt: 1,
                          width: {
                            xs: "100%",
                            sm: "450px",
                          },
                          margin: {
                            sm: "auto",
                          },
                        }}
                      >
                        <Grid item xs={12}>
                          <FormControl
                            variant="standard"
                            fullWidth
                            id="_form-control"
                          >
                            <Typography
                              className="label d-flex items-center"
                              style={{ color: darkMode && "#ffae18" }}
                            >
                              Email
                              <sup className="asc">*</sup>
                            </Typography>
                            <Field
                              name="email"
                              as={BootstrapInput}
                              fullWidth
                              id="email"
                              size="small"
                              placeholder="Email"
                              style={{
                                backgroundColor: "white",
                                borderRadius: "8px",
                              }}
                              value={values.email}
                              onChange={handleChange}
                              error={
                                submitCount > 0 &&
                                (touched.email || !!errors.email)
                              }
                            />
                            {submitCount > 0 &&
                              (touched.email || !!errors.email) && (
                                <Typography
                                  color="error"
                                  variant="caption"
                                  component="div"
                                >
                                  <ErrorMessage name="email" />
                                </Typography>
                              )}
                          </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                          <FormControl variant="standard" fullWidth>
                            <Typography
                              className="label d-flex items-center"
                              style={{ color: darkMode && "#ffae18" }}
                            >
                              Password
                              <sup className="asc">*</sup>
                            </Typography>
                            <Field
                              name="password"
                              as={BootstrapInput}
                              id="password"
                              value={values.password}
                              onChange={handleChange}
                              error={
                                submitCount > 0 &&
                                (touched.password || !!errors.password)
                              }
                              type={showPassword ? "text" : "password"}
                              fullWidth
                              size="small"
                              placeholder="Password"
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <Visibility fontSize="small" />
                                    ) : (
                                      <VisibilityOff fontSize="small" />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                            {submitCount > 0 &&
                              (touched.password || !!errors.password) && (
                                <Typography
                                  color="error"
                                  variant="caption"
                                  component="div"
                                >
                                  <ErrorMessage name="password" />
                                </Typography>
                              )}
                          </FormControl>
                        </Grid>

                        <Grid
                          item
                          xs={6}
                          alignItems="flex-end"
                          onClick={() => navigate("/boardmeeting/enter-mobile")}
                        >
                          <Link
                            component="button"
                            className="custom-link"
                            underline="none"
                            sx={{ cursor: "pointer" }}
                          >
                            <Typography
                              variant="caption"
                              style={{ color: darkMode && "#ffffffa8" }}
                            >
                              Reset password?
                            </Typography>
                          </Link>
                        </Grid>
                        <Grid item xs={12}>
                          <LoadingButton
                            loading={isSubmitting}
                            loadingPosition="center"
                            type="submit"
                            fullWidth
                            aria-label="login button"
                            variant="contained"
                            disabled={isSubmitting}
                            sx={{
                              backgroundColor: isSubmitting
                                ? "rgba(251, 140, 0, 0.5)"
                                : "primary.main",
                              borderColor: isSubmitting
                                ? "rgba(251, 140, 0, 0.5)"
                                : "primary.main",
                              "&:hover": {
                                borderColor: isSubmitting
                                  ? "rgba(251, 140, 0, 0.5)"
                                  : "primary.main",
                              },
                              "&:active": {
                                border: "none",
                                outline: "none",
                              },
                              "&:focus": {
                                border: "none",
                                outline: "none",
                              },
                            }}
                          >
                            Sign In
                          </LoadingButton>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
