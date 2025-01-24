import { Grid, Box } from "@mui/material";
import brandingLogo from "/Branding_logo.png";
import brandingLogoDark from "/Branding_logoDark.png";
import { useGlobalHook } from "../context/Contexts";

function ResponsiveImage() {
  const { darkMode } = useGlobalHook();
  return (
    <Grid item xs={12} textAlign="center">
      <Box
        component="img"
        src={darkMode ? brandingLogoDark : brandingLogo}
        alt="logo"
        sx={{
          borderRadius: "10px",
          objectFit: "inherit",
          width: {
            xs: "160px",
            md: "200px",
            lg: "212px",
          },
          height: {
            xs: "74px",
            md: "90px",
          },
        }}
      />
    </Grid>
  );
}

export default ResponsiveImage;
