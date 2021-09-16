import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Head from "next/head";
import { withRouter } from "next/router";

import { Box, Button, Container, Divider, Grid, Tab, Tabs, TextField, Typography } from "@material-ui/core";

import Utils from "../../utils/utils";
// v2
// import { logIn, logOut, getUser } from "../../redux/actions/userActions";

import CContainer from "../../components/container";

const MXButton = styled(Button)`
	margin: 24px auto;
`;

const utils = new Utils();

function Account({ router }) {
	// v2
	// const dispatch = useDispatch();
	// const { loggedIn, token, user, message } = useSelector((state) => state.user);

	const [display, setDisplay] = useState(false);

	const [user, setUser] = useState(null);

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showRegister, setShowRegister] = useState(false);
	const [error, setError] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const [tab, setTab] = useState(0);

	const fetchRegister = async () => {
		if (!email || !password) {
			setError(true);
			return;
		}
		return await utils.register({ username: email, email: email, password });
	};

	// v2
	// const login = () => {
	//     if (!username || !password) {
	//         setError(true);
	//         return;
	//     }
	//     dispatch(logIn({ username, password }));
	// };

	// const logout = () => {
	//     localStorage.setItem("token", "");
	//     dispatch(logOut());
	// };

	const fetchLogIn = async () => {
		if (!username || !password) {
			setError(true);
			return;
		}
		return await utils.logIn({ username, password });
	};

	const fetchUserInfo = async () => {
		const token = localStorage.getItem("token");
		if (token) {
			return await utils.getUser(token);
		} else {
			return;
		}
	};

	const getUser = () => {
		fetchUserInfo().then((data) => setUser(data));
	};

	const login = () => {
		fetchLogIn()
			.then((data) => getUser())
			.catch((error) => null)
			.finally(() => {
				router.reload(window.location.pathname);
			});
	};

	const logout = () => {
		localStorage.setItem("token", "");
		setLoggedIn(false);
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
		setTimeout(() => setDisplay(true), 250);

		const token = localStorage.getItem("token");
		if (token) {
			setLoggedIn(true);
			getUser();
		} else {
			setLoggedIn(false);
		}
	}, []);

	// v2
	// useEffect(() => setTimeout(() => setDisplay(true), 250), []);
	// useEffect(() => {
	//     if (loggedIn) dispatch(getUser(token));
	// }, [loggedIn]);

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
							{loggedIn ? (
								<Grid container spacing={2}>
									<div style={{ display: "flex", marginBottom: 24, marginRight: 24 }}>
										<div style={{ paddingRight: 24 }}>
											<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} align="left" paragraph={true}>
												<strong> MY ACCOUNT </strong>
											</Typography>
											<Divider />
											<div className="account-tab">
												<Tabs orientation="vertical" variant="scrollable" value={0} onChange={(event, newValue) => changeRouter(newValue)} classes={{ indicator: "account-tab-indicator" }}>
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
										<Typography variant="subtitle2" color="textSecondary" align="left">
											Hello {user ? user.username : ""},{/*(not {user ? user.username : ""}? Log out)*/}
											<br />
											<br />
											From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
										</Typography>
										<div style={{ display: "flex", flexWrap: "wrap", margin: "24px auto" }}>
											<Button variant="outlined" classes={{ root: "root-account-Paper" }} onClick={() => router.push("/my-account/orders")} disableRipple>
												<Typography variant="subtitle1">
													<strong> Order </strong>
												</Typography>
											</Button>
											<Button variant="outlined" classes={{ root: "root-account-Paper" }} onClick={() => router.push("/my-account/addresses")} disableRipple>
												<Typography variant="subtitle1">
													<strong> Addresses </strong>
												</Typography>
											</Button>
											<Button variant="outlined" classes={{ root: "root-account-Paper" }} onClick={() => router.push("/my-account/details")} disableRipple>
												<Typography variant="subtitle1">
													<strong> Account detail </strong>
												</Typography>
											</Button>
											<Button variant="outlined" classes={{ root: "root-account-Paper" }} onClick={() => setTab(4)} disableRipple>
												<Typography variant="subtitle1">
													<strong> Logout </strong>
												</Typography>
											</Button>
										</div>
									</div>
								</Grid>
							) : (
								<Grid container justifyContent="space-between" spacing={2}>
									<Grid item xs={12} md={5}>
										{!showRegister ? (
											<>
												<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} align="left" paragraph={true}>
													<strong> LOGIN </strong>
												</Typography>
												<form autoComplete="off">
													<div style={{ margin: "24px auto" }}>
														<TextField
															id="username-email"
															label="Username or email"
															variant="outlined"
															fullWidth
															InputLabelProps={{
																shrink: true,
															}}
															required
															onChange={(event) => {
																setError(false);
																setUsername(event.target.value);
															}}
															error={error}
														/>
													</div>
													<div style={{ margin: "24px auto 0" }}>
														<TextField
															id="password"
															label="Password"
															variant="outlined"
															fullWidth
															type="password"
															InputLabelProps={{
																shrink: true,
															}}
															required
															onChange={(event) => {
																setError(false);
																setPassword(event.target.value);
															}}
															error={error}
														/>
													</div>
												</form>
												<MXButton variant="contained" style={{ height: 48, backgroundColor: "#339059", color: "white" }} onClick={login} disableElevation disableRipple fullWidth>
													{"LOG IN"}
												</MXButton>
												{/*<div style={{display: "flex", justifyContent: "flex-end"}}>*/}
												{/*    <CLink className="homepage-link" color="rgba(0, 0, 0, 0.87)" href={{pathname: "/my-account/lost-password"}} size="large">*/}
												{/*        Lost your password?*/}
												{/*    </CLink>*/}
												{/*</div>*/}
											</>
										) : (
											<>
												<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} align="left" paragraph={true}>
													<strong> REGISTER </strong>
												</Typography>
												<form noValidate autoComplete="off">
													<div style={{ margin: "24px auto" }}>
														<TextField
															id="email"
															label="Email address"
															variant="outlined"
															fullWidth
															InputLabelProps={{
																shrink: true,
															}}
															required
															onChange={(event) => {
																setError(false);
																setEmail(event.target.value);
															}}
														/>
													</div>
													<div style={{ margin: "24px auto" }}>
														<TextField
															id="password"
															label="Password"
															variant="outlined"
															fullWidth
															type="password"
															InputLabelProps={{
																shrink: true,
															}}
															required
															onChange={(event) => {
																setError(false);
																setPassword(event.target.value);
															}}
														/>
													</div>
												</form>
												<div>
													<Typography variant="subtitle2" color="textSecondary" align="left">
														Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
													</Typography>
													<MXButton variant="contained" style={{ height: 48, backgroundColor: "#339059", color: "white" }} onClick={fetchRegister} disableElevation disableRipple fullWidth>
														{"REGISTER"}
													</MXButton>
												</div>
											</>
										)}
									</Grid>
									<Divider orientation="vertical" flexItem />
									<Grid item xs={12} md={5}>
										<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} paragraph={true}>
											<strong> REGISTER </strong>
										</Typography>
										<Typography color="textSecondary" paragraph={true}>
											Registering for this site allows you to access your order status and history. Just fill in the fields below, and we'll get a new account set up for you in no time. We will only ask you for information necessary to make
											the purchase process faster and easier.
										</Typography>
										<MXButton variant="contained" onClick={() => setShowRegister(!showRegister)} disableElevation disableRipple>
											{showRegister ? " LOGIN" : " REGISTER"}
										</MXButton>
									</Grid>
								</Grid>
							)}
						</Container>
					</CContainer>
				) : null}
			</Box>
		</React.Fragment>
	);
}

export default withRouter(Account);
