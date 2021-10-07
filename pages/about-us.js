import React from "react";

import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";

const BlockGridIcon = ({src, alt, title}) => {
    return (
        <Block marginRight="auto" marginBottom={["24px", "32px"]} marginLeft="auto" paddingRight="4px" paddingLeft="4px">
            <Block width="106px" height="106px">
                <img src={src} alt={alt} width="100%" height="100%" style={{border: "1px solid #D9D9D9", borderRadius: "50%"}}/>
            </Block>
            <Block marginTop={["8px", "24px", "32px"]} font={"MinXLabel14"} color="MinXPrimaryText">{title}</Block>
        </Block>
    );
};

const BlockSection = ({title, content, imageContainerHeight, src, alt, imageProps}) => {
    return (
        <Block position="relative" display="flex" flexDirection="column" maxWidth="1920px" marginRight="auto" marginBottom={["40px", "72px", "120px"]} marginLeft="auto"
               overrides={{
                   Block: {
                       style: {":last-child": {marginBottom: 0}}
                   }
               }}
        >
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}>
                <Block marginBottom={["12px", "24px", "40px"]} font={["MinXHeading20", "MinXHeading32", "MinXHeading44"]} color="MinXPrimaryText"
                       overrides={{
                           Block: {
                               style: {textAlign: "center"}
                           }
                       }}
                >
                    {title}
                </Block>
                <Block marginBottom={["12px", "24px", "40px"]} font={["MinXParagraph14", "MinXParagraph16"]} color="MinXPrimaryText">{content}</Block>
            </Block>
            <Block position="relative" width="100%" height={imageContainerHeight ? imageContainerHeight : ["280px", "320px", "480px", "640px"]}>
                <div className="background-image">
                    <Image src={src} alt={alt} layout="fill" objectFit="cover" quality={100} {...imageProps}/>
                </div>
            </Block>
        </Block>
    );
};

function About_Us() {
    return (
        <React.Fragment>
            <Head>
                <title>About Us - WESTSHADE</title>
                <meta name="description"
                      content="Industry Leading Dependable Canopies & Umbrellas Welcome to the #1 dependable canopy manufacturer in the U.S! We are your exclusive supplier of indoor."/>
            </Head>
            <Block position="relative" alignItems="flex-start" justifyContent={"flex-end"} height={["480px", "660px", "900px"]}
                   paddingRight={"30px"} paddingBottom={["38px", "30px", "140px"]} paddingLeft={"30px"}
                   backgroundColor="rgba(0,0,0,0.2)"
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display"
                           }
                       },
                   }}
            >
                <div className="background-image">
                    <Image src="images/about-us/about-us-display.jpeg" alt="Umbrella" layout="fill" objectFit="cover" quality={100}/>
                </div>
                <div>
                    <Block marginBottom="8px" font={["MinXSubtitle10", "MinXSubtitle14"]} color="MinXPrimaryText">
                        EITHER IT’S YOUR BUSINESS OR FAMILY ACTIVITIES
                    </Block>
                    <Block maxWidth={["272px", "433px", "476px"]} marginBottom="20px" font={["MinXTitle32", "MinXTitle44", "MinXTitle64"]} color="MinXPrimaryText">
                        WE’VE GOT YOU COVERED
                    </Block>
                </div>
            </Block>
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display"
                           }
                       },
                   }}
            >
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
            </Block>
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display center"
                           },
                       },
                   }}
            >
                <Block marginBottom={["12px", "24px", "40px"]} font={["MinXHeading20", "MinXHeading32", "MinXHeading44"]} color="MinXPrimaryText">WHAT WE PROVIDE</Block>
                <Block display="flex" justifyContent="space-between">
                    <Block display="grid" gridTemplateColumns={["repeat(1, 100%)", "repeat(1, 100%)", "repeat(2, 50%)"]} justifyContent="space-between" width="100%">
                        <BlockGridIcon src={"/images/about-us/icon_tent.png"} title={"Canopy tent"} alt={"Canopy Tent"}/>
                        <BlockGridIcon src={"/images/about-us/icon_table_cover.png"} title={"Table cover"} alt={"Table cover"}/>
                    </Block>
                    <Block display="grid" gridTemplateColumns={["repeat(1, 100%)", "repeat(1, 100%)", "repeat(2, 50%)"]} justifyContent="space-between" width="100%">
                        <BlockGridIcon src={"/images/about-us/icon_umb.jpg"} title={"Umbrella"} alt={"Umbrella"}/>
                        <BlockGridIcon src={"/images/about-us/icon_water_weight.jpg"} title={"Accessory"} alt={"Accessory"}/>
                    </Block>
                </Block>
            </Block>
            <BlockSection title={"Professional Quality"}
                          content={"We maintain our quality standards to the highest level through our manufacturing process to our customer service. All of our products and accessories are processed and manufactured in-house through our factories. Our quality control maintenance ensures every step in our manufacturing process keeps our canopies maintained to the highest standards at an affordable price for our customers. In addition, each canopy and umbrella are all inspected thoroughly at our facility before shipped out."}
                          src={"images/about-us/professional-quality-display.jpg"}
                          alt={"Professional Quality"}
            />
            <BlockSection title={"Excellent Performance"}
                          content={"What set our canopies apart is our engineering design that makes our canopies and umbrellas more sturdy and durable thanks to our latest truss bar and connector feature. All of our canopies are built with a reliable truss bar and connector design that makes it more sturdy and durable in harsh weather conditions. Furthermore, our canopies and umbrellas are designed for instant set-ups with no additional tools required that makes the whole installation process easy and hassle free."}
                          imageContainerHeight={["230px", "348px", "548px"]}
                          src={"images/about-us/excellent-performance-display.jpg"}
                          alt={"Excellent Performance"}
                          imageProps={{objectFit: "contain"}}
            />
            <BlockSection title={"Guarantee Satisfaction"}
                          content={"We stand behind every merchandise we offer to our customers through a variety of well known reliable features that makes our canopies last up to 10 years. In addition, our canopies meets all of the required fire retardant certification, which includes the CPAI-84 and NFPA-701 certificate. Furthermore, we guarantee full weather resistant protection from harmful environment conditions and powerful UV rays to enhance your outdoor experience."}
                          src={"images/about-us/guarantee-satisfaction-display.png"}
                          alt={"Guarantee Satisfaction"}
            />
            <BlockSection title={"Business Solution Branding"}
                          content={"Our leading industry color printers can print flawless logos, images, promotional displays, social media advertisements, contact information, and all other marketing solutions. Consult with our team of experts today to help assist you in getting your magnificent artwork all over the canopy, ready to be shown to your audience."}
                          src={"images/about-us/business-solution-display.jpg"}
                          alt={"Business Solution Branding"}
            />
        </React.Fragment>
    )

}

About_Us.getInitialProps = () => {
    return {
        newFooter: true,
    };
};

export default About_Us;
