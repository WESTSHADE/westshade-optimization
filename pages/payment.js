import React, { useEffect, useState, createRef } from "react";
import { withRouter } from "next/router";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Button, KIND, SHAPE } from "baseui/button";
import { PaymentCard, valid } from "baseui/payment-card";
import { MaskedInput } from "baseui/input";
import { FormControl } from "baseui/form-control";
import { StatefulTooltip, PLACEMENT, TRIGGER_TYPE } from "baseui/tooltip";
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox";
import Check from "baseui/icon/check";

import Utils from "../utils/utils";
import { UrlFn } from "../utils/tools";
const utils = new Utils();
const urlFn = new UrlFn();

function Payment({ orderID }) {
	const [id, setOrderID] = useState(orderID);

	const [number, setNumber] = useState("");
	const [expiration, setExpiration] = useState("");
	const [code, setCode] = useState("");
	const [checked, setChecked] = useState(false);

	const [numberError, setNumberError] = useState(false);
	const [expirationError, setExpirationError] = useState(false);
	const [codeError, setCodeError] = useState(false);

	const { card } = valid.number(number);
	let codeLength;
	if (card && card.code && card.code.size) {
		codeLength = card.code.size;
	}

	const pay = () => {
		utils.checkout({ id: id, cc: number, exp: expiration, cvv: code }).then((res) => {
			console.log(res);
		});
	};

	useEffect(() => {
		let id = urlFn.getParam("id");
		if (id) {
			setOrderID(id);
		}
	}, []);

	useEffect(() => {
		if (card && card.lengths) {
			let error = card.lengths.findIndex((l) => l === number.length) === -1 ? true : false;
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
			{/* 主屏部分 */}
			<Block height={"100vh"} paddingTop={["48px", "48px", "96px"]} display={"flex"} justifyContent={"center"} overflow={"scroll"} style={{ paddingTop: 146 }}>
				{/* 主要显示区域 */}
				<Block width={["100%", "480px"]} display={"flex"} flexDirection={"column"}>
					<div className="container-selection" style={{ width: "100%", alignItems: "flex-start", paddingLeft: 16, paddingRight: 16, paddingBottom: 60 }}>
						<div style={{ fontSize: 20, fontWeight: "bold", lineHeight: "28px", marginBottom: 24 }}>Pay with credit card</div>
						<div style={{ fontSize: 16, fontWeight: "500", lineHeight: "24px", marginBottom: 16 }}>We accept these credit cards</div>
						<div style={{ display: "flex", flexDirection: "row", marginBottom: 24 }}>
							<div style={{ width: 34, height: 24, marginRight: 12 }}>
								<img src="/images/component/footer/icon_visa.png" style={{ height: "100%", objectFit: "cover" }} />
							</div>
							<div style={{ width: 34, height: 24, marginRight: 12 }}>
								<img src="/images/component/footer/icon_master.png" style={{ height: "100%", objectFit: "cover" }} />
							</div>
							<div style={{ width: 34, height: 24, marginRight: 12 }}>
								<img src="/images/component/footer/icon_amex.png" style={{ height: "100%", objectFit: "cover" }} />
							</div>
							<div style={{ width: 34, height: 24, marginRight: 12 }}>
								<img src="/images/component/footer/icon_discover.png" style={{ height: "100%", objectFit: "cover" }} />
							</div>
						</div>
						<div style={{ fontSize: 16, fontWeight: "500", lineHeight: "24px", marginBottom: 16 }}>Card information</div>
						<div style={{ width: "100%" }}>
							<FormControl>
								<PaymentCard
									error={numberError}
									value={number}
									onChange={(event) => setNumber(event.currentTarget.value)}
									placeholder="Cridit Card number"
									overrides={{
										Root: {
											style: ({ $theme }) => ({
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
											style: ({ $theme }) => ({ backgroundColor: "white" }),
										},
										Input: {
											style: ({ $theme }) => ({ fontSize: 14 }),
										},
									}}
								/>
							</FormControl>
							<div style={{ display: "flex", flexDirection: "row", alignItems: "center", position: "relative" }}>
								<FormControl
									overrides={{
										ControlContainer: {
											style: {
												marginRight: "15px",
												marginBottom: 0,
											},
										},
									}}
								>
									<MaskedInput
										error={expirationError}
										value={expiration}
										onChange={(event) => setExpiration(event.currentTarget.value)}
										placeholder="Expiration MM/YY"
										mask="99/99"
										overrides={{
											Root: {
												style: ({ $theme }) => ({
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
												style: ({ $theme }) => ({ backgroundColor: "white" }),
											},
											Input: {
												style: ({ $theme }) => ({ fontSize: 14 }),
											},
										}}
									/>
								</FormControl>
								<FormControl
									overrides={{
										ControlContainer: {
											style: {
												marginRight: "32px",
												marginBottom: 0,
											},
										},
									}}
								>
									<MaskedInput
										error={codeError}
										value={code}
										onChange={(event) => setCode(event.currentTarget.value)}
										placeholder="CVC"
										mask={codeLength ? "9".repeat(codeLength) : "999"}
										overrides={{
											Root: {
												style: ({ $theme }) => ({
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
												style: ({ $theme }) => ({ backgroundColor: "white" }),
											},
											Input: {
												style: ({ $theme }) => ({ fontSize: 14 }),
											},
										}}
									/>
								</FormControl>
								<StatefulTooltip
									placement={PLACEMENT.topRight}
									triggerType={TRIGGER_TYPE.click}
									autoFocus
									content={() => (
										<div style={{ zIndex: 999 }}>
											<img src="/images/icon/icon-cvc.png" style={{ height: "60px", objectFit: "contain" }} />
										</div>
									)}
									overrides={{
										Body: {
											style: ({ $theme }) => ({
												boxShadow: "none",
												backgroundColor: "transparent",
											}),
										},
										Inner: {
											style: ({ $theme }) => ({
												backgroundColor: "transparent",
												paddingRight: 0,
												paddingLeft: 0,
											}),
										},
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
										}}
									>
										?
									</div>
								</StatefulTooltip>
							</div>
						</div>
					</div>
					{/* <div className="container-selection" style={{ width: "100%", alignItems: "flex-start", paddingLeft: 16, paddingRight: 16, paddingBottom: 60 }}>
						<div style={{ fontSize: 20, fontWeight: "bold", lineHeight: "28px", marginBottom: 24 }}>Pay with other methods</div>
						<Button
							shape={SHAPE.pill}
							overrides={{
								BaseButton: {
									style: () => ({ width: "100%", height: "50px", fontSize: "16px", backgroundColor: "transparent", border: "1px solid #D9D9D9", borderRadius: "16px", marginBottom: "16px" }),
								},
							}}
							onClick={() => {}}
						></Button>
						<Button
							shape={SHAPE.pill}
							overrides={{
								BaseButton: {
									style: () => ({ width: "100%", height: "50px", fontSize: "16px", backgroundColor: "transparent", border: "1px solid #D9D9D9", borderRadius: "16px", marginBottom: "16px" }),
								},
							}}
							onClick={() => {}}
						></Button>
						<Button
							shape={SHAPE.pill}
							overrides={{
								BaseButton: {
									style: () => ({ width: "100%", height: "50px", fontSize: "16px", backgroundColor: "transparent", border: "1px solid #D9D9D9", borderRadius: "16px", marginBottom: "16px" }),
								},
							}}
							onClick={() => {}}
						></Button>
					</div> */}
					<div className="container-selection" style={{ width: "100%", paddingLeft: 16, paddingRight: 16, borderTop: "1px solid #F0F0F0", paddingTop: 16, paddingBottom: 60 }}>
						<div style={{ fontSize: 14, lineHeight: "22px", marginBottom: 16, textAlign: "left" }}>
							Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <strong>privacy policy</strong>
						</div>
						<Checkbox
							checked={checked}
							onChange={(e) => setChecked(e.target.checked)}
							labelPlacement={LABEL_PLACEMENT.right}
							overrides={{
								Checkmark: {
									style: ({ $theme }) => ({
										borderTopWidth: "1px",
										borderRightWidth: "1px",
										borderBottomWidth: "1px",
										borderLeftWidth: "1px",
										borderTopLeftRadius: "2px",
										borderTopRightRadius: "2px",
										borderBottomLeftRadius: "2px",
										borderBottomLeftRadius: "2px",
									}),
								},
								Label: {
									style: ({ $theme }) => ({ fontSize: 14, lineHeight: "22px", letterSpacing: "4%", marginBottom: 16 }),
								},
							}}
						>
							I have read and agree to the website <strong>terms and conditions</strong> <span style={{ color: "red" }}>*</span>
						</Checkbox>
						<Button
							shape={SHAPE.pill}
							overrides={{
								BaseButton: {
									style: () => ({ width: "100%", height: "56px", fontSize: "16px", backgroundColor: "#23A4AD", marginTop: "8px", marginBottom: "8px" }),
								},
							}}
							onClick={() => pay()}
							disabled={!number.length || !expiration.length || !code.length || expirationError || codeError || !checked}
						>
							PAY NOW
						</Button>
						<div style={{ display: "flex", flexDirection: "row" }}>
							<img src="/images/icon/icon-authorize.png" style={{ width: "35px", height: "28px", objectFit: "contain" }} />
							<div style={{ padding: "0 8px", textAlign: "left", fontSize: "11px", lineHeight: "14px", color: "#8C8C8C", letterSpacing: "2%" }}>You can shop at Westshade with confidence. We have partnered with Authorize.Net.</div>
						</div>
					</div>
					{/* <div className="container-selection" style={{ width: "100%", paddingLeft: 16, paddingRight: 16 }}>
						<div style={{ width: 80, height: 80, border: "3px solid #00d459", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
							<Check size={64} color={"#00d459"} />
						</div>
						<div style={{}}>Thank you! Your order has been received.</div>
					</div> */}
				</Block>
			</Block>
		</React.Fragment>
	);
}

Payment.getInitialProps = async (context) => {
	const { query } = context;
	const { id } = query;
	// let product = null,
	// 	component = [],
	// 	variant = [];

	// product = await utils.getProductByWooId(id);
	// if (product.type === "composite") {
	// 	component = await Promise.all(product.composite_components.map(({ default_option_id }) => utils.getProductByWooId(default_option_id)));
	// 	variant = await Promise.all(component.map(({ id }) => utils.getVariantByWooProductId(id)));
	// }

	return {
		orderID: id,
		noFooter: true,
	};
};

export default withRouter(Payment);
