import React, {createRef, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import clsx from "clsx";

import {withRouter} from "next/router";
import Image from "next/image";

import {Alert, AlertTitle} from "@material-ui/lab";

import {Block} from "baseui/block";
import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import {Radio} from "baseui/radio";
import {AspectRatioBox} from 'baseui/aspect-ratio-box';
import {KIND, SHAPE} from "baseui/button";
import {Tabs, Tab, FILL} from "baseui/tabs-motion";
import {ChevronLeft, ChevronRight} from "baseui/icon";

import styles from "../../styles/Product.module.scss";

import {NumberFn, StringFn, UrlFn} from "Utils/tools";
import Utils from "Utils/utils";
import {EventEmitter} from "Utils/events";

import {ProductDescription} from "Components/sections";
import Button from "Components/button-n";
import {Modal} from "Components/surfaces";
import Checkout from "Components/Checkout";
import SelectionArea from "Components/selection_area";
import Selection from "Components/selection-n";

import {viewItem, addToCart} from "../../redux/actions/gtagActions";

import {updateUser} from "../../redux/actions/userActions";
import {modifyCart} from "../../redux/actions/cartActions";

const numberFn = new NumberFn();
const stringFn = new StringFn();
const utils = new Utils();
const urlFn = new UrlFn();

const id_attribute_canopyColor = 3;
const id_attribute_canopySize = 4;
const id_attribute_frameSeries = 34;
const id_attribute_printingTechnique = 44;

let checkoutProductList = [];

function Custom_printed_Package({router, product, productComponent, productVariant, phone}) {
    const [displayTabs, setDisplayTabs] = useState(false);

    const [tabPictureActiveKey, setTabPictureActiveKey] = useState(0);

    const [uProduct, setProduct] = useState({...product});
    const [uProductComponent, setProductComponent] = useState([...productComponent]);
    const [uProductVariant, setProductVariant] = useState([...productVariant]);

    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("");
    const [productImage, setProductImage] = useState([]);

    const [selectedAttribute, setSelectedAttribute] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState([]);

    const [selectedFrame, setSelectedFrame] = useState("y7");
    const [selectedSize, setSelectedSize] = useState("10x10");

    const [productImageGallery, setProductImageGallery] = useState([]);

    const [initProductVariant, setInitProductVariant] = useState(false);
    const [initSelectedAttribute, setInitSelectedAttribute] = useState(false);

    const [totalRegularPrice, setTotalRegularPrice] = useState(0);
    const [totalSalePrice, setTotalSalePrice] = useState(0);
    const [totalCount, setTotalCount] = useState(1);

    const [message, setMessage] = useState("");

    const [availableToCheckout, setAvailable] = useState(false);

    const [summaryIsOpen, setSummaryIsOpen] = useState(false);

    const [isInStock, setIsInStock] = useState(true);

    const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
    const [frameCompareOpen, setFrameCompareOpen] = useState(false);

    ////////////////////////////////////////

    const [availableList, setAvailableList] = useState([{id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true}]);

    ////////////////////////////////////////

    const [showGetQuote, setShowGetQuote] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [showSizeModal, setShowSizeModal] = useState(false);
    const [showPrintServiceModal, setShowPrintServiceModal] = useState(false);

    ////////////////////////////////////////

    const [tabsRefs, setTabsRefs] = useState([]);

    ////////////////////////////////////////

    const [quoteSubject, setQuoteSubject] = useState("");
    const [quoteNameLast, setQuoteNameLast] = useState("");
    const [quoteNameFirst, setQuoteNameFirst] = useState("");
    const [quoteEmail, setQuoteEmail] = useState("");
    const [quotePhone, setQuotePhone] = useState("");
    const [quoteRequest, setQuoteRequest] = useState("");
    const [quoteError, setQuoteError] = useState(false);

    ////////////////////////////////////////

    const dispatch = useDispatch();

    const {loggedIn, token} = useSelector(({user}) => user);
    const {cart} = useSelector(({cart}) => cart);

    const openSummaryModal = () => setSummaryIsOpen(true);

    const closeSummaryModal = () => setSummaryIsOpen(false);

    const fetchProduct = async (id) => {
        if (!id) return;
        return await utils.getProductByWooId(id);
    };

    const fetchProductVariant = async (id) => {
        if (!id) return;
        return await utils.getVariantByWooProductId(id);
    };

    function renderCustomImage(props) {
        return (
            <AspectRatioBox aspectRatio={1} minHeight="230px">
                <Image src={props.original} alt={props.originalAlt} layout="fill" objectFit="contain" loader={({src, width}) => src} unoptimized/>
            </AspectRatioBox>
        );
    }

    const setMainImage = (images) => {
        if (!images || images.length === 0) return;

        let i = [];
        images.map((img, index) => {
            let url = img.src;
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

        addToCart(uProductComponent, selectedVariant, totalCount);
    };

    const handleSendQuote = async () => {
        if (!quoteSubject || !quoteNameLast || !quoteNameFirst || !quoteEmail || !quotePhone || !quoteRequest) {
            setQuoteError(true);
        } else {
            let result = await utils.contact({
                form_id: "1",
                status: "active",
                3: quoteSubject,
                1.3: quoteNameFirst,
                1.6: quoteNameLast,
                2: quoteEmail,
                5: quoteRequest,
                6: quotePhone,
            });
            setShowGetQuote(false);
            setTimeout(() => setShowModal(true), 250);

            if (document.location.href.match(/(^[^#]*)/).length > 0) {
                router.replace(document.location.href.match(/(^[^#]*)/)[0] + "#sent");
            }
        }
    };

    useEffect(async () => {
        setTabsRefs((tabsRefs) => Array(3).fill(null).map((_, i) => tabsRefs[i] || createRef()));

        if (uProduct.id) {
            setProductId(uProduct.id.toString());
        } else {
            let id = urlFn.getParam("id");
            if (id) {
                setProductId(id.toString());
                let p = await utils.getProductByWooId(id);
                setProduct(p);
            } else {
                router.push("/")
            }
        }

        let series = router.query.series || urlFn.getParam("series");
        if (series) {
            setSelectedFrame(series);
        }

        let size = router.query.size || urlFn.getParam("size");
        if (size) {
            setSelectedSize(size);
        }
    }, []);

    useEffect(() => {
        if (!initSelectedAttribute || !initProductVariant) return;

        handleChangeRadio(null, 0)
    }, [selectedFrame]);

    useEffect(() => {
        if (tabsRefs.length > 0) setDisplayTabs(true);
    }, [tabsRefs]);

    useEffect(() => {
        if (!uProduct) return;

        viewItem(uProduct);

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
        }
    }, [uProduct]);

    useEffect(() => {
        if (!uProductComponent || uProductComponent.length === 0) return;

        if (uProductComponent[0].hasOwnProperty("image")) {
            setMainImage([uProductComponent[0].image]);
        } else if (uProductComponent[0].hasOwnProperty("images")) {
            setMainImage(uProductComponent[0].images);
        }

        if (uProduct.type === "simple") {
            setSelectedVariant(uProductComponent);

            // 获取,保存各组件变体产品信息
            // setProductVariant([uProductComponent]);
        } else if (uProduct.type === "variable") {
            let selectedAttrList = [];
            Promise.all(
                uProductComponent.map((component) => {
                    let defaultAttr = [...component.default_attributes];

                    defaultAttr.forEach((attr) => {
                        if (attr.id === id_attribute_canopySize) {
                            let size = router.query.size || urlFn.getParam("size");

                            if (size) attr.option = size;
                        }
                    });

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
                // variant.attributes.push({id: 2, name: "Color", option: "white"});
                // if (attr.length !== variant.attributes.length) return false;
                let equal = true;
                for (let i = 0; i < variant.attributes.length; i++) {
                    if (selectedFrame && attr[i].id === id_attribute_frameSeries) {
                        attr[i].option = selectedFrame === "y5" ? "y5 economic" : selectedFrame === "y6" ? "y6 commercial" : selectedFrame === "y7" ? "y7 heavy duty" : "";
                    } else if (selectedFrame && attr[i].id === id_attribute_printingTechnique) {
                        attr[i].option = stringFn.replaceDash(attr[i].option, 1);
                    }
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
                    setMainImage([variant.image]);
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
                    setIsInStock(false);
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
                    setIsInStock(false);
                    setMessage("Insufficient stock → " + uProductComponent[index].name);
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
        <React.Fragment>
            <Block className={styles["container-page"]} width={["100%", "480px", "100%"]} display="flex" flexDirection={["column", null, "row"]} marginRight="auto" marginLeft="auto" marginBottom="40px" paddingBottom="40px"
                   $style={{gap: "18px"}}
            >
                {/* 图片区域 */}
                <Block flex={[0, 0, 1]} maxWidth="626px" width="100%" position={[null, null, "relative"]} marginRight="auto" marginLeft="auto" paddingTop={["0", "24px", "48px"]} paddingRight={["16px", null, "0"]}
                       paddingLeft={["16px", null, "24px"]}>
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
                              TabHighlight: {props: {hidden: true}, style: {display: "none"}},
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
                    <Block className="text-center" width="100%" padding="16px" marginTop="24px" backgroundColor="#F7F7F7" font="MinXParagraph14" color="MinXPrimaryText" $style={{border: "1px solid #D9D9D9", borderRadius: "48px"}}
                    >We will reach out to you to get the artwork and information after placing the order.</Block>
                </Block>
                {/* 选择区域 */}
                <Block className="hideScrollBar" width={["auto", null, "413px"]} display={"flex"} flexDirection={"column"} alignItems={"center"} overflow={[null, null, "scroll"]}
                       paddingTop={"24px"} paddingRight={["16px", null, "24px"]} paddingLeft={["16px", null, "0"]}
                >
                    <Block marginBottom="16px" font="MinXHeading20">{productName}</Block>
                    {uProduct && uProduct.short_description ? (
                        <Block className={clsx([styles["container-product-section"], styles["short-description"]])} font="MinXParagraph14" color="MinXPrimaryText"
                               dangerouslySetInnerHTML={{
                                   __html: `${stringFn.modifyShortDescription(uProduct.short_description)}`,
                               }}
                        />
                    ) : null}
                    {uProduct && uProduct.description ? (
                        <Block className={clsx(styles["container-product-section"], styles["align-left"])} font="MinXParagraph14" color="MinXSecondaryText"
                               dangerouslySetInnerHTML={{
                                   __html: `${stringFn.modifyShortDescription(uProduct.description)}`,
                               }}
                        />
                    ) : null}
                    <Button bundle="gray" type="outline" shape="square" width="195px" height="40px" font="MinXLabel14" color="MinXPrimaryText" text="Change Package"
                            buttonStyle={{borderColor: "#D9D9D9 !important", borderRadius: "8px !important"}}
                            startEnhancer={<Image src="/images/icon/icon-exchange.png" alt="exchange" layout="fixed" width="20px" height="20px" objectFit="contain"/>}
                            onClick={() => router.push({pathname: "/custom-printing-package"})}
                    />
                    <Block position="relative" display="grid" gridTemplateRows="repeat(2, max-content)" gridRowGap={["16px", null, "12px"]} justifyItems="center" justifyContent="center" marginTop="32px">
                        <Block font={["MinXLabel40", "MinXLabel40", "MinXLabel64"]} color="#23A4AD">2</Block>
                        <Block font={["MinXTitle20", "MinXTitle20", "MinXTitle28"]} $style={{fontWeight: "700 !important"}}>Choose size and frame</Block>
                        <Block position="absolute" right={0} bottom={0} left={0} width={["64px", null, "88px"]} height={["64px", null, "88px"]} margin="auto" backgroundColor="#E5F5F1"
                               $style={{borderRadius: "50%", zIndex: "-1"}}/>
                    </Block>
                    <SelectionArea title="Size">
                        <Selection name="size" value={selectedAttribute[0] ? selectedAttribute[0][0].option.toLowerCase() : ""} id={id_attribute_canopySize} onChange={(event) => handleChangeRadio(event, 0, id_attribute_canopySize)}>
                            {uProductComponent && uProductComponent[0] ? uProductComponent[0].attributes.filter((attribute) => attribute.id === id_attribute_canopySize && attribute.variation).map(({options}) => options.map((option, index) => {
                                if ((selectedFrame === "y5" || selectedFrame === "y6") && index > 2) return;
                                return <Radio key={index} value={option.toLowerCase()}>{option}</Radio>
                            })) : null}
                        </Selection>
                        <Button type="solid" height="32px" font="MinXParagraph16" text='Size Guide' color="MinXSecondaryText" buttonBackgroundColor="rgb(242, 242, 242)" buttonHoverBackgroundColor="rgb(242, 242, 242)"
                                onClick={() => setSizeGuideOpen(true)}
                        />
                    </SelectionArea>
                    <SelectionArea title="Frame">
                        <Selection name="frame" value={selectedFrame} id={id_attribute_frameSeries} onChange={(event) => setSelectedFrame(event.target.value)}>
                            <Radio value="y7">Y7 Heavy Duty Aluminum</Radio>
                            <Radio value="y6">Y6 Commercial Aluminum</Radio>
                            <Radio value="y5">Y5 Economic Steel</Radio>
                        </Selection>
                        <Button type="solid" height="32px" font="MinXParagraph16" color="MinXSecondaryText" text='Compare Frames' buttonBackgroundColor="rgb(242, 242, 242)" buttonHoverBackgroundColor="rgb(242, 242, 242)"
                                onClick={() => setFrameCompareOpen(true)}
                        />
                    </SelectionArea>
                    <Block position="relative" display="grid" gridTemplateRows="repeat(2, max-content)" gridRowGap={["16px", null, "12px"]} justifyItems="center" justifyContent="center" marginTop="32px">
                        <Block font={["MinXLabel40", "MinXLabel40", "MinXLabel64"]} color="#23A4AD">3</Block>
                        <Block font={["MinXTitle20", "MinXTitle20", "MinXTitle28"]} $style={{fontWeight: "700 !important"}}>Choose Printing method</Block>
                        <Block position="absolute" right={0} bottom={0} left={0} width={["64px", null, "88px"]} height={["64px", null, "88px"]} margin="auto" backgroundColor="#E5F5F1"
                               $style={{borderRadius: "50%", zIndex: "-1"}}/>
                    </Block>
                    <SelectionArea>
                        <Selection name="Printing Technique" value={selectedAttribute[0] ? selectedAttribute[0][2].option.toLowerCase() : ""} id={id_attribute_printingTechnique}
                                   onChange={(event) => handleChangeRadio(event, 0, id_attribute_printingTechnique)}>
                            {uProductComponent && uProductComponent[0] ? uProductComponent[0].attributes.filter((attribute) => attribute.id === id_attribute_printingTechnique && attribute.variation).map(({options}) => options.map((option, index) =>
                                <Radio key={index} value={option.toLowerCase()}>{option}</Radio>)) : null}
                        </Selection>
                        <Button type="solid" height="32px" font="MinXParagraph16" text='Compare Frames' color="MinXSecondaryText" buttonBackgroundColor="rgb(242, 242, 242)" buttonHoverBackgroundColor="rgb(242, 242, 242)"
                                onClick={() => setShowPrintServiceModal(true)}
                        />
                    </SelectionArea>
                </Block>
            </Block>
            <ProductDescription product={selectedFrame}/>
            <Checkout.V2 quantity={totalCount} isInStock={isInStock} buttonText={isInStock ? "Add to Bag" : "Out of Stock"} isAvailable={availableToCheckout}
                         onClick={() => openSummaryModal()}
                         onClickMinus={() => totalCount !== 1 && setTotalCount(totalCount - 1)}
                         onClickPlus={() => setTotalCount(totalCount + 1)}
                         onClickAddToBag={() => updateCart()}
                         onSale={totalRegularPrice !== totalSalePrice} totalPrice={totalRegularPrice} totalSalesPrice={totalSalePrice}
                         showShippedDay={false}
            />
            <Modal type="alertdialog" isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} content="size"/>
            <Modal type="alertdialog" isOpen={frameCompareOpen} onClose={() => setFrameCompareOpen(false)} content="frame"/>
            <Modal type="alertdialog" isOpen={showPrintServiceModal} onClose={() => setShowPrintServiceModal(false)} content="technique"/>
            <Modal type="alertdialog" isOpen={showSizeModal} onClose={() => setShowSizeModal(false)}>
                <img className="popup-image" src={process.env.imageBaseUrl + "/images/tent-spec/choose-size.jpg"}/>
            </Modal>
            <Modal type="alertdialog" isOpen={showModal} onClose={() => setShowModal(false)} dialogStyles={{background: "rgb(237, 247, 237)", paddingTop: '24px'}}>
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    Email has been sent successfully.
                </Alert>
            </Modal>
            <Modal type="dialog" isOpen={summaryIsOpen} onClose={() => closeSummaryModal()} content="summary" dataTable={{uProductComponent, selectedVariant, totalSalePrice, totalRegularPrice, totalCount}}/>
            <Modal type="dialog" isOpen={showGetQuote} onClose={() => setShowGetQuote(false)}>
                <Block marginTop={["64px", "64px", "30px"]} marginRight={["auto", "auto", "32px"]} marginLeft={["auto", "auto", "32px"]}
                       display="grid" gridTemplateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gridColumnGap="32px" gridRowGap="16px"
                >
                    <Block className="text-center" display="flex" justifyContent="center" alignItems="center">
                        <Block maxWidth="320px" display="grid" gridRowGap="24px" justifyItems="center">
                            <Block font="MinXLabel20" color="MinXPrimaryText">At Westshade, We Offer Limitless Design Solution.</Block>
                            <Image src={"/images/tent-spec/customer-service.svg"} alt="customer service" layout="fixed" width={120} height={120}/>
                            <Block font="MinXParagraph16" color="MinXPrimaryText">Call us for custom print consultation</Block>
                            <Button shape="square" height="36px" font="MinXParagraph16" text={phone} color="white" bundle="black" onClick={() => window.open(`tel:+1-` + phone, '_self')}/>
                        </Block>
                    </Block>
                    <Block>
                        <FormControl label={() => "Subject"}>
                            <Input value={quoteSubject} clearOnEscape error={!quoteSubject && quoteError} required
                                   overrides={{
                                       Root: {
                                           props: {
                                               className: "container-input-enquiry"
                                           },
                                           style: ({$error}) => $error ? {borderBottomColor: "rgb(241, 153, 142) !important"} : null
                                       },
                                       InputContainer: {
                                           props: {
                                               className: "container-inner-input-enquiry"
                                           }
                                       },
                                       Input: {
                                           props: {
                                               className: "input-enquiry"
                                           },
                                       },
                                   }}
                                   onChange={(event) => {
                                       setQuoteError(false);
                                       setQuoteSubject(event.target.value);
                                   }}
                            />
                        </FormControl>
                        <Block display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap="24px">
                            <Block>
                                <FormControl label={() => "Last Name*"}>
                                    <Input value={quoteNameLast} clearOnEscape error={!quoteNameLast && quoteError} required
                                           overrides={{
                                               Root: {
                                                   props: {
                                                       className: "container-input-enquiry"
                                                   },
                                                   style: ({$error}) => $error ? {borderBottomColor: "rgb(241, 153, 142) !important"} : null
                                               },
                                               InputContainer: {
                                                   props: {
                                                       className: "container-inner-input-enquiry"
                                                   }
                                               },
                                               Input: {
                                                   props: {
                                                       className: "input-enquiry"
                                                   },
                                               },
                                           }}
                                           onChange={(event) => {
                                               setQuoteError(false);
                                               setQuoteNameLast(event.target.value);
                                           }}
                                    />
                                </FormControl>
                            </Block>
                            <Block>
                                <FormControl label={() => "First Name*"}>
                                    <Input value={quoteNameFirst} clearOnEscape error={!quoteNameFirst && quoteError} required
                                           overrides={{
                                               Root: {
                                                   props: {
                                                       className: "container-input-enquiry"
                                                   },
                                                   style: ({$error}) => $error ? {borderBottomColor: "rgb(241, 153, 142) !important"} : null
                                               },
                                               InputContainer: {
                                                   props: {
                                                       className: "container-inner-input-enquiry"
                                                   }
                                               },
                                               Input: {
                                                   props: {
                                                       className: "input-enquiry"
                                                   },
                                               },
                                           }}
                                           onChange={(event) => {
                                               setQuoteError(false);
                                               setQuoteNameFirst(event.target.value);
                                           }}
                                    />
                                </FormControl>
                            </Block>
                        </Block>
                        <FormControl label={() => "Email*"}>
                            <Input value={quoteEmail} clearOnEscape error={!quoteEmail && quoteError} required
                                   overrides={{
                                       Root: {
                                           props: {
                                               className: "container-input-enquiry"
                                           },
                                           style: ({$error}) => $error ? {borderBottomColor: "rgb(241, 153, 142) !important"} : null
                                       },
                                       InputContainer: {
                                           props: {
                                               className: "container-inner-input-enquiry"
                                           }
                                       },
                                       Input: {
                                           props: {
                                               className: "input-enquiry"
                                           },
                                       },
                                   }}
                                   onChange={(event) => {
                                       setQuoteError(false);
                                       setQuoteEmail(event.target.value);
                                   }}
                            />
                        </FormControl>
                        <FormControl label={() => "Phone*"}>
                            <Input value={quotePhone} clearOnEscape error={!quotePhone && quoteError} required
                                   overrides={{
                                       Root: {
                                           props: {
                                               className: "container-input-enquiry"
                                           },
                                           style: ({$error}) => $error ? {borderBottomColor: "rgb(241, 153, 142) !important"} : null
                                       },
                                       InputContainer: {
                                           props: {
                                               className: "container-inner-input-enquiry"
                                           }
                                       },
                                       Input: {
                                           props: {
                                               className: "input-enquiry"
                                           },
                                       },
                                   }}
                                   onChange={(event) => {
                                       setQuoteError(false);
                                       setQuotePhone(event.target.value);
                                   }}
                            />
                        </FormControl>
                        <FormControl label={() => "Describe What You’re Looking For*"}>
                            <Input value={quoteRequest} clearOnEscape error={!quoteRequest && quoteError} required
                                   overrides={{
                                       Root: {
                                           props: {
                                               className: "container-input-enquiry"
                                           },
                                           style: ({$error}) => $error ? {borderBottomColor: "rgb(241, 153, 142) !important"} : null
                                       },
                                       InputContainer: {
                                           props: {
                                               className: "container-inner-input-enquiry"
                                           },
                                       },
                                       Input: {
                                           props: {
                                               className: "input-enquiry"
                                           },
                                       },
                                   }}
                                   onChange={(event) => {
                                       setQuoteError(false);
                                       setQuoteRequest(event.target.value);
                                   }}
                            />
                        </FormControl>
                        <Button shape="square" height="32px" font="MinXParagraph16" text='Submit' color="white" bundle="gray" onClick={() => handleSendQuote()}/>
                    </Block>
                </Block>
            </Modal>
        </React.Fragment>
    );
}

Custom_printed_Package.getInitialProps = async (context) => {
    const {query} = context;
    const {id} = query;
    let product,
        component = [],
        variant = [];

    product = await utils.getProductByWooId(id);
    if (product && product.type === "simple") {
        component[0] = {...product};
    } else if (product && product.type === "variable") {
        component[0] = {...product};
        variant[0] = await utils.getVariantByWooProductId(id);
    }

    return {
        product: product,
        productComponent: component,
        productVariant: variant,
    };
};

export default withRouter(Custom_printed_Package);
