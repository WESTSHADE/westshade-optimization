import React from "react";

import {Block} from "baseui/block";
import {Button, KIND, SHAPE} from "baseui/button";
import {Input} from 'baseui/input';
import {ArrowRight} from 'baseui/icon';

import styles from "./parts.module.scss";

const Subscription = (props) => {
    return (
        <Block padding="0 16px" font="MinXParagraph14" color="MinXSecondaryText" {...props}>
            <Block display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} marginBottom={["8px", "12px", "24px"]}>
                <Input placeholder="Set special offers and private sales"
                       endEnhancer={() => (
                           <Block width={["40px", "40px", "60px"]} height={["28px", "28px", "32px"]}>
                               <Button kind={KIND.minimal} shape={SHAPE.pill} overrides={{
                                   BaseButton: {
                                       props: {
                                           className: styles["subscription-button"]
                                       },
                                   },
                               }}>
                                   <ArrowRight size={"24px"}/>
                               </Button>
                           </Block>
                       )}
                       overrides={{
                           Root: {
                               props: {
                                   className: styles["subscription-input-container"]
                               },
                           },
                       }}
                />

            </Block>
            By signing up you are agreeing to the Westshade Terms of Service and Privacy Policy. You may unsubscribe at any time.
        </Block>
    )
}

export default Subscription;
