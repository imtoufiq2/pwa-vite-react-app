import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import MarkUnreadChatAltRoundedIcon from "@mui/icons-material/MarkUnreadChatAltRounded";
import {
  Box,
  Modal,
  Typography,
  IconButton,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Paper,
  Pagination,
  Tooltip,
  Fab,
  Badge,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useGlobalHook } from "../../context/Contexts";
import encryptData from "../../helpers/encryption";
import decryptData from "../../helpers/decryption";
import toast from "react-hot-toast";
import { formatTimestamp } from "../../helpers/formatTimestamp";
import { baseUrl, whiteColor } from "../../App";

const ViewComments = ({ open, setOpen }) => {
  const { darkMode } = useGlobalHook();

  const [commentsData, setCommentData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Calculate the data to show based on the current page
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedComments = commentsData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: "95%",
      md: "90%",
    },
    maxWidth: 800,
    bgcolor: darkMode ? "#343332" : "background.paper", // Conditional bgcolor
    boxShadow: 24,
    p: 4,
    px: {
      xs: 1.5,
      md: 4,
    },
    borderRadius: "12px",
  };

  const tableHeaderStyle = {
    bgcolor: "#2b2e8c",
    color: "white",
    fontWeight: "bold",
    whiteSpace: "nowrap", // Correct the spelling here
    textAlign: "center",
  };

  const handleGetComments = useCallback(async () => {
    try {
      const body = {
        MeetingReportID: sessionStorage.getItem("longId") ?? "0", // bada
        MeetingDetailID: sessionStorage.getItem("idr") ?? "0", // chota
      };
      const encryptedData = encryptData(body);
      const response = await fetch(
        `${baseUrl}/api/Meeting/GetMeetingCommentDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            iPadId: "B9952D24-61A4-4D7F-8302-4702B5387BD5",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
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
      // debugger;
      const result = await response.text();
      const decryptedResponse = decryptData(result);
      console.log({ decryptedResponse });
      if (decryptedResponse?.success) {
        console.log("asfd");
        //set the data
        setCommentData(decryptedResponse?.data ?? []);
      }
      // else {
      //   toast.error("Something went wrong");
      // }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
    // finally {
    //   setLoading(false);
    // }
  }, []);

  useEffect(() => {
    if (!open) return;
    handleGetComments();
  }, [handleGetComments, open]);

  return (
    <Modal
      id="_openModal"
      open={open}
      onClose={handleClose}
      aria-labelledby="view-comments-modal-title"
      aria-describedby="view-comments-modal-description"
    >
      <Box sx={style} id="_box">
        <Box
          id="_box"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* <Typography
            id="view-comments-modal-title"
            variant="h6"
            component="h2"
            sx={{ display: commentsData?.length ? "block" : "none" }}
            style={{ color: darkMode && "white" }}
          >
            View Comments
          </Typography> */}
          {/* <IconButton
            id="_icon_button"
            disabled
            onClick={handleClose}
          >
            Total Comments = {commentsData?.length ?? 0}
          </IconButton> */}
          <Tooltip
            title={`Total comments is ${commentsData?.length || 0}`}
            arrow
          >
            <Fab
              size="small"
              color="secondary"
              aria-label="add"
              id="_add-icon"
              style={{
                outline: "none",
                border: "none",
                borderRadius: "50%",
                margin: "auto",
                // marginTop: "4px",
              }}
            >
              <Badge
                id="_badge"
                showZero // Ensure badge shows when the content is 0
                badgeContent={commentsData?.length ?? 0} // The count to display
                color="primary" // Badge color
                sx={{
                  position: "absolute",
                  top: "8px", // Adjust these values to position the badge correctly
                  right: "7px",
                  "& .MuiBadge-dot": {
                    borderRadius: "50%",
                    width: 14,
                    height: 14,
                  },
                }}
              ></Badge>
              <MarkUnreadChatAltRoundedIcon sx={{ color: "#2b2e8c" }} />
            </Fab>
          </Tooltip>
          <IconButton
            id="_icon_button"
            onClick={handleClose}
            style={{
              color: `${darkMode ? whiteColor : "#2b2e8c"}`,
              border: "none",
              outline: "none",
            }}
          >
            <CloseIcon id="_icon" style={{ border: "none", outline: "none" }} />
          </IconButton>
        </Box>
        <Typography
          id="view-comments-modal-description"
          sx={{
            mt: 2,
            display: commentsData?.length ? "block" : "none",
          }}
          style={{ color: darkMode && "white" }}
        >
          Here are the comments for the meeting report.
        </Typography>
        {commentsData?.length ? (
          <>
            {/* bgcolor: darkMode ? "#343332" : "background.paper", // Conditional bgcolor */}

            <TableContainer
              id="_contanier"
              component={Paper}
              sx={{ mt: 2 }}
              style={{ backgroundColor: darkMode && "#343332" }}
            >
              <Table id="_table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={tableHeaderStyle}>Comment</TableCell>
                    <TableCell sx={tableHeaderStyle}>Commented By</TableCell>
                    <TableCell sx={tableHeaderStyle}>Commented For</TableCell>
                    <TableCell sx={tableHeaderStyle}>Commented On</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedComments.map((comment) => (
                    <TableRow key={comment.id}>
                      <TableCell
                        style={{
                          color: darkMode && "white",
                          whiteSpace: "nowrap",
                          textAlign: "center",
                        }}
                      >
                        {comment.Comments ? comment.Comments : "-"}
                      </TableCell>
                      <TableCell
                        style={{
                          color: darkMode && "white",
                          whiteSpace: "nowrap",
                          textAlign: "center",
                        }}
                      >
                        {comment.CommentedBy}
                      </TableCell>
                      <TableCell
                        style={{
                          color: darkMode && "white",
                          whiteSpace: "nowrap",
                          textAlign: "center",
                        }}
                      >
                        {comment.CommentShareWith
                          ? comment.CommentShareWith
                          : "-"}
                      </TableCell>
                      <TableCell
                        style={{
                          color: darkMode && "white",
                          whiteSpace: "nowrap",
                          textAlign: "center",
                        }}
                      >
                        {comment.CommentOn
                          ? formatTimestamp(comment.CommentOn)
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <Pagination
                count={Math.ceil(commentsData.length / itemsPerPage)}
                page={page}
                onChange={handleChange}
                color="primary"
                sx={{
                  "& .MuiPaginationItem-root": {
                    border: "none",
                    outline: "none",
                    // Add more styles if needed
                  },
                }}
              />
            </Box>
          </>
        ) : (
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography
              variant="h6"
              sx={{ color: `${darkMode ? whiteColor : "#2b2e8c"}` }}
            >
              No Comments Found
            </Typography>
            <Typography
              sx={{ color: `${darkMode ? whiteColor : "#2b2e8c"}`, mt: 1 }}
            >
              If you want to add comments, you can click the add button to add
              comments.
            </Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
};
// Add prop types validation
ViewComments.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
export default ViewComments;
