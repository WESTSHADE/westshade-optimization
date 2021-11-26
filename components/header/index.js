import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";

import {Block} from "baseui/block";
import {HeaderNavigation, ALIGN, StyledNavigationItem as NavigationItem, StyledNavigationList as NavigationList} from 'baseui/header-navigation';
import {Button, SIZE, SHAPE, KIND} from "baseui/button";
import {Menu} from 'baseui/icon'

import styles from "./header.module.scss";

import Account from "./account.svg";
import Cart from "./cart.svg";

import {Cart as SideCart, DropMenu, MobileMenu} from "./parts";

import {EventEmitter} from "../../utils/events";

import {getUser} from "../../redux/actions/userActions";

const MENU = [
    {
        title: "CANOPY TENT",
        list: [{
            SQUARE: [
                {id: '10’ x 10’', href: '/custom-printed-package/f1010cpp'},
                {id: '13’ x 13’', href: '/custom-printed-package/f1313cpp'},
                {id: '16’ x 16’', href: '/custom-printed-package/f1616cpp'},
                {id: '20’ x 20’', href: '/custom-printed-package/f2020cpp'},
            ]
        }, {
            RECTANGULAR: [
                {id: '10’ x 15’', href: '/custom-printed-package/f1015cpp'},
                {id: '10’ x 20’', href: '/custom-printed-package/f1020cpp'},
                {id: '13’ x 20’', href: '/custom-printed-package/f1320cpp'},
                {id: '13’ x 26’', href: '/custom-printed-package/f1326cpp'},
            ],
        }],
        picture: "/images/component/header/tent.webp",
        content: "Y7 HEAVY DUTY TENT",
        link: "/canopy-tent",
        dropMenu: false
    }, {
        title: "UMBRELLA",
        list: [{
            MARKET: [
                {id: 'Marco', href: '/umbrella/marco'},
                {id: 'Santorini', href: '/umbrella/santorini'},
            ],
        }, {
            TILT: [
                {id: 'Bali', href: '/umbrella/bali'},
                {id: 'Kapri', href: '/umbrella/kapri'},
            ]
        }, {
            OVERSIZE: [
                {id: 'Catalina', href: '/umbrella/catalina'},
            ]
        }],
        picture: "/images/component/header/umbrella.webp",
        content: "SANTORINI FIBERGLASS",
        link: "/umbrella",
        dropMenu: true
    }, {
        title: "CUSTOM PRINTING",
        list: [{
            "": [
                {id: 'Canopy Tent', href: '/custom-printing/canopy-tent'},
                {id: 'Umbrella', href: '/custom-printing/umbrella'},
                {id: 'Table Cover', href: '/custom-printing/table-cover'},
            ]
        }],
        picture: "/images/component/header/custom_printing.webp",
        content: "CUSTOM PRINTING TENT",
        link: "/custom-printing",
        dropMenu: true
    }, {
        title: "ACCESSORIES",
        list: [{
            ACCESSORIES: [
                {id: 'Tent Accessories', href: '/'},
                {id: 'Umbrella Accessories', href: '/'},
            ]
        }, {
            OTHER: [
                {id: 'Heater', href: '/products/accessories/?id=20491'},
                {id: 'Led Light', href: '/products/accessories/?id=20510'},
                {id: 'Table cover', href: '/custom-print/table-cover/buy'},

            ],
        }],
        picture: "/images/component/header/accs.webp",
        content: "PROTECTIVE COVER",
        link: "/accessories",
        linkText: "View all >",
        dropMenu: false
    }
];

const NavItem = ({detail = {}}) => {
    const {title = "", list = [], picture, content = "", link = "/", linkText, dropMenu = false} = detail;

    const [style, setStyle] = useState({visibility: "hidden", opacity: 0});

    return (
        <NavigationItem
            onMouseEnter={() => setStyle({visibility: "visible", opacity: 1})}
            onMouseLeave={() => setStyle({visibility: "hidden", opacity: 0})}
        >
            <Block font="MinXParagraph14"><Link href={link}>{title}</Link></Block>
            {dropMenu ? (
                <DropMenu containerStyle={style} menuList={list} picUrl={picture} content={content} learnMoreUrl={link} learnMoreText={linkText}/>
            ) : null}
        </NavigationItem>
    )
}

