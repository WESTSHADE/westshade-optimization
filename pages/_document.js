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
                    {/*<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>*/}
                    <link rel="icon" href="/logo.png"/>
                    <link href="https://fonts.googleapis.com/css?family=Roboto|Gothic+A1:300,400,500,600,700,800,900&display=swap" rel="preconnect" crossOrigin="anonymous"/>
                    {this.props.stylesheets.map((sheet, i) => (
                        <style key={i} className="_styletron_hydrate_" dangerouslySetInnerHTML={{__html: sheet.css}} media={sheet.attrs.media} data-hydrate={sheet.attrs["data-hydrate"]}/>
                    ))}
                </Head>
                <body>
                <Main/>
                <NextScript/>
                <noscript dangerouslySetInnerHTML={{__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MCQP54N" height="0" width="0" style={{display: 'none', visibility: 'hidden'}}/>`}}/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
