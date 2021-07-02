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
      <Box className="section-navbar-container section-container-breadcrumb">
        <Container maxWidth="md">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" onClick={handleClick}>
              Home
            </Link>
            <Typography color="textPrimary">Accessories</Typography>
          </Breadcrumbs>
        </Container>
      </Box>
      <Box className="section-container">
        <Container maxWidth="sm">
          <h3 className="section-title">Canopy Instant Side Walls</h3>
          <p className="section-content-entend">
            Westshade's selection of versatile accessories allows you to
            customize and combine individual elements depending on your personal
            or business needs. Add sidewalls to your instant pop-up canopy tent
            to protect you and your products from the weather, in addition to
            providing extra privacy. The side walls are attached to the canopy
            top with Velcro strips, and feature zips on either side to
            seamlessly connect the walls together.All sidewalls can be
            personalized with your logo or marketing messages to promote your
            products through our custom printing service. Learn more about
            custom printing and speak with our design specialists to get a quote
            on your order！
          </p>
        </Container>
        <Button variant="contained" className="section-grid-canopy-button">
          Learn more about custom printing
        </Button>
      </Box>
      <Box className="section-container">
        <Container maxWidth="md">
          <Grid container spacing={4} style={{ marginBottom: "8px" }}>
            <Grid item xs={12} sm={6}>
              <div className="section-grid-item">
                <div
                  className="section-grid-item-inner"
                  style={{ textAlign: "center" }}
                >
                  <div>
                    <div className="section-image-container">
                      <img
                        className="section-image"
                        style={{ maxHeight: "250px" }}
                        src="/rectangle-86@2x.png"
                      />
                    </div>
                  </div>
                  <div style={{ margin: "18px 0" }}>
                    <h3 className="section-title">Full wall</h3>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginBottom: "18px",
                        justifyContent: "center",
                      }}
                    >
                      <div className="color-dot-black" />
                      <div className="color-dot-white" />
                      <div className="color-dot-red" />
                      <div className="color-dot-blue" />
                      <div className="color-dot-yellow" />
                      <div className="color-dot-green" />
                    </div>
                    <p className="section-content">From $55.00</p>
                    <Button
                      variant="contained"
                      className="section-grid-button"
                      onClick={() => router.push("/products/y5-canopy-tent")}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="section-grid-item">
                <div
                  className="section-grid-item-inner"
                  style={{ textAlign: "center" }}
                >
                  <div>
                    <div className="section-image-container">
                      <img
                        className="section-image"
                        style={{ maxHeight: "250px" }}
                        src="/rectangle-86-2@2x.png"
                      />
                    </div>
                  </div>
                  <div style={{ margin: "18px 0" }}>
                    <h3 className="section-title">Half wall</h3>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginBottom: "18px",
                        justifyContent: "center",
                      }}
                    >
                      <div className="color-dot-black" />
                      <div className="color-dot-white" />
                      <div className="color-dot-red" />
                      <div className="color-dot-blue" />
                      <div className="color-dot-yellow" />
                      <div className="color-dot-green" />
                    </div>
                    <p className="section-content">From $199.00</p>
                    <Button
                      variant="contained"
                      className="section-grid-button"
                      onClick={() => router.push("/products/y5-canopy-tent")}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div
                  className="section-grid-item-inner"
                  style={{ textAlign: "center" }}
                >
                  <div>
                    <div className="section-image-container">
                      <img
                        className="section-image"
                        style={{ maxHeight: "250px" }}
                        src="/rectangle-86-1@2x.png"
                      />
                    </div>
                  </div>
                  <div style={{ margin: "18px 0" }}>
                    <h3 className="section-title">Roll up door wall</h3>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginBottom: "18px",
                        justifyContent: "center",
                      }}
                    >
                      <div className="color-dot-black" />
                      <div className="color-dot-white" />
                      <div className="color-dot-red" />
                      <div className="color-dot-blue" />
                      <div className="color-dot-yellow" />
                      <div className="color-dot-green" />
                    </div>
                    <p className="section-content">From $115.00</p>
                    <Button
                      variant="contained"
                      className="section-grid-button"
                      onClick={() => router.push("/products/y5-canopy-tent")}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div
                  className="section-grid-item-inner"
                  style={{ textAlign: "center" }}
                >
                  <div>
                    <div className="section-image-container">
                      <img
                        className="section-image"
                        style={{ maxHeight: "250px" }}
                        src="/rectangle-86-3@2x.png"
                      />
                    </div>
                  </div>
                  <div style={{ margin: "18px 0" }}>
                    <h3 className="section-title">Clear PVC window wall</h3>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginBottom: "18px",
                        justifyContent: "center",
                      }}
                    >
                      <div className="color-dot-black" />
                      <div className="color-dot-white" />
                      <div className="color-dot-red" />
                      <div className="color-dot-blue" />
                      <div className="color-dot-yellow" />
                      <div className="color-dot-green" />
                    </div>
                    <p className="section-content">From $115.00</p>
                    <Button
                      variant="contained"
                      className="section-grid-button"
                      onClick={() => router.push("/products/y5-canopy-tent")}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div
                  className="section-grid-item-inner"
                  style={{ textAlign: "center" }}
                >
                  <div>
                    <div className="section-image-container">
                      <img
                        className="section-image"
                        style={{ maxHeight: "250px" }}
                        src="/rectangle-86-4@2x.png"
                      />
                    </div>
                  </div>
                  <div style={{ margin: "18px 0" }}>
                    <h3 className="section-title">Mesh window wall</h3>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginBottom: "18px",
                        justifyContent: "center",
                      }}
                    >
                      <div className="color-dot-black" />
                      <div className="color-dot-white" />
                      <div className="color-dot-red" />
                      <div className="color-dot-blue" />
                      <div className="color-dot-yellow" />
                      <div className="color-dot-green" />
                    </div>
                    <p className="section-content">From $115.00</p>
                    <Button
                      variant="contained"
                      className="section-grid-button"
                      onClick={() => router.push("/products/y5-canopy-tent")}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          <div className="section-link-group">
            <div className="section-link-container">
              <Link href="/y6-overview" className="roboto-normal-denim-10px">
                Shop canopy side walls &gt;
              </Link>
            </div>
          </div>
        </Container>
      </Box>
      <Box className="section-container">
        <Container maxWidth="sm">
          <h3
            className="section-title"
            style={{ fontSize: "2.125rem", lineHeight: "2.25rem" }}
          >
            General Canopy Tent Accessories
          </h3>
          <p className="section-content-entend">
            Add additional accessories to any of WESTSHADE's instant pop up
            canopy tent series to firmly secure your canopy. These are
            particularly helpful and can withstand adverse weather conditions.
            Accessories can also make transportation, setting up, and packing
            down your canopy tent even easier.
          </p>
          <Button variant="contained" className="section-grid-button">
            Learn more about custom printing
          </Button>
        </Container>
      </Box>
      <Box className="section-container">
        <Container maxWidth="md">
          <Grid
            container
            spacing={4}
            justify="center"
            style={{ marginBottom: "8px" }}
          >
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div
                  className="section-grid-item-inner"
                  style={{ textAlign: "center" }}
                >
                  <div>
                    <div className="section-image-container">
                      <img
                        className="section-image"
                        style={{ maxHeight: "250px" }}
                        src="/rectangle-86-7@2x.png"
                      />
                    </div>
                  </div>
                  <div style={{ margin: "18px 0" }}>
                    <h3 className="section-title">
                      Heavy duty tie down straps
                    </h3>
                    <p className="section-content">$15.00</p>
                    <Button
                      variant="contained"
                      className="section-grid-button"
                      onClick={() => router.push("/products/y5-canopy-tent")}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div
                  className="section-grid-item-inner"
                  style={{ textAlign: "center" }}
                >
                  <div>
                    <div className="section-image-container">
                      <img
                        className="section-image"
                        style={{ maxHeight: "250px" }}
                        src="/rectangle-86-8@2x.png"
                      />
                    </div>
                  </div>
                  <div style={{ margin: "18px 0" }}>
                    <h3 className="section-title">Clip wheels</h3>
                    <p className="section-content">$60.00</p>
                    <Button
                      variant="contained"
                      className="section-grid-button"
                      onClick={() => router.push("/products/y5-canopy-tent")}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div
                  className="section-grid-item-inner"
                  style={{ textAlign: "center" }}
                >
                  <div>
                    <div className="section-image-container">
                      <img
                        className="section-image"
                        style={{ maxHeight: "250px" }}
                        src="/rectangle-86-9@2x.png"
                      />
                    </div>
                  </div>
                  <div style={{ margin: "18px 0" }}>
                    <h3 className="section-title">
                      Heavy duty steel weight plates
                    </h3>

                    <p className="section-content">$75.00</p>
                    <Button
                      variant="contained"
                      className="section-grid-button"
                      onClick={() => router.push("/products/y5-canopy-tent")}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div
                  className="section-grid-item-inner"
                  style={{ textAlign: "center" }}
                >
                  <div>
                    <div className="section-image-container">
                      <img
                        className="section-image"
                        style={{ maxHeight: "250px" }}
                        src="/rectangle-86-10@2x.png"
                      />
                    </div>
                  </div>
                  <div style={{ margin: "18px 0" }}>
                    <h3 className="section-title">
                      Y5 Y6 wheeled protective cover
                    </h3>
                    <p className="section-content">$62.00</p>
                    <Button
                      variant="contained"
                      className="section-grid-button"
                      onClick={() => router.push("/products/y5-canopy-tent")}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div
                  className="section-grid-item-inner"
                  style={{ textAlign: "center" }}
                >
                  <div>
                    <div className="section-image-container">
                      <img
                        className="section-image"
                        style={{ maxHeight: "250px" }}
                        src="/rectangle-86-11@2x.png"
                      />
                    </div>
                  </div>
                  <div style={{ margin: "18px 0" }}>
                    <h3 className="section-title">
                      Y7 protective cover (non-wheeled)
                    </h3>
                    <p className="section-content">$92.00</p>
                    <Button
                      variant="contained"
                      className="section-grid-button"
                      onClick={() => router.push("/products/y5-canopy-tent")}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div
                  className="section-grid-item-inner"
                  style={{ textAlign: "center" }}
                >
                  <div>
                    <div className="section-image-container">
                      <img
                        className="section-image"
                        style={{ maxHeight: "250px" }}
                        src="/rectangle-86-12@2x.png"
                      />
                    </div>
                  </div>
                  <div style={{ margin: "18px 0" }}>
                    <h3 className="section-title">
                      Y7 wheeled protective cover Pro
                    </h3>
                    <p className="section-content">$94.00</p>
                    <Button
                      variant="contained"
                      className="section-grid-button"
                      onClick={() => router.push("/products/y5-canopy-tent")}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div
                  className="section-grid-item-inner"
                  style={{ textAlign: "center" }}
                >
                  <div>
                    <div className="section-image-container">
                      <img
                        className="section-image"
                        style={{ maxHeight: "250px" }}
                        src="/rectangle-86-13@2x.png"
                      />
                    </div>
                  </div>
                  <div style={{ margin: "18px 0" }}>
                    <h3 className="section-title">Water weight</h3>
                    <p className="section-content">$40.00</p>
                    <Button
                      variant="contained"
                      className="section-grid-button"
                      onClick={() => router.push("/products/y5-canopy-tent")}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div
                  className="section-grid-item-inner"
                  style={{ textAlign: "center" }}
                >
                  <div>
                    <div className="section-image-container">
                      <img
                        className="section-image"
                        style={{ maxHeight: "250px" }}
                        src="/rectangle-86-14@2x.png"
                      />
                    </div>
                  </div>
                  <div style={{ margin: "18px 0" }}>
                    <h3 className="section-title">Sandbag</h3>
                    <p className="section-content">$15.00</p>
                    <Button
                      variant="contained"
                      className="section-grid-button"
                      onClick={() => router.push("/products/y5-canopy-tent")}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div
                  className="section-grid-item-inner"
                  style={{ textAlign: "center" }}
                >
                  <div>
                    <div className="section-image-container">
                      <img
                        className="section-image"
                        style={{ maxHeight: "250px" }}
                        src="/rectangle-86-15@2x.png"
                      />
                    </div>
                  </div>
                  <div style={{ margin: "18px 0" }}>
                    <h3 className="section-title">Rain gutter</h3>
                    <p className="section-content">$50.00</p>
                    <Button
                      variant="contained"
                      className="section-grid-button"
                      onClick={() => router.push("/products/y5-canopy-tent")}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div
                  className="section-grid-item-inner"
                  style={{ textAlign: "center" }}
                >
                  <div>
                    <div className="section-image-container">
                      <img
                        className="section-image"
                        style={{ maxHeight: "250px" }}
                        src="/rectangle-86-16@2x.png"
                      />
                    </div>
                  </div>
                  <div style={{ margin: "18px 0" }}>
                    <h3 className="section-title">Steel stakes</h3>
                    <p className="section-content">$7.00</p>
                    <Button
                      variant="contained"
                      className="section-grid-button"
                      onClick={() => router.push("/products/y5-canopy-tent")}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          <div className="section-link-group">
            <div className="section-link-container section-content">
              <Link href="/y6-overview">
                Shop general canopy tent accessories &gt;
              </Link>
            </div>
          </div>
        </Container>
      </Box>
      <Box className="section-container">
        <Container maxWidth="md">
          <h3 className="section-title">Heaters & Lights</h3>
          <Grid
            container
            spacing={4}
            justify="center"
            style={{ marginBottom: "8px" }}
          >
            <Grid item xs={12} sm={6}>
              <div className="section-grid-item">
                <div
                  className="section-grid-item-inner"
                  style={{ textAlign: "center" }}
                >
                  <div>
                    <div className="section-image-container">
                      <img
                        className="section-image"
                        style={{ maxHeight: "250px" }}
                        src="/rectangle-86-5@2x.png"
                      />
                    </div>
                  </div>
                  <div style={{ margin: "18px 0" }}>
                    <h3 className="section-title">Heater</h3>
                    <p className="section-content">$299.00</p>
                    <Button
                      variant="contained"
                      className="section-grid-button"
                      onClick={() => router.push("/products/y5-canopy-tent")}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="section-grid-item">
                <div
                  className="section-grid-item-inner"
                  style={{ textAlign: "center" }}
                >
                  <div>
                    <div className="section-image-container">
                      <img
                        className="section-image"
                        style={{ maxHeight: "250px" }}
                        src="/rectangle-86-6@2x.png"
                      />
                    </div>
                  </div>
                  <div style={{ margin: "18px 0" }}>
                    <h3 className="section-title">LED light</h3>
                    <p className="section-content">$299.00</p>
                    <Button
                      variant="contained"
                      className="section-grid-button"
                      onClick={() => router.push("/products/y5-canopy-tent")}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          <div className="section-link-group">
            <div className="section-link-container section-content">
              <Link href="/y6-overview">Shop heaters & lights &gt;</Link>
            </div>
          </div>
        </Container>
      </Box>
    </div>
  );
}
