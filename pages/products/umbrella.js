import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import NumberFormat from "react-number-format";
import clsx from "clsx";

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import {Block} from "baseui/block";
import {AspectRatioBox, AspectRatioBoxBody} from "baseui/aspect-ratio-box";
import {ALIGN, Radio, RadioGroup} from "baseui/radio";
import {CheckIndeterminate, Plus} from "baseui/icon";
import {Select} from "baseui/select";

import {Selection, ProductImages, ProductDescription, ShippingNote} from "Components/Sections";
import Checkout from "Components/Checkout";
import {Modal} from "Components/surfaces";
import Button from "Components/Button";
import BackToTop from "Components/BackToTop";
import ThemeProvider from "Components/ThemeProvider";

import {DateFn, NumberFn, StringFn, UrlFn} from "Utils/tools";
import Utils from "Utils/utils";
import {EventEmitter} from "Utils/events";

import {viewItem, addToCart} from "../../redux/actions/gtagActions";
import {updateUser} from "../../redux/actions/userActions";
import {modifyCart} from "../../redux/actions/cartActions";

import styles from "./Product.module.scss";

const dateFn = new DateFn();
const numberFn = new NumberFn();
const stringFn = new StringFn();
const urlFn = new UrlFn();
const utils = new Utils();

const id_product_umbrella_marco = "49555";
const id_product_umbrella_santorini = "47943";
const id_product_umbrella_bali = "30361";
const id_product_umbrella_kapri = "59850";
const id_product_umbrella_catalina = "30441";

const id_attribute_color = 2;
const id_attribute_umbrellaSize = 15;
const id_attribute_umbrellaMaterial = 37;
const id_attribute_umbrellaFrame = 48;

let checkoutProductList = [];

let santoriniFrame = "aluminum";

const SectionPrice = (props) => {
    const {totalRegularPrice, totalSalePrice, priceBeatOnClick} = props;

    return (
        <>
            {totalRegularPrice !== totalSalePrice ? (
                <Block className="text-center">
                    <Block marginBottom={["4px", null, null, "8px"]} font={["MinXLabel14", "MinXLabel14", "MinXLabel12", "MinXLabel14"]}
                           $style={{fontFamily: "Gothic A1 !important", fontWeight: "700 !important", lineHeight: "1 !important"}}
                    >
                        ( <NumberFormat decimalScale={0} suffix={"%"} value={((totalRegularPrice - totalSalePrice) / totalRegularPrice * 100)} displayType="text"/> OFF )
                    </Block>
                    <Block font={["MinXLabel16", "MinXLabel16", "MinXLabel14", "MinXLabel16"]} color="#E51717"
                           $style={{fontFamily: "Gothic A1 !important", fontWeight: "700 !important", lineHeight: "1 !important"}}
                    >
                        Save <NumberFormat thousandSeparator={true} decimalScale={2} prefix={"$"} value={totalRegularPrice - totalSalePrice} displayType="text"/>
                    </Block>
                </Block>
            ) : null}
            <Block>
                <Block display="flex" alignItems="flex-start" font={["MinXLabel28", "MinXLabel28", "MinXLabel30", "MinXLabel40"]}
                       $style={{fontFamily: "Gothic A1 !important", fontWeight: "900 !important", lineHeight: "1 !important"}}
                >
                    <Block as="span" marginTop={["2px", "2px", "4px", "5px"]} font={["MinXLabel18", "MinXLabel18", "MinXLabel18", "MinXLabel24"]}
                           $style={{fontFamily: "Gothic A1 !important",}}
                    >$</Block>
                    <NumberFormat thousandSeparator={true} value={totalRegularPrice !== totalSalePrice ? totalSalePrice : totalRegularPrice} displayType="text"/>
                </Block>
                {totalRegularPrice !== totalSalePrice ? (
                    <Block className="text-line-through" marginTop="4px" font={["MinXHeading14", "MinXHeading14", "MinXHeading12", "MinXHeading14"]} color="#8C8C8C"
                           $style={{fontFamily: "Gothic A1 !important", fontWeight: "400 !important", lineHeight: "1 !important"}}>
                        MSRP: <NumberFormat thousandSeparator={true} prefix={"$"} value={totalRegularPrice} displayType="text"/>
                    </Block>
                ) : null}
            </Block>
            <Block className="cursor" display="flex" alignItems="center" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph14", "MinXParagraph16"]} color="#356DB6" $style={{gap: "8px"}}
                   onClick={priceBeatOnClick}
            >
                <Block position="relative" width={["16px", null, null, "20px"]} height={["16px", null, null, "20px"]}>
                    <Image src="/images/icon/icon-price-beat.png" alt="icon-price-beat" layout="fill" objectFit="contain"/>
                </Block>
                <Block as="span">Price Beat Guarantee</Block>
            </Block>
        </>
    )
};

const ProductItem = ({image, title, price, status, onClick}) => {
    return (
        <Block className="cursor" position="relative" display="grid" gridTemplateColumns={["40px 1fr", null, "32px 1fr", "40px 1fr"]} gridColumnGap={["4px", null, null, "8px"]} width="100%" alignItems="center"
               padding={["4px", null, null, "8px"]} overflow="hidden" $style={{border: "1px solid #BFBFBF", borderRadius: "4px"}} onClick={onClick}
        >
            <AspectRatioBox aspectRatio="1" width={["40px", null, "32px", "40px"]} height={["40px", null, "32px", "40px"]}>
                <AspectRatioBoxBody as={Image} src={image[0].src} alt={image[0].name} layout="fill" objectFit="contain" loader={({src, width}) => src} unoptimized/>
            </AspectRatioBox>
            <Block alignSelf="flex-start" overflow="hidden" $style={{whiteSpace: "nowrap"}}>
                <Block marginBottom="4px" font={["MinXHeading14", "MinXHeading14", "MinXHeading12", "MinXHeading14"]} overflow="hidden" $style={{textOverflow: "ellipsis"}}>{title}</Block>
                <Block font={["MinXHeading12", "MinXHeading12", "MinXHeading10", "MinXHeading12"]} color="MinXSecondaryText">
                    {price === "0" ? <Block color="#E51717">Free</Block> : <NumberFormat thousandSeparator={true} prefix={"$"} value={price} displayType="text"/>}
                </Block>
            </Block>
            {status ? (
                <Block display="flex" justifyContent="center" alignItems="center" position="absolute" width="20px" height="20px" right={["8px", null, "6px", "8px"]} bottom={["8px", null, "6px", "8px"]}
                       $style={{borderRadius: "4px"}}
                >
                    <CheckIndeterminate/>
                </Block>
            ) : (
                <Block display="flex" justifyContent="center" alignItems="center" position="absolute" width="20px" height="20px" right={["8px", null, "6px", "8px"]} bottom={["8px", null, "6px", "8px"]} backgroundColor="#FFC247"
                       $style={{borderRadius: "4px"}}
                >
                    <Plus/>
                </Block>
            )}
        </Block>
    )
}

