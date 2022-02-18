import {useEffect, useReducer, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Carousel} from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import Image from "next/image"
import Link from "next/link"

import {Block} from "baseui/block"
import {ArrowLeft, ArrowRight} from 'baseui/icon'

import {Modal} from "Components/surfaces";
import Button from "Components/Button/V1"
import ProgressBar from "Components/ProgressBar"
import TentSizeSelection from "Components/Sections/TentSizeSelection"
import FrameSelection from "Components/Sections/FrameSelection"
import PrintingMethodSelection from "Components/Sections/PrintingMethodSelection"
import RequirementSelection from "Components/Sections/RequirementSelection"
import Checkout from "Components/Checkout";
import ThemeProvider from "Components/ThemeProvider";

import {EventEmitter} from "Utils/events";
import Utils from "Utils/utils";

import {updateUser} from "../../redux/actions/userActions"
import {modifyCart} from "../../redux/actions/cartActions"

import {productReducer, reducer, stepReducer, initialState, initialProduct, initialSteps} from "Assets/states/custom-printed-canopy-tent"
import {printingMethods, frameTypes, tentSizes} from "Assets/constants/custom-printend-canopy-tent"

const utils = new Utils();

const Index = ({product, productVariant, productComponent, pageState, printingMethods, frameTypes, tentSizes}) => {
    const reduxDispatch = useDispatch();

    const {loggedIn, token, user} = useSelector(({user}) => user);
    const {cart} = useSelector(({cart}) => cart);

    const [state, dispatch] = useReducer(reducer, pageState.initialState);
    const [steps, stepDispatch] = useReducer(stepReducer, pageState.initialSteps);
    const [productState, productDispatch] = useReducer(productReducer, pageState.initialProduct);

    const [images, setImages] = useState([
        {src: "/images/custom-printed-canopy-tent/tents/Y7-10x10/0-default-with-logo/Y7-10X10-WH.webp"}
    ]);
    const [summaryIsOpen, setSummaryIsOpen] = useState(false)
    const [framePrices, setFramePrices] = useState([])
    const [acceptedFrameTypes, setAcceptedFrameTypes] = useState([...frameTypes])

    let myData = Object.keys(steps.allSteps).map(key => steps.allSteps[key])
    //---- actions for printing details ----//

    const selectSize = (payload) => {
        if (!["10x10", "10x15", "10x20"].includes(payload.size)) {
            dispatch({type: "SET_FRAME", payload: {frame: "Y7"}});
            dispatch({type: "SET_SIZE", payload});
            stepDispatch({type: "SET_OPTION_IS_DONE"})
        } else {
            dispatch({type: "SET_SIZE", payload});
            stepDispatch({type: "SET_OPTION_IS_DONE"})
        }
    }
    const selectFrame = (payload) => {
        if (payload.frame === 'Y7') {
            dispatch({type: "SET_FRAME", payload});
            stepDispatch({type: "SET_OPTION_IS_DONE"});
        } else {
            dispatch({type: "SET_FRAME", payload});
            stepDispatch({type: "SET_OPTION_IS_DONE"});
            if (!["10x10", "10x15", "10x20"].includes(state.size)) {
                dispatch({type: "SET_SIZE", payload: {size: "10x10"}});
            }
        }

    }
    const selectPrintingMethod = (payload) => {
        dispatch({type: "SET_PRINTING_METHOD", payload});
        stepDispatch({type: "SET_OPTION_IS_DONE"});
    }
    // const selectPrintingRequirement = (key, side, payload, allSides) => {
    //     if (!allSides) {
    //         dispatch({type: "SET_PRINTING_REQUIREMENTS", payload: {...state.printReq, [key]: {...state.printReq[key], [side]: payload}}});
    //         stepDispatch({type: "SET_OPTION_IS_DONE"});
    //     } else {
    //         dispatch({type: "SET_PRINTING_REQUIREMENTS", payload: {...state.printReq, [key]: {...state.printReq[key], LEFT: payload, RIGHT: payload, FRONT: payload, BACK: payload}}});
    //         stepDispatch({type: "SET_OPTION_IS_DONE"});
    //     }
    // }
    const selectPrintingRequirement = (keys, side, payloads, allSides) => {
        if (!allSides) {
            dispatch({type: "SET_PRINTING_REQUIREMENTS", payload: {...state.printReq, [keys[0]]: {...state.printReq[keys[0]], [side]: payloads[0]}, [keys[1]]: {...state.printReq[keys[1]], [side]: payloads[1]}}});
            stepDispatch({type: "SET_OPTION_IS_DONE"});
        } else {
            dispatch({
                type: "SET_PRINTING_REQUIREMENTS",
                payload: {
                    ...state.printReq,
                    [keys[0]]: {...state.printReq[keys[0]], LEFT: payloads[0], RIGHT: payloads[0], FRONT: payloads[0], BACK: payloads[0]},
                    [keys[1]]: {...state.printReq[keys[1]], LEFT: payloads[1], RIGHT: payloads[1], FRONT: payloads[1], BACK: payloads[1]}
                }
            });
            stepDispatch({type: "SET_OPTION_IS_DONE"});
        }
    }
    const clearRequirement = (side) => {
        dispatch({type: "SET_PRINTING_REQUIREMENTS", payload: {...state.printReq, "peak": {...state.printReq["peak"], [side]: {}}, "valance": {...state.printReq["valance"], [side]: {}}}});
        stepDispatch({type: "SET_OPTION_IS_DONE"});
    }
    const selectSide = (payload) => {
        dispatch({type: "SET_ACTIVE_SIDE", payload});
    }

    //---- end of actions for printing details ----//


    //---- actions for navigating the custom printing flow ----//
    const nextStep = () => {
        if (steps.allSteps[steps.currentKey].status.done) {
            if (steps.currentStep !== 3) {
                stepDispatch({type: "SET_NEXT_STEP", payload: {key: myData[steps.currentStep + 1].code}})
            } else {
                stepDispatch({type: "SET_DONE"})
                dispatch({type: "SET_ACTIVE_CUSTOMIZER", payload: {activeCustomizer: false}});
            }
        } else {
            if (steps.currentKey === "requirement" && determineSides().length === 0) {
                stepDispatch({type: "SET_ERROR"})
            } else if (steps.currentStep !== 3) {
                stepDispatch({
                    type: "SET_DEFAULT_AND_NEXT",
                    payload: {steps: {...steps.allSteps, [steps.currentKey]: {...steps.allSteps[steps.currentKey], status: {...steps.allSteps[steps.currentKey].status, done: true}}}, key: myData[steps.currentStep + 1].code}
                })
            } else {
                stepDispatch({type: "SET_DONE"})
                dispatch({type: "SET_ACTIVE_CUSTOMIZER", payload: {activeCustomizer: false}});
            }
        }
    }
    const prevStep = () => {
        if (steps.currentStep === 0) {

        } else {
            stepDispatch({type: "SET_PREV_STEP", payload: {key: myData[steps.currentStep - 1].code}})
        }
    }
    //---- end of actions for navigating the custom printing flow ----//

    const clearCustomization = () => {
        dispatch({type: "RESET", payload: pageState.initialState})
        stepDispatch({type: "RESET", payload: pageState.initialSteps})
        productDispatch({type: "RESET", payload: {initialState: pageState.initialProduct}})
    }

    const determineSides = () => {
        let printedSides = [];
        const peakKeys = Object.keys(state.printReq.peak)
        const valanceKeys = Object.keys(state.printReq.valance)
        peakKeys.map((key) => {
            if (Object.keys(state.printReq.peak[key]).length !== 0 && !printedSides.includes(key)) {
                printedSides.push(key.charAt(0).toUpperCase() + key.slice(1))
            }
        })
        valanceKeys.map((key) => {
            if (Object.keys(state.printReq.valance[key]).length !== 0 && !printedSides.includes(key)) {
                printedSides.push(key.charAt(0).toUpperCase() + key.slice(1))
            }
        })
        return printedSides.join(", ")
    }

    const getFrameVariant = () => {
        const variant = productVariant[0].filter((item, idx) => {
            if (item.attributes[0].option === state.size && item.attributes[1].option.includes(state.frame)) {
                return item;
            }
        })
        return variant[0]
    }
    const getRoofVariant = () => {
        let roofVariant = {}
        let sideSizes = state.size.split("x");
        let printedSides = determineSides().split(", ")
        roofVariant.roofSize = sideSizes[0]
        roofVariant.roofSizeII = sideSizes[1]
        roofVariant.numbers = {number: 0, number1: 0}
        printedSides.forEach(item => {
            if (item === "FRONT" || item === "BACK") {
                roofVariant.numbers.number1++
            } else {
                roofVariant.numbers.number++
            }
        })
        let variant = []
        if (roofVariant.roofSize === roofVariant.roofSizeII && ((roofVariant.numbers.number === 0 && roofVariant.numbers.number1 === 2) || (roofVariant.numbers.number === 2 && roofVariant.numbers.number1 === 0))) {
            variant = productVariant[1].filter((item) => {
                if (item.attributes[0].option === (roofVariant.roofSize + "ft") &&
                    item.attributes[1].option === (roofVariant.roofSizeII + "ft") &&
                    parseInt(item.attributes[2].option) === 1 &&
                    parseInt(item.attributes[3].option) === 1 &&
                    item.attributes[4].option.toUpperCase() === state.printingMethod) {
                    return item;
                }
            })
        } else if (roofVariant.roofSize === roofVariant.roofSizeII && ((roofVariant.numbers.number === 1 && roofVariant.numbers.number1 === 0))) {
            variant = productVariant[1].filter((item) => {
                if (item.attributes[0].option === (roofVariant.roofSize + "ft") &&
                    item.attributes[1].option === (roofVariant.roofSizeII + "ft") &&
                    parseInt(item.attributes[2].option) === 0 &&
                    parseInt(item.attributes[3].option) === 1 &&
                    item.attributes[4].option.toUpperCase() === state.printingMethod) {
                    return item;
                }
            })
        } else if (roofVariant.roofSize === roofVariant.roofSizeII && ((roofVariant.numbers.number === 2 && roofVariant.numbers.number1 === 1))) {
            variant = productVariant[1].filter((item) => {
                if (item.attributes[0].option === (roofVariant.roofSize + "ft") &&
                    item.attributes[1].option === (roofVariant.roofSizeII + "ft") &&
                    parseInt(item.attributes[2].option) === 1 &&
                    parseInt(item.attributes[3].option) === 2 &&
                    item.attributes[4].option.toUpperCase() === state.printingMethod) {
                    return item;
                }
            })
        } else {
            variant = productVariant[1].filter((item) => {
                if (item.attributes[0].option === (roofVariant.roofSize + "ft") &&
                    item.attributes[1].option === (roofVariant.roofSizeII + "ft") &&
                    parseInt(item.attributes[2].option) === roofVariant.numbers.number &&
                    parseInt(item.attributes[3].option) === roofVariant.numbers.number1 &&
                    item.attributes[4].option.toUpperCase() === state.printingMethod) {
                    return item;
                }
            })
        }
        return variant[0]
    }

    const getProductList = () => {
        let productList = []

        const roofVariation = [{
            attribute: "Roof Size",
            value: state.size
        }, {
            attribute: "Printed Sides",
            value: determineSides().split(", ").length
        }, {
            attribute: "Printing Method",
            value: state.printingMethod
        }];
        const roofAttributes = productState.roofVariant.attributes.map((attr) => ({
            name: attr.name,
            option: attr.option
        }));

        const frameVariation = productState.frameVariant.attributes.map((attr) => ({
            attribute: attr.name,
            value: attr.option
        }));
        const frameAttributes = productState.frameVariant.attributes.map((attr) => ({
            name: attr.name,
            option: attr.option
        }));


        // productList.push({
        //     id: productState.roofVariant.id,
        //     quantity: productState.bag.totalCount,
        //     variation: roofVariation,
        //     entryId: productState.entryId
        // }, {
        //     id: productState.frameVariant.id,
        //     quantity: productState.bag.totalCount,
        //     variation: frameVariation,
        //     entryId: productState.entryId
        // });

        productList.push({
            id: 61289,
            quantity: productState.bag.totalCount,
            entryId: productState.entryId,
            variation: roofVariation,
            component: [{
                id: productState.roofVariant.id,
                quantity: 1,
                variation: roofVariation,
                attributes: roofAttributes,
                entryId: productState.entryId
            }, {
                id: productState.frameVariant.id,
                quantity: 1,
                variation: frameVariation,
                attributes: frameAttributes,
                entryId: productState.entryId
            }]
        })

        return productList;
    }

    const editDetails = () => {
        dispatch({type: "SET_ACTIVE_CUSTOMIZER", payload: {activeCustomizer: true}})
        stepDispatch({type: "SET_EDIT_DETAILS"})
    }

    const addToCart = () => {
        if (!steps.done && !productState.entryId) return;
        let cl = JSON.parse(JSON.stringify(cart));
        cl = cl.concat([...getProductList()]);
        if (loggedIn) {
            let userData = {
                meta_data: [
                    {
                        key: "cart",
                        value: cl
                    },
                ],
            };
            reduxDispatch(updateUser(token, userData));
            EventEmitter.dispatch("handleCart", true);
        } else {
            reduxDispatch(modifyCart({cart: cl}))
            EventEmitter.dispatch("handleCart", true);
        }
    }
    const closeCustomizer = () => {
        dispatch({type: "RESET", payload: pageState.initialState})
        stepDispatch({type: "RESET", payload: pageState.initialSteps})
        productDispatch({type: "RESET", payload: {initialState: pageState.initialProduct}})
    }

    const handleSendDetails = async () => {
        return;

        if (productState.entryId) {
            const res = await utils.updateContact({
                form_id: "6",
                id: productState.entryId,
                status: "active",
                1: "Custom Printing tent",
                5: (state.printReq.peak.FRONT.background?.type === "COLOR" ? "Peak: " + state.printReq.peak.FRONT.background?.value + "; " : "") + (state.printReq.valance.FRONT.background?.type === "COLOR" ? "Valance: " + state.printReq.valance.FRONT.background?.value + ";" : ""),
                6: (state.printReq.peak.FRONT.text?.content ? "Peak: " + state.printReq.peak.FRONT.text?.content + "; " : "") + (state.printReq.valance.FRONT.text?.content ? "Valance: " + state.printReq.peak.FRONT.text?.content + ";" : ""),
                7: (state.printReq.peak.FRONT.text?.font || state.printReq.peak.FRONT.text?.color ? "Peak: " + state.printReq.peak.FRONT.text?.font + " " + state.printReq.peak.FRONT.text?.color + "; " : "") + (state.printReq.valance.FRONT.text?.font || state.printReq.valance.FRONT.text?.color ? "Valance: " + state.printReq.valance.FRONT.text?.font + " " + state.printReq.valance.FRONT.text?.color + "; " : ""),
                8: (state.printReq.peak.FRONT.printInstruction ? "Peak: " + state.printReq.peak.FRONT.printInstruction + "; " : "") + (state.printReq.valance.FRONT.printInstruction ? "Valance: " + state.printReq.valance.FRONT.printInstruction + "; " : ""),
                55: state.printReq.peak.FRONT.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.FRONT.background?.value.filename : "",
                56: state.printReq.valance.FRONT.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.FRONT.background?.value.filename : "",
                57: state.printReq.peak.FRONT.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.FRONT.logo?.filename : "",
                58: state.printReq.valance.FRONT.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.valance.FRONT.logo?.filename : "",
                10: (state.printReq.peak.BACK.background?.type === "COLOR" ? "Peak: " + state.printReq.peak.BACK.background?.value + "; " : "") + (state.printReq.valance.BACK.background?.type === "COLOR" ? "Valance: " + state.printReq.valance.BACK.background?.value + ";" : ""),
                13: (state.printReq.peak.BACK.text?.content ? "Peak: " + state.printReq.peak.BACK.text?.content + "; " : "") + (state.printReq.valance.BACK.text?.content ? "Valance: " + state.printReq.peak.BACK.text?.content + ";" : ""),
                14: (state.printReq.peak.BACK.text?.font || state.printReq.peak.BACK.text?.color ? "Peak: " + state.printReq.peak.BACK.text?.font + " " + state.printReq.peak.BACK.text?.color + "; " : "") + (state.printReq.valance.BACK.text?.font || state.printReq.valance.BACK.text?.color ? "Valance: " + state.printReq.valance.BACK.text?.font + " " + state.printReq.valance.BACK.text?.color + "; " : ""),
                15: (state.printReq.peak.BACK.printInstruction ? "Peak: " + state.printReq.peak.BACK.printInstruction + "; " : "") + (state.printReq.valance.BACK.printInstruction ? "Valance: " + state.printReq.valance.BACK.printInstruction + "; " : ""),
                59: state.printReq.peak.BACK.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.BACK.background?.value.filename : "",
                60: state.printReq.valance.BACK.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.valance.BACK.background?.value.filename : "",
                61: state.printReq.peak.BACK.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.BACK.logo?.filename : "",
                62: state.printReq.valance.BACK.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.valance.BACK.logo?.filename : "",
                16: (state.printReq.peak.LEFT.background?.type === "COLOR" ? "Peak: " + state.printReq.peak.LEFT.background?.value + "; " : "") + (state.printReq.valance.LEFT.background?.type === "COLOR" ? "Valance: " + state.printReq.valance.LEFT.background?.value + ";" : ""),
                19: (state.printReq.peak.LEFT.text?.content ? "Peak: " + state.printReq.peak.LEFT.text?.content + "; " : "") + (state.printReq.valance.LEFT.text?.content ? "Valance: " + state.printReq.peak.LEFT.text?.content + ";" : ""),
                20: (state.printReq.peak.LEFT.text?.font || state.printReq.peak.LEFT.text?.color ? "Peak: " + state.printReq.peak.LEFT.text?.font + " " + state.printReq.peak.LEFT.text?.color + "; " : "") + (state.printReq.valance.LEFT.text?.font || state.printReq.valance.LEFT.text?.color ? "Valance: " + state.printReq.valance.LEFT.text?.font + " " + state.printReq.valance.LEFT.text?.color + "; " : ""),
                21: (state.printReq.peak.LEFT.printInstruction ? "Peak: " + state.printReq.peak.LEFT.printInstruction + "; " : "") + (state.printReq.valance.LEFT.printInstruction ? "Valance: " + state.printReq.valance.LEFT.printInstruction + "; " : ""),
                63: state.printReq.peak.LEFT.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.LEFT.background?.value.filename : "",
                64: state.printReq.valance.LEFT.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.valance.LEFT.background?.value.filename : "",
                65: state.printReq.peak.LEFT.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.LEFT.logo?.filename : "",
                66: state.printReq.peak.LEFT.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.LEFT.logo?.filename : "",
                22: (state.printReq.peak.RIGHT.background?.type === "COLOR" ? "Peak: " + state.printReq.peak.RIGHT.background?.value + "; " : "") + (state.printReq.valance.RIGHT.background?.type === "COLOR" ? "Valance: " + state.printReq.valance.RIGHT.background?.value + ";" : ""),
                25: (state.printReq.peak.RIGHT.text?.content ? "Peak: " + state.printReq.peak.RIGHT.text?.content + "; " : "") + (state.printReq.valance.RIGHT.text?.content ? "Valance: " + state.printReq.valance.RIGHT.text?.content + ";" : ""),
                26: (state.printReq.peak.RIGHT.text?.font || state.printReq.peak.RIGHT.text?.color ? "Peak: " + state.printReq.peak.RIGHT.text?.font + " " + state.printReq.peak.RIGHT.text?.color + "; " : "") + (state.printReq.valance.RIGHT.text?.font || state.printReq.valance.RIGHT.text?.color ? "Valance: " + state.printReq.valance.RIGHT.text?.font + " " + state.printReq.valance.RIGHT.text?.color + "; " : ""),
                27: (state.printReq.peak.RIGHT.printInstruction ? "Peak: " + state.printReq.peak.RIGHT.printInstruction + "; " : "") + (state.printReq.valance.RIGHT.printInstruction ? "Valance: " + state.printReq.valance.RIGHT.printInstruction + "; " : ""),
                67: state.printReq.peak.RIGHT.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.RIGHT.background?.value.filename : "",
                68: state.printReq.valance.RIGHT.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.valance.RIGHT.background?.value.filename : "",
                69: state.printReq.peak.RIGHT.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.RIGHT.logo?.filename : "",
                70: state.printReq.peak.RIGHT.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.RIGHT.logo?.filename : "",
                3.1: state.printReq.peak.FRONT.applyToFullSide || state.printReq.peak.BACK.applyToFullSide || state.printReq.peak.LEFT.applyToFullSide || state.printReq.peak.RIGHT.applyToFullSide ? "Apply to four sides peak" : "",
                3.2: state.printReq.valance.FRONT.applyToFullSide || state.printReq.valance.BACK.applyToFullSide || state.printReq.valance.LEFT.applyToFullSide || state.printReq.valance.RIGHT.applyToFullSide ? "Apply to four sides valance" : "",
                36.3: "",
                36.6: "",
                37: "",
                71: ""
            })
            if (res.id) {
                productDispatch({type: "SET_ENTRY_ID", payload: {entryId: res.id}})
            }
        } else {
            const res = await utils.contact({
                form_id: "6",
                status: "active",
                1: "Custom Printing tent",
                5: (state.printReq.peak.FRONT.background?.type === "COLOR" ? "Peak: " + state.printReq.peak.FRONT.background?.value + "; " : "") + (state.printReq.valance.FRONT.background?.type === "COLOR" ? "Valance: " + state.printReq.valance.FRONT.background?.value + ";" : ""),
                6: (state.printReq.peak.FRONT.text?.content ? "Peak: " + state.printReq.peak.FRONT.text?.content + "; " : "") + (state.printReq.valance.FRONT.text?.content ? "Valance: " + state.printReq.peak.FRONT.text?.content + ";" : ""),
                7: (state.printReq.peak.FRONT.text?.font || state.printReq.peak.FRONT.text?.color ? "Peak: " + state.printReq.peak.FRONT.text?.font + " " + state.printReq.peak.FRONT.text?.color + "; " : "") + (state.printReq.valance.FRONT.text?.font || state.printReq.valance.FRONT.text?.color ? "Valance: " + state.printReq.valance.FRONT.text?.font + " " + state.printReq.valance.FRONT.text?.color + "; " : ""),
                8: (state.printReq.peak.FRONT.printInstruction ? "Peak: " + state.printReq.peak.FRONT.printInstruction + "; " : "") + (state.printReq.valance.FRONT.printInstruction ? "Valance: " + state.printReq.valance.FRONT.printInstruction + "; " : ""),
                55: state.printReq.peak.FRONT.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.FRONT.background?.value.filename : "",
                56: state.printReq.valance.FRONT.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.FRONT.background?.value.filename : "",
                57: state.printReq.peak.FRONT.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.FRONT.logo?.filename : "",
                58: state.printReq.valance.FRONT.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.valance.FRONT.logo?.filename : "",
                10: (state.printReq.peak.BACK.background?.type === "COLOR" ? "Peak: " + state.printReq.peak.BACK.background?.value + "; " : "") + (state.printReq.valance.BACK.background?.type === "COLOR" ? "Valance: " + state.printReq.valance.BACK.background?.value + ";" : ""),
                13: (state.printReq.peak.BACK.text?.content ? "Peak: " + state.printReq.peak.BACK.text?.content + "; " : "") + (state.printReq.valance.BACK.text?.content ? "Valance: " + state.printReq.peak.BACK.text?.content + ";" : ""),
                14: (state.printReq.peak.BACK.text?.font || state.printReq.peak.BACK.text?.color ? "Peak: " + state.printReq.peak.BACK.text?.font + " " + state.printReq.peak.BACK.text?.color + "; " : "") + (state.printReq.valance.BACK.text?.font || state.printReq.valance.BACK.text?.color ? "Valance: " + state.printReq.valance.BACK.text?.font + " " + state.printReq.valance.BACK.text?.color + "; " : ""),
                15: (state.printReq.peak.BACK.printInstruction ? "Peak: " + state.printReq.peak.BACK.printInstruction + "; " : "") + (state.printReq.valance.BACK.printInstruction ? "Valance: " + state.printReq.valance.BACK.printInstruction + "; " : ""),
                59: state.printReq.peak.BACK.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.BACK.background?.value.filename : "",
                60: state.printReq.valance.BACK.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.valance.BACK.background?.value.filename : "",
                61: state.printReq.peak.BACK.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.BACK.logo?.filename : "",
                62: state.printReq.valance.BACK.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.valance.BACK.logo?.filename : "",
                16: (state.printReq.peak.LEFT.background?.type === "COLOR" ? "Peak: " + state.printReq.peak.LEFT.background?.value + "; " : "") + (state.printReq.valance.LEFT.background?.type === "COLOR" ? "Valance: " + state.printReq.valance.LEFT.background?.value + ";" : ""),
                19: (state.printReq.peak.LEFT.text?.content ? "Peak: " + state.printReq.peak.LEFT.text?.content + "; " : "") + (state.printReq.valance.LEFT.text?.content ? "Valance: " + state.printReq.peak.LEFT.text?.content + ";" : ""),
                20: (state.printReq.peak.LEFT.text?.font || state.printReq.peak.LEFT.text?.color ? "Peak: " + state.printReq.peak.LEFT.text?.font + " " + state.printReq.peak.LEFT.text?.color + "; " : "") + (state.printReq.valance.LEFT.text?.font || state.printReq.valance.LEFT.text?.color ? "Valance: " + state.printReq.valance.LEFT.text?.font + " " + state.printReq.valance.LEFT.text?.color + "; " : ""),
                21: (state.printReq.peak.LEFT.printInstruction ? "Peak: " + state.printReq.peak.LEFT.printInstruction + "; " : "") + (state.printReq.valance.LEFT.printInstruction ? "Valance: " + state.printReq.valance.LEFT.printInstruction + "; " : ""),
                63: state.printReq.peak.LEFT.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.LEFT.background?.value.filename : "",
                64: state.printReq.valance.LEFT.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.valance.LEFT.background?.value.filename : "",
                65: state.printReq.peak.LEFT.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.LEFT.logo?.filename : "",
                66: state.printReq.peak.LEFT.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.LEFT.logo?.filename : "",
                22: (state.printReq.peak.RIGHT.background?.type === "COLOR" ? "Peak: " + state.printReq.peak.RIGHT.background?.value + "; " : "") + (state.printReq.valance.RIGHT.background?.type === "COLOR" ? "Valance: " + state.printReq.valance.RIGHT.background?.value + ";" : ""),
                25: (state.printReq.peak.RIGHT.text?.content ? "Peak: " + state.printReq.peak.RIGHT.text?.content + "; " : "") + (state.printReq.valance.RIGHT.text?.content ? "Valance: " + state.printReq.valance.RIGHT.text?.content + ";" : ""),
                26: (state.printReq.peak.RIGHT.text?.font || state.printReq.peak.RIGHT.text?.color ? "Peak: " + state.printReq.peak.RIGHT.text?.font + " " + state.printReq.peak.RIGHT.text?.color + "; " : "") + (state.printReq.valance.RIGHT.text?.font || state.printReq.valance.RIGHT.text?.color ? "Valance: " + state.printReq.valance.RIGHT.text?.font + " " + state.printReq.valance.RIGHT.text?.color + "; " : ""),
                27: (state.printReq.peak.RIGHT.printInstruction ? "Peak: " + state.printReq.peak.RIGHT.printInstruction + "; " : "") + (state.printReq.valance.RIGHT.printInstruction ? "Valance: " + state.printReq.valance.RIGHT.printInstruction + "; " : ""),
                67: state.printReq.peak.RIGHT.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.RIGHT.background?.value.filename : "",
                68: state.printReq.valance.RIGHT.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.valance.RIGHT.background?.value.filename : "",
                69: state.printReq.peak.RIGHT.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.RIGHT.logo?.filename : "",
                70: state.printReq.peak.RIGHT.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.RIGHT.logo?.filename : "",
                3.1: state.printReq.peak.FRONT.applyToFullSide || state.printReq.peak.BACK.applyToFullSide || state.printReq.peak.LEFT.applyToFullSide || state.printReq.peak.RIGHT.applyToFullSide ? "Apply to four sides peak" : "",
                3.2: state.printReq.valance.FRONT.applyToFullSide || state.printReq.valance.BACK.applyToFullSide || state.printReq.valance.LEFT.applyToFullSide || state.printReq.valance.RIGHT.applyToFullSide ? "Apply to four sides valance" : "",
                36.3: "",
                36.6: "",
                37: "",
                71: ""
            })
            if (res.id) {
                productDispatch({type: "SET_ENTRY_ID", payload: {entryId: res.id}})
            }
        }
        // console.log({
        //     form_id: "6",
        //     status: "active",
        //     1: "Custom Printing tent",
        //     5: (state.printReq.peak.FRONT.background?.type === "COLOR" ? "Peak: " + state.printReq.peak.FRONT.background?.value + "; " : "") + (state.printReq.valance.FRONT.background?.type === "COLOR" ? "Valance: " + state.printReq.valance.FRONT.background?.value + ";" : ""),
        //     6: (state.printReq.peak.FRONT.text?.content ? "Peak: " + state.printReq.peak.FRONT.text?.content + "; " : "") + (state.printReq.valance.FRONT.text?.content ? "Valance: " + state.printReq.peak.FRONT.text?.content + ";" : ""),
        //     7: (state.printReq.peak.FRONT.text?.font || state.printReq.peak.FRONT.text?.color ? "Peak: " + state.printReq.peak.FRONT.text?.font + " " + state.printReq.peak.FRONT.text?.color + "; " : "") + (state.printReq.valance.FRONT.text?.font || state.printReq.valance.FRONT.text?.color ? "Valance: " + state.printReq.valance.FRONT.text?.font + " " + state.printReq.valance.FRONT.text?.color + "; " : ""),
        //     8: (state.printReq.peak.FRONT.printInstruction ? "Peak: " + state.printReq.peak.FRONT.printInstruction + "; " : "") + (state.printReq.valance.FRONT.printInstruction ? "Valance: " + state.printReq.valance.FRONT.printInstruction + "; " : ""),
        //     55: state.printReq.peak.FRONT.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.FRONT.background?.value.filename : "",
        //     56: state.printReq.valance.FRONT.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.FRONT.background?.value.filename : "",
        //     57: state.printReq.peak.FRONT.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.FRONT.logo?.filename : "",
        //     58: state.printReq.valance.FRONT.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.valance.FRONT.logo?.filename : "",
        //     10: (state.printReq.peak.BACK.background?.type === "COLOR" ? "Peak: " + state.printReq.peak.BACK.background?.value + "; " : "") + (state.printReq.valance.BACK.background?.type === "COLOR" ? "Valance: " + state.printReq.valance.BACK.background?.value + ";" : ""),
        //     13: (state.printReq.peak.BACK.text?.content ? "Peak: " + state.printReq.peak.BACK.text?.content + "; " : "") + (state.printReq.valance.BACK.text?.content ? "Valance: " + state.printReq.peak.BACK.text?.content + ";" : ""),
        //     14: (state.printReq.peak.BACK.text?.font || state.printReq.peak.BACK.text?.color ? "Peak: " + state.printReq.peak.BACK.text?.font + " " + state.printReq.peak.BACK.text?.color + "; " : "") + (state.printReq.valance.BACK.text?.font || state.printReq.valance.BACK.text?.color ? "Valance: " + state.printReq.valance.BACK.text?.font + " " + state.printReq.valance.BACK.text?.color + "; " : ""),
        //     15: (state.printReq.peak.BACK.printInstruction ? "Peak: " + state.printReq.peak.BACK.printInstruction + "; " : "") + (state.printReq.valance.BACK.printInstruction ? "Valance: " + state.printReq.valance.BACK.printInstruction + "; " : ""),
        //     59: state.printReq.peak.BACK.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.BACK.background?.value.filename : "",
        //     60: state.printReq.valance.BACK.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.valance.BACK.background?.value.filename : "",
        //     61: state.printReq.peak.BACK.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.BACK.logo?.filename : "",
        //     62: state.printReq.valance.BACK.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.valance.BACK.logo?.filename : "",
        //     16: (state.printReq.peak.LEFT.background?.type === "COLOR" ? "Peak: " + state.printReq.peak.LEFT.background?.value + "; " : "") + (state.printReq.valance.LEFT.background?.type === "COLOR" ? "Valance: " + state.printReq.valance.LEFT.background?.value + ";" : ""),
        //     19: (state.printReq.peak.LEFT.text?.content ? "Peak: " + state.printReq.peak.LEFT.text?.content + "; " : "") + (state.printReq.valance.LEFT.text?.content ? "Valance: " + state.printReq.peak.LEFT.text?.content + ";" : ""),
        //     20: (state.printReq.peak.LEFT.text?.font || state.printReq.peak.LEFT.text?.color ? "Peak: " + state.printReq.peak.LEFT.text?.font + " " + state.printReq.peak.LEFT.text?.color + "; " : "") + (state.printReq.valance.LEFT.text?.font || state.printReq.valance.LEFT.text?.color ? "Valance: " + state.printReq.valance.LEFT.text?.font + " " + state.printReq.valance.LEFT.text?.color + "; " : ""),
        //     21: (state.printReq.peak.LEFT.printInstruction ? "Peak: " + state.printReq.peak.LEFT.printInstruction + "; " : "") + (state.printReq.valance.LEFT.printInstruction ? "Valance: " + state.printReq.valance.LEFT.printInstruction + "; " : ""),
        //     63: state.printReq.peak.LEFT.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.LEFT.background?.value.filename : "",
        //     64: state.printReq.valance.LEFT.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.valance.LEFT.background?.value.filename : "",
        //     65: state.printReq.peak.LEFT.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.LEFT.logo?.filename : "",
        //     66: state.printReq.peak.LEFT.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.LEFT.logo?.filename : "",
        //     22: (state.printReq.peak.RIGHT.background?.type === "COLOR" ? "Peak: " + state.printReq.peak.RIGHT.background?.value + "; " : "") + (state.printReq.valance.RIGHT.background?.type === "COLOR" ? "Valance: " + state.printReq.valance.RIGHT.background?.value + ";" : ""),
        //     25: (state.printReq.peak.RIGHT.text?.content ? "Peak: " + state.printReq.peak.RIGHT.text?.content + "; " : "") + (state.printReq.valance.RIGHT.text?.content ? "Valance: " + state.printReq.valance.RIGHT.text?.content + ";" : ""),
        //     26: (state.printReq.peak.RIGHT.text?.font || state.printReq.peak.RIGHT.text?.color ? "Peak: " + state.printReq.peak.RIGHT.text?.font + " " + state.printReq.peak.RIGHT.text?.color + "; " : "") + (state.printReq.valance.RIGHT.text?.font || state.printReq.valance.RIGHT.text?.color ? "Valance: " + state.printReq.valance.RIGHT.text?.font + " " + state.printReq.valance.RIGHT.text?.color + "; " : ""),
        //     27: (state.printReq.peak.RIGHT.printInstruction ? "Peak: " + state.printReq.peak.RIGHT.printInstruction + "; " : "") + (state.printReq.valance.RIGHT.printInstruction ? "Valance: " + state.printReq.valance.RIGHT.printInstruction + "; " : ""),
        //     67: state.printReq.peak.RIGHT.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.RIGHT.background?.value.filename : "",
        //     68: state.printReq.valance.RIGHT.background?.type === "IMAGE" ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.valance.RIGHT.background?.value.filename : "",
        //     69: state.printReq.peak.RIGHT.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.RIGHT.logo?.filename : "",
        //     70: state.printReq.peak.RIGHT.logo?.filename ? "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + state.printReq.peak.RIGHT.logo?.filename : "",
        //     3.1: state.printReq.peak.FRONT.applyToFullSide || state.printReq.peak.BACK.applyToFullSide || state.printReq.peak.LEFT.applyToFullSide || state.printReq.peak.RIGHT.applyToFullSide  ? "Apply to four sides peak" : "",
        //     3.2: state.printReq.valance.FRONT.applyToFullSide || state.printReq.valance.BACK.applyToFullSide || state.printReq.valance.LEFT.applyToFullSide || state.printReq.valance.RIGHT.applyToFullSide  ? "Apply to four sides valance" : "",
        //     36.3: "",
        //     36.6: "",
        //     37: "",
        //     71: ""
        // })
    }

    const openSummary = () => {
        if (Object.keys(productState.frameVariant).length !== 0 || Object.keys(productState.roofVariant).length !== 0) {
            setSummaryIsOpen(true)
        } else {
            setSummaryIsOpen(false)
        }
    }

    //useEffect for manipulating header,footer and third party components when customizing is ongoing
    useEffect(() => {
        const main_nav_elem = document.querySelector(".main-container-nav");
        const main_footer_elem = document.querySelector("footer");
        const main_checkout_elem = document.querySelector(".main-container-checkout");
        const thirdPartyButton = document.querySelector("#mobile-chat-container");

        if (state.activeCustomizer) {
            main_nav_elem.style.display = "none";
            main_footer_elem.style.display = "none";
            main_checkout_elem.style.display = "none";
        } else {
            main_nav_elem.style.display = "block";
            main_footer_elem.style.display = "block";
            main_checkout_elem.style.display = "block";
        }

        if (thirdPartyButton && state.activeCustomizer) {
            thirdPartyButton.style.display = "none"
        } else if (thirdPartyButton && !state.activeCustomizer) {
            thirdPartyButton.style.display = "block"
        }

        return () => {
            main_nav_elem.style.display = "block";
            main_footer_elem.style.display = "block";
            main_checkout_elem.style.display = "block";

            if (thirdPartyButton) thirdPartyButton.style.display = "block";
        }

    }, [state.activeCustomizer])

    useEffect(() => {
        const framePrices = acceptedFrameTypes?.map((type, index) => {
            const variant = productVariant[0].filter((item, idx) => {
                if (item.attributes[0].option === state.size && item.attributes[1].option.includes(type)) {
                    return {price: item.price, frame: frameTypes[idx]}
                }
            })
            return {price: variant[0]?.price, frame: frameTypes[index]}
        })
        if (framePrices) {
            setFramePrices(framePrices)
        }
    }, [state.size, acceptedFrameTypes])

    useEffect(() => {
        if (product.hasOwnProperty("image") && Object.keys(product.image).length !== 0) {
            setImages(() => [product.image])
        } else if (product.hasOwnProperty("images") && product.images.length !== 0) {
            setImages(() => [...product.images])
        } else {
            if (state.size && state.frame) setImages(() => [{src: `/images/custom-printed-canopy-tent/tents/${state.frame}-${state.size}/0-default-with-logo/${state.frame}-${state.size.split("x").join("X")}-WH.webp`}])
        }
    }, [product, state.size, state.frame])

    useEffect(() => {
        let types = []
        productVariant[0].filter((item) => {
            if (item.attributes[0].option === state.size) {
                const frameType = item.attributes[1].option.split(" ")[0]
                if (frameType) types.push(frameType)
            }
        })
        setAcceptedFrameTypes(types)
    }, [steps.allSteps.size.status.done, state.size])

    //useEffect for setting frame variant
    useEffect(() => {
        if (state.size && state.frame && (steps.allSteps.frame.status.done && steps.allSteps.size.status.done)) {
            const frameVariant = getFrameVariant();
            productDispatch({type: "SET_FRAME_VARIANT", payload: {frameVariant}})
        }
    }, [state.size, state.frame, steps.allSteps.frame, steps.allSteps.size])

    //useEffect for setting roof variant
    useEffect(() => {
        if (determineSides().length !== 0) {
            const roofVariant = getRoofVariant();
            productDispatch({type: "SET_ROOF_VARIANT", payload: {roofVariant}})
        }
    }, [state.printReq, state.printingMethod])

    //useEffect for setting total price whenever a new product variant is selected
    useEffect(() => {
        if (Object.keys(productState.frameVariant).length !== 0 || Object.keys(productState.roofVariant).length !== 0) {
            const totalPrice = (parseInt(productState.frameVariant.price) || 0) + (parseInt(productState.roofVariant.price) || 0);
            productDispatch({type: "SET_TOTAL_PRICE", payload: {totalPrice: totalPrice * productState.bag.totalCount}})
        }
    }, [productState.frameVariant, productState.bag.totalCount, productState.roofVariant, steps.allSteps.frame, steps.allSteps.size])

    //useEffect for submitting printing requirement to WordPress forms and adding all selected variants to an array
    useEffect(() => {
        if (steps.done) {
            handleSendDetails();
            let variants = [];
            variants.push(productState.frameVariant);
            variants.push(productState.roofVariant);
            productDispatch({type: "SET_VARIANTS", payload: {variants}})
        }
    }, [steps.done])

    //useEffect for hiding the talk-to-us section when customization is ongoing
    useEffect(() => {
        const thirdPartySection = document.querySelectorAll("#refreshPlaceholder");
        if (state.activeCustomizer) {
            thirdPartySection?.forEach(item => (
                item.style.display = "none"
            ))
        } else {
            thirdPartySection?.forEach(item => (item.style.display = "flex"))
        }
        return () => thirdPartySection?.forEach(item => (item.style.display = "flex"))
    }, [state.activeCustomizer])

    return (
        <ThemeProvider.V2>
            <Block display="flex" position="relative" width="100%" minHeight={state.activeCustomizer ? "100vh" : "unset"}>
                {!state.activeCustomizer ?
                    <Block maxWidth={process.env.maxWidth + "px"} width="100%" margin="0 auto">
                        <Block width="100%" padding={["0 20px 40px", null, "40px 20px"]} display="grid" gridTemplateColumns={["1fr", null, "1fr 1fr", "7fr 5fr"]} gridRowGap="24px">
                            <Carousel emulateTouch showThumbs={false} showStatus={false} showIndicators={false}>
                                {images.map((image, idx) =>
                                    <Image key={idx} src={image.src} alt="product image" width={568} height={524} objectFit="contain" layout="responsive"/>
                                )}
                            </Carousel>
                            <Block className="text-center" maxWidth={["unset", null, "371px"]} margin="0 auto">
                                <Block as="h1" marginBottom={["24px", "40px"]} font="MinXParagraph20">Custom Printed Canopy Tent</Block>
                                <Block display="grid" gridRowGap="8px" marginBottom={["24px", "40px"]} color="MinXPrimaryText" font="MinXHeading16" $style={{fontWeight: 400}}>
                                    <Block as="p" className="price">{steps.done ? `$${parseInt(productState.bag.totalPrice)}` : "From $391.00"}</Block>
                                    <Block as="p">Price may vary based on your configurations.</Block>
                                    {/* <Block font="MinXHeading14" color="#FF7847">
                                    17% OFF
                                </Block> */}
                                    {/* <Block font="MinXHeading14" color="#FF7847">
                                    Christmas Sale: Use code SANTA for an extra 20% off select styles.
                                </Block> */}
                                </Block>
                                <Block>
                                    <Block display="flex" justifyContent="space-between">
                                        <Block display="inline-block" font="MinXHeading16" color="MinXTitle">Customization</Block>
                                        {steps.done && <Button type="text" font="MinXParagraph14" color="#8C8C8C" text="Clear" disabled={!steps.done} onClick={clearCustomization}/>}
                                    </Block>
                                    <Block className="cursor" width="100%" margin={["8px auto", "12px auto"]} title="edit" onClick={editDetails}>
                                        {
                                            !steps.done ?
                                                <Button type="rainbow" width="100%" height="48px" font="MinXLabel14" color="MinXPrimaryText" text="Customize online" buttonBackgroundColor="#FFF" display={["block", null, "block"]}
                                                        onClick={() => dispatch({type: "SET_ACTIVE_CUSTOMIZER", payload: {activeCustomizer: true}})}
                                                />
                                                :
                                                <Block padding="16px 24px" $style={{border: "3px solid #23A4AD", borderRadius: "8px"}}>
                                                    <Block display="flex" justifyContent="space-between" alignItems="center" marginBottom="4px">
                                                        <Block font="MinXLabel14" color="MinXTitle">Summary</Block>
                                                        <Block width="18px" height="18px">
                                                            <Image src="/images/icon/icon-pencil.png" alt="edit" width={20} height={20} layout="fixed" objectFit="contain"/>
                                                        </Block>
                                                    </Block>
                                                    <Block display="flex" $style={{gap: "4px"}}>
                                                        <Block font="MinXLabel14" color="MinXSecondaryText">Size:</Block>
                                                        <Block font="MinXParagraph14" color="MinXTitle">{state.size}</Block>
                                                    </Block>
                                                    <Block display="flex" $style={{gap: "4px"}}>
                                                        <Block font="MinXLabel14" color="MinXSecondaryText">Sides to print:</Block>
                                                        <Block font="MinXParagraph14" color="MinXTitle">{determineSides()}</Block>
                                                    </Block>
                                                    <Block display="flex" $style={{gap: "4px"}}>
                                                        <Block font="MinXLabel14" color="MinXSecondaryText">Printing method:</Block>
                                                        <Block font="MinXParagraph14" color="MinXTitle">{state.printingMethod}</Block>
                                                    </Block>
                                                </Block>
                                        }
                                    </Block>
                                    <Block className="text-left" marginBottom={["24px", "40px"]} font="MinXParagraph14" color="MinXTitle">
                                        All custom printing orders will get a mockup before production. You can also <Block as="span" color="MinXButton" $style={{textDecoration: "underline"}}><Link href="/custom-printing/#form">get a free
                                        mockup </Link></Block> without ordering.
                                    </Block>
                                    <Block padding="11px" $style={{borderRadius: "24px", border: "1px solid #D9D9D9"}}>
                                        <Link href="/custom-printing-package">
                                            <Block font="MinXLabel14" color="MinXPrimaryText">Artwork not ready? <Block as="span" marginLeft="4px" font="MinXParagraph14" color="MinXPrimaryText">Buy now and upload later</Block></Block>
                                        </Link>
                                    </Block>
                                </Block>
                            </Block>
                        </Block>
                    </Block> :
                    <>
                        <Block display="flex" justifyContent="space-between" alignItems="center" width="100%" height="44px" minWidth="320px" backgroundColor="MinXBackground"
                               padding={"4px clamp(16px, 50vw - " + process.env.maxWidth / 2 + "px, 50vw - " + process.env.maxWidth / 2 + "px)"}
                               position="fixed" top={[0, null, null, "unset"]} bottom={["unset", null, null, "0"]} left={0}
                               $style={{borderTop: "1px solid #D9D9D9", borderBottom: "1px solid #D9D9D9", zIndex: 9}}
                        >
                            <Button bundle="white" width="100px" height="36px" font="MinXLabel14" color="#262626" text="Quit"
                                    startEnhancer={() => <Block as="i" display="grid" placeItems="center"><Image src="/images/icon/icon-close.png" alt="close" width={14} height={14} objectFit="contain" layout="fixed"/></Block>}
                                    onClick={closeCustomizer}
                            />
                            <Block color="MinXTitle" display="flex" alignItems="center" $style={{gap: "8px"}}>
                                <Block font="MinXParagraph14">Total:</Block>
                                <Block font="MinXSubtitle18">${productState.bag?.totalPrice || 0}</Block>
                            </Block>
                        </Block>
                        <Block margin={["44px auto 52px", null, "44px auto 70px", "70px auto 44px"]} flex="1">
                            {steps.currentStep === 0 && <TentSizeSelection steps={steps} prevClick={prevStep} nextClick={nextStep} tentSizes={tentSizes} error={steps.error} sizeValue={state.size} setSize={selectSize} frame={state.frame}/>}
                            {steps.currentStep === 1 &&
                                <FrameSelection steps={steps} prevClick={prevStep} nextClick={nextStep} framePrices={framePrices} frameTypes={frameTypes} acceptedFrameTypes={acceptedFrameTypes} error={steps.error} frameValue={state.frame}
                                                setFrame={selectFrame}/>}
                            {steps.currentStep === 2 && <RequirementSelection steps={steps} prevClick={prevStep} nextClick={nextStep} activeTentImage={images[0].src} tentFrame={state.frame}
                                                                              tentSize={state.size} error={steps.error} requirement={state.printReq} activeSide={state.activeSide} setSide={selectSide}
                                                                              setRequirement={selectPrintingRequirement} clearRequirement={clearRequirement}/>}
                            {steps.currentStep === 3 && <PrintingMethodSelection steps={steps} prevClick={prevStep} nextClick={nextStep} printingMethods={printingMethods} error={steps.error} printingMethodValue={state.printingMethod}
                                                                                 setMethod={selectPrintingMethod}/>}
                        </Block>
                        <Block display="flex" justifyContent="space-between" width="100%" height={["52px", null, "70px"]} minWidth="320px" backgroundColor="MinXBackground"
                               padding={"8px clamp(16px, 50vw - " + process.env.maxWidth / 2 + "px, 50vw - " + process.env.maxWidth / 2 + "px)"}
                               position="fixed" top={["unset", null, null, "0"]} bottom={[0, null, null, "unset"]} left={0}
                               $style={{borderTop: "1px solid #D9D9D9", borderBottom: "1px solid #D9D9D9", zIndex: 9}}
                        >
                            <Button type="outline" bundle="primary" display={["block", null, null, "none"]} width="60px" height="36px" onClick={() => prevStep()} disabled={steps.currentStep === 0}
                                    buttonStyle={{
                                        paddingRight: "0 !important",
                                        paddingLeft: "0 !important",
                                        color: steps.currentStep === 0 ? "#BFBFBF !important" : "#23A4AD !important",
                                        borderColor: "#BFBFBF !important",
                                    }}
                            >
                                <ArrowLeft size={26}/>
                            </Button>
                            <Block flex="1" padding={["0 16px", null, "18px 64px"]} alignSelf={["center", null, "unset"]}>
                                <ProgressBar.V1 steps={steps.allSteps} currentStep={steps.currentStep}/>
                            </Block>
                            <Button bundle="primary" display={["block", null, null, "none"]} width="60px" height="36px" onClick={() => nextStep()} disabled={!state.size}
                                    buttonStyle={{
                                        paddingRight: "0 !important",
                                        paddingLeft: "0 !important",
                                    }}
                            >
                                <ArrowRight size={26}/>
                            </Button>
                        </Block>
                    </>
                }
                <Checkout.V2
                    quantity={productState.bag.totalCount}
                    isInStock={((productState.roofVariant?.stock_status === "instock") && (productState.roofVariant?.stock_status === "instock"))}
                    buttonText={steps.done ? productState.roofVariant.stock_status === "instock" ? "Add to Bag" : "Out of Stock" : "No customizations added"}
                    isAvailable={productState.tentVariant?.purchasable}
                    onClickMinus={() => productState.bag?.totalCount !== 1 && productDispatch({type: "SET_TOTAL_COUNT", payload: {totalCount: productState.bag.totalCount - 1}})}
                    onClickPlus={() => productDispatch({type: "SET_TOTAL_COUNT", payload: {totalCount: productState.bag.totalCount + 1}})}
                    onClickAddToBag={() => addToCart()}
                    onClick={openSummary}
                    onSale={productState.tentVariant?.on_sale || productState.frameVariant?.on_sale}
                    totalPrice={productState.bag?.totalPrice}
                    totalSalesPrice={productState.bag?.sale_price}
                    stepsDone={steps.done}
                    showShippedDay={false}
                />
                {/* <Modal type="dialog" isOpen={summaryIsOpen} onClose={() => setSummaryIsOpen(false)} content="summary"
                   dataTable={{productComponent, selectedVariant: [(Object.keys(productState.frameVariant).length !==0 && productState.frameVariant), (Object.keys(productState.roofVariant)?.length !==0 && productState.roofVariant)], totalSalePrice: productState.bag?.totalPrice, totalRegularPrice: productState.bag.totalRegularPrice, totalCount: productState.bag.totalCount}}/> */}
            </Block>
        </ThemeProvider.V2>
    )
}

//
// Index.getInitialProps = async (context) => {
//     let product = null,
//         component = [],
//         variant = [];
//
//     product = await utils.getProductByWooId(61289);
//     if (product && product.type === "composite") {
//         let cc = [product.composite_components[0], product.composite_components[1]];
//         component = await Promise.all(cc.map(({default_option_id}) => utils.getProductByWooId(default_option_id)));
//         variant = await Promise.all(component.map(({id}) => utils.getVariantByWooProductId(id)));
//     }
//
//     return {
//         product: product,
//         productComponent: [component[0], component[1]],
//         productVariant: [variant[0], variant[1]],
//         pageState: {
//             initialState,
//             initialSteps,
//             initialProduct
//         },
//         printingMethods,
//         frameTypes,
//         tentSizes,
//         fullPage: true
//     };
// }

export async function getStaticProps() {
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
        props: {
            product: product,
            productComponent: [component[0], component[1]],
            productVariant: [variant[0], variant[1]],
            pageState: {
                initialState,
                initialSteps,
                initialProduct
            },
            printingMethods,
            frameTypes,
            tentSizes,
            fullPage: true
        },
        // revalidate: 1200, // In seconds
    };
}

export default Index;
