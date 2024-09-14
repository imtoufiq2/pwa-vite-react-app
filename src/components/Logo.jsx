import { Grid, Box } from "@mui/material";
import brandingLogo from "/Branding_logo.png";

function ResponsiveImage() {
  return (
    <Grid item xs={12} textAlign="center">
      <Box
        component="img"
        src={brandingLogo}
        alt="logo"
        sx={{
          borderRadius: "10px",
          objectFit: "inherit",
          width: {
            xs: "155px",
            md: "180px",
          },
          height: {
            xs: "82px",
            md: "100px",
          },
        }}
      />
    </Grid>
  );
}

export default ResponsiveImage;
