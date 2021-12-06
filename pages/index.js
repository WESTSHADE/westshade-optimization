import React from "react";
// import loadable from '@loadable/component'

import {withRouter} from "next/router";
import Head from "next/head";

import BannerDisplay from "../components/sections/BannerDisplay";

function Home({router}) {
    return (
        <React.Fragment>
            <Head>
                <title>WESTSHADE | #1 Canopy and Umbrella in Southern California</title>
                <meta name="description" content="#1 canopy and umbrella in Southern California. Industry leading quality instant canopies and market umbrellas for all occasions. Easy set up."/>
            </Head>
            <BannerDisplay title="CUSTOM PRINTING" subtitle="Custom the product to light up your special occasions." url="/images/home/custom_printing.webp" router={router} destination="/custom-printing" home
                           containerBackground={null}
            />
            <BannerDisplay title="CANOPY TENT" subtitle="The most heavy duty canopy on the market with unchallenged strength and durability." url="/images/home/tent.webp" router={router} destination="/canopy-tent" home
                           containerBackgroundPosition="bottom"
            />
            <BannerDisplay title="UMBRELLA" subtitle="Easy to adjust any desired angle for shade coverage with a simple push button." url="/images/home/umbrella.webp" router={router} destination="/umbrella" home
                           containerBackgroundPosition="bottom"
            />
        </React.Fragment>
    )
}

Home.getInitialProps = () => {
    return {
        homePage: true,
    };
};

export default withRouter(Home);
