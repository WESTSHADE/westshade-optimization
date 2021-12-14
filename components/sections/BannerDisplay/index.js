import React from "react";
import clsx from "clsx";

import {Block} from "baseui/block";
import {ChevronRight, ArrowRight} from 'baseui/icon'

import styles from "./banner.module.scss";

import Button from "../../button-n";

const Banner = ({
                    refD,
                    title,
                    titleMarginBottom = ["8px", "12px", "16px"],
                    titleFont = ["MinXTitle32", "MinXTitle44", "MinXTitle64"],
                    subtitle,
                    subtitleFont = ["MinXSubtitle16", "MinXSubtitle16", 'MinXSubtitle20'],
                    content,
                    contentFont = ["MinXSubtitle16", "MinXSubtitle16", 'MinXSubtitle20'],
                    containerStyle,
                    containerHeight = ["480px", "660px", "100vh"],
                    containerMarginBottom = ["16px", "16px", "0px"],
                    containerBackground = "rgba(0,0,0,0.2)",
                    containerBackgroundPosition = "center",
                    backgroundColor = "transparent",
                    imageObjectFit = "cover",
                    url,
                    router,
                    destination,
                    home,
                    arrowButton,
                    textButton,
                    textColor,
                    subTextColor,
                    buttonBackgroundColor,
                    buttonHoverColor,
                    buttonActiveColor,
                    renderButton,
                    containerTextPosition = "absolute"
                }) => {

    return (
        <Block ref={refD} position="relative" width="100%" height={containerHeight} marginTop={home ? ["-104px", "-120px", "-136px"] : null} marginBottom={containerMarginBottom}
               backgroundColor={containerBackground}
               overrides={{
                   Block: {
                       props: {
                           className: clsx([styles["container-display"], home ? "scroll-section" : ""])
                       },
                       style: {
                           ...containerStyle,
                           ":after": {
                               background: `url('${url}') ${backgroundColor} ${containerBackgroundPosition}/${imageObjectFit}`,
                           }
                       }
                   },
               }}
        >
            <Block position="absolute" bottom={containerTextPosition === "center" ? "unset" : ["40px", "60px", "70px"]} left={["24px", "40px", "calc((100% + 24px)/12)"]}>
                <Block maxWidth={["213px", "298px"]} marginBottom={titleMarginBottom} font={titleFont} color={textColor ? textColor : "MinXPrimaryTextAlt"} $style={{lineHeight: "0.85em !important"}}>
                    {title}
                </Block>
                <Block maxWidth={["260px", "320px", "400px"]} marginBottom={["12px", "16px"]} font={subtitleFont} color={subTextColor ? subTextColor : textColor ? textColor : "MinXPrimaryTextAlt"}
                       $style={{":last-child": {marginBottom: "0 !important"}}}
                >
                    {subtitle}
                </Block>
                {renderButton ? renderButton : (
                    <>
                        <Button type="outline" display={arrowButton ? "block" : textButton ? "none" : ["block", "block", "block", "none"]} width="88px" height="46px"
                                color="white"
                                buttonStyle={{
                                    borderColor: `${textColor ? textColor : 'white'} !important`,
                                    backgroundColor: `${buttonBackgroundColor ? buttonBackgroundColor : 'rgba(255,255,255,0.2)'} !important`,
                                    ":hover": {backgroundColor: `${buttonHoverColor ? buttonHoverColor : 'rgba(255,255,255,0.5)'} !important`},
                                    ":active": {backgroundColor: `${buttonActiveColor ? buttonActiveColor : 'rgba(255,255,255,0.8)'} !important`}
                                }}
                                iconStyle={{marginLeft: "0px"}} endEnhancer={() => <ArrowRight size={36} color={textColor ? textColor : "white"}/>}
                                onClick={() => router.push(destination)}
                        />
                        <Button type="outline" display={arrowButton ? "none" : textButton ? "block" : ["none", "none", "none", "block"]} width="240px" height="56px"
                                font="MinXLabel20" color={textColor ? textColor : "white"}
                                buttonStyle={{
                                    borderColor: `${textColor ? textColor : 'white'} !important`,
                                    backgroundColor: `${buttonBackgroundColor ? buttonBackgroundColor : 'rgba(255,255,255,0.2)'} !important`,
                                    ":hover": {backgroundColor: `${buttonHoverColor ? buttonHoverColor : 'rgba(255,255,255,0.5)'} !important`},
                                    ":active": {backgroundColor: `${buttonActiveColor ? buttonActiveColor : 'rgba(255,255,255,0.8)'} !important`}
                                }}
                                endEnhancer={() => <ChevronRight size={24} color={textColor ? textColor : "white"}/>}
                                onClick={() => router.push(destination)} text="Learn More"
                        />
                    </>
                )}
            </Block>
        </Block>
    )
}

export default Banner;
