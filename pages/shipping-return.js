import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Link from "next/link";
import Head from "next/head";

import { Box, Breadcrumbs, Container, Grid, List, ListItem, ListItemText, Typography } from "@material-ui/core";

import CBreadcrumbs from "../components/breadcrumbs";
import CContainer from "../components/container";

const MXImageDisplay = styled.img`
	width: 100%;
	object-fit: contain;
	margin-bottom: 24px;
`;

function Shipping_Return() {
	const [display, setDisplay] = useState(false);

	useEffect(() => setTimeout(() => setDisplay(true), 250), []);

	return (
		<React.Fragment>
			<Head>
				<title>Shipping and Return Policy - FAQs | WESTSHADE</title>
				<meta name="description" content="View frequently asked questions about our shipping and return policies, estimated delivery, damaged items, and refunds." />
			</Head>
			<Box className="page" fontSize={14} lineHeight={1.43}>
				{display ? (
					<>
						<CBreadcrumbs>
							<Container maxWidth="md">
								<Breadcrumbs classes={{ li: "root-breadcrumbs-text" }}>
									<Link color="inherit" href="/" onClick={(event) => event.preventDefault()}>
										Home
									</Link>
									<Typography variant="inherit" color="textPrimary">
										Shipping
									</Typography>
								</Breadcrumbs>
							</Container>
						</CBreadcrumbs>
						<CContainer>
							<Container maxWidth="md">
								<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} align="left" paragraph={true}>
									<strong> Shipping </strong>
								</Typography>
								<Typography color="textSecondary" align="left" paragraph={true}>
									All Westshade orders are shipped with FedEx. After orders have been processed and shipped, customers will receive a confirmation email with a order confirmation number and a copy of the invoice. Tracking number and
									information will be automatically emailed after product is processed for shipping. All other shipping information can be found by logging into your account here at&nbsp;
									<Link href="https://www.westshade.com/my-account" onClick={(event) => event.preventDefault()}>
										https://www.westshade.com/my-account
									</Link>
									. For further questions or concerns, please contact our customer service team.
								</Typography>
								<Typography component="h6" color="textSecondary" align="left" paragraph={true}>
									Additional Shipping Information:
								</Typography>
								<Typography component="span" classes={{ root: "gird-item-content" }} display="block" align="left" paragraph={true}>
									<ul>
										<li> We provide free shipping and handling costs for any orders over $149 within the U.S. Shipping costs for customers located in Alaska, Puerto Rico, and Hawaii will need further order estimates.</li>
										<li> All FedEx Deliveries are 5 days a week (Monday through Friday) excluding weekends and holidays.</li>
										<li> Customers that requests multiple delivery addresses must place separate orders for each shipping address. Multiple individual orders can be placed online or by placing orders with our customer team.</li>
										<li> All in-stock purchases that are processed before 3PM PST will be shipped out on the same day. All in-stock purchases that are processed later than 3PM PST will be shipped out the next business day.</li>
										<li> We reserve the right to put orders on hold should we suspect fraud during the transaction.</li>
									</ul>
								</Typography>
							</Container>
						</CContainer>
						<CContainer>
							<Container maxWidth="md">
								<Grid container>
									<Grid item xs={12} md={6}>
										<List>
											<ListItem classes={{ root: "root-listItem" }} divider>
												<Grid container spacing={2}>
													<Grid item xs={6}>
														<ListItemText secondary={"Shipping Method"} />
													</Grid>
													<Grid item xs={6}>
														<ListItemText secondary={"Estimated Delivery"} />
													</Grid>
												</Grid>
											</ListItem>
											<ListItem classes={{ root: "root-listItem" }} divider>
												<Grid container spacing={2}>
													<Grid item xs={6}>
														<ListItemText secondary={"Ground"} />
													</Grid>
													<Grid item xs={6}>
														<ListItemText secondary={"2-5 business days once shipped"} />
													</Grid>
												</Grid>
											</ListItem>
											<ListItem classes={{ root: "root-listItem" }} divider>
												<Grid container spacing={2}>
													<Grid item xs={6}>
														<ListItemText secondary={"2nd Day"} />
													</Grid>
													<Grid item xs={6}>
														<ListItemText secondary={"2 business days once shipped"} />
													</Grid>
												</Grid>
											</ListItem>
											<ListItem classes={{ root: "root-listItem" }} divider>
												<Grid container spacing={2}>
													<Grid item xs={6}>
														<ListItemText secondary={"Standard Overnight"} />
													</Grid>
													<Grid item xs={6}>
														<ListItemText secondary={"1 business day once shipped"} />
													</Grid>
												</Grid>
											</ListItem>
											<ListItem classes={{ root: "root-listItem" }} divider>
												<Grid container spacing={2}>
													<Grid item xs={6}>
														<ListItemText secondary={"Priority Overnight"} />
													</Grid>
													<Grid item xs={6}>
														<ListItemText secondary={"1 business day once shipped"} />
													</Grid>
												</Grid>
											</ListItem>
											<ListItem classes={{ root: "root-listItem" }} divider>
												<Grid container spacing={2}>
													<Grid item xs={6}>
														<ListItemText secondary={"First Overnight"} />
													</Grid>
													<Grid item xs={6}>
														<ListItemText secondary={"1 business day once shipped"} />
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
								<MXImageDisplay src="/images/fedex-ground-shipment.png" alt="fedex ground shipment" />
							</Container>
						</CContainer>
						<CContainer>
							<Container maxWidth="md">
								<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} align="left" paragraph={true}>
									<strong> Return Policy </strong>
								</Typography>
								<Typography color="textSecondary" align="left" paragraph={true}>
									At Westshade, we are committed to ensuring that our customers receive the full value and quality of every purchase. If for any reason you are not satisfied with your purchase, we accept merchandise returns within 30 days
									of purchase. Please note that Westshade does not accept returns for any custom printed products, unless the custom printed product has a fault under our manufacturer’s warranty. All product returns will be automatically
									subjected to a 15% restocking fee except for merchandise received with a manufacturing defect. In addition, customers will be charged for all return shipping labels.
								</Typography>
							</Container>
						</CContainer>
						<CContainer>
							<Container maxWidth="md">
								<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} align="left" paragraph={true}>
									<strong> Contact Information </strong>
								</Typography>
								<Typography color="textSecondary" align="left" paragraph={true}>
									Customers are encourage to contact our customer support team for consultation before deciding to return purchasable products from Westshade. We can be reached by calling&nbsp;
									<strong>949-751-1070</strong>, or by emailing us at&nbsp;
									<strong>support@westshade.com</strong>&nbsp;so we may further assist you and provide specific return shipping instructions.
								</Typography>
							</Container>
						</CContainer>
					</>
				) : null}
			</Box>
		</React.Fragment>
	);
}

export default Shipping_Return;