function Header() {
    const router = useRouter();
    const dispatch = useDispatch();

    const {loggedIn, token} = useSelector(({user}) => user);
    const {badge} = useSelector(({cart}) => cart);

    const [isMenuDrawerOpen, setMenuDrawerOpen] = useState(false);
    const [isCartDrawerOpen, setCartDrawerOpen] = useState(false);

    useEffect(() => {
        EventEmitter.subscribe("handleCart", (event) => setCartDrawerOpen(event));

        if (loggedIn) {
            dispatch(getUser(token));
        }
    }, []);

    return (
        <React.Fragment>
            <div className={styles["container-nav"]}>
                <Block position="fixed" top={0} right={0} left={0} display="flex" alignItems="center" justifyContent="center" width="100%" height={["48px", "48px", "96px"]} backgroundColor="#FBFBFB">
                    <HeaderNavigation
                        overrides={{
                            Root: {
                                props: {
                                    className: styles["root-navigation"]
                                },
                            }
                        }}
                    >
                        <NavigationList $align={ALIGN.left} className="nav-left">
                            <NavigationItem>
                                <Block position="relative" display={["flex", "", "none"]}>
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
                                </Block>
                                <Block position="relative" display={["none", "", "block"]} width="206px" overrides={{Block: {props: {className: "cursor"}}}} onClick={() => router.push("/")}>
                                    <Image src={"/images/icon/logo-site.png"} alt="Site Logo" layout="responsive" width={1200} height={500} quality={100}/>
                                </Block>
                            </NavigationItem>
                        </NavigationList>
                        <NavigationList $align={ALIGN.center} className="nav-center loge">
                            <NavigationItem>
                                <Block position="relative" width="110px" overrides={{Block: {props: {className: "cursor"}}}} onClick={() => router.push("/")}>
                                    <Image src={"/images/icon/logo-site.png"} alt="Site Logo" layout="responsive" width={1200} height={500} quality={100}/>
                                </Block>
                            </NavigationItem>
                        </NavigationList>
                        <NavigationList $align={ALIGN.center} className="nav-center menu">
                            {MENU.map((item, index) => <NavItem key={index} detail={item}/>)}
                        </NavigationList>
                        <NavigationList $align={ALIGN.right} className="nav-right">
                            {/*<NavigationItem>*/}
                            {/*    <a href="/" onClick={(e) => handleClick(e, "/")}>*/}
                            {/*        <Image src={"/images/icon/icon-search.png"} alt="Search" layout="fixed" width={20} height={20} quality={100}/>*/}
                            {/*    </a>*/}
                            {/*</NavigationItem>*/}
                            <NavigationItem>
                                <Block position="relative" display="flex">
                                    <Button kind={KIND.minimal} size={SIZE.mini} shape={SHAPE.circle} onClick={() => router.push("/cart")}>
                                        <Cart className="cursor" color="#323232"/>
                                    </Button>
                                    <Block display={badge > 0 ? "flex" : "none"} justifyContent="center" alignItems="center" backgroundColor="#23A4AD"
                                           minWidth="18px" height="18px" font="MinXLabel12" color="MinXPrimaryTextAlt"
                                           overrides={{
                                               Block: {
                                                   props: {
                                                       className: styles["badge"]
                                                   }
                                               },
                                           }}
                                    >{badge}</Block>
                                </Block>
                            </NavigationItem>
                            <NavigationItem>
                                <Button kind={KIND.minimal} size={SIZE.mini} shape={SHAPE.circle} onClick={() => router.push("/my-account")}>
                                    <Account className="cursor" color="#323232"/>
                                </Button>
                            </NavigationItem>
                        </NavigationList>
                    </HeaderNavigation>
                </Block>
                {/*侧边栏*/}
                <MobileMenu isOpen={isMenuDrawerOpen} onClose={() => setMenuDrawerOpen(false)}/>
                <SideCart isOpen={isCartDrawerOpen} onClose={() => setCartDrawerOpen(false)}/>
            </div>
        </React.Fragment>
    );
}

export default Header;
