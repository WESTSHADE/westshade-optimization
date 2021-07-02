import { useEffect, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

import {
  Box,
  Button,
  ButtonGroup,
  Breadcrumbs,
  Container,
  Divider,
  Grid,
  IconButton,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import Utils from "../../../utils/utils";

const WallTabs = withStyles({
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
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);
const WallTab = withStyles({
  root: {
    minWidth: "unset",
    textTransform: "capitalize",
    fontSize: "0.825rem",
    "&:focus": {
      opacity: 1,
    },
  },
})((props) => <Tab disableRipple {...props} />);
const SelectLabel = withStyles({
  root: {
    position: "relative",
    padding: "4px 12px",
    marginLeft: 6,
    marginRight: 6,
  },
})((props) => <FormControlLabel {...props} />);
const SelectRadio = withStyles({
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
})((props) => <Radio color="default" {...props} />);
const LineButton = withStyles({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    textTransform: "capitalize",
    fontSize: "0.825rem",
    textDecoration: "underLine",
    color: "var(--gray)",
    fontWeight: "normal",
    "&:hover": {
      backgroundColor: "transparent",
      textDecoration: "underLine",
    },
  },
})((props) => <Button disableRipple {...props} />);

function StyledRadio(props) {
  const icon =
    props.attribute === "Size" ? (
      <img src={"/icon/" + props.value + ".svg"} />
    ) : props.attribute === "Color" ? (
      <div className="color-dot" style={{ backgroundColor: props.value }} />
    ) : props.attribute === "Wall" ? (
      <img src={"/icon/wall-" + props.value + ".png"} />
    ) : null;

  return (
    <SelectRadio
      icon={icon}
      checkedIcon={
        <>
          <div className="section-radio-border" />
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

const utils = new Utils();
const wallList = ["None", "Full", "Half", "Mesh", "PVC", "Rollup"];
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
      { key: 0, value: "A" },
      { key: 1, value: "B" },
      { key: 2, value: "C" },
      { key: 3, value: "D" },
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
      { key: "White", value: "WH" },
      { key: "Black", value: "BK" },
      { key: "Blue", value: "BU" },
      { key: "Green", value: "GN" },
      { key: "Red", value: "RD" },
      { key: "Yellow", value: "YE" },
    ],
  ],
]);

function setWallImageUrl(index, list) {
  const type = wallMap
    .get("type")
    .find((w) => w.key === list[index].type).value;
  const size = wallMap
    .get("size")
    .find((w) => w.key === list[0].size + "x" + list[1].size).value;
  const color = wallMap
    .get("color")
    .find((w) => w.key === list[index].color).value;
  const side = wallMap.get("side").find((w) => w.key === index).value;

  return type + size + color + "-" + side + ".png";
}

function TabPanel(props) {
  const {
    children,
    value,
    index,
    handle,
    wallSelection,
    regularPriceList,
    changeRegularPrice,
    salePriceList,
    changeSalePrice,
    changeWallSelection,
    availableList,
    checkAvailability,
    totalCount,
    ...other
  } = props;
  const [data, setData] = useState(null);
  const [options, setOptions] = useState([]);

  const setWallImage = () => {
    let url = setWallImageUrl(value, wallSelection);
    return "/product/" + handle + "/wall/Y6-" + url;
  };

  const fetchOtherProduct = async (name) => {
    if (!name) return;

    const product = await utils.getProductByName(name);
    // console.log("Product Name: " + product.title);
    // console.log("Product ID: " + product.id);
    setData(product);
  };

  const fetchOtherProductVariant = async () => {
    if (
      !wallSelection[value].data ||
      !wallSelection[value].size ||
      !wallSelection[value].color
    )
      return;

    let w = [...wallSelection];
    if (w[value].type !== "none") {
      const variant = await utils.getVariantByOptions(w[value].data, {
        Size: w[value].size == 26 ? "13" : w[value].size + "",
        Color: w[value].color,
      });
      // console.log(variant);
      // console.log("Variant Name: " + variant.title);
      // console.log("Variant ID: " + variant.id);
      // console.log("Variant Price: " + variant.price);
      // console.log("Variant In Stock: " + variant.available);
      let a = variant.available;
      if (variant.available) {
        // TODO: 对比库存与需求量，判断是否available.
        // const stock = await utils.getVariantStock(variant);
        // console.log("Variant Stock: " + stock);

        let need = 0;
        const filter = w.filter((w) => w.id === variant.id);
        filter.map((f) => {
          need += f.count;
        });
        // if (stock < need * totalCount) {
        //   a = false;
        // }
      }
      checkAvailability(value + 1, a);

      w[value].id = variant.id;
      w[value].src = setWallImage();
      handleChangeWallSelection(w);

      let rpl = [...regularPriceList];
      rpl[value + 1] = variant.compareAtPrice ? variant.compareAtPrice : "0";
      changeRegularPrice(rpl);

      let spl = [...salePriceList];
      spl[value + 1] = variant.price ? variant.price : "0";
      changeSalePrice(spl);
    } else {
      checkAvailability(value + 1, false);

      w[value].id = "";
      w[value].data = {};
      w[value].src = "";
      handleChangeWallSelection(w);

      let rpl = [...regularPriceList];
      rpl[value + 1] = "0";
      changeRegularPrice(rpl);

      let spl = [...salePriceList];
      spl[value + 1] = "0";
      changeSalePrice(spl);
    }
  };

  useEffect(() => {
    // console.log("Get Other Variant By New Size && Color.");
    fetchOtherProductVariant();
  }, [wallSelection[value].size, wallSelection[value].color]);

  useEffect(() => {
    if (!data) return;
    let w = [...wallSelection];
    w[value].data = data;
    handleChangeWallSelection(w);

    setOptions(data.options);

    // console.log("Get Other Variant By Default Size && Color.");
    fetchOtherProductVariant();
  }, [data]);

  const handleChangeWallSelection = (selection) => {
    let w = [...selection];

    // console.log(w);
    changeWallSelection(w);
  };

  const handleChangeOption = (event) => {
    let w = [...wallSelection];

    if (event.target.name === "color-radios-tab") {
      w[value].color = event.target.value;
    }

    handleChangeWallSelection(w);
  };

  const handleChangeWallType = (event) => {
    let w = [...wallSelection];

    if (event.target.value === "none") {
      setOptions([]);
      let rpl = [...regularPriceList];
      rpl[value + 1] = "0";
      changeRegularPrice(rpl);

      let spl = [...salePriceList];
      spl[value + 1] = "0";
      changeSalePrice(spl);

      w[value].type = "none";
      w[value].color = "White";
      w[value].count = 0;
      w[value].id = "";
      w[value].data = {};
      w[value].src = "";

      checkAvailability(value + 1, false);
    } else {
      fetchOtherProduct("plain-" + event.target.value + "-wall");
      w[value].type = event.target.value;
      if (w[value].size == 26) {
        w[value].count = 2;
      } else {
        w[value].count = 1;
      }
    }

    handleChangeWallSelection(w);
  };

  return (
    <div
      key={index}
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className="section-radio-group-container">
          <FormControl component="fieldset">
            <RadioGroup
              row
              defaultValue={"none"}
              aria-label={"wall-type"}
              name={"wall-type-radios"}
              value={wallSelection[value].type}
              onChange={handleChangeWallType}
              style={{ marginBottom: "24px" }}
            >
              {wallList.map((wall, i) => {
                return (
                  <SelectLabel
                    key={i}
                    value={wall.toLowerCase()}
                    control={<StyledRadio attribute={"Wall"} />}
                    label={wall}
                    labelPlacement="bottom"
                  />
                );
              })}
            </RadioGroup>
            {options.map(
              (option, index) =>
                option.name === "Color" && (
                  <RadioGroup
                    key={index}
                    row
                    defaultValue={option.values[0].value}
                    aria-label={option.name.toLowerCase() + "-" + index}
                    name={option.name.toLowerCase() + "-radios-tab"}
                    value={wallSelection[value].color}
                    onChange={handleChangeOption}
                  >
                    {option.values.map((o, i) => (
                      <SelectLabel
                        key={i}
                        value={o.value}
                        control={<StyledRadio attribute={option.name} />}
                        label={o.value}
                        labelPlacement="bottom"
                      />
                    ))}
                  </RadioGroup>
                )
            )}
          </FormControl>
        </div>
      )}
    </div>
  );
}

