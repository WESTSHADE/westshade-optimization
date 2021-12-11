import React, {createRef, useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'

import Head from "next/head";
import Link from "next/link";

import {Block} from "baseui/block";
import {Button, SHAPE, KIND} from "baseui/button";
import {Tabs, Tab, ORIENTATION, FILL} from 'baseui/tabs-motion';
import {Input, MaskedInput} from "baseui/input";
import {Select} from 'baseui/select';
import {Avatar} from 'baseui/avatar';
import {AspectRatioBox, AspectRatioBoxBody} from "baseui/aspect-ratio-box";
import {ArrowLeft, ChevronRight, ChevronDown, ChevronUp} from 'baseui/icon';

import MButton from "Components/button-n";

import {register, logIn, logOut, getUser, updateUser, clearUserErrors} from "../../redux/actions/userActions";
import {getOrder} from "../../redux/actions/orderActions";

import USState from "Assets/state.json";

function Login() {
    const {message} = useSelector(({user}) => user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailLoginError, setEmailLoginError] = useState(false);
    const [passwordLoginError, setPasswordLoginError] = useState(false);

    const dispatch = useDispatch();

    const handleLogIn = () => {
        if (!email || !password) {
            if (!email) setEmailLoginError(true);
            if (!password) setPasswordLoginError(true);
        } else {
            dispatch(logIn({email, password}));
        }
    };

    useEffect(() => {
        if (message) {
            setEmailLoginError(true);
            setPasswordLoginError(true);
        }
    }, [message]);

    return (
        <>
            {/*<Block display="flex" justifyContent="center" font="MinXLabel24">Log in with...</Block>*/}
            <Block display="grid" gridTemplateColumns="repeat(1, 1fr)" gridRowGap={["16px", "24px"]} marginBottom="56px" paddingTop={["40px", "60px", "80px"]}>
                <Block display="grid" gridTemplateAreas={`"u" "p"`} gridRowGap={["16px", "24px"]}>
                    <Block gridArea="u">
                        <Block marginBottom="4px" font="MinXHeading12" color="MinXSecondaryText">EMAIL ADDRESS</Block>
                        <Input value={email} clearOnEscape error={emailLoginError}
                               onChange={({target}) => {
                                   if (emailLoginError) setEmailLoginError(false);
                                   if (passwordLoginError) setPasswordLoginError(false);
                                   dispatch(clearUserErrors());

                                   const {value} = target;
                                   setEmail(value);
                               }}
                               overrides={{
                                   Root: {
                                       props: {
                                           className: "container-input"
                                       },
                                   },
                               }}
                        />
                    </Block>
                    <Block gridArea="p">
                        <Block marginBottom="4px" font="MinXHeading12" color="MinXSecondaryText">PASSWORD</Block>
                        <Input value={password} clearOnEscape type="password" error={passwordLoginError}
                               onChange={({target}) => {
                                   if (emailLoginError) setEmailLoginError(false);
                                   if (passwordLoginError) setPasswordLoginError(false);
                                   dispatch(clearUserErrors());

                                   const {value} = target;
                                   setPassword(value)
                               }}
                               overrides={{
                                   Root: {
                                       props: {
                                           className: "container-input password"
                                       },
                                   },
                               }}
                        />
                    </Block>
                </Block>
                <MButton type="solid" width="100%" height="56px" marginRight="auto" marginBottom="24px" marginLeft="auto" font="MinXLabel16" text='Log in'
                         buttonStyle={{paddingTop: "20px !important", paddingBottom: "20px !important"}}
                         onClick={handleLogIn}
                />
            </Block>
        </>
    )
}

function Signup() {
    const {message} = useSelector(({user}) => user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailSignupError, setEmailSignupError] = useState(false);
    const [passwordSignupError, setPasswordSignupError] = useState(false);

    const dispatch = useDispatch();

    const handleSignUp = () => {
        if (!email || !password) {
            if (!email) setEmailSignupError(true);
            if (!password) setPasswordSignupError(true)
        } else {
            if (password.match("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$")) {
                dispatch(register({email, password}));
            } else {
                setPasswordSignupError(true)
            }
        }
    };

    useEffect(() => {
        if (message) {
            setEmailSignupError(true);
            setPasswordSignupError(true);
        }
    }, [message]);

    return (
        <>
            {/*<Block display="flex" justifyContent="center" font="MinXLabel24">Sign up with...</Block>*/}
            <Block display="grid" gridTemplateColumns="repeat(1, 1fr)" gridRowGap={["16px", "24px"]} marginBottom="56px" paddingTop={["40px", "60px", "80px"]}>
                <Block display="grid" gridTemplateAreas={`"e" "p"`} gridRowGap={["16px", "24px"]}>
                    <Block gridArea="e">
                        <Block marginBottom="4px" font="MinXHeading12" color="MinXSecondaryText">EMAIL ADDRESS</Block>
                        <Input value={email} clearOnEscape error={emailSignupError}
                               onChange={({target}) => {
                                   if (emailSignupError) setEmailSignupError(false);
                                   if (passwordSignupError) setPasswordSignupError(false);
                                   dispatch(clearUserErrors());

                                   const {value} = target;
                                   setEmail(value);
                               }}
                               overrides={{
                                   Root: {
                                       props: {
                                           className: "container-input"
                                       },
                                   },
                               }}
                        />
                    </Block>
                    <Block gridArea="p">
                        <Block marginBottom="4px" font="MinXHeading12" color="MinXSecondaryText">PASSWORD</Block>
                        <Input value={password} clearOnEscape type="password" error={passwordSignupError}
                               onChange={({target}) => {
                                   if (emailSignupError) setEmailSignupError(false);
                                   if (passwordSignupError) setPasswordSignupError(false);
                                   dispatch(clearUserErrors());

                                   const {value} = target;
                                   setPassword(value)
                               }}
                               overrides={{
                                   Root: {
                                       props: {
                                           className: "container-input password"
                                       },
                                   },
                               }}
                        />
                    </Block>
                </Block>
                <Block display="flex" flexDirection="row" font="MinXParagraph12" color="MinXSecondaryText">
                    <Block width="16px" height="16px" display="flex" flexDirection="row" alignItems="center" justifyContent="center" marginRight="12px">
                        <div style={{borderRadius: "50%", width: "5px", height: "5px", backgroundColor: "#23A4AD",}}/>
                    </Block>
                    Password must contain at least 1 number and 1 letter; it must be at least 6 characters in length.
                </Block>
                <Block font="MinXHeading14">
                    By creating your account, you agree to our <Link color="inherit" href="/terms-and-conditions" passHref><span className="cursor text-sign-up-desc">Terms and Conditions</span></Link> & <Link
                    color="inherit" href="/privacy" passHref><span className="cursor text-sign-up-desc">Privacy Policy</span></Link>.
                </Block>
                <MButton type="solid" width="100%" height="56px" marginRight="auto" marginBottom="24px" marginLeft="auto" font="MinXLabel16" text='Join Westshade'
                         buttonStyle={{paddingTop: "20px !important", paddingBottom: "20px !important"}}
                         onClick={handleSignUp}
                />
            </Block>
        </>
    )
}

function OrderDetail({detail, size}) {
    const [detailStyle, setDetailStyle] = useState({height: "0"});
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        if (collapsed) {
            setDetailStyle({height: "0"});
        } else {
            if (size.width > 479) {
                setDetailStyle({height: "347px"});
            } else {
                setDetailStyle({height: "483px"});
            }
        }
    }, [collapsed]);

    useEffect(() => {
        if (!collapsed) {
            if (size.width > 479 && detailStyle.height !== "347px") {
                setDetailStyle({height: "347px"});
            } else if (size.width < 480 && detailStyle.height === "347px") {
                setDetailStyle({height: "483px"});
            }
        }
    }, [size]);

    return (
        <Block>
            <Block height={"58px"} display="flex" alignItems="center" justifyContent="center">
                <Button kind={KIND.secondary} shape={SHAPE.pill}
                        overrides={{
                            BaseButton: {
                                style: {
                                    width: "148px",
                                    height: "26px",
                                    paddingTop: "2px",
                                    paddingRight: "12px",
                                    paddingBottom: "2px",
                                    paddingLeft: "12px",
                                    fontSize: "14px",
                                    lingHeight: "16px",
                                    color: "#8C8C8C"
                                }
                            },
                            EndEnhancer: {
                                style: {marginLeft: "6px"}
                            }
                        }}
                        onClick={() => setCollapsed(!collapsed)}
                        endEnhancer={() => collapsed ? <ChevronDown size={24}/> : <ChevronUp size={24}/>}
                >
                    Order detail
                </Button>
            </Block>
            <Block overrides={{
                Block: {
                    style: {
                        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1)', ...detailStyle
                    }
                },
            }}
            >
                <Block minHeight="20px" font="MinXParagraph14" marginBottom="16px">
                    {/*This order is unsuccessful due to some unknown issues. We have not charged.*/}
                </Block>
                <Block display="grid" gridTemplateColumns={["repeat(1,1fr)", "repeat(2,1fr)"]} gridRowGap="16px" gridColumnGap="12px" marginBottom="16px">
                    <Block font="MinXParagraph14">
                        <Block marginBottom="8px" font="MinXLabel16">Shipping Address</Block>
                        <Block marginBottom="2px">{`${detail.shipping.first_name} ${detail.shipping.last_name}`}</Block>
                        <Block marginBottom="2px">{detail.shipping.address_1}</Block>
                        {detail.shipping.address_2 ? (
                            <Block marginBottom="2px">{detail.shipping.address_2}</Block>
                        ) : null}
                        <Block marginBottom="2px">{`${detail.shipping.city} ${detail.shipping.state} ${detail.shipping.postcode}`}</Block>
                        <Block marginBottom="2px">{`${detail.shipping.country}`}</Block>
                    </Block>
                    <Block font="MinXParagraph14">
                        <Block marginBottom="8px" font="MinXLabel16">Billing Address</Block>
                        <Block marginBottom="2px">{`${detail.billing.first_name} ${detail.billing.last_name}`}</Block>
                        <Block marginBottom="2px">{detail.billing.address_1}</Block>
                        {detail.billing.address_2 ? (
                            <Block marginBottom="2px">{detail.billing.address_2}</Block>
                        ) : null}
                        <Block marginBottom="2px">{`${detail.billing.city} ${detail.billing.state} ${detail.billing.postcode}`}</Block>
                        <Block marginBottom="2px">{`${detail.billing.country}`}</Block>
                    </Block>
                </Block>
                <Block font="MinXParagraph14">
                    <Block marginBottom="8px" font="MinXLabel16">Order summary</Block>
                    <Block marginBottom="16px" paddingBottom="16px"
                           overrides={{
                               Block: {
                                   style: {
                                       borderBottomWidth: "1px",
                                       borderBottomStyle: "solid",
                                       borderBottomColor: "#F0F0F0",
                                   }
                               },
                           }}
                    >
                        <Block display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                            <Block marginBottom="2px">Subtotal</Block>
                            <Block>{detail.currency_symbol + (parseFloat(detail.total) - parseFloat(detail.shipping_total) - parseFloat(detail.total_tax) + parseFloat(detail.discount_total)).toFixed(2)}</Block>
                        </Block>
                        <Block display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                            <Block marginBottom="2px">Discount</Block>
                            <Block>{"-" + detail.currency_symbol + detail.discount_total}</Block>
                        </Block>
                        <Block display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                            <Block marginBottom="2px">Tax</Block>
                            <Block>{detail.currency_symbol + detail.total_tax}</Block>
                        </Block>
                        <Block display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                            <Block marginBottom="2px">Shipping</Block>
                            <Block>{detail.currency_symbol + detail.shipping_total}</Block>
                        </Block>
                    </Block>
                    <Block display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                        <Block marginBottom="2px">Total:</Block>
                        <Block>{detail.currency_symbol + detail.total}</Block>
                    </Block>
                </Block>
            </Block>
        </Block>
    )
}

