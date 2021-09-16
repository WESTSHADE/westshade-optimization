/**
 * @type {import('next').NextConfig}
 */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
	/* config options here */
	// basePath: '',
	// reactStrictMode: true,
	compress: true,
	poweredByHeader: false,
	env: {
		// 自定义环境变量
		appleBusinessId: "5c460d0d-a6a4-4460-a9db-8267edd70c7b",
		apiBaseUrl: "https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1",
	},
	trailingSlash: true,
	webpack: function (config) {
		config.externals = config.externals || {};
		config.externals["styletron-server"] = "styletron-server";
		return config;
	},
	// webpack: (config, {isServer}) => {
	//     if (!isServer) {
	//         config.node = {
	//             net: 'empty',
	//             fs: 'empty'
	//         };
	//     }
	//     return config;
	// },
	// webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
	//     // Important: return the modified config
	//     return config
	// },
	images: {
		deviceSizes: [600, 960, 1280, 1920],
		loader: "imgix",
		path: "/",
	},
	exportPathMap: async function () {
		return {
			"/": { page: "/" },
			"/my-account": { page: "/my-account" },
			"/my-account/orders": { page: "/my-account/orders" },
			"/my-account/addresses": { page: "/my-account/addresses" },
			"/my-account/details": { page: "/my-account/details" },
			"/cart": { page: "/cart" },
			"/checkout": { page: "/checkout" },
			"/canopy-tent": { page: "/canopy-tent" },
			"/custom-printing": { page: "/custom-printing" },
			"/custom-printing-canopy-tent": { page: "/custom-printing-canopy-tent" },
			"/compare": { page: "/compare" },
			"/warranty": { page: "/warranty" },
			"/tilt-umbrellas": { page: "/tilt-umbrellas" },
			"/shipping-return": { page: "/shipping-return" },
			"/westshade-terms-and-conditions": { page: "/terms-and-conditions" },
			"/westshade-privacy": { page: "/privacy" },
			"/our-custom-printing-process": { page: "/our-custom-printing-process" },
			"/market-umbrellas": { page: "/market-umbrellas" },
			"/custom-printing-umbrella": { page: "/custom-printing-umbrella" },
			"/contact-us": { page: "/contact-us" },
			"/compare-tilt-umbrella": { page: "/compare-tilt-umbrella" },
			"/compare-market-umbrella": { page: "/compare-market-umbrella" },
			"/about-us": { page: "/about-us" },
			"/accessories": { page: "/accessories" },
			"/cantilever-umbrellas": { page: "/cantilever-umbrellas" },
			"/10x10-canopy-tent": { page: "/10x10-canopy-tent" },
			"/10x15-canopy-tent": { page: "/10x15-canopy-tent" },
			"/10x20-canopy-tent": { page: "/10x20-canopy-tent" },
			"/13x13-canopy-tent": { page: "/13x13-canopy-tent" },
			"/13x20-canopy-tent": { page: "/13x20-canopy-tent" },
			"/13x26-canopy-tent": { page: "/13x26-canopy-tent" },
			"/16x16-canopy-tent": { page: "/16x16-canopy-tent" },
			"/20x20-canopy-tent": { page: "/20x20-canopy-tent" },
			"/y5-economic": { page: "/y5-economic" },
			"/y5-economic/specs": { page: "/y5-economic/specs" },
			"/y6-commercial": { page: "/y6-commercial" },
			"/y6-commercial/specs": { page: "/y6-commercial/specs" },
			"/y7-heavy-duty": { page: "/y7-heavy-duty" },
			"/y7-heavy-duty/specs": { page: "/y7-heavy-duty/specs" },
			"/y5-economic/buy": { page: "/products/canopy-tent", query: { id: "25649" } },
			"/y6-commercial/buy": { page: "/products/canopy-tent", query: { id: "24229" } },
			"/y7-heavy-duty/buy": { page: "/products/canopy-tent", query: { id: "25659" } },
			"/custom-printed-package/f1010cpp": { page: "/products/custom-printed-package", query: { id: "40149", frame: "y5" } },
			"/custom-printed-package/f1015cpp": { page: "/products/custom-printed-package", query: { id: "40193", frame: "y5" } },
			"/custom-printed-package/f1020cpp": { page: "/products/custom-printed-package", query: { id: "40275", frame: "y5" } },
			"/custom-printed-package/f1313cpp": { page: "/products/custom-printed-package", query: { id: "40304", frame: "y7" } },
			"/custom-printed-package/f1320cpp": { page: "/products/custom-printed-package", query: { id: "40315", frame: "y7" } },
			"/custom-printed-package/f1326cpp": { page: "/products/custom-printed-package", query: { id: "40326", frame: "y7" } },
			"/custom-printed-package/f1616cpp": { page: "/products/custom-printed-package", query: { id: "40328", frame: "y7" } },
			"/custom-printed-package/f2020cpp": { page: "/products/custom-printed-package", query: { id: "40339", frame: "y7" } },
			"/products/tilt-umbrellas/bali-crank-lift-patio-umbrella": { page: "/products/umbrella", query: { id: "30361" } },
			"/products/market-umbrellas/marco-umbrella": { page: "/products/umbrella", query: { id: "49555" } },
			"/products/market-umbrellas/santorini-aluminum-umbrella": { page: "/products/umbrella", query: { id: "47943" } },
			"/products/market-umbrellas/santorini-fiberglass-umbrella": { page: "/products/umbrella", query: { id: "49306" } },
			"/products/cantilever-umbrellas/catalina-umbrella": { page: "/products/umbrella", query: { id: "30441" } },
			"/custom-print/table-cover/fitted-table-cover": { page: "/products/table-cover", query: { id: "57886" } },
			"/custom-print/table-cover/stretch-table-cover": { page: "/products/table-cover", query: { id: "57917" } },
			"/products/inflatable-canopy-tent/basic-inflatable-canopy-tent": { page: "/products/inflatable-canopy-tent", query: { id: "48631" } },
			"/products/inflatable-canopy-tent/plus-inflatable-canopy-tent": { page: "/products/inflatable-canopy-tent", query: { id: "50347" } },
			"/products/inflatable-canopy-tent/extended-inflatable-canopy-tent": { page: "/products/inflatable-canopy-tent", query: { id: "51778" } },
			"/products/inflatable-canopy-tent/hexagon-inflatable-canopy-tent": { page: "/products/inflatable-canopy-tent", query: { id: "51780" } },
			"/products/inflatable-canopy-tent/triangular-inflatable-canopy-tent": { page: "/products/inflatable-canopy-tent", query: { id: "51782" } },
			"/products/inflatable-canopy-tent/star-inflatable-canopy-tent": { page: "/products/inflatable-canopy-tent", query: { id: "51784" } },
			"/products/accessories": { page: "/products/accessories" },
			// "/products/canopy-tent-test": { page: "/products/canopy-tent-test", query: { id: "25649" } },
		};
	},
};

module.exports = nextConfig;
