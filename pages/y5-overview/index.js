import Link from "next/link";
import dynamic from "next/dynamic";
import Slider from "react-slick";

import { Box, Button, Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Header = dynamic(() => import("../../components/header"));
const SetUp = dynamic(() => import("../../components/section_easy_set_up"));
const CanopyCompare = dynamic(() =>
  import("../../components/section_canopy_compare")
);

export default function Y5_Overview() {
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slideImages = [
    "/y5-canopy-roof-bk.png",
    "/y5-canopy-roof-bu.png",
    "/y5-canopy-roof-gn.png",
    "/y5-canopy-roof-rd.png",
    "/y5-canopy-roof-wh.png",
    "/y5-canopy-roof-ye.png",
  ];

  return (
    <div className="canopy-tent">
      <Header />
      <Box className="section-container-extend background-gray">
        <div className="section-image-container">
          <img className="section-image" src="/y5-tent@1x.png" />
        </div>
        <Container maxWidth="sm">
          <h1 className="section-subtitle" style={{ marginTop: "24px" }}>
            Y5 Economic Classic Steel Canopy Hex45
          </h1>
          <h3 className="section-title">
            The Best Outdoor Patio Canopy Perfect for Everyday Use.
          </h3>
          <p className="section-content">
            The perfect outdoor patio canopy for enjoying local scenery right at
            your feet! Furthermore, our steel made canopy comes with a weather
            resistant top covering for easy installation.
          </p>
          <p className="section-content">
            Available in 3 sizes and 6 colors.
            <br />
            From $610 each.
          </p>
        </Container>
      </Box>
      <Box className="section-container">
        <Container maxWidth="sm">
          <h3 className="section-title">
            Economical Steel Material Built for Excellent Performance.
          </h3>
          <p className="section-content">
            We design our steel canopy frames to be resistant against rusts,
            stains, and mildews for better performance all year round. In
            addition, this is the
            <br />
            perfect friendly budget outdoor patio canopy for everyday usage at
            anytime.
          </p>
        </Container>
      </Box>
      <Box className="section-container-grid">
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div
                className="section-grid-item"
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <div className="section-grid-item-inner">
                  <div className="section-subtitle">Adjustable height</div>
                  <h3 className="section-title">
                    One Button. No Hassle, Faster Set-up.
                  </h3>
                  <p className="section-content">
                    With our thumb release button system, we make every steel
                    canopy installment fast and smooth in just seconds!
                    Secondly, the height can be easily adjusted to 3 different
                    settings, from 5&#39;2&#34; to 6&#39;8&#34; at a remarkable
                    speed.
                  </p>
                </div>
                <img
                  className="section-grid-image"
                  style={{ padding: "0" }}
                  src="/onepress@1x.png"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="section-grid-item">
                <div className="section-grid-item-inner">
                  <div className="section-subtitle">Bracket connectors</div>
                  <h3 className="section-title">
                    Additional aluminum connecting poles.
                    <br />
                    Extra support and durability.
                  </h3>
                </div>
                <img
                  className="section-grid-image"
                  src="/bracket-connector@1x.png"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="section-grid-item ">
                <div className="section-grid-item-inner">
                  <div className="section-subtitle">
                    Additional connecting poles
                  </div>
                  <h3 className="section-title">
                    One Button. No Hassle, Faster Set-up.
                  </h3>
                </div>
                <img
                  className="section-grid-image"
                  src="/connecting-poles@1x.png"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item">
                <div className="section-grid-item-inner">
                  <div className="section-subtitle">Nuts and bolts</div>
                  <h3 className="section-title">
                    Zinc coated nuts and bolts for easy replacement.
                  </h3>
                </div>
                <img
                  className="section-grid-image"
                  src="/nuts-and-bolts@1x.png"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item ">
                <div className="section-grid-item-inner">
                  <div className="section-subtitle">Pole dimensions</div>
                  <h3 className="section-title">
                    Each pole has a<br />
                    <br />
                    1.5mm thickness.
                    <br />
                    45mm diameter.
                  </h3>
                </div>
                <img className="section-grid-image" src="/pole@1x.png" />
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item ">
                <div className="section-grid-item-inner">
                  <div className="section-subtitle">Footpads</div>
                  <h3 className="section-title">
                    Zinc coated steel footpads. Guaranteed sturdy structure.
                  </h3>
                </div>
                <img className="section-grid-image" src="/footpads@1x.png" />
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className="section-container">
        <Container maxWidth="sm" style={{ marginBottom: "-50px" }}>
          <h3 className="section-title">
            Personalized options for better branding.
          </h3>
          <p className="section-content">
            The optimal advertising solution for indoor and outdoor events.
            <br />
            Choose from 6 available colors or fully customeize the canopy to
            suit your needs.
          </p>
        </Container>
        <Slider {...settings}>
          {slideImages.map((image, index) => (
            <img key={index} src={image} className="section-image" />
          ))}
        </Slider>
      </Box>
      <Box className="section-container-grid">
        <Container maxWidth="md">
          <Grid
            container
            spacing={2}
            className="section-grid-item"
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Grid item xs={12} sm>
              <div style={{ flexDirection: "row", alignItems: "center" }}>
                <div className="section-grid-item-inner">
                  <div className="section-subtitle">
                    Custom printed canopies
                  </div>
                  <h3 className="section-title">
                    Custom printed canopies with full color dye sublimation or
                    UV printing.
                  </h3>
                  <p className="section-content">
                    Customize your heavy duty canopy design with your logo or
                    messages to promote your products. It is extremely simple
                    yet highly impactful.
                  </p>
                  <Button variant="contained" className="section-grid-button">
                    See how custom printing works
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm>
              <img
                className="section-grid-image"
                src="/printed-canopy@1x.png"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className="section-container">
        <div className="section-subtitle">Accessories</div>
        <h3
          className="section-title"
          style={{ fontSize: "2.125rem", lineHeight: "2.25rem" }}
        >
          Limitless solutions for limitless scenarios.
        </h3>
        <p className="section-content">
          ifferent needs require different solutions. Our versatile accessories
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
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
              <div className="section-grid-item ">
                <div className="section-grid-item-inner">
                  <div className="section-subtitle">PVC coating</div>
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
            <Grid item xs={12} sm={4}>
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
      <SetUp />
      <CanopyCompare />
      <div>
        <div className="y5-overview screen">
          {/* <div className="flex-row-0xy0vn">
              <div className="y5-economic-GyJUNH roboto-bold-black-16px">
                Y5 Economic
              </div>
              <div className="group-4-GyJUNH">
                <div className="overview-F3LVXM roboto-normal-gray-12px">
                  <Link href="/y5-overview">Overview</Link>
                </div>
                <div className="tech-specs-F3LVXM">
                  <Link href="/y5-specs">Tech Specs</Link>
                </div>
                <div className="overlap-group1-F3LVXM">
                  <div className="rectangle-4-1tBXYU"></div>
                  <div className="buy-1tBXYU">
                    <Link href="/y5-buy">Buy</Link>
                  </div>
                </div>
              </div>
            </div> */}
          <div className="btm-C61RwL">
            <div className="more-wOeUpP">
              <p className="x1-in-stock-orde-ing-i6123939151-c4KUqp roboto-normal-gray-9px">
                1. In-stock orders are not guaranteed to ship the same day they
                are received. All orders received for in-stock items ship within
                2 business days.
                <br />
                <br />
                2. Any products that are determined to be found damaged after
                opening must be reported to your Sales Representative within 1
                day after received. Our team will work on a quick and agreeable
                solution to any damaged product. If your shipment contains
                extensive damage to the outer packaging upon delivery, refuse
                the shipment and contact us immediately at 949-522-8111 or email
                us at support@westshade.com.
                <br />
                <br />
                3. For all online payments by credit, debit, or check card the
                payment is authorized and held by your financial institution at
                the time the order is placed to confirm the card is valid. You
                will be charged for your Westshade purchase when the item(s) are
                shipped. In the event the order is canceled, the authorization
                hold will expire by the terms of your bank or financial
                institution, typically within 5 to 7 business days.
                <br />
                <br />
                4. Here at Westshade, we are taking as many precautionary steps
                as possible to ensure the safety and wellbeing of our Westshade
                team and Customers. With this, effective April 1, 2020, we will
                not accept returns for products purchased for emergency response
                efforts to combat the COVID-19 pandemic. Thank you for your
                understanding.
              </p>
              <img className="line-1-c4KUqp" src="/line-1@1x.svg" />
              <p className="more-ways-to-sh-111-i6123939152-c4KUqp roboto-normal-white-9px-2">
                <span className="span0-21f0jx roboto-normal-gray-9px">
                  More ways to shop:{" "}
                </span>
                <span className="span1-21f0jx roboto-normal-denim-9px">
                  Pick up at our warehouse
                </span>
                <span className="span2-21f0jx roboto-normal-gray-9px">
                  {" "}
                  or{" "}
                </span>
                <span className="span3-21f0jx roboto-normal-denim-9px">
                  Find us at online retailer store
                </span>
                <span className="span4-21f0jx roboto-normal-gray-9px">
                  . Or call 949-522-8111.
                </span>
              </p>
            </div>
            <div className="btm-wOeUpP">
              <div className="rectangle-12-cr0vIO"></div>
              <img className="image-28-cr0vIO" src="/image-28@2x.png" />
              <div className="connect-with-us-i6124039157-cr0vIO roboto-bold-white-10px">
                CONNECT WITH US
              </div>
              <div className="group-24-cr0vIO">
                <div className="product-i6124039159-1ssCxD roboto-bold-white-10px">
                  PRODUCT
                </div>
                <div className="frame-2-1ssCxD">
                  <div className="canopy-tent-i6124039161-4Uw4TU roboto-normal-nobel-9px">
                    Canopy Tent
                  </div>
                  <div className="custom-printing-i6124039162-4Uw4TU roboto-normal-nobel-9px">
                    Custom Printing
                  </div>
                  <div className="medical-tent-i6124039163-4Uw4TU roboto-normal-nobel-9px">
                    Medical Tent
                  </div>
                  <div className="market-umbrella-i6124039164-4Uw4TU roboto-normal-nobel-9px">
                    Market Umbrella
                  </div>
                  <div className="tilt-umbrella-i6124039165-4Uw4TU roboto-normal-nobel-9px">
                    Tilt Umbrella
                  </div>
                </div>
              </div>
              <div className="group-25-cr0vIO">
                <div className="company-i6124039167-fSWOfV roboto-bold-white-10px">
                  COMPANY
                </div>
                <div className="frame-3-fSWOfV">
                  <div className="about-us-i6124039169-xndxlP roboto-normal-nobel-9px">
                    About Us
                  </div>
                  <div className="contact-us-i6124039170-xndxlP roboto-normal-nobel-9px">
                    Contact Us
                  </div>
                  <div className="shipping-and-re-urn-i6124039171-xndxlP roboto-normal-nobel-9px">
                    Shipping and Return
                  </div>
                  <div className="warranty-i6124039172-xndxlP roboto-normal-nobel-9px">
                    Warranty
                  </div>
                  <div className="blog-i6124039173-xndxlP roboto-normal-nobel-9px">
                    Blog
                  </div>
                </div>
              </div>
              <div className="group-26-cr0vIO">
                <p className="sign-up-for-the-ion-i6124039176-qsbZ2f roboto-bold-white-10px">
                  Sign Up for the latest news and promotion
                </p>
                <div className="flex-row-qsbZ2f">
                  <div className="overlap-group1-mn5J3y">
                    <div className="email-address-i6124039177-eedn4Y roboto-normal-nobel-10px">
                      email address
                    </div>
                    <div className="rectangle-13-eedn4Y border-1px-nobel"></div>
                  </div>
                  <div className="overlap-group-mn5J3y">
                    <div className="rectangle-14-ULg8j9"></div>
                    <div className="subscribe-i6124039178-ULg8j9 roboto-bold-white-10px">
                      SUBSCRIBE
                    </div>
                  </div>
                </div>
              </div>
              <div className="rectangle-15-cr0vIO"></div>
              <div className="rectangle-16-cr0vIO"></div>
              <div className="rectangle-17-cr0vIO"></div>
              <div className="rectangle-18-cr0vIO"></div>
              <div className="rectangle-19-cr0vIO"></div>
              <img className="line-2-cr0vIO" src="/line-2@1x.png" />
              <div className="supportwestshad-com-i6124039186-cr0vIO roboto-normal-nobel-10px">
                support@westshade.com
              </div>
              <p className="site-map-terms-icy-i6124039187-cr0vIO roboto-normal-white-9px">
                Site Map | Terms &amp; Condition | Privacy Policy
              </p>
              <p className="x2021-westshade-ved-i6124039188-cr0vIO roboto-normal-white-9px">
                © 2021 WESTSHADE. All rights reserved
              </p>
              <div className="x949-552-8111-i6124039189-cr0vIO roboto-medium-fountain-blue-12px">
                949-552-8111
              </div>
              <div className="group-28-cr0vIO">
                <img className="image-29-qlAjx4" src="/image-29@2x.png" />
                <img className="image-30-qlAjx4" src="/image-30@2x.png" />
                <img className="image-31-qlAjx4" src="/image-31@2x.png" />
                <img className="image-32-qlAjx4" src="/image-32@2x.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
