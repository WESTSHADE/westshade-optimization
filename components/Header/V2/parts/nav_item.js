import React, {useState} from "react";

import Link from "next/link";

import {Block} from "baseui/block";
import {StyledNavigationItem as NavigationItem} from "baseui/header-navigation";
import {ChevronDown} from "baseui/icon";

import Button from "../../../Button/V1";
import DropMenu from "./drop_menu";

const NavItem = ({detail = {}, router}) => {
    const {title = "", list = [], picture, content = "", link = "/", linkText, dropMenu = false} = detail;

    const [display, setDisplay] = useState(false);
    const [style, setStyle] = useState({visibility: "hidden", opacity: 0});

    return (
        <NavigationItem
            onMouseEnter={() => {
                setDisplay(true);
                setTimeout(() => setStyle({visibility: "visible", opacity: 1}), 50);
            }}
            onMouseLeave={() => {
                setStyle({visibility: "hidden", opacity: 0});
                setTimeout(() => setDisplay(false), 250);
            }}
        >
            <Block className="cursor" display="flex" alignItems="center" paddingLeft="20px" font="MinXParagraph14">
                <Link href={link}>{title}</Link>{dropMenu && <ChevronDown/>}
                {/*<Button type="text" bundle="black" onClick={() => router.push({pathname: link})}>{title}</Button>{dropMenu && <ChevronDown/>}*/}
            </Block>
            {display && dropMenu ? <DropMenu containerStyle={style} menuList={list} picUrl={picture} content={content} learnMoreUrl={link} learnMoreText={linkText}/> : null}
        </NavigationItem>
    )
}

export default NavItem;
