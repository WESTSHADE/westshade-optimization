import React from "react";

import {Block} from "baseui/block";

import Sandwich from "../../sandwich";
import { useStyletron } from "baseui";

const Benefit = ({containerClassName}) => {
    const [css] = useStyletron()
    
    return (
        <Block maxWidth="1312px" width="100%" display="flex" backgroundColor="#F7F7F7" alignItems="center" paddingTop={["42px", "56px", "96px"]} paddingBottom={["42px", "56px", "96px"]}
               overrides={{
                   Block: {
                       props: {
                           className: containerClassName
                       },
                   },
               }}
        >
            <Block width="100%" display="grid" gridTemplateColumns={["repeat(1, 1fr)", null, "repeat(3, 1fr)"]} gridColumnGap="16px" gridRowGap="36px">
                <Sandwich src="/images/icon/icon-free-shipping-v2.png" alt="Free Shipping" title="Free Shipping" content="We offer free shipping on all custom printing orders."
                          containerImageProps={{width: ["60px", "80px", "100px"], marginBottom: "24px"}} containerTextProps={{maxWidth: ["135px", "216px", "260px"]}} titleColor="MinXTitle"
                          contentColor="#8c8c8c"
                          titleProps={{className:css({fontSize: "16px !important", lineHeight: "16px"})}}
                          contentProps={{className:css({fontSize: "16px !important", lineHeight: "20px", "@media screen and (min-width: 673px)":{lineHeight: "24px"}})}}
                />
                <Sandwich src="/images/icon/icon-free-mockup-v2.png"alt="Free Mockup" title="Professional designs" content="We provide professional designs for any occasions."
                          containerImageProps={{width: ["60px", "80px", "100px"], marginBottom: "24px"}} containerTextProps={{maxWidth: ["135px", "216px", "260px"]}} titleColor="MinXTitle"
                          contentColor="#8c8c8c"
                          titleProps={{className:css({fontSize: "16px !important", lineHeight: "16px"})}}
                          contentProps={{className:css({fontSize: "16px !important", lineHeight: "20px", "@media screen and (min-width: 673px)":{lineHeight: "24px"}})}}
                />
                <Sandwich src="/images/icon/icon-customer-service-v2.png" alt="Customer Service" title="Customer Service" content="We are always happy to help you with any questions."
                          containerImageProps={{width: ["60px", "80px", "100px"], marginBottom: "24px"}} containerTextProps={{maxWidth: ["135px", "216px", "260px"]}} titleColor="MinXTitle"
                          contentColor="#8c8c8c"
                          titleProps={{className:css({fontSize: "16px !important", lineHeight: "16px"})}}
                          contentProps={{className:css({fontSize: "16px !important", lineHeight: "20px", "@media screen and (min-width: 673px)":{lineHeight: "24px"}})}}
                />
            </Block>
        </Block>
    );
};

export default Benefit;
