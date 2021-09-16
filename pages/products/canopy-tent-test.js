import React, { useEffect, useState, createRef } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { SketchPicker, SwatchesPicker } from "react-color";
import clsx from "clsx";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Tabs, Tab, FILL } from "baseui/tabs-motion";
import { Button, SIZE, KIND, SHAPE } from "baseui/button";
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import Search from "baseui/icon/search";
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton, SIZE as ModalSize, ROLE } from "baseui/modal";
import Delete from "baseui/icon/delete";
import ChevronDown from "baseui/icon/chevron-down";
import Upload from "baseui/icon/upload";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";

import Link from "next/link";
import { withRouter } from "next/router";

import { DateFn, NumberFn, StringFn, UrlFn } from "../../utils/tools";
import Utils from "../../utils/utils";
import { EventEmitter } from "../../utils/events";

import { Checkout } from "../../components/sections";
import { Modal as ModalT } from "../../components/surfacse";

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

const imageGallery = [
	{ original: "/images/rectangle-79-2@2x.png", thumbnail: "/images/rectangle-79-2@2x.png", thumbnailWidth: 60, thumbnailHeight: 60, originalClass: "originalClass", thumbnailClass: "thumbnailClass" },
	{ original: "/images/rectangle-80-7@2x.png", thumbnail: "/images/rectangle-80-7@2x.png", thumbnailWidth: 60, thumbnailHeight: 60, originalClass: "originalClass", thumbnailClass: "thumbnailClass" },
	{ original: "/images/rectangle-77-7@2x.png", thumbnail: "/images/rectangle-77-7@2x.png", thumbnailWidth: 60, thumbnailHeight: 60, originalClass: "originalClass", thumbnailClass: "thumbnailClass" },
	{ original: "/images/rectangle-77-8@2x.png", thumbnail: "/images/rectangle-77-8@2x.png", thumbnailWidth: 60, thumbnailHeight: 60, originalClass: "originalClass", thumbnailClass: "thumbnailClass" },
	{ original: "/images/rectangle-78-3@2x.png", thumbnail: "/images/rectangle-78-3@2x.png", thumbnailWidth: 60, thumbnailHeight: 60, originalClass: "originalClass", thumbnailClass: "thumbnailClass" },
	{ original: "/images/rectangle-78-4@2x.png", thumbnail: "/images/rectangle-78-4@2x.png", thumbnailWidth: 60, thumbnailHeight: 60, originalClass: "originalClass", thumbnailClass: "thumbnailClass" },
];

