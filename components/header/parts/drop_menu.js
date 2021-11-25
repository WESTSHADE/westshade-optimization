import React from "react";

import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";

import {Block} from "baseui/block";
import {StatefulMenu} from "baseui/menu";

import styles from "./parts.module.scss";

const Menu = ({menuList, learnMoreText = "Learn more >", learnMoreUrl = "/", picUrl, content, containerStyle}) => {
    const router = useRouter();

    const handleGoPage = (href) => router.push(href)

    return (
        <Block position="absolute" top={["120px", "136px" ]}right={0} left={0} minHeight="250px" backgroundColor="white"
               display="grid" gridTemplateColumns={"repeat(" + (menuList.length + 1) + ", max-content)"} gridColumnGap="80px" justifyContent="center"
               overrides={{
                   Block: {
                       props: {
                           className: styles["drop-menu-container"]
                       },
                       style: {...containerStyle}
                   },
               }}
        >
            {menuList.map((menu, index) => (
                <div key={index} className={styles["menu-list-container"]}>
                    <StatefulMenu items={menu}
                                  onItemSelect={(e) => handleGoPage(e.item.href)}
                                  overrides={{
                                      List: {
                                          props: {
                                              className: styles["list"]
                                          },
                                      },
                                      OptgroupHeader: {
                                          props: {
                                              className: styles["list-header"]
                                          },
                                      },
                                      Option: {
                                          props: {
                                              className: styles["list-item"],
                                              getItemLabel: item => item.id,
                                          },
                                      },
                                  }}
                    />
                    {index + 1 === menuList.length ? (
                        <Block paddingTop="24px" paddingLeft="8px" font="MinXLabel14">
                            <Link href={learnMoreUrl}>{learnMoreText}</Link>
                        </Block>
                    ) : null}
                </div>
            ))}
            <Block paddingTop="34px">
                <Block position="relative" width="220px" height="138px" marginBottom="16px">
                    <Image src={picUrl} alt="Menu Display" layout="fill" objectFit="cover" quality={100}/>
                </Block>
                <div style={{textTransform: "uppercase"}}>{content}</div>
            </Block>
        </Block>
    )
}

export default Menu;
