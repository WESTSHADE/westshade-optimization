import React, {useEffect, useState, createRef} from "react";
import {useDispatch, useSelector} from 'react-redux'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {SketchPicker, SwatchesPicker} from "react-color";
import NumberFormat from "react-number-format";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import clsx from "clsx";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {withRouter} from "next/router";

import {useStyletron} from "baseui";
import {Block} from "baseui/block";
import {Tabs, Tab, FILL} from "baseui/tabs-motion";
import {Button, KIND, SHAPE} from "baseui/button";
import {RadioGroup, Radio, ALIGN} from "baseui/radio";
import {ListItem, ListItemLabel} from "baseui/list";
import {Search, Delete, ChevronLeft, ChevronRight, Upload} from "baseui/icon";
import {Input} from "baseui/input";
import {Textarea} from "baseui/textarea";
import {StatefulTooltip, PLACEMENT, TRIGGER_TYPE} from "baseui/tooltip";
import {StatefulDataTable, BooleanColumn, CategoricalColumn, CustomColumn, NumericalColumn, StringColumn, COLUMNS, NUMERICAL_FORMATS} from "baseui/data-table";
import {Table} from "baseui/table-semantic";
import {TableBuilder, TableBuilderColumn} from "baseui/table-semantic";
import {Accordion, Panel} from "baseui/accordion";

import {NumberFn, StringFn, UrlFn} from "../../utils/tools";
import Utils from "../../utils/utils";
import {EventEmitter} from "../../utils/events";

import {Checkout_N as Checkout} from "../../components/sections";
import {Modal} from "../../components/surfaces";
import MButton from "../../components/button-n";
import SelectionArea from "../../components/selection_area";
import Selection from "../../components/selection-n";
import CardTabs from "../../components/card_tabs";

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

const feature_1 = [{
    tabTitle: "Water Resistant",
    tabContent: "Our waterproof pop tents are designed to offer the ideal coverage and protection needed for all your events. It is easy to clean, maintain and is also mold resistant for longer durability, making it ideal for all weather conditions.",
    url: "images/product/canopy-tent/feature-fabric.jpg",
}, {
    tabTitle: "Fire Retardant",
    tabContent: "Our canopies are certified under the California State Fire Marshal. Each fire retardant canopy is specially treated and complies with all NFPA 701 and CPAI-84.",
    url: "images/product/canopy-tent/feature-fire.png",
}, {
    tabTitle: "UV Protection",
    tabContent: "Westshade canopies provide up to 98% UV block,  the optimal UV protection for people and pets. Our unique polyester fabric allows warm air to escape, keeping you cool on hot and sunny days.",
    url: "images/product/canopy-tent/feature-uv.jpg",
}]

const feature_2 = [{
    tabTitle: "Steel",
    tabContent: "We carry steel frames for our Y5 canopies. Steel framed canopies are heavier and typically used for patio, garden, or the deck.",
    url: "images/product/canopy-tent/feature-steel.png",
}, {
    tabTitle: "Aluminum",
    tabContent: "Our Aluminum frames (Y6, Y7) are lightweight and are used for a variety of occasions such as business events, job fairs, and exhibitions.",
    url: "images/product/canopy-tent/feature-aluminum.png",
}]

const anatomyPart = [
    {url: "/top-corner-connector.png", title: "TOP CORNER CONNECTOR", content: "The top corner connectors help connect together the canopy to provide stability and durability."},
    {url: "/truss-bar.png", title: "TRUSS BAR", content: "Truss bar is the middle connector between the leg pole and helps stabilize the canopy."},
    {url: "/leg-height-connector.png", title: "HEIGHT ADJUST CONNECTOR", content: "Adjust the shade as needed throughout the day with leg height adjustments."},
    {
        url: "/foot-plate.png",
        title: "FOOT PLATE",
        content: "Footplates are heavy weights that rest on the feet of the pop up tent legs to offer additional anchoring in conjunction with staking kits or they can operate alone when stakes are not necessary."
    },
    {url: "/leg-pole.png", title: "LEG POLE", content: "Our leg poles are stable and are going to provide the most coverage without taking up too much space."},
];

