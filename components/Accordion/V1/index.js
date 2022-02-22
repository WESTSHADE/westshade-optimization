import React from "react";

import {Block} from "baseui/block";
import {Accordion, Panel} from "baseui/accordion";

import styles from "./accordion.module.scss";

const AccordionMX = (props) => {
    const {list, ...restProps} = props;

    return (
        <Block width="100%" marginRight="auto" marginLeft="auto" font="MinXHeading16" color="MinXPrimaryText" {...restProps}>
            <Accordion renderAll
                       overrides={{
                           Root: {
                               props: {
                                   className: styles["container"]
                               }
                           },
                           Header: {
                               props: {
                                   className: styles["header"]
                               }
                           },
                           Content: {
                               props: {
                                   className: styles["panel"]
                               }
                           }
                       }}
            >
                {list.map((item, index) => (
                    <Panel key={index} title={item.title}>
                        <Block dangerouslySetInnerHTML={{__html: item.content}}/>
                    </Panel>
                ))}
            </Accordion>
        </Block>
    )
}

export default AccordionMX;
