import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Head from "next/head";

import { Box, Container, Grid, Typography } from "@material-ui/core";

import Banner from "../components/banner";
import CUmbrella from "../components/card_umbrella";
import CContainer from "../components/container";
import CLink from "../components/link";
import SectionProductsOffered from "../components/section_products_offered";

const MXImageDisplay = styled.img`
	width: 90%;
	max-width: 120px;
	object-fit: contain;
	border-radius: 50%;
	margin-top: 48px;
	margin-bottom: 24px;
`;

function Tilt_Umbrellas() {
	const [display, setDisplay] = useState(false);

	useEffect(() => setTimeout(() => setDisplay(true), 250), []);

	return (
		<React.Fragment>
			<Head>
				<title>Tilt Umbrellas - WESTSHADE</title>
				<meta name="description" content="Tilt Umbrella Shade Satisfaction on Every Angle Most Popular Bali Every Day Use Tilt Umbrella From$289.99 Shop Kapri Coming soon From$289.99 Shop Free." />
			</Head>
			<Box className="page" fontSize={14} lineHeight={1.43}>
				{display ? (
					<>
						<Banner backgroundImage={"/images/banner/2000-700-1-1-3@1x.png"} title="Tilt Umbrella" content="Shade Satisfaction on Every Angle" />
						<CContainer>
							<Container maxWidth="md">
								<Grid container spacing={6} justifyContent="space-around" alignContent="center" alignItems="center">
									<Grid item xs={12} md={4}>
										<CUmbrella
											backgroundColor="#CAE3FA"
											descBackgroundColor="#4C8AC5"
											imageBackgroundColor="#A6CBEB"
											src={"/images/rectangle-41-7@2x.png"}
											tag="MOST POPULAR"
											title="Bali"
											subtitle="Tilt umbrella"
											description="Everyday use tilt umbrella"
											price="289.99"
											href={{ pathname: "/products/tilt-umbrellas/bali-crank-lift-patio-umbrella" }}
										/>
									</Grid>
									<Grid item xs={12} md={4}>
										<CUmbrella
											backgroundColor="#E9DCCE"
											descBackgroundColor="#D8BF9A"
											imageBackgroundColor="#E3D1BB"
											src={"/images/rectangle-42-7@2x.png"}
											title="Kapri"
											description="Coming soon"
											price="289.99"
											href={{ pathname: "/tilt-umbrellas" }}
										/>
									</Grid>
								</Grid>
							</Container>
						</CContainer>
						<CContainer>
							<Container maxWidth="md">
								<Grid container spacing={2}>
									<Grid item xs={6} sm={3}>
										<MXImageDisplay src="/images/rectangle-75@2x.png" alt="free shipping" />
										<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} paragraph={true}>
											<strong>Free Shipping</strong>
										</Typography>
									</Grid>
									<Grid item xs={6} sm={3}>
										<MXImageDisplay src="/images/rectangle-76@2x.png" alt="free return" />
										<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} paragraph={true}>
											<strong>Free Return</strong>
										</Typography>
									</Grid>
									<Grid item xs={6} sm={3}>
										<MXImageDisplay src="/images/rectangle-77@2x.png" alt="free mock up" />
										<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} paragraph={true}>
											<strong>Free Mock-up</strong>
										</Typography>
									</Grid>
									<Grid item xs={6} sm={3}>
										<MXImageDisplay src="/images/rectangle-78@2x.png" alt="excellent customer service" />
										<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} paragraph={true}>
											<strong>Excellent customer service</strong>
										</Typography>
									</Grid>
								</Grid>
							</Container>
						</CContainer>
						<CContainer>
							<Container maxWidth="md">
								<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} paragraph={true}>
									<strong>Simple Lift, Auto Tilt</strong>
								</Typography>
								<Grid container spacing={6} justifyContent="space-around">
									<Grid item xs={4}>
										<MXImageDisplay src="/images/ellipse-14-1@2x.png" alt="crank lift system" />
										<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} paragraph={true}>
											{" "}
											Crank Lift System{" "}
										</Typography>
										<Typography variant="body2" color="textSecondary" paragraph={true}>
											A simple crank lift design only requires 15 seconds to fully open the umbrella.
										</Typography>
									</Grid>
									<Grid item xs={4}>
										<MXImageDisplay src="/images/ellipse-15-1@2x.png" alt="auto tilt system" />
										<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} paragraph={true}>
											{" "}
											Auto Tilt System{" "}
										</Typography>
										<Typography variant="body2" color="textSecondary" paragraph={true}>
											A simple push button tilt system automatically tilts the umbrella seamlessly into place, giving you flexible shade coverage as the sun moves across the sky.
										</Typography>
									</Grid>
								</Grid>
							</Container>
						</CContainer>
						<Banner backgroundImage={"/images/rectangle-88-2@1x.png"}>
							<>
								<Typography variant="h4" classes={{ h4: "banner-title" }} paragraph={true}>
									<strong>See the umbrellas side-by-side</strong>
								</Typography>
								<CLink backgroundColor={"black"} href={{ pathname: "/compare-tilt-umbrella" }} size="large" style={{ margin: "24px auto" }}>
									COMPARE TILT UMBRELLA
								</CLink>
							</>
						</Banner>
						<SectionProductsOffered />
					</>
				) : null}
			</Box>
		</React.Fragment>
	);
}

export default Tilt_Umbrellas;
