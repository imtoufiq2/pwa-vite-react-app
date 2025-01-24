import Brightness4RoundedIcon from "@mui/icons-material/Brightness4Rounded";

import { Fab } from "@mui/material";
import { useGlobalHook } from "../context/Contexts";
import { whiteColor } from "../App";

const DarkMode = () => {
  const { darkMode, toggleDarkMode } = useGlobalHook();
  return (
    <Fab
      size="small"
      color="secondary"
      aria-label="add"
      id="_add_comment_wrapper"
      onClick={() => toggleDarkMode(!darkMode)}
      sx={{
        position: "fixed",
        right: "1px",
        top: "50%",
        transform: "translateY(-50%)",
        bgcolor: darkMode ? "white" : "#2b2e8c",
      }}
      style={{ outline: "none", border: "none" }}
    >
      <Brightness4RoundedIcon
        sx={{ color: `${!darkMode ? whiteColor : "#2b2e8c"}` }}
      />
    </Fab>
  );
};

export default DarkMode;
