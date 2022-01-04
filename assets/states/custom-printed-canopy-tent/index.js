const initialState = {
    finalImage: "/images/product/y5-economic-canopy-tent/frame/Y5-10X10-BK.png",
    pMethod: "",
    size: "10x10",
    frame: "Y7",
    printingMethod: "DYE SUBLIMATION PRINTING",
    activeCustomizer: false,
    activeSide: "",
    printReq: {
        peak: {
            LEFT: {},
            RIGHT: {},
            BACK: {},
            FRONT: {}
        },
        valance: {
            LEFT: {},
            RIGHT: {},
            BACK: {},
            FRONT: {}
        }
    },
}

const initialProduct = {
    product: {},
    variants: [],
    frameVariant: {},
    roofVariant: {},
    bag: {
        totalCount: 1,
        totalPrice: 0,
        totalSalePrice: 0,
        totalRegularPrice: 0
    },
    entryId: null
}

//----- initial State for custom printing flow ------//
const initialSteps = {
    totalSteps: 4,
    currentStep: 0,
    currentKey: "size",
    allSteps: {
        size: {
            label: "Size",
            code: "size",
            status: {
                done: false,
                onGoing: true
            }
        },
        frame: {
            label: "Frame",
            code: "frame",
            status: {
                done: false,
                onGoing: false
            }
        },
        requirement: {
            label: "Sides to Print",
            code: "requirement",
            status: {
                done: false,
                onGoing: false
            }
        },
        pMethod: {
            label: "Printing Method",
            code: "pMethod",
            status: {
                done: false,
                onGoing: false
            }
        },
    },
    done: false,
    error: false,
}
const reducer = (state, {type, payload}) => {
    switch (type) {
        case "SET_SIZE":
            return {...state, size: payload.size}
        case "SET_FRAME":
            return {...state, frame: payload.frame}
        case "SET_PRINTING_METHOD":
            return {...state, printingMethod: payload.pMethod}
        case "SET_ACTIVE_CUSTOMIZER":
            return {...state, activeCustomizer: payload.activeCustomizer}
        case "SET_ACTIVE_SIDE":
            return {...state, activeSide: payload.activeSide}
        case "SET_PRINTING_REQUIREMENTS":
            return {...state, printReq: payload}
        case "RESET":
            return {...state, ...payload}
        default:
            return {...state}
    }
    return state;
}

const productReducer = (state, {type, payload}) => {
    switch (type) {
        case "SET_PRODUCT":
            return {...state, product: payload.product}
        case "SET_FRAME_VARIANT":
            return {...state, frameVariant: payload.frameVariant}
        case "SET_ROOF_VARIANT":
            return {...state, roofVariant: payload.roofVariant}
        case "SET_VARIANTS":
            return {...state, variants: payload.variants}
        case "SET_BAG":
            return {...state, bag: payload.bag}
        case "SET_TOTAL_COUNT":
            return {...state, bag: {...state.bag, totalCount: payload.totalCount}}
        case "SET_TOTAL_PRICE":
            return {...state, bag: {...state.bag, totalPrice: payload.totalPrice}}
        case "SET_ENTRY_ID":
            return {...state, entryId: payload.entryId}
        case "RESET":
            return {...state, ...payload.initialState}
        default:
            return {...state};
    }
}

const stepReducer = (state, {type, payload}) => {
    switch (type) {
        case "SET_NEXT_STEP":
            return {
                ...state,
                error: false,
                currentStep: state.currentStep + 1,
                allSteps: {...state.allSteps, [payload.key]: {...state.allSteps[payload.key], status: {...state.allSteps[payload.key].status, onGoing: true}}},
                currentKey: payload.key
            }
        case "SET_PREV_STEP":
            return {...state, error: false, currentStep: state.currentStep - 1, currentKey: payload.key}
        case "SET_OPTION_IS_DONE":
            return {...state, error: false, allSteps: {...state.allSteps, [state.currentKey]: {...state.allSteps[state.currentKey], status: {done: true, onGoing: false}}}}
        case "SET_DONE":
            return {...state, done: true, error: false}
        case "SET_DEFAULT_AND_NEXT":
            return {...state, error: false, currentStep: state.currentStep + 1, allSteps: {...state.allSteps, ...payload.steps, [payload.key]: {...state.allSteps[payload.key], status: {done: false, onGoing: true}}}, currentKey: payload.key}
        case "SET_EDIT_DETAILS":
            return {...state, done: false, error: false, currentKey: "size", currentStep: 0}
        case "SET_ERROR":
            return {...state, error: true}
        case "RESET":
            return payload
        default:
            return state;
    }
}

export {initialState, initialSteps, initialProduct, reducer, stepReducer, productReducer}
