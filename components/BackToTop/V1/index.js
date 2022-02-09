import React, {useEffect, useState} from "react";

import Image from "next/image";

import {AspectRatioBox, AspectRatioBoxBody} from "baseui/aspect-ratio-box";

import Button from "Components/Button";

const BackToTop = () => {
    const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
    const [isCheckoutDisplay, setIsCheckoutDisplay] = useState(false);

    const listenToScroll = () => {
        let heightToHideFrom = 50;
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

        if (winScroll > heightToHideFrom) {
            !isCheckoutVisible && setIsCheckoutVisible(true);
        } else {
            setIsCheckoutVisible(false);
        }
    };

    const backToTpo = () => window && window.scrollTo({top: 0, behavior: 'smooth'});

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);

        return () => window.removeEventListener("scroll", listenToScroll);
    }, []);

    useEffect(() => {
        if (isCheckoutVisible) {
            !isCheckoutDisplay && setIsCheckoutDisplay(true);
        } else {
            setTimeout(() => setIsCheckoutDisplay(false), 300)
        }
    }, [isCheckoutVisible]);

    if (isCheckoutDisplay) {
        return (
            <Button.V1 shape="circle" position="fixed" right="24px" bottom="100px" width="48px" height="48px" buttonBackgroundColor="#262626" buttonHoverBackgroundColor="rgba(38,38,38,0.8)"
                       buttonStyle={{paddingLeft: 0, paddingRight: 0, opacity: isCheckoutVisible ? 1 : 0, transition: "all 300ms linear"}} $style={{zIndex: 9}}
                       onClick={() => backToTpo()}
            >
                <AspectRatioBox aspectRatio={1} width="50%">
                    <AspectRatioBoxBody as={Image} src="/images/icon/icon-back-to-top.png" alt="icon-back-to-top" layout="fill" objectFit="contain"/>
                </AspectRatioBox>
            </Button.V1>
        )
    } else {
        return null;
    }
}

export default BackToTop;
