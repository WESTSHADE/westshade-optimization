import React from "react";

import {Block} from "baseui/block";

import Sandwich from "../../sandwich";

const Benefit = () => {
    return (
        <Block display="flex" backgroundColor="MinXPrimaryText" alignItems="center" paddingTop={["42px", "56px", "122px"]} paddingBottom={["42px", "56px", "122px"]}>
            <Block width="100%" display="grid" gridTemplateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap="16px" gridRowGap="36px">
                <Sandwich src="/images/icon/icon-free-shipping.png" alt="Free Shipping" title="Free Shipping" content="Free US nationwide shipping on orders over $149*"
                          containerImageProps={{width: ["60px", "80px", "100px"], marginBottom: "24px"}} containerTextProps={{maxWidth: ["135px", "216px", "260px"]}} titleColor="MinXBackground" contentColor="MinXBackground"
                />
                <Sandwich src="/images/icon/icon-free-mockup.png" alt="Free Mockup" title="Free Mockup" content="Free mockup upon your request or after you place orders"
                          containerImageProps={{width: ["60px", "80px", "100px"], marginBottom: "24px"}} containerTextProps={{maxWidth: ["135px", "216px", "260px"]}} titleColor="MinXBackground" contentColor="MinXBackground"
                />
                <Sandwich src="/images/icon/icon-customer-service.png" alt="Customer Service" title="Customer Service" content="Our customer service is here for you to help you all the time"
                          containerImageProps={{width: ["60px", "80px", "100px"], marginBottom: "24px"}} containerTextProps={{maxWidth: ["135px", "216px", "260px"]}} titleColor="MinXBackground" contentColor="MinXBackground"
                />
            </Block>
        </Block>
    );
};

export default Benefit;
