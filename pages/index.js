import React, {useRef} from "react";

import {withRouter} from "next/router";
import Head from "next/head";

import BannerDisplay from "../components/sections/BannerDisplay";
import MButton from "../components/button-n";
import {ChevronRight} from "baseui/icon";

function Home({router}) {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

    const scrollDownToNextSection = (ref) => {
        // TODO: 滚轮下滑和button点击下滑不兼容, 未找到解决办法
        // if (typeof window !== "undefined") {
        //     let frame = window.document.getElementById("WestShadeFrame");
        //     frame.classList.remove("scroll-container");
        //     setTimeout(() => {
        //         window.scrollTo(0, ref.current.offsetTop);
        //         setTimeout(() => frame.classList.add("scroll-container"), 500)
        //     }, 500)
        // }
    }

    return (
        <React.Fragment>
            <Head>
                <title>WESTSHADE | #1 Canopy and Umbrella in Southern California</title>
                <meta name="description"
                      content="#1 canopy and umbrella in Southern California. Industry leading quality instant canopies and market umbrellas for all occasions. Easy set up."/>
                <script id="mcjs" type="text/javascript" src="/static/mailchimpFirstOrder.js"/>
            </Head>
            <BannerDisplay refD={ref1} title="CUSTOM PRINTING" subtitle="Custom the product to light up your special occasions." url="images/home/custom_printing.jpg"
                           router={router} destination="/custom-printing" showScrollDown onClickScrollDown={() => scrollDownToNextSection(ref2)} home containerMarginBottom={"0px"}/>
            <BannerDisplay refD={ref2} title="CANOPY TENT" subtitle="The most heavy duty canopy on the market with unchallenged strength and durability." url="images/home/tent.jpg"
                           router={router} destination="/canopy-tent" showScrollDown onClickScrollDown={() => scrollDownToNextSection(ref3)} home containerMarginBottom={"0px"}/>
            {/*<BannerDisplay refD={ref3} title="UMBRELLA" subtitle="Easy to adjust any desired angle for shade coverage with a simple push button." url="images/home/umbrella.jpg"*/}
            {/*               router={router} destination="/umbrella" home containerMarginBottom={"0px"} />*/}
            <BannerDisplay refD={ref3} title="UMBRELLA" subtitle="KAPRI" url="images/home/umbrella.jpg" subtitleFont={["MinXSubtitle46", "MinXSubtitle46", 'MinXSubtitle46']}
                           router={router} destination="/umbrella" home containerMarginBottom={"0px"}
                           content="Easy to adjust any desired angle for shade coverage with a simple push button."
                           newPart
                           renderButton={
                               <MButton type="solid" width={["240px"]} height={["56px"]}
                                        font="MinXLabel20" color={"MinXPrimaryTextAlt"}
                                        buttonStyle={{
                                            borderColor: 'rgba(255,255,255,0.2) !important',
                                            backgroundColor: `rgba(255,255,255,0.2) !important`,
                                            ":hover": {backgroundColor: 'rgba(255,255,255,0.5) !important'},
                                            ":active": {backgroundColor: "rgba(255,255,255,0.8) !important"}
                                        }}
                                        endEnhancer={() => <ChevronRight size={24} color={"white"}/>}
                                        onClick={() => router.push("/umbrella")} text={"Learn More"}
                               />
                           }
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
