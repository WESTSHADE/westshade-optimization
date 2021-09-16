import React, { useEffect, useState } from "react";

import Link from "next/link";

import { Box, Button, Breadcrumbs, Container, Grid, Typography, TextField } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";

import Utils from "../utils/utils";

import CBreadcrumbs from "../components/breadcrumbs";
import CContainer from "../components/container";
import Modal from "../components/modal";

const utils = new Utils();

const Accordion = withStyles({
	root: {
		borderTop: "1px solid rgba(0, 0, 0, .125)",
		borderBottom: "1px solid rgba(0, 0, 0, .125)",
		boxShadow: "none",
		"&:not(:last-child)": {
			borderBottom: 0,
		},
		"&:before": {
			display: "none",
		},
		"&$expanded": {
			margin: "auto",
		},
	},
	expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
	root: {
		// backgroundColor: "rgba(0, 0, 0, .03)",
		// borderBottom: "1px solid rgba(0, 0, 0, .125)",
		marginBottom: -1,
		minHeight: 56,
		"&$expanded": {
			minHeight: 56,
		},
	},
	content: {
		"&$expanded": {
			margin: "12px 0",
		},
	},
	expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiAccordionDetails);

function Contact_Us() {
	const [display, setDisplay] = useState(false);

	const [showModal, setShowModal] = useState(false);
	const [expanded, setExpanded] = React.useState("panel1");

	////////////////////////////////////////

	const [quoteSubject, setQuoteSubject] = useState("");
	const [quoteNameLast, setQuoteNameLast] = useState("");
	const [quoteNameFirst, setQuoteNameFirst] = useState("");
	const [quoteEmail, setQuoteEmail] = useState("");
	const [quotePhone, setQuotePhone] = useState("");
	const [quoteRequest, setQuoteRequest] = useState("");
	const [quoteError, setQuoteError] = useState(false);

	////////////////////////////////////////

	useEffect(() => setTimeout(() => setDisplay(true), 250), []);

	const handleChange = (panel) => (event, newExpanded) => setExpanded(newExpanded ? panel : false);

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
			router.replace("/contact-us/#sent");
		}
	};

	return (
		<React.Fragment>
			<Box className="page contact-us" fontSize={14} lineHeight={1.43}>
				{display ? (
					<>
						<CBreadcrumbs>
							<Container maxWidth="md">
								<Breadcrumbs classes={{ li: "root-breadcrumbs-text" }}>
									<Link color="inherit" href="/" onClick={(event) => event.preventDefault()}>
										Home
									</Link>
									<Typography variant="inherit" color="textPrimary">
										Contact Us
									</Typography>
								</Breadcrumbs>
							</Container>
						</CBreadcrumbs>
						<CContainer>
							<Container maxWidth="md">
								<Grid container spacing={6}>
									<Grid item xs={12} md={6}>
										<div style={{ textAlign: "left" }}>
											<div className="section-subtitle">INFORMATION QUESTIONS</div>
											<h3 className="section-title" style={{ fontSize: "1.725rem" }}>
												FREQUENTLY ASKED QUESTIONS
											</h3>
											<div>
												<Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
													<AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
														<Typography>Where can I use my WestShade pop-up canopy?</Typography>
													</AccordionSummary>
													<AccordionDetails>
														<Typography>
															Our canopies stand securely on grass, dirt, or pavement without ropes or poles. In windy conditions, However, we recommend using our Weight Bags to anchor and prevent your canopy from tipping over.
														</Typography>
													</AccordionDetails>
												</Accordion>
												<Accordion square expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
													<AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
														<Typography>Can I buy a replacement canopy covering?</Typography>
													</AccordionSummary>
													<AccordionDetails>
														<Typography>Yes, we offer many replacement cover options. Please call customer service at 949-751-1070 or contact us online.</Typography>
													</AccordionDetails>
												</Accordion>
												<Accordion square expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
													<AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
														<Typography>Do you have any accessories available?</Typography>
													</AccordionSummary>
													<AccordionDetails>
														<Typography>Yes, our full line of accessories includes sidewalls, half sidewalls, sidewalls with roll up doors, sidewalls with windows and sand bags.</Typography>
													</AccordionDetails>
												</Accordion>
												<Accordion square expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
													<AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
														<Typography>What fire ratings do your fabric items have？</Typography>
													</AccordionSummary>
													<AccordionDetails>
														<Typography>Our fabric meets CPAI-84, NFPA-71 and the California Administrative Code Title 19 fire resistant requirements.</Typography>
													</AccordionDetails>
												</Accordion>
												<Accordion expanded={expanded === "panel5"} onChange={handleChange("panel5")}>
													<AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
														<Typography>What are your shipping costs? </Typography>
													</AccordionSummary>
													<AccordionDetails>
														<Typography>
															We provide free shipping and handling costs for any orders over $149 within the U.S., with the exception of AK, HI and PR.
															<br />
															<br />
															Shipping costs for customers located in those 3 states will be provided after further order estimates.
														</Typography>
													</AccordionDetails>
												</Accordion>
											</div>
										</div>
									</Grid>
									<Grid item xs={12} md={6}>
										<div className="section-subtitle" style={{ textAlign: "left", marginBottom: 24 }}>
											Contact Us / Get a Quote
											<p
												className="section-content"
												style={{
													marginTop: 12,

													fontSize: "1rem",
													lineHeight: "1.2rem",
												}}
											>
												Complete the brief form below and one of our Design Specialists will be in touch with you ASAP with options and pricing for your custom project.
											</p>
										</div>
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
						</CContainer>
					</>
				) : null}
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

export default Contact_Us;
