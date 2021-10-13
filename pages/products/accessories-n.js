import React, {useEffect, useState} from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import clsx from "clsx";

import {Block} from "baseui/block";
import {Button, SIZE, KIND, SHAPE} from "baseui/button";
import {ALIGN, Radio, RadioGroup} from "baseui/radio";
import {ListItem, ListItemLabel} from "baseui/list";
import {FILL, Tab, Tabs} from "baseui/tabs-motion";

import {Box, Breadcrumbs, Container, Grid, Typography} from "@material-ui/core";

import {withRouter} from "next/router";
import Head from "next/head";
import Link from "next/link";

import styles from "../../styles/Product.module.scss";

import {DateFn, NumberFn, StringFn, UrlFn} from "../../utils/tools";
import Utils from "../../utils/utils";
import {EventEmitter} from "../../utils/events";

import CBreadcrumbs from "../../components/breadcrumbs";
import CustomButton from "../../components/button";
import Checkout from "../../components/buttonGroup";
import Selections from "../../components/selection_group";

const dateFn = new DateFn();
const numberFn = new NumberFn();
const stringFn = new StringFn();
const urlFn = new UrlFn();
const utils = new Utils();

const id_product_wall = 26516;

const id_attribute_canopyColor = 3;
const id_attribute_canopySize = 4;
const id_attribute_wallType = 11;
const id_attribute_wallSize = 14;

function getProductName(text) {
    if (!text) return "";
    return text.replace(/plain/i, "");
}

let checkoutProductList = [];

function getProducts(components) {
    return Promise.all(components.map(({default_option_id}) => utils.getProductByWooId(default_option_id)));
}

function getVariants(components) {
    return Promise.all(components.map(({id}) => utils.getVariantByWooProductId(id)));
}

