import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";

import {withRouter} from "next/router";

import {Box, Button, Checkbox, Container, Divider, Grow, Grid, List, ListItem, ListItemText, IconButton, Paper, Typography, TextField} from "@material-ui/core";
import {Alert, AlertTitle} from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";

import {Block} from "baseui/block";
import {Button as ButtonB, KIND, SHAPE} from "baseui/button";
import {PaymentCard, valid} from "baseui/payment-card";
import {MaskedInput} from "baseui/input";
import {FormControl} from "baseui/form-control";
import {StatefulTooltip, PLACEMENT, TRIGGER_TYPE} from "baseui/tooltip";
import {Checkbox as CheckboxB, LABEL_PLACEMENT} from "baseui/checkbox";

import Utils from "../../utils/utils";

import {NumberFn, UrlFn, StringFn} from "../../utils/tools";
import {EventEmitter} from "../../utils/events";

import CContainer from "../../components/container";
import {updateUser} from "../../redux/actions/userActions";
import {modifyCart} from "../../redux/actions/cartActions";

const utils = new Utils();
const numberFn = new NumberFn();
const urlFn = new UrlFn();
const stringFn = new StringFn();

const MXButton = styled(Button)`
	margin: 24px auto;
`;

function Checkout({router, orderID, orderDetail}) {
    const [display, setDisplay] = useState(false);

    const [id, setOrderID] = useState(numberFn.strToInt(orderID));
    const [order, setOrderDetail] = useState(orderDetail);

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

    const [coupon, setCoupon] = useState("");

    const [lineItem, setLineItem] = useState([]);
    const [lineCoupon, setLineCoupon] = useState([]);
    const [addressesDone, setAddressesDone] = useState(false);

    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");

    const [errorAccountBilling, setErrorAccountBilling] = useState(false);
    const [errorAccountShipping, setErrorAccountShipping] = useState(false);

    const [number, setNumber] = useState("");
    const [expiration, setExpiration] = useState("");
    const [code, setCode] = useState("");
    const [checked, setChecked] = useState(false);

    const [numberError, setNumberError] = useState(false);
    const [expirationError, setExpirationError] = useState(false);
    const [codeError, setCodeError] = useState(false);

    const dispatch = useDispatch();

    const {loggedIn, token} = useSelector(({user}) => user);

    const {card} = valid.number(number);
    let codeLength;
    if (card && card.code && card.code.size) {
        codeLength = card.code.size;
    }

    const getSubtotal = () => {
        let price = 0;
        if (lineItem.length > 0) {
            lineItem.forEach((p) => (price += numberFn.strToFloat(p.subtotal)));
        }
        return price;
    };

    // const updateCart = () => {
    //     localStorage.setItem("cart", []);
    //     EventEmitter.dispatch("updateBadge");
    // };

    const handleUpdateCart = (cartList) => {
        if (loggedIn) {
            let userData = {
                meta_data: [
                    {
                        key: "cart",
                        value: cartList,
                    },
                ],
            };
            dispatch(updateUser(token, userData));
        } else {
            dispatch(modifyCart({cart: cartList}))
        }
    }

    const updateCoupon = async () => {
        if (coupon) {
            let cl = [...lineCoupon];
            cl.push({
                code: coupon,
            });
            setCoupon("");

            let result = await utils.updateOrder(null, {id: numberFn.strToInt(id), coupon_lines: cl});
            console.log(result);

            if (result.message) {
                setShowError(true);
                setError(result.message);
                setTimeout(function () {
                    setShowError(false);
                    setError("");
                }, 4000);
            } else {
                setLineCoupon(cl);
                setOrderDetail(result);
            }
        }
    };

    const removeCoupon = async (index) => {
        let cl = [...lineCoupon];
        cl.splice(index, 1);

        let result = await utils.updateOrder(null, {id: id, coupon_lines: cl});
        if (result.message) {
            setShowError(true);
            setError(result.message);
            setTimeout(function () {
                setShowError(false);
                setError("");
            }, 4000);
        } else {
            setOrderDetail(result);
        }

        setLineCoupon(cl);
    };

    const pay = () => {
        let checkoutData = {
            id: id,
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

        checkoutData.billing = {...billingAddress};
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
            checkoutData.shipping = {...shippingAddress};
        }
        // checkoutData.line_items = order.line_items;
        // checkoutData.coupon_lines = [...lineCoupon];

        utils.updateOrder(null, checkoutData).then((res) => {
            if (res.message) {
                setShowError(true);
                setError(res.message);
                setTimeout(function () {
                    setShowError(false);
                    setError("");
                }, 4000);
            } else {
                utils.checkout({id: numberFn.strToInt(id), cc: number, exp: expiration, cvv: code}).then((res) => {
                    if (res.transactionResponse.errors) {
                        setShowError(true);
                        setError(res.transactionResponse.errors.error[0].errorText);
                        setTimeout(function () {
                            setShowError(false);
                            setError("");
                        }, 4000);
                    }
                    if (res.transactionResponse.messages) {
                        if (res.transactionResponse.messages.message[0].code === "1") {
                            handleUpdateCart([]);
                            // 支付成功
                            router.push({pathname: "/checkout/success/", query: {id: id}});
                        }
                    }
                });
            }
        });
    };

    useEffect(async () => {
        setTimeout(() => setDisplay(true), 250);

        let i = null;
        if (!id) {
            i = urlFn.getParam("id");
            if (!i) {
                router.push("/");
                return;
            } else {
                setOrderID(numberFn.strToInt(i));
            }
        } else {
            i = numberFn.strToInt(id);
        }

        if (!order || !order.id) {
            let result = await utils.updateOrder(null, {id: i});
            if (result.date_paid && result.date_completed) {
                router.push("/");
            } else {
                setOrderDetail(result);
                if (result.billing) {
                    setBillingAddress(result.billing);
                }
            }
        }
    }, []);

    useEffect(() => {
        if (!order || !order.id) return;

        setLineItem(order.line_items);
        setLineCoupon(order.coupon_lines);
    }, [order]);

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

    useEffect(() => {
        if (card && card.lengths) {
            let error = card.lengths.findIndex((l) => l === number.length) === -1;
            setNumberError(error);
        }
    }, [number]);

    useEffect(() => {
        let error = Boolean(expiration && expiration.length && !valid.expirationDate(expiration).isPotentiallyValid);
        setExpirationError(error);
    }, [expiration]);

    useEffect(() => {
        let error = Boolean(code && code.trim().length && !valid.cvv(code, codeLength).isPotentiallyValid);
        setCodeError(error);
    }, [code]);

    return (
        <React.Fragment>
            {display && order && order.id ? (
                <Box className="page" fontSize={14} lineHeight={1.43}>
                    <CContainer>
                        <Container maxWidth="md">
                            <Grow in={showError} style={{left: 0, right: 0}} className={"alert-message"}>
                                <Alert severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    {error}
                                </Alert>
                            </Grow>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} align="left" paragraph={true}>
                                        <strong> BILLING ADDRESS </strong>
                                    </Typography>
                                    <div style={{display: "flex", flexDirection: "column"}}>
                                        <form autoComplete="off">
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <div style={{margin: "24px auto 0"}}>
                                                        <TextField
                                                            id="billing-first-name"
                                                            value={billingAddress.first_name}
                                                            label="First name"
                                                            variant="outlined"
                                                            fullWidth
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            required
                                                            onChange={(event) => {
                                                                setErrorAccountBilling(false);
                                                                setBillingAddress({...billingAddress, first_name: event.target.value});
                                                            }}
                                                            error={errorAccountBilling}
                                                            autoComplete
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div style={{margin: "24px auto 0"}}>
                                                        <TextField
                                                            id="billing-last-name"
                                                            value={billingAddress.last_name}
                                                            label="Last name"
                                                            variant="outlined"
                                                            fullWidth
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            required
                                                            onChange={(event) => {
                                                                setErrorAccountBilling(false);
                                                                setBillingAddress({...billingAddress, last_name: event.target.value});
                                                            }}
                                                            error={errorAccountBilling}
                                                            autoComplete
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div style={{margin: "24px auto 0"}}>
                                                        <TextField
                                                            id="company-name"
                                                            value={billingAddress.company}
                                                            label="Company name (optional)"
                                                            variant="outlined"
                                                            fullWidth
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            onChange={(event) => {
                                                                setErrorAccountBilling(false);
                                                                setBillingAddress({...billingAddress, company: event.target.value});
                                                            }}
                                                            autoComplete
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div style={{margin: "24px auto 0"}}>
                                                        <TextField
                                                            id="country"
                                                            value={billingAddress.country}
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
                                                    <div style={{margin: "24px auto 0"}}>
                                                        <TextField
                                                            id="street-address-1"
                                                            value={billingAddress.address_1}
                                                            label="Street address"
                                                            variant="outlined"
                                                            fullWidth
                                                            InputLabelProps={{shrink: true}}
                                                            required
                                                            onChange={(event) => {
                                                                setErrorAccountBilling(false);
                                                                setBillingAddress({...billingAddress, address_1: event.target.value});
                                                            }}
                                                            error={errorAccountBilling}
                                                            autoComplete
                                                        />
                                                    </div>
                                                    <div style={{margin: "24px auto 0"}}>
                                                        <TextField
                                                            id="street-address-2"
                                                            value={billingAddress.address_2}
                                                            variant="outlined"
                                                            fullWidth
                                                            InputLabelProps={{shrink: true}}
                                                            onChange={(event) => {
                                                                setErrorAccountBilling(false);
                                                                setBillingAddress({...billingAddress, address_2: event.target.value});
                                                            }}
                                                            autoComplete
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div style={{margin: "24px auto 0"}}>
                                                        <TextField
                                                            id="town-city"
                                                            value={billingAddress.city}
                                                            label="Town / City"
                                                            variant="outlined"
                                                            fullWidth
                                                            InputLabelProps={{shrink: true}}
                                                            required
                                                            onChange={(event) => {
                                                                setErrorAccountBilling(false);
                                                                setBillingAddress({...billingAddress, city: event.target.value});
                                                            }}
                                                            error={errorAccountBilling}
                                                            autoComplete
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div style={{margin: "24px auto 0"}}>
                                                        <TextField
                                                            id="state"
                                                            value={billingAddress.state}
                                                            label="State"
                                                            variant="outlined"
                                                            fullWidth
                                                            InputLabelProps={{shrink: true}}
                                                            required
                                                            onChange={(event) => {
                                                                setErrorAccountBilling(false);
                                                                setBillingAddress({...billingAddress, state: event.target.value});
                                                            }}
                                                            error={errorAccountBilling}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div style={{margin: "24px auto 0"}}>
                                                        <TextField
                                                            id="zip"
                                                            value={billingAddress.postcode}
                                                            label="ZIP"
                                                            variant="outlined"
                                                            fullWidth
                                                            InputLabelProps={{shrink: true}}
                                                            required
                                                            onChange={(event) => {
                                                                setErrorAccountBilling(false);
                                                                setBillingAddress({...billingAddress, postcode: event.target.value});
                                                            }}
                                                            error={errorAccountBilling}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div style={{margin: "24px auto 0"}}>
                                                        <TextField
                                                            id="phone"
                                                            value={billingAddress.phone}
                                                            label="Phone"
                                                            variant="outlined"
                                                            fullWidth
                                                            InputLabelProps={{shrink: true}}
                                                            required
                                                            onChange={(event) => {
                                                                setErrorAccountBilling(false);
                                                                setBillingAddress({...billingAddress, phone: event.target.value});
                                                            }}
                                                            error={errorAccountBilling}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div style={{margin: "24px auto 0"}}>
                                                        <TextField
                                                            id="email-address"
                                                            value={billingAddress.email}
                                                            label="Email address"
                                                            variant="outlined"
                                                            fullWidth
                                                            InputLabelProps={{shrink: true}}
                                                            required
                                                            onChange={(event) => {
                                                                setErrorAccountBilling(false);
                                                                setBillingAddress({...billingAddress, email: event.target.value});
                                                            }}
                                                            error={errorAccountBilling}
                                                        />
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </form>
                                        <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", margin: "24px 0 12px 0"}}>
                                            <Checkbox checked={different} color="default" onChange={(event) => setDifferent(event.target.checked)}/>
                                            <Typography variant="subtitle1">Ship to a different address?</Typography>
                                        </div>
                                        {different ? (
                                            <form autoComplete="off">
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <div style={{margin: "24px auto 0"}}>
                                                            <TextField
                                                                id="billing-first-name"
                                                                label="First name"
                                                                variant="outlined"
                                                                fullWidth
                                                                InputLabelProps={{shrink: true}}
                                                                required
                                                                onChange={(event) => {
                                                                    setErrorAccountShipping(false);
                                                                    setShippingAddress({...shippingAddress, first_name: event.target.value});
                                                                }}
                                                                defaultValue={shippingAddress.first_name}
                                                                error={errorAccountShipping}
                                                            />
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <div style={{margin: "24px auto 0"}}>
                                                            <TextField
                                                                id="billing-last-name"
                                                                label="Last name"
                                                                variant="outlined"
                                                                fullWidth
                                                                InputLabelProps={{shrink: true}}
                                                                required
                                                                onChange={(event) => {
                                                                    setErrorAccountShipping(false);
                                                                    setShippingAddress({...shippingAddress, last_name: event.target.value});
                                                                }}
                                                                defaultValue={shippingAddress.last_name}
                                                                error={errorAccountShipping}
                                                            />
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <div style={{margin: "24px auto 0"}}>
                                                            <TextField
                                                                id="company-name"
                                                                label="Company name (optional)"
                                                                variant="outlined"
                                                                fullWidth
                                                                InputLabelProps={{shrink: true}}
                                                                onChange={(event) => {
                                                                    setErrorAccountShipping(false);
                                                                    setShippingAddress({...shippingAddress, company: event.target.value});
                                                                }}
                                                                defaultValue={shippingAddress.company}
                                                            />
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <div style={{margin: "24px auto 0"}}>
                                                            <TextField id="country" label="Country / Region" variant="outlined" fullWidth InputLabelProps={{shrink: true}} required
                                                                       InputProps={{readOnly: true}} defaultValue={"United States (US)"}/>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <div style={{margin: "24px auto 0"}}>
                                                            <TextField
                                                                id="street-address-1"
                                                                label="Street address"
                                                                variant="outlined"
                                                                fullWidth
                                                                InputLabelProps={{shrink: true}}
                                                                required
                                                                onChange={(event) => {
                                                                    setErrorAccountShipping(false);
                                                                    setShippingAddress({...shippingAddress, address_1: event.target.value});
                                                                }}
                                                                defaultValue={shippingAddress.address_1}
                                                                error={errorAccountShipping}
                                                            />
                                                        </div>
                                                        <div style={{margin: "24px auto 0"}}>
                                                            <TextField
                                                                id="street-address-2"
                                                                variant="outlined"
                                                                fullWidth
                                                                InputLabelProps={{shrink: true}}
                                                                onChange={(event) => {
                                                                    setErrorAccountShipping(false);
                                                                    setShippingAddress({...shippingAddress, address_2: event.target.value});
                                                                }}
                                                                defaultValue={shippingAddress.address_2}
                                                            />
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <div style={{margin: "24px auto 0"}}>
                                                            <TextField
                                                                id="town-city"
                                                                label="Town / City"
                                                                variant="outlined"
                                                                fullWidth
                                                                InputLabelProps={{shrink: true}}
                                                                required
                                                                onChange={(event) => {
                                                                    setErrorAccountShipping(false);
                                                                    setShippingAddress({...shippingAddress, city: event.target.value});
                                                                }}
                                                                defaultValue={shippingAddress.city}
                                                                error={errorAccountShipping}
                                                            />
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <div style={{margin: "24px auto 0"}}>
                                                            <TextField
                                                                id="state"
                                                                label="State"
                                                                variant="outlined"
                                                                fullWidth
                                                                InputLabelProps={{shrink: true}}
                                                                required
                                                                onChange={(event) => {
                                                                    setErrorAccountShipping(false);
                                                                    setShippingAddress({...shippingAddress, state: event.target.value});
                                                                }}
                                                                defaultValue={shippingAddress.state}
                                                                error={errorAccountShipping}
                                                            />
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <div style={{margin: "24px auto 0"}}>
                                                            <TextField
                                                                id="zip"
                                                                label="ZIP"
                                                                variant="outlined"
                                                                fullWidth
                                                                InputLabelProps={{shrink: true}}
                                                                required
                                                                onChange={(event) => {
                                                                    setErrorAccountShipping(false);
                                                                    setShippingAddress({...shippingAddress, postcode: event.target.value});
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
                                    <Paper classes={{root: "root-paper-checkout"}}>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} paragraph={true}>
                                            <strong> YOUR ORDER</strong>
                                        </Typography>
                                        <Grid container>
                                            <Grid item xs>
                                                <Typography component="h6" classes={{root: "root-typography-checkout-total"}} align="left" paragraph={true}>
                                                    <strong>PRODUCT</strong>
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography component="h6" classes={{root: "root-typography-checkout-total"}} align="right" paragraph={true}>
                                                    <strong>SUBTOTAL</strong>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider classes={{root: "root-divider-checkout"}}/>
                                        <List style={{marginBottom: 16}}>
                                            {/* {productList.length === lineItem.length &&
												productList.map((product, index) => {
													return (
														<ListItem key={index} className="section-image-package-listItem" style={{ alignItems: "flex-start" }}>
															<div style={{ flex: 1, paddingRight: 24 }}>
																<ListItemText primary={`${product.name} x ${lineItem[index].quantity}`} />
																{lineItem[index].meta_data &&
																	lineItem[index].meta_data.map((att, i) => {
																		return <Typography key={i} variant="subtitle2" style={{ color: "gray" }}>{`${stringFn.replaceDash(att.display_key, 1)}: ${att.display_value}`}</Typography>;
																	})}
															</div>
															<Typography variant="subtitle1">{`$${product.price}`}</Typography>
														</ListItem>
													);
												})} */}
                                            {lineItem.length > 0 &&
                                            lineItem.map((product, index) => {
                                                return (
                                                    <ListItem key={index} className="section-image-package-listItem" style={{alignItems: "flex-start"}}>
                                                        <div style={{flex: 1, paddingRight: 24}}>
                                                            <ListItemText primary={`${product.name} x ${product.quantity}`}/>
                                                            {product.meta_data &&
                                                            product.meta_data.map((att, i) => {
                                                                return <Typography key={i} variant="subtitle2"
                                                                                   style={{color: "gray"}}>{`${stringFn.replaceDash(att.display_key, 1)}: ${att.display_value}`}</Typography>;
                                                            })}
                                                        </div>
                                                        <Typography variant="subtitle1">{`$${product.price}`}</Typography>
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
                                        <Grid container>
                                            <Grid item xs>
                                                <Typography component="h6" classes={{root: "root-typography-checkout"}} align="left" paragraph={true}>
                                                    SUBTOTAL
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography component="h6" classes={{root: "root-typography-checkout"}} align="right" paragraph={true}>
                                                    <strong>{`$` + getSubtotal()}</strong>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider classes={{root: "root-divider-checkout"}}/>
                                        {order.discount_total && order.discount_total !== "0.00" ? (
                                            <>
                                                <Grid container>
                                                    <Grid item xs>
                                                        <Typography component="h6" classes={{root: "root-typography-checkout"}} align="left" paragraph={true}>
                                                            DISCOUNT
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography component="h6" classes={{root: "root-typography-checkout"}} align="right" paragraph={true}>
                                                            <strong>{`-$` + order.discount_total}</strong>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Divider classes={{root: "root-divider-checkout"}}/>
                                            </>
                                        ) : null}
                                        {lineCoupon.length > 0 ? (
                                            <>
                                                <Grid container>
                                                    <Grid item xs>
                                                        <Typography component="h6" classes={{root: "root-typography-checkout"}} align="left" paragraph={true}>
                                                            Applied Coupon
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        {lineCoupon.map((coupon, index) => (
                                                            <div key={index} style={{display: "flex", justifyContent: "flex-end"}}>
                                                                <Typography key={index} component="h6" classes={{root: "root-typography-checkout"}} color="textSecondary"
                                                                            align="right" paragraph={true}>
                                                                    {coupon.code}
                                                                </Typography>
                                                                <IconButton color="inherit" component="span" style={{padding: 2, margin: "0 4px 16px 4px"}}
                                                                            onClick={() => removeCoupon(index)}>
                                                                    <CloseIcon style={{fontSize: 12}}/>
                                                                </IconButton>
                                                            </div>
                                                        ))}
                                                    </Grid>
                                                </Grid>
                                                <Divider classes={{root: "root-divider-checkout"}}/>
                                            </>
                                        ) : null}
                                        <Grid container>
                                            <Grid item xs>
                                                <Typography component="h6" classes={{root: "root-typography-checkout"}} align="left" paragraph={true}>
                                                    SHIPPING
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography component="h6" classes={{root: "root-typography-checkout"}} align="right" paragraph={true}>
                                                    Free shipping (Approx 3-7 days)
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider classes={{root: "root-divider-checkout"}}/>
                                        <Grid container>
                                            <Grid item xs>
                                                <Typography component="h6" classes={{root: "root-typography-checkout"}} align="left" paragraph={true}>
                                                    TAX
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography component="h6" classes={{root: "root-typography-checkout"}} align="right" paragraph={true}>
                                                    <strong>{`$` + order.total_tax || 0}</strong>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider classes={{root: "root-divider-checkout"}}/>
                                        <Grid container>
                                            <Grid item xs>
                                                <Typography component="h6" classes={{root: "root-typography-checkout-total"}} align="left" paragraph={true}>
                                                    <strong>TOTAL</strong>
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography component="h6" classes={{root: "root-typography-checkout-total"}} align="right" paragraph={true}>
                                                    <strong>{`$` + order.total || 0}</strong>
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
                                                        classes: {root: "root-cart-coupon", input: "root-cart-coupon-input"},
                                                    }}
                                                    value={coupon}
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
                                                    onClick={() => updateCoupon()}
                                                    fullWidth
                                                    disableElevation
                                                >
                                                    {"APPLY"}
                                                </MXButton>
                                            </Grid>
                                        </Grid>
                                        {/* <MXButton
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
										</MXButton> */}
                                    </Paper>
                                    <Paper classes={{root: "root-paper-checkout"}}>
                                        <div className="container-selection"
                                             style={{width: "100%", alignItems: "flex-start", paddingLeft: 16, paddingRight: 16, paddingBottom: 60}}>
                                            <div style={{fontSize: 20, fontWeight: "bold", lineHeight: "28px", marginBottom: 24}}>Pay with credit card</div>
                                            <div style={{fontSize: 16, fontWeight: "500", lineHeight: "24px", marginBottom: 16}}>We accept these credit cards</div>
                                            <div style={{display: "flex", flexDirection: "row", marginBottom: 24}}>
                                                <div style={{width: 34, height: 24, marginRight: 12}}>
                                                    <img src="/images/component/footer/icon_visa.png" style={{height: "100%", objectFit: "cover"}}/>
                                                </div>
                                                <div style={{width: 34, height: 24, marginRight: 12}}>
                                                    <img src="/images/component/footer/icon_master.png" style={{height: "100%", objectFit: "cover"}}/>
                                                </div>
                                                <div style={{width: 34, height: 24, marginRight: 12}}>
                                                    <img src="/images/component/footer/icon_amex.png" style={{height: "100%", objectFit: "cover"}}/>
                                                </div>
                                                <div style={{width: 34, height: 24, marginRight: 12}}>
                                                    <img src="/images/component/footer/icon_discover.png" style={{height: "100%", objectFit: "cover"}}/>
                                                </div>
                                            </div>
                                            <div style={{fontSize: 16, fontWeight: "500", lineHeight: "24px", marginBottom: 16}}>Card information</div>
                                            <div style={{width: "100%"}}>
                                                <FormControl>
                                                    <PaymentCard
                                                        error={numberError}
                                                        value={number}
                                                        onChange={(event) => setNumber(event.currentTarget.value)}
                                                        placeholder="Credit Card number"
                                                        overrides={{
                                                            Root: {
                                                                style: ({$theme}) => ({
                                                                    borderTopWidth: "1px",
                                                                    borderRightWidth: "1px",
                                                                    borderBottomWidth: "1px",
                                                                    borderLeftWidth: "1px",
                                                                    borderTopLeftRadius: "8px",
                                                                    borderTopRightRadius: "8px",
                                                                    borderBottomLeftRadius: "8px",
                                                                    borderBottomRightRadius: "8px",
                                                                }),
                                                            },
                                                            InputContainer: {
                                                                style: ({$theme}) => ({backgroundColor: "white"}),
                                                            },
                                                            Input: {
                                                                style: ({$theme}) => ({fontSize: 14}),
                                                            },
                                                        }}
                                                        onBlur={() => setNumberError(false)}
                                                    />
                                                </FormControl>
                                                <div style={{display: "flex", flexDirection: "row", alignItems: "center", position: "relative"}}>
                                                    <FormControl
                                                        overrides={{
                                                            ControlContainer: {
                                                                style: {
                                                                    marginRight: "15px",
                                                                    marginBottom: 0,
                                                                },
                                                            },
                                                        }}
                                                    >
                                                        <MaskedInput
                                                            error={expirationError}
                                                            value={expiration}
                                                            onChange={(event) => setExpiration(event.currentTarget.value)}
                                                            placeholder="Expiration MM/YY"
                                                            mask="99/99"
                                                            overrides={{
                                                                Root: {
                                                                    style: ({$theme}) => ({
                                                                        borderTopWidth: "1px",
                                                                        borderRightWidth: "1px",
                                                                        borderBottomWidth: "1px",
                                                                        borderLeftWidth: "1px",
                                                                        borderTopLeftRadius: "8px",
                                                                        borderTopRightRadius: "8px",
                                                                        borderBottomLeftRadius: "8px",
                                                                        borderBottomRightRadius: "8px",
                                                                    }),
                                                                },
                                                                InputContainer: {
                                                                    style: ({$theme}) => ({backgroundColor: "white"}),
                                                                },
                                                                Input: {
                                                                    style: ({$theme}) => ({fontSize: 14}),
                                                                },
                                                            }}
                                                            onBlur={() => setExpirationError(false)}
                                                        />
                                                    </FormControl>
                                                    <FormControl
                                                        overrides={{
                                                            ControlContainer: {
                                                                style: {
                                                                    marginRight: "32px",
                                                                    marginBottom: 0,
                                                                },
                                                            },
                                                        }}
                                                    >
                                                        <MaskedInput
                                                            error={codeError}
                                                            value={code}
                                                            onChange={(event) => setCode(event.currentTarget.value)}
                                                            placeholder="CVC"
                                                            mask={codeLength ? "9".repeat(codeLength) : "999"}
                                                            overrides={{
                                                                Root: {
                                                                    style: ({$theme}) => ({
                                                                        borderTopWidth: "1px",
                                                                        borderRightWidth: "1px",
                                                                        borderBottomWidth: "1px",
                                                                        borderLeftWidth: "1px",
                                                                        borderTopLeftRadius: "8px",
                                                                        borderTopRightRadius: "8px",
                                                                        borderBottomLeftRadius: "8px",
                                                                        borderBottomRightRadius: "8px",
                                                                    }),
                                                                },
                                                                InputContainer: {
                                                                    style: ({$theme}) => ({backgroundColor: "white"}),
                                                                },
                                                                Input: {
                                                                    style: ({$theme}) => ({fontSize: 14}),
                                                                },
                                                            }}
                                                            onBlur={() => setCodeError(false)}
                                                        />
                                                    </FormControl>
                                                    <StatefulTooltip
                                                        placement={PLACEMENT.topRight}
                                                        triggerType={TRIGGER_TYPE.click}
                                                        autoFocus
                                                        content={() => (
                                                            <div style={{zIndex: 999}}>
                                                                <img src="/images/icon/icon-cvc.png" style={{height: "60px", objectFit: "contain"}}/>
                                                            </div>
                                                        )}
                                                        overrides={{
                                                            Body: {
                                                                style: ({$theme}) => ({
                                                                    boxShadow: "none",
                                                                    backgroundColor: "transparent",
                                                                }),
                                                            },
                                                            Inner: {
                                                                style: ({$theme}) => ({
                                                                    backgroundColor: "transparent",
                                                                    paddingRight: 0,
                                                                    paddingLeft: 0,
                                                                }),
                                                            },
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                right: 0,
                                                                width: 18,
                                                                height: 18,
                                                                border: "1px solid #8C8C8C",
                                                                backgroundColor: "#8C8C8C",
                                                                color: "white",
                                                                borderTopLeftRadius: "50%",
                                                                borderTopRightRadius: "50%",
                                                                borderBottomLeftRadius: "50%",
                                                                borderBottomRightRadius: "50%",
                                                                textAlign: "center",
                                                                fontSize: 12,
                                                                fontWeight: "bold",
                                                            }}
                                                        >
                                                            ?
                                                        </div>
                                                    </StatefulTooltip>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container-selection"
                                             style={{width: "100%", paddingLeft: 16, paddingRight: 16, borderTop: "1px solid #F0F0F0", paddingTop: 16, paddingBottom: 60}}>
                                            <div style={{fontSize: 14, lineHeight: "22px", marginBottom: 16, textAlign: "left"}}>
                                                Your personal data will be used to process your order, support your experience throughout this website, and for other purposes
                                                described in our <strong>privacy policy</strong>
                                            </div>
                                            <CheckboxB
                                                checked={checked}
                                                onChange={(e) => setChecked(e.target.checked)}
                                                labelPlacement={LABEL_PLACEMENT.right}
                                                overrides={{
                                                    Checkmark: {
                                                        style: ({$theme}) => ({
                                                            borderTopWidth: "1px",
                                                            borderRightWidth: "1px",
                                                            borderBottomWidth: "1px",
                                                            borderLeftWidth: "1px",
                                                            borderTopLeftRadius: "2px",
                                                            borderTopRightRadius: "2px",
                                                            borderBottomLeftRadius: "2px",
                                                            borderBottomRightRadius: "2px",
                                                        }),
                                                    },
                                                    Label: {
                                                        style: ({$theme}) => ({fontSize: 14, lineHeight: "22px", letterSpacing: "4%", marginBottom: 16}),
                                                    },
                                                }}
                                            >
                                                I have read and agree to the website <strong>terms and conditions</strong> <span style={{color: "red"}}>*</span>
                                            </CheckboxB>
                                            <ButtonB
                                                shape={SHAPE.pill}
                                                overrides={{
                                                    BaseButton: {
                                                        style: () => ({
                                                            width: "100%",
                                                            height: "56px",
                                                            fontSize: "16px",
                                                            // backgroundColor: "#23A4AD",
                                                            backgroundColor: "#339059",
                                                            marginTop: "8px",
                                                            marginBottom: "8px",
                                                            borderTopLeftRadius: "4px",
                                                            borderTopRightRadius: "4px",
                                                            borderBottomLeftRadius: "4px",
                                                            borderBottomRightRadius: "4px",
                                                        }),
                                                    },
                                                }}
                                                onClick={() => pay()}
                                                disabled={!number.length || !expiration.length || !code.length || expirationError || codeError || !checked}
                                            >
                                                PAY NOW
                                            </ButtonB>
                                            <div style={{display: "flex", flexDirection: "row"}}>
                                                <img src="/images/icon/icon-authorize.png" style={{width: "35px", height: "28px", objectFit: "contain"}}/>
                                                <div style={{padding: "0 8px", textAlign: "left", fontSize: "11px", lineHeight: "14px", color: "#8C8C8C", letterSpacing: "2%"}}>You
                                                    can shop at Westshade with confidence. We have partnered with Authorize.Net.
                                                </div>
                                            </div>
                                        </div>
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

Checkout.getInitialProps = async (context) => {
    const {query} = context;
    const {id} = query;

    let orderDetail = null;

    let i = numberFn.strToInt(id);
    if (i) {
        orderDetail = await utils.updateOrder(null, {id: numberFn.strToInt(i)});
    }

    return {
        orderID: i,
        orderDetail: orderDetail,
    };
};

export default withRouter(Checkout);
