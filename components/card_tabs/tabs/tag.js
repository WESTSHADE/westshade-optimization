import React from "react";

import {Tab, Tabs} from "baseui/tabs-motion";
import {Block} from "baseui/block";

import styles from "./tabs.module.scss";

const Tabs_Tag = ({tabList = [], activeKey = "0", onChange}) => {
    return (
        <Tabs activeKey={activeKey} activateOnFocus onChange={onChange}
              overrides={{
                  TabList: {
                      props: {
                          className: styles["root-tabList-tag"]
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
            {tabList.length > 0 && tabList.map((item, index) =>
                <Tab key={index} title={item.tabTitle}
                     overrides={{
                         Tab: {
                             props: {
                                 className: styles["root-tab-tag"]
                             },
                             style: ({$isActive}) => ({
                                 background: $isActive ? "#23A4AD" : "#F0F0F0",
                                 color: $isActive ? "white" : "#8C8C8C",
                                 ":hover": {background: $isActive ? "#5FBDBE" : "#F0F0F0"},
                             }),
                         },
                         TabPanel: {
                             props: {
                                 className: styles["root-tabPanel-tag"]
                             },
                         },
                     }}
                >
                    <Block font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText">{item.tabContent}</Block>
                </Tab>
            )}
        </Tabs>
    )
}

export default Tabs_Tag;
