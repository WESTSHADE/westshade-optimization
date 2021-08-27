import React, {useEffect, useState} from "react";

import Link from "next/link";
import Head from "next/head";

import {Box, Breadcrumbs, Container, Grid, List, ListItem, ListItemText, Typography,} from "@material-ui/core";

import CBreadcrumbs from "../components/breadcrumbs";
import CContainer from "../components/container";

function Warranty() {
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        setTimeout(function () {
            setDisplay(true);
        }, 250);
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Warranty | WESTSHADE</title>
                <meta name="description"
                      content="Warranty Warranty InformationAll products and accessories purchased from Westshade Canopy & Umbrellas are covered by manufacture's default defects."/>
            </Head>
            <Box className="page" fontSize={14} lineHeight={1.43}>
                {display ? (
                    <>
                        <CBreadcrumbs>
                            <Container maxWidth="md">
                                <Breadcrumbs classes={{li: "root-breadcrumbs-text"}}>
                                    <Link color="inherit" href="/" onClick={(event) => event.preventDefault()}>
                                        Home
                                    </Link>
                                    <Typography variant="inherit" color="textPrimary"> Warranty </Typography>
                                </Breadcrumbs>
                            </Container>
                        </CBreadcrumbs>
                        <CContainer>
                            <Container maxWidth="md">
                                <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} align="left" paragraph={true}>
                                    <strong> Warranty Information </strong>
                                </Typography>
                                <Typography color="textSecondary" align="left" paragraph={true}>
                                    All products and accessories purchased from Westshade Canopy &
                                    Umbrellas are covered by manufacture’s default defects only,
                                    defined as products and other merchandise either defective or
                                    damaged upon unpacking of merchandise. Packages are checked
                                    thoroughly and inspected at facility for final inspection.
                                </Typography>
                                <Typography color="textSecondary" align="left" paragraph={true}>
                                    Warranty does not cover products and accessories for:
                                </Typography>
                                <Typography component="span" classes={{root: "gird-item-content"}} display="block" align="left" paragraph={true}>
                                    <ul>
                                        <li> Merchandise Damaged by Improper Usage.</li>
                                        <li> Merchandise caused by Harmful Weather Conditions (Please use your canopy for it’s respective weather resistant capability).</li>
                                        <li> Merchandise Damaged by Improper Set-Up (Please follow instructions carefully provided).</li>
                                        <li> Merchandise Damaged caused by Transportation (Please seek out third-party shipping service for transit damage claims).</li>
                                    </ul>
                                </Typography>
                                <Typography color="textSecondary" align="left">
                                    Please contact our customer support team for consultation or any
                                    questions you may have regarding our warranty policy.
                                </Typography>
                            </Container>
                        </CContainer>
                        <CContainer>
                            <Container maxWidth="md">
                                <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} align="left" paragraph={true}>
                                    <strong> Warranty Timeline Coverage </strong>
                                </Typography>
                                <Grid container>
                                    <Grid item xs={12} sm={6}>
                                        <List>
                                            <ListItem classes={{root: "root-listItem"}} divider>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={8}>
                                                        <ListItemText secondary={"Y5 Frame"}/>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <ListItemText secondary={"1 Year"}/>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                            <ListItem classes={{root: "root-listItem"}} divider>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={8}>
                                                        <ListItemText secondary={"Y6 Frame"}/>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <ListItemText secondary={"5 Years"}/>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                            <ListItem classes={{root: "root-listItem"}} divider>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={8}>
                                                        <ListItemText secondary={"Y7 Frame"}/>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <ListItemText secondary={"10 Years"}/>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                            <ListItem classes={{root: "root-listItem"}} divider>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={8}>
                                                        <ListItemText secondary={"Y5 Cover Top"}/>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <ListItemText secondary={"1 Year"}/>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                            <ListItem classes={{root: "root-listItem"}} divider>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={8}>
                                                        <ListItemText secondary={"Y6 Cover Top"}/>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <ListItemText secondary={"1 Year"}/>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                            <ListItem classes={{root: "root-listItem"}} divider>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={8}>
                                                        <ListItemText secondary={"Y7 Cover Top"}/>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <ListItemText secondary={"1 Year"}/>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                            <ListItem classes={{root: "root-listItem"}} divider>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={8}>
                                                        <ListItemText secondary={"Delicate Standard Umbrella Frame"}/>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <ListItemText secondary={"3 Years"}/>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                            <ListItem classes={{root: "root-listItem"}} divider>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={8}>
                                                        <ListItemText secondary={"Delicate Standard Umbrella Cover"}/>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <ListItemText secondary={"5 Years"}/>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                            <ListItem classes={{root: "root-listItem"}} divider>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={8}>
                                                        <ListItemText secondary={"Deluxe Professional Umbrella Frame"}/>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <ListItemText secondary={"3 Years"}/>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                            <ListItem classes={{root: "root-listItem"}} divider>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={8}>
                                                        <ListItemText secondary={"Deluxe Professional Umbrella Cover"}/>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <ListItemText secondary={"5 Years"}/>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                            <ListItem classes={{root: "root-listItem"}} divider>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={8}>
                                                        <ListItemText secondary={"Oversize Commercial Market Umbrella Frame"}/>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <ListItemText secondary={"3 Years"}/>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                            <ListItem classes={{root: "root-listItem"}} divider>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={8}>
                                                        <ListItemText secondary={"Oversize Commercial Market Umbrella Cover"}/>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <ListItemText secondary={"5 Years"}/>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                            <ListItem classes={{root: "root-listItem"}} divider>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={8}>
                                                        <ListItemText secondary={"Accessories"}/>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <ListItemText secondary={"3 Months"}/>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        </List>
                                    </Grid>
                                </Grid>
                            </Container>
                        </CContainer>
                        <CContainer>
                            <Container maxWidth="md">
                                <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} align="left" paragraph={true}>
                                    <strong> Liability Notice </strong>
                                </Typography>
                                <Typography color="textSecondary" align="left" paragraph={true}>
                                    Under no circumstances should a damaged product be used. Damaged
                                    products should be immediately packed up and removed. In
                                    purchasing any product from Westshade Canopy, you agree to not
                                    hold Westshade Canopy, Westshade Canopy representatives &
                                    Westshade Canopy directors liable for any damage or injury caused
                                    by Westshade Canopy products. This limitation applies to damage or
                                    injury caused by both new, functional or damaged products. In
                                    purchasing from Westshade Canopy, you also agree to not hold
                                    Westshade Canopy, Westshade Canopy representatives & Westshade
                                    Canopy directors liable for any loss, damage or injury that may
                                    arise because of a product arriving faulty, incomplete, incorrect,
                                    or late.
                                </Typography>
                            </Container>
                        </CContainer>
                    </>
                ) : null}
            </Box>
        </React.Fragment>
    );
}

export default Warranty;
