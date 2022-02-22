import React from "react";

import {withRouter} from "next/router";
import Head from "next/head";

import Banner from "Components/Sections/Banner";

function Home({router}) {
    return (
        <React.Fragment>
            <Head>
                <title>WESTSHADE | #1 Canopy and Umbrella in Southern California</title>
                <meta name="description" content="#1 canopy and umbrella in Southern California. Industry leading quality instant canopies and market umbrellas for all occasions. Easy set up."/>
            </Head>
            <Banner title="CUSTOM PRINTING" subtitle="Custom the product to amplify up your special occasions." url="/images/home/custom-printing-1.webp" router={router} destination="/custom-printing" home
                    textColor="MinXPrimaryText" buttonBackgroundColor="#262626" containerBackground={null}
            />
            <Banner title="CANOPY TENT" subtitle="The exceptional heavy duty canopy with distinguished strength and durability." url="/images/home/tent-1.webp" router={router} destination="/canopy-tent" home
                    containerBackgroundPosition="bottom"
            />
            <Banner title="UMBRELLA" subtitle="Easy to adjust any desired angle for shade coverage with a simple push button." url="/images/home/umbrella-1.webp" router={router} destination="/umbrella" home
                    containerBackgroundPosition="top"
            />
        </React.Fragment>
    )
}

Home.getInitialProps = () => {
    return {
        homePage: true,
        noFooter: true,
    };
};

export default withRouter(Home);
