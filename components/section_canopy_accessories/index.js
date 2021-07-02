import Link from "next/link";
import styles from "./section.module.css";

import { Box, Button, Container, Grid } from "@material-ui/core";

export default function Section_Canopy_Accessories() {
  return (
    <Container>
      <Box className="section-container">
        <div className="section-subtitle">Accessories</div>
        <h3
          className="section-title"
          style={{ fontSize: "2.125rem", lineHeight: "2.25rem" }}
        >
          Limitless solutions for limitless scenarios.
        </h3>
        <p className="section-content-entend">
          Different needs require different solutions. Our versatile accessories
          allow you
          <br />
          to combine individual elements. From weight plates to side walls.
        </p>
        <Button variant="contained" className="section-grid-button">
          Shop canopy accessories
        </Button>
      </Box>
      <Box className="section-container-grid">
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <div className="section-grid-item">
                <div className="section-grid-item-inner">
                  <div className="section-subtitle">Fabric material</div>
                  <h3 className="section-title">
                    500D Polyester.
                    <br />
                    <br />
                    320 gsm.
                  </h3>
                </div>
                <img
                  className="section-grid-image"
                  style={{ paddingBottom: "0" }}
                  src="/fabric@1x.png"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="section-grid-item ">
                <div className="section-grid-item-inner">
                  <div className="section-subtitle">
                    Our PVC coating can withstand abrasion and distortion.
                  </div>
                  <h3 className="section-title">
                    Known for its
                    <br />
                    Strength.
                    <br />
                    Durability.
                    <br />
                    Flexibility.
                    <br />
                    Longevity.
                  </h3>
                  <p className="section-content">
                    Our PVC coating can withstand abrasion and distortion.
                  </p>
                </div>
                <img className="section-grid-image" src="/pvc-1@1x.png" />
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="section-grid-item ">
                <div className="section-grid-item-inner">
                  <div className="section-subtitle">
                    Fire, water, wind resistant
                  </div>
                  <h3 className="section-title">CPAI-84 certified.</h3>
                  <p className="section-content">
                    The fabric can withstand some of the toughest environments.
                    From harsh winds, unexpected rain, to UV rays. It can also
                    keep your event and marketing materials safe.
                  </p>
                </div>
                <img
                  className="section-grid-image"
                  src="/feature-icons@1x.png"
                />
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Container>
  );
}
