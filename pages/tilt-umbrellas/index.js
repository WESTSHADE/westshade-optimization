import Slider from "react-slick";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  Box,
  Button,
  Breadcrumbs,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

const SectionSocialGroup = dynamic(() =>
  import("../../components/section_social_group")
);
const SectionProductsOffered = dynamic(() =>
  import("../../components/section_products_offered")
);

function handleClick(event) {
  event.preventDefault();
}

export default function Tilt_Umbrellas() {
  const router = useRouter();

  return (
    <div className="canopy-tent">
      <Box
        className="section-container-extend"
        style={{
          minHeight: "560px",
          backgroundImage: "url('/2000-700-1-1-3@1x.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="md">
          <div style={{ flexDirection: "row", alignItems: "center" }}>
            <div className="section-grid-item-inner">
              <div
                className="section-subtitle"
                style={{
                  color: "white",
                  textAlign: "center",
                  marginBottom: "24px",
                  fontSize: "1rem",
                }}
              >
                Tilt Umbrella
              </div>
              <h3
                className="section-title"
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "2rem",
                }}
              >
                Shade Satisfaction on Every Angle
              </h3>
            </div>
          </div>
        </Container>
      </Box>
      <Box
        className="section-container-grid"
        style={{ paddingBottom: "48px", paddingTop: "48px" }}
      >
        <Container maxWidth="md">
          <Grid container spacing={6} justify="center">
            <Grid item xs={12} md={4}>
              <div className="section-umbrella-card-tag">MOST POPULAR</div>
              <div
                className="section-umbrella-card-container"
                style={{ backgroundColor: "#CAE3FA" }}
              >
                <div className="section-umbrella-card-inner upper-section z-9">
                  <div className="section-umbrella-card-title">Bali</div>
                  <p className="section-umbrella-card-content">Tilt umbrella</p>
                </div>
                <div className="section-umbrella-card-image-container z-9">
                  <img
                    className="section-umbrella-card-image"
                    src="/rectangle-41-7@2x.png"
                  />
                </div>
                <div
                  className="lower-section z-9"
                  style={{ backgroundColor: "#A6CBEB" }}
                >
                  <div
                    className="section-umbrella-card-description z-99"
                    style={{ backgroundColor: "#4C8AC5" }}
                  >
                    Everyday use tilt umbrella
                  </div>
                  <div className="section-umbrella-card-inner">
                    <div className="lower-section">
                      <span className="section-umbrella-card-price">
                        From <span className="f-bold">$159</span>
                      </span>
                      <Button
                        variant="contained"
                        className="section-grid-canopy-button-black"
                        onClick={() => router.push("/products/y6-canopy-tent")}
                      >
                        Shop
                      </Button>
                    </div>
                  </div>
                </div>
                <div
                  className="section-umbrella-card-background"
                  style={{ backgroundColor: "#A6CBEB" }}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div
                className="section-umbrella-card-container"
                style={{ backgroundColor: "#E9DCCE", borderRadius: "8px" }}
              >
                <div className="section-umbrella-card-inner upper-section z-9">
                  <div className="section-umbrella-card-title">Kapri</div>
                  <p className="section-umbrella-card-content"></p>
                </div>
                <div className="section-umbrella-card-image-container z-9">
                  <img
                    className="section-umbrella-card-image"
                    src="/rectangle-42-7@2x.png"
                  />
                </div>
                <div
                  className="lower-section z-9"
                  style={{ backgroundColor: "#E3D1BB" }}
                >
                  <div
                    className="section-umbrella-card-description z-99"
                    style={{ backgroundColor: "#D8BF9A" }}
                  >
                    Coming soon
                  </div>
                  <div className="section-umbrella-card-inner">
                    <div className="lower-section">
                      <span className="section-umbrella-card-price">
                        From <span className="f-bold">$159</span>
                      </span>
                      <Button
                        variant="contained"
                        className="section-grid-canopy-button-black"
                        onClick={() => router.push("/products/y6-canopy-tent")}
                      >
                        Shop
                      </Button>
                    </div>
                  </div>
                </div>
                <div
                  className="section-umbrella-card-background"
                  style={{ backgroundColor: "#E3D1BB" }}
                />
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className="section-container">
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <div className="section-image-container">
                <img
                  className="section-image"
                  style={{ width: "80px" }}
                  src="/rectangle-75@2x.png"
                />
              </div>
              <p className="section-title">Free Shipping</p>
            </Grid>
            <Grid item xs={6} sm={3}>
              <div className="section-image-container">
                <img
                  className="section-image"
                  style={{ width: "80px" }}
                  src="/rectangle-76@2x.png"
                />
              </div>
              <p className="section-title">Free Return</p>
            </Grid>
            <Grid item xs={6} sm={3}>
              <div className="section-image-container">
                <img
                  className="section-image"
                  style={{ width: "80px" }}
                  src="/rectangle-77@2x.png"
                />
              </div>
              <p className="section-title">Free Mock-up</p>
            </Grid>
            <Grid item xs={6} sm={3}>
              <div className="section-image-container">
                <img
                  className="section-image"
                  style={{ width: "80px" }}
                  src="/rectangle-78@2x.png"
                />
              </div>
              <p className="section-title">Excellent customer service</p>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className="section-container">
        <Container maxWidth="md">
          <h3 className="section-title" style={{ marginBottom: "24px" }}>
            Simple Lift, Auto Tilt
          </h3>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <div
                className="section-grid-item"
                style={{ backgroundColor: "transparent", alignItems: "center" }}
              >
                <div
                  className="section-image-container"
                  style={{
                    height: "120px",
                    width: "120px",
                    objectFit: "contain",
                    borderRadius: "50%",
                  }}
                >
                  <img className="section-image" src="/ellipse-14-1@2x.png" />
                </div>
                <div
                  className="section-grid-item-inner"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    className="section-title"
                    style={{ textAlign: "center" }}
                  >
                    Crank Lift System
                  </div>
                  <h3
                    className="section-subtitle"
                    style={{ textAlign: "center" }}
                  >
                    A simple crank lift design only requires 15 seconds to fully
                    open the umbrella.
                  </h3>
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div
                className="section-grid-item"
                style={{ backgroundColor: "transparent", alignItems: "center" }}
              >
                <div
                  className="section-image-container"
                  style={{
                    height: "120px",
                    width: "120px",
                    objectFit: "contain",
                    borderRadius: "50%",
                  }}
                >
                  <img className="section-image" src="/ellipse-15-1@2x.png" />
                </div>
                <div
                  className="section-grid-item-inner"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    className="section-title"
                    style={{ textAlign: "center" }}
                  >
                    Auto Tilt System
                  </div>
                  <h3
                    className="section-subtitle"
                    style={{ textAlign: "center" }}
                  >
                    A simple push button tilt system automatically tilts the
                    umbrella seamlessly into place, giving you flexible shade
                    coverage as the sun moves across the sky.
                  </h3>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        className="section-container-extend"
        style={{
          minHeight: "500px",
          backgroundImage: "url('/rectangle-88-2@1x.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="md">
          <div style={{ flexDirection: "row", alignItems: "center" }}>
            <h3
              className="section-title"
              style={{
                color: "white",
                textAlign: "center",
                fontSize: "2rem",
              }}
            >
              See the umbrellas side-by-side
            </h3>
            <Button
              variant="contained"
              className="section-grid-canopy-button-black"
              onClick={() => router.push("/compare-tilt-umbrella")}
            >
              COMPARE TILT UMBRELLA
            </Button>
          </div>
        </Container>
      </Box>
      <SectionProductsOffered />
    </div>
  );
}
