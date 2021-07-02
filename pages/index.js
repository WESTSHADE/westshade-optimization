import React from "react";
import Link from "next/link";
import Slider from "react-slick";

import { Box, Container, Grid } from "@material-ui/core";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
        <Box className="section-container">
          <Container maxWidth="sm">
            <Slider {...settings}>
              {slideImages.map((image, index) => (
                <img key={index} src={image} className="section-image" />
              ))}
            </Slider>
            <h3 className="section-title">Custom Printed Canopy</h3>
            <div className="section-subtitle">Custom your own design</div>
            <p className="section-content">
              Simple logos can be easily printed or if you want something that
              has a “wow” factor our graphic artists can help you design a
              fantastic 100% coverage digitally printed custom canopy.
            </p>
            <div className="section-link-group">
              <div className="section-link-container">
                <Link href="/canopy-tent" className="roboto-normal-denim-10px">
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
          <Container maxWidth="sm">
            <div className="section-image-container">
              <img className="section-image" src="/y7@1x.png" />
            </div>
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
                <Link href="/y7-overview" className="roboto-normal-denim-10px">
                  Learn more &gt;
                </Link>
              </div>
              <div className="section-link-container">
                <Link
                  href="/products/y7-canopy-tent"
                  className="roboto-normal-denim-10px"
                >
                  Buy &gt;
                </Link>
              </div>
            </div>
          </Container>
        </Box>
        <Box className="section-container">
          <Container maxWidth="sm">
            <div className="section-image-container">
              <img className="section-image" src="/y6@1x.png" />
            </div>
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
                <Link href="/y6-overview" className="roboto-normal-denim-10px">
                  Learn more &gt;
                </Link>
              </div>
              <div className="section-link-container">
                <Link
                  href="/products/y6-canopy-tent"
                  className="roboto-normal-denim-10px"
                >
                  Buy &gt;
                </Link>
              </div>
            </div>
          </Container>
        </Box>
        <Box className="section-container-extend background-gray">
          <Container maxWidth="sm">
            <div className="section-image-container">
              <img className="section-image" src="/y5@1x.png" />
            </div>
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
                <Link
                  href="/products/y5-canopy-tent"
                  className="roboto-normal-denim-10px"
                >
                  Buy &gt;
                </Link>
              </div>
            </div>
          </Container>
        </Box>
        <Box className="section-container">
          <Container maxWidth="sm">
            <div className="section-image-container">
              <img
                className="section-image"
                src="/medical-canopy-tent@1x.png"
              />
            </div>
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
          <Grid container justify="center" spacing={2}>
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
      </div>
    );
  }
}
