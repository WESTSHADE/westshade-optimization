import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import clsx from "clsx";

import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";

import {Block} from "baseui/block";
import {HeaderNavigation, ALIGN, StyledNavigationItem as NavigationItem, StyledNavigationList as NavigationList} from 'baseui/header-navigation';
import {Button, SHAPE, KIND} from "baseui/button";
import {Menu} from 'baseui/icon'

import {Cart, MobileMenu, NavItem} from "./parts";
import {SearchBar} from "../../Sections";

import MENU from "Assets/menu.json";

import ThemeProvider from "../../ThemeProvider";

import {EventEmitter} from "Utils/events";

import {getUser} from "../../../redux/actions/userActions";

import styles from "./header.module.scss";

// import IconAccount from "./account.svg";
import IconCart from "./cart.svg";

function Header({hideCategories}) {
    const router = useRouter();
    const dispatch = useDispatch();

    const {loggedIn, token} = useSelector(({user}) => user);
    const {badge} = useSelector(({cart}) => cart);

    const [isMenuDrawerOpen, setMenuDrawerOpen] = useState(false);
    const [isCartDrawerOpen, setCartDrawerOpen] = useState(false);

    useEffect(() => {
        EventEmitter.subscribe("handleCart", (event) => setCartDrawerOpen(event));

        if (loggedIn) dispatch(getUser(token));
    }, []);

    return (
        <ThemeProvider.V2>
            <div className={`${styles["container-nav"]} main-container-nav`}>
                <Block position="fixed" top={0} right={0} left={0} height="auto" backgroundColor="#FBFBFB">
                    <Block className={styles["root-navigation-top"]}>
                        <Link href="/">
                            <Block className={clsx([styles["site-logo"], "cursor"])}>
                                <Image src={"/images/icon/logo-site.webp"} alt="Site Logo" layout="responsive" width={594} height={117} objectFit="contain" priority={true}/>
                            </Block>
                        </Link>
                        <Button shape={SHAPE.pill}
                                startEnhancer={() =>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path
                                            d="M15.4999 10.8833L11.1083 10.375L9.00825 12.475C6.64992 11.275 4.71659 9.35 3.51659 6.98333L5.62492 4.875L5.11659 0.5H0.524919C0.0415854 8.98333 7.01659 15.9583 15.4999 15.475V10.8833Z"
                                            fill="#FAFAFA"/>
                                    </svg>
                                }
                                $as="a" href={"tel:+1-" + process.env.businessPhone}
                                overrides={{
                                    BaseButton: {
                                        style: {height: "24px", paddingLeft: " 24px", paddingRight: " 24px", color: "#FFF !important", backgroundColor: "#23A4AD", ":hover": {backgroundColor: "#5FBDBE"}}
                                    },
                                }}
                        >
                            Call us&nbsp;&nbsp;<Block id='businessPhone' font="MinXParagraph14" display={["none", null, "inline-block"]}>{process.env.businessPhone}</Block>
                        </Button>
                        <Block display="grid" gridTemplateColumns="auto auto" gridColumnGap={["24px", null, "40px"]} font="MinXParagraph14" alignItems="inherit">
                            <Button kind={KIND.minimal}
                                    startEnhancer={() =>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#999999" viewBox="0 0 24 24">
                                            <path
                                                d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
                                        </svg>
                                    }
                                    $as="a" href="mailto: support@westshade.com"
                                    overrides={{
                                        BaseButton: {
                                            style: {
                                                textDecoration: "underline",
                                                color: "#262626",
                                                fontSize: "inherit",
                                                fontWeight: "inherit",
                                                paddingLeft: "0px",
                                                paddingRight: "0px",
                                                ":hover": {backgroundColor: "transparent"}
                                            }
                                        },
                                        StartEnhancer: {style: {marginRight: "8px"}}
                                    }}
                            >
                                Email Us
                            </Button>
                            <Link href="/my-account">Log in</Link>
                        </Block>
                    </Block>
                    <HeaderNavigation className={clsx(styles["root-navigation"], hideCategories ? styles["hidden"] : "sadas")}>
                        <NavigationList $align={ALIGN.left} className={styles["nav-left"]}>
                            <NavigationItem>
                                <Button shape={SHAPE.circle} kind={KIND.minimal}
                                        overrides={{
                                            BaseButton: {
                                                style: {
                                                    width: "24px", height: "24px",
                                                    ":hover": {backgroundColor: "transparent"},
                                                    ":active": {backgroundColor: "transparent"},
                                                },
                                            },
                                        }}
                                        onClick={() => setMenuDrawerOpen(true)}
                                >
                                    <Menu size={24} color="#323232"/>
                                </Button>
                            </NavigationItem>
                        </NavigationList>
                        <NavigationList className={clsx([styles["nav-center"], styles["logo"]])} $align={ALIGN.center}>
                            <NavigationItem>
                                <Link href="/">
                                    <Block className={clsx([styles["site-logo"], "cursor"])}>
                                        <Image src={"/images/icon/logo-site.webp"} alt="Site Logo" layout="responsive" width={594} height={117} priority={true}/>
                                    </Block>
                                </Link>
                            </NavigationItem>
                        </NavigationList>
                        <NavigationList className={clsx([styles["nav-center"], styles["menu"]])} $align={ALIGN.center}>
                            {MENU.map((item, index) => <NavItem key={index} detail={item} router={router}/>)}
                        </NavigationList>
                        <NavigationList className={styles["nav-right"]} $align={ALIGN.right}>
                            <NavigationItem>
                                <SearchBar router={router}/>
                            </NavigationItem>
                            <NavigationItem>
                                <Link href="/cart">
                                    <Block className="cursor" position="relative" display="flex">
                                        <IconCart color="#323232"/>
                                        <Block className={styles["badge"]} display={badge > 0 ? "flex" : "none"} font="MinXLabel12" color="MinXPrimaryTextAlt">{badge}</Block>
                                    </Block>
                                </Link>
                            </NavigationItem>
                            {/*<NavigationItem>*/}
                            {/*    <Link href="/my-account">*/}
                            {/*        <Block className="cursor" position="relative" display="flex">*/}
                            {/*            <Account className="cursor" color="#323232"/>*/}
                            {/*        </Block>*/}
                            {/*    </Link>*/}
                            {/*</NavigationItem>*/}
                        </NavigationList>
                    </HeaderNavigation>
                </Block>
                {/*侧边栏*/}
                <MobileMenu isOpen={isMenuDrawerOpen} onClose={() => setMenuDrawerOpen(false)}/>
                <Cart isOpen={isCartDrawerOpen} onClose={() => setCartDrawerOpen(false)}/>
            </div>
        </ThemeProvider.V2>
    );
}

export default Header;
