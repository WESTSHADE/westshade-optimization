import {Block} from "baseui/block";

import styles from "./progressBar.module.scss";

const ProgressBar = ({steps, currentStep}) => {
    const data = Object.keys(steps).map(key => (steps[key]));
    const length = Object.keys(steps).length;

    return (
        <Block width="100%" position="relative" height="1px" backgroundColor="#D9D9D9">
            <Block className={styles["container-bar"]} position="absolute" top="50%" left="50%" width="100%" height="100%" display="flex" alignItems="center" justifyContent="space-between">
                {data.map((step, idx) => (
                    <Block key={step.code} className={styles["node"]} backgroundColor={currentStep === idx ? "#FFF" : step.status.done ? "#23A4AD" : "#D9D9D9"}
                           $style={{borderColor: currentStep === idx || step.status.done ? "#23A4AD" : "#D9D9D9"}}
                    >
                        <Block position="relative" width="100%" height="100%" display={["none", null, "block"]} font="MinXLabel14">
                            <Block className={styles["node-label"]} color={idx === currentStep ? "MinXButton" : step.status.done ? "MinXTitle" : "#BFBFBF"}>{step.label}</Block>
                        </Block>
                    </Block>
                ))}
            </Block>
            <Block position="absolute" top="50%" left="0%" width={`${((currentStep) * 100 / (length - 1))}%`} height="1px" backgroundColor="#23A4AD" $style={{transform: "translateY(-50%)", transition: "all .3s ease-in", zIndex: "4"}}>
            </Block>
        </Block>
    )
}

export default ProgressBar;