export default function Y6_Buy() {
  const [handle, setHandle] = useState("");
  const [data, setData] = useState(null);
  const [dataVariant, setVariant] = useState(null);
  const [options, setOptions] = useState([]);
  const [productName, setProductName] = useState("");
  const [sizeSelected, setSizeSelected] = useState("10x10");
  const [colorSelected, setColorSelected] = useState("White");
  const [tab, setTab] = useState(0);
  const [wallSelection, setWallSelection] = useState([
    {
      type: "none",
      color: "White",
      size: 10,
      count: 0,
      id: "",
      data: {},
      src: "",
    },
    {
      type: "none",
      color: "White",
      size: 10,
      count: 0,
      id: "",
      data: {},
      src: "",
    },
    {
      type: "none",
      color: "White",
      size: 10,
      count: 0,
      id: "",
      data: {},
      src: "",
    },
    {
      type: "none",
      color: "White",
      size: 10,
      count: 0,
      id: "",
      data: {},
      src: "",
    },
  ]);
  const [regularPriceList, setRPList] = useState(["0", "0", "0", "0", "0"]);
  const [salePriceList, setSPList] = useState(["0", "0", "0", "0", "0"]);
  const [totalRegularPrice, setTotalRegularPrice] = useState(0);
  const [totalSalePriceList, setTotalSalePriceList] = useState(0);
  const [totalCount, setTotalCount] = useState(1);
  const [availableList, setAvailableList] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [availableToCheckout, setAvailable] = useState(false);
  const [imageFrame, setImageFrame] = useState("");

  useEffect(() => {
    let str = window.location.href.split("/");
    let name = str[str.length - 1];

    setHandle(name);
    setFrameImage(name);
    fetchProduct(name);
  }, []);

  const setFrameImage = (product) => {
    if (!product) return;

    const size = sizeSelected.toUpperCase();
    const color =
      colorSelected === "White"
        ? "WH"
        : colorSelected === "Black"
        ? "BK"
        : colorSelected === "Blue"
        ? "BU"
        : colorSelected === "Green"
        ? "GN"
        : colorSelected === "Red"
        ? "RD"
        : colorSelected === "Yellow"
        ? "YE"
        : "";

    setImageFrame(
      "/product/" + product + "/frame/Y6-" + size + "-" + color + ".png"
    );
  };

  const fetchProduct = async (name) => {
    if (!name) return;

    const product = await utils.getProductByName(name);
    // console.log("Product Name: " + product.title);
    // console.log("Product ID: " + product.id);
    setData(product);
  };

  const fetchProductVariant = async () => {
    if (!data || !sizeSelected || !colorSelected) return;

    const variant = await utils.getVariantByOptions(data, {
      Size: sizeSelected,
      Color: colorSelected,
    });
    // console.log(variant);
    // console.log("Variant Name: " + variant.title);
    // console.log("Variant ID: " + variant.id);
    // console.log("Variant Price: " + variant.price);
    // console.log("Variant In Stock: " + variant.available);
    setVariant(variant);

    let a = variant.available;
    if (variant.available) {
      // TODO: 对比库存与需求量，判断是否available.
      // const stock = await utils.getVariantStock(variant);
      // console.log("Variant Stock: " + stock);
      // if (stock < totalCount) {
      //   a = false;
      // }
    }
    handleCheckAvailability(0, a);

    let rpl = [...regularPriceList];
    rpl[0] = variant.compareAtPrice ? variant.compareAtPrice : "0";
    changeRegularPrice(rpl);

    let spl = [...salePriceList];
    spl[0] = variant.price ? variant.price : "0";
    changeSalePrice(spl);
  };

  useEffect(() => {
    if (!dataVariant || dataVariant.selectedOptions.length < 1) return;

    dataVariant.selectedOptions.map((option) => {
      if (option.name === "Size") {
        handleWallSize(option.value);
      }
    });
  }, [dataVariant]);

  useEffect(() => {
    // console.log("Get Variant By New Size && Color.");
    fetchProductVariant();

    setFrameImage(handle);
  }, [sizeSelected, colorSelected]);

  useEffect(() => {
    if (!data) return;
    setProductName(data.title);
    setOptions(data.options);

    // console.log("Get Variant By Default Size && Color.");
    fetchProductVariant();
  }, [data]);

  const handleChangeRadio = (event) => {
    if (event.target.name === "color-radios") {
      setColorSelected(event.target.value);
    } else if (event.target.name === "size-radios") {
      setSizeSelected(event.target.value);
    }
  };

  const setWallImage = (index, list) => {
    if (list.type === "none" || !sizeSelected) return "";

    let url = setWallImageUrl(index, wallSelection);
    return "/product/" + handle + "/wall/Y6-" + url;
  };

  const handleWallSize = (size) => {
    let sizes = size.split("x");

    let newWallSelection = [...wallSelection];
    newWallSelection.map((wall, index) => {
      wall.size = sizes[index % 2];
    });
    newWallSelection.map((wall, index) => {
      wall.src = setWallImage(index, wall);
    });
    console.log(newWallSelection);
    // console.log("Set A-B-C-D Wall Size.");
    setWallSelection(newWallSelection);
  };

  const changeWallSelection = (selection) => {
    if (!selection) return;
    // console.log(selection);

    let newWallSelection = [...selection];
    setWallSelection(newWallSelection);
  };

  const changeRegularPrice = (priceList) => {
    if (!priceList) return;

    // console.log("Change Regular Price List.");
    // console.log(priceList);
    let pl = [...priceList];
    setRPList(pl);
  };

  const changeSalePrice = (priceList) => {
    if (!priceList) return;

    // console.log("Change Sale Price List.");
    // console.log(priceList);
    let pl = [...priceList];
    setSPList(pl);
  };

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const setTotalPrice = (priceList) => {
    if (!priceList || !wallSelection) return 0;

    let price = 0;
    priceList.map((p, index) => {
      if (index === 0) {
        let tp = parseFloat(p) * parseInt(totalCount);
        price += tp;
      } else {
        let tp =
          parseFloat(p) *
          parseInt(wallSelection[index - 1].count) *
          parseInt(totalCount);
        price += tp;
      }
    });

    // console.log("setTotalPrice");
    // console.log(price);
    return price;
  };

  useEffect(() => {
    if (!regularPriceList || !wallSelection) return;

    let price = setTotalPrice(regularPriceList);
    setTotalRegularPrice(price);
  }, [regularPriceList]);

  useEffect(() => {
    if (!salePriceList || !wallSelection) return;

    let price = setTotalPrice(salePriceList);
    setTotalSalePriceList(price);
  }, [salePriceList]);

  useEffect(() => {
    let rp = setTotalPrice(regularPriceList);
    setTotalRegularPrice(rp);
    let sp = setTotalPrice(salePriceList);
    setTotalSalePriceList(sp);
  }, [totalCount]);

  const handleCheckAvailability = (index, available) => {
    let al = [...availableList];
    al[index] = available;
    // console.log(index);
    // console.log(available);

    // console.log("Change Availability List.");
    setAvailableList(al);
  };

  useEffect(() => {
    let av = false;
    // console.log(availableList);
    availableList.map((a, i) => {
      if (a) {
        av = true;
      } else {
        av = false;
        if (i > 0 && wallSelection[i - 1].type === "none") {
          av = true;
        }
      }
    });

    // console.log(av);
    setAvailable(av);
  }, [availableList]);

  const fetchCheckOut = async (list) => {
    if (!list.length) return;

    const checkoutUrl = await utils.checkout(list);

    // console.log(checkoutUrl);
    // console.log("Checkout URL: " + checkoutUrl.webUrl);
    window.open(checkoutUrl.webUrl, "_blank");
  };

  const checkOut = () => {
    let productList = [];
    productList.push({
      variantId: dataVariant.id,
      quantity: totalCount,
    });

    wallSelection.map((w) => {
      if (!w.id || w.count < 1) return;
      // const index = productList.findIndex((e) => e.id === w.id);
      // if (index == -1) {
      //   productList.push({
      //     variantId: w.id,
      //     quantity: w.count * totalCount,
      //   });
      // } else {
      //   productList[index].count += w.count * totalCount;
      // }
      productList.push({
        variantId: w.id,
        quantity: w.count * totalCount,
      });
    });

    console.log(productList);
    fetchCheckOut(productList);
  };

  // useEffect(() => {
  //   console.log(wallSelection);
  // }, [wallSelection]);

  return (
    <div className="page product">
      <Box className="section-navbar-container section-container-breadcrumb">
        <Container maxWidth="md">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" onClick={handleClick}>
              Home
            </Link>
            <Link color="inherit" href="/" onClick={handleClick}>
              Products
            </Link>
            <Typography color="textPrimary">Y6 Commercial Canopy</Typography>
          </Breadcrumbs>
        </Container>
      </Box>
      <Box className="section-container">
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} style={{ position: "relative" }}>
              <div className="product-image-container">
                {imageFrame ? (
                  <img className="product-image" src={imageFrame} />
                ) : null}
                {wallSelection.map(
                  (w, index) =>
                    w.src && (
                      <img key={index} className="product-image" src={w.src} />
                    )
                )}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} className="section-selection-container">
              <div className="section-selection-container-title">
                {productName}
              </div>
              <p className="section-selection-container-description">
                Perfect for everyday use.
                <br />
                Ideal for your patio, garden, or deck. Steel Frame.
              </p>
              <div className="section-selection-container">
                {options.map((option, index) => {
                  return (
                    <FormControl key={index} component="fieldset">
                      <FormLabel>
                        <div className="section-selection-title">
                          Choose your frame {option.name}
                          {option.name === "Color" ? (
                            <p className="section-selection-subtitle">
                              Custom printing with your own design
                            </p>
                          ) : null}
                        </div>
                      </FormLabel>
                      <RadioGroup
                        row
                        defaultValue={option.values[0].value}
                        aria-label={option.name.toLowerCase()}
                        name={option.name.toLowerCase() + "-radios"}
                        onChange={handleChangeRadio}
                      >
                        {option.values.map((v, i) => (
                          <SelectLabel
                            key={i}
                            value={v.value}
                            control={<StyledRadio attribute={option.name} />}
                            label={v.value}
                            labelPlacement="bottom"
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  );
                })}
                <div className="section-selection-tabs section-selection-title">
                  <span>Choose your side walls</span>
                  <Image
                    src="/wall@2x.png"
                    width={42}
                    height={42}
                    layout="intrinsic"
                  />
                </div>
                <WallTabs
                  aria-label="wall-tabs"
                  value={tab}
                  onChange={handleChangeTab}
                >
                  <WallTab
                    label="Wall A"
                    icon={<img src="/icon/wall-a.png" />}
                  />
                  <WallTab
                    label="Wall B"
                    icon={<img src="/icon/wall-b.png" />}
                  />
                  <WallTab
                    label="Wall C"
                    icon={<img src="/icon/wall-c.png" />}
                  />
                  <WallTab
                    label="Wall D"
                    icon={<img src="/icon/wall-d.png" />}
                  />
                </WallTabs>
                {[0, 1, 2, 3].map((index) => (
                  <TabPanel
                    key={index}
                    index={index}
                    value={tab}
                    handle={handle}
                    wallSelection={wallSelection}
                    changeWallSelection={changeWallSelection}
                    regularPriceList={regularPriceList}
                    changeRegularPrice={changeRegularPrice}
                    salePriceList={salePriceList}
                    changeSalePrice={changeSalePrice}
                    availableList={availableList}
                    checkAvailability={handleCheckAvailability}
                    totalCount={totalCount}
                  />
                ))}
              </div>
              <div className="section-price-container">
                <span
                  className="product-price product-regular-price"
                  style={{ textDecoration: "line-through" }}
                >
                  ${parseFloat(totalRegularPrice).toFixed(2)}
                </span>
                <span className="product-price product-sales-price">
                  ${parseFloat(totalSalePriceList).toFixed(2)}
                </span>
              </div>
              <div className="section-checkout-container">
                <ButtonGroup
                  variant="contained"
                  className="section-check-butto-group"
                  disableElevation
                >
                  <IconButton
                    aria-label="minus"
                    onClick={() =>
                      totalCount !== 0 && setTotalCount(totalCount - 1)
                    }
                  >
                    <FontAwesomeIcon icon={faMinus} size="1x" />
                  </IconButton>
                  <div className="product-counter">{totalCount}</div>
                  <IconButton
                    aria-label="plus"
                    onClick={() => setTotalCount(totalCount + 1)}
                  >
                    <FontAwesomeIcon icon={faPlus} size="1x" />
                  </IconButton>
                </ButtonGroup>
                <Button
                  variant="contained"
                  className="checkout-button"
                  onClick={checkOut}
                  disabled={!availableToCheckout}
                >
                  Add to Cart
                </Button>
              </div>
              <p className="product-ship-day">
                Order today and get it shipped by Monday.
              </p>
              <div className="section-line-button-container">
                <LineButton className="button-underline">Size Guide</LineButton>
                <Divider
                  orientation="vertical"
                  className="line-button-divider"
                />
                <LineButton className="button-underline">
                  Shipping &amp; Return
                </LineButton>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <div className="y6-buy screen">
        <img className="line-16-C61RwL" src="/line-16@2x.svg" />
        <div className="group-58-C61RwL">
          <img className="y6-display-GZmYSZ" src="/y6-display@1x.png" />
          <div className="flex-col-GZmYSZ">
            <div className="y6-commercial-canopy-Xrj2o3">
              Y6 Commercial Canopy
            </div>
            <p className="our-y6-commerci-es-and-6-colors-Xrj2o3 roboto-normal-gray-12px">
              Our Y6 commercial canopy series is the ultimate solution for small
              business and multi families. Stronger but lighter.
              <br />
              Available in 3 sizes and 6 colors.
            </p>
            <div className="overlap-group3-Xrj2o3">
              <p className="user-friendly-d-years-warranty-By3PZU roboto-normal-gray-11px">
                User-friendly design for 45 seconds setup with 2 people.
                <br />
                Aerospace grade hexagonal aluminum frame.
                <br />
                Protective covers, tie down straps, and steel stakes with every
                purchase.
                <br />
                Instant pop up with one release button for 3 different heights
                adjustment from 5’2″ to 6’8″.
                <br />
                Perfect for commercial use and daily use.
                <br />
                Comes with 5 years warranty.
              </p>
              <div className="x-By3PZU roboto-normal-gray-11px">
                -<br />-<br />-<br />-<br />
                <br />-<br />-
              </div>
            </div>
          </div>
        </div>
        <div className="group-59-C61RwL">
          <div className="overlap-group7-rdL5Qr">
            <div className="rectangle-31-VSvx6v"></div>
            <div className="shade-sq-ft-VSvx6v roboto-medium-black-11px">
              Shade Sq Ft
            </div>
            <p className="x100-sq-ft-150-sq-ft-200-sq-ft-VSvx6v roboto-normal-gray-11px">
              100 sq. ft, 150 sq. ft, 200 sq. ft
            </p>
          </div>
          <div className="flex-row-rdL5Qr">
            <div className="material-xh7Ff7 roboto-medium-black-11px">
              Material
            </div>
            <div className="aluminum-xh7Ff7 roboto-normal-gray-11px">
              Aluminum
            </div>
          </div>
          <div className="overlap-group4-rdL5Qr">
            <div className="rectangle-30-coHMfr"></div>
            <div className="height-coHMfr roboto-medium-black-11px">Height</div>
            <div className="x52-68-coHMfr roboto-normal-gray-11px">
              5’2″ - 6’8″
            </div>
          </div>
          <div className="flex-row-944cXF">
            <div className="shape-MtfQ8r roboto-medium-black-11px">Shape</div>
            <div className="hexagon-MtfQ8r roboto-normal-gray-11px">
              Hexagon
            </div>
          </div>
          <div className="overlap-group8-rdL5Qr">
            <div className="rectangle-33-xJ1D0F"></div>
            <div className="bracket-connector-material-xJ1D0F roboto-medium-black-11px">
              Bracket Connector Material
            </div>
            <div className="nylon-xJ1D0F roboto-normal-gray-11px">Nylon</div>
          </div>
          <div className="flex-row-9dS1yD">
            <div className="pole-thickness-1bzXU9 roboto-medium-black-11px">
              Pole Thickness
            </div>
            <div className="x18mm-1bzXU9 roboto-normal-gray-11px">1.8mm</div>
          </div>
          <div className="overlap-group5-rdL5Qr">
            <div className="rectangle-32-txlk4t"></div>
            <div className="pole-diameter-txlk4t roboto-medium-black-11px">
              Pole Diameter
            </div>
            <div className="x57mm-txlk4t roboto-normal-gray-11px">57mm</div>
          </div>
          <div className="flex-row-BiHZVJ">
            <div className="footpad-material-x70bBR roboto-medium-black-11px">
              Footpad Material
            </div>
            <div className="heavy-duty-zinc-steel-x70bBR roboto-normal-gray-11px">
              Heavy Duty Zinc Steel
            </div>
          </div>
          <div className="overlap-group6-rdL5Qr">
            <div className="rectangle-34-XbORxi"></div>
            <div className="cpai-84-fire-re-rdant-certified-XbORxi roboto-medium-black-11px">
              CPAI-84 Fire Retardant Certified
            </div>
            <div className="yes-XbORxi roboto-normal-gray-11px">Yes</div>
          </div>
        </div>
      </div>
    </div>
  );
}
