import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Hidden,
  Link,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

let navbar = null;

function DropMenuSecondary(props) {
  return (
    <Box
      className="dropdown-secondury dropdown-menu-secondury"
      style={{ left: "100%", ...props.style }}
      mx="auto"
    >
      <Grid container alignItems="center">
        <Grid item className="menu-item-grid-item">
          {props.menuListSecondary && props.menuListSecondary.length > 0 ? (
            <Typography
              className="menu-item-list-item-text"
              style={{ paddingLeft: "16px" }}
            >
              <span>{props.menuListSecondary[0].label}</span>
            </Typography>
          ) : null}
          <List
            style={{
              columnCount: props.menuListSecondary.length > 4 ? "2" : "1",
            }}
          >
            {props.menuListSecondary &&
              props.menuListSecondary.map((item, index) => {
                if (index !== 0) {
                  if (item.type === "link") {
                    return (
                      <ListItem
                        key={index}
                        button
                        component="a"
                        className="menu-item-list-item"
                        href={item.url}
                      >
                        <ListItemText
                          className="menu-item-list-item-text"
                          secondary={item.label}
                        />
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
              <Image
                layout="fill"
                objectFit="contain"
                quality={100}
                src={props.menuImage}
              />
            </div>
          </Grid>
        </Hidden>
      </Grid>
    </Box>
  );
}

function DropMenu(props) {
  // const [offsetLeft, setOffsetLeft] = useState(0);
  // const leftGrid = useRef(null);

  // useEffect(() => {
  //   if (leftGrid.current && leftGrid.current.clientWidth) {
  //     setOffsetLeft(leftGrid.current.clientWidth);
  //   }
  // }, [leftGrid.current]);

  return (
    <Box
      className="dropdown dropdown-menu"
      style={{ top: props.top, ...props.style }}
      mx="auto"
    >
      <Container maxWidth="md">
        <Grid container alignItems="center">
          <Grid
            container
            item
            xs={6}
            direction="column"
            justify="space-between"
            className="menu-item-grid-item"
            // ref={leftGrid}
          >
            <List>
              {props.menuList.map((item, index) => {
                if (index === 0) {
                  return (
                    <ListItem key={index} className="menu-item-list-item">
                      <ListItemText
                        className="menu-item-list-item-text"
                        primary={item.label}
                      />
                    </ListItem>
                  );
                } else {
                  if (item.type === "link") {
                    return (
                      <ListItem
                        key={index}
                        button
                        component="a"
                        className="menu-item-list-item"
                        href={item.url}
                      >
                        <ListItemText
                          className="menu-item-list-item-text"
                          secondary={item.label}
                        />
                      </ListItem>
                    );
                  } else if (item.type === "menu") {
                    const [style, setStyle] = useState({
                      visibility: "hidden",
                    });

                    return (
                      <ListItem
                        key={index}
                        className="menu-item-list-item"
                        onMouseEnter={(e) =>
                          setStyle({ visibility: "visible" })
                        }
                        onMouseLeave={(e) => setStyle({ visibility: "hidden" })}
                      >
                        <ListItemText
                          className="menu-item-list-item-text"
                          secondary={item.label}
                        />
                        <DropMenuSecondary
                          style={style}
                          menuImage={item.menuImage}
                          menuListSecondary={item.menuList}
                        />
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
              <Image layout="fill" src={props.menuImage} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default function Header() {
  const router = useRouter();
  const [sectionNavTop, setNavTop] = useState(0);
  const [offsetTop, setOffsetTop] = useState(0);
  const [style1, setStyle1] = useState({ visibility: "hidden" });
  const [style2, setStyle2] = useState({ visibility: "hidden" });
  const [style3, setStyle3] = useState({ visibility: "hidden" });
  const [style4, setStyle4] = useState({ visibility: "hidden" });
  const [style5, setStyle5] = useState({ visibility: "hidden" });
  const [style6, setStyle6] = useState({ visibility: "hidden" });

  useEffect(() => {
    if (typeof document !== "undefined") {
      navbar = document.getElementById("header-main-bar");
      setOffsetTop(navbar.offsetTop);
    }
  });

  const headerBar = useRef(null);
  const headerTopBar = useRef(null);
  const headerMainBar = useRef(null);
  const headerBottomBar = useRef(null);

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
        setNavTop(
          headerBar.current.clientHeight - headerBottomBar.current.clientHeight
        );
      }
    }
  }, [headerBar.current]);

  const handleScroll = (x) => {
    if (window.pageYOffset > offsetTop) {
      headerBar.current.classList.add("sticky");
      // headerBottomBar.current.classList.add("sticky");
      setNavTop(headerMainBar.current.clientHeight);
    } else {
      headerBar.current.classList.remove("sticky");
      // headerBottomBar.current.classList.remove("sticky");
      setNavTop(
        headerBar.current.clientHeight - headerBottomBar.current.clientHeight
      );
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header id="header-bar" className="container" ref={headerBar}>
      <Hidden smDown>
        <div
          id="header-top-bar"
          className="top-bar-container"
          ref={headerTopBar}
        >
          <div className="top-left" />
          <div className="top-center">
            <p className="top-center-text">
              Sign up for newsletter and get 10% off your first order
            </p>
          </div>
          <div className="top-right">
            <div className="header-widge">
              <Button
                size="small"
                startIcon={<FontAwesomeIcon icon={faPhoneAlt} color="white" />}
                href="tel:+19495228111"
                disableRipple
              >
                1.949.522.8111
              </Button>
            </div>
            <div className="header-widge tools-element">
              <Button href="/" disableRipple>
                Login/Register
              </Button>
            </div>
          </div>
        </div>
      </Hidden>
      <div
        id="header-main-bar"
        className="main-bar-container"
        ref={headerMainBar}
      >
        <div className="main-left">
          <div className="widget-wrap">
            <Button
              startIcon={<Image src="/logo_dark.png" height={36} width={36} />}
              href="/"
              disableRipple
            >
              Westshades
            </Button>
          </div>
        </div>
        <div className="main-center">
          <div className="header-nav">
            <ul>
              <li
                className="menu-item"
                onMouseEnter={(e) => setStyle1({ visibility: "visible" })}
                onMouseLeave={(e) => setStyle1({ visibility: "hidden" })}
              >
                <Link href="/canopy-tent">
                  <span>Canopy Tent</span>
                </Link>
                <DropMenu
                  top={sectionNavTop}
                  style={style1}
                  menuImage="/component/header/canopy-tent.jpg"
                  menuList={[
                    { label: "CANOPY TENT" },
                    { label: "Y5 Economic", type: "link", url: "/y5-overview" },
                    {
                      label: "Y6 Commercial",
                      type: "link",
                      url: "/y6-overview",
                    },
                    {
                      label: "Y7 Heavy Duty",
                      type: "link",
                      url: "/y7-overview",
                    },
                    {
                      label: "Shop by Size",
                      type: "menu",
                      menuImage: "/component/header/canopy-tent.jpg",
                      menuList: [
                        { label: "Canopy Size" },
                        {
                          label: "10x10 Canopy Tent",
                          type: "link",
                          url: "/10x10-canopy-tent",
                        },
                        {
                          label: "10x15 Canopy Tent",
                          type: "link",
                          url: "/10x15-canopy-tent",
                        },
                        {
                          label: "10x20 Canopy Tent",
                          type: "link",
                          url: "/10x20-canopy-tent",
                        },
                        {
                          label: "16x16 Canopy Tent",
                          type: "link",
                          url: "/16x16-canopy-tent",
                        },
                        {
                          label: "13x13 Canopy Tent",
                          type: "link",
                          url: "/13x13-canopy-tent",
                        },
                        {
                          label: "13x20 Canopy Tent",
                          type: "link",
                          url: "/13x20-canopy-tent",
                        },
                        {
                          label: "13x26 Canopy Tent",
                          type: "link",
                          url: "/13x26-canopy-tent",
                        },
                        {
                          label: "20x20 Canopy Tent",
                          type: "link",
                          url: "/20x20-canopy-tent",
                        },
                      ],
                    },
                  ]}
                  buttonGroup={
                    <Box className="menu-item-grid-item-buttom-group h-unset">
                      <Button
                        variant="contained"
                        className="menu-item-grid-item-buttom"
                        href="/canopy-tent"
                      >
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
              <li
                className="menu-item"
                onMouseEnter={(e) => setStyle2({ visibility: "visible" })}
                onMouseLeave={(e) => setStyle2({ visibility: "hidden" })}
              >
                <Link href="/custom-printing">
                  <span>Custom Printing</span>
                </Link>
                <DropMenu
                  top={sectionNavTop}
                  style={style2}
                  menuImage="/component/header/custom-printing-05212021.jpg"
                  menuList={[
                    { label: "CUSTOM PRINTING" },
                    {
                      label: "Custom Print Canopy Tent",
                      type: "menu",
                      menuImage: "/component/header/custom-printing.jpg",
                      menuList: [
                        { label: "Canopy Size" },
                        {
                          label: "10x10",
                          type: "link",
                          url: "/10x10-canopy-tent",
                        },
                        {
                          label: "10x15",
                          type: "link",
                          url: "/10x15-canopy-tent",
                        },
                        {
                          label: "10x20",
                          type: "link",
                          url: "/10x20-canopy-tent",
                        },
                        {
                          label: "16x16",
                          type: "link",
                          url: "/16x16-canopy-tent",
                        },
                        {
                          label: "13x13",
                          type: "link",
                          url: "/13x13-canopy-tent",
                        },
                        {
                          label: "13x20",
                          type: "link",
                          url: "/13x20-canopy-tent",
                        },
                        {
                          label: "13x26",
                          type: "link",
                          url: "/13x26-canopy-tent",
                        },
                        {
                          label: "20x20",
                          type: "link",
                          url: "/20x20-canopy-tent",
                        },
                      ],
                    },
                    {
                      label: "Custom Print Umbrella",
                      type: "link",
                      url: "/custom-printing-umbrella",
                    },
                    {
                      label: "Custom Print Table Cover",
                      type: "menu",
                      menuImage: "/component/header/table-cover.png",
                      menuList: [
                        { label: "Table Cover" },
                        {
                          label: "Fitted Table Cover",
                          type: "link",
                          url: "/10x10-canopy-tent",
                        },
                        {
                          label: "Stretch Table Cover",
                          type: "link",
                          url: "/10x15-canopy-tent",
                        },
                      ],
                    },
                  ]}
                  buttonGroup={
                    <Box className="menu-item-grid-item-buttom-group h-unset">
                      <Button
                        variant="contained"
                        className="menu-item-grid-item-buttom"
                        href="/canopy-tent"
                      >
                        See How Custom Printing Works
                      </Button>
                    </Box>
                  }
                />
              </li>
              <li
                className="menu-item"
                onMouseEnter={(e) => setStyle3({ visibility: "visible" })}
                onMouseLeave={(e) => setStyle3({ visibility: "hidden" })}
              >
                <Link href="/market-umbrellas" underline="none">
                  <span>{"Market Umbrella"}</span>
                </Link>
                <DropMenu
                  top={sectionNavTop}
                  style={style3}
                  menuImage="/component/header/market-umbrella.jpg"
                  menuList={[
                    { label: "MARKET UMBRELLA" },
                    { label: "Marco", type: "link", url: "/" },
                    { label: "Santorini Aluminum", type: "link", url: "/" },
                    { label: "Santorini Fiberglass", type: "link", url: "/" },
                  ]}
                  buttonGroup={
                    <Box className="menu-item-grid-item-buttom-group h-unset">
                      <Button
                        variant="contained"
                        className="menu-item-grid-item-buttom"
                        href="/market-umbrellas"
                      >
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
              <li
                className="menu-item"
                onMouseEnter={(e) => setStyle4({ visibility: "visible" })}
                onMouseLeave={(e) => setStyle4({ visibility: "hidden" })}
              >
                <Link href="/tilt-umbrellas" underline="none">
                  <span>{"Tilt Umbrella"}</span>
                </Link>
                <DropMenu
                  top={sectionNavTop}
                  style={style4}
                  menuImage="/component/header/tilt-umbrella.jpg"
                  menuList={[
                    { label: "TILT UMBRELLA" },
                    { label: "Bail", type: "link", url: "/" },
                  ]}
                  buttonGroup={
                    <Box className="menu-item-grid-item-buttom-group h-unset">
                      <Button
                        variant="contained"
                        className="menu-item-grid-item-buttom"
                        href="/tilt-umbrellas"
                      >
                        Shop All Tlit Umbrella
                      </Button>
                      <Link
                        href="/compare-tilt-umbrella"
                        style={{
                          display: "block",
                          color: "black",
                          textDecoration: "underline",
                        }}
                      >
                        Compare Tlit Umbrella
                      </Link>
                    </Box>
                  }
                />
              </li>
              <li
                className="menu-item"
                onMouseEnter={(e) => setStyle5({ visibility: "visible" })}
                onMouseLeave={(e) => setStyle5({ visibility: "hidden" })}
              >
                <Link href="/cantilever-umbrellas" underline="none">
                  <span>{"Cantilever Umbrella"}</span>
                </Link>
                <DropMenu
                  top={sectionNavTop}
                  style={style5}
                  menuImage="/component/header/cantilever-umbrella.jpg"
                  menuList={[
                    { label: "CANTILEVER UMBRELLA" },
                    { label: "Catalina", type: "link", url: "/" },
                  ]}
                  buttonGroup={
                    <Box className="menu-item-grid-item-buttom-group h-unset">
                      <Button
                        variant="contained"
                        className="menu-item-grid-item-buttom"
                        href="/cantilever-umbrellas"
                      >
                        Shop All Cantilever Umbrella
                      </Button>
                    </Box>
                  }
                />
              </li>
              <li
                className="menu-item"
                onMouseEnter={(e) => setStyle6({ visibility: "visible" })}
                onMouseLeave={(e) => setStyle6({ visibility: "hidden" })}
              >
                <Link href="/canopy-tent" underline="none">
                  <span>{"Inflatable Canopy"}</span>
                </Link>
                <DropMenu
                  top={sectionNavTop}
                  style={style6}
                  menuImage="/component/header/inflatable-canopy.jpg"
                  menuList={[
                    { label: "INFLATABLE CANOPY" },
                    {
                      label: "Basic Inflatable Canopy Tent",
                      type: "link",
                      url: "/",
                    },
                    {
                      label: "Plus Inflatable Canopy Tent",
                      type: "link",
                      url: "/",
                    },
                    {
                      label: "Extended Inflatable Canopy Tent",
                      type: "link",
                      url: "/",
                    },
                    {
                      label: "Hexagon Inflatable Canopy Tent",
                      type: "link",
                      url: "/",
                    },
                    {
                      label: "Triangular Inflatable Canopy Tent",
                      type: "link",
                      url: "/",
                    },
                    {
                      label: "Star Inflatable Canopy Tent",
                      type: "link",
                      url: "/",
                    },
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
        <div className="main-right" />
      </div>
      <div style={{ position: "relative" }} />
      <div
        id="header-bottom-bar"
        className="main-bottom"
        // style={{ top: offsetTop }}
        ref={headerBottomBar}
      >
        <span className="main-bottom-text">
          We’ll beat any competitor with same quality product by 10% OFF | Get
          your <strong>LOWEST PRICE GUARANTEE</strong> by Call{" "}
          <strong>949-522-8111</strong> | Free U.S Nationwide Shipping on order
          over <strong>$149*</strong>
        </span>
      </div>
    </header>
  );
}
