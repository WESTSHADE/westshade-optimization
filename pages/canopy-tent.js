import React, {useEffect, useState} from "react";
import styled from 'styled-components';

import Head from "next/head";

import {Box, Container, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography,} from "@material-ui/core";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Banner from "../components/banner";
import CContainer from "../components/container";
import CLink from "../components/link";

const MXContainerPaper = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 0 12px;
`;

const MXContainerOffer = styled.div`
    width: 100%;
    padding: 12px;
    text-align: center;
    color: #b2b2b2;
`;

const MXImageDisplay = styled.img`
    width: 100%;
    min-height: 200px;
    max-height: 400px;
    object-fit: contain;
`;

const MXDot = styled(({color, ...other}) => (
    <div style={{backgroundColor: color}} {...other} />
))`
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

const MXContainerBuy = ({text, buttonText, href, backgroundColor}) => {
    return (
        <div style={{margin: "18px 18px 36px 18px", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <MXDotGroup/>
            <Typography variant="inherit" display="block" color="textSecondary" paragraph={!!text}>{text}</Typography>
            <CLink backgroundColor={backgroundColor} href={href}>
                {buttonText ? buttonText : "Buy"}
            </CLink>
        </div>
    )
}

const MXArrowRight = styled(({...other}) => (
    <ChevronRightIcon color="inherit" {...other}/>
))`
    color: ${({color}) => color ? color : "orange"};
`;

function Canopy_Tent() {
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        setTimeout(() => setDisplay(true), 250);
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Pop Up Canopy Tent - Product Overview | WESTSHADE</title>
                <meta name="description"
                      content="Shop a large selection of instant pop up canopy tents at the lowest price. Customized to help promote your business or for everyday use."/>
            </Head>
            <Box className="page" fontSize={14} lineHeight={1.43}>
                {display ? (
                    <>
                        <Banner backgroundImage={"/images/banner/2000-700-1-1@1x.png"} align="left">
                            <>
                                <Typography variant="h4" classes={{h4: "banner-title"}} paragraph={true}>
                                    The Most High-Quality Canopy Tent For All Your Needs!
                                </Typography>
                                <Typography component="span" classes={{root: "banner-content"}} display="block" align="left" paragraph={true}>
                                    <ul>
                                        <li>
                                            Create instant cooling shade this summer with our
                                            industry-leading Canopy Tent.
                                        </li>
                                        <li>
                                            Highlighting the best materials for an optimal tent
                                            experience.
                                        </li>
                                    </ul>
                                    <br/>
                                    From summertime parties to professional business events, Westshade
                                    has you covered.
                                </Typography>
                                <CLink backgroundColor={"#2767c5"} href={{pathname: "/custom-printing"}} size="large">
                                    Need Custom Print? LEARN MORE
                                </CLink>
                            </>
                        </Banner>
                        <CContainer>
                            <Container maxWidth="md">
                                <MXContainerPaper>
                                    <Paper classes={{root: "root-paper-item"}} elevation={0}>
                                        <Typography variant="subtitle1" classes={{subtitle1: 'root-paper-item-title'}}> Leading Canopy Manufacturer in the USA </Typography>
                                        <Typography variant="inherit" color="textSecondary">
                                            Westshade is the leading commercial canopy and market
                                            umbrella manufacturer in Southern California.
                                        </Typography>
                                    </Paper>
                                    <Paper classes={{root: "root-paper-item"}} elevation={0}>
                                        <Typography variant="subtitle1" classes={{subtitle1: 'root-paper-item-title'}}> Innovative Design For Any Occasions & Specific
                                            Use </Typography>
                                        <Typography variant="inherit" color="textSecondary">
                                            As a full-service custom manufacturer, We have a large
                                            selection of stock tents. We are also able to fill your
                                            unique design requirements.
                                        </Typography>
                                    </Paper>
                                    <Paper classes={{root: "root-paper-item"}} elevation={0}>
                                        <Typography variant="subtitle1" classes={{subtitle1: 'root-paper-item-title'}}> Outstanding Customer Support Make Us Your #1
                                            Choice </Typography>
                                        <Typography variant="inherit" color="textSecondary">
                                            Our focus is your satisfaction and convenience. Reach our
                                            canopy expert whenever you have a question through phone,
                                            online form or chat.
                                        </Typography>
                                    </Paper>
                                </MXContainerPaper>
                            </Container>
                        </CContainer>
                        <CContainer className="extend gray">
                            <Container maxWidth="md">
                                <Typography variant="h5" paragraph={true}> Which tent is right for you? </Typography>
                                <Grid container spacing={6}>
                                    <Grid container item xs={12} md={4} justifyContent='space-between'>
                                        <div className="w-100p">
                                            <div className="position-r" style={{minHeight: 400}}>
                                                <MXImageDisplay src="/images/product/y5-economic-canopy-tent/y5-economic.png" alt="y5-economic"/>
                                                <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}}> Y5 Economic </Typography>
                                                <Typography variant="subtitle2" color="textSecondary" paragraph={true}> For recreational use </Typography>
                                                <Typography variant='body2' color="textSecondary" paragraph={true}>
                                                    Our most economical canopy made out of stable powder-coated steel for everyday usage.
                                                </Typography>
                                            </div>
                                            <MXContainerBuy text={"Starting at $245"} backgroundColor={"#828a90"} href={{pathname: "/y5-economic/buy"}}/>
                                            <Divider/>
                                        </div>
                                    </Grid>
                                    <Grid container item xs={12} md={4} justifyContent='space-between'>
                                        <div className="w-100p">
                                            <div className="position-r" style={{minHeight: 400}}>
                                                <MXImageDisplay src="/images/product/y6-commercial-buy/y6-commercial.png" alt="y6-commercial"/>
                                                <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}}> Y6 Commercial </Typography>
                                                <Typography variant="subtitle2" color="textSecondary" paragraph={true}> For commercial use </Typography>
                                                <Typography variant='body2' color="textSecondary" paragraph={true}>
                                                    Stronger and lighter commercial grade aluminum frame canopy tent for various environments.
                                                </Typography>
                                            </div>
                                            <MXContainerBuy text={"Starting at $445"} backgroundColor={"#828a90"} href={{pathname: "/y6-commercial/buy"}}/>
                                            <Divider/>
                                        </div>
                                        <MXContainerOffer>
                                            <Typography variant="subtitle2" color="inherit"> Limited Time Offer: </Typography>
                                            <Typography variant="caption" display="block" color="textSecondary">
                                                Free wheeled protective covers, tie down straps, steel stakes
                                            </Typography>
                                        </MXContainerOffer>
                                    </Grid>
                                    <Grid container item xs={12} md={4} justifyContent='space-between'>
                                        <div className="w-100p">
                                            <div className="position-r" style={{minHeight: 400}}>
                                                <MXImageDisplay src="/images/product/y7-heavy-duty-canopy-tent/y7-heavy-duty.png" alt="y7-heavy-duty"/>
                                                <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}}> Y7 Heavy Duty </Typography>
                                                <Typography variant="subtitle2" color="textSecondary" paragraph={true}> For heavy duty use </Typography>
                                                <Typography variant='body2' color="textSecondary" paragraph={true}>
                                                    The most heavy duty aluminum frame canopy on the market with unchallenged strength and durability.
                                                </Typography>
                                            </div>
                                            <MXContainerBuy text={"Starting at $619"} backgroundColor={"#828a90"} href={{pathname: "/y7-heavy-duty/buy"}}/>
                                            <Divider/>
                                        </div>
                                        <MXContainerOffer>
                                            <Typography variant="subtitle2" color="inherit"> Limited Time Offer: </Typography>
                                            <Typography variant="caption" display="block" color="textSecondary">
                                                Free wheeled protective covers, tie down straps, steel stakes
                                            </Typography>
                                        </MXContainerOffer>
                                    </Grid>
                                </Grid>
                            </Container>
                        </CContainer>
                        <CContainer>
                            <Container maxWidth="md">
                                <Paper classes={{root: "container-paper-item"}} elevation={0}>
                                    <Grid container alignItems="center">
                                        <Grid container item xs={12} md={6} direction="column" justifyContent="flex-start">
                                            <Typography variant="h5" paragraph={true}> Tents that's Going to Last! </Typography>
                                            <List dense={true}>
                                                <ListItem>
                                                    <ListItemIcon><MXArrowRight/></ListItemIcon>
                                                    <ListItemText secondary="No Rust Commercial Grade Steel/Aluminum Frame"/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon><MXArrowRight/></ListItemIcon>
                                                    <ListItemText secondary="1.5-2.2″ Hex Legs and Ultimate Strength Joints"/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon><MXArrowRight/></ListItemIcon>
                                                    <ListItemText secondary="Safe & Reliable Easily Height Adjustment Brackets"/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon><MXArrowRight/></ListItemIcon>
                                                    <ListItemText secondary="Heavy Duty Waterproof & Fireproof Materials"/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon><MXArrowRight/></ListItemIcon>
                                                    <ListItemText secondary="Up to 10-Year Frame Warranty"/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon><MXArrowRight/></ListItemIcon>
                                                    <ListItemText secondary="Available in 8 Size Options & 6 Color Option"/>
                                                </ListItem>
                                            </List>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <img className="grid-image" src="/images/tent-spec/spec-canopy-tent.png" alt="spec-canopy-tent"/>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Container>
                        </CContainer>
                        <CContainer>
                            <Container maxWidth="md">
                                <Typography variant="h5" paragraph={true}> Available sizes & colors </Typography>
                                <Grid container spacing={2} direction="row" alignItems="center">
                                    <Grid item xs={12} sm={6} md={3}>
                                        <div className="position-r">
                                            <MXImageDisplay src="/images/custom-printed-package/custom-printing-10X10.jpg" alt="custom-printing-10X10"/>
                                        </div>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}}> 10x10 ft </Typography>
                                        <Typography variant="subtitle2" color="textSecondary" paragraph={true}> 10-15 guests </Typography>
                                        <MXContainerBuy buttonText={"Buy Now"} backgroundColor={"#2767c5"}
                                                        href={{pathname: "/custom-printed-package/f1010cpp"}}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <div className="position-r">
                                            <MXImageDisplay src="/images/custom-printed-package/custom-printing-10X15.jpg" alt="custom-printing-10X15"/>
                                        </div>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}}> 10x15 ft </Typography>
                                        <Typography variant="subtitle2" color="textSecondary" paragraph={true}> 15-20 guests </Typography>
                                        <MXContainerBuy buttonText={"Buy Now"} backgroundColor={"#2767c5"}
                                                        href={{pathname: "/custom-printed-package/f1015cpp"}}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <div className="position-r">
                                            <MXImageDisplay src="/images/custom-printed-package/custom-printing-10X20.jpg" alt="custom-printing-10X20"/>
                                        </div>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}}> 10x20 ft </Typography>
                                        <Typography variant="subtitle2" color="textSecondary" paragraph={true}> 20-30 guests </Typography>
                                        <MXContainerBuy buttonText={"Buy Now"} backgroundColor={"#2767c5"}
                                                        href={{pathname: "/custom-printed-package/f1020cpp"}}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <div className="position-r">
                                            <MXImageDisplay src="/images/custom-printed-package/custom-printing-16X16.jpg" alt="custom-printing-16X16"/>
                                        </div>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}}> 16x16 ft </Typography>
                                        <Typography variant="subtitle2" color="textSecondary" paragraph={true}> 25-40 guests </Typography>
                                        <MXContainerBuy buttonText={"Buy Now"} backgroundColor={"#2767c5"}
                                                        href={{pathname: "/custom-printed-package/f1616cpp"}}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <div className="position-r">
                                            <MXImageDisplay src="/images/custom-printed-package/custom-printing-13X13.jpg" alt="custom-printing-13X13"/>
                                        </div>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}}> 13x13 ft </Typography>
                                        <Typography variant="subtitle2" color="textSecondary" paragraph={true}> 15-25 guests </Typography>
                                        <MXContainerBuy buttonText={"Buy Now"} backgroundColor={"#2767c5"}
                                                        href={{pathname: "/custom-printed-package/f1313cpp"}}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <div className="position-r">
                                            <MXImageDisplay src="/images/custom-printed-package/custom-printing-13X20.jpg" alt="custom-printing-13X20"/>
                                        </div>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}}> 13x20 ft </Typography>
                                        <Typography variant="subtitle2" color="textSecondary" paragraph={true}> 25-40 guests </Typography>
                                        <MXContainerBuy buttonText={"Buy Now"} backgroundColor={"#2767c5"}
                                                        href={{pathname: "/custom-printed-package/f1320cpp"}}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <div className="position-r">
                                            <MXImageDisplay src="/images/custom-printed-package/custom-printing-13X26.jpg" alt="custom-printing-13X26"/>
                                        </div>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}}> 13x26 ft </Typography>
                                        <Typography variant="subtitle2" color="textSecondary" paragraph={true}> 30-50 guests </Typography>
                                        <MXContainerBuy buttonText={"Buy Now"} backgroundColor={"#2767c5"}
                                                        href={{pathname: "/custom-printed-package/f1326cpp"}}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <div className="position-r">
                                            <MXImageDisplay src="/images/custom-printed-package/custom-printing-20X20.jpg" alt="custom-printing-20X20"/>
                                        </div>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}}> 20x20 ft </Typography>
                                        <Typography variant="subtitle2" color="textSecondary" paragraph={true}> 40-60 guests </Typography>
                                        <MXContainerBuy buttonText={"Buy Now"} backgroundColor={"#2767c5"}
                                                        href={{pathname: "/custom-printed-package/f2020cpp"}}
                                        />
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

export default Canopy_Tent;
