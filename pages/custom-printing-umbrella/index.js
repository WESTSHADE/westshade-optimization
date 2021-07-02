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

function handleClick(event) {
  event.preventDefault();
}

export default function Canopy_Tent() {
  const router = useRouter();

  return (
    <div className="canopy-tent">
      <Box
        className="section-container-extend"
        style={{
          minHeight: "560px",
          backgroundImage: "url('/1920-610-19.jpeg')",
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
                  color: "black",
                  marginBottom: "24px",
                  fontSize: "1rem",
                }}
              >
                Exquisite design yet strong and durable
              </div>
              <h3
                className="section-title"
                style={{
                  fontSize: "2rem",
                }}
              >
                Custom Printing Umbrella
              </h3>
            </div>
          </div>
        </Container>
      </Box>
      <Box className="section-container">
        <Container maxWidth="sm">
          <h3 className="section-title">Custom Printing Umbrella </h3>
          <p className="section-content-entend">
            Westshade provides a premium range of patio and market umbrellas in
            various sizes and colors. Customized to help promote your business
            or for everyday use. Choose between our Market Umbrella, Tilt
            Umbrella, and Cantilever Umbrella.
            <br />
            <br />
            <br />
            As the #1 canopy and market umbrella manufacturer in Southern
            California, we ensure industry leading quality for all products, and
            award winning customer support.
          </p>
        </Container>
      </Box>
      <Box className="section-container">
        <Container maxWidth="md">
          <Grid
            container
            className="section-grid-item"
            alignItems="center"
            style={{ flexDirection: "row", marginBottom: "48px" }}
          >
            <Grid item xs={12}>
              <div
                className="section-grid-item-inner"
                style={{ paddingBottom: "0" }}
              >
                <div className="section-subtitle">
                  Fully Weather Proof and Fire Retardant
                </div>
                <h3 className="section-title">
                  CPAI-84 Certified. Waterproof. UV Protection.
                </h3>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div
                className="section-image-container"
                style={{ marginBottom: "48px" }}
              >
                <img
                  style={{
                    objectFit: "contain",
                    width: "90%",
                    minHeight: "200px",
                  }}
                  src="/printed-canopy-1@2x.png"
                />
                <img
                  style={{ objectFit: "contain", width: "80%" }}
                  src="/onepress-1@1x.png"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div style={{ flexDirection: "row", alignItems: "center" }}>
                <div className="section-grid-item-inner">
                  <p
                    className="section-content"
                    style={{ marginBottom: "36px" }}
                  >
                    Each canopy is ensured optimal protection from high-wind
                    speeds and top resistance to water. Maximum UV protection is
                    implemented with instant shade and cool air for the most
                    comfortable canopy experience. The most trustworthy material
                    to help keep your business events and marketing running
                    safely and with ease.
                  </p>
                  <Button
                    variant="contained"
                    className="section-grid-canopy-button-black"
                  >
                    Get your free mock-up today
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <div
                className="section-grid-item"
                style={{ position: "relative", minHeight: "400px" }}
              >
                <div className="section-grid-item-inner">
                  <h3 className="section-title">
                    Build your Macro pull-up umbrella
                  </h3>
                  <Button
                    variant="contained"
                    className="section-grid-canopy-button-black"
                    onClick={() => {}}
                  >
                    Get quote
                  </Button>
                </div>
                <img
                  className="section-grid-custom-printing-umbrella-image"
                  src="/rectangle-87@2x.png"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div
                className="section-grid-item"
                style={{ position: "relative", minHeight: "400px" }}
              >
                <div className="section-grid-item-inner">
                  <h3 className="section-title">
                    Build your Macro pull-up umbrella
                  </h3>
                  <Button
                    variant="contained"
                    className="section-grid-canopy-button-black"
                    onClick={() => {}}
                  >
                    Get quote
                  </Button>
                </div>
                <img
                  className="section-grid-custom-printing-umbrella-image"
                  src="/rectangle-87-2@2x.png"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div
                className="section-grid-item"
                style={{ position: "relative", minHeight: "400px" }}
              >
                <div className="section-grid-item-inner">
                  <h3 className="section-title">
                    Build your Macro pull-up umbrella
                  </h3>
                  <Button
                    variant="contained"
                    className="section-grid-canopy-button-black"
                    onClick={() => {}}
                  >
                    Get quote
                  </Button>
                </div>
                <img
                  className="section-grid-custom-printing-umbrella-image"
                  src="/rectangle-87-1@2x.png"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div
                className="section-grid-item"
                style={{ position: "relative", minHeight: "400px" }}
              >
                <div className="section-grid-item-inner">
                  <h3 className="section-title">
                    Build your Macro pull-up umbrella
                  </h3>
                  <Button
                    variant="contained"
                    className="section-grid-canopy-button-black"
                    onClick={() => {}}
                  >
                    Get quote
                  </Button>
                </div>
                <img
                  className="section-grid-custom-printing-umbrella-image"
                  src="/rectangle-87-3@2x.png"
                />
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className="section-container">
        <Container maxWidth="md">
          <h3 className="section-title">Need Help Deciding?</h3>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <div
                className="section-grid-item"
                style={{ backgroundColor: "transparent" }}
              >
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
                    Chat With Us!
                  </div>
                  <h3
                    className="section-subtitle"
                    style={{ textAlign: "center" }}
                  >
                    Our award winning Customer Service Representatives are
                    available seven days a week to answer any of your questions.
                    Chat now.
                  </h3>
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div
                className="section-grid-item"
                style={{ backgroundColor: "transparent" }}
              >
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
                    Call Us Now!
                  </div>
                  <h3
                    className="section-subtitle"
                    style={{ textAlign: "center" }}
                  >
                    Our Shade Specialists are here to help you find the perfect
                    umbrella. Give us a call at +1 (949) 522-8111.
                  </h3>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
