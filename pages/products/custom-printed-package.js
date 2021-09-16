import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import clsx from "clsx";

import { Box, Button, Breadcrumbs, Container, Divider, Grid, ImageList, ImageListItem, List, ListItem, ListItemText, Tabs, Tab, TextField, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import Link from "next/link";
import { withRouter } from "next/router";

import styles from "../../styles/Product.module.scss";

import { DateFn, NumberFn, StringFn } from "../../utils/tools";
import Utils from "../../utils/utils";
import { EventEmitter } from "../../utils/events";

import Banner from "../../components/banner";
import CBreadcrumbs from "../../components/breadcrumbs";
import CustomAccordion from "../../components/accordion";
import CustomButton from "../../components/button";
import Checkout from "../../components/buttonGroup";
import Modal from "../../components/modal";
import Selections from "../../components/selection_group";

const dateFn = new DateFn();
const numberFn = new NumberFn();
const stringFn = new StringFn();
const utils = new Utils();

const id_attribute_color = 2;
const id_attribute_frameSeries = 34;
const id_attribute_packageNo = 35;
const id_attribute_printingTechnique = 44;

const imageGallery = [
	{ img: "/images/rectangle-79-2@2x.png", title: "" },
	{ img: "/images/rectangle-80-7@2x.png", title: "" },
	{ img: "/images/rectangle-77-7@2x.png", title: "" },
	{ img: "/images/rectangle-77-8@2x.png", title: "" },
	{ img: "/images/rectangle-78-3@2x.png", title: "" },
	{ img: "/images/rectangle-78-4@2x.png", title: "" },
];

let checkoutProductList = [];

function getProducts(components) {
	return Promise.all(components.map(({ default_option_id }) => utils.getProductByWooId(default_option_id)));
}

function getVariants(components) {
	return Promise.all(components.map(({ id }) => utils.getVariantByWooProductId(id)));
}

function Custom_printed_Package({ router, product, productComponent, productVariant }) {
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

	const [showAddProgress, setShowAddProgress] = useState(false);
	const [shippedDay, setShippedDay] = useState("");

	////////////////////////////////////////

	const [availableList, setAvailableList] = useState([{ id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true }]);

	////////////////////////////////////////

	const [productFrame, setProductFrame] = useState("");

	////////////////////////////////////////

	const [showGetQuote, setShowGetQuote] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const [showSizeModal, setShowSizeModal] = useState(false);
	const [showPrintServiceModal, setShowPrintServiceModal] = useState(false);

	const [tab, setTab] = useState(0);
	const [tabDesc, setTabDesc] = useState(0);

	////////////////////////////////////////

	const [quoteSubject, setQuoteSubject] = useState("");
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
			let urlList = images.map((image) => {
				return { src: image.src.replace(/^http:\/\/54\.212\.246\.17/i, "https://checkout.westshade.com") };
			});
			setProductImage(urlList);
		} else {
			let url = images.src;
			url = url.replace(/^http:\/\/54\.212\.246\.17/i, "https://checkout.westshade.com");

			setProductImage([{ src: url }]);
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

	const handleChangeTab = (event, newValue) => setTab(newValue);
	const handleChangeTabDesc = (event, newValue) => setTabDesc(newValue);

	useEffect(() => {
		setTimeout(() => setDisplay(true), 250);

		setProductId(product.id.toString());
		setShippedDay(dateFn.getReceivedDay());

		if (router.query.frame) {
			let frame = router.query.frame;
			setProductFrame(frame);
		}
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
					if (attr.id === id_attribute_packageNo) {
						attr.option = "01 - 1*valance";
					} else if (attr.id === id_attribute_frameSeries || attr.id === id_attribute_printingTechnique) {
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
				// variant.attributes.push({id: 2, name: "Color", option: "white"});
				// if (attr.length !== variant.attributes.length) return false;
				let equal = true;
				for (let i = 0; i < variant.attributes.length; i++) {
					if (productFrame && attr[i].id === id_attribute_frameSeries) {
						attr[i].option = productFrame === "y5" ? "y5 economic" : productFrame === "y6" ? "y6 commercial" : productFrame === "y7" ? "y7 heavy duty" : "";
					}
					if (attr[i].id === id_attribute_color) {
						break;
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

			const i = checkoutProductList.findIndex(({ id }) => id === item.id);
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

	//////////////////////////////////////

	return (
		<React.Fragment>
			<Box className="page product" fontSize={14} lineHeight={1}>
				{display ? (
					<>
						<CBreadcrumbs>
							<Container maxWidth="md">
								{product ? (
									<Breadcrumbs classes={{ li: "root-breadcrumbs-text" }}>
										<Link color="inherit" href="/" onClick={(event) => event.preventDefault()}>
											Home
										</Link>
										<Link color="inherit" href="/" onClick={(event) => event.preventDefault()}>
											Products
										</Link>
										<Typography variant="inherit" color="textPrimary">
											{" "}
											{product.name}{" "}
										</Typography>
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
												{productImage.map((item, index) => (
													<img key={index} src={item.src} />
												))}
											</Carousel>
										</div>
									</Grid>
									<Grid item xs={12} sm={6} className="position-r">
										<div className={clsx(styles["container-product-section"], styles["b-b"])}>
											<Typography variant="h1" classes={{ h1: styles["product-name"] }} color="textPrimary">
												{productName}
											</Typography>
										</div>
										<div className={clsx(styles["container-product-section"], styles["b-b"])}>
											{"Description："}
											{product && product.short_description ? (
												<Typography variant="inherit" display="block" classes={{ root: styles["product-description"] }} color="textSecondary">
													{stringFn.modifyShortDescription(product.short_description)}
												</Typography>
											) : null}
										</div>
										<div>
											{productComponent && productComponent[0]
												? productComponent[0].attributes
														.filter((attribute) => attribute.variation)
														.map((attribute, index) => {
															if (attribute.id !== id_attribute_frameSeries && attribute.id !== id_attribute_color) {
																return (
																	<div key={index} className={clsx(styles["container-product-section"])}>
																		<Selections
																			label={"Choose your " + stringFn.replaceDash(attribute.name, 1) + ":"}
																			value={selectedAttribute[0] ? selectedAttribute[0][index].option.toLowerCase() : ""}
																			onChange={(event) => handleChangeRadio(event, 0, attribute.id)}
																			list={attribute.options}
																			id={attribute.id.toString()}
																		/>
																	</div>
																);
															}
														})
												: null}
										</div>
										<Grid container direction="row" alignItems="center" classes={{ root: styles["button-group"] }}>
											<CustomButton type="underline" onClick={() => setShowPrintServiceModal(true)}>
												Compare print service
											</CustomButton>
										</Grid>
										<div className={clsx(styles["container-product-section"])}>
											<Typography variant="inherit" display="block" classes={{ root: styles["product-selection-title"] }}>
												Build Your Own:
											</Typography>
											<Tabs classes={{ root: styles["product-selection-package-tabs"] }} value={tab} TabIndicatorProps={{ children: <span />, hidden: true }} onChange={handleChangeTab} centered>
												{[{ label: "Frame Series" }, { label: "Color" }].map((item, index) => (
													<Tab key={index} classes={{ root: styles["package-tab"], selected: styles["selected"] }} label={item.label} disableRipple />
												))}
											</Tabs>
											{productComponent && productComponent[0]
												? productComponent[0].attributes
														.filter((attribute) => attribute.variation)
														.map((attribute, index) => {
															if (attribute.id === id_attribute_frameSeries || attribute.id === id_attribute_color) {
																return (
																	<div key={index} className={styles["product-selection-package-tab-panel"]} hidden={tab !== index - 2}>
																		<Selections
																			value={selectedAttribute[0] ? selectedAttribute[0][index].option.toLowerCase() : ""}
																			onChange={(event) => handleChangeRadio(event, 0, attribute.id)}
																			list={attribute.options}
																			id={attribute.id.toString()}
																			direction="vertical"
																		/>
																	</div>
																);
															}
														})
												: null}
										</div>
										<Grid container direction="row" alignItems="center" classes={{ root: styles["button-group"] }}>
											<CustomButton type="underline" onClick={() => setShowGetQuote(true)}>
												Looking For Other Design?
											</CustomButton>
										</Grid>
										<Grid container direction="row" alignItems="center">
											<Typography variant="inherit" classes={{ root: clsx(styles["product-price"], totalSalePrice ? styles["discount"] : "") }}>
												{"$" + parseFloat(totalRegularPrice).toFixed(2)}
											</Typography>
											{totalSalePrice ? (
												<Typography variant="inherit" classes={{ root: styles["product-price"] }}>
													{"$" + parseFloat(totalSalePrice).toFixed(2)}
												</Typography>
											) : null}
										</Grid>
										{!availableToCheckout ? <Typography classes={{ root: styles["product-message"] }}>{message}</Typography> : null}
										<Checkout
											onClickLeft={() => totalCount !== 1 && setTotalCount(totalCount - 1)}
											onClickRight={() => setTotalCount(totalCount + 1)}
											count={totalCount}
											available={availableToCheckout}
											progress={showAddProgress}
											onClick={updateCart}
										/>
										<Typography classes={{ root: styles["product-shipping"] }}>Order today and get it shipped by {shippedDay}.</Typography>
										<Grid container direction="row" alignItems="center" classes={{ root: styles["button-group"] }}>
											<CustomButton type="underline" onClick={() => setShowSizeModal(true)}>
												Size Guide
											</CustomButton>
											<Divider orientation="vertical" classes={{ vertical: styles["divider-vertical"] }} />
											<CustomButton type="underline" onClick={() => router.push("/shipping-return")}>
												Shipping &amp; Return
											</CustomButton>
										</Grid>
									</Grid>
								</Grid>
							</Container>
						</div>
						<Box className="section-container">
							<Container maxWidth="lg">
								<Divider style={{ marginBottom: 40 }} />
								<Tabs className="tabs-desc" value={tabDesc} onChange={handleChangeTabDesc} centered>
									<Tab label="DESCRIPTION" disableRipple />
									{/* <Tab label="REVIEWS" disableRipple /> */}
								</Tabs>
								<div hidden={tabDesc !== 0}>
									{tabDesc === 0 ? (
										<>
											{productId === "40149" || productId === "40193" || productId === "40275" ? (
												<>
													<Banner backgroundImage={"../images/image-44@1x.png"} containerStyle={{ width: "100%", minHeight: 320, maxHeight: 320, left: 0 }}>
														<div className="section-grid-item-inner">
															<h3 className="banner-title">UNLIMITED COLORS, UNLIMITED CREATIVITY</h3>
														</div>
													</Banner>
													<Box className="section-container">
														{productId === "40149" ? (
															// 10x10
															<p className="section-desc-container-content">
																Let your own artwork and creativity speak for itself! Our custom printed 10x10 canopy packages offer the perfect solution for both commercial and recreational use with powerful and reliable, high quality
																outdoor coverings for exceptional brand marketing and personal promotions. Our custom printed 10x10 canopy is excellent for all kinds of outdoor gathering events including Beach Parties, Expos and Trade
																Shows, Farmers Markets, Picnics, Gardens, Patios, Team Sport Events, Business Gatherings, Community Centers, Live Demonstration Shows, Outdoor Dining, Graduation Celebrations, and more!
															</p>
														) : null}
														{productId === "40193" ? (
															// 10x15
															<p className="section-desc-container-content">
																Present your stunning visuals and displays with style! With our 10x15 outdoor canopy package, we offer the perfect marketing and recreational solution for all your outdoor and promotion activity with
																exceptional, high quality Westshade canopy units. Excellent for all kinds of outdoor gathering events including; Beach Parties, Expos and Trade Shows, Farmers Markets, Picnics, Team Sport Events, Business
																Gatherings, Community Centers, Live Demonstration Shows, Outdoor Dining, Graduation Celebrations, and more!
															</p>
														) : null}
														{productId === "40275" ? (
															// 10x20
															<p className="section-desc-container-content">
																Let your own artwork and creativity speak for itself! Our custom printed 10x20 canopy packages offer the perfect solution for both commercial and recreational use with powerful and reliable, high quality
																outdoor coverings for exceptional brand marketing and personal promotions. Our custom printed 10x20 canopy is excellent for all kinds of outdoor gathering events including Beach Parties, Expos and Trade
																Shows, Farmers Markets, Picnics, Gardens, Patios, Team Sport Events, Business Gatherings, Community Centers, Live Demonstration Shows, Outdoor Dining, Graduation Celebrations, and more!
															</p>
														) : null}
													</Box>
													<img style={{ objectFit: "contain", width: "100%" }} src="/images/comparison-y5y6y7.jpg" />
												</>
											) : null}
											<Box className="section-container">
												<Grid container spacing={6}>
													<Grid item xs={12} md={6} className="section-custom-printed-package-container">
														<div className="section-desc-container-title">Valance and Peek Display Packages</div>
														{productId === "40149" ? (
															<p className="section-desc-container-content">
																Design your own 10x10 custom canopy in anyway way you like! Choose from a variety of display options to help present your visuals and creativity in many ways. We offer 9 different 10x10 custom canopy
																combinations to help make your design stand out in front of your audiences! Have your images shown in the front, the back, both ways, the options are endless!
															</p>
														) : null}
														{productId === "40193" ? (
															<p className="section-desc-container-content">
																Design your own 10x15 custom canopy in anyway way you like! Choose from a variety of display options to help present your visuals and creativity in many ways. We offer 9 different 10x15 custom canopy
																combinations to help make your design stand out in front of your audiences! Have your images shown in the front, the back, both ways, the options are endless!
															</p>
														) : null}
														{productId === "40275" ? (
															<p className="section-desc-container-content">
																Design your own 10x20 custom canopy in anyway way you like! Choose from a variety of display options to help present your visuals and creativity in many ways. We offer 9 different 10x20 custom canopy
																combinations to help make your design stand out in front of your audiences! Have your images shown in the front, the back, both ways, the options are endless!
															</p>
														) : null}
														{productId === "40328" ? (
															<p className="section-desc-container-content">
																Design your own 16x16 custom canopy in anyway way you like! Choose from a variety of display options to help present your visuals and creativity in many ways. We offer 9 different 16x16 custom canopy
																combinations to help make your design stand out in front of your audiences! Have your images shown in the front, the back, both ways, the options are endless!
															</p>
														) : null}
														{productId === "40304" ? (
															<p className="section-desc-container-content">
																Design your own 13x13 custom canopy in anyway way you like! Choose from a variety of display options to help present your visuals and creativity in many ways. We offer 9 different 13x13 custom canopy
																combinations to help make your design stand out in front of your audiences! Have your images shown in the front, the back, both ways, the options are endless!
															</p>
														) : null}
														{productId === "40315" ? (
															<p className="section-desc-container-content">
																Design your own 13x20 custom canopy in anyway way you like! Choose from a variety of display options to help present your visuals and creativity in many ways. We offer 9 different 13x20 custom canopy
																combinations to help make your design stand out in front of your audiences! Have your images shown in the front, the back, both ways, the options are endless!
															</p>
														) : null}
														{productId === "40326" ? (
															<p className="section-desc-container-content">
																Design your own 13x26 custom canopy in anyway way you like! Choose from a variety of display options to help present your visuals and creativity in many ways. We offer 9 different 13x26 custom canopy
																combinations to help make your design stand out in front of your audiences! Have your images shown in the front, the back, both ways, the options are endless!
															</p>
														) : null}
														{productId === "40339" ? (
															<p className="section-desc-container-content">
																Design your own 20x20 custom canopy in anyway way you like! Choose from a variety of display options to help present your visuals and creativity in many ways. We offer 9 different 20x20 custom canopy
																combinations to help make your design stand out in front of your audiences! Have your images shown in the front, the back, both ways, the options are endless!
															</p>
														) : null}
													</Grid>
													<Grid item xs={12} md={6}>
														<img
															src="/images/valance-and-peak.png"
															style={{
																objectFit: "contain",
																width: "100%",
																maxHeight: 400,
															}}
														/>
													</Grid>
												</Grid>
											</Box>
											{productId === "40328" || productId === "40304" || productId === "40315" || productId === "40326" || productId === "40339" ? (
												<>
													<Box className="section-container">
														<div className="section-desc-container-title">Heavy Duty Aluminum Custom Y7 Canopy</div>
														<p className="section-desc-container-content" style={{ textAlign: "left", fontSize: "1rem" }}>
															The Y7 Aluminum Shelter, our signature canopy capable of hosting big gatherings and events in any weather environment. This heavy duty 13×26 aluminum pop up tent is the perfect fit for all marketing and
															recreational solution for all your outdoor and promotion activity, made out of exceptional high quality Westshade units.
														</p>
														<ul className="section-desc-container-content" style={{ textAlign: "left", fontSize: "1rem" }}>
															{productId === "40328" ? <li style={{ marginBottom: 8 }}>256 Square Feet of Shade</li> : null}
															{productId === "40304" ? <li style={{ marginBottom: 8 }}>169 Square Feet of Shade</li> : null}
															{productId === "40315" ? <li style={{ marginBottom: 8 }}>260 Square Feet of Shade</li> : null}
															{productId === "40326" ? <li style={{ marginBottom: 8 }}>338 Square Feet of Shade</li> : null}
															{productId === "40339" ? <li style={{ marginBottom: 8 }}>400 Square Feet of Shade</li> : null}
															<li style={{ marginBottom: 8 }}>Heavy Duty Aluminum Frame</li>
															<li style={{ marginBottom: 8 }}>Aluminum Reinforced Truss Bar and Connector</li>
															<li style={{ marginBottom: 8 }}>One Push Button System</li>
															<li style={{ marginBottom: 8 }}>Hexagon Shaped Structure Legs</li>
															<li style={{ marginBottom: 8 }}>Professional Cover Top blocking 99% UV Rays</li>
														</ul>
													</Box>
													<img style={{ objectFit: "contain", width: "100%" }} src="/images/frame-y7.jpg" />
													<Box className="section-container" style={{ paddingLeft: 0, paddingRight: 0 }}>
														<List>
															<ListItem className="background-light-blue">
																<ListItemText className="section-image-package-listItem-subtitle section-image-package-listItem-subtitle-wrap" primary={"Shade Sq Ft"} />
																{productId === "40328" ? <ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"256 sq. ft"} /> : null}
																{productId === "40304" ? <ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"169 sq. ft"} /> : null}
																{productId === "40315" ? <ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"260 sq. ft"} /> : null}
																{productId === "40326" ? <ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"338 sq. ft"} /> : null}
																{productId === "40339" ? <ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"400 sq. ft"} /> : null}
															</ListItem>
															<ListItem>
																<ListItemText className="section-image-package-listItem-subtitle section-image-package-listItem-subtitle-wrap" primary={"Material"} />
																<ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"Aluminum"} />
															</ListItem>
															<ListItem className="background-light-blue">
																<ListItemText className="section-image-package-listItem-subtitle section-image-package-listItem-subtitle-wrap" primary={"Height"} />
																<ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"5’2″ - 6’8″"} />
															</ListItem>
															<ListItem>
																<ListItemText className="section-image-package-listItem-subtitle section-image-package-listItem-subtitle-wrap" primary={"Shape"} />
																<ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"Hexagon"} />
															</ListItem>
															<ListItem className="background-light-blue">
																<ListItemText className="section-image-package-listItem-subtitle section-image-package-listItem-subtitle-wrap" primary={"Bracket Connector Material"} />
																<ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"Nylon"} />
															</ListItem>
															<ListItem>
																<ListItemText className="section-image-package-listItem-subtitle section-image-package-listItem-subtitle-wrap" primary={"Pole Thickness"} />
																<ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"1.8mm"} />
															</ListItem>
															<ListItem className="background-light-blue">
																<ListItemText className="section-image-package-listItem-subtitle section-image-package-listItem-subtitle-wrap" primary={"Pole Diameter"} />
																<ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"57mm"} />
															</ListItem>
															<ListItem>
																<ListItemText className="section-image-package-listItem-subtitle section-image-package-listItem-subtitle-wrap" primary={"Footpad Material"} />
																<ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"Heavy Duty Zinc Steel"} />
															</ListItem>
															<ListItem className="background-light-blue">
																<ListItemText className="section-image-package-listItem-subtitle section-image-package-listItem-subtitle-wrap" primary={"CPAI-84 Fire Retardant Certified "} />
																<ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"Yes"} />
															</ListItem>
														</List>
													</Box>
												</>
											) : null}
											<Box className="section-container">
												<img style={{ objectFit: "contain", width: "100%" }} src="/images/intro@1x.png" />
												<h3 className="section-title" style={{ fontSize: "1.25rem" }}>
													Frequently Asked Questions
												</h3>
												<CustomAccordion
													list={[
														{
															summary: "Q: Do you offer design services?",
															details: "A: Yes, Our talented and attentive art & design team is happy to help you as much or as little as you’d like in the overall design of your project.",
														},
														{
															summary: "Q: Will I receive a proof before print production begins?",
															details: "A: Yes. You will need to approve a digital proof for all custom-printed products prior to print production.",
														},
														{
															summary: "Q: Can I change my artwork once it has been approved and is in production?",
															details:
																"A: Once your custom-print has begun its production, we will be unable to recall any previously approved designs. We produce the design quickly after approval, so we ask that you finalize with our team prior to your design reaching production.",
														},
														{
															summary: "Q: Can I cancel my order?",
															details: "A: No. In order to get products into our client’s hands quickly, we begin production as soon as you give us approval. There are no cancellations or returns on any custom-printed products.",
														},
													]}
													square
												/>
											</Box>
											<Box className="section-container">
												<h3 className="section-title" style={{ fontSize: "1.25rem" }}>
													Your Design in Action
												</h3>
												<div
													style={{
														display: "flex",
														flexWrap: "wrap",
														justifyContent: "space-around",
														overflow: "scroll",
													}}
												>
													<ImageList style={{ flexWrap: "nowrap" }} rowHeight={280} cols={2.5}>
														{imageGallery.map((item, index) => (
															<ImageListItem key={index}>
																<img src={item.img} alt={item.title} />
															</ImageListItem>
														))}
													</ImageList>
												</div>
											</Box>
										</>
									) : null}
								</div>
							</Container>
						</Box>
					</>
				) : null}
				<Modal onClose={() => setShowPrintServiceModal(false)} show={showPrintServiceModal}>
					<Box className="popup-section">
						<Container maxWidth="md">
							<Grid container spacing={6}>
								<Grid item xs={12} sm={6}>
									<div className="popup-section-title">UV Printing</div>
									<p className="popup-section-content">Provides high resolution service that dries and strengthens onto your canopy in an instant</p>
									<Divider className="popup-divider" />
									<div className="popup-section-title gray">Fabric</div>
									<p className="popup-section-content gray">
										900D Polyester
										<br />
										360 gsm
									</p>
									<div className="popup-section-title gray">Ink</div>
									<p className="popup-section-content gray">Imported from Japan</p>
									<div className="popup-section-title gray">Endurance</div>
									<p className="popup-section-content gray">
										<span style={{ color: "#C01616" }}>2x-3x lifespan</span> of dye sublimation printing
									</p>
								</Grid>
								<Grid item xs={12} sm={6}>
									<div className="popup-section-title">Dye Sublimation Printing</div>
									<p className="popup-section-content">Transfers your picture onto the canopy fabric using a heat press printing technique</p>
									<Divider className="popup-divider" />
									<div className="popup-section-title gray">Fabric</div>
									<p className="popup-section-content gray">
										600D Polyester
										<br />
										288 gsm
									</p>
									<div className="popup-section-title gray">Ink</div>
									<p className="popup-section-content gray">Imported from Korea</p>
									<div className="popup-section-title gray">Endurance</div>
									<p className="popup-section-content gray">Keep long-term</p>
								</Grid>
							</Grid>
						</Container>
						{/* <CustomButton type="underline" onClick={() => router.push("/")}>
            LEARN MORE >>>
          </CustomButton> */}
					</Box>
				</Modal>
				<Modal onClose={() => setShowSizeModal(false)} show={showSizeModal}>
					<img className="popup-image" src="/images/tent-spec/choose-size.jpg" />
				</Modal>
				<Modal onClose={() => setShowGetQuote(false)} show={showGetQuote}>
					<Box className="popup-section" style={{ width: "auto" }}>
						<Container maxWidth="md">
							<Grid container spacing={6}>
								<Grid item xs={12} sm={6}>
									<div className="popup-section-title">At Westshade, We Offer Limitless Design Solution.</div>
									<img
										style={{
											width: 120,
											height: 120,
											objectFit: "contain",
											margin: "24px auto",
										}}
										src={"/images/tent-spec/customer-service.svg"}
									/>
									<div className="popup-section-title" style={{ fontSize: "1rem" }}>
										Call us for custom print consultation
									</div>
									<div className="section-checkout-container" style={{ justifyContent: "center", paddingTop: 24 }}>
										<Button
											variant="contained"
											className="contained-button-black"
											onClick={() => {
												let a = document.createElement("a");
												a.href = "tel:949-751-1070";
												a.click();
											}}
											disableRipple
										>
											(949)751-1070
										</Button>
									</div>
								</Grid>
								<Grid item xs={12} sm={6}>
									<form>
										<div className="section-quote-input">
											<TextField
												fullWidth
												label="Subject"
												required
												InputLabelProps={{
													shrink: true,
												}}
												defaultValue={quoteSubject}
												onChange={(event) => {
													setQuoteError(false);
													setQuoteSubject(event.target.value);
												}}
												error={!quoteSubject && quoteError}
											/>
										</div>
										<div className="section-quote-input" style={{ display: "flex" }}>
											<div style={{ paddingRight: 12 }}>
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
											<div style={{ paddingRight: 12 }}>
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
												label="Describe What You’re Looking For"
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
											<Button variant="contained" onClick={() => handleSendQuote()} disableRipple>
												Submit
											</Button>
										</div>
									</form>
								</Grid>
							</Grid>
						</Container>
					</Box>
				</Modal>
				<Modal show={showModal} onClose={() => setShowModal(false)} backgroundColor="rgb(237, 247, 237)">
					<Alert severity="success">
						<AlertTitle>Success</AlertTitle>
						Email has been sent successfully.
					</Alert>
				</Modal>
			</Box>
		</React.Fragment>
	);
}

Custom_printed_Package.getInitialProps = async (context) => {
	const { query } = context;
	const { id } = query;
	let product = null,
		component = [],
		variant = [];

	product = await utils.getProductByWooId(id);
	if (product.type === "simple") {
		component[0] = { ...product };
	} else if (product.type === "variable") {
		component[0] = { ...product };
		variant[0] = await utils.getVariantByWooProductId(id);
	}

	return {
		product: product,
		productComponent: component,
		productVariant: variant,
	};
};

export default withRouter(Custom_printed_Package);
