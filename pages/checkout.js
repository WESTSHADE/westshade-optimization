import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { withRouter } from "next/router";

import { Box, Button, Checkbox, Container, Divider, Grow, Grid, List, ListItem, ListItemText, IconButton, Paper, Typography, TextField } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";

import Utils from "../utils/utils";
import { NumberFn } from "../utils/tools";
import { EventEmitter } from "../utils/events";

const numberFn = new NumberFn();

import CContainer from "../components/container";

const utils = new Utils();

const MXButton = styled(Button)`
	margin: 24px auto;
`;

function Checkout({ router }) {
	const [display, setDisplay] = useState(false);

	const [billingAddress, setBillingAddress] = useState({
		first_name: "",
		last_name: "",
		company: "",
		address_1: "",
		address_2: "",
		city: "",
		state: "",
		postcode: "",
		country: "US",
		email: "",
		phone: "",
	});
	const [shippingAddress, setShippingAddress] = useState({
		first_name: "",
		last_name: "",
		company: "",
		address_1: "",
		address_2: "",
		city: "",
		state: "",
		postcode: "",
		country: "US",
	});
	const [different, setDifferent] = useState(false);

	const [cartList, setCartList] = useState([]);
	const [productList, setProductList] = useState([]);
	const [coupon, setCoupon] = useState("");

	const [lineItem, setLineItem] = useState([]);
	const [lineCoupon, setLineCoupon] = useState([]);
	const [addressesDone, setAddressesDone] = useState(false);

	const [showError, setShowError] = useState(false);
	const [error, setError] = useState("");

	const [errorAccountBilling, setErrorAccountBilling] = useState(false);
	const [errorAccountShipping, setErrorAccountShipping] = useState(false);

	const fetchProduct = async (id) => {
		if (!id) return;
		return await utils.getProductByWooId(id);
	};

	const getSubtotal = () => {
		let price = 0;
		if (cartList.length === productList.length) {
			productList.forEach((p, index) => {
				price += numberFn.strToFloat(p.price) * cartList[index].quantity;
			});
		}
		return price;
	};

	const updateCart = () => {
		localStorage.setItem("cart", []);
		EventEmitter.dispatch("updateBadge");
	};

	const checkout = () => {
		let checkoutData = {
			payment_method: "bacs",
			payment_method_title: "Credit Card",
			billing: null,
			shipping: {
				first_name: "",
				last_name: "",
				company: "",
				address_1: "",
				address_2: "",
				city: "",
				state: "",
				postcode: "",
				country: "US",
			},
			line_items: null,
		};

		checkoutData.billing = { ...billingAddress };
		console.log(billingAddress);
		if (!different) {
			checkoutData.shipping.first_name = billingAddress.first_name;
			checkoutData.shipping.last_name = billingAddress.last_name;
			checkoutData.shipping.company = billingAddress.company;
			checkoutData.shipping.address_1 = billingAddress.address_1;
			checkoutData.shipping.address_2 = billingAddress.address_2;
			checkoutData.shipping.city = billingAddress.city;
			checkoutData.shipping.state = billingAddress.state;
			checkoutData.shipping.postcode = billingAddress.postcode;
			checkoutData.shipping.country = billingAddress.country;
		} else {
			checkoutData.shipping = { ...shippingAddress };
		}
		checkoutData.line_items = [...lineItem];
		checkoutData.coupon_lines = [...lineCoupon];

		console.log(checkoutData);
		utils.createOrder(null, checkoutData).then((res) => {
			console.log(res);

			if (res.message) {
				setShowError(true);
				setError(res.message);
				setTimeout(function () {
					setShowError(false);
					setError("");
				}, 4000);
			} else {
				updateCart([]);
				let url = "https://checkout.westshade.com/checkout/order-pay/" + res.id + "/?pay_for_order=true&key=" + res.order_key;
				window.location.assign(url);
			}
		});
	};

	useEffect(() => {
		setTimeout(() => setDisplay(true), 250);

		let cart = localStorage.getItem("cart");
		cart = cart ? JSON.parse(cart) : cart;
		let cl;

		if (cart && Array.isArray(cart)) {
			cl = [...cart];
		} else {
			cl = [];
		}

		let cartList = [],
			itemList = [];
		cl.forEach((item, index) => {
			const i = cartList.findIndex((product) => product.id === item.id);
			if (i === -1) {
				cartList.push(item);
			} else {
				cartList[i].quantity = cartList[i].quantity + item.quantity;
			}
		});
		setCartList(cartList);

		Promise.all(cartList.map((product) => fetchProduct(product.id))).then((responses) => {
			setProductList(responses);

			responses.forEach((res, index) => {
				if (res.parent_id) {
					itemList.push({
						product_id: res.parent_id,
						variation_id: res.id,
						quantity: cartList[index].quantity,
					});
				} else {
					itemList.push({
						product_id: res.id,
						quantity: cartList[index].quantity,
					});
				}
			});
			setLineItem(itemList);
		});
	}, []);

	useEffect(() => {
		if (
			!billingAddress.first_name ||
			!billingAddress.last_name ||
			!billingAddress.address_1 ||
			!billingAddress.city ||
			!billingAddress.state ||
			!billingAddress.postcode ||
			!billingAddress.country ||
			!billingAddress.email ||
			!billingAddress.phone
		) {
			setAddressesDone(false);
		} else {
			if (!different) {
				setAddressesDone(true);
			} else {
				if (!shippingAddress.first_name || !shippingAddress.last_name || !shippingAddress.address_1 || !shippingAddress.city || !shippingAddress.state || !shippingAddress.postcode || !shippingAddress.country) {
					setAddressesDone(false);
				} else {
					setAddressesDone(true);
				}
			}
		}
	}, [different, billingAddress, shippingAddress]);

	return (
		<React.Fragment>
			{display ? (
				<Box className="page" fontSize={14} lineHeight={1.43}>
					<CContainer>
						<Container maxWidth="md">
							<Grow in={showError} style={{ transformOrigin: "0 0 0", position: "absolute", top: 0, left: 0, right: 0 }}>
								<Alert severity="error">
									<AlertTitle>Error</AlertTitle>
									{error}
								</Alert>
							</Grow>
							<Grid container spacing={4}>
								<Grid item xs={12} md={6}>
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
																setBillingAddress({ ...billingAddress, first_name: event.target.value });
															}}
															defaultValue={billingAddress.first_name}
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
																setBillingAddress({ ...billingAddress, last_name: event.target.value });
															}}
															defaultValue={billingAddress.last_name}
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
																setBillingAddress({ ...billingAddress, company: event.target.value });
															}}
															defaultValue={billingAddress.company}
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
															InputLabelProps={{ shrink: true }}
															required
															onChange={(event) => {
																setErrorAccountBilling(false);
																setBillingAddress({ ...billingAddress, address_1: event.target.value });
															}}
															defaultValue={billingAddress.address_1}
															error={errorAccountBilling}
															autoComplete
														/>
													</div>
													<div style={{ margin: "24px auto 0" }}>
														<TextField
															id="street-address-2"
															variant="outlined"
															fullWidth
															InputLabelProps={{ shrink: true }}
															onChange={(event) => {
																setErrorAccountBilling(false);
																setBillingAddress({ ...billingAddress, address_2: event.target.value });
															}}
															defaultValue={billingAddress.address_2}
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
															InputLabelProps={{ shrink: true }}
															required
															onChange={(event) => {
																setErrorAccountBilling(false);
																setBillingAddress({ ...billingAddress, city: event.target.value });
															}}
															defaultValue={billingAddress.city}
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
															InputLabelProps={{ shrink: true }}
															required
															onChange={(event) => {
																setErrorAccountBilling(false);
																setBillingAddress({ ...billingAddress, state: event.target.value });
															}}
															defaultValue={billingAddress.state}
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
															InputLabelProps={{ shrink: true }}
															required
															onChange={(event) => {
																setErrorAccountBilling(false);
																setBillingAddress({ ...billingAddress, postcode: event.target.value });
															}}
															defaultValue={billingAddress.postcode}
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
															InputLabelProps={{ shrink: true }}
															required
															onChange={(event) => {
																setErrorAccountBilling(false);
																setBillingAddress({ ...billingAddress, phone: event.target.value });
															}}
															defaultValue={billingAddress.phone}
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
															InputLabelProps={{ shrink: true }}
															required
															onChange={(event) => {
																setErrorAccountBilling(false);
																setBillingAddress({ ...billingAddress, email: event.target.value });
															}}
															defaultValue={billingAddress.email}
															error={errorAccountBilling}
														/>
													</div>
												</Grid>
											</Grid>
										</form>
										<div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", margin: "24px 0 12px 0" }}>
											<Checkbox checked={different} color="default" onChange={(event) => setDifferent(event.target.checked)} />
											<Typography component="subtitle1">Ship to a different address?</Typography>
										</div>
										{different ? (
											<form autoComplete="off">
												<Grid container spacing={2}>
													<Grid item xs={12}>
														<div style={{ margin: "24px auto 0" }}>
															<TextField
																id="billing-first-name"
																label="First name"
																variant="outlined"
																fullWidth
																InputLabelProps={{ shrink: true }}
																required
																onChange={(event) => {
																	setErrorAccountShipping(false);
																	setShippingAddress({ ...shippingAddress, first_name: event.target.value });
																}}
																defaultValue={shippingAddress.first_name}
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
																InputLabelProps={{ shrink: true }}
																required
																onChange={(event) => {
																	setErrorAccountShipping(false);
																	setShippingAddress({ ...shippingAddress, last_name: event.target.value });
																}}
																defaultValue={shippingAddress.last_name}
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
																InputLabelProps={{ shrink: true }}
																onChange={(event) => {
																	setErrorAccountShipping(false);
																	setShippingAddress({ ...shippingAddress, company: event.target.value });
																}}
																defaultValue={shippingAddress.company}
															/>
														</div>
													</Grid>
													<Grid item xs={12}>
														<div style={{ margin: "24px auto 0" }}>
															<TextField id="country" label="Country / Region" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} required InputProps={{ readOnly: true }} defaultValue={"United States (US)"} />
														</div>
													</Grid>
													<Grid item xs={12}>
														<div style={{ margin: "24px auto 0" }}>
															<TextField
																id="street-address-1"
																label="Street address"
																variant="outlined"
																fullWidth
																InputLabelProps={{ shrink: true }}
																required
																onChange={(event) => {
																	setErrorAccountShipping(false);
																	setShippingAddress({ ...shippingAddress, address_1: event.target.value });
																}}
																defaultValue={shippingAddress.address_1}
																error={errorAccountShipping}
															/>
														</div>
														<div style={{ margin: "24px auto 0" }}>
															<TextField
																id="street-address-2"
																variant="outlined"
																fullWidth
																InputLabelProps={{ shrink: true }}
																onChange={(event) => {
																	setErrorAccountShipping(false);
																	setShippingAddress({ ...shippingAddress, address_2: event.target.value });
																}}
																defaultValue={shippingAddress.address_2}
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
																InputLabelProps={{ shrink: true }}
																required
																onChange={(event) => {
																	setErrorAccountShipping(false);
																	setShippingAddress({ ...shippingAddress, city: event.target.value });
																}}
																defaultValue={shippingAddress.city}
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
																InputLabelProps={{ shrink: true }}
																required
																onChange={(event) => {
																	setErrorAccountShipping(false);
																	setShippingAddress({ ...shippingAddress, state: event.target.value });
																}}
																defaultValue={shippingAddress.state}
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
																InputLabelProps={{ shrink: true }}
																required
																onChange={(event) => {
																	setErrorAccountShipping(false);
																	setShippingAddress({ ...shippingAddress, postcode: event.target.value });
																}}
																defaultValue={shippingAddress.postcode}
																error={errorAccountShipping}
															/>
														</div>
													</Grid>
												</Grid>
											</form>
										) : null}
									</div>
								</Grid>
								<Grid item xs={12} md={6}>
									<Paper classes={{ root: "root-paper-checkout" }}>
										<Typography variant="subtitle1" classes={{ subtitle1: "information-subtitle" }} paragraph={true}>
											<strong> YOUR ORDER</strong>
										</Typography>
										<Grid container>
											<Grid item xs>
												<Typography component="h6" classes={{ root: "root-typography-checkout-total" }} align="left" paragraph={true}>
													<strong>PRODUCT</strong>
												</Typography>
											</Grid>
											<Grid item>
												<Typography component="h6" classes={{ root: "root-typography-checkout-total" }} align="right" paragraph={true}>
													<strong>SUBTOTAL</strong>
												</Typography>
											</Grid>
										</Grid>
										<Divider classes={{ root: "root-divider-checkout" }} />
										<List style={{ marginBottom: 16 }}>
											{productList.length === cartList.length &&
												productList.map((product, index) => {
													return (
														<ListItem key={index} className="section-image-package-listItem" style={{ alignItems: "flex-start" }}>
															<div style={{ flex: 1, paddingRight: 24 }}>
																<ListItemText primary={`${product.name} x ${cartList[index].quantity}`} />
																{product.attributes.map((att, i) => {
																	return <Typography key={i} variant="subtitle2" style={{ color: "gray" }}>{`${att.name}: ${att.option}`}</Typography>;
																})}
															</div>
															<Typography variant="subtitle1">{`$${product.price}`}</Typography>
														</ListItem>
													);
												})}
										</List>
										<Grid container>
											<Grid item xs>
												<Typography component="h6" classes={{ root: "root-typography-checkout" }} align="left" paragraph={true}>
													SUBTOTAL
												</Typography>
											</Grid>
											<Grid item>
												<Typography component="h6" classes={{ root: "root-typography-checkout" }} align="right" paragraph={true}>
													<strong>{`$` + getSubtotal()}</strong>
												</Typography>
											</Grid>
										</Grid>
										<Divider classes={{ root: "root-divider-checkout" }} />
										{lineCoupon.length > 0 ? (
											<>
												<Grid container>
													<Grid item xs>
														<Typography component="h6" classes={{ root: "root-typography-checkout" }} align="left" paragraph={true}>
															Applied Coupon
														</Typography>
													</Grid>
													<Grid item>
														{lineCoupon.map((coupon, index) => (
															<div key={index} style={{ display: "flex" }}>
																<Typography key={index} component="h6" classes={{ root: "root-typography-checkout" }} color="textSecondary" align="right" paragraph={true}>
																	{coupon.code}
																</Typography>
																<IconButton
																	color="inherit"
																	component="span"
																	style={{ padding: 2, margin: "0 4px 16px 4px" }}
																	onClick={() => {
																		let c = [...lineCoupon];
																		c.splice(index, 1);
																		setLineCoupon(c);
																	}}
																>
																	<CloseIcon style={{ fontSize: 12 }} />
																</IconButton>
															</div>
														))}
													</Grid>
												</Grid>
												<Divider classes={{ root: "root-divider-checkout" }} />
											</>
										) : null}
										<Grid container>
											<Grid item xs>
												<Typography component="h6" classes={{ root: "root-typography-checkout" }} align="left" paragraph={true}>
													SHIPPING
												</Typography>
											</Grid>
											<Grid item>
												<Typography component="h6" classes={{ root: "root-typography-checkout" }} align="right" paragraph={true}>
													Free shipping (Approx 3-7 days)
												</Typography>
											</Grid>
										</Grid>
										<Divider classes={{ root: "root-divider-checkout" }} />
										<Grid container>
											<Grid item xs>
												<Typography component="h6" classes={{ root: "root-typography-checkout-total" }} align="left" paragraph={true}>
													<strong>TOTAL</strong>
												</Typography>
											</Grid>
											<Grid item>
												<Typography component="h6" classes={{ root: "root-typography-checkout-total" }} align="right" paragraph={true}>
													<strong>{`$` + getSubtotal()}</strong>
												</Typography>
											</Grid>
										</Grid>
										<Grid container spacing={1}>
											<Grid item xs>
												<TextField
													id="coupon"
													variant="outlined"
													InputLabelProps={{
														shrink: true,
													}}
													InputProps={{
														classes: { root: "root-cart-coupon", input: "root-cart-coupon-input" },
													}}
													onChange={(event) => setCoupon(event.target.value)}
													fullWidth
													placeholder={"Coupon code"}
												/>
											</Grid>
											<Grid item xs>
												<MXButton
													variant="contained"
													style={{
														height: 48,
														color: "black",
														margin: 0,
														fontSize: 14,
													}}
													onClick={() => {
														let cl = [...lineCoupon];
														cl.push({
															code: coupon,
														});
														setCoupon("");
														setLineCoupon(cl);
													}}
													fullWidth
													disableElevation
												>
													{"APPLY"}
												</MXButton>
											</Grid>
										</Grid>
										<MXButton
											variant="contained"
											style={{
												height: 48,
												backgroundColor: !addressesDone || lineItem.length === 0 ? "#e0e0e0" : "#339059",
												color: "white",
												marginLeft: 0,
											}}
											onClick={checkout}
											disableElevation
											fullWidth
											disabled={!addressesDone || lineItem.length === 0}
										>
											{"PROCEED TO CHECKOUT"}
										</MXButton>
									</Paper>
								</Grid>
							</Grid>
						</Container>
					</CContainer>
				</Box>
			) : null}
		</React.Fragment>
	);
}

export default withRouter(Checkout);
