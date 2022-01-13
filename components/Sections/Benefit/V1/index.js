import React from "react";

import {Block} from "baseui/block";

import Sandwich from "../../Sandwich";

const Benefit = ({containerClassName, light}) => {
    return (
        <Block className={containerClassName} display="grid" width="100%" maxWidth={process.env.maxWidth + "px"} backgroundColor={light ? "#F0F0F0" : "MinXPrimaryText"} gridTemplateColumns={["repeat(2, 1fr)", null, "repeat(3, 1fr)"]}
               alignItems="center" gridColumnGap="16px" gridRowGap="36px" margin="auto" padding={["32px 16px", null, "40px 24px", "46px 38px"]}
        >
            <Sandwich src={light ? "/images/icon/icon-free-shipping-light.png" : "/images/icon/icon-free-shipping.png"} alt="Free Shipping" title="Free Shipping" content="Free US nationwide shipping on orders over $149*"
                      containerImageProps={{width: ["60px", "80px", "100px"], marginBottom: ["20px", null, "28px"]}}
                      containerTextProps={{maxWidth: ["136px", "216px", "260px"]}}
                      titleColor={light ? "MinXTitle" : "MinXBackground"} contentColor={light ? "MinXTitle" : "MinXBackground"}
            />
            <Sandwich src={light ? "/images/icon/icon-free-mockup-light.png" : "/images/icon/icon-free-mockup.png"} alt="Free Mockup" title="Free Mockup" content="Free mockup upon your request or after you place orders"
                      containerImageProps={{width: ["60px", "80px", "100px"], marginBottom: ["20px", null, "28px"]}}
                      containerTextProps={{maxWidth: ["136px", "216px", "260px"]}}
                      titleColor={light ? "MinXTitle" : "MinXBackground"} contentColor={light ? "MinXTitle" : "MinXBackground"}
            />
            <Sandwich src={light ? "/images/icon/icon-customer-service-light.png" : "/images/icon/icon-customer-service.png"} alt="Customer Service" title="Customer Service"
                      content="Our customer service is here for you to help you all the time"
                      containerImageProps={{width: ["60px", "80px", "100px"], marginBottom: ["20px", null, "28px"]}}
                      containerTextProps={{maxWidth: ["136px", "216px", "260px"]}}
                      titleColor={light ? "MinXTitle" : "MinXBackground"} contentColor={light ? "MinXTitle" : "MinXBackground"}
            />
        </Block>
    );
};

export default Benefit;
