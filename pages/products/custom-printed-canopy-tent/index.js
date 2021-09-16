import { useEffect, useState } from "react";
import clsx from "clsx";

import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { Backdrop, Box, Breadcrumbs, Container, CircularProgress, Divider, FormControlLabel, FormControl, Grid, List, ListItem, ListItemText, Radio, RadioGroup, Tabs, Tab, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { DateFn, StringFn, UrlFn } from "../../../utils/tools";
import Utils from "../../../utils/utils";
import styles from "../../../styles/Product.module.scss";

const dateFn = new DateFn();
const stringFn = new StringFn();
const urlFn = new UrlFn();
const utils = new Utils();

const id_product_wall = 26516;
const id_product_y5CanopyTentFrame = 26338;
const id_product_y6CanopyTentFrame = 26385;
const id_product_y7CanopyTentFrame = 26405;
const id_product_frame = 58792;

const id_attribute_canopyColor = 3;
const id_attribute_canopySize = 4;
const id_attribute_wallType = 11;
const id_attribute_wallSize = 14;
const id_attribute_wallPrintedType = 16;
const id_attribute_roofColor = 21;
const id_attribute_roofSize = 31;
const id_attribute_peakType = 32;
const id_attribute_valanceType = 33;
const id_attribute_frameSeries = 34;

const Checkout = dynamic(() => import("../../../components/buttonGroup"));
const CustomButton = dynamic(() => import("../../../components/button"));
const Modal = dynamic(() => import("../../../components/modal"));
const Selections = dynamic(() => import("../../../components/selection_group"));

const stylesSelectLabel = makeStyles({
	root: {
		position: "relative",
		padding: "4px 12px",
		marginLeft: 6,
		marginRight: 6,
	},
});
const stylesSelectRadio = makeStyles({
	root: {
		backgroundColor: "transparent",
		"& img": {
			width: 24,
			height: 24,
		},
		"& .color-dot": {
			width: 24,
			height: 24,
			borderRadius: "50%",
			border: "1px solid #e5e5e5",
		},
	},
});
const stylesWallTabs = makeStyles({
	root: {
		marginBottom: "18px",
	},
	indicator: {
		display: "flex",
		justifyContent: "center",
		backgroundColor: "transparent",
		"& > span": {
			maxWidth: 40,
			width: "100%",
			backgroundColor: "#000",
		},
	},
});
const stylesWallTab = makeStyles({
	root: {
		minWidth: "unset",
		textTransform: "capitalize",
		fontSize: "0.825rem",
		"&:focus": {
			opacity: 1,
		},
	},
});

function StyledRadio(props) {
	const classes = stylesSelectRadio();

	const icon =
		props.attribute === "canopy-size" ? (
			<img src={"/images/icon/" + props.value + ".svg"} />
		) : props.attribute === "canopy-color" ? (
			<div className="color-dot" style={{ backgroundColor: props.value }} />
		) : props.attribute === "wall-type" ? (
			<img src={"/images/icon/wall-" + props.value + ".png"} />
		) : (
			<div style={{ width: 24, height: 24 }} />
		);

	return (
		<Radio
			className={classes.root}
			color="primary"
			icon={icon}
			checkedIcon={
				<>
					{props.attribute === "wall-type" ? <div className="section-radio-outer-border" /> : props.attribute === "canopy-color" ? <div className="section-radio-border-circle" /> : null}
					{icon}
				</>
			}
			{...props}
		/>
	);
}

function handleClick(event) {
	event.preventDefault();
}

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

function setWallImageUrl(index, t, s, c) {
	const type = wallMap.get("type").find((w) => w.key === t).value;
	const size = wallMap.get("size").find((w) => w.key === s).value;
	const color = wallMap.get("color").find((w) => w.key === c).value;
	const side = wallMap.get("side").find((w) => w.key === index).value;

	return type + size + color + "-" + side + ".png";
}

function TabPanelRoof(props) {
	const classes = stylesSelectLabel();

	const { index, value, handleChangeRadio, selectedAttribute, ...other } = props;

	const [tabPeakColorType, setTabPeakColorType] = useState(0);
	const [tabValanceColorType, setTabValanceColorType] = useState(0);

	let valuePeakType = "white",
		valueValanceType = "white";

	if (selectedAttribute.length > 0) {
		selectedAttribute[(index + 1) * 2].map((attribute) => {
			if (attribute.id === id_attribute_peakType) {
				valuePeakType = attribute.option.toLowerCase();
			} else if (attribute.id === id_attribute_valanceType) {
				valueValanceType = attribute.option.toLowerCase();
			}
		});
		selectedAttribute[(index + 1) * 2 + 1].map((attribute) => {
			if (attribute.id === id_attribute_peakType) {
				valuePeakType = attribute.option.toLowerCase();
			} else if (attribute.id === id_attribute_valanceType) {
				valueValanceType = attribute.option.toLowerCase();
			}
		});
	}

	const handleChangeTabPeakColorType = (event, newValue) => {
		setTabPeakColorType(newValue);
	};
	const handleChangeTabValanceColorType = (event, newValue) => {
		setTabValanceColorType(newValue);
	};

	return (
		<div key={index} role="tabpanel" hidden={value !== index} {...other}>
			{value === index && (
				<>
					<div className="section-selection-container">
						<div className="section-selection-tabs">{"Peak"}</div>
						<Tabs value={tabPeakColorType} onChange={handleChangeTabPeakColorType} TabIndicatorProps={{ hidden: true }}>
							<Tab
								className="text-tab"
								classes={{
									root: "root-tab",
									selected: "tab-selected",
								}}
								label="Plain"
								disableRipple
							/>
							<Tab
								className="text-tab"
								classes={{
									root: "root-tab",
									selected: "tab-selected",
								}}
								label="Printed"
								disableRipple
							/>
						</Tabs>
						{!tabPeakColorType ? (
							<FormControl component="fieldset">
								<RadioGroup row defaultValue={"white"} value={valuePeakType} onChange={(event) => handleChangeRadio(event, (index + 1) * 2, id_attribute_peakType)}>
									{SelectionColor.map((option, index) => (
										<FormControlLabel key={index} className={classes.root} value={option.toLowerCase()} control={<StyledRadio attribute={"canopy-color"} />} />
									))}
								</RadioGroup>
							</FormControl>
						) : null}
					</div>
					<div className="section-selection-container">
						<div className="section-selection-tabs">{"Valance"}</div>
						<Tabs value={tabValanceColorType} onChange={handleChangeTabValanceColorType} TabIndicatorProps={{ hidden: true }}>
							<Tab
								className="text-tab"
								classes={{
									root: "root-tab",
									selected: "tab-selected",
								}}
								label="Plain"
								disableRipple
							/>
							<Tab
								className="text-tab"
								classes={{
									root: "root-tab",
									selected: "tab-selected",
								}}
								label="Printed"
								disableRipple
							/>
						</Tabs>
						{!tabValanceColorType ? (
							<FormControl component="fieldset">
								<RadioGroup row defaultValue={"white"} value={valueValanceType} onChange={(event) => handleChangeRadio(event, (index + 1) * 2 + 1, id_attribute_valanceType)}>
									{SelectionColor.map((option, index) => (
										<FormControlLabel key={index} className={classes.root} value={option.toLowerCase()} control={<StyledRadio attribute={"canopy-color"} />} />
									))}
								</RadioGroup>
							</FormControl>
						) : null}
					</div>
				</>
			)}
		</div>
	);
}

function TabPanelWall(props) {
	const classes = stylesSelectLabel();

	const { index, value, handleChangeRadio, productComponent, selectedAttribute, selectedVariant, wallStatus, setWallStatus, ...other } = props;

	const [tabWallColorType, setTabWallColorType] = useState(0);

	let valueWallType = "full",
		valueColor = "white";

	if (selectedAttribute.length > 0) {
		if (tabWallColorType === 1) {
			selectedAttribute[index + 10].map((attribute) => {
				if (attribute.id === id_attribute_wallType) {
					valueWallType = attribute.option.toLowerCase();
				} else if (attribute.id === id_attribute_canopyColor) {
					valueColor = attribute.option.toLowerCase();
				}
			});
		}
	}

	const handleChangeTabWallColorType = (event, newValue) => {
		setTabWallColorType(newValue);

		let tempWallStatus = [...wallStatus];
		tempWallStatus[index] = newValue;
		setWallStatus(tempWallStatus);
	};

	return (
		<div key={index} role="tabpanel" hidden={value !== index} {...other}>
			{value === index && (
				<>
					<div className="section-selection-container">
						<Tabs value={tabWallColorType} onChange={handleChangeTabWallColorType} TabIndicatorProps={{ hidden: true }}>
							<Tab
								className="text-tab"
								classes={{
									root: "root-tab",
									selected: "tab-selected",
								}}
								label="None"
								disableRipple
							/>
							<Tab
								className="text-tab"
								classes={{
									root: "root-tab",
									selected: "tab-selected",
								}}
								label="Plain"
								disableRipple
							/>
							<Tab
								className="text-tab"
								classes={{
									root: "root-tab",
									selected: "tab-selected",
								}}
								label="Printed"
								disableRipple
							/>
						</Tabs>
						{tabWallColorType === 1 ? (
							<>
								<FormControl component="fieldset">
									<RadioGroup row defaultValue={"full"} value={valueWallType} onChange={(event) => handleChangeRadio(event, index + 10, id_attribute_wallType)}>
										{SelectionWallType.map((option, index) => (
											<FormControlLabel key={index} className={classes.root} value={option.toLowerCase()} control={<StyledRadio attribute={"wall-type"} />} label={option} labelPlacement="bottom" />
										))}
									</RadioGroup>
								</FormControl>
								<FormControl component="fieldset">
									<RadioGroup row defaultValue={"white"} value={valueColor} onChange={(event) => handleChangeRadio(event, index + 10, id_attribute_canopyColor)}>
										{SelectionColor.map((option, index) => (
											<FormControlLabel key={index} className={classes.root} value={option.toLowerCase()} control={<StyledRadio attribute={"canopy-color"} />} />
										))}
									</RadioGroup>
								</FormControl>
							</>
						) : tabWallColorType === 2 ? (
							productComponent[14 + index].attributes
								.filter((attribute) => attribute.variation)
								.map((attribute, index) => {
									if (attribute.id === id_attribute_wallSize) return;
									return (
										<div key={index} className="section-selection-container">
											<Selections
												defaultValue={stringFn.replaceDash(productComponent[14 + index].default_attributes[index].option, 1)}
												onChange={(event) => handleChangeRadio(event, 14 + index, attribute.id)}
												list={attribute.options}
												id={attribute.id.toString()}
												type="radio"
											/>
										</div>
									);
								})
						) : null}
					</div>
				</>
			)}
		</div>
	);
}

function TabDescPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div role="tabpanel" hidden={value !== index} id={`scrollable-auto-tabpanel-${index}`} aria-labelledby={`scrollable-auto-tab-${index}`} {...other}>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}

