import React from "react";

import Link from "next/link";
import Image from "next/image";

import {Block} from "baseui/block";
import {Button, KIND, SHAPE} from "baseui/button";
import {ListHeading, ListItem} from "baseui/list";

import {Input} from 'baseui/input';
import ArrowRight from 'baseui/icon/arrow-right';

import Facebook from "./facebook.svg";
import Twitter from "./twitter.svg";
import Instagram from "./instagram.svg";
import Youtube from "./youtube.svg";
import Pinterest from "./pinterest.svg";

const NavigationList = ({head, dataList}) => {
    const NavItem = ({title, url}) => {
        return (
            <Block font="MinXLabel14" color="MinXSecondaryText">
                <ListItem
                    overrides={{
                        Root: {
                            style: {marginBottom: "17px", fontSize: "inherit", fontWeight: 400, lineHeight: "18px"},
                        },
                        Content: {
                            style: {minHeight: "unset", borderBottomWidth: "0px"}
                        }
                    }}
                >
                    <Link href={url}>{title}</Link>
                </ListItem>
            </Block>
        )
    }

    return (
        <Block minWidth={["unset", "unset", "142px"]} marginRight="20px" font="MinXHeading14" color="MinXPrimaryText">
            <ListHeading heading={head} maxLines={1}
                         overrides={{
                             Root: {
                                 style: {minHeight: "40px", marginBottom: "16px"}
                             },
                             HeadingContainer: {
                                 style: {fontSize: "inherit", fontWeight: 700, color: "inherit"},
                             },
                         }}
            />
            <ul>
                {dataList.map(({title, url}, index) => <NavItem key={index} title={title} url={url}/>)}
            </ul>
        </Block>
    )
}

const SocialMediaLink = ({social, link}) => {
    return (
        <Block position="relative" width="22px" height="22px" marginRight="22px" color="MinXSecondaryText">
            <Button kind={KIND.minimal} shape={SHAPE.circle}
                    overrides={{
                        BaseButton: {
                            style: () => ({width: "100%", height: "100%", color: "inherit"}),
                        },
                    }}
                    onClick={() => (document.location.href = link ? link : "/")}
            >
                {social === "facebook" ? (
                    <Facebook style={{width: "100%", height: "100%"}} color="inherit"/>
                ) : social === "twitter" ? (
                    <Twitter style={{width: "100%", height: "100%"}} color="inherit"/>
                ) : social === "instagram" ? (
                    <Instagram style={{width: "100%", height: "100%"}} color="inherit"/>
                ) : social === "youtube" ? (
                    <Youtube style={{width: "100%", height: "100%"}} color="inherit"/>
                ) : social === "pinterest" ? (
                    <Pinterest style={{width: "100%", height: "100%"}} color="inherit"/>
                ) : null}
            </Button>
        </Block>
    );
};

