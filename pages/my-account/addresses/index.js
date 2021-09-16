import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Head from "next/head";
import { withRouter } from "next/router";

import { Box, Button, Container, Divider, Grid, Tab, Tabs, TextField, Typography } from "@material-ui/core";

import Utils from "../../../utils/utils";

import CContainer from "../../../components/container";

const MXButton = styled(Button)`
	margin: 24px auto;
`;

const utils = new Utils();

function Account_Addresses({ router }) {
	const [display, setDisplay] = useState(false);

	const [user, setUser] = useState(null);

	const [errorAccountBilling, setErrorAccountBilling] = useState(false);
	const [errorAccountShipping, setErrorAccountShipping] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);

	const fetchUserInfo = async () => {
		const token = localStorage.getItem("token");
		if (token) {
			return await utils.getUser(token);
		} else {
			return;
		}
	};

	const getUser = () => fetchUserInfo().then((data) => setUser(data));

	const updateUserBilling = async () => {
		if (!user.billing.first_name || !user.billing.last_name || !user.billing.address_1 || !user.billing.city || !user.billing.state || !user.billing.postcode || !user.billing.phone || !user.billing.email) {
			setErrorAccountBilling(true);
			return;
		}
		const token = localStorage.getItem("token");
		if (token) {
			let userData = { ...user };
			userData.billing.country = "US";
			return await utils.updateUser(token, userData);
		} else {
			return;
		}
	};

	const updateUserShipping = async () => {
		if (!user.shipping.first_name || !user.shipping.last_name || !user.shipping.address_1 || !user.shipping.city || !user.shipping.state || !user.shipping.postcode) {
			setErrorAccountShipping(true);
			return;
		}
		const token = localStorage.getItem("token");
		if (token) {
			let userData = { ...user };
			userData.shipping.country = "US";
			return await utils.updateUser(token, userData);
		} else {
			return;
		}
	};

	const logout = () => {
		localStorage.setItem("token", "");
		router.push("/my-account");
	};

	const changeRouter = (value) => {
		if (value === 0) {
			router.push("/my-account");
		} else if (value === 1) {
			router.push("/my-account/orders");
		} else if (value === 2) {
			router.push("/my-account/addresses");
		} else if (value === 3) {
			router.push("/my-account/details");
		} else if (value === 4) {
			logout();
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setTimeout(() => setDisplay(true), 250);

			setLoggedIn(true);
			getUser();
		} else {
			setLoggedIn(false);
			router.push("/my-account");
		}
	}, []);

	return (
		<React.Fragment>
			<Head>
				<title>My Account - View Account Details | WESTSHADE</title>
				<meta name="description" content="View your recent orders, manage shipping and billing addresses, and edit your password and account details." />
			</Head>
			<Box className="page" fontSize={14} lineHeight={1.43}>
				{display ? (
					<CContainer>
						<Container maxWidth="md">
							<Grid container spacing={2}>
								<div style={{ display: "flex", marginBottom: 24, marginRight: 24 }}>
									<div style={{ paddingRight: 24 }}>
										<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} align="left" paragraph={true}>
											<strong> MY ACCOUNT </strong>
										</Typography>
										<Divider />
										<div className="account-tab">
											<Tabs orientation="vertical" variant="scrollable" value={2} onChange={(event, newValue) => changeRouter(newValue)} classes={{ indicator: "account-tab-indicator" }}>
												<Tab id={`vertical-tab-` + 0} label="Dashboard" classes={{ wrapper: "tab-wrapper" }} disableRipple />
												<Tab id={`vertical-tab-` + 1} label="Orders" classes={{ wrapper: "tab-wrapper" }} disableRipple />
												<Tab id={`vertical-tab-` + 2} label="Addresses" classes={{ wrapper: "tab-wrapper" }} disableRipple />
												<Tab id={`vertical-tab-` + 3} label="Account detail" classes={{ wrapper: "tab-wrapper" }} disableRipple />
												<Tab id={`vertical-tab-` + 4} label="Logout" classes={{ wrapper: "tab-wrapper" }} disableRipple />
											</Tabs>
										</div>
									</div>
									<Divider orientation="vertical" />
								</div>
								<div style={{ marginBottom: 24, flex: 1 }}>
									{user ? (
										<>
											<Typography variant="subtitle1" color="textSecondary" align="left">
												The following addresses will be used on the checkout page by default.
											</Typography>
											<Grid container spacing={2}>
												<Grid item xs={12} sm={6}>
													<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} align="left" paragraph={true}>
														<strong> BILLING ADDRESS </strong>
													</Typography>
													<div style={{ display: "flex", flexDirection: "column" }}>
														<form autoComplete="off">
															<Grid container spacing={2}>
																<Grid item xs={12}>
																	<div style={{ margin: "24px auto 0" }}>
																		<TextField
																			id="billing-first-name"
																			label="First name"
																			variant="outlined"
																			fullWidth
																			InputLabelProps={{
																				shrink: true,
																			}}
																			required
																			onChange={(event) => {
																				setErrorAccountBilling(false);
																				let u = user;
																				u.billing.first_name = event.target.value;
																				setUser(u);
																			}}
																			defaultValue={user.billing.first_name}
																			error={errorAccountBilling}
																			autoComplete
																		/>
																	</div>
																</Grid>
																<Grid item xs={12}>
																	<div style={{ margin: "24px auto 0" }}>
																		<TextField
																			id="billing-last-name"
																			label="Last name"
																			variant="outlined"
																			fullWidth
																			InputLabelProps={{
																				shrink: true,
																			}}
																			required
																			onChange={(event) => {
																				setErrorAccountBilling(false);
																				let u = user;
																				u.billing.last_name = event.target.value;
																				setUser(u);
																			}}
																			defaultValue={user.billing.last_name}
																			error={errorAccountBilling}
																			autoComplete
																		/>
																	</div>
																</Grid>
																<Grid item xs={12}>
																	<div style={{ margin: "24px auto 0" }}>
																		<TextField
																			id="company-name"
																			label="Company name (optional)"
																			variant="outlined"
																			fullWidth
																			InputLabelProps={{
																				shrink: true,
																			}}
																			onChange={(event) => {
																				setErrorAccountBilling(false);
																				let u = user;
																				u.billing.company = event.target.value;
																				setUser(u);
																			}}
																			defaultValue={user.billing.company}
																			autoComplete
																		/>
																	</div>
																</Grid>
																<Grid item xs={12}>
																	<div style={{ margin: "24px auto 0" }}>
																		<TextField
																			id="country"
																			label="Country / Region"
																			variant="outlined"
																			fullWidth
																			InputLabelProps={{
																				shrink: true,
																			}}
																			required
																			InputProps={{
																				readOnly: true,
																			}}
																			defaultValue={"United States (US)"}
																			autoComplete
																		/>
																	</div>
																</Grid>
																<Grid item xs={12}>
																	<div style={{ margin: "24px auto 0" }}>
																		<TextField
																			id="street-address-1"
																			label="Street address"
																			variant="outlined"
																			fullWidth
																			InputLabelProps={{
																				shrink: true,
																			}}
																			required
																			onChange={(event) => {
																				setErrorAccountBilling(false);
																				let u = user;
																				u.billing.address_1 = event.target.value;
																				setUser(u);
																			}}
																			defaultValue={user.billing.address_1}
																			error={errorAccountBilling}
																			autoComplete
																		/>
																	</div>
																	<div style={{ margin: "24px auto 0" }}>
																		<TextField
																			id="street-address-2"
																			variant="outlined"
																			fullWidth
																			InputLabelProps={{
																				shrink: true,
																			}}
																			onChange={(event) => {
																				setErrorAccountBilling(false);
																				let u = user;
																				u.billing.address_2 = event.target.value;
																				setUser(u);
																			}}
																			defaultValue={user.billing.address_2}
																			autoComplete
																		/>
																	</div>
																</Grid>
																<Grid item xs={12}>
																	<div style={{ margin: "24px auto 0" }}>
																		<TextField
																			id="town-city"
																			label="Town / City"
																			variant="outlined"
																			fullWidth
																			InputLabelProps={{
																				shrink: true,
																			}}
																			required
																			onChange={(event) => {
																				setErrorAccountBilling(false);
																				let u = user;
																				u.billing.city = event.target.value;
																				setUser(u);
																			}}
																			defaultValue={user.billing.city}
																			error={errorAccountBilling}
																			autoComplete
																		/>
																	</div>
																</Grid>
																<Grid item xs={12}>
																	<div style={{ margin: "24px auto 0" }}>
																		<TextField
																			id="state"
																			label="State"
																			variant="outlined"
																			fullWidth
																			InputLabelProps={{
																				shrink: true,
																			}}
																			required
																			onChange={(event) => {
																				setErrorAccountBilling(false);
																				let u = user;
																				u.billing.state = event.target.value;
																				setUser(u);
																			}}
																			defaultValue={user.billing.state}
																			error={errorAccountBilling}
																		/>
																	</div>
																</Grid>
																<Grid item xs={12}>
																	<div style={{ margin: "24px auto 0" }}>
																		<TextField
																			id="zip"
																			label="ZIP"
																			variant="outlined"
																			fullWidth
																			InputLabelProps={{
																				shrink: true,
																			}}
																			required
																			onChange={(event) => {
																				setErrorAccountBilling(false);
																				let u = user;
																				u.billing.postcode = event.target.value;
																				setUser(u);
																			}}
																			defaultValue={user.billing.postcode}
																			error={errorAccountBilling}
																		/>
																	</div>
																</Grid>
																<Grid item xs={12}>
																	<div style={{ margin: "24px auto 0" }}>
																		<TextField
																			id="phone"
																			label="Phone"
																			variant="outlined"
																			fullWidth
																			InputLabelProps={{
																				shrink: true,
																			}}
																			required
																			onChange={(event) => {
																				setErrorAccountBilling(false);
																				let u = user;
																				u.billing.phone = event.target.value;
																				setUser(u);
																			}}
																			defaultValue={user.billing.phone}
																			error={errorAccountBilling}
																		/>
																	</div>
																</Grid>
																<Grid item xs={12}>
																	<div style={{ margin: "24px auto 0" }}>
																		<TextField
																			id="email-address"
																			label="Email address"
																			variant="outlined"
																			fullWidth
																			InputLabelProps={{
																				shrink: true,
																			}}
																			required
																			onChange={(event) => {
																				setErrorAccountBilling(false);
																				let u = user;
																				u.billing.email = event.target.value;
																				setUser(u);
																			}}
																			defaultValue={user.billing.email}
																			error={errorAccountBilling}
																		/>
																	</div>
																</Grid>
															</Grid>
														</form>
														<MXButton variant="contained" style={{ height: 48, backgroundColor: "#339059", color: "white", marginLeft: 0 }} onClick={updateUserBilling} disableElevation disableRipple>
															{"SAVE CHANGE"}
														</MXButton>
													</div>
												</Grid>
												<Grid item xs={12} sm={6}>
													<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} align="left" paragraph={true}>
														<strong> SHIPPING ADDRESS </strong>
													</Typography>
													<div style={{ display: "flex", flexDirection: "column" }}>
														<form autoComplete="off">
															<Grid container spacing={2}>
																<Grid item xs={12}>
																	<div style={{ margin: "24px auto 0" }}>
																		<TextField
																			id="billing-first-name"
																			label="First name"
																			variant="outlined"
																			fullWidth
																			InputLabelProps={{
																				shrink: true,
																			}}
																			required
																			onChange={(event) => {
																				setErrorAccountShipping(false);
																				let u = user;
																				u.shipping.first_name = event.target.value;
																				setUser(u);
																			}}
																			defaultValue={user.shipping.first_name}
																			error={errorAccountShipping}
																		/>
																	</div>
																</Grid>
																<Grid item xs={12}>
																	<div style={{ margin: "24px auto 0" }}>
																		<TextField
																			id="billing-last-name"
																			label="Last name"
																			variant="outlined"
																			fullWidth
																			InputLabelProps={{
																				shrink: true,
																			}}
																			required
																			onChange={(event) => {
																				setErrorAccountShipping(false);
																				let u = user;
																				u.shipping.last_name = event.target.value;
																				setUser(u);
																			}}
																			defaultValue={user.shipping.last_name}
																			error={errorAccountShipping}
																		/>
																	</div>
																</Grid>
																<Grid item xs={12}>
																	<div style={{ margin: "24px auto 0" }}>
																		<TextField
																			id="company-name"
																			label="Company name (optional)"
																			variant="outlined"
																			fullWidth
																			InputLabelProps={{
																				shrink: true,
																			}}
																			onChange={(event) => {
																				setErrorAccountShipping(false);
																				let u = user;
																				u.shipping.company = event.target.value;
																				setUser(u);
																			}}
																			defaultValue={user.shipping.company}
																		/>
																	</div>
																</Grid>
																<Grid item xs={12}>
																	<div style={{ margin: "24px auto 0" }}>
																		<TextField
																			id="country"
																			label="Country / Region"
																			variant="outlined"
																			fullWidth
																			InputLabelProps={{
																				shrink: true,
																			}}
																			required
																			InputProps={{
																				readOnly: true,
																			}}
																			defaultValue={"United States (US)"}
																		/>
																	</div>
																</Grid>
																<Grid item xs={12}>
																	<div style={{ margin: "24px auto 0" }}>
																		<TextField
																			id="street-address-1"
																			label="Street address"
																			variant="outlined"
																			fullWidth
																			InputLabelProps={{
																				shrink: true,
																			}}
																			required
																			onChange={(event) => {
																				setErrorAccountShipping(false);
																				let u = user;
																				u.shipping.address_1 = event.target.value;
																				setUser(u);
																			}}
																			defaultValue={user.shipping.address_1}
																			error={errorAccountShipping}
																		/>
																	</div>
																	<div style={{ margin: "24px auto 0" }}>
																		<TextField
																			id="street-address-2"
																			variant="outlined"
																			fullWidth
																			InputLabelProps={{
																				shrink: true,
																			}}
																			onChange={(event) => {
																				setErrorAccountShipping(false);
																				let u = user;
																				u.shipping.address_2 = event.target.value;
																				setUser(u);
																			}}
																			defaultValue={user.shipping.address_2}
																		/>
																	</div>
																</Grid>
																<Grid item xs={12}>
																	<div style={{ margin: "24px auto 0" }}>
																		<TextField
																			id="town-city"
																			label="Town / City"
																			variant="outlined"
																			fullWidth
																			InputLabelProps={{
																				shrink: true,
																			}}
																			required
																			onChange={(event) => {
																				setErrorAccountShipping(false);
																				let u = user;
																				u.shipping.city = event.target.value;
																				setUser(u);
																			}}
																			defaultValue={user.shipping.city}
																			error={errorAccountShipping}
																		/>
																	</div>
																</Grid>
																<Grid item xs={12}>
																	<div style={{ margin: "24px auto 0" }}>
																		<TextField
																			id="state"
																			label="State"
																			variant="outlined"
																			fullWidth
																			InputLabelProps={{
																				shrink: true,
																			}}
																			required
																			onChange={(event) => {
																				setErrorAccountShipping(false);
																				let u = user;
																				u.shipping.state = event.target.value;
																				setUser(u);
																			}}
																			defaultValue={user.shipping.state}
																			error={errorAccountShipping}
																		/>
																	</div>
																</Grid>
																<Grid item xs={12}>
																	<div style={{ margin: "24px auto 0" }}>
																		<TextField
																			id="zip"
																			label="ZIP"
																			variant="outlined"
																			fullWidth
																			InputLabelProps={{
																				shrink: true,
																			}}
																			required
																			onChange={(event) => {
																				setErrorAccountShipping(false);
																				let u = user;
																				u.shipping.postcode = event.target.value;
																				setUser(u);
																			}}
																			defaultValue={user.shipping.postcode}
																			error={errorAccountShipping}
																		/>
																	</div>
																</Grid>
															</Grid>
														</form>
														<MXButton variant="contained" style={{ height: 48, backgroundColor: "#339059", color: "white", marginLeft: 0 }} onClick={updateUserShipping} disableElevation disableRipple>
															{"SAVE CHANGE"}
														</MXButton>
													</div>
												</Grid>
											</Grid>
										</>
									) : null}
								</div>
							</Grid>
						</Container>
					</CContainer>
				) : null}
			</Box>
		</React.Fragment>
	);
}

export default withRouter(Account_Addresses);
