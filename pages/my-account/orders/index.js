import React, {useEffect, useState} from "react";
import styled from "styled-components";

import Head from "next/head";
import {useRouter} from 'next/router'

import {Box, Button, Container, Divider, Grid, Link, Tab, Tabs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,} from "@material-ui/core";
import {Alert, AlertTitle} from '@material-ui/lab';

import Utils from "../../../utils/utils";

import CContainer from "../../../components/container";

const MXButton = styled(Button)`
    margin: 24px auto;
`;

const utils = new Utils();

function Account_Orders() {
    const router = useRouter();

    const [display, setDisplay] = useState(false);

    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [warning, setWarning] = useState(false);
    const [orders, setOrders] = useState([]);

    const fetchUserInfo = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            return await utils.getUser(token);
        } else {
            return;
        }
    };

    const fetchOrders = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            return await utils.getUserOrders(token);
        } else {
            return;
        }
    };

    const getUser = () => {
        fetchUserInfo().then(data => setUser(data))
    };

    const logout = () => {
        localStorage.setItem('token', "");
        router.push("/my-account")
    };

    const goPayment = (item) => {
        // http://34.222.1.150
        // https://westshade.d4z4b6fa1a88b.amplifyapp.com
        // let url = "http://34.222.1.150/checkout/order-pay/" + item.id + "/?pay_for_order=true&key=" + item.order_key;
        let url = "https://checkout.westshade.com/checkout/order-pay/" + item.id + "/?pay_for_order=true&key=" + item.order_key;
        // router.push(url);
        window.location.assign(url);
    };

    const changeRouter = (value) => {
        if (value === 0) {
            router.push("/my-account")
        } else if (value === 1) {
            router.push("/my-account/orders")
        } else if (value === 2) {
            router.push("/my-account/addresses")
        } else if (value === 3) {
            router.push("/my-account/details")
        } else if (value === 4) {
            logout();
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setTimeout(function () {
                setDisplay(true);
            }, 250);

            setLoggedIn(true);
            getUser();
            fetchOrders().then((data) => {
                setOrders(data);
            }).catch((error) => null)
        } else {
            setLoggedIn(false);
            router.push("/my-account")
        }
    }, []);

    useEffect(() => {
        if (!user) return;

        if (!user.billing.first_name || !user.billing.last_name || !user.billing.address_1 ||
            !user.billing.city || !user.billing.state || !user.billing.postcode || !user.billing.country ||
            !user.billing.email || !user.billing.phone || !user.shipping.first_name || !user.shipping.last_name ||
            !user.shipping.address_1 || !user.shipping.city || !user.shipping.state || !user.shipping.postcode || !user.shipping.country) {
            setWarning(true)
        } else {
            setWarning(false);
        }
    }, [user]);

    return (
        <React.Fragment>
            <Head>
                <title>My Account - View Account Details | WESTSHADE</title>
                <meta name="description"
                      content="View your recent orders, manage shipping and billing addresses, and edit your password and account details."/>
            </Head>
            <Box className="page" fontSize={14} lineHeight={1.43}>
                {display ? (
                    <CContainer>
                        <Container maxWidth="md">
                            <Grid container spacing={2}>
                                <div style={{display: "flex", marginBottom: 24, marginRight: 24}}>
                                    <div style={{paddingRight: 24}}>
                                        <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} align="left" paragraph={true}>
                                            <strong> MY ACCOUNT </strong>
                                        </Typography>
                                        <Divider/>
                                        <div className="account-tab">
                                            <Tabs
                                                orientation="vertical"
                                                variant="scrollable"
                                                value={1}
                                                onChange={(event, newValue) => changeRouter(newValue)}
                                                classes={{indicator: "account-tab-indicator"}}
                                            >
                                                <Tab id={`vertical-tab-` + 0} label="Dashboard" classes={{wrapper: 'tab-wrapper'}} disableRipple/>
                                                <Tab id={`vertical-tab-` + 1} label="Orders" classes={{wrapper: 'tab-wrapper'}} disableRipple/>
                                                <Tab id={`vertical-tab-` + 2} label="Addresses" classes={{wrapper: 'tab-wrapper'}} disableRipple/>
                                                <Tab id={`vertical-tab-` + 3} label="Account detail" classes={{wrapper: 'tab-wrapper'}} disableRipple/>
                                                <Tab id={`vertical-tab-` + 4} label="Logout" classes={{wrapper: 'tab-wrapper'}} disableRipple/>
                                            </Tabs>
                                        </div>
                                    </div>
                                    <Divider orientation="vertical"/>
                                </div>
                                <div style={{marginBottom: 24, flex: 1}}>
                                    {warning ? (
                                        <Alert severity="warning">
                                            <AlertTitle>Warning</AlertTitle>
                                            Please go to <Link href="/my-account">My Account</Link> - <Link href="/my-account/addresses">Addresses</Link> and make sure billing /
                                            shipping address is set up.
                                        </Alert>
                                    ) : null}
                                    <TableContainer>
                                        <Table aria-label="orders table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>ORDER</TableCell>
                                                    <TableCell>DATE</TableCell>
                                                    <TableCell>STATUS</TableCell>
                                                    <TableCell>TOTAL</TableCell>
                                                    <TableCell align="right">ACTIONS</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {orders.map((order) => {
                                                    let count = 0;
                                                    order.line_items.map(item => count += item.quantity);
                                                    return (
                                                        <TableRow key={order.id}>
                                                            <TableCell component="th" scope="row">{`#` + order.id}</TableCell>
                                                            <TableCell align="left">{order.date_created}</TableCell>
                                                            <TableCell align="left">{order.status}</TableCell>
                                                            <TableCell align="left"><strong>{order.currency_symbol + order.total}</strong>{` for ` + count + ` items`}</TableCell>
                                                            <TableCell align="right">
                                                                <div style={{display: "flex", justifyContent: "flex-end"}}>
                                                                    <MXButton style={{
                                                                        backgroundColor: warning ? "#e0e0e0" : "#339059",
                                                                        color: warning ? "black" : "white",
                                                                        margin: "auto 0"
                                                                    }}
                                                                              onClick={() => goPayment(order)}
                                                                              disableElevation
                                                                              disabled={warning}
                                                                    >
                                                                        {"PAY"}
                                                                    </MXButton>
                                                                    {/*<MXButton style={{backgroundColor: "#339059", color: "white", margin: "auto 0 auto 12px"}}*/}
                                                                    {/*          onClick={() => {*/}
                                                                    {/*          }}*/}
                                                                    {/*          disableElevation*/}
                                                                    {/*>*/}
                                                                    {/*    {"VIEW"}*/}
                                                                    {/*</MXButton>*/}
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </Grid>
                        </Container>
                    </CContainer>
                ) : null}
            </Box>
        </React.Fragment>
    );
}

export default Account_Orders;
