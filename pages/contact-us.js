import React from "react";

import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";

import Accordion from "../components/accordion";

const QA = [
    {
        title: "Where can I use my WestShade pop-up canopy?",
        content: "Our canopies stand securely on grass, dirt, or pavement without ropes or poles. In windy conditions, However, we recommend using our Weight Bags to anchor and prevent your canopy from tipping over."
    },
    {title: "Can I buy a replacement canopy covering?", content: "Yes, we offer many replacement cover options. Please call customer service at 877-702-1872 or contact us online."},
    {title: "Do you have any accessories available?", content: "Yes, our full line of accessories includes sidewalls, half sidewalls, sidewalls with roll up doors, sidewalls with windows and sand bags."},
    {title: "What fire ratings do your fabric items have?", content: " Our fabric meets CPAI-84, NFPA-71 and the California Administrative Code Title 19 fire resistant requirements."},
    {
        title: "What are your shipping costs?",
        content: <>We provide free shipping and handling costs for any orders over $149 within the U.S., with the exception of AK, HI and PR.<br/><br/>Shipping costs for customers located in those 3 states will be provided after further order
            estimates.</>
    },
];

const SectionBlock = ({url, alt, title, content}) => {
    return (
        <Block display="flex" flexDirection="column" alignItems="center" paddingTop="16px" paddingRight="16px" paddingBottom="16px" paddingLeft="16px"
               overrides={{
                   Block: {
                       style: {textAlign: "center",}
                   },
               }}
        >
            <Block position="relative" width="48px" height="48px" marginBottom="16px">
                <Image src={url} alt={alt} layout="fill" objectFit="contain" quality={100}/>
            </Block>
            <Block marginBottom="4px" font="MinXHeading14" color="MinXPrimaryText"
                   overrides={{
                       Block: {
                           style: {
                               fontWeight: "400 !important"
                           }
                       },
                   }}
            >{title}</Block>
            <Block font="MinXHeading14" color="MinXPrimaryText">{content}</Block>
        </Block>
    )
}

function Contact_Us() {
    return (
        <React.Fragment>
            <Head>
                <title>Contact Us - WESTSHADE</title>
                <meta name="description" content="Frequently asked question about Westshade's canopy, umbrella and accessories."/>
            </Head>
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display"
                           }
                       },
                   }}
            >
                <Block width="100%" maxWidth="660px" display="flex" flex={1} flexDirection="column" alignItems="center" marginRight="auto" marginBottom={["40px", "60px", "80px"]} marginLeft="auto" paddingTop="80px">
                    <Block marginBottom={["24px", "32px", "40px"]} font="MinXHeading20" color="MinXPrimaryText">FAQs</Block>
                    <Accordion list={QA}/>
                </Block>
                <Block width="100%" maxWidth="600px" display="flex" flex={1} flexDirection="column" alignItems="center" marginRight="auto" marginBottom={["40px", "06px", "80px"]} marginLeft="auto" paddingTop="80px">
                    <Block marginBottom={["24px", "32px", "40px"]} font="MinXHeading20" color="MinXPrimaryText">Contact us</Block>
                    <Block display="grid" justifyContent={["center", "flex-start", "space-around"]}
                           gridTemplateColumns={["repeat(auto-fill, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap={["16px", "16px", "20px"]} gridRowGap="20px"
                    >
                        <SectionBlock url={"images/contact-us/online-chat.webp"} alt="Online Chat" title="ONLINE CHAT" content="Chat now"/>
                        <SectionBlock url={"images/contact-us/call-us.webp"} alt="Call us" title="CALL US" content="877-702-1872"/>
                        <SectionBlock url={"images/contact-us/email-us.webp"} alt="Email us" title="EMAIL US" content="support@westshade.com"/>
                    </Block>
                </Block>
            </Block>
        </React.Fragment>
    );
}

export default Contact_Us;
