import React, {useEffect, useState, createRef} from "react";
import {useDispatch, useSelector} from 'react-redux'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {SketchPicker, SwatchesPicker} from "react-color";
import NumberFormat from "react-number-format";
import clsx from "clsx";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {withRouter} from "next/router";

import {useStyletron} from "baseui";
import {Block} from "baseui/block";
import {Tabs, Tab, FILL} from "baseui/tabs-motion";
import {Button, SIZE, KIND, SHAPE} from "baseui/button";
import {RadioGroup, Radio, ALIGN} from "baseui/radio";
import {ListItem, ListItemLabel, ARTWORK_SIZES} from "baseui/list";
import {Search, Delete, ChevronDown, Upload} from "baseui/icon";
import {Input} from "baseui/input";
import {Textarea} from "baseui/textarea";
import {StatefulTooltip, PLACEMENT, TRIGGER_TYPE} from "baseui/tooltip";
import {StatefulDataTable, BooleanColumn, CategoricalColumn, CustomColumn, NumericalColumn, StringColumn, COLUMNS, NUMERICAL_FORMATS} from "baseui/data-table";
import {Table} from "baseui/table-semantic";
import {TableBuilder, TableBuilderColumn} from "baseui/table-semantic";

import {DateFn, NumberFn, StringFn, UrlFn} from "../../utils/tools";
import Utils from "../../utils/utils";
import {EventEmitter} from "../../utils/events";

import {Checkout} from "../../components/sections";
import {Modal} from "../../components/surfacse";
import MButton from "../../components/button-n";

import {updateUser} from "../../redux/actions/userActions";
import {modifyCart} from "../../redux/actions/cartActions";

const dateFn = new DateFn();
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
const id_attribute_roofColor = 21;
const id_attribute_roofSize = 31;
const id_attribute_frameSeries = 34;
const id_attribute_poleMaterial = 43;
const id_attribute_printing_tech = 44;
const id_attribute_qty_peak = 45;
const id_attribute_qty_valance = 46;

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

