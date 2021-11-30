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

import {Block} from "baseui/block";
import {Tabs, Tab, FILL} from "baseui/tabs-motion";
import {Button, KIND, SHAPE} from "baseui/button";
import {RadioGroup, Radio, ALIGN} from "baseui/radio";
import {ListItem, ListItemLabel} from "baseui/list";
import {Search, Delete, ChevronDown, Upload, ChevronLeft, ChevronRight} from "baseui/icon";
import {Input} from "baseui/input";
import {StatefulTextarea, Textarea} from "baseui/textarea";
import {StatefulTooltip, PLACEMENT, TRIGGER_TYPE} from "baseui/tooltip";
import {StatefulDataTable, BooleanColumn, CategoricalColumn, CustomColumn, NumericalColumn, StringColumn, COLUMNS, NUMERICAL_FORMATS} from "baseui/data-table";
import {Table} from "baseui/table-semantic";
import {TableBuilder, TableBuilderColumn} from "baseui/table-semantic";
import {FileUploader} from "baseui/file-uploader";
import {Checkbox, LABEL_PLACEMENT} from "baseui/checkbox";

import {NumberFn, StringFn, UrlFn} from "../../utils/tools";
import Utils from "../../utils/utils";
import {EventEmitter} from "../../utils/events";

import {Checkout_N as Checkout} from "../../components/sections";
import {Modal} from "../../components/surfaces";
import MButton from "../../components/button-n";
import SelectionArea from "../../components/selection_area";
import Selection from "../../components/selection-n";
import CustomPrintingRoof from "../../components/custom_printing_roof";

import {updateUser} from "../../redux/actions/userActions";
import {modifyCart} from "../../redux/actions/cartActions";

import styles from "../cart/cart.module.scss";

const numberFn = new NumberFn();
const stringFn = new StringFn();
const utils = new Utils();
const urlFn = new UrlFn();

const id_product_roof = 31855;
const id_product_roof_printed = 59164;
const id_product_wall = 26516;
const id_product_printed_wall = 30506;
const id_product_canopy_frame = 58944;
const id_product_custom_printed_roof = 59880;

const id_attribute_canopyColor = 3;
const id_attribute_canopySize = 4;
const id_attribute_wallType = 11;
const id_attribute_wallSize = 14;
const id_attribute_wallPrintedType = 16;
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
let selectedFrame = "y7 heavy duty", selectedSize = "10x10", selectedColor = "white";

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function arrayEquals(a, b) {
    if (a.length < b.length) {
        return Array.isArray(a) && Array.isArray(b) && a.every((val, index) => val.id === b[index].id && val.option.toLowerCase() === b[index].option.toLowerCase());
    } else {
        return Array.isArray(a) && Array.isArray(b) && b.every((val, index) => val.id === a[index].id && val.option.toLowerCase() === a[index].option.toLowerCase());
    }
}

