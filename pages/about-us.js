import React from 'react';

import Head from "next/head";

import {Box, Container, Grid, Typography,} from "@material-ui/core";

import Banner from "../components/banner";
import CContainer from "../components/container";

class About_Us extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Head>
                    <title>About Us - WESTSHADE</title>
                    <meta name="description"
                          content="Industry Leading Dependable Canopies & Umbrellas Welcome to the #1 dependable canopy manufacturer in the U.S! We are your exclusive supplier of indoor."/>
                </Head>
                <Box className="page" fontSize={14} lineHeight={1.43}>
                    <Banner backgroundImage={"/images/banner/2000-700-1-1-5@1x.jpg"}/>
                    <CContainer>
                        <Container maxWidth="md">
                            <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                <strong> Industry Leading Dependable Canopies & Umbrellas </strong>
                            </Typography>
                            <Typography color="textSecondary" paragraph={true}>
                                Welcome to the #1 dependable canopy manufacturer in the U.S! We
                                are your exclusive supplier of indoor and outdoor shelter,
                                umbrellas, and different accessories to help make your experience
                                more memorable. Talk to our team of experts today and we'll help
                                you browse through our exclusive selection of canopies and
                                umbrellas for your next event!
                            </Typography>
                        </Container>
                    </CContainer>
                    <CContainer className="extend gray" style={{padding: 0}}>
                        <Container maxWidth="lg">
                            <Grid container style={{alignItems: "center"}}>
                                <Grid item xs={12} sm={6} style={{padding: "0"}}>
                                    <div className="position-r">
                                        <img
                                            className="section-grid-image"
                                            style={{
                                                padding: "0",
                                                minHeight: "300px",
                                                width: "100%",
                                                maxHeight: "unset",
                                            }}
                                            src="/images/umbrella.jpg"
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <div
                                        className="section-container"
                                        style={{
                                            textAlign: "left",
                                            paddingLeft: "32px",
                                            paddingRight: "32px",
                                            display: "flex",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <h3
                                            className="section-title"
                                            style={{color: "#00a79d", fontSize: "1.5rem"}}
                                        >
                                            What We Bring
                                        </h3>
                                        <p className="section-content" style={{marginBottom: "24px"}}>
                                            We bring top leading quality shelters and other activity
                                            accessories for your next gathering, event, and other promotion
                                            solutions for your business and family activities. Our team of
                                            experts will help you find the right canopy tent and umbrella
                                            fit for your outdoor needs.
                                        </p>
                                        <h3
                                            className="section-title"
                                            style={{color: "#00a79d", fontSize: "1.5rem"}}
                                        >
                                            Why Us?
                                        </h3>
                                        <p className="section-content" style={{marginBottom: "24px"}}>
                                            Westshade puts quality designing, engineering, and reliability
                                            in every canopy and umbrella that is perfect suited for all of
                                            our customers. Our goal is to bring comfort, quality, and
                                            convenience in enhancing our customers outdoor and indoor
                                            experience. In addition to our recreational and optimal business
                                            solution shelters, we also provide full custom-graphic services
                                            in creating the ideal advertising method for your next product &
                                            service promotion!
                                        </p>
                                    </div>
                                </Grid>
                            </Grid>
                        </Container>
                    </CContainer>
                    <Box className="section-container" style={{textAlign: "center"}}>
                        <Container maxWidth="md">
                            <Grid
                                container
                                alignItems="center"
                                style={{textAlign: "left", marginBottom: "32px"}}
                            >
                                <Grid item className="position-r">
                                    <img
                                        className="section-image"
                                        style={{maxWidth: "80px", margin: "auto 48px"}}
                                        src="/images/professinal-quality.png"
                                    />
                                </Grid>
                                <Grid xs item>
                                    <h3 className="section-title">Professional Quality</h3>
                                    <p className="section-content-entend">
                                        We maintain our quality standards to the highest level through
                                        our manufacturing process to our customer service. All of our
                                        products and accessories are processed and manufactured in-house
                                        through our factories. Our quality control maintenance ensures
                                        every step in our manufacturing process keeps our canopies
                                        maintained to the highest standards at an affordable price for
                                        our customers. In addition, each canopy and umbrella are all
                                        inspected thoroughly at our facility before shipped out.
                                    </p>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                alignItems="center"
                                style={{textAlign: "left", marginBottom: "32px"}}
                            >
                                <Grid item className="position-r">
                                    <img
                                        className="section-image"
                                        style={{maxWidth: "80px", margin: "auto 48px"}}
                                        src="/images/performance.png"
                                    />
                                </Grid>
                                <Grid xs item>
                                    <h3 className="section-title">Excellent Performance</h3>
                                    <p className="section-content-entend">
                                        What set our canopies apart is our engineering design that makes
                                        our canopies and umbrellas more sturdy and durable thanks to our
                                        latest truss bar and connector feature. All of our canopies are
                                        built with a reliable truss bar and connector design that makes
                                        it more sturdy and durable in harsh weather conditions.
                                        Furthermore, our canopies and umbrellas are designed for instant
                                        set-ups with no additional tools required that makes the whole
                                        installation process easy and hassle free.
                                    </p>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                alignItems="center"
                                style={{textAlign: "left", marginBottom: "32px"}}
                            >
                                <Grid item className="position-r">
                                    <img
                                        className="section-image"
                                        style={{maxWidth: "80px", margin: "auto 48px"}}
                                        src="/images/satisfaction.png"
                                    />
                                </Grid>
                                <Grid xs item>
                                    <h3 className="section-title">Guarantee Satisfaction</h3>
                                    <p className="section-content-entend">
                                        We stand behind every merchandise we offer to our customers
                                        through a variety of well known reliable features that makes our
                                        canopies last up to 10 years. In addition, our canopies meets
                                        all of the required fire retardant certification, which includes
                                        the CPAI-84 and NFPA-701 certificate. Furthermore, we guarantee
                                        full weather resistant protection from harmful environment
                                        conditions and powerful UV rays to enhance your outdoor
                                        experience.
                                    </p>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                alignItems="center"
                                style={{textAlign: "left", marginBottom: "32px"}}
                            >
                                <Grid item className="position-r">
                                    <img
                                        className="section-image"
                                        style={{maxWidth: "80px", margin: "auto 48px"}}
                                        src="/images/solution.png"
                                    />
                                </Grid>
                                <Grid xs item>
                                    <h3 className="section-title">Business Solution Branding</h3>
                                    <p className="section-content-entend">
                                        Our leading industry color printers can print flawless logos,
                                        images, promotional displays, social media advertisements,
                                        contact information, and all other marketing solutions. Consult
                                        with our team of experts today to help assist you in getting
                                        your magnificent artwork all over the canopy, ready to be shown
                                        to your audience.
                                    </p>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Box>
                <div className="version">v1.0.5</div>
            </React.Fragment>
        )
    }
}

export default About_Us;
