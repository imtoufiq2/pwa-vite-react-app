import PropTypes from "prop-types";

import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Drawer = ({ setOpen }) => {
  return (
    <Tooltip title="Add Comment" arrow id="_toolitp">
      <Fab
        size="small"
        color="secondary"
        aria-label="add"
        id="_add-icon"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        style={{
          outline: "none",
          border: "none",
          borderRadius: "50%",
          // marginTop: "4px",
          position: "fixed",
          right: "20px",
          bottom: "66px",
        }}
      >
        <AddIcon sx={{ color: "#2b2e8c" }} />
      </Fab>
    </Tooltip>
  );
};
// Define prop types for the Drawer component
Drawer.propTypes = {
  setOpen: PropTypes.func.isRequired,
};
export default Drawer;
