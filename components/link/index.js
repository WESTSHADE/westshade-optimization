import React from "react";
import styled from "styled-components";

import Link from "next/link";

const MXA = styled.a`
	display: block;
	min-width: 72px;
	width: fit-content;
	padding: 6px 12px;
	color: ${({ color }) => (color ? color + "!important" : "white !important")};
	font-size: ${({ size }) => (size === "large" ? "14px" : "12px")};
	border-radius: 4px;
	text-align: center;
	background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : "transparent")};
`;

class Custom_Link extends React.Component {
	render() {
		const { href, backgroundColor, children, size, color, style, className } = this.props;

		return (
			<Link href={href} passHref>
				<MXA className={className} backgroundColor={backgroundColor} size={size} style={style} color={color}>
					{children}
				</MXA>
			</Link>
		);
	}
}

export default Custom_Link;
