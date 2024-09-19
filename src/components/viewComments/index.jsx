import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";

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
} from "@mui/material";
import { orange } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import { useGlobalHook } from "../../context/Contexts";
import encryptData from "../../helpers/encryption";
import decryptData from "../../helpers/decryption";
import toast from "react-hot-toast";
import { formatTimestamp } from "../../helpers/formatTimestamp";

const ViewComments = ({ open, setOpen }) => {
  const { darkMode } = useGlobalHook();
  // const commentsDassta = [
  //   {
  //     id: 1,
  //     comment: "Great presentation!",
  //     commentedBy: "John Doe",
  //     commentedFor: "Jane Smith",
  //   },
  //   {
  //     id: 2,
  //     comment: "Excellent idea!",
  //     commentedBy: "Jane Smith",
  //     commentedFor: "Bob Johnson",
  //   },
  //   {
  //     id: 3,
  //     comment: "Well-said!",
  //     commentedBy: "Bob Johnson",
  //     commentedFor: "John Doe",
  //   },
  //   {
  //     id: 4,
  //     comment: "Thought-provoking discussion.",
  //     commentedBy: "Alice Brown",
  //     commentedFor: "Charlie Davis",
  //   },
  //   {
  //     id: 5,
  //     comment: "Informative session.",
  //     commentedBy: "Charlie Davis",
  //     commentedFor: "Alice Brown",
  //   },
  //   {
  //     id: 6,
  //     comment: "Very insightful analysis.",
  //     commentedBy: "Emma Wilson",
  //     commentedFor: "Daniel Lee",
  //   },
  //   {
  //     id: 7,
  //     comment: "Great use of data!",
  //     commentedBy: "Michael Taylor",
  //     commentedFor: "Sophia Clark",
  //   },
  //   {
  //     id: 8,
  //     comment: "I appreciate the clarity.",
  //     commentedBy: "Olivia Martinez",
  //     commentedFor: "James Wilson",
  //   },
  //   {
  //     id: 9,
  //     comment: "Well done on the presentation!",
  //     commentedBy: "Lucas Rodriguez",
  //     commentedFor: "Emily Davis",
  //   },
  //   {
  //     id: 10,
  //     comment: "Interesting points raised.",
  //     commentedBy: "Ava Hernandez",
  //     commentedFor: "William Lewis",
  //   },
  //   {
  //     id: 11,
  //     comment: "Very engaging session.",
  //     commentedBy: "Mia Brown",
  //     commentedFor: "Benjamin Walker",
  //   },
  //   {
  //     id: 12,
  //     comment: "Good job on the visuals!",
  //     commentedBy: "Ethan Young",
  //     commentedFor: "Isabella Hall",
  //   },
  //   {
  //     id: 13,
  //     comment: "The data was compelling.",
  //     commentedBy: "Ella King",
  //     commentedFor: "Alexander Scott",
  //   },
  //   {
  //     id: 14,
  //     comment: "Insightful and well-structured.",
  //     commentedBy: "Jacob Wright",
  //     commentedFor: "Charlotte Adams",
  //   },
  //   {
  //     id: 15,
  //     comment: "Thorough analysis and discussion.",
  //     commentedBy: "Liam Nelson",
  //     commentedFor: "Amelia Turner",
  //   },
  //   {
  //     id: 16,
  //     comment: "Appreciate the thorough research.",
  //     commentedBy: "Mason Carter",
  //     commentedFor: "Avery Phillips",
  //   },
  //   {
  //     id: 17,
  //     comment: "Effective and to the point.",
  //     commentedBy: "James Evans",
  //     commentedFor: "Harper Murphy",
  //   },
  //   {
  //     id: 18,
  //     comment: "Impressive presentation skills.",
  //     commentedBy: "Charlotte Rivera",
  //     commentedFor: "Daniel Murphy",
  //   },
  //   {
  //     id: 19,
  //     comment: "Very professional delivery.",
  //     commentedBy: "Zoe Garcia",
  //     commentedFor: "Logan Sanchez",
  //   },
  //   {
  //     id: 20,
  //     comment: "A well-rounded discussion.",
  //     commentedBy: "Jackson Barnes",
  //     commentedFor: "Sofia Cooper",
  //   },
  // ];

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
    bgcolor: orange[500],
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
        "/BoardMeetingApi/api/Meeting/GetMeetingCommentDetails",
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
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            id="view-comments-modal-title"
            variant="h6"
            component="h2"
            sx={{ visibility: commentsData?.length ? "visible" : "hidden" }}
            style={{ color: darkMode && "white" }}
          >
            View Comments
          </Typography>
          <IconButton
            id="_icon_button"
            onClick={handleClose}
            style={{ color: orange[500], border: "none", outline: "none" }}
          >
            <CloseIcon style={{ border: "none", outline: "none" }} />
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
            <Typography variant="h6" sx={{ color: orange[500] }}>
              No Comments Found
            </Typography>
            <Typography sx={{ color: orange[400], mt: 1 }}>
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
