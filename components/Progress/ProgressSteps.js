import {Block} from "baseui/block";

const ProgressSteps = ({steps, currentStep}) => {
    const data = Object.keys(steps).map(key => (steps[key]))

    return (
        <Block width="100%" position="relative" height="1px" backgroundColor="#D9D9D9">
            <Block position="absolute" top="50%" left="50%" width="100%" height="100%" display="flex" alignItems="center" justifyContent="space-between" $style={{transform: "translate(-50%, -50%)", zIndex: "5"}}>
                {data.map((step, idx) => (
                    <Block key={step.code} width="12px" height="12px" backgroundColor={currentStep === idx ? "#FFF" : step.status.done ? "#23A4AD" : "#D9D9D9"}
                           $style={{transition: "all .3s ease-in", borderRadius: "50%", border: currentStep === idx || step.status.done ? "3px solid #23A4AD" : "3px solid #D9D9D9"}}
                    >
                        <Block position="relative" width="100%" height="100%" display={["none", null, "block"]}>
                            <Block position="absolute" top="16px" left="50%" font="MinXLabel14" color={idx === currentStep ? "MinXButton" : step.status.done ? "MinXTitle" : "#BFBFBF"}
                                   $style={{transform: "translateX(-50%)", transition: "all .3s ease-in", whiteSpace: "nowrap"}}
                            >
                                {step.label}
                            </Block>
                        </Block>
                    </Block>
                ))}
            </Block>
            <Block position="absolute" top="50%" left="0%" width={`${((currentStep) * 33.33)}%`} height="1px" backgroundColor="#23A4AD" $style={{transform: "translateY(-50%)", transition: "all .3s ease-in", zIndex: "4"}}>
            </Block>
        </Block>
    )
}

export default ProgressSteps;
