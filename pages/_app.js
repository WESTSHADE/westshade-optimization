import React, {useEffect, useState} from "react";
import {Provider as StyletronProvider} from "styletron-react";

import {Head} from "next/document";

import {BaseProvider, LightTheme, createTheme} from "baseui";
import {Block} from "baseui/block";

import {CssBaseline, Container, Hidden} from "@material-ui/core";
import "@fontsource/roboto";

import {wrapper} from "../redux/store";
import {styletron} from "../styletron";

import Header from "../components/header";
import HeaderDrawerLeft from "../components/header_mobile";
import Footer from "../components/footer";

import HeaderNew from "../components/header-n";
import FooterNew from "../components/footer-n";

import {Modal} from "../components/surfacse";

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
    {breakpoints, mediaQuery: {}}
);

const primitives = {
    primaryFontFamily: "Roboto",
};

const overrides = {
    typography: {
        MinXDisplayLarge: {fontFamily: "Roboto", fontSize: "64px", fontWeight: "bold", lineHeight: "64px", letterSpacing: 0},
        MinXDisplayMedium: {fontFamily: "Roboto", fontSize: "48px", fontWeight: 900, lineHeight: "48px", letterSpacing: 0},
        MinXDisplaySmall: {fontFamily: "Roboto", fontSize: "36px", fontWeight: "bold", lineHeight: "36px", letterSpacing: 0},
        MinXDisplayXSmall: {fontFamily: "Roboto", fontSize: "32px", fontWeight: "700", lineHeight: "40px", letterSpacing: 0},
        MinXHeadingXLarge: {fontFamily: "Roboto", fontSize: "38px", fontWeight: "bold", lineHeight: "46px", letterSpacing: "-2%"},
        MinXHeadingLarge: {fontFamily: "Roboto", fontSize: "24px", fontWeight: "bold", lineHeight: "24px", letterSpacing: 0},
        MinXHeadingMedium: {fontFamily: "Roboto", fontSize: "20px", fontWeight: "bold", lineHeight: "28px", letterSpacing: 0},
        MinXHeadingSmall: {fontFamily: "Roboto", fontSize: "16px", fontWeight: 400, lineHeight: "24px", letterSpacing: "4%"},
        MinXHeadingSmallBold: {fontFamily: "Roboto", fontSize: "16px", fontWeight: 500, lineHeight: "24px", letterSpacing: "4%"},
        MinXHeadingXSmall: {fontFamily: "Roboto", fontSize: "9px", fontWeight: 400, lineHeight: "11px", letterSpacing: "4%"},
        MinXHeadingXSmallBold: {fontFamily: "Roboto", fontSize: "9px", fontWeight: 500, lineHeight: "11px", letterSpacing: "4%"},
        MinXParagraphSmall: {fontFamily: "Roboto", fontSize: "14px", fontWeight: 400, lineHeight: "16px", letterSpacing: "4%"},
        MinXParagraphSmallBold: {fontFamily: "Roboto", fontSize: "14px", fontWeight: 500, lineHeight: "16px", letterSpacing: "4%"},
        MinXFootSmall: {fontFamily: "Roboto", fontSize: "12px", fontWeight: 400, lineHeight: "20px", letterSpacing: "4%"},
        // ========================
        MinXTitle20: {fontFamily: "Roboto", fontSize: "20px", fontWeight: 900, lineHeight: "28px"},
        MinXTitle32: {fontFamily: "Roboto", fontSize: "32px", fontWeight: 900, lineHeight: "40px"},
        MinXTitle44: {fontFamily: "Roboto", fontSize: "44px", fontWeight: 900, lineHeight: "52px"},
        MinXTitle64: {fontFamily: "Roboto", fontSize: "64px", fontWeight: 900, lineHeight: "80px"},
        // ========================
        MinXSubtitle10: {fontFamily: "Roboto", fontSize: "10px", fontWeight: 400, lineHeight: "12px"},
        MinXSubtitle12: {fontFamily: "Roboto", fontSize: "12px", fontWeight: 400, lineHeight: "14px"},
        MinXSubtitle14: {fontFamily: "Roboto", fontSize: "14px", fontWeight: 400, lineHeight: "16px"},
        MinXSubtitle16: {fontFamily: "Roboto", fontSize: "16px", fontWeight: 500, lineHeight: "24px"},
        MinXSubtitle20: {fontFamily: "Roboto", fontSize: "20px", fontWeight: 500, lineHeight: "28px"},
        MinXSubtitle24: {fontFamily: "Roboto", fontSize: "24px", fontWeight: 500, lineHeight: "32px"},
        MinXSubtitle28: {fontFamily: "Roboto", fontSize: "28px", fontWeight: 500, lineHeight: "36px"},
        // ========================
        MinXHeading12: {fontFamily: "Roboto", fontSize: "12px", fontWeight: 400, lineHeight: "12px"},
        MinXHeading14: {fontFamily: "Roboto", fontSize: "14px", fontWeight: 500, lineHeight: "22px"},
        MinXHeading16: {fontFamily: "Roboto", fontSize: "16px", fontWeight: 500, lineHeight: "24px"},
        MinXHeading20: {fontFamily: "Roboto", fontSize: "20px", fontWeight: 700, lineHeight: "28px"},
        MinXHeading24: {fontFamily: "Roboto", fontSize: "24px", fontWeight: 500, lineHeight: "22px"},
        MinXHeading28: {fontFamily: "Roboto", fontSize: "28px", fontWeight: 700, lineHeight: "36px"},
        MinXHeading32: {fontFamily: "Roboto", fontSize: "32px", fontWeight: 700, lineHeight: "40px"},
        MinXHeading36: {fontFamily: "Roboto", fontSize: "36px", fontWeight: 700, lineHeight: "48px"},
        MinXHeading44: {fontFamily: "Roboto", fontSize: "44px", fontWeight: 700, lineHeight: "52px"},
        MinXHeading48: {fontFamily: "Roboto", fontSize: "48px", fontWeight: 700, lineHeight: "56px"},
        MinXHeading64: {fontFamily: "Roboto", fontSize: "64px", fontWeight: 700, lineHeight: "80px"},
        // ========================
        MinXParagraph12: {fontFamily: "Roboto", fontSize: "12px", fontWeight: 400, lineHeight: "16px"},
        MinXParagraph14: {fontFamily: "Roboto", fontSize: "14px", fontWeight: 400, lineHeight: "20px"},
        MinXParagraph16: {fontFamily: "Roboto", fontSize: "16px", fontWeight: 400, lineHeight: "24px"},
        MinXParagraph20: {fontFamily: "Roboto", fontSize: "20px", fontWeight: 400, lineHeight: "28px"},
        MinXParagraph24: {fontFamily: "Roboto", fontSize: "24px", fontWeight: 400, lineHeight: "32px"},
        // ========================
        MinXLabel12: {fontFamily: "Roboto", fontSize: "12px", fontWeight: 500, lineHeight: "16px"},
        MinXLabel14: {fontFamily: "Roboto", fontSize: "14px", fontWeight: 500, lineHeight: "22px"},
        MinXLabel16: {fontFamily: "Roboto", fontSize: "16px", fontWeight: 500, lineHeight: "24px"},
        MinXLabel20: {fontFamily: "Roboto", fontSize: "20px", fontWeight: 500, lineHeight: "28px"},
        MinXLabel24: {fontFamily: "Roboto", fontSize: "24px", fontWeight: 500, lineHeight: "32px"},
    },
    colors: {
        Test: "red",
        MinXTitle: "#262626",
        MinXPrimaryText: "#262626",
        MinXPrimaryTextAlt: "white",
        MinXSecondaryText: "#8C8C8C",
        MinXSecondaryTextAlt: "white",
        MinXDisable: "#BFBFBF",
        MinXBorder: "#D9D9D9",
        MinXDividers: "#F0F0F0",
        MinXBackground: "#F7F7F7",
        MinXTableHeader: "#FAFAFA",
        MinXButton: "#23A4AD",
        MinXButtonBackground: "#F5FCFC",
        MinXButtonHover: "#5FBDBE",
        MinXButtonActive: "#43878C",
    },
};

