import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormControl, Stack } from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import OnBoardingLogo from "../../components/Logo";

import { BootstrapInput } from "../../utils/Input/textfield";
import "./auth.css";
import { LoadingButton } from "@mui/lab";
import encryptData from "../../helpers/encryption";
import decryptData from "../../helpers/decryption";
import toast from "react-hot-toast";
import { useGlobalHook } from "../../context/Contexts";
import { baseUrl } from "../../App";

export default function EnterMobile() {
  const navigate = useNavigate();
  const { darkMode } = useGlobalHook();

  const handleSubmit = async (values, { resetForm }) => {
    // Handle form submission

    const body = {
      MobileNumber: String(values?.phoneNumber),
    };
    // debugger;
    sessionStorage.setItem("userInfo", encryptData(body.MobileNumber));
    try {
      const encryptedData = encryptData(body);
      const response = await fetch(
        `${baseUrl}/BoardMeetingApi/api/OTP/GenerateOTP`,
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

      if (responseData?.success && responseData?.message === "Successful.") {
        navigate("/boardmeeting/verify-otp");
        resetForm();
      } else {
        toast.error(responseData?.message || "something went wrong");
      }
    } catch (error) {
      console.error("Error making POST request:", error);
      toast.error("Something went wrong");
    }

    // Navigate after successful form submission
    // navigate("/boardmeeting/verify-otp");
    // resetForm();
  };

  // Form validation schema for phone number
  const validationSchema = Yup.object({
    phoneNumber: Yup.number()
      .typeError("Invalid phone number")
      .integer("Phone number must be an integer")
      .min(1000000000, "Phone number must be 10 digits")
      .max(9999999999, "Phone number must be 10 digits")
      .required("Phone number is required"),
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
          <OnBoardingLogo />

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
                  initialValues={{ phoneNumber: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, setFieldValue, isSubmitting }) => (
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
                              gap: { xs: "20px", md: "28px" },
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
                                onClick={() =>
                                  navigate("/boardmeeting/sign-in")
                                }
                              >
                                Cancel
                              </Button>

                              <LoadingButton
                                loading={isSubmitting}
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
                              </LoadingButton>
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
