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

export default function Cantilever_Umbrellas() {
  const router = useRouter();

  return (
    <div className="canopy-tent">
      <Box
        className="section-container-extend"
        style={{
          minHeight: "560px",
          backgroundImage: "url('/2000-700-1-1-4@1x.png')",
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
                Cantilever Umbrella
              </div>
              <h3
                className="section-title"
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "2rem",
                }}
              >
                Maximum Strength, Optimal Shade
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
              <div
                className="section-umbrella-card-container"
                style={{ backgroundColor: "#B5E6FF", borderRadius: "8px" }}
              >
                <div className="section-umbrella-card-inner upper-section z-9">
                  <div className="section-umbrella-card-title">Catalina</div>
                  <p className="section-umbrella-card-content"></p>
                </div>
                <div className="section-umbrella-card-image-container z-9">
                  <img
                    className="section-umbrella-card-image"
                    src="/catalina@1x.png"
                  />
                </div>
                <div
                  className="lower-section z-9"
                  style={{ backgroundColor: "#85CFF2" }}
                >
                  <div
                    className="section-umbrella-card-description z-99"
                    style={{ backgroundColor: "#1B8DBB" }}
                  >
                    Everyday use cantilever umbrella
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
                  style={{ backgroundColor: "#85CFF2" }}
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
            Maximum Strength, Optimal Shade
          </h3>
          <Grid container spacing={6}>
            <Grid item xs={6} sm={3}>
              <div
                className="section-grid-item"
                style={{
                  backgroundColor: "transparent",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  className="section-image-container"
                  style={{
                    height: "120px",
                    width: "120px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                >
                  <img className="section-image" src="/rectangle-99@2x.png" />
                </div>
                <div
                  className="section-grid-item-inner"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h3
                    className="section-subtitle"
                    style={{ textAlign: "center" }}
                  >
                    Easy-to-use crank lift design
                  </h3>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} sm={3}>
              <div
                className="section-grid-item"
                style={{
                  backgroundColor: "transparent",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  className="section-image-container"
                  style={{
                    height: "120px",
                    width: "120px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                >
                  <img className="section-image" src="/rectangle-99-1@2x.png" />
                </div>
                <div
                  className="section-grid-item-inner"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h3
                    className="section-subtitle"
                    style={{ textAlign: "center" }}
                  >
                    Super durable marine grade aluminum arms and joints{" "}
                  </h3>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} sm={3}>
              <div
                className="section-grid-item"
                style={{
                  backgroundColor: "transparent",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  className="section-image-container"
                  style={{
                    height: "120px",
                    width: "120px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                >
                  <img className="section-image" src="/rectangle-99-2@2x.png" />
                </div>
                <div
                  className="section-grid-item-inner"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h3
                    className="section-subtitle"
                    style={{ textAlign: "center" }}
                  >
                    Aluminum pole with built in reinforcing rib structure
                  </h3>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} sm={3}>
              <div
                className="section-grid-item"
                style={{
                  backgroundColor: "transparent",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  className="section-image-container"
                  style={{
                    height: "120px",
                    width: "120px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                >
                  <img className="section-image" src="/rectangle-99-3@2x.png" />
                </div>
                <div
                  className="section-grid-item-inner"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h3
                    className="section-subtitle"
                    style={{ textAlign: "center" }}
                  >
                    Heavy duty welded PVC fabric
                  </h3>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <SectionProductsOffered />
      <Box className="section-container">
        <Container maxWidth="md">
          <div className="section-image-container">
            <img
              className="section-image"
              style={{ maxHeight: "500px" }}
              src="/image-47@2x.png"
            />
          </div>
        </Container>
      </Box>
      <Box className="section-container">
        <Container maxWidth="md">
          <Grid container spacing={2} style={{ marginBottom: "48px" }}>
            <Grid item xs={6}>
              <div className="section-image-container">
                <img
                  className="section-image"
                  style={{ maxHeight: "500px" }}
                  src="/rectangle-78-2@2x.png"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="section-image-container">
                <img
                  className="section-image"
                  style={{ maxHeight: "500px" }}
                  src="/rectangle-79-1@2x.png"
                />
              </div>
            </Grid>
          </Grid>
          <Container maxWidth="sm">
            <p className="section-content">
              Catalina market umbrella is strong and durable. lt has a semi
              permanent structure to provide maximum shade and weather
              protection. The frame is made with marine grade powder coated
              aluminum. Easy assembly at no cost.
            </p>
          </Container>
        </Container>
      </Box>
    </div>
  );
}
