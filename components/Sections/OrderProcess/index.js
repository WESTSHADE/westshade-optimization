import React from "react";

import {Block} from "baseui/block";

import Sandwich from "../../sandwich";

const OrderProcess = ({}) => {
    return (
        <Block width="100%" display="grid" gridTemplateColumns={["1fr", null, "repeat(2, 1fr)", "repeat(4, 1fr)"]} gridColumnGap={["16px", null, null, '80px']} gridRowGap={["26px", "18px", '40px']} justifyItems="center">
            <Sandwich src="/images/icon/icon-order-online.png" alt="Order Online" title="1. Order Online" content="Upload images and information and place an order online."
                      containerImageProps={{width: ["114px", null, null, "170px"]}} titleProps={{font: ["MinXLabel20", "MinXLabel20", "MinXLabel20", "MinXLabel24"]}}
            />
            <Sandwich src="/images/icon/icon-get-free-mockup.png" alt="Get Free Mockup" title="2. Get Free Mockup" content="After you place your order, we’ll send a free mockup to your email."
                      containerImageProps={{width: ["114px", null, null, "170px"]}} titleProps={{font: ["MinXLabel20", "MinXLabel20", "MinXLabel20", "MinXLabel24"]}}
            />
            <Sandwich src="/images/icon/icon-confirm-mockup.png" alt="Confirm Mockup" title="3. Confirm Mockup" content="Let us know how do you like it and changes you’d like to make."
                      containerImageProps={{width: ["114px", null, null, "170px"]}} titleProps={{font: ["MinXLabel20", "MinXLabel20", "MinXLabel20", "MinXLabel24"]}}
            />
            <Sandwich src="/images/icon/icon-print-ship.png" alt="Print & Ship" title="4. Print & Ship" content="We’ll print it when you are satisfied with the design and ship it to you."
                      containerImageProps={{width: ["114px", null, null, "170px"]}} titleProps={{font: ["MinXLabel20", "MinXLabel20", "MinXLabel20", "MinXLabel24"]}}
            />
        </Block>
    )
}

export default OrderProcess;
