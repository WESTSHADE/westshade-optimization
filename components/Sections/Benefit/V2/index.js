import React from "react";

import {Block} from "baseui/block";

import Sandwich from "../../Sandwich";

const Benefit = (props) => {
    return (
        <Block display="grid" width="100%" maxWidth={process.env.maxWidth + "px"} backgroundColor="#F7F7F7" gridTemplateColumns={["1fr", null, "repeat(3, 1fr)"]}
               alignItems="center" gridColumnGap="20px" gridRowGap="32px" margin="auto" padding={["32px 16px", null, "96px 20px"]} {...props}
        >
            <Sandwich src="/images/icon/icon-free-shipping-v2.png" alt="Free Shipping" title={"Free Shipping".toUpperCase()} content="We offer free shipping on all custom printing orders."
                      containerImageProps={{width: ["56px", null, "80px"], marginBottom: ["-4px", null, "12px"]}}
                      containerTextProps={{maxWidth: "250px", gridRowGap: ["8px", null, "16px"]}}
                      titleColor="MinXPrimaryText" contentColor="MinXSecondaryText"
                      titleProps={{font: "MinXLabel16"}} titleStyle={{lineHeight: "1 !important"}}
                      contentProps={{font: "MinXParagraph16"}} contentStyle={{lineHeight: "20px !important", "@media screen and (min-width: 672px)": {lineHeight: "24px !important"}}}
            />
            <Sandwich src="/images/icon/icon-free-mockup-v2.png" alt="Free Mockup" title={"Professional designs".toUpperCase()} content="We provide professional designs for any occasions."
                      containerImageProps={{width: ["56px", null, "80px"], marginBottom: ["-4px", null, "12px"]}}
                      containerTextProps={{maxWidth: "250px", gridRowGap: ["8px", null, "16px"]}}
                      titleColor="MinXPrimaryText" contentColor="MinXSecondaryText"
                      titleProps={{font: "MinXLabel16"}} titleStyle={{lineHeight: "1 !important"}}
                      contentProps={{font: "MinXParagraph16"}} contentStyle={{lineHeight: "20px !important", "@media screen and (min-width: 672px)": {lineHeight: "24px !important"}}}
            />
            <Sandwich src="/images/icon/icon-customer-service-v2.png" alt="Customer Service" title={"Customer Service".toUpperCase()} content="We are always happy to help you with any questions."
                      containerImageProps={{width: ["56px", null, "70px"], marginBottom: ["-4px", null, "12px"]}}
                      containerTextProps={{maxWidth: "250px", gridRowGap: ["8px", null, "16px"]}}
                      titleColor="MinXPrimaryText" contentColor="MinXSecondaryText"
                      titleProps={{font: "MinXLabel16"}} titleStyle={{lineHeight: "1 !important"}}
                      contentProps={{font: "MinXParagraph16"}} contentStyle={{lineHeight: "20px !important", "@media screen and (min-width: 672px)": {lineHeight: "24px !important"}}}
            />
        </Block>
    );
};

export default Benefit;
