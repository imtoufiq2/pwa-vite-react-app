import Button from "@mui/material/Button";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormControl, Stack } from "@mui/material";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import encryptData from "../../helpers/encryption";
import decryptData from "../../helpers/decryption";
import toast from "react-hot-toast";
import ResponsiveImage from "../../components/Logo";
import { LoadingButton } from "@mui/lab";
import { baseUrl } from "../../App";
import { baseStr } from "../../routers";

const numberOfDigits = 6;
export default function VerifyMobile() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const [loading, setLoading] = useState(false);

  const otpBoxReference = useRef([]);
  const inputRefs = useRef([]);

  function handlePaste(e, index) {
    e.preventDefault();
    const pastedOtp = e.clipboardData.getData("text").trim();
    if (/^\d+$/.test(pastedOtp)) {
      if (pastedOtp.length === numberOfDigits) {
        const otpDigits = pastedOtp.split("");
        setOtp(otpDigits);
        if (index < numberOfDigits - 1) {
          otpBoxReference.current[index + 1].focus();
        }
      }
    }
  }

  const [timer, setTimer] = useState(10);
  const [showTimer, setShowTimer] = useState(true);

  // eslint-disable-next-line no-unused-vars
  const formattedTimer = useMemo(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, [timer]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setShowTimer(false);
    }
    return () => clearInterval(interval);
  }, [showTimer, timer]);

  function handleChange(value, index) {
    if (value.length <= 1 && !isNaN(value) && value !== "e") {
      let newArr = [...otp];
      newArr[index] = value;
      setOtp(newArr);

      if (value && index < numberOfDigits - 1) {
        otpBoxReference.current[index + 1].focus();
      }
    } else if (value.length > 1) {
      let newDigit = value.charAt(value.length - 1);
      let newArr = [...otp];
      newArr[index] = newDigit;
      setOtp(newArr);

      if (newDigit && index < numberOfDigits - 1) {
        otpBoxReference.current[index + 1].focus();
      }
    }
  }

  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index].value = "";
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const body = {
    //   MobileNumber: sessionStorage.getItem("requires2FA") ?  JSON.parse(sessionStorage.getItem("loginData"))?.MobileNo ||
    //     decryptData(sessionStorage.getItem("userInfo")),
    //   UserOTP: otp.join(""),
    // };
    // debugger;
    setLoading(true);
    const loginData = sessionStorage.getItem("loginData")
      ? JSON.parse(sessionStorage.getItem("loginData"))
      : null;

    const mobileNumber = sessionStorage.getItem("requires2FA")
      ? loginData?.MobileNo
      : decryptData(sessionStorage.getItem("userInfo"));

    const body = {
      MobileNumber: mobileNumber,
      UserOTP: otp.join(""),
    };

    if (!body.MobileNumber || body.UserOTP?.length < 6) {
      toast.error("kindly provide proper data");
      return;
    }
    try {
      const encryptedData = encryptData(body);

      const response = await fetch(`${baseUrl}/api/OTP/AuthenticateOTP`, {
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
        toast.success(responseData?.message);
        if (sessionStorage.getItem("requires2FA")) {
          navigate(`${baseStr}/companies`);
          sessionStorage.removeItem("requires2FA");
        } else {
          navigate(`${baseStr}/forgot-password`);
          sessionStorage.removeItem("userInfo");
        }
        setLoading(false);
      } else {
        toast.error(responseData?.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);

      console.error("Error making POST request:", error);
      toast.error("Something went wrong");
    }
    // setSubmitting(false);
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    otpBoxReference.current[0]?.focus();
  }, []);
  return (
    // <AuthWrapper>
    <Box
      className="poppins"
      sx={{
        minHeight: "100vh",
        // paddingBlock: "20px",
        overflow: "hidden",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        sx={{ minHeight: "100vh", minWidth: "100vw" }}
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
                    Enter OTP
                  </Typography>
                </Stack>
                <Grid
                  container
                  spacing={2}
                  component="form"
                  direction="column"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1, width: { xs: "100%", sm: "400px" } }}
                >
                  <Grid item xs={12}>
                    <FormControl
                      id="_form_control"
                      variant="standard"
                      fullWidth
                      sx={{ gap: { xs: "20px", md: "28px" } }}
                    >
                      <Box>
                        <Stack
                          spacing={2}
                          direction="row"
                          justifyContent="space-between"
                          sx={{
                            maxWidth: {
                              // xs: "300px", // For small screens
                              lg: "100%", // For large screens and above, no maxWidth
                            },
                            margin: {
                              xs: "auto", // Center horizontally on small screens
                              lg: "none", // No margin auto on large screens
                            },
                          }}
                        >
                          {otp.map((digit, index) => (
                            <Grid item key={index}>
                              <input
                                key={index}
                                type="number"
                                value={digit}
                                inputMode="numeric"
                                maxLength={1}
                                placeholder="•"
                                onPaste={(e) => handlePaste(e, index)}
                                onChange={(e) =>
                                  handleChange(e.target.value, index)
                                }
                                onKeyUp={(e) =>
                                  handleBackspaceAndEnter(e, index)
                                }
                                ref={(reference) =>
                                  (otpBoxReference.current[index] = reference)
                                }
                                className="no-spinner otp-input"
                              />
                            </Grid>
                          ))}
                        </Stack>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "end",
                          maxHeight: "30px",
                          marginBottom: "-12px",
                        }}
                      >
                        {/* {!showTimer ? (
                          <Button
                            sx={{ border: "1px solid " }}
                            onClick={() => {
                              setShowTimer(true);
                              setTimer(10);
                            }}
                          >
                            Resent OTP
                          </Button>
                        ) : (
                          <Typography variant="p">{formattedTimer}</Typography>
                        )} */}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          mt: 1,
                          flexDirection: { xs: "column-reverse", md: "row" },
                        }}
                      >
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            borderColor: "primary.main",
                            color: "primary.main",
                            backgroundColor: "secondary.main",
                            "&:hover": {
                              borderColor: "#f57c00",
                              backgroundColor: "secondary.main",
                            },
                            "&:active": {
                              border: "none",
                              backgroundColor: "secondary.light",
                            },
                            "&:focus": { border: "none", outline: "none" },
                          }}
                          onClick={() => navigate(-1)}
                        >
                          Cancel
                        </Button>

                        <LoadingButton
                          fullWidth
                          loading={loading}
                          onClick={handleSubmit}
                          variant="contained"
                          sx={{
                            backgroundColor: "primary.main",
                            borderColor: "primary.main",
                            "&:hover": { borderColor: "primary.main" },
                            "&:active": { border: "none", outline: "none" },
                            "&:focus": { border: "none", outline: "none" },
                          }}
                        >
                          Submit
                        </LoadingButton>
                      </Box>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Grid>
    </Box>
    // </AuthWrapper>
  );
}
