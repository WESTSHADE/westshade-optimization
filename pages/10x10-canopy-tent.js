import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

import Link from "next/link";
import {withRouter} from "next/router";

import {Box, Button, Breadcrumbs, Container, Divider, Grid, List, ListItem, ListItemText, Typography} from "@material-ui/core";

import CBreadcrumbs from "../components/breadcrumbs";
import CContainer from "../components/container";
import CLink from "../components/link";

const MXImageDisplay = styled.img`
	width: 90%;
	min-height: 200px;
	max-height: 400px;
	object-fit: contain;
`;

const MXDot = styled(({color, ...other}) => <div style={{backgroundColor: color}} {...other} />)`
	width: 14px;
	height: 14px;
	margin: 4px;
	border-radius: 50%;
	border: 1px solid #aaaaaa;
`;

const MXDotGroup = styled(({...other}) => (
    <div {...other}>
        <MXDot color="black"/>
        <MXDot color="white"/>
        <MXDot color="#ff0000"/>
        <MXDot color="#3773b8"/>
        <MXDot color="#eecb45"/>
        <MXDot color="#4c9a18"/>
    </div>
))`
	display: inline-flex;
	margin-bottom: 8px;
`;

const MXContainerBuy = ({text, buttonText, href, backgroundColor, dot}) => {
    return (
        <div style={{margin: "18px 18px 36px 18px", display: "flex", flexDirection: "column", alignItems: "center"}}>
            {dot ? <MXDotGroup/> : null}
            <Typography variant="inherit" display="block" color="textSecondary" paragraph={!!text}>
                {text}
            </Typography>
            <CLink backgroundColor={backgroundColor} href={href}>
                {buttonText ? buttonText : "Buy"}
            </CLink>
        </div>
    );
};

