import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import {withRouter} from "next/router";

import {Block} from "baseui/block";
import {Input} from "baseui/input";

import {OrderSummary} from "Components/Sections";
import {Modal} from "Components/surfaces";
import Button from "Components/Button";

import Utils from "Utils/utils";

import {beginCheckout} from "../../redux/actions/gtagActions";

const utils = new Utils();

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

function Checkout({router}) {
    const {token, user} = useSelector(({user}) => user);
    const {cart, cartProduct} = useSelector(({cart}) => cart);

    const [shippingAddress, setShippingAddress] = useState({...user.shipping});
    const [addressesDone, setAddressesDone] = useState(false);

    const [lineItem, setLineItem] = useState([]);

    const [error, setError] = useState("");

    const [errorAccountShipping, setErrorAccountShipping] = useState(false);

    const [showLoading, setShowLoading] = useState(false);

    const checkout = () => {
        setShowLoading(true);

        let checkoutData = {
            payment_method: "bacs",
            payment_method_title: "Credit Card",
            billing: {email: shippingAddress.email},
            shipping: {...shippingAddress},
            line_items: lineItem
        };

        utils.createOrder(token, checkoutData).then((res) => {
            if (!res) {
                setShowLoading(false);

                setTimeout(() => setError(""), 4000);
            } else if (res.message) {
                setShowLoading(false);
                setError(res.message);

                setTimeout(() => setError(""), 4000);
            } else {
                async function updateContact(id) {
                    await Promise.all(cart.filter(item => item.entryId).map((item) => utils.updateContact({id: item.entryId, 71: id})));

                    beginCheckout(cartProduct, lineItem);
                }

                // pass order id to next page
                updateContact(res.id).then(() => {
                    setShowLoading(false);

                    router.push({pathname: "/checkout/", query: {id: res.id}})
                })
            }
        });
    };

    useEffect(() => {
        if (cart.length < 1 || cartProduct.length < 1 || cart.length !== cartProduct.length) return;

        const itemList = cartProduct.map(({parent_id, id}, idx) => parent_id ? {
            product_id: parent_id,
            variation_id: id,
            quantity: cart[idx].quantity,
        } : id === 61289 ? {
            product_id: id,
            quantity: cart[idx].quantity,
            composite_configuration: [{
                component_id: "1635440611",
                product_id: 58944,
                quantity: cart[idx].component[1].quantity,
                variation_id: cart[idx].component[1].id,
                attributes: cart[idx].component[1].attributes,
            }, {
                component_id: "1635440732",
                product_id: 59880,
                quantity: cart[idx].component[0].quantity,
                variation_id: cart[idx].component[0].id,
                attributes: cart[idx].component[0].attributes,
            }]
        } : {
            product_id: id,
            quantity: cart[idx].quantity,
        });

        setLineItem(itemList);
    }, [cart, cartProduct]);

    useEffect(() => {
        if (shippingAddress.first_name && shippingAddress.last_name && shippingAddress.address_1 && shippingAddress.city && shippingAddress.state && shippingAddress.postcode && shippingAddress.country && shippingAddress.email && shippingAddress.phone) {
            setAddressesDone(true);
        }
    }, [shippingAddress]);

    return (
        <React.Fragment>
            <Block display="grid" gridTemplateAreas={[`"b" "a"`, `"b" "a"`, `"a b"`]} gridTemplateColumns={["1fr", null, "repeat(2, 1fr)"]} gridColumnGap="60px" gridRowGap="40px" maxWidth="996px"
                   margin="auto" padding={["24px 16px", "32px 24px", "40px 32px"]}
            >
                <Block gridArea="a" display="grid" gridRowGap="32px" paddingBottom={["24px", "32px", "40px"]}>
                    <Block className="container-input-address">
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
                    </Block>
                    <Button.V1 bundle="primary" type="solid" width="100%" height="56px" font="MinXLabel12" text='NEXT STEP' onClick={() => checkout()} disabled={!addressesDone}/>
                </Block>
                <Block gridArea="b" position={["relative", null, "sticky"]} top={[null, null, "108px"]} height="fit-content">
                    <OrderSummary.V1 cart={cart} cartProduct={cartProduct}/>
                </Block>
            </Block>
            <Modal type="alertdialog" isOpen={showLoading} onClose={() => setShowLoading(false)} content="loading"/>
        </React.Fragment>
    );
}

export default withRouter(Checkout);
