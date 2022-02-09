import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {withRouter} from "next/router";
import Image from 'next/image'

import {Grow} from "@material-ui/core";
import {Alert, AlertTitle} from "@material-ui/lab";

import {Block} from "baseui/block";
import {PaymentCard, valid} from "baseui/payment-card";
import {MaskedInput, Input} from "baseui/input";
import {FormControl} from "baseui/form-control";
import {StatefulTooltip, PLACEMENT, TRIGGER_TYPE} from "baseui/tooltip";
import {Checkbox, LABEL_PLACEMENT} from "baseui/checkbox";
import Delete from 'baseui/icon/delete'
import {AspectRatioBox} from "baseui/aspect-ratio-box";

import {Modal} from "Components/surfaces";
import Button from "Components/Button";
import {OrderSummary} from "Components/Sections";

import Utils from "Utils/utils";
import {NumberFn, UrlFn} from "Utils/tools";

import {viewPromotion} from "../../redux/actions/gtagActions";
import {updateUser} from "../../redux/actions/userActions";
import {modifyCart} from "../../redux/actions/cartActions";

const utils = new Utils();
const numberFn = new NumberFn();
const urlFn = new UrlFn();

const InputField = (props) => {
    const {value, placeholder, error, onChange} = props;

    return (
        <Input value={value} placeholder={placeholder} clearOnEscape error={error}  {...props}
               overrides={{
                   Root: {
                       props: {
                           className: "container-input"
                       },
                   },
                   InputContainer: {
                       props: {
                           className: "container-inner-input"
                       }
                   },
                   Input: {
                       props: {
                           className: "input-address"
                       },
                   },
               }}
               onChange={onChange}
        />
    )
}

