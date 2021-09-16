import React, { useEffect, useState } from "react";

import Link from "next/link";
import { withRouter } from "next/router";

import { Box, Button, Breadcrumbs, Container, Grid, List, ListItem, ListItemText, Typography } from "@material-ui/core";

import CBreadcrumbs from "../components/breadcrumbs";
import CContainer from "../components/container";
import SectionSocialGroup from "../components/section_social_group";

function Compare({ router }) {
	const [display, setDisplay] = useState(false);

	useEffect(() => setTimeout(() => setDisplay(true), 250), []);

	return (
		<React.Fragment>
			<Box className="page canopy-tent-package" fontSize={14} lineHeight={1.43}>
				{display ? (
					<>
						<CBreadcrumbs>
							<Container maxWidth="md">
								<Breadcrumbs classes={{ li: "root-breadcrumbs-text" }}>
									<Link color="inherit" href="/" onClick={(event) => event.preventDefault()}>
										Home
									</Link>
									<Link color="inherit" href="/canopy-tent" onClick={(event) => event.preventDefault()}>
										Canopy Tent
									</Link>
									<Typography variant="inherit" color="textPrimary">
										Series Compare
									</Typography>
								</Breadcrumbs>
							</Container>
						</CBreadcrumbs>
						<CContainer>
							<Container maxWidth="md">
								<h3 className="section-title" style={{ marginTop: "0" }}>
									Compare pop up canopy series
								</h3>
								<Grid container spacing={2}>
									<Grid item xs={4}>
										<div
											className="section-container-grid"
											style={{
												width: "90%",
												height: "100%",
												justifyContent: "space-between",
												flexDirection: "column",
												display: "flex",
											}}
										>
											<div>
												<div className="position-r">
													<img className="section-image" src="/images/rectangle-40-1@2x.png" />
												</div>
												<h3 className="section-title">Y5 Economic</h3>
												<p className="section-subtitle">For recreational use</p>
												<p className="section-content">Our most economical canopy made out of stable powder-coated steel for everyday usage.</p>
											</div>
											<div style={{ marginBottom: "18px" }}>
												<div
													style={{
														display: "flex",
														flexWrap: "wrap",
														marginBottom: "18px",
														justifyContent: "center",
													}}
												>
													<div className="color-dot-black" />
													<div className="color-dot-white" />
													<div className="color-dot-red" />
													<div className="color-dot-blue" />
													<div className="color-dot-yellow" />
													<div className="color-dot-green" />
												</div>
												<p className="section-content">Starting at $245</p>
												<Button variant="contained" className="section-grid-button" onClick={() => router.push({ pathname: "/y5-economic/buy" })}>
													Buy
												</Button>
											</div>
										</div>
									</Grid>
									<Grid item xs={4}>
										<div
											className="section-container-grid"
											style={{
												width: "90%",
												height: "100%",
												justifyContent: "space-between",
												flexDirection: "column",
												display: "flex",
											}}
										>
											<div>
												<div className="position-r">
													<img className="section-image" src="/images/rectangle-41-1@2x.png" />
												</div>
												<h3 className="section-title">Y6 Commercial</h3>
												<p className="section-subtitle">For commercial use</p>
												<p className="section-content">Stronger and lighter commercial grade aluminum frame canopy tent for various environments.</p>
											</div>
											<div style={{ marginBottom: "18px" }}>
												<div
													style={{
														display: "flex",
														flexWrap: "wrap",
														marginBottom: "18px",
														justifyContent: "center",
													}}
												>
													<div className="color-dot-black" />
													<div className="color-dot-white" />
													<div className="color-dot-red" />
													<div className="color-dot-blue" />
													<div className="color-dot-yellow" />
													<div className="color-dot-green" />
												</div>
												<p className="section-content">Starting at $445</p>
												<Button variant="contained" className="section-grid-button" onClick={() => router.push("/y6-commercial/buy/")}>
													Buy
												</Button>
											</div>
										</div>
									</Grid>
									<Grid item xs={4}>
										<div
											className="section-container-grid"
											style={{
												width: "90%",
												height: "100%",
												justifyContent: "space-between",
												flexDirection: "column",
												display: "flex",
											}}
										>
											<div>
												<div className="position-r">
													<img className="section-image" src="/images/rectangle-42-6@2x.png" />
												</div>
												<h3 className="section-title">Y7 Heavy Duty</h3>
												<p className="section-subtitle">For heavy duty use</p>
												<p className="section-content">The most heavy duty aluminum frame canopy on the market with unchallenged strength and durability.</p>
											</div>
											<div style={{ marginBottom: "18px" }}>
												<div
													style={{
														display: "flex",
														flexWrap: "wrap",
														marginBottom: "18px",
														justifyContent: "center",
													}}
												>
													<div className="color-dot-black" />
													<div className="color-dot-white" />
													<div className="color-dot-red" />
													<div className="color-dot-blue" />
													<div className="color-dot-yellow" />
													<div className="color-dot-green" />
												</div>
												<p className="section-content">Starting at $619</p>
												<Button variant="contained" className="section-grid-button" onClick={() => router.push("/y7-heavy-duty/buy/")}>
													Buy
												</Button>
											</div>
										</div>
									</Grid>
								</Grid>
								<Box className="section-container" style={{ textAlign: "center" }}>
									<ListItem className="section-canopy-tent-listItem">
										<ListItemText primary={"Size"} />
									</ListItem>
									<Grid container>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"10'x10'"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"10'x15'"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"10'x20'"} />
												</ListItem>
											</List>
										</Grid>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"10'x10'"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"10'x15'"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"10'x20'"} />
												</ListItem>
											</List>
										</Grid>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"10'x10'"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"10'x15'"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"10'x20'"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"13'x13'"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"13'x20'"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"13'x26'"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"16'x16'"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"20'x20'"} />
												</ListItem>
											</List>
										</Grid>
									</Grid>
								</Box>
								<Box className="section-container" style={{ textAlign: "center" }}>
									<ListItem className="section-canopy-tent-listItem">
										<ListItemText primary={"Color"} />
									</ListItem>
									<Grid container>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"White"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Black"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Red"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Yellow"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Blue"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Green"} />
												</ListItem>
											</List>
										</Grid>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"White"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Black"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Red"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Yellow"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Blue"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Green"} />
												</ListItem>
											</List>
										</Grid>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"White"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Black"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Red"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Yellow"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Blue"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Green"} />
												</ListItem>
											</List>
										</Grid>
									</Grid>
								</Box>
								<Box className="section-container" style={{ textAlign: "center" }}>
									<ListItem className="section-canopy-tent-listItem">
										<ListItemText primary={"Frame Specifications"} />
									</ListItem>
									<Grid container>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Frame Material"} secondary={"Powder-coated steel"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Outer Leg Shape"} secondary={"Hexagonal"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Bracket Connectors"} secondary={"Nylon"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Height Adjustment"} secondary={"Push button"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Nuts and Bolts"} secondary={"Zinc coated steel"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Plastic parts"} secondary={"Nylon"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Footplate"} secondary={"Triangular zinc coated steel"} />
												</ListItem>
											</List>
										</Grid>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Frame Material"} secondary={"6063-T5 Aluminum"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Outer Leg Shape"} secondary={"Hexagonal"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Bracket Connectors"} secondary={"6063-T5 Aluminum"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Height Adjustment"} secondary={"Push button"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Nuts and Bolts"} secondary={"Stainless steel"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Plastic parts"} secondary={"Nylon"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Footplate"} secondary={"4' x 4' zinc coated steel"} />
												</ListItem>
											</List>
										</Grid>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Frame Material"} secondary={"6063-T5 Aluminum"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Outer Leg Shape"} secondary={"Hexagonal"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Bracket Connectors"} secondary={"6063-T5 Aluminum"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Height Adjustment"} secondary={"Push button"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Nuts and Bolts"} secondary={"Stainless steel"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Plastic parts"} secondary={"Nylon"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Footplate"} secondary={"4' x 4' zinc coated steel"} />
												</ListItem>
											</List>
										</Grid>
									</Grid>
								</Box>
								<Box className="section-container" style={{ textAlign: "center" }}>
									<ListItem className="section-canopy-tent-listItem">
										<ListItemText primary={"Frame Measurements"} />
									</ListItem>
									<Grid container>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Outer Leg Diameter"} secondary={"1.75 inches (45mm)"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Outer Leg Thickness"} secondary={"0.05 inches (1.2mm)"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Truss bar height"} secondary={"25mm"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Truss bar width"} secondary={"12.5mm"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Truss bar depth"} secondary={"1.2mm"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"-"} secondary={"-"} />
												</ListItem>
											</List>
										</Grid>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Outer Leg Diameter"} secondary={"1.75 inches (45mm)"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Outer Leg Thickness"} secondary={"0.06 inches (1.5mm)"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Truss bar height"} secondary={"26mm"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Truss bar width"} secondary={"13mm"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Truss bar depth"} secondary={"1mm"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Truss bar structure"} secondary={"Built-in reinforcing rib"} />
												</ListItem>
											</List>
										</Grid>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Outer Leg Diameter"} secondary={"2.25 inches (57mm)"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Outer Leg Thickness"} secondary={"0.07 inches (1.8mm)"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Truss bar height"} secondary={"35mm"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Truss bar width"} secondary={"17mm"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Truss bar depth"} secondary={"1.8mm"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Truss bar structure"} secondary={"Built-in reinforcing rib"} />
												</ListItem>
											</List>
										</Grid>
									</Grid>
								</Box>
								<Box className="section-container" style={{ textAlign: "center" }}>
									<ListItem className="section-canopy-tent-listItem">
										<ListItemText primary={"Roof and Sidewalls Specifications"} />
									</ListItem>
									<Grid container>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Fabric"} secondary={"500D Polyester with PVC coating 320gsm"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Function"} secondary={"Waterproof, CPAI-84 certified fire retardant, UV protection"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Reinforcement"} secondary={"26mm"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Roof connected wall"} secondary={"2 inch (5cm) velcro"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Wall connector"} secondary={"#8 resin zipper"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Roof tension"} secondary={"Spring"} />
												</ListItem>
											</List>
										</Grid>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Fabric"} secondary={"500D Polyester with PVC coating 320gsm"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Function"} secondary={"Waterproof, CPAI-84 certified fire retardant, UV protection"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Reinforcement"} secondary={"26mm"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Roof connected wall"} secondary={"2 inch (5cm) velcro"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Wall connector"} secondary={"#8 resin zipper"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Roof tension"} secondary={"Spring"} />
												</ListItem>
											</List>
										</Grid>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Fabric"} secondary={"500D Polyester with PVC coating 320gsm"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Function"} secondary={"Waterproof, CPAI-84 certified fire retardant, UV protection"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Reinforcement"} secondary={"26mm"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Roof connected wall"} secondary={"2 inch (5cm) velcro"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Wall connector"} secondary={"#8 resin zipper"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Roof tension"} secondary={"Spring"} />
												</ListItem>
											</List>
										</Grid>
									</Grid>
								</Box>
								<Box className="section-container" style={{ textAlign: "center" }}>
									<ListItem className="section-canopy-tent-listItem">
										<ListItemText primary={"Height Measurements"} />
									</ListItem>
									<Grid container>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Peak height"} secondary={`10'15" (3.43m)`} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Height adjustment"} secondary={"3 positions"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText
														className="section-canopy-tent-listItem-content"
														primary={"Clearance height"}
														secondary={
															<>
																<div>6'3" (190cm)</div>
																<div>6'7" (200cm)</div>
																<div>6'10" (208cm)</div>
															</>
														}
													/>
												</ListItem>
											</List>
										</Grid>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Peak height"} secondary={`10'10" (3.28m)`} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Height adjustment"} secondary={"3 positions"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText
														className="section-canopy-tent-listItem-content"
														primary={"Clearance height"}
														secondary={
															<>
																<div>5'2" (158cm)</div>
																<div>6'1" (187cm)</div>
																<div>6'8" (203cm)</div>
															</>
														}
													/>
												</ListItem>
											</List>
										</Grid>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Peak height"} secondary={`10'10" (3.28m)`} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Height adjustment"} secondary={"3 positions"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText
														className="section-canopy-tent-listItem-content"
														primary={"Clearance height"}
														secondary={
															<>
																<div>5'2" (158cm)</div>
																<div>6'1" (187cm)</div>
																<div>6'8" (203cm)</div>
															</>
														}
													/>
												</ListItem>
											</List>
										</Grid>
									</Grid>
								</Box>
								<Box className="section-container" style={{ textAlign: "center" }}>
									<ListItem className="section-canopy-tent-listItem">
										<ListItemText primary={"Package Measurements"} />
									</ListItem>
									<Grid container>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Height"} secondary={"65 inches (165cm)"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Width"} secondary={"11 inches (28cm)"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Depth"} secondary={"11 inches (28cm)"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Weight"} secondary={"78.8 lb (35.8kg)"} />
												</ListItem>
											</List>
										</Grid>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Height"} secondary={"65 inches (165cm)"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Width"} secondary={"10 inches (27cm)"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Depth"} secondary={"11 inches (29cm)"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Weight"} secondary={"71.8 lb (32.6kg)"} />
												</ListItem>
											</List>
										</Grid>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Height"} secondary={"65 inches (165cm)"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Width"} secondary={"13 inches (34cm)"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Depth"} secondary={"13 inches (34cm)"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Weight"} secondary={"71.8 lb (32.6kg)"} />
												</ListItem>
											</List>
										</Grid>
									</Grid>
								</Box>
								<Box className="section-container" style={{ textAlign: "center" }}>
									<ListItem className="section-canopy-tent-listItem">
										<ListItemText primary={"Warrenty"} />
									</ListItem>
									<Grid container>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Frame"} secondary={"1 year"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Roof"} secondary={"1 year"} />
												</ListItem>
											</List>
										</Grid>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Frame"} secondary={"5 year"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Roof"} secondary={"1 year"} />
												</ListItem>
											</List>
										</Grid>
										<Grid item xs={4}>
											<List>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Frame"} secondary={"10 year"} />
												</ListItem>
												<ListItem className="section-canopy-tent-listItem">
													<ListItemText className="section-canopy-tent-listItem-content" primary={"Roof"} secondary={"1 year"} />
												</ListItem>
											</List>
										</Grid>
									</Grid>
								</Box>
								<Box className="section-container" style={{ textAlign: "center" }}>
									<p className="section-content-entend" style={{ marginBottom: "30px" }}>
										Contact and follow us to get the latest pop up canopy news and special offers from Instant Promotion.
									</p>
									<SectionSocialGroup />
								</Box>
							</Container>
						</CContainer>
					</>
				) : null}
			</Box>
		</React.Fragment>
	);
}

export default withRouter(Compare);