function Canopy_Tent_Package({router}) {
    const settings = {
        arrows: false,
        dots: false,
        infinite: false,
        autoplay: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
        ],
    };

    const [display, setDisplay] = useState(false);

    useEffect(() => {
        setTimeout(() => setDisplay(true), 250);
    }, []);

    return (
        <React.Fragment>
            <Box className="page canopy-tent-package" fontSize={14} lineHeight={1.43}>
                {display ? (
                    <>
                        <CBreadcrumbs>
                            <Container maxWidth="md">
                                <Breadcrumbs classes={{li: "root-breadcrumbs-text"}}>
                                    <Link color="inherit" href="/" onClick={(event) => event.preventDefault()}>
                                        Home
                                    </Link>
                                    <Typography variant="inherit" color="textPrimary">
                                        10x10 Canopy Tent
                                    </Typography>
                                </Breadcrumbs>
                            </Container>
                        </CBreadcrumbs>
                        <CContainer>
                            <Container maxWidth="md">
                                <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                    10x10 Canopy Tent
                                </Typography>
                                <Typography color="textSecondary" paragraph={true}>
                                    The all original, classic 10x10 instant pop-up canopy suited for all professional events and recreational activities. With perfect symmetry and
                                    a complex truss bar connector design, our canopy shelter provides comfort and
                                    protection that fits all your basic outdoor and indoor needs. Choose between the Y5, Y6, and the Y7 series available today for the right
                                    activity. In addition, we offer customizable custom printing packages to make your
                                    marketing and original display shine in front of your audience!
                                </Typography>
                            </Container>
                        </CContainer>
                        <CContainer className="extend gray">
                            <Container maxWidth="md">
                                <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                    Which tent is right for you?
                                </Typography>
                                <Grid container spacing={6}>
                                    <Grid item xs={12} md={4}>
                                        <div className="w-100p">
                                            <div className="position-r" style={{minHeight: 400}}>
                                                <MXImageDisplay src="/images/product/y5-economic-canopy-tent/y5-economic.png" alt="y5-economic"/>
                                                <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}}>
                                                    {" "}
                                                    Y5 Economic{" "}
                                                </Typography>
                                                <Typography variant="subtitle2" color="inherit" style={{color: "#e59010"}} paragraph={true}>
                                                    {" "}
                                                    For recreational use{" "}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" paragraph={true}>
                                                    Our most economical canopy made out of stable powder-coated steel for everyday usage.
                                                </Typography>
                                            </div>
                                            <MXContainerBuy text={"Starting at $245"} backgroundColor={"#2767c5"} dot href={{pathname: "/y5-economic/buy"}}/>
                                            <Divider/>
                                            <Grid container spacing={2} style={{margin: "24px auto auto", width: "90%"}}>
                                                <Grid item xs={6}>
                                                    <div className="section-image-package-specs-container">
                                                        <img className="section-image-package-specs" src="/images/pole@1x.png"/>
                                                        <p className="section-content">1.75’’ outer leg frame</p>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div className="section-image-package-specs-container">
                                                        <img className="section-image-package-specs" src="/images/onepress@1x.png"/>
                                                        <p className="section-content">Push button height ajustor</p>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div className="section-image-package-specs-container">
                                                        <img className="section-image-package-specs" src="/images/bracket-connector@1x.png"/>
                                                        <p className="section-content">Truss bars and connectors</p>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div className="section-image-package-specs-container">
                                                        <img className="section-image-package-specs" src="/images/footpads@1x.png"/>
                                                        <p className="section-content">Powder coating steel frame</p>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <div className="w-100p">
                                            <div className="position-r" style={{minHeight: 400}}>
                                                <MXImageDisplay src="/images/product/y6-commercial-buy/y6-commercial.png" alt="y6-commercial"/>
                                                <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}}>
                                                    {" "}
                                                    Y6 Commercial{" "}
                                                </Typography>
                                                <Typography variant="subtitle2" color="inherit" style={{color: "#e59010"}} paragraph={true}>
                                                    {" "}
                                                    For commercial use{" "}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" paragraph={true}>
                                                    Stronger and lighter commercial grade aluminum frame canopy tent for various environments.
                                                </Typography>
                                            </div>
                                            <MXContainerBuy text={"Starting at $445"} backgroundColor={"#2767c5"} dot href={{pathname: "/y6-commercial/buy"}}/>
                                            <Divider/>
                                            <Grid container spacing={2} style={{margin: "24px auto auto", width: "90%"}}>
                                                <Grid item xs={6}>
                                                    <div className="section-image-package-specs-container">
                                                        <img className="section-image-package-specs" src="/images/pole-1@1x.png"/>
                                                        <p className="section-content">1.75’’ Aluminum outer leg</p>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div className="section-image-package-specs-container">
                                                        <img className="section-image-package-specs" src="/images/image-33@2x.png"/>
                                                        <p className="section-content">Push button height ajustor</p>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div className="section-image-package-specs-container">
                                                        <img className="section-image-package-specs" src="/images/image-34@2x.png"/>
                                                        <p className="section-content">Aluminum connectors</p>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div className="section-image-package-specs-container">
                                                        <img className="section-image-package-specs" src="/images/footpads-1@1x.png"/>
                                                        <p className="section-content">Aluminum frame</p>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <div className="w-100p">
                                            <div className="position-r" style={{minHeight: 400}}>
                                                <MXImageDisplay src="/images/product/y7-heavy-duty-canopy-tent/y7-heavy-duty.png" alt="y7-heavy-duty"/>
                                                <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}}>
                                                    {" "}
                                                    Y7 Heavy Duty{" "}
                                                </Typography>
                                                <Typography variant="subtitle2" color="inherit" style={{color: "#e59010"}} paragraph={true}>
                                                    {" "}
                                                    For heavy duty use{" "}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" paragraph={true}>
                                                    The most heavy duty aluminum frame canopy on the market with unchallenged strength and durability.
                                                </Typography>
                                            </div>
                                            <MXContainerBuy text={"Starting at $619"} backgroundColor={"#2767c5"} dot href={{pathname: "/y7-heavy-duty/buy"}}/>
                                            <Divider/>
                                            <Grid container spacing={2} style={{margin: "24px auto auto", width: "90%"}}>
                                                <Grid item xs={6}>
                                                    <div className="section-image-package-specs-container">
                                                        <img className="section-image-package-specs" src="/images/pole-1@1x.png"/>
                                                        <p className="section-content">1.75’’ outer leg frame</p>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div className="section-image-package-specs-container">
                                                        <img className="section-image-package-specs" src="/images/image-33@2x.png"/>
                                                        <p className="section-content">Push button height ajustor</p>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div className="section-image-package-specs-container">
                                                        <img className="section-image-package-specs" src="/images/image-34@2x.png"/>
                                                        <p className="section-content">Truss bars and connectors</p>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div className="section-image-package-specs-container">
                                                        <img className="section-image-package-specs" src="/images/footpads-1@1x.png"/>
                                                        <p className="section-content">Powder coating steel frame</p>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <List>
                                            <ListItem className="section-image-package-listItem"/>
                                            <ListItem className="section-image-package-listItem" style={{backgroundColor: "white"}}>
                                                <ListItemText className="section-image-package-listItem-title" primary={"Frame Specifications"}/>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText className="section-image-package-listItem-subtitle" primary={"Frame Material"}/>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText className="section-image-package-listItem-subtitle" primary={"Outer Leg Shape"}/>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText className="section-image-package-listItem-subtitle" primary={"Bracket Connectors"}/>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText className="section-image-package-listItem-subtitle" primary={"Height Adjustment"}/>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText className="section-image-package-listItem-subtitle" primary={"Nuts and Bolts"}/>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText className="section-image-package-listItem-subtitle" primary={"Outer Leg Diameter"}/>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText className="section-image-package-listItem-subtitle" primary={"Outer Leg Thickness"}/>
                                            </ListItem>
                                            <ListItem className="section-image-package-listItem" style={{backgroundColor: "white"}}>
                                                <ListItemText className="section-image-package-listItem-title" primary={"Fabric features"}/>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText className="section-image-package-listItem-subtitle" primary={"Fabric"}/>
                                            </ListItem>
                                            <ListItem style={{minHeight: "41px"}}/>
                                            <ListItem>
                                                <ListItemText className="section-image-package-listItem-subtitle" primary={"Function"}/>
                                            </ListItem>
                                            <ListItem style={{minHeight: "41px"}}/>
                                            <ListItem style={{minHeight: "41px"}}/>
                                            <ListItem className="section-image-package-listItem" style={{backgroundColor: "white"}}>
                                                <ListItemText className="section-image-package-listItem-title" primary={"Warrenty"}/>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText className="section-image-package-listItem-subtitle" primary={"Frame Warranty"}/>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText className="section-image-package-listItem-subtitle" primary={"Roof Warranty"}/>
                                            </ListItem>
                                        </List>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Slider {...settings}>
                                            <List>
                                                <ListItem className="section-image-package-listItem ">
                                                    <ListItemText className="section-image-package-listItem-title center" primary={"Y5 Economic"}/>
                                                </ListItem>
                                                <ListItem className="section-image-package-listItem" style={{backgroundColor: "white"}}/>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"Powder-coated steel"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"Hexagonal"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"Nylon"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"Push button"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"Zinc coated steel"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"1.75 inches (45mm)"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"0.05inches (1.2mm)"}/>
                                                </ListItem>
                                                <ListItem className="section-image-package-listItem" style={{backgroundColor: "white"}}/>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"500D Polyester with PVC coating"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"320gsm"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"Waterproof"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"CPAI-84 certified fire retardant"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"UV protection"}/>
                                                </ListItem>
                                                <ListItem className="section-image-package-listItem" style={{backgroundColor: "white"}}/>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"1 year"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"1 year"}/>
                                                </ListItem>
                                                <ListItem className="section-image-package-listItem-button">
                                                    <ListItemText className="section-image-package-listItem-content" style={{width: "100%", marginBottom: 12}}
                                                                  primary={"Starting at $245"}/>
                                                    <Button variant="contained" className="section-grid-button" onClick={() => router.push({pathname: "/y5-economic/buy"})}>
                                                        Buy
                                                    </Button>
                                                </ListItem>
                                            </List>
                                            <List>
                                                <ListItem className="section-image-package-listItem">
                                                    <ListItemText className="section-image-package-listItem-title center" primary={"Y6 Commercial"}/>
                                                </ListItem>
                                                <ListItem className="section-image-package-listItem" style={{backgroundColor: "white"}}/>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"6063-T5 Aluminum"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"Hexagonal"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"6063-T5 Aluminum"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"Push button"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"Stainless steel"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"1.75 inches (45mm)"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"0.06 inches (1.5mm)"}/>
                                                </ListItem>
                                                <ListItem className="section-image-package-listItem" style={{backgroundColor: "white"}}/>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"500D Polyester with PVC coating"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"320gsm"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"Waterproof"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"CPAI-84 certified fire retardant"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"UV protection"}/>
                                                </ListItem>
                                                <ListItem className="section-image-package-listItem" style={{backgroundColor: "white"}}/>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"5 year"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"1 year"}/>
                                                </ListItem>
                                                <ListItem className="section-image-package-listItem-button">
                                                    <ListItemText className="section-image-package-listItem-content" style={{width: "100%", marginBottom: 12}}
                                                                  primary={"Starting at $445"}/>
                                                    <Button variant="contained" className="section-grid-button" onClick={() => router.push("/y6-commercial/buy/")}>
                                                        Buy
                                                    </Button>
                                                </ListItem>
                                            </List>
                                            <List>
                                                <ListItem className="section-image-package-listItem">
                                                    <ListItemText className="section-image-package-listItem-title center" primary={"Y7 Heavy Duty"}/>
                                                </ListItem>
                                                <ListItem className="section-image-package-listItem" style={{backgroundColor: "white"}}/>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"6063-T5 Aluminum"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"Hexagonal"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"6063-T5 Aluminum"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"Push button"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"Stainless steel"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"2.25 inches (57mm)"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"0.07 inches (1.8mm)"}/>
                                                </ListItem>
                                                <ListItem className="section-image-package-listItem" style={{backgroundColor: "white"}}/>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"500D Polyester with PVC coating"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"320gsm"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"Waterproof"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"CPAI-84 certified fire retardant"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"UV protection"}/>
                                                </ListItem>
                                                <ListItem className="section-image-package-listItem" style={{backgroundColor: "white"}}/>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"10 year"}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className="section-image-package-listItem-content" primary={"1 year"}/>
                                                </ListItem>
                                                <ListItem className="section-image-package-listItem-button">
                                                    <ListItemText className="section-image-package-listItem-content" style={{width: "100%", marginBottom: 12}}
                                                                  primary={"Starting at $619"}/>
                                                    <Button variant="contained" className="section-grid-button" onClick={() => router.push("/y7-heavy-duty/buy/")}>
                                                        Buy
                                                    </Button>
                                                </ListItem>
                                            </List>
                                        </Slider>
                                    </Grid>
                                </Grid>
                            </Container>
                        </CContainer>
                        <CContainer>
                            <Container maxWidth="md">
                                <Typography variant="h5" paragraph={true}>
                                    {" "}
                                    Custom printing{" "}
                                </Typography>
                                <Grid container spacing={2} direction="row" alignItems="center">
                                    <Grid item xs={12} sm={4}>
                                        <div className="position-r">
                                            <MXImageDisplay src="/images/product/custom-printed-package/10x10/F1010CPP4.jpg" alt="custom-printing-10X10-y5"/>
                                        </div>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            <strong> Y5 Economic </strong>
                                        </Typography>
                                        <Typography variant="subtitle2" color="textSecondary" paragraph={true}>
                                            {" "}
                                            Starting at $805{" "}
                                        </Typography>
                                        <MXContainerBuy backgroundColor={"#2767c5"} href={{pathname: "/custom-printed-package/f1010cpp", query: {frame: "y5"}}}/>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <div className="position-r">
                                            <MXImageDisplay src="/images/product/custom-printed-package/10x10/F1010CPP8.jpg" alt="custom-printing-10X10-y6"/>
                                        </div>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            <strong> Y6 Commercial </strong>
                                        </Typography>
                                        <Typography variant="subtitle2" color="textSecondary" paragraph={true}>
                                            {" "}
                                            Starting at $965{" "}
                                        </Typography>
                                        <MXContainerBuy backgroundColor={"#2767c5"} href={{pathname: "/custom-printed-package/f1010cpp", query: {frame: "y6"}}}/>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <div className="position-r">
                                            <MXImageDisplay src="/images/product/custom-printed-package/10x10/F1010CPP7.jpg" alt="custom-printing-10X10-y7"/>
                                        </div>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            <strong> Y7 Heavy Duty </strong>
                                        </Typography>
                                        <Typography variant="subtitle2" color="textSecondary" paragraph={true}>
                                            {" "}
                                            Starting at $1,365{" "}
                                        </Typography>
                                        <MXContainerBuy backgroundColor={"#2767c5"} href={{pathname: "/custom-printed-package/f1010cpp", query: {frame: "y7"}}}/>
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

export default withRouter(Canopy_Tent_Package);
