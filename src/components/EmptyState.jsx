import PropTypes from "prop-types";
import { Typography, Container } from "@mui/material";
import { useGlobalHook } from "../context/Contexts";

const EmptyState = ({
  title = "No results found",
  subTitle = "Sorry, but your search returned no results",
}) => {
  const { darkMode } = useGlobalHook();

  return (
    <Container
      id="_empty_main_container"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "240px",
        bgcolor: darkMode ? "#343332" : "background.paper",
        textAlign: "center",
        // border: "1px solid",
        borderColor: "#D7DFE9",
        maxWidth: "592px",
        borderRadius: 2,
        marginTop: {
          xs: "50%",
          md: "30%",
        },
        transform: "translateY(-50%)",
        p: 3, // Adding padding for better spacing
        width: {
          xs: "95%",
          // sm: "auto",
        },
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#f8a206",
          fontWeight: 600,
          fontSize: "1.25rem", // Using rem for better responsiveness
          lineHeight: 1.75, // Using unitless line-height for better scaling
          letterSpacing: "-0.3px",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#f8a206",
          fontWeight: 400,
          fontSize: "0.875rem", // Using rem for better responsiveness
          lineHeight: 1.5, // Using unitless line-height for better scaling
          letterSpacing: "-0.2px",
        }}
      >
        {subTitle}
      </Typography>
    </Container>
  );
};
EmptyState.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

export default EmptyState;
