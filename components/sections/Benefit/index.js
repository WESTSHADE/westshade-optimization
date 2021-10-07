import React from "react";

import {Block} from "baseui/block";

const BlockGrid = ({src, alt, title, content, light, titleSize}) => {
    return (
        <Block width="100%" marginTop="12px" marginBottom="12px" paddingRight="4px" paddingLeft="4px"
               overrides={{
                   Block: {
                       style: {textAlign: "center"},
                   },
               }}
        >
            <img src={src} alt={alt} className="icon-tent-size"/>
            <Block marginTop={["12px", "12px", "24px"]} font={titleSize === "large" ? ["MinXLabel16", "MinXLabel24"] : "MinXLabel12"}
                   color={light ? "MinXBackground" : "MinXSecondaryText"}
            >
                {title}
            </Block>
            {content ? (
                <Block maxWidth={light ? ["135px", "216px", "260px"] : ["184px", "184px", "280px"]} marginTop="8px" marginRight="auto" marginLeft="auto"
                       font="MinXParagraph14" color={light ? "MinXBackground" : "MinXSecondaryText"}
                >
                    {content}
                </Block>
            ) : null}
        </Block>
    );
};


const benefit = () => {
    return (
        <Block height={["462px", "504px", "476px"]} paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]} backgroundColor="MinXPrimaryText"
               overrides={{
                   Block: {
                       props: {
                           className: "container-display"
                       },
                   },
               }}
        >
            <Block display="grid" justifyContent="space-between" alignItems="center" width="100%" height="100%" margin="auto"
                   gridTemplateColumns={["repeat(2, 50%)", "repeat(2, 50%)", "repeat(3, 33%)"]} gridTemplateRows={["repeat(2, 50%)", "repeat(2, 50%)", "repeat(1, 100%)"]}
            >
                <BlockGrid src="/images/icon/icon-free-shipping.png" alt="Free Shipping" title="Free Shipping"
                           content="Free US nationwide shipping on orders over $149*" light titleSize="large"/>
                <BlockGrid src="/images/icon/icon-free-mockup.png" alt="Free Mockup" title="Free Mockup"
                           content="Free mockup upon your request or after you place orders" light titleSize="large"/>
                <BlockGrid src="/images/icon/icon-customer-service.png" alt="Customer Service" title="Customer Service"
                           content="Our customer service is here for you to help you all the time" light titleSize="large"/>
            </Block>
        </Block>
    );
};

export default benefit;
