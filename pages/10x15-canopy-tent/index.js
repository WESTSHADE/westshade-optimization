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

function handleClick(event) {
  event.preventDefault();
}

export default function Canopy_Tent_Package() {
  const router = useRouter();

  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    autoplay: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div class="canopy-tent-package">
      <Box className="section-navbar-container section-container-breadcrumb">
        <Container maxWidth="md">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" onClick={handleClick}>
              Home
            </Link>
            <Typography color="textPrimary">10x15 Canopy Tent</Typography>
          </Breadcrumbs>
        </Container>
      </Box>
      <Box className="section-container" style={{ marginTop: "0" }}>
        <Container maxWidth="sm">
          <h1 className="section-title">10x15 Canopy Tent</h1>
          <p className="section-content-entend">
            Add more additional space of shaded protection for your upcoming
            events and outdoor activities with our 10x15 instant pop-up canopy
            tent! Perfect for parties, picnics, market trade shows, exhibitions,
            business events, and all other outdoor activity! Choose between the
            Y5, Y6, and the Y7 series available today for the right activity. In
            addition, we offer customizable custom printing packages to make
            your marketing and original display shine in front of your audience!
          </p>
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
                  <img className="section-image" src="/rectangle-40@2x.png" />
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
                <Grid
                  container
                  spacing={2}
                  style={{ margin: "24px auto auto", width: "90%" }}
                >
                  <Grid item xs={6}>
                    <div className="section-image-package-specs-container">
                      <img
                        className="section-image-package-specs"
                        src="/pole@1x.png"
                      />
                      <p className="section-content">1.75’’ outer leg frame</p>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="section-image-package-specs-container">
                      <img
                        className="section-image-package-specs"
                        src="/onepress@1x.png"
                      />
                      <p className="section-content">
                        Push button height ajustor
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="section-image-package-specs-container">
                      <img
                        className="section-image-package-specs"
                        src="/bracket-connector@1x.png"
                      />
                      <p className="section-content">
                        Truss bars and connectors
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="section-image-package-specs-container">
                      <img
                        className="section-image-package-specs"
                        src="/footpads@1x.png"
                      />
                      <p className="section-content">
                        Powder coating steel frame
                      </p>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="section-container-grid" style={{ width: "90%" }}>
                <div className="section-image-container">
                  <img className="section-image" src="/rectangle-41@2x.png" />
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
                <Grid
                  container
                  spacing={2}
                  style={{ margin: "24px auto auto", width: "90%" }}
                >
                  <Grid item xs={6}>
                    <div className="section-image-package-specs-container">
                      <img
                        className="section-image-package-specs"
                        src="/pole-1@1x.png"
                      />
                      <p className="section-content">
                        1.75’’ Aluminum outer leg
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="section-image-package-specs-container">
                      <img
                        className="section-image-package-specs"
                        src="/image-33@2x.png"
                      />
                      <p className="section-content">
                        Push button height ajustor
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="section-image-package-specs-container">
                      <img
                        className="section-image-package-specs"
                        src="/image-34@2x.png"
                      />
                      <p className="section-content">Aluminum connectors</p>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="section-image-package-specs-container">
                      <img
                        className="section-image-package-specs"
                        src="/footpads-1@1x.png"
                      />
                      <p className="section-content">Aluminum frame</p>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="section-container-grid" style={{ width: "90%" }}>
                <div className="section-image-container">
                  <img className="section-image" src="/rectangle-42@2x.png" />
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
                <Grid
                  container
                  spacing={2}
                  style={{ margin: "24px auto auto", width: "90%" }}
                >
                  <Grid item xs={6}>
                    <div className="section-image-package-specs-container">
                      <img
                        className="section-image-package-specs"
                        src="/pole-1@1x.png"
                      />
                      <p className="section-content">1.75’’ outer leg frame</p>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="section-image-package-specs-container">
                      <img
                        className="section-image-package-specs"
                        src="/image-33@2x.png"
                      />
                      <p className="section-content">
                        Push button height ajustor
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="section-image-package-specs-container">
                      <img
                        className="section-image-package-specs"
                        src="/image-34@2x.png"
                      />
                      <p className="section-content">
                        Truss bars and connectors
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="section-image-package-specs-container">
                      <img
                        className="section-image-package-specs"
                        src="/footpads-1@1x.png"
                      />
                      <p className="section-content">
                        Powder coating steel frame
                      </p>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <List>
                <ListItem className="section-image-package-listItem" />
                <ListItem
                  className="section-image-package-listItem"
                  style={{ backgroundColor: "white" }}
                >
                  <ListItemText
                    className="section-image-package-listItem-title"
                    primary={"Frame Specifications"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    className="section-image-package-listItem-subtitle"
                    primary={"Frame Material"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    className="section-image-package-listItem-subtitle"
                    primary={"Outer Leg Shape"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    className="section-image-package-listItem-subtitle"
                    primary={"Bracket Connectors"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    className="section-image-package-listItem-subtitle"
                    primary={"Height Adjustment"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    className="section-image-package-listItem-subtitle"
                    primary={"Nuts and Bolts"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    className="section-image-package-listItem-subtitle"
                    primary={"Outer Leg Diameter"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    className="section-image-package-listItem-subtitle"
                    primary={"Outer Leg Thickness"}
                  />
                </ListItem>
                <ListItem
                  className="section-image-package-listItem"
                  style={{ backgroundColor: "white" }}
                >
                  <ListItemText
                    className="section-image-package-listItem-title"
                    primary={"Fabric features"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    className="section-image-package-listItem-subtitle"
                    primary={"Fabric"}
                  />
                </ListItem>
                <ListItem style={{ minHeight: "41px" }} />
                <ListItem>
                  <ListItemText
                    className="section-image-package-listItem-subtitle"
                    primary={"Function"}
                  />
                </ListItem>
                <ListItem style={{ minHeight: "41px" }} />
                <ListItem style={{ minHeight: "41px" }} />
                <ListItem
                  className="section-image-package-listItem"
                  style={{ backgroundColor: "white" }}
                >
                  <ListItemText
                    className="section-image-package-listItem-title"
                    primary={"Warrenty"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    className="section-image-package-listItem-subtitle"
                    primary={"Frame Warranty"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    className="section-image-package-listItem-subtitle"
                    primary={"Roof Warranty"}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={8}>
              <Slider {...settings}>
                <List>
                  <ListItem className="section-image-package-listItem ">
                    <ListItemText
                      className="section-image-package-listItem-title center"
                      primary={"Y5 Economic"}
                    />
                  </ListItem>
                  <ListItem
                    className="section-image-package-listItem"
                    style={{ backgroundColor: "white" }}
                  />
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"Powder-coated steel"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"Hexagonal"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"Nylon"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"Push button"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"Zinc coated steel"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"1.75 inches (45mm)"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"0.05inches (1.2mm)"}
                    />
                  </ListItem>
                  <ListItem
                    className="section-image-package-listItem"
                    style={{ backgroundColor: "white" }}
                  />
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"500D Polyester with PVC coating"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"320gsm"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"Waterproof"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"CPAI-84 certified fire retardant"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"UV protection"}
                    />
                  </ListItem>
                  <ListItem
                    className="section-image-package-listItem"
                    style={{ backgroundColor: "white" }}
                  />
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"1 year"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"1 year"}
                    />
                  </ListItem>
                  <ListItem className="section-image-package-listItem-buttom">
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"Starting at $245"}
                    />
                    <Button
                      variant="contained"
                      className="section-grid-button"
                      onClick={() => router.push("/products/y5-canopy-tent")}
                    >
                      Buy
                    </Button>
                  </ListItem>
                </List>
                <List>
                  <ListItem className="section-image-package-listItem">
                    <ListItemText
                      className="section-image-package-listItem-title center"
                      primary={"Y6 Commercial"}
                    />
                  </ListItem>
                  <ListItem
                    className="section-image-package-listItem"
                    style={{ backgroundColor: "white" }}
                  />
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"6063-T5 Aluminum"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"Hexagonal"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"6063-T5 Aluminum"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"Push button"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"Stainless steel"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"1.75 inches (45mm)"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"0.06 inches (1.5mm)"}
                    />
                  </ListItem>
                  <ListItem
                    className="section-image-package-listItem"
                    style={{ backgroundColor: "white" }}
                  />
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"500D Polyester with PVC coating"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"320gsm"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"Waterproof"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"CPAI-84 certified fire retardant"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"UV protection"}
                    />
                  </ListItem>
                  <ListItem
                    className="section-image-package-listItem"
                    style={{ backgroundColor: "white" }}
                  />
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"5 year"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"1 year"}
                    />
                  </ListItem>
                  <ListItem className="section-image-package-listItem-buttom">
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"Starting at $445"}
                    />
                    <Button
                      variant="contained"
                      className="section-grid-button"
                      onClick={() => router.push("/products/y6-canopy-tent")}
                    >
                      Buy
                    </Button>
                  </ListItem>
                </List>
                <List>
                  <ListItem className="section-image-package-listItem">
                    <ListItemText
                      className="section-image-package-listItem-title center"
                      primary={"Y7 Heavy Duty"}
                    />
                  </ListItem>
                  <ListItem
                    className="section-image-package-listItem"
                    style={{ backgroundColor: "white" }}
                  />
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"6063-T5 Aluminum"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"Hexagonal"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"6063-T5 Aluminum"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"Push button"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"Stainless steel"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"2.25 inches (57mm)"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"0.07 inches (1.8mm)"}
                    />
                  </ListItem>
                  <ListItem
                    className="section-image-package-listItem"
                    style={{ backgroundColor: "white" }}
                  />
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"500D Polyester with PVC coating"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"320gsm"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"Waterproof"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"CPAI-84 certified fire retardant"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"UV protection"}
                    />
                  </ListItem>
                  <ListItem
                    className="section-image-package-listItem"
                    style={{ backgroundColor: "white" }}
                  />
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"10 year"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"1 year"}
                    />
                  </ListItem>
                  <ListItem className="section-image-package-listItem-buttom">
                    <ListItemText
                      className="section-image-package-listItem-content"
                      primary={"Starting at $619"}
                    />
                    <Button
                      variant="contained"
                      className="section-grid-button"
                      onClick={() => router.push("/products/y7-canopy-tent")}
                    >
                      Buy
                    </Button>
                  </ListItem>
                </List>
              </Slider>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className="section-container">
        <Container maxWidth="md">
          <h3 className="section-title" style={{ fontWeight: "normal" }}>
            Custom printing
          </h3>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <div className="section-container-grid" style={{ width: "90%" }}>
                <div className="section-image-container">
                  <img className="section-image" src="/image-35@2x.png" />
                </div>
                <div>
                  <h3 className="section-title">Y5 Economic</h3>
                </div>
                <div style={{ margin: "18px 12px" }}>
                  <p className="section-content">Starting at $805</p>
                  <Button
                    variant="contained"
                    className="section-grid-button"
                    onClick={() => router.push("/products/y5-canopy-tent")}
                  >
                    Buy
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="section-container-grid" style={{ width: "90%" }}>
                <div className="section-image-container">
                  <img className="section-image" src="/image-36@2x.png" />
                </div>
                <div>
                  <h3 className="section-title">Y6 Commercial</h3>
                </div>
                <div style={{ margin: "18px 12px" }}>
                  <p className="section-content">Starting at $965</p>
                  <Button
                    variant="contained"
                    className="section-grid-button"
                    onClick={() => router.push("/products/y5-canopy-tent")}
                  >
                    Buy
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="section-container-grid" style={{ width: "90%" }}>
                <div className="section-image-container">
                  <img className="section-image" src="/image-37@2x.png" />
                </div>
                <div>
                  <h3 className="section-title">Y7 Heavy Duty</h3>
                </div>
                <div style={{ margin: "18px 12px" }}>
                  <p className="section-content">Starting at $1,365</p>
                  <Button
                    variant="contained"
                    className="section-grid-button"
                    onClick={() => router.push("/products/y5-canopy-tent")}
                  >
                    Buy
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
