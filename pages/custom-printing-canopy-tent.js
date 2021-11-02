import React, {useEffect, useState} from "react";
import styled from "styled-components";
import clsx from "clsx";

import Head from "next/head";
import Link from "next/link";

import {Box, Breadcrumbs, Container, Grid, Typography} from "@material-ui/core";

import Banner from "../components/banner";
import CBreadcrumbs from "../components/breadcrumbs";
import CContainer from "../components/container";
import CLink from "../components/link";

const MXImageDisplay = styled.img`
	width: 90%;
	object-fit: contain;
`;

function Custom_Printing_Canopy_Tent() {
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        setTimeout(function () {
            setDisplay(true);
        }, 250);
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Printed Package - Custom Printing Canopy Tent | WESTSHADE</title>
                <meta name="description" content="Printing packages are based on your needs with a large selection of sizes and colors to promo your business, get free design today!"/>
            </Head>
            <Box className="page" fontSize={14} lineHeight={1.43}>
                {display ? (
                    <>
                        <Banner backgroundImage={"/images/banner/2000-700-1-1-1@1x.png"} title="Canopy Tent Custom Printing Packages"/>
                        {/*<CBreadcrumbs>*/}
                        {/*	<Container maxWidth="md">*/}
                        {/*		<Breadcrumbs classes={{ li: "root-breadcrumbs-text" }}>*/}
                        {/*			<Link color="inherit" href="/" onClick={(event) => event.preventDefault()}>*/}
                        {/*				Home*/}
                        {/*			</Link>*/}
                        {/*			<Link color="inherit" href="/custom-printing" onClick={(event) => event.preventDefault()}>*/}
                        {/*				Custom Printing*/}
                        {/*			</Link>*/}
                        {/*			<Typography variant="inherit" color="textPrimary">*/}
                        {/*				{" "}*/}
                        {/*				Canopy Tent{" "}*/}
                        {/*			</Typography>*/}
                        {/*		</Breadcrumbs>*/}
                        {/*	</Container>*/}
                        {/*</CBreadcrumbs>*/}
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
                        <CContainer>
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
                        </CContainer>
                        <CContainer>
                            <Container maxWidth="md">
                                <Typography variant="subtitle1" classes={{subtitle1: clsx("information-title", "information-subtitle")}} paragraph={true}>
                                    DIFFERENCE SIZES
                                </Typography>
                                <Grid container spacing={2} direction="row" alignItems="center">
                                    <Grid item xs={12} sm={6}>
                                        <MXImageDisplay src="/images/custom-printed-package/custom-printing-10X10.jpg" alt="custom-printing-10X10"/>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            {" "}
                                            10x10 ft{" "}
                                        </Typography>
                                        <MXImageDisplay src="/images/custom-printing/custom-printing-function.jpeg" alt="custom-printing-function"/>
                                        <CLink backgroundColor={"#5cb85c"} href={{pathname: "/custom-printed-package/f1010cpp"}} style={{margin: "24px auto", width: "80%"}}>
                                            View Print Packages
                                        </CLink>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <MXImageDisplay src="/images/custom-printed-package/custom-printing-10X15.jpg" alt="custom-printing-10X15"/>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            {" "}
                                            10x15 ft{" "}
                                        </Typography>
                                        <MXImageDisplay src="/images/custom-printing/custom-printing-function.jpeg" alt="custom-printing-function"/>
                                        <CLink backgroundColor={"#5cb85c"} href={{pathname: "/custom-printed-package/f1015cpp"}} style={{margin: "24px auto", width: "80%"}}>
                                            View Print Packages
                                        </CLink>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <MXImageDisplay src="/images/custom-printed-package/custom-printing-10X20.jpg" alt="custom-printing-10X20"/>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            {" "}
                                            10x20 ft{" "}
                                        </Typography>
                                        <MXImageDisplay src="/images/custom-printing/custom-printing-function.jpeg" alt="custom-printing-function"/>
                                        <CLink backgroundColor={"#5cb85c"} href={{pathname: "/custom-printed-package/f1020cpp"}} style={{margin: "24px auto", width: "80%"}}>
                                            View Print Packages
                                        </CLink>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <MXImageDisplay src="/images/custom-printed-package/custom-printing-13X13.jpg" alt="custom-printing-13X13"/>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            {" "}
                                            13X13 ft{" "}
                                        </Typography>
                                        <MXImageDisplay src="/images/custom-printing/custom-printing-function.jpeg" alt="custom-printing-function"/>
                                        <CLink backgroundColor={"#5cb85c"} href={{pathname: "/custom-printed-package/f1313cpp"}} style={{margin: "24px auto", width: "80%"}}>
                                            View Print Packages
                                        </CLink>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <MXImageDisplay src="/images/custom-printed-package/custom-printing-13X20.jpg" alt="custom-printing-13X20"/>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            {" "}
                                            13X20 ft{" "}
                                        </Typography>
                                        <MXImageDisplay src="/images/custom-printing/custom-printing-function.jpeg" alt="custom-printing-function"/>
                                        <CLink backgroundColor={"#5cb85c"} href={{pathname: "/custom-printed-package/f1320cpp"}} style={{margin: "24px auto", width: "80%"}}>
                                            View Print Packages
                                        </CLink>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <MXImageDisplay src="/images/custom-printed-package/custom-printing-13X26.jpg" alt="custom-printing-13X26"/>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            {" "}
                                            13X26 ft{" "}
                                        </Typography>
                                        <MXImageDisplay src="/images/custom-printing/custom-printing-function.jpeg" alt="custom-printing-function"/>
                                        <CLink backgroundColor={"#5cb85c"} href={{pathname: "/custom-printed-package/f1326cpp"}} style={{margin: "24px auto", width: "80%"}}>
                                            View Print Packages
                                        </CLink>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <MXImageDisplay src="/images/custom-printed-package/custom-printing-16X16.jpg" alt="custom-printing-16X16"/>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            {" "}
                                            16X16 ft{" "}
                                        </Typography>
                                        <MXImageDisplay src="/images/custom-printing/custom-printing-function.jpeg" alt="custom-printing-function"/>
                                        <CLink backgroundColor={"#5cb85c"} href={{pathname: "/custom-printed-package/f1616cpp"}} style={{margin: "24px auto", width: "80%"}}>
                                            View Print Packages
                                        </CLink>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <MXImageDisplay src="/images/custom-printed-package/custom-printing-20X20.jpg" alt="custom-printing-20X20"/>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            {" "}
                                            20X20 ft{" "}
                                        </Typography>
                                        <MXImageDisplay src="/images/custom-printing/custom-printing-function.jpeg" alt="custom-printing-function"/>
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