function Canopy_Tent({router, products, variants}) {
    const [displayTabs, setDisplayTabs] = useState(false);
    const [tabSelectionActiveKey, setTabSelectionActiveKey] = useState(0);

    const [tabPictureActiveKey, setTabPictureActiveKey] = useState(0);


    const [productComponent, setProductComponent] = useState([products[2], products[3], products[3], products[3], products[3]]);
    const [productVariant, setProductVariant] = useState([variants[2], variants[3], variants[3], variants[3], variants[3]]);

    const [selectedFrame, setSelectedFrame] = useState("y7");
    const [selectedSize, setSelectedSize] = useState("10x10");

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
    const [value3, setValue3] = useState("1");

    const [displayIntro, setDisplayIntro] = useState(false);
    const [frameIntroIsModal, setFrameIntroIsModal] = useState(false);
    const [frameIntroPosition, setFrameIntroPosition] = useState(0);

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
            product_name = "y7-heavy-duty-canopy-tent";
            series = "Y7";
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

        addToCart(productComponent, selectedVariant, totalCount);
    };

    //////////////////////////////////////

    useEffect(() => {
        setTabsRefs((tabsRefs) => Array(3).fill(null).map((_, i) => tabsRefs[i] || createRef()));

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

        viewItem({id: 30477, name: "Canopy Tent", categories: [{name: "Canopy Tents"}]});
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
            defaultAttr.forEach((attr, indexB) => {
                if (attr.id === id_attribute_wallType && component.id === id_product_wall) {
                    attr.option = "none";
                } else if (attr.id === id_attribute_canopySize) {
                    let size = router.query.size || urlFn.getParam("size");

                    if (size) attr.option = size;
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
                            {priceSale === 0 ? <div style={{color: "#E4458C", marginRight: 10}}>Free</div> :
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
            <Block height="auto" display={"flex"} justifyContent={"center"} overflow={["scroll", "scroll", "hidden"]} marginBottom="40px">
                <Block width={["100%", "480px", "100%"]} display={"flex"} flexDirection={["column", "column", "row"]} paddingBottom="40px">
                    {/* 图片区域 */}
                    <Block flex={[0, 0, 1]} position={["unset", "unset", "relative"]} paddingTop={["0", "24px", "48px"]} paddingRight={["16px", "16px", "0"]} paddingLeft={["16px", "16px", "24px"]}>
                        <Tabs activeKey={tabPictureActiveKey} fill={FILL.intrinsic} activateOnFocus onChange={({activeKey}) => setTabPictureActiveKey(parseInt(activeKey))}
                              overrides={{
                                  Root: {
                                      style: {width: "100%", display: "flex", flexDirection: "column-reverse"},
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
                                  TabBorder: {props: {hidden: true}},
                                  TabHighlight: {props: {hidden: true}},
                              }}
                        >
                            <Tab title="Photo"
                                 overrides={{
                                     TabPanel: {
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
                            }}/>
                            <Tab title="3D" overrides={{
                                TabPanel: {
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
                            }}/>
                        </Tabs>
                    </Block>
                    {/* 选择区域 */}
                    <Block width={["auto", "auto", "413px"]} display={"flex"} flexDirection={"column"} alignItems={"center"} overflow={["unset", "unset", "scroll"]}
                           paddingTop={"24px"} paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "0"]}
                           overrides={{
                               Block: {
                                   props: {
                                       className: "hideScrollBar"
                                   },
                               },
                           }}
                    >
                        <Block marginBottom="16px" font="MinXHeading20">Canopy Tent</Block>
                        <Block marginTop="4px" marginBottom="24px" font="MinXLabel14" color="MinXButton">
                            <Link color="inherit" href={"/canopy-tent/spec"}>Spec</Link>
                        </Block>
                        {displayTabs ? (
                            <Tabs activeKey={tabSelectionActiveKey} fill={FILL.fixed} activateOnFocus onChange={({activeKey}) => setTabSelectionActiveKey(parseInt(activeKey))}
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
                                      TabBorder: {props: {hidden: true}},
                                      TabHighlight: {
                                          props: {
                                              className: "tab-highlight-horizon"
                                          },
                                          style: {left: tabsRefs[tabSelectionActiveKey].current ? `${(tabsRefs[tabSelectionActiveKey].current.clientWidth - 24) / 2}px` : 0},
                                      },
                                  }}
                            >
                                <Tab title="Basic" tabRef={tabsRefs[0]}
                                     overrides={{
                                         TabPanel: {
                                             style: {paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0},
                                         },
                                         Tab: {
                                             style: {":hover": {background: "none"}, paddingTop: "8px", paddingBottom: "8px"},
                                         },
                                     }}
                                >
                                    <>
                                        <SelectionArea title="Size">
                                            <Selection name="size" value={selectedAttribute[0] ? selectedAttribute[0][0].option.toLowerCase() : ""} onChange={(event) => handleChangeRadio(event, 0, id_attribute_canopySize)}>
                                                {productComponent && productComponent[0] ? productComponent[0].attributes.filter((attribute) => attribute.id === id_attribute_canopySize && attribute.variation).map(({options}) => options.map((option, index) => (
                                                    <Radio key={index} value={option.toLowerCase()}>{option}</Radio>
                                                ))) : null}
                                            </Selection>
                                            <MButton type="solid" height="auto" marginRight="auto" marginLeft="auto" font="MinXParagraph16" text='Size Guide' color="MinXPrimaryText"
                                                     buttonStyle={{backgroundColor: "#F2F2F2 !important", paddingTop: "4px !important", paddingRight: "24px !important", paddingBottom: "4px !important", paddingLeft: "24px !important"}}
                                                     onClick={() => setSizeGuideOpen(true)}
                                            />
                                        </SelectionArea>
                                        <SelectionArea title="Frame">
                                            <Selection name="frame" value={selectedFrame} id={id_attribute_frameSeries}
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
                                            >
                                                <Radio value="y7">Y7 Heavy Duty Aluminum</Radio>
                                                <Radio value="y6">Y6 Commercial Aluminum</Radio>
                                                <Radio value="y5">Y5 Economic Steel</Radio>
                                            </Selection>
                                            <MButton type="solid" height="auto" marginRight="auto" marginLeft="auto" font="MinXParagraph16" text='Compare Frames' color="MinXPrimaryText"
                                                     buttonStyle={{backgroundColor: "#F2F2F2 !important", paddingTop: "4px !important", paddingRight: "24px !important", paddingBottom: "4px !important", paddingLeft: "24px !important"}}
                                                     onClick={() => setFrameCompareOpen(true)}
                                            />
                                        </SelectionArea>
                                        <SelectionArea title="Color">
                                            <Selection name="color" value={selectedAttribute[0] ? selectedAttribute[0][1].option.toLowerCase() : ""} id={id_attribute_canopyColor}
                                                       onChange={(event) => handleChangeRadio(event, 0, id_attribute_canopyColor)}
                                            >
                                                {productComponent && productComponent[0] ? productComponent[0].attributes.filter((attribute) => attribute.id === id_attribute_canopyColor && attribute.variation).map(({options}) => options.map((option, index) => (
                                                            <Radio key={index} value={option.toLowerCase()}
                                                                   overrides={{
                                                                       Label: ({$value}) => (
                                                                           <div className="radio-dot"
                                                                                style={{backgroundColor: $value === "yellow" ? "#F4C84E" : $value === "green" ? "#275D3D" : $value === "blue" ? "#1A4A8B" : $value === "red" ? "#991F34" : $value}}
                                                                           />
                                                                       ),
                                                                   }}
                                                            />
                                                        ))
                                                    )
                                                    : null}
                                            </Selection>
                                        </SelectionArea>
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
                                    <ul className={css({paddingLeft: 0, paddingRight: 0,})}>
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
                                                                  style: {paddingRight: 0, paddingLeft: "12px", borderBottomWidth: 0},
                                                              },
                                                              ArtworkContainer: {
                                                                  style: {width: "44px", height: "44px"},
                                                              },
                                                          }}
                                                          endEnhancer={() => {
                                                              return (
                                                                  <>
                                                                      {component[0].option !== "none" ? (
                                                                          <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                                                              <Button shape={SHAPE.pill}
                                                                                      overrides={{
                                                                                          BaseButton: {props: {className: "button-edit"}},
                                                                                      }}
                                                                                      onClick={() => openWallModal(index)}
                                                                              >
                                                                                  Edit
                                                                              </Button>
                                                                              <Button kind={KIND.tertiary} shape={SHAPE.circle}
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
            <Block position="relative" backgroundColor="#F7F7F7" paddingTop={["36px", "42px", "54px"]} paddingBottom={["36px", "42px", "54px"]}>
                <Block marginBottom={["24px", "36px", "38px"]} font="MinXHeading28" overrides={{Block: {style: {fontWeight: 400, textAlign: "center"}}}}>The anatomy of frame</Block>
                {selectedFrame === "y5" ? (
                    <Block position="relative" width={["282px", "440px", "566px"]} height={["282px", "440px", "566px"]} marginRight="auto" marginLeft="auto">
                        <Image src="images/product/canopy-tent/anatomy-y5.png" alt="anatomy y5 frame" objectFit="contain" layout="fill"/>
                        <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["10px", "20px", "22px"]} left={["4px", "9px", "9px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                               onClick={() => {
                                   setDisplayIntro(true);
                                   setFrameIntroIsModal(true);
                                   setFrameIntroPosition(0);
                               }}
                        />
                        <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["56px", "85px", "110px"]} right={["2px", "10px", "8px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                               onClick={() => {
                                   setDisplayIntro(true);
                                   setFrameIntroIsModal(true);
                                   setFrameIntroPosition(1);
                               }}
                        />
                        <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} bottom={["100px", "165px", "210px"]} left={["4px", "6px", "8px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                               onClick={() => {
                                   setDisplayIntro(true);
                                   setFrameIntroIsModal(true);
                                   setFrameIntroPosition(2);
                               }}
                        />
                        <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} bottom={["114px", "178px", "220px"]} right={["10px", "12px", "18px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                               onClick={() => {
                                   setDisplayIntro(true);
                                   setFrameIntroIsModal(true);
                                   setFrameIntroPosition(3);
                               }}
                        />
                        <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} bottom={["54px", "90px", "100px"]} right={["62px", "98px", "125px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                               onClick={() => {
                                   setDisplayIntro(true);
                                   setFrameIntroIsModal(true);
                                   setFrameIntroPosition(4);
                               }}
                        />
                    </Block>
                ) : (selectedFrame === "y6") ? (
                    <Block position="relative" width={["282px", "440px", "566px"]} height={["282px", "440px", "566px"]} marginRight="auto" marginLeft="auto">
                        <Image src="images/product/canopy-tent/anatomy-y6.png" alt="anatomy y6 frame" objectFit="contain" layout="fill"/>
                        <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["52px", "88px", "108px"]} left={["2px", "2px", "2px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                               onClick={() => {
                                   setDisplayIntro(true);
                                   setFrameIntroIsModal(true);
                                   setFrameIntroPosition(0);
                               }}
                        />
                        <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["66px", "110px", "140px"]} right={["4px", "10px", "12px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                               onClick={() => {
                                   setDisplayIntro(true);
                                   setFrameIntroIsModal(true);
                                   setFrameIntroPosition(1);
                               }}
                        />
                        <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} bottom={["110px", "165px", "210px"]} left={["14px", "22px", "26px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                               onClick={() => {
                                   setDisplayIntro(true);
                                   setFrameIntroIsModal(true);
                                   setFrameIntroPosition(2);
                               }}
                        />
                        <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} bottom={["140px", "214px", "272px"]} right={["10px", "18px", "18px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                               onClick={() => {
                                   setDisplayIntro(true);
                                   setFrameIntroIsModal(true);
                                   setFrameIntroPosition(3);
                               }}
                        />
                        <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} bottom={["58px", "100px", "120px"]} right={["108px", "164px", "205px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                               onClick={() => {
                                   setDisplayIntro(true);
                                   setFrameIntroIsModal(true);
                                   setFrameIntroPosition(4);
                               }}
                        />
                    </Block>
                ) : (selectedFrame === "y7") ? (
                    <Block position="relative" width={["282px", "440px", "566px"]} height={["282px", "440px", "566px"]} marginRight="auto" marginLeft="auto">
                        <Image src={"images/product/canopy-tent/anatomy-" + selectedFrame + ".png"} alt={"anatomy " + selectedFrame + " frame"} objectFit="contain" layout="fill"/>
                        <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["36px", "60px", "76px"]} left={["4px", "4px", "6px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                               onClick={() => {
                                   setDisplayIntro(true);
                                   setFrameIntroIsModal(true);
                                   setFrameIntroPosition(0);
                               }}
                        />
                        <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["66px", "110px", "136px"]} right={["4px", "10px", "12px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                               onClick={() => {
                                   setDisplayIntro(true);
                                   setFrameIntroIsModal(true);
                                   setFrameIntroPosition(1);
                               }}
                        />
                        <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} bottom={["104px", "156px", "190px"]} left={["12px", "20px", "22px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                               onClick={() => {
                                   setDisplayIntro(true);
                                   setFrameIntroIsModal(true);
                                   setFrameIntroPosition(2);
                               }}
                        />
                        <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} bottom={["130px", "206px", "248px"]} right={["6px", "14px", "18px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                               onClick={() => {
                                   setDisplayIntro(true);
                                   setFrameIntroIsModal(true);
                                   setFrameIntroPosition(3);
                               }}
                        />
                        <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} bottom={["62px", "88px", "120px"]} right={["86px", "138px", "175px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                               onClick={() => {
                                   setDisplayIntro(true);
                                   setFrameIntroIsModal(true);
                                   setFrameIntroPosition(4);
                               }}
                        />
                    </Block>
                ) : null}
                <Block position="absolute" top={0} right={0} bottom={0} left={0} alignItems="center" justifyContent="center" flexDirection="column"
                       overrides={{
                           Block: {
                               props: {
                                   className: clsx(displayIntro ? "displayFlex" : "displayNone", frameIntroIsModal ? "frame-intro-background-in" : "frame-intro-background-out")
                               },
                               style: {textAlign: "center", transition: "opacity 800ms ease-in-out"}
                           },
                       }}
                >
                    <Block display="grid" gridTemplateColumns="1fr" gridRowGap="16px" justifyItems="center" marginBottom="32px">
                        <Block position="relative" width={["150px", "200px", "250px"]} height={["150px", "200px", "250px"]}
                               overrides={{
                                   Block: {
                                       props: {
                                           className: "frame-intro"
                                       }
                                   },
                               }}
                        >
                            <Image src={"images/product/canopy-tent/" + selectedFrame + anatomyPart[frameIntroPosition].url} alt="anatomy frame part" objectFit="contain" layout="fill"/>
                        </Block>
                        <Block font="MinXParagraph20" color="MinXPrimaryText">{anatomyPart[frameIntroPosition].title}</Block>
                        <Block maxWidth="250px" font="MinXParagraph16" color="MinXSecondaryText">{anatomyPart[frameIntroPosition].content}</Block>
                    </Block>
                    <Button kind={KIND.secondary} shape={SHAPE.circle} onClick={() => {
                        setFrameIntroIsModal(false);
                        setTimeout(() => setDisplayIntro(false), 800);
                    }}
                            overrides={{
                                BaseButton: {
                                    style: {backgroundColor: "rgba(0, 0, 0, 0.3)"}
                                }
                            }}
                    >
                        <Delete size={24} color={"white"}/>
                    </Button>
                </Block>
            </Block>
            <Block paddingTop={["36px", "42px", "54px"]} paddingRight={["16px", "16px", "24px"]} paddingBottom={["36px", "42px", "54px"]} paddingLeft={["16px", "16px", "24px"]}>
                <Block marginBottom={["24px", "36px", "64px"]} font="MinXHeading28" overrides={{Block: {style: {fontWeight: 400, textAlign: "center"}}}}>Features</Block>
                <Block display="grid" gridTemplateColumns="1fr" gridRowGap="24px">
                    <CardTabs title="Roof Top" tabList={feature_1} containerImageProps={{backgroundColor: "#F5FCFC"}}/>
                    <CardTabs title="Frame" tabList={feature_2} objectFit="contain" containerImageProps={{backgroundColor: "#F5FCFC"}} reverse/>
                </Block>
            </Block>
            <Block paddingTop={["36px", "42px", "54px"]} paddingRight={["16px", "16px", "24px"]} paddingBottom={["36px", "42px", "54px"]} paddingLeft={["16px", "16px", "24px"]}>
                <Block marginBottom={["24px", "36px", "64px"]} font="MinXHeading28" overrides={{Block: {style: {fontWeight: 400, textAlign: "center"}}}}>Versatile Tent</Block>
                <Block width="100%" maxWidth="1152px" marginRight="auto" marginLeft="auto" display="grid" gridTemplateColumns="1fr" gridRowGap={["16px", "24px", "20px"]}>
                    <Block display="grid" gridTemplateColumns={["1fr", "1fr", "repeat(3, 1fr)"]} gridTemplateRows={["repeat(3, 220px)", "repeat(3, 286px)", "286px"]} gridRowGap={["16px", "24px", "20px"]} gridColumnGap="20px">
                        <Block position="relative" width="100%" height="100%" overflow="hidden" overrides={{Block: {style: {borderRadius: "8px"}}}}>
                            <Image src="images/product/canopy-tent/Versatile_tent_1.jpg" alt="Versatile tent" layout="fill" objectFit={"cover"}/>
                            <Block position="absolute" bottom={"24px"} left={["24px", "24px", "32px"]} font="MinXLabel16" color="white">Shade in the backyard</Block>
                        </Block>
                        <Block position="relative" width="100%" height="100%" overflow="hidden" overrides={{Block: {style: {borderRadius: "8px"}}}}>
                            <Image src="images/product/canopy-tent/Versatile_tent_2.jpg" alt="Versatile tent" layout="fill" objectFit={"cover"}/>
                            <Block position="absolute" bottom={"24px"} left={["24px", "24px", "32px"]} font="MinXLabel16" color="white">Parking canopy</Block>
                        </Block>
                        <Block position="relative" width="100%" height="100%" overflow="hidden" overrides={{Block: {style: {borderRadius: "8px"}}}}>
                            <Image src="images/product/canopy-tent/Versatile_tent_3.jpg" alt="Versatile tent" layout="fill" objectFit={"cover"}/>
                            <Block position="absolute" bottom={"24px"} left={["24px", "24px", "32px"]} font="MinXLabel16" color="white">Outdoor picnic</Block>
                        </Block>
                    </Block>
                    <Block display="grid" gridTemplateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gridTemplateRows={["repeat(2, 220px)", "repeat(2, 286px)", "286px"]} gridRowGap={["16px", "24px", "20px"]} gridColumnGap="20px">
                        <Block position="relative" width="100%" height="100%" overflow="hidden" overrides={{Block: {style: {borderRadius: "8px"}}}}>
                            <Image src="images/product/canopy-tent/Versatile_tent_4.jpg" alt="Versatile tent" layout="fill" objectFit={"cover"}/>
                            <Block position="absolute" bottom={"24px"} left={["24px", "24px", "32px"]} font="MinXLabel16" color="white">Outdoor dining</Block>
                        </Block>
                        <Block position="relative" width="100%" height="100%" overflow="hidden" overrides={{Block: {style: {borderRadius: "8px"}}}}>
                            <Image src="images/product/canopy-tent/Versatile_tent_5.jpg" alt="Versatile tent" layout="fill" objectFit={"cover"}/>
                            <Block position="absolute" bottom={"24px"} left={["24px", "24px", "32px"]} font="MinXLabel16" color="white">Mobile store</Block>
                        </Block>
                    </Block>
                </Block>
            </Block>
            <Block paddingTop={["36px", "42px", "54px"]} paddingRight={["16px", "16px", "24px"]} paddingBottom={["36px", "42px", "54px"]} paddingLeft={["16px", "16px", "24px"]}>
                <Block marginBottom={["24px", "36px", "64px"]} font="MinXHeading28" overrides={{Block: {style: {fontWeight: 400, textAlign: "center"}}}}>Let’s answer your questions</Block>
                <Block width="100%" maxWidth="660px" marginRight="auto" marginLeft="auto" font="MinXHeading14" color="MinXPrimaryText">
                    <Accordion overrides={{
                        Root: {
                            style: {
                                borderBottomColor: "#F0F0F0"
                            }
                        },
                        Header: {
                            props: {
                                className: "accordion-header"
                            },
                            style: {
                                minHeight: "48px",
                                paddingTop: "12px", paddingRight: "0px", paddingBottom: "12px", paddingLeft: "0px",
                                fontSize: "inherit", fontWeight: "inherit", fontFamily: "inherit", color: "inherit"
                            }
                        },
                        Content: {
                            style: {
                                paddingTop: "12px", paddingRight: "0px", paddingBottom: "12px", paddingLeft: "0px",
                                fontSize: "inherit", fontWeight: "400", fontFamily: "inherit", color: "inherit",
                                backgroundColor: "translate"
                            }
                        },
                    }}>
                        <Panel title="Do your canopies set up in seconds?">
                            They sure do! Our canopies can be set up in less than 60 seconds with just two people.
                        </Panel>
                        <Panel title="Do you have a video showing proper setup and take down?">
                            Yes! Check out this one minute video <Link href="https://www.youtube.com/watch?v=J9ygFXvOVn4">https://www.youtube.com/watch?v=J9ygFXvOVn4</Link>
                        </Panel>
                        <Panel title="Can my canopy withstand wind and at what point are weight bags or steel stakes required?">
                            We recommend using weight bags or steel stakes in all types of weather environments. White stakes are ideal to keep your canopy secure during all outdoor activities, our professional weight bags hold up to 30lbs
                            of sand, or anything similar material, and easily attach to your shelter for additional stability.
                        </Panel>
                        <Panel title="Can I use my canopy anywhere?">
                            Yes, our canopies stand securely on grass, dirt, or pavement without ropes and poles. In windy conditions, however, we recommend using our weight bags to anchor and prevent your canopy from tipping over.
                        </Panel>
                        <Panel title="I bought a canopy from another company,  will your replacement fit my current frame?">
                            Our tops are designed to fit Westshade brand frames. We do not recommend using our frame or top with another company's product.
                        </Panel>
                    </Accordion>
                </Block>
            </Block>
            <Checkout quantity={totalCount} isInStock={isInStock} buttonText={isInStock ? "Add to Bag" : "Out of Stock"} isAvailable={availableToCheckout}
                      onClick={() => openSummaryModal()}
                      onClickMinus={() => totalCount !== 1 && setTotalCount(totalCount - 1)}
                      onClickPlus={() => setTotalCount(totalCount + 1)}
                      onClickAddToBag={() => updateCart()}
                      onSale={totalRegularPrice !== totalRegularPrice} totalPrice={totalRegularPrice} totalSalesPrice={totalSalePrice}
            />
            <Modal type="alertdialog" isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} content="size"/>
            <Modal type="alertdialog" isOpen={frameCompareOpen} onClose={() => setFrameCompareOpen(false)} content="frame"/>
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
                                       <div style={{width: 20, height: 20, border: "2px solid black", borderRadius: "50%", textAlign: "center", fontSize: 12, fontWeight: "bold", lineHeight: "17px", marginRight: 2, marginLeft: 2,}}>
                                           !
                                       </div>
                                   </StatefulTooltip>
                               </Block>
                           </Block>
                           <Block display="flex" flexDirection="row">
                               <Block minWidth={["85px"]} height={"40px"} marginRight={"24px"}>
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
                                           onClick={() => closeWallModal()}
                                   >
                                       Cancel
                                   </Button>
                               </Block>
                               <Block minWidth={["85px"]} height={"40px"}>
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
                <Block width={["100%", "440px", "100%"]} display={"flex"} flexDirection={["column", "column", "row"]} marginLeft={"auto"} marginRight={"auto"}>
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
                        <SelectionArea title="Wall Type">
                            <Selection name="wall-type" value={wallPlainAttributeListTemp[activeWall] ? wallPlainAttributeListTemp[activeWall][0].option.toLowerCase() : "none"} id={id_attribute_wallType}
                                       onChange={(event) => handleChangeWallRadioTemp(event, activeWall, id_attribute_wallType)}
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
                            </Selection>
                        </SelectionArea>
                        <SelectionArea title="Color">
                            <Selection name="wall-color" value={wallPlainAttributeListTemp[activeWall] ? wallPlainAttributeListTemp[activeWall][2].option.toLowerCase() : "white"} id={id_attribute_canopyColor}
                                       onChange={(event) => handleChangeWallRadioTemp(event, activeWall, id_attribute_canopyColor)}
                            >
                                {productComponent && productComponent[1] ? productComponent[1].attributes.filter((attribute) => attribute.id === id_attribute_canopyColor && attribute.variation).map(({options}) =>
                                    options.map((option, index) => (
                                        <Radio key={index} value={option.toLowerCase()}
                                               overrides={{
                                                   Label: ({$value}) => (
                                                       <div className="radio-dot"
                                                            style={{backgroundColor: $value === "yellow" ? "#F4C84E" : $value === "green" ? "#275D3D" : $value === "blue" ? "#1A4A8B" : $value === "red" ? "#991F34" : $value}}
                                                       />
                                                   ),
                                               }}
                                        />
                                    ))) : null}
                            </Selection>
                        </SelectionArea>
                    </Block>
                </Block>
            </Modal>
            <Modal type="dialog" isOpen={summaryIsOpen} onClose={() => closeSummaryModal()} content="summary" dataTable={<DataTable/>}/>
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
    };
};

export default withRouter(Canopy_Tent);
