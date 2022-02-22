import React, {useEffect, useState} from "react";
import {Provider} from 'react-redux';
import PersistWrapper from 'next-persist/lib/NextPersistWrapper';
import {Provider as StyletronProvider} from "styletron-react";
import TagManager from 'react-gtm-module'

import Script from 'next/script'

import {Block} from "baseui/block";

import {store} from "../redux/store";
import {styletron} from "../styletron";

import Header from "Components/Header";
import Footer from "Components/Footer";
import ThemeProvider from "Components/ThemeProvider";

import "../styles/old.css";
import "../styles/globals.css";
import "../styles/styleguide.css";
import "../styles/baseui.css";
import "../styles/apple-business.css";

const npConfig = {
    method: 'localStorage'
};

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

function initGTM() {
    if (window.gtmDidInit) {
        return;
    }
    window.gtmDidInit = true;
    TagManager.initialize({gtmId: 'GTM-MCQP54N'});
}

function initGTMOnEvent(event) {
    initGTM();
    event.currentTarget.removeEventListener(event.type, initGTMOnEvent);
}

function MyApp({Component, pageProps}) {
    const size = useWindowSize();

    const [businessPhone, setBusinessPhone] = useState(process.env.businessPhone);

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
        setTimeout(() => initGTM(), 3500);

        window.addEventListener("mousemove", initGTMOnEvent);
        window.addEventListener("keydown", initGTMOnEvent);
        window.addEventListener("scroll", initGTMOnEvent);
        window.addEventListener("touchstart", initGTMOnEvent);

        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles && jssStyles.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        // Select the node that will be observed for mutations
        const targetNode = document.getElementById('businessPhone');

        // Options for the observer (which mutations to observe)
        const config = {childList: true, subtree: true, characterData: true};

        // Callback function to execute when mutations are observed
        const callback = function (mutationsList, observer) {
            setBusinessPhone(mutationsList[0].target.textContent);
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);

        return () => {
            window.removeEventListener("mousemove", initGTMOnEvent);
            window.addEventListener("keydown", initGTMOnEvent);
            window.removeEventListener("scroll", initGTMOnEvent);
            window.removeEventListener("touchstart", initGTMOnEvent);

            // stop tracking changes
            observer.disconnect();
        }
    }, []);

    return (
        <Provider store={store}>
            <PersistWrapper wrapperConfig={npConfig}>
                <StyletronProvider value={styletron}>
                    <ThemeProvider.V1>
                        {/* Google Tag Manager */}
                        {/*<Script id="create-dataLayer">{`window.dataLayer = window.dataLayer || [];`}</Script>*/}
                        {/*<Script id="gmt"*/}
                        {/*        dangerouslySetInnerHTML={{*/}
                        {/*            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer', 'GTM-MCQP54N');`,*/}
                        {/*        }}*/}
                        {/*/>*/}
                        {/* End Google Tag Manager*/}
                        <div id="WestShadeFrame" className={pageProps.homePage ? "scroll-container" : ""} style={{display: "flex", flexDirection: "column", minHeight: "100vh", minWidth: "320px"}}>
                            <Header.V1/>
                            <Block position="relative" flex={1} width="100%" maxWidth={(pageProps.homePage || pageProps.fullPage) ? null : process.env.maxWidth + "px"} marginRight="auto" marginLeft="auto">
                                <Component size={size} phone={businessPhone} {...pageProps} />
                            </Block>
                            <div id="modal-root"/>
                            {!pageProps.noFooter ? <Footer.V1/> : null}
                        </div>
                    </ThemeProvider.V1>
                </StyletronProvider>
            </PersistWrapper>
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
