import React, { useEffect, useState } from "react";

import Head from "next/head";
import { withRouter } from "next/router";

import { Box, Button, Container, Grid, TextField } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import Utils from "../utils/utils";

import Banner from "../components/banner";
import Modal from "../components/modal";

const utils = new Utils();

function Custom_Printing_Umbrella({ router }) {
	const [display, setDisplay] = useState(false);

	const [showGetQuote, setShowGetQuote] = useState(false);
	const [showModal, setShowModal] = useState(false);

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
			router.replace("/custom-printing-umbrella/#sent");
		}
	};

	useEffect(() => setTimeout(() => setDisplay(true), 250), []);

	return (
		<React.Fragment>
			<Head>
				<title>Custom Printing Umbrella - WESTSHADE</title>
				<meta name="description" content="Custom Printing Umbrella Exquisite design yet strong and durable Custom Printing Umbrella Westshade provides a premium range of patio and market umbrellas." />
			</Head>
			<Box className="page canopy-tent" fontSize={14} lineHeight={1.43}>
				{display ? (
					<>
						<Banner backgroundImage={"/images/banner/1920-610-19.jpeg"} title="Exquisite design yet strong and durable" content="Custom Printing Umbrella" align="left" />
						<Box className="section-container">
							<Container maxWidth="sm">
								<h3 className="section-title">Custom Printing Umbrella </h3>
								<p className="section-content-entend">
									Westshade provides a premium range of patio and market umbrellas in various sizes and colors. Customized to help promote your business or for everyday use. Choose between our Market Umbrella, Tilt Umbrella, and Cantilever
									Umbrella.
									<br />
									<br />
									<br />
									As the #1 canopy and market umbrella manufacturer in Southern California, we ensure industry leading quality for all products, and award winning customer support.
								</p>
							</Container>
						</Box>
						<Box className="section-container">
							<Container maxWidth="md">
								<Grid container className="section-grid-item" alignItems="center" style={{ flexDirection: "row", marginBottom: "48px" }}>
									<Grid item xs={12}>
										<div className="section-grid-item-inner" style={{ paddingBottom: "0" }}>
											<div className="section-subtitle">Fully Weather Proof and Fire Retardant</div>
											<h3 className="section-title">CPAI-84 Certified. Waterproof. UV Protection.</h3>
										</div>
									</Grid>
									<Grid item xs={12} md={6}>
										<div className="position-r" style={{ marginBottom: "48px" }}>
											<img
												style={{
													objectFit: "contain",
													width: "90%",
													minHeight: "200px",
												}}
												src="/images/printed-canopy-1@2x.png"
											/>
											<img style={{ objectFit: "contain", width: "80%" }} src="/images/onepress-1@1x.png" />
										</div>
									</Grid>
									<Grid item xs={12} md={6}>
										<div style={{ flexDirection: "row", alignItems: "center" }}>
											<div className="section-grid-item-inner">
												<p className="section-content" style={{ marginBottom: "36px" }}>
													Each canopy is ensured optimal protection from high-wind speeds and top resistance to water. Maximum UV protection is implemented with instant shade and cool air for the most comfortable canopy experience. The most
													trustworthy material to help keep your business events and marketing running safely and with ease.
												</p>
												<Button variant="contained" className="contained-button-black" onClick={() => router.push("/custom-printing")}>
													Get your free mock-up today
												</Button>
											</div>
										</div>
									</Grid>
								</Grid>
								<Grid container spacing={6}>
									<Grid item xs={12} sm={6}>
										<div className="section-grid-item" style={{ position: "relative", minHeight: "400px" }}>
											<div className="section-grid-item-inner">
												<h3 className="section-title">Build your Macro pull-up umbrella</h3>
												<Button variant="contained" className="contained-button-black" style={{ zIndex: 9 }} onClick={() => setShowGetQuote(true)}>
													Get quote
												</Button>
											</div>
											<img className="section-grid-custom-printing-umbrella-image" src="/images/rectangle-87@2x.png" />
										</div>
									</Grid>
									<Grid item xs={12} sm={6}>
										<div className="section-grid-item" style={{ position: "relative", minHeight: "400px" }}>
											<div className="section-grid-item-inner">
												<h3 className="section-title">Build your Macro pull-up umbrella</h3>
												<Button variant="contained" className="contained-button-black" style={{ zIndex: 9 }} onClick={() => setShowGetQuote(true)}>
													Get quote
												</Button>
											</div>
											<img className="section-grid-custom-printing-umbrella-image" src="/images/rectangle-87-2@2x.png" />
										</div>
									</Grid>
									<Grid item xs={12} sm={6}>
										<div className="section-grid-item" style={{ position: "relative", minHeight: "400px" }}>
											<div className="section-grid-item-inner">
												<h3 className="section-title">Build your Macro pull-up umbrella</h3>
												<Button variant="contained" className="contained-button-black" style={{ zIndex: 9 }} onClick={() => setShowGetQuote(true)}>
													Get quote
												</Button>
											</div>
											<img className="section-grid-custom-printing-umbrella-image" src="/images/rectangle-87-1@2x.png" />
										</div>
									</Grid>
									<Grid item xs={12} sm={6}>
										<div className="section-grid-item" style={{ position: "relative", minHeight: "400px" }}>
											<div className="section-grid-item-inner">
												<h3 className="section-title">Build your Macro pull-up umbrella</h3>
												<Button variant="contained" className="contained-button-black" style={{ zIndex: 9 }} onClick={() => setShowGetQuote(true)}>
													Get quote
												</Button>
											</div>
											<img className="section-grid-custom-printing-umbrella-image" src="/images/rectangle-87-3@2x.png" />
										</div>
									</Grid>
								</Grid>
							</Container>
						</Box>
						<Box className="section-container">
							<Container maxWidth="md">
								<h3 className="section-title">Need Help Deciding?</h3>
								<Grid container spacing={6}>
									<Grid item xs={6}>
										<div className="section-grid-item" style={{ backgroundColor: "transparent" }}>
											<div
												className="section-grid-item-inner"
												style={{
													display: "flex",
													flexDirection: "column",
												}}
											>
												<div className="section-title" style={{ textAlign: "center" }}>
													Chat With Us!
												</div>
												<h3 className="section-subtitle" style={{ textAlign: "center" }}>
													Our award winning Customer Service Representatives are available seven days a week to answer any of your questions. Chat now.
												</h3>
											</div>
										</div>
									</Grid>
									<Grid item xs={6}>
										<div className="section-grid-item" style={{ backgroundColor: "transparent" }}>
											<div
												className="section-grid-item-inner"
												style={{
													display: "flex",
													flexDirection: "column",
												}}
											>
												<div className="section-title" style={{ textAlign: "center" }}>
													Call Us Now!
												</div>
												<h3 className="section-subtitle" style={{ textAlign: "center" }}>
													Our Shade Specialists are here to help you find the perfect umbrella. Give us a call at +1 (949)751-1070.
												</h3>
											</div>
										</div>
									</Grid>
								</Grid>
							</Container>
						</Box>
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

export default withRouter(Custom_Printing_Umbrella);
