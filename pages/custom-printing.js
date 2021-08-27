import React, {useEffect, useState} from "react";
import styled from "styled-components";
import clsx from "clsx";

import Head from "next/head";
import Link from "next/link";
import Image from 'next/image'

import {Box, Breadcrumbs, Container, Grid, Typography,} from "@material-ui/core";

import Banner from "../components/banner";
import CBreadcrumbs from "../components/breadcrumbs";
import CContainer from "../components/container";
import CLink from "../components/link";
import SectionSocialGroup from "../components/section_social_group";

const MXGrid = styled(({head, title, src, children, ...other}) => (
    <Grid {...other}>
        <div style={{height: "100%", backgroundColor: "#edebee", borderRadius: 8, padding: "12px 0"}}>
            {head ? typeof head === 'string' ? (
                <div style={{padding: "2px 24px 12px"}}>
                    <Typography variant="h6" classes={{h6: "gird-item-title"}} align="left"> {head} </Typography>
                </div>
            ) : head : null}
            {src ? (
                <div style={{position: "relative", width: "100%",}}>
                    <Image src={src} alt="custom printing spec" layout="responsive"
                           width={296} height={220}
                           objectFit="cover" quality={100} placeholder="blur"/>
                </div>
            ) : null}
            <div style={{padding: "12px 24px"}}>
                {title ? (<Typography variant="h6" classes={{h6: "information-title"}} align="left"> {title} </Typography>) : null}
                {children}
            </div>
        </div>
    </Grid>
))`
    position: relative;
`;

