import { useStyletron } from "baseui";
import { Block } from "baseui/block";

const ProgressSteps = ({steps, currentStep}) => {
    const data = Object.keys(steps).map(key => (steps[key]))
    const [css] = useStyletron();

    return (
        <>
        <Block width="100%" position="relative" height="1px" backgroundColor="#D9D9D9">
            <Block position="absolute" top="50%" left="50%" width="100%" height="100%" display="flex" alignItems="center" justifyContent="space-between" className={css({
                transform: "translate(-50%, -50%)",
                zIndex: "10"
            })}>
                {
                    data.map((step, idx) =>(
                        <Block 
                            key={step.code}
                            width="12px"
                            height="12px"
                            backgroundColor={step.status.done ? "#23A4AD" : step.status.onGoing ? "#ffffff" : "#D9D9D9"}
                            className={css({
                                borderRadius: "50%",
                                border: step.status.onGoing || step.status.done ? "3px solid #23A4AD" : "3px solid #D9D9D9",
                                transition: "all .3s ease-in"
                            })}
                        >
                            <Block position="relative" width="100%" height="100%" display={["none", "block"]}>
                                <Block 
                                    position="absolute" 
                                    top="16px" 
                                    left="50%"
                                    className={css({
                                        transform: "translateX(-50%)",
                                        transition: "all .3s ease-in",
                                        whiteSpace: "nowrap"
                                    })}
                                    font="MinXLabel14"
                                    color={idx === currentStep? "MinXButton" : step.status.done ? "MinXTitle" : "#BFBFBF"}
                                >
                                    {step.label}
                                </Block>
                            </Block>
                        </Block>
                    ))
                }
            </Block>
            <Block 
                position="absolute" 
                top="50%" 
                left="0%" 
                width={`${((currentStep) * 33.33)}%`} 
                height="1px" 
                backgroundColor="#23A4AD"
                className={css({
                    transform: "translateY(-50%)",
                    zIndex: "9",
                    transition: "all .3s ease-in"
                })}
                >

            </Block>
        </Block>
        <Block placeItems="center" font="MinXLabel14" color="MinXButton" width="100%" marginTop="22px" display={[ "none"]}>
                {data[currentStep].label}
        </Block>
        </>
    )
}

export default ProgressSteps;
