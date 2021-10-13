import React, {useState, useEffect} from "react";

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

import {Box, Container, Grid, IconButton, List, ListItem, ListItemText, Typography,} from "@material-ui/core";

import Utils from "../../utils/utils";
import {NumberFn} from "../../utils/tools";
import {EventEmitter} from "../../utils/events";

const utils = new Utils();
const numberFn = new NumberFn();

function DropMenu(props) {
    const {menuList, learnMoreText = "Learn more >", learnMoreUrl = "/", picUrl, content} = props;

    return (
        <Block position="absolute" top="96px" right={0} left={0} minHeight="250px" backgroundColor="white" display="flex" flexDirection="row" justifyContent="center"
               overrides={{
                   Block: {
                       style: {boxShadow: "rgb(0 0 0 / 14%) 0px 4px 5px 0px", ...props.style}
                   },
               }}
        >
            {menuList.map((menu, index) => {
                return (
                    <div key={index} className="nav-drop-menu-list-container">
                        <StatefulMenu items={menu}
                                      overrides={{
                                          List: {
                                              props: {
                                                  className: "nav-drop-menu-list"
                                              },
                                              style: {":focus": {outline: "none"}}
                                          },
                                          OptgroupHeader: {
                                              style: {marginTop: "34px"}
                                          },
                                          Option: {
                                              props: {
                                                  getItemLabel: item => item.id,
                                              },
                                              style: {paddingTop: "4px", paddingRight: "8px", paddingBottom: "4px", paddingLeft: "8px",}
                                          },
                                      }}
                        />
                        {index + 1 === menuList.length ? (
                            <Block overrides={{
                                Block: {
                                    style: {paddingTop: "10px", paddingLeft: "8px", fontWeight: "500"},
                                },
                            }}>
                                <Link href={learnMoreUrl}>{learnMoreText}</Link>
                            </Block>
                        ) : null}
                    </div>
                )
            })}
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

    const [isLogin, setIsLogin] = useState(false);
    const [badge, setBadge] = useState(0);
    const [cartList, setCartList] = useState([]);
    const [productList, setProductList] = useState([]);

    const [isMenuDrawerOpen, setMenuDrawerOpen] = useState(false);
    const [isCartDrawerOpen, setCartDrawerOpen] = useState(false);

    const [style1, setStyle1] = useState({visibility: "hidden"});
    const [style2, setStyle2] = useState({visibility: "hidden"});
    const [style3, setStyle3] = useState({visibility: "hidden"});
    const [style4, setStyle4] = useState({visibility: "hidden"});

    const handleClick = (e, href) => {
        e.preventDefault()
        router.push(href)
    }

    const fetchUserInfo = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            return await utils.getUser(token);
        }
    };

    const fetchProduct = async (id) => {
        if (!id) return;
        return await utils.getProductByWooId(id);
    };

    const handleBadge = async () => {
        const token = localStorage.getItem("token");
        let cl = [];

        if (token) {
            let {meta_data} = await fetchUserInfo();
            let result = meta_data.filter((data) => data.key === "cart");
            if (result.length > 0) {
                cl = cl.concat([...result[0].value]);
            } else {
                cl = [];
            }
            setCartList(cl);
            Promise.all(cl.map(({id}) => fetchProduct(id))).then((responses) => {
                setProductList(responses);
            });

            let c = 0;
            cl.forEach(({quantity}) => (c += quantity));
            setBadge(c);
        } else {
            let cart = localStorage.getItem("cart");
            cart = cart ? JSON.parse(cart) : cart;

            if (cart && Array.isArray(cart)) {
                cl = [...cart];
            } else {
                cl = [];
            }
            setCartList(cl);
            Promise.all(cl.map(({id}) => fetchProduct(id))).then((responses) => {
                setProductList(responses);
            });

            let c = 0;
            cl.forEach(({quantity}) => (c += quantity));
            setBadge(c);
        }
        setIsLogin(!!token);
    };

    const getSubtotal = () => {
        let price = 0;
        if (productList.length === cartList.length) {
            productList.forEach((p, index) => {
                price += numberFn.strToFloat(p.price) * cartList[index].quantity;
            });
        }
        return price;
    };

    useEffect(() => {
        EventEmitter.subscribe("updateBadge", (event) => handleBadge(event));
        EventEmitter.subscribe("handleCart", (event) => setCartDrawerOpen(event));

        handleBadge();
    }, []);

    return (
        <React.Fragment>
            <div className={styles["container-nav"]}>
                <Block position="fixed" top={0} right={0} left={0} width="100%" height={["48px", "48px", "96px"]} paddingRight={["16px", "16px", "24px"]}
                       paddingLeft={["16px", "16px", "24px"]} backgroundColor="#FBFBFB">
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
                                          picUrl={"/images/component/header/canopy-tent.jpg"}
                                          content={"Y7 heavy duty tent"}
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
                                                      {id: 'Santorini Aluminum', href: '/products/market-umbrellas/santorini-aluminum-umbrella'},
                                                      {id: 'Santorini Fiberglass', href: '/products/market-umbrellas/santorini-fiberglass-umbrella'},
                                                  ]
                                              }, {
                                                  TILT: [
                                                      {id: 'Bali', href: '/products/tilt-umbrellas/bali-crank-lift-patio-umbrella'},
                                                  ],
                                              }, {
                                                  CANTILEVER: [
                                                      {id: 'Catalina', href: '/products/cantilever-umbrellas/catalina-umbrella'},
                                                  ]
                                              }
                                          ]}
                                          picUrl={"/images/component/header/canopy-tent.jpg"}
                                          content={"Santorini Fiberglass"}
                                    // learnMoreUrl={"/umbrella"}
                                          learnMoreUrl={"/"}
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
                                                      {id: 'Canopy Tent', href: '/'},
                                                      {id: 'Umbrella', href: '/'},
                                                      {id: 'Table Cover', href: '/'},
                                                      {id: 'Wall', href: '/'},
                                                  ]
                                              }
                                          ]}
                                          picUrl={"/images/component/header/canopy-tent.jpg"}
                                          content={"Custom PRINTING tent"}
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
                                                      {id: 'Tent Walls', href: '/'},
                                                      {id: 'Tent Accessories', href: '/'},
                                                      {id: 'Tent Replacement Parts', href: '/'},
                                                      {id: 'Umbrella Accessories', href: '/'},
                                                      {id: 'Umbrella Replacement Parts', href: '/'},
                                                  ]
                                              }, {
                                                  OTHER: [
                                                      {id: 'Heater', href: '/'},
                                                      {id: 'Led Light', href: '/'},
                                                      {id: 'Table Cover', href: '/'},
                                                  ],
                                              }
                                          ]}
                                          picUrl={"/images/component/header/canopy-tent.jpg"}
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
                                className: "nav-accordion"
                            },
                            style: {marginTop: "68px"}
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
                                <Link href={"/"}>{"Learn more >"}</Link>
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
                               onClick={(e) => handleClick(e, "/")}
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
                                    {label: 'Tent walls', href: '/'},
                                    {label: 'Tent accessories', href: '/'},
                                    {label: 'Tent Replacement Parts', href: '/'},
                                    {label: 'Umbrella accessories', href: '/'},
                                    {label: 'Umbrella Replacement parts', href: '/'},
                                ],
                                OTHER: [
                                    {label: 'Heater', href: '/'},
                                    {label: 'Led Light', href: '/'},
                                    {label: 'Table cover', href: '/'},
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
                    // size={SIZE.auto}
                        overrides={{
                            Root: {
                                style: {zIndex: 8}
                            },
                            DrawerContainer: {
                                props: {
                                    className: styles["container-drawer-cart"]
                                }
                            },
                            DrawerBody: {
                                style: {marginTop: "16px", marginRight: "16px", marginBottom: "16px", marginLeft: "16px"}
                            },
                        }}
                >
                    <Block flex={1}>
                        <div className="root-drawer-header">
                            <Typography variant="h5" classes={{h5: "information-title"}}>Shopping Cart</Typography>
                        </div>
                        <List>
                            {productList.length === cartList.length &&
                            productList.map((product, index) => {
                                return (
                                    <ListItem key={index} className="section-image-package-listItem" style={{alignItems: "flex-start"}}>
                                        <div style={{flex: 1, paddingRight: 24}}>
                                            <ListItemText primary={`${product.name}`}/>
                                            {product.attributes.map((att, i) => {
                                                return <Typography key={i} variant="subtitle2" style={{color: "gray"}}>{`${att.name}: ${att.option}`}</Typography>;
                                            })}
                                        </div>
                                        <Typography variant="subtitle1">
                                            <span style={{color: "gray"}}>{`${cartList[index].quantity} x `}</span>
                                            {`$${product.price}`}
                                        </Typography>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Block>
                    <div className="root-drawer-footer">
                        <Typography variant="h6">Subtotal:</Typography>
                        <Typography variant="h6">${getSubtotal()}</Typography>
                    </div>
                    <Button
                        variant="contained"
                        classes={{contained: "root-product-cart-checkout"}}
                        color="inherit"
                        onClick={() => {
                            router.push("/cart");
                            setCartDrawerOpen(false);
                        }}
                        disableElevation
                        disableRipple
                    >
                        View Cart
                    </Button>
                    {/*<Button variant="contained" classes={{contained: "root-product-cart-checkout"}} color="inherit" onClick={() => {*/}
                    {/*}} disableElevation disableRipple>{"CHECKOUT"}</Button>*/}
                </Drawer>
            </div>
        </React.Fragment>
    );
}

export default Header;
