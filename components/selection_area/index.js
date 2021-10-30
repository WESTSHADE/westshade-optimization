import React from "react";
import clsx from "clsx";

import {Block} from "baseui/block";

import styles from "./area.module.scss";

const selection_area = (props) => {
    const {containerClassName = "", containerStyle, title, children} = props;

    return (
        <Block width="100%" display="grid" gridTemplateColumns="1fr" gridRowGap="16px" alignItems="center" marginTop="32px"
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
            <Block font={"MinXLabel16"} color="MinXPrimaryText">{title}</Block>
            {children}
        </Block>
    )
}

export default selection_area;