const SelectionColor = ["White", "Black", "Red", "Yellow", "Blue", "Green"];
const SelectionSize = ["10x10", "10x15", "10x20", "13x13", "13x20", "13x26", "16x16", "20x20"];
const SelectionWallType = ["Full", "Half", "Mesh", "PVC", "Rollup"];

export default function Canopy_Tent() {
	const router = useRouter();

	const classesSelectLabel = stylesSelectLabel();
	const classesWallTabs = stylesWallTabs();
	const classesWallTab = stylesWallTab();

	const [product, setProduct] = useState(null);
	const [productId, setProductId] = useState("");
	const [productName, setProductName] = useState("");
	const [productType, setProductType] = useState("");
	const [productImage, setProductImage] = useState([]);

	const [productComponent, setProductComponent] = useState([]);
	const [productVariant, setProductVariant] = useState([]);
	const [selectedAttribute, setSelectedAttribute] = useState([]);
	const [selectedVariant, setSelectedVariant] = useState([]);

	const [initProductVariant, setInitProductVariant] = useState(false);
	const [initSelectedAttribute, setInitSelectedAttribute] = useState(false);

	const [totalRegularPrice, setTotalRegularPrice] = useState(0);
	const [totalSalePrice, setTotalSalePrice] = useState(0);
	const [totalCount, setTotalCount] = useState(1);

	const [message, setMessage] = useState("");

	const [availableToCheckout, setAvailable] = useState(false);

	const [showProgress, setShowProgress] = useState(false);
	const [shippedDay, setShippedDay] = useState("");

	////////////////////////////////////////

	const [availableList, setAvailableList] = useState([
		{ status: false, quantity: 0, id: "", needed: 0 },
		{ status: false, quantity: 0, id: "", needed: 0 },
		{ status: false, quantity: 0, id: "", needed: 0 },
		{ status: false, quantity: 0, id: "", needed: 0 },
		{ status: false, quantity: 0, id: "", needed: 0 },
		{ status: false, quantity: 0, id: "", needed: 0 },
		{ status: false, quantity: 0, id: "", needed: 0 },
		{ status: false, quantity: 0, id: "", needed: 0 },
		{ status: false, quantity: 0, id: "", needed: 0 },
		{ status: false, quantity: 0, id: "", needed: 0 },
		{ status: false, quantity: 0, id: "", needed: 0 },
		{ status: false, quantity: 0, id: "", needed: 0 },
		{ status: false, quantity: 0, id: "", needed: 0 },
		{ status: false, quantity: 0, id: "", needed: 0 },
		{ status: false, quantity: 0, id: "", needed: 0 },
		{ status: false, quantity: 0, id: "", needed: 0 },
		{ status: false, quantity: 0, id: "", needed: 0 },
		{ status: false, quantity: 0, id: "", needed: 0 },
	]);

	////////////////////////////////////////

	const [productSeries, setProductSeries] = useState("");
	const [productSize, setProductSize] = useState("");
	const [productRoofColorType, setProductRoofColorType] = useState("plain");

	////////////////////////////////////////

	const [productSizeSelection, setProductSizeSelection] = useState([]);

	////////////////////////////////////////

	const [showSizeModal, setShowSizeModal] = useState(false);

	////////////////////////////////////////

	const [tabRoof, setTabRoof] = useState(0);
	const [tabRoofColorType, setTabRoofColorType] = useState(0);
	const [tabWall, setTabWall] = useState(0);
	const [wallStatus, setWallStatus] = useState([0, 0, 0, 0]);

	const [tabDesc, setTabDesc] = useState(0);

	const [imageFrame, setImageFrame] = useState("");
	const [roofPictures, setRoofPictures] = useState(["", "", "", "", "", "", "", ""]);
	const [wallPictures, setWallPictures] = useState(["", "", "", ""]);

	////////////////////////////////////////

	const fetchProduct = async (id) => {
		if (!id) return;
		return await utils.getProductByWooId(id);
	};

	const fetchProductVariant = async (id) => {
		if (!id) return;
		return await utils.getVariantByWooProductId(id);
	};

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
		setShowProgress(true);

		// Part 1: 更改选项List信息 并 保存
		let selection = [...selectedAttribute];
		selection[index].map((attribute) => {
			if (attribute.id == id) {
				if (attribute.id === id_attribute_wallPrintedType) {
					attribute.option = stringFn.replaceSpace(event.target.value);
				} else {
					attribute.option = event.target.value;
				}
			}
		});
		// Part 1.5: Canopy Tent订制选项，根据Tent Size变更墙体Size
		if (id === 4) {
			let sizes = event.target.value.split("x");
			selection[10].map((attribute) => {
				if (attribute.id === 14) attribute.option = sizes[0] === "26" ? "13ft" : sizes[0] + "ft";
			});
			selection[11].map((attribute) => {
				if (attribute.id === 14) attribute.option = sizes[1] === "26" ? "13ft" : sizes[1] + "ft";
			});
			selection[12].map((attribute) => {
				if (attribute.id === 14) attribute.option = sizes[0] === "26" ? "13ft" : sizes[0] + "ft";
			});
			selection[13].map((attribute) => {
				if (attribute.id === 14) attribute.option = sizes[1] === "26" ? "13ft" : sizes[1] + "ft";
			});
		}
		setSelectedAttribute(selection);

		// Part 2: 根据选项从Variant List中查找对应产品数据 并 保存
		let sVariant = [...selectedVariant];
		let selected = productVariant[index].filter((variant) => {
			if (!variant.attributes) return false;

			let equal = true;
			for (let i = 0; i < variant.attributes.length; i++) {
				if (variant.attributes[i].option.toLowerCase() !== selection[index][i].option.toLowerCase()) {
					equal = false;
					break;
				}
			}
			return equal;
		});

		sVariant[index] = selected[0];
		// Part 2.5: Canopy Tent订制选项，根据Tent Size变更墙体Size
		if (id === id_attribute_canopySize) {
			let selectedA = productVariant[1].filter((variant) => {
				if (!variant.attributes) return false;

				let equal = true;
				for (let i = 0; i < variant.attributes.length; i++) {
					if (variant.attributes[i].option.toLowerCase() !== selection[1][i].option.toLowerCase()) {
						equal = false;
						break;
					}
				}
				return equal;
			});
			sVariant[1] = selectedA[0];
			let selectedB = productVariant[2].filter((variant) => {
				if (!variant.attributes) return false;

				let equal = true;
				for (let i = 0; i < variant.attributes.length; i++) {
					if (variant.attributes[i].option.toLowerCase() !== selection[2][i].option.toLowerCase()) {
						equal = false;
						break;
					}
				}
				return equal;
			});
			sVariant[2] = selectedB[0];
			let selectedC = productVariant[3].filter((variant) => {
				if (!variant.attributes) return false;

				let equal = true;
				for (let i = 0; i < variant.attributes.length; i++) {
					if (variant.attributes[i].option.toLowerCase() !== selection[3][i].option.toLowerCase()) {
						equal = false;
						break;
					}
				}
				return equal;
			});
			sVariant[3] = selectedC[0];
			let selectedD = productVariant[4].filter((variant) => {
				if (!variant.attributes) return false;

				let equal = true;
				for (let i = 0; i < variant.attributes.length; i++) {
					if (variant.attributes[i].option.toLowerCase() !== selection[4][i].option.toLowerCase()) {
						equal = false;
						break;
					}
				}
				return equal;
			});
			sVariant[4] = selectedD[0];
		}
		setSelectedVariant(sVariant);
	};

	const handleChangeTabRoofColorType = (event, newValue) => {
		setTabRoofColorType(newValue);

		if (newValue === 0) {
			setProductRoofColorType("plain");
		} else {
			setProductRoofColorType("printed");
		}
	};

	const handleChangeTabRoof = (event, newValue) => {
		setTabRoof(newValue);
	};
	const handleChangeTabWall = (event, newValue) => {
		setTabWall(newValue);
	};
	const handleChangeTabDesc = (event, newValue) => {
		setTabDesc(newValue);
	};

	const handleMainImage = () => {
		let series = productName.substring(0, 2).toLocaleUpperCase();

		let color = selectedVariant[1] ? selectedVariant[1].attributes.filter((attribute) => attribute.id === id_attribute_roofColor)[0].option.toLowerCase() : "white";
		let c = color === "white" ? "WH" : color === "black" ? "BK" : color === "blue" ? "BU" : color === "green" ? "GN" : color === "red" ? "RD" : color === "yellow" ? "YE" : "";

		let size = selectedVariant[0].attributes.filter((attribute) => attribute.id === id_attribute_canopySize)[0].option.toUpperCase();

		setMainImage({
			src: "/images/product/" + product.slug + "/frame/" + series + "-" + size + "-" + c + ".png",
		});
	};

	useEffect(() => {
		const id = urlFn.getParam("id");
		setProductId(id);
		const series = urlFn.getParam("series");
		setProductSeries(series);
		const size = urlFn.getParam("size");
		setProductSize(size);

		setShippedDay(dateFn.getReceivedDay());

		setShowProgress(true);

		fetchProduct(id).then((result) => setProduct(result));
	}, []);

	useEffect(() => {
		if (!product) return;

		setProductName(product.name);
		setProductType(product.type);

		if (productSeries === "y5" || productSeries === "y6") {
			setProductSizeSelection([...SelectionSize.slice(0, 3)]);
		} else if (productSeries === "y7") {
			setProductSizeSelection([...SelectionSize]);
		}

		// 获取保存各组件信息
		Promise.all(product.composite_components.map((conponent) => fetchProduct(conponent.default_option_id))).then((result) => setProductComponent(result));
	}, [product]);

	useEffect(() => {
		// 产品组成
		if (!productComponent || productComponent.length === 0) return;

		Promise.all(
			[{ id: productComponent[0].id }, { id: productComponent[1].id }, { id: productComponent[2].id }, { id: productComponent[3].id }, { id: productComponent[10].id }, { id: productComponent[14].id }].map((component) =>
				fetchProductVariant(component.id)
			)
		).then((result) =>
			setProductVariant([result[0], result[1], result[2], result[3], result[2], result[3], result[2], result[3], result[2], result[3], result[4], result[4], result[4], result[4], result[5], result[5], result[5], result[5]])
		);

		let vList = [];
		productComponent.map((component) => {
			let defaultAttributes = [...component.default_attributes];

			defaultAttributes.map((attribute) => {
				if (component.id === id_product_frame) {
					if (attribute.id === id_attribute_frameSeries) {
						if (productSeries === "y5") {
							attribute.option = "y5 economic";
						} else if (productSeries === "y6") {
							attribute.option = "y6 commercial";
						} else if (productSeries === "y7") {
							attribute.option = "Y7 heavy duty";
						} else {
							attribute.option = stringFn.replaceDash(attribute.option, 1);
						}
					} else if (attribute.id === id_attribute_canopySize) {
						if (productSize) attribute.option = productSize;
					}
				}
			});

			vList.push(defaultAttributes);
		});
		setSelectedAttribute(vList);
	}, [productComponent]);

	useEffect(() => {
		// 各产品组成变体
		if (!productVariant || productVariant.length === 0) return;

		let sVariant = [...selectedVariant];
		selectedAttribute.map((attribute, index) => {
			if (attribute.length === 0) return;

			let selected = productVariant[index].filter((variant) => {
				if (!variant.attributes) return false;

				if (productRoofColorType === "plain") {
					if (index > 1 && index < 10) return false;
				} else if (productRoofColorType === "printed") {
					if (index === 1) return false;
				}

				if (index > 9 && index < 14) {
					if (wallStatus[index - 10] === 0 || wallStatus[index - 10] === 2) return false;
				}

				if (index > 13 && index < 18) {
					if (wallStatus[index - 14] === 0 || wallStatus[index - 14] === 1) return false;
				}

				let equal = true;
				for (let i = 0; i < variant.attributes.length; i++) {
					if (variant.attributes[i].option.toLowerCase() !== attribute[i].option.toLowerCase()) {
						equal = false;
						break;
					}
				}
				return equal;
			});

			if (selected.length > 0) {
				sVariant[index] = selected[0];
			} else {
				sVariant[index] = undefined;
			}
		});

		setSelectedVariant(sVariant);
	}, [productVariant]);

	useEffect(() => {
		// 各产品组成变体
		if (!productVariant || productVariant.length === 0) return;

		let sVariant = [...selectedVariant];
		selectedAttribute.map((attribute, index) => {
			if (attribute.length === 0) return;

			let selected = productVariant[index].filter((variant) => {
				if (!variant.attributes) return false;

				if (productRoofColorType === "plain") {
					if (index > 1 && index < 10) return false;
				} else if (productRoofColorType === "printed") {
					if (index === 1) return false;
				}

				if (index > 9 && index < 14) {
					if (wallStatus[index - 10] === 0 || wallStatus[index - 10] === 2) return false;
				}

				if (index > 13 && index < 18) {
					if (wallStatus[index - 14] === 0 || wallStatus[index - 14] === 1) return false;
				}

				let equal = true;
				for (let i = 0; i < variant.attributes.length; i++) {
					if (variant.attributes[i].option.toLowerCase() !== attribute[i].option.toLowerCase()) {
						equal = false;
						break;
					}
				}
				return equal;
			});

			if (selected.length > 0) {
				sVariant[index] = selected[0];
			} else {
				sVariant[index] = undefined;
			}
		});

		setSelectedVariant(sVariant);
	}, [productRoofColorType]);

	useEffect(() => {
		// 各产品组成变体
		if (!productVariant || productVariant.length === 0) return;

		let sVariant = [...selectedVariant];
		wallStatus.map((item, index) => {
			if (item === 0) {
				sVariant[index + 10] = undefined;
				sVariant[index + 14] = undefined;
			} else if (item === 1) {
				if (selectedAttribute[index + 10].length === 0) return;

				let selected = productVariant[index + 10].filter((variant) => {
					if (!variant.attributes) return false;

					let equal = true;
					for (let i = 0; i < variant.attributes.length; i++) {
						if (variant.attributes[i].option.toLowerCase() !== selectedAttribute[index + 10][i].option.toLowerCase()) {
							equal = false;
							break;
						}
					}
					return equal;
				});

				if (selected.length > 0) {
					sVariant[index + 10] = selected[0];
				} else {
					sVariant[index + 10] = undefined;
				}
				sVariant[index + 14] = undefined;
			} else {
				if (selectedAttribute[index + 14].length === 0) return;

				let selected = productVariant[index + 14].filter((variant) => {
					if (!variant.attributes) return false;

					let equal = true;
					for (let i = 0; i < variant.attributes.length; i++) {
						if (variant.attributes[i].option.toLowerCase() !== selectedAttribute[index + 14][i].option.toLowerCase()) {
							equal = false;
							break;
						}
					}
					return equal;
				});

				if (selected.length > 0) {
					sVariant[index + 14] = selected[0];
				} else {
					sVariant[index + 14] = undefined;
				}
				sVariant[index + 10] = undefined;
			}
		});
		setSelectedVariant(sVariant);
	}, [wallStatus]);

	// useEffect(() => {
	//   // 已选各产品组成选项
	//   if (!selectedAttribute || productVariant.length === 0) return;
	// }, [selectedAttribute]);

	useEffect(() => {
		// 已选各产品组成变体
		if (!selectedVariant || selectedVariant.length === 0) return;
		let regularPrice = 0,
			salePrice = 0;

		let wallPicturesList = [...wallPictures];
		let available = [...availableList];

		handleMainImage();

		selectedVariant.map((variant, index) => {
			if (!variant) {
				if (index > 0) wallPicturesList[index - 1] = "";

				available[index].status = false;
				return;
			}

			if (index > 9 && index < 14) {
				// Set墙面图片
				let type = variant.attributes.filter((v) => v.id === 11)[0].option.toLowerCase();
				let size = selectedVariant[0].attributes.filter((v) => v.id === 4)[0].option.toLowerCase();
				let color = variant.attributes.filter((v) => v.id === 3)[0].option.toLowerCase();
				wallPicturesList[index - 1] = "/images/product/" + product.slug + "/wall/" + productName.substring(0, 2) + "-" + setWallImageUrl(index - 9, type, size, color);
			}

			regularPrice += variant.regular_price ? parseFloat(variant.regular_price) * totalCount : 0;
			salePrice += variant.on_sale ? (variant.sale_price ? parseFloat(variant.sale_price) * totalCount : 0) : variant.regular_price ? parseFloat(variant.regular_price) * totalCount : 0;

			// 检查可用性
			if (variant.stock_status === "instock") {
				available[index] = {
					status: true,
					quantity: variant.stock_quantity,
					id: variant.id,
					needed: totalCount,
				};
			} else {
				available[index] = {
					status: false,
					quantity: 0,
					id: variant.id,
					needed: totalCount,
				};
			}
		});
		setAvailableList(available);

		// Set墙面图片
		setWallPictures(wallPicturesList);

		if (selectedVariant.length > 0 && selectedVariant[0].attributes[1].option === "13x26") {
			if (selectedVariant[2]) {
				regularPrice += selectedVariant[2].regular_price ? parseFloat(selectedVariant[2].regular_price) * totalCount : 0;
				salePrice += selectedVariant[2].on_sale
					? selectedVariant[2].sale_price
						? parseFloat(selectedVariant[2].sale_price) * totalCount
						: 0
					: selectedVariant[2].regular_price
					? parseFloat(selectedVariant[2].regular_price) * totalCount
					: 0;
			}
			if (selectedVariant[4]) {
				regularPrice += selectedVariant[4].regular_price ? parseFloat(selectedVariant[4].regular_price) * totalCount : 0;
				salePrice += selectedVariant[4].on_sale
					? selectedVariant[4].sale_price
						? parseFloat(selectedVariant[4].sale_price) * totalCount
						: 0
					: selectedVariant[4].regular_price
					? parseFloat(selectedVariant[4].regular_price) * totalCount
					: 0;
			}
		}

		setTotalRegularPrice(regularPrice);
		setTotalSalePrice(salePrice === regularPrice ? 0 : salePrice);

		setShowProgress(false);
	}, [selectedVariant]);

	useEffect(() => {
		if (selectedAttribute.length === 0) return;

		let selectedProduct = [];

		let av = true;
		availableList.map((a, i) => {
			if (a.status) {
				let index = selectedProduct.findIndex((product) => product.id == a.id);

				if (i === 2 || i === 4) {
					let aa = selectedAttribute[i].find((attribute) => attribute.id === 14);
					if (aa && aa.option === "13ft") {
						if (index > -1) {
							selectedProduct[index].needed += a.needed * 2;
							if (selectedProduct[index].needed > selectedProduct[index].quantity) {
								av = false;
							}
						} else {
							selectedProduct.push({ ...a, needed: a.needed * 2 });
						}
					} else {
						if (index > -1) {
							selectedProduct[index].needed += a.needed;
							if (selectedProduct[index].needed > selectedProduct[index].quantity) {
								av = false;
							}
						} else {
							selectedProduct.push({ ...a });
						}
					}
				} else {
					if (index > -1) {
						selectedProduct[index].needed += a.needed;
						if (selectedProduct[index].needed > selectedProduct[index].quantity) {
							av = false;
						}
					} else {
						selectedProduct.push({ ...a });
					}
				}
			} else {
				if (i > 0) {
					let bb = selectedAttribute[i].find((attribute) => attribute.id === 11);
					if (bb && bb.option !== "none") {
						av = false;
					}
				} else {
					av = false;
				}
			}
		});

		setAvailable(av);
	}, [availableList]);

	useEffect(() => {
		if (totalCount === 0) return;

		let regularPrice = 0,
			salePrice = 0;

		let available = [...availableList];

		selectedVariant.map((variant, index) => {
			if (!variant) {
				available[index].status = false;
				return;
			}

			regularPrice += variant.regular_price ? parseFloat(variant.regular_price) * totalCount : 0;
			salePrice += variant.on_sale ? (variant.sale_price ? parseFloat(variant.sale_price) * totalCount : 0) : variant.regular_price ? parseFloat(variant.regular_price) * totalCount : 0;

			// 检查可用性
			if (variant.stock_status === "instock") {
				if (variant.stock_quantity) {
					if (totalCount <= variant.stock_quantity) {
						available[index] = {
							status: true,
							quantity: variant.stock_quantity,
							id: variant.id,
							needed: totalCount,
						};
					} else {
						available[index] = {
							status: false,
							quantity: variant.stock_quantity,
							id: variant.id,
							needed: totalCount,
						};
					}
				} else {
					available[index] = {
						status: true,
						quantity: variant.stock_quantity,
						id: variant.id,
						needed: totalCount,
					};
				}
			} else {
				available[index] = {
					status: false,
					quantity: 0,
					id: variant.id,
					needed: totalCount,
				};
			}
		});
		setAvailableList(available);

		if (selectedVariant.length > 0 && selectedVariant[0].attributes[1].option === "13x26") {
			if (selectedVariant[2]) {
				regularPrice += selectedVariant[2].regular_price ? parseFloat(selectedVariant[2].regular_price) * totalCount : 0;
				salePrice += selectedVariant[2].on_sale
					? selectedVariant[2].sale_price
						? parseFloat(selectedVariant[2].sale_price) * totalCount
						: 0
					: selectedVariant[2].regular_price
					? parseFloat(selectedVariant[2].regular_price) * totalCount
					: 0;
			}
			if (selectedVariant[4]) {
				regularPrice += selectedVariant[4].regular_price ? parseFloat(selectedVariant[2].regular_price) * totalCount : 0;
				salePrice += selectedVariant[4].on_sale
					? selectedVariant[4].sale_price
						? parseFloat(selectedVariant[4].sale_price) * totalCount
						: 0
					: selectedVariant[4].regular_price
					? parseFloat(selectedVariant[4].regular_price) * totalCount
					: 0;
			}
		}

		setTotalRegularPrice(regularPrice);
		setTotalSalePrice(salePrice === regularPrice ? 0 : salePrice);
	}, [totalCount]);

	const checkOut = () => {
		let productList = [];

		selectedVariant.map((variant, index) => {
			if (!variant) return;
			let count = totalCount;

			if (index === 2 || index === 4) {
				let sizeList = variant.attributes.filter((v) => v.id === 4);
				if (sizeList.length > 0) {
					let size = sizeList[0].option.toLowerCase();
					if (size === "13x26") {
						count = count * 2;
					}
				}
			}

			const i = productList.findIndex((e) => e.id === variant.id);
			if (i == -1) {
				const variation = variant.attributes.map((attr) => ({
					attribute: attr.name,
					value: attr.option,
				}));

				productList.push({
					id: variant.id,
					quantity: count,
					variation: variation,
				});
			} else {
				productList[i].quantity += count;
			}
		});
	};

	return (
		<Box className="page product" fontSize={14} lineHeight={1}>
			<div className="section-container-breadcrumbs">
				{product ? (
					<Container maxWidth="lg">
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
					</Container>
				) : null}
			</div>
			<div className={styles["container-page"]}>
				<Container maxWidth="lg">
					<Grid container spacing={6}>
						<Grid item xs={12} sm={6}>
							<div className={styles["container-product-image"]}>
								{imageFrame ? <img className={styles["product-image"]} src={productImage} /> : null}
								{wallPictures.map((picture, index) => {
									if (!picture) return;
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
												<div key={index} className="section-selection-container">
													<Selections
														label={
															<div>
																{"Choose your " + stringFn.replaceDash(attribute.name, 1)}
																<div
																	style={{
																		marginTop: 6,
																		marginBottom: 18,
																		color: "#06c",
																	}}
																>
																	{attribute.id === id_attribute_frameSeries ? "Which series is right for you?" : attribute.id === id_attribute_canopySize ? "Which size is right for you?" : ""}
																</div>
															</div>
														}
														defaultValue={productComponent[0].default_attributes[index].option}
														onChange={(event) => handleChangeRadio(event, 0, attribute.id)}
														list={attribute.id === id_attribute_canopySize ? productSizeSelection : attribute.options}
														id={attribute.id.toString()}
														type={"radio"}
													/>
												</div>
											))
									: null}
							</div>
							<div>
								{productComponent && productComponent[1] ? (
									<div className="section-selection-container">
										<div className="section-selection-tabs">
											<div>
												Choose your custom roofs.
												<div
													style={{
														marginTop: 6,
														color: "#06c",
													}}
												>
													Which roofs is right for you?
												</div>
											</div>
											<img src="/images/icon/front.png" style={{ marginLeft: 24 }} width={42} height={42} />
										</div>
										<Tabs value={tabRoofColorType} onChange={handleChangeTabRoofColorType} TabIndicatorProps={{ hidden: true }}>
											<Tab
												className="text-tab"
												classes={{
													root: "root-tab",
													selected: "tab-selected",
												}}
												label="Plain"
												disableRipple
											/>
											<Tab
												className="text-tab"
												classes={{
													root: "root-tab",
													selected: "tab-selected",
												}}
												label="Printed"
												disableRipple
											/>
										</Tabs>
										{tabRoofColorType === 0 ? (
											productComponent[1].attributes
												.filter((attribute) => attribute.variation)
												.map((attribute, index) => {
													if (attribute.id === id_attribute_canopySize) return;

													return (
														<div key={index} className="section-selection-container">
															<Selections defaultValue={productComponent[1].default_attributes[index].option} onChange={(event) => handleChangeRadio(event, 1, attribute.id)} list={attribute.options} id={attribute.id.toString()} />
														</div>
													);
												})
										) : (
											<>
												<Tabs value={tabRoof} onChange={handleChangeTabRoof} TabIndicatorProps={{ hidden: true }}>
													<Tab
														className="text-tab"
														classes={{
															root: "root-tab",
															selected: "tab-selected",
														}}
														label="Roof A"
														disableRipple
													/>
													<Tab
														className="text-tab"
														classes={{
															root: "root-tab",
															selected: "tab-selected",
														}}
														label="Roof B"
														disableRipple
													/>
													<Tab
														className="text-tab"
														classes={{
															root: "root-tab",
															selected: "tab-selected",
														}}
														label="Roof C"
														disableRipple
													/>
													<Tab
														className="text-tab"
														classes={{
															root: "root-tab",
															selected: "tab-selected",
														}}
														label="Roof D"
														disableRipple
													/>
												</Tabs>
												{[0, 1, 2, 3].map((roof, index) => {
													return <TabPanelRoof key={index} index={index} value={tabRoof} handleChangeRadio={handleChangeRadio} selectedAttribute={selectedAttribute} />;
												})}
											</>
										)}
									</div>
								) : null}
							</div>
							<div>
								{productComponent && productComponent[10] ? (
									<div className="section-selection-container">
										<div className="section-selection-tabs">
											<div>
												Choose your custom side walls.
												<div
													style={{
														marginTop: 6,
														color: "#06c",
													}}
												>
													Which size is right for you?
												</div>
											</div>
											<img src="/images/icon/front.png" style={{ marginLeft: 24 }} width={42} height={42} />
										</div>
										<Tabs value={tabWall} onChange={handleChangeTabWall} TabIndicatorProps={{ hidden: true }}>
											<Tab
												className="text-tab"
												classes={{
													root: "root-tab",
													selected: "tab-selected",
												}}
												label="Wall A"
												disableRipple
											/>
											<Tab
												className="text-tab"
												classes={{
													root: "root-tab",
													selected: "tab-selected",
												}}
												label="Wall B"
												disableRipple
											/>
											<Tab
												className="text-tab"
												classes={{
													root: "root-tab",
													selected: "tab-selected",
												}}
												label="Wall C"
												disableRipple
											/>
											<Tab
												className="text-tab"
												classes={{
													root: "root-tab",
													selected: "tab-selected",
												}}
												label="Wall D"
												disableRipple
											/>
										</Tabs>
										{[0, 1, 2, 3].map((roof, index) => {
											return (
												<TabPanelWall
													key={index}
													index={index}
													value={tabWall}
													handleChangeRadio={handleChangeRadio}
													productComponent={productComponent}
													selectedAttribute={selectedAttribute}
													selectedVariant={selectedVariant}
													wallStatus={wallStatus}
													setWallStatus={setWallStatus}
												/>
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
							<Checkout onClickLeft={() => totalCount !== 1 && setTotalCount(totalCount - 1)} onClickRight={() => setTotalCount(totalCount + 1)} count={totalCount} available={availableToCheckout} onClick={checkOut} />
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
							<Backdrop classes={{ root: "root-backdrop" }} open={showProgress}>
								<CircularProgress color={"inherit"} disableShrink />
							</Backdrop>
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
					<TabDescPanel value={tabDesc} index={0}>
						{productId === "25649" ? (
							// Y5 Economic Canopy
							<Grid container spacing={6}>
								<Grid item xs={12} md={6}>
									<img src="/images/y5-display.png" style={{ objectFit: "contain", width: "100%", height: 320 }} />
								</Grid>
								<Grid item xs={12} md={6} className="section-selection-container">
									<div>
										<div className="section-desc-container-title">Y5 Economic Canopy</div>
										<p className="section-desc-container-content">
											Our Y5 economic canopy series is the best outdoor patio canopy for daily use.
											<br />
											Available in 3 sizes and 6 colors.
										</p>
									</div>
									<ul className="section-desc-container-content">
										<li>User-friendly design for 45 seconds setup with 2 people.</li>
										<li>Steel made frame, zinc coated nuts and bolts, nylon bracket connectors.</li>
										<li>Protective covers, tie down straps, and steel stakes with every purchase.</li>
										<li>Instant pop up with one release button for 3 different heights adjustment from 5’2″ to 6’8″.</li>
										<li>Perfect for everyday use on your patio, garden, or deck.</li>
										<li>Comes with 1 year warranty.</li>
									</ul>
								</Grid>
							</Grid>
						) : null}
						{productId === "24229" ? (
							// Y6 Commercial Canopy
							<Grid container spacing={6}>
								<Grid item xs={12} md={6}>
									<img src="/images/y6-display.jpg" style={{ objectFit: "contain", width: "100%", height: 320 }} />
								</Grid>
								<Grid item xs={12} md={6} className="section-selection-container">
									<div>
										<div className="section-desc-container-title">Y6 Commercial Canopy</div>
										<p className="section-desc-container-content">
											Our Y6 commercial canopy series is the ultimate solution for small business and multi families. Stronger but lighter.
											<br />
											Available in 3 sizes and 6 colors.
										</p>
									</div>
									<ul className="section-desc-container-content">
										<li>User-friendly design for 45 seconds setup with 2 people.</li>
										<li>Aerospace grade hexagonal aluminum frame.</li>
										<li>Protective Covers, Tie Down Straps, and Steel Stakes with Every Purchase.</li>
										<li>Instant pop up with one release button for 3 different heights adjustment from 5’2″ to 6’8″.</li>
										<li>Perfect for commercial use and daily use.</li>
										<li>Comes with 5 years warranty.</li>
									</ul>
								</Grid>
							</Grid>
						) : null}
						{productId === "25659" ? (
							// Y7 Heavy Duty
							<Grid container spacing={6}>
								<Grid item xs={12} md={6}>
									<img
										src="/images/y7-display.jpg"
										style={{
											objectFit: "contain",
											width: "100%",
											height: 320,
										}}
									/>
								</Grid>
								<Grid item xs={12} md={6} className="section-selection-container">
									<div>
										<div className="section-desc-container-title">Y7 Heavy Duty</div>
										<p className="section-desc-container-content">
											Our Y7 heavy duty canopy series is the best heavy-duty canopy on the market. Unbeatable strength and durability while staying lightweight. Ideal option for commercial use.
											<br />
											Available in 8 sizes and 6 colors.
										</p>
									</div>
									<ul className="section-desc-container-content">
										<li>User-friendly design for 45 seconds setup with 2 people.</li>
										<li>Aerospace grade hexagonal aluminum frame.</li>
										<li>Thicker and lager pole compared to the other two series.</li>
										<li>Protective Covers, Tie Down Straps, and Steel Stakes with Every Purchase.</li>
										<li>Instant pop up with one release button for 3 different heights adjustment from 5’2″ to 6’8″. .</li>
										<li>Perfect for commercial use and all types of events.</li>
										<li>Comes with 10 years warranty.</li>
									</ul>
								</Grid>
							</Grid>
						) : null}
						<Box className="section-container" style={{ paddingLeft: 0, paddingRight: 0 }}>
							<List>
								<ListItem className="background-light-blue">
									<ListItemText className="section-image-package-listItem-subtitle section-image-package-listItem-subtitle-wrap" primary={"Shade Sq Ft"} />
									{productId === "25649" || productId === "24229" ? <ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"100 sq. ft, 150 sq. ft, 200 sq. ft"} /> : null}
									{productId === "25659" ? (
										<ListItemText className="section-image-package-listItem-content section-image-package-listItem-subtitle-wrap" primary={"100 sq. ft, 150 sq. ft, 200 sq. ft, 169 sq. ft, 256 sq. ft, 260 sq. ft, 338 sq. ft, 400 sq. ft"} />
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
						</Box>
						<img style={{ objectFit: "contain", width: "100%" }} src="/images/intro@1x.png" />
					</TabDescPanel>
				</Container>
			</Box>
			<Modal onClose={() => setShowSizeModal(false)} show={showSizeModal}>
				<img className="popup-image" src="/images/tent-spec/choose-size.jpg" />
			</Modal>
		</Box>
	);
}
