import React from "react";

import {Tab, Tabs, FILL} from "baseui/tabs-motion";
import {Block} from "baseui/block";

import Button from "../../Button/V1";

import styles from "./tabs.module.scss";

const Tabs_Tag = ({tabList = [], activeKey = "0", onChange, linkText = ""}) => {
    return (
        <>
            {tabList.length === 1 ? (
                <Block position="relative" display="flex" flexDirection="column" justifyContent="space-between" flex={1}>
                    <Block marginBottom="140px">
                        <Block marginBottom={["10px", "10px", "16px"]} font="MinXParagraph20">{tabList[0].tabContentTitle}</Block>
                        <Block marginBottom={["15px", "15px", "21px"]} font="MinXParagraph16" color="MinXSecondaryText">{tabList[0].tabContentContent}</Block>
                        <Block marginBottom={["10px", "10px", "16px"]} font="MinXParagraph20">{tabList[0].tabContentPrice}</Block>
                        <Block font="MinXParagraph14" color="#23A4AD" onClick={tabList[0].onClickLink}
                               overrides={{
                                   Block: {
                                       props: {
                                           className: styles["link-button"]
                                       }
                                   }
                               }}
                        >{linkText}</Block>
                    </Block>
                    <Button width="100%" height="56px" font="MinXParagraph16" text='Buy now' bundle="primary" onClick={tabList[0].onClick}/>
                </Block>
            ) : tabList.length > 1 ? (
                <Tabs activeKey={activeKey} fill={FILL.fixed} activateOnFocus onChange={onChange}
                      overrides={{
                          Root: {
                              props: {
                                  className: styles["root-button"]
                              }
                          },
                          TabList: {
                              props: {
                                  className: styles["root-tabList-button"]
                              },
                          },
                          TabBorder: {
                              props: {
                                  hidden: true
                              },
                              style: {
                                  display: "none"
                              }
                          },
                          TabHighlight: {
                              props: {
                                  hidden: true
                              },
                              style: {
                                  display: "none"
                              }
                          },
                      }}
                >
                    {tabList.map((item, index) =>
                        <Tab key={index} title={item.tabTitle}
                             overrides={{
                                 Tab: {
                                     props: {
                                         className: styles["root-tab-button"]
                                     },
                                     style: ({$isActive}) => ({
                                         borderColor: $isActive ? "#23A4AD" : "#D0D9D9",
                                     }),
                                 },
                                 TabPanel: {
                                     props: {
                                         className: styles["root-tabPanel-button"]
                                     },
                                 },
                             }}
                        >
                            <Block marginBottom="140px">
                                <Block marginBottom={["10px", "10px", "16px"]} font="MinXParagraph20">{item.tabContentTitle}</Block>
                                <Block marginBottom={["15px", "15px", "21px"]} font="MinXParagraph16" color="MinXSecondaryText">{item.tabContentContent}</Block>
                                <Block marginBottom={["10px", "10px", "16px"]} font="MinXParagraph20">{item.tabContentPrice}</Block>
                                <Block className={styles["link-button"]} font="MinXParagraph14" color="#23A4AD" onClick={item.onClickLink}>{linkText}</Block>
                            </Block>
                            <Button width="100%" height="56px" font="MinXParagraph16" text='Buy now' bundle="primary" position="fixed" bottom={0} onClick={item.onClick}/>
                        </Tab>
                    )}
                </Tabs>
            ) : null}
        </>
    )
}

export default Tabs_Tag;
