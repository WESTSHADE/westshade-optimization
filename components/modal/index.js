import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const Modal = ({ show, onClose, children, title, backgroundColor }) => {
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => setIsBrowser(true), []);

	const handleCloseClick = (e) => {
		e.preventDefault();
		onClose();
	};

	const modalContent = show ? (
		<div
			style={{
				zIndex: 99,
				position: "fixed",
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "rgba(0, 0, 0, 0.5)",
			}}
		>
			<div
				style={{
					position: "relative",
					background: "white",
					width: "auto",
					maxWidth: "90vw",
					height: "auto",
					maxHeight: "80vh",
					borderRadius: 15,
					padding: 15,
					marginBottom: 120,
					backgroundColor: backgroundColor ? backgroundColor : "white",
				}}
			>
				<div
					style={{
						position: "absolute",
						// display: "flex",
						// justifyContent: "flex-end",
						fontSize: 25,
						top: 6,
						right: 18,
						// paddingLeft: 12,
						// paddingRight: 12,
					}}
				>
					<a href="#" onClick={handleCloseClick}>
						x
					</a>
				</div>
				{title && <div>{title}</div>}
				<div className="popup-container-content">{children}</div>
			</div>
		</div>
	) : null;

	if (isBrowser) {
		return ReactDOM.createPortal(modalContent, document.getElementById("modal-root"));
	} else {
		return null;
	}
};

export default Modal;
