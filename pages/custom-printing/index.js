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
          minHeight: "400px",
          backgroundImage: "url('/2000-700-1-1-1@1x.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
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
                Custom Canopy Package
              </div>
              <h3
                className="section-title"
                style={{
                  color: "white",
                  fontSize: "2rem",
                  textAlign: "center",
                }}
              >
                Showcase Your Creativity
              </h3>
            </div>
          </div>
        </Container>
      </Box>
      <Box className="section-navbar-container section-container-breadcrumb">
        <Container maxWidth="md">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" onClick={handleClick}>
              Home
            </Link>
            <Typography color="textPrimary">Custom Printing</Typography>
          </Breadcrumbs>
        </Container>
      </Box>
      <Box className="section-container">
        <Container maxWidth="sm">
          <h3 className="section-title">
            Canopy Custom Printing Services. Your Vision,
            <br />
            Your Creativity, Your Imagination on Display.
          </h3>
          <p className="section-content-entend">
            Showcase your design, creativity, and talent to everyone passing by!
            In addition, attach your very own logo, advertise your product,
            present your stunning eye-catching pictures, the choices are
            limitless!
          </p>
        </Container>
        <Container maxWidth="md">
          <div className="section-image-container">
            <img className="section-image" src="/image-39@1x.png" />
          </div>
          <Button variant="contained" className="section-grid-canopy-button">
            Buy Now
          </Button>
        </Container>
      </Box>
      <Box className="section-container">
        <Container maxWidth="md">
          <Grid container spacing={2} style={{ marginBottom: "8px" }}>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div className="section-grid-item-inner">
                  <div className="section-subtitle">Quality</div>
                  <div
                    className="section-image-container"
                    style={{ marginBottom: "12px" }}
                  >
                    <img
                      className="section-grid-canopy-image"
                      src="/rectangle-63@2x.png"
                    />
                  </div>
                  <h3 className="section-title">
                    Stainless steel nuts and bolts. Easily replaceable.
                  </h3>
                  <p className="section-content">
                    You choose the design, we handle the rest!
                  </p>
                  <ul
                    className="section-content"
                    style={{ margin: "auto 12px" }}
                  >
                    <li>
                      We provide the highest quality printing materials to
                      maximize the look and feel of your logo.
                    </li>
                    <li>
                      High-grade printing to amplify colors, shadows and
                      gradients for first-rate presentation.
                    </li>
                    <li>
                      Our prints are non-fading and non-deforming, with
                      long-lasting storage capability.
                    </li>
                  </ul>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div className="section-grid-item-inner">
                  <div className="section-subtitle">Accuracy</div>
                  <div
                    className="section-image-container"
                    style={{ marginBottom: "12px" }}
                  >
                    <img
                      className="section-grid-canopy-image"
                      src="/rectangle-63-1@2x.png"
                    />
                  </div>
                  <h3 className="section-title">
                    Advanced Technology, Unmatched Accuracy.
                  </h3>
                  <p className="section-content">Unmatched Accuracy.</p>
                  <ul
                    className="section-content"
                    style={{ margin: "auto 12px" }}
                  >
                    <li>
                      Quality prints processed by automated control technology
                      that ensures the highest accuracy in full color printing.
                    </li>
                    <li>
                      State-of-the-art technology to display your vision at it’s
                      best.
                    </li>
                  </ul>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div className="section-grid-item-inner">
                  <div className="section-subtitle">Material</div>
                  <div
                    className="section-image-container"
                    style={{ marginBottom: "12px" }}
                  >
                    <img
                      className="section-grid-canopy-image"
                      src="/rectangle-63-2@2x.png"
                    />
                  </div>
                  <h3 className="section-title">Polyester with PU Coating.</h3>
                  <p className="section-content">
                    Industry-leading textile for superior performance.
                  </p>
                  <ul
                    className="section-content"
                    style={{ margin: "auto 12px" }}
                  >
                    <li>
                      Premium quality Polyester results in a lighter, stronger
                      and glossier tent display.
                    </li>
                    <li>
                      Soft and elastic coating process for extra-bright and
                      eye-catching printing.
                    </li>
                    <li>
                      The most versatile material, with outdoor and on-site
                      exhibition activities for enhancing your promotion
                      capabilities.
                    </li>
                  </ul>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            className="section-grid-item"
            alignItems="center"
            style={{ flexDirection: "row" }}
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
        </Container>
      </Box>
      <Box className="section-container">
        <div
          style={{
            fontSize: "2rem",
            lineHeight: "2.125rem",
            marginBottom: "48px",
          }}
        >
          Choose between{" "}
          <span style={{ fontWeight: "bold" }}>Dye Sublimation</span> and&nbsp;
          <span style={{ fontWeight: "bold" }}>UV Printing</span> options,
          <br />
          utilized by our advanced printing technology and unmatched accuracy.
        </div>
        <Container maxWidth="sm">
          <h3
            className="section-title"
            style={{ fontSize: "1.725rem", lineHeight: "2rem" }}
          >
            Dye Sublimation
          </h3>
          <p className="section-content-entend">
            Our dye sublimation printing service uses thermal transfer printing.
            Your high resolution print is transferred onto the canopy fabric
            using a heat press printing technique.
          </p>
        </Container>
        <Container maxWidth="md">
          <Grid container spacing={2} style={{ marginBottom: "8px" }}>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div className="section-grid-item-inner">
                  <div className="section-subtitle">Fabric material</div>
                  <div
                    className="section-image-container"
                    style={{ marginBottom: "12px" }}
                  >
                    <img
                      className="section-grid-canopy-image"
                      src="/rectangle-63-3@2x.png"
                    />
                  </div>
                  <h3 className="section-title">
                    600D Polyester.
                    <br />
                    288 gsm.
                  </h3>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div className="section-grid-item-inner">
                  <div className="section-subtitle">Ink</div>
                  <div
                    className="section-image-container"
                    style={{ marginBottom: "12px" }}
                  >
                    <img
                      className="section-grid-canopy-image"
                      src="/rectangle-63-4@2x.png"
                    />
                  </div>
                  <h3 className="section-title">
                    Original ink pigment imported from Korea.
                  </h3>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div className="section-grid-item-inner">
                  <div className="section-subtitle">Color</div>
                  <div
                    className="section-image-container"
                    style={{ marginBottom: "12px" }}
                  >
                    <img
                      className="section-grid-canopy-image"
                      src="/rectangle-63-5@2x.png"
                    />
                  </div>
                  <h3 className="section-title">
                    Produces prints with bright colors that can be kept for
                    long-term without fading.
                  </h3>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className="section-container">
        <Container maxWidth="sm">
          <h3
            className="section-title"
            style={{ fontSize: "1.725rem", lineHeight: "2rem" }}
          >
            UV Quality Printing Service
          </h3>
          <p className="section-content-entend">
            Take your branding to the next level with our digital printing
            process using our high- quality UV ink to take your logo directly
            onto the canopy fabric. Provides high resolution service that dries
            and strengthens onto your canopy in an instant.
          </p>
        </Container>
        <Container maxWidth="md">
          <Grid container spacing={2} style={{ marginBottom: "8px" }}>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div className="section-grid-item-inner">
                  <div className="section-subtitle">Fabric material</div>
                  <div
                    className="section-image-container"
                    style={{ marginBottom: "12px" }}
                  >
                    <img
                      className="section-grid-canopy-image"
                      src="/rectangle-63-6@2x.png"
                    />
                  </div>
                  <h3 className="section-title">
                    900D Polyester.
                    <br />
                    360 gsm.
                  </h3>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div className="section-grid-item-inner">
                  <div className="section-subtitle">Ink</div>
                  <div
                    className="section-image-container"
                    style={{ marginBottom: "12px" }}
                  >
                    <img
                      className="section-grid-canopy-image"
                      src="/rectangle-63-4@2x.png"
                    />
                  </div>
                  <h3 className="section-title">
                    Original ink pigment imported from Japan.
                  </h3>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div className="section-grid-item-inner">
                  <div className="section-subtitle">Color</div>
                  <div
                    className="section-image-container"
                    style={{ marginBottom: "12px" }}
                  >
                    <img
                      className="section-grid-canopy-image"
                      src="/rectangle-63-5@2x.png"
                    />
                  </div>
                  <h3 className="section-title">
                    Produces prints with bright colors that can be kept for 2 -
                    3 Years.
                  </h3>
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="section-image-container">
                <img
                  style={{ objectFit: "contain", width: "100%" }}
                  src="/how-uv-printing-works.jpg"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="section-image-container">
                <img
                  style={{ objectFit: "contain", width: "100%" }}
                  src="/uv-custom-printing.jpg"
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="section-image-container">
                <img
                  style={{ objectFit: "contain", width: "100%" }}
                  src="/uv-printing.jpg"
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="section-image-container">
                <img
                  style={{ objectFit: "contain", width: "100%" }}
                  src="/uv-printing-keeps-years.jpg"
                />
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        className="section-container"
        style={{ paddingBottom: "2px", marginBottom: 0 }}
      >
        <Container maxWidth="md">
          <Button
            variant="contained"
            className="section-grid-canopy-button-black"
            style={{ marginBottom: "48px", padding: "12px 32px" }}
          >
            Build your own
          </Button>
          <p className="section-content-entend">
            Follow us on social media to stay up to date with our canopy tent
            news and special offers!
          </p>
        </Container>
      </Box>
      <SectionSocialGroup />
    </div>
  );
}