function Umbrella({router, products, variants, phone}) {
    const refSelectA = useRef(null);
    const refSelectB = useRef(null);
    const refSelectC = useRef(null);

    const refAddToCart = useRef(null);

    const [productComponent, setProductComponent] = useState(products);
    const [productVariant, setProductVariant] = useState(variants);

    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("");
    const [productImage, setProductImage] = useState([]);
    const [productImageGallery, setProductImageGallery] = useState([]);
    const [productImageGalleryTemp, setProductImageGalleryTemp] = useState([]);

    const [selectedAttribute, setSelectedAttribute] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState([]);

    const [initProductVariant, setInitProductVariant] = useState(false);
    const [initSelectedAttribute, setInitSelectedAttribute] = useState(false);

    const [regularPrice, setRegularPrice] = useState(0);
    const [salePrice, setSalePrice] = useState(0);

    const [totalRegularPrice, setTotalRegularPrice] = useState(0);
    const [totalSalePrice, setTotalSalePrice] = useState(0);
    const [totalCount, setTotalCount] = useState(1);

    const [message, setMessage] = useState("");

    const [availableToCheckout, setAvailable] = useState(false);
    const [shippedDay, setShippedDay] = useState("");

    const [summaryIsOpen, setSummaryIsOpen] = useState(false);
    const [priceBeatIsOpen, setPriceBeatIsOpen] = useState(false);
    const [questionIsOpen, setQuestionIsOpen] = useState(false);
    const [fabricCompareOpen, setFabricCompareOpen] = useState(false);

    const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
    const [frameCompareOpen, setFrameCompareOpen] = useState(false);

    const [isInStock, setIsInStock] = useState(true);

    const [addToCartOffset, setAddToCartOffset] = useState(0);

    ////////////////////////////////////////

    const [availableList, setAvailableList] = useState([{id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true}]);

    const [umbrellaFrame, setUmbrellaFrame] = useState("");
    const [umbrellaSize, setUmbrellaSize] = useState("");
    const [umbrellaFabric, setUmbrellaFabric] = useState("");
    const [umbrellaColor, setUmbrellaColor] = useState("");

    ////////////////////////////////////////

    const dispatch = useDispatch();

    const {loggedIn, token} = useSelector(({user}) => user);
    const {cart} = useSelector(({cart}) => cart);

    const openSummaryModal = () => {
        setSummaryIsOpen(true);
    };

    const closeSummaryModal = () => {
        setSummaryIsOpen(false);
    };

    const renderCustomImage = (props) => {
        return (
            <AspectRatioBox aspectRatio={16 / 9} minHeight="230px">
                <Image src={props.original} alt="product image" layout="fill" objectFit="contain" loader={({src, width}) => src} unoptimized/>
            </AspectRatioBox>
        );
    }

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

        if (id === id_attribute_umbrellaFrame) {
            santoriniFrame = event.target.value;
        }

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
        if (selectionVariant.length === 1 && !selectionVariant[0]) {
            selectionVariant = [];
        }
        // Part 3: 保存更改项
        setSelectedAttribute(selection);
        setSelectedVariant(selectionVariant);
    };

    const checkProduct_getPrice = () => {
        let regularPrice = 0,
            salePrice = 0;

        let available = [...availableList];

        selectedVariant.filter(item => item).forEach((variant, index) => {
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
        // setTotalSalePrice(salePrice === regularPrice ? 0 : salePrice);
        setTotalSalePrice(salePrice);
    };

    const updateCart = async () => {
        let cl = JSON.parse(JSON.stringify(cart));
        cl = cl.concat([...checkoutProductList]);

        if (loggedIn) {
            let userData = {
                meta_data: [
                    {
                        key: "cart",
                        value: cl,
                    },
                ],
            };
            dispatch(updateUser(token, userData));
            EventEmitter.dispatch("handleCart", true);
        } else {
            dispatch(modifyCart({cart: cl}))
            EventEmitter.dispatch("handleCart", true);
        }

        addToCart(productComponent, selectedVariant, totalCount);
    };

    useEffect(() => {
        setShippedDay(dateFn.getReceivedDay());

        if (router.query.size) {
            setUmbrellaSize(router.query.size);
        } else {
            let size = urlFn.getParam("size");
            setUmbrellaSize(size);
        }

        if (router.query.type) {
            setUmbrellaFrame(router.query.type);
        } else {
            let type = urlFn.getParam("type");
            setUmbrellaFrame(type);
        }

        if (router.query.color) {
            setUmbrellaColor(router.query.color);
        } else {
            let color = urlFn.getParam("color");
            setUmbrellaColor(color);
        }

        if (router.query.fabric) {
            setUmbrellaFabric(router.query.fabric);
        } else {
            let fabric = urlFn.getParam("fabric");
            setUmbrellaFabric(fabric);
        }

    }, []);

    useEffect(() => {
        if (refSelectA) {
            refSelectA.current.disabled = true;
        }
    }, [refSelectA]);

    useEffect(() => {
        if (refSelectB) {
            refSelectB.current.disabled = true;
        }
    }, [refSelectB]);

    useEffect(() => {
        if (refSelectC) {
            refSelectC.current.disabled = true;
        }
    }, [refSelectC]);

    useEffect(() => {
        if (productId && productId === id_product_umbrella_santorini && umbrellaSize === "10ft") {
            handleChangeRadio({target: {value: "aluminum"}}, 0, id_attribute_umbrellaFrame);
        }
    }, [umbrellaSize]);

    useEffect(() => {
        if (productId && productId === id_product_umbrella_santorini && umbrellaFrame === "fiberglass") {
            handleChangeRadio({target: {value: "sdp"}}, 0, id_attribute_umbrellaMaterial);
        }
    }, [umbrellaFrame]);

    useEffect(() => {
        if (refAddToCart && refAddToCart.current) {
            setAddToCartOffset(refAddToCart.current.offsetTop);
        } else {
            setAddToCartOffset(0);
        }
    }, [refAddToCart]);

    useEffect(() => {
        if (products.length < 1) return;

        viewItem(products[0]);

        setProductId(products[0].id.toString());
        setProductName(products[0].name);
        setProductType(products[0].type);

        if (products[0].hasOwnProperty("image")) {
            setMainImage([products[0].image]);
        } else if (products[0].hasOwnProperty("images")) {
            setMainImage(products[0].images);
        }

        setRegularPrice(products[0].regular_price);
        setSalePrice(products[0].sale_price);
    }, [products]);

    useEffect(() => {
        if (!productComponent || productComponent.length === 0) return;

        let selectedAttrList = [];
        productComponent.map((component, indexC) => {
            if (component.type === "variable") {
                let defaultAttr = [...component.default_attributes];

                defaultAttr.forEach((attr) => {
                    if (attr.id === id_attribute_umbrellaSize) {
                        if (router.query.size) {
                            attr.option = router.query.size;
                        } else if (umbrellaSize) {
                            attr.option = umbrellaSize;
                        } else {
                            attr.option = stringFn.replaceDash(attr.option, 2);
                        }

                        if (indexC === 0) {
                            setUmbrellaSize(attr.option);
                        }
                    } else if (attr.id === id_attribute_umbrellaFrame) {
                        if (router.query.type) {
                            attr.option = router.query.type;
                        } else if (umbrellaFrame) {
                            attr.option = umbrellaFrame.toLowerCase();
                        }

                        if (indexC === 0) {
                            santoriniFrame = attr.option;
                            setUmbrellaFrame(attr.option);
                        }
                    } else if (attr.id === id_attribute_color) {
                        if (router.query.color) {
                            attr.option = router.query.color;
                        } else if (umbrellaColor) {
                            attr.option = umbrellaFrame.toLowerCase();
                        } else {
                            attr.option = stringFn.replaceDash(attr.option, 1);
                        }

                        if (indexC === 0) {
                            setUmbrellaColor(attr.option);
                        }
                    } else if (attr.id === id_attribute_umbrellaMaterial) {
                        if (router.query.fabric) {
                            attr.option = router.query.fabric;
                        } else if (umbrellaFabric) {
                            attr.option = umbrellaFabric.toLowerCase();
                        }

                        if (indexC === 0) {
                            setUmbrellaFabric(attr.option);
                        }
                    }
                });
                selectedAttrList.push([...defaultAttr]);
            }
        });
        // 初始化各产品默认变体参数
        setSelectedAttribute(selectedAttrList);
        setInitSelectedAttribute(true);

        // 获取,保存各组件变体产品信息
        setInitProductVariant(true);
    }, [productComponent]);

    useEffect(() => {
        if (!initSelectedAttribute || !initProductVariant) return;
        // 获取,保存各组件默认变体产品信息
        let selectedVariantList = [];
        selectedAttribute.forEach((attr, index) => {
            if (!attr || index > 0) return;
            let selected = productVariant[index].filter((variant) => {
                if (!variant || !variant.attributes) return false;
                let equal = true;
                const initSelectedVariant = (a, b, indexA, indexB) => {
                    let indexC = indexB;
                    for (let i = indexA; i < a.length; i++) {
                        if (indexC < b.length) {
                            if (a[i].id === b[indexC].id) {
                                if (a[i].option.toLowerCase() !== b[indexC].option.toLowerCase()) {
                                    equal = false;
                                    break;
                                }
                                indexC++;
                            } else {
                                initSelectedVariant(a, b, i + 1, indexC);
                                break;
                            }
                        }
                    }
                };
                initSelectedVariant(attr, variant.attributes, 0, 0);
                return equal;
            });
            selectedVariantList[index] = selected[0];

            if (index === 0) {
                // 初始化数据
                setSelectedVariant(selectedVariantList);
            }
        });
    }, [initSelectedAttribute, initProductVariant]);

    useEffect(() => {
        // 已选各产品组成变体
        if (!selectedVariant || selectedVariant.length === 0) return;

        selectedVariant.forEach((variant, index) => {
            if (!variant || !variant.attributes) return;

            if (index === 0) {
                if (variant.hasOwnProperty("image") && variant.image) {
                    setMainImage([variant.image]);
                } else if (variant.hasOwnProperty("images") && variant.images.length > 0) {
                    setMainImage(variant.images);
                }

                setRegularPrice(variant.regular_price);
                setSalePrice(variant.sale_price);
            }
        });

        checkProduct_getPrice();
    }, [selectedVariant]);

    useEffect(() => {
        if (totalCount === 0) return;

        checkProduct_getPrice();
    }, [totalCount]);

    useEffect(() => {
        if (!selectedVariant || selectedVariant.length === 0) return;

        checkoutProductList = [];

        let available = true;
        availableList.forEach((item, index) => {
            if (!item || !available) return;
            // 没货 直接返回
            if (!item.status) {
                if (!item.optional) {
                    available = false;
                    setIsInStock(false);
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
                    setIsInStock(false);
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
                    setIsInStock(false);
                    setMessage("Insufficient stock → " + productComponent[index].name);
                    return;
                } else {
                    checkoutProductList[i].quantity = needed;
                }
            }
            setIsInStock(true);
            setMessage("");
        });
        setAvailable(available);
    }, [availableList]);

    const SelectionList = ({index, data = {attributes: []}}) => {
        let sl = data.attributes.filter((attribute) => attribute.variation);
        return (
            <>
                {sl.map((attribute, i) => {
                    return (
                        <Block key={i} font="MinXLabel14"
                               overrides={{
                                   Block: {
                                       props: {
                                           className: styles["container-product-section"]
                                       },
                                   },
                               }}
                        >
                            <Block marginBottom="16px" font="MinXHeading16">{attribute.name}</Block>
                            <Selection data={attribute}
                                       value={selectedAttribute[index] ? selectedAttribute[index][i].option.toLowerCase() : ""}
                                       onChange={(event) => handleChangeRadio(event, index, attribute.id)}
                            />
                        </Block>
                    )
                })}
            </>
        )
    }

    return (
        <ThemeProvider.V2>
            <Head>
                <title>{productName ? productName + " - Umbrella | WESTSHADE" : ""}</title>
            </Head>
            <Block width="100%" minWidth="320px" display="flex" flexDirection={["column", null, "row"]} overflow="hidden">
                {/* 图片区域 - Contain Layer*/}
                <Block flex={[0, null, 1]} marginBottom={["16px", null, "unset"]} paddingLeft={[null, null, "calc(50vw - " + process.env.maxWidth / 2 + "px)"]}
                    // backgroundColor={["white", null, "#F7F7F7"]}
                >
                    <Block display={["flex", null, "grid"]} flexDirection="column" justifyContent="space-between" width="100%" height="100%" paddingRight={["16px", null, "10px", "16px"]} paddingLeft={["16px", null, "20px"]}
                           paddingBottom={[null, null, "30px"]}>
                        {/*Content Layer*/}
                        <Block>
                            {/*Section Breadcrumbs*/}
                            <Block className="breadcrumb" as="ul" display={["flex", null, "none"]} alignItems="center" height="40px" font="MinXParagraph12" color="MinXSecondaryText">
                                <Block as="li"><Link href="/">Home</Link></Block>
                                <Block as="li"><Link href="/umbrella">Umbrella</Link></Block>
                                <Block as="li"><Link href="#">{productName}</Link></Block>
                            </Block>
                            <Block display={["flex", null, "none"]} justifyContent="space-between" marginBottom="4px" font="MinXParagraph14">
                                {/*Section Rated*/}
                                <Block display="flex" justifyContent="flex-start" alignItems="center" marginBottom="4px">
                                    <Block display="flex" alignItems="center" position="relative" height="14px" marginRight={["8px", null, "12px", "16px"]}>
                                        <Image src="/images/icon/icon-rate.png" alt="icon-rate" width={78} height={14} layout="intrinsic" objectFit="contain"/>
                                    </Block>
                                    <Block font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]}>4.8/5</Block>
                                </Block>
                                {productId === id_product_umbrella_kapri ? (
                                    <Block width="max-content" padding="0 8px" backgroundColor="rgba(235, 81, 42, 0.05)" color="#EB512A" $style={{border: "1px solid #EB512A", borderRadius: "3px"}}>BEST SELLER</Block>
                                ) : null}
                            </Block>
                            {/*Section Title*/}
                            <Block className="text-uppercase" display={["flex", null, "none"]} alignItems="center" marginBottom="4px" font={["MinXHeading20", "MinXHeading20", "MinXHeading14", "MinXHeading20"]}
                                   $style={{fontWeight: "500 !important", lineHeight: "1 !important", whiteSpace: "nowrap"}}>{productName}</Block>
                            {/*Section Price*/}
                            <Block display={["grid", null, "none"]} gridTemplateColumns="repeat(3, max-content)" gridColumnGap="12px" alignItems="baseline">
                                <SectionPrice totalRegularPrice={totalRegularPrice} totalSalePrice={totalSalePrice} priceBeatOnClick={() => setPriceBeatIsOpen(true)}/>
                            </Block>
                            <ProductImages gallery={productImageGallery}/>
                        </Block>
                        <Block display={["none", null, "flex"]} alignItems="flex-end" font="MinXParagraph12" color="MinXSecondaryText">
                            Your event whether it is a farmers market, trade show, art show, or pet show would not be complete without the coverage of a high quality water and scratch resistant pop-up tent. Our pop up tents come
                            with UV resistant and fire retardant fabric that can withstand all weather conditions. So whether you’re in the market for selling produce or art; our pop up tents can take your business to higher
                            levels. We provide free mock-ups and also free shipping. We are here to provide custom canopy tents that help your brand.
                        </Block>
                    </Block>
                </Block>
                {/* 选择区域 */}
                <Block flex={[0, null, 1]} paddingRight={[null, null, "calc(50vw - " + process.env.maxWidth / 2 + "px)"]} paddingBottom={["24px", null, 0]} backgroundColor={["#F7F7F7", null, "white"]}>
                    <Block width="100%" height="100%" paddingRight={["16px", null, "20px"]} paddingLeft={["16px", null, "10px", "16px"]}>
                        {/*Content Layer*/}
                        <Block maxWidth={["500px", null, "533px"]} marginRight="auto" marginLeft="auto" paddingBottom={[null, null, "10px"]}>
                            {/*Section Breadcrumbs*/}
                            <Block className="breadcrumb" as="ul" display={["none", null, "flex"]} alignItems="center" height="46px" font={["MinXParagraph12", "MinXParagraph12", "MinXParagraph12", "MinXParagraph14"]}
                                   color="MinXSecondaryText">
                                <Block as="li"><Link href="/">Home</Link></Block>
                                <Block as="li"><Link href="/umbrella">Umbrella</Link></Block>
                                <Block as="li"><Link href="#">{productName}</Link></Block>
                            </Block>
                            <Block position="relative" display="grid" gridRowGap={["12px", null, null, "16px"]} width="100%" padding={[null, null, "12px 16px", "16px 24px"]} overflow="hidden"
                                   $style={{'@media (min-width: 672px)': {border: "1px solid #D9D9D9"}}}>
                                {/*Corner Ribbon*/}
                                {productId === id_product_umbrella_kapri ? (
                                    <Block className="text-center" display={["none", null, "block"]} width="150px" position="absolute" top={[null, null, "25px", "30px"]} right={[null, null, "-40px", "-34px"]} backgroundColor="#F5FCFC"
                                           font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph14", "MinXParagraph16"]} color="#23A4AD" $style={{border: "1px solid #23A4AD", transform: "rotate(45deg)"}}>
                                        BEST SELLER
                                    </Block>
                                ) : null}
                                {/*Section Rated*/}
                                <Block display={["none", null, "flex"]} justifyContent="flex-start" alignItems="center">
                                    <Block display="flex" alignItems="center" position="relative" height={[null, null, "14px", "20px"]} marginRight={["8px", null, "12px", "16px"]}>
                                        <Image src="/images/icon/icon-rate.png" alt="icon-rate" width={78} height={14} layout="intrinsic" objectFit="contain"/>
                                    </Block>
                                    <Block font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]}>4.8/5</Block>
                                </Block>
                                {/*Section Title*/}
                                <Block className="text-uppercase" display={["none", null, "flex"]} alignItems="center" font={["MinXHeading20", "MinXHeading20", "MinXHeading14", "MinXHeading20"]}
                                       $style={{fontWeight: "500 !important", lineHeight: "1 !important", whiteSpace: "nowrap"}}>{productName}</Block>
                                {/*Section Price*/}
                                <Block display={["none", null, "grid"]} gridTemplateColumns="max-content max-content 1fr" gridColumnGap={["12px", null, null, "16px"]} alignItems="baseline">
                                    <SectionPrice totalRegularPrice={totalRegularPrice} totalSalePrice={totalSalePrice} priceBeatOnClick={() => setPriceBeatIsOpen(true)}/>
                                </Block>
                                {/*Section Selection*/}
                                <Block>
                                    <Block display="grid" gridTemplateColumns={["1fr 1fr", null, "1fr"]} gridColumnGap="16px" gridRowGap={[null, null, "10px", "12px"]}>
                                        <Block display="grid" gridColumnGap="10px" gridTemplateAreas={[`"a b" "c c"`, null, `"a c b"`]} gridTemplateColumns={["1fr 86px", null, "60px 1fr 90px", "68px 1fr 128px"]}
                                               gridTemplateRows={["repeat(2, 44px)", null, "30px", "44px"]} alignItems="center"
                                        >
                                            <Block gridArea="a" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]}>Frame</Block>
                                            <Block gridArea="b">
                                                <Button.V1 type="outline" width={["86px", null, "90px", "128px"]} height={["24px", null, null, "30px"]} text='Compare frame'
                                                           font={["MinXParagraph10", "MinXParagraph10", "MinXParagraph10", "MinXParagraph12"]}
                                                           color="MinXSecondaryText" buttonStyle={{borderWidth: "1px !important", borderColor: "#D9D9D9"}} onClick={() => setFrameCompareOpen(true)}
                                                />
                                            </Block>
                                            <Block gridArea="c" height="100%" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]}>
                                                {productId !== id_product_umbrella_santorini ? (
                                                    <Block ref={refSelectA} display="flex" alignItems="center" height="100%" paddingLeft="10px" $style={{border: "1px solid rgb(191, 191, 191)", borderRadius: "4px"}}>
                                                        {productId === id_product_umbrella_bali ? "Steel" : "Aluminum"}
                                                    </Block>
                                                ) : (
                                                    <Select controlRef={refSelectA}
                                                            backspaceRemoves={false}
                                                            clearable={false}
                                                            searchable={false}
                                                            deleteRemoves={false}
                                                            options={umbrellaSize === "10ft" ? [{label: "Aluminum", option: "aluminum"}] : [{label: "Aluminum", option: "aluminum"}, {label: "Fiberglass", option: "fiberglass"}]}
                                                            labelKey="label"
                                                            valueKey="option"
                                                            onChange={({value}) => {
                                                                setUmbrellaFrame(value[0].option.toLowerCase());
                                                                handleChangeRadio({target: {value: value[0].option}}, 0, id_attribute_umbrellaFrame);
                                                            }}
                                                            value={productId === id_product_umbrella_santorini && selectedAttribute[0] ? [{
                                                                label: stringFn.changeCase(selectedAttribute[0][3].option, 1),
                                                                option: selectedAttribute[0][3].option.toLowerCase()
                                                            }] : productId === id_product_umbrella_bali ? [{label: "Steel", option: "steel"}] : [{label: "Aluminum", option: "aluminum"}]}
                                                            overrides={{
                                                                Root: {
                                                                    style: {
                                                                        height: "inherit",
                                                                        fontFamily: "inherit", fontSize: "inherit"
                                                                    }
                                                                },
                                                                ControlContainer: {
                                                                    style: {
                                                                        height: "inherit",
                                                                        borderTopWidth: "1px",
                                                                        borderRightWidth: "1px",
                                                                        borderBottomWidth: "1px",
                                                                        borderLeftWidth: "1px",
                                                                        borderColor: "#BFBFBF !important",
                                                                        borderRadius: "4px",
                                                                        backgroundColor: "transparent",
                                                                        alignItems: "center"
                                                                    }
                                                                },
                                                                ValueContainer: {
                                                                    style: {
                                                                        paddingTop: 0, paddingBottom: 0, height: "min-content"
                                                                    }
                                                                },
                                                                SelectArrow: {
                                                                    props: {
                                                                        overrides: {
                                                                            Svg: {
                                                                                style: productId !== id_product_umbrella_santorini ? {
                                                                                    display: "none"
                                                                                } : {
                                                                                    display: "inline-block",
                                                                                    width: "20px",
                                                                                    height: "20px"
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                Popover: {
                                                                    props: {
                                                                        overrides: {
                                                                            Body: {
                                                                                style: {
                                                                                    zIndex: 4
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }}
                                                        // disabled={productId !== id_product_umbrella_santorini}
                                                    />
                                                )}
                                            </Block>
                                        </Block>
                                        {productComponent && productComponent[0] && productComponent[0].attributes.filter((attribute) => attribute.id === id_attribute_umbrellaSize && attribute.variation).length > 0 ? (
                                            <Block display="grid" gridColumnGap="10px" gridTemplateAreas={[`"a b" "c c"`, null, `"a c b"`]} gridTemplateColumns={["1fr 86px", null, "60px 1fr 90px", "68px 1fr 128px"]}
                                                   gridTemplateRows={["repeat(2, 44px)", null, "30px", "44px"]} alignItems="center"
                                            >
                                                <Block gridArea="a" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]}>Size</Block>
                                                <Block gridArea="b">
                                                    <Button.V1 type="outline" width={["86px", null, "90px", "128px"]} height={["24px", null, null, "30px"]} text='Size guide'
                                                               font={["MinXParagraph10", "MinXParagraph10", "MinXParagraph10", "MinXParagraph12"]}
                                                               color="MinXSecondaryText" buttonStyle={{borderWidth: "1px !important", borderColor: "#D9D9D9"}} onClick={() => setSizeGuideOpen(true)}
                                                    />
                                                </Block>
                                                <Block gridArea="c" height="100%" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]}>
                                                    <Select controlRef={refSelectB}
                                                            backspaceRemoves={false}
                                                            clearable={false}
                                                            searchable={false}
                                                            deleteRemoves={false}
                                                            options={productComponent[0].attributes.filter((attribute) => attribute.id === id_attribute_umbrellaSize && attribute.variation)[0].options.map(item => ({
                                                                label: item,
                                                                option: item
                                                            })) || []}
                                                            labelKey="label"
                                                            valueKey="option"
                                                            onChange={({value}) => {
                                                                setUmbrellaSize(value[0].option.toLowerCase());
                                                                handleChangeRadio({target: {value: value[0].option}}, 0, id_attribute_umbrellaSize)
                                                            }}
                                                            value={selectedAttribute[0] && [{label: selectedAttribute[0][0].option.toLowerCase(), option: selectedAttribute[0][0].option.toLowerCase()}]}
                                                            overrides={{
                                                                Root: {
                                                                    style: {
                                                                        height: "inherit",
                                                                        fontFamily: "inherit", fontSize: "inherit"
                                                                    }
                                                                },
                                                                ControlContainer: {
                                                                    style: {
                                                                        height: "inherit",
                                                                        borderTopWidth: "1px",
                                                                        borderRightWidth: "1px",
                                                                        borderBottomWidth: "1px",
                                                                        borderLeftWidth: "1px",
                                                                        borderColor: "#BFBFBF",
                                                                        borderRadius: "4px",
                                                                        backgroundColor: "transparent",
                                                                        alignItems: "center"
                                                                    }
                                                                },
                                                                ValueContainer: {
                                                                    style: {
                                                                        paddingTop: 0, paddingBottom: 0, height: "min-content"
                                                                    }
                                                                },
                                                                Popover: {
                                                                    props: {
                                                                        overrides: {
                                                                            Body: {
                                                                                style: {
                                                                                    zIndex: 4
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }}
                                                    />
                                                </Block>
                                            </Block>
                                        ) : null}
                                        {productComponent && productComponent[0] && productComponent[0].attributes.filter((attribute) => attribute.id === id_attribute_umbrellaMaterial && attribute.variation).length > 0 ? (
                                            <Block display="grid" gridColumnGap="10px" gridTemplateAreas={[`"a b" "c c"`, null, `"a c b"`]} gridTemplateColumns={["1fr 86px", null, "60px 1fr 90px", "68px 1fr 128px"]}
                                                   gridTemplateRows={["repeat(2, 44px)", null, "32px", "44px"]} alignItems="center"
                                            >
                                                <Block gridArea="a" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]}>Fabric</Block>
                                                <Block gridArea="b">
                                                    <Button.V1 type="outline" width={["86px", null, "90px", "128px"]} height={["24px", null, null, "30px"]} text='Compare Fabric'
                                                               font={["MinXParagraph10", "MinXParagraph10", "MinXParagraph10", "MinXParagraph12"]}
                                                               color="MinXSecondaryText" buttonStyle={{borderWidth: "1px !important", borderColor: "#D9D9D9"}} onClick={() => setFabricCompareOpen(true)}
                                                    />
                                                </Block>
                                                <Block gridArea="c" height="100%" font="MinXParagraph12">
                                                    <RadioGroup value={selectedAttribute[0] ? selectedAttribute[0][1].option.toLowerCase() : ""} onChange={(event) => handleChangeRadio(event, 0, id_attribute_umbrellaMaterial)} name="Fabric"
                                                                align={ALIGN.horizontal}
                                                                overrides={{
                                                                    RadioGroupRoot: {
                                                                        style: {
                                                                            display: "grid",
                                                                            gridTemplateColumns: productId === id_product_umbrella_santorini && umbrellaFrame === "fiberglass" ? "1fr" : "repeat(" + productComponent[0].attributes.filter((attribute) => attribute.id === id_attribute_umbrellaMaterial && attribute.variation)[0].options.length + ", 1fr)",
                                                                            gridColumnGap: "8px",
                                                                            height: "inherit"
                                                                        }
                                                                    },
                                                                    Root: {
                                                                        style: ({$checked}) => ({
                                                                            position: "relative",
                                                                            height: "inherit",
                                                                            justifyContent: "center",
                                                                            border: $checked ? "2px solid #23A4AD" : "1px solid #D9D9D9",
                                                                            borderRadius: "4px",
                                                                            boxSizing: "border-box",
                                                                            margin: 0,
                                                                            padding: 0,
                                                                            textAlign: "center"
                                                                        }),
                                                                    },
                                                                    RadioMarkOuter: {
                                                                        style: {display: "none"},
                                                                    },
                                                                    RadioMarkInner: {
                                                                        style: {display: "none"},
                                                                    },
                                                                    Label: {
                                                                        props: {
                                                                            className: ({$$disabled}) => $$disabled ? "radio-recommended" : null
                                                                        },
                                                                        style: ({$checked, $disabled}) => ({
                                                                            display: "flex",
                                                                            flexDirection: "column",
                                                                            justifyContent: "center",
                                                                            alignItems: "center",
                                                                            width: "100%",
                                                                            margin: 0,
                                                                            paddingLeft: 0,
                                                                            fontFamily: "inherit",
                                                                            fontSize: "inherit",
                                                                            fontWeight: "inherit",
                                                                            // filter: $disabled ? "grayscale(1)" : "unset",
                                                                            color: $disabled ? "#AFAFAF" : "#262626"
                                                                        }),
                                                                    },
                                                                }}
                                                    >
                                                        {/*{["agora", "sdp"].map((item, i) => {*/}
                                                        {/*    if (i === 0) {*/}
                                                        {/*        let indexA = productComponent[0].attributes.filter((attribute) => attribute.id === id_attribute_umbrellaMaterial && attribute.variation)[0].options.findIndex((option) => option.toLowerCase() === "agora");*/}
                                                        {/*        let agoraDisabled = indexA === -1;*/}

                                                        {/*        return (*/}
                                                        {/*            <Radio key={i} value={item} disabled={agoraDisabled || productId === id_product_umbrella_santorini && umbrellaFrame === "fiberglass"}>*/}
                                                        {/*                {agoraDisabled || productId === id_product_umbrella_santorini && umbrellaFrame === "fiberglass" ? null : (*/}
                                                        {/*                    <Block id="recommended" display="block" position="absolute" top="-5px" left="9px" padding="0 1px" backgroundColor="white" font="MinXParagraph10" color="#23A4AD"*/}
                                                        {/*                           $style={{lineHeight: 1}}>RECOMMENDED</Block>*/}
                                                        {/*                )}*/}
                                                        {/*                <Block position="relative" width="60px" height="16px">*/}
                                                        {/*                    <Image src="/images/icon/icon-agora.png" alt="icon-agora" layout="fill" objectFit="contain"/>*/}
                                                        {/*                </Block>*/}
                                                        {/*                <Block $style={{lineHeight: 1}}>Acrylic</Block>*/}
                                                        {/*            </Radio>*/}
                                                        {/*        )*/}
                                                        {/*    } else if (i === 1) {*/}
                                                        {/*        let indexB = productComponent[0].attributes.filter((attribute) => attribute.id === id_attribute_umbrellaMaterial && attribute.variation)[0].options.findIndex((option) => option.toLowerCase() === "sdp");*/}
                                                        {/*        let sdpDisabled = indexB === -1;*/}

                                                        {/*        return (*/}
                                                        {/*            <Radio key={i} value={item} disabled={sdpDisabled}>*/}
                                                        {/*                <Block marginBottom="2px" font="MinXParagraph14" $style={{fontWeight: "500", lineHeight: 1}}>SDP</Block>*/}
                                                        {/*                <Block $style={{lineHeight: 1}}>Polyester</Block>*/}
                                                        {/*            </Radio>*/}
                                                        {/*        )*/}
                                                        {/*    }*/}
                                                        {/*})}*/}
                                                        {productComponent[0].attributes.filter((attribute) => attribute.id === id_attribute_umbrellaMaterial && attribute.variation)[0].options.map((option, i) => {
                                                            if (option.toLowerCase() === "agora") {
                                                                if (productId === id_product_umbrella_santorini && umbrellaFrame === "fiberglass") return;
                                                                return (
                                                                    <Radio key={i} value={option.toLowerCase()} disabled={productId === id_product_umbrella_santorini && umbrellaFrame === "fiberglass"}>
                                                                        <Block id="recommended" display="block" position="absolute" top="-5px" left="9px" padding="0 1px" backgroundColor="white" font="MinXParagraph10" color="#23A4AD"
                                                                               $style={{lineHeight: 1}}>RECOMMENDED</Block>
                                                                        <Block position="relative" width="60px" height="16px">
                                                                            <Image src="/images/icon/icon-agora.png" alt="icon-agora" layout="fill" objectFit="contain"/>
                                                                        </Block>
                                                                        <Block $style={{lineHeight: 1}}>Acrylic</Block>
                                                                    </Radio>
                                                                )
                                                            } else if (option.toLowerCase() === "sdp")
                                                                return (
                                                                    <Radio key={i} value={option.toLowerCase()}>
                                                                        <Block marginBottom="2px" font="MinXParagraph14" $style={{fontWeight: "500", lineHeight: 1}}>SDP</Block>
                                                                        <Block $style={{lineHeight: 1}}>Polyester</Block>
                                                                    </Radio>
                                                                )
                                                        })}
                                                    </RadioGroup>
                                                </Block>
                                            </Block>
                                        ) : null}
                                        {productComponent && productComponent[0] && productComponent[0].attributes.filter((attribute) => attribute.id === id_attribute_color && attribute.variation).length > 0 ? (
                                            <Block display="grid" gridColumnGap="10px" gridTemplateAreas={[`"a b" "c c"`, null, `"a c b"`]} gridTemplateColumns={["1fr 86px", null, "60px 1fr 90px", "68px 1fr 128px"]}
                                                   gridTemplateRows={["repeat(2, 44px)", null, "30px", "44px"]} alignItems="center"
                                            >
                                                <Block gridArea="a" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]}>Color</Block>
                                                <Block gridArea="b">
                                                    <Button.V1 type="rainbow" width={["86px", null, "90px", "128px"]} height={["24px", null, null, "30px"]} text='Customize'
                                                               font={["MinXParagraph10", "MinXParagraph10", "MinXParagraph10", "MinXParagraph12"]}
                                                               color="MinXPrimaryText" buttonBackgroundColor="#FFF" buttonStyle={{padding: "1px !important", boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.1)", zIndex: 1}}
                                                               buttonHoverStyle={{color: "#8C8C8C"}}
                                                               onClick={() => router.push("/custom-printing/umbrella")}
                                                    />
                                                </Block>
                                                <Block gridArea="c" height="100%" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]}>
                                                    <Select controlRef={refSelectC}
                                                            backspaceRemoves={false}
                                                            clearable={false}
                                                            searchable={false}
                                                            deleteRemoves={false}
                                                            options={productComponent[0].attributes.filter((attribute) => attribute.id === id_attribute_color && attribute.variation)[0].options.map(item => ({
                                                                label: stringFn.changeCase(item, 1),
                                                                option: item
                                                            })) || []}
                                                            labelKey="label"
                                                            valueKey="option"
                                                            onChange={({value}) => handleChangeRadio({target: {value: value[0].option}}, 0, id_attribute_color)}
                                                            value={selectedAttribute[0] ? [{label: stringFn.changeCase(selectedAttribute[0][2].option, 1), option: selectedAttribute[0][1].option.toLowerCase()}] : [{
                                                                label: "White",
                                                                option: "white"
                                                            }]}
                                                            overrides={{
                                                                Root: {
                                                                    style: {
                                                                        height: "inherit",
                                                                        fontFamily: "inherit", fontSize: "inherit"
                                                                    }
                                                                },
                                                                ControlContainer: {
                                                                    style: {
                                                                        height: "inherit",
                                                                        borderTopWidth: "1px",
                                                                        borderRightWidth: "1px",
                                                                        borderBottomWidth: "1px",
                                                                        borderLeftWidth: "1px",
                                                                        borderColor: "#BFBFBF",
                                                                        borderRadius: "4px",
                                                                        backgroundColor: "transparent",
                                                                        alignItems: "center"
                                                                    }
                                                                },
                                                                ValueContainer: {
                                                                    style: {
                                                                        paddingTop: 0, paddingBottom: 0, height: "min-content"
                                                                    }
                                                                },
                                                                Popover: {
                                                                    props: {
                                                                        overrides: {
                                                                            Body: {
                                                                                style: {
                                                                                    zIndex: 4
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }}
                                                    />
                                                </Block>
                                            </Block>
                                        ) : null}
                                    </Block>
                                    {productComponent.length > 1 ? (
                                        <Block display="grid" gridColumnGap="10px" gridTemplateAreas={[`"a b" "c c"`, null, `"a c" "d b"`]} gridTemplateColumns={["1fr auto", null, "60px 1fr", "68px 1fr"]}
                                               gridTemplateRows={["44px 56px", null, "46px auto", "56px auto"]} gridRowGap="4px" alignItems="center" marginTop={[null, null, "10px", "12px"]}
                                        >
                                            <Block gridArea="a" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]}>Base</Block>
                                            <Block gridArea="b" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]}
                                                   $style={{textAlign: "left", lineHeight: "1.2 !important", '@media (max-width: 672px)': {textAlign: "right"}}}
                                            >
                                                {/*<Block as="span" color="#356DB6">FREE</Block> protection cover with your purchase of any umbrella.*/}
                                            </Block>
                                            <Block gridArea="c" display="grid" gridTemplateColumns={productComponent.length > 2 ? "1fr 1fr" : "1fr"} gridColumnGap="8px" width="100%" height={["56px", null, "46px", "56px"]}>
                                                {productComponent.map((component, index) => {
                                                    if (index === 0) {
                                                        return null;
                                                    } else {
                                                        let img;

                                                        if (component.hasOwnProperty("image")) {
                                                            img = [component.image];
                                                        } else if (component.hasOwnProperty("images")) {
                                                            img = component.images;
                                                        }

                                                        return <ProductItem key={component.name} image={img} title={component.name} price={component.price}
                                                                            status={!!selectedVariant[index]}
                                                                            onClick={() => {
                                                                                let selectionVariant = [...selectedVariant];

                                                                                if (selectionVariant[index]) {
                                                                                    selectionVariant[index] = null;
                                                                                } else {
                                                                                    if (component.type === "simple") {
                                                                                        selectionVariant[index] = component;
                                                                                    } else {
                                                                                        handleChangeRadio({target: {value: umbrellaSize}}, index, id_attribute_umbrellaSize);
                                                                                        return;
                                                                                    }
                                                                                }

                                                                                setSelectedVariant(selectionVariant)
                                                                            }}
                                                        />
                                                    }
                                                })}
                                            </Block>
                                        </Block>
                                    ) : null}
                                </Block>
                                <Block display="grid" gridColumnGap="12px" gridRowGap="12px" gridTemplateAreas={[`"b" "f" "d" "e" "c"`, null, `"b c" "d d" "e e" "f f"`]} alignItems="center" paddingBottom={["16px", null, 0]}>
                                    {/*Section Stock*/}
                                    <Block gridArea="b" display="flex" alignItems="center" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]}>
                                        <Block className="round" width="5px" height="5px" minWidth="5px" marginRight="6px" backgroundColor={isInStock ? "#2DCA59" : "#E51717"}/>
                                        {isInStock ? "In Stock" : "Out of Stock"}
                                        {productId === id_product_umbrella_bali ? null : (
                                            <Block marginLeft={["8px", null, "10px", "16px"]}>
                                                <Block width="max-content" padding="2px 8px" backgroundColor="#F5FCFC" $style={{border: "1px solid #23A4AD", borderRadius: "3px"}}>Limited Stock</Block>
                                            </Block>
                                        )}
                                    </Block>
                                    {/*Section Question*/}
                                    <Block gridArea="c">
                                        <Button.V1 width="max-content" height={["32px", null, "18px"]} marginLeft="auto" marginRight={["auto", null, "unset"]} color={["#262626", null, "#8C8C8C"]}
                                                   buttonBackgroundColor="#F2F2F2" buttonHoverBackgroundColor="#F2F2F2" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]}
                                                   text="Have question? Ask an expert" buttonStyle={{paddingRight: "12px", paddingLeft: "12px", '@media (max-width: 672px)': {backgroundColor: "#D9D9D9", borderRadius: "4px !important"}}}
                                                   onClick={() => setQuestionIsOpen(true)}
                                        />
                                    </Block>
                                    {/*Section AddToBag*/}
                                    <Block ref={refAddToCart} gridArea="d" display="flex" $style={{gap: "8px"}}>
                                        <Block width="33%" display="flex" flexDirection="row" alignItems="center" justifyContent="center" $style={{border: "1px solid #BFBFBF", borderRadius: "4px"}}>
                                            <Button.V1 type="text" shape="circle" display="flex" justifyContent="center" flex={1} width="100%" height={["43px", null, "29px", "39px"]} color="#262626" buttonBackgroundColor="transparent"
                                                       buttonStyle={{width: "100% !important"}}
                                                       onClick={() => totalCount !== 1 && setTotalCount(totalCount - 1)}
                                                       disabled={totalCount === 1}><CheckIndeterminate size={12}/></Button.V1>
                                            <Block margin="auto 12px" font="MinXLabel14">{totalCount}</Block>
                                            <Button.V1 type="text" shape="circle" display="flex" justifyContent="center" flex={1} width="100%" height={["43px", null, "29px", "39px"]} color="#262626" buttonBackgroundColor="transparent"
                                                       buttonStyle={{width: "100% !important"}}
                                                       onClick={() => setTotalCount(totalCount + 1)} disabled={!isInStock}><Plus size={12}/></Button.V1>
                                        </Block>
                                        <Block flex={1}>
                                            <Button.V1 shape="square" width="100%" height={["44px", null, "30px", "40px"]} color="#262626" buttonBackgroundColor="#FFD747" buttonHoverBackgroundColor="rgb(255, 215, 71, 0.6)" text="Add To Bag"
                                                       font={["MinXParagraph16", "MinXParagraph16", "MinXParagraph12", "MinXParagraph16"]} buttonStyle={{paddingLeft: 0, paddingRight: 0}}
                                                       onClick={() => updateCart()} disabled={!availableToCheckout}/>
                                        </Block>
                                    </Block>
                                    {/*Section Shipping Note*/}
                                    <Block gridArea="e">
                                        <ShippingNote.V2/>
                                    </Block>
                                    {/*Section Price*/}
                                    <Block gridArea="f" display={["grid", null, "none"]} gridTemplateColumns="max-content max-content 1fr" gridColumnGap={["12px", null, null, "16px"]} alignItems="baseline">
                                        <SectionPrice totalRegularPrice={totalRegularPrice} totalSalePrice={totalSalePrice} priceBeatOnClick={() => setPriceBeatIsOpen(true)}/>
                                    </Block>
                                </Block>
                            </Block>
                        </Block>
                    </Block>
                </Block>
            </Block>
            <ProductDescription product={
                productId === id_product_umbrella_bali ? "bali" :
                    productId === id_product_umbrella_catalina ? "catalina" :
                        productId === id_product_umbrella_kapri ? "kapri" :
                            productId === id_product_umbrella_marco ? "marco" :
                                productId === id_product_umbrella_santorini ? "santorini" :
                                    null}
                                santoriniFrame={santoriniFrame}
            />
            {addToCartOffset ? (
                <Checkout.V2 quantity={totalCount} isInStock={isInStock} buttonText={isInStock ? "Add to Bag" : "Out of Stock"} isAvailable={availableToCheckout}
                             onClick={() => openSummaryModal()}
                             onClickMinus={() => totalCount !== 1 && setTotalCount(totalCount - 1)}
                             onClickPlus={() => setTotalCount(totalCount + 1)}
                             onClickAddToBag={() => updateCart()}
                             onSale={selectedVariant.length > 0 ? selectedVariant[0].on_sale : false} totalPrice={totalRegularPrice} totalSalesPrice={totalSalePrice}
                             scrollDisplay
                             offSetHeight={addToCartOffset}
                />
            ) : null}
            <BackToTop.V1/>
            <Modal type="alertdialog" isOpen={priceBeatIsOpen} onClose={() => setPriceBeatIsOpen(false)} content="priceBeat"
                   dialogStyles={{width: "100% !important", maxWidth: "min((100vw - 48px), 434px) !important", margin: 0, borderRadius: "4px !important"}}/>
            <Modal type="alertdialog" isOpen={questionIsOpen} onClose={() => setQuestionIsOpen(false)} content="contact" phone={phone}
                   dialogStyles={{width: "100% !important", maxWidth: "min((100vw - 48px), 720px) !important", margin: 0, borderRadius: "4px !important"}}/>
            <Modal type="alertdialog" isOpen={fabricCompareOpen} onClose={() => setFabricCompareOpen(false)} content="fabric"/>
            <Modal type="dialog" isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} content="size_umbrella"/>
            <Modal type="alertdialog" isOpen={frameCompareOpen} onClose={() => setFrameCompareOpen(false)} content="frame_umbrella"/>
            <Modal type="dialog" isOpen={summaryIsOpen} onClose={() => closeSummaryModal()} content="summary" dataTable={{productComponent, selectedVariant, totalSalePrice, totalRegularPrice, totalCount}}/>
        </ThemeProvider.V2>
    );
}

Umbrella.getInitialProps = async (context) => {
    const {query} = context;
    const {id} = query;
    // let product = null,
    //     component = [],
    //     variant = [];

    // const id_product_umbrella_marco = "49555";
    // const id_product_umbrella_santorini = "47943";
    // const id_product_umbrella_bali = "30361";
    // const id_product_umbrella_kapri = "59850";
    // const id_product_umbrella_catalina = "30441";

    const ids = [id, 62455];
    let products = null,
        variants = [];

    // product = await utils.getProductByWooId(id);
    // if (product && product.type === "simple") {
    //     component[0] = {...product};
    // } else if (product && product.type === "variable") {
    //     component[0] = {...product};
    //     variant[0] = await utils.getVariantByWooProductId(id);
    // }

    products = await Promise.all(ids.map((id) => utils.getProductByWooId(id)));
    variants = await Promise.all(ids.map((id) => utils.getVariantByWooProductId(id)));


    // return {
    //     product: product,
    //     productComponent: component,
    //     productVariant: variant,
    // };

    return {
        products: products,
        variants: variants,
        fullPage: true
    };
};

export default withRouter(Umbrella);
