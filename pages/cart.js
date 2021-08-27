import React, {useEffect, useState} from 'react';
import styled from "styled-components";

import {withRouter} from "next/router";
import Head from "next/head";

import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Divider, Grow,
    Grid, Link,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography, TextField
} from "@material-ui/core";
import {Alert, AlertTitle} from "@material-ui/lab";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CloseIcon from '@material-ui/icons/Close';

import Utils from "../utils/utils";
import {NumberFn} from "../utils/tools";

import CContainer from "../components/container";

const numberFn = new NumberFn();

const utils = new Utils();

const MXButton = styled(Button)`
    margin: 24px auto;
`;

function Cart({router}) {
    const [display, setDisplay] = useState(false);

    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [coupon, setCoupon] = useState("");

    const [lineItem, setLineItem] = useState([]);
    const [lineCoupon, setLineCoupon] = useState([]);
    const [addressesDone, setAddressesDone] = useState(true);
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");

    const fetchUserInfo = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            return await utils.getUser(token);
        } else {
            return;
        }
    };

    const fetchProduct = async (id) => {
        if (!id) return;
        return await utils.getProductByWooId(id);
    };

    const getUser = () => {
        fetchUserInfo().then(data => setUser(data))
    };

    const updateCart = (c) => {
        const token = localStorage.getItem('token');
        if (token) {
            let cartList = c ? c : [...cart];
            let userData = {
                "meta_data": [
                    {
                        "key": "cart",
                        "value": cartList
                    }
                ]
            };
            localStorage.setItem('cart', "");
            utils.updateUser(token, userData).then((res) => {
                getUser();
            });
        } else {
            let cl = JSON.stringify(cart);
            localStorage.setItem('cart', cl);
        }
    };

    const checkout = () => {
        const token = localStorage.getItem('token');
        if (token) {
            let checkoutData = {
                payment_method: "bacs",
                payment_method_title: "Direct Bank Transfer",
                billing: null,
                shipping: null,
                line_items: null,
            };

            checkoutData.billing = {...user.billing};
            checkoutData.shipping = {...user.shipping};
            checkoutData.line_items = [...lineItem];
            checkoutData.coupon_lines = [...lineCoupon];

            utils.createOrder(token, checkoutData).then(res => {
                if (res.message) {
                    setShowError(true);
                    setError(res.message);
                    setTimeout(function () {
                        setShowError(false);
                        setError("");
                    }, 4000);
                } else {
                    updateCart([]);
                    // http://34.222.1.150
                    // https://westshade.d4z4b6fa1a88b.amplifyapp.com
                    // let url = "http://34.222.1.150/checkout/order-pay/" + res.id + "/?pay_for_order=true&key=" + res.order_key;
                    let url = "https://checkout.westshade.com/checkout/order-pay/" + res.id + "/?pay_for_order=true&key=" + res.order_key;
                    window.location.assign(url);
                }
            });
        } else {
            router.push("/my-account");
        }
    }

    const getSubtotal = () => {
        let price = 0;
        products.forEach((p, index) => {
            price += numberFn.strToFloat(p.price) * cart[index].quantity;
        })
        return price;
    }

    useEffect(() => {
        setTimeout(function () {
            setDisplay(true);
        }, 250);

        const token = localStorage.getItem('token');
        if (token) {
            getUser();
        } else {
            let cart = localStorage.getItem('cart');
            cart = cart ? JSON.parse(cart) : cart;
            let cl;

            if (cart && Array.isArray(cart)) {
                cl = [...cart];
            } else {
                cl = [];
            }

            let cartList = [], itemList = [];
            cl.forEach((item, index) => {
                const i = cartList.findIndex((product) => product.id === item.id);
                if (i === -1) {
                    cartList.push(item);
                } else {
                    cartList[i].quantity = cartList[i].quantity + item.quantity;
                }
            })
            setCart(cartList);

            Promise.all(
                cartList.map((product) => fetchProduct(product.id))
            ).then((responses) => {
                setProducts(responses);

                responses.forEach((res, index) => {
                    if (res.parent_id) {
                        itemList.push({
                            "product_id": res.parent_id,
                            "variation_id": res.id,
                            "quantity": cartList[index].quantity
                        })
                    } else {
                        itemList.push({
                            "product_id": res.id,
                            "quantity": cartList[index].quantity
                        })
                    }
                })
                setLineItem(itemList);
            });
        }
    }, []);

    useEffect(() => {
        if (!user) return;

        if (!user.billing.first_name || !user.billing.last_name || !user.billing.address_1 ||
            !user.billing.city || !user.billing.state || !user.billing.postcode || !user.billing.country ||
            !user.billing.email || !user.billing.phone || !user.shipping.first_name || !user.shipping.last_name ||
            !user.shipping.address_1 || !user.shipping.city || !user.shipping.state || !user.shipping.postcode || !user.shipping.country) {
            setAddressesDone(false);
        } else {
            setAddressesDone(true);
        }

        let cart = localStorage.getItem('cart');
        cart = cart ? JSON.parse(cart) : cart;
        let cl;

        if (cart && Array.isArray(cart)) {
            cl = [...cart];
        } else {
            cl = [];
        }

        let result = user.meta_data.filter(data => data.key === "cart");
        if (result.length > 0) {
            cl = cl.concat([...result[0].value]);

            let cartList = [], itemList = [];
            cl.forEach((item, index) => {
                const i = cartList.findIndex((product) => product.id === item.id);
                if (i === -1) {
                    cartList.push(item);
                } else {
                    cartList[i].quantity = cartList[i].quantity + item.quantity;
                }
            })
            setCart(cartList);

            Promise.all(
                cartList.map((product) => fetchProduct(product.id))
            ).then((responses) => {
                setProducts(responses);

                responses.forEach((res, index) => {
                    if (res.parent_id) {
                        itemList.push({
                            "product_id": res.parent_id,
                            "variation_id": res.id,
                            "quantity": cartList[index].quantity
                        })
                    } else {
                        itemList.push({
                            "product_id": res.id,
                            "quantity": cartList[index].quantity
                        })
                    }
                })
                setLineItem(itemList);
            });
        }
    }, [user]);

    return (
        <React.Fragment>
            <Head>
                <title>Shopping Cart - Proceed to Checkout | WESTSHADE</title>
                <meta name="description"
                      content="Free shipping on orders over $100. Add products to your shopping cart and proceed to checkout to place your order."/>
            </Head>
            {display ? (
                <Box className="page" fontSize={14} lineHeight={1.43}>
                    {!addressesDone ? (
                        <Alert severity="warning">
                            <AlertTitle>Warning</AlertTitle>
                            Please go to <Link href="/my-account">My Account</Link> - <Link href="/my-account/addresses">Addresses</Link> and make sure
                            billing / shipping address is set up.
                        </Alert>
                    ) : null}
                    <CContainer>
                        <Container maxWidth="md">
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={8}>
                                    <div style={{display: "flex", flexDirection: "column"}}>
                                        <Grow in={showError}
                                              style={{transformOrigin: '0 0 0', position: "absolute", top: 0, left: 0, right: 0}}
                                        >
                                            <Alert severity="error">
                                                <AlertTitle>Error</AlertTitle>
                                                {error}
                                            </Alert>
                                        </Grow>
                                        <TableContainer>
                                            <Table aria-label="orders table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell/>
                                                        <TableCell>PRODUCT</TableCell>
                                                        <TableCell>PRICE</TableCell>
                                                        <TableCell>QUANTITY</TableCell>
                                                        <TableCell align="right">SUBTOTAL</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {cart.length > 0 && products.length > 0 ? products.map((product, index) => {
                                                        return (
                                                            <TableRow key={index}>
                                                                <TableCell>
                                                                    <IconButton size="small" onClick={() => {
                                                                        let c = [...cart], p = [...products];
                                                                        c.splice(index, 1);
                                                                        p.splice(index, 1);

                                                                        setCart(c);
                                                                        setProducts(p);
                                                                    }}>
                                                                        <HighlightOffIcon/>
                                                                    </IconButton>
                                                                </TableCell>
                                                                <TableCell component="th" scope="row">{product.name}</TableCell>
                                                                <TableCell align="left">{`$` + product.price}</TableCell>
                                                                <TableCell align="left">
                                                                    <ButtonGroup classes={{root: "product-cart-quantity"}} disableElevation disableRipple>
                                                                        <Button aria-label="minus" onClick={() => {
                                                                            let p = [...cart];
                                                                            p[index].quantity -= 1;
                                                                            setCart(p);
                                                                        }}><RemoveRoundedIcon/></Button>
                                                                        <div className={'cart-quantity'}>{cart[index].quantity}</div>
                                                                        <Button aria-label="plus" onClick={() => {
                                                                            let p = [...cart];
                                                                            p[index].quantity += 1;
                                                                            setCart(p);
                                                                        }}><AddRoundedIcon/></Button>
                                                                    </ButtonGroup>
                                                                </TableCell>
                                                                <TableCell align="right"><strong>{`$` + product.price * cart[index].quantity}</strong></TableCell>
                                                            </TableRow>
                                                        )
                                                    }) : null}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <MXButton variant="contained" style={{height: 42, fontSize: 12, marginLeft: 0}} onClick={() => updateCart()} size={"small"}
                                                  disableElevation>
                                            {"UPDATE CART"}
                                        </MXButton>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Paper classes={{root: "root-paper-checkout"}}>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} align="left" paragraph={true}>
                                            <strong> CART TOTALS </strong>
                                        </Typography>
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
                                                            <div key={index} style={{display: "flex"}}>
                                                                <Typography key={index} component="h6" classes={{root: "root-typography-checkout"}} color="textSecondary"
                                                                            align="right"
                                                                            paragraph={true}>{coupon.code}</Typography>
                                                                <IconButton color="inherit" component="span" style={{padding: 2, margin: "0 4px 16px 4px"}} onClick={() => {
                                                                    let c = [...lineCoupon];
                                                                    c.splice(index, 1);
                                                                    setLineCoupon(c);
                                                                }}>
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
                                        {/*<Grid container>*/}
                                        {/*    <Grid item xs>*/}
                                        {/*        <Typography component="h6" classes={{root: "root-typography-checkout"}} align="left" paragraph={true}>*/}
                                        {/*            Tax*/}
                                        {/*        </Typography>*/}
                                        {/*    </Grid>*/}
                                        {/*    <Grid item>*/}
                                        {/*        <Typography component="h6" classes={{root: "root-typography-checkout"}} align="right" paragraph={true}></Typography>*/}
                                        {/*    </Grid>*/}
                                        {/*</Grid>*/}
                                        {/*<Divider classes={{root: "root-divider-checkout"}}/>*/}
                                        <Grid container>
                                            <Grid item xs>
                                                <Typography component="h6" classes={{root: "root-typography-checkout-total"}} align="left" paragraph={true}>
                                                    <strong>TOTAL</strong>
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography component="h6" classes={{root: "root-typography-checkout-total"}} align="right" paragraph={true}>
                                                    <strong>{`$` + getSubtotal()}</strong>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1}>
                                            <Grid item xs>
                                                <TextField id="coupon" variant="outlined"
                                                           InputLabelProps={{
                                                               shrink: true,
                                                           }}
                                                           InputProps={{
                                                               classes: {root: "root-cart-coupon", input: "root-cart-coupon-input"}
                                                           }}
                                                           onChange={(event) => setCoupon(event.target.value)}
                                                           fullWidth
                                                           placeholder={"Coupon code"}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <MXButton variant="contained"
                                                          style={{
                                                              height: 48,
                                                              color: "black",
                                                              margin: 0,
                                                              fontSize: 14
                                                          }}
                                                          onClick={() => {
                                                              let cl = [...lineCoupon];
                                                              cl.push({
                                                                  code: coupon
                                                              })
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
                                        <MXButton variant="contained"
                                                  style={{
                                                      height: 48,
                                                      backgroundColor: !addressesDone || lineItem.length === 0 ? "#e0e0e0" : "#339059",
                                                      color: "white",
                                                      marginLeft: 0
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
    )
}

export default withRouter(Cart);
