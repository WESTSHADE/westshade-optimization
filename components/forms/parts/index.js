import {useStyletron} from "baseui";
import {Block} from "baseui/block";
import {Button, SHAPE} from "baseui/button";
import {Checkbox} from "baseui/checkbox";
import {Input} from "baseui/input";
import {SIZE, Textarea} from "baseui/textarea";

const CustomLabel = ({children}) => <Block marginBottom={["20px", "24px"]} font={["MinXSubtitle20", "MinXSubtitle24"]}>{children}</Block>

const CustomCheckbox = ({children, checked, onChange}) => (
    <Checkbox checked={checked} onChange={onChange}
              overrides={{
                  Checkmark: {style: {display: "none"}},
                  Label: {style: {width: "100%", paddingLeft: 0}}
              }}
    >
        {children}
    </Checkbox>
);

const CustomCheckboxLabel = ({children, active, backgroundColor}) => {
    return (
        <Block className="text-center" font="MinXLabel16" color="MinXPrimaryText"
               $style={{
                   width: "100%",
                   paddingTop: active ? "11px" : "12px",
                   paddingBottom: active ? "11px" : "12px",
                   borderTopLeftRadius: "44px",
                   borderTopRightRadius: "44px",
                   borderBottomLeftRadius: "44px",
                   borderBottomRightRadius: "44px",
                   borderTopWidth: active ? "2px" : "1px",
                   borderBottomWidth: active ? "2px" : "1px",
                   borderLeftWidth: active ? "2px" : "1px",
                   borderRightWidth: active ? "2px" : "1px",
                   borderTopStyle: "solid",
                   borderLeftStyle: "solid",
                   borderRightStyle: "solid",
                   borderBottomStyle: "solid",
                   borderColor: active ? "#23A4AD" : "#b2b2b2",
                   backgroundColor: backgroundColor ? backgroundColor : "#ffffff",
                   fontWeight: active ? "500" : "400",
               }}
        >
            {children}
        </Block>
    )
}

const CustomInput = ({startEnhancer, endEnhancer, type, value, onChange, error, required, placeholder, pattern, backgroundColor}) => {

    return (
        <Input
            className="form-input"
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
            error={error}
            required={required}
            startEnhancer={startEnhancer}
            endEnhancer={endEnhancer}
            pattern={pattern}
            overrides={{
                Root: {
                    style: {
                        width: "100%",
                        borderLeftWidth: "0px",
                        borderRightWidth: "0px",
                        borderTopWidth: "0px",
                        borderBottomWidth: "0px",
                        outlineLeftWidth: "0px",
                        outlineRightWidth: "0px",
                        outlineTopWidth: "0px",
                        outlineBottomWidth: "0px",
                        outlineWidth: "0px",
                        backgroundColor: "transparent"
                    }
                },
                Input: {
                    style: {
                        backgroundColor: "transparent",
                        borderRadius: "8px",
                        borderLeftWidth: "1px",
                        borderRightWidth: "1px",
                        borderTopWidth: "1px",
                        borderBottomWidth: "1px",
                        borderTopStyle: "solid",
                        borderBottomStyle: "solid",
                        borderLeftStyle: "solid",
                        borderRightStyle: "solid",
                        borderColor: "transparent",
                        ":focus": {borderColor: "#23A4AD"}
                    }
                },
                InputContainer: {style: {backgroundColor: backgroundColor ? backgroundColor : "#ffffff", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px"}}
            }}
        />
    )
}

const CustomTextarea = ({customClassname, message, onChange, id, placeholder, required, backgroundColor}) => {
    const [css] = useStyletron();

    return (
        <Textarea
            value={message}
            onChange={onChange}
            size={SIZE.large}
            required={required}
            id={id}
            placeholder={placeholder}
            className={`${css({borderTopColor: "transparent", borderBottomColor: "transparent", borderRightColor: "transparent", borderLeftColor: "transparent"})} ${customClassname}`}
            overrides={{
                Root: {style: {borderTopWidth: "0px", borderLeftWidth: "0px", borderBottomWidth: "0px", borderRightWidth: "0px"}},
                Input: {style: {height: "180px", backgroundColor: backgroundColor ? backgroundColor : "#ffffff", outline: "none", borderRadius: "4px", resize: "both", ":focus": {border: "1px solid #23A4AD"}}},
                InputContainer: {style: {outline: "none", ":focus": {border: "1px solid #23A4AD"}}}
            }}
        />
    )
}

const CustomFileUploadInput = ({onChange, id, attachedFile, error}) => {
    const [css] = useStyletron();

    return (
        <>
            <Block width="100%" as="label" htmlFor={id} borderRadius="8px" padding="8px 0"
                   className={css({
                       display: "flex",
                       justifyContent: "center",
                       alignItems: "center",
                       border: attachedFile ? "2px solid #23A4AD" : "2px solid #D0D9D9",
                       borderRadius: "8px",
                       padding: "8px 0",
                       cursor: "pointer",
                       ":hover": {border: "2px solid #5FBDBE"}
                   })}
            >
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
                        <path
                            d="M18.5 2H10.5L8.5 0H2.5C1.4 0 0.51 0.9 0.51 2L0.5 14C0.5 15.1 1.4 16 2.5 16H18.5C19.6 16 20.5 15.1 20.5 14V4C20.5 2.9 19.6 2 18.5 2ZM18.5 14H2.5V4H18.5V14ZM6.5 9.01L7.91 10.42L9.5 8.84V13H11.5V8.84L13.09 10.43L14.5 9.01L10.51 5L6.5 9.01Z"
                            fill="#23A4AD"/>
                    </svg>
                </i>
                <Block marginLeft="12px" as="span" font="MinXLabel14" color="MinXButton">
                    Upload from your device
                </Block>
            </Block>
            <Block as="small" marginTop="8px" textAlign="center" font="MinXParagraph14" color="MinXPrimaryText">
                File format: .ai, .psd, .png, .jpg
            </Block>
            {
                error.status &&
                <Block as="small" marginTop="4px" textAlign="center" font="MinXParagraph14" color="#F07C7C">
                    {error.message || "We only accept image with .ai, .psd, .png and .jpg type"}
                </Block>
            }
            <input hidden id={id} type="file" onChange={onChange}/>
        </>
    )
}

const CustomSubmitButton = ({children, isLoading}) => {

    return <Button
        shape={SHAPE.pill}
        isLoading={isLoading}
        overrides={{
            BaseButton: {
                style: {
                    width: "100%", backgroundColor: "#23A4AD", ":hover": {backgroundColor: "#5FBDBE"},
                    ":active": {backgroundColor: "#43878C"},
                }
            }
        }}
    >
        {children}
    </Button>
}

export {CustomLabel, CustomInput, CustomCheckbox, CustomCheckboxLabel, CustomSubmitButton, CustomTextarea, CustomFileUploadInput}