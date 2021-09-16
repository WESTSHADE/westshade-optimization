import React, { useEffect, useState } from "react";
import clsx from "clsx";

import { Box, Breadcrumbs, Container, Divider, Grid, List, ListItem, ListItemText, Tab, Tabs, Typography } from "@material-ui/core";

import Link from "next/link";
import { withRouter } from "next/router";

import styles from "../../styles/Product.module.scss";

import { DateFn, NumberFn, StringFn, UrlFn } from "../../utils/tools";
import Utils from "../../utils/utils";
import { EventEmitter } from "../../utils/events";

import CBreadcrumbs from "../../components/breadcrumbs";
import CContainer from "../../components/container";
import Checkout from "../../components/buttonGroup";
import CustomButton from "../../components/button";
import Modal from "../../components/modal";
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
const id_attribute_poleMaterial = 43;

const wallMap = new Map([
	[
		"type",
		[
			{ key: "full", value: "FW" },
			{ key: "half", value: "HW" },
			{ key: "mesh", value: "MW" },
			{ key: "pvc", value: "PW" },
			{ key: "rollup", value: "RW" },
		],
	],
	[
		"side",
		[
			{ key: 1, value: "A" },
			{ key: 2, value: "B" },
			{ key: 3, value: "C" },
			{ key: 4, value: "D" },
		],
	],
	[
		"size",
		[
			{ key: "10x10", value: "10" },
			{ key: "10x15", value: "15" },
			{ key: "10x20", value: "20" },
			{ key: "13x13", value: "13" },
			{ key: "13x20", value: "1320" },
			{ key: "13x26", value: "26" },
			{ key: "16x16", value: "16" },
			{ key: "20x20", value: "2020" },
		],
	],
	[
		"color",
		[
			{ key: "white", value: "WH" },
			{ key: "black", value: "BK" },
			{ key: "blue", value: "BU" },
			{ key: "green", value: "GN" },
			{ key: "red", value: "RD" },
			{ key: "yellow", value: "YE" },
		],
	],
]);
const selectionWallType = ["None", "Full", "Half", "Mesh", "PVC", "Rollup"];
const selectionColor = ["White", "Black", "Red", "Yellow", "Blue", "Green"];

