import React, { useEffect, useState } from "react";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider, LightTheme } from "baseui";
import { Head } from "next/document";

import { CssBaseline, Container, Hidden } from "@material-ui/core";
import "@fontsource/roboto";

import { wrapper } from "../redux/store";
import { styletron } from "../styletron";

import Header from "../components/header";
import HeaderDrawerLeft from "../components/header_mobile";
import Footer from "../components/footer";

// import App from 'next/app'
import "../styles/globals.css";
import "../styles/styleguide.css";
import "../styles/homepage.css";
import "../styles/y5-buy.css";
import "../styles/baseui.css";

// const engine = new Styletron();

const breakpoints = {
	small: 480,
	medium: 960,
	large: 1280,
};

const ResponsiveTheme = Object.keys(breakpoints).reduce(
	(acc, key) => {
		acc.mediaQuery[key] = `@media screen and (min-width: ${breakpoints[key]}px)`;
		return acc;
	},
	{ breakpoints, mediaQuery: {} }
);

const CustomTheme = { ...LightTheme, ...ResponsiveTheme };

function MyApp({ Component, pageProps }) {
	const [isSupported, setIsSupported] = useState(false);

	useEffect(() => {
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles && jssStyles.parentElement) {
			jssStyles.parentElement.removeChild(jssStyles);
		}

		setIsSupported(window.appleBusinessChat.isSupported());

		if (pageProps.noFooter) {
			document.body.style.height = "100vh";
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.height = "unset";
			document.body.style.overflow = "unset";
		}
	}, []);

	useEffect(() => {
		if (isSupported) {
			let elem = document.getElementById("chat-widget-container");
			if (elem) elem.remove();

			if (!pageProps.noFooter) {
				setTimeout(function () {
					createABannerPlaceholder();
					window.appleBusinessChat.refresh();
				}, 1000);
			}
		}
	}, [isSupported]);

	return (
		<StyletronProvider value={styletron}>
			<BaseProvider theme={CustomTheme}>
				<CssBaseline />
				{pageProps.noFooter ? (
					<Component {...pageProps} />
				) : (
					<>
						<Hidden mdDown>
							<Header />
						</Hidden>
						<Hidden lgUp>
							<HeaderDrawerLeft />
						</Hidden>
						<Container maxWidth="lg" className="container-page">
							<Component {...pageProps} />
							<div id="refreshPlaceholder" />
							<div id="modal-root" />
						</Container>
						<Footer />
					</>
				)}
			</BaseProvider>
		</StyletronProvider>
	);
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default wrapper.withRedux(MyApp);
