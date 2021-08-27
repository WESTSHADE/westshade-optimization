import React, {useEffect, useState} from "react";
import styled from "styled-components";

import Head from "next/head";

import {Box, Container, Grid, Typography} from "@material-ui/core";

import Banner from "../components/banner";
import CUmbrella from "../components/card_umbrella";
import CContainer from "../components/container";
import SectionProductsOffered from "../components/section_products_offered";

const MXImageDisplay = styled.img`
    width: 90%;
    max-width: 120px;
    object-fit: contain;
    border-radius: 8px;
    margin-top: 48px;
    margin-bottom: 24px;
`;

function Cantilever_Umbrellas() {
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        setTimeout(function () {
            setDisplay(true);
        }, 250);
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Catalina Umbrellas - WESTSHADE</title>
                <meta property="description"
                      content="Catalina Umbrella Maximum Strength, Optimal Shade Catalina Desc From $289.99 Shop Free Shipping; Free Return Free Mock-Up; Excellent Customer Service;"/>
            </Head>
            <Box className="page" fontSize={14} lineHeight={1.43}>
                {display ? (
                    <>
                        <Banner backgroundImage={"/images/banner/2000-700-1-1-4@1x.png"} title="Cantilever Umbrella" content="Maximum Strength, Optimal Shade"/>
                        <CContainer>
                            <Container maxWidth="md">
                                <Grid container spacing={6} justifyContent="space-around" alignContent="center" alignItems="center">
                                    <Grid item xs={12} md={4}>
                                        <CUmbrella backgroundColor="#B5E6FF" descBackgroundColor="#1B8DBB"
                                                   imageBackgroundColor="#85CFF2"
                                                   src={"/images/catalina@1x.png"}
                                                   title="Catalina"
                                                   description="Everyday use cantilever umbrella" price="289.99"
                                                   href={{pathname: "/products/cantilever-umbrellas/catalina-umbrella",}}
                                        />
                                    </Grid>
                                </Grid>
                            </Container>
                        </CContainer>
                        <CContainer>
                            <Container maxWidth="md">
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={3}>
                                        <MXImageDisplay src="/images/rectangle-75@2x.png" alt="free shipping"/>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            <strong>Free Shipping</strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <MXImageDisplay src="/images/rectangle-76@2x.png" alt="free return"/>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            <strong>Free Return</strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <MXImageDisplay src="/images/rectangle-77@2x.png" alt="free mock up"/>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            <strong>Free Mock-up</strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <MXImageDisplay src="/images/rectangle-78@2x.png" alt="excellent customer service"/>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            <strong>Excellent customer service</strong>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Container>
                        </CContainer>
                        <CContainer>
                            <Container maxWidth="md">
                                <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                    <strong>Maximum Strength, Optimal Shade</strong>
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={3}>
                                        <MXImageDisplay src="/images/rectangle-99@2x.png" alt="free shipping"/>
                                        <Typography variant="subtitle1" paragraph={true}>
                                            Easy-to-use crank lift design
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <MXImageDisplay src="/images/rectangle-99-1@2x.png" alt="free return"/>
                                        <Typography variant="subtitle1" paragraph={true}>
                                            Super durable marine grade aluminum arms and joints
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <MXImageDisplay src="/images/rectangle-99-2@2x.png" alt="free mock up"/>
                                        <Typography variant="subtitle1" paragraph={true}>
                                            Aluminum pole with built in reinforcing rib structure
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <MXImageDisplay src="/images/rectangle-99-3@2x.png" alt="excellent customer service"/>
                                        <Typography variant="subtitle1" paragraph={true}>
                                            Heavy duty welded PVC fabric
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Container>
                        </CContainer>
                        <SectionProductsOffered/>
                        <CContainer>
                            <Container maxWidth="md">
                                <img
                                    className="section-image"
                                    style={{maxHeight: "500px"}}
                                    src="/images/image-47@2x.png"
                                />
                            </Container>
                        </CContainer>
                        <CContainer>
                            <Container maxWidth="md">
                                <Grid container spacing={2} style={{marginBottom: 48}}>
                                    <Grid item xs={6}>
                                        <img
                                            className="section-image"
                                            style={{maxHeight: "500px"}}
                                            src="/images/rectangle-78-2@2x.png"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <img
                                            className="section-image"
                                            style={{maxHeight: "500px"}}
                                            src="/images/rectangle-79-1@2x.png"
                                        />
                                    </Grid>
                                </Grid>
                                <Container maxWidth="sm">
                                    <Typography variant='body2' color="textSecondary" paragraph={true}>
                                        Catalina market umbrella is strong and durable. lt has a semi permanent structure to provide maximum shade and weather protection. The frame
                                        is made with marine grade powder coated aluminum. Easy assembly at no cost.
                                    </Typography>
                                </Container>
                            </Container>
                        </CContainer>
                    </>
                ) : null}
            </Box>
        </React.Fragment>
    );
}

export default Cantilever_Umbrellas;
