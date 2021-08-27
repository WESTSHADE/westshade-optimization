import React, {useEffect, useState} from "react";
import clsx from "clsx";

import {useRouter} from "next/router";

import {AppBar, Badge, Drawer, Button, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography, Toolbar, Link, Collapse} from "@material-ui/core";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {makeStyles, useTheme} from "@material-ui/core/styles";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faAlignJustify, faChevronRight, faChevronDown,} from "@fortawesome/free-solid-svg-icons";

import styles from "./header.module.css";

import Utils from "../../utils/utils";

const utils = new Utils();

const drawerWidth = "auto";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        backgroundColor: "#333333",
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton_left: {
        marginRight: theme.spacing(2),
    },
    menuButton_right: {
        minWidth: "unset",
        padding: 0,
        marginLeft: theme.spacing(2),
    },
    menuButton_right_label: {
        justifyContent: "flex-end"
    },
    menuButton_right_end: {
        marginLeft: 10
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "black",
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

function MenuList(props) {
    const {index, name, url, list, open} = props;

    const [openList, setOpenList] = React.useState(open);

    const router = useRouter();
    const handleOpenList = () => setOpenList(!openList);
    const handleRouterGo = (url) => router.push(url);

    return (
        <List key={index} style={{position: "relative"}}>
            <ListItem
                button
                style={{paddingTop: 2, paddingBottom: 2, paddingRight: 48}}
                onClick={() =>
                    list ? handleOpenList() : url ? handleRouterGo(url) : null
                }
            >
                {url ? (
                    <Link href={url}>
                        <ListItemText
                            primary={name}
                            style={{color: "white", letterSpacing: 0}}
                        />
                    </Link>
                ) : (
                    <ListItemText
                        primary={name}
                        style={{color: "white", letterSpacing: 0}}
                    />
                )}
                {list ? (
                    <ListItemIcon style={{justifyContent: "flex-end"}}>
                        <FontAwesomeIcon icon={faChevronDown} color="white"/>
                    </ListItemIcon>
                ) : null}
            </ListItem>
            {list ? (
                <Collapse
                    style={{marginLeft: 24}}
                    in={openList}
                    timeout="auto"
                    unmountOnExit
                >
                    {list.map((item, i) => (
                        <MenuList key={i} index={i} {...item} />
                    ))}
                </Collapse>
            ) : null}
        </List>
    );
}

export default function HeaderDrawerLeft() {
    const router = useRouter();

    const classes = useStyles();
    const theme = useTheme();

    const [badge, setBadge] = useState(0);
    const [open, setOpen] = React.useState(false);

    const fetchUserInfo = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            return await utils.getUser(token);
        } else {
            return;
        }
    };

    const handleDrawer = () => setOpen(!open);

    const Menu = [
        {
            name: "Canopy Tent",
            url: "/canopy-tent",
            list: [
                {name: "Y5 Economic", url: "/y5-economic"},
                {name: "Y6 Commercial", url: "/y6-commercial"},
                {name: "Y7 Heavy Duty", url: "/y7-heavy-duty"},
                {
                    name: "Shop by Size",
                    list: [
                        {name: "10x10 Canopy Tent", url: "/10x10-canopy-tent"},
                        {name: "10x15 Canopy Tent", url: "/10x15-canopy-tent"},
                        {name: "10x20 Canopy Tent", url: "/10x20-canopy-tent"},
                        {name: "13x13 Canopy Tent", url: "/13x13-canopy-tent"},
                        {name: "13x20 Canopy Tent", url: "/13x20-canopy-tent"},
                        {name: "13x26 Canopy Tent", url: "/13x26-canopy-tent"},
                        {name: "16x16 Canopy Tent", url: "/16x16-canopy-tent"},
                        {name: "20x20 Canopy Tent", url: "/20x20-canopy-tent"},
                    ],
                    open: false,
                },
            ],
            open: false,
        },
        {
            name: "Custom Printing",
            list: [
                {
                    name: "Custom Print Canopy Tent",
                    list: [
                        {
                            name: "10 x 10",
                            url: "/custom-printed-package/f1010cpp",
                        },
                        {
                            name: "10 x 15",
                            url: "/custom-printed-package/f1015cpp",
                        },
                        {
                            name: "10 x 20",
                            url: "/custom-printed-package/f1020cpp",
                        },
                        {
                            name: "13 x 13",
                            url: "/custom-printed-package/f1313cpp",
                        },
                        {
                            name: "13 x 20",
                            url: "/custom-printed-package/f1320cpp",
                        },
                        {
                            name: "13 x 26",
                            url: "/custom-printed-package/f1326cpp",
                        },
                        {
                            name: "16 x 16",
                            url: "/custom-printed-package/f1616cpp",
                        },
                        {
                            name: "20 x 20",
                            url: "/custom-printed-package/f2020cpp",
                        },
                    ],
                },
                {
                    name: "Custom Print Umbrella",
                    url: "custom-printing-umbrella",
                },
                {
                    name: "Custom Print Table Cover",
                    list: [
                        {
                            name: "Fitted Table Cover",
                            url: "/custom-print/table-cover/fitted-table-cover",
                        },
                        {
                            name: "Stretch Table Cover",
                            url: "/custom-print/table-cover/stretch-table-cover",
                        },
                    ],
                },
            ],
        },
        {
            name: "Market Umbrella",
            url: "/market-umbrellas",
            list: [
                {name: "Marco", url: "/products/market-umbrellas/marco-umbrella"},
                {name: "Santorini Aluminum", url: "/products/market-umbrellas/santorini-aluminum-umbrella"},
                {name: "Santorini Fiberglass", url: "/products/market-umbrellas/santorini-fiberglass-umbrella"},
            ],
        },
        {
            name: "Tilt Umbrella",
            url: "/tilt-umbrellas",
            list: [{name: "Bali", url: "/products/tilt-umbrellas/bali-crank-lift-patio-umbrella"}],
        },
        {
            name: "Cantilever Umbrella",
            url: "/cantilever-umbrellas",
            list: [{name: "Catalina", url: "/products/cantilever-umbrellas/catalina-umbrella"}],
        },
        {
            name: "Inflatable Canopy",
            list: [
                {name: "Basic Tent", url: "/products/inflatable-canopy-tent/basic-inflatable-canopy-tent",},
                {name: "Plus Tent", url: "/products/inflatable-canopy-tent/plus-inflatable-canopy-tent"},
                {name: "Extended Tent", url: "/products/inflatable-canopy-tent/extended-inflatable-canopy-tent",},
                {name: "Hexagon Tent", url: "/products/inflatable-canopy-tent/hexagon-inflatable-canopy-tent",},
                {name: "Triangular Tent", url: "/products/inflatable-canopy-tent/triangular-inflatable-canopy-tent",},
                {name: "Star Tent", url: "/products/inflatable-canopy-tent/star-inflatable-canopy-tent"},
            ],
        },
        {
            name: "Accessories",
            url: "/accessories",
        },
        {
            name: "About Us",
            url: "/about-us",
        },
    ];

    const handleBadge = () => {
        const token = localStorage.getItem('token');
        let cl;

        if (token) {
            fetchUserInfo().then(({meta_data}) => {
                let result = meta_data.filter(data => data.key === "cart");
                if (result.length > 0) {
                    cl = cl.concat([...result[0].value]);
                }
            });
        } else {
            let cart = localStorage.getItem('cart');
            cart = cart ? JSON.parse(cart) : cart;

            if (cart && Array.isArray(cart)) {
                cl = [...cart];
            } else {
                cl = [];
            }
        }
        setBadge(cl.length);
    };

    useEffect(() => {
        // if (typeof window !== "undefined") {
        //     window.addEventListener('updateBadge', handleBadge);
        // }
        // return () => window.removeEventListener('updateBadge', handleBadge);

        handleBadge();
    }, [])

    return (
        <div>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawer}
                        edge="start"
                        className={clsx(classes.menuButton_left, open && classes.hide)}
                    >
                        <FontAwesomeIcon icon={faAlignJustify} color="white"/>
                    </IconButton>
                    <Button
                        classes={{root: styles["root-button-title"]}}
                        startIcon={<img src="/images/logo_dark.png" height={36} width={36}/>}
                        href="/"
                        disableRipple
                    >
                        <Typography variant="inherit" style={{color: "white", whiteSpace: "nowrap"}}>
                            Westshade
                        </Typography>
                    </Button>
                    <Button
                        classes={{root: classes["menuButton_right"], label: classes["menuButton_right_label"], endIcon: styles["menuButton_right_end"]}}
                        endIcon={
                            <Badge badgeContent={badge} color="primary" classes={{anchorOriginTopRightRectangular: styles["root-badge"]}}>
                                <ShoppingCartIcon color="inherit" style={{color: "white"}}/>
                            </Badge>
                        }
                        onClick={() => router.push("/cart")}
                        disableRipple
                    />
                </Toolbar>
            </AppBar>
            <Drawer className={classes.drawer} classes={{paper: classes.drawerPaper}} variant="persistent" anchor="left" open={open}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawer}>
                        {theme.direction === "ltr" ? (
                            <FontAwesomeIcon icon={faChevronLeft} color="white"/>
                        ) : (
                            <FontAwesomeIcon icon={faChevronRight} color="white"/>
                        )}
                    </IconButton>
                </div>
                <Divider style={{backgroundColor: "white"}}/>
                {Menu.map((item, index) => (
                    <MenuList key={index} index={index} {...item} />
                ))}
            </Drawer>
        </div>
    );
}
