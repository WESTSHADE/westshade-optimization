import React, {useEffect, useRef, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import {Button, SHAPE} from "baseui/button";
import ChevronRight from "baseui/icon/chevron-right";
import ArrowRight from 'baseui/icon/arrow-right'
import ArrowDown from 'baseui/icon/arrow-down'

import {Box, Container, Paper, Typography} from "@material-ui/core";

import CContainer from "../components/container";
import CLink from "../components/link";
import BannerDisplay from "../components/sections/BannerDisplay";

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
    "/images/slider/printed-canopy-tent-01.png",
    "/images/slider/printed-canopy-tent-02.png",
    "/images/slider/printed-canopy-tent-03.png",
    "/images/slider/printed-canopy-tent-04.png",
    "/images/slider/printed-canopy-tent-05.png",
    "/images/slider/printed-canopy-tent-06.png",
];

const MXContainerPaper = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 24px 12px;
	text-align: left;
`;

const MXImageDisplay = styled.img`
	width: 100%;
	min-height: 200px;
	max-height: 400px;
	object-fit: contain;
`;

function Home() {
    const [display, setDisplay] = useState(false);

    useEffect(() => setTimeout(() => setDisplay(true), 250), []);

    return (
        <React.Fragment>
            <Head>
                <title>WESTSHADE | #1 Canopy and Umbrella in Southern California</title>
                <meta name="description"
                      content="#1 canopy and umbrella in Southern California. Industry leading quality instant canopies and market umbrellas for all occasions. Easy set up."/>
                <script type="text/javascript" src="/static/mailchimpFirstOrder.js" id="mcjs"/>
            </Head>
            <Box className="page" fontSize={14} lineHeight={1.43}>
                {display ? (
                    <>
                        <CContainer>
                            <Container maxWidth="md">
                                <Slider {...settings}>
                                    {slideImages.map((image, index) => (
                                        <img key={index} className="section-banner-image-home" src={image} alt="custom-printed-canopy-tent"/>
                                    ))}
                                </Slider>
                                <Typography variant="h3" classes={{h3: "information-title"}}>
                                    Custom Printed Canopy
                                </Typography>
                                <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                    Custom your own design{" "}
                                </Typography>
                                <Typography color="textSecondary" paragraph={true}>
                                    Simple logos can be easily printed or if you want something that has a “wow” factor our graphic artists can help you design a fantastic 100%
                                    coverage digitally printed custom canopy.
                                </Typography>
                                <div className="paper-button-group-button center">
                                    <CLink className="homepage-link" color="rgba(0, 0, 0, 0.87)" href={{pathname: "/custom-printing"}} size="large">
                                        Learn more &gt;{" "}
                                    </CLink>
                                    <CLink className="homepage-link" color="rgba(0, 0, 0, 0.87)" href={{pathname: "/custom-printing-canopy-tent"}} size="large">
                                        Buy &gt;{" "}
                                    </CLink>
                                </div>
                            </Container>
                        </CContainer>
                        <CContainer className="extend gray">
                            <Container maxWidth="md">
                                <MXImageDisplay src="/images/product/y7-heavy-duty-canopy-tent/y7-canopy-tent.png" alt="y7-canopy-tent"/>
                                <Typography variant="h3" classes={{h3: "information-title"}}>
                                    Y7 Heavy Duty Canopy{" "}
                                </Typography>
                                <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}}>
                                    Industry Leading Quality &amp; Durable{" "}
                                </Typography>
                                <Typography variant="subtitle2" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                    From $619/ea*{" "}
                                </Typography>
                                <Typography color="textSecondary" paragraph={true}>
                                    Y7 Aluminum Instant Canopy is great for business events and job fairs. This canopy provides up to 400 square feet of cool shade. You can also
                                    customized and it will be a great canopy to help you to promote your business!
                                </Typography>
                                <div className="paper-button-group-button center">
                                    <CLink className="homepage-link" color="rgba(0, 0, 0, 0.87)" href={{pathname: "/y7-heavy-duty"}} size="large">
                                        Learn more &gt;{" "}
                                    </CLink>
                                    <CLink className="homepage-link" color="rgba(0, 0, 0, 0.87)" href={{pathname: "/y7-heavy-duty/buy"}} size="large">
                                        Buy &gt;{" "}
                                    </CLink>
                                </div>
                            </Container>
                        </CContainer>
                        <CContainer>
                            <Container maxWidth="md">
                                <MXImageDisplay src="/images/product/y6-commercial-buy/y6-canopy-tent.png" alt="y6-canopy-tent"/>
                                <Typography variant="h3" classes={{h3: "information-title"}}>
                                    Y6 Commercial Canopy{" "}
                                </Typography>
                                <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}}>
                                    Best small business solution{" "}
                                </Typography>
                                <Typography variant="subtitle2" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                    From $445/ea*{" "}
                                </Typography>
                                <Typography color="textSecondary" paragraph={true}>
                                    Y6 Aluminum Instant Canopy is great for camping and all the other outdoor activities. This outdoor canopy provides up to 200 square feet of cool
                                    shade anywhere you go. A great canopy for your outdoor adventures!
                                </Typography>
                                <div className="paper-button-group-button center">
                                    <CLink className="homepage-link" color="rgba(0, 0, 0, 0.87)" href={{pathname: "/y6-commercial"}} size="large">
                                        Learn more &gt;{" "}
                                    </CLink>
                                    <CLink className="homepage-link" color="rgba(0, 0, 0, 0.87)" href={{pathname: "/y6-commercial/buy"}} size="large">
                                        Buy &gt;{" "}
                                    </CLink>
                                </div>
                            </Container>
                        </CContainer>
                        <CContainer className="extend gray">
                            <Container maxWidth="md">
                                <MXImageDisplay src="/images/product/y5-economic-canopy-tent/y5-canopy-tent.png" alt="y5-canopy-tent"/>
                                <Typography variant="h3" classes={{h3: "information-title"}}>
                                    Y5 Economic Canopy{" "}
                                </Typography>
                                <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}}>
                                    Affordable choice for everyone{" "}
                                </Typography>
                                <Typography variant="subtitle2" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                    From $395/ea*{" "}
                                </Typography>
                                <Typography color="textSecondary" paragraph={true}>
                                    Get immediate shade with the entry-level Y5 Steel Instant Canopy! Ideal for your patio, garden or deck. This canopy provides up to 200 square
                                    feet of cool shade. Great for Every day use.
                                </Typography>
                                <div className="paper-button-group-button center">
                                    <CLink className="homepage-link" color="rgba(0, 0, 0, 0.87)" href={{pathname: "/y5-economic"}} size="large">
                                        Learn more &gt;{" "}
                                    </CLink>
                                    <CLink className="homepage-link" color="rgba(0, 0, 0, 0.87)" href={{pathname: "/y5-economic/buy"}} size="large">
                                        Buy &gt;{" "}
                                    </CLink>
                                </div>
                            </Container>
                        </CContainer>
                        <CContainer>
                            <Typography variant="h3" classes={{h3: "information-title"}}>
                                Umbrellas{" "}
                            </Typography>
                            <MXContainerPaper>
                                <Paper classes={{root: "container-paper-item"}} elevation={0}>
                                    <div>
                                        <Typography variant="h5" classes={{h5: "information-title"}}>
                                            Bali Umbrella-Delicate{" "}
                                        </Typography>
                                        <div className="paper-button-group-button">
                                            <CLink className="homepage-link" color="rgba(0, 0, 0, 0.87)" href={{pathname: "/tilt-umbrellas"}} size="large">
                                                Learn more &gt;{" "}
                                            </CLink>
                                            <CLink className="homepage-link" color="rgba(0, 0, 0, 0.87)"
                                                   href={{pathname: "/products/tilt-umbrellas/bali-crank-lift-patio-umbrella"}} size="large">
                                                Buy &gt;{" "}
                                            </CLink>
                                        </div>
                                    </div>
                                    <div className="position-r">
                                        <MXImageDisplay src="/images/bali@1x.png" alt="bali-umbrella-delicate"/>
                                    </div>
                                </Paper>
                                <Paper classes={{root: "container-paper-item"}} elevation={0}>
                                    <div>
                                        <Typography variant="h5" classes={{h5: "information-title"}}>
                                            Santorini Umbrella-Deluxe{" "}
                                        </Typography>
                                        <div className="paper-button-group-button">
                                            <CLink className="homepage-link" color="rgba(0, 0, 0, 0.87)" href={{pathname: "/market-umbrellas"}} size="large">
                                                Learn more &gt;{" "}
                                            </CLink>
                                            <CLink className="homepage-link" color="rgba(0, 0, 0, 0.87)" href={{pathname: "/products/market-umbrellas/santorini-aluminum-umbrella"}}
                                                   size="large">
                                                Buy &gt;{" "}
                                            </CLink>
                                        </div>
                                    </div>
                                    <div className="position-r">
                                        <MXImageDisplay src="/images/santorini@1x.png" alt="santorini-umbrella-deluxe"/>
                                    </div>
                                </Paper>
                                <Paper classes={{root: "container-paper-item"}} elevation={0}>
                                    <div>
                                        <Typography variant="h5" classes={{h5: "information-title"}}>
                                            Catalina Umbrella-Oversize{" "}
                                        </Typography>
                                        <div className="paper-button-group-button">
                                            <CLink className="homepage-link" color="rgba(0, 0, 0, 0.87)" href={{pathname: "/cantilever-umbrellas"}} size="large">
                                                Learn more &gt;{" "}
                                            </CLink>
                                            <CLink className="homepage-link" color="rgba(0, 0, 0, 0.87)" href={{pathname: "/products/cantilever-umbrellas/catalina-umbrella"}}
                                                   size="large">
                                                Buy &gt;{" "}
                                            </CLink>
                                        </div>
                                    </div>
                                    <div className="position-r">
                                        <MXImageDisplay src="/images/catalina@1x.png" alt="catalina-umbrella-oversize"/>
                                    </div>
                                </Paper>
                            </MXContainerPaper>
                        </CContainer>
                    </>
                ) : null}
            </Box>
        </React.Fragment>
    );
}

function Home_N({router}) {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

    const scrollDownToNextSection = (ref) => {
        // TODO: 滚轮下滑和button点击下滑不兼容, 未找到解决办法
        // if (typeof window !== "undefined") {
        //     let frame = window.document.getElementById("WestShadeFrame");
        //     frame.classList.remove("scroll-container");
        //     setTimeout(() => {
        //         window.scrollTo(0, ref.current.offsetTop);
        //         setTimeout(() => frame.classList.add("scroll-container"), 500)
        //     }, 500)
        // }
    }

    return (
        <React.Fragment>
            <Head>
                <title>WESTSHADE | #1 Canopy and Umbrella in Southern California</title>
                <meta name="description"
                      content="#1 canopy and umbrella in Southern California. Industry leading quality instant canopies and market umbrellas for all occasions. Easy set up."/>
                <script id="mcjs" type="text/javascript" src="/static/mailchimpFirstOrder.js"/>
            </Head>
            <BannerDisplay refD={ref1} title="CUSTOM PRINTING" subtitle="Custom the product to light up your special occasions." url="images/home/custom_printing.jpg"
                           router={router} destination="/custom-printing" showScrollDown onClickScrollDown={() => scrollDownToNextSection(ref2)} home/>
            <BannerDisplay refD={ref2} title="CANOPY TENT" subtitle="The most heavy duty canopy on the market with unchallenged strength and durability."
                           url="images/home/tent.jpg"
                           router={router} destination="/canopy-tent" showScrollDown onClickScrollDown={() => scrollDownToNextSection(ref3)} home/>
            <BannerDisplay refD={ref3} title="UMBRELLA" subtitle="Easy to adjust any desired angle for shade coverage with a simple push button." url="images/home/umbrella.jpg"
                           router={router} destination="/umbrella" home/>
        </React.Fragment>
    )
}

Home_N.getInitialProps = () => {
    return {
        homePage: true,
        newFooter: true,
    };
};

export default withRouter(Home_N);
