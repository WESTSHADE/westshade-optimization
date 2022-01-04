import {getLocalStore} from "next-persist";

let defaultCustomPrinted = {
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

const customPrintedReducer = (state, action) => {
    switch (action.type) {
        case "SET_NEXT_STEP":
            return {
                ...state,
                error: false,
                currentStep: state.currentStep + 1,
                allSteps: {
                    ...state.allSteps,
                    [action.payload.key]: {
                        ...state.allSteps[action.payload.key],
                        status: {
                            ...state.allSteps[action.payload.key].status,
                            onGoing: true
                        }
                    }
                },
                currentKey: action.payload.key
            }
        case "SET_PREV_STEP":
            return {
                ...state,
                error: false,
                currentStep: state.currentStep - 1,
                currentKey: action.payload.key
            }
        case "SET_OPTION_IS_DONE":
            return {
                ...state,
                error: false,
                allSteps: {
                    ...state.allSteps,
                    [state.currentKey]: {
                        ...state.allSteps[state.currentKey],
                        status: {
                            done: true,
                            onGoing: false
                        }
                    }
                }
            }
        case "SET_DONE":
            return {
                ...state,
                done: true,
                error: false
            }
        case "SET_DEFAULT_AND_NEXT":
            return {
                ...state,
                error: false,
                currentStep: state.currentStep + 1,
                allSteps: {
                    ...state.allSteps,
                    ...action.payload.steps,
                    [action.payload.key]: {
                        ...state.allSteps[action.payload.key],
                        status: {
                            done: false,
                            onGoing: true
                        }
                    }
                },
                currentKey: action.payload.key
            }
        case "SET_EDIT_DETAILS":
            return {
                ...state,
                done: false,
                error: false,
                currentKey: "size",
                currentStep: 0
            }
        case "SET_ERROR":
            return {
                ...state,
                error: true
            }
        case "RESET":
            return action.payload
        default:
            return state;
    }
}

export {defaultCustomPrinted, customPrintedReducer}