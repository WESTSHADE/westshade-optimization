import React from "react";
import clsx from "clsx";

import {Block} from "baseui/block";

import SectionTitle from "../Title/V1"

const Section = ({containerProps, containerClassName, containerStyles, contentProps, content, ...titleProps}) => {
    return (
        <Block as="section" width="100%" display="flex" flexDirection="column" {...containerProps}
               overrides={{
                   Block: {
                       props: {
                           className: clsx(["m-body-section-wrap", "m-wrap-side", containerClassName])
                       },
                       style: {
                           ":last-child": {...containerStyles}
                       }
                   },
               }}
        >
            <SectionTitle {...titleProps}/>
            <Block {...contentProps}>{content}</Block>
        </Block>
    )
}

export default Section;
