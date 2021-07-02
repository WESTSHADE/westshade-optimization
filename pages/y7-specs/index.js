import Link from "next/link";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Breadcrumbs,
  Container,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";

function handleClick(event) {
  event.preventDefault();
}

export default function Y7_Specs() {
  const router = useRouter();

  return (
    <div class="canopy-tent-specs">
      <Box className="section-container-extend section-navbar-container border-bottom">
        <Container maxWidth="md">
          <Grid container alignItems="center">
            <Grid item xs>
              <h2 className="section-navbar-title">Y7 Heavy Duty</h2>
            </Grid>
            <div className="section-navbar-item-group">
              <div className="section-navbar-item ">
                <Link href="/y7-overview">Overview</Link>
              </div>
              <div className="section-navbar-item disable">
                <Link href="/y7-specs" disable>
                  Tech Specs
                </Link>
              </div>
              <Button
                variant="contained"
                className="section-navbar-item section-navbar-button"
                onClick={() => router.push("/products/y7-canopy-tent")}
              >
                Buy
              </Button>
            </div>
          </Grid>
        </Container>
      </Box>
      <Box className="section-container-breadcrumb">
        <Container maxWidth="md">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" onClick={handleClick}>
              Home
            </Link>
            <Link color="inherit" href="/y7-overview" onClick={handleClick}>
              Y7 Heavy Duty
            </Link>
            <Typography color="textPrimary">Specs</Typography>
          </Breadcrumbs>
        </Container>
      </Box>
      <Box className="section-container" style={{ marginTop: "0" }}>
        <Container maxWidth="sm">
          <h1 className="section-subtitle" style={{ fontWeight: "bold" }}>
            Y7 Heavy Duty Specifications
          </h1>
          <div className="section-image-container">
            <img className="section-image" src="/y7-canopy-tent.png" />
          </div>
        </Container>
      </Box>
      <Box className="section-container-specs">
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <h3 className="section-title">Size</h3>
            </Grid>
            <Grid item xs={12} sm={8}>
              <p className="section-content">10’ x 10’</p>
              <p className="section-content">10’ x 15’</p>
              <p className="section-content">10’ x 20’</p>
              <p className="section-content">13’ x 13’</p>
              <p className="section-content">13’ x 20’</p>
              <p className="section-content">13’ x 26’</p>
              <p className="section-content">16’ x 26’</p>
              <p className="section-content">20’ x 20’</p>
            </Grid>
          </Grid>
          <Divider />
        </Container>
      </Box>
      <Box className="section-container-specs">
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <h3 className="section-title">Color</h3>
            </Grid>
            <Grid item xs={12} sm={8}>
              <p className="section-content">White</p>
              <p className="section-content">Black</p>
              <p className="section-content">Red</p>
              <p className="section-content">Yellow</p>
              <p className="section-content">Blue</p>
              <p className="section-content">Green</p>
            </Grid>
          </Grid>
          <Divider />
        </Container>
      </Box>
      <Box className="section-container-specs">
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <h3 className="section-title">Frame Specifications​</h3>
            </Grid>
            <Grid item xs={12} sm={8}>
              <div className="section-container-text">
                <h6 className="section-subtitle">Frame material</h6>
                <p className="section-content">6063-T5 aluminum</p>
              </div>
              <div className="section-container-text">
                <h6 className="section-subtitle">Bracket connectors</h6>
                <p className="section-content">Aluminum</p>
              </div>
              <div className="section-container-text">
                <h6 className="section-subtitle">Height adjustor</h6>
                <p className="section-content">Push button</p>
              </div>
              <div className="section-container-text">
                <h6 className="section-subtitle">Nuts and bolts</h6>
                <p className="section-content">Stainless steel</p>
              </div>
              <div className="section-container-text">
                <h6 className="section-subtitle">Plastic parts</h6>
                <p className="section-content">Nylon</p>
              </div>
              <div className="section-container-text">
                <h6 className="section-subtitle">Footplate</h6>
                <p className="section-content">
                  4&#39; x 4&#39; zinc coated steel
                </p>
              </div>
            </Grid>
          </Grid>
          <Divider />
        </Container>
      </Box>
      <Box className="section-container-specs">
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <h3 className="section-title">Frame Measurements​​</h3>
            </Grid>
            <Grid item xs={12} sm={8}>
              <div className="section-container-text">
                <h6 className="section-subtitle">Outer leg diameter</h6>
                <p className="section-content">2.25 inches (57mm)</p>
              </div>
              <div className="section-container-text">
                <h6 className="section-subtitle">Outer leg thickness</h6>
                <p className="section-content">0.07 inches (1.8mm)</p>
              </div>
              <div className="section-container-text">
                <h6 className="section-subtitle">Truss bar height</h6>
                <p className="section-content">35mm</p>
              </div>
              <div className="section-container-text">
                <h6 className="section-subtitle">Truss bar width</h6>
                <p className="section-content">17mm</p>
              </div>
              <div className="section-container-text">
                <h6 className="section-subtitle">Truss bar depth</h6>
                <p className="section-content">1.8mm</p>
              </div>
              <div className="section-container-text">
                <h6 className="section-subtitle">Truss bar structure</h6>
                <p className="section-content">Built-in reinforcing rib</p>
              </div>
            </Grid>
          </Grid>
          <Divider />
        </Container>
      </Box>
      <Box className="section-container-specs">
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <h3 className="section-title">
                Roof and Sidewalls Specifications​
              </h3>
            </Grid>
            <Grid item xs={12} sm={8}>
              <div className="section-container-text">
                <h6 className="section-subtitle">Fabric</h6>
                <p className="section-content">
                  500D Polyester with PVC coating 320gsm
                </p>
              </div>
              <div className="section-container-text">
                <h6 className="section-subtitle">Function</h6>
                <p className="section-content">
                  Waterproof, CPAI-84 certified fire retardant, UV protection
                </p>
              </div>
              <div className="section-container-text">
                <h6 className="section-subtitle">Reinforcement</h6>
                <p className="section-content">All stress points</p>
              </div>
              <div className="section-container-text">
                <h6 className="section-subtitle">Roof connected wall</h6>
                <p className="section-content">2 inch (5cm) velcro</p>
              </div>
              <div className="section-container-text">
                <h6 className="section-subtitle">Wall connector</h6>
                <p className="section-content">#8 resin zipper</p>
              </div>
              <div className="section-container-text">
                <h6 className="section-subtitle">Roof tension</h6>
                <p className="section-content">Spring</p>
              </div>
            </Grid>
          </Grid>
          <Divider />
        </Container>
      </Box>
      <Box className="section-container-specs">
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <h3 className="section-title">Height Measurements</h3>
            </Grid>
            <Grid item xs={12} sm={8}>
              <div className="section-container-text">
                <h6 className="section-subtitle">Peak height</h6>
                <p className="section-content">10&#39;10&#34; (3.28m)</p>
              </div>
              <div className="section-container-text">
                <h6 className="section-subtitle">Height adjustment</h6>
                <p className="section-content">3 positions</p>
              </div>
              <div className="section-container-text">
                <h6 className="section-subtitle">Clearance height</h6>
                <p className="section-content">
                  5&#39;2&#34; (158cm)
                  <br />
                  6&#39;1&#34; (187cm)
                  <br />
                  6&#39;8&#34; (203cm)
                </p>
              </div>
            </Grid>
          </Grid>
          <Divider />
        </Container>
      </Box>
      <Box className="section-container-specs">
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <h3 className="section-title">Package Measurements</h3>
            </Grid>
            <Grid item xs={12} sm={8}>
              <div className="section-container-text">
                <h6 className="section-subtitle">Height</h6>
                <p className="section-content">65 inches (165cm)</p>
              </div>
              <div className="section-container-text">
                <h6 className="section-subtitle">Width</h6>
                <p className="section-content">13 inches (34cm)</p>
              </div>
              <div className="section-container-text">
                <h6 className="section-subtitle">Depth</h6>
                <p className="section-content">13 inches (34cm)</p>
              </div>
              <div className="section-container-text">
                <h6 className="section-subtitle">Weight</h6>
                <p className="section-content">98.9 lb (44.9kg)</p>
              </div>
            </Grid>
          </Grid>
          <Divider />
        </Container>
      </Box>
      <Box className="section-container-specs" style={{ marginBottom: "60px" }}>
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <h3 className="section-title">Warranty​</h3>
            </Grid>
            <Grid item xs={12} sm={8}>
              <div className="section-container-text">
                <h6 className="section-subtitle">Frame</h6>
                <p className="section-content">10 year</p>
              </div>
              <div className="section-container-text">
                <h6 className="section-subtitle">Roof</h6>
                <p className="section-content">1 year</p>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
