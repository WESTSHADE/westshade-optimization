import {Radio} from "@material-ui/core";

import {StringFn} from "../../utils/tools";

const stringFn = new StringFn();

import styles from "./selection.module.css";

const id_attribute_size = "0";
const id_attribute_color = "2";
const id_attribute_canopyColor = "3";
const id_attribute_canopySize = "4";
const id_attribute_wallType = "11";
const id_attribute_wallSize = "14";
const id_attribute_umbrellaSize = "15";
const id_attribute_wallPrintedType = "16";
const id_attribute_roofColor = "21";
const id_attribute_roofSize = "31";
const id_attribute_peakType = "32";
const id_attribute_valanceType = "33";
const id_attribute_frameSeries = "34";
const id_attribute_packageNo = "35";
const id_attribute_umbrellaMaterial = "37";
const id_attribute_inflatableCanopySize = "38";
const id_attribute_inflatableCanopyColor = "39";
const id_attribute_inflatableFrameColor = "40";
const id_attribute_printingTechnique = "44";

export default function Selection(props) {
    const {id, value, direction} = props;

    if (id === id_attribute_canopyColor || id === id_attribute_roofColor) {
        return (
            <Radio
                classes={{
                    root: styles["root"],
                }}
                disableRipple
                icon={<div className={styles["radio-color-dot"]} style={{backgroundColor: value}}/>}
                checkedIcon={
                    <>
                        <div className={styles["radio-outer-border"]}/>
                        <div className={styles["radio-color-dot"]} style={{backgroundColor: value}}/>
                    </>
                }
                {...props}
            />
        );
    } else if (id === id_attribute_canopySize) {
        return (
            <Radio
                classes={{
                    root: styles["root"],
                }}
                disableRipple
                icon={<img className={styles["radio-image"]} src={"/images/icon/" + value + ".svg"}/>}
                checkedIcon={
                    <>
                        <div className={styles["radio-outer-border"]}/>
                        <img className={styles["radio-image"]} src={"/images/icon/" + value + ".svg"}/>
                    </>
                }
                {...props}
            />
        );
    } else if (id === id_attribute_wallPrintedType) {
        return (
            <Radio
                classes={{
                    root: styles["root"],
                }}
                icon={<img className={styles["radio-image"]} src={"/images/icon/10x10.svg"}/>}
                checkedIcon={
                    <>
                        <div className={styles["radio-outer-border"]}/>
                        <img className={styles["radio-image"]} src={"/images/icon/10x10.svg"}/>
                    </>
                }
                disableRipple
                {...props}
            />
        );
    } else if (id === id_attribute_frameSeries) {
        if (direction === "row") {
            return (
                <Radio
                    classes={{
                        root: styles["root"],
                    }}
                    icon={<img className={styles["radio-image"]} src={"/images/icon/" + value.substring(0, 2) + ".png"}/>}
                    checkedIcon={
                        <>
                            <div className={styles["radio-outer-border"]}/>
                            <img className={styles["radio-image"]} src={"/images/icon/" + value.substring(0, 2) + ".png"}/>
                        </>
                    }
                    disableRipple
                    {...props}
                />
            );
        } else {
            return (
                <Radio
                    classes={{
                        root: styles["root"],
                    }}
                    icon={<img className={styles["radio-image"]} src={"/images/icon/" + stringFn.replaceSpace(value) + ".png"}/>}
                    checkedIcon={
                        <>
                            <div className={styles["radio-outer-border-large"]}/>
                            <img className={styles["radio-image"]} src={"/images/icon/" + stringFn.replaceSpace(value) + ".png"}/>
                        </>
                    }
                    disableRipple
                    {...props}
                />
            );
        }
    } else if (id === id_attribute_wallType) {
        return (
            <Radio
                classes={{
                    root: styles["root"],
                }}
                icon={<img className={styles["radio-image"]} src={"/images/icon/wall-" + value + ".png"}/>}
                checkedIcon={
                    <>
                        <div className={styles["radio-outer-border"]}/>
                        <img className={styles["radio-image"]} src={"/images/icon/wall-" + value + ".png"}/>
                    </>
                }
                disableRipple
                {...props}
            />
        );
    } else if (id === id_attribute_color) {
        let dotColor = value === "blood orange" ? "#BC3823" : value === "khaki" ? "khaki" : value === "pacific blue" ? "#1ca9c9" : value === "red" ? "red" : value;

        if (direction === "row") {
            return (
                <Radio
                    classes={{
                        root: styles["root"],
                    }}
                    icon={<div className={styles["radio-color-dot"]} style={{backgroundColor: dotColor}}/>}
                    checkedIcon={
                        <>
                            <div className={styles["radio-bottom-border"]}/>
                            <div className={styles["radio-color-dot"]} style={{backgroundColor: dotColor}}/>
                        </>
                    }
                    disableRipple
                    {...props}
                />
            );
        } else {
            return (
                <Radio
                    classes={{
                        root: styles["root"],
                    }}
                    icon={<img className={styles["radio-image"]} src={"/images/icon/canopy-tent-" + value + ".png"}/>}
                    checkedIcon={
                        <>
                            <div className={styles["radio-outer-border-large"]}/>
                            <img className={styles["radio-image"]} src={"/images/icon/canopy-tent-" + value + ".png"}/>
                        </>
                    }
                    disableRipple
                    {...props}
                />
            );
        }
    } else {
        return (
            <Radio
                classes={{
                    root: styles["root"],
                }}
                icon={<div className={styles["radio-blank"]}/>}
                checkedIcon={<div className={styles["radio-blank"]}/>}
                disableRipple
                {...props}
            />
        );
    }
}
