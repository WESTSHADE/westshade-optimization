import React from "react";
import clsx from "clsx";

import Link from "next/link";
import Image from "next/image";

import {Block} from "baseui/block";

import {List as Menu, Icon as Social, Subscription} from "./parts"

import MENU from "../../assets/menu_footer.json";

function Footer({isHomePage}) {
    if (isHomePage) return null;

    return (
        <footer>
            <div className={clsx(["m-footer-wrap", "m-wrap-side"])}>
                <Block display="flex" flexDirection={["column", "column", "row"]} paddingTop={["16px", "16px", "70px"]} paddingBottom={["32px", "32px", "100px"]}>
                    <Block minWidth={["unset", "unset", "calc((100% + 24px)/3)"]} marginBottom="32px" paddingLeft={["0px", "0px", "calc((100% + 24px)/12)"]}>
                        <Block className="cursor" position="relative" width={["147px", "147px", "184px"]} onClick={() => document.location.href = "/"}>
                            <Image src={"/images/icon/logo-site-w-text.webp"} alt="Site Logo" layout="responsive" width={1200} height={500} quality={100}/>
                        </Block>
                    </Block>
                    <Block display="grid" gridTemplateColumns={["1fr", "1fr", "1fr auto"]} gridRowGap={["32px", "32px", "40px"]} width="100%" paddingLeft={["0", "0", "calc((100% + 24px)/12)"]}>
                        <Block display="grid" gridTemplateColumns="repeat(2, max-content)" gridColumnGap="22px" flex={1} marginBottom={["32px", "0px"]}>
                            {MENU.map((menu, index) => <Menu key={index} title={menu.title} dataList={menu.list}/>)}
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
            <div className={clsx(["m-footer-wrap", "m-wrap-side"])}>
                <Block display="flex" flexDirection={["column", "column", "row-reverse"]} alignItems={[null, null, "center"]} justifyContent={["flex-start", "flex-start", "space-between"]} minHeight="86px" paddingTop={["24px", null, "32px"]}
                       paddingBottom={["24px", "24px", "32px"]} font="MinXParagraph12" color="MinXSecondaryText">
                    <Block display="grid" gridTemplateColumns="repeat(2, max-content)" gridColumnGap="40px" marginBottom={["16px", "24px", "0"]}>
                        <div><Link href={"/privacy"}>Privacy & security</Link></div>
                        <div><Link href={"/terms-and-conditions"}>Term & conditions</Link></div>
                    </Block>
                    <div className="text-center">©Westshade</div>
                </Block>
            </div>
        </footer>
    );
}

export default Footer;
