import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {withRouter} from "next/router";
import Image from 'next/image'

import {Grow} from "@material-ui/core";
import {Alert, AlertTitle} from "@material-ui/lab";

import {Block} from "baseui/block";
import {Button, KIND, SIZE, SHAPE} from "baseui/button";
import {PaymentCard, valid} from "baseui/payment-card";
import {MaskedInput, Input} from "baseui/input";
import {FormControl} from "baseui/form-control";
import {StatefulTooltip, PLACEMENT, TRIGGER_TYPE} from "baseui/tooltip";
import {Checkbox, LABEL_PLACEMENT} from "baseui/checkbox";
import Delete from 'baseui/icon/delete'
import {AspectRatioBox} from "baseui/aspect-ratio-box";

import {viewPromotion} from "../../redux/actions/gtagActions";

import Utils from "Utils/utils";
import {NumberFn, UrlFn} from "Utils/tools";

import {updateUser} from "../../redux/actions/userActions";
import {modifyCart} from "../../redux/actions/cartActions";
import {Modal} from "Components/surfaces";
import MButton from "Components/button-n";

const utils = new Utils();
const numberFn = new NumberFn();
const urlFn = new UrlFn();

let HEIGHT = 0;

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

    const [id, setOrderID] = useState(numberFn.strToInt(orderID));
    const [order, setOrderDetail] = useState(orderDetail);

    const [billingAddress, setBillingAddress] = useState({...user.billing});
    const [shippingAddress, setShippingAddress] = useState({...user.shipping});
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

    const [addressHeight, setAddressHeight] = useState(0);

    const [showLoading, setShowLoading] = useState(false);


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

            let result = await utils.updateOrder(null, {id: numberFn.strToInt(id), coupon_lines: cl});

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

        let cll = [];
        cl.map(c => cll.push({code: c.code,}))

        let result = await utils.updateOrder(null, {id: id, coupon_lines: cll});
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
        setShowLoading(true);

        let checkoutData = {
            id: id,
            payment_method: "bacs",
            payment_method_title: "Credit Card",
            billing: {
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
                phone: ""
            },
            shipping: null,
            line_items: null,
        };

        checkoutData.shipping = {...shippingAddress};
        if (!different) {
            checkoutData.billing = {...shippingAddress};
        } else {
            checkoutData.billing = {...billingAddress};
        }
        // checkoutData.line_items = order.line_items;
        // checkoutData.coupon_lines = [...lineCoupon];

        utils.updateOrder(null, checkoutData).then((result) => {
            if (result.message) {
                setShowLoading(false);

                setShowError(true);
                setError(result.message);
                setTimeout(function () {
                    setShowError(false);
                    setError("");
                }, 4000);
            } else {
                utils.checkout({id: numberFn.strToInt(id), cc: number, exp: expiration, cvv: code}).then((res) => {
                    setShowLoading(false);

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

    useEffect(async () => {
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
                if (result.shipping) {
                    setShippingAddress(result.shipping);
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
        if (!shippingAddress.first_name || !shippingAddress.last_name || !shippingAddress.address_1 || !shippingAddress.city || !shippingAddress.state || !shippingAddress.postcode || !shippingAddress.country || !shippingAddress.email || !shippingAddress.phone) {
            setAddressesDone(false);
        } else {
            if (!different) {
                setAddressesDone(true);
            } else {
                if (!billingAddress.first_name || !billingAddress.last_name || !billingAddress.address_1 || !billingAddress.city || !billingAddress.state || !billingAddress.postcode || !billingAddress.country || !billingAddress.email || !billingAddress.phone) {
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
            <Grow in={showError} style={{left: 0, right: 0}} className={"alert-message"}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>
            </Grow>
            {order && order.id ? (
                <Block display="grid" gridTemplateAreas={[`"b" "a"`, `"b" "a"`, `"a b"`]} gridColumnGap="60px" gridRowGap="40px" maxWidth="996px"
                       marginTop={["24px", "32px", "40px"]} marginRight="auto" marginLeft="auto" paddingRight={["16px", "24px", "32px"]} paddingLeft={["16px", "24px", "32px"]}
                >
                    <Block gridArea="a" display="grid" gridRowGap="32px">
                        <Block className="container-input-address" ref={(ref) => {
                            if (ref && ref.clientHeight) HEIGHT = ref.clientHeight
                        }}>
                            <Block font="MinXHeading20">SHIPPING ADDRESS</Block>
                            <Block display="grid" gridTemplateColumns="repeat(2, 1fr)" gridColumnGap="12px">
                                <InputField value={shippingAddress.first_name} placeholder="First name" error={errorAccountShipping} required
                                            onChange={(event) => {
                                                setErrorAccountShipping(false);
                                                setShippingAddress({...shippingAddress, first_name: event.target.value});
                                            }}
                                />
                                <InputField value={shippingAddress.last_name} placeholder="Last name" error={errorAccountShipping} required
                                            onChange={(event) => {
                                                setErrorAccountShipping(false);
                                                setShippingAddress({...shippingAddress, last_name: event.target.value});
                                            }}
                                />
                            </Block>
                            <InputField value={shippingAddress.company} placeholder="Company name (optional)" error={errorAccountShipping}
                                        onChange={(event) => {
                                            setErrorAccountShipping(false);
                                            setShippingAddress({...shippingAddress, company: event.target.value});
                                        }}
                            />
                            <InputField value={shippingAddress.address_1} placeholder="Address line 1" error={errorAccountShipping} required
                                        onChange={(event) => {
                                            setErrorAccountShipping(false);
                                            setShippingAddress({...shippingAddress, address_1: event.target.value});
                                        }}
                            />
                            <InputField value={shippingAddress.address_2} placeholder="Address line 2" error={errorAccountShipping}
                                        onChange={(event) => {
                                            setErrorAccountShipping(false);
                                            setShippingAddress({...shippingAddress, address_2: event.target.value});
                                        }}
                            />
                            <Block display="grid" gridTemplateColumns="2fr 1fr" gridColumnGap="12px">
                                <InputField value={shippingAddress.city} placeholder="City" error={errorAccountShipping} required
                                            onChange={(event) => {
                                                setErrorAccountShipping(false);
                                                setShippingAddress({...shippingAddress, city: event.target.value});
                                            }}
                                />
                                <InputField value={shippingAddress.state} placeholder="State" error={errorAccountShipping} required
                                            onChange={(event) => {
                                                setErrorAccountShipping(false);
                                                setShippingAddress({...shippingAddress, state: event.target.value});
                                            }}
                                />
                            </Block>
                            <Block display="grid" gridTemplateColumns="2fr 1fr" gridColumnGap="12px">
                                <InputField value={shippingAddress.postcode} placeholder="Zip code" error={errorAccountShipping} required
                                            onChange={(event) => {
                                                setErrorAccountShipping(false);
                                                setShippingAddress({...shippingAddress, postcode: event.target.value});
                                            }}
                                />
                                <InputField value={"United States"} disabled/>
                            </Block>
                            <InputField value={shippingAddress.phone} placeholder="Phone Number" error={errorAccountShipping} required
                                        onChange={(event) => {
                                            setErrorAccountShipping(false);
                                            setShippingAddress({...shippingAddress, phone: event.target.value});
                                        }}
                            />
                            <InputField value={shippingAddress.email} placeholder="Email" error={errorAccountShipping} required
                                        onChange={(event) => {
                                            setErrorAccountShipping(false);
                                            setShippingAddress({...shippingAddress, email: event.target.value});
                                        }}
                            />
                            <Checkbox checked={different} labelPlacement={LABEL_PLACEMENT.right} onChange={(e) => {
                                setDifferent(e.target.checked);
                                if (e.target.checked) {
                                    setAddressHeight(HEIGHT);
                                } else {
                                    setAddressHeight(0)
                                }
                            }}
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
                                A different billing address
                            </Checkbox>
                        </Block>
                        <Block overflow="hidden"
                               overrides={{
                                   Block: {
                                       props: {className: "container-input-address"},
                                       style: {height: addressHeight + "px", transition: "height 500ms ease-out, height 500ms ease-out"}
                                   }
                               }}
                        >
                            <Block font="MinXHeading20">BILLING ADDRESS</Block>
                            <Block display="grid" gridTemplateColumns="repeat(2, 1fr)" gridColumnGap="12px">
                                <InputField value={billingAddress.first_name} placeholder="First name" error={errorAccountBilling} required
                                            onChange={(event) => {
                                                setErrorAccountBilling(false);
                                                setBillingAddress({...billingAddress, first_name: event.target.value});
                                            }}
                                />
                                <InputField value={billingAddress.last_name} placeholder="Last name" error={errorAccountBilling} required
                                            onChange={(event) => {
                                                setErrorAccountBilling(false);
                                                setBillingAddress({...billingAddress, last_name: event.target.value});
                                            }}
                                />
                            </Block>
                            <InputField value={billingAddress.company} placeholder="Company name (optional)" error={errorAccountBilling}
                                        onChange={(event) => {
                                            setErrorAccountBilling(false);
                                            setBillingAddress({...billingAddress, company: event.target.value});
                                        }}
                            />
                            <InputField value={billingAddress.address_1} placeholder="Address line 1" error={errorAccountBilling} required
                                        onChange={(event) => {
                                            setErrorAccountBilling(false);
                                            setBillingAddress({...billingAddress, address_1: event.target.value});
                                        }}
                            />
                            <InputField value={billingAddress.address_2} placeholder="Address line 2" error={errorAccountBilling}
                                        onChange={(event) => {
                                            setErrorAccountBilling(false);
                                            setBillingAddress({...billingAddress, address_2: event.target.value});
                                        }}
                            />
                            <Block display="grid" gridTemplateColumns="2fr 1fr" gridColumnGap="12px">
                                <InputField value={billingAddress.city} placeholder="City" error={errorAccountBilling} required
                                            onChange={(event) => {
                                                setErrorAccountBilling(false);
                                                setBillingAddress({...billingAddress, city: event.target.value});
                                            }}
                                />
                                <InputField value={billingAddress.state} placeholder="State" error={errorAccountBilling} required
                                            onChange={(event) => {
                                                setErrorAccountBilling(false);
                                                setBillingAddress({...billingAddress, state: event.target.value});
                                            }}
                                />
                            </Block>
                            <Block display="grid" gridTemplateColumns="2fr 1fr" gridColumnGap="12px">
                                <InputField value={billingAddress.postcode} placeholder="Zip code" error={errorAccountBilling} required
                                            onChange={(event) => {
                                                setErrorAccountBilling(false);
                                                setBillingAddress({...billingAddress, postcode: event.target.value});
                                            }}
                                />
                                <InputField value={"United States"} disabled/>
                            </Block>
                            <InputField value={billingAddress.phone} placeholder="Phone Number" error={errorAccountBilling} required
                                        onChange={(event) => {
                                            setErrorAccountBilling(false);
                                            setBillingAddress({...billingAddress, phone: event.target.value});
                                        }}
                            />
                            <InputField value={billingAddress.email} placeholder="Email" error={errorAccountBilling} required
                                        onChange={(event) => {
                                            setErrorAccountBilling(false);
                                            setBillingAddress({...billingAddress, email: event.target.value});
                                        }}
                            />
                        </Block>
                        <Block marginBottom="40px">
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
                            <Block display="grid" gridTemplateColumns="1fr" gridRowGap="16px">
                                <div style={{fontSize: 14, lineHeight: "22px", textAlign: "left"}}>
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
                                <MButton type="solid" width="100%" height="56px" marginRight="auto" marginLeft="auto" font="MinXLabel12" text='PAY NOW' bundle="primary" onClick={() => pay()}
                                         disabled={!number.length || !expiration.length || !code.length || expirationError || codeError || !checked}
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
                    <Block gridArea="b" position={["relative", null, "sticky"]} top={[null, null, "108px"]}>
                        <Block marginBottom="24px" font="MinXHeading20">Order Summary</Block>
                        {lineItem.length > 0 ? (
                            <Block marginBottom="16px" overrides={{Block: {style: {borderBottomWidth: "1px", borderBottomStyle: "solid", borderBottomColor: "#F0F0F0"}}}}>
                                {lineItem.map((item, index) => {
                                    return (
                                        <Block key={index} display="flex" flexDirection="row" justifyContent="space-between" marginBottom="20px">
                                            <Block font="MinXParagraph14">
                                                {item.name}
                                                <Block marginLeft="2em">{item.meta_data.map((data, i) => <Block key={i} marginTop="4px">{`${data.display_key}: ${data.display_value}`}</Block>)}</Block>
                                            </Block>
                                            <Block font="MinXParagraph14">{`$` + item.subtotal}</Block>
                                        </Block>
                                    )
                                })}
                            </Block>
                        ) : null}
                        <Block marginBottom="16px" overrides={{Block: {style: {borderBottomWidth: "1px", borderBottomStyle: "solid", borderBottomColor: "#F0F0F0"}}}}>
                            <Block display="flex" flexDirection="row" justifyContent="space-between" marginBottom="20px">
                                <Block font="MinXParagraph14">Subtotal</Block><Block font="MinXParagraph14">{`$` + getSubtotal().toFixed(2)}</Block>
                            </Block>
                            {order.discount_total && order.discount_total !== "0.00" ? (
                                <Block display="flex" flexDirection="row" justifyContent="space-between" marginBottom="20px">
                                    <Block font="MinXParagraph14">Discount</Block>
                                    <Block font="MinXParagraph14">{`-$` + order.discount_total}</Block>
                                </Block>
                            ) : null}
                            <Block display="flex" flexDirection="row" justifyContent="space-between" marginBottom="20px">
                                <Block font="MinXParagraph14">Shipping</Block>
                                <Block font="MinXParagraph14">{order.shipping_total === "0.00" ? "Free shipping (Approx 3-7 days)" : `$` + order.shipping_total}</Block>
                            </Block>
                            <Block display="flex" flexDirection="row" justifyContent="space-between" marginBottom="20px">
                                <Block font="MinXParagraph14">Estimated Tax</Block>
                                <Block font="MinXParagraph14">{`$` + order.total_tax || 0}</Block>
                            </Block>
                            <Block display="flex" flexDirection="row" justifyContent="space-between" marginBottom="20px">
                                <Block font="MinXParagraph14"><strong>Total</strong></Block>
                                <Block font="MinXParagraph14"><strong>{`$` + order.total || 0}</strong></Block>
                            </Block>
                        </Block>
                        {lineCoupon.length > 0 ? (
                            <Block display="flex" flexDirection="row" justifyContent="space-between" marginBottom="16px" paddingBottom="16px">
                                <Block font="MinXParagraph14">Applied Coupon</Block>
                                <Block>
                                    {lineCoupon.map((coupon, index) => (
                                        <Block key={index} display="flex" justifyContent="flex-end" marginBottom="16px">
                                            <Block font="MinXParagraph14" marginRight="16px">{coupon.code}</Block>
                                            <Button kind={KIND.tertiary} shape={SHAPE.circle} size={SIZE.mini} overrides={{BaseButton: {style: {width: "20px", height: "20px"}}}} onClick={() => removeCoupon(index)}>
                                                <Delete size={12}/>
                                            </Button>
                                        </Block>
                                    ))}
                                </Block>
                            </Block>
                        ) : null}
                        <Block display="grid" gridTemplateColumns="2fr 1fr" gridColumnGap="16px">
                            <InputField value={coupon} placeholder="Coupon code" onChange={(event) => setCoupon(event.target.value)}/>
                            <MButton type="outline" width="100%" height="50px" font="MinXLabel14" text="APPLY" color="#23A4AD" bundle="primary" overrides={{Block: {style: {zIndex: 1}}}} onClick={() => updateCoupon()}/>
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
