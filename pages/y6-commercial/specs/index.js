import Link from "next/link";
import {useRouter} from "next/router";

import {
    Box,
    Button,
    Breadcrumbs,
    Container,
    Divider,
    Grid,
    Typography,
} from "@material-ui/core";

function handleClick(event) {
    event.preventDefault();
}

export default function Y6_Specs() {
    const router = useRouter();

    return (
        <div className="canopy-tent-specs">
            <Box className="section-container-extend section-navbar-container border-bottom">
                <Container maxWidth="md">
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <h2 className="section-navbar-title">Y6 Commercial</h2>
                        </Grid>
                        <div className="section-navbar-item-group">
                            <div className="section-navbar-item ">
                                <Link href="/y6-commercial">Overview</Link>
                            </div>
                            <div className="section-navbar-item disable">
                                <Link href="/y6-commercial/specs" disable>
                                    Tech Specs
                                </Link>
                            </div>
                            <Button
                                variant="contained"
                                className="section-navbar-item section-navbar-button"
                                onClick={() => router.push("/y6-commercial/buy/")}
                            >
                                Buy
                            </Button>
                        </div>
                    </Grid>
                </Container>
            </Box>
            <div className="section-container-breadcrumbs">
                <Container maxWidth="md">
                    <Breadcrumbs classes={{li: "root-breadcrumbs-text"}}>
                        <Link color="inherit" href="/"
                              onClick={(event) => event.preventDefault()}>
                            Home
                        </Link>
                        <Link color="inherit" href="/y6-commercial" onClick={(event) => event.preventDefault()}>
                            Y6 Commercial
                        </Link>
                        <Typography variant="inherit" color="textPrimary">Specs</Typography>
                    </Breadcrumbs>
                </Container>
            </div>
            <Box className="section-container" style={{marginTop: "0", textAlign: "center"}}>
                <Container maxWidth="sm">
                    <h1 className="section-subtitle" style={{fontWeight: "bold"}}>
                        Y6 Commercial Specifications
                    </h1>
                    <div className="position-r">
                        <img className="section-image" src="/images/y6-canopy-tent.png"/>
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
                                <p className="section-content">6063-T5 aluminum</p>
                            </div>
                            <div className="section-container-text">
                                <h6 className="section-subtitle">Bracket connectors</h6>
                                <p className="section-content">Aluminum</p>
                            </div>
                            <div className="section-container-text">
                                <h6 className="section-subtitle">Height adjustor</h6>
                                <p className="section-content">Push button</p>
                            </div>
                            <div className="section-container-text">
                                <h6 className="section-subtitle">Nuts and bolts</h6>
                                <p className="section-content">Stainless steel</p>
                            </div>
                            <div className="section-container-text">
                                <h6 className="section-subtitle">Plastic parts</h6>
                                <p className="section-content">Nylon</p>
                            </div>
                            <div className="section-container-text">
                                <h6 className="section-subtitle">Footplate</h6>
                                <p className="section-content">
                                    4&#39; x 4&#39; zinc coated steel
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
                            <h3 className="section-title">Frame Measurements​​</h3>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <div className="section-container-text">
                                <h6 className="section-subtitle">Outer leg diameter</h6>
                                <p className="section-content">1.75 inches (45mm)</p>
                            </div>
                            <div className="section-container-text">
                                <h6 className="section-subtitle">Outer leg thickness</h6>
                                <p className="section-content">0.06 inches (1.5mm)</p>
                            </div>
                            <div className="section-container-text">
                                <h6 className="section-subtitle">Truss bar height</h6>
                                <p className="section-content">26mm</p>
                            </div>
                            <div className="section-container-text">
                                <h6 className="section-subtitle">Truss bar width</h6>
                                <p className="section-content">13mm</p>
                            </div>
                            <div className="section-container-text">
                                <h6 className="section-subtitle">Truss bar depth</h6>
                                <p className="section-content">1mm</p>
                            </div>
                            <div className="section-container-text">
                                <h6 className="section-subtitle">Truss bar structure</h6>
                                <p className="section-content">Built-in reinforcing rib</p>
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
                            <h3 className="section-title">
                                Roof and Sidewalls Specifications​
                            </h3>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <div className="section-container-text">
                                <h6 className="section-subtitle">Fabric</h6>
                                <p className="section-content">
                                    500D Polyester with PVC coating 320gsm
                                </p>
                            </div>
                            <div className="section-container-text">
                                <h6 className="section-subtitle">Function</h6>
                                <p className="section-content">
                                    Waterproof, CPAI-84 certified fire retardant, UV protection
                                </p>
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
                                <p className="section-content">10&#39;10&#34; (3.28m)</p>
                            </div>
                            <div className="section-container-text">
                                <h6 className="section-subtitle">Height adjustment</h6>
                                <p className="section-content">3 positions</p>
                            </div>
                            <div className="section-container-text">
                                <h6 className="section-subtitle">Clearance height</h6>
                                <p className="section-content">
                                    5&#39;2&#34; (158cm)
                                    <br/>
                                    6&#39;1&#34; (187cm)
                                    <br/>
                                    6&#39;8&#34; (203cm)
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
                                <p className="section-content">10 inches (27cm)</p>
                            </div>
                            <div className="section-container-text">
                                <h6 className="section-subtitle">Depth</h6>
                                <p className="section-content">11 inches (29cm)</p>
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
                            <h3 className="section-title">Warranty​</h3>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <div className="section-container-text">
                                <h6 className="section-subtitle">Frame</h6>
                                <p className="section-content">5 year</p>
                            </div>
                            <div className="section-container-text">
                                <h6 className="section-subtitle">Roof</h6>
                                <p className="section-content">1 year</p>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    );
}