function Orders({size}) {
    const {orders} = useSelector(({order}) => order);

    return (
        <>
            <Block marginBottom={["28px", "40px"]} font="MinXTitle32">My Orders</Block>
            <Block display="grid" gridRowGap={["16px", "16px", "24px"]}>
                {orders.map((o, index) => {
                    return (
                        <div key={index} style={{background: "#FFFFFF", border: "1px solid #D9D9D9", boxSizing: "border-box", borderRadius: "16px", overflow: "hidden"}}>
                            <Block display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" padding="16px" backgroundColor="MinXBackground" font="MinXParagraph14">
                                <Block color="MinXSecondaryText">Order: <strong style={{color: "#262626"}}>{o.id}</strong></Block>
                                <Block color="MinXSecondaryText">Date: <strong style={{color: "#262626"}}>{o.date_created}</strong></Block>
                            </Block>
                            <Block height="40px" display="flex" alignItems="center" justifyContent="center" font="MinXParagraph14"
                                   backgroundColor={(o.status === "pending" || o.status === "processing") ? "rgb(244,237,124)" : o.status === "completed" ? "rgb(153,229,178)" : "#FAF0F0"}
                                   color={(o.status === "pending" || o.status === "processing") ? "rgb(198,173,15)" : o.status === "completed" ? "rgb(0,158,73)" : "#F07C7C"}
                                   overrides={{
                                       Block: {
                                           style: {
                                               textTransform: "capitalize"
                                           }
                                       },
                                   }}
                            >
                                {o.status}
                            </Block>
                            <Block paddingRight={["8px", "16px"]} paddingBottom="16px" paddingLeft={["8px", "16px"]}>
                                {o.line_items.map((item, i) => {
                                    return (
                                        <Block key={i} display="flex" flexDirection="row" paddingTop={["24px", "20px", "16px"]} paddingBottom="16px"
                                               overrides={{
                                                   Block: {
                                                       style: {
                                                           borderBottomWidth: "1px",
                                                           borderBottomStyle: "solid",
                                                           borderBottomColor: "#F0F0F0",
                                                       }
                                                   },
                                               }}
                                        >
                                            <AspectRatioBox width={["60px", "75px"]}>
                                                <AspectRatioBoxBody as="img" src={item.image.src ? item.image.src : "/images/product/default-product.webp"} alt={item.name}/>
                                            </AspectRatioBox>
                                            <Block position="relative" display="flex" flex={1} flexDirection="column" paddingLeft={["8px", "16px"]}>
                                                <Block display="flex" flex={1} flexDirection={["column", "row"]} marginBottom={["12px", "20px"]}>
                                                    <Block display="flex" flex={1} flexDirection="column" marginBottom={["12px", "0px"]}>
                                                        <Block marginBottom="2px" font="MinXLabel14">{item.name}</Block>
                                                        {item.meta_data && item.meta_data.map((data, index) => {
                                                            return (
                                                                <Block key={index} marginBottom="2px" font="MinXParagraph14">{`${data.display_key}: ${data.value}`}</Block>
                                                            )
                                                        })}
                                                    </Block>
                                                    <Block display="flex" flexDirection={["row", "column"]} justifyContent="space-between" alignItems={[null, "flex-end"]}>
                                                        <Block font="MinXLabel14"
                                                               overrides={{
                                                                   Block: {
                                                                       style: {
                                                                           fontWeight: 400
                                                                       }
                                                                   },
                                                               }}
                                                        >${o.total}</Block>
                                                    </Block>
                                                </Block>
                                                {/*<Block display="flex" flexDirection={["column", "row"]}*/}
                                                {/*       overrides={{*/}
                                                {/*           Block: {*/}
                                                {/*               style: {*/}
                                                {/*                   whiteSpace: "wrap"*/}
                                                {/*               }*/}
                                                {/*           },*/}
                                                {/*       }}*/}
                                                {/*>*/}
                                                {/*    <strong style={{whiteSpace: "nowrap", marginRight: "12px"}}>Tracking number </strong>1Z 999 AA1 01 2345 6784*/}
                                                {/*</Block>*/}
                                            </Block>
                                        </Block>
                                    )
                                })}
                                <OrderDetail detail={o} size={size}/>
                            </Block>
                        </div>
                    )
                })}
            </Block>
        </>
    )
}