let checkoutProductList = [];
function Canopy_Tent({ router, product, productComponent, productVariant }) {
	const [display, setDisplay] = useState(false);

	const [productId, setProductId] = useState("");
	const [productName, setProductName] = useState("");
	const [productType, setProductType] = useState("");
	const [productImage, setProductImage] = useState("");

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

	const [availableList, setAvailableList] = useState([
		{ id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true },
		{ id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true },
		{ id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true },
		{ id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true },
		{ id: "", status: false, quantity: 0, needed: 0, attribute: null, optional: true },
	]);

	////////////////////////////////////////

	const [showModal, setShowModal] = useState(false);

	const [wallPictures, setWallPictures] = useState(["", "", "", ""]);

	const [tab, setTab] = useState(0);
	const [tabDesc, setTabDesc] = useState(0);

	////////////////////////////////////////

	const setMainImage = (images) => {
		if (!images) return;

		if (Array.isArray(images)) {
			let url = images[0].src;
			url = url.replace(/^http:\/\/54\.212\.246\.17/i, "https://checkout.westshade.com");

			setProductImage(url);
		} else {
			let url = images.src;
			url = url.replace(/^http:\/\/54\.212\.246\.17/i, "https://checkout.westshade.com");

			setProductImage(url);
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
		// Part 2.5: Canopy Tent订制选项，根据Tent Size变更Wall Size
		if (id === id_attribute_canopySize) {
			let sizes = event.target.value.split("x");
			let wallPicturesList = [...wallPictures];
			selection.forEach((item, indexA) => {
				if (indexA === 0) return;
				item.forEach((attribute) => {
					if (attribute.id === id_attribute_wallSize) attribute.option = (indexA - 1) % 2 === 0 ? sizes[0] + "ft" : sizes[1] === "26" ? "13ft" : sizes[1] + "ft";
				});
				// 挑选出对应Wall Variant.
				let selectedWall = productVariant[indexA].filter((variant) => {
					if (!variant.attributes) return false;

					let equal = true;
					for (let i = 0; i < variant.attributes.length; i++) {
						if (variant.attributes[i].option.toLowerCase() !== item[i].option.toLowerCase()) {
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
			// 检查可用性
			if (variant.stock_status === "instock") {
				available[index] = {
					id: variant.id,
					status: true,
					quantity: variant.stock_quantity,
					needed: totalCount,
					attribute: variant.attributes,
					optional: product.composite_components[index].optional,
				};
			} else {
				available[index] = {
					id: variant.id,
					status: false,
					quantity: 0,
					needed: totalCount,
					attribute: variant.attributes,
					optional: product.composite_components[index].optional,
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

	const handleChangeTab = (event, newValue) => setTab(newValue);

	const handleChangeTabDesc = (event, newValue) => setTabDesc(newValue);

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

		let selectedAttrList = [];
		productComponent.map((component) => {
			let defaultAttr = [...component.default_attributes];

			if (component.id === id_product_wall) {
				defaultAttr.forEach((attr) => (attr.id === id_attribute_wallType ? (attr.option = "none") : null));
			}
			selectedAttrList.push(defaultAttr);
		});
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

		let wallPicturesList = [...wallPictures];

		let size = "";
		let series = productName.substring(0, 2).toUpperCase();

		selectedVariant.forEach((variant, index) => {
			if (!variant || !variant.attributes) {
				if (index > 0) wallPicturesList[index - 1] = "";
				return;
			}
			let color = variant.attributes.filter((attr) => attr.id === id_attribute_canopyColor)[0].option.toLowerCase();

			if (index === 0) {
				// 设置Frame图片
				size = variant.attributes.filter((attr) => attr.id === id_attribute_canopySize)[0].option.toUpperCase();
				const colorUrl = wallMap.get("color").find((w) => w.key === color).value;

				setMainImage({
					src: "/images/product/" + product.slug + "/frame/" + series + "-" + size + "-" + colorUrl + ".png",
				});
			} else {
				// 设置Wall图片
				let type = variant.attributes.filter((attr) => attr.id === id_attribute_wallType)[0].option.toLowerCase();
				const typeUrl = wallMap.get("type").find((w) => w.key === type).value;
				const sizeUrl = wallMap.get("size").find((w) => w.key === size.toLowerCase()).value;
				const colorUrl = wallMap.get("color").find((w) => w.key === color).value;
				const sideUrl = wallMap.get("side").find((w) => w.key === index).value;

				wallPicturesList[index - 1] = "/images/product/" + product.slug + "/wall/" + series + "-" + typeUrl + sizeUrl + colorUrl + "-" + sideUrl + ".png";
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
											{product.name}
										</Typography>
									</Breadcrumbs>
								) : null}
							</Container>
						</CBreadcrumbs>
						<div className={styles["container-page"]}>
							<Container maxWidth="lg">
								<Grid container spacing={6} style={{ position: "relative" }}>
									<Grid item xs={12} sm={6}>
										<div className={styles["container-product-image"]} style={{ paddingTop: "100%" }}>
											{productImage ? <img className={styles["product-image"]} src={productImage} /> : null}
											{wallPictures.map((pic, index) => {
												if (!pic) return;
												return <img key={index} className={styles["product-image"]} src={pic} />;
											})}
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
														.map((attribute, index) => (
															<div key={index} className={clsx(styles["container-product-section"], styles["b-b"])}>
																<Selections
																	label={
																		<div>
																			{"Choose your " + stringFn.replaceDash(attribute.name, 1) + ":"}
																			<Typography variant="inherit" display="block" classes={{ root: styles["product-selection-subtitle"] }}>
																				{attribute.id === id_attribute_canopyColor ? "Custom printing with your own design" : "Which size is right for you?"}
																			</Typography>
																		</div>
																	}
																	value={selectedAttribute[0] ? selectedAttribute[0][index].option.toLowerCase() : ""}
																	onChange={(event) => handleChangeRadio(event, 0, attribute.id)}
																	list={attribute.options}
																	id={attribute.id.toString()}
																/>
															</div>
														))
												: null}
											{productComponent && productComponent[0] ? (
												<div className={clsx(styles["container-product-section"], styles["b-b"])}>
													<Grid container direction="row" alignItems="center">
														<div>
															{"Choose your side walls:"}
															<Typography variant="inherit" display="block" classes={{ root: styles["product-selection-subtitle"] }}>
																{"Which size is right for you?"}
															</Typography>
														</div>
														<img className={styles["product-selection-label-image"]} src="/images/icon/front.png" />
													</Grid>
													<Tabs classes={{ root: styles["product-selection-wall-tabs"], indicator: styles["tabs-indicator"] }} value={tab} onChange={handleChangeTab}>
														{[
															{ label: "Wall A", image: "/images/icon/wall-a.png" },
															{ label: "Wall B", image: "/images/icon/wall-b.png" },
															{ label: "Wall C", image: "/images/icon/wall-c.png" },
															{ label: "Wall D", image: "/images/icon/wall-d.png" },
														].map((item, index) => (
															<Tab key={index} classes={{ root: styles["wall-tab"] }} label={item.label} icon={<img src={item.image} />} disableRipple />
														))}
													</Tabs>
													{[0, 1, 2, 3].map((index) => {
														return (
															<div key={index} hidden={tab !== index}>
																<Selections
																	value={selectedAttribute[index + 1] ? selectedAttribute[index + 1][0].option.toLowerCase() : ""}
																	onChange={(event) => handleChangeRadio(event, index + 1, id_attribute_wallType)}
																	list={selectionWallType}
																	id={id_attribute_wallType.toString()}
																/>
																<Selections
																	value={selectedAttribute[index + 1] ? selectedAttribute[index + 1][1].option.toLowerCase() : ""}
																	onChange={(event) => handleChangeRadio(event, index + 1, id_attribute_canopyColor)}
																	list={selectionColor}
																	id={id_attribute_canopyColor.toString()}
																/>
															</div>
														);
													})}
												</div>
											) : null}
										</div>
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
											<CustomButton type="underline" onClick={() => setShowModal(true)}>
												Size Guide
											</CustomButton>
											<Divider orientation="vertical" classes={{ vertical: styles["divider-vertical"] }} />
											<CustomButton type="underline" onClick={() => router.push("/shipping-return")}>
												Shipping &amp; Return
											</CustomButton>
										</Grid>
									</Grid>
								</Grid>
								<div>
									<Divider style={{ marginBottom: 40 }} />
									<Tabs classes={{ root: "tabs-desc" }} value={tabDesc} onChange={handleChangeTabDesc} centered>
										<Tab label="DESCRIPTION" disableRipple />
										{/* <Tab label="REVIEWS" disableRipple /> */}
									</Tabs>
									<div className={styles["container-description"]} hidden={tabDesc !== 0}>
										{tabDesc === 0 ? (
											<>
												<CContainer>
													{productId === "25649" ? (
														// Y5 Economic Canopy
														<Grid container spacing={6}>
															<Grid item xs={12} md={6}>
																<img src="/images/y5-display.png" style={{ objectFit: "contain", width: "100%" }} alt="y5-display" />
															</Grid>
															<Grid item xs={12} md={6} className={styles["container-content-ul"]}>
																<Typography variant="h5" paragraph={true}>
																	{" "}
																	<strong> Y5 Economic Canopy </strong>{" "}
																</Typography>
																<Typography component="span" classes={{ root: styles["section-content"] }} color="textSecondary" display="block" align="left" paragraph={true}>
																	Our Y5 economic canopy series is the best outdoor patio canopy for daily use.
																	<br />
																	Available in 3 sizes and 6 colors.
																	<br />
																	<br />
																	<ul>
																		<li>User-friendly design for 45 seconds setup with 2 people.</li>
																		<li>Steel made frame, zinc coated nuts and bolts, nylon bracket connectors.</li>
																		<li>Protective covers, tie down straps, and steel stakes with every purchase.</li>
																		<li>Instant pop up with one release button for 3 different heights adjustment from 5'2" to 6'8".</li>
																		<li>Perfect for everyday use on your patio, garden, or deck.</li>
																		<li>Comes with 1 year warranty.</li>
																	</ul>
																</Typography>
															</Grid>
														</Grid>
													) : productId === "24229" ? (
														// Y6 Commercial Canopy
														<Grid container spacing={6}>
															<Grid item xs={12} md={6}>
																<img src="/images/y6-display.jpg" style={{ objectFit: "contain", width: "100%" }} alt="y6-display" />
															</Grid>
															<Grid item xs={12} md={6} className={styles["container-content-ul"]}>
																<Typography variant="h5" paragraph={true}>
																	{" "}
																	<strong> Y6 Commercial Canopy </strong>{" "}
																</Typography>
																<Typography component="span" classes={{ root: styles["section-content"] }} color="textSecondary" display="block" align="left" paragraph={true}>
																	Our Y6 commercial canopy series is the ultimate solution for small business and multi families. Stronger but lighter.
																	<br />
																	Available in 3 sizes and 6 colors.
																	<br />
																	<br />
																	<ul>
																		<li>User-friendly design for 45 seconds setup with 2 people.</li>
																		<li>Aerospace grade hexagonal aluminum frame.</li>
																		<li>Protective Covers, Tie Down Straps, and Steel Stakes with Every Purchase.</li>
																		<li>Instant pop up with one release button for 3 different heights adjustment from 5’2″ to 6’8″.</li>
																		<li>Perfect for commercial use and daily use.</li>
																		<li>Comes with 5 years warranty.</li>
																	</ul>
																</Typography>
															</Grid>
														</Grid>
													) : productId === "25659" ? (
														// Y7 Heavy Duty
														<Grid container spacing={6}>
															<Grid item xs={12} md={6}>
																<img src="/images/y7-display.jpg" style={{ objectFit: "contain", width: "100%" }} alt="y7-display" />
															</Grid>
															<Grid item xs={12} md={6} className={styles["container-content-ul"]}>
																<Typography variant="h5" paragraph={true}>
																	{" "}
																	<strong> Y7 Heavy Duty </strong>{" "}
																</Typography>
																<Typography component="span" classes={{ root: styles["section-content"] }} color="textSecondary" display="block" align="left" paragraph={true}>
																	Our Y7 heavy duty canopy series is the best heavy-duty canopy on the market. Unbeatable strength and durability while staying lightweight. Ideal option for commercial use.
																	<br />
																	Available in 8 sizes and 6 colors.
																	<br />
																	<br />
																	<ul>
																		<li>User-friendly design for 45 seconds setup with 2 people.</li>
																		<li>Aerospace grade hexagonal aluminum frame.</li>
																		<li>Thicker and lager pole compared to the other two series.</li>
																		<li>Protective Covers, Tie Down Straps, and Steel Stakes with Every Purchase.</li>
																		<li>Instant pop up with one release button for 3 different heights adjustment from 5’2″ to 6’8″. .</li>
																		<li>Perfect for commercial use and all types of events.</li>
																		<li>Comes with 10 years warranty.</li>
																	</ul>
																</Typography>
															</Grid>
														</Grid>
													) : null}
												</CContainer>
												<CContainer>
													<List>
														<ListItem className="background-light-blue">
															<ListItemText className="section-image-package-listItem-subtitle section-image-package-listItem-subtitle-wrap" primary={"Shade Sq Ft"} />
															{productId === "25649" || productId === "24229" ? (
																<ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"100 sq. ft, 150 sq. ft, 200 sq. ft"} />
															) : null}
															{productId === "25659" ? (
																<ListItemText
																	className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap"
																	primary={"100 sq. ft, 150 sq. ft, 200 sq. ft, 169 sq. ft, 256 sq. ft, 260 sq. ft, 338 sq. ft, 400 sq. ft"}
																/>
															) : null}
														</ListItem>
														<ListItem>
															<ListItemText className="section-image-package-listItem-subtitle section-image-package-listItem-subtitle-wrap" primary={"Material"} />
															{productId === "25649" ? <ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"Steel"} /> : null}
															{productId === "24229" || productId === "25659" ? <ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"Aluminum"} /> : null}
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
															{productId === "25649" ? <ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"1.5mm"} /> : null}
															{productId === "24229" || productId === "25659" ? <ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"1.8mm"} /> : null}
														</ListItem>
														<ListItem className="background-light-blue">
															<ListItemText className="section-image-package-listItem-subtitle section-image-package-listItem-subtitle-wrap" primary={"Pole Diameter"} />
															{productId === "25649" ? <ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"45mm"} /> : null}
															{productId === "24229" || productId === "25659" ? <ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"57mm"} /> : null}
														</ListItem>
														<ListItem>
															<ListItemText className="section-image-package-listItem-subtitle section-image-package-listItem-subtitle-wrap" primary={"Footpad Material"} />
															{productId === "25649" ? <ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"Zinc Steel"} /> : null}
															{productId === "24229" || productId === "25659" ? <ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"Heavy Duty Zinc Steel"} /> : null}
														</ListItem>
														<ListItem className="background-light-blue">
															<ListItemText className="section-image-package-listItem-subtitle section-image-package-listItem-subtitle-wrap" primary={"CPAI-84 Fire Retardant Certified "} />
															<ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"Yes"} />
														</ListItem>
													</List>
												</CContainer>
												<CContainer>
													<img style={{ objectFit: "contain", width: "90%", maxWidth: 850 }} src="/images/intro@1x.png" alt="tent specs" />
												</CContainer>
											</>
										) : null}
									</div>
								</div>
							</Container>
						</div>
					</>
				) : null}
				<Modal show={showModal} onClose={() => setShowModal(false)}>
					<img className="popup-image" src="/images/tent-spec/choose-size.jpg" />
				</Modal>
			</Box>
		</React.Fragment>
	);
}

Canopy_Tent.getInitialProps = async (context) => {
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
	} else if (product.type === "composite") {
		component = await Promise.all(product.composite_components.map(({ default_option_id }) => utils.getProductByWooId(default_option_id)));
		// variant = await Promise.all(component.map(async ({ id }) => await utils.getVariantByWooProductId(id)));

		// component = await getProducts(product.composite_components);
		// variant = await getVariants(component);

		for (let index = 0; index < component.length; index++) {
			variant[index] = await utils.getVariantByWooProductId(component[index].id);
		}
	}

	return {
		product: product,
		productComponent: component,
		productVariant: variant,
	};
};

export default withRouter(Canopy_Tent);
