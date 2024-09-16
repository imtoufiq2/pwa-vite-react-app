import { useCallback, useState } from "react";
import { TextField, Box, Modal, Typography, IconButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import { orange } from "@mui/material/colors";
import encryptData from "../../helpers/encryption";
import decryptData from "../../helpers/decryption";
import toast from "react-hot-toast";
import { useGlobalHook } from "../../context/Contexts";

// eslint-disable-next-line react/prop-types
const FormModalExample = ({ setOpen, open }) => {
  const { darkMode } = useGlobalHook();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    comment: "",
    email: "",
  });

  const [error, setError] = useState({
    email: "",
  });

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  // const handleSubmit = useCallback(
  //   async (e) => {
  //     e.preventDefault();
  //     setLoading(true);

  //     if (!validateEmail(formData.email)) {
  //       toast.error("Invalid email format");
  //       return;
  //     }

  //     try {
  //       const body = {
  //         MeetingReportID: sessionStorage.getItem("loginData") ?? "0", // bada
  //         MeetingDetailID: sessionStorage.getItem("idr") ?? "0",
  //         Comments: formData?.comment,
  //         CommentedBy:
  //           JSON.parse(sessionStorage.getItem("loginData"))?.username ?? "",
  //         ShareTo: formData?.email,
  //       };
  //       const encryptedData = encryptData(body);

  //       const response = await fetch(
  //         "/BoardMeetingApi/api/Meeting/AddMeetingReportComment",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             iPadId: "B9952D24-61A4-4D7F-8302-4702B5387BD5",
  //             Authorization: `Bearer ${
  //               JSON.parse(sessionStorage.getItem("loginData"))?.accessToken
  //             }`,
  //             clientCode: JSON.parse(
  //               decryptData(sessionStorage.getItem("a3YvZ1qP"))
  //             )?.clientCode,
  //             "Accept-Encoding": "br",
  //           },
  //           body: encryptedData,
  //         }
  //       );

  //       const result = await response.text();
  //       const decryptedResponse = decryptData(result);
  //       if (decryptedResponse?.success) {
  //         handleClose();
  //         toast.success("Comment Added!");
  //         setFormData({
  //           comment: "",
  //           email: "",
  //         });
  //       } else {
  //         toast.error("Something went wrong");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       toast.error("Something went wrong");
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [formData, handleClose]
  // );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      // Check email validity and set the value for ShareTo
      const email = formData.email;
      let shareTo = "all";

      if (email && validateEmail(email)) {
        shareTo = email;
      } else if (email && !validateEmail(email)) {
        toast.error("Invalid email format");
      }
      try {
        const body = {
          MeetingReportID: sessionStorage.getItem("loginData") ?? "0",
          MeetingDetailID: sessionStorage.getItem("idr") ?? "0",
          Comments: formData?.comment,
          CommentedBy:
            JSON.parse(sessionStorage.getItem("loginData"))?.username ?? "",
          ShareTo: shareTo, // Set ShareTo to "all" if email is invalid or empty
        };
        const encryptedData = encryptData(body);

        const response = await fetch(
          "/BoardMeetingApi/api/Meeting/AddMeetingReportComment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              iPadId: "B9952D24-61A4-4D7F-8302-4702B5387BD5",
              Authorization: `Bearer ${
                JSON.parse(sessionStorage.getItem("loginData"))?.accessToken
              }`,
              clientCode: JSON.parse(
                decryptData(sessionStorage.getItem("a3YvZ1qP"))
              )?.clientCode,
              "Accept-Encoding": "br",
            },
            body: encryptedData,
          }
        );

        const result = await response.text();
        const decryptedResponse = decryptData(result);
        if (decryptedResponse?.success) {
          handleClose();
          toast.success("Comment Added!");
          setFormData({
            comment: "",
            email: "",
          });
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [formData, handleClose]
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "email" && error.email) {
      setError({ email: "" }); // Clear email error on valid input
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%", // Increased width to fit content
    maxWidth: 600, // Increased max-width for better readability
    bgcolor: darkMode ? "#343332" : "background.paper", // Conditional bgcolor
    boxShadow: 24,
    p: 4,
    borderRadius: "12px",
    overflow: "hidden", // Ensure no content spills out
  };

  return (
    <Modal
      id="_openModal"
      open={open}
      onClose={handleClose}
      aria-labelledby="form-modal-title"
      aria-describedby="form-modal-description"
    >
      <Box sx={style} id="_box">
        <IconButton
          id="_icon_button"
          onClick={handleClose}
          style={{
            color: orange[500],
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          id="form-modal-title"
          style={{ color: darkMode && "white" }}
          variant="h6"
          component="h2"
        >
          Share a Comment
        </Typography>
        <Typography
          style={{ color: darkMode && "white" }}
          id="form-modal-description"
          sx={{ mt: 2 }}
        >
          Please enter your comment and the email address you want to share it
          with.
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Comment Box */}
          <TextField
            fullWidth
            label="Comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Enter your comment here..."
            multiline
            rows={3}
            required
            sx={(theme) => ({
              mt: 2,
              "& .MuiInputLabel-root": {
                color: darkMode ? "white" : theme.palette.text.primary,
                fontSize: "14px",
              },
              "& .MuiInputBase-root": {
                borderColor: darkMode ? "white" : theme.palette.text.primary,
              },
              "& .MuiInputBase-input": {
                color: darkMode ? "white" : theme.palette.text.primary,
              },
              "& .MuiInputBase-input::placeholder": {
                color: darkMode ? "white" : theme.palette.text.disabled,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: darkMode ? "white" : theme.palette.text.primary,
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                borderColor: darkMode ? "white" : "orange",
                "& .MuiInputLabel-root": {
                  color: darkMode ? "white" : theme.palette.primary.main,
                },
                "& .MuiInputBase-root": {
                  borderColor: darkMode ? "white" : "orange",
                },
                "& .MuiInputBase-input": {
                  color: darkMode ? "white" : theme.palette.text.primary,
                },
                "& .MuiInputBase-input::placeholder": {
                  color: darkMode ? "white" : theme.palette.primary.main,
                },
              },
            })}
          />
          {/* Email Input */}
          <TextField
            fullWidth
            label="Share with (Email)"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(error.email)}
            helperText={error.email}
            placeholder="Enter the recipient's email..."
            type="email"
            // required
            sx={(theme) => ({
              mt: 2,
              "& .MuiInputLabel-root": {
                color: darkMode ? "white" : theme.palette.text.primary,
                fontSize: "14px",
              },
              "& .MuiInputBase-root": {
                borderColor: darkMode ? "white" : theme.palette.text.primary,
              },
              "& .MuiInputBase-input": {
                color: darkMode ? "white" : theme.palette.text.primary,
              },
              "& .MuiInputBase-input::placeholder": {
                color: darkMode ? "white" : theme.palette.text.disabled,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: darkMode ? "white" : theme.palette.text.primary,
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                borderColor: darkMode ? "white" : "orange",
                "& .MuiInputLabel-root": {
                  color: darkMode ? "white" : theme.palette.primary.main,
                },
                "& .MuiInputBase-root": {
                  borderColor: darkMode ? "white" : "orange",
                },
                "& .MuiInputBase-input": {
                  color: darkMode ? "white" : theme.palette.text.primary,
                },
                "& .MuiInputBase-input::placeholder": {
                  color: darkMode ? "white" : theme.palette.primary.main,
                },
              },
            })}
          />
          {/* Submit Button */}
          <LoadingButton
            loading={loading}
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: "orange",
              "&:hover": {
                bgcolor: "darkorange",
              },
            }}
            fullWidth
          >
            Submit
          </LoadingButton>
        </form>
      </Box>
    </Modal>
  );
};

export default FormModalExample;
