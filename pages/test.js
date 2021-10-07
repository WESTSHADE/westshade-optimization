import React, { useEffect, useState } from "react";

import Head from "next/head";
import { withRouter } from "next/router";

import { Button, SIZE, KIND, SHAPE } from "baseui/button";

function Test() {
	const buy = () => {
		const request = {
			countryCode: "US",
			currencyCode: "USD",
			supportedNetworks: ["visa", "masterCard", "amex", "discover"],
			merchantCapabilities: ["supports3DS"],
			total: { label: "WESTSHADE", amount: "0.01" },
		};

		const session = new ApplePaySession(3, request);
		// session.onvalidatemerchant = function (event) {
		// 	$.ajax({
		// 		url: "https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1/applepay",
		// 		method: "POST",
		// 	}).then(function (merchantSession) {
		// 		// Complete validation by passing the merchant session to the Apple Pay session.
		// 		session.completeMerchantValidation(merchantSession);
		// 	});
		// };

		session.onvalidatemerchant = function (event) {
			fetch("https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1/applepay", {
				method: "POST",
			}).then((merchantSession) => {
				console.log(merchantSession);
				// Complete validation by passing the merchant session to the Apple Pay session.
				session.completeMerchantValidation(merchantSession);
			});
		};

		session.onpaymentauthorized = function (event) {
			console.log(event);
			console.log(event.payment.token.paymentData);

			var authorizationResult = {
				status: ApplePaySession.STATUS_SUCCESS,
				errors: [],
			};

			session.completePayment(authorizationResult);
		};

		session.begin();
	};

	return (
		<React.Fragment>
			<Head>
				<title>Test Page</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				{/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> */}
			</Head>
			<div style={{ marginTop: "150px" }}>
				<Button
					shape={SHAPE.pill}
					overrides={{
						BaseButton: {
							props: { className: "apple-pay-button apple-pay-button-black" },
						},
					}}
					onClick={() => buy()}
				/>
			</div>
		</React.Fragment>
	);
}

export default withRouter(Test);
