import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Fab from "@mui/material/Fab"; // Import Fab component
import AddCommentIcon from "@mui/icons-material/AddComment"; // Import icon for Fab
import List from "@mui/material/List";
import { Avatar, Button, IconButton, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import Close icon
import { useCallback, useEffect, useState } from "react";
import { commentsData } from "../data/pdfCommetns";
// import { useGlobalHook } from "../Contexts";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import decryptData from "../helpers/decryption";
import encryptData from "../helpers/encryption";
import { useGlobalHook } from "../context/Contexts";

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = useState({
    bottom: false,
  });
  const [loading, setLoading] = useState(false);
  console.log({ loading });
  const { darkMode } = useGlobalHook();
  // State to manage the input value
  const [comment, setComment] = useState("");
  const { id } = useParams();

  // Handle input change
  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const hanldeGetTheComments = useCallback(async () => {
    console.log("dasfasdfasfas hanldeGetTheComments");

    const body = {
      MeetingReportID: sessionStorage.getItem("idr") ?? "0",
      MeetingDetailID: id ?? "0",
    };
    try {
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
      // Handle non-JSON responses
      const result = await response.text();

      const responseData = decryptData(result);
      console.log({ responseData });
    } catch (error) {
      console.error(error);
      toast.error("something went wrong");
    }
  }, [id]);
  useEffect(() => {
    hanldeGetTheComments();
  }, [hanldeGetTheComments]);

  // Handle form submit
  const handleSubmitComment = useCallback(
    async (event) => {
      event.preventDefault();
      if (comment) {
        console.log("Comment Submitted: ", comment);
        const [comments, ShareTo] = comment
          .split("|")
          .map((part) => part.trim());
        if (
          !comments ||
          !ShareTo ||
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ShareTo)
        ) {
          if (!comments || !ShareTo) {
            toast.error("Both comments and email must be provided.");
          } else {
            toast.error("Please enter a valid email address.");
          }
          return; // Prevent further processing
        }
        // Call API here with the comment

        const body = {
          MeetingReportID: sessionStorage.getItem("idr") ?? "0",
          MeetingDetailID: id ?? "0",
          Comments: comments,
          CommentedBy:
            JSON.parse(sessionStorage.getItem("loginData"))?.username ?? "",
          ShareTo,
        };
        try {
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
          // Handle non-JSON responses
          const result = await response.text();

          const responseData = decryptData(result);
          console.log({ responseData });
          if (
            responseData?.success !== true ||
            responseData?.message !== "Successful."
          ) {
            toast.error("something went wrong");
          } else {
            hanldeGetTheComments();
          }
        } catch (error) {
          console.error("Error making POST request:", error);
          // if (!navigator.onLine) {
          //   const storedData = sessionStorage.getItem("xYz123!@#r");
          //   if (storedData) {
          //     const decryptedData = JSON.parse(decryptData(storedData));
          //     setReportsData(decryptedData?.reportData ?? []);
          //   } else {
          //     console.warn("No data found in session storage.");
          //   }
          // }
          setLoading(false);
        }

        setComment(""); // Clear input after submission
      }
    },
    [comment, hanldeGetTheComments, id]
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      id="_main_list_box"
      sx={{
        paddingInline: "20px",
        position: "relative",
      }}
      role="presentation"
      className={`${darkMode && "dark_mode_background_color"}`}
    >
      {/* Close Button */}
      <IconButton
        onClick={toggleDrawer(anchor, false)}
        sx={{
          position: "relative",
          right: "0px",
          outline: "none",
          border: "none",
        }}
      >
        <CloseIcon
          sx={{ position: "fixed", right: "10px", color: darkMode && "#fff" }}
        />
      </IconButton>
      <List
        id="_list"
        className="example"
        sx={{
          height: {
            xs: "60vh", // 60% of the viewport height for extra small screens
            lg: "75vh", // 75% of the viewport height for large screens
          },
          overflow: "scroll",
        }}
      >
        {commentsData?.map((cur, index) => {
          const isLastItem = index === commentsData.length - 1;
          const isToufiq = cur?.userName?.toLowerCase() === "toufiq chdoudhari";

          return (
            <Stack
              key={index}
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{
                marginBottom: !isLastItem ? "1rem" : 0,
                justifyContent: isToufiq ? "flex-end" : "flex-start",
                textAlign: isToufiq ? "right" : "left",
              }}
            >
              <Stack
                direction={isToufiq ? "row-reverse" : "row"}
                spacing={1.5}
                alignItems="center"
                sx={{
                  maxWidth: "80%",
                  bgcolor: isToufiq ? "#fbb02f" : `#fff`,
                  padding: "0.5rem",
                  borderRadius: "10px",
                  border: !isToufiq && "1px solid #fbb02f80",
                  justifyContent: isToufiq ? "flex-end" : "flex-start",
                }}
              >
                <Avatar sx={{ bgcolor: "#fb8c00" }}>
                  {cur?.userName?.split(" ")[0]?.charAt(0).toUpperCase()}
                  {cur?.userName
                    ?.split(" ")
                    .slice(-1)[0]
                    ?.charAt(0)
                    .toUpperCase()}
                </Avatar>

                <p style={{ textAlign: "start" }}>{cur?.comments}</p>
              </Stack>
            </Stack>
          );
        })}
      </List>

      <Box
        // component="form"
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "4px",
          alignItems: "center",
          marginBottom: "6px",
          marginTop: "4px",
        }}
        id="_box_submit"
        // onSubmit={handleSubmitComment}
        // onSubmit={handleSubmitComment} // Only triggered by the button click
      >
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          style={{ backgroundColor: darkMode && "white" }}
          id="_input_filed"
          value={comment} // Bind input value to state
          onChange={handleInputChange} // Update state on input change
          // multiline
          // maxRows={1}
          placeholder="Enter your message" // Optional placeholder instead of label
        />

        <Button
          // type="button"
          variant={comment ? "contained" : "outlined"}
          disabled={!comment} // Disable button if input is empty
          sx={{
            maxWidth: "fit-content",
            maxHeight: "fit-content",
            color: "orange",
            // border: comment && "1px solid orange",
            bgcolor: "white",
          }}
          onClick={handleSubmitComment}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );

  return (
    <div>
      {/* Floating Action Button */}
      <Fab
        size="small"
        color="secondary"
        aria-label="add"
        id="_add_comment_wrapper"
        onClick={toggleDrawer("bottom", true)} // Open drawer on click
        sx={{
          position: "fixed",
          right: "10px",
          bottom: "66px",
          // border: "2px solid orange",
        }}
        style={{ outline: "none", border: "none" }}
      >
        <AddCommentIcon sx={{ color: "orange" }} />
      </Fab>

      {/* Swipeable Drawer */}
      <SwipeableDrawer
        anchor="bottom"
        open={state["bottom"]}
        onClose={toggleDrawer("bottom", false)}
        onOpen={toggleDrawer("bottom", true)}
      >
        {list("bottom")}
      </SwipeableDrawer>
    </div>
  );
}
