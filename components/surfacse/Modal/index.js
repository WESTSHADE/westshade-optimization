import React, { useState } from "react";
import { Block } from "baseui/block";
import { Button, KIND, SHAPE } from "baseui/button";
import { Modal, ModalBody, ModalFooter, SIZE, ROLE } from "baseui/modal";

import styles from "./modal.module.scss";

const modal = (props) => {
	const { confirmText } = props;

	const [isOpen, setIsOpen] = useState(true);

	return (
		<Modal
			onClose={() => setIsOpen(false)}
			isOpen={isOpen}
			animate
			autoFocus
			size={SIZE.full}
			role={ROLE.dialog}
			overrides={{
				Root: {
					props: {
						className: styles["container-root"],
					},
				},
				DialogContainer: {
					props: {
						className: styles["container-dialog"],
					},
				},
				Dialog: {
					props: {
						className: styles["dialog"],
					},
				},
				Close: {
					props: {
						className: styles["close"],
					},
				},
			}}
		>
			<ModalBody className={styles["container-body"]}>
				<Block flex={[0, 0, 1]} position={"relative"} paddingRight={["16px", "52px", "0"]} paddingLeft={["16px", "52px", "64px"]}></Block>
				<Block
					display={"flex"}
					flexDirection={"column"}
					width={["100%", "100%", "424px"]}
					paddingTop={["24px", "24px", "40px"]}
					paddingRight={["16px", "52px", "64px"]}
					paddingLeft={["16px", "52px", "0"]}
					alignItems={"center"}
					overflow={["unset", "unset", "scroll"]}
				>
					<div style={{ display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center", width: "100%" }}>
						<div style={{ fontSize: 16, fontWeight: "500", marginBottom: 16 }}>Wall type</div>
					</div>
					<div style={{ display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center", width: "100%", marginBottom: "64px" }}>
						<div style={{ fontSize: 16, fontWeight: "500", marginBottom: 16 }}>Color</div>
					</div>
				</Block>
			</ModalBody>
			<ModalFooter className={styles["container-footer"]}>
				<div style={{ fontSize: "12px", marginRight: "24px", textAlign: "left" }}>After submitting the order, we’ll contact you with a free mockup based on the information you provide us here.</div>
				<Block display={"flex"} flexDirection={"row"}>
					<Button
						shape={SHAPE.pill}
						overrides={{
							BaseButton: {
								props: {
									className: styles["button-cancel"],
								},
							},
						}}
						onClick={() => setIsOpen(false)}
					>
						Cancel
					</Button>
					{confirmText ? (
						<Button
							shape={SHAPE.pill}
							overrides={{
								BaseButton: {
									props: {
										className: styles["button-confirm"],
									},
								},
							}}
							onClick={() => setPrintIsOpen(true)}
						>
							{confirmText}
						</Button>
					) : null}
				</Block>
			</ModalFooter>
		</Modal>
	);
};

export default modal;