function Checkout({router, orderID, orderDetail}) {
    const dispatch = useDispatch();

    const {loggedIn, token, user} = useSelector(({user}) => user);
    const {cart, cartProduct} = useSelector(({cart}) => cart);

    const billRef = useRef(null);

    // Base Info
    const [id, setOrderID] = useState(0);
    const [detail, setOrderDetail] = useState(null);
    // Order Detail
    const [lineCoupon, setLineCoupon] = useState([]);
    const [shipping, setShipping] = useState({...user.shipping});
    const [billing, setBilling] = useState({...user.billing});

    const [diff, setDiff] = useState(false);
    const [shippingDone, setShippingDone] = useState(false);
    const [billingStyle, setBillingStyle] = useState({visibility: "hidden", opacity: 0});
    const [errorAccountBilling, setErrorAccountBilling] = useState(false);
    const [errorAccountShipping, setErrorAccountShipping] = useState(false);
    const [addressesDone, setAddressesDone] = useState(false);

    const [coupon, setCoupon] = useState("");
    // Credit Card
    const [number, setNumber] = useState("");
    const [expiration, setExpiration] = useState("");
    const [code, setCode] = useState("");
    const [checked, setChecked] = useState(false);
    const [numberError, setNumberError] = useState(false);
    const [expirationError, setExpirationError] = useState(false);
    const [codeError, setCodeError] = useState(false);
    // Others
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");

    const [showLoading, setShowLoading] = useState(false);

    // ================================================================================

    let codeLength;

    const {card} = valid.number(number);

    if (card && card.code && card.code.size) {
        codeLength = card.code.size;
    }

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
            let cl = [];
            lineCoupon.map(c => cl.push({code: c.code,}));
            cl.push({code: coupon});
            setCoupon("");

            let result = await utils.updateOrder(null, {id: numberFn.strToInt(id + "", 0), coupon_lines: cl});

            if (result.message) {
                setShowError(true);
                setError(result.message);
                setTimeout(() => {
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

        let cll = [];
        cl.map(c => cll.push({code: c.code,}))

        let result = await utils.updateOrder(null, {id: id, coupon_lines: cll});

        if (result.message) {
            setShowError(true);
            setError(result.message);
            setTimeout(() => {
                setShowError(false);
                setError("");
            }, 4000);
        } else {
            setOrderDetail(result);
        }
        setLineCoupon(cl);
    };

    const pay = () => {
        setShowLoading(true);

        let checkoutData = {
            id: id,
            payment_method: "bacs",
            payment_method_title: "Credit Card",
            billing: diff ? {...billing} : {...shipping},
            shipping: {...shipping},
        };

        utils.updateOrder(null, checkoutData).then((res) => {
            if (res.message) {
                setShowLoading(false);

                setShowError(true);
                setError(res.message);

                setTimeout(() => {
                    setShowError(false);
                    setError("");
                }, 4000);
            } else {
                utils.checkout({id: numberFn.strToInt(id, 0), cc: number, exp: expiration, cvv: code}).then((result) => {
                    setShowLoading(false);

                    if (result.transactionResponse.errors) {
                        setShowError(true);
                        setError(result.transactionResponse.errors.error[0].errorText);

                        setTimeout(() => {
                            setShowError(false);
                            setError("");
                        }, 4000);
                    }
                    if (result.transactionResponse.messages) {
                        if (result.transactionResponse.messages.message[0].code === "1") {
                            viewPromotion(lineCoupon);

                            handleUpdateCart([]);
                            // 支付成功
                            router.push({pathname: "/checkout/success/", query: {id: id}});
                        }
                    }
                });
            }
        });
    };

    useEffect(() => {
        if (!router) return;

        // Get Order ID
        let ID = null;
        if (!orderID) {
            ID = numberFn.strToInt(urlFn.getParam("id"), 0);

            if (!ID) {
                router.push("/");
                return;
            }

            setOrderID(ID);
        } else {
            ID = numberFn.strToInt(orderID + "", 0);
            setOrderID(ID);
        }

        // Get Order Detail
        if (ID && (!orderDetail || !orderDetail.id)) {
            async function upOrder(i) {
                const result = await utils.updateOrder(null, {id: i});

                if (!result) {
                } else if (result.date_paid && result.date_completed) {
                    router.push("/");
                } else {
                    setOrderDetail(result);
                }
            }

            upOrder(ID).then(() => null);
        } else {
            setOrderDetail(orderDetail);
        }
    }, [router, orderID, orderDetail]);

    useEffect(() => {
        if (!detail) return;

        if (detail.hasOwnProperty("coupon_lines")) setLineCoupon(detail.coupon_lines);
        if (detail.hasOwnProperty("shipping") && detail.hasOwnProperty("billing")) {
            setShipping({...detail.shipping, country: "US", email: detail.billing.email});

            if (detail.shipping.first_name && detail.shipping.last_name && detail.shipping.address_1 && detail.shipping.city && detail.shipping.state && detail.shipping.postcode && detail.shipping.country && detail.shipping.phone && detail.billing.email) {
                setShippingDone(true);
            }
        }

    }, [detail]);

    useEffect(() => {
        if (!shipping.first_name || !shipping.last_name || !shipping.address_1 || !shipping.city || !shipping.state || !shipping.postcode || !shipping.country || !shipping.email || !shipping.phone) {
            setAddressesDone(false);
        } else {
            if (!diff) {
                setBillingStyle({visibility: "hidden", opacity: 0});

                setAddressesDone(true);
            } else {
                setTimeout(() => setBillingStyle({visibility: "visible", opacity: 1}), 300);

                if (!billing.first_name || !billing.last_name || !billing.address_1 || !billing.city || !billing.state || !billing.postcode || !billing.country || !billing.email || !billing.phone) {
                    setAddressesDone(false);
                } else {
                    setAddressesDone(true);
                }
            }
        }
    }, [diff, shipping, billing]);

    useEffect(() => {
        if (card && card.lengths) {
            setNumberError(card.lengths.findIndex((l) => l === number.length) === -1);
        }
    }, [card, number]);

    useEffect(() => {
        setExpirationError(Boolean(expiration && expiration.length && !valid.expirationDate(expiration).isPotentiallyValid));
    }, [expiration]);

    useEffect(() => {
        if (!codeLength) return;

        setCodeError(Boolean(code && code.trim().length && !valid.cvv(code, codeLength).isPotentiallyValid));
    }, [code, codeLength]);

    return (
        <React.Fragment>
            <Grow in={showError} style={{left: 0, right: 0}} className={"alert-message"}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>
            </Grow>
            {detail && detail.id ? (
                <Block display="grid" gridTemplateAreas={[`"b" "a"`, `"b" "a"`, `"a b"`]} gridTemplateColumns={["1fr", null, "repeat(2, 1fr)"]} gridColumnGap="60px" gridRowGap="40px" maxWidth="996px"
                       margin="auto" padding={["24px 16px", "32px 24px", "40px 32px"]}
                >
                    <Block gridArea="a" display="grid" gridRowGap="32px" paddingBottom={["24px", "32px", "40px"]}>
                        {shippingDone ? (
                            <Block display="grid" gridTemplateColumns="1fr" gridRowGap="8px" padding={["8px", null, "8px 16px"]} font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph16"]}
                                   $style={{border: "1px solid #EEEEEE", borderRadius: "8px"}}
                            >
                                <Block font="MinXHeading20">SHIPPING ADDRESS</Block>
                                <Block>{`First Name: ${shipping.first_name || ""}`}</Block>
                                <Block>{`Last name: ${shipping.last_name || ""}`}</Block>
                                <Block>{`Company name (optional): ${shipping.company || ""}`}</Block>
                                <Block>{`Address line 1: ${shipping.address_1 || ""}`}</Block>
                                <Block>{`Address line 2: ${shipping.address_2 || ""}`}</Block>
                                <Block display="grid" gridTemplateColumns="2fr 1fr" gridColumnGap="12px">
                                    <Block>{`City: ${shipping.city || ""}`}</Block>
                                    <Block>{`State: ${shipping.state || ""}`}</Block>
                                </Block>
                                <Block display="grid" gridTemplateColumns="2fr 1fr" gridColumnGap="12px">
                                    <Block>{`Zip Code: ${shipping.postcode || ""}`}</Block>
                                    <Block>{`Country: US`}</Block>
                                </Block>Phone Number
                                <Block>{`Phone Number: ${shipping.phone || ""}`}</Block>
                                <Block>{`Email: ${shipping.email || ""}`}</Block>
                            </Block>
                        ) : (
                            <>
                                <Block font="MinXHeading20">SHIPPING ADDRESS</Block>
                                <Block className="container-input-address">
                                    <Block display="grid" gridTemplateColumns="repeat(2, 1fr)" gridColumnGap="12px">
                                        <InputField value={shipping.first_name} placeholder="First name" error={errorAccountShipping} required
                                                    onChange={(event) => {
                                                        setErrorAccountShipping(false);
                                                        setShipping({...shipping, first_name: event.target.value});
                                                    }}
                                        />
                                        <InputField value={shipping.last_name} placeholder="Last name" error={errorAccountShipping} required
                                                    onChange={(event) => {
                                                        setErrorAccountShipping(false);
                                                        setShipping({...shipping, last_name: event.target.value});
                                                    }}
                                        />
                                    </Block>
                                    <InputField value={shipping.company} placeholder="Company name (optional)" error={errorAccountShipping}
                                                onChange={(event) => {
                                                    setErrorAccountShipping(false);
                                                    setShipping({...shipping, company: event.target.value});
                                                }}
                                    />
                                    <InputField value={shipping.address_1} placeholder="Address line 1" error={errorAccountShipping} required
                                                onChange={(event) => {
                                                    setErrorAccountShipping(false);
                                                    setShipping({...shipping, address_1: event.target.value});
                                                }}
                                    />
                                    <InputField value={shipping.address_2} placeholder="Address line 2" error={errorAccountShipping}
                                                onChange={(event) => {
                                                    setErrorAccountShipping(false);
                                                    setShipping({...shipping, address_2: event.target.value});
                                                }}
                                    />
                                    <Block display="grid" gridTemplateColumns="2fr 1fr" gridColumnGap="12px">
                                        <InputField value={shipping.city} placeholder="City" error={errorAccountShipping} required
                                                    onChange={(event) => {
                                                        setErrorAccountShipping(false);
                                                        setShipping({...shipping, city: event.target.value});
                                                    }}
                                        />
                                        <InputField value={shipping.state} placeholder="State" error={errorAccountShipping} required
                                                    onChange={(event) => {
                                                        setErrorAccountShipping(false);
                                                        setShipping({...shipping, state: event.target.value});
                                                    }}
                                        />
                                    </Block>
                                    <Block display="grid" gridTemplateColumns="2fr 1fr" gridColumnGap="12px">
                                        <InputField value={shipping.postcode} placeholder="Zip code" error={errorAccountShipping} required
                                                    onChange={(event) => {
                                                        setErrorAccountShipping(false);
                                                        setShipping({...shipping, postcode: event.target.value});
                                                    }}
                                        />
                                        <InputField value={"United States"} disabled/>
                                    </Block>
                                    <InputField value={shipping.phone} placeholder="Phone Number" error={errorAccountShipping} required
                                                onChange={(event) => {
                                                    setErrorAccountShipping(false);
                                                    setShipping({...shipping, phone: event.target.value});
                                                }}
                                    />
                                    <InputField value={shipping.email} placeholder="Email" error={errorAccountShipping} required
                                                onChange={(event) => {
                                                    setErrorAccountShipping(false);
                                                    setShipping({...shipping, email: event.target.value});
                                                }}
                                    />
                                </Block>
                            </>
                        )}
                        <Checkbox checked={diff} labelPlacement={LABEL_PLACEMENT.right}
                                  onChange={(e) => setDiff(e.target.checked)}
                                  overrides={{
                                      Root: {
                                          style: {
                                              marginTop: "-22px"
                                          }
                                      },
                                      Checkmark: {
                                          props: {
                                              className: "checkbox-address"
                                          }
                                      },
                                      Label: {
                                          style: {fontSize: "14px", fontWeight: 400},
                                      },
                                  }}
                        >
                            A different billing address
                        </Checkbox>
                        <Block height={diff ? billRef.current.clientHeight + "px" : 0} $style={{transition: "all 300ms ease-in-out", ...billingStyle}}>
                            <Block ref={billRef} className="container-input-address" overflow="hidden">
                                <Block font="MinXHeading20">BILLING ADDRESS</Block>
                                <Block display="grid" gridTemplateColumns="repeat(2, 1fr)" gridColumnGap="12px">
                                    <InputField value={billing.first_name} placeholder="First name" error={errorAccountBilling} required
                                                onChange={(event) => {
                                                    setErrorAccountBilling(false);
                                                    setBilling({...billing, first_name: event.target.value});
                                                }}
                                    />
                                    <InputField value={billing.last_name} placeholder="Last name" error={errorAccountBilling} required
                                                onChange={(event) => {
                                                    setErrorAccountBilling(false);
                                                    setBilling({...billing, last_name: event.target.value});
                                                }}
                                    />
                                </Block>
                                <InputField value={billing.company} placeholder="Company name (optional)" error={errorAccountBilling}
                                            onChange={(event) => {
                                                setErrorAccountBilling(false);
                                                setBilling({...billing, company: event.target.value});
                                            }}
                                />
                                <InputField value={billing.address_1} placeholder="Address line 1" error={errorAccountBilling} required
                                            onChange={(event) => {
                                                setErrorAccountBilling(false);
                                                setBilling({...billing, address_1: event.target.value});
                                            }}
                                />
                                <InputField value={billing.address_2} placeholder="Address line 2" error={errorAccountBilling}
                                            onChange={(event) => {
                                                setErrorAccountBilling(false);
                                                setBilling({...billing, address_2: event.target.value});
                                            }}
                                />
                                <Block display="grid" gridTemplateColumns="2fr 1fr" gridColumnGap="12px">
                                    <InputField value={billing.city} placeholder="City" error={errorAccountBilling} required
                                                onChange={(event) => {
                                                    setErrorAccountBilling(false);
                                                    setBilling({...billing, city: event.target.value});
                                                }}
                                    />
                                    <InputField value={billing.state} placeholder="State" error={errorAccountBilling} required
                                                onChange={(event) => {
                                                    setErrorAccountBilling(false);
                                                    setBilling({...billing, state: event.target.value});
                                                }}
                                    />
                                </Block>
                                <Block display="grid" gridTemplateColumns="2fr 1fr" gridColumnGap="12px">
                                    <InputField value={billing.postcode} placeholder="Zip code" error={errorAccountBilling} required
                                                onChange={(event) => {
                                                    setErrorAccountBilling(false);
                                                    setBilling({...billing, postcode: event.target.value});
                                                }}
                                    />
                                    <InputField value={"United States"} disabled/>
                                </Block>
                                <InputField value={billing.phone} placeholder="Phone Number" error={errorAccountBilling} required
                                            onChange={(event) => {
                                                setErrorAccountBilling(false);
                                                setBilling({...billing, phone: event.target.value});
                                            }}
                                />
                                <InputField value={billing.email} placeholder="Email" error={errorAccountBilling} required
                                            onChange={(event) => {
                                                setErrorAccountBilling(false);
                                                setBilling({...billing, email: event.target.value});
                                            }}
                                />
                            </Block>
                        </Block>
                        <Block>
                            <Block marginBottom="24px" font="MinXLabel24">Pay with...</Block>
                            <Block marginBottom={["8px", null, "16px"]}
                                   overrides={{
                                       Block: {
                                           style: {borderBottomWidth: "1px", borderBottomStyle: "solid", borderBottomColor: "#F0F0F0"}
                                       }
                                   }}
                            >
                                <Block display="flex" justifyContent="space-between" marginBottom="16px">
                                    <Block paddingRight="12px" font="MinXParagraph16">We accept these credit cards</Block>
                                    <Block position="relative" display="grid" gridTemplateColumns="repeat(4, 34px)" gridTemplateRows="24px" gridColumnGap="12px">
                                        <Block position="relative">
                                            <Image src="/images/component/footer/icon_visa.webp" alt="visa" layout="fill" objectFit="contain"/>
                                        </Block>
                                        <Block position="relative">
                                            <Image src="/images/component/footer/icon_master.webp" alt="master" layout="fill" objectFit="contain"/>
                                        </Block>
                                        <Block position="relative">
                                            <Image src="/images/component/footer/icon_amex.webp" alt="amex" layout="fill" objectFit="contain"/>
                                        </Block>
                                        <Block position="relative">
                                            <Image src="/images/component/footer/icon_discover.webp" alt="discover" layout="fill" objectFit="contain"/>
                                        </Block>
                                    </Block>
                                </Block>
                                <Block paddingBottom="12px" font="MinXParagraph16">Card information</Block>
                                <Block className="container-input-address" width="100%">
                                    <FormControl>
                                        <PaymentCard value={number} error={numberError}
                                                     onChange={(event) => setNumber(event.currentTarget.value)}
                                                     placeholder="Credit Card Number"
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
                                        <FormControl overrides={{ControlContainer: {style: {marginRight: "15px", marginBottom: 0},},}}>
                                            <MaskedInput value={expiration} error={expirationError}
                                                         onChange={(event) => setExpiration(event.currentTarget.value)}
                                                         placeholder="Expiration MM/YY" mask="99/99"
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
                                        <FormControl overrides={{ControlContainer: {style: {marginRight: "32px", marginBottom: 0}}}}>
                                            <MaskedInput value={code} error={codeError}
                                                         onChange={(event) => setCode(event.currentTarget.value)}
                                                         placeholder="CVC" mask={codeLength ? "9".repeat(codeLength) : "999"}
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
                                        <StatefulTooltip placement={PLACEMENT.topRight} triggerType={TRIGGER_TYPE.click} autoFocus
                                                         content={() => (
                                                             <AspectRatioBox aspectRatio={5 / 3} width="100px" style={{zIndex: 999}}>
                                                                 <Image src="/images/icon/icon-cvc.png" alt="authorize" layout="fill" objectFit="contain"/>
                                                             </AspectRatioBox>
                                                         )}
                                                         overrides={{
                                                             Body: {style: ({$theme}) => ({boxShadow: "none", backgroundColor: "transparent",})},
                                                             Inner: {style: ({$theme}) => ({backgroundColor: "transparent", paddingRight: 0, paddingLeft: 0}),},
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
                                                    lineHeight: "1rem"
                                                }}
                                            >
                                                ?
                                            </div>
                                        </StatefulTooltip>
                                    </div>
                                </Block>
                            </Block>
                            <Block display="grid" gridTemplateColumns="1fr" gridRowGap="16px" font="MinXParagraph14">
                                <div style={{lineHeight: "22px", textAlign: "left"}}>
                                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes
                                    described in our <strong>privacy policy</strong>
                                </div>
                                <Checkbox checked={checked} labelPlacement={LABEL_PLACEMENT.right} onChange={(e) => setChecked(e.target.checked)}
                                          overrides={{
                                              Checkmark: {
                                                  props: {
                                                      className: "checkbox-address"
                                                  }
                                              },
                                              Label: {
                                                  style: ({$theme}) => ({fontSize: "14px", fontWeight: 400}),
                                              },
                                          }}
                                >
                                    I have read and agree to the website <strong>terms and conditions</strong> <span style={{color: "red"}}>*</span>
                                </Checkbox>
                                <Button.V1 type="solid" width="100%" height="56px" marginRight="auto" marginLeft="auto" font="MinXLabel12" text='PAY NOW' bundle="primary" onClick={() => pay()}
                                           disabled={!addressesDone || !number.length || !expiration.length || !code.length || expirationError || codeError || !checked}
                                />
                                <Block display="flex" flexDirection="row" alignItems="center">
                                    <AspectRatioBox aspectRatio={1} width="35px">
                                        <Image src="/images/icon/icon-authorize.png" alt="authorize" layout="fill" objectFit="contain"/>
                                    </AspectRatioBox>
                                    <div style={{padding: "0 8px", textAlign: "left", fontSize: "11px", lineHeight: "14px", color: "#8C8C8C", letterSpacing: "2%"}}>You
                                        can shop at Westshade with confidence. We have partnered with Authorize.Net.
                                    </div>
                                </Block>
                            </Block>
                        </Block>
                    </Block>
                    <Block gridArea="b" position={["relative", null, "sticky"]} top={[null, null, "108px"]} height="fit-content">
                        <OrderSummary.V1 orderDetail={detail}/>
                        {lineCoupon.length > 0 ? (
                            <Block display="flex" flexDirection="row" justifyContent="space-between" marginBottom={["16px", null, "24px"]}>
                                <Block font="MinXParagraph14">Applied Coupon</Block>
                                <Block display="grid" gridRowGap={["16px", null, "20px"]} font="MinXParagraph14" color="MinXPrimaryText">
                                    {lineCoupon.map((coupon, index) => (
                                        <Block key={index} display="flex" justifyContent="flex-end">
                                            <Block font="MinXParagraph14" marginRight="16px">{coupon.code.toUpperCase()}</Block>
                                            <Button.V1 bundle="gray" type="solid" shape="circle" width="20px" height="20px" buttonHoverBackgroundColor="#EEE" buttonStyle={{paddingLeft: 0, paddingRight: 0}}
                                                       onClick={() => removeCoupon(index)}>
                                                <Delete color="#262626" size={12}/>
                                            </Button.V1>
                                        </Block>
                                    ))}
                                </Block>
                            </Block>
                        ) : null}
                        <Block display="grid" gridTemplateColumns="2fr 1fr" gridColumnGap="16px">
                            <InputField value={coupon} placeholder="Coupon code" onChange={(event) => setCoupon(event.target.value)}/>
                            <Button.V1 type="outline" width="100%" height="50px" font="MinXLabel14" text="APPLY" color="#23A4AD" bundle="primary" overrides={{Block: {style: {zIndex: 1}}}} onClick={() => updateCoupon()}/>
                        </Block>
                    </Block>
                </Block>
            ) : null}
            <Modal type="alertdialog" isOpen={showLoading} onClose={() => setShowLoading(false)} content="loading"/>
        </React.Fragment>
    );
}

Checkout.getInitialProps = async (context) => {
    const {query} = context;
    const {id} = query;

    const orderID = numberFn.strToInt(id, 0);
    let orderDetail = null;

    if (orderID) {
        orderDetail = await utils.updateOrder(null, {id: orderID});
    }

    return {
        orderID: orderID,
        orderDetail: orderDetail,
    };
};

export default withRouter(Checkout);
