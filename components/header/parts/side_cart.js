import React from "react";
import {useSelector} from "react-redux";

import {useRouter} from "next/router";
import Image from "next/image";

import {Block} from "baseui/block";
import {ANCHOR, Drawer} from "baseui/drawer";

import Button from "../../button-n";
import {NumberFn} from "../../../utils/tools";

import styles from "./parts.module.scss";

const numberFn = new NumberFn();

const Cart = ({isOpen, onClose}) => {
    const router = useRouter();

    const {cart, cartProduct} = useSelector(({cart}) => cart);

    const getSubtotal = () => {
        let subtotal = 0;
        if (cartProduct.length === cart.length) {
            cartProduct.forEach(({price}, index) => subtotal += numberFn.strToFloat(price + "", 0) * cart[index].quantity);
        }
        return subtotal;
    };

    return (
        <Drawer anchor={ANCHOR.right} isOpen={isOpen} onClose={onClose}
                overrides={{
                    Root: {
                        props: {
                            className: styles["drawer-cart-container"]
                        },
                    },
                    DrawerBody: {
                        props: {
                            className: styles["body-container"]
                        },
                    },
                    Close: {
                        props: {
                            className: styles["close"]
                        }
                    }
                }}
        >
            <Block display="grid" gridTemplateColumns="1fr" gridRowGap={["32px", "40px"]} marginTop="40px">
                <Block font="MinXTitle32">ITEM ADDED</Block>
                <Block>
                    <Block display="grid" gridRowGap={["32px", "40px"]} marginBottom={["32px", "40px"]}>
                        {cart.length > 0 && cartProduct.length > 0 ? cartProduct.map((product, index) => {
                            return (
                                <Block key={index} className="divider" display="flex" flexDirection="row" paddingBottom={["32px", "40px"]}>
                                    <Block position="relative" width="60px" height="60px" marginRight="15px">
                                        {product.images.length > 0 ? (
                                            <Image src={product.images[0].src} alt={product.images[0].alt} layout="fill" objectFit="contain" loader={({src}) => src}/>
                                        ) : (
                                            <Image src={"/images/product/default-product.webp"} alt={product.name} layout="fill" objectFit="contain"/>
                                        )}
                                    </Block>
                                    <Block position="relative" display="flex" flexDirection="column" flex={1} paddingRight="12px">
                                        <Block display="grid" gridTemplateColumns="1fr" gridRowGap="4px" flex={1} marginBottom="12px">
                                            <Block font="MinXHeading16" color="MinXPrimaryText">{product.name}</Block>
                                            {cart[index].variation.length > 0 ? cart[index].variation.map((attr, i) => (
                                                <Block key={i} font="MinXParagraph14" color="MinXPrimaryText">{`${attr.attribute}: ${attr.value}`}</Block>
                                            )) : null}
                                        </Block>
                                        <Block font="MinXParagraph14" color="MinXPrimaryText">Quantity: {cart[index].quantity}</Block>
                                    </Block>
                                    <Block display="flex" alignItems={["flex-end", "flex-start"]} marginBottom={["-3px", "unset"]} font="MinXLabel16" color="MinXPrimaryText" $style={{fontWeight: 700}}>
                                        {`$` + product.price * cart[index].quantity}
                                    </Block>
                                </Block>
                            )
                        }) : null}
                    </Block>
                    <Block display="flex" flexDirection="row" justifyContent="space-between" marginBottom="12px" font="MinXLabel20">
                        <Block>Subtotal:</Block><Block>${getSubtotal()}</Block>
                    </Block>
                    <Block font="MinXParagraph14">Excludes tax and fees</Block>
                </Block>
                <Button type="outline" width="100%" height="52px" marginBottom="16px" font="MinXLabel14" color="#23A4AD" buttonStyle={{borderColor: "#D0D9D9"}} text="View cart"
                        onClick={() => router.push("/cart").then(() => onClose())}
                />
            </Block>
        </Drawer>
    )
}

export default Cart;
