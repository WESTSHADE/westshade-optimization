import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import NumberFormat from "react-number-format";
import clsx from "clsx";

import {withRouter} from "next/router";
import Head from "next/head";

import {Block} from "baseui/block";
import {TableBuilder, TableBuilderColumn} from "baseui/table-semantic";

import {Checkout_N as Checkout, Selection, ProductDescription} from "../../components/sections";
import {Modal} from "../../components/surfaces";

import styles from "./Product.module.scss";

import {viewItem, addToCart} from "../../redux/actions/gtagActions";

import {DateFn, NumberFn, StringFn, UrlFn} from "../../utils/tools";
import Utils from "../../utils/utils";
import {EventEmitter} from "../../utils/events";

import {updateUser} from "../../redux/actions/userActions";
import {modifyCart} from "../../redux/actions/cartActions";

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

function Umbrella({router, product, productComponent = [], productVariant = []}) {
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

    const [isInStock, setIsInStock] = useState(true);

    const [regularPrice, setRegularPrice] = useState(0);
    const [salePrice, setSalePrice] = useState(0);

    const [totalRegularPrice, setTotalRegularPrice] = useState(0);
    const [totalSalePrice, setTotalSalePrice] = useState(0);
    const [totalCount, setTotalCount] = useState(1);

    const [message, setMessage] = useState("");

    const [availableToCheckout, setAvailable] = useState(false);
    const [shippedDay, setShippedDay] = useState("");

    const [summaryIsOpen, setSummaryIsOpen] = useState(false);

    ////////////////////////////////////////

    const [availableList, setAvailableList] = useState([{id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true}]);

    const [umbrellaSize, setUmbrellaSize] = useState("");
    const [umbrellaFrame, setUmbrellaFrame] = useState("");

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

    const setMainImage = (images) => {
        if (!images || images.length === 0) return;

        function renderCustomImage(props) {
            return (
                <img className="image-gallery-image" src={props.original}/>
            );
        }

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
        setProductId(product.id.toString());
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
    }, []);

    useEffect(() => {
        if (!product) return;

        viewItem(product);

        setProductName(product.name);
        setProductType(product.type);

        if (product.hasOwnProperty("image")) {
            setMainImage([product.image]);
        } else if (product.hasOwnProperty("images")) {
            setMainImage(product.images);
        }

        setRegularPrice(product.regular_price);
        setSalePrice(product.sale_price);
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
                    if (attr.id === id_attribute_umbrellaSize) {
                        if (router.query.size) {
                            attr.option = router.query.size;
                        } else if (umbrellaSize) {
                            attr.option = umbrellaSize;
                        } else {
                            attr.option = stringFn.replaceDash(attr.option, 2);
                        }
                    } else if (attr.id === id_attribute_umbrellaFrame) {
                        if (router.query.type) {
                            attr.option = router.query.type;
                        } else if (umbrellaFrame) {
                            attr.option = umbrellaFrame.toLowerCase();
                        }
                    } else if (attr.id === id_attribute_color) {
                        attr.option = stringFn.replaceDash(attr.option, 1);
                    }
                });
                selectedAttrList.push(defaultAttr);
            });
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
        console.log(selectedVariant)

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

    //////////////////////////////////////

    const DataTable = () => {
        let rowDate = [];

        selectedVariant.map((variant, index) => {
            let cell = {
                name: productComponent[index].name,
                quantity: 1,
                regular_price: variant.regular_price,
                sale_price: variant.sale_price,
                on_sale: variant.on_sale,
            };
            rowDate.push(cell);
        });

        function NameCell({value}) {
            return (
                <Block font="MinXLabel14" overrides={{Block: {style: {fontWeight: "400"}},}}>{value}</Block>
            );
        }

        function QuantityCell({value}) {
            return <Block font="MinXLabel14" overrides={{Block: {style: {textAlign: "center", fontWeight: "400"}},}}>{value * totalCount}</Block>;
        }

        function PriceCell({priceRegular, priceSale, onSale}) {
            return (
                <Block font="MinXLabel14" overrides={{Block: {style: {textAlign: "right", fontWeight: "400"}},}}>
                    {onSale ? (
                        <Block display="flex" flexDirection="row" justifyContent="flex-end">
                            {priceSale == 0 ? <Block marginRight="10px" color="#E4458C">Free</Block> :
                                <NumberFormat thousandSeparator={true} prefix={"$"} value={priceSale} displayType={"text"} style={{color: "#E4458C", marginRight: 10}}/>}
                            <NumberFormat thousandSeparator={true} prefix={"$"} value={priceRegular} displayType={"text"} style={{textDecoration: "line-through"}}/>
                        </Block>
                    ) : (
                        <NumberFormat thousandSeparator={true} prefix={"$"} value={priceRegular} displayType={"text"}/>
                    )}
                </Block>
            );
        }

        return (
            <Block height="100%">
                <TableBuilder data={rowDate}
                              overrides={{
                                  Root: {
                                      style: {height: "calc(100% - 44px)"},
                                  },
                              }}
                >
                    <TableBuilderColumn header="Item">{(row) => <NameCell value={row.name}/>}</TableBuilderColumn>
                    <TableBuilderColumn header="Quantity" numeric
                                        overrides={{
                                            TableHeadCell: {
                                                style: {textAlign: "center",}
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
                <Block display="flex" flexDirection="row" justifyContent="space-between" alignItems="center"
                       paddingTop="12px" paddingRight="20px" paddingBottom="12px" paddingLeft="20px"
                       font="MinXLabel14" overrides={{Block: {style: {fontWeight: "400", borderTop: "1px solid #d9d9d9"}},}}
                >
                    <div>Total:</div>
                    <NumberFormat thousandSeparator={true} prefix={"$"} value={totalSalePrice ? totalSalePrice : totalRegularPrice} displayType={"text"} style={{fontSize: 16, fontWeight: "bold"}}/>
                </Block>
            </Block>
        );
    };

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
        <React.Fragment>
            <Head>
                <title>{productName ? productName + " - Umbrella | WESTSHADE" : ""}</title>
            </Head>
            <Block width={["100%", "480px", "100%"]} display="flex" flexDirection={["column", "column", "row"]} marginRight="auto" marginLeft="auto" marginBottom="40px" paddingBottom="40px">
                {/* 图片区域 */}
                <Block position={["", "", "relative"]} flex={[0, 0, 1]} paddingTop={["0", "24px", "48px"]} paddingRight={["16px", "16px", "0"]} paddingLeft={["16px", "16px", "24px"]}>
                    <ImageGallery showNav={false} items={productImageGallery} thumbnailPosition="left" showPlayButton={false} showFullscreenButton={false}/>
                </Block>
                {/* 选择区域 */}
                <Block width={["auto", "auto", "440px"]} overflow={["", "", "scroll"]}
                       overrides={{
                           Block: {
                               props: {
                                   className: "hideScrollBar"
                               },
                           },
                       }}
                >
                    <Block display="flex" flexDirection="column" alignItems="center" paddingTop={["40px", "24px"]} paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}>
                        <Block marginBottom="16px" font="MinXHeading20">{productName}</Block>
                        {product && product.short_description ? (
                            <Block font="MinXParagraph14"
                                   overrides={{
                                       Block: {
                                           props: {
                                               className: clsx(styles["container-product-section"], styles["align-left"])
                                           },
                                       },
                                   }}
                                   dangerouslySetInnerHTML={{
                                       __html: `Description: ${stringFn.modifyShortDescription(product.short_description)}`,
                                   }}
                            />
                        ) : null}
                        <SelectionList index={0} data={productComponent[0]}/>
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
            />
            <Checkout quantity={totalCount} isInStock={isInStock} buttonText={isInStock ? "Add to Bag" : "Out of Stock"} isAvailable={availableToCheckout}
                      onClick={() => openSummaryModal()}
                      onClickMinus={() => totalCount !== 1 && setTotalCount(totalCount - 1)}
                      onClickPlus={() => setTotalCount(totalCount + 1)}
                      onClickAddToBag={() => updateCart()}
                      onSale={selectedVariant.length > 0 ? selectedVariant[0].on_sale : false} totalPrice={totalRegularPrice} totalSalesPrice={totalSalePrice}
            />
            <Modal type="dialog" isOpen={summaryIsOpen} onClose={() => closeSummaryModal()} content="summary" dataTable={<DataTable/>}/>
        </React.Fragment>
    );
}

Umbrella.getInitialProps = async (context) => {
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
    };
};

export default withRouter(Umbrella);
