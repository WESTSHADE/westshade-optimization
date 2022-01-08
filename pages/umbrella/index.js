import React from "react";

import {withRouter} from "next/router";
import Head from "next/head";

import {Block} from "baseui/block";
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import {ChevronRight} from "baseui/icon";

import Button from "Components/button-n";
import {Banner, Section, SectionTitle, UmbrellaComparison, UmbrellaBlock} from "Components/Sections";
import ThemeProvider from "Components/ThemeProvider";

function Umbrella({router, size}) {
    return (
        <ThemeProvider.V2>
            <Head>
                <title>Umbrella - WESTSHADE</title>
                <meta name="description" content="Best commercial umbrella in Southern California. Find your desired umbrella with different frames, different shape and different fabric!"/>
            </Head>
            <FlexGrid flexGridColumnCount={1} flexGridRowGap={["scale1600", "scale2400", "scale3200"]} paddingTop={["scale600", null, "scale1600"]} paddingBottom={["scale600", null, "scale1600"]}>
                <FlexGridItem>
                    <Section upperContainerProps={{hidden: true}}
                             content={
                                 <Block display="grid" gridRowGap={["24px", null, "64px"]}>
                                     <SectionTitle.V2 category="Umbrella" title="comparison of all ranges"
                                                      content="Westshade provide five umbrella ranges to meet your special needs. Check out the comparison to find the one that meets your need best."/>
                                     <UmbrellaComparison size={size}/>
                                 </Block>
                             }
                    />
                </FlexGridItem>
                <FlexGridItem>
                    <Section upperContainerProps={{hidden: true}}
                             content={
                                 <Block display="grid" gridRowGap={["24px", null, "64px"]}>
                                     <SectionTitle.V2 category="Umbrella" title="Open Systems" content="There are three types of open systems you can choose from - push up, pulley lift, and crank lift depending on the umbrella range."/>
                                     <UmbrellaBlock dataList={[
                                         {
                                             url: "/images/umbrella/open-push-up.webp",
                                             alt: "open push up",
                                             title: "Push up",
                                             content: "Simply pushing the umbrella upwards and open from the hub. Effortlessly open your umbrella in 15 seconds."
                                         },
                                         {
                                             url: "/images/umbrella/open-pulley.webp",
                                             alt: "open pulley",
                                             title: "Pulley lift",
                                             content: "Easier than push up system and raise your umbrella in a few seconds with this heavy duty pulley lift system with ease."
                                         },
                                         {
                                             url: "/images/umbrella/open-crank.webp",
                                             alt: "open crank",
                                             title: "Crank lift",
                                             content: "Rotate the crank to open the umbrella and continue when it is open to tilt the umbrella (tilt umbrella only)."
                                         }
                                     ]}/>
                                 </Block>
                             }
                    />
                </FlexGridItem>
                <FlexGridItem>
                    <Section upperContainerProps={{hidden: true}}
                             content={
                                 <Block display="grid" gridRowGap={["24px", null, "64px"]}>
                                     <SectionTitle.V2 category="Umbrella" title="Frames" content="There are two types of frames you can choose from - fiberglass and aluminum when available."/>
                                     <UmbrellaBlock dataList={[
                                         {
                                             url: "/images/umbrella/frame-aluminum.webp",
                                             alt: "frame aluminum",
                                             title: "Aluminum",
                                             content: "The lightweight, durable, corrosion resistance aluminum frame comes with an excellent finish. It is strong and will not break in high winds."
                                         },
                                         {
                                             url: "/images/umbrella/frame-fiberglass.webp",
                                             alt: "frame fiberglass",
                                             title: "Fiberglass",
                                             content: "The lightweight, flexible, and strong fiberglass allows the frame to bend without breaking, even in the most severe storms."
                                         }
                                     ]}/>
                                 </Block>
                             }
                    />
                </FlexGridItem>
                <FlexGridItem>
                    <Section upperContainerProps={{hidden: true}}
                             content={
                                 <Block display="grid" gridRowGap={["24px", null, "64px"]}>
                                     <SectionTitle.V2 category="Umbrella" title="Fabric" content="There are two brands of fabric you can choose from - SDP and AGORA when available."/>
                                     <UmbrellaBlock dataList={[
                                         {
                                             url: "/images/umbrella/fabric-sdp.webp",
                                             alt: "fabric sdp",
                                             title: "SDP",
                                             content: "The SDP fabric is made of solution dyed polyester with a UPF 50+ protection. It is water repellent, stain resistant."
                                         },
                                         {
                                             url: "/images/umbrella/fabric-agora.webp",
                                             alt: "fabric agora",
                                             title: "AGORA",
                                             content: "The AGORA fabric is made of solution dyed acrylic with a UPF 50+ protection. AGORA has a longer lifespan than SDP.",
                                             titleImageUrl: "/images/icon/icon-agora.png"
                                         }
                                     ]}/>
                                 </Block>
                             }
                    />
                </FlexGridItem>
                <FlexGridItem>
                    <Section upperContainerProps={{hidden: true}}
                             content={
                                 <Banner title="CUSTOM PRINTING" subtitle="Make your umbrellas special for your activity." url="/images/umbrella/series-custom-printing.webp" alt="custom printing"
                                         containerHeight={["250px", "360px", "500px"]} containerMarginBottom={["12px", "20px"]} containerBackground="transparent" containerBackgroundPosition="bottom"
                                         textColor={"#262626"} subTextColor={"#8C8C8C"}
                                         renderButton={
                                             <Button bundle="primary" height={["36px", null, "40px"]} font={["MinXLabel14", "MinXLabel16"]} text='Learn More'
                                                     endEnhancer={() => <ChevronRight size={24}/>} onClick={() => router.push("/custom-printing/umbrella")}
                                             />
                                         }
                                 />
                             }
                    />
                </FlexGridItem>
            </FlexGrid>
        </ThemeProvider.V2>
    )
}

export default withRouter(Umbrella);
