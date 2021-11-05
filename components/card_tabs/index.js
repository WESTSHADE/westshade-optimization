import React, {useState} from "react";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import clsx from "clsx";

import Image from "next/image";

import {Block} from "baseui/block";
import {Button, KIND, SHAPE} from "baseui/button";
import {Tab, Tabs} from "baseui/tabs-motion";
import {ChevronLeft, ChevronRight} from "baseui/icon";

import styles from "./card.module.scss";

const CardTabs = ({title = "", tabList = [], reverse = false, imageMinHeight = ["200px", "226px", "380px"], objectFit = "cover"}) => {
    const [tabActiveKey, setTabActiveKey] = useState(0);

    return (
        <Block display="grid" gridTemplateColumns={reverse ? ["1fr", "1fr", "2fr 3fr"] : ["1fr", "1fr", "3fr 2fr"]} gridTemplateAreas={reverse ? [`"a" "b"`, `"a" "b"`, `"b a"`] : [`"a" "b"`, `"a" "b"`, `"a b"`]}
               backgroundColor="MinXBackground"
               overrides={{
                   Block: {
                       props: {
                           className: styles["container"]
                       }
                   }
               }}
        >
            <Block gridArea="a">
                <Carousel selectedItem={tabActiveKey} autoPlay={false} showStatus={false} showThumbs={false} showArrows={false} emulateTouch dynamicHeight infiniteLoop
                          renderArrowPrev={(onClick, disabled) => (
                              <Button shape={SHAPE.circle} kind={KIND.secondary} onClick={onClick} disabled={disabled}
                                      overrides={{
                                          BaseButton: {
                                              props: {
                                                  className: clsx(styles["carousel-arrow"], styles["left"])
                                              }
                                          },
                                      }}
                              >
                                  <ChevronLeft size={28} color="white"/>
                              </Button>
                          )}
                          renderArrowNext={(onClick, disabled) => (
                              <Button shape={SHAPE.circle} kind={KIND.secondary} onClick={onClick} disabled={disabled}
                                      overrides={{
                                          BaseButton: {
                                              props: {
                                                  className: clsx(styles["carousel-arrow"], styles["right"])
                                              }
                                          },
                                      }}
                              >
                                  <ChevronRight size={28} color="white"/>
                              </Button>
                          )}
                          onChange={(index) => setTabActiveKey(index)}
                >
                    {tabList.length > 0 && tabList.map((item, index) =>
                        <Block key={index} position="relative" width="100%" height="auto" minHeight={imageMinHeight} backgroundColor="#F5FCFC">
                            <Image src={item.url} alt="feature" layout="fill" objectFit={objectFit}/>
                        </Block>
                    )}
                </Carousel>
            </Block>
            <Block gridArea="b" padding={["16px", "16px", "32px 40px"]}>
                <Block marginBottom="12px" font="MinXHeading20">{title}</Block>
                <Tabs activeKey={tabActiveKey + ""} activateOnFocus onChange={({activeKey}) => setTabActiveKey(parseInt(activeKey + "", 0))}
                      overrides={{
                          TabList: {
                              props: {
                                  className: styles["root-tabList"]
                              },
                          },
                          TabBorder: {
                              props: {
                                  hidden: true
                              }
                          },
                          TabHighlight: {
                              props: {
                                  hidden: true
                              }
                          },
                      }}
                >
                    {tabList.length > 0 && tabList.map((item, index) =>
                        <Tab key={index} title={item.tabTitle}
                             overrides={{
                                 Tab: {
                                     props: {
                                         className: styles["root-tab"]
                                     },
                                     style: ({$isActive}) => ({
                                         background: $isActive ? "#23A4AD" : "#F0F0F0",
                                         color: $isActive ? "white" : "#8C8C8C",
                                         ":hover": {background: $isActive ? "#5FBDBE" : "#F0F0F0"},
                                     }),
                                 },
                                 TabPanel: {
                                     props: {
                                         className: styles["root-tabPanel"]
                                     },
                                 },
                             }}
                        >
                            <Block font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText">{item.tabContent}</Block>
                        </Tab>
                    )}
                </Tabs>
            </Block>
        </Block>
    )
}

export default CardTabs;
