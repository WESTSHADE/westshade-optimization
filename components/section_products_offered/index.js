import { Box, Button, Container, Grid } from "@material-ui/core";

export default function Section_Products_Offered() {
  return (
    <Box className="section-container">
      <Container maxWidth="md">
        <h3 className="section-title" style={{ marginBottom: "24px" }}>
          Other products we offered
        </h3>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div
              style={{
                minHeight: "193px",
                backgroundImage: "url('/rectangle-78-5@2x.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                className="section-grid-canopy-button-black"
                style={{ width: "fitContent" }}
              >
                Custom printing
              </Button>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div
              style={{
                minHeight: "193px",
                backgroundImage: "url('/rectangle-79-5@2x.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                className="section-grid-canopy-button-black"
                style={{ width: "fitContent" }}
              >
                Accessories
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
