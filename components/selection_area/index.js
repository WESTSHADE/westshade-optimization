import React from "react";
import clsx from "clsx";

import {Block} from "baseui/block";

import styles from "./area.module.scss";

const selection_area = (props) => {
    const {containerClassName = "", containerStyle, title, titleStyle, children} = props;

    return (
        <Block width="100%" display="grid" gridTemplateColumns="1fr" gridRowGap="8px" alignItems="center" marginTop="24px"
               overrides={{
                   Block: {
                       props: {
                           className: clsx(styles["container"], ...containerClassName)
                       },
                       style: {
                           ...containerStyle
                       }
                   }
               }}
        >
            <Block font="MinXLabel14" color="MinXPrimaryText" $style={{fontWeight: "600 !important", lineHeight: "1 !important", ...titleStyle}}>{title}</Block>
            {children}
        </Block>
    )
}

export default selection_area;
