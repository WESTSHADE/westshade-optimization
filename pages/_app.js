import React, {useEffect, useState} from "react";
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react'
import {Provider as StyletronProvider} from "styletron-react";

import Document, {Html, Head, Main, NextScript} from "next/document";

import {BaseProvider, LightTheme, createTheme} from "baseui";
import {Block} from "baseui/block";

import "@fontsource/roboto";

import {store, persistor} from "../redux/store";
import {styletron} from "../styletron";

import Header from "../components/header";
import Footer from "../components/footer";

import "../styles/old.css";
import "../styles/globals.css";
import "../styles/styleguide.css";
import "../styles/baseui.css";
import "../styles/apple-business.css";

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
        MinXTitle20: {fontFamily: "Roboto", fontSize: "20px", fontWeight: 900, lineHeight: "28px"},
        MinXTitle24: {fontFamily: "Roboto", fontSize: "24px", fontWeight: 900, lineHeight: "32px"},
        MinXTitle28: {fontFamily: "Roboto", fontSize: "28px", fontWeight: 900, lineHeight: "36px"},
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
        MinXSubtitle46: {fontFamily: "Roboto", fontSize: "46px", fontWeight: 100, lineHeight: "58px"},
        // ========================
        MinXHeading12: {fontFamily: "Roboto", fontSize: "12px", fontWeight: 400, lineHeight: "12px"},
        MinXHeading14: {fontFamily: "Roboto", fontSize: "14px", fontWeight: 500, lineHeight: "22px"},
        MinXHeading16: {fontFamily: "Roboto", fontSize: "16px", fontWeight: 500, lineHeight: "24px"},
        MinXHeading20: {fontFamily: "Roboto", fontSize: "20px", fontWeight: 700, lineHeight: "28px"},
        MinXHeading24: {fontFamily: "Roboto", fontSize: "24px", fontWeight: 500, lineHeight: "22px"},
        MinXHeading28: {fontFamily: "Roboto", fontSize: "28px", fontWeight: 700, lineHeight: "36px"},
        MinXHeading30: {fontFamily: "Roboto", fontSize: "30px", fontWeight: 700, lineHeight: "38px"},
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
        MinXLabel28: {fontFamily: "Roboto", fontSize: "28px", fontWeight: 500, lineHeight: "36px"},
        MinXLabel32: {fontFamily: "Roboto", fontSize: "32px", fontWeight: 500, lineHeight: "40px"},
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

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

function MyApp({Component, pageProps}) {
    const [isSupported, setIsSupported] = useState(false);

    const size = useWindowSize();

    useEffect(() => {
        if (pageProps.noFooter && document) {
            document.body.style.height = "100vh";
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.height = "unset";
            document.body.style.overflow = "unset";
        }
    });

    useEffect(() => {
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles && jssStyles.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        setIsSupported(window.appleBusinessChat.isSupported());
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

        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <StyletronProvider value={styletron}>
                    <BaseProvider theme={CustomTheme}>
                        <div id="WestShadeFrame" className={pageProps.homePage ? "scroll-container" : ""} style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
                            <Header/>
                            <Block position="relative" flex={1} width="100%" maxWidth={(pageProps.homePage || pageProps.fullPage) ? "unset" : process.env.maxWidth + "px"} marginTop={["48px", "48px", "96px"]} marginRight="auto"
                                   marginLeft="auto">
                                <Component size={size} {...pageProps} />
                            </Block>
                            <div id="modal-root"/>
                            {!pageProps.noFooter ? <Footer isHomePage={pageProps.homePage}/> : null}
                        </div>
                    </BaseProvider>
                </StyletronProvider>
            </PersistGate>
        </Provider>
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

// export default wrapper.withRedux(MyApp);
export default MyApp;
