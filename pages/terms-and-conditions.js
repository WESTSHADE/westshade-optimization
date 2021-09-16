import React, { useEffect, useState } from "react";

import Link from "next/link";
import Head from "next/head";

import { Box, Breadcrumbs, Container, Typography } from "@material-ui/core";

import CBreadcrumbs from "../components/breadcrumbs";
import CContainer from "../components/container";

function Terms_and_Conditions() {
	const [display, setDisplay] = useState(false);

	useEffect(() => setTimeout(() => setDisplay(true), 250), []);

	return (
		<React.Fragment>
			<Head>
				<title>Terms and Conditions - Disclaimers | WESTSHADE</title>
				<meta name="description" content="View WestShade's terms and conditions about agreement, privacy, communications, account, cancellation and refund policy, and disclaimers." />
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
										Terms And Conditions
									</Typography>
								</Breadcrumbs>
							</Container>
						</CBreadcrumbs>
						<CContainer>
							<Container maxWidth="md">
								<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} align="left" paragraph={true}>
									<strong> Terms and conditions </strong>
								</Typography>
								<Typography component="h6" align="left" paragraph={true}>
									Agreement between User and westshade.com
								</Typography>
								<Typography color="textSecondary" align="left" paragraph={true}>
									Welcome to westshade.com. The westshade.com website (the “Site”) is comprised of various web pages operated by WestShade.
									<br />
									<br />
									Westshade.com is offered to you conditioned on your acceptance without modification of the terms, conditions, and notices contained herein (the “Terms”). Your use of westshade.com constitutes your agreement to all such
									Terms. Please read there terms carefully, and keep a copy of them for your reference.
									<br />
									<br />
									Westshade.com is an E-Commerce Site.
								</Typography>
								<Typography component="h6" align="left" paragraph={true}>
									Privacy
								</Typography>
								<Typography color="textSecondary" align="left" paragraph={true}>
									Your use of westshade.com is subject to WestShade’s Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.
								</Typography>
								<Typography component="h6" align="left" paragraph={true}>
									Electronic Communications
								</Typography>
								<Typography color="textSecondary" align="left" paragraph={true}>
									Visiting westshade.com or sending emails to WestShade constitutes electronic communications. You consent to receive electronic communications and you agree that all agreements, notices, disclosures and other communications
									that we provide to you electronically, via email and on the Site, satisfy any legal requirement that such communications be in writing.
								</Typography>
								<Typography component="h6" align="left" paragraph={true}>
									Your Account
								</Typography>
								<Typography color="textSecondary" align="left" paragraph={true}>
									If you use this site, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur
									under your account or password. You may not assign or otherwise transfer your account to any other person or entity. You acknowledge that WestShade is not responsible for third party access to your account that results
									from theft or misappropriation of your account. WestShade and its associates reserve the right to refuse or cancel service, terminate accounts, or remove or edit content in our sole discretion.
								</Typography>
								<Typography component="h6" align="left" paragraph={true}>
									Cancellation/Refund Policy
								</Typography>
								<Typography color="textSecondary" align="left" paragraph={true}>
									Please see the refund policy on the Shipping & Return page.
								</Typography>
								<Typography component="h6" align="left" paragraph={true}>
									International Users
								</Typography>
								<Typography color="textSecondary" align="left" paragraph={true}>
									The service is controlled, operated and administered by WestShade from our offices within the USA. If you access the Service from a location outside the USA, you are responsible for compliance with all local laws. You
									agree that you will not use the WestShade content accessed through westshade.com in any country or in any manner prohibited by any applicable laws, restrictions or regulations.
								</Typography>
								<Typography component="h6" align="left" paragraph={true}>
									Indemnification
								</Typography>
								<Typography color="textSecondary" align="left" paragraph={true}>
									You agree to indemnify, defend and hold harmless WestShade, its officers, directors, employees, agents and third parties, for any losses, costs, liabilities and expenses (including reasonable attorney’s fees) relating to
									or arising out of your use of or inability to use the Site or services, any user postings made by you, your violation of any terms of this Agreement or your violation of any rights of a third party, or your violation of
									any applicable laws, rules or regulations. WestShade reserves the right, at its own cost, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will fully
									cooperate with WestShade in asserting any available defenses.
								</Typography>
								<Typography component="h6" align="left" paragraph={true}>
									Class Action Waiver
								</Typography>
								<Typography color="textSecondary" align="left" paragraph={true}>
									Any arbitration under these Terms and Conditions will take place on an individual basis; class arbitration and class/representative/collective actions are not permitted. THE PARTIES AGREE THAT A PARTY MAY BRING CLAIMS
									AGAINST THE OTHER ONLY IN EACH’S INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PUTATIVE CLASS, COLLECTIVE AND/OR REPRESENTATIVE PROCEEDING, SUCH AS IN THE FORM OF A PRIVATE ATTORNEY GENERAL ACTION
									AGAINST THE OTHER.
									<br />
									<br />
									Further, unless both you and WestShade agree otherwise, the arbitrator may not consolidate more than one person’s claims, and may not otherwise preside over any form of a representative or class proceeding.
								</Typography>
								<Typography component="h6" align="left" paragraph={true}>
									Liability Disclaimer
								</Typography>
								<Typography color="textSecondary" align="left" paragraph={true}>
									THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES INCLUDED IN OR AVAILABLE THROUGH THE SITE MAY INCLUDE INACCURACIES OR TYPOGRAPHICAL ERRORS. CHANGES ARE PERIODICALLY ADDED TO THE INFORMATION HEREIN. WESTSHADE AND/OR ITS
									SUPPLIERS MAY MAKE IMPROVEMENTS AND/OR CHANGES IN THE SITE AT ANY TIME. WESTSHADE AND/OR ITS SUPPLIERS MAKE NO REPRESENTATION ABOUT THE SUITABILITY, RELIABILITY, AVAILABILITY, TIMELINESS, AND ACCURACY OF THE INFORMATION,
									SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS CONTAINED ON THE SITE FOR ANY PURPOSE. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ALL SUCH INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS ARE
									PROVIDED “AS IS” WITHOUT WARRANTY OT CONDITION OF ANY KIND. WESTSHADE AND/OR ITS SUPPLIERS HEREBY DISCLAIM ALL WARRANTIES AND CONDITIONS WITH REGARD TO THIS INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS,
									INCLUDING ALL IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL WESTSHADE AND/OR ITS
									SUPPLIERS BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF USE, DATA OR PROFITS, ARISING OUT OF OR IN ANY
									WAY CONNECTED WITH THE USE OR PERFORMANCE OF THE SITE, WITH THE DELAY OR INABILITY TO USE THE SITE OR RELATED SERVICES, THE PROVISION OF OR FAILURE TO PROVIDE SERVICES, OR FOR ANY INFORMATION, SOFTWARE, PRODUCTS, SERVICES
									AND RELATED GRAPHICS OBTAINED THROUGH THE SITE, OR OTHERWISE ARISING OUT OF THE USE OF THE SITE, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, EVEN IF WESTSHADE OR ANY OF ITS SUPPLIERS HAS
									BEEN ADVISED OF THE POSSIBILITY OF DAMAGES. BECAUSE SOME STATES/JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, THE ABOVE LIMITATION MAY NOT APPLY TO YOU. IF YOU
									ARE DISSATISFIED WITH ANY PORTION OF THE SITE, OR WITH ANY OF THESE TERMS OF USE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE SITE.
								</Typography>
								<Typography component="h6" align="left" paragraph={true}>
									Termination/Access Restriction
								</Typography>
								<Typography color="textSecondary" align="left" paragraph={true}>
									WestShade reserves the right, in its sole discretion, to terminate you access to the Site and the related services or any portion thereof at any time, without notice. To the maximum extent permitted by law, this agreement
									is governed by the laws of the State of California and you hereby consent to the exclusive jurisdiction and venue of courts in California in all disputes arising out of or relating to the use of the Site. Use of the Site
									is unauthorized in any jurisdiction that does not give effect to all provisions of there Terms, including, without limitation, this section.
									<br />
									<br />
									You agree that no joint venture, partnership, employment, or agency relationship exists between you and WestShade as a result of this agreement or use of the Site. WestShade’s performance of this agreement is subject to
									existing laws and legal process, and nothing contained in this agreement is in derogation of WestShade’s right to comply with governmental, court and law enforcement requests or requirements relating to your use of the
									Site or information provided to or gathered by WestShade with respect to such use. If any part of this agreement is determined to be invalid or unenforceable pursuant to applicable law including, but not limited to, the
									warranty disclaimers and liability limitations set forth above, then the invalid or unenforceable provision will be deemed supersede by a valid, enforceable provision that most closely matches the intent of the original
									provision and the remainder of the agreement shall continue in effect.
									<br />
									<br />
									Unless otherwise specified herein, this agreement constitutes the entire agreement between the user and WestShade with respect to the Site and it supersedes all prior or contemporaneous communications and proposals,
									whether electronic, oral or written, between the user and WestShade with respect to the Site. Printed version of this agreement and of any notice given in electronic form shall be admissible in judicial or administrative
									proceedings based upon or relating to this agreement to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form. It is the express wish
									to the parties that this agreement and all related documents be written in English.
								</Typography>
								<Typography component="h6" align="left" paragraph={true}>
									Changes to Terms
								</Typography>
								<Typography color="textSecondary" align="left" paragraph={true}>
									WestShade reserves the right, in its sole discretion, to change the Terms under which westshade.com is offered. The most current version of the Terms will supersede all previous versions. WestShade encourages you to
									periodically review the Terms to stay informed of our updates.
								</Typography>
								<Typography component="h6" align="left" paragraph={true}>
									Contact Us
								</Typography>
								<Typography color="textSecondary" align="left" paragraph={true}>
									WestShade welcomes your questions or comments regarding the Terms:
									<br />
									<br />
									WestShade
									<br />
									<br />
									Email Address: support@westshade.com
									<br />
									<br />
									Telephone number: 949-751-1070
									<br />
									<br />
									Effective as of October 05, 2020
								</Typography>
							</Container>
						</CContainer>
					</>
				) : null}
			</Box>
		</React.Fragment>
	);
}

export default Terms_and_Conditions;