function Profile() {
    const {token, user} = useSelector(({user}) => user);

    const [userDetail, setUserDetail] = useState({...user});
    const [userDiff, setUserDiff] = useState(false);

    const dispatch = useDispatch();

    const handleSaveProfile = () => {
        let detail = {
            id: userDetail.id,
            first_name: userDetail.first_name,
            last_name: userDetail.last_name,
            email: userDetail.email,
            billing: {phone: userDetail.billing.phone}
        };

        dispatch(updateUser(token, detail));
    };

    useEffect(() => setUserDetail({...user}), [user]);

    useEffect(() => {
        if (JSON.stringify(userDetail) !== JSON.stringify(user)) {
            setUserDiff(true);
        } else {
            setUserDiff(false);
        }
    }, [userDetail]);

    return (
        <>
            <Block marginBottom={["28px", "40px"]} font="MinXTitle32">My Profile</Block>
            <Block display="grid" gridTemplateColumns="repeat(1, 1fr)" gridRowGap={["16px", "24px"]} marginBottom="56px">
                <Block display="grid" gridTemplateAreas={`"f l" "e e" "p p"`} gridColumnGap="16px" gridRowGap={["16px", "24px"]}>
                    <Block gridArea="f">
                        <Block marginBottom="4px" font="MinXHeading12" color="MinXSecondaryText">FIRST NAME</Block>
                        <Input value={userDetail.first_name} clearOnEscape
                               onChange={({target}) => {
                                   const {value} = target;

                                   let detail = {...userDetail}
                                   detail.first_name = value;
                                   setUserDetail(detail);
                               }}
                               overrides={{
                                   Root: {
                                       props: {
                                           className: "container-input"
                                       },
                                   },
                               }}
                        />
                    </Block>
                    <Block gridArea="l">
                        <Block marginBottom="4px" font="MinXHeading12" color="MinXSecondaryText">LAST NAME</Block>
                        <Input value={userDetail.last_name} clearOnEscape
                               onChange={({target}) => {
                                   const {value} = target;

                                   let detail = {...userDetail}
                                   detail.last_name = value;
                                   setUserDetail(detail);
                               }}
                               overrides={{
                                   Root: {
                                       props: {
                                           className: "container-input"
                                       },
                                   },
                               }}
                        />
                    </Block>
                    <Block gridArea="e">
                        <Block marginBottom="4px" font="MinXHeading12" color="MinXSecondaryText">EMAIL ADDRESS</Block>
                        <Input value={userDetail.email} clearOnEscape
                               onChange={({target}) => {
                                   const {value} = target;

                                   let detail = {...userDetail}
                                   detail.email = value;
                                   setUserDetail(detail);
                               }}
                               overrides={{
                                   Root: {
                                       props: {
                                           className: "container-input"
                                       },
                                   },
                               }}
                        />
                    </Block>
                    <Block gridArea="p">
                        <Block marginBottom="4px" font="MinXHeading12" color="MinXSecondaryText">PHONE NUMBER</Block>
                        <Input value={userDetail.billing.phone} clearOnEscape
                               onChange={({target}) => {
                                   const {value} = target;

                                   let detail = {...userDetail}
                                   detail.billing.phone = value;
                                   setUserDetail(detail);
                               }}
                               overrides={{
                                   Root: {
                                       props: {
                                           className: "container-input"
                                       },
                                   },
                               }}
                        />
                    </Block>
                </Block>
                <MButton width="100%" height="56px" font="MinXLabel16" text='Save' color="white" onClick={handleSaveProfile} disabled={!userDiff}/>
            </Block>
        </>
    )
}

