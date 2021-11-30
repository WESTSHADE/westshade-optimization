import React from "react";

import Head from "next/head";

import {Block} from "baseui/block";
import {Section} from "../components/sections";

const BlockGridIcon = ({src, alt, title}) => {
    return (
        <Block display="grid" gridTemplateColumns="1fr" gridRowGap={["8px", "24px", "32px"]} justifyItems="center">
            <Block width="106px" height="106px">
                <img src={src} alt={alt} width="100%" height="100%" style={{border: "1px solid #D9D9D9", borderRadius: "50%"}}/>
            </Block>
            <Block font="MinXLabel14" color="MinXPrimaryText">{title}</Block>
        </Block>
    );
};

const BlockSection = ({title, content, imageContainerHeight, src, backgroundSize = "cover"}) => {
    return (
        <Section upperContainerProps={{hidden: true}}
                 content={
                     <Block display="grid" gridRowGap={["12px", "24px", "32px"]} overrides={{Block: {props: {className: "text-center"}}}}>
                         <Block font={["MinXHeading20", "MinXHeading32", "MinXHeading44"]} color="MinXPrimaryText">{title}</Block>
                         <Block font={["MinXParagraph14", "MinXParagraph16"]} color="MinXPrimaryText" overrides={{Block: {props: {className: "text-left"}}}}>{content}</Block>
                         <Block position="relative" width="100%" height={imageContainerHeight ? imageContainerHeight : ["280px", "320px", "480px", "640px"]}
                                backgroundImage={"url(" + src + ")"} backgroundSize={backgroundSize} backgroundPosition="center" backgroundRepeat="no-repeat"
                         />
                     </Block>
                 }
        />
    );
};

