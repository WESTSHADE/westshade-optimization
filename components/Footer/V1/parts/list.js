import React from "react";

import Link from "next/link";

import {Block} from "baseui/block";
import {ListHeading, ListItem} from "baseui/list";

import styles from "./parts.module.scss";

const List = ({title, dataList}) => {
    return (
        <Block display="grid" gridTemplateColumns="1fr" gridRowGap="14px" minWidth={["unset", null, "142px"]} font="MinXHeading14" color="MinXPrimaryText">
            <ListHeading heading={title} maxLines={1}
                         overrides={{
                             Root: {
                                 props: {
                                     className: styles["menu-title"]
                                 }
                             }
                         }}
            />
            {dataList.map(({title, url}, index) => (
                <Block key={index} font="MinXParagraph14" color="MinXSecondaryText">
                    <ListItem sublist
                              overrides={{
                                  Content: {
                                      props: {
                                          className: styles["menu-item"]
                                      }
                                  }
                              }}
                    >
                        <Link href={url}>{title}</Link>
                    </ListItem>
                </Block>
            ))}
        </Block>
    )
}

export default List;
