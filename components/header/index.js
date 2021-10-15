import React, {useState, useEffect, useRef} from "react";

import {useRouter} from "next/router";

import {Badge, Box, Button, Drawer, Container, Grid, IconButton, Link, List, ListItem, ListItemText, Typography, Hidden, Divider} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CloseIcon from "@material-ui/icons/Close";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhoneAlt} from "@fortawesome/free-solid-svg-icons";

import styles from "./header.module.css";

import Utils from "../../utils/utils";
import {NumberFn} from "../../utils/tools";
import {EventEmitter} from "../../utils/events";

const utils = new Utils();
const numberFn = new NumberFn();

let navbar = null;

function DropMenuSecondary(props) {
    const router = useRouter();

    return (
        <Box className="dropdown-secondury dropdown-menu-secondury" style={{left: "100%", ...props.style}} mx="auto">
            <Grid container alignItems="center">
                <Grid item className="menu-item-grid-item">
                    {props.menuListSecondary && props.menuListSecondary.length > 0 ? (
                        <Typography className="menu-item-list-item-text" style={{paddingLeft: "16px"}}>
                            <span>{props.menuListSecondary[0].label}</span>
                        </Typography>
                    ) : null}
                    <List style={{columnCount: props.menuListSecondary.length > 4 ? "2" : "1"}}>
                        {props.menuListSecondary &&
                        props.menuListSecondary.map((item, index) => {
                            if (index !== 0) {
                                if (item.type === "link") {
                                    return (
                                        <ListItem
                                            key={index}
                                            className="menu-item-list-item"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.push(item.url, undefined, {shallow: true});
                                            }}
                                        >
                                            <ListItemText className="menu-item-list-item-text" secondary={item.label}/>
                                        </ListItem>
                                    );
                                }
                            }
                        })}
                    </List>
                </Grid>
                <Hidden smDown>
                    <Grid item xs className="menu-item-grid-item">
                        <div className="menu-item-grid-item-image-container">
                            <img src={props.menuImage} style={{height: "100%", width: "100%", objectFit: "contain"}}/>
                        </div>
                    </Grid>
                </Hidden>
            </Grid>
        </Box>
    );
}