function Address() {
    const {token, user} = useSelector(({user}) => user);

    const [shippingDetail, setShippingDetail] = useState({...user.shipping});
    const [shippingDiff, setShippingDiff] = useState(false);

    const [selectedState, setSelectedState] = useState([]);

    const dispatch = useDispatch();

    const handleSaveAddress = () => {
        let temp = {...shippingDetail};
        // if (temp.phone) temp.phone = temp.phone.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/^[\s\d]+/, '');
        dispatch(updateUser(token, {shipping: {...temp}}))
    };

    useEffect(() => {
        setShippingDetail({...user.shipping});

        let state = USState.find(s => s.id === user.shipping.state);
        if (state) setSelectedState([state]);
    }, [user.shipping]);

    useEffect(() => {
        if (JSON.stringify(shippingDetail) !== JSON.stringify(user.shipping)) {
            setShippingDiff(true);
        } else {
            setShippingDiff(false);
        }
    }, [shippingDetail]);

    return (
        <>
            <Block marginBottom={["28px", "40px"]} font="MinXTitle32">Address</Block>
            <Block display="grid" gridTemplateColumns="repeat(1, 1fr)" gridRowGap={["16px", "24px"]} marginBottom="56px">
                <Block display="grid" gridTemplateAreas={`"f l" "a1 a1" "a2 a2" "cp cp" "c s" "z ct" "p p"`} gridColumnGap="16px" gridRowGap={["16px", "24px"]}>
                    <Block gridArea="f">
                        <Block marginBottom="4px" font="MinXHeading12" color="MinXSecondaryText">FIRST NAME</Block>
                        <Input value={shippingDetail.first_name} clearOnEscape
                               onChange={({target}) => {
                                   const {value} = target;

                                   let detail = {...shippingDetail}
                                   detail.first_name = value;
                                   setShippingDetail(detail);
                               }}
                               overrides={{
                                   Root: {
                                       props: {
                                           className: "container-input"
                                       },
                                   },
                               }}
                        />
                    </Block>
                    <Block gridArea="l">
                        <Block marginBottom="4px" font="MinXHeading12" color="MinXSecondaryText">LAST NAME</Block>
                        <Input value={shippingDetail.last_name} clearOnEscape
                               onChange={({target}) => {
                                   const {value} = target;

                                   let detail = {...shippingDetail}
                                   detail.last_name = value;
                                   setShippingDetail(detail);
                               }}
                               overrides={{
                                   Root: {
                                       props: {
                                           className: "container-input"
                                       },
                                   },
                               }}
                        />
                    </Block>
                    <Block gridArea="a1">
                        <Block marginBottom="4px" font="MinXHeading12" color="MinXSecondaryText">ADDRESS LINE 1</Block>
                        <Input value={shippingDetail.address_1} clearOnEscape
                               onChange={({target}) => {
                                   const {value} = target;

                                   let detail = {...shippingDetail}
                                   detail.address_1 = value;
                                   setShippingDetail(detail);
                               }}
                               overrides={{
                                   Root: {
                                       props: {
                                           className: "container-input"
                                       },
                                   },
                               }}
                        />
                    </Block>
                    <Block gridArea="a2">
                        <Block marginBottom="4px" font="MinXHeading12" color="MinXSecondaryText">ADDRESS LINE 2 <span>(optional)</span></Block>
                        <Input value={shippingDetail.address_2} clearOnEscape
                               onChange={({target}) => {
                                   const {value} = target;

                                   let detail = {...shippingDetail}
                                   detail.address_2 = value;
                                   setShippingDetail(detail);
                               }}
                               overrides={{
                                   Root: {
                                       props: {
                                           className: "container-input"
                                       },
                                   },
                               }}
                        />
                    </Block>
                    <Block gridArea="cp">
                        <Block marginBottom="4px" font="MinXHeading12" color="MinXSecondaryText">COMPANY <span>(optional)</span></Block>
                        <Input value={shippingDetail.company} clearOnEscape
                               onChange={({target}) => {
                                   const {value} = target;

                                   let detail = {...shippingDetail}
                                   detail.company = value;
                                   setShippingDetail(detail);
                               }}
                               overrides={{
                                   Root: {
                                       props: {
                                           className: "container-input"
                                       },
                                   },
                               }}
                        />
                    </Block>
                    <Block gridArea="c">
                        <Block marginBottom="4px" font="MinXHeading12" color="MinXSecondaryText">CITY</Block>
                        <Input value={shippingDetail.city} clearOnEscape
                               onChange={({target}) => {
                                   const {value} = target;

                                   let detail = {...shippingDetail}
                                   detail.city = value;
                                   setShippingDetail(detail);
                               }}
                               overrides={{
                                   Root: {
                                       props: {
                                           className: "container-input"
                                       },
                                   },
                               }}
                        />
                    </Block>
                    <Block gridArea="s">
                        <Block marginBottom="4px" font="MinXHeading12" color="MinXSecondaryText">STATE</Block>
                        {/*<Input value={shippingDetail.state} clearOnEscape*/}
                        {/*       onChange={({target}) => {*/}
                        {/*           const {value} = target;*/}

                        {/*           let detail = {...shippingDetail}*/}
                        {/*           detail.state = value;*/}
                        {/*           setShippingDetail(detail);*/}
                        {/*       }}*/}
                        {/*       overrides={{*/}
                        {/*           Root: {*/}
                        {/*               props: {*/}
                        {/*                   className: "container-input"*/}
                        {/*               },*/}
                        {/*           },*/}
                        {/*       }}*/}
                        {/*/>*/}
                        <Select labelKey="label" valueKey="id" value={selectedState} options={USState} clearable={false}
                                onChange={({value}) => {
                                    if (value.length > 0) {
                                        setSelectedState(value);

                                        let detail = {...shippingDetail}
                                        detail.state = value[0].id;
                                        setShippingDetail(detail);
                                    }
                                }}
                                overrides={{
                                    ControlContainer: {
                                        props: {
                                            className: "container-input-select"
                                        },
                                    },
                                    Dropdown: {
                                        props: {
                                            className: "container-input-select-dropdown"
                                        },
                                    },
                                }}
                        />
                    </Block>
                    <Block gridArea="z">
                        <Block marginBottom="4px" font="MinXHeading12" color="MinXSecondaryText">ZIP CODE</Block>
                        <Input value={shippingDetail.postcode} clearOnEscape
                               onChange={({target}) => {
                                   const {value} = target;
                                   let detail = {...shippingDetail}
                                   detail.postcode = value;
                                   setShippingDetail(detail);
                               }}
                               overrides={{
                                   Root: {
                                       props: {
                                           className: "container-input"
                                       },
                                   },
                               }}
                        />
                    </Block>
                    <Block gridArea="ct">
                        <Block marginBottom="4px" font="MinXHeading12" color="MinXSecondaryText">COUNTRY</Block>
                        <Input value="United States" disabled
                               overrides={{
                                   Root: {
                                       props: {
                                           className: "container-input"
                                       },
                                   },
                               }}
                        />
                    </Block>
                    <Block gridArea="p">
                        <Block marginBottom="4px" font="MinXHeading12" color="MinXSecondaryText">PHONE NUMBER</Block>
                        <Input value={shippingDetail.phone} clearOnEscape
                               onChange={({target}) => {
                                   const {value} = target;

                                   let detail = {...shippingDetail}
                                   detail.phone = value;
                                   setShippingDetail(detail);
                               }}
                               overrides={{
                                   Root: {
                                       props: {
                                           className: "container-input"
                                       },
                                   },
                               }}
                        />
                    </Block>
                </Block>
                <MButton width="100%" height="56px" font="MinXLabel16" text='Save' color="white" onClick={handleSaveAddress} disabled={!shippingDiff}/>
            </Block>
        </>
    )
}

