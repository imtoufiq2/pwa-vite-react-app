import { colors, InputBase } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#fff",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 14,
    padding: "8px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    fontFamily: '"Poppins", sans-serif',
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.1rem`,
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiInputAdornment-root": {
    position: "absolute",
    color: colors.grey[400],
    top: 18,
    right: 15, // Adjust position as required
  },
  "& .MuiInputBase-input:-webkit-autofill": {
    backgroundColor: "#F3F6F9 !important", // Ensure background color is white
    color: "#000 !important", // Ensure text color remains visible
  },
}));
