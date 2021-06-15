import Link from "next/link";
import styles from "./section.module.css";

import { Box, Button, Container, Grid } from "@material-ui/core";

export default function Section_Canopy_Compare() {
  return (
    <Box className="section-container">
      <h3
        className="section-title"
        style={{ fontSize: "2.125rem", lineHeight: "2.25rem" }}
      >
        Which pop up canopy tent is right for you?
      </h3>
      <Link href="/compare">
        <p className="section-content">Compare all pop up canopy series &gt;</p>
      </Link>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <div className={`${styles["section-grid-item"]}`}>
              <div>
                <img
                  className={`${styles["section-image"]}`}
                  src="/y5-1@1x.png"
                />
                <h3 className="section-title">Y5 Classic Steel Hex45</h3>
                <p className="section-content" style={{ textAlign: "left" }}>
                  Starting at $245
                  <br />
                  <br /> Commercial grade 1.75 inch
                  <br />
                  powder-coated square steel frame
                  <br />
                  <br />
                  Zinc coated nuts and bolts
                  <br />
                  <br />
                  Nylon bracket connectors
                  <br />
                  <br />
                  500D Polyester with PVC coating fabric
                  <br />
                  <br />
                  Waterproof, CPAI-84 fire retardant, UV protection
                  <br />
                  <br />3 available sizes
                </p>
              </div>
              <div>
                <Button
                  variant="contained"
                  className={`${styles["section-grid-button"]}`}
                >
                  Buy
                </Button>
                <Link href="/y5-overview">
                  <p className="section-content">Learn more &gt;</p>
                </Link>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className={`${styles["section-grid-item"]}`}>
              <div>
                <img
                  className={`${styles["section-image"]}`}
                  src="/y6@2x.png"
                />
                <h3 className="section-title">Y6 Commercial Aluminum Hex45</h3>
                <p className="section-content" style={{ textAlign: "left" }}>
                  Starting at $445
                  <br />
                  6063-T5 high strength 1.75 inch
                  <br />
                  hexagonal aluminum frame
                  <br />
                  <br />
                  Stainless steel nuts and bolts
                  <br />
                  <br />
                  Aluminum bracket connectors
                  <br />
                  <br />
                  600D polyester PVC coating fabric
                  <br />
                  <br />
                  Waterproof, CPAI-84 fire retardant, UV protection
                  <br />
                  <br />3 available sizes
                </p>
              </div>
              <div>
                <Button
                  variant="contained"
                  className={`${styles["section-grid-button"]}`}
                >
                  Buy
                </Button>
                <Link href="/y6-overview">
                  <p className="section-content">Learn more &gt;</p>
                </Link>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className={`${styles["section-grid-item"]}`}>
              <div>
                <img
                  className={`${styles["section-image"]}`}
                  src="/y7@1x.png"
                />
                <h3 className="section-title">Y7 Heavy Duty Aluminum Hex57</h3>
                <p className="section-content" style={{ textAlign: "left" }}>
                  Starting at $619
                  <br />
                  6063-T5 high strength 2.25 inch
                  <br />
                  hexagonal aluminum frame
                  <br />
                  <br />
                  Stainless steel nuts and bolts
                  <br />
                  <br />
                  Aluminum bracket connectors
                  <br />
                  <br />
                  600D polyester PVC coating fabric
                  <br />
                  <br />
                  Waterproof, CPAI-84 fire retardant, UV protection
                  <br />
                  <br />8 available sizes
                </p>
              </div>
              <div>
                <Button
                  variant="contained"
                  className={`${styles["section-grid-button"]}`}
                >
                  Buy
                </Button>
                <Link href="/y7-overview">
                  <p className="section-content">Learn more &gt;</p>
                </Link>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
