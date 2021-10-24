import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";

import {Block} from "baseui/block";
import {HeaderNavigation, ALIGN, StyledNavigationItem as NavigationItem, StyledNavigationList as NavigationList} from 'baseui/header-navigation';
import {Drawer, SIZE, ANCHOR} from "baseui/drawer";
import {Button, SHAPE} from "baseui/button";
import {Accordion, Panel} from 'baseui/accordion';
import {StatefulMenu} from "baseui/menu";
import Menu from 'baseui/icon/menu'

import styles from "./header.module.scss";

import Account from "./account.svg";
import Cart from "./cart.svg";

import MButton from "../button-n";

import {NumberFn} from "../../utils/tools";
import {EventEmitter} from "../../utils/events";

const numberFn = new NumberFn();

import {getUser} from "../../redux/actions/userActions";

function DropMenu(props) {
    const {menuList, learnMoreText = "Learn more >", learnMoreUrl = "/", picUrl, content} = props;

    return (
        <Block position="absolute" top="96px" right={0} left={0} minHeight="250px" display="flex" flexDirection="row" justifyContent="center" backgroundColor="white"
               overrides={{
                   Block: {
                       style: {boxShadow: "rgb(0 0 0 / 14%) 0px 4px 5px 0px", ...props.style}
                   },
               }}
        >
            {menuList.map((menu, index) => (
                <div key={index} className={styles["container-nav-drop-menu-list"]}>
                    <StatefulMenu items={menu}
                                  overrides={{
                                      List: {
                                          props: {
                                              className: styles["container-nav-drop-menu-list-inner"]
                                          },
                                      },
                                      OptgroupHeader: {
                                          props: {
                                              className: styles["menu-list-header"]
                                          },
                                      },
                                      Option: {
                                          props: {
                                              className: styles["menu-list-item"],
                                              getItemLabel: item => item.id,
                                          },
                                      },
                                  }}
                    />
                    {index + 1 === menuList.length ? (
                        <Block font="MinXLabel14"
                               overrides={{
                                   Block: {
                                       props: {
                                           className: styles["menu-list-label"]
                                       },
                                   },
                               }}
                        >
                            <Link href={learnMoreUrl}>{learnMoreText}</Link>
                        </Block>
                    ) : null}
                </div>
            ))}
            <Block paddingTop={"40px"} paddingLeft={"80px"}>
                <Block position={"relative"} width={"220px"} height={"138px"} marginBottom={"16px"}>
                    <Image src={picUrl} alt="Menu Display" layout="fill" quality={100}/>
                </Block>
                <div style={{textTransform: "uppercase"}}>{content}</div>
            </Block>
        </Block>
    )
}

