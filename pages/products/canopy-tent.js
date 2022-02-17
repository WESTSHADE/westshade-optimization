import React, {useEffect, useState, createRef, useRef} from "react";
import {useDispatch, useSelector} from 'react-redux'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import NumberFormat from "react-number-format";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ReactPlayer from "react-player";

import {withRouter} from "next/router";
import Head from "next/head";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";

import {Block} from "baseui/block";
import {Tabs, Tab, FILL} from "baseui/tabs-motion";
import {Button, KIND, SHAPE} from "baseui/button";
import {RadioGroup, Radio, ALIGN} from "baseui/radio";
import {ListItem, ListItemLabel} from "baseui/list";
import {Plus, ChevronLeft, ChevronRight, CheckIndeterminate} from "baseui/icon";
import {StatefulTooltip, PLACEMENT, TRIGGER_TYPE} from "baseui/tooltip";
import {AspectRatioBox, AspectRatioBoxBody} from "baseui/aspect-ratio-box";
import {Select, TYPE} from 'baseui/select';

import {NumberFn, StringFn, UrlFn} from "Utils/tools";
import Utils from "Utils/utils";
import {EventEmitter} from "Utils/events";

import {ProductDescription, ShippingNote} from "Components/Sections";
import Checkout from "Components/Checkout";
import {Modal} from "Components/surfaces";
import MButton from "Components/Button/V1";
import SelectionArea from "Components/selection_area";
import Selection from "Components/selection-n";
import BackToTop from "Components/BackToTop";
import ThemeProvider from "Components/ThemeProvider";

import {viewItem, addToCart} from "../../redux/actions/gtagActions";
import {updateUser} from "../../redux/actions/userActions";
import {modifyCart} from "../../redux/actions/cartActions";

const numberFn = new NumberFn();
const stringFn = new StringFn();
const utils = new Utils();
const urlFn = new UrlFn();

const id_product_roof = 31855;
const id_product_roof_printed = 59164;
const id_product_wall = 26516;
const id_product_wall_printed = 30506;
const id_product_canopy_frame = 58944;

const id_attribute_canopyColor = 3;
const id_attribute_canopySize = 4;
const id_attribute_wallType = 11;
const id_attribute_wallSize = 14;

const wallMap = new Map([
    [
        "type",
        [
            {key: "full", value: "FW"},
            {key: "half", value: "HW"},
            {key: "mesh", value: "MW"},
            {key: "pvc", value: "PW"},
            {key: "rollup", value: "RW"},
        ],
    ],
    [
        "side",
        [
            {key: 1, value: "A"},
            {key: 2, value: "C"},
            {key: 3, value: "D"},
            {key: 4, value: "B"},
        ],
    ],
    [
        "size",
        [
            {key: "10x10", value: "10"},
            {key: "10x15", value: "15"},
            {key: "10x20", value: "20"},
            {key: "13x13", value: "13"},
            {key: "13x20", value: "1320"},
            {key: "13x26", value: "26"},
            {key: "16x16", value: "16"},
            {key: "20x20", value: "2020"},
        ],
    ],
    [
        "color",
        [
            {key: "white", value: "WH"},
            {key: "black", value: "BK"},
            {key: "blue", value: "BU"},
            {key: "green", value: "GN"},
            {key: "red", value: "RD"},
            {key: "yellow", value: "YE"},
        ],
    ],
]);
const selectionWallType = ["None", "Full", "Half", "Mesh", "PVC", "Rollup"];
const selectionColor = ["White", "Black", "Red", "Yellow", "Blue", "Green"];

let checkoutProductList = [];

const getSizeLabel = (text) => {
    let stringList = text ? text.split("x") : [];

    return stringList.length > 0 ? `${stringList[0]}' x ${stringList[1]}'` : text;
}

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
                        Save <NumberFormat thousandSeparator={true} prefix={"$"} value={totalRegularPrice - totalSalePrice} displayType="text"/>
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