function Canopy_Tent({router, products, variants}) {
    const [displayTabs, setDisplayTabs] = useState(false);
    const [tabActiveKey, setTabActiveKey] = React.useState(0);

    const [productComponent, setProductComponent] = useState([products[0], products[3], products[3], products[3], products[3]]);
    const [productVariant, setProductVariant] = useState([variants[0], variants[3], variants[3], variants[3], variants[3]]);

    const [selectedFrame, setSelectedFrame] = useState("y5");

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

    const [shippedDay, setShippedDay] = useState("");

    const [wallIsOpen, setWallIsOpen] = useState(false);
    const [printIsOpen, setPrintIsOpen] = useState(false);
    const [printColorIsOpen, setPrintColorIsOpen] = useState(false);

    const [activeRoofSlide, setActiveRoofSlide] = useState(0);
    const [isPeakOrValance, setIsPeakOrValance] = useState(0);

    const [summaryIsOpen, setSummaryIsOpen] = useState(false);

    const [tentSeries, setTentSeries] = useState("");

    const [isInStock, setIsInStock] = useState(true);

    const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
    const [frameCompareOpen, setFrameCompareOpen] = useState(false);

    ////////////////////////////////////////

    const [css, theme] = useStyletron();

    ////////////////////////////////////////

    const [wallPlainAttributeList, setWallPlainAttributeList] = useState([]);
    const [wallPlainAttributeListTemp, setWallPlainAttributeListTemp] = useState([]);
    const [activeWall, setActiveWall] = useState(0);

    const [availableList, setAvailableList] = useState([
        {id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true},
        {id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true},
        {id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true},
        {id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true},
        {id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true},
    ]);

    ////////////////////////////////////////

    const [wallPictures, setWallPictures] = useState(["", "", "", ""]);
    const [wallPicturesTemp, setWallPicturesTemp] = useState(["", "", "", ""]);

    const [tabsRefs, setTabsRefs] = useState([]);
    const [value3, setValue3] = React.useState("1");

    ////////////////////////////////////////

    const dispatch = useDispatch();

    const {loggedIn, token} = useSelector(({user}) => user);
    const {cart} = useSelector(({cart}) => cart);

    const goSpecPage = () => router.push({pathname: "/canopy-tent/spec"});

    const openWallModal = (index) => {
        setActiveWall(index);

        const temp = JSON.parse(JSON.stringify(wallPlainAttributeList));
        setWallPlainAttributeListTemp(temp);

        const imageGalleryTemp = JSON.parse(JSON.stringify(productImageGallery));
        setProductImageGalleryTemp(imageGalleryTemp);

        const wallPicsTemp = JSON.parse(JSON.stringify(wallPictures));
        setWallPicturesTemp(wallPicsTemp);

        setWallIsOpen(true);
    };

    const closeWallModal = (save) => {
        if (save) {
            const temp = JSON.parse(JSON.stringify(wallPlainAttributeListTemp));
            setWallPlainAttributeList(temp);

            let selection = JSON.parse(JSON.stringify(selectedAttribute));
            temp.forEach((attribute, index) => {
                selection[index + 1] = attribute;
            });
            setSelectedAttribute(selection);

            let selectedVariantList = [];
            selection.forEach((attr, index) => {
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
            });
            setSelectedVariant(selectedVariantList);
        }
        setWallIsOpen(false);
    };

    const openSummaryModal = () => setSummaryIsOpen(true);

    const closeSummaryModal = () => setSummaryIsOpen(false);

    function renderCustomImage(props) {
        return (
            <>
                <img className="image-gallery-image" src={props.original}/>
                {wallPictures.map((pic, index) => {
                    if (!pic) return;
                    return <img key={index} style={{position: "absolute", left: 0, right: 0, height: "100%", width: "100%", objectFit: "contain"}} src={pic}/>;
                })}
            </>
        );
    }

    function renderCustomImageTemp(props) {
        return (
            <>
                <img className="image-gallery-image" src={props.original}/>
                {wallPicturesTemp.map((pic, index) => {
                    if (!pic) return;
                    return <img key={index} style={{position: "absolute", left: 0, right: 0, height: "100%", width: "100%", objectFit: "contain"}} src={pic}/>;
                })}
            </>
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

    useEffect(() => {
        if (!productImageGallery || productImageGallery.length === 0) return;
        let images = [...productImageGallery];
        images[0].renderItem = renderCustomImage;
        setProductImageGallery(images);
    }, [wallPictures]);

    useEffect(() => {
        if (!productImageGalleryTemp || productImageGalleryTemp.length === 0) return;
        let images = [...productImageGalleryTemp];
        images[0].renderItem = renderCustomImageTemp;
        setProductImageGalleryTemp(images);
    }, [wallPicturesTemp]);

    const handleChangeRadio = (event, index, id) => {
        // Part 1: 更改选项List信息 并 保存
        let selection = [...selectedAttribute];
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
        // Part 2.5: Canopy Tent订制选项，根据Tent Size变更Wall Size, Roof Size
        if (index === 0 && id === id_attribute_canopySize) {
            let sizes = event.target.value.split("x");
            let wallPicturesList = [...wallPictures];
            selection.forEach((item, indexA) => {
                if (indexA < 1) return;

                item.forEach((attribute) => {
                    if (attribute.id === id_attribute_canopySize) attribute.option = event.target.value;
                    if (attribute.id === id_attribute_wallSize) attribute.option = indexA % 2 === 0 ? sizes[0] + "ft" : sizes[1] === "26" ? "13ft" : sizes[1] + "ft";
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
        }
        // Part 3: 保存更改项
        setSelectedAttribute(selection);
        setSelectedVariant(selectionVariant);
    };

    const handleChangeWallRadio = (event, index, id) => {
        // Part 1: 更改选项List信息 并 保存
        let selection = JSON.parse(JSON.stringify(wallPlainAttributeList));
        selection[index].forEach((attribute) => (attribute.id === id ? (attribute.option = event.target.value) : null));
        // Part 2: 保存更改项
        setWallPlainAttributeList(selection);

        let selectionA = JSON.parse(JSON.stringify(selectedAttribute));
        selection.forEach((attribute, index) => {
            selectionA[index + 1] = attribute;
        });
        setSelectedAttribute(selectionA);

        let selectedVariantList = [];
        selectionA.forEach((attr, index) => {
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
        });
        setSelectedVariant(selectedVariantList);
    };

    const handleChangeWallRadioTemp = (event, index, id) => {
        // Part 1: 更改选项List信息 并 保存
        let selection = JSON.parse(JSON.stringify(wallPlainAttributeListTemp));
        selection[index].forEach((attribute) => (attribute.id === id ? (attribute.option = event.target.value) : null));
        // Part 2: 保存更改项
        setWallPlainAttributeListTemp(selection);
    };

    useEffect(() => {
        if (!wallPlainAttributeListTemp || wallPlainAttributeListTemp.length === 0) return;
        let wallPicturesList = JSON.parse(JSON.stringify(wallPicturesTemp));

        let product_name = "";
        let size = "";
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
            product_name = "y5-economic-canopy-tent";
            series = "Y5";
        }

        selectedVariant[0].attributes.map(({id, option}) => id === id_attribute_canopySize ? size = option.toUpperCase() : null);

        wallPlainAttributeListTemp.forEach((attribute, index) => {
            if (!attribute) {
                wallPicturesList[index] = "";
                return;
            }
            let colorResult = attribute.filter(({id}) => id === id_attribute_canopyColor);
            let color = colorResult.length > 0 ? colorResult[0].option.toLowerCase() : "white";
            // 设置Wall图片
            let type = attribute.filter((attr) => attr.id === id_attribute_wallType)[0].option.toLowerCase();
            if (type === "none") return;
            const typeUrl = wallMap.get("type").find((w) => w.key === type).value;
            const sizeUrl = wallMap.get("size").find((w) => w.key === size.toLowerCase()).value;
            const colorUrl = wallMap.get("color").find((w) => w.key === color).value;
            const sideUrl = wallMap.get("side").find((w) => w.key === index + 1).value;
            wallPicturesList[index] = "/images/product/" + product_name + "/wall/" + series + "-" + typeUrl + sizeUrl + colorUrl + "-" + sideUrl + ".png";
        });
        // Set墙面图片
        setWallPicturesTemp(wallPicturesList);
    }, [wallPlainAttributeListTemp]);

    const checkProduct_getPrice = () => {
        let regularPrice = 0,
            salePrice = 0;

        let available = [...availableList];

        let size = "";

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
                if (size === "13x26" && (index === 2 || index === 4)) {
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
        setTotalSalePrice(salePrice === regularPrice ? 0 : salePrice);
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
    };

    //////////////////////////////////////

    useEffect(() => {
        setShippedDay(dateFn.getReceivedDay());

        setTabsRefs((tabsRefs) => Array(3).fill().map((_, i) => tabsRefs[i] || createRef()));

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
    }, []);

    useEffect(() => {
        if (tabsRefs.length > 0) setDisplayTabs(true);
    }, [tabsRefs]);

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
            if (component.id === id_product_wall) {
                defaultAttr.forEach((attr, indexB) => {
                    if (attr.id === id_attribute_wallType) {
                        attr.option = "none";
                    }
                });
            }
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
            product_name = "y5-economic-canopy-tent";
            series = "Y5";
        }

        selectedVariant.forEach((variant, index) => {
            if (!variant || !variant.attributes) {
                if (index > 0) wallPicturesList[index - 1] = "";
                return;
            }

            let colorResult = variant.attributes.filter((attr) => attr.id === id_attribute_canopyColor);
            let color = colorResult.length > 0 ? colorResult[0].option.toLowerCase() : "white";

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
                    wallPicturesList[index - 1] = "/images/product/" + product_name + "/wall/" + series + "-" + typeUrl + sizeUrl + colorUrl + "-" + sideUrl + ".png";
                } else {
                    wallPicturesList[index - 1] = "";
                }
            }
        });
        // Set墙面图片
        setWallPictures(wallPicturesList);
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

    // useEffect(() => {
    // 	if (totalRegularPrice === 0) return;
    // 	console.log(totalRegularPrice);
    // }, [totalRegularPrice]);

    // useEffect(() => {
    // 	if (totalSalePrice === 0) return;
    // 	console.log(totalSalePrice);
    // }, [totalSalePrice]);

    // useEffect(() => {
    // 	console.log(selectedAttribute);
    // }, [selectedAttribute]);

    const DataTable = () => {
        let rowDate = [];

        selectedVariant.map((variant, index) => {
            if (!variant) return;

            let cell = {
                name: index === 0 ? selectedFrame.toUpperCase() + " Canopy Tent Set" : productComponent[index].id === id_product_wall ? productComponent[index].name + ": " + variant.attributes[0].option : productComponent[index].name,
                quantity: 1,
                regular_price: variant.regular_price,
                sale_price: variant.sale_price,
                on_sale: variant.on_sale
            }

            rowDate.push(cell);
        });

        function NameCell({value}) {
            return <div style={{fontSize: 14}}>{value}</div>;
        }

        function QuantityCell({value}) {
            return <div style={{textAlign: "center", fontSize: 14}}>{value * totalCount}</div>;
        }

        function PriceCell({priceRegular, priceSale, onSale}) {
            return (
                <div style={{textAlign: "right", fontSize: 14}}>
                    {onSale ? (
                        <Block display="flex" flexDirection="row" justifyContent="flex-end">
                            {priceSale == 0 ? <div style={{color: "#E4458C", marginRight: 10}}>Free</div> :
                                <NumberFormat thousandSeparator={true} prefix={"$"} value={priceSale} displayType={"text"} style={{color: "#E4458C", marginRight: 10}}/>}
                            <NumberFormat thousandSeparator={true} prefix={"$"} value={priceRegular} displayType={"text"} style={{textDecoration: "line-through"}}/>
                        </Block>
                    ) : (
                        <NumberFormat thousandSeparator={true} prefix={"$"} value={priceRegular} displayType={"text"}/>
                    )}
                </div>
            );
        }

        return (
            <div style={{height: "100%"}}>
                <TableBuilder
                    data={rowDate}
                    overrides={{
                        Root: {
                            style: {
                                height: "calc(100% - 44px)",
                            },
                        },
                    }}
                >
                    <TableBuilderColumn header="Item">{(row) => <NameCell value={row.name}/>}</TableBuilderColumn>
                    <TableBuilderColumn header="Quantity" numeric
                                        overrides={{
                                            TableHeadCell: {
                                                style: {textAlign: "center"},
                                            },
                                        }}
                    >
                        {(row) => <QuantityCell value={row.quantity}/>}
                    </TableBuilderColumn>
                    <TableBuilderColumn header="Price"
                                        overrides={{
                                            TableHeadCell: {
                                                style: {textAlign: "right"},
                                            },
                                        }}
                    >
                        {(row) => <PriceCell priceRegular={row.regular_price} priceSale={row.sale_price} onSale={row.on_sale}/>}
                    </TableBuilderColumn>
                </TableBuilder>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "12px 20px",
                    borderTop: "1px solid #D9D9D9",
                    justifyContent: "space-between",
                    fontSize: 14,
                    alignItems: "center"
                }}>
                    <div>Total:</div>
                    <NumberFormat thousandSeparator={true} prefix={"$"} value={totalRegularPrice} displayType={"text"} style={{fontSize: 16, fontWeight: "bold"}}/>
                </div>
            </div>
        );
    };

    return (
        <React.Fragment>
            <Head>
                <title>Canopy Tent | WESTSHADE</title>
            </Head>
            <Block height={["calc(100vh - 48px)", "calc(100vh - 48px)", "calc(100vh - 96px)"]} display={"flex"} justifyContent={"center"} overflow={["scroll", "scroll", "hidden"]}>
                <Block width={["100%", "480px", "100%"]} height={["max-content", "max-content", "100%"]} display={"flex"} flexDirection={["column", "column", "row"]} paddingBottom={["116px", "116px", "0px"]}>
                    {/* 图片区域 */}
                    <Block flex={[0, 0, 1]} position={["unset", "unset", "relative"]} paddingTop={["0", "24px", "48px"]} paddingRight={["16px", "16px", "0"]} paddingLeft={["16px", "16px", "24px"]}>
                        <ImageGallery showNav={false} items={productImageGallery} thumbnailPosition="left" showPlayButton={false} showFullscreenButton={false}/>
                        <Checkout quantity={totalCount} isInStock={isInStock} buttonText={isInStock ? "Add to Bag" : "Out of Stock"} isAvailable={availableToCheckout}
                                  onClick={() => openSummaryModal()}
                                  onClickMinus={() => totalCount !== 1 && setTotalCount(totalCount - 1)}
                                  onClickPlus={() => setTotalCount(totalCount + 1)}
                                  onClickAddToBag={() => updateCart()}
                                  onSale={totalRegularPrice !== totalRegularPrice} totalPrice={totalRegularPrice} totalSalesPrice={totalSalePrice}
                        />
                    </Block>
                    {/* 选择区域 */}
                    <Block width={["auto", "auto", "413px"]} display={"flex"} flexDirection={"column"} alignItems={"center"} overflow={["unset", "unset", "scroll"]}
                           paddingTop={"24px"} paddingRight={["16px", "16px", "24px"]} paddingBottom={["94px", "68px", "0"]} paddingLeft={["16px", "16px", "0"]}
                           overrides={{
                               Block: {
                                   props: {
                                       className: "hideScrollBar"
                                   },
                               },
                           }}
                    >
                        <Block marginBottom="16px" font="MinXHeading20">Canopy Tent</Block>
                        <MButton type="solid" height="auto" marginRight="auto" marginBottom="20px" marginLeft="auto" font="MinXParagraph16" text='Spec' color="MinXPrimaryText"
                                 buttonStyle={{backgroundColor: "#F2F2F2 !important", paddingTop: "4px !important", paddingRight: "24px !important", paddingBottom: "4px !important", paddingLeft: "24px !important"}}
                                 onClick={() => goSpecPage()}
                        />
                        {displayTabs ? (
                            <Tabs activeKey={tabActiveKey} fill={FILL.fixed} activateOnFocus onChange={({activeKey}) => setTabActiveKey(parseInt(activeKey))}
                                  overrides={{
                                      Root: {
                                          style: ({$theme}) => ({width: "100%"}),
                                      },
                                      TabList: {
                                          props: {
                                              className: "hideScrollBar"
                                          },
                                          style: {
                                              overflowX: "scroll",
                                          },
                                      },
                                      TabBorder: {
                                          style: ({$theme}) => ({display: "none"}),
                                      },
                                      TabHighlight: {
                                          style: ({$theme}) => ({
                                              left: tabsRefs[tabActiveKey].current ? `${(tabsRefs[tabActiveKey].current.clientWidth - 24) / 2}px` : 0,
                                              width: "24px",
                                              height: "6px",
                                              backgroundColor: "#23A4AD",
                                              borderRadius: "3px",
                                          }),
                                      },
                                  }}
                            >
                                <Tab title="Basic" tabRef={tabsRefs[0]}
                                     overrides={{
                                         TabPanel: {
                                             style: ({$theme}) => ({paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0}),
                                         },
                                         Tab: {
                                             style: {":hover": {background: "none"}, paddingTop: "8px", paddingBottom: "8px"},
                                         },
                                     }}
                                >
                                    <>
                                        <div className="container-selection">
                                            <div style={{fontSize: 16, fontWeight: "500", marginBottom: 16}}>Size</div>
                                            <RadioGroup name="size" value={selectedAttribute[0] ? selectedAttribute[0][0].option.toLowerCase() : ""} align={ALIGN.horizontal}
                                                        onChange={(event) => handleChangeRadio(event, 0, id_attribute_canopySize)}
                                                        overrides={{
                                                            RadioGroupRoot: {
                                                                style: () => ({
                                                                    display: "grid",
                                                                    width: "100%",
                                                                    flexWrap: "wrap",
                                                                    gridTemplateColumns: "repeat(auto-fill, 30% )",
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
                                                                style: ({$checked}) => ({paddingLeft: 0, fontWeight: $checked ? "bold" : "500", fontSize: "14px", lineHeight: "20px"}),
                                                            },
                                                        }}
                                            >
                                                {productComponent && productComponent[0]
                                                    ? productComponent[0].attributes
                                                        .filter((attribute) => attribute.id === id_attribute_canopySize && attribute.variation)
                                                        .map(({options}) => options.map((option, index) => (
                                                            <Radio key={index} value={option.toLowerCase()}>{option}</Radio>
                                                        )))
                                                    : null}
                                            </RadioGroup>
                                            <MButton type="solid" height="auto" marginRight="auto" marginLeft="auto" font="MinXParagraph16" text='Size Guide' color="MinXPrimaryText"
                                                     buttonStyle={{backgroundColor: "#F2F2F2 !important", paddingTop: "4px !important", paddingRight: "24px !important", paddingBottom: "4px !important", paddingLeft: "24px !important"}}
                                                     onClick={() => setSizeGuideOpen(true)}
                                            />
                                        </div>
                                        <div className="container-selection">
                                            <div style={{fontSize: 16, fontWeight: "500", marginBottom: 16}}>Frame</div>
                                            <RadioGroup name="frame" value={selectedFrame} align={ALIGN.horizontal}
                                                        onChange={(event) => {
                                                            setSelectedFrame(event.target.value);
                                                            if (event.target.value === "y5") {
                                                                setProductComponent([products[0], products[3], products[3], products[3], products[3]]);
                                                                setProductVariant([variants[0], variants[3], variants[3], variants[3], variants[3]])
                                                            } else if (event.target.value === "y6") {
                                                                setProductComponent([products[1], products[3], products[3], products[3], products[3]]);
                                                                setProductVariant([variants[1], variants[3], variants[3], variants[3], variants[3]])
                                                            } else if (event.target.value === "y7") {
                                                                setProductComponent([products[2], products[3], products[3], products[3], products[3]]);
                                                                setProductVariant([variants[2], variants[3], variants[3], variants[3], variants[3]])
                                                            }
                                                        }}
                                                        overrides={{
                                                            RadioGroupRoot: {
                                                                style: ({$theme}) => ({
                                                                    display: "grid",
                                                                    width: "100%",
                                                                    flexWrap: "wrap",
                                                                    gridTemplateColumns: "repeat(auto-fill, 100%)",
                                                                    justifyContent: "space-between",
                                                                }),
                                                            },
                                                            Root: {
                                                                style: ({$theme, $checked}) => ({
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
                                                                style: ({$checked}) => ({paddingLeft: 0, fontWeight: $checked ? "bold" : "500", fontSize: "14px", lineHeight: "20px"}),
                                                            },
                                                        }}
                                            >
                                                <Radio value="y5">Y5 Economic Steel</Radio>
                                                <Radio value="y6">Y6 Commercial Aluminum</Radio>
                                                <Radio value="y7">Y7 Heavy Duty Aluminum</Radio>
                                            </RadioGroup>
                                            <MButton type="solid" height="auto" marginRight="auto" marginLeft="auto" font="MinXParagraph16" text='Compare Frames' color="MinXPrimaryText"
                                                     buttonStyle={{backgroundColor: "#F2F2F2 !important", paddingTop: "4px !important", paddingRight: "24px !important", paddingBottom: "4px !important", paddingLeft: "24px !important"}}
                                                     onClick={() => setFrameCompareOpen(true)}
                                            />
                                        </div>
                                        <div className="container-selection">
                                            <div style={{fontSize: 16, fontWeight: "500", marginBottom: 16}}>Color</div>
                                            <RadioGroup name="color" value={selectedAttribute[0] ? selectedAttribute[0][1].option.toLowerCase() : ""} align={ALIGN.horizontal}
                                                        onChange={(event) => handleChangeRadio(event, 0, id_attribute_canopyColor)}
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
                                                {productComponent && productComponent[0]
                                                    ? productComponent[0].attributes.filter((attribute) => attribute.id === id_attribute_canopyColor && attribute.variation)
                                                        .map(({options}) => options.map((option, index) => (
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
                                                            ))
                                                        )
                                                    : null}
                                            </RadioGroup>
                                        </div>
                                    </>
                                </Tab>
                                <Tab title="+Wall" tabRef={tabsRefs[1]}
                                     overrides={{
                                         TabPanel: {
                                             style: ({$theme}) => ({paddingRight: 0, paddingLeft: 0}),
                                         },
                                         Tab: {
                                             style: {":hover": {background: "none"}, paddingTop: "8px", paddingBottom: "8px"},
                                         },
                                     }}
                                >
                                    <ul
                                        className={css({
                                            paddingLeft: 0,
                                            paddingRight: 0,
                                        })}
                                    >
                                        {wallPlainAttributeList.map((component, index) => {
                                            return (
                                                <ListItem key={index}
                                                          artwork={(props) => {
                                                              return component[0].option !== "none" ? (
                                                                  <>
                                                                      {index === 0 ? (
                                                                          <img src="/images/icon/icon-wall-left-added.png" alt="icon-wall-left"/>
                                                                      ) : index === 1 ? (
                                                                          <img src="/images/icon/icon-wall-right-added.png" alt="icon-wall-right"/>
                                                                      ) : index === 2 ? (
                                                                          <img src="/images/icon/icon-wall-front-added.png" alt="icon-wall-front"/>
                                                                      ) : index === 3 ? (
                                                                          <img src="/images/icon/icon-wall-back-added.png" alt="icon-wall-back"/>
                                                                      ) : null}
                                                                  </>
                                                              ) : (
                                                                  <>
                                                                      {index === 0 ? (
                                                                          <img src="/images/icon/icon-wall-left.png" alt="icon-wall-left"/>
                                                                      ) : index === 1 ? (
                                                                          <img src="/images/icon/icon-wall-right.png" alt="icon-wall-right"/>
                                                                      ) : index === 2 ? (
                                                                          <img src="/images/icon/icon-wall-front.png" alt="icon-wall-front"/>
                                                                      ) : index === 3 ? (
                                                                          <img src="/images/icon/icon-wall-back.png" alt="icon-wall-back"/>
                                                                      ) : null}
                                                                  </>
                                                              );
                                                          }}
                                                          overrides={{
                                                              Root: {
                                                                  style: ({$theme}) => ({
                                                                      height: "68px",
                                                                      paddingRight: "8px",
                                                                      paddingLeft: "8px",
                                                                      backgroundColor: component[0].option !== "none" ? "#F5FCFC" : "transparent",
                                                                  }),
                                                              },
                                                              Content: {
                                                                  style: ({$theme}) => ({
                                                                      paddingRight: 0,
                                                                      paddingLeft: "12px",
                                                                      borderBottomWidth: 0,
                                                                  }),
                                                              },
                                                              ArtworkContainer: {
                                                                  style: ({$theme}) => ({
                                                                      width: "44px",
                                                                      height: "44px",
                                                                  }),
                                                              },
                                                          }}
                                                          endEnhancer={() => {
                                                              return (
                                                                  <>
                                                                      {component[0].option !== "none" ? (
                                                                          <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                                                              <Button
                                                                                  shape={SHAPE.pill}
                                                                                  overrides={{
                                                                                      BaseButton: {props: {className: "button-edit"}},
                                                                                  }}
                                                                                  onClick={() => openWallModal(index)}
                                                                              >
                                                                                  Edit
                                                                              </Button>
                                                                              <Button
                                                                                  kind={KIND.tertiary}
                                                                                  shape={SHAPE.circle}
                                                                                  overrides={{
                                                                                      BaseButton: {
                                                                                          style: ({$theme}) => ({
                                                                                              marginLeft: "17px",
                                                                                              width: "20px",
                                                                                              height: "20px",
                                                                                              backgroundColor: "transparent",
                                                                                          }),
                                                                                      },
                                                                                  }}
                                                                                  onClick={() => handleChangeWallRadio({target: {value: "none"}}, index, id_attribute_wallType)}
                                                                              >
                                                                                  <Delete size={20}/>
                                                                              </Button>
                                                                          </div>
                                                                      ) : (
                                                                          <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                                                              <Button
                                                                                  shape={SHAPE.pill}
                                                                                  overrides={{
                                                                                      BaseButton: {props: {className: "button-add"}},
                                                                                  }}
                                                                                  onClick={() => openWallModal(index)}
                                                                              >
                                                                                  Edit
                                                                              </Button>
                                                                          </div>
                                                                      )}
                                                                  </>
                                                              );
                                                          }}
                                                >
                                                    <ListItemLabel description={index === 0 ? "left" : index === 1 ? "Right" : index === 2 ? "Front" : index === 3 ? "Back" : ""}
                                                                   overrides={{
                                                                       LabelContent: {
                                                                           style: ({$theme}) => ({fontSize: "14px", lineHeight: "20px", marginBottom: "4px"}),
                                                                       },
                                                                       LabelDescription: {
                                                                           style: ({$theme}) => ({fontSize: "14px", lineHeight: "20px", color: "#808080"}),
                                                                       },
                                                                   }}
                                                    >
                                                        {component[0].option.toLowerCase() === "rollup" ? "Roll-up" : stringFn.changeCase(component[0].option, 1)}
                                                    </ListItemLabel>
                                                </ListItem>
                                            );
                                        })}
                                    </ul>
                                </Tab>
                                {/*<Tab title="+Accessory" tabRef={tabsRefs[2]}*/}
                                {/*    overrides={{*/}
                                {/*        TabPanel: {*/}
                                {/*            style: ({$theme}) => ({paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0}),*/}
                                {/*        },*/}
                                {/*        Tab: {*/}
                                {/*            style: {":hover": {background: "none"}, paddingTop: "8px", paddingBottom: "8px"},*/}
                                {/*        },*/}
                                {/*    }}*/}
                                {/*>*/}
                                {/*    <>*/}
                                {/*        <div style={{display: "flex", flexDirection: "column", paddingTop: "32px", textAlign: "center", alignItems: "center"}}>*/}
                                {/*            <div style={{fontSize: 16, fontWeight: "500", marginBottom: 16}}>For production</div>*/}
                                {/*            <RadioGroup*/}
                                {/*                value={value3}*/}
                                {/*                onChange={(event) => setValue3(event.target.value)}*/}
                                {/*                name="slide"*/}
                                {/*                align={ALIGN.horizontal}*/}
                                {/*                overrides={{*/}
                                {/*                    RadioGroupRoot: {*/}
                                {/*                        style: ({$theme}) => ({*/}
                                {/*                            display: "grid",*/}
                                {/*                            width: "100%",*/}
                                {/*                            flexWrap: "wrap",*/}
                                {/*                            justifyContent: "space-between",*/}
                                {/*                            gridTemplateColumns: "repeat(auto-fill, 50%)",*/}
                                {/*                        }),*/}
                                {/*                    },*/}
                                {/*                    Root: {*/}
                                {/*                        style: ({$checked}) => ({*/}
                                {/*                            height: "162px",*/}
                                {/*                            justifyContent: "center",*/}
                                {/*                            padding: $checked ? "4px 0" : "6px 0",*/}
                                {/*                            border: $checked ? "3px solid #23A4AD" : "1px solid #D9D9D9",*/}
                                {/*                            boxSizing: "border-box",*/}
                                {/*                            borderRadius: "16px",*/}
                                {/*                            marginTop: 0,*/}
                                {/*                            marginRight: "12px",*/}
                                {/*                            marginBottom: "16px",*/}
                                {/*                            marginLeft: "12px",*/}
                                {/*                        }),*/}
                                {/*                    },*/}
                                {/*                    RadioMarkOuter: {*/}
                                {/*                        style: () => ({display: "none"}),*/}
                                {/*                    },*/}
                                {/*                    RadioMarkInner: {*/}
                                {/*                        style: () => ({display: "none"}),*/}
                                {/*                    },*/}
                                {/*                    Label: {*/}
                                {/*                        style: ({$checked}) => ({paddingLeft: 0, fontWeight: $checked ? "bold" : "500", fontSize: "14px", lineHeight: "22px"}),*/}
                                {/*                    },*/}
                                {/*                }}*/}
                                {/*            >*/}
                                {/*                <Radio*/}
                                {/*                    value={"1"}*/}
                                {/*                    overrides={{*/}
                                {/*                        Label: ({$value}) => (*/}
                                {/*                            <div style={{position: "relative"}}>*/}
                                {/*                                <img style={{height: 80, width: 80, objectFit: "contain", marginBottom: 4}} src="/images/icon/wall-pvc.png"/>*/}
                                {/*                                <div style={{fontSize: 14, lineHeight: "14px", fontWeight: "500", marginBottom: 6}}>Wheeled cover</div>*/}
                                {/*                                <div style={{fontSize: 12, lineHeight: "12px", marginBottom: 6}}>+ $94</div>*/}
                                {/*                                <Button*/}
                                {/*                                    size={SIZE.mini}*/}
                                {/*                                    kind={KIND.minimal}*/}
                                {/*                                    overrides={{*/}
                                {/*                                        BaseButton: {*/}
                                {/*                                            style: ({$theme}) => ({*/}
                                {/*                                                height: "20px",*/}
                                {/*                                                fontSize: "12px",*/}
                                {/*                                                lineHeight: "20px",*/}
                                {/*                                                color: "#23A4AD",*/}
                                {/*                                            }),*/}
                                {/*                                        },*/}
                                {/*                                    }}*/}
                                {/*                                >*/}
                                {/*                                    Add to cart*/}
                                {/*                                </Button>*/}
                                {/*                            </div>*/}
                                {/*                        ),*/}
                                {/*                    }}*/}
                                {/*                />*/}
                                {/*            </RadioGroup>*/}
                                {/*            <div style={{marginBottom: 20}}/>*/}
                                {/*        </div>*/}
                                {/*        <div style={{display: "flex", flexDirection: "column", paddingTop: "32px", textAlign: "center", alignItems: "center"}}>*/}
                                {/*            <div style={{fontSize: 16, fontWeight: "500", marginBottom: 16}}>For stabilization</div>*/}
                                {/*            <RadioGroup*/}
                                {/*                value={value3}*/}
                                {/*                onChange={(event) => setValue3(event.target.value)}*/}
                                {/*                name="slide"*/}
                                {/*                align={ALIGN.horizontal}*/}
                                {/*                overrides={{*/}
                                {/*                    RadioGroupRoot: {*/}
                                {/*                        style: ({$theme}) => ({*/}
                                {/*                            display: "grid",*/}
                                {/*                            width: "100%",*/}
                                {/*                            flexWrap: "wrap",*/}
                                {/*                            justifyContent: "space-between",*/}
                                {/*                            gridTemplateColumns: "repeat(auto-fill, 50%)",*/}
                                {/*                        }),*/}
                                {/*                    },*/}
                                {/*                    Root: {*/}
                                {/*                        style: ({$checked}) => ({*/}
                                {/*                            height: "162px",*/}
                                {/*                            justifyContent: "center",*/}
                                {/*                            padding: $checked ? "4px 0" : "6px 0",*/}
                                {/*                            border: $checked ? "3px solid #23A4AD" : "1px solid #D9D9D9",*/}
                                {/*                            boxSizing: "border-box",*/}
                                {/*                            borderRadius: "16px",*/}
                                {/*                            marginTop: 0,*/}
                                {/*                            marginRight: "12px",*/}
                                {/*                            marginBottom: "16px",*/}
                                {/*                            marginLeft: "12px",*/}
                                {/*                        }),*/}
                                {/*                    },*/}
                                {/*                    RadioMarkOuter: {*/}
                                {/*                        style: () => ({display: "none"}),*/}
                                {/*                    },*/}
                                {/*                    RadioMarkInner: {*/}
                                {/*                        style: () => ({display: "none"}),*/}
                                {/*                    },*/}
                                {/*                    Label: {*/}
                                {/*                        style: ({$checked}) => ({paddingLeft: 0, fontWeight: $checked ? "bold" : "500", fontSize: "14px", lineHeight: "22px"}),*/}
                                {/*                    },*/}
                                {/*                }}*/}
                                {/*            >*/}
                                {/*                <Radio*/}
                                {/*                    value={"1"}*/}
                                {/*                    overrides={{*/}
                                {/*                        Label: ({$value}) => (*/}
                                {/*                            <div style={{position: "relative"}}>*/}
                                {/*                                <img style={{height: 80, width: 80, objectFit: "contain", marginBottom: 4}} src="/images/icon/wall-pvc.png"/>*/}
                                {/*                                <div style={{fontSize: 14, lineHeight: "14px", fontWeight: "500", marginBottom: 6}}>Water weight</div>*/}
                                {/*                                <div style={{fontSize: 12, lineHeight: "12px", marginBottom: 6}}>+ $94 each</div>*/}
                                {/*                                <Button*/}
                                {/*                                    size={SIZE.mini}*/}
                                {/*                                    kind={KIND.minimal}*/}
                                {/*                                    overrides={{*/}
                                {/*                                        BaseButton: {*/}
                                {/*                                            style: ({$theme}) => ({*/}
                                {/*                                                height: "20px",*/}
                                {/*                                                fontSize: "12px",*/}
                                {/*                                                lineHeight: "20px",*/}
                                {/*                                                color: "#23A4AD",*/}
                                {/*                                            }),*/}
                                {/*                                        },*/}
                                {/*                                    }}*/}
                                {/*                                >*/}
                                {/*                                    Add to cart*/}
                                {/*                                </Button>*/}
                                {/*                            </div>*/}
                                {/*                        ),*/}
                                {/*                    }}*/}
                                {/*                />*/}
                                {/*            </RadioGroup>*/}
                                {/*            <div style={{marginBottom: 20}}/>*/}
                                {/*        </div>*/}
                                {/*    </>*/}
                                {/*</Tab>*/}
                            </Tabs>
                        ) : null}
                    </Block>
                </Block>
            </Block>
            <Modal type="dialog" isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} header={<Block font="MinXLabel20">Size Guide</Block>}>
                <Block display="grid" gridTemplateColumns="140px max-content" marginTop="48px">
                    <Block display="grid" gridTemplateRows="78px repeat(3, 60px)" gridRowGap="24px">
                        <div/>
                        <Block>
                            <Block font="MinXLabel14" color="MinXPrimaryText">Y5 Economic steel</Block>
                            <Block font="MinXParagraph12" color="MinXSecondaryText">Clearance Height 6'10"</Block>
                            <Block font="MinXParagraph12" color="MinXSecondaryText">Overall Height 10'15"</Block>
                        </Block>
                        <Block>
                            <Block font="MinXLabel14" color="MinXPrimaryText">Y5 Economic steel</Block>
                            <Block font="MinXParagraph12" color="MinXSecondaryText">Clearance Height 6'10"</Block>
                            <Block font="MinXParagraph12" color="MinXSecondaryText">Overall Height 10'15"</Block>
                        </Block>
                        <Block>
                            <Block font="MinXLabel14" color="MinXPrimaryText">Y5 Economic steel</Block>
                            <Block font="MinXParagraph12" color="MinXSecondaryText">Clearance Height 6'10"</Block>
                            <Block font="MinXParagraph12" color="MinXSecondaryText">Overall Height 10'15"</Block>
                        </Block>
                    </Block>
                    <Block width={["calc(100vw - 140px - 48px)", "calc(100vw - 140px - 48px)", "auto"]} display="grid" gridTemplateColumns="repeat(8, 70px)" gridColumnGap="24px" overflow={["scrollX", "scrollX", "hidden"]}
                           overrides={{
                               Block: {
                                   props: {
                                       className: "hideScrollBar"
                                   },
                               },
                           }}
                    >
                        <Block display="grid" gridTemplateRows="78px repeat(3, 60px)" gridRowGap="24px" alignItems="center" justifyItems="center">
                            <Block display="flex" flexDirection="column" alignItems="center">
                                <Block width="50px" height="50px">
                                    <Image src="images/icon/icon-10x10.png" alt="canopy tent 10x10" layout="responsive" objectFit="contain" width={156} height={140} quality={100}/>
                                </Block>
                                <Block font="MinXParagraph14" color="MinXSecondaryText">10' x 10'</Block>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/related.png" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/related.png" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/related.png" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                        </Block>
                        <Block display="grid" gridTemplateRows="78px repeat(3, 60px)" gridRowGap="24px" alignItems="center" justifyItems="center">
                            <Block display="flex" flexDirection="column" alignItems="center">
                                <Block width="50px" height="50px">
                                    <Image src="images/icon/icon-10x15.png" alt="canopy tent 10x15" layout="responsive" objectFit="contain" width={175} height={144} quality={100}/>
                                </Block>
                                <Block font="MinXParagraph14" color="MinXSecondaryText">10' x 15'</Block>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/related.png" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/related.png" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/related.png" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                        </Block>
                        <Block display="grid" gridTemplateRows="78px repeat(3, 60px)" gridRowGap="24px" alignItems="center" justifyItems="center">
                            <Block display="flex" flexDirection="column" alignItems="center">
                                <Block width="50px" height="50px">
                                    <Image src="images/icon/icon-13x13.png" alt="canopy tent 13x13" layout="responsive" objectFit="contain" width={160} height={140} quality={100}/>
                                </Block>
                                <Block font="MinXParagraph14" color="MinXSecondaryText">13' x 13'</Block>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/unrelated.png" alt="unrelated" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/unrelated.png" alt="unrelated" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/related.png" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                        </Block>
                        <Block display="grid" gridTemplateRows="78px repeat(3, 60px)" gridRowGap="24px" alignItems="center" justifyItems="center">
                            <Block display="flex" flexDirection="column" alignItems="center">
                                <Block width="50px" height="50px">
                                    <Image src="images/icon/icon-10x20.png" alt="canopy tent 10x20" layout="responsive" objectFit="contain" width={199} height={140} quality={100}/>
                                </Block>
                                <Block font="MinXParagraph14" color="MinXSecondaryText">10' x 20'</Block>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/related.png" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/related.png" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/related.png" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                        </Block>
                        <Block display="grid" gridTemplateRows="78px repeat(3, 60px)" gridRowGap="24px" alignItems="center" justifyItems="center">
                            <Block display="flex" flexDirection="column" alignItems="center">
                                <Block width="50px" height="50px">
                                    <Image src="images/icon/icon-16x16.png" alt="canopy tent 16x16" layout="responsive" objectFit="contain" width={192} height={140} quality={100}/>
                                </Block>
                                <Block font="MinXParagraph14" color="MinXSecondaryText">16' x 16'</Block>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/unrelated.png" alt="unrelated" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/unrelated.png" alt="unrelated" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/related.png" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                        </Block>
                        <Block display="grid" gridTemplateRows="78px repeat(3, 60px)" gridRowGap="24px" alignItems="center" justifyItems="center">
                            <Block display="flex" flexDirection="column" alignItems="center">
                                <Block width="50px" height="50px">
                                    <Image src="images/icon/icon-13x20.png" alt="canopy tent 13x20" layout="responsive" objectFit="contain" width={187} height={140} quality={100}/>
                                </Block>
                                <Block font="MinXParagraph14" color="MinXSecondaryText">13' x 20'</Block>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/unrelated.png" alt="unrelated" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/unrelated.png" alt="unrelated" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/related.png" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                        </Block>
                        <Block display="grid" gridTemplateRows="78px repeat(3, 60px)" gridRowGap="24px" alignItems="center" justifyItems="center">
                            <Block display="flex" flexDirection="column" alignItems="center">
                                <Block width="50px" height="50px">
                                    <Image src="images/icon/icon-13x26.png" alt="canopy tent 13x26" layout="responsive" objectFit="contain" width={206} height={140} quality={100}/>
                                </Block>
                                <Block font="MinXParagraph14" color="MinXSecondaryText">13' x 26'</Block>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/unrelated.png" alt="unrelated" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/unrelated.png" alt="unrelated" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/related.png" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                        </Block>
                        <Block display="grid" gridTemplateRows="78px repeat(3, 60px)" gridRowGap="24px" alignItems="center" justifyItems="center">
                            <Block display="flex" flexDirection="column" alignItems="center">
                                <Block width="50px" height="50px">
                                    <Image src="images/icon/icon-20x20.png" alt="canopy tent 20x20" layout="responsive" objectFit="contain" width={215} height={140} quality={100}/>
                                </Block>
                                <Block font="MinXParagraph14" color="MinXSecondaryText">20' x 20'</Block>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/unrelated.png" alt="unrelated" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/unrelated.png" alt="unrelated" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                            <Block width="22px" height="22px">
                                <Image src="images/umbrella/related.png" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                            </Block>
                        </Block>
                    </Block>
                </Block>
            </Modal>
            <Modal type="dialog" isOpen={frameCompareOpen} onClose={() => setFrameCompareOpen(false)}>
                <Block marginTop={["64px", "64px", "30px"]}
                       overrides={{
                           Block: {
                               style: {textAlign: "center"}
                           }
                       }}
                >
                    <Block display="grid" gridTemplateColumns="repeat(3, 200px)" gridColumnGap="32px" width="fit-content"
                           marginRight={["auto", "auto", "56px"]} marginBottom="16px" marginLeft={["auto", "auto", "56px"]}
                           paddingBottom="16px"
                           overrides={{
                               Block: {
                                   style: {borderBottomWidth: "1px", borderBottomStyle: "solid", borderBottomColor: "#D9D9D9",}
                               }
                           }}
                    >
                        <Block font="MinXParagraph14">
                            <Block>Y5 Economic steel</Block>
                            <Block marginTop="4px" color="#23A4AD"
                                   overrides={{
                                       Block: {
                                           style: {
                                               ":hover": {cursor: 'pointer'}
                                           }
                                       }
                                   }}
                                   onClick={() => goSpecPage()}
                            >Learn more</Block>
                        </Block>
                        <Block font="MinXParagraph14">
                            <Block>Y6 Commercial Aluminum</Block>
                            <Block marginTop="4px" color="#23A4AD"
                                   overrides={{
                                       Block: {
                                           style: {
                                               ":hover": {cursor: 'pointer'}
                                           }
                                       }
                                   }}
                                   onClick={() => goSpecPage()}
                            >Learn more</Block>
                        </Block>
                        <Block font="MinXParagraph14">
                            <Block>Y7 Heavy duty aluminum</Block>
                            <Block marginTop="4px" color="#23A4AD"
                                   overrides={{
                                       Block: {
                                           style: {
                                               ":hover": {cursor: 'pointer'}
                                           }
                                       }
                                   }}
                                   onClick={() => goSpecPage()}
                            >Learn more</Block>
                        </Block>
                    </Block>
                    <Block display="grid" gridTemplateColumns="repeat(3, 200px)" gridColumnGap="32px" width="fit-content"
                           marginRight={["auto", "auto", "56px"]} marginLeft={["auto", "auto", "56px"]} paddingBottom="16px"
                    >
                        <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px">
                            <Block font="MinXLabel20">
                                <Block>Steel</Block>
                                <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Frame</Block>
                            </Block>
                            <Block font="MinXLabel20">
                                <Block>0.05"</Block>
                                <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Pole thickness</Block>
                            </Block>
                            <Block font="MinXLabel20">
                                <Block>45mm</Block>
                                <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Pole diameter</Block>
                            </Block>
                            <Block font="MinXLabel20">
                                <Block>3</Block>
                                <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Size available</Block>
                            </Block>
                            <Block font="MinXLabel20">
                                <Block>1 year</Block>
                                <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Frame warranty</Block>
                            </Block>
                        </Block>
                        <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px">
                            <Block font="MinXLabel20">
                                <Block>Aluminum</Block>
                                <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Frame</Block>
                            </Block>
                            <Block font="MinXLabel20">
                                <Block>0.06"</Block>
                                <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Pole thickness</Block>
                            </Block>
                            <Block font="MinXLabel20">
                                <Block>45mm</Block>
                                <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Pole diameter</Block>
                            </Block>
                            <Block font="MinXLabel20">
                                <Block>3</Block>
                                <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Size available</Block>
                            </Block>
                            <Block font="MinXLabel20">
                                <Block>5 years</Block>
                                <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Frame warranty</Block>
                            </Block>
                        </Block>
                        <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px">
                            <Block font="MinXLabel20">
                                <Block>Aluminum</Block>
                                <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Frame</Block>
                            </Block>
                            <Block font="MinXLabel20">
                                <Block>0.07"</Block>
                                <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Pole thickness</Block>
                            </Block>
                            <Block font="MinXLabel20">
                                <Block>57mm</Block>
                                <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Pole diameter</Block>
                            </Block>
                            <Block font="MinXLabel20">
                                <Block>9</Block>
                                <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Size available</Block>
                            </Block>
                            <Block font="MinXLabel20">
                                <Block>10 years</Block>
                                <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Frame warranty</Block>
                            </Block>
                        </Block>
                    </Block>
                </Block>
            </Modal>
            <Modal isOpen={wallIsOpen} onClose={() => closeWallModal()}
                   footer={
                       <Block width={"100%"} height={["54px", "70px", "80px"]} backgroundColor={"white"} display={"flex"} alignItems={"center"}
                              justifyContent={"space-between"} paddingLeft={"16px"} paddingRight={"16px"}
                       >
                           <Block>
                               <Block display={["none", "block"]}>
                                   <div style={{fontSize: "12px", marginRight: "24px", textAlign: "left"}}>After submitting the order, we’ll contact you with a free mockup based on
                                       the information you provide us here.
                                   </div>
                               </Block>
                               <Block display={["block", "none"]}>
                                   <StatefulTooltip placement={PLACEMENT.top} triggerType={TRIGGER_TYPE.click} content={() => <div style={{zIndex: 999}}>xxx</div>}>
                                       <div
                                           style={{
                                               width: 20,
                                               height: 20,
                                               border: "2px solid black",
                                               borderRadius: "50%",
                                               textAlign: "center",
                                               fontSize: 12,
                                               fontWeight: "bold",
                                               lineHeight: "17px",
                                               marginRight: 2,
                                               marginLeft: 2,
                                           }}
                                       >
                                           !
                                       </div>
                                   </StatefulTooltip>
                               </Block>
                           </Block>
                           <Block display="flex" flexDirection="row">
                               <Block minWidth={["85px"]} height={"40px"} marginRight={"24px"}>
                                   <Button
                                       shape={SHAPE.pill}
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
                                       onClick={() => closeWallModal()}
                                   >
                                       Cancel
                                   </Button>
                               </Block>
                               <Block minWidth={["85px"]} height={"40px"}>
                                   <Button
                                       shape={SHAPE.pill}
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
                <Block width={["100%", "480px", "100%"]} display={"flex"} flexDirection={["column", "column", "row"]} marginLeft={"auto"} marginRight={"auto"}>
                    {/* 图片区域 */}
                    <Block flex={[0, 0, 1]} position={"relative"} className={"modalGallery"} paddingRight={["16px", "52px", "0"]} paddingLeft={["16px", "52px", "64px"]}>
                        <ImageGallery showNav={false} items={[productImageGalleryTemp[0]]} showPlayButton={false} showFullscreenButton={false}/>
                    </Block>
                    <Block display={"flex"} flexDirection={"column"} alignItems={"center"} width={["100%", "100%", "424px"]}
                           paddingTop={["24px", "24px", "40px"]} paddingRight={["16px", "52px", "64px"]} paddingLeft={["16px", "52px", "0"]} overflow={["unset", "unset", "scroll"]}
                           overrides={{
                               Block: {
                                   props: {
                                       className: "hideScrollBar"
                                   },
                               }
                           }}
                    >
                        <div style={{display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center", width: "100%"}}>
                            <div style={{fontSize: 16, fontWeight: "500", marginBottom: 16}}>Wall type</div>
                            <RadioGroup name="wall_type" value={wallPlainAttributeListTemp[activeWall] ? wallPlainAttributeListTemp[activeWall][0].option.toLowerCase() : "none"} align={ALIGN.horizontal}
                                        onChange={(event) => handleChangeWallRadioTemp(event, activeWall, id_attribute_wallType)}
                                        overrides={{
                                            RadioGroupRoot: {
                                                style: ({$theme}) => ({
                                                    display: "grid",
                                                    width: "100%",
                                                    flexWrap: "wrap",
                                                    justifyContent: "space-between",
                                                    gridTemplateColumns: "repeat(auto-fill, calc(100% / 3))",
                                                }),
                                                props: {
                                                    className: "radioGroupWall",
                                                },
                                            },
                                            Root: {
                                                style: ({$checked}) => ({
                                                    height: "142px",
                                                    justifyContent: "center",
                                                    padding: $checked ? "13px 0" : "15px 0",
                                                    border: $checked ? "3px solid #23A4AD" : "1px solid #D9D9D9",
                                                    boxSizing: "border-box",
                                                    borderRadius: "16px",
                                                    marginTop: 0,
                                                    marginRight: "12px",
                                                    marginBottom: "16px",
                                                    marginLeft: "12px",
                                                }),
                                            },
                                            RadioMarkOuter: {
                                                style: () => ({display: "none"}),
                                            },
                                            RadioMarkInner: {
                                                style: () => ({display: "none"}),
                                            },
                                            Label: {
                                                style: ({$checked}) => ({paddingLeft: 0, fontWeight: $checked ? "bold" : "500", fontSize: "14px", lineHeight: "22px"}),
                                            },
                                        }}
                            >
                                {productComponent && productComponent[1] ? productComponent[1].attributes.filter((attribute) => attribute.id === id_attribute_wallType && attribute.variation).map(({options}) =>
                                    options.map((option, indexWall) => (
                                        <Radio key={indexWall} value={option.toLowerCase()}
                                               overrides={{
                                                   Label: ({$value}) => (
                                                       <Block>
                                                           {/*<Button*/}
                                                           {/*    kind={KIND.tertiary}*/}
                                                           {/*    shape={SHAPE.circle}*/}
                                                           {/*    overrides={{*/}
                                                           {/*        BaseButton: {*/}
                                                           {/*            style: ({$theme}) => ({*/}
                                                           {/*                position: "absolute",*/}
                                                           {/*                right: "-12px",*/}
                                                           {/*                top: "-12px",*/}
                                                           {/*                width: "12px",*/}
                                                           {/*                height: "12px",*/}
                                                           {/*                borderTopWidth: "1px",*/}
                                                           {/*                borderTopStyle: "solid",*/}
                                                           {/*                borderTopColor: "#B2B2B2",*/}
                                                           {/*                borderRightWidth: "1px",*/}
                                                           {/*                borderRightStyle: "solid",*/}
                                                           {/*                borderRightColor: "#B2B2B2",*/}
                                                           {/*                borderBottomWidth: "1px",*/}
                                                           {/*                borderBottomStyle: "solid",*/}
                                                           {/*                borderBottomColor: "#B2B2B2",*/}
                                                           {/*                borderLeftWidth: "1px",*/}
                                                           {/*                borderLeftStyle: "solid",*/}
                                                           {/*                borderLeftColor: "#B2B2B2",*/}
                                                           {/*                fontSize: "10px",*/}
                                                           {/*                color: "#B2B2B2",*/}
                                                           {/*            }),*/}
                                                           {/*        },*/}
                                                           {/*    }}*/}
                                                           {/*>*/}
                                                           {/*    ?*/}
                                                           {/*</Button>*/}
                                                           <Block position="relative" width="39px" height="39px" marginBottom="27px">
                                                               <Image src={"images/icon/wall-" + option.toLowerCase() + ".png"} layout="fill" objectFit="contain" quality={100}/>
                                                           </Block>
                                                           <div>{option.toLowerCase() === "rollup" ? "Roll-up" : option}</div>
                                                       </Block>
                                                   ),
                                               }}
                                        />
                                    ))) : null}
                            </RadioGroup>
                            <div style={{marginBottom: 20}}/>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center", width: "100%", marginBottom: "64px"}}>
                            <div style={{fontSize: 16, fontWeight: "500", marginBottom: 16}}>Color</div>
                            <RadioGroup name="color" value={wallPlainAttributeListTemp[activeWall] ? wallPlainAttributeListTemp[activeWall][2].option.toLowerCase() : "white"} align={ALIGN.horizontal}
                                        onChange={(event) => handleChangeWallRadioTemp(event, activeWall, id_attribute_canopyColor)}
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
                                {productComponent && productComponent[1] ? productComponent[1].attributes.filter((attribute) => attribute.id === id_attribute_canopyColor && attribute.variation).map(({options}) =>
                                    options.map((option, index) => (
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
                                    ))) : null}
                            </RadioGroup>
                        </div>
                    </Block>
                </Block>
            </Modal>
            <Modal type="dialog" isOpen={summaryIsOpen} onClose={() => closeSummaryModal()}>
                <Block width={["100%", "448px", "702px"]} marginTop={["62px", "62px", "32px"]} marginRight={"auto"} marginBottom="32px" marginLeft={"auto"}
                       paddingRight={["0px", "0px", "56px"]} paddingBottom={["62px", "62px", "0px"]} paddingLeft={["0px", "0px", "56px"]}
                >
                    <Block display={"flex"} flexDirection={"column"} height={["520px", "520px", "368px"]} marginBottom={["16px", "16px", "32px"]} backgroundColor={"white"} overflow="hidden"
                           className={"modalSelectionContainer-summary-data"}
                    >
                        <DataTable/>
                    </Block>
                    <Block height={"auto"} display="grid" gridTemplateColumns={["1fr", "1fr", "repeat(2,1fr)"]} gridColumnGap="16px" gridRowGap="16px" marginLeft={"auto"} marginRight={"auto"}>
                        <Block display="flex" flexDirection="row">
                            <img src={"/images/icon/delivery.png"} style={{width: 20, height: 20, marginRight: 12}} alt={"free shipping"}/>
                            <Block font="MinXParagraph14">
                                <Block>Free shipping on orders over $149</Block>
                                <Block>Order today, shipped by Friday.</Block>
                                <Block marginTop="4px" font="MinXParagraph12" color="MinXSecondaryText">Custom printing orders do not apply.</Block>
                            </Block>
                        </Block>
                        <Block display="flex" flexDirection="row">
                            <img src={"/images/icon/pickup.png"} style={{width: 20, height: 20, marginRight: 12}} alt={"pick up"}/>
                            <Block font="MinXParagraph14">
                                Pick up in <span style={{color: "rgb(35, 164, 173)"}}>warehouse</span>
                            </Block>
                        </Block>
                    </Block>
                </Block>
            </Modal>
        </React.Fragment>
    );
}

Canopy_Tent.getInitialProps = async (context) => {
    const {query} = context;
    const ids = [26338, 26385, 26405, 26516];
    let products = null,
        variants = [];

    // product = await utils.getProductByWooId(id);
    // if (product.type === "composite") {
    products = await Promise.all(ids.map((id) => utils.getProductByWooId(id)));
    variants = await Promise.all(ids.map((id) => utils.getVariantByWooProductId(id)));
    // }

    return {
        products: products,
        variants: variants,
        noFooter: true,
    };
}
;

export default withRouter(Canopy_Tent);
