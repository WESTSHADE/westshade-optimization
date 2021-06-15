import React from "react";
import { CssBaseline, Container } from "@material-ui/core";

// import App from 'next/app'
import "../styles/globals.css";
import "../styles/styleguide.css";
import "../styles/homepage.css";
import "../styles/y5-overview.css";
import "../styles/y5-specs.css";
import "../styles/y5-buy.css";
import "../styles/y6-overview.css";
import "../styles/y6-specs.css";
import "../styles/y6-buy.css";
import "../styles/y7-overview.css";
import "../styles/y7-specs.css";
import "../styles/y7-buy.css";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" className="container-page">
        <Component {...pageProps} />
      </Container>
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
