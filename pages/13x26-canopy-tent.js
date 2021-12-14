import React, {createRef, useEffect, useState} from "react";
import ReactPlayer from "react-player";

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import {Block} from "baseui/block";
import {Tab, Tabs, FILL} from "baseui/tabs-motion";

import Button from "Components/button-n";
import CardTabs from "Components/card_tabs";
import {Modal} from "Components/surfaces";

const Tag = ({text}) => <Block height="32px" padding="8px" backgroundColor="#F5FCFC" color="#5FBDBE" $style={{border: "1px solid #5FBDBE"}}>{text}</Block>

function Canopy_Tent({router}) {
    const [tabsRefs, setTabsRefs] = useState([]);
    const [activeTabKey, setActiveTabKey] = useState("0");
    const [tabLeft, setTabLeft] = useState(0);

    const [displayTabs, setDisplayTabs] = useState(false);

    const [frameCompareOpen, setFrameCompareOpen] = useState(false);
    const [technologyCompareOpen, setTechnologyCompareOpen] = useState(false);

    const goBuyingPage = (param) => router.push(param);

    const frame = [{
        tabTitle: "Y7",
        tabContentTitle: "Y7 - Heavy-duty aluminum frame",
        tabContentContent: "Y7 range is the most heavy duty pop-up canopy on the market with unchallenged strength and durability. It is perfect for outdoor events, job fairs, trade fair exhibitors and wedding venues.",
        tabContentPrice: "",
        url: "/images/canopy-tent/tent/y7.webp",
        onClick: () => goBuyingPage({pathname: '/products/canopy-tent/buy', query: {series: "y7", size: "13x26"}}),
        onClickLink: () => setFrameCompareOpen(true)
    }];

    const printing_technology = [{
        tabTitle: "Dye Sublimation",
        tabContentTitle: "Dye sublimation printing",
        tabContentContent: "Full color dye sublimation printing, unlimited colors, scratch-free, fading resistance. It is best choice of brand marketing and activity display.",
        tabContentPrice: "",
        url: "/images/canopy-tent/tent/uv-printer.webp",
        onClick: () => {
        },
        onClickLink: () => setTechnologyCompareOpen(true)
    }, {
        tabTitle: "UV Printing",
        tabContentTitle: "UV Printing",
        tabContentContent: "Take your branding to the next level with our digital printing process using our high-quality UV ink to take your logo directly onto the canopy fabric. Provides high resolution service that dries and strengthens onto your canopy in an instant.",
        tabContentPrice: "",
        url: "/images/canopy-tent/tent/dye-sublimation-printer.webp",
        onClick: () => {
        },
        onClickLink: () => setTechnologyCompareOpen(true)
    }];

    useEffect(() => {
        setTabsRefs((tabsRefs) => Array(2).fill(null).map((_, i) => tabsRefs[i] || createRef()));
    }, []);

    useEffect(() => {
        if (tabsRefs.length > 0) setDisplayTabs(true);
    }, [tabsRefs]);

    useEffect(() => {
        if (displayTabs) setTabLeft((tabsRefs[activeTabKey].current.clientWidth - 40) / 2);
    }, [displayTabs]);

    return (
        <React.Fragment>
            <Head>
                <title>13x26 Canopy Tent | WESTSHADE</title>
                {/*<meta name="description" content="View frequently asked questions about our shipping and return policies, estimated delivery, damaged items, and refunds."/>*/}
            </Head>
            <Block backgroundColor="#F7F7F7" overrides={{Block: {props: {className: "text-center"}}}}>
                {displayTabs ? (
                    <>
                        <Block display="flex" flexDirection="column" marginBottom={["32px", "40px", "64px"]} padding={["24px 16px", "32px 16px", "40px 24px"]} backgroundColor="#F5FCFC">
                            <Block marginBottom={["24px", "24px", "32px"]} font="MinXLabel32">13x26 Canopy Tent</Block>
                            <Block width="100%" maxWidth="420px" marginRight="auto" marginLeft="auto" font="MinXLabel20">
                                <Block display="grid" gridTemplateColumns="1fr 1fr" height="90px">
                                    <Block position="relative" onClick={() => setActiveTabKey("0")} overrides={{Block: {props: {className: "cursor"}, style: {filter: activeTabKey === "1" ? "grayscale(1)" : "grayscale(0)"}}}}>
                                        <Image src="/images/canopy-tent/tent/stock-color-tent.webp" alt='stock color tent' layout="fill" objectFit="contain" quality={100}/>
                                    </Block>
                                    <Block position="relative" onClick={() => setActiveTabKey("1")} overrides={{Block: {props: {className: "cursor"}, style: {filter: activeTabKey === "0" ? "grayscale(1)" : "grayscale(0)"}}}}>
                                        <Image src="/images/canopy-tent/tent/custom-printing-tent.webp" alt='custom printing tent' layout="fill" objectFit="contain" quality={100}/>
                                    </Block>
                                </Block>
                                <Tabs activeKey={activeTabKey} fill={FILL.fixed} onChange={({activeKey}) => setActiveTabKey(activeKey + "")}
                                      overrides={{
                                          TabBorder: {props: {hidden: true}},
                                          TabHighlight: {
                                              props: {
                                                  className: "tab-highlight-horizon long"
                                              },
                                              style: {left: tabLeft + "px"}
                                          },
                                      }}
                                >
                                    <Tab title="Stock Color" tabRef={tabsRefs[0]}
                                         overrides={{
                                             Tab: {
                                                 props: {
                                                     className: "canopy-tent-tab"
                                                 },
                                                 style: ({$isActive}) => ({color: $isActive ? "#262626" : "#BFBFBF"}),
                                             },
                                             TabPanel: {props: {hidden: true}}
                                         }}
                                    />
                                    <Tab title="Custom Printed" tabRef={tabsRefs[1]}
                                         overrides={{
                                             Tab: {
                                                 props: {
                                                     className: "canopy-tent-tab"
                                                 },
                                                 style: ({$isActive}) => ({color: $isActive ? "#262626" : "#BFBFBF",}),
                                             },
                                             TabPanel: {props: {hidden: true}}
                                         }}
                                    />
                                </Tabs>
                            </Block>
                        </Block>
                        <>
                            {activeTabKey === "0" ? (
                                <>
                                    <Block maxWidth="1152px" margin="auto" padding={["0 16px 40px 16px", "0 16px 80px 16px", "0 16px 120px 16px"]}>
                                        <Block marginBottom={["8px", "12px", "16px"]} font={["MinXHeading24", "MinXHeading24", "MinXHeading28"]}>STOCK COLORS</Block>
                                        <Block marginBottom={["8px", "12px", "16px"]} font={["MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText">Pick a color to light up your mood.</Block>
                                        <Button width="97px" height="36px" marginRight="auto" marginBottom={["24px", "40px", "64px"]} marginLeft="auto" font="MinXParagraph14" text='Buy' bundle="primary"
                                                onClick={() => goBuyingPage({pathname: '/products/canopy-tent/buy', query: {series: "y5", size: "13x26"}})}
                                        />
                                        <Block position="relative" height={["159px", "260px", "494px"]}>
                                            <Image src="/images/canopy-tent/tent/fabric-stock-color.webp" alt="fabric stock color" layout="fill" objectFit="contain"/>
                                        </Block>
                                        <Block display="grid" gridTemplateColumns={["1fe", "1fr", "repeat(2, 1fr)"]} gridTemplateRows={["auto auto", "auto auto", "auto"]} backgroundColor="white"
                                               overrides={{Block: {props: {className: "section-round-corner-s"}}}}
                                        >
                                            <Block position="relative" width="100%" height={["160px", "216px", "348px"]}>
                                                <Image src="/images/canopy-tent/tent/fabric.webp" alt="fabric for stock color tent" layout="fill" objectFit="cover"/>
                                            </Block>
                                            <Block display="grid" gridRowGap="12px" padding={["16px", "24px", "32px"]} overrides={{Block: {style: {textAlign: "left"}}}}>
                                                <Block font="MinXParagraph20">Fabric for stock color tent</Block>
                                                <Block display="flex" flexDirection="row" flexWrap="wrap" overrides={{Block: {style: {gap: "12px"}}}}>
                                                    <Tag text="Polyester"/><Tag text="500D"/><Tag text="320gsm"/><Tag text="PVC Coated"/>
                                                </Block>
                                                <Block font="MinXParagraph16" color="MinXSecondaryText">
                                                    Your comfort and safety is our first priority. The fabric Westshade uses for plain canopy tent is 500D, 320gsm, PVC coated polyester. It’s water-resistant, fading resistant, fire
                                                    resistant,
                                                    and it provides UV protection.
                                                </Block>
                                            </Block>
                                        </Block>
                                    </Block>
                                    <Block maxWidth="1152px" margin="auto" padding={["0 16px 40px 16px", "0 16px 80px 16px", "0 16px 120px 16px"]}>
                                        <Block marginBottom={["8px", "12px", "16px"]} font={["MinXHeading24", "MinXHeading24", "MinXHeading28"]}>FRAME</Block>
                                        <Block marginBottom={["24px", "40px", "64px"]} font={["MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText">
                                            Westshade provides 1 frame option to meet your unique needs.
                                        </Block>
                                        <CardTabs title="" tabList={frame} imageMinHeight={["200px", "310px", "600px"]} objectFit="contain" tabType="button"
                                            // linkText="-> Compare frames"
                                                  containerProps={{gridColumnGap: "20px"}}
                                                  containerStyles={{textAlign: "left"}}
                                                  containerImageProps={{padding: ["22px 14px", "30px 24px", "40px 32px"], backgroundColor: "white", overrides: {Block: {props: {className: "card-radius-right"}}}}}
                                                  containerTabsProps={{display: "flex", flexDirection: "column", backgroundColor: "white", overrides: {Block: {props: {className: "card-radius-left"}}}}}
                                                  carouselProps={{
                                                      showIndicators: false,
                                                      renderArrowPrev: () => {
                                                      },
                                                      renderArrowNext: () => {
                                                      }
                                                  }}
                                        />
                                    </Block>
                                </>
                            ) : (
                                <>
                                    <Block maxWidth="1152px" margin="auto" padding={["0 16px 40px 16px", "0 16px 80px 16px", "0 16px 120px 16px"]}>
                                        <Block marginBottom={["8px", "12px", "16px"]} font={["MinXHeading24", "MinXHeading24", "MinXHeading28"]}>CUSTOM PRINTING</Block>
                                        <Block marginBottom={["8px", "12px", "16px"]} font={["MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText">
                                            You can get an extensive selection of custom branding solutions for events and businesses of all sizes.
                                        </Block>
                                        <Button width="97px" height="36px" marginRight="auto" marginBottom={["24px", "40px", "64px"]} marginLeft="auto" font="MinXParagraph14" text='Buy' bundle="primary"
                                                onClick={() => {
                                                }}
                                        />
                                        <Block display="grid" gridRowGap="20px" overrides={{Block: {style: {textAlign: "left"}}}}>
                                            <Block display="grid" gridColumnGap="20px" gridRowGap="20px" gridTemplateAreas={[`"a" "b" "c"`, `"a" "b" "c"`, `"a a" "b c"`]}>
                                                <Block gridArea="a" position="relative" height={["234px", "234px", "600px"]} overrides={{Block: {props: {className: "section-round-corner-s"}}}}>
                                                    <ReactPlayer width="100%" height="100%" url='https://www.youtube.com/watch?v=ud5m8ET8sE8&ab_channel=Westshade'/>
                                                </Block>
                                                <Block gridArea="b" backgroundColor="white" overrides={{Block: {props: {className: "section-round-corner-s"}}}}>
                                                    <Block padding={["24px 16px", "24px", "40px"]}>
                                                        <Block marginBottom={["10px", "10px", "16px"]} font="MinXParagraph20">Fabric for custom printed tent</Block>
                                                        <Block marginBottom={["15px", "15px", "21px"]} font="MinXParagraph16" color="MinXSecondaryText">We adopt 600D, 360 gsm, PU coated polyester fabric for custom printed canopy tent. It’s
                                                            light but strong. </Block>
                                                        <Block font="MinXParagraph14" color="#23A4AD"><Link href="/custom-printing">Learn more about custom printing &gt;</Link></Block>
                                                    </Block>
                                                    <Block position="relative" height={["270px", "300px", "380px"]} backgroundColor="#E5E7E9">
                                                        <Image src="/images/canopy-tent/tent/600D-polyester.webp" alt="600D polyester" layout="fill" objectFit="contain"/>
                                                    </Block>
                                                </Block>
                                                <Block gridArea="c" backgroundColor="white" overrides={{Block: {props: {className: "section-round-corner-s"}}}}>
                                                    <Block padding={["24px 16px", "24px", "40px"]}>
                                                        <Block marginBottom={["10px", "10px", "16px"]} font="MinXParagraph20">Ink for printing</Block>
                                                        <Block marginBottom={["15px", "15px", "21px"]} font="MinXParagraph16" color="MinXSecondaryText">We use ink imported from Korea for dye sublimation printing and use ink imported from
                                                            Japan for UV
                                                            printing.</Block>
                                                        <Block font="MinXParagraph14" color="#23A4AD"><Link href="/custom-printing">Learn more about custom printing &gt;</Link></Block>
                                                    </Block>
                                                    <Block position="relative" height={["270px", "300px", "380px"]} backgroundColor="#E5E7E9">
                                                        <Image src="/images/canopy-tent/tent/imported-from-korea.webp" alt="imported from korea" layout="fill" objectFit="contain"/>
                                                    </Block>
                                                </Block>
                                            </Block>
                                            <CardTabs title="Select a printing technology" tabList={printing_technology} imageMinHeight={["200px", "310px", "600px"]} objectFit="contain" tabType="button"
                                                      linkText="-> Compare printing technology"
                                                      containerProps={{gridColumnGap: "20px"}}
                                                      containerImageProps={{padding: ["22px 14px", "30px 24px", "40px 32px"], backgroundColor: "#243233", overrides: {Block: {props: {className: "card-radius-right"}}}}}
                                                      containerTabsProps={{display: "flex", flexDirection: "column", backgroundColor: "white", overrides: {Block: {props: {className: "card-radius-left"}}}}}
                                                      carouselProps={{
                                                          showIndicators: false,
                                                          renderArrowPrev: () => {
                                                          },
                                                          renderArrowNext: () => {
                                                          }
                                                      }}
                                            />
                                        </Block>
                                    </Block>
                                </>
                            )}
                        </>
                        <Block maxWidth="1152px" marginRight="auto" marginLeft="auto" paddingRight="16px" paddingBottom={["40px", "80px", "120px"]} paddingLeft="16px">
                            <Block marginBottom={["8px", "12px", "16px"]} font={["MinXHeading24", "MinXHeading24", "MinXHeading28"]}>MORE VIDEO</Block>
                            <Block marginBottom={["24px", "40px", "64px"]} font={["MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText">
                                We want to help you find the right canopy and make your use of the canopy easy.
                            </Block>
                            <Block display="grid" gridGap="20px" gridTemplateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} overrides={{Block: {style: {textAlign: "left"}}}}>
                                <Block padding={["16px", "32px", "40px"]} backgroundColor="white" overrides={{Block: {props: {className: "section-round-corner-s"}}}}>
                                    <Block position="relative" height={["190px", "307px", "353px"]} marginBottom={["16px", "24px", "32px"]}
                                           overrides={{Block: {props: {className: "section-round-corner"}}}}>
                                        <ReactPlayer width="100%" height="100%" url='https://www.youtube.com/watch?v=YGX1N5997iY&ab_channel=Westshade'/>
                                    </Block>
                                    <Block marginBottom="12px" font="MinXParagraph20">Open up the canopy</Block>
                                    <Block font="MinXParagraph16" color="MinXSecondaryText">Two people can set up the tent easily by following up this instruction video. No extra tools needed.</Block>
                                </Block>
                                <Block padding={["16px", "32px", "40px"]} backgroundColor="white" overrides={{Block: {props: {className: "section-round-corner-s"}}}}>
                                    <Block position="relative" height={["190px", "307px", "353px"]} marginBottom={["16px", "24px", "32px"]}
                                           overrides={{Block: {props: {className: "section-round-corner"}}}}>
                                        <ReactPlayer width="100%" height="100%" url='https://www.youtube.com/watch?v=hYmRbcDzLRw&ab_channel=Westshade'/>
                                    </Block>
                                    <Block marginBottom="12px" font="MinXParagraph20">Tent introduction</Block>
                                    <Block font="MinXParagraph16" color="MinXSecondaryText">In this video, we introduce you to the process of making each part of Westshade&apos;s canopy tent.</Block>
                                </Block>
                            </Block>
                        </Block>
                    </>
                ) : null}
            </Block>
            <Modal type="alertdialog" isOpen={frameCompareOpen} onClose={() => setFrameCompareOpen(false)} content="frame"/>
            <Modal type="alertdialog" isOpen={technologyCompareOpen} onClose={() => setTechnologyCompareOpen(false)} content="technique" dialogStyles={{transform: "translateY(0) !important"}}/>
        </React.Fragment>
    );
}

Canopy_Tent.getInitialProps = async () => {
    return {
        fullPage: true
    };
};

export default withRouter(Canopy_Tent);