function Custom_Printing() {
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        setTimeout(() => setDisplay(true), 250);
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Custom Printing - View Printing Options | WESTSHADE</title>
                <meta name="description"
                      content="Transform your instant pop up canopy based on your personal or business needs. Custom print your logo or message to promote your products."/>
            </Head>
            <Box className="page" fontSize={14} lineHeight={1.43}>
                {display ? (
                    <>
                        <Banner backgroundImage={"/images/banner/2000-700-1-1-1@1x.png"} title="Custom Canopy Package" content="Showcase Your Creativity"/>
                        <CBreadcrumbs>
                            <Container maxWidth="md">
                                <Breadcrumbs classes={{li: "root-breadcrumbs-text"}}>
                                    <Link color="inherit" href="/" onClick={(event) => event.preventDefault()}>
                                        Home
                                    </Link>
                                    <Typography variant="inherit" color="textPrimary">Custom Printing</Typography>
                                </Breadcrumbs>
                            </Container>
                        </CBreadcrumbs>
                        <CContainer>
                            <Container maxWidth="md">
                                <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                    Canopy Custom Printing Services. Your Vision,
                                    <br/>
                                    Your Creativity, Your Imagination on Display.
                                </Typography>
                                <Typography color="textSecondary" paragraph={true}>
                                    Showcase your design, creativity, and talent to everyone passing by!
                                    In addition, attach your very own logo, advertise your product,
                                    present your stunning eye-catching pictures, the choices are
                                    limitless!
                                </Typography>
                                <div style={{position: "relative", height: 120, width: '100%', margin: "12px auto"}}>
                                    <Image src={"../images/custom-printing/custom-printing-process.png"} alt="custom printing process" layout='fill' objectFit="contain"
                                           quality={100}
                                           placeholder="blur"/>
                                </div>
                                <CLink backgroundColor={"#2767c5"} href={{pathname: "/custom-printing-canopy-tent"}} size="large" style={{margin: "auto"}}>
                                    Buy Now
                                </CLink>
                            </Container>
                        </CContainer>
                        <CContainer>
                            <Container maxWidth="md">
                                <Grid container spacing={3}>
                                    <MXGrid item xs={12} sm={4} head="Quality" title='Stainless steel nuts and bolts. Easily replaceable.'
                                            src="/images/custom-printing/high-quality-prints.jpg">
                                        <Typography component="span" classes={{root: "gird-item-content"}} display="block" align="left">
                                            <ul>
                                                You choose the design, we handle the rest!<br/><br/>
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
                                        </Typography>
                                    </MXGrid>
                                    <MXGrid item xs={12} sm={4} head="Accuracy" title='Advanced Technology, Unmatched Accuracy.'
                                            src="/images/custom-printing/advanced-technology.jpg">
                                        <Typography component="span" classes={{root: "gird-item-content"}} display="block" align="left">
                                            <ul>
                                                Unmatched Accuracy.<br/><br/>
                                                <li>
                                                    Quality prints processed by automated control technology
                                                    that ensures the highest accuracy in full color printing.
                                                </li>
                                                <li>
                                                    State-of-the-art technology to display your vision at it’s
                                                    best.
                                                </li>
                                            </ul>
                                        </Typography>
                                    </MXGrid>
                                    <MXGrid item xs={12} sm={4} head="Material" title='Polyester with PU Coating.'
                                            src="/images/custom-printing/polyester-with-pu-coating.jpg">
                                        <Typography component="span" classes={{root: "gird-item-content"}} display="block" align="left">
                                            <ul>
                                                Industry-leading textile for superior performance.<br/><br/>
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
                                        </Typography>
                                    </MXGrid>
                                    <MXGrid item xs={12}
                                            head={
                                                <div style={{padding: "12px 24px"}}>
                                                    <Typography variant="h6" classes={{h6: "gird-item-title"}} align="left">Fully Weather Proof and Fire Retardant</Typography>
                                                    <Typography variant="h6" classes={{h6: "information-title"}} align="left" paragraph={true}>CPAI-84 Certified. Waterproof. UV
                                                        Protection.</Typography>
                                                </div>
                                            }
                                    >
                                        <Grid container alignItems="center">
                                            <MXGrid item sm={12} md={6}>
                                                <img style={{objectFit: "cover", width: "90%", minHeight: "200px",}}
                                                     src="/images/tent-spec/waterproof-uv-protection.png"
                                                     alt="waterproof uv protection"
                                                />
                                                <img style={{objectFit: "contain", width: "90%", transform: "translateY(-48px)"}}
                                                     src="/images/tent-spec/wind-uv-fire-water-resistance.png"
                                                     alt="wind uv fire water protection"
                                                />
                                            </MXGrid>
                                            <MXGrid item sm={12} md={6}>
                                                <Typography component="span" classes={{root: "gird-item-content"}} display="block" align="left" paragraph={true}>
                                                    Each canopy is ensured optimal protection from high-wind
                                                    speeds and top resistance to water.<br/><br/>Maximum UV protection is
                                                    implemented with instant shade and cool air for the most
                                                    comfortable canopy experience.<br/><br/>The most trustworthy material
                                                    to help keep your business events and marketing running
                                                    safely and with ease.
                                                </Typography>
                                                <CLink backgroundColor={"black"} href={{pathname: "/custom-printing-canopy-tent"}} size="large"
                                                       style={{margin: "auto", padding: "8px 24px"}}>
                                                    Get your free mock-up today
                                                </CLink>
                                            </MXGrid>
                                        </Grid>
                                    </MXGrid>
                                </Grid>
                            </Container>
                        </CContainer>
                        <CContainer>
                            <Container maxWidth="md">
                                <Typography variant="h4" paragraph={true}>
                                    Choose between <strong>Dye Sublimation</strong> and <strong>UV Printing</strong> options, utilized by our advanced printing technology
                                    and unmatched accuracy.
                                </Typography>
                                <Typography variant="subtitle1" classes={{subtitle1: clsx("information-title", "information-subtitle")}} paragraph={true}> Dye
                                    Sublimation </Typography>
                            </Container>
                            <Container maxWidth="sm">
                                <Typography color="textSecondary" paragraph={true}>
                                    Our dye sublimation printing service uses thermal transfer printing.
                                    Your high resolution print is transferred onto the canopy fabric
                                    using a heat press printing technique.
                                </Typography>
                            </Container>
                        </CContainer>
                        <CContainer>
                            <Container maxWidth="md">
                                <Grid container spacing={3}>
                                    <MXGrid item xs={12} sm={4} head="Fabric material" src="/images/custom-printing/600D-polyester.jpg">
                                        <Typography variant="h6" classes={{h6: "information-title"}}>600D Polyester.<br/>288 gsm.</Typography>
                                    </MXGrid>
                                    <MXGrid item xs={12} sm={4} head="Ink" title='Original ink pigment imported from Korea.'
                                            src="/images/custom-printing/imported-from-korea.jpg"/>
                                    <MXGrid item xs={12} sm={4} head="Color" title='Produces prints with bright colors that can be kept for
                                            long-term without fading.'
                                            src="/images/custom-printing/tant-display.jpg"/>
                                </Grid>
                            </Container>
                        </CContainer>
                        <CContainer>
                            <Container maxWidth="md">
                                <Typography variant="subtitle1" classes={{subtitle1: clsx("information-title", "information-subtitle")}} paragraph={true}>
                                    UV Quality Printing Service
                                </Typography>
                            </Container>
                            <Container maxWidth="sm">
                                <Typography color="textSecondary" paragraph={true}>
                                    Take your branding to the next level with our digital printing
                                    process using our high- quality UV ink to take your logo directly
                                    onto the canopy fabric. Provides high resolution service that dries
                                    and strengthens onto your canopy in an instant.
                                </Typography>
                            </Container>
                        </CContainer>
                        <CContainer>
                            <Container maxWidth="md">
                                <Grid container spacing={3}>
                                    <MXGrid item xs={12} sm={4} head="Fabric material" src="/images/custom-printing/900D-polyester.jpg">
                                        <Typography variant="h6" classes={{h6: "information-title"}}>900D Polyester.<br/>360 gsm.</Typography>
                                    </MXGrid>
                                    <MXGrid item xs={12} sm={4} head="Ink" title='Original ink pigment imported from Japan.'
                                            src="/images/custom-printing/imported-from-japan.jpg"/>
                                    <MXGrid item xs={12} sm={4} head="Color" title='Produces prints with bright colors that can be kept for 2 -
                                            3 Years.'
                                            src="/images/custom-printing/tant-display.jpg"/>
                                    <Grid item sm={6}>
                                        <img className="image-display"
                                             src="/images/custom-printing/how-uv-printing-works.jpg"
                                             alt="how uv printing works"
                                        />
                                    </Grid>
                                    <Grid item sm={6}>
                                        <img className="image-display"
                                             src="/images/custom-printing/uv-custom-printing.jpg"
                                             alt="uv custom printing"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <img className="image-display"
                                             src="/images/custom-printing/uv-printing.jpg"
                                             alt="uv printing"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <img className="image-display"
                                             src="/images/custom-printing/uv-printing-keeps-years.jpg"
                                             alt="uv printing keeps years"
                                        />
                                    </Grid>
                                </Grid>
                            </Container>
                        </CContainer>
                        <CContainer>
                            <CLink backgroundColor={"black"} href={{pathname: "/custom-printing-canopy-tent"}} size="large"
                                   style={{margin: "auto auto 48px auto", padding: "8px 24px"}}>
                                Build your own
                            </CLink>
                            <Typography color="textSecondary" paragraph={true}>
                                Follow us on social media to stay up to date with our canopy tent
                                news and special offers!
                            </Typography>
                        </CContainer>
                        <SectionSocialGroup/>
                    </>
                ) : null}
            </Box>
        </React.Fragment>
    );
}

export default Custom_Printing;
