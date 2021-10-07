import React, {useEffect, useState} from "react";

import {withRouter} from "next/router";

import {Block} from "baseui/block";
import Check from "baseui/icon/check";

import Utils from "../../../utils/utils";
import {NumberFn} from "../../../utils/tools";

const utils = new Utils();
const numberFn = new NumberFn();

function Success({router, orderDetail}) {
    const [display, setDisplay] = useState(false);

    const getSubtotal = () => {
        let price = 0;
        if (orderDetail.line_items && orderDetail.line_items.length > 0) {
            orderDetail.line_items.forEach((item) => (price += numberFn.strToFloat(item.subtotal)));
        }
        return price;
    };

    const googleEvent = () => {
        if (orderDetail) {
            let lineItems = [];
            let couponItems = [];

            orderDetail.coupon_lines.map((coupon) => couponItems.push(coupon.code));
            orderDetail.line_items.map((item) =>
                lineItems.push({
                    item_name: item.name,
                    item_id: item.product_id,
                    price: item.price,
                    item_variant: item.variation_id,
                    quantity: item.quantity,
                })
            );

            dataLayer.push({ecommerce: null}); // Clear the previous ecommerce object.
            dataLayer.push({
                event: "purchase",
                ecommerce: {
                    transaction_id: orderDetail.id,
                    affiliation: "Westshade",
                    value: orderDetail.total,
                    tax: orderDetail.total_tax,
                    shipping: orderDetail.shipping_total,
                    currency: orderDetail.currency,
                    coupon: couponItems.join(),
                    items: lineItems,
                },
            });
        }
    };

    useEffect(async () => {
        if (!orderDetail) {
            // 直接进入页面， 无order数据 退至主页
            router.push({pathname: "/"});
        } else {
            setDisplay(true);
            // 有order数据，从支付页过来，显示结果，触发Google event
            googleEvent();
            // Tracks the purchase event in Oribi
            let products = [];
            orderDetail.line_items.map(item => products.push({
                name: item.name,
                id: item.id + "",
                price: numberFn.strToFloat(item.price),
                discountPrice: numberFn.strToFloat(item.subtotal) - numberFn.strToFloat(item.total),
                taxPrice: numberFn.strToFloat(item.total_tax),
                quantity: numberFn.strToInt(item.quantity),
            }));
            let paramsObject = {
                totalPrice: numberFn.strToFloat(orderDetail.total),
                currency: orderDetail.currency,
                orderId: orderDetail.id,
                taxPrice: numberFn.strToFloat(orderDetail.total_tax),
                shippingPrice: numberFn.strToFloat(orderDetail.shipping_total),
                discountPrice: numberFn.strToFloat(orderDetail.discount_total),
                products: products
            };
            ORIBI.api('trackPurchase', paramsObject);
        }
    }, []);

    return (
        <React.Fragment>
            {display && orderDetail ? (
                //  主屏部分
                <Block height={"100vh"} paddingTop={["48px", "48px", "96px"]} display={"flex"} justifyContent={"center"} overflow={"scroll"} style={{paddingTop: 146}}>
                    {/* 主要显示区域 */}
                    <Block width={["100%", "480px"]} display={"flex"} flexDirection={"column"}>
                        <div className="container-selection" style={{width: "100%", paddingLeft: 16, paddingRight: 16, marginBottom: "60px"}}>
                            <div style={{
                                width: 80,
                                height: 80,
                                marginBottom: "60px",
                                border: "3px solid #00d459",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Check size={64} color={"#00d459"}/>
                            </div>
                            <div style={{fontSize: "24px", marginBottom: "32px"}}>Thank you! Your order has been received.</div>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center"}}>
                                <div style={{fontSize: "14px", lineHeight: "14px", color: "#8C8C8C"}}>
                                    Order number: <span style={{fontSize: "16px", lineHeight: "16px", color: "#262626"}}>{orderDetail.id}</span>
                                </div>
                                <div>{orderDetail.date_paid ? new Date(orderDetail.date_paid).toLocaleDateString() : ""}</div>
                            </div>
                        </div>
                        <div className="container-selection" style={{width: "100%", paddingLeft: 16, paddingRight: 16, alignItems: "flex-start"}}>
                            <div style={{fontSize: "20px", fontWeight: "bold", lineHeight: "28px", marginBottom: "24px"}}>Order summary</div>
                            {orderDetail.line_items ? (
                                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center", marginBottom: "4px"}}>
                                    <div style={{fontSize: "14px", lineHeight: "22px", color: "#1D1D1F"}}>{"Products (" + orderDetail.line_items.length + ")"}</div>
                                    <div style={{fontSize: "14px", lineHeight: "22px", color: "#1D1D1F"}}>{orderDetail.currency_symbol + getSubtotal()}</div>
                                </div>
                            ) : null}
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center", marginBottom: "4px"}}>
                                <div style={{fontSize: "14px", lineHeight: "22px", color: "#1D1D1F"}}>Shipping</div>
                                <div style={{
                                    fontSize: "14px",
                                    lineHeight: "22px",
                                    color: "#1D1D1F"
                                }}>{orderDetail.shipping_total === "0.00" ? "Free" : orderDetail.currency_symbol + orderDetail.total}</div>
                            </div>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center", marginBottom: "24px"}}>
                                <div style={{fontSize: "14px", lineHeight: "22px", color: "#1D1D1F"}}>Discount</div>
                                <div style={{
                                    fontSize: "14px",
                                    lineHeight: "22px",
                                    color: "#1D1D1F"
                                }}>{orderDetail.currency_symbol + numberFn.strToFloat(orderDetail.discount_total)}</div>
                            </div>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center", marginBottom: "16px"}}>
                                <div style={{fontSize: "14px", lineHeight: "22px", color: "#1D1D1F", fontWeight: "bold"}}>Subtotal</div>
                                <div style={{
                                    fontSize: "14px",
                                    lineHeight: "22px",
                                    color: "#1D1D1F"
                                }}>{orderDetail.currency_symbol + (numberFn.strToFloat(orderDetail.total) - numberFn.strToFloat(orderDetail.total_tax))}</div>
                            </div>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center", marginBottom: "16px"}}>
                                <div style={{fontSize: "14px", lineHeight: "22px", color: "#1D1D1F"}}>Tax</div>
                                <div style={{
                                    fontSize: "14px",
                                    lineHeight: "22px",
                                    color: "#1D1D1F"
                                }}>{orderDetail.currency_symbol + numberFn.strToFloat(orderDetail.total_tax)}</div>
                            </div>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: "100%",
                                alignItems: "center",
                                borderTop: "1px solid #D9D9D9",
                                paddingTop: "16px"
                            }}>
                                <div style={{fontSize: "16px", lineHeight: "22px", color: "#1D1D1F", fontWeight: "bold"}}>Total</div>
                                <div style={{fontSize: "14px", lineHeight: "22px", color: "#1D1D1F"}}>{orderDetail.currency_symbol + numberFn.strToFloat(orderDetail.total)}</div>
                            </div>
                        </div>
                    </Block>
                </Block>
            ) : null}
        </React.Fragment>
    );
}

Success.getInitialProps = async (context) => {
    const {query} = context;
    const {id} = query;

    let orderDetail = null;
    if (id) {
        orderDetail = await utils.updateOrder(null, {id: numberFn.strToInt(id)});
    }

    return {
        orderDetail: orderDetail,
        noFooter: true,
    };
};

export default withRouter(Success);
