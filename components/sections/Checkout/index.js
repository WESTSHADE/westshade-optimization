import React from "react";
import { Block } from "baseui/block";
import { Button, KIND, SHAPE } from "baseui/button";

import ChevronUp from "baseui/icon/chevron-up";
import CheckIndeterminate from "baseui/icon/check-indeterminate";
import Plus from "baseui/icon/plus";

import styles from "./checkout.module.scss";

const Quantity = (props) => {
	const { quantity = 1 } = props;

	return (
		<div className={styles["container-quantity"]}>
			<Button
				kind={KIND.tertiary}
				shape={SHAPE.circle}
				overrides={{
					BaseButton: {
						props: { className: styles["button-minus"] },
					},
				}}
				onClick={() => {}}
			>
				<CheckIndeterminate />
			</Button>
			<div className={styles["quantity"]}>{quantity}</div>
			<Button
				kind={KIND.tertiary}
				shape={SHAPE.circle}
				overrides={{
					BaseButton: {
						props: { className: styles["button-plus"] },
					},
				}}
				onClick={() => {}}
			>
				<Plus />
			</Button>
		</div>
	);
};

const checkout = (props) => {
	const { totalPrice = 0 } = props;

	return (
		<Block className={styles["container-checkout"]} position={["fixed", "fixed", "absolute"]} width={["100%", "100%", "560px"]} height={["94px", "68px"]} paddingRight={["24px", "16px", "32px"]} paddingLeft={["24px", "16px", "32px"]}>
			{/* 屏宽 小于 480 */}
			<Block position={"relative"} display={["block", "none"]} height={"40px"}>
				<div className={styles["section-top"]}>
					<div className={styles["text-quantity"]}>Quantity:</div>
				</div>
				<Block position={"absolute"} left={0} right={0} top={0} bottom={0} display={"flex"} justifyContent={"center"} alignItems={"center"}>
					<Quantity quantity={props.quantity} />
				</Block>
			</Block>
			<Block width={["100%", "448px", "100%"]} height={["54px", "100%"]} display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} margin={"auto"}>
				<Button
					shape={SHAPE.circle}
					overrides={{
						BaseButton: {
							style: () => ({ width: "32px", height: "32px", backgroundColor: "white", boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.2)" }),
						},
					}}
				>
					<ChevronUp color={"#808080"} size={"25px"} />
				</Button>
				<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
					<div style={{ color: "#262626", fontSize: 16, fontWeight: "700" }}>${totalPrice}</div>
					<Block display={["none", "block"]}>
						<div style={{ color: "#8C8C8C", fontSize: 12, fontWeight: "400", letterSpacing: "0.04em" }}>Free Shipping</div>
					</Block>
				</div>
				<Block display={["none", "block"]}>
					<div style={{ width: 24, border: "1px solid #e8e8e8", transform: "rotate(90deg)" }} />
				</Block>
				<Block display={["none", "block"]}>
					<Quantity quantity={props.quantity} />
				</Block>
				<Block width={["116px", "148px", "160px"]}>
					<Button
						shape={SHAPE.pill}
						overrides={{
							BaseButton: {
								style: () => ({ width: "100%", height: "40px", fontSize: "16px", backgroundColor: "#23A4AD" }),
							},
						}}
						onClick={() => {}}
					>
						Add to bag
					</Button>
				</Block>
			</Block>
		</Block>
	);
};

export default checkout;
