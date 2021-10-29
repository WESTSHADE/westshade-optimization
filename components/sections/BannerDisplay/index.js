import React from "react";

import Image from "next/image";

import {Block} from "baseui/block";
import ChevronRight from "baseui/icon/chevron-right";
import ArrowRight from 'baseui/icon/arrow-right'
import ArrowDown from 'baseui/icon/arrow-down'

import MButton from "../../button-n";

const banner = ({
                    refD,
                    title,
                    titleMarginBottom = ["8px", "12px", "16px"],
                    titleFont = ["MinXTitle32", "MinXTitle44", "MinXTitle64"],
                    subtitle,
                    subtitleFont = ["MinXSubtitle16", "MinXSubtitle16", 'MinXSubtitle20'],
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
                    renderButton
                }) => {
    return (
        <Block ref={refD} position="relative" justifyContent="flex-end" alignItems="flex-start" width="100%" height={containerHeight}
               marginTop={home ? ["-48px", "-48px", "-96px"] : null} marginBottom={containerMarginBottom} paddingBottom={["40px", "60px", "70px"]} paddingLeft={["24px", "40px", "calc((100% + 24px)/12)"]}
               backgroundColor={containerBackground}
               overrides={{
                   Block: {
                       props: {
                           className: home ? "container-display-home scroll-section" : containerMarginBottom ? "container-display-no-margin-bottom" : "container-display"
                       },
                       style: {
                           ...containerStyle,
                           ":not(:first-child)": {marginTop: "0px"},
                           ":last-child": {marginBottom: "0px"}
                       }
                   },
               }}
        >
            <Block position="absolute" top={0} right={0} bottom={0} left={0}
                   overrides={{
                       Block: {
                           style: {backgroundColor: backgroundColor, zIndex: "-1"}
                       },
                   }}
            >
                <Image src={url} alt={alt} layout="fill" objectFit={imageObjectFit} objectPosition={containerBackgroundPosition} quality={100}/>
            </Block>
            <Block position="absolute" bottom={["40px", "60px", "70px"]} left={["24px", "40px", "calc((100% + 24px)/12)"]}>
                <Block maxWidth={["213px", "298px"]} marginBottom={titleMarginBottom}
                       font={titleFont} color={textColor ? textColor : "MinXPrimaryTextAlt"}
                       overrides={{
                           Block: {
                               style: {lineHeight: "0.85em"}
                           },
                       }}
                >
                    {title}
                </Block>
                <Block maxWidth={["260px", "320px", "400px"]} marginBottom={["12px", "16px"]}
                       font={subtitleFont} color={subTextColor ? subTextColor : textColor ? textColor : "MinXPrimaryTextAlt"}
                       overrides={{
                           Block: {
                               style: {
                                   ":last-child": {marginBottom: "0 !important"}
                               }
                           },
                       }}
                >
                    {subtitle}
                </Block>
                {renderButton ? renderButton : (
                    <>
                        <MButton type="outline" display={arrowButton ? "block" : textButton ? "none" : ["block", "block", "block", "none"]} width="88px" height="46px"
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
                        <MButton type="outline" display={arrowButton ? "none" : textButton ? "block" : ["none", "none", "none", "block"]} width={["240px"]} height={["56px"]}
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

export default banner;
