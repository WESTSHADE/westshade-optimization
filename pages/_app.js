import React, {useEffect, useState} from "react";
import {CssBaseline, Container, Hidden} from "@material-ui/core";
import '@fontsource/roboto';

import Head from 'next/head'

import Header from "../components/header";
import HeaderDrawerLeft from "../components/header_mobile";
import Footer from "../components/footer";

// import App from 'next/app'
import "../styles/globals.css";
import "../styles/styleguide.css";
import "../styles/homepage.css";
import "../styles/y5-buy.css";

function MyApp({Component, pageProps}) {
    const [isSupported, setIsSupported] = useState(false);

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles && jssStyles.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles)
        }

        setIsSupported(window.appleBusinessChat.isSupported());
    }, [])

    useEffect(() => {
        if (isSupported) {
            let elem = document.getElementById("chat-widget-container");
            if (elem) elem.remove();

            setTimeout(function () {
                createABannerPlaceholder();
                window.appleBusinessChat.refresh();
            }, 1000);
        }

    }, [isSupported]);

    return (
        <React.Fragment>
            <Head>
                <title>WESTSHADE | #1 Canopy and Umbrella in Southern California</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <CssBaseline/>
            <Hidden mdDown>
                <Header/>
            </Hidden>
            <Hidden lgUp>
                <HeaderDrawerLeft/>
            </Hidden>
            <Container maxWidth="lg" className="container-page">
                <Component {...pageProps} />
                <div id="refreshPlaceholder"/>
                <div id="modal-root"/>
            </Container>
            <Footer/>
        </React.Fragment>
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

export default MyApp;
