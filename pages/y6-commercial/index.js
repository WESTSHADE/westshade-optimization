import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Link from "next/link";
import { withRouter } from "next/router";

import { Box, Button, Container, Grid } from "@material-ui/core";

import CanopyAccessory from "../../components/section_canopy_accessories";
import SetUp from "../../components/section_easy_set_up";
import CanopyCompare from "../../components/section_canopy_compare";

function Y6_Overview({ router }) {
	const settings = {
		dots: false,
		fade: true,
		infinite: true,
		autoplay: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	const slideImages = ["/images/y6-canopy-roof-bk.png", "/images/y6-canopy-roof-bu.png", "/images/y6-canopy-roof-gn.png", "/images/y6-canopy-roof-rd.png", "/images/y6-canopy-roof-wh.png", "/images/y6-canopy-roof-ye.png"];

	const [display, setDisplay] = useState(false);

	useEffect(() => setTimeout(() => setDisplay(true), 250), []);

	return (
		<React.Fragment>
			<Box className="page canopy-tent" fontSize={14} lineHeight={1.43}>
				{display ? (
					<>
						<Box className="section-container-extend section-navbar-container">
							<Container maxWidth="md">
								<Grid container alignItems="center">
									<Grid item xs>
										<h2 className="section-navbar-title">Y6 Commercial</h2>
									</Grid>
									<div className="section-navbar-item-group">
										<div className="section-navbar-item disable">
											<Link href="/y6-commercial" disable>
												Overview
											</Link>
										</div>
										<div className="section-navbar-item">
											<Link href="/y6-commercial/specs">Tech Specs</Link>
										</div>
										<Button variant="contained" className="section-navbar-item section-navbar-button" onClick={() => router.push("/y6-commercial/buy/")}>
											Buy
										</Button>
									</div>
								</Grid>
							</Container>
						</Box>
						<Box className="section-container-extend background-gray" style={{ marginTop: "0" }}>
							<div className="position-r">
								<img className="section-image" src="/images/y6-canopy-tent.png" />
							</div>
							<Container maxWidth="sm">
								<h1 className="section-subtitle" style={{ marginTop: "24px" }}>
									Y6 Commercial Aluminum Frame Canopy Hex45
								</h1>
								<h3 className="section-title">Commercial canopy for the regular professional user.</h3>
								<p className="section-content">
									Aerospace grade hexagonal aluminum frame. Commercial grade lightweight canopy shelter.
									<br />
									Easy to assemble. Fire, water, and wind resistant.
								</p>
								<p className="section-content">
									Available in 3 sizes and 6 colors.
									<br />
									From $445 each.
								</p>
							</Container>
						</Box>
						<Box className="section-container" style={{ textAlign: "center" }}>
							<Container maxWidth="sm">
								<h3 className="section-title">Hexagonal aluminum frame canopy. Engineered to last.</h3>
								<p className="section-content-entend">
									Our aerospace-grade hexagonal aluminum frame canopy is the best in the industry.
									<br />
									6063-T5 aluminum is known for its strength and durability.
									<br />
									It is stronger and lighter, and can withstand some of the toughest environments.
								</p>
								{/* <Button variant="contained" className="section-grid-button">
            Learn more about the material
          </Button> */}
							</Container>
						</Box>
						<Box className="section-container-grid">
							<Container maxWidth="md">
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<div className="section-grid-item" style={{ flexDirection: "row", alignItems: "center" }}>
											<div className="section-grid-item-inner">
												<div className="section-subtitle">Adjustable height</div>
												<h3 className="section-title">Adjust in one press.</h3>
												<p className="section-content">
													The instant pop up canopy can easily adjust to 3 different settings, from 5&#39;2&#34; to 6&#39;8&#34;. The height can be modified in one simple press using a convenient thumb release button, at a remarkable speed.
												</p>
											</div>
											<img className="section-grid-image" style={{ padding: "0" }} src="/images/onepress@2x.png" />
										</div>
									</Grid>
									<Grid item xs={12} sm={6}>
										<div className="section-grid-item">
											<div className="section-grid-item-inner">
												<div className="section-subtitle">Bracket connectors</div>
												<h3 className="section-title">
													Aluminum bracket connectors are placed across truss bars, legs, and poles. The built in reinforcing rib structure handles greater wear and tear.
													<br />
													Ultimate strength, stability, and stiffness.
												</h3>
											</div>
											<img className="section-grid-image" src="/images/bracket-connector@2x.png" />
										</div>
									</Grid>
									<Grid item xs={12} sm={6}>
										<div className="section-grid-item ">
											<div className="section-grid-item-inner">
												<div className="section-subtitle">Additional connecting poles</div>
												<h3 className="section-title">
													Additional aluminum connecting poles.
													<br />
													Extra support and durability.
												</h3>
											</div>
											<img className="section-grid-image" src="/images/connecting-poles@2x.png" />
										</div>
									</Grid>
									<Grid item xs={12} sm={4}>
										<div className="section-grid-item">
											<div className="section-grid-item-inner">
												<div className="section-subtitle">Nuts and bolts</div>
												<h3 className="section-title">
													Stainless steel nuts and bolts.
													<br />
													Easily replaceable.
												</h3>
											</div>
											<img className="section-grid-image" src="/images/nuts-and-bolts@2x.png" />
										</div>
									</Grid>
									<Grid item xs={12} sm={4}>
										<div className="section-grid-item ">
											<div className="section-grid-item-inner">
												<div className="section-subtitle">Pole dimensions</div>
												<h3 className="section-title">
													Each pole has a<br />
													<br />
													1.5mm thickness.
													<br />
													45mm diameter.
												</h3>
											</div>
											<img className="section-grid-image" src="/images/pole@2x.png" />
										</div>
									</Grid>
									<Grid item xs={12} sm={4}>
										<div className="section-grid-item ">
											<div className="section-grid-item-inner">
												<div className="section-subtitle">Footpads</div>
												<h3 className="section-title">Heavy duty zinc coated steel footpads. Guaranteed sturdy structure.</h3>
											</div>
											<img className="section-grid-image" src="/images/footpads@2x.png" />
										</div>
									</Grid>
								</Grid>
							</Container>
						</Box>
						<Box className="section-container" style={{ textAlign: "center" }}>
							<Container maxWidth="sm" style={{ marginBottom: "-50px" }}>
								<h3 className="section-title">Personalized options for better branding.</h3>
								<p className="section-content">
									The optimal advertising solution for indoor and outdoor events.
									<br />
									Choose from 6 available colors or fully customeize the canopy to suit your needs.
								</p>
							</Container>
							<Slider {...settings}>
								{slideImages.map((image, index) => (
									<img key={index} src={image} className="section-image" />
								))}
							</Slider>
						</Box>
						<Box className="section-container-grid">
							<Container maxWidth="md">
								<Grid container spacing={2} className="section-grid-item" alignItems="center" style={{ flexDirection: "row" }}>
									<Grid item xs={12} md={8}>
										<div style={{ flexDirection: "row", alignItems: "center" }}>
											<div className="section-grid-item-inner">
												<div className="section-subtitle">Custom printed canopies</div>
												<h3 className="section-title">Custom printed canopies with full color dye sublimation or UV printing.</h3>
												<p className="section-content">Customize your heavy duty canopy design with your logo or messages to promote your products. It is extremely simple yet highly impactful.</p>
												<Button variant="contained" className="section-grid-button" onClick={() => router.push("/products/custom-printing")}>
													See how custom printing works
												</Button>
											</div>
										</div>
									</Grid>
									<Grid item xs={12} md={4}>
										<img className="section-grid-image" src="/images/printed-canopy@1x.png" />
									</Grid>
								</Grid>
							</Container>
						</Box>
						<CanopyAccessory />
						<SetUp />
						<CanopyCompare />
					</>
				) : null}
			</Box>
		</React.Fragment>
	);
}

export default withRouter(Y6_Overview);
