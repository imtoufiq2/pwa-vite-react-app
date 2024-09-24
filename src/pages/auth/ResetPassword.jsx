import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormControl, IconButton, InputAdornment, Stack } from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BootstrapInput } from "../../utils/Input/textfield";
import "./auth.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import encryptData from "../../helpers/encryption";
import decryptData from "../../helpers/decryption";
import toast from "react-hot-toast";
import { useGlobalHook } from "../../context/Contexts";
import ResponsiveImage from "../../components/Logo";
import { baseUrl } from "../../App";
import { baseStr } from "../../routers";
import { base64Encode } from "../../helpers/passwordEncptDecrpt";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { darkMode } = useGlobalHook();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    // Handle form submission

    const body = {
      MobileNumber: values?.phoneNumber,
      Password: base64Encode(values?.password),
    };

    try {
      const encryptedData = encryptData(body);

      const response = await fetch(`${baseUrl}/api/OTP/ResetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          iPadId: "B9952D24-61A4-4D7F-8302-4702B5387BD5",
        },
        body: encryptedData,
      });

      const result = await response.text();

      const responseData = decryptData(result);

      if (
        responseData?.data?.Password === "Updated" &&
        responseData?.data?.MobileNumber === String(values?.phoneNumber) &&
        responseData?.success
      ) {
        toast.success(responseData?.message);
        resetForm();
        navigate(`${baseStr}/sign-in`);
      } else {
        toast.error(responseData?.message);
      }
    } catch (error) {
      console.error("Error making POST request:", error);
      toast.error("Something went wrong");
    }
    setSubmitting(false);

    // Navigate after successful form submission
    // navigate("/boardmeeting/verify-otp");
    //
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // Form validation schema for phone number
  const validationSchema = Yup.object({
    phoneNumber: Yup.number()
      .typeError("Invalid phone number")
      .integer("Phone number must be an integer")
      .min(1000000000, "Phone number must be 10 digits")
      .max(9999999999, "Phone number must be 10 digits")
      .required("Mobile number is required"),
    password: Yup.string().required("Password is required"),
  });

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
                    Reset Password
                  </Typography>
                </Stack>
                <Formik
                  initialValues={{ phoneNumber: "", password: "" }}
                  validationSchema={validationSchema}
                  validateOnBlur={false}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, setFieldValue }) => (
                    <Form style={{ width: "100%" }} noValidate>
                      <Grid
                        container
                        spacing={2}
                        direction="column"
                        sx={{
                          mt: 1,
                          width: {
                            xs: "100%", // 100% width for extra-small screens
                            sm: "450px", // 30% width for medium screens and larger
                          },
                          margin: {
                            // xs: "100%",
                            sm: "auto",
                          },
                        }}
                      >
                        <Grid item xs={12}>
                          <FormControl
                            variant="standard"
                            fullWidth
                            sx={{
                              gap: { xs: "16px", md: "16px" },
                            }}
                          >
                            <Box>
                              <Typography
                                variant="h3"
                                component="h3"
                                className="label d-flex items-center"
                                style={{ color: darkMode && "#ffae18" }}
                              >
                                Mobile
                                <sup className="asc">*</sup>
                              </Typography>
                              <Field
                                name="phoneNumber"
                                as={BootstrapInput}
                                fullWidth
                                type="number"
                                id="phoneNumber"
                                size="small"
                                placeholder="Enter Registered Mobile Number"
                                inputProps={{
                                  maxLength: 10, // Restrict to 10 digits
                                  onInput: (e) => {
                                    const value = e.target.value.replace(
                                      /\D/g,
                                      ""
                                    ); // Remove non-digit characters
                                    if (value.length > 10) {
                                      e.target.value = value.slice(0, 10); // Limit to 10 digits
                                    } else {
                                      e.target.value = value;
                                    }
                                    setFieldValue(
                                      "phoneNumber",
                                      e.target.value
                                    );
                                  },
                                }}
                                sx={{
                                  borderColor:
                                    errors.phoneNumber && touched.phoneNumber
                                      ? "red"
                                      : "inherit",
                                  borderWidth:
                                    errors.phoneNumber && touched.phoneNumber
                                      ? "2px"
                                      : "1px",
                                }}
                              />
                              <Typography
                                color="error"
                                variant="caption"
                                component="div"
                              >
                                <ErrorMessage name="phoneNumber" />
                              </Typography>
                            </Box>
                            <Box>
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
                                // value={values.password}
                                // onChange={handleChange}
                                // error={
                                //   submitCount > 0 &&
                                //   (touched.password || !!errors.password)
                                // }
                                type={showPassword ? "text" : "password"}
                                fullWidth
                                size="small"
                                placeholder="Enter Updated Password"
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
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
                              <Typography
                                color="error"
                                variant="caption"
                                component="div"
                              >
                                <ErrorMessage name="password" />{" "}
                              </Typography>
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                                mt: 1,
                                flexDirection: {
                                  xs: "column-reverse",
                                  md: "row",
                                },
                              }}
                            >
                              <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                  borderColor: "primary.main",
                                  color: "primary.main",
                                  border: darkMode && "none",

                                  backgroundColor: "secondary.main",
                                  "&:hover": {
                                    borderColor: "#f57c00",
                                    backgroundColor: "secondary.main",
                                  },
                                  "&:active": {
                                    border: "none",
                                    backgroundColor: "secondary.light",
                                  },
                                  "&:focus": {
                                    border: "none",
                                    outline: "none",
                                  },
                                }}
                                onClick={() => navigate(`${baseStr}/sign-in`)}
                              >
                                Cancel
                              </Button>

                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                  backgroundColor: "primary.main",
                                  borderColor: "primary.main",
                                  "&:hover": {
                                    borderColor: "primary.main",
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
                                Submit
                              </Button>
                            </Box>
                          </FormControl>
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
