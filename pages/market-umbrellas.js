import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Head from "next/head";

import { Box, Container, Grid, Typography } from "@material-ui/core";

import Banner from "../components/banner";
import CUmbrella from "../components/card_umbrella";
import CContainer from "../components/container";
import SectionProductsOffered from "../components/section_products_offered";
import CLink from "../components/link";

const MXImageDisplay = styled.img`
	width: 90%;
	max-width: 120px;
	object-fit: contain;
	border-radius: 50%;
	margin-top: 48px;
	margin-bottom: 24px;
`;

function Market_Umbrellas() {
	const [display, setDisplay] = useState(false);

	useEffect(() => setTimeout(() => setDisplay(true), 250), []);

	return (
		<React.Fragment>
			<Head>
				<title>Market Umbrellas - WESTSHADE</title>
				<meta name="description" content="Market Umbrella Shade Satisfaction All Day Recommended Santorini Fiberglass Series Heavy Duty Patio Umbrella. From$289.99 Shop Most Popular Santorini." />
			</Head>
			<Box className="page" fontSize={14} lineHeight={1.43}>
				{display ? (
					<>
						<Banner backgroundImage={"/images/banner/2000-700-1-1-2@1x.png"} title="Market Umbrella" content="Shade Satisfaction All Day" />
						<CContainer>
							<Container maxWidth="md">
								<Grid container spacing={6} justifyContent="space-around" alignContent="center" alignItems="center">
									<Grid item xs={12} md={4}>
										<CUmbrella
											backgroundColor="#FDF0F0"
											descBackgroundColor="#C98F6F"
											imageBackgroundColor="#EDD1D1"
											src={"/images/rectangle-42@2x.png"}
											tag="RECOMMENDED"
											title="Santorini"
											subtitle="Fiberglass series"
											description="Heavy duty patio umbrella"
											price="289.99"
											href={{ pathname: "/products/market-umbrellas/santorini-fiberglass-umbrella" }}
										/>
									</Grid>
									<Grid item xs={12} md={4}>
										<CUmbrella
											backgroundColor="#C9F5F5"
											descBackgroundColor="#19AEAC"
											imageBackgroundColor="#94ECEC"
											src={"/images/rectangle-41-2@2x.png"}
											tag="MOST POPULAR"
											title="Santorini"
											subtitle="Aluminum series"
											description="Commercial grade patio umbrella"
											price="289.99"
											href={{ pathname: "/products/market-umbrellas/santorini-aluminum-umbrella" }}
										/>
									</Grid>
									<Grid item xs={12} md={4}>
										<CUmbrella
											backgroundColor="#FDEDCD"
											descBackgroundColor="#F6B93C"
											imageBackgroundColor="#FCDC9C"
											src={"/images/rectangle-40@2x.png"}
											title="Macro"
											description="Everyday use patio umbrella"
											price="289.99"
											href={{ pathname: "/products/market-umbrellas/marco-umbrella" }}
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
									<strong>How does it fit?</strong>
								</Typography>
								<Grid container spacing={6} justifyContent="space-around">
									<Grid item xs={4}>
										<MXImageDisplay src="/images/ellipse-14@2x.png" alt="push up system" />
										<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} paragraph={true}>
											{" "}
											Push Up System{" "}
										</Typography>
										<Typography variant="body2" color="textSecondary" paragraph={true}>
											A push-open system works by simply pushing the umbrella upwards and open from the hub. Effortlessly open your umbrella in 15 seconds. NO extra tools required.
										</Typography>
									</Grid>
									<Grid item xs={4}>
										<MXImageDisplay src="/images/ellipse-15@2x.png" alt="pulley lift system" />
										<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} paragraph={true}>
											{" "}
											Pulley Lift System{" "}
										</Typography>
										<Typography variant="body2" color="textSecondary" paragraph={true}>
											Heavy duty double pulley system and commercial grade pulley rope help you to raise the umbrella in 15 second. More easily than push up system. NO extra tools required.
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
								<CLink backgroundColor={"black"} href={{ pathname: "/compare-market-umbrella" }} size="large" style={{ margin: "24px auto" }}>
									COMPARE MARKET UMBRELLA
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

export default Market_Umbrellas;
