import React, {createRef, useEffect, useState} from "react";
import ReactPlayer from "react-player";

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import {FILL, Tab, Tabs} from "baseui/tabs-motion";

import MButton from "../components/button-n";
import {Carousel} from "react-responsive-carousel";
import {Button, KIND, SHAPE} from "baseui/button";
import {ChevronLeft, ChevronRight} from "baseui/icon";

const feature_1 = [{
    tabTitle: "Water Resistant",
    tabContent: "Our waterproof pop tents are designed to offer the ideal coverage and protection needed for all your events. It is easy to clean, maintain and is also mold resistant for longer durability, making it ideal for all weather conditions."
}, {
    tabTitle: "Fire Retardant",
    tabContent: "Our canopies are certified under the California State Fire Marshal. Each fire retardant canopy is specially treated and complies with all NFPA 701 and CPAI-84."
}, {
    tabTitle: "UV Protection",
    tabContent: "Westshade canopies provide up to 98% UV block,  the optimal UV protection for people and pets. Our unique polyester fabric allows warm air to escape, keeping you cool on hot and sunny days."
}]

const feature_2 = [{
    tabTitle: "Steel",
    tabContent: "We carry steel frames for our Y5 canopies. Steel framed canopies are heavier and typically used for patio, garden, or the deck."
}, {
    tabTitle: "Aluminum",
    tabContent: "Our Aluminum frames (Y6, Y7) are lightweight and are used for a variety of occasions such as business events, job fairs, and exhibitions."
}]

function SectionCard({gridTemplateColumns = ["1fr", "1fr", "684px 1fr"], gridTemplateAreas = [`"a" "b"`, `"a" "b"`, `"a b"`], title = "", tabPicList = [], tabList = [], objectFit = "cover"}) {
    const [iHeight, setIHeight] = useState(315);
    const [tabActiveKey, setTabActiveKey] = useState(0);

    return (
        <Block width="100%" maxWidth="1152px" marginRight="auto" marginLeft="auto"
               display="grid" gridTemplateColumns={gridTemplateColumns} gridTemplateRows={["auto auto", "auto auto", "auto"]} gridTemplateAreas={gridTemplateAreas}
               overrides={{Block: {style: {borderRadius: "16px", overflow: "hidden"}}}}
        >
            <Block gridArea="a">
                <Carousel autoPlay={false} selectedItem={tabActiveKey} showStatus={false} showThumbs={false} showArrows={false} showIndicators={true} swipeable={true} dynamicHeight={true}
                          renderArrowPrev={(onClick, disabled) => (
                              <Button shape={SHAPE.circle} kind={KIND.secondary}
                                      onClick={onClick}
                                      overrides={{
                                          BaseButton: {
                                              props: {
                                                  className: "react-image-gallery-arrow left",
                                              },
                                              style: {
                                                  fontSize: "inherit",
                                                  fontWeight: "inherit",
                                                  lineHeight: "inherit",
                                              }
                                          },
                                      }}
                                      disabled={disabled}
                              >
                                  <ChevronLeft size={28} color={"white"}/>
                              </Button>
                          )}
                          renderArrowNext={(onClick, disabled) => (
                              <Button shape={SHAPE.circle} kind={KIND.secondary}
                                      onClick={onClick}
                                      overrides={{
                                          BaseButton: {
                                              props: {
                                                  className: "react-image-gallery-arrow right",
                                              },
                                              style: {
                                                  fontSize: "inherit",
                                                  fontWeight: "inherit",
                                                  lineHeight: "inherit",
                                              }
                                          },
                                      }}
                                      disabled={disabled}
                              >
                                  <ChevronRight size={28} color={"white"}/>
                              </Button>
                          )}
                          renderItem={(item) => {
                              return (
                                  <Block position="relative" width="100%" height={["100%", "100%", iHeight + 64 + "px"]}>{item}</Block>
                              );
                          }}
                          onChange={(index) => setTabActiveKey(index)}
                >
                    {tabPicList.length > 0 && tabPicList.map((pic, index) => {
                        return (
                            <Block key={index} backgroundColor="#F5FCFC" width="100%" height="100%">
                                <Block display={["block", "block", "none"]}>
                                    <Image src={pic} alt="feature" layout="responsive" width={2500} height={1316} objectFit={objectFit}/>
                                </Block>
                                <Block display={["none", "none", "block"]}>
                                    <Image src={pic} alt="feature" layout="fill" objectFit={objectFit}/>
                                </Block>
                            </Block>
                        )
                    })}
                </Carousel>
            </Block>
            <Block gridArea="b" paddingTop={["16px", "16px", "32px"]} paddingRight={["16px", "16px", "40px"]} paddingBottom={["16px", "16px", "32px"]} paddingLeft={["16px", "16px", "40px"]} backgroundColor={"#F7F7F7"}>
                <Block ref={(r) => {
                    if (r && r.clientHeight && r.clientHeight > 315) {
                        setIHeight(r.clientHeight)
                    }
                }}>
                    <Block marginBottom="12px" font="MinXHeading20">{title}</Block>
                    <Tabs activeKey={tabActiveKey} fill={FILL.intrinsic} activateOnFocus onChange={({activeKey}) => setTabActiveKey(parseInt(activeKey))}
                          overrides={{
                              TabList: {
                                  props: {
                                      className: "hideScrollBar"
                                  },
                                  style: {
                                      flexWrap: "wrap",
                                      overflowX: "scroll",
                                  },
                              },
                              TabBorder: {props: {hidden: true}},
                              TabHighlight: {props: {hidden: true}},
                          }}
                    >
                        {tabList.map((item, index) => {
                            return (
                                <Tab key={index} title={item.tabTitle}
                                     overrides={{
                                         TabPanel: {
                                             style: {paddingTop: "12px", paddingRight: 0, paddingBottom: "12px", paddingLeft: 0},
                                         },
                                         Tab: {
                                             style: ({$isActive}) => ({
                                                 background: $isActive ? "#23A4AD" : "#F0F0F0",
                                                 color: $isActive ? "white" : "#8C8C8C",
                                                 marginRight: "12px",
                                                 marginBottom: "12px",
                                                 paddingTop: "8px",
                                                 paddingBottom: "8px",
                                                 paddingRight: "8px",
                                                 paddingLeft: "8px",
                                                 borderRadius: "4px",
                                                 ":hover": {background: $isActive ? "#5FBDBE" : "transparent"},
                                             }),
                                         },
                                     }}
                                >
                                    <Block font="MinXParagraph14">{item.tabContent}</Block>
                                </Tab>
                            )
                        })}
                    </Tabs>
                </Block>
            </Block>
        </Block>
    )
}

