import React from "react";
import { ServerStyleSheet } from "styled-components";

import Document, { Html, Head, Main, NextScript } from "next/document";

import { Provider as StyletronProvider } from "styletron-react";
import { styletron } from "../styletron";

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
					<title>WESTSHADE | #1 Canopy and Umbrella in Southern California</title>
					<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
					<link rel="icon" href="/logo.png" />
					<script src="https://static.cdn-apple.com/businesschat/start-chat-button/2/index.js" />
					{this.props.stylesheets.map((sheet, i) => (
						<style className="_styletron_hydrate_" dangerouslySetInnerHTML={{ __html: sheet.css }} media={sheet.attrs.media} data-hydrate={sheet.attrs["data-hydrate"]} key={i} />
					))}
				</Head>
				<body>
					<Main />
					<NextScript />
					<script type="text/javascript" src="/static/appleBusinessChat.js" />
					<script
						dangerouslySetInnerHTML={{
							__html: `window.__lc = window.__lc || {}; window.__lc.license = 12994977;
                        ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))`,
						}}
					/>
					<noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MCQP54N" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />
					<noscript
						dangerouslySetInnerHTML={{
							__html: `<a href="https://www.livechatinc.com/chat-with/12994977/" rel="nofollow">Chat with us</a>, powered by <a href="https://www.livechatinc.com/?welcome" rel="noopener nofollow" target="_blank">LiveChat</a>`,
						}}
					/>
					<script type="text/javascript" src="//cdn.callrail.com/companies/500751700/64e085e008c0c7141719/12/swap.js" />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
