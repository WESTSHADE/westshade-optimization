import React from "react";

import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import {Accordion, Panel} from "baseui/accordion";

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
                {/*    <meta name="description"*/}
                {/*          content="Industry Leading Dependable Canopies & Umbrellas Welcome to the #1 dependable canopy manufacturer in the U.S! We are your exclusive supplier of indoor."/>*/}
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
                <Block display="flex" flex={1} flexDirection="column" alignItems="center" marginBottom={["40px", "60px", "80px"]} paddingTop="80px">
                    <Block marginBottom={["24px", "32px", "40px"]} font="MinXHeading20" color="MinXPrimaryText">FAQs</Block>
                    <Block width={["100%", "100%", "602px"]} maxWidth="602px" font="MinXHeading14" color="MinXPrimaryText">
                        <Accordion overrides={{
                            Root: {
                                style: {
                                    borderBottomColor: "#F0F0F0"
                                }
                            },
                            Header: {
                                props: {
                                    className: "accordion-header"
                                },
                                style: {
                                    minHeight: "48px",
                                    paddingTop: "12px", paddingRight: "0px", paddingBottom: "12px", paddingLeft: "0px",
                                    fontSize: "inherit", fontWeight: "inherit", fontFamily: "inherit", color: "inherit"
                                }
                            },
                            Content: {
                                style: {
                                    paddingTop: "12px", paddingRight: "0px", paddingBottom: "12px", paddingLeft: "0px",
                                    fontSize: "inherit", fontWeight: "400", fontFamily: "inherit", color: "inherit",
                                    backgroundColor: "translate"
                                }
                            },
                        }}>
                            <Panel title="Where can I use my WestShade pop-up canopy?">
                                Our canopies stand securely on grass, dirt, or pavement without ropes or poles. In windy conditions, However, we
                                recommend using our Weight Bags to anchor and prevent your canopy from tipping over.
                            </Panel>
                            <Panel title="Can I buy a replacement canopy covering?">
                                Yes, we offer many replacement cover options. Please call customer service at 949-751-1070 or contact us
                                online.
                            </Panel>
                            <Panel title="Do you have any accessories available?">
                                Yes, our full line of accessories includes sidewalls, half sidewalls, sidewalls with roll up doors, sidewalls
                                with windows and sand bags.
                            </Panel>
                            <Panel title="What fire ratings do your fabric items have?">
                                Our fabric meets CPAI-84, NFPA-71 and the California Administrative Code Title 19 fire resistant
                                requirements.
                            </Panel>
                            <Panel title="What are your shipping costs?">
                                We provide free shipping and handling costs for any orders over $149 within the U.S., with the exception of AK, HI and
                                PR.
                                <br/>
                                <br/>
                                Shipping costs for customers located in those 3 states will be provided after further order estimates.
                            </Panel>
                        </Accordion>
                    </Block>
                </Block>
                <Block display="flex" flex={1} flexDirection="column" alignItems="center" marginBottom={["40px", "06px", "80px"]} paddingTop="80px">
                    <Block marginBottom={["24px", "32px", "40px"]} font="MinXHeading20" color="MinXPrimaryText">Contact us</Block>
                    <Block display="grid" justifyContent={["center", "flex-start", "space-around"]}
                           gridTemplateColumns={["repeat(auto-fill, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap={["16px", "16px", "20px"]} gridRowGap="20px"
                    >
                        <SectionBlock url={"images/contact-us/online-chat.png"} alt="Online Chat" title="ONLINE CHAT" content="Chat now"/>
                        <SectionBlock url={"images/contact-us/call-us.png"} alt="Call us" title="CALL US" content="949-528-1169"/>
                        <SectionBlock url={"images/contact-us/email-us.png"} alt="Email us" title="EMAIL US" content="support@westshade.com"/>
                    </Block>
                </Block>
            </Block>
        </React.Fragment>
    );
}

Contact_Us.getInitialProps = () => {
    return {
        newFooter: true,
    };
};

export default Contact_Us;
