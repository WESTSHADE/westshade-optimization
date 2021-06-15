import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Slider from "react-slick";

import { Box, Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Header = dynamic(() => import("../components/header"));

export default class Home extends React.Component {
  render() {
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
      "/printed-canopy-tent-01.png",
      "/printed-canopy-tent-02.png",
      "/printed-canopy-tent-03.png",
      "/printed-canopy-tent-04.png",
      "/printed-canopy-tent-05.png",
      "/printed-canopy-tent-06.png",
    ];

    return (
      <div className="homepage">
        <Header />
        <Box className="section-container">
          <Slider {...settings}>
            {slideImages.map((image, index) => (
              <img key={index} src={image} className="section-image" />
            ))}
          </Slider>
          <Container maxWidth="sm">
            <h3 className="section-title">Custom Printed Canopy</h3>
            <div className="section-subtitle">Custom your own design</div>
            <p className="section-content">
              Simple logos can be easily printed or if you want something that
              has a “wow” factor our graphic artists can help you design a
              fantastic 100% coverage digitally printed custom canopy.
            </p>
            <div className="section-link-group">
              <div className="section-link-container">
                <Link href="/" className="roboto-normal-denim-10px">
                  Learn more &gt;
                </Link>
              </div>
              <div className="section-link-container">
                <Link href="/" className="roboto-normal-denim-10px">
                  Buy &gt;
                </Link>
              </div>
            </div>
          </Container>
        </Box>
        <Box className="section-container-extend background-gray">
          <div className="section-image-container">
            <img className="section-image" src="/y7@1x.png" />
          </div>
          <Container maxWidth="sm">
            <h3 className="section-title">Y7 Heavy Duty Canopy</h3>
            <div className="section-subtitle">
              Industry Leading Quality &amp; Durable
            </div>
            <p className="section-content">From $619/ea*</p>
            <p className="section-content">
              Y7 Aluminum Instant Canopy is great for business events and job
              fairs. This canopy provides up to 400 square feet of cool shade.
              You can also customized and it will be a great canopy to help you
              to promote your business!
            </p>
            <div className="section-link-group">
              <div className="section-link-container">
                <Link href="/" className="roboto-normal-denim-10px">
                  Learn more &gt;
                </Link>
              </div>
              <div className="section-link-container">
                <Link href="/" className="roboto-normal-denim-10px">
                  Buy &gt;
                </Link>
              </div>
            </div>
          </Container>
        </Box>
        <Box className="section-container">
          <div className="section-image-container">
            <img className="section-image" src="/y6@1x.png" />
          </div>
          <Container maxWidth="sm">
            <h3 className="section-title">Y6 Commercial Canopy</h3>
            <div className="section-subtitle">Best small business solution</div>
            <p className="section-content">From $445/ea*</p>
            <p className="section-content">
              Y6 Aluminum Instant Canopy is great for camping and all the other
              outdoor activities. This outdoor canopy provides up to 200 square
              feet of cool shade anywhere you go. A great canopy for your
              outdoor adventures!
            </p>
            <div className="section-link-group">
              <div className="section-link-container">
                <Link href="/" className="roboto-normal-denim-10px">
                  Learn more &gt;
                </Link>
              </div>
              <div className="section-link-container">
                <Link href="/" className="roboto-normal-denim-10px">
                  Buy &gt;
                </Link>
              </div>
            </div>
          </Container>
        </Box>
        <Box className="section-container-extend background-gray">
          <div className="section-image-container">
            <img className="section-image" src="/y5@1x.png" />
          </div>
          <Container maxWidth="sm">
            <h3 className="section-title">Y5 Economic Canopy</h3>
            <div className="section-subtitle">
              Affordable choice for everyone
            </div>
            <p className="section-content">From $395/ea*</p>
            <p className="section-content">
              Get immediate shade with the entry-level Y5 Steel Instant Canopy!
              Ideal for your patio, garden or deck. This canopy provides up to
              200 square feet of cool shade. Great for Every day use.
            </p>
            <div className="section-link-group">
              <div className="section-link-container">
                <Link href="/y5-overview" className="roboto-normal-denim-10px">
                  Learn more &gt;
                </Link>
              </div>
              <div className="section-link-container">
                <Link href="/y5-buy" className="roboto-normal-denim-10px">
                  Buy &gt;
                </Link>
              </div>
            </div>
          </Container>
        </Box>
        <Box className="section-container">
          <div className="section-image-container">
            <img className="section-image" src="/medical-canopy-tent@1x.png" />
          </div>
          <Container maxWidth="sm">
            <h3 className="section-title">Medical Canopy Tent</h3>
            <div className="section-subtitle">
              Highest Reliable COVID-19 Solution
            </div>
            <p className="section-content">Call for price only*</p>
            <p className="section-content">
              Ideal for creating drive-thru screening tent applications for
              coronavirus testing. Walls with windows can be added and install
              in minutes to create more of an enclosed medical testing
              environment.
            </p>
            <div className="section-link-group">
              <div className="section-link-container">
                <Link href="/" className="roboto-normal-denim-10px">
                  Learn more &gt;
                </Link>
              </div>
              <div className="section-link-container">
                <Link href="/" className="roboto-normal-denim-10px">
                  Buy &gt;
                </Link>
              </div>
            </div>
          </Container>
        </Box>
        <Box className="section-container-extend" style={{ marginTop: "60px" }}>
          <h3 className="section-title">Umbrellas</h3>
          <Grid container justify="center">
            <Grid item xs={12} sm={4}>
              <div className={"section-grid-item background-gray"}>
                <div>
                  <h3 className="section-title">Bali Umbrella-Delicate</h3>
                  <div className="section-link-group">
                    <div className="section-link-container">
                      <Link href="/" className="roboto-normal-denim-10px">
                        Learn more &gt;
                      </Link>
                    </div>
                    <div className="section-link-container">
                      <Link href="/" className="roboto-normal-denim-10px">
                        Buy &gt;
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="section-image-container">
                  <img className="section-image" src="/bali@1x.png" />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className={"section-grid-item background-gray"}>
                <div>
                  <h3 className="section-title">Santorini Umbrella-Deluxe</h3>
                  <div className="section-link-group">
                    <div className="section-link-container">
                      <Link href="/" className="roboto-normal-denim-10px">
                        Learn more &gt;
                      </Link>
                    </div>
                    <div className="section-link-container">
                      <Link href="/" className="roboto-normal-denim-10px">
                        Buy &gt;
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="section-image-container">
                  <img className="section-image" src="/santorini@1x.png" />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className={"section-grid-item background-gray"}>
                <div>
                  <h3 className="section-title">Catalina Umbrella-Oversized</h3>
                  <div className="section-link-group">
                    <div className="section-link-container">
                      <Link href="/" className="roboto-normal-denim-10px">
                        Learn more &gt;
                      </Link>
                    </div>
                    <div className="section-link-container">
                      <Link href="/" className="roboto-normal-denim-10px">
                        Buy &gt;
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="section-image-container">
                  <img className="section-image" src="/catalina@1x.png" />
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
        <div className="btm-C61RwL">
          <div className="more-wOeUpP">
            <p className="x1-in-stock-orde-ing-i7736539151-c4KUqp roboto-bold-gray-9px">
              1. In-stock orders are not guaranteed to ship the same day they
              are received. All orders received for in-stock items ship within 2
              business days.
              <br />
              <br />
              2. Any products that are determined to be found damaged after
              opening must be reported to your Sales Representative within 1 day
              after received. Our team will work on a quick and agreeable
              solution to any damaged product. If your shipment contains
              extensive damage to the outer packaging upon delivery, refuse the
              shipment and contact us immediately at 949-522-8111 or email us at
              support@westshade.com.
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
              4. Here at Westshade, we are taking as many precautionary steps as
              possible to ensure the safety and wellbeing of our Westshade team
              and Customers. With this, effective April 1, 2020, we will not
              accept returns for products purchased for emergency response
              efforts to combat the COVID-19 pandemic. Thank you for your
              understanding.
            </p>
            <img className="line-1-c4KUqp" src="/line-1@1x.svg" />
            <p className="more-ways-to-sh-111-i7736539152-c4KUqp">
              <span className="span0-KVh9Au roboto-bold-gray-9px">
                More ways to shop:{" "}
              </span>
              <span className="span1-KVh9Au">Pick up at our warehouse</span>
              <span className="span2-KVh9Au roboto-bold-gray-9px"> or </span>
              <span className="span3-KVh9Au">
                Find us at online retailer store
              </span>
              <span className="span4-KVh9Au roboto-bold-gray-9px">
                . Or call 949-522-8111.
              </span>
            </p>
          </div>
          <div className="btm-wOeUpP">
            <div className="rectangle-12-cr0vIO"></div>
            <img className="image-28-cr0vIO" src="/image-28@2x.png" />
            <div className="connect-with-us-i7736639157-cr0vIO roboto-normal-white-10px">
              CONNECT WITH US
            </div>
            <div className="group-24-cr0vIO">
              <div className="product-i7736639159-1ssCxD roboto-normal-white-10px">
                PRODUCT
              </div>
              <div className="frame-2-1ssCxD">
                <div className="canopy-tent-i7736639161-4Uw4TU roboto-bold-nobel-9px">
                  Canopy Tent
                </div>
                <div className="custom-printing-i7736639162-4Uw4TU roboto-bold-nobel-9px">
                  Custom Printing
                </div>
                <div className="medical-tent-i7736639163-4Uw4TU roboto-bold-nobel-9px">
                  Medical Tent
                </div>
                <div className="market-umbrella-i7736639164-4Uw4TU roboto-bold-nobel-9px">
                  Market Umbrella
                </div>
                <div className="tilt-umbrella-i7736639165-4Uw4TU roboto-bold-nobel-9px">
                  Tilt Umbrella
                </div>
              </div>
            </div>
            <div className="group-25-cr0vIO">
              <div className="company-i7736639167-fSWOfV roboto-normal-white-10px">
                COMPANY
              </div>
              <div className="frame-3-fSWOfV">
                <div className="about-us-i7736639169-xndxlP roboto-bold-nobel-9px">
                  About Us
                </div>
                <div className="contact-us-i7736639170-xndxlP roboto-bold-nobel-9px">
                  Contact Us
                </div>
                <div className="shipping-and-re-urn-i7736639171-xndxlP roboto-bold-nobel-9px">
                  Shipping and Return
                </div>
                <div className="warranty-i7736639172-xndxlP roboto-bold-nobel-9px">
                  Warranty
                </div>
                <div className="blog-i7736639173-xndxlP roboto-bold-nobel-9px">
                  Blog
                </div>
              </div>
            </div>
            <div className="group-26-cr0vIO">
              <p className="sign-up-for-the-ion-i7736639176-qsbZ2f roboto-normal-white-10px">
                Sign Up for the latest news and promotion
              </p>
              <div className="flex-row-qsbZ2f">
                <div className="overlap-group5-mn5J3y">
                  <div className="email-address-i7736639177-L7jW4C">
                    email address
                  </div>
                  <div className="rectangle-13-L7jW4C"></div>
                </div>
                <div className="overlap-group4-mn5J3y">
                  <div className="rectangle-14-xfQsZ8"></div>
                  <div className="subscribe-i7736639178-xfQsZ8 roboto-normal-white-10px">
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
            <div className="supportwestshad-com-i7736639186-cr0vIO">
              support@westshade.com
            </div>
            <p className="site-map-terms-icy-i7736639187-cr0vIO">
              Site Map | Terms &amp; Condition | Privacy Policy
            </p>
            <p className="x2021-westshade-ved-i7736639188-cr0vIO">
              © 2021 WESTSHADE. All rights reserved
            </p>
            <div className="x949-552-8111-i7736639189-cr0vIO">949-552-8111</div>
            <div className="group-28-cr0vIO">
              <img className="image-29-qlAjx4" src="/image-29@2x.png" />
              <img className="image-30-qlAjx4" src="/image-30@2x.png" />
              <img className="image-31-qlAjx4" src="/image-31@2x.png" />
              <img className="image-32-qlAjx4" src="/image-32@2x.png" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
