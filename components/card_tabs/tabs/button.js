import React from "react";

import Link from "next/link";

import {Tab, Tabs, FILL} from "baseui/tabs-motion";
import {Block} from "baseui/block";

import Button from "../../button-n";

import styles from "./tabs.module.scss";

const Tabs_Tag = ({tabList = [], activeKey = "0", onChange, linkText}) => {
    return (
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
                        <Block font="MinXParagraph14" color="#23A4AD" onClick={item.onClickLink}
                               overrides={{
                                   Block: {
                                       props: {
                                           className: styles["link-button"]
                                       }
                                   }
                               }}
                        >{linkText}</Block>
                    </Block>
                    <Button type="solid" width="100%" height="56px" font="MinXParagraph16" text='Buy now' position="fixed" bottom={0}
                            onClick={item.onClick}
                    />
                </Tab>
            )}
        </Tabs>
    )
}

export default Tabs_Tag;
