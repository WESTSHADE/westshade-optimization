import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";

import {Block} from "baseui/block";
import {HeaderNavigation, ALIGN, StyledNavigationItem as NavigationItem, StyledNavigationList as NavigationList} from 'baseui/header-navigation';
import {Button, SIZE, SHAPE, KIND} from "baseui/button";
import {Menu, ChevronDown} from 'baseui/icon'

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
        picture: "/images/component/header/tent.jpg",
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
        picture: "/images/component/header/umbrella.jpg",
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
        picture: "/images/component/header/custom_printing.jpg",
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
        picture: "/images/component/header/accs.jpg",
        content: "PROTECTIVE COVER",
        link: "/accessories",
        linkText: "View all >",
        dropMenu: false
    },
    {
        title: "Contact Us",
        content: "Contact Us",
        link: "/contact-us",
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
            <Block paddingLeft="20px" display="flex" alignItems="center" font="MinXParagraph14"><Link href={link}>{title}</Link>{dropMenu && <Block display="inline-block"><i>{<ChevronDown/>}</i></Block>}</Block>
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
                <Block position="fixed" top={0} right={0} left={0} display="block" width="100%" backgroundColor="#FBFBFB">
                    <Block width="100%" backgroundColor="#fbfbfb" height={["48px", "64px"]}>
                        <Block maxWidth="1183px" height="100%" margin="0 auto" display="flex" flexDirection={["row-reverse", "", "row"]} justifyContent="space-between" alignItems="center" padding="12px 16px">
                            <Block position="relative" display={["none", "", "block"]} height="40px" overrides={{Block: {props: {className: "cursor"}}}} onClick={() => router.push("/")}>
                                <Image src={"/images/icon/logo-site.png"} alt="Site Logo" layout="fixed" width={175} height={40} objectFit="contain" objectPosition="left" quality={100}/>
                            </Block>
                            <Block>
                                <Button 
                                    onClick={() => {}} 
                                    startEnhancer={() => <i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M15.4999 10.8833L11.1083 10.375L9.00825 12.475C6.64992 11.275 4.71659 9.35 3.51659 6.98333L5.62492 4.875L5.11659 0.5H0.524919C0.0415854 8.98333 7.01659 15.9583 15.4999 15.475V10.8833Z" fill="#FAFAFA"/></svg></i>}   
                                    shape={SHAPE.pill}
                                    $as="a"
                                    href = "tel:877-702-1872"
                                    overrides={{
                                        BaseButton: {
                                            style:($theme) => ({
                                            paddingTop: "4.5px",
                                            paddingBottom: "4.5px",
                                            paddingLeft: " 24px",
                                            paddingRight: " 24px",
                                            color: "#ffffff !important",
                                            backgroundColor: "#23A4AD",
                                            ":hover": {backgroundColor: "#5FBDBE"}
                                        })
                                        },
                                    }}
                                >
                                    Call us <Block font="MinXParagraph14" display={["none", "", "inline-block"]}> &nbsp; 877-702-1872</Block>
                                </Button>
                            </Block>
                            <Block display="flex">
                                    <Button 
                                        $as="a" 
                                        href="mailto: support@westshade.com"
                                        kind={KIND.minimal}
                                        startEnhancer={() =><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#999999" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>}
                                        overrides={{
                                            BaseButton: { style: {textDecoration: "underline", color: "#262626", fontSize: "14px", fontWeight: "400"}},
                                            StartEnhancer: { style: {display: "grid", placeItems:"center", marginRight: "8px"}}
                                        }}
                                    >
                                        Email Us
                                    </Button>
                                    <Block marginLeft={["24px","40px"]} display="grid" placeItems="center" font="MinXParagraph14">
                                        <Link href="/my-account">
                                            Log in
                                        </Link>
                                    </Block>
                            </Block>
                        </Block>
                    </Block>
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
                                {/* <Block position="relative" display={["none", "", "block"]} width="206px" overrides={{Block: {props: {className: "cursor"}}}} onClick={() => router.push("/")}>
                                    <Image src={"/images/icon/logo-site.png"} alt="Site Logo" layout="responsive" width={1200} height={500} quality={100}/>
                                </Block> */}
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
                            {/* <NavigationItem>
                                <Button kind={KIND.minimal} size={SIZE.mini} shape={SHAPE.circle} onClick={() => router.push("/my-account")}>
                                    <Account className="cursor" color="#323232"/>
                                </Button>
                            </NavigationItem> */}
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
