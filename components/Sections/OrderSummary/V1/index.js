import React from "react";
import NumberFormat from "react-number-format";

import {Block} from "baseui/block";

import {NumberFn, StringFn} from "Utils/tools";

import styles from "./summary.module.scss";

const numberFn = new NumberFn();
const stringFn = new StringFn();

let customPrintedIndex = -1;

const OrderSummary = ({cart = [], cartProduct = [], orderDetail, bottomDivider}) => {
    const getSubtotal = () => {
        let subtotal = 0;

        if (orderDetail) {
            subtotal = numberFn.strToFloat(orderDetail.total, 0) - numberFn.strToFloat(orderDetail.total_tax, 0) + numberFn.strToFloat(orderDetail.discount_total, 0);
        } else {
            if (cart.length === cartProduct.length) {
                subtotal = cartProduct.reduce((p, {on_sale, sale_price, regular_price, price}, index) => p + numberFn.strToFloat(on_sale ? sale_price : regular_price ? regular_price : price, 0) * cart[index].quantity, 0);
            }
        }

        return subtotal;
    };

    const getTotal = () => {
        let total = 0;

        if (orderDetail) {
            total = orderDetail.total;
        } else {
            total = getSubtotal();
        }

        return total;
    }

    return (
        <>
            <Block marginBottom={["16px", null, "24px"]} font="MinXHeading20" color="MinXPrimaryText">Order Summary</Block>
            {/*For Cart, Pre-Check*/}
            {cartProduct.length > 0 ? (
                <Block className={styles["divider"]} marginBottom={["16px", null, "24px"]}>
                    {cartProduct.map((item, index) => {
                        const salePrice = item.sale_price || 0;
                        const regularPrice = item.regular_price || 0;
                        const price = item.price || 0;

                        return (
                            <Block key={index} display="flex" flexDirection="row" justifyContent="space-between" marginBottom="20px" font="MinXParagraph14" color="MinXPrimaryText">
                                <Block flex={1}>
                                    {item.name}
                                    <Block marginLeft="2em">
                                        {item.id === 61289 ? cart[index].variation.map((data, i) => <Block key={i} marginTop="4px">{`${data.attribute}: ${data.value}`}</Block>) : item.attributes.map((data, i) =>
                                            <Block key={i} marginTop="4px">{`${data.name}: ${data.option}`}</Block>)}
                                    </Block>
                                </Block>
                                {item.on_sale ? (
                                    <Block display="flex" $style={{gap: "12px"}}>
                                        <Block as="span" color="#F07C7C"><NumberFormat decimalScale={2} thousandSeparator={true} prefix={"$"} value={salePrice} displayType={"text"} fixedDecimalScale/></Block>
                                        <Block as="span" $style={{textDecoration: "line-through"}}>
                                            <NumberFormat decimalScale={2} thousandSeparator={true} prefix={"$"} value={regularPrice ? regularPrice : price} displayType={"text"} fixedDecimalScale/>
                                        </Block>
                                    </Block>
                                ) : (
                                    <Block>
                                        {/*<NumberFormat decimalScale={2} thousandSeparator={true} prefix={"$"} value={regularPrice ? regularPrice : price} displayType={"text"} fixedDecimalScale/>{` x ${cart[index].quantity}`}*/}
                                        <NumberFormat decimalScale={2} thousandSeparator={true} prefix={"$"} value={numberFn.strToFloat(regularPrice ? regularPrice : price, 0) * cart[index].quantity} displayType={"text"}
                                                      fixedDecimalScale/>
                                    </Block>
                                )}
                            </Block>
                        )
                    })}
                </Block>
            ) : null}
            {/*For Checkout*/}
            {orderDetail && orderDetail.line_items && orderDetail.line_items.length > 0 ? (
                <Block className={styles["divider"]} marginBottom={["16px", null, "24px"]}>
                    {orderDetail.line_items.map((item, index) => {
                        if (item.product_id === 61289) customPrintedIndex = index;

                        if (customPrintedIndex > -1 && (index === customPrintedIndex + 1 || index === customPrintedIndex + 2)) return;

                        if (item.product_id === 61289) {
                            let roofSize = orderDetail.line_items[index + 1].meta_data.find(data => data.key === "pa_canopy-size");
                            let printedSidesAC = orderDetail.line_items[index + 2].meta_data.find(data => data.key === "number");
                            let printedSidesBD = orderDetail.line_items[index + 2].meta_data.find(data => data.key === "number-ii");
                            let printingMethod = orderDetail.line_items[index + 2].meta_data.find(data => data.key === "pa_printing-technique");

                            function getPrintedSides(a, b) {
                                let ac = a ? numberFn.strToInt(a.display_value, 0) : 0;
                                let bd = b ? numberFn.strToInt(b.display_value, 0) : 0;

                                return ac + bd;
                            }

                            function getSubTotal() {
                                let priceA = numberFn.strToFloat(orderDetail.line_items[index + 1].subtotal || 0, 0);
                                let priceB = numberFn.strToFloat(orderDetail.line_items[index + 2].subtotal || 0, 0);

                                return priceA + priceB;
                            }

                            return (
                                <Block key={index} display="flex" flexDirection="row" justifyContent="space-between" marginBottom="20px" font="MinXParagraph14" color="MinXPrimaryText">
                                    <Block flex={1}>
                                        {item.name}
                                        <Block marginLeft="2em">
                                            <Block marginTop="4px">{`Roof Size: ${roofSize ? roofSize.display_value : ""}`}</Block>
                                            <Block marginTop="4px">{`Printed Sides: ${getPrintedSides(printedSidesAC, printedSidesBD)}`}</Block>
                                            <Block marginTop="4px">{`Printing Method: ${printingMethod ? stringFn.changeCase(printingMethod.display_value, 4) : ""}`}</Block>
                                        </Block>
                                    </Block>
                                    <NumberFormat decimalScale={2} thousandSeparator={true} prefix={"$"} value={getSubTotal()} displayType={"text"} fixedDecimalScale/>
                                </Block>
                            )
                        }

                        return (
                            <Block key={index} display="flex" flexDirection="row" justifyContent="space-between" marginBottom="20px" font="MinXParagraph14" color="MinXPrimaryText">
                                <Block flex={1}>
                                    {item.name}
                                    <Block marginLeft="2em">
                                        {item.meta_data.map((data, i) => data.display_value && !data.display_key.startsWith('_') ? <Block key={i} marginTop="4px">{`${data.display_key}: ${data.display_value}`}</Block> : null)}
                                    </Block>
                                </Block>
                                <NumberFormat decimalScale={2} thousandSeparator={true} prefix={"$"} value={item.subtotal} displayType={"text"} fixedDecimalScale/>
                            </Block>
                        )
                    })}
                </Block>
            ) : null}
            {/*For Both Summary*/}
            <Block className={bottomDivider ? styles["divider"] : null} display="grid" gridRowGap={["16px", null, "20px"]} marginBottom={["16px", null, "24px"]} font="MinXParagraph14" color="MinXPrimaryText">
                <Block display="flex" flexDirection="row" justifyContent="space-between">
                    <Block>Subtotal</Block>
                    <Block><strong><NumberFormat decimalScale={2} thousandSeparator={true} prefix={"$"} value={getSubtotal()} displayType={"text"} fixedDecimalScale/></strong></Block>
                </Block>
                {orderDetail ? (
                    <>
                        {/*{orderDetail.discount_total && orderDetail.discount_total !== "0.00" ? (*/}
                        {/*    <Block display="flex" flexDirection="row" justifyContent="space-between" color="#F07C7C">*/}
                        {/*        <Block>Discount</Block>*/}
                        {/*        <Block>{`-`}<NumberFormat decimalScale={2} thousandSeparator={true} prefix={"$"} value={orderDetail.discount_total} displayType={"text"} fixedDecimalScale/></Block>*/}
                        {/*    </Block>*/}
                        {/*) : null}*/}
                        {orderDetail.coupon_lines && orderDetail.coupon_lines.length > 0 ? (
                            <>
                                {orderDetail.coupon_lines.map((item, index) => {
                                    return (
                                        <Block key={index} display="flex" flexDirection="row" justifyContent="space-between" color="#F07C7C">
                                            <Block>{`Discount (${item.code.toUpperCase()})`}</Block>
                                            <Block>{`-`}<NumberFormat decimalScale={2} thousandSeparator={true} prefix={"$"} value={item.discount} displayType={"text"} fixedDecimalScale/></Block>
                                        </Block>
                                    )
                                })}
                            </>
                        ) : null}
                        <Block display="flex" flexDirection="row" justifyContent="space-between">
                            <Block>Shipping</Block>
                            <Block>{orderDetail.shipping_total === "0.00" ? "Free shipping (Approx 3-7 days)" :
                                <NumberFormat decimalScale={2} thousandSeparator={true} prefix={"$"} value={orderDetail.shipping_total} displayType={"text"} fixedDecimalScale/>}</Block>
                        </Block>
                        <Block display="flex" flexDirection="row" justifyContent="space-between">
                            <Block>Estimated Tax</Block>
                            <NumberFormat decimalScale={2} thousandSeparator={true} prefix={"$"} value={orderDetail.total_tax || 0} displayType={"text"} fixedDecimalScale/>
                        </Block>
                        <Block/>
                    </>
                ) : null}
                <Block className={orderDetail && orderDetail.coupon_lines && orderDetail.coupon_lines.length > 0 ? styles["divider"] : null} display="flex" flexDirection="row" justifyContent="space-between"
                       marginBottom={["16px", null, "24px"]}
                       paddingBottom={orderDetail && orderDetail.coupon_lines && orderDetail.coupon_lines.length > 0 ? ["16px", null, "24px"] : null}
                       $style={{fontWeight: "bold"}}
                >
                    <Block>Total</Block>
                    <NumberFormat decimalScale={2} thousandSeparator={true} prefix={"$"} value={getTotal()} displayType={"text"} fixedDecimalScale/>
                </Block>
                {/*TODO: Get Coupon Detail*/}
                {/*{orderDetail.coupon_lines && orderDetail.coupon_lines.length > 0 ? (*/}
                {/*    <>*/}
                {/*        {orderDetail.coupon_lines.map((item, index) => {*/}
                {/*            return (*/}
                {/*                <Block display="flex" flexDirection="row" justifyContent="space-between">*/}
                {/*                    <Block>{`${item.code.toUpperCase()}`}</Block>*/}
                {/*                    <Block></Block>*/}
                {/*                </Block>*/}
                {/*            )*/}
                {/*        })}*/}
                {/*    </>*/}
                {/*) : null}*/}
            </Block>
        </>
    )
}

export default OrderSummary;
