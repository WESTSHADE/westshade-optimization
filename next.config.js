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
        version: "2.0.0"
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
            "/": {page: "/"},
            "/canopy-tent": {page: "/canopy-tent"},
            "/custom-printing": {page: "/custom-printing"},
            "/custom-printing/canopy-tent": {page: "/custom-printing/canopy-tent"},
            "/custom-printing/umbrella": {page: "/custom-printing/umbrella"},
            "/custom-printing/table-cover": {page: "/custom-printing/table-cover"},
            "/umbrella": {page: "/umbrella"},
            "/umbrella/spec": {page: "/umbrella/spec"},
            "/umbrella/marco": {page: "/umbrella/marco"},
            "/umbrella/santorini": {page: "/umbrella/santorini"},
            "/umbrella/bali": {page: "/umbrella/bali"},
            "/umbrella/catalina": {page: "/umbrella/catalina"},
            "/accessories": {page: "/accessories"},
            "/contact-us": {page: "/contact-us"},
            "/shipping-return": {page: "/shipping-return"},
            "/warranty": {page: "/warranty"},
            "/about-us": {page: "/about-us"},
            "/westshade-terms-and-conditions": {page: "/terms-and-conditions"},
            "/westshade-privacy": {page: "/privacy"},
            // 购买页
            "/products/canopy-tent/buy": {page: "/products/canopy-tent", query: {id: 30477}},
            "/custom-printed-package/f1010cpp": {page: "/products/custom-printed-package", query: {id: "40149", frame: "y5"}},
            "/custom-printed-package/f1015cpp": {page: "/products/custom-printed-package", query: {id: "40193", frame: "y5"}},
            "/custom-printed-package/f1020cpp": {page: "/products/custom-printed-package", query: {id: "40275", frame: "y5"}},
            "/custom-printed-package/f1313cpp": {page: "/products/custom-printed-package", query: {id: "40304", frame: "y7"}},
            "/custom-printed-package/f1320cpp": {page: "/products/custom-printed-package", query: {id: "40315", frame: "y7"}},
            "/custom-printed-package/f1326cpp": {page: "/products/custom-printed-package", query: {id: "40326", frame: "y7"}},
            "/custom-printed-package/f1616cpp": {page: "/products/custom-printed-package", query: {id: "40328", frame: "y7"}},
            "/custom-printed-package/f2020cpp": {page: "/products/custom-printed-package", query: {id: "40339", frame: "y7"}},
            "/products/market-umbrellas/marco-umbrella": {page: "/products/umbrella", query: {id: "49555"}},
            "/products/market-umbrellas/santorini-umbrella": {page: "/products/umbrella", query: {id: "47943"}},
            "/products/tilt-umbrellas/bali-crank-lift-patio-umbrella": {page: "/products/umbrella", query: {id: "30361"}},
            "/products/cantilever-umbrellas/catalina-umbrella": {page: "/products/umbrella", query: {id: "30441"}},
            "/custom-print/table-cover/buy": {page: "/products/table-cover", query: {id: 57917}},
            "/products/accessories": {page: "/products/accessories"},
            // 功能页
            "/my-account": {page: "/my-account"},
            "/cart": {page: "/cart"},
            "/checkout": {page: "/checkout"},
            "/checkout/success": {page: "/checkout/success"},
            // 将要被删除页面
            "/custom-printing-canopy-tent": {page: "/custom-printing-canopy-tent"},
            "/our-custom-printing-process": {page: "/our-custom-printing-process"},
            "/market-umbrellas": {page: "/market-umbrellas"},
            "/tilt-umbrellas": {page: "/tilt-umbrellas"},
            "/cantilever-umbrellas": {page: "/cantilever-umbrellas"},
            "/custom-printing-umbrella": {page: "/custom-printing-umbrella"},
            "/compare-tilt-umbrella": {page: "/compare-tilt-umbrella"},
            "/compare-market-umbrella": {page: "/compare-market-umbrella"},
            "/10x10-canopy-tent": {page: "/10x10-canopy-tent"},
            "/10x15-canopy-tent": {page: "/10x15-canopy-tent"},
            "/10x20-canopy-tent": {page: "/10x20-canopy-tent"},
            "/13x13-canopy-tent": {page: "/13x13-canopy-tent"},
            "/13x20-canopy-tent": {page: "/13x20-canopy-tent"},
            "/13x26-canopy-tent": {page: "/13x26-canopy-tent"},
            "/16x16-canopy-tent": {page: "/16x16-canopy-tent"},
            "/20x20-canopy-tent": {page: "/20x20-canopy-tent"},
            "/y5-economic": {page: "/y5-economic"},
            "/y6-commercial": {page: "/y6-commercial"},
            "/y7-heavy-duty": {page: "/y7-heavy-duty"},
            "/y5-economic/specs": {page: "/y5-economic/specs"},
            "/y6-commercial/specs": {page: "/y6-commercial/specs"},
            "/y7-heavy-duty/specs": {page: "/y7-heavy-duty/specs"},
            "/y5-economic/buy": {page: "/products/canopy-tent", query: {id: "25649"}},
            "/y6-commercial/buy": {page: "/products/canopy-tent", query: {id: "24229"}},
            "/y7-heavy-duty/buy": {page: "/products/canopy-tent", query: {id: "25659"}},
            "/compare": {page: "/compare"},
        };
    },
    redirects: async function redirect() {
        return [
            {source: '/y5-economic/', destination: '/canopy-tent', permanent: true,},
            {source: '/y5-economic/specs/', destination: '/canopy-tent/spec', permanent: true,},
            {source: '/y6-commercial/', destination: '/canopy-tent', permanent: true,},
            {source: '/y6-commercial/specs/', destination: '/canopy-tent/spec', permanent: true,},
            {source: '/y7-heavy-duty/', destination: '/canopy-tent', permanent: true,},
            {source: '/y7-heavy-duty/specs/', destination: '/canopy-tent/spec', permanent: true,},
            {source: '/market-umbrellas/', destination: '/umbrella/santorini', permanent: true,},
            {source: '/tilt-umbrellas/', destination: '/umbrella/bali', permanent: true,},
            {source: '/cantilever-umbrellas/', destination: '/umbrella/catalina', permanent: true,},
            {source: '/custom-printing-umbrella/', destination: '/custom-printing/umbrella', permanent: true,},
            {source: '/compare/', destination: '/canopy-tent/spec', permanent: true,},
            {source: '/compare-tilt-umbrella/', destination: '/umbrella/spec', permanent: true,},
            {source: '/compare-market-umbrella/', destination: '/umbrella/spec', permanent: true,},
        ]
    },
};

module.exports = nextConfig;