const theme = createTheme(primitives, overrides);
const CustomTheme = {...LightTheme, ...theme, ...ResponsiveTheme};

function MyApp({Component, pageProps}) {
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
                <CssBaseline/>
                {/* {pageProps.noFooter ? (
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
				)} */}
                {pageProps.noFooter ? (
                    <>
                        <Hidden mdDown>
                            <Header/>
                        </Hidden>
                        <Hidden lgUp>
                            <HeaderDrawerLeft/>
                        </Hidden>
                        <Component {...pageProps} />
                        <div id="refreshPlaceholder"/>
                        <div id="modal-root"/>
                    </>
                ) : pageProps.newFooter ? (
                    <div id="WestShadeFrame" className={pageProps.homePage ? "scroll-container" : ""} style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
                        <HeaderNew/>
                        <Block flex={1} marginTop={["48px", "48px", "96px"]}>
                            <Component {...pageProps} />
                        </Block>
                        <div id="refreshPlaceholder" className={pageProps.homePage ? "apple-refreshPlaceholder for-scroll" : "apple-refreshPlaceholder"}/>
                        <div id="modal-root"/>
                        <FooterNew isHomePage={pageProps.homePage}/>
                    </div>
                ) : (
                    <>
                        <Hidden mdDown>
                            <Header/>
                        </Hidden>
                        <Hidden lgUp>
                            <HeaderDrawerLeft/>
                        </Hidden>
                        <Container maxWidth="lg" className="container-page">
                            <Component {...pageProps} />
                            <div id="refreshPlaceholder" style={{maxWidth: "1920px", margin: "auto"}}/>
                            <div id="modal-root"/>
                        </Container>
                        <Footer/>
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