function Account({size}) {
    const [tabsRefs, setTabsRefs] = useState([]);
    const [displayTabs, setDisplayTabs] = useState(false);
    const [tabLeft, setTabLeft] = useState(0);

    const [accountActiveTabKey, setAccountActiveTabKey] = React.useState("0");
    const [loginActiveTabKey, setLoginActiveTabKey] = React.useState("0");

    const [contentStyle, setContentStyle] = useState({marginLeft: "auto"});

    const dispatch = useDispatch();

    const {loggedIn, token, user} = useSelector(({user}) => user);

    const handleLogout = () => {
        dispatch(logOut());
        setAccountActiveTabKey("0");
    }

    useEffect(() => {
        setTabsRefs((tabsRefs) => Array(2).fill(null).map((_, i) => tabsRefs[i] || createRef()));
    }, []);

    useEffect(() => {
        if (loggedIn) {
            dispatch(getUser(token));
            dispatch(getOrder(token));
        } else {
            if (displayTabs) {
                setTabLeft((tabsRefs[loginActiveTabKey].current.clientWidth - 24) / 2)
            }
        }
    }, [loggedIn]);

    useEffect(() => {
        if (tabsRefs.length > 0) setDisplayTabs(true);
    }, [tabsRefs]);

    useEffect(() => {
        if (displayTabs && !loggedIn) {
            setTabLeft((tabsRefs[loginActiveTabKey].current.clientWidth - 24) / 2)
        }
    }, [displayTabs]);

    useEffect(() => {
        if (size.width > 959 && contentStyle.marginLeft !== "auto") {
            setContentStyle({marginLeft: "auto"});
        } else if (size.width < 960 && contentStyle.marginLeft === "auto") {
            setContentStyle({marginLeft: "0"});
        }
    }, [size]);

    return (
        <React.Fragment>
            <Head>
                <title>My Account | WESTSHADE</title>
                {/*<meta name="description" content="View frequently asked questions about our shipping and return policies, estimated delivery, damaged items, and refunds."/>*/}
            </Head>
            {loggedIn ? (
                <>
                    <Block position="absolute" maxWidth="1920px" height="100%" right={0} left={0} top={0} bottom={0} backgroundColor={["white", "white", "MinXBackground"]} marginRight="auto" marginLeft="auto"/>
                    <Block position="relative" maxWidth={["auto", "auto", "960px"]} display="grid" gridTemplateColumns={["100vw 100vw", "100vw 100vw", "213px 679px"]} gridColumnGap={["0", "0", "20px"]} justifyContent={["", "", "center"]}
                           marginRight="auto" overflow="hidden"
                           overrides={{
                               Block: {
                                   style: {
                                       transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1)', ...contentStyle
                                   }
                               },
                           }}
                    >
                        <Block width="100%" height="max-content" paddingRight={["16px", "16px", "0px"]} paddingBottom="16px" paddingLeft={["16px", "16px", "0px"]} backgroundColor="white">
                            <Block display="flex" flexDirection="row" paddingTop={["24px", "40px"]} paddingRight="16px" paddingBottom="20px" paddingLeft="16px">
                                <Avatar name={user.first_name} size="50px"
                                        overrides={{
                                            Initials: {
                                                style: {fontSize: "32px", fontWeight: "bold"}
                                            }
                                        }}
                                />
                                <Block display="flex" flexDirection="column" justifyContent="center" paddingLeft="16px">
                                    <Block minHeight="20px" font="MinXParagraph14">Hi,</Block>
                                    <Block minHeight="28px" font="MinXHeading20"
                                           overrides={{
                                               Block: {
                                                   style: {
                                                       whiteSpace: "nowrap"
                                                   }
                                               },
                                           }}
                                    >
                                        {`${user.first_name} ${user.last_name}`}
                                    </Block>
                                </Block>
                            </Block>
                            <Tabs activeKey={accountActiveTabKey} orientation={ORIENTATION.vertical}
                                  onChange={({activeKey}) => {
                                      setAccountActiveTabKey(activeKey);
                                      if (size.width < 960) {
                                          setContentStyle({marginLeft: "-100vw"});
                                      }
                                  }}
                                  overrides={{
                                      TabList: {
                                          style: {
                                              width: "100%", paddingRight: 0
                                          },
                                      },
                                      TabBorder: {props: {hidden: true}},
                                      TabHighlight: {
                                          style: {
                                              backgroundColor: size.width < 960 ? "none" : "#23A4AD",
                                          },
                                      },
                                  }}
                            >
                                <Tab title="My Order"
                                     artwork={() => size.width < 960 ? <ChevronRight size={24}/> : null}
                                     overrides={{
                                         Tab: {
                                             style: ({$isActive}) => ({
                                                 width: "100%", height: "50px", justifyContent: "flex-start", flexDirection: "row-reverse", background: $isActive ? "#F5FCFC" : "white"
                                             })
                                         },
                                         TabPanel: {
                                             style: {display: "none"}
                                         },
                                         ArtworkContainer: {
                                             style: {
                                                 marginRight: 0,
                                                 marginLeft: "auto",
                                             }
                                         }
                                     }}
                                />
                                <Tab title="My Profile"
                                     artwork={() => size.width < 960 ? <ChevronRight size={24}/> : null}
                                     overrides={{
                                         Tab: {
                                             style: ({$isActive}) => ({
                                                 width: "100%", height: "50px", justifyContent: "flex-start", flexDirection: "row-reverse", background: $isActive ? "#F5FCFC" : "white"
                                             })
                                         },
                                         TabPanel: {
                                             style: {display: "none"}
                                         },
                                         ArtworkContainer: {
                                             style: {
                                                 marginRight: 0,
                                                 marginLeft: "auto",
                                             }
                                         }
                                     }}
                                />
                                <Tab title="Addresses"
                                     artwork={() => size.width < 960 ? <ChevronRight size={24}/> : null}
                                     overrides={{
                                         Tab: {
                                             style: ({$isActive}) => ({
                                                 width: "100%", height: "50px", justifyContent: "flex-start", flexDirection: "row-reverse", background: $isActive ? "#F5FCFC" : "white"
                                             })
                                         },
                                         TabPanel: {
                                             style: {display: "none"}
                                         },
                                         ArtworkContainer: {
                                             style: {
                                                 marginRight: 0,
                                                 marginLeft: "auto",
                                             }
                                         }
                                     }}
                                />
                                {/*<Tab title="Change Password"*/}
                                {/*     artwork={() => size.width < 960 ? <ChevronRight size={24}/> : null}*/}
                                {/*     overrides={{*/}
                                {/*         Tab: {*/}
                                {/*             style: ({$isActive}) => ({*/}
                                {/*                 width: "100%", height: "50px", justifyContent: "flex-start", flexDirection: "row-reverse", background: $isActive ? "#F5FCFC" : "white"*/}
                                {/*             })*/}
                                {/*         },*/}
                                {/*         TabPanel: {*/}
                                {/*             style: {display: "none"}*/}
                                {/*         },*/}
                                {/*         ArtworkContainer: {*/}
                                {/*             style: {*/}
                                {/*                 marginRight: 0,*/}
                                {/*                 marginLeft: "auto",*/}
                                {/*             }*/}
                                {/*         }*/}
                                {/*     }}*/}
                                {/*/>*/}
                                {/*<Tab title="Subscription"*/}
                                {/*     artwork={() => size.width < 960 ? <ChevronRight size={24}/> : null}*/}
                                {/*     overrides={{*/}
                                {/*         Tab: {*/}
                                {/*             style: ({$isActive}) => ({*/}
                                {/*                 width: "100%", height: "50px", justifyContent: "flex-start", flexDirection: "row-reverse", background: $isActive ? "#F5FCFC" : "white"*/}
                                {/*             })*/}
                                {/*         },*/}
                                {/*         TabPanel: {*/}
                                {/*             style: {display: "none"}*/}
                                {/*         },*/}
                                {/*         ArtworkContainer: {*/}
                                {/*             style: {*/}
                                {/*                 marginRight: 0,*/}
                                {/*                 marginLeft: "auto",*/}
                                {/*             }*/}
                                {/*         }*/}
                                {/*     }}*/}
                                {/*/>*/}
                            </Tabs>
                            <Button kind={KIND.minimal}
                                    overrides={{
                                        BaseButton: {
                                            style: {
                                                width: "100%",
                                                justifyContent: "flex-start",
                                                paddingTop: "16px",
                                                paddingRight: "16px",
                                                paddingBottom: "16px",
                                                paddingLeft: "16px",
                                                backgroundColor: "white",
                                                fontSize: "14px",
                                                lingHeight: "16px"
                                            }
                                        }
                                    }}
                                    onClick={() => handleLogout()}
                            >
                                Logout
                            </Button>
                        </Block>
                        <Block width="100%" paddingTop={["24px", "40px", "50px"]} paddingRight={["16px", "16px", "32px"]} paddingBottom={["28px", "68px"]} paddingLeft={["16px", "16px", "32px"]} backgroundColor="white">
                            <Block display={["flex", "flex", "none"]} flexDirection="row" marginBottom={["24px", "40px", "0px"]}>
                                <Button kind={KIND.minimal} startEnhancer={() => <ArrowLeft size={28}/>}
                                        overrides={{
                                            BaseButton: {
                                                style: {
                                                    paddingTop: "0px",
                                                    paddingRight: "5px",
                                                    paddingBottom: "0px",
                                                    paddingLeft: "5px",
                                                    backgroundColor: "white",
                                                    fontSize: "14px",
                                                    fontWeight: 500,
                                                    lingHeight: "22px",
                                                    ":hover": {backgroundColor: "transparent"},
                                                    ":active": {backgroundColor: "transparent"}
                                                }
                                            }
                                        }}
                                        onClick={() => setContentStyle({marginLeft: "0"})}>
                                    Back
                                </Button>
                            </Block>
                            {accountActiveTabKey.toString() === "0" ? (
                                <Orders size={size}/>
                            ) : accountActiveTabKey.toString() === "1" ? (
                                <Profile/>
                            ) : accountActiveTabKey.toString() === "2" ? (
                                <Address/>
                            ) : null}
                        </Block>
                    </Block>
                </>
            ) : (
                <>
                    {displayTabs ? (
                        <Block className="container-display" display="flex" flexDirection="column" width={["100%", "480px"]} position="relative" alignItems="center"
                               paddingTop="24px" paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}
                        >
                            <Block width="100%" font="MinXLabel20">
                                <Tabs activeKey={loginActiveTabKey} fill={FILL.fixed} onChange={({activeKey}) => setLoginActiveTabKey(activeKey)}
                                      overrides={{
                                          Root: {
                                              style: {width: "100%", maxWidth: "420px", marginRight: "auto", marginLeft: "auto"}
                                          },
                                          TabBorder: {props: {hidden: true}},
                                          TabHighlight: {
                                              props: {
                                                  className: "tab-highlight-horizon"
                                              },
                                              style: {left: tabLeft + "px"}
                                          },
                                      }}
                                >
                                    <Tab title="LOG IN" tabRef={tabsRefs[0]}
                                         overrides={{
                                             Tab: {
                                                 style: ({$isActive}) => ({
                                                     fontSize: "inherit",
                                                     fontWeight: "inherit",
                                                     lineHeight: "inherit",
                                                     color: $isActive ? "#262626" : "#BFBFBF",
                                                     paddingTop: "12px",
                                                     paddingBottom: "12px",
                                                     ":hover": {background: "none"}
                                                 }),
                                             },
                                             TabPanel: {
                                                 style: {paddingTop: "40px", paddingRight: 0, paddingBottom: 0, paddingLeft: 0},
                                             },
                                         }}
                                    >
                                        <Login/>
                                    </Tab>
                                    <Tab title="SIGN UP" tabRef={tabsRefs[1]}
                                         overrides={{
                                             Tab: {
                                                 style: ({$isActive}) => ({
                                                     fontSize: "inherit",
                                                     fontWeight: "inherit",
                                                     lineHeight: "inherit",
                                                     color: $isActive ? "#262626" : "#BFBFBF",
                                                     paddingTop: "12px",
                                                     paddingBottom: "12px",
                                                     ":hover": {background: "none"}
                                                 }),
                                             },
                                             TabPanel: {
                                                 style: {paddingTop: "40px", paddingRight: 0, paddingBottom: 0, paddingLeft: 0},
                                             },
                                         }}
                                    >
                                        <Signup/>
                                    </Tab>
                                </Tabs>
                            </Block>
                        </Block>
                    ) : null}
                </>
            )}
        </React.Fragment>
    )
}

export default Account;