function Footer({isHomePage}) {
    return (
        <React.Fragment>
            <Block width="100%" maxWidth="1920px" marginLeft="auto" marginRight="auto" paddingTop={["32px", "32px", "70px"]} paddingRight={["16px", "16px", "24px"]}
                   paddingLeft={["16px", "16px", "24px"]}
                   overrides={{
                       Block: {
                           props: {
                               className: isHomePage ? "for-scroll" : ""
                           },
                       },
                   }}
            >
                <Block display="flex" flexDirection={["column", "column", "row"]} paddingBottom={["15px", "15px", "83ps"]}
                       overrides={{
                           Block: {
                               style: {borderBottomWidth: "1px", borderBottomStyle: "solid", borderBottomColor: "#C9D7E5"},
                           },
                       }}
                >
                    <Block minWidth={["unset", "unset", "calc((100% + 24px)/3)"]} marginBottom="32px" paddingLeft={["0px", "0px", "calc((100% + 24px)/12)"]}>
                        <Block position="relative" width={["147px", "147px", "184px"]} marginBottom={["24px", "24px", "32px"]}
                               overrides={{
                                   Block: {
                                       style: {":hover": {cursor: 'pointer'}},
                                   },
                               }}
                               onClick={() => document.location.href = "/"}
                        >
                            <Image src={"/images/icon/logo-site-dark-footer.png"} alt="Site Logo" layout="responsive" width={292} height={103}/>
                        </Block>
                    </Block>
                    <Block display="flex" flexDirection={["column", "column", "row"]} flex={1} justifyContent={["flex-start", "flex-start", "space-between"]}
                           paddingLeft={["0px", "0px", "calc((100% + 24px)/12)"]}
                    >
                        {/*<Block marginBottom={["32px", "32px", "80px", "100px"]} paddingRight={"16px"} paddingLeft={"16px"} overrides={{*/}
                        {/*    Block: {*/}
                        {/*        style: ({$theme}) => ({color: $theme.colors.MinXSecondaryText}),*/}
                        {/*    },*/}
                        {/*}}>*/}
                        {/*    <Block display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} marginBottom={["12px", "12px", "24px"]}*/}
                        {/*           paddingBottom={["4px"]} overrides={{*/}
                        {/*        Block: {*/}
                        {/*            style: () => ({borderBottom: "1px solid #262626"}),*/}
                        {/*        },*/}
                        {/*    }}>*/}
                        {/*        <Input*/}
                        {/*            placeholder="Set special offers and private sales"*/}
                        {/*            overrides={{*/}
                        {/*                Root: {*/}
                        {/*                    style: () => ({*/}
                        {/*                        borderTopColor: "transparent",*/}
                        {/*                        borderRightColor: "transparent",*/}
                        {/*                        borderBottomColor: "transparent",*/}
                        {/*                        borderLeftColor: "transparent",*/}
                        {/*                        backgroundColor: "transparent"*/}
                        {/*                    })*/}
                        {/*                },*/}
                        {/*                InputContainer: {*/}
                        {/*                    style: () => ({backgroundColor: "transparent"})*/}
                        {/*                },*/}
                        {/*                Input: {*/}
                        {/*                    style: ({$theme}) => ({*/}
                        {/*                        paddingLeft: 0,*/}
                        {/*                        "::placeholder": {color: $theme.colors.MinXSecondaryText},*/}
                        {/*                        ":-ms-input-placeholder": {color: $theme.colors.MinXSecondaryText},*/}
                        {/*                        "::-ms-input-placeholder": {color: $theme.colors.MinXSecondaryText},*/}
                        {/*                    })*/}
                        {/*                },*/}
                        {/*            }}*/}
                        {/*        />*/}
                        {/*        <Block width={["40px", "40px", "60px"]} height={["28px", "28px", "32px"]}>*/}
                        {/*            <Button kind={KIND.minimal} shape={SHAPE.pill} overrides={{*/}
                        {/*                BaseButton: {*/}
                        {/*                    style: () => ({*/}
                        {/*                        width: "100%",*/}
                        {/*                        height: "100%",*/}
                        {/*                        paddingTop: "2px",*/}
                        {/*                        paddingRight: "2px",*/}
                        {/*                        paddingBottom: "2px",*/}
                        {/*                        paddingLeft: "2px",*/}
                        {/*                        borderTopWidth: "1px",*/}
                        {/*                        borderTopStyle: "solid",*/}
                        {/*                        borderRightWidth: "1px",*/}
                        {/*                        borderRightStyle: "solid",*/}
                        {/*                        borderBottomWidth: "1px",*/}
                        {/*                        borderBottomStyle: "solid",*/}
                        {/*                        borderLeftWidth: "1px",*/}
                        {/*                        borderLeftStyle: "solid"*/}
                        {/*                    }),*/}
                        {/*                },*/}
                        {/*            }}>*/}
                        {/*                <ArrowRight size={"24px"}/>*/}
                        {/*            </Button>*/}
                        {/*        </Block>*/}
                        {/*    </Block>*/}
                        {/*    <Block>{"By signing up you are agreeing to the Westshade Terms of Service and Privacy Policy. You may unsubscribe at any time."}</Block>*/}
                        {/*</Block>*/}
                        <Block display="flex" flex={1} flexDirection={["column", "row", "row"]} marginBottom={["32px", "32px", "40px"]}>
                            <NavigationList
                                head="All products"
                                dataList={[
                                    {title: "Custom printing", url: "/custom-printing"},
                                    {title: "Canopy tents", url: "/canopy-tent"},
                                    {title: "Umbrellas", url: "/umbrellas"},
                                    {title: "Accessories", url: "/accessories"}
                                ]}
                            />
                            <NavigationList
                                head="HELP & MORE"
                                dataList={[
                                    {title: "Contact us", url: "/contact-us"},
                                    {title: "Shipping & return", url: "/shipping-return"},
                                    {title: "Warranty", url: "/warranty"},
                                    {title: "About us", url: "/about-us"}
                                ]}
                            />
                        </Block>
                        <Block display="flex" flexDirection="row" marginBottom={["32px", "32px", "40px"]} paddingTop="16px" paddingRight="16px" paddingLeft="16px">
                            <SocialMediaLink social="facebook" link="https://www.facebook.com/Westshadeus"/>
                            <SocialMediaLink social="twitter" link="https://twitter.com/westshadeus"/>
                            <SocialMediaLink social="instagram" link="https://www.instagram.com/westshadeus"/>
                            <SocialMediaLink social="youtube" link="https://youtube.com/channel/UC8pXBuKL5mVy15ECrmoAPWw"/>
                            <SocialMediaLink social="pinterest" link="https://www.pinterest.com/westshadeus/_saved"/>
                        </Block>
                    </Block>
                </Block>
                <Block display={"flex"} flexDirection={["column", "column", "row-reverse"]} justifyContent={["flex-start", "flex-start", "space-between"]}
                       paddingTop={["24px", "24px", "32px"]} paddingBottom={["24px", "24px", "32px"]} font="MinXLabel12" color="MinXSecondaryText"
                       overrides={{
                           Block: {
                               style: {fontWeight: 400},
                           },
                       }}>
                    <Block display="flex" flexDirection={["column", "row"]} marginBottom={["24px", "24px", "0"]} marginLeft="16px">
                        <Block marginRight={["0px", "40px"]} marginBottom="4px">
                            <Link href={"/privacy"}>Privacy & security</Link>
                        </Block>
                        <Block marginRight={["0px", "40px", "0px"]}>
                            <Link href={"/terms-and-conditions"}>Term & conditions</Link>
                        </Block>
                    </Block>
                    <Block display="flex" justifyContent="center">©Westshade</Block>
                </Block>
            </Block>
        </React.Fragment>
    );
}

export default Footer;
