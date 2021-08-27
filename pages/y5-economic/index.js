import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Link from "next/link";
import {withRouter} from "next/router";

import {Box, Button, Container, Grid} from "@material-ui/core";

import CanopyAccessory from "../../components/section_canopy_accessories";
import SetUp from "../../components/section_easy_set_up";
import CanopyCompare from "../../components/section_canopy_compare";

function Y5_Overview({router}) {
    const settings = {
        dots: false,
        fade: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const slideImages = [
        "/images/y5-canopy-roof-bk.png",
        "/images/y5-canopy-roof-bu.png",
        "/images/y5-canopy-roof-gn.png",
        "/images/y5-canopy-roof-rd.png",
        "/images/y5-canopy-roof-wh.png",
        "/images/y5-canopy-roof-ye.png",
    ];

    const [display, setDisplay] = useState(false);

    useEffect(() => {
        setTimeout(() => setDisplay(true), 250);
    }, []);

    return (
        <React.Fragment>
            <Box className="page canopy-tent" fontSize={14} lineHeight={1.43}>
                {display ? (
                    <>
                        <Box className="section-container-extend section-navbar-container">
                            <Container maxWidth="md">
                                <Grid container alignItems="center">
                                    <Grid item xs>
                                        <h2 className="section-navbar-title">Y5 Economic</h2>
                                    </Grid>
                                    <div className="section-navbar-item-group">
                                        <div className="section-navbar-item disable">
                                            <Link href="/y5-economic" disable>
                                                Overview
                                            </Link>
                                        </div>
                                        <div className="section-navbar-item">
                                            <Link href="/y5-economic/specs">Tech Specs</Link>
                                        </div>
                                        <Button
                                            variant="contained"
                                            className="section-navbar-item section-navbar-button"
                                            onClick={() => router.push({pathname: '/y5-economic/buy',})}
                                        >
                                            Buy
                                        </Button>
                                    </div>
                                </Grid>
                            </Container>
                        </Box>
                        <Box className="section-container-extend background-gray" style={{marginTop: "0"}}>
                            <Container maxWidth="sm">
                                <div className="position-r">
                                    <img className="section-image" src="/images/y5-canopy-tent.png"/>
                                </div>
                                <h1 className="section-subtitle" style={{marginTop: "24px"}}>
                                    Y5 Economic Classic Steel Canopy Hex45
                                </h1>
                                <h3 className="section-title">
                                    The Best Outdoor Patio Canopy Perfect for Everyday Use.
                                </h3>
                                <p className="section-content">
                                    The perfect outdoor patio canopy for enjoying local scenery right at
                                    your feet! Furthermore, our steel made canopy comes with a weather
                                    resistant top covering for easy installation.
                                </p>
                                <p className="section-content">
                                    Available in 3 sizes and 6 colors.
                                    <br/>
                                    From $610 each.
                                </p>
                            </Container>
                        </Box>
                        <Box className="section-container" style={{textAlign: "center"}}>
                            <Container maxWidth="sm">
                                <h3 className="section-title">
                                    Economical Steel Material Built for Excellent Performance.
                                </h3>
                                <p className="section-content-entend">
                                    We design our steel canopy frames to be resistant against rusts,
                                    stains, and mildews for better performance all year round. In
                                    addition, this is the
                                    <br/>
                                    perfect friendly budget outdoor patio canopy for everyday usage at
                                    anytime.
                                </p>
                            </Container>
                        </Box>
                        <Box className="section-container-grid">
                            <Container maxWidth="md">
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <div
                                            className="section-grid-item"
                                            style={{flexDirection: "row", alignItems: "center"}}
                                        >
                                            <div className="section-grid-item-inner">
                                                <div className="section-subtitle">Adjustable height</div>
                                                <h3 className="section-title">
                                                    One Button. No Hassle, Faster Set-up.
                                                </h3>
                                                <p className="section-content">
                                                    With our thumb release button system, we make every steel
                                                    canopy installment fast and smooth in just seconds!
                                                    Secondly, the height can be easily adjusted to 3 different
                                                    settings, from 5&#39;2&#34; to 6&#39;8&#34; at a remarkable
                                                    speed.
                                                </p>
                                            </div>
                                            <img
                                                className="section-grid-image"
                                                style={{padding: "0"}}
                                                src="/images/onepress@1x.png"
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <div className="section-grid-item">
                                            <div className="section-grid-item-inner">
                                                <div className="section-subtitle">Bracket connectors</div>
                                                <h3 className="section-title">
                                                    Additional aluminum connecting poles.
                                                    <br/>
                                                    Extra support and durability.
                                                </h3>
                                            </div>
                                            <img
                                                className="section-grid-image"
                                                src="/images/bracket-connector@1x.png"
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <div className="section-grid-item ">
                                            <div className="section-grid-item-inner">
                                                <div className="section-subtitle">
                                                    Additional connecting poles
                                                </div>
                                                <h3 className="section-title">
                                                    One Button. No Hassle, Faster Set-up.
                                                </h3>
                                            </div>
                                            <img
                                                className="section-grid-image"
                                                src="/images/connecting-poles@1x.png"
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <div className="section-grid-item">
                                            <div className="section-grid-item-inner">
                                                <div className="section-subtitle">Nuts and bolts</div>
                                                <h3 className="section-title">
                                                    Zinc coated nuts and bolts for easy replacement.
                                                </h3>
                                            </div>
                                            <img
                                                className="section-grid-image"
                                                src="/images/nuts-and-bolts@1x.png"
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <div className="section-grid-item ">
                                            <div className="section-grid-item-inner">
                                                <div className="section-subtitle">Pole dimensions</div>
                                                <h3 className="section-title">
                                                    Each pole has a<br/>
                                                    <br/>
                                                    1.5mm thickness.
                                                    <br/>
                                                    45mm diameter.
                                                </h3>
                                            </div>
                                            <img className="section-grid-image" src="/images/pole@1x.png"/>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <div className="section-grid-item ">
                                            <div className="section-grid-item-inner">
                                                <div className="section-subtitle">Footpads</div>
                                                <h3 className="section-title">
                                                    Zinc coated steel footpads. Guaranteed sturdy structure.
                                                </h3>
                                            </div>
                                            <img
                                                className="section-grid-image"
                                                src="/images/footpads@1x.png"
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Box>
                        <Box className="section-container" style={{textAlign: "center"}}>
                            <Container maxWidth="sm" style={{marginBottom: "-50px"}}>
                                <h3 className="section-title">
                                    Personalized options for better branding.
                                </h3>
                                <p className="section-content">
                                    The optimal advertising solution for indoor and outdoor events.
                                    <br/>
                                    Choose from 6 available colors or fully customeize the canopy to
                                    suit your needs.
                                </p>
                            </Container>
                            <Slider {...settings}>
                                {slideImages.map((image, index) => (
                                    <img key={index} src={image} className="section-image"/>
                                ))}
                            </Slider>
                        </Box>
                        <Box className="section-container-grid">
                            <Container maxWidth="md">
                                <Grid
                                    container
                                    spacing={2}
                                    className="section-grid-item"
                                    alignItems="center"
                                    style={{flexDirection: "row"}}
                                >
                                    <Grid item xs={12} md={8}>
                                        <div style={{flexDirection: "row", alignItems: "center"}}>
                                            <div className="section-grid-item-inner">
                                                <div className="section-subtitle">
                                                    Custom printed canopies
                                                </div>
                                                <h3 className="section-title">
                                                    Custom printed canopies with full color dye sublimation or
                                                    UV printing.
                                                </h3>
                                                <p className="section-content">
                                                    Customize your heavy duty canopy design with your logo or
                                                    messages to promote your products. It is extremely simple
                                                    yet highly impactful.
                                                </p>
                                                <Button
                                                    variant="contained"
                                                    className="section-grid-button"
                                                    onClick={() => router.push("/products/custom-printing")}
                                                >
                                                    See how custom printing works
                                                </Button>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <img
                                            className="section-grid-image"
                                            src="/images/printed-canopy@1x.png"
                                        />
                                    </Grid>
                                </Grid>
                            </Container>
                        </Box>
                        <CanopyAccessory/>
                        <SetUp/>
                        <CanopyCompare/>
                    </>
                ) : null}
            </Box>
        </React.Fragment>
    );
}

export default withRouter(Y5_Overview);
