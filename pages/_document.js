import React from "react";
import {ServerStyleSheet} from "styled-components";

import Document, {Html, Head, Main, NextScript} from "next/document";

import {Provider as StyletronProvider} from "styletron-react";
import {styletron} from "../styletron";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(
                            <StyletronProvider value={styletron}>
                                <App {...props} />
                            </StyletronProvider>
                        ),
                });
            const initialProps = await Document.getInitialProps(ctx);
            const stylesheets = styletron.getStylesheets() || [];
            return {
                ...initialProps,
                style: (
                    <React.Fragment>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </React.Fragment>
                ),
                stylesheets,
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                    <link rel="icon" href="/logo.png"/>
                    <script src="https://static.cdn-apple.com/businesschat/start-chat-button/2/index.js"/>
                    {this.props.stylesheets.map((sheet, i) => (
                        <style key={i} className="_styletron_hydrate_" dangerouslySetInnerHTML={{__html: sheet.css}} media={sheet.attrs.media} data-hydrate={sheet.attrs["data-hydrate"]}/>
                    ))}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MCQP54N')`,
                        }}
                    />
                </Head>
                <body>
                <noscript dangerouslySetInnerHTML={{__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MCQP54N" height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}/>
                <Main/>
                <NextScript/>
                <script type="text/javascript" src="/static/appleBusinessChat.js"/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