function Canopy_Tent({router, size}) {
    const [tabsRefs, setTabsRefs] = useState([]);
    const [displayTabs, setDisplayTabs] = useState(false);
    const [tabLeft, setTabLeft] = useState(0);

    const [activeTabKey, setActiveTabKey] = React.useState("0");

    useEffect(() => {
        setTabsRefs((tabsRefs) => Array(2).fill(null).map((_, i) => tabsRefs[i] || createRef()));
    }, []);

    useEffect(() => {
        if (tabsRefs.length > 0) setDisplayTabs(true);
    }, [tabsRefs]);

    useEffect(() => {
        if (displayTabs) {
            setTabLeft((tabsRefs[activeTabKey].current.clientWidth - 40) / 2)
        }
    }, [displayTabs]);

    return (
        <React.Fragment>
            <Head>
                <title>10x10 Canopy Tent | WESTSHADE</title>
                {/*<meta name="description" content="View frequently asked questions about our shipping and return policies, estimated delivery, damaged items, and refunds."/>*/}
            </Head>
            <>
                {displayTabs ? (
                    <Block display="flex" flexDirection="column" position="relative" alignItems="center" maxWidth="unset !important" backgroundColor="#F5FCFC"
                           paddingTop={["24px", "32px", "40px"]} paddingRight={["16px", "16px", "24px"]} paddingBottom={["24px", "32px", "40px"]} paddingLeft={["16px", "16px", "24px"]}
                           overrides={{
                               Block: {
                                   style: {textAlign: "center"}
                               },
                           }}
                    >
                        <Block marginBottom={["24px", "24px", "32px"]} font="MinXLabel32">10x10 Canopy Tent</Block>
                        <Block width="100%" maxWidth="420px" marginRight="auto" marginLeft="auto" font="MinXLabel20">
                            <Block display="flex" flexDirection="row" height="90px">
                                <Block position="relative" width="100%" onClick={() => setActiveTabKey("0")}
                                       overrides={{Block: {style: {filter: activeTabKey === "1" ? "grayscale(1)" : "grayscale(0)", ":hover": {cursor: 'pointer'}}}}}
                                >
                                    <Image src="images/canopy-tent/10x10-tent/stock-color-tent.png" alt='stock color tent' layout="fill" objectFit="contain" quality={100}/>
                                </Block>
                                <Block position="relative" width="100%" onClick={() => setActiveTabKey("1")}
                                       overrides={{Block: {style: {filter: activeTabKey === "0" ? "grayscale(1)" : "grayscale(0)", ":hover": {cursor: 'pointer'}}}}}
                                >
                                    <Image src="images/canopy-tent/10x10-tent/custom-printing-tent.png" alt='custom printing tent' layout="fill" objectFit="contain" quality={100}/>
                                </Block>
                            </Block>
                            <Tabs activeKey={activeTabKey} fill={FILL.fixed} onChange={({activeKey}) => setActiveTabKey(activeKey)}
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
                                <Tab title="Stock color" tabRef={tabsRefs[0]}
                                     overrides={{
                                         Tab: {
                                             style: ({$isActive}) => ({
                                                 background: "transparent !important",
                                                 whiteSpace: "nowrap",
                                                 fontSize: "inherit",
                                                 fontWeight: "inherit",
                                                 lineHeight: "inherit",
                                                 color: $isActive ? "#262626" : "#BFBFBF",
                                                 paddingTop: "12px",
                                                 paddingBottom: "12px",
                                                 ":hover": {background: "transparent"}
                                             }),
                                         },
                                         ArtworkContainer: {
                                             style: {backgroundColor: "red"}
                                         },
                                         TabPanel: {
                                             style: {paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0},
                                         },
                                     }}
                                />
                                <Tab title="Custom printed" tabRef={tabsRefs[1]}
                                     overrides={{
                                         Tab: {
                                             style: ({$isActive}) => ({
                                                 background: "transparent !important",
                                                 whiteSpace: "nowrap",
                                                 fontSize: "inherit",
                                                 fontWeight: "inherit",
                                                 lineHeight: "inherit",
                                                 color: $isActive ? "#262626" : "#BFBFBF",
                                                 paddingTop: "12px",
                                                 paddingBottom: "12px",
                                                 ":hover": {background: "transparent"}
                                             }),
                                         },
                                         TabPanel: {
                                             style: {paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0},
                                         },
                                     }}
                                />
                            </Tabs>
                        </Block>
                    </Block>
                ) : null}
                <Block paddingTop={["32px", "40px", "64px"]} backgroundColor="#F7F7F7">
                    {displayTabs ?
                        activeTabKey === "0" ? (
                            <>
                                <Block maxWidth={process.env.maxWidth + "px"} marginRight="auto" marginLeft="auto" paddingBottom={["24px", "40px", "64px"]} overrides={{
                                    Block: {style: {textAlign: "center"}}
                                }}>
                                    <Block marginBottom={["8px", "12px", "16px"]} font={["MinXHeading24", "MinXHeading24", "MinXHeading28"]}>STOCK COLORS</Block>
                                    <Block marginBottom={["8px", "12px", "16px"]} font={["MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText">Pick a color to light up your mood.</Block>
                                    <MButton type="solid" width="97px" height="36px" marginTop="24px" marginRight="auto" marginLeft="auto" font="MinXParagraph14" text='Buy'
                                             onClick={() => {
                                             }}
                                    />
                                </Block>
                                <Block position="relative" width="100%" maxWidth="1152px" height={["159px", "260px", "494px"]} marginRight="auto" marginLeft="auto">
                                    <Image src="images/canopy-tent/10x10-tent/fabric-stock-color.png" alt="fabric stock color" layout="fill" objectFit="contain"/>
                                </Block>
                                <Block width="100%" maxWidth={process.env.maxWidth + "px"} marginRight="auto" marginLeft="auto" paddingRight="16px" paddingLeft="16px">
                                    <Block display="grid" gridTemplateColumns={["1fe", "1fr", "repeat(2, 1fr)"]} gridTemplateRows={["auto auto", "auto auto", "auto"]} backgroundColor="white"
                                           overrides={{Block: {style: {borderRadius: "16px", overflow: "hidden"}}}}
                                    >
                                        <Block position="relative" width="100%" height={["160px", "216px", "348px"]}>
                                            <Image src="images/canopy-tent/10x10-tent/fabric.jpg" alt="fabric for stock color tent" layout="fill" objectFit="cover"/>
                                        </Block>
                                        <Block paddingTop={["16px", "24px", "32px"]} paddingRight={["16px", "24px", "32px"]} paddingBottom={["16px", "24px", "32px"]} paddingLeft={["16px", "24px", "32px"]}>
                                            <Block marginBottom="12px" font="MinXParagraph20">Fabric for stock color tent</Block>
                                            <Block display="flex" flexDirection="row" flexWrap="wrap">
                                                <Block height="32px" marginRight="12px" marginBottom="12px" paddingTop="8px" paddingRight="8px" paddingBottom="8px" paddingLeft="8px" backgroundColor="#F5FCFC" color="#5FBDBE"
                                                       overrides={{
                                                           Block: {
                                                               style: {border: "1px solid #5FBDBE"}
                                                           }
                                                       }}
                                                >
                                                    Polyester
                                                </Block>
                                                <Block height="32px" marginRight="12px" marginBottom="12px" paddingTop="8px" paddingRight="8px" paddingBottom="8px" paddingLeft="8px" backgroundColor="#F5FCFC" color="#5FBDBE"
                                                       overrides={{
                                                           Block: {
                                                               style: {border: "1px solid #5FBDBE"}
                                                           }
                                                       }}
                                                >
                                                    500D
                                                </Block>
                                                <Block height="32px" marginRight="12px" marginBottom="12px" paddingTop="8px" paddingRight="8px" paddingBottom="8px" paddingLeft="8px" backgroundColor="#F5FCFC" color="#5FBDBE"
                                                       overrides={{
                                                           Block: {
                                                               style: {border: "1px solid #5FBDBE"}
                                                           }
                                                       }}
                                                >
                                                    320gsm
                                                </Block>
                                                <Block height="32px" marginRight="12px" marginBottom="12px" paddingTop="8px" paddingRight="8px" paddingBottom="8px" paddingLeft="8px" backgroundColor="#F5FCFC" color="#5FBDBE"
                                                       overrides={{
                                                           Block: {
                                                               style: {border: "1px solid #5FBDBE"}
                                                           }
                                                       }}
                                                >
                                                    PVC Coated
                                                </Block>
                                            </Block>
                                            <Block font="MinXParagraph16" color="MinXSecondaryText">
                                                Your comfort and safety is our first priority. The fabric Westshade uses for plain canopy tent is 500D, 320gsm, PVC coated polyester. It’s water-resistant, fading resistant, fire resistant, and it
                                                provides
                                                UV
                                                protection.
                                            </Block>
                                        </Block>
                                    </Block>
                                </Block>
                            </>
                        ) : (
                            <>
                                <Block maxWidth={process.env.maxWidth + "px"} marginRight="auto" marginLeft="auto" paddingBottom={["24px", "40px", "64px"]} overrides={{
                                    Block: {style: {textAlign: "center"}}
                                }}>
                                    <Block marginBottom={["8px", "12px", "16px"]} font={["MinXHeading24", "MinXHeading24", "MinXHeading28"]}>CUSTOM PRINTING</Block>
                                    <Block marginBottom={["8px", "12px", "16px"]} font={["MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText">
                                        You can get an extensive selection of custom branding solutions for events and businesses of all sizes.
                                    </Block>
                                    <MButton type="solid" width="97px" height="36px" marginTop="24px" marginRight="auto" marginLeft="auto" font="MinXParagraph14" text='Buy'
                                             onClick={() => {
                                             }}
                                    />
                                </Block>
                                <Block width="100%" maxWidth={process.env.maxWidth + "px"} marginRight="auto" marginLeft="auto" paddingRight="16px" paddingLeft="16px">
                                    <Block position="relative" width="100%" maxWidth="1152px" height={["234px", "234px", "600px"]} marginRight="auto" marginLeft="auto" overrides={{Block: {style: {borderRadius: "16px", overflow: "hidden"}}}}>
                                        <ReactPlayer width="100%" height="100%" url='https://www.youtube.com/watch?v=ud5m8ET8sE8&ab_channel=Westshade'/>
                                    </Block>
                                </Block>
                            </>
                        ) : null}
                </Block>
            </>
        </React.Fragment>
    );
}


Canopy_Tent.getInitialProps = async () => {
    return {
        fullPage: true
    };
};

export default withRouter(Canopy_Tent);

