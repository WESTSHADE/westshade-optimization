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
                    alt = "",
                    router,
                    destination,
                    showScrollDown,
                    onClickScrollDown,
                    home,
                    arrowButton,
                    textButton,
                    textColor,
                    subTextColor,
                    buttonBackgroundColor,
                    buttonHoverColor,
                    buttonActiveColor,
                    renderButton,
                }) => {

    return (
        <Block ref={refD} position="relative" width="100%" height={containerHeight} marginTop={home ? ["-104px", "-120px", "-136px"] : null} marginBottom={containerMarginBottom} display="flex" justifyContent="flex-end" alignItems="flex-start"
               backgroundColor={containerBackground}
               overrides={{
                   Block: {
                       props: {
                           className: clsx([styles["container-display"], home ? "scroll-section" : ""])
                       },
                       style: {
                           ...containerStyle,
                           ":after": {
                               background: `url('${url}') ${containerBackgroundPosition}/${imageObjectFit}`,
                           }
                       }
                   },
               }}
        >
            <Block position="absolute" bottom={["40px", "60px", "70px"]} left={["24px", "40px", "calc((100% + 24px)/12)"]}>
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
                                color="MinXPrimaryTextAlt"
                                buttonStyle={{
                                    borderColor: `${textColor ? textColor : 'white'} !important`,
                                    backgroundColor: `${buttonBackgroundColor ? buttonBackgroundColor : 'rgba(255,255,255,0.2)'} !important`,
                                    ":hover": {backgroundColor: `${buttonHoverColor ? buttonHoverColor : 'rgba(255,255,255,0.5)'} !important`},
                                    ":active": {backgroundColor: `${buttonActiveColor ? buttonActiveColor : 'rgba(255,255,255,0.8)'} !important`}
                                }}
                                iconStyle={{marginLeft: "0px"}} endEnhancer={() => <ArrowRight size={36} color={textColor ? textColor : "white"}/>}
                                onClick={() => router.push(destination)}
                        />
                        <Button type="outline" display={arrowButton ? "none" : textButton ? "block" : ["none", "none", "none", "block"]} width={["240px"]} height={["56px"]}
                                font="MinXLabel20" color={textColor ? textColor : "MinXPrimaryTextAlt"}
                                buttonStyle={{
                                    borderColor: `${textColor ? textColor : 'white'} !important`,
                                    backgroundColor: `${buttonBackgroundColor ? buttonBackgroundColor : 'rgba(255,255,255,0.2)'} !important`,
                                    ":hover": {backgroundColor: `${buttonHoverColor ? buttonHoverColor : 'rgba(255,255,255,0.5)'} !important`},
                                    ":active": {backgroundColor: `${buttonActiveColor ? buttonActiveColor : 'rgba(255,255,255,0.8)'} !important`}
                                }}
                                endEnhancer={() => <ChevronRight size={24} color={textColor ? textColor : "white"}/>}
                                onClick={() => router.push(destination)} text={"Learn More"}
                        />
                    </>
                )}
            </Block>
            {/*TODO: 滚轮下滑和button点击下滑不兼容, 未找到解决办法*/}
            {/*<Block display={["none", "none", "none", showScrollDown ? "block" : "none"]} position="absolute" right="0px" bottom="70px" left="0px" width="48px" height="56px"*/}
            {/*       margin="auto" font="MinXLabel20"*/}
            {/*>*/}
            {/*    <Button shape={SHAPE.pill}*/}
            {/*            overrides={{*/}
            {/*                BaseButton: {*/}
            {/*                    style: {*/}
            {/*                        width: "100%",*/}
            {/*                        height: "100%",*/}
            {/*                        fontSize: "inherit",*/}
            {/*                        fontWeight: "inherit",*/}
            {/*                        lineHeight: "inherit",*/}
            {/*                        borderTopWidth: "1px",*/}
            {/*                        borderRightWidth: "1px",*/}
            {/*                        borderBottomWidth: "1px",*/}
            {/*                        borderLeftWidth: "1px",*/}
            {/*                        borderTopStyle: "solid",*/}
            {/*                        borderRightStyle: "solid",*/}
            {/*                        borderBottomStyle: "solid",*/}
            {/*                        borderLeftStyle: "solid",*/}
            {/*                        borderTopColor: "white",*/}
            {/*                        borderRightColor: "white",*/}
            {/*                        borderBottomColor: "white",*/}
            {/*                        borderLeftColor: "white",*/}
            {/*                        backgroundColor: "transparent",*/}
            {/*                        ":hover": {backgroundColor: 'rgba(255,255,255,0.5)'},*/}
            {/*                        ":active": {backgroundColor: 'rgba(255,255,255,0.8)'},*/}
            {/*                    },*/}
            {/*                },*/}
            {/*                EndEnhancer: {*/}
            {/*                    style: {marginLeft: "0px"}*/}
            {/*                }*/}
            {/*            }}*/}
            {/*            endEnhancer={() => <ArrowDown size={36}/>}*/}
            {/*            onClick={() => onClickScrollDown()}*/}
            {/*    />*/}
            {/*</Block>*/}
        </Block>
    )
}

export default Banner;
