import React, {useState} from "react";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import clsx from "clsx";

import Image from "next/image";

import {Block} from "baseui/block";
import {Button, KIND, SHAPE} from "baseui/button";
import {ChevronLeft, ChevronRight} from "baseui/icon";

import {Button as TabsB, Tag as TabsT} from "./tabs"

import styles from "./card.module.scss";

const CardTabs = ({title = "", tabList = [], reverse = false, imageMinHeight = ["200px", "226px", "380px"], objectFit = "cover", tabType = "tag", linkText, containerProps, containerStyles, containerImageProps, containerTabsProps, carouselProps}) => {
    const [tabActiveKey, setTabActiveKey] = useState(0);

    return (
        <Block display="grid" gridTemplateColumns={reverse ? ["1fr", "1fr", "2fr 3fr"] : ["1fr", "1fr", "3fr 2fr"]} gridTemplateAreas={reverse ? [`"a" "b"`, `"a" "b"`, `"b a"`] : [`"a" "b"`, `"a" "b"`, `"a b"`]}
               backgroundColor="MinXBackground"
               overrides={{
                   Block: {
                       props: {
                           className: styles["container"]
                       },
                       style: {...containerStyles}
                   }
               }}
               {...containerProps}
        >
            <Block gridArea="a" {...containerImageProps}>
                <Carousel selectedItem={tabActiveKey} autoPlay={false} showStatus={false} showThumbs={false} showArrows={false} emulateTouch dynamicHeight infiniteLoop={tabList.length > 1}
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
                          {...carouselProps}
                >
                    {tabList.length > 0 && tabList.map((item, index) =>
                        <Block key={index} position="relative" width="100%" height="auto" minHeight={imageMinHeight}>
                            <Image src={item.url} alt="feature" layout="fill" objectFit={item.objectFit}/>
                        </Block>
                    )}
                </Carousel>
            </Block>
            <Block gridArea="b" padding={["16px", "16px", "32px 40px"]} {...containerTabsProps}>
                {tabType === "tag" ? (
                    <>
                        <Block marginBottom="12px" font="MinXHeading20">{title}</Block>
                        <TabsT activeKey={tabActiveKey + ""} onChange={({activeKey}) => setTabActiveKey(parseInt(activeKey + "", 0))} tabList={tabList}/>
                    </>
                ) : tabType === "button" ? (
                    <>
                        <Block marginBottom={["15px", "15px", "21px"]} font="MinXParagraph16" color="MinXSecondaryText">{title}</Block>
                        <TabsB activeKey={tabActiveKey + ""} onChange={({activeKey}) => setTabActiveKey(parseInt(activeKey + "", 0))} tabList={tabList} linkText={linkText}/>
                    </>
                ) : null}
            </Block>
        </Block>
    )
}

export default CardTabs;
