import { useStyletron } from "baseui"
import { Block } from "baseui/block"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useReducer, useState } from "react"
import ButtonM from  "../../components/button-n"
import ProgressSteps from "../../components/Progress/ProgressSteps"
import TentSizeSelection from "../../components/sections/TentSizeSelection"
import FrameSelection from "../../components/sections/FrameSelection"
import PrintingMethodSelection from "../../components/sections/PrintingMethodSelection"
import RequirementSelection from "../../components/sections/RequirementSelection"
import {EventEmitter} from "../../utils/events";
import Utils from "../../utils/utils";
import {Checkout_N as Checkout} from "../../components/sections"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../../redux/actions/userActions"
import { modifyCart } from "../../redux/actions/cartActions"
import { Modal } from "@material-ui/core"
import { productReducer, reducer, stepReducer,initialState, initialProduct, initialSteps } from "../../assets/states/custom-printed-canopy-tent"

const utils = new Utils();

//----- initial State for variant details ------//


//----- initial State for selected variant and bag/cart ------//




const Index = ({productVariant, productComponent, pageState}) => {
    const {loggedIn, token, user} = useSelector(({user}) => user);
    const reduxDispatch = useDispatch();
    const {cart} = useSelector(({cart}) => cart);
    const [state, dispatch] = useReducer(reducer, pageState.initialState);
    const [steps, stepDispatch] = useReducer(stepReducer, pageState.initialSteps);
    const [productState, productDispatch] = useReducer(productReducer, pageState.initialProduct);
    const [summaryIsOpen, setSummaryIsOpen] = useState(true)
    const [css] = useStyletron();
    let myData = Object.keys(steps.allSteps).map(key => {
        return steps.allSteps[key];
    })

    //---- actions for printing details ----//

    const selectSize = (payload) => {
        dispatch({type:"SET_SIZE", payload});
        stepDispatch({type: "SET_OPTION_IS_DONE"})
    }
    const selectFrame = (payload) => {
        dispatch({type:"SET_FRAME", payload});
        stepDispatch({type: "SET_OPTION_IS_DONE"});
    }
    const selectPrintingMethod = (payload) => {
        dispatch({type:"SET_PRINTING_METHOD", payload});
        stepDispatch({type: "SET_OPTION_IS_DONE"});
    }
    const selectPrintingRequirement = (key,side,payload,allSides) => {
        if(!allSides) {
            dispatch({type:"SET_PRINTING_REQUIREMENTS", payload: {...state.printReq, [key]:{...state.printReq[key], [side]:payload}}});
            stepDispatch({type: "SET_OPTION_IS_DONE"});
        }
        else {
            dispatch({type:"SET_PRINTING_REQUIREMENTS", payload: {...state.printReq, [key]:{...state.printReq[key], LEFT:payload, RIGHT:payload, FRONT:payload, BACK:payload}}});
            stepDispatch({type: "SET_OPTION_IS_DONE"});
        }
    }
    const selectSide = (payload) => {
        dispatch({type:"SET_ACTIVE_SIDE", payload});
    }

    //---- end of actions for printing details ----//


    //---- actions for navigating the custom printing flow ----//
    const nextStep = () => {
        if(steps.allSteps[steps.currentKey].status.done) {
            if(steps.currentStep !== 3){
                stepDispatch({type: "SET_NEXT_STEP", payload: {key: myData[steps.currentStep + 1].code}})
            }
            else {
                stepDispatch({type: "SET_DONE"})
                dispatch({type:"SET_ACTIVE_CUSTOMIZER", payload: {activeCustomizer: false}});
            }
        }
    }
    const prevStep = () => {
        if(steps.currentStep === 0){
            return
        }
        else {
            stepDispatch({type: "SET_PREV_STEP", payload: {key: myData[steps.currentStep - 1].code}})
        }
    }
    //---- end of actions for navigating the custom printing flow ----//

    const clearCustomization = () => {
        dispatch({type: "RESET", payload: initialState})
        stepDispatch({type: "RESET", payload: initialSteps})
        productDispatch({type: "SET_ENTRY_ID", payload: {entryId:null}})

    }

    const determineSides = () => {
        let printedSides = [];
        const peakKeys = Object.keys(state.printReq.peak)
        const valanceKeys = Object.keys(state.printReq.valance)
        peakKeys.map((key) => {
            if(Object.keys(state.printReq.peak[key]).length !== 0 && !printedSides.includes(key)){
                printedSides.push(key.charAt(0).toUpperCase() + key.slice(1))
            }
        })
        valanceKeys.map((key) => {
            if(Object.keys(state.printReq.valance[key]).length !== 0 && !printedSides.includes(key)){
                printedSides.push(key.charAt(0).toUpperCase() + key.slice(1))
            }
        })
        return printedSides.join(", ")
    }


    const getVariant = () => {
        const variant = productVariant[0].filter((item,idx) =>{
            if(item.attributes[0].option === state.size && item.attributes[1].option.includes(state.frame)){
                return item;
            }
        })
        return variant[0]
    }
    const getProductList = () => {
        let productList = []
        const variation = productState.variant.attributes.map((attr) => ({
            attribute: attr.name,
            value:attr.option
        }))
        productList.push({
            id: productState.variant.id,
            quantity: productState.bag.totalCount,
            variation: variation,
            entryId: productState.entryId
        })
        return productList;
    }
    
    const addToCart = () => {
        if(!steps.done && !productState.entryId) return;
        let cl = JSON.parse(JSON.stringify(cart));
        cl = cl.concat([...getProductList()]);
        console.log({cl})
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

    const handleSendDetails = async () => {
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
            3.1: state.printReq.peak.FRONT.applyToFullSide || state.printReq.peak.BACK.applyToFullSide || state.printReq.peak.LEFT.applyToFullSide || state.printReq.peak.RIGHT.applyToFullSide  ? "Apply to four sides peak" : "",
            3.2: state.printReq.valance.FRONT.applyToFullSide || state.printReq.valance.BACK.applyToFullSide || state.printReq.valance.LEFT.applyToFullSide || state.printReq.valance.RIGHT.applyToFullSide  ? "Apply to four sides valance" : "",
            36.3: "",
            36.6: "",
            37: "",
            71: ""
        })
        productDispatch({type: "SET_ENTRY_ID", payload: {entryId: res.id}})
        console.log({
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
            3.1: state.printReq.peak.FRONT.applyToFullSide || state.printReq.peak.BACK.applyToFullSide || state.printReq.peak.LEFT.applyToFullSide || state.printReq.peak.RIGHT.applyToFullSide  ? "Apply to four sides peak" : "",
            3.2: state.printReq.valance.FRONT.applyToFullSide || state.printReq.valance.BACK.applyToFullSide || state.printReq.valance.LEFT.applyToFullSide || state.printReq.valance.RIGHT.applyToFullSide  ? "Apply to four sides valance" : "",
            36.3: "",
            36.6: "",
            37: "",
            71: ""
        })
    }

    useEffect(() => {
        productDispatch({type: "SET_VARIANT", payload: {variant: productVariant[0]}})
    },[productVariant])

    useEffect(() => {
        const variant = getVariant();
        productDispatch({type: "SET_VARIANT", payload: {variant}})
    },[state.size, state.frame])

    useEffect(() => {
        if(steps.done) handleSendDetails();
    },[steps.done])

    return (
        <Block width="100%" position="relative">
            {
                !state.activeCustomizer ?
                    <Block maxWidth="1152px" margin="0 auto">
                        <Block width="100%" padding={["40px 20px"]} display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap={["wrap", "nowrap", "nowrap"]}>
                            <Block flex="1" marginRight={["0","0","70px"]} minWidth="300px" backgroundColor="#F2F2F2">
                                <Block 
                                    width="100%" 
                                    backgroundColor="#ffffff"
                                    padding="25px"
                                    className={css({
                                        borderRadius: "6px",
                                        boxShadow: "0px 6.17173px 24.6869px rgba(0, 0, 0, 0.1)" 
                                    })}
                                >
                                    <Image src={state.finalImage} alt="product image" width={712} height={520} layout="responsive" />
                                </Block>
                            </Block>
                            <Block $style={{textAlign: "center"}} marginTop={["32px","32px","0px"]} maxWidth={["100%","100%","371px"]}>
                                <Block as="h1" font="MinXParagraph20">
                                    Custom Printed Canopy Tent
                                </Block>
                                <Block as="p" $style={{textAlign: "center"}} marginTop="40px" color="MinXPrimaryText" className="price" font="MinXHeading16">
                                    {/* $986.00 <Block color="MinXSecondaryText" marginLeft="8px" font="MinXHeading14" as="span" className={css({textDecoration: "line-through"})}>$1300.00</Block> */}
                                    {
                                        productState.variant.price &&
                                        `From $${productState.variant?.price * productState.bag?.totalCount}`
                                    }
                                </Block>
                                {/* <Block font="MinXHeading14" color="#FF7847">
                                    17% OFF
                                </Block> */}
                                {/* <Block font="MinXHeading14" color="#FF7847">
                                    Christmas Sale: Use code SANTA for an extra 20% off select styles.
                                </Block> */}
                                <Block marginTop="40px">
                                    <Block font="MinXPrimaryText" display="flex" justifyContent="space-between">
                                        <Block display="inline-block" font="MinXHeading16" color="MinXTitle">
                                            Customization
                                        </Block>
                                        {
                                            steps.done &&
                                            <Block 
                                                as="button" 
                                                className={css({
                                                    backgroundColor: "transparent",
                                                    border: "none",
                                                    color: "#8c8c8c",
                                                    fontSize: "14px",
                                                    cursor: "pointer"
                                                })}
                                                disabled={!steps.done}
                                                onClick={clearCustomization}
                                            >
                                                Clear
                                            </Block>
                                        }
                                    </Block>
                                    <Block width="100%" marginTop="12px">
                                        {
                                            !steps.done ?
                                            <ButtonM width="100%" type="rainbow" height={["36px", "48px", "56px"]} font={["MinXLabel14"]} color="MinXPrimaryText" text="Customize online" buttonBackgroundColor="#FAFBFF"
                                                onClick={() => (dispatch({type: "SET_ACTIVE_CUSTOMIZER", payload: { activeCustomizer: true}}))}
                                            />
                                        :
                                        <>
                                            <Block 
                                                padding="16px 24px" 
                                                width="100%"
                                                className={css({
                                                    border: "3px solid #23A4AD",
                                                    borderRadius: "8px"
                                                })}
                                            >
                                                <Block display="flex" justifyContent="space-between" alignItems="center">
                                                    <Block font="MinXLabel14" color="MinXTitle">
                                                        Summary
                                                    </Block>
                                                    <Block width="18px" height="18px">
                                                        <Image src="/images/icon/icon-pencil.png" alt="edit" width={20} height={20} layout="fixed" objectFit="contain" />
                                                    </Block>
                                                </Block>
                                                <Block marginTop="9px">
                                                        <Block display="flex">
                                                            <Block font="MinXLabel14" color="MinXSecondaryText">
                                                                Size:
                                                            </Block>
                                                            <Block font="MinXParagraph14" color="MinXTitle" marginLeft="4px">
                                                                {state.size}
                                                            </Block>
                                                        </Block>
                                                        <Block display="flex">
                                                            <Block font="MinXLabel14" color="MinXSecondaryText">
                                                                Sides to print:
                                                            </Block>
                                                            <Block font="MinXParagraph14" color="MinXTitle" marginLeft="4px">
                                                                {determineSides()}
                                                            </Block>
                                                        </Block>
                                                        <Block display="flex">
                                                            <Block font="MinXLabel14" color="MinXSecondaryText">
                                                                Printing method:
                                                            </Block>
                                                            <Block font="MinXParagraph14" color="MinXTitle" marginLeft="4px">
                                                                {state.printingMethod}
                                                            </Block>
                                                        </Block>
                                                    </Block>
                                            </Block>
                                        </>
                                        }
                                    </Block>
                                    <Block font="MinXParagraph14" color="MinXTitle" marginTop="12px">
                                        All custom printing orders will get a mockup before production. You can also <Block display="inline" color="MinXButton" className={css({textDecoration: "underline"})}><Link href="//custom-printing">get a free mockup </Link></Block> without ordering.
                                    </Block>
                                    <Block marginTop="40px">
                                            <Block
                                                display="flex" 
                                                padding="11px 42.5px"
                                                justifyContent="space-between"
                                                className={css({
                                                    borderRadius: "40px",
                                                    border: "1px solid #D9D9D9"
                                                })}
                                            >
                                                <Link href="/products/custom-printed-package">
                                                    <a>
                                                    <Block font="MinXLabel14" color="MinXPrimaryText">Artwork not ready?</Block>
                                                    <Block font="MinXParagraph14" color="MinXPrimaryText">
                                                        Buy now and upload later
                                                    </Block>
                                                    </a>
                                                </Link>
                                            </Block>
                                    </Block>
                                </Block>
                            </Block>
                        </Block>
                    </Block>
                :
                <>
                    <Block width="100%" backgroundColor="MinXBackground">
                        <Block padding="20px 0 45px" margin="0 auto" maxWidth="1152px" width="100%">
                            <Block width="100%" display="flex" justifyContent="space-between" padding="0 16px">
                                <ButtonM onClick={() => prevStep()} disabled={steps.currentStep === 0} buttonStyle={{backgroundColor: "transparent !important", color:steps.currentStep === 0 ?  "#bfbfbf !important": "#23A4AD !important", border: "2px solid #BFBFBF !important"}} text="Previous" width="138px" font={["MinXLabel14", "MinXLabel16"]} backgroundColor="transparent" />
                                <ButtonM onClick={() => nextStep()} text={steps.currentStep === 3 ? "Done" : "Next"} width="138px" font={["MinXLabel14", "MinXLabel16"]} />
                            </Block>
                            <Block marginTop="22px" padding={["0 16px", "0 75px"]}>
                                <ProgressSteps steps={steps.allSteps} currentStep={steps.currentStep} />
                            </Block>
                        </Block>
                    </Block>
                    <Block margin="0 auto" maxWidth="1152px" width="100%" padding="38px 16px 90px">
                        {
                            steps.currentStep === 0 && <FrameSelection frameValue={state.frame} setFrame={selectFrame} />
                        }
                        {
                            steps.currentStep === 1 &&  <TentSizeSelection sizeValue={state.size} setSize={selectSize} frame={state.frame}/>
                        }
                        {
                            steps.currentStep === 2 && <RequirementSelection requirement={state.printReq} activeSide={state.activeSide} setSide={selectSide} setRequirement={selectPrintingRequirement} />
                        }
                        {
                            steps.currentStep === 3 && <PrintingMethodSelection printingMethodValue={state.printingMethod} setMethod={selectPrintingMethod} />
                        }
                    </Block>
                </>

            }
            <Checkout 
                quantity={productState.bag.totalCount} 
                isInStock={productState.variant.stock_status === "instock"} 
                buttonText={steps.done ? productState.variant.stock_status === "instock" ? "Add to Bag" : "Out of Stock" : "No customizations added"} 
                isAvailable={productState.variant.purchasable}
                onClickMinus={() => productState.bag.totalCount !== 1 && productDispatch({type: "SET_TOTAL_COUNT", payload: {totalCount: productState.bag.totalCount - 1}})}
                onClickPlus={() => productDispatch({type: "SET_TOTAL_COUNT", payload: {totalCount: productState.bag.totalCount + 1}})}
                onClickAddToBag={() => addToCart()}
                onClick={addToCart}
                onSale={productState.variant.on_sale} 
                totalPrice={productState.variant.price * productState.bag.totalCount} 
                totalSalesPrice={productState.variant.sale_price}
            />
            <Modal type="dialog" isOpen={summaryIsOpen} onClose={() => summaryIsOpen(false)} content="summary" dataTable={{productComponent, selectedVariant:productState.variant, totalSalePrice:productState.variant.sale_price, totalRegularPrice:productState.variant.regular_price, totalCount:productState.bag.totalCount}}/>
        </Block>
    )
}

export default Index;

Index.getInitialProps = async (context) => {
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
        noFooter: false,
        pageState: {
            initialState,
            initialSteps,
            initialProduct
        }
    };
}