function Canopy_Tent({ router, product, productComponent, productVariant }) {
	const [display, setDisplay] = useState(false);
	const [displayTabs, setDisplayTabs] = useState(false);
	const [activeKey, setActiveKey] = React.useState(0);

	const [productId, setProductId] = useState("");
	const [productName, setProductName] = useState("");
	const [productType, setProductType] = useState("");
	const [productImage, setProductImage] = useState("");
	const [productImageGallery, setProductImageGallery] = useState([]);

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

	const [wallIsOpen, setWallIsOpen] = useState(false);
	const [printIsOpen, setPrintIsOpen] = useState(false);
	const [printColorIsOpen, setPrintColorIsOpen] = useState(false);

	////////////////////////////////////////

	const [css, theme] = useStyletron();

	// console.log(css);
	// console.log(theme);

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

	// const handleChangeTab = (event, newValue) => setTab(newValue);

	// const handleChangeTabDesc = (event, newValue) => setTabDesc(newValue);

	// useEffect(() => {
	// 	if (totalCount === 0) return;

	// 	checkProduct_getPrice();
	// }, [totalCount]);

	// useEffect(() => {
	// 	if (selectedVariant.length === 0) return;

	// 	checkoutProductList = [];

	// 	let available = true;
	// 	availableList.forEach((item, index) => {
	// 		if (!item || !available) return;
	// 		// 没货 直接返回
	// 		if (!item.status) {
	// 			if (!item.optional) {
	// 				available = false;
	// 				setMessage("Insufficient stock → " + productComponent[index].name);
	// 				return;
	// 			} else {
	// 				return;
	// 			}
	// 		}
	// 		// 有货 判定是否有明细
	// 		if (item.quantity) {
	// 			// 有明细 计算需求供给
	// 			if (item.needed > item.quantity) {
	// 				available = false;
	// 				setMessage("Insufficient stock → " + productComponent[index].name);
	// 				return;
	// 			}
	// 		}

	// 		const i = checkoutProductList.findIndex(({ id }) => id === item.id);
	// 		if (i === -1) {
	// 			const variation = item.attribute.map((attr) => ({
	// 				attribute: attr.name,
	// 				value: attr.option,
	// 			}));

	// 			checkoutProductList.push({
	// 				id: item.id,
	// 				quantity: item.needed,
	// 				variation: variation,
	// 			});
	// 		} else {
	// 			let needed = checkoutProductList[i].quantity + item.needed;
	// 			if (needed > item.quantity) {
	// 				checkoutProductList.splice(i, 1);
	// 				available = false;
	// 				setMessage("Insufficient stock → " + productComponent[index].name);
	// 				return;
	// 			} else {
	// 				checkoutProductList[i].quantity = needed;
	// 			}
	// 		}
	// 		setMessage("");
	// 	});

	// 	setAvailable(available);
	// }, [availableList]);

	// const updateCart = async () => {
	// 	const token = localStorage.getItem("token");
	// 	let cart = localStorage.getItem("cart");
	// 	cart = cart ? JSON.parse(cart) : cart;
	// 	let cl;

	// 	if (cart && Array.isArray(cart)) {
	// 		cl = [...cart];
	// 	} else {
	// 		cl = [];
	// 	}

	// 	setShowAddProgress(true);
	// 	if (token) {
	// 		let cartList = [];
	// 		let data = await utils.getUser(token);
	// 		let result = data.meta_data.filter((data) => data.key === "cart");
	// 		if (result.length > 0) {
	// 			if (result[0].value.length > 0) {
	// 				cartList = [...result[0].value];
	// 				cartList = cartList.concat([...checkoutProductList]);
	// 			} else {
	// 				cartList = [...checkoutProductList];
	// 			}
	// 		} else {
	// 			cartList = [...checkoutProductList];
	// 		}
	// 		cl = cl.concat([...cartList]);

	// 		// let newCartList = [];
	// 		// cartList.forEach((item, index) => {
	// 		//     const i = newCartList.findIndex((product) => product.id === item.id);
	// 		//     if (i === -1) {
	// 		//         newCartList.push(item);
	// 		//     } else {
	// 		//         newCartList[i].quantity = newCartList[i].quantity + item.quantity;
	// 		//     }
	// 		// })

	// 		let userData = {
	// 			meta_data: [
	// 				{
	// 					key: "cart",
	// 					value: cl,
	// 				},
	// 			],
	// 		};
	// 		utils.updateUser(token, userData).then((result) => {
	// 			setTimeout(() => setShowAddProgress(false), 500);

	// 			localStorage.setItem("cart", "");

	// 			EventEmitter.dispatch("updateBadge");
	// 			EventEmitter.dispatch("handleCart", true);
	// 		});
	// 	} else {
	// 		setTimeout(() => setShowAddProgress(false), 500);

	// 		cl = cl.concat([...checkoutProductList]);
	// 		cl = JSON.stringify(cl);
	// 		localStorage.setItem("cart", cl);

	// 		EventEmitter.dispatch("updateBadge");
	// 		EventEmitter.dispatch("handleCart", true);
	// 	}
	// };

	//////////////////////////////////////

	const [tabsRefs, setTabsRefs] = useState([]);
	const [value1, setValue1] = React.useState("1");
	const [value2, setValue2] = React.useState("1");
	const [value3, setValue3] = React.useState("1");

	useEffect(() => {
		console.log(product);
		console.log(productComponent);
		console.log(productVariant);

		setProductId(product.id.toString());
		setShippedDay(dateFn.getReceivedDay());

		setTabsRefs((tabsRefs) =>
			Array(3)
				.fill()
				.map((_, i) => tabsRefs[i] || createRef())
		);
	}, []);

	useEffect(() => {
		if (tabsRefs.length > 0) {
			setDisplayTabs(true);
		}
	}, [tabsRefs]);

	useEffect(() => {
		if (!product) return;

		setProductName(product.name);
		setProductType(product.type);

		if (product.hasOwnProperty("image")) {
			setMainImage([product.image]);
		} else if (product.hasOwnProperty("images")) {
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

				setMainImage([
					{
						src: "/images/product/" + product.slug + "/frame/" + series + "-" + size + "-" + colorUrl + ".png",
					},
				]);
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

	return (
		<React.Fragment>
			{/* 主屏部分 */}
			<Block height={"100vh"} paddingTop={["48px", "48px", "96px"]} display={"flex"} justifyContent={"center"} overflow={["scroll", "scroll", "hidden"]}>
				{/* 主要显示区域 */}
				<Block width={["100%", "480px", "100%"]} height={["auto", "auto", "100%"]} display={"flex"} flexDirection={["column", "column", "row"]}>
					{/* 图片区域 */}
					<Block flex={[0, 0, 1]} position={["unset", "unset", "relative"]} paddingRight={["16px", "16px", "0"]} paddingLeft={["16px", "16px", "24px"]}>
						<Block paddingTop={["0", "24px", "48px"]}>
							<ImageGallery showNav={false} items={productImageGallery} thumbnailPosition="left" showPlayButton={false} showFullscreenButton={false} />
						</Block>
						<Checkout />
					</Block>
					{/* 选择区域 */}
					<Block
						display={"flex"}
						flexDirection={"column"}
						width={["auto", "auto", "413px"]}
						paddingTop={"24px"}
						paddingRight={["16px", "16px", "24px"]}
						paddingBottom={["94px", "68px", "0"]}
						paddingLeft={["16px", "16px", "0"]}
						alignItems={"center"}
						overflow={["unset", "unset", "scroll"]}
					>
						<div style={{ fontSize: 20, fontWeight: "700", marginBottom: 16 }}>{product.name}</div>
						<div style={{ marginBottom: 20, padding: "8px 24px", width: 81, height: 32, backgroundColor: "#F2F2F2", borderRadius: 16, lineHeight: "initial" }}>Spec</div>
						{displayTabs ? (
							<Tabs
								activeKey={activeKey}
								onChange={({ activeKey }) => setActiveKey(activeKey)}
								fill={FILL.fixed}
								activateOnFocus
								overrides={{
									Root: {
										style: ({ $theme }) => ({ width: "100%" }),
									},
									TabList: {
										style: {
											"::-webkit-scrollbar": { display: "none" },
											overflowX: "scroll",
										},
									},
									TabBorder: {
										style: ({ $theme }) => ({ display: "none" }),
									},
									TabHighlight: {
										style: ({ $theme }) => ({
											left: tabsRefs[activeKey].current ? `${(tabsRefs[activeKey].current.clientWidth - 24) / 2}px` : 0,
											width: "24px",
											height: "6px",
											backgroundColor: "#23A4AD",
											borderRadius: "3px",
										}),
									},
								}}
							>
								<Tab
									title="Basic"
									overrides={{
										TabPanel: {
											style: ({ $theme }) => ({ paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 }),
										},
										Tab: {
											style: { ":hover": { background: "none" }, paddingTop: "8px", paddingBottom: "8px" },
										},
									}}
									tabRef={tabsRefs[0]}
								>
									<>
										<div className="container-selection">
											<div style={{ fontSize: 16, fontWeight: "500", marginBottom: 16 }}>Size</div>
											<RadioGroup
												value={selectedAttribute[0] ? selectedAttribute[0][1].option.toLowerCase() : ""}
												onChange={(event) => handleChangeRadio(event, 0, id_attribute_canopySize)}
												name="size"
												align={ALIGN.horizontal}
												overrides={{
													RadioGroupRoot: {
														style: () => ({ display: "grid", width: "100%", flexWrap: "wrap", gridTemplateColumns: "repeat(auto-fill, 30% )", justifyContent: "space-between" }),
													},
													Root: {
														style: ({ $checked }) => ({
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
														style: () => ({ display: "none" }),
													},
													RadioMarkInner: {
														style: () => ({ display: "none" }),
													},
													Label: {
														style: ({ $checked }) => ({ paddingLeft: 0, fontWeight: $checked ? "bold" : "500", fontSize: "14px", lineHeight: "20px" }),
													},
												}}
											>
												{productComponent && productComponent[0]
													? productComponent[0].attributes
															.filter((attribute) => attribute.id === id_attribute_canopySize && attribute.variation)
															.map((attribute) => {
																return attribute.options.map((option, index) => (
																	<Radio key={index} value={option.toLowerCase()}>
																		{option}
																	</Radio>
																));
															})
													: null}
											</RadioGroup>
											<div style={{ padding: "8px 24px", width: 119, height: 32, backgroundColor: "#F2F2F2", borderRadius: 16, lineHeight: "initial" }}>Size Guide</div>
										</div>
										<div className="container-selection">
											<div style={{ fontSize: 16, fontWeight: "500", marginBottom: 16 }}>Frame</div>
											<RadioGroup
												value={value2}
												onChange={(e) => setValue2(e.currentTarget.value)}
												name="frame"
												align={ALIGN.horizontal}
												overrides={{
													RadioGroupRoot: {
														style: ({ $theme }) => ({
															display: "grid",
															width: "100%",
															flexWrap: "wrap",
															gridTemplateColumns: "repeat(auto-fill, 100%)",
															justifyContent: "space-between",
														}),
													},
													Root: {
														style: ({ $theme, $checked }) => ({
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
														style: () => ({ display: "none" }),
													},
													RadioMarkInner: {
														style: () => ({ display: "none" }),
													},
													Label: {
														style: ({ $checked }) => ({ paddingLeft: 0, fontWeight: $checked ? "bold" : "500", fontSize: "14px", lineHeight: "20px" }),
													},
												}}
											>
												<Radio value="1">Y5 Economic Steel</Radio>
												<Radio value="2">Y6 Commercial Aluminum</Radio>
												<Radio value="3">Y7 Heavy Duty Aluminum</Radio>
											</RadioGroup>
											<div style={{ padding: "8px 24px", width: 163, height: 32, backgroundColor: "#F2F2F2", borderRadius: 16, lineHeight: "initial" }}>Compare Frames</div>
										</div>
										<div className="container-selection">
											<div style={{ fontSize: 16, fontWeight: "500", marginBottom: 16 }}>Color</div>
											<RadioGroup
												value={selectedAttribute[0] ? selectedAttribute[0][0].option.toLowerCase() : ""}
												onChange={(event) => handleChangeRadio(event, 0, id_attribute_canopyColor)}
												name="color"
												align={ALIGN.horizontal}
												overrides={{
													RadioGroupRoot: {
														style: ({ $theme }) => ({
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
														style: ({ $theme, $checked }) => ({
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
														style: ({ $theme }) => ({ display: "none" }),
													},
													RadioMarkInner: {
														style: ({ $theme }) => ({ display: "none" }),
													},
												}}
											>
												{productComponent && productComponent[0]
													? productComponent[0].attributes
															.filter((attribute) => attribute.id === id_attribute_canopyColor && attribute.variation)
															.map((attribute) => {
																return attribute.options.map((option, index) => (
																	<Radio
																		key={index}
																		value={option.toLowerCase()}
																		overrides={{
																			Label: ({ $value }) => <div style={{ width: "38px", height: "38px", borderRadius: "50%", backgroundColor: option, border: "1px solid #D9D9D9" }} />,
																		}}
																	/>
																));
															})
													: null}
											</RadioGroup>
											<div style={{ maxWidth: 315, lineHeight: "22px", fontSize: 14, marginBottom: "16px" }}>
												You can also print any color or any designs with our <span style={{ color: "#23A4AD" }}>cucstom printing</span> service
											</div>
											<Button
												shape={SHAPE.pill}
												overrides={{
													BaseButton: {
														style: ({ $theme }) => ({
															width: "100%",
															height: "52px",
															background: "linear-gradient(to left, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
															fontSize: "14px",
															lineHeight: "22px",
															color: "#262626",
															paddingTop: "3px",
															paddingRight: "3px",
															paddingBottom: "3px",
															paddingLeft: "3px",
															marginBottom: "64px",
														}),
													},
												}}
												onClick={() => setPrintIsOpen(true)}
											>
												<div
													style={{
														width: "100%",
														height: "100%",
														backgroundColor: "white",
														borderRadius: "38px",
														lineHeight: "46px",
													}}
												>
													Custom print my tent
												</div>
											</Button>
										</div>
									</>
								</Tab>
								<Tab
									title="+Wall"
									overrides={{
										TabPanel: {
											style: ({ $theme }) => ({ paddingRight: 0, paddingLeft: 0 }),
										},
										Tab: {
											style: { ":hover": { background: "none" }, paddingTop: "8px", paddingBottom: "8px" },
										},
									}}
									tabRef={tabsRefs[1]}
								>
									<ul
										className={css({
											paddingLeft: 0,
											paddingRight: 0,
										})}
									>
										<ListItem
											artwork={(props) => <img src="/images/icon/icon-wall-front.png" alt="icon-wall-front" />}
											overrides={{
												Root: {
													style: ({ $theme }) => ({
														height: "68px",
														paddingRight: "8px",
														paddingLeft: "8px",
														backgroundColor: "#F5FCFC",
													}),
												},
												Content: {
													style: ({ $theme }) => ({
														paddingRight: 0,
														paddingLeft: "12px",
													}),
												},
												ArtworkContainer: {
													style: ({ $theme }) => ({
														width: "44px",
														height: "44px",
													}),
												},
											}}
											endEnhancer={() => (
												<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
													<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
														<Button
															shape={SHAPE.pill}
															overrides={{
																BaseButton: {
																	style: ({ $theme }) => ({ width: "90px", height: "32px", backgroundColor: "#23A4AD", fontSize: "14px", lineHeight: "22px" }),
																},
															}}
															onClick={() => setWallIsOpen(true)}
														>
															Edit
														</Button>
														<Button
															kind={KIND.tertiary}
															shape={SHAPE.circle}
															overrides={{
																BaseButton: {
																	style: ({ $theme }) => ({ marginLeft: "17px", width: "20px", height: "20px", backgroundColor: "transparent" }),
																},
															}}
														>
															<Delete size={20} />
														</Button>
													</div>
												</div>
											)}
										>
											<ListItemLabel
												description="Left"
												overrides={{
													LabelContent: {
														style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", marginBottom: "4px" }),
													},
													LabelDescription: {
														style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", color: "#808080" }),
													},
												}}
											>
												Half wall <span style={{ color: "#8C8C8C", fontSize: "14px" }}>Plain</span>
											</ListItemLabel>
										</ListItem>
										<ListItem
											artwork={(props) => <img src="/images/icon/icon-wall-back.png" alt="icon-wall-back" />}
											overrides={{
												Root: {
													style: ({ $theme }) => ({
														height: "68px",
														paddingRight: "8px",
														paddingLeft: "8px",
													}),
												},
												Content: {
													style: ({ $theme }) => ({
														paddingRight: 0,
														paddingLeft: "12px",
													}),
												},
												ArtworkContainer: {
													style: ({ $theme }) => ({
														width: "44px",
														height: "44px",
													}),
												},
											}}
											endEnhancer={() => (
												<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
													<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
														<Button
															shape={SHAPE.pill}
															overrides={{
																BaseButton: {
																	style: ({ $theme }) => ({ width: "90px", height: "32px", backgroundColor: "#23A4AD", fontSize: "14px", lineHeight: "22px" }),
																},
															}}
															onClick={() => setWallIsOpen(true)}
														>
															Edit
														</Button>
														<Button
															kind={KIND.tertiary}
															shape={SHAPE.circle}
															overrides={{
																BaseButton: {
																	style: ({ $theme }) => ({ marginLeft: "17px", width: "20px", height: "20px", backgroundColor: "transparent" }),
																},
															}}
														>
															<Delete size={20} />
														</Button>
													</div>
												</div>
											)}
										>
											<ListItemLabel
												description="Left"
												overrides={{
													LabelContent: {
														style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", marginBottom: "4px" }),
													},
													LabelDescription: {
														style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", color: "#808080" }),
													},
												}}
											>
												Half wall <span style={{ color: "#8C8C8C", fontSize: "14px" }}>Plain</span>
											</ListItemLabel>
										</ListItem>
										<ListItem
											artwork={(props) => <img src="/images/icon/icon-wall-left.png" alt="icon-wall-left" />}
											overrides={{
												Root: {
													style: ({ $theme }) => ({
														height: "68px",
														paddingRight: "8px",
														paddingLeft: "8px",
													}),
												},
												Content: {
													style: ({ $theme }) => ({
														paddingRight: 0,
														paddingLeft: "12px",
													}),
												},
												ArtworkContainer: {
													style: ({ $theme }) => ({
														width: "44px",
														height: "44px",
													}),
												},
											}}
											endEnhancer={() => (
												<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
													<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
														<Button
															shape={SHAPE.pill}
															overrides={{
																BaseButton: {
																	style: ({ $theme }) => ({ width: "90px", height: "32px", backgroundColor: "#23A4AD", fontSize: "14px", lineHeight: "22px" }),
																},
															}}
															onClick={() => setWallIsOpen(true)}
														>
															Edit
														</Button>
														<Button
															kind={KIND.tertiary}
															shape={SHAPE.circle}
															overrides={{
																BaseButton: {
																	style: ({ $theme }) => ({ marginLeft: "17px", width: "20px", height: "20px", backgroundColor: "transparent" }),
																},
															}}
														>
															<Delete size={20} />
														</Button>
													</div>
												</div>
											)}
										>
											<ListItemLabel
												description="Left"
												overrides={{
													LabelContent: {
														style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", marginBottom: "4px" }),
													},
													LabelDescription: {
														style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", color: "#808080" }),
													},
												}}
											>
												Half wall <span style={{ color: "#8C8C8C", fontSize: "14px" }}>Plain</span>
											</ListItemLabel>
										</ListItem>
										<ListItem
											artwork={(props) => <img src="/images/icon/icon-wall-right.png" alt="icon-wall-right" />}
											overrides={{
												Root: {
													style: ({ $theme }) => ({
														height: "68px",
														paddingRight: "8px",
														paddingLeft: "8px",
													}),
												},
												Content: {
													style: ({ $theme }) => ({
														paddingRight: 0,
														paddingLeft: "12px",
													}),
												},
												ArtworkContainer: {
													style: ({ $theme }) => ({
														width: "44px",
														height: "44px",
													}),
												},
											}}
											endEnhancer={() => (
												<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
													<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
														<Button
															shape={SHAPE.pill}
															overrides={{
																BaseButton: {
																	// style: ({ $theme }) => ({ width: "72px", height: "32px", backgroundColor: "#23A4AD", fontSize: "14px", lineHeight: "22px" }),
																	style: ({ $theme }) => ({
																		width: "90px",
																		height: "32px",
																		backgroundColor: "white",
																		fontSize: "14px",
																		lineHeight: "22px",
																		color: "#8C8C8C",
																		borderTopWidth: "1px",
																		borderTopStyle: "dashed",
																		borderTopColor: "#8C8C8C",
																		borderRightWidth: "1px",
																		borderRightStyle: "dashed",
																		borderRightColor: "#8C8C8C",
																		borderBottomWidth: "1px",
																		borderBottomStyle: "dashed",
																		borderBottomColor: "#8C8C8C",
																		borderLeftWidth: "1px",
																		borderLeftStyle: "dashed",
																		borderLeftColor: "#8C8C8C",
																	}),
																},
															}}
															onClick={() => setWallIsOpen(true)}
														>
															{/* Edit */}
															+Add
														</Button>
														{/* <Button
															kind={KIND.tertiary}
															shape={SHAPE.circle}
															overrides={{
																BaseButton: {
																	style: ({ $theme }) => ({ marginLeft: "17px", width: "20px", height: "20px", backgroundColor: "transparent" }),
																},
															}}
														>
															<Delete size={20} />
														</Button> */}
													</div>
												</div>
											)}
										>
											<ListItemLabel
												description="Left"
												overrides={{
													LabelContent: {
														style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", marginBottom: "4px" }),
													},
													LabelDescription: {
														style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", color: "#808080" }),
													},
												}}
											>
												Half wall
												{/* <span style={{ color: "#8C8C8C", fontSize: "14px" }}>Plain</span> */}
											</ListItemLabel>
										</ListItem>
									</ul>
								</Tab>
								<Tab
									title="+Accessory"
									overrides={{
										TabPanel: {
											style: ({ $theme }) => ({ paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 }),
										},
										Tab: {
											style: { ":hover": { background: "none" }, paddingTop: "8px", paddingBottom: "8px" },
										},
									}}
									tabRef={tabsRefs[2]}
								>
									<>
										<div style={{ display: "flex", flexDirection: "column", paddingTop: "32px", textAlign: "center", alignItems: "center" }}>
											<div style={{ fontSize: 16, fontWeight: "500", marginBottom: 16 }}>For production</div>
											<RadioGroup
												value={value3}
												onChange={(event) => setValue3(event.target.value)}
												name="slide"
												align={ALIGN.horizontal}
												overrides={{
													RadioGroupRoot: {
														style: ({ $theme }) => ({
															display: "grid",
															width: "100%",
															flexWrap: "wrap",
															justifyContent: "space-between",
															gridTemplateColumns: "repeat(auto-fill, 50%)",
														}),
													},
													Root: {
														style: ({ $checked }) => ({
															height: "162px",
															justifyContent: "center",
															padding: $checked ? "4px 0" : "6px 0",
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
														style: () => ({ display: "none" }),
													},
													RadioMarkInner: {
														style: () => ({ display: "none" }),
													},
													Label: {
														style: ({ $checked }) => ({ paddingLeft: 0, fontWeight: $checked ? "bold" : "500", fontSize: "14px", lineHeight: "22px" }),
													},
												}}
											>
												<Radio
													value={"1"}
													overrides={{
														Label: ({ $value }) => (
															<div style={{ position: "relative" }}>
																<img style={{ height: 80, width: 80, objectFit: "contain", marginBottom: 4 }} src="/images/icon/wall-pvc.png" />
																<div style={{ fontSize: 14, lineHeight: "14px", fontWeight: "500", marginBottom: 6 }}>Wheeled cover</div>
																<div style={{ fontSize: 12, lineHeight: "12px", marginBottom: 6 }}>+ $94</div>
																<Button
																	size={SIZE.mini}
																	kind={KIND.minimal}
																	overrides={{
																		BaseButton: {
																			style: ({ $theme }) => ({
																				height: "20px",
																				fontSize: "12px",
																				lineHeight: "20px",
																				color: "#23A4AD",
																			}),
																		},
																	}}
																>
																	Add to cart
																</Button>
															</div>
														),
													}}
												/>
											</RadioGroup>
											<div style={{ marginBottom: 20 }} />
										</div>
										<div style={{ display: "flex", flexDirection: "column", paddingTop: "32px", textAlign: "center", alignItems: "center" }}>
											<div style={{ fontSize: 16, fontWeight: "500", marginBottom: 16 }}>For stabilization</div>
											<RadioGroup
												value={value3}
												onChange={(event) => setValue3(event.target.value)}
												name="slide"
												align={ALIGN.horizontal}
												overrides={{
													RadioGroupRoot: {
														style: ({ $theme }) => ({
															display: "grid",
															width: "100%",
															flexWrap: "wrap",
															justifyContent: "space-between",
															gridTemplateColumns: "repeat(auto-fill, 50%)",
														}),
													},
													Root: {
														style: ({ $checked }) => ({
															height: "162px",
															justifyContent: "center",
															padding: $checked ? "4px 0" : "6px 0",
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
														style: () => ({ display: "none" }),
													},
													RadioMarkInner: {
														style: () => ({ display: "none" }),
													},
													Label: {
														style: ({ $checked }) => ({ paddingLeft: 0, fontWeight: $checked ? "bold" : "500", fontSize: "14px", lineHeight: "22px" }),
													},
												}}
											>
												<Radio
													value={"1"}
													overrides={{
														Label: ({ $value }) => (
															<div style={{ position: "relative" }}>
																<img style={{ height: 80, width: 80, objectFit: "contain", marginBottom: 4 }} src="/images/icon/wall-pvc.png" />
																<div style={{ fontSize: 14, lineHeight: "14px", fontWeight: "500", marginBottom: 6 }}>Water weight</div>
																<div style={{ fontSize: 12, lineHeight: "12px", marginBottom: 6 }}>+ $94 each</div>
																<Button
																	size={SIZE.mini}
																	kind={KIND.minimal}
																	overrides={{
																		BaseButton: {
																			style: ({ $theme }) => ({
																				height: "20px",
																				fontSize: "12px",
																				lineHeight: "20px",
																				color: "#23A4AD",
																			}),
																		},
																	}}
																>
																	Add to cart
																</Button>
															</div>
														),
													}}
												/>
											</RadioGroup>
											<div style={{ marginBottom: 20 }} />
										</div>
									</>
								</Tab>
							</Tabs>
						) : null}
					</Block>
				</Block>
				<ModalT />
				<Modal
					onClose={() => setWallIsOpen(false)}
					isOpen={wallIsOpen}
					animate
					autoFocus
					size={ModalSize.full}
					role={ROLE.dialog}
					overrides={{
						Root: {
							style: ({ $theme }) => ({
								zIndex: "99",
								height: "100vh",
								paddingTop: "24px",
								overflowY: "hidden",
							}),
							props: {
								className: "modalRoot",
							},
						},
						DialogContainer: {
							style: ({ $theme }) => ({
								height: "100%",
							}),
						},
						Dialog: {
							props: { className: "modalDialog" },
						},
						Close: {
							style: () => ({ top: "29px", right: "29px" }),
						},
					}}
				>
					<ModalBody className="modalSelectionContainer">
						<Block width={["100%", "480px", "100%"]} height={["auto", "auto", "100%"]} display={"flex"} flexDirection={["column", "column", "row"]} marginLeft={"auto"} marginRight={"auto"} overflow={["scroll", "scroll", "hidden"]}>
							{/* 图片区域 */}
							<Block flex={[0, 0, 1]} position={"relative"} className={"modalGallery"} paddingRight={["16px", "52px", "0"]} paddingLeft={["16px", "52px", "64px"]}>
								<ImageGallery showNav={false} items={[productImageGallery[0]]} showPlayButton={false} showFullscreenButton={false} />
							</Block>
							<Block
								display={"flex"}
								flexDirection={"column"}
								width={["100%", "100%", "424px"]}
								paddingTop={["24px", "24px", "40px"]}
								paddingRight={["16px", "52px", "64px"]}
								paddingLeft={["16px", "52px", "0"]}
								alignItems={"center"}
								overflow={["unset", "unset", "scroll"]}
							>
								<div style={{ display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center", width: "100%" }}>
									<div style={{ fontSize: 16, fontWeight: "500", marginBottom: 16 }}>Wall type</div>
									<RadioGroup
										value={value3}
										onChange={(event) => setValue3(event.target.value)}
										name="slide"
										align={ALIGN.horizontal}
										overrides={{
											RadioGroupRoot: {
												style: ({ $theme }) => ({
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
												style: ({ $checked }) => ({
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
												style: () => ({ display: "none" }),
											},
											RadioMarkInner: {
												style: () => ({ display: "none" }),
											},
											Label: {
												style: ({ $checked }) => ({ paddingLeft: 0, fontWeight: $checked ? "bold" : "500", fontSize: "14px", lineHeight: "22px" }),
											},
										}}
									>
										<Radio
											value={"1"}
											overrides={{
												Label: ({ $value }) => (
													<div style={{ position: "relative" }}>
														<Button
															kind={KIND.tertiary}
															shape={SHAPE.circle}
															overrides={{
																BaseButton: {
																	style: ({ $theme }) => ({
																		position: "absolute",
																		right: "-12px",
																		top: "-12px",
																		width: "12px",
																		height: "12px",
																		borderTopWidth: "1px",
																		borderTopStyle: "solid",
																		borderTopColor: "#B2B2B2",
																		borderRightWidth: "1px",
																		borderRightStyle: "solid",
																		borderRightColor: "#B2B2B2",
																		borderBottomWidth: "1px",
																		borderBottomStyle: "solid",
																		borderBottomColor: "#B2B2B2",
																		borderLeftWidth: "1px",
																		borderLeftStyle: "solid",
																		borderLeftColor: "#B2B2B2",
																		fontSize: "10px",
																		color: "#B2B2B2",
																	}),
																},
															}}
														>
															?
														</Button>
														<img style={{ height: 39, width: 39, objectFit: "contain", marginBottom: 27 }} src="/images/icon/wall-pvc.png" />
														<div>PVC</div>
													</div>
												),
											}}
										/>
										<Radio
											value={"2"}
											overrides={{
												Label: ({ $value }) => (
													<div style={{ position: "relative" }}>
														<Button
															kind={KIND.tertiary}
															shape={SHAPE.circle}
															overrides={{
																BaseButton: {
																	style: ({ $theme }) => ({
																		position: "absolute",
																		right: "-12px",
																		top: "-12px",
																		width: "12px",
																		height: "12px",
																		borderTopWidth: "1px",
																		borderTopStyle: "solid",
																		borderTopColor: "#B2B2B2",
																		borderRightWidth: "1px",
																		borderRightStyle: "solid",
																		borderRightColor: "#B2B2B2",
																		borderBottomWidth: "1px",
																		borderBottomStyle: "solid",
																		borderBottomColor: "#B2B2B2",
																		borderLeftWidth: "1px",
																		borderLeftStyle: "solid",
																		borderLeftColor: "#B2B2B2",
																		fontSize: "10px",
																		color: "#B2B2B2",
																	}),
																},
															}}
														>
															?
														</Button>
														<img style={{ height: 39, width: 39, objectFit: "contain", marginBottom: 27 }} src="/images/icon/wall-mesh.png" />
														<div>Mesh</div>
													</div>
												),
											}}
										/>
										<Radio
											value={"3"}
											overrides={{
												Label: ({ $value }) => (
													<div style={{ position: "relative" }}>
														<Button
															kind={KIND.tertiary}
															shape={SHAPE.circle}
															overrides={{
																BaseButton: {
																	style: ({ $theme }) => ({
																		position: "absolute",
																		right: "-12px",
																		top: "-12px",
																		width: "12px",
																		height: "12px",
																		borderTopWidth: "1px",
																		borderTopStyle: "solid",
																		borderTopColor: "#B2B2B2",
																		borderRightWidth: "1px",
																		borderRightStyle: "solid",
																		borderRightColor: "#B2B2B2",
																		borderBottomWidth: "1px",
																		borderBottomStyle: "solid",
																		borderBottomColor: "#B2B2B2",
																		borderLeftWidth: "1px",
																		borderLeftStyle: "solid",
																		borderLeftColor: "#B2B2B2",
																		fontSize: "10px",
																		color: "#B2B2B2",
																	}),
																},
															}}
														>
															?
														</Button>
														<img style={{ height: 39, width: 39, objectFit: "contain", marginBottom: 27 }} src="/images/icon/wall-rollup.png" />
														<div>Roll-up</div>
													</div>
												),
											}}
										/>
										<Radio
											value={"4"}
											overrides={{
												Label: ({ $value }) => (
													<div style={{ position: "relative" }}>
														<Button
															kind={KIND.tertiary}
															shape={SHAPE.circle}
															overrides={{
																BaseButton: {
																	style: ({ $theme }) => ({
																		position: "absolute",
																		right: "-12px",
																		top: "-12px",
																		width: "12px",
																		height: "12px",
																		borderTopWidth: "1px",
																		borderTopStyle: "solid",
																		borderTopColor: "#B2B2B2",
																		borderRightWidth: "1px",
																		borderRightStyle: "solid",
																		borderRightColor: "#B2B2B2",
																		borderBottomWidth: "1px",
																		borderBottomStyle: "solid",
																		borderBottomColor: "#B2B2B2",
																		borderLeftWidth: "1px",
																		borderLeftStyle: "solid",
																		borderLeftColor: "#B2B2B2",
																		fontSize: "10px",
																		color: "#B2B2B2",
																	}),
																},
															}}
														>
															?
														</Button>
														<img style={{ height: 39, width: 39, objectFit: "contain", marginBottom: 27 }} src="/images/icon/wall-half.png" />
														<div>Half</div>
													</div>
												),
											}}
										/>
										<Radio
											value={"5"}
											overrides={{
												Label: ({ $value }) => (
													<div style={{ position: "relative" }}>
														<Button
															kind={KIND.tertiary}
															shape={SHAPE.circle}
															overrides={{
																BaseButton: {
																	style: ({ $theme }) => ({
																		position: "absolute",
																		right: "-12px",
																		top: "-12px",
																		width: "12px",
																		height: "12px",
																		borderTopWidth: "1px",
																		borderTopStyle: "solid",
																		borderTopColor: "#B2B2B2",
																		borderRightWidth: "1px",
																		borderRightStyle: "solid",
																		borderRightColor: "#B2B2B2",
																		borderBottomWidth: "1px",
																		borderBottomStyle: "solid",
																		borderBottomColor: "#B2B2B2",
																		borderLeftWidth: "1px",
																		borderLeftStyle: "solid",
																		borderLeftColor: "#B2B2B2",
																		fontSize: "10px",
																		color: "#B2B2B2",
																	}),
																},
															}}
														>
															?
														</Button>
														<img style={{ height: 39, width: 39, objectFit: "contain", marginBottom: 27 }} src="/images/icon/wall-full.png" />
														<div>Full</div>
													</div>
												),
											}}
										/>
									</RadioGroup>
									<div style={{ marginBottom: 20 }} />
								</div>
								<div style={{ display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center", width: "100%", marginBottom: "64px" }}>
									<div style={{ fontSize: 16, fontWeight: "500", marginBottom: 16 }}>Color</div>
									<RadioGroup
										value={selectedAttribute[1] ? selectedAttribute[1][1].option.toLowerCase() : ""}
										onChange={(event) => handleChangeRadio(event, 0, id_attribute_canopyColor)}
										name="color"
										align={ALIGN.horizontal}
										overrides={{
											RadioGroupRoot: {
												style: ({ $theme }) => ({
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
												style: ({ $theme, $checked }) => ({
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
												style: ({ $theme }) => ({ display: "none" }),
											},
											RadioMarkInner: {
												style: ({ $theme }) => ({ display: "none" }),
											},
										}}
									>
										{productComponent && productComponent[1]
											? productComponent[1].attributes
													.filter((attribute) => attribute.id === id_attribute_canopyColor && attribute.variation)
													.map((attribute) => {
														return attribute.options.map((option, index) => (
															<Radio
																key={index}
																value={option.toLowerCase()}
																overrides={{
																	Label: ({ $value }) => <div style={{ width: "38px", height: "38px", borderRadius: "50%", backgroundColor: option, border: "1px solid #D9D9D9" }} />,
																}}
															/>
														));
													})
											: null}
									</RadioGroup>
									<div style={{ marginBottom: 20, maxWidth: 315, lineHeight: "22px", fontSize: 14 }}>
										You can also print any color or any designs with our <span style={{ color: "#23A4AD" }}>cucstom printing</span> service
									</div>
									<Button
										kind={KIND.minimal}
										shape={SHAPE.pill}
										overrides={{
											BaseButton: {
												style: ({ $theme }) => ({
													width: "100%",
													height: "52px",
													fontSize: "14px",
													color: "#262626",
													paddingTop: "3px",
													paddingRight: "3px",
													paddingBottom: "3px",
													paddingLeft: "3px",
													marginBottom: "24px",
													borderTopWidth: "3px",
													borderTopStyle: "solid",
													borderTopColor: "#23A4AD",
													borderRightWidth: "3px",
													borderRightStyle: "solid",
													borderRightColor: "#23A4AD",
													borderBottomWidth: "3px",
													borderBottomStyle: "solid",
													borderBottomColor: "#23A4AD",
													borderLeftWidth: "3px",
													borderLeftStyle: "solid",
													borderLeftColor: "#23A4AD",
													backgroundColor: "transparent",
												}),
											},
										}}
										endEnhancer={() => <ChevronDown size={24} />}
										onClick={() => setWallIsOpen(true)}
									>
										Custom print my tent
									</Button>
									<>
										<div style={{ display: "flex", flexDirection: "column", width: "100%", marginBottom: "36px" }}>
											<div style={{ fontSize: 16, fontWeight: "500", marginBottom: 16, textAlign: "left" }}>Background Color</div>
											<RadioGroup
												value={"custom"}
												onChange={() => {}}
												name="color"
												align={ALIGN.horizontal}
												overrides={{
													RadioGroupRoot: {
														style: ({ $theme }) => ({
															display: "flex",
															width: "100%",
															flexWrap: "wrap",
															justifyContent: "flex-start",
															gridTemplateColumns: "auto auto auto auto auto auto",
														}),
														props: {
															className: "radioGroupColor",
														},
													},
													Root: {
														style: ({ $theme, $checked }) => ({
															width: "44px",
															height: "44px",
															justifyContent: "center",
															padding: $checked ? "9px" : "11px",
															border: $checked ? "3px solid #23A4AD" : "1px solid transparent",
															boxSizing: "border-box",
															borderRadius: "16px",
															marginTop: 0,
															marginRight: "8px",
															marginBottom: "16px",
															marginLeft: "0",
														}),
													},
													RadioMarkOuter: {
														style: ({ $theme }) => ({ display: "none" }),
													},
													RadioMarkInner: {
														style: ({ $theme }) => ({ display: "none" }),
													},
												}}
											>
												{productComponent && productComponent[1]
													? productComponent[1].attributes
															.filter((attribute) => attribute.id === id_attribute_canopyColor && attribute.variation)
															.map((attribute) => {
																return attribute.options.map((option, index) => (
																	<Radio
																		key={index}
																		value={option.toLowerCase()}
																		overrides={{
																			Label: ({ $value }) => <div style={{ width: "20px", height: "20px", borderRadius: "8px", backgroundColor: option, border: "1px solid #D9D9D9" }} />,
																		}}
																	/>
																));
															})
													: null}
												<Radio
													value={"custom"}
													overrides={{
														Root: {
															style: ({ $theme, $checked }) => ({
																width: "100%",
																height: "44px",
																justifyContent: "flex-start",
																marginTop: "0",
																marginRight: "0",
																marginBottom: "16px",
																marginLeft: "0",
															}),
														},
														Label: ({ $value, $checked }) => (
															<div
																style={{
																	display: "flex",
																	flexDirection: "row",
																	boxSizing: "border-box",
																	borderRadius: "16px",
																	alignContent: "center",
																	padding: $checked ? "9px" : "11px",
																	border: $checked ? "3px solid #23A4AD" : "1px solid transparent",
																}}
															>
																<div
																	style={{
																		width: "20px",
																		height: "20px",
																		borderRadius: "8px",
																		background: "linear-gradient(to left, rgb(184, 39, 252) 0%, rgb(44, 144, 252) 25%, rgb(184, 253, 51) 50%, rgb(254, 200, 55) 75%, rgb(253, 24, 146) 100%)",
																		border: "1px solid #D9D9D9",
																	}}
																/>
																<span style={{ marginLeft: "10px" }}>Custom</span>
															</div>
														),
													}}
												/>
											</RadioGroup>
											{/* <SwatchesPicker /> */}
											<div style={{ position: "relative" }}>
												<div
													style={{
														whiteSpace: "nowrap",
														display: "flex",
														flexDirection: "row",
														justifyContent: "flex-start",
														alignItems: "center",
														marginBottom: "4px",
														color: "#262626",
														fontSize: "14px",
														lineHeight: "22px",
													}}
												>
													<div style={{ width: "116px", textAlign: "left" }}>Pantone Color</div>
													<Input
														value={""}
														onChange={(e) => {}}
														placeholder="Controlled Input"
														overrides={{
															Root: {
																style: ({ $theme }) => ({
																	marginLeft: "20px",
																	borderTopRightRadius: "8px",
																	borderTopLeftRadius: "8px",
																	borderBottomRightRadius: "8px",
																	borderBottomLeftRadius: "8px",
																	// maxWidth: "240px",
																}),
															},
															Input: {
																style: ({ $theme }) => ({
																	fontSize: "14px",
																	lineHeight: "22px",
																	"::placeholder": { color: "#BFBFBF" },
																}),
															},
														}}
													/>
												</div>
												<div style={{ fontSize: "12px", lineHeight: "20px", color: "#23a4ad", textAlign: "right" }}>
													<a target="_blank" href="https://www.pantone.com/color-finder" rel="noopener noreferrer">
														Go to "Pantone Color Finder"
													</a>
												</div>
											</div>
										</div>
										<div style={{ display: "flex", flexDirection: "column", width: "100%", marginBottom: "36px" }}>
											<div style={{ fontSize: 16, fontWeight: "500", marginBottom: 16, textAlign: "left" }}>Image</div>
											<ul
												className={css({
													paddingLeft: 0,
													paddingRight: 0,
												})}
											>
												<ListItem
													artwork={(props) => <img src="/images/icon/icon-wall-front.png" alt="icon-wall-front" />}
													overrides={{
														Root: {
															style: ({ $theme }) => ({
																height: "68px",
																paddingRight: "8px",
																paddingLeft: "8px",
																backgroundColor: "transparent",
																marginBottom: "16px",
															}),
														},
														Content: {
															style: ({ $theme }) => ({
																paddingRight: 0,
																paddingLeft: "12px",
																borderBottomWidth: 0,
															}),
														},
														ArtworkContainer: {
															style: ({ $theme }) => ({
																width: "44px",
																height: "44px",
															}),
														},
													}}
													endEnhancer={() => (
														<Button
															kind={KIND.tertiary}
															shape={SHAPE.circle}
															overrides={{
																BaseButton: {
																	style: ({ $theme }) => ({ marginLeft: "17px", width: "20px", height: "20px", backgroundColor: "transparent" }),
																},
															}}
														>
															<Delete size={20} />
														</Button>
													)}
												>
													<ListItemLabel
														description="Left"
														overrides={{
															LabelContent: {
																style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", marginBottom: "4px" }),
															},
															LabelDescription: {
																style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", color: "#808080", textAlign: "left" }),
															},
														}}
													>
														Half wall
													</ListItemLabel>
												</ListItem>
											</ul>
											<Button
												kind={KIND.minimal}
												shape={SHAPE.pill}
												overrides={{
													BaseButton: {
														style: ({ $theme }) => ({
															width: "100%",
															height: "44px",
															fontSize: "14px",
															color: "#D9D9D9",
															marginBottom: "24px",
															borderTopWidth: "1px",
															borderTopStyle: "dashed",
															borderTopColor: "#D9D9D9",
															borderRightWidth: "1px",
															borderRightStyle: "dashed",
															borderRightColor: "#D9D9D9",
															borderBottomWidth: "1px",
															borderBottomStyle: "dashed",
															borderBottomColor: "#D9D9D9",
															borderLeftWidth: "1px",
															borderLeftStyle: "dashed",
															borderLeftColor: "#D9D9D9",
															backgroundColor: "transparent",
														}),
													},
												}}
												startEnhancer={() => <Upload size={24} color={"#D9D9D9"} />}
												onClick={() => setWallIsOpen(false)}
											>
												Upload Image
											</Button>
										</div>
										<div style={{ display: "flex", flexDirection: "column", width: "100%", marginBottom: "36px" }}>
											<div style={{ fontSize: 16, fontWeight: "500", marginBottom: 16, textAlign: "left" }}>Text</div>

											<div style={{ position: "relative" }}>
												<div style={{ whiteSpace: "nowrap", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: "16px", color: "#262626", fontSize: "14px", lineHeight: "22px" }}>
													<div style={{ width: "74px", textAlign: "left" }}>Content</div>
													<Input
														value={""}
														onChange={(e) => {}}
														placeholder="What do you want to print"
														overrides={{
															Root: {
																style: ({ $theme }) => ({
																	marginLeft: "20px",
																	borderTopRightRadius: "8px",
																	borderTopLeftRadius: "8px",
																	borderBottomRightRadius: "8px",
																	borderBottomLeftRadius: "8px",
																}),
															},
															Input: {
																style: ({ $theme }) => ({
																	fontSize: "14px",
																	lineHeight: "22px",
																	"::placeholder": { color: "#BFBFBF" },
																}),
															},
														}}
													/>
												</div>
												<div style={{ whiteSpace: "nowrap", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: "16px", color: "#262626", fontSize: "14px", lineHeight: "22px" }}>
													<div style={{ width: "74px", textAlign: "left" }}>Font</div>
													<Input
														value={""}
														onChange={(e) => {}}
														placeholder="e.g. Roboto"
														overrides={{
															Root: {
																style: ({ $theme }) => ({
																	marginLeft: "20px",
																	borderTopRightRadius: "8px",
																	borderTopLeftRadius: "8px",
																	borderBottomRightRadius: "8px",
																	borderBottomLeftRadius: "8px",
																}),
															},
															Input: {
																style: ({ $theme }) => ({
																	fontSize: "14px",
																	lineHeight: "22px",
																	"::placeholder": { color: "#BFBFBF" },
																}),
															},
														}}
													/>
												</div>
												<div style={{ whiteSpace: "nowrap", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: "16px", color: "#262626", fontSize: "14px", lineHeight: "22px" }}>
													<div style={{ width: "74px", textAlign: "left" }}>Color</div>
													<Input
														value={""}
														onChange={(e) => {}}
														placeholder="e.g. #3C3C3C"
														overrides={{
															Root: {
																style: ({ $theme }) => ({
																	marginLeft: "20px",
																	borderTopRightRadius: "8px",
																	borderTopLeftRadius: "8px",
																	borderBottomRightRadius: "8px",
																	borderBottomLeftRadius: "8px",
																}),
															},
															Input: {
																style: ({ $theme }) => ({
																	fontSize: "14px",
																	lineHeight: "22px",
																	"::placeholder": { color: "#BFBFBF" },
																}),
															},
														}}
													/>
												</div>
												<div style={{ whiteSpace: "nowrap", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", marginBottom: "16px", color: "#262626", fontSize: "14px", lineHeight: "22px" }}>
													<div style={{ width: "74px", textAlign: "left", marginBottom: "24px" }}>Request</div>
													<Textarea
														value={""}
														onChange={(e) => {}}
														placeholder="Tell us how do you want to get these text and image printed."
														overrides={{
															Root: {
																style: ({ $theme }) => ({
																	borderTopRightRadius: "8px",
																	borderTopLeftRadius: "8px",
																	borderBottomRightRadius: "8px",
																	borderBottomLeftRadius: "8px",
																}),
															},
															Input: {
																style: ({ $theme }) => ({
																	fontSize: "14px",
																	lineHeight: "22px",
																	"::placeholder": { color: "#BFBFBF" },
																}),
															},
														}}
													/>
												</div>
											</div>
										</div>
									</>
								</div>
							</Block>
						</Block>
					</ModalBody>
					<Block width={"100%"} height={["54px", "70px", "80px"]} position={"fixed"} bottom={"0"} backgroundColor={"white"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} paddingLeft={"16px"} paddingRight={"16px"}>
						<div style={{ fontSize: "12px", marginRight: "24px" }}>After submitting the order, we’ll contact you with a free mockup based on the information you provide us here.</div>
						<div style={{ display: "flex", flexDirection: "row" }}>
							<Block width={["123px"]} height={"40px"} marginRight={"24px"}>
								<Button
									shape={SHAPE.pill}
									overrides={{
										BaseButton: {
											style: ({ $theme }) => ({
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
									onClick={() => setWallIsOpen(false)}
								>
									Cancel
								</Button>
							</Block>
							<Block width={["123px"]} height={"40px"}>
								<Button
									shape={SHAPE.pill}
									overrides={{
										BaseButton: {
											style: ({ $theme }) => ({ fontSize: "16px", width: `100%`, height: `100%`, backgroundColor: "#23A4AD", lineHeight: "24px" }),
										},
									}}
									onClick={() => setPrintIsOpen(true)}
								>
									Add Wall
								</Button>
							</Block>
						</div>
					</Block>
				</Modal>
				<Modal
					onClose={() => setPrintIsOpen(false)}
					isOpen={printIsOpen}
					animate
					autoFocus
					size={ModalSize.full}
					role={ROLE.dialog}
					overrides={{
						Root: {
							style: ({ $theme }) => ({
								zIndex: "99",
								height: "100vh",
								paddingTop: "24px",
								overflowY: "hidden",
							}),
							props: {
								className: "modalRoot",
							},
						},
						DialogContainer: {
							style: ({ $theme }) => ({
								height: "100%",
							}),
						},
						Dialog: {
							props: { className: "modalDialog" },
						},
						Close: {
							style: () => ({ top: "29px", right: "29px" }),
						},
					}}
				>
					<ModalBody className="modalSelectionContainer">
						<Block width={["100%", "480px", "100%"]} height={["auto", "auto", "100%"]} display={"flex"} flexDirection={"column"} marginLeft={"auto"} marginRight={"auto"} overflow={["scroll"]}>
							{/* 图片区域 */}
							<img src="/images/icon/icon-roof.png" style={{ width: "200px", marginRight: "auto", marginLeft: "auto", marginTop: "24px" }} />
							<Block display={"flex"} flexDirection={["column", "column", "row"]} width={["100%", "100%", "664px"]} marginLeft={"auto"} marginRight={"auto"}>
								<Block
									flex={[0, 0, 1]}
									display={"flex"}
									flexDirection={"column"}
									width={["100%", "100%", "424px"]}
									paddingTop={["24px", "24px", "40px"]}
									paddingRight={["16px", "24px", "32px"]}
									paddingLeft={["16px", "24px", "0"]}
									alignItems={"center"}
								>
									<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%" }}>
										<div style={{ fontSize: 16, fontWeight: "500", marginBottom: 16 }}>Peak</div>
										<div style={{ display: "flex", flexDirection: "column", width: "100%", marginBottom: "36px" }}>
											<ul
												className={css({
													paddingLeft: 0,
													paddingRight: 0,
												})}
											>
												<ListItem
													artwork={(props) => <img src="/images/icon/icon-peak-front.png" alt="icon-peak-front" />}
													overrides={{
														Root: {
															style: ({ $theme }) => ({
																height: "68px",
																paddingRight: "8px",
																paddingLeft: "8px",
																backgroundColor: "transparent",
																marginBottom: "16px",
															}),
														},
														Content: {
															style: ({ $theme }) => ({
																paddingRight: 0,
																paddingLeft: "12px",
																borderBottomWidth: 0,
															}),
														},
														ArtworkContainer: {
															style: ({ $theme }) => ({
																width: "44px",
																height: "44px",
															}),
														},
													}}
													endEnhancer={() => (
														<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
															<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
																<Button
																	shape={SHAPE.pill}
																	overrides={{
																		BaseButton: {
																			style: ({ $theme }) => ({ width: "90px", height: "32px", backgroundColor: "#23A4AD", fontSize: "14px", lineHeight: "22px" }),
																		},
																	}}
																	onClick={() => setPrintColorIsOpen(true)}
																>
																	Edit
																</Button>
																<Button
																	kind={KIND.tertiary}
																	shape={SHAPE.circle}
																	overrides={{
																		BaseButton: {
																			style: ({ $theme }) => ({ marginLeft: "17px", width: "20px", height: "20px", backgroundColor: "transparent" }),
																		},
																	}}
																>
																	<Delete size={20} />
																</Button>
															</div>
														</div>
													)}
												>
													<ListItemLabel
														description="Front"
														overrides={{
															LabelContent: {
																style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", marginBottom: "4px" }),
															},
															LabelDescription: {
																style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", color: "#808080" }),
															},
														}}
													>
														Peak
													</ListItemLabel>
												</ListItem>
												<ListItem
													artwork={(props) => <img src="/images/icon/icon-peak-back.png" alt="icon-peak-back" />}
													overrides={{
														Root: {
															style: ({ $theme }) => ({
																height: "68px",
																paddingRight: "8px",
																paddingLeft: "8px",
																backgroundColor: "transparent",
																marginBottom: "16px",
															}),
														},
														Content: {
															style: ({ $theme }) => ({
																paddingRight: 0,
																paddingLeft: "12px",
																borderBottomWidth: 0,
															}),
														},
														ArtworkContainer: {
															style: ({ $theme }) => ({
																width: "44px",
																height: "44px",
															}),
														},
													}}
													endEnhancer={() => (
														<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
															<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
																<Button
																	shape={SHAPE.pill}
																	overrides={{
																		BaseButton: {
																			style: ({ $theme }) => ({ width: "90px", height: "32px", backgroundColor: "#23A4AD", fontSize: "14px", lineHeight: "22px" }),
																		},
																	}}
																	onClick={() => setPrintColorIsOpen(true)}
																>
																	Edit
																</Button>
																<Button
																	kind={KIND.tertiary}
																	shape={SHAPE.circle}
																	overrides={{
																		BaseButton: {
																			style: ({ $theme }) => ({ marginLeft: "17px", width: "20px", height: "20px", backgroundColor: "transparent" }),
																		},
																	}}
																>
																	<Delete size={20} />
																</Button>
															</div>
														</div>
													)}
												>
													<ListItemLabel
														description="Back"
														overrides={{
															LabelContent: {
																style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", marginBottom: "4px" }),
															},
															LabelDescription: {
																style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", color: "#808080" }),
															},
														}}
													>
														Peak
													</ListItemLabel>
												</ListItem>
												<ListItem
													artwork={(props) => <img src="/images/icon/icon-peak-left.png" alt="icon-peak-left" />}
													overrides={{
														Root: {
															style: ({ $theme }) => ({
																height: "68px",
																paddingRight: "8px",
																paddingLeft: "8px",
																backgroundColor: "transparent",
																marginBottom: "16px",
															}),
														},
														Content: {
															style: ({ $theme }) => ({
																paddingRight: 0,
																paddingLeft: "12px",
																borderBottomWidth: 0,
															}),
														},
														ArtworkContainer: {
															style: ({ $theme }) => ({
																width: "44px",
																height: "44px",
															}),
														},
													}}
													endEnhancer={() => (
														<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
															<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
																<Button
																	shape={SHAPE.pill}
																	overrides={{
																		BaseButton: {
																			style: ({ $theme }) => ({ width: "90px", height: "32px", backgroundColor: "#23A4AD", fontSize: "14px", lineHeight: "22px" }),
																		},
																	}}
																	onClick={() => setPrintColorIsOpen(true)}
																>
																	Edit
																</Button>
																<Button
																	kind={KIND.tertiary}
																	shape={SHAPE.circle}
																	overrides={{
																		BaseButton: {
																			style: ({ $theme }) => ({ marginLeft: "17px", width: "20px", height: "20px", backgroundColor: "transparent" }),
																		},
																	}}
																>
																	<Delete size={20} />
																</Button>
															</div>
														</div>
													)}
												>
													<ListItemLabel
														description="Left"
														overrides={{
															LabelContent: {
																style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", marginBottom: "4px" }),
															},
															LabelDescription: {
																style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", color: "#808080" }),
															},
														}}
													>
														Peak
													</ListItemLabel>
												</ListItem>
												<ListItem
													artwork={(props) => <img src="/images/icon/icon-peak-right.png" alt="icon-peak-right" />}
													overrides={{
														Root: {
															style: ({ $theme }) => ({
																height: "68px",
																paddingRight: "8px",
																paddingLeft: "8px",
																backgroundColor: "transparent",
																marginBottom: "16px",
															}),
														},
														Content: {
															style: ({ $theme }) => ({
																paddingRight: 0,
																paddingLeft: "12px",
																borderBottomWidth: 0,
															}),
														},
														ArtworkContainer: {
															style: ({ $theme }) => ({
																width: "44px",
																height: "44px",
															}),
														},
													}}
													endEnhancer={() => (
														<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
															<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
																<Button
																	shape={SHAPE.pill}
																	overrides={{
																		BaseButton: {
																			style: ({ $theme }) => ({ width: "90px", height: "32px", backgroundColor: "#23A4AD", fontSize: "14px", lineHeight: "22px" }),
																		},
																	}}
																	onClick={() => setPrintColorIsOpen(true)}
																>
																	Edit
																</Button>
																<Button
																	kind={KIND.tertiary}
																	shape={SHAPE.circle}
																	overrides={{
																		BaseButton: {
																			style: ({ $theme }) => ({ marginLeft: "17px", width: "20px", height: "20px", backgroundColor: "transparent" }),
																		},
																	}}
																>
																	<Delete size={20} />
																</Button>
															</div>
														</div>
													)}
												>
													<ListItemLabel
														description="Right"
														overrides={{
															LabelContent: {
																style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", marginBottom: "4px" }),
															},
															LabelDescription: {
																style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", color: "#808080" }),
															},
														}}
													>
														Peak
													</ListItemLabel>
												</ListItem>
											</ul>
										</div>
									</div>
								</Block>
								<Block
									flex={[0, 0, 1]}
									display={"flex"}
									flexDirection={"column"}
									width={["100%", "100%", "424px"]}
									paddingTop={["24px", "24px", "40px"]}
									paddingRight={["16px", "24px", "0"]}
									paddingLeft={["16px", "24px", "32px"]}
									alignItems={"center"}
								>
									<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%" }}>
										<div style={{ fontSize: 16, fontWeight: "500", marginBottom: 16 }}>Valance</div>
										<div style={{ display: "flex", flexDirection: "column", width: "100%", marginBottom: "36px" }}>
											<ul
												className={css({
													paddingLeft: 0,
													paddingRight: 0,
												})}
											>
												<ListItem
													artwork={(props) => <img src="/images/icon/icon-valance-front.png" alt="icon-valance-front" />}
													overrides={{
														Root: {
															style: ({ $theme }) => ({
																height: "68px",
																paddingRight: "8px",
																paddingLeft: "8px",
																backgroundColor: "transparent",
																marginBottom: "16px",
															}),
														},
														Content: {
															style: ({ $theme }) => ({
																paddingRight: 0,
																paddingLeft: "12px",
																borderBottomWidth: 0,
															}),
														},
														ArtworkContainer: {
															style: ({ $theme }) => ({
																width: "44px",
																height: "44px",
															}),
														},
													}}
													endEnhancer={() => (
														<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
															<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
																<Button
																	shape={SHAPE.pill}
																	overrides={{
																		BaseButton: {
																			style: ({ $theme }) => ({ width: "90px", height: "32px", backgroundColor: "#23A4AD", fontSize: "14px", lineHeight: "22px" }),
																		},
																	}}
																	onClick={() => setPrintColorIsOpen(true)}
																>
																	Edit
																</Button>
																<Button
																	kind={KIND.tertiary}
																	shape={SHAPE.circle}
																	overrides={{
																		BaseButton: {
																			style: ({ $theme }) => ({ marginLeft: "17px", width: "20px", height: "20px", backgroundColor: "transparent" }),
																		},
																	}}
																>
																	<Delete size={20} />
																</Button>
															</div>
														</div>
													)}
												>
													<ListItemLabel
														description="Front"
														overrides={{
															LabelContent: {
																style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", marginBottom: "4px" }),
															},
															LabelDescription: {
																style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", color: "#808080" }),
															},
														}}
													>
														Valance
													</ListItemLabel>
												</ListItem>
												<ListItem
													artwork={(props) => <img src="/images/icon/icon-valance-back.png" alt="icon-valance-back" />}
													overrides={{
														Root: {
															style: ({ $theme }) => ({
																height: "68px",
																paddingRight: "8px",
																paddingLeft: "8px",
																backgroundColor: "transparent",
																marginBottom: "16px",
															}),
														},
														Content: {
															style: ({ $theme }) => ({
																paddingRight: 0,
																paddingLeft: "12px",
																borderBottomWidth: 0,
															}),
														},
														ArtworkContainer: {
															style: ({ $theme }) => ({
																width: "44px",
																height: "44px",
															}),
														},
													}}
													endEnhancer={() => (
														<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
															<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
																<Button
																	shape={SHAPE.pill}
																	overrides={{
																		BaseButton: {
																			style: ({ $theme }) => ({ width: "90px", height: "32px", backgroundColor: "#23A4AD", fontSize: "14px", lineHeight: "22px" }),
																		},
																	}}
																	onClick={() => setPrintColorIsOpen(true)}
																>
																	Edit
																</Button>
																<Button
																	kind={KIND.tertiary}
																	shape={SHAPE.circle}
																	overrides={{
																		BaseButton: {
																			style: ({ $theme }) => ({ marginLeft: "17px", width: "20px", height: "20px", backgroundColor: "transparent" }),
																		},
																	}}
																>
																	<Delete size={20} />
																</Button>
															</div>
														</div>
													)}
												>
													<ListItemLabel
														description="Back"
														overrides={{
															LabelContent: {
																style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", marginBottom: "4px" }),
															},
															LabelDescription: {
																style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", color: "#808080" }),
															},
														}}
													>
														Valance
													</ListItemLabel>
												</ListItem>
												<ListItem
													artwork={(props) => <img src="/images/icon/icon-valance-left.png" alt="icon-valance-left" />}
													overrides={{
														Root: {
															style: ({ $theme }) => ({
																height: "68px",
																paddingRight: "8px",
																paddingLeft: "8px",
																backgroundColor: "transparent",
																marginBottom: "16px",
															}),
														},
														Content: {
															style: ({ $theme }) => ({
																paddingRight: 0,
																paddingLeft: "12px",
																borderBottomWidth: 0,
															}),
														},
														ArtworkContainer: {
															style: ({ $theme }) => ({
																width: "44px",
																height: "44px",
															}),
														},
													}}
													endEnhancer={() => (
														<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
															<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
																<Button
																	shape={SHAPE.pill}
																	overrides={{
																		BaseButton: {
																			style: ({ $theme }) => ({ width: "90px", height: "32px", backgroundColor: "#23A4AD", fontSize: "14px", lineHeight: "22px" }),
																		},
																	}}
																	onClick={() => setPrintColorIsOpen(true)}
																>
																	Edit
																</Button>
																<Button
																	kind={KIND.tertiary}
																	shape={SHAPE.circle}
																	overrides={{
																		BaseButton: {
																			style: ({ $theme }) => ({ marginLeft: "17px", width: "20px", height: "20px", backgroundColor: "transparent" }),
																		},
																	}}
																>
																	<Delete size={20} />
																</Button>
															</div>
														</div>
													)}
												>
													<ListItemLabel
														description="Left"
														overrides={{
															LabelContent: {
																style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", marginBottom: "4px" }),
															},
															LabelDescription: {
																style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", color: "#808080" }),
															},
														}}
													>
														Valance
													</ListItemLabel>
												</ListItem>
												<ListItem
													artwork={(props) => <img src="/images/icon/icon-valance-right.png" alt="icon-valance-right" />}
													overrides={{
														Root: {
															style: ({ $theme }) => ({
																height: "68px",
																paddingRight: "8px",
																paddingLeft: "8px",
																backgroundColor: "transparent",
																marginBottom: "16px",
															}),
														},
														Content: {
															style: ({ $theme }) => ({
																paddingRight: 0,
																paddingLeft: "12px",
																borderBottomWidth: 0,
															}),
														},
														ArtworkContainer: {
															style: ({ $theme }) => ({
																width: "44px",
																height: "44px",
															}),
														},
													}}
													endEnhancer={() => (
														<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
															<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
																<Button
																	shape={SHAPE.pill}
																	overrides={{
																		BaseButton: {
																			style: ({ $theme }) => ({ width: "90px", height: "32px", backgroundColor: "#23A4AD", fontSize: "14px", lineHeight: "22px" }),
																		},
																	}}
																	onClick={() => setPrintColorIsOpen(true)}
																>
																	Edit
																</Button>
																<Button
																	kind={KIND.tertiary}
																	shape={SHAPE.circle}
																	overrides={{
																		BaseButton: {
																			style: ({ $theme }) => ({ marginLeft: "17px", width: "20px", height: "20px", backgroundColor: "transparent" }),
																		},
																	}}
																>
																	<Delete size={20} />
																</Button>
															</div>
														</div>
													)}
												>
													<ListItemLabel
														description="Right"
														overrides={{
															LabelContent: {
																style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", marginBottom: "4px" }),
															},
															LabelDescription: {
																style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", color: "#808080" }),
															},
														}}
													>
														Valance
													</ListItemLabel>
												</ListItem>
											</ul>
										</div>
									</div>
								</Block>
							</Block>
						</Block>
					</ModalBody>
					<Block width={"100%"} height={["54px", "70px", "80px"]} position={"fixed"} bottom={"0"} backgroundColor={"white"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} paddingLeft={"16px"} paddingRight={"16px"}>
						<div style={{ fontSize: "12px", marginRight: "24px" }}>After submitting the order, we’ll contact you with a free mockup based on the information you provide us here.</div>
						<div style={{ display: "flex", flexDirection: "row" }}>
							<Block width={["123px"]} height={"40px"} marginRight={"24px"}>
								<Button
									shape={SHAPE.pill}
									overrides={{
										BaseButton: {
											style: ({ $theme }) => ({
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
									onClick={() => setPrintIsOpen(false)}
								>
									Cancel
								</Button>
							</Block>
							<Block width={["123px"]} height={"40px"}>
								<Button
									shape={SHAPE.pill}
									overrides={{
										BaseButton: {
											style: ({ $theme }) => ({ fontSize: "16px", width: `100%`, height: `100%`, backgroundColor: "#23A4AD", lineHeight: "24px" }),
										},
									}}
									onClick={() => setPrintIsOpen(false)}
								>
									Add Wall
								</Button>
							</Block>
						</div>
					</Block>
				</Modal>
				<Modal
					onClose={() => setPrintColorIsOpen(false)}
					isOpen={printColorIsOpen}
					animate
					autoFocus
					size={ModalSize.full}
					role={ROLE.dialog}
					overrides={{
						Root: {
							style: ({ $theme }) => ({
								zIndex: "99",
								height: "100vh",
								paddingTop: "24px",
								overflowY: "hidden",
							}),
							props: {
								className: "modalRoot",
							},
						},
						DialogContainer: {
							style: ({ $theme }) => ({
								height: "100%",
							}),
						},
						Dialog: {
							props: { className: "modalDialog" },
						},
						Close: {
							style: () => ({ top: "29px", right: "29px" }),
						},
					}}
				>
					<ModalBody className="modalSelectionContainer">
						<Block
							width={["100%", "480px"]}
							height={["auto", "auto", "100%"]}
							display={"flex"}
							flexDirection={["column"]}
							marginLeft={"auto"}
							marginRight={"auto"}
							paddingTop={["24px"]}
							paddingRight={"16px"}
							paddingLeft={"16px"}
							alignItems={"center"}
							overflow={["scroll"]}
						>
							<div style={{ display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center", width: "100%", marginBottom: "64px" }}>
								<div style={{ display: "flex", flexDirection: "column", width: "100%", marginBottom: "36px" }}>
									<div style={{ fontSize: 16, fontWeight: "500", marginBottom: 16, textAlign: "left" }}>Background Color</div>
									<RadioGroup
										value={"custom"}
										onChange={() => {}}
										name="color"
										align={ALIGN.horizontal}
										overrides={{
											RadioGroupRoot: {
												style: ({ $theme }) => ({
													display: "flex",
													width: "100%",
													flexWrap: "wrap",
													justifyContent: "flex-start",
													gridTemplateColumns: "auto auto auto auto auto auto",
												}),
												props: {
													className: "radioGroupColor",
												},
											},
											Root: {
												style: ({ $theme, $checked }) => ({
													width: "44px",
													height: "44px",
													justifyContent: "center",
													padding: $checked ? "9px" : "11px",
													border: $checked ? "3px solid #23A4AD" : "1px solid transparent",
													boxSizing: "border-box",
													borderRadius: "16px",
													marginTop: 0,
													marginRight: "8px",
													marginBottom: "16px",
													marginLeft: "0",
												}),
											},
											RadioMarkOuter: {
												style: ({ $theme }) => ({ display: "none" }),
											},
											RadioMarkInner: {
												style: ({ $theme }) => ({ display: "none" }),
											},
										}}
									>
										{productComponent && productComponent[1]
											? productComponent[1].attributes
													.filter((attribute) => attribute.id === id_attribute_canopyColor && attribute.variation)
													.map((attribute) => {
														return attribute.options.map((option, index) => (
															<Radio
																key={index}
																value={option.toLowerCase()}
																overrides={{
																	Label: ({ $value }) => <div style={{ width: "20px", height: "20px", borderRadius: "8px", backgroundColor: option, border: "1px solid #D9D9D9" }} />,
																}}
															/>
														));
													})
											: null}
										<Radio
											value={"custom"}
											overrides={{
												Root: {
													style: ({ $theme, $checked }) => ({
														width: "100%",
														height: "44px",
														justifyContent: "flex-start",
														marginTop: "0",
														marginRight: "0",
														marginBottom: "16px",
														marginLeft: "0",
													}),
												},
												Label: ({ $value, $checked }) => (
													<div
														style={{
															display: "flex",
															flexDirection: "row",
															boxSizing: "border-box",
															borderRadius: "16px",
															alignContent: "center",
															padding: $checked ? "9px" : "11px",
															border: $checked ? "3px solid #23A4AD" : "1px solid transparent",
														}}
													>
														<div
															style={{
																width: "20px",
																height: "20px",
																borderRadius: "8px",
																background: "linear-gradient(to left, rgb(184, 39, 252) 0%, rgb(44, 144, 252) 25%, rgb(184, 253, 51) 50%, rgb(254, 200, 55) 75%, rgb(253, 24, 146) 100%)",
																border: "1px solid #D9D9D9",
															}}
														/>
														<span style={{ marginLeft: "10px" }}>Custom</span>
													</div>
												),
											}}
										/>
									</RadioGroup>
									{/* <SwatchesPicker /> */}
									<div style={{ position: "relative" }}>
										<div
											style={{
												whiteSpace: "nowrap",
												display: "flex",
												flexDirection: "row",
												justifyContent: "flex-start",
												alignItems: "center",
												marginBottom: "4px",
												color: "#262626",
												fontSize: "14px",
												lineHeight: "22px",
											}}
										>
											<div style={{ width: "116px", textAlign: "left" }}>Pantone Color</div>
											<Input
												value={""}
												onChange={(e) => {}}
												placeholder="Controlled Input"
												overrides={{
													Root: {
														style: ({ $theme }) => ({
															marginLeft: "20px",
															borderTopRightRadius: "8px",
															borderTopLeftRadius: "8px",
															borderBottomRightRadius: "8px",
															borderBottomLeftRadius: "8px",
															// maxWidth: "240px",
														}),
													},
													Input: {
														style: ({ $theme }) => ({
															fontSize: "14px",
															lineHeight: "22px",
															"::placeholder": { color: "#BFBFBF" },
														}),
													},
												}}
											/>
										</div>
										<div style={{ fontSize: "12px", lineHeight: "20px", color: "#23a4ad", textAlign: "right" }}>
											<a target="_blank" href="https://www.pantone.com/color-finder" rel="noopener noreferrer">
												Go to "Pantone Color Finder"
											</a>
										</div>
									</div>
								</div>
								<div style={{ display: "flex", flexDirection: "column", width: "100%", marginBottom: "36px" }}>
									<div style={{ fontSize: 16, fontWeight: "500", marginBottom: 16, textAlign: "left" }}>Image</div>
									<ul
										className={css({
											paddingLeft: 0,
											paddingRight: 0,
										})}
									>
										<ListItem
											artwork={(props) => <img src="/images/icon/icon-wall-front.png" alt="icon-wall-front" />}
											overrides={{
												Root: {
													style: ({ $theme }) => ({
														height: "68px",
														paddingRight: "8px",
														paddingLeft: "8px",
														backgroundColor: "transparent",
														marginBottom: "16px",
													}),
												},
												Content: {
													style: ({ $theme }) => ({
														paddingRight: 0,
														paddingLeft: "12px",
														borderBottomWidth: 0,
													}),
												},
												ArtworkContainer: {
													style: ({ $theme }) => ({
														width: "44px",
														height: "44px",
													}),
												},
											}}
											endEnhancer={() => (
												<Button
													kind={KIND.tertiary}
													shape={SHAPE.circle}
													overrides={{
														BaseButton: {
															style: ({ $theme }) => ({ marginLeft: "17px", width: "20px", height: "20px", backgroundColor: "transparent" }),
														},
													}}
												>
													<Delete size={20} />
												</Button>
											)}
										>
											<ListItemLabel
												description="Left"
												overrides={{
													LabelContent: {
														style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", marginBottom: "4px" }),
													},
													LabelDescription: {
														style: ({ $theme }) => ({ fontSize: "14px", lineHeight: "20px", color: "#808080", textAlign: "left" }),
													},
												}}
											>
												Half wall
											</ListItemLabel>
										</ListItem>
									</ul>
									<Button
										kind={KIND.minimal}
										shape={SHAPE.pill}
										overrides={{
											BaseButton: {
												style: ({ $theme }) => ({
													width: "100%",
													height: "44px",
													fontSize: "14px",
													color: "#D9D9D9",
													marginBottom: "24px",
													borderTopWidth: "1px",
													borderTopStyle: "dashed",
													borderTopColor: "#D9D9D9",
													borderRightWidth: "1px",
													borderRightStyle: "dashed",
													borderRightColor: "#D9D9D9",
													borderBottomWidth: "1px",
													borderBottomStyle: "dashed",
													borderBottomColor: "#D9D9D9",
													borderLeftWidth: "1px",
													borderLeftStyle: "dashed",
													borderLeftColor: "#D9D9D9",
													backgroundColor: "transparent",
												}),
											},
										}}
										startEnhancer={() => <Upload size={24} color={"#D9D9D9"} />}
										onClick={() => setPrintColorIsOpen(false)}
									>
										Upload Image
									</Button>
								</div>
								<div style={{ display: "flex", flexDirection: "column", width: "100%", marginBottom: "36px" }}>
									<div style={{ fontSize: 16, fontWeight: "500", marginBottom: 16, textAlign: "left" }}>Text</div>

									<div style={{ position: "relative" }}>
										<div style={{ whiteSpace: "nowrap", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: "16px", color: "#262626", fontSize: "14px", lineHeight: "22px" }}>
											<div style={{ width: "74px", textAlign: "left" }}>Content</div>
											<Input
												value={""}
												onChange={(e) => {}}
												placeholder="What do you want to print"
												overrides={{
													Root: {
														style: ({ $theme }) => ({
															marginLeft: "20px",
															borderTopRightRadius: "8px",
															borderTopLeftRadius: "8px",
															borderBottomRightRadius: "8px",
															borderBottomLeftRadius: "8px",
														}),
													},
													Input: {
														style: ({ $theme }) => ({
															fontSize: "14px",
															lineHeight: "22px",
															"::placeholder": { color: "#BFBFBF" },
														}),
													},
												}}
											/>
										</div>
										<div style={{ whiteSpace: "nowrap", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: "16px", color: "#262626", fontSize: "14px", lineHeight: "22px" }}>
											<div style={{ width: "74px", textAlign: "left" }}>Font</div>
											<Input
												value={""}
												onChange={(e) => {}}
												placeholder="e.g. Roboto"
												overrides={{
													Root: {
														style: ({ $theme }) => ({
															marginLeft: "20px",
															borderTopRightRadius: "8px",
															borderTopLeftRadius: "8px",
															borderBottomRightRadius: "8px",
															borderBottomLeftRadius: "8px",
														}),
													},
													Input: {
														style: ({ $theme }) => ({
															fontSize: "14px",
															lineHeight: "22px",
															"::placeholder": { color: "#BFBFBF" },
														}),
													},
												}}
											/>
										</div>
										<div style={{ whiteSpace: "nowrap", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: "16px", color: "#262626", fontSize: "14px", lineHeight: "22px" }}>
											<div style={{ width: "74px", textAlign: "left" }}>Color</div>
											<Input
												value={""}
												onChange={(e) => {}}
												placeholder="e.g. #3C3C3C"
												overrides={{
													Root: {
														style: ({ $theme }) => ({
															marginLeft: "20px",
															borderTopRightRadius: "8px",
															borderTopLeftRadius: "8px",
															borderBottomRightRadius: "8px",
															borderBottomLeftRadius: "8px",
														}),
													},
													Input: {
														style: ({ $theme }) => ({
															fontSize: "14px",
															lineHeight: "22px",
															"::placeholder": { color: "#BFBFBF" },
														}),
													},
												}}
											/>
										</div>
										<div style={{ whiteSpace: "nowrap", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", marginBottom: "16px", color: "#262626", fontSize: "14px", lineHeight: "22px" }}>
											<div style={{ width: "74px", textAlign: "left", marginBottom: "24px" }}>Request</div>
											<Textarea
												value={""}
												onChange={(e) => {}}
												placeholder="Tell us how do you want to get these text and image printed."
												overrides={{
													Root: {
														style: ({ $theme }) => ({
															borderTopRightRadius: "8px",
															borderTopLeftRadius: "8px",
															borderBottomRightRadius: "8px",
															borderBottomLeftRadius: "8px",
														}),
													},
													Input: {
														style: ({ $theme }) => ({
															fontSize: "14px",
															lineHeight: "22px",
															"::placeholder": { color: "#BFBFBF" },
														}),
													},
												}}
											/>
										</div>
									</div>
								</div>
							</div>
						</Block>
					</ModalBody>
					<Block width={"100%"} height={["54px", "70px", "80px"]} position={"fixed"} bottom={"0"} backgroundColor={"white"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} paddingLeft={"16px"} paddingRight={"16px"}>
						<div style={{ fontSize: "12px", marginRight: "24px" }}>After submitting the order, we’ll contact you with a free mockup based on the information you provide us here.</div>
						<div style={{ display: "flex", flexDirection: "row" }}>
							<Block width={["123px"]} height={"40px"} marginRight={"24px"}>
								<Button
									shape={SHAPE.pill}
									overrides={{
										BaseButton: {
											style: ({ $theme }) => ({
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
									onClick={() => setPrintColorIsOpen(false)}
								>
									Cancel
								</Button>
							</Block>
							<Block width={["123px"]} height={"40px"}>
								<Button
									shape={SHAPE.pill}
									overrides={{
										BaseButton: {
											style: ({ $theme }) => ({ fontSize: "16px", width: `100%`, height: `100%`, backgroundColor: "#23A4AD", lineHeight: "24px" }),
										},
									}}
									onClick={() => setPrintIsOpen(true)}
								>
									Add Wall
								</Button>
							</Block>
						</div>
					</Block>
				</Modal>
			</Block>
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
	if (product.type === "composite") {
		component = await Promise.all(product.composite_components.map(({ default_option_id }) => utils.getProductByWooId(default_option_id)));
		variant = await Promise.all(component.map(({ id }) => utils.getVariantByWooProductId(id)));
	}

	return {
		product: product,
		productComponent: component,
		productVariant: variant,
		noFooter: true,
	};
};

export default withRouter(Canopy_Tent);