function Accessories({router, product, productComponent, productVariant}) {
    const [display, setDisplay] = useState(false);
    const [displayTabs, setDisplayTabs] = useState(false);
    const [activeKey, setActiveKey] = React.useState(0);

    const [uProduct, setProduct] = useState({...product});
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("");
    const [productImage, setProductImage] = useState([]);
    const [productImageGallery, setProductImageGallery] = useState([]);
    const [productImageGalleryTemp, setProductImageGalleryTemp] = useState([]);

    const [uProductComponent, setProductComponent] = useState([...productComponent]);
    const [uProductVariant, setProductVariant] = useState([...productVariant]);
    const [selectedAttribute, setSelectedAttribute] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState([]);

    const [initProductVariant, setInitProductVariant] = useState(false);
    const [initSelectedAttribute, setInitSelectedAttribute] = useState(false);

    const [totalRegularPrice, setTotalRegularPrice] = useState(0);
    const [totalSalePrice, setTotalSalePrice] = useState(0);
    const [totalCount, setTotalCount] = useState(1);

    const [message, setMessage] = useState("");

    const [availableToCheckout, setAvailable] = useState(false);

    const [showAddProgress, setShowAddProgress] = useState(false);
    const [shippedDay, setShippedDay] = useState("");

    ////////////////////////////////////////

    const [availableList, setAvailableList] = useState([{id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true}]);

    const [wallType, setWallType] = useState("");

    ////////////////////////////////////////

    function renderCustomImage(props) {
        return (
            <img className="image-gallery-image" src={props.original}/>
        );
    }

    const fetchProduct = async (id) => {
        if (!id) return;

        return await utils.getProductByWooId(id);
    };

    const fetchProductVariant = async (id) => {
        if (!id) return;

        return await utils.getVariantByWooProductId(id);
    };

    const setMainImage = (images) => {
        if (!images || images.length === 0) return;

        let i = [];
        images.map((img, index) => {
            let url = img.src;
            url = url.replace(/^http:\/\/54\.212\.246\.17/i, "https://checkout.westshade.com");
            i[index] = {
                original: url,
                thumbnail: url,
                thumbnailWidth: 60,
                thumbnailHeight: 60,
                originalClass: "originalClass",
                thumbnailClass: "thumbnailClass",
                originalAlt: img.name,
                thumbnailAlt: img.name,
            };
        });
        i[0].renderItem = renderCustomImage;
        setProductImageGallery(i);
    };

    const handleChangeRadio = (event, index, id) => {
        // Part 1: 更改选项List信息 并 保存
        let selection = [...selectedAttribute];
        selection[index].forEach((attribute) => {
            if (attribute.id === id) attribute.option = event.target.value;
        });
        // Part 2: 根据选项从VariantList中查找对应产品数据 并 保存
        let selectionVariant = [...selectedVariant];
        let selected = uProductVariant[index].filter((variant) => {
            if (!variant || !variant.attributes) return false;

            let equal = true;
            for (let i = 0; i < variant.attributes.length; i++) {
                if (selection[index][i].option.toLowerCase() !== variant.attributes[i].option.toLowerCase()) {
                    equal = false;
                    break;
                }
            }
            return equal;
        });
        selectionVariant[index] = selected[0];
        // Part 3: 保存更改项
        setSelectedAttribute(selection);
        setSelectedVariant(selectionVariant);
    };

    const checkProduct_getPrice = () => {
        let regularPrice = 0,
            salePrice = 0;

        let available = [...availableList];

        selectedVariant.forEach((variant, index) => {
            if ((!variant || !variant.attributes) && uProductComponent[index].type !== "simple") {
                available[index].status = false;
                return;
            }
            // 计算售价
            if (!variant.on_sale) {
                regularPrice += numberFn.strToFloat(variant.regular_price) * totalCount;
                salePrice += numberFn.strToFloat(variant.regular_price) * totalCount;
            } else {
                regularPrice += numberFn.strToFloat(variant.regular_price) * totalCount;
                salePrice += numberFn.strToFloat(variant.sale_price) * totalCount;
            }
            // 检查可用性
            if (variant.stock_status === "instock") {
                available[index] = {
                    id: variant.id,
                    status: true,
                    quantity: variant.stock_quantity,
                    needed: totalCount,
                    attribute: variant.attributes,
                    optional: false,
                };
            } else {
                available[index] = {
                    id: variant.id,
                    status: false,
                    quantity: 0,
                    needed: totalCount,
                    attribute: variant.attributes,
                    optional: false,
                };
            }
        });
        setAvailableList(available);

        setTotalRegularPrice(regularPrice);
        setTotalSalePrice(salePrice === regularPrice ? 0 : salePrice);
    };

    useEffect(async () => {
        if (uProduct.id) {
            setProductId(uProduct.id.toString());
        } else {
            setProductId(urlFn.getParam("id").toString());
            let p = await utils.getProductByWooId(id);
            setProduct(p);
        }
        setShippedDay(dateFn.getReceivedDay());

        if (router.query.type) {
            setWallType(router.query.type);
        } else {
            let type = urlFn.getParam("type");
            setWallType(type);
        }
    }, []);

    useEffect(() => {
        if (!uProduct) return;

        setProductName(uProduct.name);
        setProductType(uProduct.type);

        if (uProduct.hasOwnProperty("image")) {
            setMainImage([uProduct.image]);
        } else if (uProduct.hasOwnProperty("images")) {
            setMainImage(uProduct.images);
        }

        // 获取,保存各组件信息
        if (uProduct.type === "simple" || uProduct.type === "variable") {
            setProductComponent([{...uProduct}]);
        } else if (uProduct.type === "composite") {
            Promise.all(uProduct.composite_components.map(({default_option_id}) => fetchProduct(default_option_id))).then((responses) => setProductComponent(responses));
        }
    }, [uProduct]);

    useEffect(() => {
        if (!uProductComponent || uProductComponent.length === 0) return;
        if (uProduct.type === "simple") {
            setSelectedVariant(uProductComponent);

            // 获取,保存各组件变体产品信息
            // setProductVariant([uProductComponent]);
        } else if (uProduct.type === "variable") {
            let selectedAttrList = [];
            Promise.all(
                uProductComponent.map((component) => {
                    let defaultAttr = [...component.default_attributes];

                    if (component.id === id_product_wall) {
                        defaultAttr.forEach((attr) => (wallType && attr.id === id_attribute_wallType ? (attr.option = wallType) : null));
                    }
                    selectedAttrList.push(defaultAttr);

                    return fetchProductVariant(component.id);
                })
            ).then((result) => {
                setSelectedAttribute(selectedAttrList);
                setInitSelectedAttribute(true);

                // 获取,保存各组件变体产品信息
                setProductVariant(result);
                setTimeout(() => setInitProductVariant(true), 250);
            });
        }
    }, [uProductComponent]);

    useEffect(() => {
        if (!initSelectedAttribute || !initProductVariant) return;

        // 获取,保存各组件默认变体产品信息
        let selectedVariantList = [];
        selectedAttribute.forEach((attr, index) => {
            if (!attr) return;
            let selected = uProductVariant[index].filter((variant) => {
                if (!variant || !variant.attributes) return false;
                if (attr.length !== variant.attributes.length) return false;
                let equal = true;
                for (let i = 0; i < variant.attributes.length; i++) {
                    if (attr[i].option.toLowerCase() !== variant.attributes[i].option.toLowerCase()) {
                        equal = false;
                        break;
                    }
                }
                return equal;
            });
            selectedVariantList[index] = selected[0];
        });
        // 初始化数据
        setSelectedVariant(selectedVariantList);
    }, [initSelectedAttribute, initProductVariant]);

    useEffect(() => {
        // 已选各产品组成变体
        if (!selectedVariant || selectedVariant.length === 0) return;

        selectedVariant.forEach((variant, index) => {
            if (!variant || !variant.attributes) return;

            if (index === 0) {
                if (variant.hasOwnProperty("image")) {
                    setMainImage([variant.image]);
                } else if (variant.hasOwnProperty("images")) {
                    setMainImage(variant.images);
                }
            }
        });

        checkProduct_getPrice();
    }, [selectedVariant]);

    useEffect(() => {
        if (totalCount === 0) return;

        checkProduct_getPrice();
    }, [totalCount]);

    useEffect(() => {
        if (selectedVariant.length === 0) return;

        checkoutProductList = [];

        let available = true;

        availableList.forEach((item, index) => {
            if (!item || !available) return;
            // 没货 直接返回
            if (!item.status) {
                if (!item.optional) {
                    available = false;
                    setMessage("Insufficient stock → " + uProductComponent[index].name);
                    return;
                } else {
                    return;
                }
            }
            // 有货 判定是否有明细
            if (item.quantity) {
                // 有明细 计算需求供给
                if (item.needed > item.quantity) {
                    available = false;
                    setMessage("Insufficient stock → " + uProductComponent[index].name);
                    return;
                }
            }

            const i = checkoutProductList.findIndex(({id}) => id === item.id);
            if (i === -1) {
                const variation = item.attribute.map((attr) => ({
                    attribute: attr.name,
                    value: attr.option,
                }));

                checkoutProductList.push({
                    id: item.id,
                    quantity: item.needed,
                    variation: variation,
                });
            } else {
                let needed = checkoutProductList[i].quantity + item.needed;
                if (needed > item.quantity) {
                    checkoutProductList.splice(i, 1);
                    available = false;
                    setMessage("Insufficient stock → " + uProductComponent[index].name);
                    return;
                } else {
                    checkoutProductList[i].quantity = needed;
                }
            }
            setMessage("");
        });
        setAvailable(available);
    }, [availableList]);

    const updateCart = async () => {
        const token = localStorage.getItem("token");
        let cart = localStorage.getItem("cart");
        cart = cart ? JSON.parse(cart) : cart;

        let cl;

        if (cart && Array.isArray(cart)) {
            cl = [...cart];
        } else {
            cl = [];
        }

        setShowAddProgress(true);

        if (token) {
            let cartList = [];
            let data = await utils.getUser(token);
            let result = data.meta_data.filter((data) => data.key === "cart");
            if (result.length > 0) {
                if (result[0].value.length > 0) {
                    cartList = [...result[0].value];
                    cartList = cartList.concat([...checkoutProductList]);
                } else {
                    cartList = [...checkoutProductList];
                }
            } else {
                cartList = [...checkoutProductList];
            }
            cl = cl.concat([...cartList]);

            // let newCartList = [];
            // cartList.forEach((item, index) => {
            //     const i = newCartList.findIndex((product) => product.id === item.id);
            //     if (i === -1) {
            //         newCartList.push(item);
            //     } else {
            //         newCartList[i].quantity = newCartList[i].quantity + item.quantity;
            //     }
            // })

            let userData = {
                meta_data: [
                    {
                        key: "cart",
                        value: cl,
                    },
                ],
            };
            utils.updateUser(token, userData).then((result) => {
                setTimeout(() => setShowAddProgress(false), 500);

                localStorage.setItem("cart", "");

                EventEmitter.dispatch("updateBadge");
                EventEmitter.dispatch("handleCart", true);
            });
        } else {
            setTimeout(() => setShowAddProgress(false), 500);

            cl = cl.concat([...checkoutProductList]);
            cl = JSON.stringify(cl);
            localStorage.setItem("cart", cl);

            EventEmitter.dispatch("updateBadge");
            EventEmitter.dispatch("handleCart", true);
        }
    };

    //////////////////////////////////////

    return (
        <React.Fragment>
            <Head>
                <title>{productName ? productName + " - Accessories | WESTSHADE" : ""}</title>
            </Head>
            <Block height={"100vh"} paddingTop={["48px", "48px", "96px"]} display={"flex"} justifyContent={"center"} overflow={["scroll", "scroll", "hidden"]}
                   style={{paddingTop: 146}}>
                <Block width={["100%", "480px", "100%"]} height={["auto", "auto", "100%"]} display={"flex"} flexDirection={["column", "column", "row"]}>
                    {/* 图片区域 */}
                    <Block flex={[0, 0, 1]} position={["unset", "unset", "relative"]} paddingRight={["16px", "16px", "0"]} paddingLeft={["16px", "16px", "24px"]}>
                        <Block paddingTop={["0", "24px", "48px"]}>
                            <ImageGallery showNav={false} items={productImageGallery} thumbnailPosition="left" showPlayButton={false} showFullscreenButton={false}/>
                        </Block>
                    </Block>
                    {/* 选择区域 */}
                    <Block display={"flex"} flexDirection={"column"} alignItems={"center"} width={["auto", "auto", "413px"]} overflow={["unset", "unset", "scroll"]}
                           paddingTop={"24px"} paddingRight={["16px", "16px", "24px"]} paddingBottom={["94px", "68px", "0"]} paddingLeft={["16px", "16px", "0"]}
                    >
                        <Block marginBottom="16px" font="MinXHeading20">{product.name}</Block>
                        <div style={{marginBottom: 20, padding: "8px 24px", width: 81, height: 32, backgroundColor: "#F2F2F2", borderRadius: 16, lineHeight: "initial"}}>Spec</div>
                        <>
                            {uProduct && uProduct.short_description ? (
                                <div className="container-selection" style={{textAlign: "left"}}>
                                    <Block font="MinXParagraph14">{`Description: ${stringFn.modifyShortDescription(uProduct.short_description)}`}</Block>
                                </div>
                            ) : null}
                            <>
                                {uProductComponent && uProductComponent[0]
                                    ? uProductComponent[0].attributes
                                        .filter((attribute) => attribute.variation)
                                        .map((attribute, index) => {
                                            if ((attribute.id === id_attribute_wallType && wallType) || attribute.id === id_attribute_canopyColor) return;
                                            return (
                                                <Block key={index} width="100%"
                                                       overrides={{
                                                           Block: {
                                                               props: {
                                                                   className: "container-selection"
                                                               }
                                                           },
                                                       }}
                                                >
                                                    <Block marginBottom="16px" font="MinXHeading16">{attribute.name}</Block>
                                                    <RadioGroup value={selectedAttribute[0] ? selectedAttribute[0][index].option.toLowerCase() : ""}
                                                                onChange={(event) => handleChangeRadio(event, 0, attribute.id)}
                                                                name={attribute.name}
                                                                align={ALIGN.horizontal}
                                                                overrides={{
                                                                    RadioGroupRoot: {
                                                                        style: () => ({
                                                                            display: "grid",
                                                                            width: "100%",
                                                                            flexWrap: "wrap",
                                                                            gridTemplateColumns: "repeat(auto-fill, 30%)",
                                                                            justifyContent: "space-between",
                                                                        }),
                                                                    },
                                                                    Root: {
                                                                        style: ({$checked}) => ({
                                                                            justifyContent: "center",
                                                                            padding: $checked ? "14px 0" : "16px 0",
                                                                            border: $checked ? "3px solid #23A4AD" : "1px solid #D9D9D9",
                                                                            boxSizing: "border-box",
                                                                            borderRadius: "30px",
                                                                            marginTop: 0,
                                                                            marginRight: 0,
                                                                            marginBottom: "16px",
                                                                            marginLeft: 0,
                                                                        }),
                                                                    },
                                                                    RadioMarkOuter: {
                                                                        style: () => ({display: "none"}),
                                                                    },
                                                                    RadioMarkInner: {
                                                                        style: () => ({display: "none"}),
                                                                    },
                                                                    Label: {
                                                                        style: ({$checked}) => ({
                                                                            paddingLeft: 0,
                                                                            fontWeight: $checked ? "bold" : "500",
                                                                            fontSize: "14px",
                                                                            lineHeight: "20px"
                                                                        }),
                                                                    },
                                                                }}
                                                    >
                                                        {attribute.options.map((option, index) =>
                                                            <Radio key={index} value={option.toLowerCase()}>{option}</Radio>
                                                        )}
                                                    </RadioGroup>
                                                    <div style={{
                                                        padding: "8px 24px",
                                                        width: 119,
                                                        height: 32,
                                                        backgroundColor: "#F2F2F2",
                                                        borderRadius: 16,
                                                        lineHeight: "initial"
                                                    }}>
                                                        Size Guide
                                                    </div>
                                                </Block>
                                            )
                                                ;
                                        })
                                    : null}
                            </>
                            {uProductComponent && uProductComponent[0]
                            && uProductComponent[0].attributes
                                .filter((attribute) => attribute.id === id_attribute_canopyColor && attribute.variation).length > 0 ? (
                                <Block width="100%"
                                       overrides={{
                                           Block: {
                                               props: {
                                                   className: "container-selection"
                                               }
                                           },
                                       }}
                                >
                                    <Block marginBottom="16px" font="MinXHeading16">Color</Block>
                                    <RadioGroup value={selectedAttribute[0] ? selectedAttribute[0][1].option.toLowerCase() : ""}
                                                onChange={(event) => handleChangeRadio(event, 0, id_attribute_canopyColor)}
                                                name="color"
                                                align={ALIGN.horizontal}
                                                overrides={{
                                                    RadioGroupRoot: {
                                                        style: ({$theme}) => ({
                                                            display: "grid",
                                                            width: "100%",
                                                            flexWrap: "wrap",
                                                            justifyContent: "space-evenly",
                                                            gridTemplateColumns: "auto auto auto auto auto auto",
                                                        }),
                                                        props: {
                                                            className: "radioGroupColor",
                                                        },
                                                    },
                                                    Root: {
                                                        style: ({$theme, $checked}) => ({
                                                            width: "52px",
                                                            height: "52px",
                                                            justifyContent: "center",
                                                            padding: $checked ? "4px" : "6px",
                                                            border: $checked ? "3px solid #23A4AD" : "1px solid transparent",
                                                            boxSizing: "border-box",
                                                            borderRadius: "50%",
                                                            marginTop: 0,
                                                            marginRight: "0",
                                                            marginBottom: "16px",
                                                            marginLeft: "0",
                                                        }),
                                                    },
                                                    RadioMarkOuter: {
                                                        style: ({$theme}) => ({display: "none"}),
                                                    },
                                                    RadioMarkInner: {
                                                        style: ({$theme}) => ({display: "none"}),
                                                    },
                                                }}
                                    >
                                        {uProductComponent && uProductComponent[0]
                                            ? uProductComponent[0].attributes
                                                .filter((attribute) => attribute.id === id_attribute_canopyColor && attribute.variation)
                                                .map((attribute) => {
                                                    return attribute.options.map((option, index) => (
                                                        <Radio key={index} value={option.toLowerCase()}
                                                               overrides={{
                                                                   Label: ({$value}) => (
                                                                       <div
                                                                           style={{
                                                                               width: "38px",
                                                                               height: "38px",
                                                                               borderRadius: "50%",
                                                                               backgroundColor:
                                                                                   option.toLowerCase() === "yellow"
                                                                                       ? "#F4C84E"
                                                                                       : option.toLowerCase() === "green"
                                                                                           ? "#275D3D"
                                                                                           : option.toLowerCase() === "blue"
                                                                                               ? "#1A4A8B"
                                                                                               : option.toLowerCase() === "red"
                                                                                                   ? "#991F34"
                                                                                                   : option.toLowerCase(),
                                                                               border: "1px solid #D9D9D9",
                                                                           }}
                                                                       />
                                                                   ),
                                                               }}
                                                        />
                                                    ));
                                                })
                                            : null}
                                    </RadioGroup>
                                </Block>
                            ) : null}
                        </>
                        <Block maxWidth="315px" marginTop="24px" marginBottom="16px" font="MinXHeading14"
                               overrides={{
                                   Block: {
                                       style: {textAlign: "center"}
                                   },
                               }}
                        >
                            You can also print any color or any designs with our <span style={{color: "#23A4AD"}}>custom printing</span> service
                        </Block>
                    </Block>
                </Block>
            </Block>
            <Box className="page product" fontSize={14} lineHeight={1}>
                <div className={styles["container-page"]}>
                    <Container maxWidth="lg">
                        <Grid container spacing={6}>
                            <Grid item xs={12} sm={6}>
                                <div className={styles["container-product-image"]}>
                                    <Carousel showIndicators={false}>
                                        {productImage.map((item, index) => (
                                            <img key={index} src={item.src}/>
                                        ))}
                                    </Carousel>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} className="position-r">
                                <div className={clsx(styles["container-product-section"], styles["b-b"])}>
                                    <Typography variant="h1" classes={{h1: styles["product-name"]}} color="textPrimary">
                                        {wallType ? getProductName(productName) + " - " + stringFn.changeCase(wallType, 1) : productName}
                                    </Typography>
                                </div>
                                <div className={clsx(styles["container-product-section"], styles["b-b"])}>
                                    {"Description："}
                                    {uProduct && uProduct.short_description ? (
                                        <Typography variant="inherit" display="block" classes={{root: styles["product-description"]}} color="textSecondary">
                                            {stringFn.modifyShortDescription(uProduct.short_description)}
                                        </Typography>
                                    ) : null}
                                </div>
                                <div>
                                    {uProductComponent && uProductComponent[0]
                                        ? uProductComponent[0].attributes
                                            .filter((attribute) => attribute.variation)
                                            .map((attribute, index) => {
                                                if (attribute.id === id_attribute_wallType && wallType) return;
                                                return (
                                                    <div key={index} className={clsx(styles["container-product-section"], styles["b-b"])}>
                                                        <Selections
                                                            label={"Choose your " + stringFn.replaceDash(attribute.name, 1) + ":"}
                                                            value={selectedAttribute[0] ? selectedAttribute[0][index].option.toLowerCase() : ""}
                                                            onChange={(event) => handleChangeRadio(event, 0, attribute.id)}
                                                            list={attribute.options}
                                                            id={attribute.id.toString()}
                                                        />
                                                    </div>
                                                );
                                            })
                                        : null}
                                </div>
                                <Grid container direction="row" alignItems="center">
                                    <Typography variant="inherit" classes={{root: clsx(styles["product-price"], totalSalePrice ? styles["discount"] : "")}}>
                                        {"$" + parseFloat(totalRegularPrice).toFixed(2)}
                                    </Typography>
                                    {totalSalePrice ? (
                                        <Typography variant="inherit" classes={{root: styles["product-price"]}}>
                                            {"$" + parseFloat(totalSalePrice).toFixed(2)}
                                        </Typography>
                                    ) : null}
                                </Grid>
                                {!availableToCheckout ? <Typography classes={{root: styles["product-message"]}}>{message}</Typography> : null}
                                <Checkout
                                    onClickLeft={() => totalCount !== 1 && setTotalCount(totalCount - 1)}
                                    onClickRight={() => setTotalCount(totalCount + 1)}
                                    count={totalCount}
                                    available={availableToCheckout}
                                    progress={showAddProgress}
                                    onClick={updateCart}
                                />
                                <Typography classes={{root: styles["product-shipping"]}}>Order today and get it shipped by {shippedDay}.</Typography>
                                <Grid container direction="row" alignItems="center" classes={{root: styles["button-group"]}}>
                                    <CustomButton type="underline" onClick={() => router.push("/shipping-return")}>
                                        Shipping &amp; Return
                                    </CustomButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Box>
        </React.Fragment>
    );
}

Accessories.getInitialProps = async (context) => {
    const {query} = context;
    const {id} = query;
    let product = null,
        component = [],
        variant = [];

    product = await utils.getProductByWooId(id);
    if (product.type === "simple") {
        component[0] = {...product};
    } else if (product.type === "variable") {
        component[0] = {...product};
        variant[0] = await utils.getVariantByWooProductId(id);
    }

    return {
        product: product,
        productComponent: component,
        productVariant: variant,
        noFooter: true,
    };
};

export default withRouter(Accessories);
