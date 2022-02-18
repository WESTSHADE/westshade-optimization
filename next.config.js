/**
 * @type {import('next').NextConfig}
 */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
    // basePath: '',
    // reactStrictMode: true,
    // swcMinify: true,
    compress: true,
    poweredByHeader: false,
    env: {
        // 自定义环境变量
        appleBusinessId: "5c460d0d-a6a4-4460-a9db-8267edd70c7b",
        apiBaseUrl: "https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1",
        imageBaseUrl: "https://static.westshade.com",
        minWidth: 320,
        maxWidth: 1312,
        businessPhone: "877-702-1872",
        version: "2.0.37"
    },
    trailingSlash: true,
    webpack: function (config) {
        const path = require('path');

        config.resolve.alias = {
            ...config.resolve.alias,
            Assets: path.resolve(__dirname, 'assets/'),
            Components: path.resolve(__dirname, 'components/'),
            Utils: path.resolve(__dirname, 'utils/')
        };

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
        minimumCacheTTL: 60,
        domains: [
            "static.westshade.com",
            "static-woo.westshade.com",
            // "static-woo.westshade.com/wp-content/uploads"
        ],
        formats: ['image/webp'],
        loader: "imgix",
        // path: isProd ? "https://static.westshade.com" : "http://localhost:3000",
        path: "https://static.westshade.com",
    },
    exportPathMap: async function () {
        return {
            "/": {page: "/"},
            "/canopy-tent": {page: "/canopy-tent"},
            "/canopy-tent/spec": {page: "/canopy-tent/spec"},
            "/10x10-canopy-tent": {page: "/10x10-canopy-tent"},
            "/10x15-canopy-tent": {page: "/10x15-canopy-tent"},
            "/10x20-canopy-tent": {page: "/10x20-canopy-tent"},
            "/13x13-canopy-tent": {page: "/13x13-canopy-tent"},
            "/13x20-canopy-tent": {page: "/13x20-canopy-tent"},
            "/13x26-canopy-tent": {page: "/13x26-canopy-tent"},
            "/16x16-canopy-tent": {page: "/16x16-canopy-tent"},
            "/20x20-canopy-tent": {page: "/20x20-canopy-tent"},
            "/custom-printing": {page: "/custom-printing"},
            "/custom-printing/canopy-tent": {page: "/custom-printing/canopy-tent"},
            "/custom-printing/umbrella": {page: "/custom-printing/umbrella"},
            "/custom-printing/table-cover": {page: "/custom-printing/table-cover"},
            "/custom-printing-package": {page: "/custom-printing-package"},
            "/custom-promotion": {page: "/custom-promotion"},
            "/umbrella": {page: "/umbrella"},
            "/umbrella/spec": {page: "/umbrella/spec"},
            "/umbrella/marco": {page: "/umbrella/marco"},
            "/umbrella/santorini": {page: "/umbrella/santorini"},
            "/umbrella/bali": {page: "/umbrella/bali"},
            "/umbrella/kapri": {page: "/umbrella/kapri"},
            "/umbrella/catalina": {page: "/umbrella/catalina"},
            "/accessories": {page: "/accessories"},
            "/contact-us": {page: "/contact-us"},
            "/shipping-return": {page: "/shipping-return"},
            "/warranty": {page: "/warranty"},
            "/about-us": {page: "/about-us"},
            "/westshade-terms-and-conditions": {page: "/terms-and-conditions"},
            "/westshade-privacy": {page: "/privacy"},
            // 购买页
            "/products/canopy-tent/buy": {page: "/products/canopy-tent"},
            "/products/custom-printed-canopy-tent/buy": {page: "/products/custom-printed-canopy-tent"},
            // "/products/market-umbrellas/marco-umbrella": {page: "/products/umbrella", query: {id: "49555"}},
            // "/products/market-umbrellas/santorini-umbrella": {page: "/products/umbrella", query: {id: "47943"}},
            // "/products/tilt-umbrellas/bali-crank-lift-patio-umbrella": {page: "/products/umbrella", query: {id: "30361"}},
            // "/products/tilt-umbrellas/kapri-umbrella": {page: "/products/umbrella", query: {id: "59850"}},
            // "/products/cantilever-umbrellas/catalina-umbrella": {page: "/products/umbrella", query: {id: "30441"}},
            // "/custom-print/table-cover/buy": {page: "/products/table-cover", query: {id: "57917"}},
            // "/products/accessories": {page: "/products/accessories"},
            // 功能页
            "/search": {page: "/search"},
            "/my-account": {page: "/my-account"},
            "/cart": {page: "/cart"},
            "/pre-checkout": {page: "/pre-checkout"},
            "/checkout": {page: "/checkout"},
            "/checkout/success": {page: "/checkout/success"},
            // 被替换页
            "/y5-economic": {page: "/canopy-tent"},
            "/y6-commercial": {page: "/canopy-tent"},
            "/y7-heavy-duty": {page: "/canopy-tent"},
            "/y5-economic/specs": {page: "/canopy-tent/spec"},
            "/y6-commercial/specs": {page: "/canopy-tent/spec"},
            "/y7-heavy-duty/specs": {page: "/canopy-tent/spec"},
            "/market-umbrellas": {page: "/umbrella/santorini"},
            "/tilt-umbrellas": {page: "/umbrella/bali"},
            "/cantilever-umbrellas": {page: "/umbrella/catalina"},
            "/compare": {page: "/canopy-tent/spec"},
            "/compare-tilt-umbrella": {page: "/umbrella/spec"},
            "/compare-market-umbrella": {page: "/umbrella/spec"},
            "/y5-economic/buy": {page: "/products/canopy-tent", query: {id: "25649"}},
            "/y6-commercial/buy": {page: "/products/canopy-tent", query: {id: "24229"}},
            "/y7-heavy-duty/buy": {page: "/products/canopy-tent", query: {id: "25659"}},
            // 将要被删除页面
            "/our-custom-printing-process": {page: "/our-custom-printing-process"},
        };
    },
    async rewrites() {
        return {
            afterFiles: [{
                source: '/y5-economic',
                destination: '/canopy-tent'
            }, {
                source: '/y6-commercial',
                destination: '/canopy-tent'
            }, {
                source: '/y7-heavy-duty',
                destination: '/canopy-tent'
            }, {
                source: '/y5-economic/specs',
                destination: '/canopy-tent/spec'
            }, {
                source: '/y6-commercial/specs',
                destination: '/canopy-tent/spec'
            }, {
                source: '/y7-heavy-duty/specs',
                destination: '/canopy-tent/spec'
            }, {
                source: '/market-umbrellas',
                destination: '/umbrella/santorini'
            }, {
                source: '/tilt-umbrellas',
                destination: '/umbrella/bali'
            }, {
                source: '/cantilever-umbrellas',
                destination: '/umbrella/catalina'
            }, {
                source: '/compare',
                destination: '/canopy-tent/spec'
            }, {
                source: '/compare-tilt-umbrella',
                destination: '/umbrella/spec'
            }, {
                source: '/compare-market-umbrella',
                destination: '/umbrella/spec'
            }, {
                source: '/y5-economic/buy',
                destination: '/products/canopy-tent?series=y5'
            }, {
                source: '/y6-commercial/buy',
                destination: '/products/canopy-tent?series=y6'
            }, {
                source: '/y7-heavy-duty/buy',
                destination: '/products/canopy-tent?series=y6'
            }, {
                source: '/products/canopy-tent/buy',
                destination: '/products/canopy-tent'
            }, {
                source: '/products/custom-printed-canopy-tent/buy',
                destination: '/products/custom-printed-canopy-tent'
            }, {
                source: '/products/market-umbrellas/marco-umbrella/',
                destination: '/products/umbrella/49555'
            }, {
                source: '/products/market-umbrellas/santorini-umbrella/',
                destination: '/products/umbrella/47943'
            }, {
                source: '/products/tilt-umbrellas/bali-crank-lift-patio-umbrella/',
                destination: '/products/umbrella/30361'
            }, {
                source: '/products/tilt-umbrellas/kapri-umbrella/',
                destination: '/products/umbrella/59850'
            }, {
                source: '/products/cantilever-umbrellas/catalina-umbrella/',
                destination: '/products/umbrella/30441'
            }, {
                source: '/custom-print/table-cover/buy',
                destination: '/products/table-cover'
            }, {
                source: '/westshade-terms-and-conditions',
                destination: '/terms-and-conditions'
            }, {
                source: '/westshade-privacy',
                destination: '/privacy'
            }]
        }
    }
    // redirects: async function redirect() {
    //     return [
    //         {source: '/y5-economic/', destination: '/canopy-tent', permanent: true,},
    //     ]
    // },
};

module.exports = nextConfig;