function Canopy_Tent({router, products, variants, phone}) {
    const refSelectA = useRef(null);
    const refSelectB = useRef(null);
    const refSelectC = useRef(null);

    const refAddToCart = useRef(null);

    const [tabPictureActiveKey, setTabPictureActiveKey] = useState(0);

    const [productComponent, setProductComponent] = useState([products[2], products[3], products[3], products[3], products[3]]);
    const [productVariant, setProductVariant] = useState([variants[2], variants[3], variants[3], variants[3], variants[3]]);

    const [selectedFrame, setSelectedFrame] = useState("y7");
    const [selectedSize, setSelectedSize] = useState("10x10");
    const [selectedColor, setSelectedColor] = useState("white");

    const [productImageGallery, setProductImageGallery] = useState([]);
    const [productImageGalleryTemp, setProductImageGalleryTemp] = useState([]);

    const [selectedAttribute, setSelectedAttribute] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState([]);

    const [initProductVariant, setInitProductVariant] = useState(false);
    const [initSelectedAttribute, setInitSelectedAttribute] = useState(false);

    const [totalRegularPrice, setTotalRegularPrice] = useState(0);
    const [totalSalePrice, setTotalSalePrice] = useState(0);
    const [totalCount, setTotalCount] = useState(1);

    const [message, setMessage] = useState("");

    const [availableToCheckout, setAvailable] = useState(false);

    const [selectedWallColor, setSelectedWallColor] = useState("white");

    const [summaryIsOpen, setSummaryIsOpen] = useState(false);
    const [priceBeatIsOpen, setPriceBeatIsOpen] = useState(false);
    const [freeItemIsOpen, setFreeItemIsOpen] = useState(false);
    const [questionIsOpen, setQuestionIsOpen] = useState(false);

    const [isInStock, setIsInStock] = useState(true);

    const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
    const [frameCompareOpen, setFrameCompareOpen] = useState(false);

    const [addToCartOffset, setAddToCartOffset] = useState(0);

    const [wallAdded, setWallAdded] = useState(false);

    const [error, setError] = useState(false);

    ////////////////////////////////////////

    const [wallIsOpen, setWallIsOpen] = useState(false);

    const [activeTempWallTypeRadio, setActiveTempWallTypeRadio] = useState(-1);

    const [wallPrice, setWallPrice] = useState(0);
    const [wallPrices, setWallPrices] = useState([]);

    const [selectedWallVariantTemp, setSelectedWallVariantTemp] = useState([]);

    const [wallPriceList, setWallPriceList] = useState([]);
    const [wallPriceListTemp, setWallPriceListTemp] = useState([]);

    const [wallPlainAttributeList, setWallPlainAttributeList] = useState([]);
    const [wallPlainAttributeListTemp, setWallPlainAttributeListTemp] = useState([]);

    const [activeWall, setActiveWall] = useState(0);

    const [wallPictures, setWallPictures] = useState(["", "", "", ""]);
    const [wallPicturesTemp, setWallPicturesTemp] = useState(["", "", "", ""]);

    ////////////////////////////////////////

    const [availableList, setAvailableList] = useState([
        {id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true},
        {id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true},
        {id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true},
        {id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true},
        {id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true},
    ]);

    ////////////////////////////////////////

    const dispatch = useDispatch();

    const {loggedIn, token} = useSelector(({user}) => user);
    const {cart} = useSelector(({cart}) => cart);

    const openWallModal = (index) => {
        setActiveWall(index);
        setSelectedWallColor("white");

        const temp = JSON.parse(JSON.stringify(wallPlainAttributeList));
        setWallPlainAttributeListTemp(temp);

        const imageGalleryTemp = JSON.parse(JSON.stringify(productImageGallery));
        setProductImageGalleryTemp(imageGalleryTemp);

        const wallPicsTemp = JSON.parse(JSON.stringify(wallPictures));
        setWallPicturesTemp(wallPicsTemp);

        const wallPriceTemp = JSON.parse(JSON.stringify(wallPriceList));
        setWallPriceListTemp(wallPriceTemp);

        const variant = JSON.parse(JSON.stringify(selectedVariant));
        setSelectedWallVariantTemp(variant.slice(1));

        if (temp[0][0].option.toLowerCase() === "none") {
            setActiveTempWallTypeRadio(-1);
        } else if (temp[0][0].option.toLowerCase() === "full") {
            setActiveTempWallTypeRadio(0);
        } else if (temp[0][0].option.toLowerCase() === "half") {
            setActiveTempWallTypeRadio(1);
        } else if (temp[0][0].option.toLowerCase() === "mesh") {
            setActiveTempWallTypeRadio(2);
        } else if (temp[0][0].option.toLowerCase() === "pvc") {
            setActiveTempWallTypeRadio(3);
        } else {
            setActiveTempWallTypeRadio(4);
        }

        setWallIsOpen(true);
    };

    const closeWallModal = (save) => {
        if (save) {
            const wallPrice = JSON.parse(JSON.stringify(wallPriceListTemp));
            setWallPriceList(wallPrice);

            const temp = JSON.parse(JSON.stringify(wallPlainAttributeListTemp));
            let noValue = false;

            temp.map((attribute) => {
                attribute.forEach((attr) => {
                    if (attr.id === id_attribute_wallType && attr.option !== "none") {
                        noValue = true;
                    }
                });
            })

            if (!noValue) {
                setError(true);
                return;
            }

            setWallPlainAttributeList(temp);

            let selection = [JSON.parse(JSON.stringify(selectedAttribute))[0]].concat(temp);
            setSelectedAttribute(selection);

            let variantA = JSON.parse(JSON.stringify(selectedVariant));
            let variantB = JSON.parse(JSON.stringify(selectedWallVariantTemp));
            setSelectedVariant([variantA[0]].concat(variantB));
        }
        setError(false);
        setWallIsOpen(false);
    };

    const openSummaryModal = () => setSummaryIsOpen(true);

    const closeSummaryModal = () => setSummaryIsOpen(false);

    function renderCustomImage(props) {
        return (
            <AspectRatioBox aspectRatio={1} minHeight="230px">
                <AspectRatioBoxBody as={Image} src={props.original} alt={props.originalAlt} layout="fill" objectFit="contain" loader={({src, width}) => src} unoptimized/>
                {wallPictures.map((pic, index) => {
                    return (
                        <>
                            {pic ? (
                                <img key={index} className="image-gallery-image-wall" style={{zIndex: index === 0 ? 1 : index === 1 ? 3 : index === 2 ? 4 : index === 3 ? 2 : 1}} src={pic} alt="side-wall"/>
                            ) : null}
                        </>
                    )
                })}
            </AspectRatioBox>
        );
    }

    function renderCustomImageTemp(props) {
        return (
            <AspectRatioBox aspectRatio={1} minHeight="230px">
                <AspectRatioBoxBody as={Image} src={props.original} alt={props.originalAlt} layout="fill" objectFit="contain" loader={({src, width}) => src} unoptimized/>
                {wallPicturesTemp.map((pic, index) => {
                    return (
                        <div key={index}>
                            {activeWall === index ? (
                                <img className="image-gallery-image-wall"
                                     style={{zIndex: activeWall === 0 ? 2 : activeWall === 1 ? 6 : activeWall === 2 ? 8 : activeWall === 3 ? 4 : 2}}
                                     src={`${process.env.imageBaseUrl}/images/icon/icon-wall-${activeWall === 0 ? "left" : activeWall === 3 ? "back" : activeWall === 1 ? "right" : activeWall === 2 ? "front" : ""}-indicator-border-${selectedFrame}-${selectedSize}.png`}
                                     alt="side-wall-indicator"/>
                            ) : null}
                            {pic ? (
                                <img className="image-gallery-image-wall" style={{zIndex: index === 0 ? 1 : index === 1 ? 5 : index === 2 ? 7 : index === 3 ? 3 : 1}} src={pic}
                                     alt="side-wall"/>
                            ) : null}
                        </div>
                    )
                })}
            </AspectRatioBox>
        );
    }

    const setMainImage = (images) => {
        if (!images || images.length === 0) return;

        let i = [];
        images.map((img, index) => {
            let url = img.src;
            url = process.env.imageBaseUrl + url;
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

    useEffect(() => {
        if (wallIsOpen) {
            let resultList = [];

            let side = selectedSize.split("x")[(activeWall === 0 || activeWall === 1) ? 0 : 1] + "ft";
            if (side === "26ft") {
                side = "13ft"
            }

            let productList = productVariant[1].filter((variant, index) => {
                let resultSize = false;
                let resultColor = false;

                variant.attributes.map(attr => {
                    if (attr.id === id_attribute_wallSize && attr.option === side) {
                        resultSize = true;
                    } else if (attr.id === id_attribute_canopyColor && attr.option.toLowerCase() === selectedWallColor) {
                        resultColor = true;
                    }
                })

                if (resultSize && resultColor) {
                    return variant;
                }
            })

            resultList[0] = productList.find(product => {
                let p = false;

                product.attributes.map(attr => {
                    if (attr.id === id_attribute_wallType && attr.option === "Full") p = true;
                })

                if (p) return product;
            })
            resultList[1] = productList.find(product => {
                let p = false;

                product.attributes.map(attr => {
                    if (attr.id === id_attribute_wallType && attr.option === "Half") p = true;
                })

                if (p) return product;
            })
            resultList[2] = productList.find(product => {
                let p = false;

                product.attributes.map(attr => {
                    if (attr.id === id_attribute_wallType && attr.option === "Mesh") p = true;
                })

                if (p) return product;
            })
            resultList[3] = productList.find(product => {
                let p = false;

                product.attributes.map(attr => {
                    if (attr.id === id_attribute_wallType && attr.option === "PVC") p = true;
                })

                if (p) return product;
            })
            resultList[4] = productList.find(product => {
                let p = false;

                product.attributes.map(attr => {
                    if (attr.id === id_attribute_wallType && attr.option === "Rollup") p = true;
                })

                if (p) return product;
            })

            setWallPrices(resultList);
        }
    }, [wallIsOpen, activeWall]);

    useEffect(() => {
        let price = 0;

        let side = selectedSize.split("x")[1];

        wallPriceListTemp.map((p, index) => {
            if (side === "26" && (index === 2 || index === 3)) {
                price += p
            }

            price += p
        });

        setWallPrice(price);
    }, [wallPriceListTemp]);

    useEffect(() => {
        if (!productImageGallery || productImageGallery.length === 0) return;
        let images = JSON.parse(JSON.stringify(productImageGallery));

        images[0].renderItem = renderCustomImage;
        setProductImageGallery(images);
    }, [wallPictures]);

    useEffect(() => {
        if (!productImageGalleryTemp || productImageGalleryTemp.length === 0) return;
        let images = JSON.parse(JSON.stringify(productImageGalleryTemp));

        images[0].renderItem = renderCustomImageTemp;

        setProductImageGalleryTemp(images);
    }, [wallPicturesTemp]);

    const handleChangeRadio = (event, index, id) => {
        // Part 1: 更改选项List信息 并 保存
        let selection = JSON.parse(JSON.stringify(selectedAttribute));
        if (event && id) {
            selection[index].forEach((attribute) => {
                if (attribute.id === id) attribute.option = event.target.value;
            });
        } else {
            selection[index].forEach((attribute) => {
                if (attribute.id === id_attribute_canopySize && selectedFrame !== "y7" && (attribute.option !== "10x10" && attribute.option !== "10x15" && attribute.option !== "10x20")) {
                    attribute.option = "10x20";
                }
            });
        }
        // Part 2: 根据选项从VariantList中查找对应产品数据 并 保存
        let selectionVariant = JSON.parse(JSON.stringify(selectedVariant));
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
        // Part 2.5: Canopy Tent订制选项，根据Tent Size变更Wall Size, Roof Size
        if (index === 0 && id === id_attribute_canopySize) {
            let sizes = event.target.value.split("x");
            selection.forEach((item, indexA) => {
                if (indexA < 1) return;

                item.map((attribute) => {
                    if (attribute.id === id_attribute_canopySize) attribute.option = event.target.value;
                    if (attribute.id === id_attribute_wallSize) attribute.option = (indexA === 1 || indexA === 2) ? sizes[0] + "ft" : sizes[1] === "26" ? "13ft" : sizes[1] + "ft";
                });
                // 挑选出对应 Roof/Wall Variant.
                let selectedWall = productVariant[indexA].filter((variant) => {
                    if (!variant.attributes) return false;

                    let equal = true;
                    for (let i = 0; i < variant.attributes.length; i++) {

                        if (!item[i] || variant.attributes[i].option.toLowerCase() !== item[i].option.toLowerCase()) {
                            equal = false;
                            break;
                        }
                    }
                    return equal;
                });
                selectionVariant[indexA] = selectedWall[0];
            });
            setWallPlainAttributeList(selection.slice(-4));
        }
        // Part 3: 保存更改项
        setSelectedAttribute(selection);
        setSelectedVariant(selectionVariant);
    };

    const handleRemoveWall = () => {
        setWallPriceList([]);

        // Part 1: 更改选项List信息 并 保存
        let selection = JSON.parse(JSON.stringify(wallPlainAttributeList));
        selection.map(item => item.forEach((attribute) => (attribute.id === id_attribute_wallType ? (attribute.option = "none") : null)));
        // Part 2: 保存更改项
        setWallPlainAttributeList(selection);

        // Part 1: 更改选项List信息 并 保存
        let selectionA = JSON.parse(JSON.stringify(selectedAttribute));
        selection.forEach((attribute, index) => selectionA[index + 1] = attribute);
        // Part 2: 保存更改项
        setSelectedAttribute(selectionA);

        // Part 2: 保存更改项
        setSelectedVariant([selectedVariant[0], null, null, null, null]);
    };

    const handleChangeWallRadioTemp = (event, index, id) => {
        setError(false);

        // Part 1: 更改选项List信息 并 保存
        let selection = JSON.parse(JSON.stringify(wallPlainAttributeListTemp));
        selection[index].forEach((attribute) => (attribute.id === id ? (attribute.option = event.target.value) : null));
        // Part 2: 保存更改项
        setWallPlainAttributeListTemp(selection);

        // Part 2.5: Canopy Tent订制选项，根据Tent Size变更Wall Size
        let selectedVariantList = JSON.parse(JSON.stringify(selectedWallVariantTemp));
        selection.forEach((attr, indexD) => {
            let selected = productVariant[index + 1].filter((variant) => {
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
            selectedVariantList[indexD] = selected[0];
        });
        setSelectedWallVariantTemp(selectedVariantList);
    };

    const handleResetWallRadioTemp = () => {
        setActiveTempWallTypeRadio(-1);

        let selection = JSON.parse(JSON.stringify(wallPlainAttributeListTemp));

        // Part 1: 更改所有Wall Type选项List信息 并 保存
        selection.map((attribute) => {
            attribute.forEach((attr) => {
                if (attr.id === id_attribute_wallType) {
                    attr.option = "none";
                } else if (attr.id === id_attribute_canopyColor) {
                    attr.option = "white";
                }
            });
        });

        // Part 2: 保存更改项
        setWallPlainAttributeListTemp(selection);
    };

    useEffect(() => {
        if (!wallPlainAttributeListTemp || wallPlainAttributeListTemp.length === 0) return;
        let wallPicturesList = JSON.parse(JSON.stringify(wallPicturesTemp));

        let product_name = "";
        let size = selectedSize;
        let series = "Y5";

        if (selectedFrame === "y5") {
            product_name = "y5-economic-canopy-tent";
            series = "Y5";
        } else if (selectedFrame === "y6") {
            product_name = "y6-commercial-buy";
            series = "Y6";
        } else if (selectedFrame === "y7") {
            product_name = "y7-heavy-duty-canopy-tent";
            series = "Y7";
        } else {
            product_name = "y7-heavy-duty-canopy-tent";
            series = "Y7";
        }

        wallPlainAttributeListTemp.forEach((attribute, index) => {
            if (!attribute) {
                wallPicturesList[index] = "";
                return;
            }

            let colorResult = attribute.filter(({id}) => id === id_attribute_canopyColor);
            let color = colorResult.length > 0 ? colorResult[0].option.toLowerCase() : "white";
            // 设置Wall图片
            let type = attribute.filter((attr) => attr.id === id_attribute_wallType)[0].option.toLowerCase();
            if (type === "none") {
                wallPicturesList[index] = "";
            } else {
                const typeUrl = wallMap.get("type").find((w) => w.key === type).value;
                const sizeUrl = wallMap.get("size").find((w) => w.key === size.toLowerCase()).value;
                const colorUrl = wallMap.get("color").find((w) => w.key === color).value;
                const sideUrl = wallMap.get("side").find((w) => w.key === index + 1).value;
                wallPicturesList[index] = process.env.imageBaseUrl + "/images/product/" + product_name + "/wall/" + series + "-" + typeUrl + sizeUrl + colorUrl + "-" + sideUrl + ".png";
            }
        });

        // Set墙面图片
        setWallPicturesTemp(wallPicturesList);
    }, [wallPlainAttributeListTemp, activeWall]);

    const checkProduct_getPrice = () => {
        let regularPrice = 0,
            salePrice = 0;

        let available = [...availableList];

        let size = "";

        selectedVariant.forEach((variant, index) => {
            if ((!variant || !variant.attributes) && productComponent[index].type !== "simple") {
                available[index].id = "";
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
            // 检查可用性 26338, 26385, 26405, 26516
            if (variant.stock_status === "instock") {
                available[index] = {
                    id: variant.id,
                    status: true,
                    quantity: variant.stock_quantity,
                    needed: totalCount,
                    attribute: variant.attributes,
                    optional: productComponent[index].id === 26516,
                };
            } else {
                available[index] = {
                    id: variant.id,
                    status: false,
                    quantity: 0,
                    needed: totalCount,
                    attribute: variant.attributes,
                    optional: productComponent[index].id === 26516,
                };
            }

            if (index === 0) {
                size = variant.attributes.filter((attr) => attr.id === id_attribute_canopySize)[0].option.toUpperCase();
            } else {
                if (size === "13X26" && (index === 3 || index === 4)) {
                    if (!variant.on_sale) {
                        regularPrice += numberFn.strToFloat(variant.regular_price) * totalCount;
                        salePrice += numberFn.strToFloat(variant.regular_price) * totalCount;
                    } else {
                        regularPrice += numberFn.strToFloat(variant.regular_price) * totalCount;
                        salePrice += numberFn.strToFloat(variant.sale_price) * totalCount;
                    }
                    available[index].needed = totalCount * 2;
                }
            }
        });
        setAvailableList(available);

        setTotalRegularPrice(regularPrice);
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

    //////////////////////////////////////

    useEffect(() => {
        let series = router.query.series || urlFn.getParam("series");
        if (series) {
            setSelectedFrame(series);

            if (series === "y5") {
                setProductComponent([products[0], products[3], products[3], products[3], products[3]]);
                setProductVariant([variants[0], variants[3], variants[3], variants[3], variants[3]])
            } else if (series === "y6") {
                setProductComponent([products[1], products[3], products[3], products[3], products[3]]);
                setProductVariant([variants[1], variants[3], variants[3], variants[3], variants[3]])
            } else if (series === "y7") {
                setProductComponent([products[2], products[3], products[3], products[3], products[3]]);
                setProductVariant([variants[2], variants[3], variants[3], variants[3], variants[3]])
            }
        }

        let size = router.query.size || urlFn.getParam("size");
        if (size) {
            setSelectedSize(size);
        }

        let color = urlFn.getParam("color");
        if (color) {
            setSelectedColor(color);
        }

        viewItem({id: 30477, name: "Canopy Tent", categories: [{name: "Canopy Tents"}]});
    }, []);

    useEffect(() => {
        if (refAddToCart && refAddToCart.current) {
            setAddToCartOffset(refAddToCart.current.offsetTop);
        } else {
            setAddToCartOffset(0);
        }
    }, [refAddToCart]);

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
        if (!productComponent || productComponent.length === 0) return;

        if (productComponent[0].hasOwnProperty("image")) {
            setMainImage([productComponent[0].image]);
        } else if (productComponent[0].hasOwnProperty("images")) {
            setMainImage(productComponent[0].images);
        }

        let selectedAttrList = [];
        let wallPlainAttributeList = [];
        productComponent.map((component, indexA) => {
            // 修改默认选项值 与 Variant里的attr相匹配
            let defaultAttr = [...component.default_attributes];
            defaultAttr.forEach((attr, indexB) => {
                if (attr.id === id_attribute_wallType && component.id === id_product_wall) {
                    attr.option = "none";
                } else if (attr.id === id_attribute_canopySize) {
                    let size = router.query.size || urlFn.getParam("size");

                    if (size) attr.option = size;
                } else if (attr.id === id_attribute_canopyColor) {
                    let color = urlFn.getParam("color");

                    if (color) attr.option = color;
                }
            });
            selectedAttrList.push([...defaultAttr]);

            if (indexA > 0) wallPlainAttributeList.push([...defaultAttr]);
        });
        // 初始化各产品默认变体参数
        setSelectedAttribute(selectedAttrList);

        setWallPlainAttributeList(wallPlainAttributeList);
        setInitSelectedAttribute(true);
        // 获取,保存各组件变体产品信息
        setInitProductVariant(true);
    }, [productComponent]);

    useEffect(() => {
        if (!initSelectedAttribute || !initProductVariant) return;

        handleChangeRadio(null, 0)
    }, [productVariant]);

    useEffect(() => {
        let added = false;

        if (wallPlainAttributeList.length > 0) {
            wallPlainAttributeList.map(item => {
                const found = item.find(element => element.id === id_attribute_wallType);

                if (found && found.option !== "none") {
                    added = true;
                }
            })
        }

        setWallAdded(added);
    }, [wallPlainAttributeList]);

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
        let wallPicturesList = [...wallPictures];

        let product_name = "";
        let size = "";
        let series = "Y5";

        // 设置Frame图片
        if (selectedFrame === "y5") {
            product_name = "y5-economic-canopy-tent";
            series = "Y5";
        } else if (selectedFrame === "y6") {
            product_name = "y6-commercial-buy";
            series = "Y6";
        } else if (selectedFrame === "y7") {
            product_name = "y7-heavy-duty-canopy-tent";
            series = "Y7";
        } else {
            product_name = "y7-heavy-duty-canopy-tent";
            series = "Y7";
        }

        let pList = JSON.parse(JSON.stringify(wallPriceList));
        selectedVariant.forEach((variant, index) => {
            if (!variant || !variant.attributes) {
                if (index > 0) wallPicturesList[index - 1] = "";

                checkProduct_getPrice();
                return;
            }

            let colorResult = variant.attributes.filter((attr) => attr.id === id_attribute_canopyColor);
            let color = colorResult.length > 0 ? colorResult[0].option.toLowerCase() : selectedColor ? selectedColor : "white";

            if (index < 1) {
                size = variant.attributes.filter((attr) => attr.id === id_attribute_canopySize)[0].option.toUpperCase();
                const colorUrl = wallMap.get("color").find((w) => w.key === color).value;
                setMainImage([
                    {
                        src: "/images/product/" + product_name + "/frame/" + series + "-" + size + "-" + colorUrl + ".png",
                    },
                ]);
            } else {
                // 设置Wall图片
                let type = variant.attributes.filter((attr) => attr.id === id_attribute_wallType)[0].option.toLowerCase();
                if (type !== "none") {
                    const typeUrl = wallMap.get("type").find((w) => w.key === type).value;
                    const sizeUrl = wallMap.get("size").find((w) => w.key === size.toLowerCase()).value;
                    const colorUrl = wallMap.get("color").find((w) => w.key === color).value;
                    const sideUrl = wallMap.get("side").find((w) => w.key === index).value;
                    wallPicturesList[index - 1] = process.env.imageBaseUrl + "/images/product/" + product_name + "/wall/" + series + "-" + typeUrl + sizeUrl + colorUrl + "-" + sideUrl + ".png";
                } else {
                    wallPicturesList[index - 1] = "";
                }

                pList[index - 1] = numberFn.strToFloat(variant.price);
            }
        });

        if (!wallIsOpen) {
            setWallPriceList(pList);

            // Set墙面图片
            setWallPictures(wallPicturesList);
            checkProduct_getPrice();
        }
    }, [selectedVariant]);

    useEffect(() => {
        if (totalCount === 0) return;

        checkProduct_getPrice();
    }, [totalCount]);

    useEffect(() => {
        if (!selectedVariant || selectedVariant.length === 0) return;

        checkoutProductList = [];

        let available = true;
        availableList.map((item, index) => {
            if (!item || !item.id || !available) return;
            // 没货 直接返回
            if (!item.status) {
                // if (!item.optional) {
                available = false;
                setIsInStock(false);
                setMessage("Insufficient stock → " + productComponent[index].name);
                return;
                // } else {
                //     return;
                // }
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

    //////////////////////////////////////

    return (
        <ThemeProvider.V2>
            <Head>
                <title>Canopy Tent | WESTSHADE</title>
                <meta name="description" content="Customized your own canopy. Buy it with desired frames, Heavy Duty Aluminum, Commercial Aluminum, Economic Steel and more!"/>
            </Head>
            <Script id="model-viewer" type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"/>
            <Block width="100%" minWidth="320px" display="flex" flexDirection={["column", null, "row"]} overflow="hidden">
                {/* 图片区域 - Contain Layer*/}
                <Block flex={[0, null, 1]} marginBottom={["16px", null, "unset"]} paddingLeft={[null, null, "calc(50vw - " + process.env.maxWidth / 2 + "px)"]} backgroundColor={["white", null, "#F7F7F7"]}>
                    <Block display={["flex", null, "grid"]} flexDirection="column" justifyContent="space-between" width="100%" height="100%" paddingRight={["16px", null, "10px", "16px"]} paddingLeft={["16px", null, "20px"]}
                           paddingBottom={[null, null, "30px"]}>
                        {/*Content Layer*/}
                        <Block>
                            {/*Section Breadcrumbs*/}
                            <Block className="breadcrumb" as="ul" display={["flex", null, "none"]} alignItems="center" height="40px" font="MinXParagraph12" color="MinXSecondaryText">
                                <Block as="li"><Link href="/">Home</Link></Block>
                                <Block as="li"><Link href="/canopy-tent">Canopy tent</Link></Block>
                                <Block as="li"><Link href="#">Pop up canopy tent - stock color</Link></Block>
                            </Block>
                            <Block display={["flex", null, "none"]} justifyContent="space-between" marginBottom="4px" font="MinXParagraph14">
                                {/*Section Rated*/}
                                <Block display="flex" justifyContent="flex-start" alignItems="center" marginBottom="4px">
                                    <Block display="flex" alignItems="center" position="relative" height="14px" marginRight={["8px", null, "12px", "16px"]}>
                                        <Image src="/images/icon/icon-rate.png" alt="icon-rate" width={78} height={14} layout="intrinsic" objectFit="contain"/>
                                    </Block>
                                    <Block font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]}>4.8/5</Block>
                                </Block>
                                {selectedFrame === "y7" ? (
                                    <Block width="max-content" padding="0 8px" backgroundColor="rgba(235, 81, 42, 0.05)" color="#EB512A" $style={{border: "1px solid #EB512A", borderRadius: "3px"}}>BEST SELLER</Block>
                                ) : null}
                            </Block>
                            {/*Section Title*/}
                            <Block className="text-uppercase" display={["flex", null, "none"]} alignItems="center" marginBottom="4px" font={["MinXHeading20", "MinXHeading20", "MinXHeading14", "MinXHeading20"]}
                                   $style={{fontWeight: "500 !important", lineHeight: "1 !important", whiteSpace: "nowrap"}}>
                                <Block>{`Pop up Canopy tent`}</Block>
                                <Block font={["MinXHeading16", "MinXHeading16", "MinXHeading12", "MinXHeading16"]} $style={{lineHeight: "1 !important"}}>{` - stock color`}</Block>
                            </Block>
                            {/*Section Price*/}
                            <Block display={["grid", null, "none"]} gridTemplateColumns="repeat(3, max-content)" gridColumnGap="12px" alignItems="baseline">
                                <SectionPrice totalRegularPrice={totalRegularPrice} totalSalePrice={totalSalePrice} priceBeatOnClick={() => setPriceBeatIsOpen(true)}/>
                            </Block>
                            {/*Section Image*/}
                            <Tabs activeKey={tabPictureActiveKey} fill={FILL.intrinsic} onChange={({activeKey}) => setTabPictureActiveKey(parseInt(activeKey))}
                                  overrides={{
                                      Root: {
                                          style: {width: "100%", height: "100%", display: "flex", flexDirection: "column-reverse", '@media (min-width: 672px)': {paddingBottom: "24px"}},
                                      },
                                      TabList: {
                                          props: {
                                              className: "hideScrollBar"
                                          },
                                          style: {
                                              display: "grid",
                                              gridTemplateColumns: " repeat(3,auto)",
                                              gridColumnGap: "12px",
                                              justifyContent: "center",
                                              overflowX: "scroll",
                                          },
                                      },
                                      TabBorder: {props: {hidden: true}, style: {display: "none"}},
                                      TabHighlight: {props: {hidden: true}, style: {display: "none"}},
                                  }}
                            >
                                <Tab title="Photo"
                                     overrides={{
                                         TabPanel: {
                                             props: {
                                                 className: "product images"
                                             },
                                             style: {paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0},
                                         },
                                         Tab: {
                                             style: ({$isActive}) => ({
                                                 background: $isActive ? "black" : "transparent",
                                                 color: $isActive ? "white" : "black",
                                                 paddingTop: "5px",
                                                 paddingBottom: "5px",
                                                 paddingRight: "24px",
                                                 paddingLeft: "24px",
                                                 borderRadius: "24px",
                                                 ":hover": {background: $isActive ? "rgba(0,0,0,0.5)" : "transparent"},
                                             }),
                                         },
                                     }}
                                >
                                    <ImageGallery items={productImageGallery} showNav={true} showThumbnails={false} showPlayButton={false} showFullscreenButton={false}
                                                  renderLeftNav={(onClick, disabled) => (
                                                      <Button shape={SHAPE.circle} kind={KIND.secondary}
                                                              onClick={onClick}
                                                              overrides={{
                                                                  BaseButton: {
                                                                      props: {
                                                                          className: "cursor react-image-gallery-arrow left",
                                                                      },
                                                                  },
                                                              }}
                                                              disabled={disabled}
                                                      >
                                                          <ChevronLeft size={28} color={"white"}/>
                                                      </Button>
                                                  )}
                                                  renderRightNav={(onClick, disabled) => (
                                                      <Button shape={SHAPE.circle} kind={KIND.secondary}
                                                              onClick={onClick}
                                                              overrides={{
                                                                  BaseButton: {
                                                                      props: {
                                                                          className: "cursor react-image-gallery-arrow right",
                                                                      },
                                                                  },
                                                              }}
                                                              disabled={disabled}
                                                      >
                                                          <ChevronRight size={28} color={"white"}/>
                                                      </Button>
                                                  )}
                                    />
                                </Tab>
                                <Tab title="Video" overrides={{
                                    TabPanel: {
                                        props: {
                                            className: "product video"
                                        },
                                        style: {paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0},
                                    },
                                    Tab: {
                                        style: ({$isActive}) => ({
                                            background: $isActive ? "black" : "transparent",
                                            color: $isActive ? "white" : "black",
                                            paddingTop: "5px",
                                            paddingBottom: "5px",
                                            paddingRight: "24px",
                                            paddingLeft: "24px",
                                            borderRadius: "24px",
                                            ":hover": {background: $isActive ? "rgba(0,0,0,0.5)" : "transparent"},
                                        }),
                                    },
                                }}>
                                    <Block width="100%" height="100%" display="flex" alignItems="center" maxHeight="500px" margin="auto" padding="0 0 20px">
                                        <ReactPlayer className="react-player" url="https://www.youtube.com/watch?v=YGX1N5997iY" playsinline loop
                                                     config={{
                                                         file: {
                                                             attributes: {
                                                                 controlsList: "nofullscreen",
                                                             },
                                                         },
                                                     }}
                                        />
                                    </Block>
                                </Tab>
                                <Tab title="3D" overrides={{
                                    TabPanel: {
                                        props: {
                                            className: "product modal"
                                        },
                                        style: {height: "100%", paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0},
                                    },
                                    Tab: {
                                        style: ({$isActive}) => ({
                                            background: $isActive ? "black" : "transparent",
                                            color: $isActive ? "white" : "black",
                                            paddingTop: "5px",
                                            paddingBottom: "5px",
                                            paddingRight: "24px",
                                            paddingLeft: "24px",
                                            borderRadius: "24px",
                                            ":hover": {background: $isActive ? "rgba(0,0,0,0.5)" : "transparent"},
                                        }),
                                    },
                                }}>
                                    <Block width="100%" height="100%" maxHeight="500px" margin="auto" padding="0 0 20px" $style={{aspectRatio: 1}}>
                                        <model-viewer camera-orbit="120deg 75deg 100%" alt="3D model" minimumRenderScale={1} shadow-intensity="1" camera-controls
                                                      style={{width: "inherit", height: "inherit", margin: "auto"}}
                                                      src="/images/3D/canopy_tent_10x10.gltf"
                                        />
                                    </Block>
                                </Tab>
                            </Tabs>
                        </Block>
                        <Block display={["none", null, "flex"]} alignItems="flex-end" font="MinXParagraph12" color="MinXSecondaryText">
                            Your event whether it is a farmers market, trade show, art show, or pet show would not be complete without the coverage of a high quality water and scratch resistant pop-up tent. Our pop up tents come
                            with UV resistant and fire retardant fabric that can withstand all weather conditions. So whether you’re in the market for selling produce or art; our pop up tents can take your business to higher
                            levels. We provide free mock-ups and also free shipping. We are here to provide custom canopy tents that help your brand.
                        </Block>
                    </Block>
                </Block>
                {/* 选择区域 - Contain Layer*/}
                <Block flex={[0, null, 1]} paddingRight={[null, null, "calc(50vw - " + process.env.maxWidth / 2 + "px)"]} paddingBottom={["24px", null, 0]} backgroundColor={["#F7F7F7", null, "white"]}>
                    <Block width="100%" height="100%" paddingRight={["16px", null, "20px"]} paddingLeft={["16px", null, "10px", "16px"]}>
                        {/*Content Layer*/}
                        <Block width="100%" maxWidth={["500px", null, "533px"]} marginRight="auto" marginLeft="auto" paddingBottom={[null, null, "10px"]}>
                            {/*Section Breadcrumbs*/}
                            <Block className="breadcrumb" as="ul" display={["none", null, "flex"]} alignItems="center" height="46px" font={["MinXParagraph12", "MinXParagraph12", "MinXParagraph12", "MinXParagraph14"]}
                                   color="MinXSecondaryText">
                                <Block as="li"><Link href="/">Home</Link></Block>
                                <Block as="li"><Link href="/canopy-tent">Canopy tent</Link></Block>
                                <Block as="li"><Link href="/products/canopy-tent" as="/products/canopy-tent/buy">Pop up canopy tent - stock color</Link></Block>
                            </Block>
                            <Block position="relative" display="grid" gridRowGap={["12px", null, null, "16px"]} width="100%" padding={[null, null, "12px 16px", "16px 24px"]} overflow="hidden"
                                   $style={{'@media (min-width: 672px)': {border: "1px solid #D9D9D9"}}}>
                                {/*Corner Ribbon*/}
                                {selectedFrame === "y7" ? (
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
                                       $style={{fontWeight: "500 !important", lineHeight: "1 !important", whiteSpace: "nowrap"}}>
                                    <Block>{`Pop up Canopy tent`}</Block>
                                    <Block font={["MinXHeading16", "MinXHeading16", "MinXHeading12", "MinXHeading16"]} $style={{lineHeight: "1 !important"}}>{` - stock color`}</Block>
                                </Block>
                                {/*Section Price*/}
                                <Block display={["none", null, "grid"]} gridTemplateColumns="max-content max-content 1fr" gridColumnGap={["12px", null, null, "16px"]} alignItems="baseline">
                                    <SectionPrice totalRegularPrice={totalRegularPrice} totalSalePrice={totalSalePrice} priceBeatOnClick={() => setPriceBeatIsOpen(true)}/>
                                </Block>
                                {/*Section Selection*/}
                                <Block display="grid" gridTemplateAreas={[`"frame size" "wall color"`, null, `"frame" "size" "color" "wall"`]} gridTemplateColumns={["3fr 2fr", null, "1fr"]} gridColumnGap="16px"
                                       gridRowGap={[null, null, "10px", "12px"]}>
                                    <Block gridArea="frame" display="grid" gridColumnGap="10px" gridTemplateAreas={[`"a b" "c c"`, null, `"a c b"`]} gridTemplateColumns={["1fr 86px", null, "60px 1fr 90px", "68px 1fr 128px"]}
                                           gridTemplateRows={["repeat(2, 44px)", null, "30px", "44px"]} alignItems="center"
                                    >
                                        <Block gridArea="a" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]}>Frame</Block>
                                        <Block gridArea="b">
                                            <MButton type="outline" width={["86px", null, "90px", "128px"]} height={["24px", null, null, "30px"]} text='Frame Spec'
                                                     font={["MinXParagraph10", "MinXParagraph10", "MinXParagraph10", "MinXParagraph12"]}
                                                     color="MinXSecondaryText" buttonStyle={{borderWidth: "1px !important", borderColor: "#D9D9D9"}} onClick={() => setFrameCompareOpen(true)}
                                            />
                                        </Block>
                                        <Block gridArea="c" height="100%" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]}>
                                            <Select controlRef={refSelectA}
                                                    backspaceRemoves={false}
                                                    backspaceClearsInputValue={false}
                                                    clearable={false}
                                                    searchable={false}
                                                    deleteRemoves={false}
                                                    options={[
                                                        {label: 'Y7 Heavy Duty', option: 'y7'},
                                                        {label: 'Y6 Commercial', option: 'y6'},
                                                        {label: 'Y5 Economic', option: 'y5'},
                                                    ]}
                                                    labelKey="label"
                                                    valueKey="option"
                                                    onChange={({value}) => {
                                                        setSelectedFrame(value[0].option);
                                                        if (value[0].option === "y5") {
                                                            setProductComponent([products[0], products[3], products[3], products[3], products[3]]);
                                                            setProductVariant([variants[0], variants[3], variants[3], variants[3], variants[3]])
                                                        } else if (value[0].option === "y6") {
                                                            setProductComponent([products[1], products[3], products[3], products[3], products[3]]);
                                                            setProductVariant([variants[1], variants[3], variants[3], variants[3], variants[3]])
                                                        } else if (value[0].option === "y7") {
                                                            setProductComponent([products[2], products[3], products[3], products[3], products[3]]);
                                                            setProductVariant([variants[2], variants[3], variants[3], variants[3], variants[3]])
                                                        }
                                                    }}
                                                    value={selectedFrame === "y5" ? [{label: 'Y5 Economic', option: 'y5'}] : selectedFrame === "y6" ? [{label: 'Y6 Commercial', option: 'y6'}] : [{label: 'Y7 Heavy Duty', option: 'y7'}]}
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
                                                        },
                                                    }}
                                            />
                                        </Block>
                                    </Block>
                                    {productComponent && productComponent[0] && productComponent[0].attributes.filter((attribute) => attribute.id === id_attribute_canopySize && attribute.variation).length > 0 ? (
                                        <Block gridArea="size" display="grid" gridColumnGap="10px" gridTemplateAreas={[`"a b" "c c"`, null, `"a c b"`]} gridTemplateColumns={["1fr 86px", null, "60px 1fr 90px", "68px 1fr 128px"]}
                                               gridTemplateRows={["repeat(2, 44px)", null, "30px", "44px"]} alignItems="center"
                                        >
                                            <Block gridArea="a" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]}>Size</Block>
                                            <Block gridArea="b">
                                                <MButton type="outline" width={["86px", null, "90px", "128px"]} height={["24px", null, null, "30px"]} text='Size guide'
                                                         font={["MinXParagraph10", "MinXParagraph10", "MinXParagraph10", "MinXParagraph12"]}
                                                         color="MinXSecondaryText" buttonStyle={{borderWidth: "1px !important", borderColor: "#D9D9D9"}} onClick={() => setSizeGuideOpen(true)}
                                                />
                                            </Block>
                                            <Block gridArea="c" height="100%" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]}>
                                                <Select controlRef={refSelectB}
                                                        backspaceRemoves={false}
                                                        backspaceClearsInputValue={false}
                                                        clearable={false}
                                                        searchable={false}
                                                        deleteRemoves={false}
                                                        options={productComponent[0].attributes.filter((attribute) => attribute.id === id_attribute_canopySize && attribute.variation)[0].options.map(item => ({
                                                            label: getSizeLabel(item),
                                                            option: item
                                                        })) || []}
                                                        labelKey="label"
                                                        valueKey="option"
                                                        onChange={({value}) => {
                                                            setSelectedSize(value[0].option);
                                                            handleChangeRadio({target: {value: value[0].option}}, 0, id_attribute_canopySize);
                                                        }}
                                                        value={selectedAttribute[0] ? [{label: getSizeLabel(selectedAttribute[0][0].option.toLowerCase()), option: selectedAttribute[0][0].option.toLowerCase()}] : [{
                                                            label: "10'x10'",
                                                            option: "10x10"
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
                                                            },
                                                        }}
                                                />
                                            </Block>
                                        </Block>
                                    ) : null}
                                    {productComponent && productComponent[0] && productComponent[0].attributes.filter((attribute) => attribute.id === id_attribute_canopyColor && attribute.variation).length > 0 ? (
                                        <Block gridArea="color" display="grid" gridColumnGap="10px" gridTemplateAreas={[`"a b" "c c"`, null, `"a c b"`]} gridTemplateColumns={["1fr 86px", null, "60px 1fr 90px", "68px 1fr 128px"]}
                                               gridTemplateRows={["repeat(2, 44px)", null, "30px", "44px"]} alignItems="center"
                                        >
                                            <Block gridArea="a" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]}>Color</Block>
                                            <Block gridArea="b">
                                                <MButton type="rainbow" width={["86px", null, "90px", "128px"]} height={["24px", null, null, "30px"]} text='Customize'
                                                         font={["MinXParagraph10", "MinXParagraph10", "MinXParagraph10", "MinXParagraph12"]}
                                                         color="MinXPrimaryText" buttonBackgroundColor="#FFF" buttonStyle={{padding: "1px !important", zIndex: 1}}
                                                         buttonHoverStyle={{color: "#8C8C8C"}}
                                                         onClick={() => router.push("/products/custom-printed-canopy-tent", "/products/custom-printed-canopy-tent/buy")}
                                                />
                                            </Block>
                                            <Block gridArea="c" height="100%" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]}>
                                                <Select controlRef={refSelectC}
                                                        backspaceRemoves={false}
                                                        backspaceClearsInputValue={false}
                                                        clearable={false}
                                                        searchable={false}
                                                        deleteRemoves={false}
                                                        options={productComponent[0].attributes.filter((attribute) => attribute.id === id_attribute_canopyColor && attribute.variation)[0].options.map(item => ({
                                                            label: stringFn.changeCase(item, 1),
                                                            option: item
                                                        })) || []}
                                                        labelKey="label"
                                                        valueKey="option"
                                                        onChange={({value}) => {
                                                            setSelectedColor(value[0].option);
                                                            handleChangeRadio({target: {value: value[0].option}}, 0, id_attribute_canopyColor);
                                                        }}
                                                        value={selectedAttribute[0] ? [{label: stringFn.changeCase(selectedAttribute[0][1].option, 1), option: selectedAttribute[0][1].option.toLowerCase()}] : [{
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
                                    <Block gridArea="wall" display="grid" gridColumnGap="10px" gridTemplateAreas={[`"a b" "c c"`, null, `"a c b"`]} gridTemplateColumns={["1fr auto", null, "60px 1fr 90px", "68px 1fr 128px"]}
                                           gridTemplateRows={["repeat(2, 44px)", null, "30px", "44px"]} alignItems="center"
                                    >
                                        <Block gridArea="a" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]} $style={{whiteSpace: "nowrap"}}>
                                            <Block display={["none", null, "block"]}>Side Wall</Block>
                                            <Block display={["block", null, "none"]}>Side Wall (optional)</Block>
                                        </Block>
                                        <Block gridArea="b" display="flex" justifyContent="center" alignItems="center">
                                            <Block position="relative" width={["32px", null, null, "44px"]} height={["32px", null, null, "44px"]}>
                                                <Image src="/images/icon/icon-side-wall.png" alt="icon-side-wall" width="44px" height="44px" layout="responsive" objectFit="contain"/>
                                            </Block>
                                        </Block>
                                        <Block gridArea="c" display="flex" height="100%" $style={{gap: "8px"}}>
                                            <MButton type="outline" width="100%" height="100%" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]}
                                                     text={<><Block display={["none", null, "block"]}>{wallAdded ? "Edit" : "Add(optional)"}</Block><Block display={["block", null, "none"]}>{wallAdded ? "Edit" : "Add"}</Block></>}
                                                     color="MinXPrimaryText" buttonStyle={{paddingLeft: 0, paddingRight: 0, borderColor: "#8C8C8C", borderWidth: "1px !important"}}
                                                     onClick={() => openWallModal(0)}
                                            />
                                            {wallAdded ? (
                                                <MButton type="text" text="Remove" height="100%" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]} color="MinXPrimaryText"
                                                         onClick={() => handleRemoveWall()}/>
                                            ) : null}
                                        </Block>
                                    </Block>
                                </Block>
                                <Block display="grid" gridColumnGap="12px" gridRowGap="12px" gridTemplateAreas={[`"a" "b" "f" "d" "e" "c"`, null, `"a a" "b c" "d d" "e e" "f f"`]} alignItems="center" paddingBottom={["16px", null, 0]}>
                                    {/*Section Free Items*/}
                                    <Block className="cursor" gridArea="a" display="grid" gridTemplateColumns="max-content 1fr" gridColumnGap="6px" width="100%" height={["66px", null, null, "90px"]} padding="0 16px"
                                           backgroundColor={["white", null, "#F7F7F7"]} $style={{borderRadius: "8px"}}
                                           onClick={() => setFreeItemIsOpen(true)}
                                    >
                                        <Block margin="auto">
                                            <Block position="relative" marginBottom={["8px", null, null, "12px"]}>
                                                <Image src="/images/icon/icon-gift.png" alt="icon gifts" width={14} height={14} layout="fixed" objectFit="contain"/>
                                                <Block as="span" marginLeft={["6px", null, null, "8px"]} font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph14", "MinXParagraph20"]} $style={{fontWeight: "500 !important"}}>
                                                    Buy tent, get 4 for free
                                                </Block>
                                            </Block>
                                            <Block display="flex" justifyContent="space-between" alignItems="center" font="MinXParagraph14">
                                                <Block display="flex" alignItems="center">Cost: <Block as="span" className="text-line-through" marginRight={["6px", null, null, "16px"]}>$280+</Block>
                                                    <Block as="span" color="#E51717" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph14", "MinXParagraph20"]} $style={{fontWeight: "700 !important"}}>$0</Block>
                                                </Block>
                                                <Block color="#356DB6">Detail</Block>
                                            </Block>
                                        </Block>
                                        <Block position="relative" height="inherit" $style={{aspectRatio: "2"}}>
                                            <Image src="/images/product/canopy-tent/gifts.webp" alt="gifts" layout="fill" objectFit="contain"/>
                                        </Block>
                                    </Block>
                                    {/*Section Stock*/}
                                    <Block gridArea="b" display="flex" alignItems="center" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]}>
                                        <Block className="round" width="5px" height="5px" minWidth="5px" marginRight="6px" backgroundColor={isInStock ? "#2DCA59" : "#E51717"}/>
                                        {isInStock ? "In Stock" : "Out of Stock"}
                                        {selectedFrame === "y7" && selectedSize !== "10x10" && selectedSize !== "10x15" && selectedSize !== "10x20" ? (
                                            <Block marginLeft={["8px", null, "10px", "16px"]}>
                                                <Block width="max-content" padding="2px 8px" backgroundColor="#F5FCFC" $style={{border: "1px solid #23A4AD", borderRadius: "3px"}}>Limited
                                                    Stock</Block>
                                            </Block>
                                        ) : null}
                                    </Block>
                                    {/*Section Question*/}
                                    <Block gridArea="c">
                                        <MButton width="max-content" height={["32px", null, "18px"]} marginLeft="auto" marginRight={["auto", null, "unset"]} color={["#262626", null, "#8C8C8C"]}
                                                 buttonBackgroundColor="#F2F2F2" buttonHoverBackgroundColor="#F2F2F2" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]}
                                                 text="Have question? Ask an expert" buttonStyle={{paddingRight: "12px", paddingLeft: "12px", '@media (max-width: 672px)': {backgroundColor: "#D9D9D9", borderRadius: "4px !important"}}}
                                                 onClick={() => setQuestionIsOpen(true)}
                                        />
                                    </Block>
                                    {/*Section AddToBag*/}
                                    <Block ref={refAddToCart} gridArea="d" display="flex" $style={{gap: "8px"}}>
                                        <Block width="33%" display="flex" flexDirection="row" alignItems="center" justifyContent="center" $style={{border: "1px solid #BFBFBF", borderRadius: "4px"}}>
                                            <MButton type="text" shape="circle" display="flex" justifyContent="center" flex={1} width="100%" height={["43px", null, "29px", "39px"]} color="#262626" buttonBackgroundColor="transparent"
                                                     buttonStyle={{width: "100% !important"}}
                                                     onClick={() => totalCount !== 1 && setTotalCount(totalCount - 1)}
                                                     disabled={totalCount === 1}><CheckIndeterminate size={12}/></MButton>
                                            <Block margin="auto 12px" font="MinXLabel14">{totalCount}</Block>
                                            <MButton type="text" shape="circle" display="flex" justifyContent="center" flex={1} width="100%" height={["43px", null, "29px", "39px"]} color="#262626" buttonBackgroundColor="transparent"
                                                     buttonStyle={{width: "100% !important"}}
                                                     onClick={() => setTotalCount(totalCount + 1)} disabled={!isInStock}><Plus size={12}/></MButton>
                                        </Block>
                                        <Block flex={1}>
                                            <MButton shape="square" width="100%" height={["44px", null, "30px", "40px"]} color="#262626" buttonBackgroundColor="#FFD747" buttonHoverBackgroundColor="rgb(255, 215, 71, 0.6)" text="Add To Bag"
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
            <ProductDescription product={selectedFrame}/>
            {addToCartOffset ? (
                <Checkout.V2 quantity={totalCount} isInStock={isInStock} buttonText={isInStock ? "Add to Bag" : "Out of Stock"} isAvailable={availableToCheckout}
                             onClick={() => openSummaryModal()}
                             onClickMinus={() => totalCount !== 1 && setTotalCount(totalCount - 1)}
                             onClickPlus={() => setTotalCount(totalCount + 1)}
                             onClickAddToBag={() => updateCart()}
                             onSale={totalRegularPrice !== totalSalePrice} totalPrice={totalRegularPrice} totalSalesPrice={totalSalePrice}
                             scrollDisplay
                             offSetHeight={addToCartOffset}
                />
            ) : null}
            <BackToTop.V1/>
            <Modal type="alertdialog" isOpen={priceBeatIsOpen} onClose={() => setPriceBeatIsOpen(false)} content="priceBeat"
                   dialogStyles={{width: "100% !important", maxWidth: "min((100vw - 48px), 434px) !important", margin: 0, borderRadius: "4px !important"}}/>
            <Modal type="alertdialog" isOpen={freeItemIsOpen} onClose={() => setFreeItemIsOpen(false)} content="freeItem"
                   dialogStyles={{width: "100% !important", maxWidth: "min((100vw - 48px), 720px) !important", margin: 0, borderRadius: "4px !important"}}/>
            <Modal type="alertdialog" isOpen={questionIsOpen} onClose={() => setQuestionIsOpen(false)} content="contact" phone={phone}
                   dialogStyles={{width: "100% !important", maxWidth: "min((100vw - 48px), 720px) !important", margin: 0, borderRadius: "4px !important"}}/>
            <Modal type="alertdialog" isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} content="size_canopy"/>
            <Modal type="alertdialog" isOpen={frameCompareOpen} onClose={() => setFrameCompareOpen(false)} content="frame_canopy"/>
            <Modal type="alertdialog" isOpen={wallIsOpen} onClose={() => closeWallModal()}
                   containerStyles={{overflowX: "unset !important"}}
                   dialogContainerStyles={{overflow: "hidden"}}
                   dialogClassName="canopy-tent-wall-modal-dialog"
                   bodyClassName="canopy-tent-wall-modal-body"
                   footerClassName="canopy-tent-wall-modal-footer"
                   footer={
                       <Block width={"100%"} height="54px" backgroundColor="#F7F7F7" paddingLeft={"16px"} paddingRight={"16px"} display="flex" alignItems="center">
                           <Block display="grid" gridTemplateAreas={[`"b a c"`, null, `"a b c"`]} gridTemplateColumns={["85px 1fr 85px", null, "max-content 85px 85px"]} gridColumnGap="24px" width={"100%"} justifyContent="end"
                                  alignItems="center">
                               <Block gridArea="a" className="text-center">Total for wall: <NumberFormat decimalScale={2} thousandSeparator={true} prefix={"$"} value={wallPrice} displayType="text"/></Block>
                               <Block gridArea="b" width="85px" height="40px">
                                   <Button shape={SHAPE.pill}
                                           overrides={{
                                               BaseButton: {
                                                   style: ({$theme}) => ({
                                                       fontSize: "16px",
                                                       width: `100%`,
                                                       height: `100%`,
                                                       backgroundColor: "transparent",
                                                       lineHeight: "24px",
                                                       color: "#8C8C8C",
                                                       borderTopStyle: "solid",
                                                       borderTopWidth: "1px",
                                                       borderTopColor: "#8C8C8C",
                                                       borderRightStyle: "solid",
                                                       borderRightWidth: "1px",
                                                       borderRightColor: "#8C8C8C",
                                                       borderBottomStyle: "solid",
                                                       borderBottomWidth: "1px",
                                                       borderBottomColor: "#8C8C8C",
                                                       borderLeftStyle: "solid",
                                                       borderLeftWidth: "1px",
                                                       borderLeftColor: "#8C8C8C",
                                                   }),
                                               },
                                           }}
                                           onClick={() => handleResetWallRadioTemp()}
                                   >
                                       Reset
                                   </Button>
                               </Block>
                               <Block gridArea="c" width="85px" height="40px">
                                   <Button shape={SHAPE.pill}
                                           overrides={{
                                               BaseButton: {
                                                   style: ({$theme}) => ({fontSize: "16px", width: `100%`, height: `100%`, backgroundColor: "#23A4AD", lineHeight: "24px"}),
                                               },
                                           }}
                                           onClick={() => closeWallModal(true)}
                                   >
                                       Save
                                   </Button>
                               </Block>
                           </Block>
                       </Block>
                   }
            >
                <Block padding={["0 16px", null, "0 20px"]}>
                    <Block marginTop={["16px", null, "32px"]} padding="0 16px" font={["MinXLabel16", "MinXLabel16", "MinXLabel20"]}
                           $style={{textAlign: "center", lineHeight: "1 !important", fontWeight: "700 !important", '@media (min-width: 1056px)': {textAlign: "left"}}}
                    >Please select walls for each side.</Block>
                    <Block width="100%" display="flex" flexDirection="column" marginLeft="auto" marginRight="auto" paddingBottom={["94px", null, "134px"]}>
                        {/* 图片区域 */}
                        <Block className="modalGallery modalGallery-wall" position="relative" display="flex" alignItems="center" justifyContent="center" width={["fit-content", null, "456px"]} margin="auto">
                            <Block position="absolute" top="12px" left={0} width="44px" height="44px">
                                <Image src={`/images/icon/icon-wall-cube-${activeWall === 0 ? "left" : activeWall === 3 ? "back" : activeWall === 1 ? "right" : activeWall === 2 ? "front" : ""}-indicator.png`}
                                       alt="wall-cube-indicator" width={52} height={52} layout="responsive" objectFit="contain"/>
                            </Block>
                            <MButton shape="circle" width="44px" height="44px" color="#262626" buttonBackgroundColor="#262626" buttonStyle={{paddingLeft: 0, paddingRight: 0}}
                                     onClick={() => {
                                         let fIndex = 0;

                                         if (activeWall === 2) {
                                             setActiveWall(1);
                                             fIndex = 1;
                                         } else if (activeWall === 1) {
                                             setActiveWall(3);
                                             fIndex = 3;
                                         } else if (activeWall === 3) {
                                             setActiveWall(0);
                                             fIndex = 0;
                                         } else if (activeWall === 0) {
                                             setActiveWall(2);
                                             fIndex = 2;
                                         }

                                         if (wallPlainAttributeListTemp[fIndex][0].option.toLowerCase() === "none") {
                                             setActiveTempWallTypeRadio(-1);
                                         } else if (wallPlainAttributeListTemp[fIndex][0].option.toLowerCase() === "full") {
                                             setActiveTempWallTypeRadio(0);
                                         } else if (wallPlainAttributeListTemp[fIndex][0].option.toLowerCase() === "half") {
                                             setActiveTempWallTypeRadio(1);
                                         } else if (wallPlainAttributeListTemp[fIndex][0].option.toLowerCase() === "mesh") {
                                             setActiveTempWallTypeRadio(2);
                                         } else if (wallPlainAttributeListTemp[fIndex][0].option.toLowerCase() === "pvc") {
                                             setActiveTempWallTypeRadio(3);
                                         } else {
                                             setActiveTempWallTypeRadio(4);
                                         }
                                     }}
                            ><ChevronLeft size={22} color="white"/></MButton>
                            <ImageGallery showNav={false} items={[productImageGalleryTemp[0]]} showPlayButton={false} showFullscreenButton={false}/>
                            {/*<Block flex={1} width="100%">*/}
                            {/*    {productImageGalleryTemp.length > 0 ? (*/}
                            {/*        <Image src={productImageGalleryTemp[0].original} alt="canopy-tent" width={1024} height={1024} layout="responsive" objectFit="contain" loader={({src, width}) => src} unoptimized/>*/}
                            {/*    ) : null}*/}
                            {/*</Block>*/}
                            <MButton shape="circle" width="44px" height="44px" color="#262626" buttonBackgroundColor="#262626" buttonStyle={{paddingLeft: 0, paddingRight: 0}}
                                     onClick={() => {
                                         let fIndex = 0;

                                         if (activeWall === 0) {
                                             setActiveWall(3);
                                             fIndex = 3;
                                         } else if (activeWall === 3) {
                                             setActiveWall(1);
                                             fIndex = 1;
                                         } else if (activeWall === 1) {
                                             setActiveWall(2);
                                             fIndex = 2;
                                         } else if (activeWall === 2) {
                                             setActiveWall(0);
                                             fIndex = 0;
                                         }

                                         if (wallPlainAttributeListTemp[fIndex][0].option.toLowerCase() === "none") {
                                             setActiveTempWallTypeRadio(-1);
                                         } else if (wallPlainAttributeListTemp[fIndex][0].option.toLowerCase() === "full") {
                                             setActiveTempWallTypeRadio(0);
                                         } else if (wallPlainAttributeListTemp[fIndex][0].option.toLowerCase() === "half") {
                                             setActiveTempWallTypeRadio(1);
                                         } else if (wallPlainAttributeListTemp[fIndex][0].option.toLowerCase() === "mesh") {
                                             setActiveTempWallTypeRadio(2);
                                         } else if (wallPlainAttributeListTemp[fIndex][0].option.toLowerCase() === "pvc") {
                                             setActiveTempWallTypeRadio(3);
                                         } else {
                                             setActiveTempWallTypeRadio(4);
                                         }
                                     }}
                            ><ChevronRight size={22} color="white"/></MButton>
                        </Block>
                        <Block className="hideScrollBar" display="flex" flexDirection="column" alignItems="center" width="100%" maxWidth="618px" margin="auto" overflow={["unset", null, "scroll"]}>
                            <SelectionArea title="Type" containerStyle={{marginTop: 0}}>
                                <Block width="100%" display="grid" gridTemplateColumns={["repeat(3, 1fr)", null, "repeat(5, 1fr)"]} gridColumnGap="8px" gridRowGap="8px" justifyContent="flex-start"
                                       overrides={{
                                           Block: {
                                               style: {
                                                   padding: "4px",
                                                   borderTopLeftRadius: "4px",
                                                   borderTopRightRadius: "4px",
                                                   borderBottomLeftRadius: "4px",
                                                   borderBottomRightRadius: "4px",
                                                   borderTopWidth: "1px",
                                                   borderBottomWidth: "1px",
                                                   borderLeftWidth: "1px",
                                                   borderRightWidth: "1px",
                                                   borderTopStyle: "solid",
                                                   borderBottomStyle: "solid",
                                                   borderLeftStyle: "solid",
                                                   borderRightStyle: "solid",
                                                   borderColor: error ? "#EB512A" : "transparent",
                                               }
                                           }
                                       }}
                                >
                                    {productComponent && productComponent[1] && wallPrices.length > 0 ? productComponent[1].attributes.filter((attribute) => attribute.id === id_attribute_wallType && attribute.variation).map(({options}) =>
                                        options.map((option, indexWall) => (
                                            <Button key={indexWall}
                                                    onClick={() => {
                                                        let priceList = JSON.parse(JSON.stringify(wallPriceListTemp));

                                                        if (wallPlainAttributeListTemp[activeWall][0].option.toLowerCase() === "none") {
                                                            setActiveTempWallTypeRadio(indexWall);

                                                            handleChangeWallRadioTemp({target: {value: option.toLowerCase()}}, activeWall, id_attribute_wallType)

                                                            let result = wallPrices.find((product) => {
                                                                if (!product) return false;

                                                                let p = false;
                                                                product.attributes.map(attr => {
                                                                    if (attr.id === id_attribute_wallType && attr.option.toLowerCase() === option.toLowerCase()) {
                                                                        p = true;
                                                                    }
                                                                })

                                                                if (p) return product;
                                                            });

                                                            priceList[activeWall] = result ? numberFn.strToFloat(result.price) : 0;

                                                            setWallPriceListTemp(priceList);
                                                        } else {
                                                            if (activeTempWallTypeRadio === indexWall) {
                                                                setActiveTempWallTypeRadio(-1);

                                                                handleChangeWallRadioTemp({target: {value: "none"}}, activeWall, id_attribute_wallType)

                                                                priceList[activeWall] = 0;
                                                                setWallPriceListTemp(priceList);
                                                            } else {
                                                                setActiveTempWallTypeRadio(indexWall);

                                                                handleChangeWallRadioTemp({target: {value: option.toLowerCase()}}, activeWall, id_attribute_wallType)

                                                                let result = wallPrices.find((product) => {
                                                                    if (!product) return false;

                                                                    let p = false;
                                                                    product.attributes.map(attr => {
                                                                        if (attr.id === id_attribute_wallType && attr.option.toLowerCase() === option.toLowerCase()) {
                                                                            p = true;
                                                                        }
                                                                    })

                                                                    if (p) return product;
                                                                });

                                                                priceList[activeWall] = result ? numberFn.strToFloat(result.price) : 0;

                                                                setWallPriceListTemp(priceList);
                                                            }
                                                        }
                                                    }}
                                                    overrides={{
                                                        BaseButton: {
                                                            style: {
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                width: "100%",
                                                                height: "130px",
                                                                // minWidth: "98px",
                                                                margin: "auto",
                                                                paddingTop: "8px",
                                                                padding: activeTempWallTypeRadio === indexWall ? "6px 0 14px" : "8px 0 16px",
                                                                borderTopLeftRadius: "16px",
                                                                borderTopRightRadius: "16px",
                                                                borderBottomLeftRadius: "16px",
                                                                borderBottomRightRadius: "16px",
                                                                borderTopWidth: activeTempWallTypeRadio === indexWall ? "3px" : "1px",
                                                                borderBottomWidth: activeTempWallTypeRadio === indexWall ? "3px" : "1px",
                                                                borderLeftWidth: activeTempWallTypeRadio === indexWall ? "3px" : "1px",
                                                                borderRightWidth: activeTempWallTypeRadio === indexWall ? "3px" : "1px",
                                                                borderTopStyle: "solid",
                                                                borderBottomStyle: "solid",
                                                                borderLeftStyle: "solid",
                                                                borderRightStyle: "solid",
                                                                borderColor: activeTempWallTypeRadio === indexWall ? "rgb(35, 164, 173)" : "rgb(217, 217, 217)",
                                                                backgroundColor: "white",
                                                                ":hover": {backgroundColor: "white"}
                                                            }
                                                        }
                                                    }}
                                            >
                                                <Block>
                                                    <Block position="relative" width="80px" height="80px" marginBottom="4px">
                                                        <Image src={"/images/icon/icon-wall-" + option.toLowerCase() + ".png"} layout="fill" objectFit="contain"/>
                                                    </Block>
                                                    <Block color="#262626" font="MinXParagraph14" $style={{lineHeight: "1 !important"}}>
                                                        {option.toLowerCase() === "rollup" ? "Roll-up" : option}
                                                        <Block marginTop="4px">
                                                            <NumberFormat decimalScale={2} thousandSeparator={true} prefix={"$"} value={wallPrices[indexWall].price} displayType="text"/>
                                                        </Block>
                                                    </Block>
                                                </Block>
                                            </Button>
                                        ))) : null}
                                </Block>
                            </SelectionArea>
                            <Block width="100%" height="20px" marginTop="2px" marginRight="auto" font="MinXParagraph14" color="#EB512A">{error && "Please choose side wall type."}</Block>
                            <SelectionArea title="Color" containerStyle={{marginTop: "2px !important"}}>
                                <Selection name="wall-color" value={wallPlainAttributeListTemp[activeWall] ? wallPlainAttributeListTemp[activeWall][2].option.toLowerCase() : "white"} id={id_attribute_canopyColor}
                                           attributes={productComponent && productComponent[1] ? productComponent[1].attributes.filter((attribute) => attribute.id === id_attribute_canopyColor && attribute.variation) : []}
                                           onChange={(event) => {
                                               setSelectedWallColor(event.target.value);
                                               handleChangeWallRadioTemp(event, activeWall, id_attribute_canopyColor)
                                           }}
                                >
                                </Selection>
                            </SelectionArea>
                        </Block>
                    </Block>
                </Block>
            </Modal>
            <Modal type="dialog" isOpen={summaryIsOpen} onClose={() => closeSummaryModal()} content="summary" dataTable={{productComponent, selectedVariant, totalSalePrice, totalRegularPrice, totalCount}}/>
        </ThemeProvider.V2>
    );
}

// Canopy_Tent.getInitialProps = async (context) => {
//     const {query} = context;
//     const ids = [26338, 26385, 26405, 26516];
//     let products = null,
//         variants = [];
//
//     // product = await utils.getProductByWooId(id);
//     // if (product.type === "composite") {
//     products = await Promise.all(ids.map((id) => utils.getProductByWooId(id)));
//     variants = await Promise.all(ids.map((id) => utils.getVariantByWooProductId(id)));
//     // }
//
//     return {
//         products: products,
//         variants: variants,
//         fullPage: true
//     };
// };

export async function getStaticProps() {
    const ids = [26338, 26385, 26405, 26516];
    let products = null,
        variants = [];

    products = await Promise.all(ids.map((id) => utils.getProductByWooId(id)));
    variants = await Promise.all(ids.map((id) => utils.getVariantByWooProductId(id)));

    return {
        props: {
            products: products,
            variants: variants,
            fullPage: true
        },
        revalidate: 10, // In seconds
    };
}

export default withRouter(Canopy_Tent);