function About_Us() {
    return (
        <React.Fragment>
            <Head>
                <title>About Us - WESTSHADE</title>
                <meta name="description"
                      content="Our goal is to bring comfort, quality, and convenience in enhancing our customers outdoor and indoor experience. In addition to our recreational and optimal business solution shelters, we also provide full custom-printing services in creating the ideal advertising method for your next product & service promotion!"/>
            </Head>
            <Block display="flex" flexDirection="column" position="relative" alignItems="flex-start" justifyContent={"flex-end"} width="960px" height={["181px", "272px", "517px"]}
                   marginRight="auto" marginBottom={["32px", "32px", "40px"]} marginLeft="auto" paddingRight={"30px"} paddingBottom={["38px", "30px", "140px"]} paddingLeft={"30px"}
                   backgroundImage={"url(\"images/about-us/about-us-display.webp\")"} backgroundSize="cover" backgroundPosition="center" backgroundRepeat="no-repeat"
            >
                <div>
                    <Block marginBottom="8px" font={["MinXSubtitle10", "MinXSubtitle14"]} color="MinXPrimaryText">
                        EITHER IT’S YOUR BUSINESS OR FAMILY ACTIVITIES
                    </Block>
                    <Block maxWidth={["272px", "433px", "476px"]} marginBottom="20px" font={["MinXTitle32", "MinXTitle44", "MinXTitle64"]} color="MinXPrimaryText">
                        WE’VE GOT YOU COVERED
                    </Block>
                </div>
                <Block position="absolute" bottom="4px" right="4px" font="MinXHeading14" color="MinXSecondaryText">{process.env.version}</Block>
            </Block>
            <Block display="grid" gridTemplateColumns="100%" gridRowGap={["40px", "72px", "120px"]} maxWidth="960px" marginRight="auto" marginLeft="auto">
                <Section upperContainerProps={{hidden: true}}
                         content={
                             <Block display={"flex"} flexDirection={"column"} paddingRight={["0px", "0px", "78px"]} paddingLeft={["0px", "0px", "78px"]}>
                                 <Block width={["100%", "100%", "522px"]} marginBottom={["20px", "68px", "50px"]} font={["MinXParagraph16", "MinXParagraph20"]} color="MinXPrimaryText">
                                     Westshade puts quality designing, engineering, and reliability in every canopy and umbrella that is perfect suited for all of our customers.
                                 </Block>
                                 <Block alignSelf={["flex-start", "flex-end"]} width={["100%", "390px", "587px"]} font="MinXParagraph14" color="MinXPrimaryText">
                                     Our goal is to bring <span style={{color: "#23A4AD"}}>comfort, quality, and convenience</span> in enhancing our customers outdoor and indoor
                                     experience. In addition to our recreational and optimal business solution shelters, we also provide <span
                                     style={{color: "#23A4AD"}}>full custom-printing</span> services in creating the ideal advertising method for your next product & service
                                     promotion!
                                 </Block>
                             </Block>
                         }
                />
                <Section upperContainerProps={{hidden: true}}
                         content={
                             <Block overrides={{Block: {props: {className: "text-center"}}}}>
                                 <Block marginBottom={["12px", "24px", "40px"]} font={["MinXHeading20", "MinXHeading32", "MinXHeading44"]} color="MinXPrimaryText">WHAT WE PROVIDE</Block>
                                 <Block display="grid" gridTemplateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]} gridRowGap={["18px", "26px"]} gridColumnGap={["28px", "38px"]} justifyItems="center">
                                     <BlockGridIcon src={"images/about-us/icon_tent.webp"} title={"Canopy tent"} alt={"Canopy Tent"}/>
                                     <BlockGridIcon src={"images/about-us/icon_table_cover.webp"} title={"Table cover"} alt={"Table cover"}/>
                                     <BlockGridIcon src={"images/about-us/icon_umb.webp"} title={"Umbrella"} alt={"Umbrella"}/>
                                     <BlockGridIcon src={"images/about-us/icon_water_weight.webp"} title={"Accessory"} alt={"Accessory"}/>
                                 </Block>
                             </Block>
                         }
                />
                <BlockSection title={"Professional Quality"}
                              content={"We maintain our quality standards to the highest level through our manufacturing process to our customer service. All of our products and accessories are processed and manufactured in-house through our factories. Our quality control maintenance ensures every step in our manufacturing process keeps our canopies maintained to the highest standards at an affordable price for our customers. In addition, each canopy and umbrella are all inspected thoroughly at our facility before shipped out."}
                              src={"images/about-us/professional-quality-display.webp"}
                />
                <BlockSection title={"Excellent Performance"}
                              content={"What set our canopies apart is our engineering design that makes our canopies and umbrellas more sturdy and durable thanks to our latest truss bar and connector feature. All of our canopies are built with a reliable truss bar and connector design that makes it more sturdy and durable in harsh weather conditions. Furthermore, our canopies and umbrellas are designed for instant set-ups with no additional tools required that makes the whole installation process easy and hassle free."}
                              imageContainerHeight={["230px", "348px", "548px"]}
                              src={"images/about-us/excellent-performance-display.webp"}
                              backgroundSize="contain"
                />
                <BlockSection title={"Guarantee Satisfaction"}
                              content={"We stand behind every merchandise we offer to our customers through a variety of well known reliable features that makes our canopies last up to 10 years. In addition, our canopies meets all of the required fire retardant certification, which includes the CPAI-84 and NFPA-701 certificate. Furthermore, we guarantee full weather resistant protection from harmful environment conditions and powerful UV rays to enhance your outdoor experience."}
                              src={"images/about-us/guarantee-satisfaction-display.webp"}
                />
                <BlockSection title={"Business Solution Branding"}
                              content={"Our leading industry color printers can print flawless logos, images, promotional displays, social media advertisements, contact information, and all other marketing solutions. Consult with our team of experts today to help assist you in getting your magnificent artwork all over the canopy, ready to be shown to your audience."}
                              src={"images/about-us/business-solution-display.webp"}
                />
            </Block>
        </React.Fragment>
    )

}

export default About_Us;
