import React, {useEffect, useState} from "react";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import clsx from "clsx";

import {Box, Button, Breadcrumbs, Container, Grid, TextField, Typography,} from "@material-ui/core";

import Link from "next/link";
import {withRouter} from "next/router";

import styles from "../../styles/Product.module.scss";

import {DateFn, NumberFn, StringFn, UrlFn} from "../../utils/tools";
import Utils from "../../utils/utils";

import CBreadcrumbs from "../../components/breadcrumbs";
import Checkout from "../../components/buttonGroup";
import CustomButton from "../../components/button";
import Modal from "../../components/modal";
import Selections from "../../components/selection_group";

const dateFn = new DateFn();
const numberFn = new NumberFn();
const stringFn = new StringFn();
const urlFn = new UrlFn();
const utils = new Utils();

const id_attribute_inflatableCanopyColor = 39;

let checkoutProductList = [];

async function getProducts(components) {
    return await Promise.all(components.map(async ({default_option_id}) => await utils.getProductByWooId(default_option_id)));
}

async function getVariants(components) {
    return await Promise.all(components.map(async ({id}) => await utils.getVariantByWooProductId(id)));
}

function Inflatable_Canopy_Tent({router, product, productComponent = [], productVariant = []}) {
    const [display, setDisplay] = useState(false);

    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("");
    const [productImage, setProductImage] = useState([]);

    const [selectedAttribute, setSelectedAttribute] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState([]);

    const [initProductVariant, setInitProductVariant] = useState(false);
    const [initSelectedAttribute, setInitSelectedAttribute] = useState(false);

    const [totalRegularPrice, setTotalRegularPrice] = useState(0);
    const [totalSalePrice, setTotalSalePrice] = useState(0);
    const [totalCount, setTotalCount] = useState(1);

    const [message, setMessage] = useState("");

    const [availableToCheckout, setAvailable] = useState(false);

    const [shippedDay, setShippedDay] = useState("");

    ////////////////////////////////////////

    const [availableList, setAvailableList] = useState([
        {id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true,},
    ]);

    ////////////////////////////////////////

    const [showGetQuote, setShowGetQuote] = useState(false);

    ////////////////////////////////////////

    const [quoteProduct, setQuoteProduct] = useState("");
    const [quoteConfiguration, setQuoteConfiguration] = useState("");
    const [quoteQuantity, setQuoteQuantity] = useState("");
    const [quoteNameLast, setQuoteNameLast] = useState("");
    const [quoteNameFirst, setQuoteNameFirst] = useState("");
    const [quoteEmail, setQuoteEmail] = useState("");
    const [quotePhone, setQuotePhone] = useState("");
    const [quoteRequest, setQuoteRequest] = useState("");
    const [quoteError, setQuoteError] = useState(false);

    ////////////////////////////////////////

    const setMainImage = (images) => {
        if (!images) return;

        if (Array.isArray(images)) {
            let urlList = images.map(image => {
                return {src: image.src.replace(/^http:\/\/34\.222\.1\.150/i, 'https://checkout.westshade.com')}
            });
            setProductImage(urlList);
        } else {
            let url = images.src;
            url = url.replace(/^http:\/\/34\.222\.1\.150/i, 'https://checkout.westshade.com');

            setProductImage([{src: url}]);
        }
    };

    const handleChangeRadio = (event, index, id) => {
        // Part 1: 更改选项List信息 并 保存
        let selection = [...selectedAttribute];
        selection[index].forEach((attribute) => {
            if (attribute.id === id) attribute.option = event.target.value;
        });
        // Part 2: 根据选项从VariantList中查找对应产品数据 并 保存
        let selectionVariant = [...selectedVariant];
        let selected = productVariant[index].filter((variant) => {
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
            if ((!variant || !variant.attributes) && productComponent[index].type !== "simple") {
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

    useEffect(() => {
        setTimeout(() => setDisplay(true), 250);

        setProductId(product.id.toString());
        setShippedDay(dateFn.getReceivedDay());
    }, []);

    useEffect(() => {
        if (!product) return;

        setProductName(product.name);
        setProductType(product.type);

        if (product.hasOwnProperty("image") && product.image) {
            setMainImage(product.image);
        } else if (product.hasOwnProperty("images") && product.images && product.images.length > 0) {
            setMainImage(product.images);
        }
    }, [product]);

    useEffect(() => {
        if (!productComponent || productComponent.length === 0) return;
        if (product.type === "simple") {
            setSelectedVariant(productComponent);
        } else if (product.type === "variable") {
            let selectedAttrList = [];
            productComponent.map((component) => {
                let defaultAttr = [...component.default_attributes];

                defaultAttr.forEach((attr) => {
                    if (attr.id === id_attribute_inflatableCanopyColor) {
                        attr.option = stringFn.replaceDash(attr.option, 1);
                    }
                });
                selectedAttrList.push(defaultAttr);
            })
            setSelectedAttribute(selectedAttrList);
            setInitSelectedAttribute(true);

            // 获取,保存各组件变体产品信息
            setInitProductVariant(true);
        }
    }, [productComponent]);

    useEffect(() => {
        if (!initSelectedAttribute || !initProductVariant) return;

        // 获取,保存各组件默认变体产品信息
        let selectedVariantList = [];
        selectedAttribute.forEach((attr, index) => {
            if (!attr) return;
            let selected = productVariant[index].filter((variant) => {
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
                if (variant.hasOwnProperty("image") && variant.image) {
                    setMainImage(variant.image);
                } else if (variant.hasOwnProperty("images") && variant.images && variant.images.length > 0) {
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
                    setMessage("Insufficient stock → " + productComponent[index].name);
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
                    setMessage("Insufficient stock → " + productComponent[index].name);
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
                    setMessage("Insufficient stock → " + productComponent[index].name);
                    return;
                } else {
                    checkoutProductList[i].quantity = needed;
                }
            }
            setMessage("");
        });
        setAvailable(available);
    }, [availableList]);

    const handleSendQuote = () => {
        if (
            quoteQuantity < 1 ||
            !quoteNameLast ||
            !quoteNameFirst ||
            !quoteEmail ||
            !quotePhone ||
            !quoteRequest
        ) {
            setQuoteError(true);
        } else {
            let mail = "mailto:support@westshade.com";
            let subject = "Subject=New Entry: " + quoteProduct + " Enquiry";
            let body =
                "body=Product: " +
                quoteProduct +
                ".%20%20%20%20" +
                "Configuration: " +
                quoteConfiguration +
                ".%20%20%20%20" +
                "Quantity: " +
                quoteQuantity +
                ".%20%20%20%20" +
                "Name: " +
                quoteNameLast +
                "%20" +
                quoteNameFirst +
                ".%20%20%20%20" +
                "Email: " +
                quoteEmail +
                ".%20%20%20%20" +
                "Phone: " +
                quotePhone +
                ".%20%20%20%20" +
                "Request: " +
                quoteRequest +
                ".";
            let a = document.createElement("a");
            a.href = mail + "?" + subject + "&" + body;
            a.click();
        }
    };

    //////////////////////////////////////

    return (
        <React.Fragment>
            <Box className="page product" fontSize={14} lineHeight={1}>
                {display ? (
                    <>
                        <CBreadcrumbs>
                            <Container maxWidth="md">
                                {product ? (
                                    <Breadcrumbs classes={{li: "root-breadcrumbs-text"}}>
                                        <Link color="inherit" href="/" onClick={(event) => event.preventDefault()}>
                                            Home
                                        </Link>
                                        <Link color="inherit" href="/" onClick={(event) => event.preventDefault()}>
                                            Products
                                        </Link>
                                        <Typography variant="inherit" color="textPrimary"> {product.name} </Typography>
                                    </Breadcrumbs>
                                ) : null}
                            </Container>
                        </CBreadcrumbs>
                        <div className={styles["container-page"]}>
                            <Container maxWidth="lg">
                                <Grid container spacing={6}>
                                    <Grid item xs={12} sm={6}>
                                        <div className={styles["container-product-image"]}>
                                            <Carousel showIndicators={false}>
                                                {productImage.map((item, index) => (<img key={index} src={item.src}/>))}
                                            </Carousel>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} className="position-r">
                                        <div className={clsx(styles["container-product-section"], styles["b-b"])}>
                                            <Typography variant="h1" classes={{h1: styles["product-name"]}} color="textPrimary">
                                                {productName}
                                            </Typography>
                                        </div>
                                        <div className={clsx(styles["container-product-section"], styles["b-b"])}>
                                            {"Description："}
                                            {product && product.short_description ? (
                                                <Typography variant="inherit" display="block" classes={{root: styles["product-description"]}} color="textSecondary">
                                                    {stringFn.modifyShortDescription(product.short_description)}
                                                </Typography>
                                            ) : null}
                                        </div>
                                        <div>
                                            {productComponent && productComponent[0] ?
                                                productComponent[0].attributes.filter((attribute) => attribute.variation).map((attribute, index) => (
                                                    <div key={index} className={clsx(styles["container-product-section"])}>
                                                        <Selections
                                                            label={"Choose your " + stringFn.replaceDash(attribute.name, 1) + ":"}
                                                            value={selectedAttribute[0] ? selectedAttribute[0][index].option.toLowerCase() : ""}
                                                            onChange={(event) => handleChangeRadio(event, 0, attribute.id)}
                                                            list={attribute.options}
                                                            id={attribute.id.toString()}
                                                        />
                                                    </div>
                                                ))
                                                : null}
                                        </div>
                                        <Checkout onClick={() => {
                                            setQuoteProduct(productName);
                                            let configuration = "";
                                            selectedAttribute[0].map(
                                                (attribute) =>
                                                    (configuration +=
                                                        attribute.name + ": " + attribute.option + "; ")
                                            );
                                            setQuoteConfiguration(configuration);
                                            setQuoteQuantity(1);
                                            setShowGetQuote(true);
                                        }}
                                                  type="quote"
                                        />
                                        <Grid container direction="row" alignItems="center" classes={{root: styles["button-group"]}}>
                                            <CustomButton type="underline" onClick={() => router.push("/shipping-return")}>
                                                Shipping &amp; Return
                                            </CustomButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Container>
                        </div>
                    </>
                ) : null}
                <Modal onClose={() => setShowGetQuote(false)} show={showGetQuote}>
                    <Box className="popup-section" style={{width: "auto"}}>
                        <Container maxWidth="md">
                            <Grid container spacing={6}>
                                <Grid item xs={12}>
                                    <form>
                                        <div className="section-quote-input">
                                            <TextField
                                                fullWidth
                                                label="Product"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                defaultValue={quoteProduct}
                                            />
                                        </div>
                                        <div className="section-quote-input">
                                            <TextField
                                                fullWidth
                                                label="Configurations"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                defaultValue={quoteConfiguration}
                                            />
                                        </div>
                                        <div className="section-quote-input">
                                            <TextField
                                                fullWidth
                                                label="Quantity"
                                                type="number"
                                                required
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                defaultValue={quoteQuantity}
                                                onChange={(event) => {
                                                    setQuoteError(false);
                                                    setQuoteQuantity(event.target.value);
                                                }}
                                                error={quoteQuantity > 0 && quoteError}
                                            />
                                        </div>
                                        <div
                                            className="section-quote-input"
                                            style={{display: "flex"}}
                                        >
                                            <div style={{paddingRight: 12}}>
                                                <TextField
                                                    label="Last Name"
                                                    required
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    defaultValue={quoteNameLast}
                                                    onChange={(event) => {
                                                        setQuoteError(false);
                                                        setQuoteNameLast(event.target.value);
                                                    }}
                                                    error={!quoteNameLast && quoteError}
                                                />
                                            </div>
                                            <div style={{paddingRight: 12}}>
                                                <TextField
                                                    label="First Name"
                                                    required
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    defaultValue={quoteNameFirst}
                                                    onChange={(event) => {
                                                        setQuoteError(false);
                                                        setQuoteNameFirst(event.target.value);
                                                    }}
                                                    error={!quoteNameFirst && quoteError}
                                                />
                                            </div>
                                        </div>
                                        <div className="section-quote-input">
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                required
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                defaultValue={quoteEmail}
                                                onChange={(event) => {
                                                    setQuoteError(false);
                                                    setQuoteEmail(event.target.value);
                                                }}
                                                error={!quoteEmail && quoteError}
                                            />
                                        </div>
                                        <div className="section-quote-input">
                                            <TextField
                                                fullWidth
                                                label="Phone"
                                                required
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                defaultValue={quotePhone}
                                                onChange={(event) => {
                                                    setQuoteError(false);
                                                    setQuotePhone(event.target.value);
                                                }}
                                                error={!quotePhone && quoteError}
                                            />
                                        </div>
                                        <div className="section-quote-input">
                                            <TextField
                                                fullWidth
                                                label="Request"
                                                required
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                multiline
                                                maxRows={6}
                                                defaultValue={quoteRequest}
                                                onChange={(event) => {
                                                    setQuoteError(false);
                                                    setQuoteRequest(event.target.value);
                                                }}
                                                error={!quoteRequest && quoteError}
                                            />
                                        </div>
                                        <div className="section-checkout-container">
                                            <Button
                                                variant="contained"
                                                onClick={() => handleSendQuote()}
                                                disableRipple
                                                disableElevation
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </form>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Modal>
            </Box>
        </React.Fragment>
    );
}

Inflatable_Canopy_Tent.getInitialProps = async (context) => {
    const {query} = context;
    const {id} = query;
    let product = null, component = [], variant = [];

    product = await utils.getProductByWooId(id);
    if (product.type === "simple") {
        component[0] = {...product};
    } else if (product.type === "variable") {
        component[0] = {...product};
        variant = await getVariants(component);
    } else if (product.type === "composite") {
        component = await getProducts(product.composite_components);
        variant = await getVariants(component);
    }

    return {
        product: product,
        productComponent: component,
        productVariant: variant
    }
}

export default withRouter(Inflatable_Canopy_Tent);