function Custom_Printed_Canopy_Tent({router, product, productComponent = [], productVariant = []}) {
    const [displayTabs, setDisplayTabs] = useState(false);
    const [tabActiveKey, setTabActiveKey] = React.useState(0);

    const [selectedAttribute, setSelectedAttribute] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState([]);

    const [initSelectedAttribute, setInitSelectedAttribute] = useState(false);

    const [totalRegularPrice, setTotalRegularPrice] = useState(0);
    const [totalSalePrice, setTotalSalePrice] = useState(0);
    const [totalCount, setTotalCount] = useState(1);

    const [message, setMessage] = useState("");

    const [isInStock, setIsInStock] = useState(true);
    const [availableToCheckout, setAvailable] = useState(false);

    const [addCustomPrinted, setAddCustomPrinted] = useState(false);

    ////////////////////////////////////////

    const [productImageGallery, setProductImageGallery] = useState([]);
    const [productImageGalleryTemp, setProductImageGalleryTemp] = useState([]);

    const [activeWall, setActiveWall] = useState(0);
    const [wallAttributeList, setWallAttributeList] = useState([]);
    const [wallAttributeListTemp, setWallAttributeListTemp] = useState([]);

    const [wallColors, setWallColors] = useState(["white", "white", "white", "white"]);
    const [wallPictures, setWallPictures] = useState(["", "", "", ""]);
    const [wallPicturesTemp, setWallPicturesTemp] = useState(["", "", "", ""]);

    const [tabPictureActiveKey, setTabPictureActiveKey] = useState(0);

    const [tabsRefs, setTabsRefs] = useState([]);

    ////////////////////////////////////////

    const [availableList, setAvailableList] = useState([
        {id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true},
        {id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true},
        // {id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true},
        // {id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true},
        // {id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true},
        // {id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true},
    ]);

    ////////////////////////////////////////
    const [roofColorSelectedList, setRoofColorSelectedList] = useState([{peak: {}, valance: {}}, {peak: {}, valance: {}}, {peak: {}, valance: {}}, {peak: {}, valance: {}}]);
    const [applyToFullSide, setApplyToFullSide] = useState([false, false]);

    const [wallIsOpen, setWallIsOpen] = useState(false);
    const [printIsOpen, setPrintIsOpen] = useState(false);
    const [summaryIsOpen, setSummaryIsOpen] = useState(false);

    const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
    const [frameCompareOpen, setFrameCompareOpen] = useState(false);
    const [technologyCompareOpen, setTechnologyCompareOpen] = useState(false);

    ////////////////////////////////////////

    const [entryId, setEntryId] = useState(null);

    const dispatch = useDispatch();

    const {loggedIn, token, user} = useSelector(({user}) => user);
    const {cart} = useSelector(({cart}) => cart);

    function renderCustomImage(props, wallPics = []) {
        return (
            <>
                <img className="image-gallery-image" src={props.original} alt={props.originalAlt}/>
                {wallPics.map((pic, index) => {
                    if (!pic) return;
                    return <img key={index} className="image-gallery-image-wall" style={{zIndex: index === 0 ? 1 : index === 1 ? 3 : index === 2 ? 4 : index === 3 ? 2 : 1}} src={pic} alt="side-wall"/>;
                })}
            </>
        );
    }

    const handleSendCustomPrinting = async (request) => {
        let result = await utils.contact({
            form_id: "3",
            status: "active",
            1: "Custom Printing canopy tent request",
            5: (request[2].peak.backgroundColor ? "Peak: " + request[2].peak.backgroundColor + "; " : "") + (request[2].valance.backgroundColor ? "Valance: " + request[2].valance.backgroundColor + ";" : ""),
            6: (request[2].peak.content ? "Peak: " + request[2].peak.content + "; " : "") + (request[2].valance.content ? "Valance: " + request[2].valance.content + ";" : ""),
            7: (request[2].peak.fontFamily || request[2].peak.fontColor ? "Peak: " + request[2].peak.fontFamily + " " + request[2].peak.fontColor + "; " : "") + (request[2].valance.fontFamily || request[2].valance.fontColor ? "Valance: " + request[2].valance.fontFamily + " " + request[2].valance.fontColor + "; " : ""),
            8: (request[2].peak.instruction ? "Peak: " + request[2].peak.instruction + "; " : "") + (request[2].valance.instruction ? "Valance: " + request[2].valance.instruction + "; " : ""),
            55: request[2].peak.backgroundImage,
            56: request[2].valance.backgroundImage,
            57: request[2].peak.logo,
            58: request[2].valance.logo,
            10: (request[3].peak.backgroundColor ? "Peak: " + request[3].peak.backgroundColor + "; " : "") + (request[3].valance.backgroundColor ? "Valance: " + request[3].valance.backgroundColor + ";" : ""),
            13: (request[3].peak.content ? "Peak: " + request[3].peak.content + "; " : "") + (request[3].valance.content ? "Valance: " + request[3].valance.content + ";" : ""),
            14: (request[3].peak.fontFamily || request[3].peak.fontColor ? "Peak: " + request[3].peak.fontFamily + " " + request[3].peak.fontColor + "; " : "") + (request[3].valance.fontFamily || request[3].valance.fontColor ? "Valance: " + request[3].valance.fontFamily + " " + request[3].valance.fontColor + "; " : ""),
            15: (request[3].peak.instruction ? "Peak: " + request[3].peak.instruction + "; " : "") + (request[3].valance.instruction ? "Valance: " + request[3].valance.instruction + "; " : ""),
            59: request[3].peak.backgroundImage,
            60: request[3].valance.backgroundImage,
            61: request[3].peak.logo,
            62: request[3].valance.logo,
            16: (request[0].peak.backgroundColor ? "Peak: " + request[0].peak.backgroundColor + "; " : "") + (request[0].valance.backgroundColor ? "Valance: " + request[0].valance.backgroundColor + ";" : ""),
            19: (request[0].peak.content ? "Peak: " + request[0].peak.content + "; " : "") + (request[0].valance.content ? "Valance: " + request[0].valance.content + ";" : ""),
            20: (request[0].peak.fontFamily || request[0].peak.fontColor ? "Peak: " + request[0].peak.fontFamily + " " + request[0].peak.fontColor + "; " : "") + (request[0].valance.fontFamily || request[0].valance.fontColor ? "Valance: " + request[0].valance.fontFamily + " " + request[0].valance.fontColor + "; " : ""),
            21: (request[0].peak.instruction ? "Peak: " + request[0].peak.instruction + "; " : "") + (request[0].valance.instruction ? "Valance: " + request[0].valance.instruction + "; " : ""),
            63: request[0].peak.backgroundImage,
            64: request[0].valance.backgroundImage,
            65: request[0].peak.logo,
            66: request[0].valance.logo,
            22: (request[1].peak.backgroundColor ? "Peak: " + request[1].peak.backgroundColor + "; " : "") + (request[1].valance.backgroundColor ? "Valance: " + request[1].valance.backgroundColor + ";" : ""),
            25: (request[1].peak.content ? "Peak: " + request[1].peak.content + "; " : "") + (request[1].valance.content ? "Valance: " + request[1].valance.content + ";" : ""),
            26: (request[1].peak.fontFamily || request[1].peak.fontColor ? "Peak: " + request[1].peak.fontFamily + " " + request[1].peak.fontColor + "; " : "") + (request[1].valance.fontFamily || request[1].valance.fontColor ? "Valance: " + request[1].valance.fontFamily + " " + request[1].valance.fontColor + "; " : ""),
            27: (request[1].peak.instruction ? "Peak: " + request[1].peak.instruction + "; " : "") + (request[1].valance.instruction ? "Valance: " + request[1].valance.instruction + "; " : ""),
            67: request[1].peak.backgroundImage,
            68: request[1].valance.backgroundImage,
            69: request[1].peak.logo,
            70: request[1].valance.logo,
            3.1: applyToFullSide[0] ? "Apply to four sides peak" : "",
            3.2: applyToFullSide[1] ? "Apply to four sides valance" : "",
            36.3: "",
            36.6: "",
            37: "",
            71: ""
        });

        return result;
    };

    const openWallModal = (index) => {
        setActiveWall(index);

        const temp = JSON.parse(JSON.stringify(wallAttributeList));
        setWallAttributeListTemp(temp);

        const imageGalleryTemp = JSON.parse(JSON.stringify(productImageGallery));
        setProductImageGalleryTemp(imageGalleryTemp);

        const wallPicsTemp = JSON.parse(JSON.stringify(wallPictures));
        setWallPicturesTemp(wallPicsTemp);

        setWallIsOpen(true);
    };

    const closeWallModal = (save) => {
        if (save) {
            const temp = JSON.parse(JSON.stringify(wallAttributeListTemp));
            setWallAttributeList(temp);

            let selection = JSON.parse(JSON.stringify(selectedAttribute));
            temp.forEach((attribute, index) => {
                selection[index + 2] = attribute;
            });
            setSelectedAttribute(selection);

            let selectedVariantList = [];
            selection.forEach((attr, index) => selectedVariantList[index] = productVariant[index].filter(({attributes}) => arrayEquals(selection, attributes))[0]);
            setSelectedVariant(selectedVariantList);
        }
        setWallIsOpen(false);
    };

    const openCustomPrintingModal = () => setPrintIsOpen(true);

    const closeCustomPrintingModal = async (save, tempList) => {
        if (save) {
            const temp = JSON.parse(JSON.stringify(tempList));

            let result = await handleSendCustomPrinting(temp);
            setEntryId(result.id);

            setRoofColorSelectedList(temp);

            let selectionA = JSON.parse(JSON.stringify(selectedAttribute));

            let selectedVariantList = JSON.parse(JSON.stringify(selectedVariant));

            let sizesResult = selectedVariant[0].attributes.find(item => item.id === id_attribute_canopySize);
            let sizesList = sizesResult.option.split("x");

            let target = [
                {...selectionA[1][0], option: sizesList[0] + "ft"}, //左右
                {...selectionA[1][1], option: sizesList[1] + "ft"}, //前后
                {...selectionA[1][2], option: 0}, //左右
                {...selectionA[1][3], option: 0}, //前后
                {...selectionA[1][4]}
            ]

            temp.map((item, index) => {
                if (index < 2) {
                    if (!isEmpty(item.peak) || !isEmpty(item.valance)) {
                        target[2].option += 1;
                    }
                } else {
                    if (!isEmpty(item.peak) || !isEmpty(item.valance)) {
                        target[3].option += 1;
                    }
                }
            })

            if (target[0].option === target[1].option) {
                if (target[2].option === 1 && target[3].option === 0) {
                    target[2].option = 0;
                    target[3].option = 1;
                } else if ((target[2].option === 2 && target[3].option === 0) || (target[2].option === 0 && target[3].option === 2)) {
                    target[2].option = 1;
                    target[3].option = 1;
                }
            }

            target[2].option = target[2].option + "";
            target[3].option = target[3].option + "";

            selectedVariantList[1] = productVariant[1].filter(({attributes}) => arrayEquals(target, attributes))[0];
            selectionA[1] = target;

            setSelectedAttribute(selectionA);
            setSelectedVariant(selectedVariantList);
        }
        setPrintIsOpen(false);
    }

    const openSummaryModal = () => setSummaryIsOpen(true);
    const closeSummaryModal = () => setSummaryIsOpen(false);

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
                renderItem: (props) => renderCustomImage(props, wallPictures)
            };
        });
        setProductImageGallery(i);
    };

    const handleChangeRadio = (event, index, id) => {
        if (id === id_attribute_canopySize) {
            selectedSize = event.target.value;
        } else if (id === id_attribute_frameSeries) {
            selectedFrame = event.target.value
        } else if (id === id_attribute_canopyColor) {
            selectedColor = event.target.value;
        }

        // Part 1: 更改选项List信息 并 保存
        let selection = JSON.parse(JSON.stringify(selectedAttribute));
        selection[index].forEach((attribute) => {
            if (attribute.id === id) attribute.option = event.target.value;
            if (id !== id_attribute_canopySize && event.target.value !== "y7" && attribute.id === id_attribute_canopySize && (attribute.option !== "10x10" && attribute.option !== "10x15" && attribute.option !== "10x20")) {
                attribute.option = "10x20";
                selectedSize = "10x20";
            }
        });

        // Part 2: 根据选项从VariantList中查找对应产品数据 并 保存
        let selectionVariant = JSON.parse(JSON.stringify(selectedVariant));
        selectionVariant[index] = productVariant[index].filter(({attributes}) => arrayEquals(selection[index], attributes))[0];

        // Part 2.5: Canopy Tent订制选项，根据Tent Size变更Wall Size, Roof Size
        if (index === 0 && id === id_attribute_canopySize) {
            let sizes = event.target.value.split("x");
            selection.forEach((item, indexA) => {
                if (indexA < 1) return;
                if (indexA === 1) {
                    item.forEach((attribute, indexB) => {
                        if (indexB === 0) {
                            attribute.option = sizes[0] + "ft";
                        } else if (indexB === 1) {
                            attribute.option = sizes[1] === "26" ? "13ft" : sizes[1] + "ft";
                        }
                    });
                } else if (indexA > 1) {
                    item.forEach((attribute) => {
                        if (attribute.id === id_attribute_canopySize) {
                            attribute.option = event.target.value;
                        } else if (attribute.id === id_attribute_wallSize) {
                            attribute.option = (indexA === 2 || indexA === 3) ? sizes[0] + "ft" : sizes[1] === "26" ? "13ft" : sizes[1] + "ft";
                        }
                    });
                }

                // 挑选出对应 Roof/Wall Variant.
                selectionVariant[indexA] = productVariant[indexA].filter(({attributes}) => arrayEquals(selection[indexA], attributes))[0];
            });
        } else if (index === 1 && id === id_attribute_printing_tech) {
            selection.forEach((item, indexA) => {
                if (indexA < 1) return;

                item.forEach((attribute) => {
                    if (attribute.id === id_attribute_printing_tech) {
                        attribute.option = event.target.value;
                    }
                });

                selectionVariant[indexA] = productVariant[indexA].filter(({attributes}) => arrayEquals(selection[indexA], attributes))[0];
            });
        }

        // Part 3: 保存更改项
        setSelectedAttribute(selection);
        setSelectedVariant(selectionVariant);
    };

    const handleChangeWallRadio = (event, index, id) => {
        // Part 1: 更改选项List信息 并 保存
        let selection = JSON.parse(JSON.stringify(wallAttributeList));
        let selectionA = JSON.parse(JSON.stringify(selectedAttribute));
        let selectedVariantList = JSON.parse(JSON.stringify(selectedVariant));

        selection.forEach((attribute, indexA) => {
            if (index === indexA) {
                attribute.forEach((attr) => (attr.id === id ? (attr.option = event.target.value) : null));
            }
            selectionA[indexA + 2] = attribute
            selectedVariantList[indexA + 2] = productVariant[indexA + 2].filter(({attributes}) => arrayEquals(selectionA[indexA + 2], attributes))[0];
        });

        // Part 2: 保存更改项
        setWallAttributeList(selection);
        setSelectedAttribute(selectionA);
        setSelectedVariant(selectedVariantList);
    };

    const handleChangeWallRadioTemp = (event, index, id) => {
        let colors = [...wallColors];
        if (id === id_attribute_canopyColor) {
            colors[index] = event.target.value;
            setWallColors(colors);
        }

        // Part 1: 更改选项List信息 并 保存
        let selection = JSON.parse(JSON.stringify(wallAttributeListTemp));
        selection[index].forEach((attribute) => (attribute.id === id ? (attribute.option = event.target.value) : null));

        selection.forEach((item, indexA) => {
            if (id === id_attribute_printing_tech) {
                item.forEach((attribute) => (attribute.id === id ? (attribute.option = event.target.value) : null));
            } else {
                if (index === indexA) {
                    item.forEach((attribute) => (attribute.id === id ? (attribute.option = event.target.value) : null))
                }
            }
        });
        // Part 2: 保存更改项
        setWallAttributeListTemp(selection);
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
            // 检查可用性 26338, 26385, 26405, 26516
            if (variant.stock_status === "instock") {
                available[index] = {
                    id: variant.id,
                    status: true,
                    quantity: variant.stock_quantity,
                    needed: totalCount,
                    attribute: variant.attributes,
                    optional: productComponent[index].id === id_product_printed_wall,
                };
            } else {
                available[index] = {
                    id: variant.id,
                    status: false,
                    quantity: 0,
                    needed: totalCount,
                    attribute: variant.attributes,
                    optional: productComponent[index].id === id_product_printed_wall,
                };
            }

            if (selectedSize === "13x26" && (index === 4 || index === 5)) {
                if (!variant.on_sale) {
                    regularPrice += numberFn.strToFloat(variant.regular_price) * totalCount;
                    salePrice += numberFn.strToFloat(variant.regular_price) * totalCount;
                } else {
                    regularPrice += numberFn.strToFloat(variant.regular_price) * totalCount;
                    salePrice += numberFn.strToFloat(variant.sale_price) * totalCount;
                }
                available[index].needed = totalCount * 2;
            }
        });
        setAvailableList(available);

        setTotalRegularPrice(regularPrice);
        setTotalSalePrice(salePrice === regularPrice ? 0 : salePrice);
    };

    const updateCart = () => {
        let cl = JSON.parse(JSON.stringify(cart));
        cl = cl.concat([...checkoutProductList]);

        if (loggedIn) {
            let userData = {
                meta_data: [
                    {
                        key: "cart",
                        value: cl
                    },
                ],
            };
            dispatch(updateUser(token, userData));
            EventEmitter.dispatch("handleCart", true);
        } else {
            dispatch(modifyCart({cart: cl}))
            EventEmitter.dispatch("handleCart", true);
        }

        setEntryId(null)
    };

    //////////////////////////////////////

    useEffect(() => {
        selectedSize = router.query.size || urlFn.getParam("size") || "10x10";

        let paramSeries = router.query.series || urlFn.getParam("series") || "y7";
        selectedFrame = paramSeries === "y5" ? "y5 economic" : paramSeries === "y6" ? "y6 commercial" : paramSeries === "y7" ? "y7 heavy duty" : "y7 heavy duty"

        setTabsRefs((tabsRefs) => Array(3).fill(null).map((_, i) => tabsRefs[i] || createRef()));
    }, []);

    useEffect(() => {
        if (tabsRefs.length > 0) setDisplayTabs(true);
    }, [tabsRefs]);

    useEffect(() => {
        if (productComponent.length < 1) return;

        if (productComponent[0].hasOwnProperty("images")) {
            setMainImage(productComponent[0].images);
        } else if (productComponent[0].hasOwnProperty("image")) {
            setMainImage([productComponent[0].image]);
        }

        setSelectedAttribute(productComponent.map(({default_attributes}) => default_attributes) || []);
    }, [productComponent]);

    useEffect(() => {
        if (selectedAttribute.length < 1) return;

        let selectedVariantList = [];
        selectedAttribute.forEach((attribute, index) => {
            if (!attribute && attribute.length > 0) return;

            attribute.map((attr) => {
                if (!attr) return;

                if (!initSelectedAttribute) {
                    if (attr.id === id_attribute_frameSeries) {
                        if (selectedFrame) {
                            attr.option = selectedFrame;
                        } else {
                            attr.option = attr.option === "y5" ? "y5 economic" : attr.option === "y6" ? "y6 commercial" : attr.option === "y7" ? "y7 heavy duty" : "y7 heavy duty";
                        }
                    } else if (attr.id === id_attribute_canopySize) {
                        if (selectedSize) {
                            attr.option = selectedSize;
                        }
                    } else if (attr.id === id_attribute_wallType) {
                        attr.option = "none";
                    } else if (attr.id === id_attribute_wallPrintedType || attr.id === id_attribute_printing_tech) {
                        attr.option = stringFn.replaceDash(attr.option, 1);
                    }
                }
            });

            let selected = productVariant[index].filter(({attributes}) => arrayEquals(attribute, attributes));
            selectedVariantList[index] = selected[0];
        });

        setInitSelectedAttribute(true);
        setSelectedVariant(selectedVariantList);

        setWallAttributeList(selectedAttribute.filter((attribute, index) => index > 1) || []);
    }, [selectedAttribute]);

    useEffect(() => {
        // 已选各产品组成变体
        if (selectedVariant.length < 1) return;
        let wallPicturesList = JSON.parse(JSON.stringify(wallPictures));

        let product_name = selectedFrame === "y5 economic" ? "y5-economic-canopy-tent" : selectedFrame === "y6 commercial" ? "y6-commercial-buy" : selectedFrame === "y7 heavy duty" ? "y7-heavy-duty-canopy-tent" : "y7-heavy-duty-canopy-tent";
        let series = selectedFrame === "y5 economic" ? "Y5" : selectedFrame === "y6 commercial" ? "Y6" : selectedFrame === "y7 heavy duty" ? "Y7" : "Y7";
        let size = selectedSize;
        let color = wallMap.get("color").find((w) => w.key === selectedColor.toLowerCase()).value;
        let wallColor = "";

        // 设置Frame图片
        setMainImage([{src: "/images/product/" + product_name + "/frame/" + series + "-" + size + "-" + color + ".png",}]);

        const sizeUrl = wallMap.get("size").find((w) => w.key === size.toLowerCase()).value;
        selectedVariant.forEach((variant, index) => {
            if (!variant || !variant.attributes) {
                if (index > 1) wallPicturesList[index - 2] = "";
            } else if (index > 1) {
                // 设置Wall图片
                wallColor = wallMap.get("color").find((w) => w.key === wallColors[index - 2].toLowerCase()).value;
                const sideUrl = wallMap.get("side").find((w) => w.key === (index - 1)).value;
                const type = variant.attributes.filter((attr) => attr.id === id_attribute_wallType)[0].option.toLowerCase();
                if (type !== "none") {
                    const typeUrl = wallMap.get("type").find((w) => w.key === type).value;
                    wallPicturesList[index - 2] = "/images/product/" + product_name + "/wall/" + series + "-" + typeUrl + sizeUrl + wallColor + "-" + sideUrl + ".png";
                } else {
                    wallPicturesList[index - 2] = "";
                }
            }
        });
        // Set墙面图片
        setWallPictures(wallPicturesList);
        // 计算价格
        checkProduct_getPrice();
    }, [selectedVariant]);

    useEffect(() => {
        if (!wallAttributeListTemp || wallAttributeListTemp.length === 0) return;
        let wallPicturesTempList = JSON.parse(JSON.stringify(wallPicturesTemp));

        let product_name = selectedFrame === "y5 economic" ? "y5-economic-canopy-tent" : selectedFrame === "y6 commercial" ? "y6-commercial-buy" : selectedFrame === "y7 heavy duty" ? "y7-heavy-duty-canopy-tent" : "y7-heavy-duty-canopy-tent";
        let series = selectedFrame === "y5 economic" ? "Y5" : selectedFrame === "y6 commercial" ? "Y6" : selectedFrame === "y7 heavy duty" ? "Y7" : "Y7";
        let size = selectedSize.toLowerCase();
        let color = "";
        let type = "";

        const sizeUrl = wallMap.get("size").find((w) => w.key === size.toLowerCase()).value;
        wallAttributeListTemp.forEach((attribute, index) => {
            if (!attribute) {
                wallPicturesTempList[index] = "";
                return;
            }
            // 设置Wall图片
            attribute.map(attr => {
                if (attr.id === id_attribute_wallType) {
                    type = attr.option.toLowerCase();
                } else if (attr.id === id_attribute_canopyColor) {
                    color = attr.option.toLowerCase();
                }
            })
            if (type !== "none") {
                const typeUrl = wallMap.get("type").find((w) => w.key === type).value;
                const colorUrl = wallMap.get("color").find((w) => w.key === color.toLowerCase()).value;
                const sideUrl = wallMap.get("side").find((w) => w.key === index + 1).value;
                wallPicturesTempList[index] = "/images/product/" + product_name + "/wall/" + series + "-" + typeUrl + sizeUrl + colorUrl + "-" + sideUrl + ".png";
            } else {
                wallPicturesTempList[index] = "";
            }
        });
        // Set墙面图片
        setWallPicturesTemp(wallPicturesTempList);
    }, [wallAttributeListTemp]);

    useEffect(() => {
        // 计算价格
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

                if (productComponent[index].id === id_product_custom_printed_roof) {
                    checkoutProductList.push({
                        id: item.id,
                        quantity: item.needed,
                        variation: variation,
                        entryId: entryId
                    });
                } else {
                    checkoutProductList.push({
                        id: item.id,
                        quantity: item.needed,
                        variation: variation,
                    });
                }

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

        if (!selectedVariant[1]) {
            available = false;
            setAddCustomPrinted(false);
        } else {
            setAddCustomPrinted(true);
        }

        setAvailable(available);
    }, [availableList]);

    useEffect(() => {
        if (!productImageGallery || productImageGallery.length === 0) return;
        let images = [...productImageGallery];
        images[0] = {
            ...productImageGallery[0],
            renderItem: (props) => renderCustomImage(props, wallPictures)
        }
        setProductImageGallery(images);
    }, [wallPictures]);

    useEffect(() => {
        if (!productImageGalleryTemp || productImageGalleryTemp.length === 0) return;
        let images = [...productImageGalleryTemp];
        images[0] = {
            ...productImageGalleryTemp[0],
            renderItem: (props) => renderCustomImage(props, wallPicturesTemp)
        }
        setProductImageGalleryTemp(images);
    }, [wallPicturesTemp]);

    return (
        <React.Fragment>
            <Head>
                <title>Canopy Tent | WESTSHADE</title>
                <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"/>
            </Head>
            <Block height={["calc(100vh - 48px)", "calc(100vh - 48px)", "calc(100vh - 96px)"]} display={"flex"} justifyContent={"center"} overflow={["scroll", "scroll", "hidden"]}>
                <Block width={["100%", "480px", "100%"]} height={["max-content", "max-content", "100%"]} display={"flex"} flexDirection={["column", "column", "row"]} paddingBottom={["116px", "116px", "0px"]}>
                    {/* 图片区域 */}
                    <Block flex={[0, 0, 1]} position={["unset", "unset", "relative"]} paddingTop={["0", "24px", "48px"]} paddingRight={["16px", "16px", "0"]} paddingLeft={["16px", "16px", "24px"]}>
                        <Tabs activeKey={tabPictureActiveKey} fill={FILL.intrinsic} activateOnFocus onChange={({activeKey}) => setTabPictureActiveKey(parseInt(activeKey + ""))}
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
                            }}>
                            </Tab>
                            <Tab title="3D" overrides={{
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
                            }}>
                                {/*<model-viewer camera-controls alt="A 3D model of an astronaut" src="/images/3D/umbrella.glb"></model-viewer>*/}
                            </Tab>
                        </Tabs>
                    </Block>
                    {/* 选择区域 */}
                    <Block width={["auto", "auto", "413px"]} display={"flex"} flexDirection={"column"} alignItems={"center"} overflow={["unset", "unset", "scroll"]} padding={["24px 16px 94px", "24px 16px 68px", "24px 24px 68px 0"]}
                           overrides={{
                               Block: {
                                   props: {
                                       className: "hideScrollBar"
                                   },
                               },
                           }}
                    >
                        <Block marginBottom="16px" font="MinXHeading20">Canopy Tent</Block>
                        <Block marginTop="4px" marginBottom="24px" font="MinXLabel14" color="MinXButton"><Link color="inherit" href={"/canopy-tent/spec"}>Spec</Link></Block>
                        {displayTabs ? (
                            <Tabs activeKey={tabActiveKey} fill={FILL.fixed} activateOnFocus onChange={({activeKey}) => setTabActiveKey(parseInt(activeKey))}
                                  overrides={{
                                      Root: {
                                          style: {width: "100%"},
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
                                          style: {left: tabsRefs[tabActiveKey].current ? `${(tabsRefs[tabActiveKey].current.clientWidth - 24) / 2}px` : 0},
                                      },
                                  }}
                            >
                                <Tab title="Basic" tabRef={tabsRefs[0]}
                                     overrides={{
                                         TabPanel: {
                                             style: {paddingTop: 0, paddingRight: 0, paddingBottom: "40px", paddingLeft: 0},
                                         },
                                         Tab: {
                                             style: {":hover": {background: "none"}, paddingTop: "8px", paddingBottom: "8px"},
                                         },
                                     }}
                                >
                                    <>
                                        <SelectionArea title="Size">
                                            <Selection name="size" value={selectedAttribute[0] ? selectedAttribute[0][0].option.toLowerCase() : ""} onChange={(event) => handleChangeRadio(event, 0, id_attribute_canopySize)}>
                                                {productComponent[0] ? productComponent[0].attributes.filter((attribute) => attribute.id === id_attribute_canopySize).map((attribute) => attribute.options.map((option, index) => {
                                                        if ((selectedFrame === "y5 economic" || selectedFrame === "y6 commercial") && index < 3) {
                                                            return (
                                                                <Radio key={index} value={option.toLowerCase()}>{option}</Radio>
                                                            );
                                                        } else if (selectedFrame === "y7 heavy duty") {
                                                            return (
                                                                <Radio key={index} value={option.toLowerCase()}>{option}</Radio>
                                                            );
                                                        }
                                                    })
                                                ) : null}
                                            </Selection>
                                            <MButton type="solid" height="auto" marginRight="auto" marginLeft="auto" font="MinXParagraph16" text='Size Guide' color="MinXPrimaryText"
                                                     buttonStyle={{backgroundColor: "#F2F2F2 !important", paddingTop: "4px !important", paddingRight: "24px !important", paddingBottom: "4px !important", paddingLeft: "24px !important"}}
                                                     onClick={() => setSizeGuideOpen(true)}
                                            />
                                        </SelectionArea>
                                        <SelectionArea title="Frame">
                                            <Selection name="frame" value={selectedAttribute[0] ? selectedAttribute[0][1].option.toLowerCase() : ""}
                                                       onChange={(event) => {
                                                           selectedFrame = event.target.value;
                                                           handleChangeRadio(event, 0, id_attribute_frameSeries)
                                                       }}
                                                       id={id_attribute_frameSeries} attributes={productComponent[0] ? productComponent[0].attributes.filter((attribute) => attribute.id === id_attribute_frameSeries) : []}
                                            />
                                            <MButton type="solid" height="auto" marginRight="auto" marginLeft="auto" font="MinXParagraph16" text='Compare Frames' color="MinXPrimaryText"
                                                     buttonStyle={{backgroundColor: "#F2F2F2 !important", paddingTop: "4px !important", paddingRight: "24px !important", paddingBottom: "4px !important", paddingLeft: "24px !important"}}
                                                     onClick={() => setFrameCompareOpen(true)}
                                            />
                                        </SelectionArea>
                                        <SelectionArea title="Color">
                                            {/*<Selection name="color" value={selectedColor}*/}
                                            {/*           onChange={(event) => handleChangeRadio(event, 1, id_attribute_canopyColor)}*/}
                                            {/*           id={id_attribute_canopyColor} attributes={productComponent[1] ? productComponent[1].attributes.filter((attribute) => attribute.id === id_attribute_canopyColor) : []}*/}
                                            {/*/>*/}
                                            <Block maxWidth="315px" marginRight="auto" marginLeft="auto" font="MinXParagraph14">
                                                You can print any color or any designs with our <span style={{color: "#23A4AD"}}>custom printing</span> service
                                            </Block>
                                            <Button shape={SHAPE.pill}
                                                    overrides={{
                                                        BaseButton: {
                                                            props: {
                                                                className: "button-linear-gradient"
                                                            },
                                                        },
                                                    }}
                                                    onClick={() => {
                                                        // let selection = [...selectedAttribute];
                                                        // selection.forEach((product, index) => {
                                                        //     if (index > 1 && index < 6) {
                                                        //         product.forEach((attribute) => {
                                                        //             if (attribute.id === id_attribute_roofColor) attribute.option = selectedVariant[1].attributes[1].option.toLowerCase();
                                                        //         });
                                                        //     }
                                                        // });
                                                        // setSelectedAttribute(selection);
                                                        openCustomPrintingModal();
                                                    }}
                                            >
                                                <div style={{width: "100%", height: "100%", backgroundColor: "white", borderRadius: "38px", lineHeight: "46px",}}>
                                                    Custom print my tent
                                                </div>
                                            </Button>
                                        </SelectionArea>
                                        <SelectionArea title="Printing Technology">
                                            <Selection name="printing_tech" value={selectedAttribute[1] ? selectedAttribute[1][4].option.toLowerCase() : ""}
                                                       onChange={(event) => handleChangeRadio(event, 1, id_attribute_printing_tech)}
                                                       id={id_attribute_printing_tech} attributes={productComponent[1] ? productComponent[1].attributes.filter((attribute) => attribute.id === id_attribute_printing_tech) : []}
                                            />
                                            <MButton type="solid" height="auto" marginRight="auto" marginLeft="auto" font="MinXParagraph16" text='Compare Technology' color="MinXPrimaryText"
                                                     buttonStyle={{backgroundColor: "#F2F2F2 !important", paddingTop: "4px !important", paddingRight: "24px !important", paddingBottom: "4px !important", paddingLeft: "24px !important"}}
                                                     onClick={() => setTechnologyCompareOpen(true)}
                                            />
                                        </SelectionArea>
                                    </>
                                </Tab>
                                {/*<Tab title="+Wall" tabRef={tabsRefs[1]}*/}
                                {/*     overrides={{*/}
                                {/*         TabPanel: {*/}
                                {/*             style: {paddingRight: 0, paddingLeft: 0},*/}
                                {/*         },*/}
                                {/*         Tab: {*/}
                                {/*             style: {":hover": {background: "none"}, paddingTop: "8px", paddingBottom: "8px"},*/}
                                {/*         },*/}
                                {/*     }}*/}
                                {/*>*/}
                                {/*    <ul>*/}
                                {/*        {wallAttributeList.map((component, index) => {*/}
                                {/*            return (*/}
                                {/*                <ListItem key={index}*/}
                                {/*                          artwork={(props) => {*/}
                                {/*                              let side = index === 0 ? "left" : index === 1 ? "right" : index === 2 ? "front" : index === 3 ? "back" : "";*/}
                                {/*                              let added = component[1].option !== "none" ? "-added" : "";*/}
                                {/*                              return <img src={"images/icon/icon-wall-" + side + added + ".png"} alt={"icon-wall-" + side}/>;*/}
                                {/*                          }}*/}
                                {/*                          overrides={{*/}
                                {/*                              Root: {*/}
                                {/*                                  style: ({$theme}) => ({*/}
                                {/*                                      height: "68px",*/}
                                {/*                                      paddingRight: "8px",*/}
                                {/*                                      paddingLeft: "8px",*/}
                                {/*                                      backgroundColor: component[1].option !== "none" ? "#F5FCFC" : "transparent",*/}
                                {/*                                  }),*/}
                                {/*                              },*/}
                                {/*                              Content: {*/}
                                {/*                                  style: {paddingRight: 0, paddingLeft: "12px", borderBottomWidth: 0},*/}
                                {/*                              },*/}
                                {/*                              ArtworkContainer: {*/}
                                {/*                                  style: {width: "44px", height: "44px"},*/}
                                {/*                              },*/}
                                {/*                          }}*/}
                                {/*                          endEnhancer={() => {*/}
                                {/*                              return (*/}
                                {/*                                  <>*/}
                                {/*                                      {component[1].option !== "none" ? (*/}
                                {/*                                          <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>*/}
                                {/*                                              <Button shape={SHAPE.pill}*/}
                                {/*                                                      overrides={{*/}
                                {/*                                                          BaseButton: {props: {className: "button-edit"}},*/}
                                {/*                                                      }}*/}
                                {/*                                                      onClick={() => openWallModal(index)}*/}
                                {/*                                              >*/}
                                {/*                                                  Edit*/}
                                {/*                                              </Button>*/}
                                {/*                                              <Button kind={KIND.tertiary} shape={SHAPE.circle}*/}
                                {/*                                                      overrides={{*/}
                                {/*                                                          BaseButton: {*/}
                                {/*                                                              style: ({$theme}) => ({*/}
                                {/*                                                                  marginLeft: "17px",*/}
                                {/*                                                                  width: "20px",*/}
                                {/*                                                                  height: "20px",*/}
                                {/*                                                                  backgroundColor: "transparent",*/}
                                {/*                                                              }),*/}
                                {/*                                                          },*/}
                                {/*                                                      }}*/}
                                {/*                                                      onClick={() => handleChangeWallRadio({target: {value: "none"}}, index, id_attribute_wallType)}*/}
                                {/*                                              >*/}
                                {/*                                                  <Delete size={20}/>*/}
                                {/*                                              </Button>*/}
                                {/*                                          </div>*/}
                                {/*                                      ) : (*/}
                                {/*                                          <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>*/}
                                {/*                                              <Button shape={SHAPE.pill}*/}
                                {/*                                                      overrides={{*/}
                                {/*                                                          BaseButton: {props: {className: "button-add"}},*/}
                                {/*                                                      }}*/}
                                {/*                                                      onClick={() => openWallModal(index)}*/}
                                {/*                                              >*/}
                                {/*                                                  Edit*/}
                                {/*                                              </Button>*/}
                                {/*                                          </div>*/}
                                {/*                                      )}*/}
                                {/*                                  </>*/}
                                {/*                              );*/}
                                {/*                          }}*/}
                                {/*                >*/}
                                {/*                    <ListItemLabel description={index === 0 ? "left" : index === 1 ? "Right" : index === 2 ? "Front" : index === 3 ? "Back" : ""}*/}
                                {/*                                   overrides={{*/}
                                {/*                                       LabelContent: {*/}
                                {/*                                           style: ({$theme}) => ({fontSize: "14px", lineHeight: "20px", marginBottom: "4px"}),*/}
                                {/*                                       },*/}
                                {/*                                       LabelDescription: {*/}
                                {/*                                           style: ({$theme}) => ({fontSize: "14px", lineHeight: "20px", color: "#808080"}),*/}
                                {/*                                       },*/}
                                {/*                                   }}*/}
                                {/*                    >*/}
                                {/*                        {component[1].option.toLowerCase() === "rollup" ? "Roll-up" : stringFn.changeCase(component[1].option, 1)}*/}
                                {/*                    </ListItemLabel>*/}
                                {/*                </ListItem>*/}
                                {/*            )*/}
                                {/*        })}*/}
                                {/*    </ul>*/}
                                {/*</Tab>*/}
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
                                {/*                                <img style={{height: 80, width: 80, objectFit: "contain", marginBottom: 4}} src="images/icon/wall-pvc.png"/>*/}
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
                                {/*                                <img style={{height: 80, width: 80, objectFit: "contain", marginBottom: 4}} src="images/icon/wall-pvc.png"/>*/}
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
            <Checkout quantity={totalCount} isInStock={isInStock} buttonText={addCustomPrinted ? isInStock ? "Add to Bag" : "Out of Stock" : "No customizations added"} isAvailable={availableToCheckout}
                      onClick={() => openSummaryModal()}
                      onClickMinus={() => totalCount !== 1 && setTotalCount(totalCount - 1)}
                      onClickPlus={() => setTotalCount(totalCount + 1)}
                      onClickAddToBag={() => updateCart()}
                      onSale={totalRegularPrice !== totalRegularPrice} totalPrice={totalRegularPrice} totalSalesPrice={totalSalePrice}
            />
            <Modal type="alertdialog" isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} content="size"/>
            <Modal type="alertdialog" isOpen={frameCompareOpen} onClose={() => setFrameCompareOpen(false)} content="frame"/>
            <Modal type="alertdialog" isOpen={technologyCompareOpen} onClose={() => setTechnologyCompareOpen(false)} content="technique" dialogStyles={{transform: "translateY(0) !important"}}/>
            <Modal type="dialog" isOpen={summaryIsOpen} onClose={() => closeSummaryModal()} content="summary" dataTable={{productComponent, selectedVariant, totalSalePrice, totalRegularPrice, totalCount}}/>
            <Modal isOpen={wallIsOpen} onClose={() => closeWallModal()}
                   footer={
                       <Block width="100%" height={["54px", "70px", "80px"]} backgroundColor="white" display="flex" alignItems="center" justifyContent="space-between" padding="0 16px">
                           <Block>
                               <Block display={["none", "block"]}>
                                   <div style={{fontSize: "12px", marginRight: "24px", textAlign: "left"}}>After submitting the order, we’ll contact you with a free mockup based on
                                       the information you provide us here.
                                   </div>
                               </Block>
                               <Block display={["block", "none"]}>
                                   <StatefulTooltip placement={PLACEMENT.top} triggerType={TRIGGER_TYPE.click} content={() => <div style={{zIndex: 999}}>xxx</div>}>
                                       <div className="container-icon-custom-printing-note">!</div>
                                   </StatefulTooltip>
                               </Block>
                           </Block>
                           <Block display="grid" gridTemplateColumns="repeat(2, minmax(85px, auto))" gridColumnGap="24px">
                               <MButton type="outline" width="100%" height="40px" minWidth="85px" font="MinXParagraph16" text='Cancel' color="MinXButton"
                                        buttonStyle={{paddingRight: "24px !important", paddingLeft: "24px !important", borderColor: "#23A4AD"}}
                                        onClick={() => closeWallModal()}
                               />
                               <MButton type="solid" width="100%" height="40px" minWidth="85px" font="MinXParagraph16" text='Save' color="white"
                                        buttonStyle={{paddingRight: "24px !important", paddingLeft: "24px !important"}}
                                        onClick={() => closeWallModal(true)}
                               />
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
                        <SelectionArea title="Printing Side">
                            <Selection name="printing_side" value={wallAttributeListTemp[activeWall] ? wallAttributeListTemp[activeWall][0].option.toLowerCase() : "outside"}
                                       onChange={(event) => handleChangeWallRadioTemp(event, activeWall, id_attribute_wallPrintedType)}
                                       id={id_attribute_wallPrintedType} attributes={productComponent[2] ? productComponent[2].attributes.filter((attribute) => attribute.id === id_attribute_wallPrintedType) : []}
                            />
                        </SelectionArea>
                        <SelectionArea title="Wall Type">
                            <Selection name="wall_type" value={wallAttributeListTemp[activeWall] ? wallAttributeListTemp[activeWall][1].option.toLowerCase() : "none"} id={id_attribute_wallType}
                                       onChange={(event) => handleChangeWallRadioTemp(event, activeWall, id_attribute_wallType)}
                            >
                                {productComponent && productComponent[2] ? productComponent[2].attributes.filter((attribute) => attribute.id === id_attribute_wallType).map(({options}) =>
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
                            <Selection name="wall-color" value={wallAttributeListTemp[activeWall] ? wallAttributeListTemp[activeWall][4].option.toLowerCase() : "white"}
                                       onChange={(event) => handleChangeWallRadioTemp(event, activeWall, id_attribute_canopyColor)}
                                       id={id_attribute_canopyColor} attributes={productComponent[2] ? productComponent[2].attributes.filter((attribute) => attribute.id === id_attribute_canopyColor) : []}
                            />
                        </SelectionArea>
                    </Block>
                </Block>
            </Modal>
            <CustomPrintingRoof isOpen={printIsOpen} onClose={closeCustomPrintingModal} selectedRoofList={roofColorSelectedList} applyToFullSide={applyToFullSide} setApplyToFullSide={setApplyToFullSide}/>
        </React.Fragment>
    );
}

Custom_Printed_Canopy_Tent.getInitialProps = async (context) => {
    let product = null,
        component = [],
        variant = [];

    product = await utils.getProductByWooId(61289);
    if (product && product.type === "composite") {
        let cc = [product.composite_components[0], product.composite_components[1]];
        component = await Promise.all(cc.map(({default_option_id}) => utils.getProductByWooId(default_option_id)));
        variant = await Promise.all(component.map(({id}) => utils.getVariantByWooProductId(id)));
    }

    return {
        product: product,
        productComponent: [component[0], component[1]],
        productVariant: [variant[0], variant[1]],
        noFooter: true,
    };
}
;

export default withRouter(Custom_Printed_Canopy_Tent);
