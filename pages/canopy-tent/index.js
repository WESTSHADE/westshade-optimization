import Slider from "react-slick";

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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

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
          minHeight: "400px",
          backgroundImage: "url('/2000-700-1-1@1x.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          marginBottom: "36px",
        }}
      >
        <Container maxWidth="md">
          <div style={{ flexDirection: "row", alignItems: "center" }}>
            <div className="section-grid-item-inner">
              <h3
                className="section-title"
                style={{ color: "white", fontSize: "2rem" }}
              >
                The Most High-Quality Canopy Tent For All Your Needs!
              </h3>
              <p className="section-content" style={{ color: "white" }}>
                Create instant cooling shade this summer with our
                industry-leading Canopy Tent.
                <br />
                Highlighting the best materials for an optimal tent experience.{" "}
                <br />
                <br />
                <br />
                From summertime parties to professional business events,
                Westshade has you covered.
              </p>
              <Button
                variant="contained"
                className="section-grid-canopy-button"
              >
                Need Custom Print? LEARN MORE
              </Button>
            </div>
          </div>
        </Container>
      </Box>
      <Box className="section-container-grid" style={{ paddingBottom: "24px" }}>
        <Container maxWidth="md">
          <Grid container spacing={6}>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div
                  className="section-grid-item-inner"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="section-title">
                    Leading Canopy Manufacturer in the USA
                  </div>
                  <h3 className="section-subtitle">
                    Westshade is the leading commercial canopy and market
                    umbrella manufacturer in Southern California.
                  </h3>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item ">
                <div
                  className="section-grid-item-inner"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="section-title">
                    Innovative Design For Any Occasions & Specific Use
                  </div>
                  <h3 className="section-subtitle">
                    As a full-service custom manufacturer, We have a large
                    selection of stock tents. We are also able to fill your
                    unique design requirements.
                  </h3>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item ">
                <div
                  className="section-grid-item-inner"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="section-title">
                    Outstanding Customer Support Make Us Your #1 Choice
                  </div>
                  <h3 className="section-subtitle">
                    Our focus is your satisfaction and convenience. Reach our
                    canopy expert whenever you have a question through phone,
                    online form or chat.
                  </h3>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className="section-container-extend background-gray">
        <Container maxWidth="md">
          <h3
            className="section-title"
            style={{ fontWeight: "normal", marginTop: "24px" }}
          >
            Which tent is right for you?
          </h3>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <div className="section-container-grid" style={{ width: "90%" }}>
                <div className="section-image-container">
                  <img className="section-image" src="/rectangle-40-1@2x.png" />
                </div>
                <div>
                  <h3 className="section-title">Y5 Economic</h3>
                  <p className="section-subtitle">For recreational use</p>
                  <p className="section-content">
                    Our most economical canopy made out of stable powder-coated
                    steel for everyday usage.
                  </p>
                </div>
                <div style={{ margin: "18px 12px" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      marginBottom: "18px",
                    }}
                  >
                    <div className="color-dot-black" />
                    <div className="color-dot-white" />
                    <div className="color-dot-red" />
                    <div className="color-dot-blue" />
                    <div className="color-dot-yellow" />
                    <div className="color-dot-green" />
                  </div>
                  <p className="section-content">Starting at $245</p>
                  <Button
                    variant="contained"
                    className="section-grid-button"
                    onClick={() => router.push("/products/y5-canopy-tent")}
                  >
                    Buy
                  </Button>
                </div>
                <Divider />
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="section-container-grid" style={{ width: "90%" }}>
                <div className="section-image-container">
                  <img className="section-image" src="/rectangle-41-1@2x.png" />
                </div>
                <div>
                  <h3 className="section-title">Y6 Commercial</h3>
                  <p className="section-subtitle">For commercial use</p>
                  <p className="section-content">
                    Stronger and lighter commercial grade aluminum frame canopy
                    tent for various environments.
                  </p>
                </div>
                <div style={{ margin: "18px 12px" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      marginBottom: "18px",
                    }}
                  >
                    <div className="color-dot-black" />
                    <div className="color-dot-white" />
                    <div className="color-dot-red" />
                    <div className="color-dot-blue" />
                    <div className="color-dot-yellow" />
                    <div className="color-dot-green" />
                  </div>
                  <p className="section-content">Starting at $445</p>
                  <Button
                    variant="contained"
                    className="section-grid-button"
                    onClick={() => router.push("/products/y6-canopy-tent")}
                  >
                    Buy
                  </Button>
                </div>
                <Divider />
                <div style={{ margin: "12px" }}>
                  <p className="section-subtitle">Limited Time Offer:</p>
                  <p className="section-content">
                    Free wheeled protective covers, tie down straps, steel
                    stakes
                  </p>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="section-container-grid" style={{ width: "90%" }}>
                <div className="section-image-container">
                  <img className="section-image" src="/rectangle-42-6@2x.png" />
                </div>
                <div>
                  <h3 className="section-title">Y7 Heavy Duty</h3>
                  <p className="section-subtitle">For heavy duty use</p>
                  <p className="section-content">
                    The most heavy duty aluminum frame canopy on the market with
                    unchallenged strength and durability.
                  </p>
                </div>
                <div style={{ margin: "18px 12px" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      marginBottom: "18px",
                    }}
                  >
                    <div className="color-dot-black" />
                    <div className="color-dot-white" />
                    <div className="color-dot-red" />
                    <div className="color-dot-blue" />
                    <div className="color-dot-yellow" />
                    <div className="color-dot-green" />
                  </div>
                  <p className="section-content">Starting at $619</p>
                  <Button
                    variant="contained"
                    className="section-grid-button"
                    onClick={() => router.push("/products/y7-canopy-tent")}
                  >
                    Buy
                  </Button>
                </div>
                <Divider />
                <div style={{ margin: "12px" }}>
                  <p className="section-subtitle">Limited Time Offer:</p>
                  <p className="section-content">
                    Free wheeled protective covers, tie down straps, steel
                    stakes
                  </p>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className="section-container-grid" style={{ margin: "48px auto" }}>
        <Container maxWidth="md">
          <Grid
            container
            spacing={2}
            className="section-grid-item"
            alignItems="center"
            style={{ flexDirection: "row" }}
          >
            <Grid item xs={12} md={6}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="section-grid-item-inner">
                  <h3 className="section-title">Tents that's Going to Last!</h3>
                  <p className="section-content">
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      size="1x"
                      color="orange"
                      style={{ marginRight: "12px" }}
                    />
                    No Rust Commercial Grade Steel/Aluminum Frame
                  </p>
                  <p className="section-content">
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      size="1x"
                      color="orange"
                      style={{ marginRight: "12px" }}
                    />
                    1.5-2.2″ Hex Legs and Ultimate Strength Joints
                  </p>
                  <p className="section-content">
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      size="1x"
                      color="orange"
                      style={{ marginRight: "12px" }}
                    />
                    Safe & Reliable Easily Height Adjustment Brackets
                  </p>
                  <p className="section-content">
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      size="1x"
                      color="orange"
                      style={{ marginRight: "12px" }}
                    />
                    Heavy Duty Waterproof & Fireproof Materials
                  </p>
                  <p className="section-content">
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      size="1x"
                      color="orange"
                      style={{ marginRight: "12px" }}
                    />
                    Up to 10-Year Frame Warranty
                  </p>
                  <p className="section-content">
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      size="1x"
                      color="orange"
                      style={{ marginRight: "12px" }}
                    />
                    Available in 8 Size Options & 6 Color Option
                  </p>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <img className="section-grid-image" src="/image-38@2x.png" />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className="section-container">
        <Container maxWidth="md">
          <h3 className="section-title">Available sizes & colors</h3>
          <Grid
            container
            spacing={2}
            className="section-grid-item"
            alignItems="center"
            style={{ flexDirection: "row", backgroundColor: "transparent" }}
          >
            <Grid item xs={12} md={3}>
              <div className="section-image-container">
                <img className="section-image" src="/rectangle-58@2x.png" />
              </div>
              <h3 className="section-title">10x10 ft</h3>
              <p className="section-subtitle">10-15 guests</p>
              <div style={{ margin: "18px 12px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    marginBottom: "18px",
                  }}
                >
                  <div className="color-dot-black" />
                  <div className="color-dot-white" />
                  <div className="color-dot-red" />
                  <div className="color-dot-blue" />
                  <div className="color-dot-yellow" />
                  <div className="color-dot-green" />
                </div>
                <Button
                  variant="contained"
                  className="section-grid-canopy-button"
                  onClick={() => router.push("/products/y6-canopy-tent")}
                >
                  Buy Now
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className="section-image-container">
                <img className="section-image" src="/rectangle-59@2x.png" />
              </div>
              <h3 className="section-title">10x15 ft</h3>
              <p className="section-subtitle">15-20 guests</p>
              <div style={{ margin: "18px 12px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    marginBottom: "18px",
                  }}
                >
                  <div className="color-dot-black" />
                  <div className="color-dot-white" />
                  <div className="color-dot-red" />
                  <div className="color-dot-blue" />
                  <div className="color-dot-yellow" />
                  <div className="color-dot-green" />
                </div>
                <Button
                  variant="contained"
                  className="section-grid-canopy-button"
                  onClick={() => router.push("/products/y6-canopy-tent")}
                >
                  Buy Now
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className="section-image-container">
                <img className="section-image" src="/rectangle-60@2x.png" />
              </div>
              <h3 className="section-title">10x20 ft</h3>
              <p className="section-subtitle">20-30 guests</p>
              <div style={{ margin: "18px 12px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    marginBottom: "18px",
                  }}
                >
                  <div className="color-dot-black" />
                  <div className="color-dot-white" />
                  <div className="color-dot-red" />
                  <div className="color-dot-blue" />
                  <div className="color-dot-yellow" />
                  <div className="color-dot-green" />
                </div>
                <Button
                  variant="contained"
                  className="section-grid-canopy-button"
                  onClick={() => router.push("/products/y6-canopy-tent")}
                >
                  Buy Now
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className="section-image-container">
                <img className="section-image" src="/rectangle-61@2x.png" />
              </div>
              <h3 className="section-title">16x16 ft</h3>
              <p className="section-subtitle">25-40 guests</p>
              <div style={{ margin: "18px 12px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    marginBottom: "18px",
                  }}
                >
                  <div className="color-dot-black" />
                  <div className="color-dot-white" />
                  <div className="color-dot-red" />
                  <div className="color-dot-blue" />
                  <div className="color-dot-yellow" />
                  <div className="color-dot-green" />
                </div>
                <Button
                  variant="contained"
                  className="section-grid-canopy-button"
                  onClick={() => router.push("/products/y6-canopy-tent")}
                >
                  Buy Now
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className="section-image-container">
                <img className="section-image" src="/rectangle-58-1@2x.png" />
              </div>
              <h3 className="section-title">13x13 ft</h3>
              <p className="section-subtitle">15-25 guests</p>
              <div style={{ margin: "18px 12px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    marginBottom: "18px",
                  }}
                >
                  <div className="color-dot-black" />
                  <div className="color-dot-white" />
                  <div className="color-dot-red" />
                  <div className="color-dot-blue" />
                  <div className="color-dot-yellow" />
                  <div className="color-dot-green" />
                </div>
                <Button
                  variant="contained"
                  className="section-grid-canopy-button"
                  onClick={() => router.push("/products/y6-canopy-tent")}
                >
                  Buy Now
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className="section-image-container">
                <img className="section-image" src="/rectangle-59-1@2x.png" />
              </div>
              <h3 className="section-title">13x20 ft</h3>
              <p className="section-subtitle">25-40 guests</p>
              <div style={{ margin: "18px 12px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    marginBottom: "18px",
                  }}
                >
                  <div className="color-dot-black" />
                  <div className="color-dot-white" />
                  <div className="color-dot-red" />
                  <div className="color-dot-blue" />
                  <div className="color-dot-yellow" />
                  <div className="color-dot-green" />
                </div>
                <Button
                  variant="contained"
                  className="section-grid-canopy-button"
                  onClick={() => router.push("/products/y6-canopy-tent")}
                >
                  Buy Now
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className="section-image-container">
                <img className="section-image" src="/rectangle-60-1@2x.png" />
              </div>
              <h3 className="section-title">13x26 ft</h3>
              <p className="section-subtitle">30-50 guests</p>
              <div style={{ margin: "18px 12px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    marginBottom: "18px",
                  }}
                >
                  <div className="color-dot-black" />
                  <div className="color-dot-white" />
                  <div className="color-dot-red" />
                  <div className="color-dot-blue" />
                  <div className="color-dot-yellow" />
                  <div className="color-dot-green" />
                </div>
                <Button
                  variant="contained"
                  className="section-grid-canopy-button"
                  onClick={() => router.push("/products/y6-canopy-tent")}
                >
                  Buy Now
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className="section-image-container">
                <img className="section-image" src="/rectangle-61-1@2x.png" />
              </div>
              <h3 className="section-title">20x20 ft</h3>
              <p className="section-subtitle">40-60 guests</p>
              <div style={{ margin: "18px 12px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    marginBottom: "18px",
                  }}
                >
                  <div className="color-dot-black" />
                  <div className="color-dot-white" />
                  <div className="color-dot-red" />
                  <div className="color-dot-blue" />
                  <div className="color-dot-yellow" />
                  <div className="color-dot-green" />
                </div>
                <Button
                  variant="contained"
                  className="section-grid-canopy-button"
                  onClick={() => router.push("/products/y6-canopy-tent")}
                >
                  Buy Now
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
