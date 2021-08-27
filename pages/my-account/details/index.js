import React, {useEffect, useState} from "react";
import styled from "styled-components";

import Head from "next/head";
import {useRouter} from 'next/router'

import {Box, Button, Container, Divider, Grid, Tab, Tabs, TextField, Typography,} from "@material-ui/core";

import Utils from "../../../utils/utils";

import CContainer from "../../../components/container";

const MXButton = styled(Button)`
    margin: 24px auto;
`;

const utils = new Utils();

function Account_Details() {
    const router = useRouter()

    const [display, setDisplay] = useState(false);

    const [user, setUser] = useState(null);

    const [errorAccountDetail, setErrorAccountDetail] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const fetchUserInfo = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            return await utils.getUser(token);
        } else {
            return;
        }
    };

    const getUser = () => {
        fetchUserInfo().then(data => setUser(data))
    };

    const fetchUpdateUser = async () => {
        if (!user.first_name || !user.last_name || !user.email) {
            setErrorAccountDetail(true);
            return;
        }
        const token = localStorage.getItem('token');
        if (token) {
            return await utils.updateUser(token, user);
        } else {
            return;
        }
    };

    const logout = () => {
        localStorage.setItem('token', "");
        router.push("/my-account")
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
        } else {
            setLoggedIn(false);
            router.push("/my-account")
        }
    }, []);

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
                                                value={3}
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
                                    {user ? (
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            <form autoComplete="off">
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={6}>
                                                        <div style={{margin: "24px auto 0"}}>
                                                            <TextField id="first-name" label="First name" variant="outlined" fullWidth
                                                                       InputLabelProps={{
                                                                           shrink: true,
                                                                       }} required
                                                                       onChange={(event) => {
                                                                           setErrorAccountDetail(false);
                                                                           let u = user;
                                                                           u.first_name = event.target.value
                                                                           setUser(u);
                                                                       }}
                                                                       defaultValue={user.first_name}
                                                                       error={errorAccountDetail}
                                                            />
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <div style={{margin: "24px auto 0"}}>
                                                            <TextField id="last-name" label="Last name" variant="outlined" fullWidth
                                                                       InputLabelProps={{
                                                                           shrink: true,
                                                                       }} required
                                                                       onChange={(event) => {
                                                                           setErrorAccountDetail(false);
                                                                           let u = user;
                                                                           u.last_name = event.target.value
                                                                           setUser(u);
                                                                       }}
                                                                       defaultValue={user.last_name}
                                                                       error={errorAccountDetail}
                                                            />
                                                        </div>
                                                    </Grid>
                                                    {/*<Grid item xs={12}>*/}
                                                    {/*    <div style={{margin: "24px auto 0"}}>*/}
                                                    {/*        <TextField id="display-name" label="Display name" variant="outlined" fullWidth*/}
                                                    {/*                   InputLabelProps={{*/}
                                                    {/*                       shrink: true,*/}
                                                    {/*                   }} required*/}
                                                    {/*                   onChange={(event) => {*/}
                                                    {/*                       setErrorAccountDetail(false);*/}
                                                    {/*                       let u = user;*/}
                                                    {/*                       u.username = event.target.value*/}
                                                    {/*                       setUser(u);*/}
                                                    {/*                   }}*/}
                                                    {/*                   defaultValue={user.username}*/}
                                                    {/*                   error={errorAccountDetail}*/}
                                                    {/*        />*/}
                                                    {/*        <Typography variant="subtitle1" color="textSecondary" align="left" style={{fontStyle: "italic"}}>*/}
                                                    {/*            This will be how your name will be displayed in the account section and in reviews*/}
                                                    {/*        </Typography>*/}
                                                    {/*    </div>*/}
                                                    {/*</Grid>*/}
                                                    <Grid item xs={12}>
                                                        <div style={{margin: "24px auto "}}>
                                                            <TextField id="email" label="Email address" variant="outlined" fullWidth
                                                                       InputLabelProps={{
                                                                           shrink: true,
                                                                       }} required
                                                                       onChange={(event) => {
                                                                           setErrorAccountDetail(false);
                                                                           let u = user;
                                                                           u.email = event.target.value
                                                                           setUser(u);
                                                                       }}
                                                                       defaultValue={user.email}
                                                                       error={errorAccountDetail}
                                                            />
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </form>
                                            <MXButton variant="contained" style={{height: 48, backgroundColor: "#339059", color: "white", marginLeft: 0}}
                                                      onClick={fetchUpdateUser}
                                                      disableElevation
                                                      disableRipple
                                            >
                                                {"SAVE CHANGE"}
                                            </MXButton>
                                        </div>
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

export default Account_Details;
