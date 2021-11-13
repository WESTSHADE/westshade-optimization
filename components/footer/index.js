import React from "react";
import clsx from "clsx";

import Link from "next/link";
import Image from "next/image";

import {Block} from "baseui/block";

import {List as Menu, Icon as Social, Subscription} from "./parts"

const menuList = [
    {
        title: "All products", list: [
            {title: "Custom printing", url: "/custom-printing"},
            {title: "Canopy tents", url: "/canopy-tent"},
            {title: "Umbrellas", url: "/umbrella"},
            {title: "Accessories", url: "/accessories"}
        ]
    },
    {
        title: "HELP & MORE", list: [
            {title: "Contact us", url: "/contact-us"},
            {title: "Shipping & return", url: "/shipping-return"},
            {title: "Warranty", url: "/warranty"},
            {title: "About us", url: "/about-us"}
        ]
    },
]

function Footer({isHomePage}) {
    return (
        <footer>
            <div id="refreshPlaceholder" className={clsx(["apple-refresh-placeholder", isHomePage ? "for-scroll" : ""])}/>
            <div className={clsx(["m-footer-wrap", "m-wrap-side", isHomePage ? "for-scroll" : ""])}>
                <Block display="flex" flexDirection={["column", "column", "row"]} paddingTop={["16px", "16px", "70px"]} paddingBottom={["32px", "32px", "100px"]}>
                    <Block minWidth={["unset", "unset", "calc((100% + 24px)/3)"]} marginBottom="32px" paddingLeft={["0px", "0px", "calc((100% + 24px)/12)"]}>
                        <Block position="relative" width={["147px", "147px", "184px"]}
                               overrides={{
                                   Block: {
                                       props: {
                                           className: "cursor"
                                       },
                                   },
                               }}
                               onClick={() => document.location.href = "/"}
                        >
                            <Image src={"/images/icon/logo-site.png"} alt="Site Logo" layout="responsive" width={1200} height={500} quality={100}/>
                        </Block>
                    </Block>
                    <Block display="grid" gridTemplateColumns={["1fr", "1fr", "1fr auto"]} gridRowGap={["32px", "32px", "40px"]} width="100%" paddingLeft={["0px", "0px", "calc((100% + 24px)/12)"]}>
                        <Block display="grid" gridTemplateColumns={"repeat(2, max-content)"} gridColumnGap="22px" flex={1} marginBottom={["32px", ""]}>
                            {menuList.map((menu, index) => <Menu key={index} title={menu.title} dataList={menu.list}/>)}
                        </Block>
                        <Block display="grid" gridTemplateColumns="repeat(5, max-content)" gridColumnGap="22px" paddingTop={["0", "0", "16px"]} paddingLeft="16px">
                            <Social social="facebook" link="https://www.facebook.com/Westshadeus"/>
                            <Social social="twitter" link="https://twitter.com/westshadeus"/>
                            <Social social="instagram" link="https://www.instagram.com/westshadeus"/>
                            <Social social="youtube" link="https://youtube.com/channel/UC8pXBuKL5mVy15ECrmoAPWw"/>
                            <Social social="pinterest" link="https://www.pinterest.com/westshadeus/_saved"/>
                        </Block>
                    </Block>
                </Block>
            </div>
            <div className="divider"/>
            <div className={clsx("m-footer-wrap", "m-wrap-side")}>
                <Block display="flex" flexDirection={["column", "column", "row-reverse"]} alignItems={["", "", "center"]} justifyContent={["flex-start", "flex-start", "space-between"]} minHeight="86px" paddingTop={["24px", "24px", "32px"]}
                       paddingBottom={["24px", "24px", "32px"]} font="MinXParagraph12" color="MinXSecondaryText">
                    <Block display="grid" gridTemplateColumns={"repeat(2, auto)"} gridColumnGap="40px" gridRowGap="8px" width="fit-content" marginBottom={["16px", "24px", "0"]}>
                        <Block><Link href={"/privacy"}>Privacy & security</Link></Block>
                        <Block><Link href={"/terms-and-conditions"}>Term & conditions</Link></Block>
                    </Block>
                    <div className="text-center">©Westshade</div>
                </Block>
            </div>
        </footer>
    );
}

export default Footer;