function DropMenu(props) {
    const router = useRouter();

    // const [offsetLeft, setOffsetLeft] = useState(0);
    // const leftGrid = useRef(null);

    // useEffect(() => {
    //   if (leftGrid.current && leftGrid.current.clientWidth) {
    //     setOffsetLeft(leftGrid.current.clientWidth);
    //   }
    // }, [leftGrid.current]);

    return (
        <Box className="dropdown dropdown-menu" style={{top: props.top, ...props.style}} mx="auto">
            <Container maxWidth="md">
                <Grid container alignItems="center">
                    <Grid
                        item
                        xs={6}
                        container
                        direction="column"
                        justifyContent="space-between"
                        className="menu-item-grid-item"
                        // ref={leftGrid}
                    >
                        <List>
                            {props.menuList.map((item, index) => {
                                if (index === 0) {
                                    return (
                                        <ListItem key={index} className="menu-item-list-item">
                                            <ListItemText className="menu-item-list-item-text" primary={item.label}/>
                                        </ListItem>
                                    );
                                } else {
                                    if (item.type === "link") {
                                        return (
                                            <ListItem
                                                key={index}
                                                className="menu-item-list-item"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    router.push(item.url, undefined, {shallow: true});
                                                }}
                                            >
                                                <ListItemText className="menu-item-list-item-text" secondary={item.label}/>
                                            </ListItem>
                                        );
                                    } else if (item.type === "menu") {
                                        const [style, setStyle] = useState({visibility: "hidden"});

                                        return (
                                            <ListItem key={index} className="menu-item-list-item" onMouseEnter={(e) => setStyle({visibility: "visible"})} onMouseLeave={(e) => setStyle({visibility: "hidden"})}>
                                                <ListItemText className="menu-item-list-item-text" secondary={item.label}/>
                                                <DropMenuSecondary style={style} menuImage={item.menuImage} menuListSecondary={item.menuList}/>
                                                {/* <DropMenuSecondary left={offsetLeft} style={style} /> */}
                                            </ListItem>
                                        );
                                    }
                                }
                            })}
                        </List>
                        {props.buttonGroup ? props.buttonGroup : null}
                    </Grid>
                    <Grid item xs={6} className="menu-item-grid-item">
                        <div className="menu-item-grid-item-image-container">
                            <img src={props.menuImage} style={{height: "100%"}}/>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default function Header() {
    const router = useRouter();

    const [isLogin, setIsLogin] = useState(false);
    const [badge, setBadge] = useState(0);
    const [cartList, setCartList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
    const [paddingTop, setPaddingTop] = useState(0);

    const [sectionNavTop, setNavTop] = useState(0);
    const [offsetTop, setOffsetTop] = useState(0);
    const [style1, setStyle1] = useState({visibility: "hidden"});
    const [style2, setStyle2] = useState({visibility: "hidden"});
    const [style3, setStyle3] = useState({visibility: "hidden"});
    const [style4, setStyle4] = useState({visibility: "hidden"});
    const [style5, setStyle5] = useState({visibility: "hidden"});
    const [style6, setStyle6] = useState({visibility: "hidden"});

    const headerBar = useRef(null);
    const headerTopBar = useRef(null);
    const headerMainBar = useRef(null);
    const headerBottomBar = useRef(null);

    const fetchUserInfo = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            return await utils.getUser(token);
        } else {
            return;
        }
    };

    const fetchProduct = async (id) => {
        if (!id) return;
        return await utils.getProductByWooId(id);
    };

    const handleScroll = (x) => {
        if (window.pageYOffset > offsetTop) {
            headerBar.current.classList.add("sticky");
            // headerBottomBar.current.classList.add("sticky");
            setNavTop(headerMainBar.current.clientHeight);

            setPaddingTop(headerMainBar.current.clientHeight + 12);
        } else {
            headerBar.current.classList.remove("sticky");
            // headerBottomBar.current.classList.remove("sticky");
            setNavTop(headerBar.current.clientHeight - headerBottomBar.current.clientHeight);

            setPaddingTop(headerBar.current.clientHeight + 12);
        }
    };

    const handleCartDrawer = (o) => (event) => {
        if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setCartDrawerOpen(o);
    };

    const handleBadge = async () => {
        const token = localStorage.getItem("token");
        let cl = [];

        if (token) {
            let {meta_data} = await fetchUserInfo();

            if (meta_data) {
                let result = meta_data.filter((data) => data.key === "cart");
                if (result.length > 0) {
                    cl = cl.concat([...result[0].value]);
                } else {
                    cl = [];
                }
                setCartList(cl);
                Promise.all(cl.map((product) => fetchProduct(product.id))).then((responses) => {
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
                Promise.all(cl.map((product) => fetchProduct(product.id))).then((responses) => {
                    setProductList(responses);
                });

                let c = 0;
                cl.forEach(({quantity}) => (c += quantity));
                setBadge(c);
            }
        } else {
            let cart = localStorage.getItem("cart");
            cart = cart ? JSON.parse(cart) : cart;

            if (cart && Array.isArray(cart)) {
                cl = [...cart];
            } else {
                cl = [];
            }
            setCartList(cl);
            Promise.all(cl.map((product) => fetchProduct(product.id))).then((responses) => {
                setProductList(responses);
            });

            let c = 0;
            cl.forEach(({quantity}) => (c += quantity));
            setBadge(c);
        }
        setIsLogin(token ? true : false);
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
        if (typeof document !== "undefined") {
            navbar = document.getElementById("header-main-bar");
            setOffsetTop(navbar.offsetTop);
        }
    });

    useEffect(() => {
        EventEmitter.subscribe("updateBadge", (event) => handleBadge(event));
        EventEmitter.subscribe("handleCart", (event) => setCartDrawerOpen(event));

        handleBadge();

        setPaddingTop(headerBar.current.clientHeight + 12);
    }, []);

    useEffect(() => {
        if (headerBar.current) {
            // if (headerBar.current.clientHeight < 35) {
            //   setNavTop(headerMainBar.current.clientHeight);
            // } else {
            //   setNavTop(headerMainBar.current.clientHeight);
            // }
            // setNavTop(44 + headerTopBar.current.clientHeight);

            if (headerBar.current.classList.contains("sticky")) {
                setNavTop(headerMainBar.current.clientHeight);
            } else {
                setNavTop(headerBar.current.clientHeight - headerBottomBar.current.clientHeight);
            }
        }
    }, [headerBar.current]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", handleScroll);
        }
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <React.Fragment>
            <header id="header-bar" className="container container-background" ref={headerBar}>
                {/* <Hidden smDown> */}
                <div id="header-top-bar" className="top-bar-container" ref={headerTopBar}>
                    <div className="top-left"/>
                    <div className="top-center">
                        <p className="top-center-text">Sign up for newsletter and get 10% off your first order</p>
                    </div>
                    <div className="top-right">
                        <div className="header-widge">
                            <Button size="small" startIcon={<FontAwesomeIcon icon={faPhoneAlt} color="white"/>} href="tel:+19495228111" disableRipple>
                                1.949.751.1070
                            </Button>
                        </div>
                        <div className="header-widge tools-element">
                            <Button href="/my-account" disableRipple>
                                {isLogin ? "My Account" : "Login/Register"}
                            </Button>
                        </div>
                    </div>
                </div>
                {/* </Hidden> */}
                <div id="header-main-bar" className="main-bar-container" ref={headerMainBar}>
                    <div className="main-left">
                        <div className="widget-wrap">
                            <Button startIcon={<img src="/images/icon/logo_dark.png" height={36} width={36}/>} href="/" disableRipple>
                                Westshade
                            </Button>
                        </div>
                    </div>
                    <div className="main-center">
                        <div className="header-nav">
                            <ul>
                                <li className="menu-item" onMouseEnter={(e) => setStyle1({visibility: "visible"})} onMouseLeave={(e) => setStyle1({visibility: "hidden"})}>
                                    <Link href="/canopy-tent">
                                        <span>Canopy Tent</span>
                                    </Link>
                                    <DropMenu
                                        top={sectionNavTop}
                                        style={style1}
                                        menuImage="/images/component/header/canopy-tent.jpg"
                                        menuList={[
                                            {label: "CANOPY TENT"},
                                            {label: "Y5 Economic", type: "link", url: "/y5-economic"},
                                            {label: "Y6 Commercial", type: "link", url: "/y6-commercial"},
                                            {label: "Y7 Heavy Duty", type: "link", url: "/y7-heavy-duty"},
                                            {
                                                label: "Shop by Size",
                                                type: "menu",
                                                menuImage: "/images/component/header/canopy-tent.jpg",
                                                menuList: [
                                                    {label: "Canopy Size"},
                                                    {label: "10x10 Canopy Tent", type: "link", url: "/10x10-canopy-tent"},
                                                    {label: "10x15 Canopy Tent", type: "link", url: "/10x15-canopy-tent"},
                                                    {label: "10x20 Canopy Tent", type: "link", url: "/10x20-canopy-tent"},
                                                    {label: "16x16 Canopy Tent", type: "link", url: "/16x16-canopy-tent"},
                                                    {label: "13x13 Canopy Tent", type: "link", url: "/13x13-canopy-tent"},
                                                    {label: "13x20 Canopy Tent", type: "link", url: "/13x20-canopy-tent"},
                                                    {label: "13x26 Canopy Tent", type: "link", url: "/13x26-canopy-tent"},
                                                    {label: "20x20 Canopy Tent", type: "link", url: "/20x20-canopy-tent"},
                                                ],
                                            },
                                        ]}
                                        buttonGroup={
                                            <Box className="menu-item-grid-item-buttom-group h-unset">
                                                <Button variant="contained" className="menu-item-grid-item-buttom" href="/canopy-tent">
                                                    Shop All Canopy Tent
                                                </Button>
                                                <Link
                                                    href="/compare"
                                                    style={{
                                                        display: "block",
                                                        color: "black",
                                                        textDecoration: "underline",
                                                    }}
                                                >
                                                    Compare Canopy Tent
                                                </Link>
                                            </Box>
                                        }
                                    />
                                </li>
                                <li className="menu-item" onMouseEnter={(e) => setStyle2({visibility: "visible"})} onMouseLeave={(e) => setStyle2({visibility: "hidden"})}>
                                    <Link href="/custom-printing">
                                        <span>Custom Printing</span>
                                    </Link>
                                    <DropMenu
                                        top={sectionNavTop}
                                        style={style2}
                                        menuImage="/images/component/header/custom-printing-05212021.jpg"
                                        menuList={[
                                            {label: "CUSTOM PRINTING"},
                                            {
                                                label: "Custom Print Canopy Tent",
                                                type: "menu",
                                                menuImage: "/images/component/header/custom-printing.jpg",
                                                menuList: [
                                                    {label: "Canopy Size"},
                                                    {label: "10x10", type: "link", url: "/custom-printed-package/f1010cpp"},
                                                    {label: "10x15", type: "link", url: "/custom-printed-package/f1015cpp"},
                                                    {label: "10x20", type: "link", url: "/custom-printed-package/f1020cpp"},
                                                    {label: "16x16", type: "link", url: "/custom-printed-package/f1616cpp"},
                                                    {label: "13x13", type: "link", url: "/custom-printed-package/f1313cpp"},
                                                    {label: "13x20", type: "link", url: "/custom-printed-package/f1320cpp"},
                                                    {label: "13x26", type: "link", url: "/custom-printed-package/f1326cpp"},
                                                    {label: "20x20", type: "link", url: "/custom-printed-package/f2020cpp"},
                                                ],
                                            },
                                            {label: "Custom Print Umbrella", type: "link", url: "/custom-printing-umbrella"},
                                            {
                                                label: "Custom Print Table Cover",
                                                type: "menu",
                                                menuImage: "/images/component/header/table-cover.png",
                                                menuList: [
                                                    {label: "Table Cover"},
                                                    {label: "Fitted Table Cover", type: "link", url: "/custom-print/table-cover/fitted-table-cover"},
                                                    {label: "Stretch Table Cover", type: "link", url: "/custom-print/table-cover/stretch-table-cover"},
                                                ],
                                            },
                                        ]}
                                        buttonGroup={
                                            <Box className="menu-item-grid-item-buttom-group h-unset">
                                                <Button variant="contained" className="menu-item-grid-item-buttom" href="/custom-printing">
                                                    See How Custom Printing Works
                                                </Button>
                                            </Box>
                                        }
                                    />
                                </li>
                                <li className="menu-item" onMouseEnter={(e) => setStyle3({visibility: "visible"})} onMouseLeave={(e) => setStyle3({visibility: "hidden"})}>
                                    <Link href="/market-umbrellas" underline="none">
                                        <span>{"Market Umbrella"}</span>
                                    </Link>
                                    <DropMenu
                                        top={sectionNavTop}
                                        style={style3}
                                        menuImage="/images/component/header/market-umbrella.jpg"
                                        menuList={[
                                            {label: "MARKET UMBRELLA"},
                                            {label: "Marco", type: "link", url: "/products/market-umbrellas/marco-umbrella"},
                                            {label: "Santorini Aluminum", type: "link", url: "/products/market-umbrellas/santorini-aluminum-umbrella"},
                                            {label: "Santorini Fiberglass", type: "link", url: "/products/market-umbrellas/santorini-fiberglass-umbrella"},
                                        ]}
                                        buttonGroup={
                                            <Box className="menu-item-grid-item-buttom-group h-unset">
                                                <Button variant="contained" className="menu-item-grid-item-buttom" href="/market-umbrellas">
                                                    Shop All Market Umbrella
                                                </Button>
                                                <Link
                                                    href="/compare-market-umbrella"
                                                    style={{
                                                        display: "block",
                                                        color: "black",
                                                        textDecoration: "underline",
                                                    }}
                                                >
                                                    Compare Market Umbrella
                                                </Link>
                                            </Box>
                                        }
                                    />
                                </li>
                                <li className="menu-item" onMouseEnter={(e) => setStyle4({visibility: "visible"})} onMouseLeave={(e) => setStyle4({visibility: "hidden"})}>
                                    <Link href="/tilt-umbrellas" underline="none">
                                        <span>{"Tilt Umbrella"}</span>
                                    </Link>
                                    <DropMenu
                                        top={sectionNavTop}
                                        style={style4}
                                        menuImage="/images/component/header/tilt-umbrella.jpg"
                                        menuList={[{label: "TILT UMBRELLA"}, {label: "Bail", type: "link", url: "/products/tilt-umbrellas/bali-crank-lift-patio-umbrella"}]}
                                        buttonGroup={
                                            <Box className="menu-item-grid-item-buttom-group h-unset">
                                                <Button variant="contained" className="menu-item-grid-item-buttom" href="/tilt-umbrellas">
                                                    Shop All Tilt Umbrella
                                                </Button>
                                                <Link
                                                    href="/compare-tilt-umbrella"
                                                    style={{
                                                        display: "block",
                                                        color: "black",
                                                        textDecoration: "underline",
                                                    }}
                                                >
                                                    Compare Tilt Umbrella
                                                </Link>
                                            </Box>
                                        }
                                    />
                                </li>
                                <li className="menu-item" onMouseEnter={(e) => setStyle5({visibility: "visible"})} onMouseLeave={(e) => setStyle5({visibility: "hidden"})}>
                                    <Link href="/cantilever-umbrellas" underline="none">
                                        <span>{"Cantilever Umbrella"}</span>
                                    </Link>
                                    <DropMenu
                                        top={sectionNavTop}
                                        style={style5}
                                        menuImage="/images/component/header/cantilever-umbrella.jpg"
                                        menuList={[{label: "CANTILEVER UMBRELLA"}, {label: "Catalina", type: "link", url: "/products/cantilever-umbrellas/catalina-umbrella"}]}
                                        buttonGroup={
                                            <Box className="menu-item-grid-item-buttom-group h-unset">
                                                <Button variant="contained" className="menu-item-grid-item-buttom" href="/cantilever-umbrellas">
                                                    Shop All Cantilever Umbrella
                                                </Button>
                                            </Box>
                                        }
                                    />
                                </li>
                                <li className="menu-item" onMouseEnter={(e) => setStyle6({visibility: "visible"})} onMouseLeave={(e) => setStyle6({visibility: "hidden"})}>
                                    <span style={{color: "white"}}>{"Inflatable Canopy"}</span>
                                    <DropMenu
                                        top={sectionNavTop}
                                        style={style6}
                                        menuImage="/images/component/header/inflatable-canopy.jpg"
                                        menuList={[
                                            {label: "INFLATABLE CANOPY"},
                                            {label: "Basic Inflatable Canopy Tent", type: "link", url: "/products/inflatable-canopy-tent/basic-inflatable-canopy-tent"},
                                            {label: "Plus Inflatable Canopy Tent", type: "link", url: "/products/inflatable-canopy-tent/plus-inflatable-canopy-tent"},
                                            {label: "Extended Inflatable Canopy Tent", type: "link", url: "/products/inflatable-canopy-tent/extended-inflatable-canopy-tent"},
                                            {label: "Hexagon Inflatable Canopy Tent", type: "link", url: "/products/inflatable-canopy-tent/hexagon-inflatable-canopy-tent"},
                                            {label: "Triangular Inflatable Canopy Tent", type: "link", url: "/products/inflatable-canopy-tent/triangular-inflatable-canopy-tent"},
                                            {label: "Star Inflatable Canopy Tent", type: "link", url: "/products/inflatable-canopy-tent/star-inflatable-canopy-tent"},
                                        ]}
                                    />
                                </li>
                                <li className="menu-item">
                                    <Link href="/accessories" underline="none">
                                        <span>{"Accessories"}</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="main-right">
                        <Button
                            classes={{root: styles["menuButton_right"], label: styles["menuButton_right_label"], endIcon: styles["menuButton_right_end"]}}
                            endIcon={
                                <Badge badgeContent={badge} color="primary" classes={{anchorOriginTopRightRectangular: styles["root-badge"]}} overlap="rectangular">
                                    <ShoppingCartIcon color="inherit" style={{color: "white"}}/>
                                </Badge>
                            }
                            onClick={() => router.push("/cart")}
                            disableRipple
                        />
                    </div>
                </div>
                <div style={{position: "relative"}}/>
                <Box id="header-bottom-bar" className="main-bottom" boxShadow={3} ref={headerBottomBar}>
                    <div className="main-bottom-text">
                        We’ll beat any competitor with same quality product by 10% OFF | Get your <strong>LOWEST PRICE GUARANTEE</strong> by Call <strong>949-751-1070</strong> | Free U.S Nationwide Shipping on order
                        over <strong>$149*</strong>
                    </div>
                </Box>
            </header>
            <Drawer classes={{paper: "root-drawerpaper"}} anchor="right" open={cartDrawerOpen} onOpen={() => {
            }} onClose={handleCartDrawer(false)}>
                <div style={{flex: 1}}>
                    <div className="root-drawer-header" style={{paddingTop: paddingTop}}>
                        <Typography variant="h5" classes={{h5: "information-title"}}>
                            Shopping Cart
                        </Typography>
                        <IconButton color="inherit" component="span" style={{padding: 2, marginLeft: "auto"}} onClick={handleCartDrawer(false)}>
                            <CloseIcon style={{fontSize: 24}}/>
                        </IconButton>
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
                </div>
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
                    {"View Cart"}
                </Button>
                {/* <Button variant="contained" classes={{ contained: "root-product-cart-checkout" }} color="inherit" onClick={() => {}} disableElevation disableRipple>
					{"CHECKOUT"}
				</Button> */}
            </Drawer>
        </React.Fragment>
    );
}