function Header() {
    const router = useRouter();

    const [isMenuDrawerOpen, setMenuDrawerOpen] = useState(false);
    const [isCartDrawerOpen, setCartDrawerOpen] = useState(false);

    const [style1, setStyle1] = useState({visibility: "hidden"});
    const [style2, setStyle2] = useState({visibility: "hidden"});
    const [style3, setStyle3] = useState({visibility: "hidden"});
    const [style4, setStyle4] = useState({visibility: "hidden"});

    const dispatch = useDispatch();

    const {loggedIn, token} = useSelector(({user}) => user);
    const {badge, cart, cartProduct} = useSelector(({cart}) => cart);

    const handleClick = (e, href) => {
        e.preventDefault();
        router.push(href);
        setMenuDrawerOpen(false);
    }

    const getSubtotal = () => {
        let price = 0;
        if (cartProduct.length === cart.length) {
            cartProduct.forEach((p, index) => {
                price += numberFn.strToFloat(p.price) * cart[index].quantity;
            });
        }
        return price;
    };

    useEffect(() => {
        EventEmitter.subscribe("handleCart", (event) => setCartDrawerOpen(event));

        if (loggedIn) {
            dispatch(getUser(token));
        }
    }, []);

    return (
        <React.Fragment>
            <div className={styles["container-nav"]}>
                <Block position="fixed" top={0} right={0} left={0} display="flex" alignItems="center" justifyContent="center" width="100%" height={["48px", "48px", "96px"]}
                       paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]} backgroundColor="#FBFBFB"
                >
                    <Block width="100%" maxWidth="1920px">
                        <HeaderNavigation
                            overrides={{
                                Root: {
                                    style: () => ({height: "100%", borderBottomWidth: "0px", paddingTop: 0, paddingBottom: 0})
                                }
                            }}
                        >
                            <NavigationList $align={ALIGN.left} className={"nav-left-loge"}>
                                <NavigationItem style={{position: "relative", width: "200px", paddingLeft: 0}}>
                                    <Block overrides={{
                                        Block: {
                                            style: {":hover": {cursor: 'pointer'}},
                                        },
                                    }}
                                           onClick={() => router.push("/")}
                                    >
                                        <Image src={"/images/icon/logo-site-dark-header.png"} alt="Site Logo" layout="responsive" width={200} height={40} quality={100}/>
                                    </Block>
                                </NavigationItem>
                            </NavigationList>
                            <NavigationList $align={ALIGN.left} className="nav-left-button">
                                <NavigationItem style={{position: "relative", width: "24px", paddingLeft: 0, display: "flex", alignItems: "center"}}>
                                    <Button shape={SHAPE.circle}
                                            overrides={{
                                                BaseButton: {
                                                    style: {
                                                        width: "100%",
                                                        height: "100%",
                                                        backgroundColor: "transparent",
                                                        ":hover": {backgroundColor: "transparent"},
                                                        ":active": {backgroundColor: "transparent"},
                                                    },
                                                },
                                            }}
                                            onClick={() => setMenuDrawerOpen(true)}
                                        // onClick={() => setCartDrawerOpen(true)}
                                    >
                                        <Menu size={24} color={"#323232"}/>
                                    </Button>
                                </NavigationItem>
                            </NavigationList>
                            <NavigationList $align={ALIGN.center} className="nav-center-loge">
                                <NavigationItem style={{position: "relative", width: "180px", paddingLeft: 0}}>
                                    <Block overrides={{
                                        Block: {
                                            style: {":hover": {cursor: 'pointer'}},
                                        },
                                    }}
                                           onClick={() => router.push("/")}
                                    >
                                        <Image src={"/images/icon/logo-site-dark-header.png"} alt="Site Logo" layout="responsive" width={200} height={40} quality={100}/>
                                    </Block>
                                </NavigationItem>
                            </NavigationList>
                            <NavigationList $align={ALIGN.center} className={"nav-center-menu"}>
                                <NavigationItem style={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}
                                                onMouseEnter={(e) => setStyle1({visibility: "visible"})}
                                                onMouseLeave={(e) => setStyle1({visibility: "hidden"})}
                                >
                                    <Link href="/canopy-tent">CANOPY TENT</Link>
                                    <DropMenu style={style1}
                                              menuList={[
                                                  {
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
                                                  }
                                              ]}
                                              picUrl={"/images/component/header/tent.jpg"}
                                              content={"Y7 HEAVY DUTY TENT"}
                                              learnMoreUrl={"/canopy-tent"}
                                    />
                                </NavigationItem>
                                <NavigationItem style={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}
                                                onMouseEnter={(e) => setStyle2({visibility: "visible"})}
                                                onMouseLeave={(e) => setStyle2({visibility: "hidden"})}
                                >
                                    <Link href="/umbrella">UMBRELLA</Link>
                                    <DropMenu style={style2}
                                              menuList={[
                                                  {
                                                      MARKET: [
                                                          {id: 'Marco', href: '/products/market-umbrellas/marco-umbrella'},
                                                          {id: 'Santorini', href: '/products/market-umbrellas/santorini-umbrella'},
                                                      ],
                                                  }, {
                                                      TILT: [
                                                          {id: 'Bali', href: '/products/tilt-umbrellas/bali-crank-lift-patio-umbrella'},
                                                          // {id: 'Kapri', href: '/products/tilt-umbrellas/bali-crank-lift-patio-umbrella'},
                                                      ]
                                                  }, {
                                                      OVERSIZE: [
                                                          {id: 'Catalina', href: '/products/cantilever-umbrellas/catalina-umbrella'},
                                                      ]
                                                  }
                                              ]}
                                              picUrl={"/images/component/header/umbrella.jpg"}
                                              content={"SANTORINI FIBERGLASS"}
                                              learnMoreUrl={"/umbrella"}
                                    />
                                </NavigationItem>
                                <NavigationItem style={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}
                                                onMouseEnter={(e) => setStyle3({visibility: "visible"})}
                                                onMouseLeave={(e) => setStyle3({visibility: "hidden"})}
                                >
                                    <Link href="/custom-printing">CUSTOM PRINTING</Link>
                                    <DropMenu style={style3}
                                              menuList={[
                                                  {
                                                      "": [
                                                          {id: 'Canopy Tent', href: '/custom-printing/canopy-tent'},
                                                          {id: 'Umbrella', href: '/custom-printing/umbrella'},
                                                          {id: 'Table Cover', href: '/custom-printing/table-cover'},
                                                      ]
                                                  }
                                              ]}
                                              picUrl={"/images/component/header/print.jpg"}
                                              content={"CUSTOM PRINTING TENT"}
                                              learnMoreUrl={"/custom-printing"}
                                    />
                                </NavigationItem>
                                <NavigationItem style={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}
                                                onMouseEnter={(e) => setStyle4({visibility: "visible"})}
                                                onMouseLeave={(e) => setStyle4({visibility: "hidden"})}
                                >
                                    <Link href="/accessories">ACCESSORIES</Link>
                                    <DropMenu style={style4}
                                              menuList={[
                                                  {
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
                                                  }
                                              ]}
                                              picUrl={"/images/component/header/accs.jpg"}
                                              content={"Protective cover"}
                                              learnMoreUrl={"/accessories"}
                                              learnMoreText={"View all >"}
                                    />
                                </NavigationItem>
                            </NavigationList>
                            <NavigationList $align={ALIGN.right}>
                                {/*<NavigationItem style={{display: "flex"}}>*/}
                                {/*    <a href="/" onClick={(e) => handleClick(e, "/")}>*/}
                                {/*        <Image src={"/images/icon/icon-search.png"} alt="Search" layout="fixed" width={20} height={20} quality={100}/>*/}
                                {/*    </a>*/}
                                {/*</NavigationItem>*/}
                                <NavigationItem style={{position: "relative", display: "flex"}}>
                                    <a href="/cart" onClick={(e) => handleClick(e, "/cart")}>
                                        <Cart style={{width: "22px", height: "22px"}} color={"#323232"}/>
                                    </a>
                                    {badge > 0 ? (
                                        <Block display="flex" justifyContent="center" alignItems="center" position="absolute" top={"-6px"} right={"-6px"} backgroundColor={"#23A4AD"}
                                               minWidth="18px" height="18px" font="MinXLabel12" color="MinXPrimaryTextAlt"
                                               overrides={{
                                                   Block: {
                                                       style: {borderRadius: "50%"},
                                                   },
                                               }}
                                        >{badge}</Block>
                                    ) : null}
                                </NavigationItem>
                                <NavigationItem style={{display: "flex"}}>
                                    <a href="/my-account" onClick={(e) => handleClick(e, "/my-account")}>
                                        <Account style={{width: "22px", height: "22px"}} color={"#323232"}/>
                                    </a>
                                </NavigationItem>
                            </NavigationList>
                        </HeaderNavigation>
                    </Block>
                </Block>
                {/*小屏侧边栏*/}
                <Drawer autoFocus isOpen={isMenuDrawerOpen}
                        onClose={() => setMenuDrawerOpen(false)}
                        anchor={ANCHOR.left} size={SIZE.full}
                        overrides={{
                            Root: {
                                style: {zIndex: 99}
                            },
                            Close: {
                                style: {right: "unset", left: "16px"}
                            }
                        }}
                >
                    <Accordion overrides={{
                        Root: {
                            props: {
                                className: styles["container-drawer-menu"]
                            },
                        },
                        PanelContainer: {
                            style: {borderBottomWidth: "0px"}
                        },
                        Header: {
                            style: {paddingTop: "12px", paddingBottom: "12px"}
                        },
                        Content: {
                            style: {paddingTop: "0px", paddingRight: "0px", paddingBottom: "0px", paddingLeft: "0px"}
                        }

                    }}>
                        <Panel title="CANOPY TENT">
                            <StatefulMenu items={{
                                SQUARE: [
                                    {id: '10’ x 10’', href: '/custom-printed-package/f1010cpp'},
                                    {id: '13’ x 13’', href: '/custom-printed-package/f1313cpp'},
                                    {id: '16’ x 16’', href: '/custom-printed-package/f1616cpp'},
                                    {id: '20’ x 20’', href: '/custom-printed-package/f2020cpp'},
                                ],
                                RECTANGULAR: [
                                    {id: '10’ x 15’', href: '/custom-printed-package/f1015cpp'},
                                    {id: '10’ x 20’', href: '/custom-printed-package/f1020cpp'},
                                    {id: '13’ x 20’', href: '/custom-printed-package/f1320cpp'},
                                    {id: '13’ x 26’', href: '/custom-printed-package/f1326cpp'},
                                ],
                            }}
                                          onItemSelect={({item}) => console.log(item)}
                                          overrides={{
                                              List: {
                                                  style: {paddingTop: "0px", paddingBottom: "0px", paddingLeft: "45px", boxShadow: "none"},
                                              },
                                              OptgroupHeader: {
                                                  style: {marginTop: "14px"}
                                              },
                                              Option: {
                                                  props: {
                                                      getItemLabel: item => item.id,
                                                  },
                                              },
                                          }}
                            />
                            <Block backgroundColor={"white"}
                                   overrides={{
                                       Block: {
                                           style: {paddingTop: "24px", paddingBottom: "32px", paddingLeft: "53px", fontWeight: "500"},
                                       },
                                   }}
                            >
                                <Link href={"/canopy-tent"}>{"Learn more >"}</Link>
                            </Block>
                        </Panel>
                        <Panel title="UMBRELLA"
                               overrides={{
                                   PanelContainer: {
                                       style: {borderBottomWidth: "0px"}
                                   },
                                   Header: {
                                       style: {paddingTop: "12px", paddingBottom: "12px"}
                                   },
                                   ToggleIcon: {
                                       style: {display: 'none'},
                                   },
                                   Content: {
                                       style: {display: 'none'},
                                   }
                               }}
                               onClick={(e) => handleClick(e, "/umbrella")}
                        />
                        <Panel title="CUSTOM PRINTING"
                               overrides={{
                                   PanelContainer: {
                                       style: {borderBottomWidth: "0px"}
                                   },
                                   Header: {
                                       style: {paddingTop: "12px", paddingBottom: "12px"}
                                   },
                                   ToggleIcon: {
                                       style: {display: 'none'},
                                   },
                                   Content: {
                                       style: {display: 'none'},
                                   }
                               }}
                               onClick={(e) => handleClick(e, "/custom-printing")}

                        />
                        <Panel title="ACCESSORIES">
                            <StatefulMenu items={{
                                ACCESSORIES: [
                                    {label: 'Tent Accessories', href: '/'},
                                    {label: 'Umbrella Accessories', href: '/'},
                                ],
                                OTHER: [
                                    {label: 'Heater', href: '/products/accessories/?id=20491'},
                                    {label: 'Led Light', href: '/products/accessories/?id=20510'},
                                    {label: 'Table cover', href: '/custom-print/table-cover/buy'},
                                ],
                            }}
                                          onItemSelect={({item}) => console.log(item)}
                                          overrides={{
                                              List: {
                                                  style: {paddingTop: "0px", paddingBottom: "0px", paddingLeft: "45px", boxShadow: "none"},
                                              },
                                              OptgroupHeader: {
                                                  style: {marginTop: "14px"}
                                              },
                                              Option: {
                                                  props: {
                                                      getItemLabel: item => item.label,
                                                  },
                                              },
                                          }}
                            />
                            <Block backgroundColor={"white"} overrides={{
                                Block: {
                                    style: {paddingTop: "24px", paddingBottom: "32px", paddingLeft: "53px", fontWeight: "500"},
                                },
                            }}>
                                <Link href={"/accessories"}>{"Learn more >"}</Link>
                            </Block>
                        </Panel>
                    </Accordion>
                </Drawer>
                <Drawer autoFocus isOpen={isCartDrawerOpen}
                        onClose={() => setCartDrawerOpen(false)}
                        anchor={ANCHOR.right}
                        overrides={{
                            Root: {
                                style: {zIndex: 8}
                            },
                            DrawerContainer: {
                                props: {
                                    className: styles["container-drawer-cart"]
                                },
                            },
                            DrawerBody: {
                                props: {
                                    className: styles["container-drawer-cart-body"]
                                },
                            },
                            Close: {
                                props: {
                                    className: styles["drawer-cart-close"]
                                },
                            }
                        }}
                >
                    <Block flex={1} paddingTop="56px" paddingRight={["16px", "40px"]} paddingBottom="56px" paddingLeft={["16px", "40px"]}>
                        <Block marginBottom={["32px", "40px"]} font="MinXTitle32">ITEM ADDED</Block>
                        <Block display="grid" gridRowGap={["16px", "24px"]}>
                            {cart.length > 0 && cartProduct.length > 0
                                ? cartProduct.map((product, index) => {
                                    return (
                                        <Block key={index} display="flex" flexDirection={["column", "row"]} flex={1} justifyContent="space-between" marginBottom={["32px", "40px"]} paddingBottom={["32px", "40px"]}
                                               overrides={{
                                                   Block: {
                                                       style: {borderBottom: "1px solid #e0e0e0"}
                                                   }
                                               }}
                                        >
                                            <Block display="flex" flexDirection="row" width='100%' marginBottom="16px">
                                                <Block position="relative" width="60px" height="60px" marginRight="15px">
                                                    {product.images.length > 0 ? (
                                                        <img src={product.images[0].src} alt={product.images[0].alt} width="100%" height="100%"
                                                             style={{objectFit: "contain"}}/>
                                                    ) : (
                                                        <Image src={"/images/default-product.jpg"} alt={product.name} layout="fill" objectFit="contain" quality={100}/>
                                                    )}
                                                </Block>
                                                <Block position="relative" flex={1} paddingRight="24px">
                                                    <Block marginBottom="8px" font="MinXHeading16" color="MinXPrimaryText">{product.name}</Block>
                                                    {cart[index].variation.length > 0 ? (
                                                        <>{cart[index].variation.map((attr, i) => (
                                                            <Block key={i} marginBottom="8px" font="MinXParagraph14" color="MinXPrimaryText">
                                                                {`${attr.attribute}: ${attr.value}`}
                                                            </Block>
                                                        ))}</>
                                                    ) : null}
                                                    <Block font="MinXParagraph14" color="MinXPrimaryText">Quantity: {cart[index].quantity}</Block>
                                                    <Block position="absolute" top={["", "0"]} right={0} bottom={["0", ""]} font="MinXLabel16" color="MinXPrimaryText"
                                                           overrides={{
                                                               Block: {
                                                                   style: {fontWeight: 700}
                                                               },
                                                           }}
                                                    >
                                                        {`$` + product.price * cart[index].quantity}
                                                    </Block>
                                                </Block>
                                            </Block>
                                        </Block>
                                    )
                                }) : null}
                        </Block>
                        <Block display="flex" flexDirection="row" justifyContent="space-between" marginBottom="12px" font="MinXLabel20">
                            <Block>Subtotal:</Block><Block>${getSubtotal()}</Block>
                        </Block>
                        <Block marginBottom="40px" font="MinXLabel14"
                               overrides={{
                                   Block: {
                                       style: {fontWeight: 400}
                                   },
                               }}
                        >Excludes tax and fees</Block>
                        <MButton type="outline" display="block" width="100%" height="52px" font="MinXLabel14" color="#23A4AD"
                                 buttonStyle={{
                                     paddingTop: "18px !important",
                                     paddingBottom: "18px !important",
                                     borderColor: `#D0D9D9 !important`,
                                     ":hover": {backgroundColor: `rgba(0, 0, 0, 0.05) !important`},
                                     ":active": {backgroundColor: `rgba(0, 0, 0, 0.1) !important`}
                                 }}
                                 onClick={() => {
                                     router.push("/cart");
                                     setCartDrawerOpen(false);
                                 }}
                                 text={"View cart"}
                        />
                        {/*<Button variant="contained" classes={{contained: "root-product-cart-checkout"}} color="inherit" onClick={() => {*/}
                        {/*}} disableElevation disableRipple>{"CHECKOUT"}</Button>*/}
                    </Block>
                </Drawer>
            </div>
        </React.Fragment>
    );
}

export default Header;
