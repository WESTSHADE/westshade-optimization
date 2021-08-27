import React from "react";
import {ServerStyleSheet} from "styled-components";

import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: App => (props) => sheet.collectStyles(<App {...props}/>),
            });
            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                style: (
                    <React.Fragment>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </React.Fragment>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <script src="https://static.cdn-apple.com/businesschat/start-chat-button/2/index.js"/>
                    <link rel="icon" href="/logo.png"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                <script type="text/javascript" src="/static/appleBusinessChat.js"/>
                </body>
            </Html>
        )
    }
}

export default MyDocument
