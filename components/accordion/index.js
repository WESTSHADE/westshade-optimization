import React from "react";

import {Block} from "baseui/block";
import {Accordion, Panel} from "baseui/accordion";

import styles from "./accordion.module.scss";

export default function Custom_Accordion(props) {
    const {list, ...restProps} = props;

    return (
        <Block width="100%" marginRight="auto" marginLeft="auto" font="MinXHeading14" color="MinXPrimaryText" {...restProps}>
            <Accordion overrides={{
                Root: {
                    props: {
                        className: styles["container"]
                    },
                },
                Header: {
                    props: {
                        className: styles["header"]
                    },
                },
                Content: {
                    props: {
                        className: styles["panel"]
                    },
                }
            }}>
                {list.map((item, index) =>
                    <Panel key={index} title={item.title}>{item.content}</Panel>)
                }
            </Accordion>
        </Block>
    )
}
