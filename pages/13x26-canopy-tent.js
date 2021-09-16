import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Link from "next/link";
import { withRouter } from "next/router";

import { Box, Button, Breadcrumbs, Container, Grid, List, ListItem, ListItemText, TextField, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import Utils from "../utils/utils";

import CBreadcrumbs from "../components/breadcrumbs";
import CContainer from "../components/container";
import Modal from "../components/modal";
import CLink from "../components/link";

const utils = new Utils();

const MXImageDisplay = styled.img`
	width: 90%;
	min-height: 200px;
	max-height: 400px;
	object-fit: contain;
`;

const MXDot = styled(({ color, ...other }) => <div style={{ backgroundColor: color }} {...other} />)`
	width: 14px;
	height: 14px;
	margin: 4px;
	border-radius: 50%;
	border: 1px solid #aaaaaa;
`;

const MXDotGroup = styled(({ ...other }) => (
	<div {...other}>
		<MXDot color="black" />
		<MXDot color="white" />
		<MXDot color="#ff0000" />
		<MXDot color="#3773b8" />
		<MXDot color="#eecb45" />
		<MXDot color="#4c9a18" />
	</div>
))`
	display: inline-flex;
	margin-bottom: 8px;
`;

const MXContainerBuy = ({ text, buttonText, href, backgroundColor, dot }) => {
	return (
		<div style={{ margin: "18px 0 36px 0", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
			{dot ? <MXDotGroup /> : null}
			<Typography variant="h6" display="block" color="textSecondary" paragraph={!!text}>
				<strong>{text}</strong>
			</Typography>
			<CLink backgroundColor={backgroundColor} href={href}>
				{buttonText ? buttonText : "Buy"}
			</CLink>
		</div>
	);
};

function Canopy_Tent_Package({ router }) {
	const [display, setDisplay] = useState(false);

	const [showModal, setShowModal] = useState(false);
	const [showGetQuote, setShowGetQuote] = useState(false);

	////////////////////////////////////////

	const [quoteSubject, setQuoteSubject] = useState("");
	const [quoteNameLast, setQuoteNameLast] = useState("");
	const [quoteNameFirst, setQuoteNameFirst] = useState("");
	const [quoteEmail, setQuoteEmail] = useState("");
	const [quotePhone, setQuotePhone] = useState("");
	const [quoteRequest, setQuoteRequest] = useState("");
	const [quoteError, setQuoteError] = useState(false);

	////////////////////////////////////////

	const handleSendQuote = async () => {
		if (!quoteSubject || !quoteNameLast || !quoteNameFirst || !quoteEmail || !quotePhone || !quoteRequest) {
			setQuoteError(true);
		} else {
			let result = await utils.contact({
				form_id: "1",
				status: "active",
				3: quoteSubject,
				1.3: quoteNameFirst,
				1.6: quoteNameLast,
				2: quoteEmail,
				5: quoteRequest,
				6: quotePhone,
			});
			setShowModal(true);
			router.replace("/13x26-canopy-tent/#sent");
		}
	};

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
									<Typography variant="inherit" color="textPrimary">
										13x26 Canopy Tent
									</Typography>
								</Breadcrumbs>
							</Container>
						</CBreadcrumbs>
						<CContainer>
							<Container maxWidth="md">
								<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} paragraph={true}>
									13x26 Canopy Tent
								</Typography>
								<Typography color="textSecondary" paragraph={true}>
									Westshade&#39;s 13x26 instant pop up canopy tent provides maximum space to accommodate your business, making it ideal
									<br />
									for a variety of events, ranging from business trade shows, sports, festivals, weddings, outdoor parties, and many more! This 13x26 canopy tent only comes in our most durable heavy duty aluminum frame - the Y7 series. You
									won&#39;t regret getting this for your events! The large canopy tent is extremely versatile, and provides up to 338 square feet of shade and UV protection for all your guests.
									<br />
									<br />
									Browse our selection of 13x26 canopy tent series available, or customize your canopy tent to make it your own!
								</Typography>
							</Container>
						</CContainer>
						<CContainer>
							<Container maxWidth="md">
								<Grid container spacing={6}>
									<Grid item xs={12} md={6}>
										<MXImageDisplay src="/images/rectangle-42-5@2x.png" alt="y7-heavy-duty" />
									</Grid>
									<Grid item xs={12} md={6} container alignItems="center">
										<div className="position-r">
											<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} align="left">
												{" "}
												Y7 Heavy Duty{" "}
											</Typography>
											<Typography variant="subtitle2" color="inherit" style={{ color: "#e59010" }} align="left" paragraph={true}>
												For heavy duty use
											</Typography>
											<Typography variant="body2" color="textSecondary" align="left" paragraph={true}>
												The most heavy duty aluminum frame canopy on the market with unchallenged strength and durability.
											</Typography>
											<MXContainerBuy text={"$1,421.00"} backgroundColor={"#2767c5"} dot href={{ pathname: "/y7-heavy-duty/buy" }} />
										</div>
									</Grid>
								</Grid>
							</Container>
						</CContainer>
						<CContainer>
							<Container maxWidth="sm">
								<Typography variant="h6" classes={{ h6: "information-title" }}>
									Y7 Heavy Duty
								</Typography>
								<Grid container>
									<Grid item xs={6}>
										<List>
											<ListItem className="section-image-package-listItem" style={{ backgroundColor: "white" }}>
												<ListItemText className="section-image-package-listItem-title" primary={"Frame Specifications"} />
											</ListItem>
											<ListItem>
												<ListItemText className="section-image-package-listItem-subtitle" primary={"Frame Material"} />
											</ListItem>
											<ListItem>
												<ListItemText className="section-image-package-listItem-subtitle" primary={"Outer Leg Shape"} />
											</ListItem>
											<ListItem>
												<ListItemText className="section-image-package-listItem-subtitle" primary={"Bracket Connectors"} />
											</ListItem>
											<ListItem>
												<ListItemText className="section-image-package-listItem-subtitle" primary={"Height Adjustment"} />
											</ListItem>
											<ListItem>
												<ListItemText className="section-image-package-listItem-subtitle" primary={"Nuts and Bolts"} />
											</ListItem>
											<ListItem>
												<ListItemText className="section-image-package-listItem-subtitle" primary={"Outer Leg Diameter"} />
											</ListItem>
											<ListItem>
												<ListItemText className="section-image-package-listItem-subtitle" primary={"Outer Leg Thickness"} />
											</ListItem>
											<ListItem className="section-image-package-listItem" style={{ backgroundColor: "white" }}>
												<ListItemText className="section-image-package-listItem-title" primary={"Fabric features"} />
											</ListItem>
											<ListItem>
												<ListItemText className="section-image-package-listItem-subtitle" primary={"Fabric"} />
											</ListItem>
											<ListItem style={{ minHeight: "41px" }} />
											<ListItem>
												<ListItemText className="section-image-package-listItem-subtitle" primary={"Function"} />
											</ListItem>
											<ListItem style={{ minHeight: "41px" }} />
											<ListItem style={{ minHeight: "41px" }} />
											<ListItem className="section-image-package-listItem" style={{ backgroundColor: "white" }}>
												<ListItemText className="section-image-package-listItem-title" primary={"Warrenty"} />
											</ListItem>
											<ListItem>
												<ListItemText className="section-image-package-listItem-subtitle" primary={"Frame Warranty"} />
											</ListItem>
											<ListItem>
												<ListItemText className="section-image-package-listItem-subtitle" primary={"Roof Warranty"} />
											</ListItem>
										</List>
									</Grid>
									<Grid item xs={6}>
										<List>
											<ListItem className="section-image-package-listItem" style={{ backgroundColor: "white" }} />
											<ListItem>
												<ListItemText className="section-image-package-listItem-content" primary={"6063-T5 Aluminum"} />
											</ListItem>
											<ListItem>
												<ListItemText className="section-image-package-listItem-content" primary={"Hexagonal"} />
											</ListItem>
											<ListItem>
												<ListItemText className="section-image-package-listItem-content" primary={"6063-T5 Aluminum"} />
											</ListItem>
											<ListItem>
												<ListItemText className="section-image-package-listItem-content" primary={"Push button"} />
											</ListItem>
											<ListItem>
												<ListItemText className="section-image-package-listItem-content" primary={"Stainless steel"} />
											</ListItem>
											<ListItem>
												<ListItemText className="section-image-package-listItem-content" primary={"2.25 inches (57mm)"} />
											</ListItem>
											<ListItem>
												<ListItemText className="section-image-package-listItem-content" primary={"0.07 inches (1.8mm)"} />
											</ListItem>
											<ListItem className="section-image-package-listItem" style={{ backgroundColor: "white" }} />
											<ListItem>
												<ListItemText className="section-image-package-listItem-content" primary={"500D Polyester with PVC coating"} />
											</ListItem>
											<ListItem>
												<ListItemText className="section-image-package-listItem-content" primary={"320gsm"} />
											</ListItem>
											<ListItem>
												<ListItemText className="section-image-package-listItem-content" primary={"Waterproof"} />
											</ListItem>
											<ListItem>
												<ListItemText className="section-image-package-listItem-content" primary={"CPAI-84 certified fire retardant"} />
											</ListItem>
											<ListItem>
												<ListItemText className="section-image-package-listItem-content" primary={"UV protection"} />
											</ListItem>
											<ListItem className="section-image-package-listItem" style={{ backgroundColor: "white" }} />
											<ListItem>
												<ListItemText className="section-image-package-listItem-content" primary={"10 year"} />
											</ListItem>
											<ListItem>
												<ListItemText className="section-image-package-listItem-content" primary={"1 year"} />
											</ListItem>
										</List>
									</Grid>
								</Grid>
							</Container>
						</CContainer>
						<CContainer>
							<Container maxWidth="md">
								<Typography variant="h5"> Custom printing </Typography>
								<Grid container spacing={2}>
									<Grid item xs={12} md={6}>
										<MXImageDisplay src="/images/rectangle-48-4@2x.png" />
									</Grid>
									<Grid item xs={12} md={6} container alignContent="center">
										<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} align="left">
											{" "}
											Y7 Heavy Duty Custom Print{" "}
										</Typography>
										<Typography variant="subtitle2" color="inherit" style={{ color: "#e59010" }} align="left" paragraph={true}>
											For heavy duty use
										</Typography>
										<Typography variant="body2" color="textSecondary" align="left" paragraph={true}>
											The most heavy duty aluminum frame canopy on the market with unchallenged strength and durability.
										</Typography>
										<Typography variant="h6" display="block" color="textPrimary" paragraph={true}>
											<strong>Starting at $2,279.00</strong>
										</Typography>
										<div style={{ display: "flex", justifyContent: "flex-start" }}>
											<Button variant="contained" className="section-grid-button" style={{ marginRight: "24px" }} onClick={() => router.push("/custom-printed-package/f1326cpp")} disableElevation>
												Buy
											</Button>
											<Button variant="contained" className="section-grid-button" style={{ marginRight: "24px" }} onClick={() => setShowGetQuote(true)} disableElevation>
												Free quote & mockup
											</Button>
										</div>
									</Grid>
								</Grid>
							</Container>
						</CContainer>
						<CContainer>
							<Container maxWidth="md">
								<Grid container spacing={2} direction="row" alignItems="center">
									<Grid item xs={12} sm={6} md={3}>
										<div className="position-r">
											<MXImageDisplay src="/images/product/custom-printed-package/13x26/Y7F1326CPP1.jpg" alt="custom-printing-13x26-package-1" />
										</div>
									</Grid>
									<Grid item xs={12} sm={6} md={3}>
										<div className="position-r">
											<MXImageDisplay src="/images/product/custom-printed-package/13x26/Y7F1326CPP2.jpg" alt="custom-printing-13x26-package-2" />
										</div>
									</Grid>
									<Grid item xs={12} sm={6} md={3}>
										<div className="position-r">
											<MXImageDisplay src="/images/product/custom-printed-package/13x26/Y7F1326CPP3.jpg" alt="custom-printing-13x26-package-3" />
										</div>
									</Grid>
									<Grid item xs={12} sm={6} md={3}>
										<div className="position-r">
											<MXImageDisplay src="/images/product/custom-printed-package/13x26/Y7F1326CPP4.jpg" alt="custom-printing-13x26-package-4" />
										</div>
									</Grid>
									<Grid item xs={12} sm={6} md={3}>
										<div className="position-r">
											<MXImageDisplay src="/images/product/custom-printed-package/13x26/Y7F1326CPP5.jpg" alt="custom-printing-13x26-package-5" />
										</div>
									</Grid>
									<Grid item xs={12} sm={6} md={3}>
										<div className="position-r">
											<MXImageDisplay src="/images/product/custom-printed-package/13x26/Y7F1326CPP6.jpg" alt="custom-printing-13x26-package-6" />
										</div>
									</Grid>
									<Grid item xs={12} sm={6} md={3}>
										<div className="position-r">
											<MXImageDisplay src="/images/product/custom-printed-package/13x26/Y7F1326CPP7.jpg" alt="custom-printing-13x26-package-7" />
										</div>
									</Grid>
									<Grid item xs={12} sm={6} md={3}>
										<div className="position-r">
											<MXImageDisplay src="/images/product/custom-printed-package/13x26/Y7F1326CPP8.jpg" alt="custom-printing-13x26-package-8" />
										</div>
									</Grid>
								</Grid>
							</Container>
						</CContainer>
					</>
				) : null}
				<Modal onClose={() => setShowGetQuote(false)} show={showGetQuote}>
					<Box className="popup-section" style={{ width: "auto" }}>
						<Container maxWidth="md">
							<Grid container spacing={6}>
								<Grid item xs={12} sm={6}>
									<div className="popup-section-title">At Westshade, We Offer Limitless Design Solution.</div>
									<img
										style={{
											width: 120,
											height: 120,
											objectFit: "contain",
											margin: "24px auto",
										}}
										src={"/images/tent-spec/customer-service.svg"}
									/>
									<div className="popup-section-title" style={{ fontSize: "1rem" }}>
										Call us for custom print consultation
									</div>
									<div className="section-checkout-container" style={{ justifyContent: "center", paddingTop: 24 }}>
										<Button
											variant="contained"
											className="contained-button-black"
											onClick={() => {
												let a = document.createElement("a");
												a.href = "tel:949-751-1070";
												a.click();
											}}
											disableRipple
											disableElevation
										>
											(949)751-1070
										</Button>
									</div>
								</Grid>
								<Grid item xs={12} sm={6}>
									<form>
										<div className="section-quote-input">
											<TextField
												fullWidth
												label="Subject"
												required
												InputLabelProps={{
													shrink: true,
												}}
												defaultValue={quoteSubject}
												onChange={(event) => {
													setQuoteError(false);
													setQuoteSubject(event.target.value);
												}}
												error={!quoteSubject && quoteError}
											/>
										</div>
										<div className="section-quote-input" style={{ display: "flex" }}>
											<div style={{ paddingRight: 12 }}>
												<TextField
													label="Last Name"
													required
													InputLabelProps={{
														shrink: true,
													}}
													defaultValue={quoteNameLast}
													onChange={(event) => {
														setQuoteError(false);
														setQuoteNameLast(event.target.value);
													}}
													error={!quoteNameLast && quoteError}
												/>
											</div>
											<div style={{ paddingRight: 12 }}>
												<TextField
													label="First Name"
													required
													InputLabelProps={{
														shrink: true,
													}}
													defaultValue={quoteNameFirst}
													onChange={(event) => {
														setQuoteError(false);
														setQuoteNameFirst(event.target.value);
													}}
													error={!quoteNameFirst && quoteError}
												/>
											</div>
										</div>
										<div className="section-quote-input">
											<TextField
												fullWidth
												label="Email"
												required
												InputLabelProps={{
													shrink: true,
												}}
												defaultValue={quoteEmail}
												onChange={(event) => {
													setQuoteError(false);
													setQuoteEmail(event.target.value);
												}}
												error={!quoteEmail && quoteError}
											/>
										</div>
										<div className="section-quote-input">
											<TextField
												fullWidth
												label="Phone"
												required
												InputLabelProps={{
													shrink: true,
												}}
												defaultValue={quotePhone}
												onChange={(event) => {
													setQuoteError(false);
													setQuotePhone(event.target.value);
												}}
												error={!quotePhone && quoteError}
											/>
										</div>
										<div className="section-quote-input">
											<TextField
												fullWidth
												label="Describe What You’re Looking For"
												required
												InputLabelProps={{
													shrink: true,
												}}
												multiline
												maxRows={6}
												defaultValue={quoteRequest}
												onChange={(event) => {
													setQuoteError(false);
													setQuoteRequest(event.target.value);
												}}
												error={!quoteRequest && quoteError}
											/>
										</div>
										<div className="section-checkout-container">
											<Button variant="contained" onClick={() => handleSendQuote()} disableRipple disableElevation>
												Submit
											</Button>
										</div>
									</form>
								</Grid>
							</Grid>
						</Container>
					</Box>
				</Modal>
				<Modal show={showModal} onClose={() => setShowModal(false)} backgroundColor="rgb(237, 247, 237)">
					<Alert severity="success">
						<AlertTitle>Success</AlertTitle>
						Email has been sent successfully.
					</Alert>
				</Modal>
			</Box>
		</React.Fragment>
	);
}

export default withRouter(Canopy_Tent_Package);
