import React, {useEffect, useState} from "react";

import Link from "next/link";
import {withRouter} from "next/router";

import {Box, Button, Container, Divider, Grid} from "@material-ui/core";

function Y5_Specs({router}) {
    const [display, setDisplay] = useState(false);

    useEffect(() => setTimeout(() => setDisplay(true), 250), []);

    return (
        <React.Fragment>
            {display ? (
                <Box className="page canopy-tent-specs" fontSize={14} lineHeight={1.43}>
                    <Box className="section-container-extend section-navbar-container border-bottom">
                        <Container maxWidth="md">
                            <Grid container alignItems="center">
                                <Grid item xs>
                                    <h2 className="section-navbar-title">Y5 Economic</h2>
                                </Grid>
                                <div className="section-navbar-item-group">
                                    <div className="section-navbar-item ">
                                        <Link href="/y5-economic">Overview</Link>
                                    </div>
                                    <div className="section-navbar-item disable">
                                        <Link href="/y5-specs" disable>
                                            Tech Specs
                                        </Link>
                                    </div>
                                    <Button variant="contained" className="section-navbar-item section-navbar-button" onClick={() => router.push({pathname: "/y5-economic/buy"})}>
                                        Buy
                                    </Button>
                                </div>
                            </Grid>
                        </Container>
                    </Box>
                    <Box className="section-container" style={{marginTop: "0", textAlign: "center"}}>
                        <Container maxWidth="sm">
                            <h1 className="section-subtitle" style={{fontWeight: "bold"}}>
                                Y5 Economic Specifications
                            </h1>
                            <div className="position-r">
                                <img className="section-image" src="/images/y5-canopy-tent.png"/>
                            </div>
                        </Container>
                    </Box>
                    <Box className="section-container-specs">
                        <Container maxWidth="sm">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <h3 className="section-title">Size</h3>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <p className="section-content">10’ x 10’</p>
                                    <p className="section-content">10’ x 15’</p>
                                    <p className="section-content">10’ x 20’</p>
                                </Grid>
                            </Grid>
                            <Divider/>
                        </Container>
                    </Box>
                    <Box className="section-container-specs">
                        <Container maxWidth="sm">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <h3 className="section-title">Color</h3>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <p className="section-content">White</p>
                                    <p className="section-content">Black</p>
                                    <p className="section-content">Red</p>
                                    <p className="section-content">Yellow</p>
                                    <p className="section-content">Blue</p>
                                    <p className="section-content">Green</p>
                                </Grid>
                            </Grid>
                            <Divider/>
                        </Container>
                    </Box>
                    <Box className="section-container-specs">
                        <Container maxWidth="sm">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <h3 className="section-title">Frame Specifications​</h3>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Frame material</h6>
                                        <p className="section-content">Steel with powder coating</p>
                                    </div>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Bracket connectors</h6>
                                        <p className="section-content">Nylon</p>
                                    </div>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Height adjustor</h6>
                                        <p className="section-content">Push button</p>
                                    </div>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Nuts and bolts</h6>
                                        <p className="section-content">Zinc coated</p>
                                    </div>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Plastic parts</h6>
                                        <p className="section-content">Nylon</p>
                                    </div>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Footplate</h6>
                                        <p className="section-content">Triangular zinc coated steel</p>
                                    </div>
                                </Grid>
                            </Grid>
                            <Divider/>
                        </Container>
                    </Box>
                    <Box className="section-container-specs">
                        <Container maxWidth="sm">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <h3 className="section-title">Frame Measurements​​</h3>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Outer leg diameter</h6>
                                        <p className="section-content">1.75 inches (45mm)</p>
                                    </div>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Outer leg thickness</h6>
                                        <p className="section-content">0.05 inches (1.2mm)</p>
                                    </div>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Truss bar height</h6>
                                        <p className="section-content">25mm</p>
                                    </div>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Truss bar width</h6>
                                        <p className="section-content">12.5mm</p>
                                    </div>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Truss bar depth</h6>
                                        <p className="section-content">1.2mm</p>
                                    </div>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Truss bar structure</h6>
                                        <p className="section-content">Rectangle</p>
                                    </div>
                                </Grid>
                            </Grid>
                            <Divider/>
                        </Container>
                    </Box>
                    <Box className="section-container-specs">
                        <Container maxWidth="sm">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <h3 className="section-title">Roof and Sidewalls Specifications​</h3>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Fabric</h6>
                                        <p className="section-content">500D Polyester with PVC coating 320gsm</p>
                                    </div>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Function</h6>
                                        <p className="section-content">Waterproof, CPAI-84 certified fire retardant, UV protection</p>
                                    </div>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Reinforcement</h6>
                                        <p className="section-content">All stress points</p>
                                    </div>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Roof connected wall</h6>
                                        <p className="section-content">2 inch (5cm) velcro</p>
                                    </div>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Wall connector</h6>
                                        <p className="section-content">#8 resin zipper</p>
                                    </div>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Roof tension</h6>
                                        <p className="section-content">Spring</p>
                                    </div>
                                </Grid>
                            </Grid>
                            <Divider/>
                        </Container>
                    </Box>
                    <Box className="section-container-specs">
                        <Container maxWidth="sm">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <h3 className="section-title">Height Measurements</h3>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Peak height</h6>
                                        <p className="section-content">10&#39;15&#34; (3.43m)</p>
                                    </div>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Height adjustment</h6>
                                        <p className="section-content">3 positions</p>
                                    </div>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Clearance height</h6>
                                        <p className="section-content">
                                            6&#39;3&#34; (190cm)
                                            <br/>
                                            6&#39;7&#34; (200cm)
                                            <br/>
                                            6&#39;10&#34; (208cm)
                                        </p>
                                    </div>
                                </Grid>
                            </Grid>
                            <Divider/>
                        </Container>
                    </Box>
                    <Box className="section-container-specs">
                        <Container maxWidth="sm">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <h3 className="section-title">Package Measurements</h3>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Height</h6>
                                        <p className="section-content">65 inches (165cm)</p>
                                    </div>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Width</h6>
                                        <p className="section-content">11 inches (28cm)</p>
                                    </div>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Depth</h6>
                                        <p className="section-content">11 inches (28cm)</p>
                                    </div>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Weight</h6>
                                        <p className="section-content">78.8 lb (35.8kg)</p>
                                    </div>
                                </Grid>
                            </Grid>
                            <Divider/>
                        </Container>
                    </Box>
                    <Box className="section-container-specs" style={{marginBottom: "60px"}}>
                        <Container maxWidth="sm">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <h3 className="section-title">Warranty</h3>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Frame</h6>
                                        <p className="section-content">1 year</p>
                                    </div>
                                    <div className="section-container-text">
                                        <h6 className="section-subtitle">Roof</h6>
                                        <p className="section-content">1 year</p>
                                    </div>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Box>
            ) : null}
        </React.Fragment>
    );
}

export default withRouter(Y5_Specs);
