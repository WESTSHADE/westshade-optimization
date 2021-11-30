import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import clsx from "clsx";

import Head from "next/head";

import {useStyletron} from "baseui";
import {Button, SHAPE} from "baseui/button";
import {Block} from "baseui/block";
import {ChevronDown} from "baseui/icon";

import {Box, Container, Grid, Typography} from "@material-ui/core";

import Banner from "../components/banner";
import CContainer from "../components/container";
import CLink from "../components/link";
import {FreeMockupForm} from "../components/sections"

const MXImageDisplay = styled.img`
	width: 90%;
	object-fit: contain;
`;

function Custom_Printing_Canopy_Tent() {
    const [css] = useStyletron();
    const [display, setDisplay] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const formContainerRef = useRef(null)

    useEffect(() => {
        setTimeout(function () {
            setDisplay(true);
        }, 250);
    }, []);

    useEffect(() => {
        if (!showForm) {
            setTimeout(() => {
                formContainerRef.current.style.height = "0";
            }, 400);
        } else {
            formContainerRef.current.style.height = "auto";
        }
    }, [showForm]);

    return (
        <React.Fragment>
            <Head>
                <title>Printed Package - Custom Printing Canopy Tent | WESTSHADE</title>
                <meta name="description" content="Printing packages are based on your needs with a large selection of sizes and colors to promo your business, get free design today!"/>
            </Head>
            <Box className="page" fontSize={14} lineHeight={1.43}>
                {display ? (
                    <>
                        <Banner backgroundImage={"/images/banner/2000-700-1.webp"} title="Canopy Tent Custom Printing Packages"/>
                        <CContainer>
                            <Container maxWidth="md">
                                <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                    View custom printed package gallery below to find the best fit plan quickly.
                                </Typography>
                                <Typography color="textSecondary" paragraph={true}>
                                    Our professional team helps your canopy tents attract audiences by the unique design stands out at any trade shows, restaurants outdoor dining, job fairs, and many more! Each of our custom canopy is easy
                                    pop up design and
                                    comes with a free rolling travel bag. Start with a free personalized print design from our professional designers, and promote your business and brand today!
                                </Typography>
                            </Container>
                        </CContainer>
                        {/* <CContainer>
                            <Container maxWidth="md">
                                <Typography variant="subtitle1" classes={{subtitle1: clsx("information-title", "information-subtitle")}} paragraph={true}>
                                    CONTACT US NOW
                                </Typography>
                                <Grid container alignItems="center">
                                    <Grid item xs={12} sm={6}>
                                        <CLink href="tel:877-702-1872" color="black" size="large" style={{margin: "36px auto 24px", minWidth: 120, border: "1px solid black"}}>
                                            Call 877-702-1872
                                        </CLink>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <CLink href={{pathname: "/contact-us"}} color="black" size="large" style={{margin: "36px auto 24px", minWidth: 120, border: "1px solid black"}}>
                                            Email Us
                                        </CLink>
                                    </Grid>
                                </Grid>
                            </Container>
                        </CContainer> */}
                        <Block width="100%">
                            <Block display="grid" placeItems="center" marginTop={["40px", "64px", "90px"]} marginBottom={["24px", "32px", "40px"]}>
                                <Button
                                    onClick={() => setShowForm(!showForm)}
                                    shape={SHAPE.pill}
                                    endEnhancer={() => <ChevronDown size={20}/>}
                                    overrides={{
                                        BaseButton: {
                                            style: {
                                                padding: "20px 0",
                                                minWidth: "284px",
                                                backgroundColor: "#23A4AD",
                                                color: "#ffffff",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                ":hover": {
                                                    backgroundColor: "#5FBDBE"
                                                },
                                                ":active": {
                                                    backgroundColor: "#43878C"
                                                }
                                            }
                                        },
                                        EndEnhancer: {
                                            style: {
                                                transform: showForm ? "rotate(-180deg)" : "rotate(0deg)",
                                                transition: "all .3s ease-in-out"
                                            }
                                        }
                                    }}
                                >
                                    Get a free mockup
                                </Button>
                            </Block>
                            <Block
                                width="100%"
                                placeItems="center"
                                ref={formContainerRef}
                                className={css({
                                    transition: "all .3s ease-in"
                                })}
                            >
                                <Block
                                    className={css({
                                        opacity: showForm ? "1" : "0",
                                        transform: showForm ? "scaleY(1)" : "scaleY(0)",
                                        visibility: showForm ? "visible" : "hidden",
                                        userSelect: showForm ? "auto" : "none",
                                        transformOrigin: "0 0",
                                        transformStyle: "flat",
                                        transition: "all .5s ease-in-out"
                                    })}
                                >
                                    <FreeMockupForm/>
                                </Block>
                            </Block>
                        </Block>
                        <CContainer>
                            <Container maxWidth="md">
                                <Typography variant="subtitle1" classes={{subtitle1: clsx("information-title", "information-subtitle")}} paragraph={true}>
                                    DIFFERENCE SIZES
                                </Typography>
                                <Grid container spacing={2} direction="row" alignItems="center">
                                    <Grid item xs={12} sm={6}>
                                        <MXImageDisplay src="/images/custom-printed-package/custom-printing-10X10.webp" alt="custom-printing-10X10"/>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            {" "}
                                            10x10 ft{" "}
                                        </Typography>
                                        <MXImageDisplay src="/images/custom-printing/custom-printing-function.webp" alt="custom-printing-function"/>
                                        <CLink backgroundColor={"#5cb85c"} href={{pathname: "/custom-printed-package/f1010cpp"}} style={{margin: "24px auto", width: "80%"}}>
                                            View Print Packages
                                        </CLink>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <MXImageDisplay src="/images/custom-printed-package/custom-printing-10X15.webp" alt="custom-printing-10X15"/>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            {" "}
                                            10x15 ft{" "}
                                        </Typography>
                                        <MXImageDisplay src="/images/custom-printing/custom-printing-function.webp" alt="custom-printing-function"/>
                                        <CLink backgroundColor={"#5cb85c"} href={{pathname: "/custom-printed-package/f1015cpp"}} style={{margin: "24px auto", width: "80%"}}>
                                            View Print Packages
                                        </CLink>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <MXImageDisplay src="/images/custom-printed-package/custom-printing-10X20.webp" alt="custom-printing-10X20"/>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            {" "}
                                            10x20 ft{" "}
                                        </Typography>
                                        <MXImageDisplay src="/images/custom-printing/custom-printing-function.webp" alt="custom-printing-function"/>
                                        <CLink backgroundColor={"#5cb85c"} href={{pathname: "/custom-printed-package/f1020cpp"}} style={{margin: "24px auto", width: "80%"}}>
                                            View Print Packages
                                        </CLink>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <MXImageDisplay src="/images/custom-printed-package/custom-printing-13X13.webp" alt="custom-printing-13X13"/>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            {" "}
                                            13X13 ft{" "}
                                        </Typography>
                                        <MXImageDisplay src="/images/custom-printing/custom-printing-function.webp" alt="custom-printing-function"/>
                                        <CLink backgroundColor={"#5cb85c"} href={{pathname: "/custom-printed-package/f1313cpp"}} style={{margin: "24px auto", width: "80%"}}>
                                            View Print Packages
                                        </CLink>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <MXImageDisplay src="/images/custom-printed-package/custom-printing-13X20.webp" alt="custom-printing-13X20"/>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            {" "}
                                            13X20 ft{" "}
                                        </Typography>
                                        <MXImageDisplay src="/images/custom-printing/custom-printing-function.webp" alt="custom-printing-function"/>
                                        <CLink backgroundColor={"#5cb85c"} href={{pathname: "/custom-printed-package/f1320cpp"}} style={{margin: "24px auto", width: "80%"}}>
                                            View Print Packages
                                        </CLink>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <MXImageDisplay src="/images/custom-printed-package/custom-printing-13X26.webp" alt="custom-printing-13X26"/>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            {" "}
                                            13X26 ft{" "}
                                        </Typography>
                                        <MXImageDisplay src="/images/custom-printing/custom-printing-function.webp" alt="custom-printing-function"/>
                                        <CLink backgroundColor={"#5cb85c"} href={{pathname: "/custom-printed-package/f1326cpp"}} style={{margin: "24px auto", width: "80%"}}>
                                            View Print Packages
                                        </CLink>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <MXImageDisplay src="/images/custom-printed-package/custom-printing-16X16.webp" alt="custom-printing-16X16"/>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            {" "}
                                            16X16 ft{" "}
                                        </Typography>
                                        <MXImageDisplay src="/images/custom-printing/custom-printing-function.webp" alt="custom-printing-function"/>
                                        <CLink backgroundColor={"#5cb85c"} href={{pathname: "/custom-printed-package/f1616cpp"}} style={{margin: "24px auto", width: "80%"}}>
                                            View Print Packages
                                        </CLink>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <MXImageDisplay src="/images/custom-printed-package/custom-printing-20X20.webp" alt="custom-printing-20X20"/>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            {" "}
                                            20X20 ft{" "}
                                        </Typography>
                                        <MXImageDisplay src="/images/custom-printing/custom-printing-function.webp" alt="custom-printing-function"/>
                                        <CLink backgroundColor={"#5cb85c"} href={{pathname: "/custom-printed-package/f2020cpp"}} style={{margin: "24px auto", width: "80%"}}>
                                            View Print Packages
                                        </CLink>
                                    </Grid>
                                </Grid>
                            </Container>
                        </CContainer>
                    </>
                ) : null}
            </Box>
        </React.Fragment>
    );
}

export default Custom_Printing_Canopy_Tent;
