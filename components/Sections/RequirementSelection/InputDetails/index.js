import React, {useEffect, useRef, useState} from "react";
import {useStyletron} from "styletron-react";

import {Block} from "baseui/block";
import {Accordion, Panel} from "baseui/accordion";
import {Input} from "baseui/input";
import {FileUploader} from "baseui/file-uploader";
import {Textarea} from "baseui/textarea";
import {Checkbox, LABEL_PLACEMENT} from "baseui/checkbox";

import {Modal} from "../../../surfaces";
import Button from "../../../Button/V1";

import Utils from "../../../../utils/utils";

const utils = new Utils();

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const TAB_VALUES = ["COLOR", "IMAGE"];

const Canvas = ({selected, part, ...props}) => {
    const parentRef = useRef(null);
    const canvasRef = useRef(null);

    const draw = (canvas) => {
        const ctx = canvas.getContext('2d');

        let th = canvas.width / 2, rh = canvas.width / 6;

        ctx.strokeStyle = "#D0D9D9";
        ctx.lineWidth = 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.moveTo(0, th);
        ctx.quadraticCurveTo(th * 4 / 7, th * 5 / 8, canvas.width / 2, 1);
        ctx.quadraticCurveTo(canvas.width - (th * 4 / 7), th * 5 / 8, canvas.width, th);
        ctx.lineTo(0, th);
        ctx.fillStyle = part === "peak" && selected ? "#EBF4F5" : "#FFF";
        ctx.closePath();

        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(1, th, canvas.width - 2, rh - 2);
        ctx.fillStyle = part === "valance" && selected ? "#EBF4F5" : "#FFF";
        ctx.closePath();

        ctx.fill();
        ctx.stroke();
    }

    useEffect(() => {
        if (parentRef.current && parentRef.current.offsetWidth) {
            const canvas = canvasRef.current;

            canvas.width = parentRef.current.offsetWidth;
            canvas.height = parentRef.current.offsetWidth / 1.5;

            //Our draw come here
            draw(canvas);
        }
    });

    return (
        <Block ref={parentRef} {...props}>
            <canvas ref={canvasRef}/>
        </Block>
    );
}

export default function RoofDetail({requirement, setRequirement, part, side, cancelAction, selectedListTemp, setSelectedRoofListTemp, selectedRoofSlide, selectedSlidePart, applyToFullSide, setApplyToFullSide}) {
    const toCustomize = requirement[part][side];

    const label = {
        FRONT: "A",
        RIGHT: "B",
        BACK: "C",
        LEFT: "D",
    };

    const [activeTabKey, setActiveTabKey] = useState(TAB_VALUES.indexOf(inputState?.background.type || "COLOR"));
    const [isSaving, setIsSaving] = useState(false);
    const [inputState, setInputState] = useState({
        background: {
            type: toCustomize.background?.type || "COLOR",
            value: toCustomize.background?.value || ""
        },
        logo: {
            file: toCustomize.logo?.file || "",
            filename: toCustomize.logo?.filename || ""
        },
        text: {
            content: toCustomize.text?.content || "",
            font: toCustomize.text?.font || "",
            color: toCustomize.text?.color || "",
        },
        printInstruction: toCustomize.printInstruction || "",
        applyToFullSide: toCustomize.applyToFullSide || false
    })
    const [css] = useStyletron();

    const saveEntries = () => {
        setIsSaving(true)
        handleUpload()
            .then((res) => {
                console.log(res)
                setRequirement(part, side, inputState, inputState.applyToFullSide);
                setIsSaving(false)
                cancelAction();
            })
    }


    const handleFile = (files, key) => {
        console.log(files, key);
        let fileExt = files[0].name.substring(files[0].name.lastIndexOf('.') + 1, files[0].name.length) || files[0].name;
        let fileName = key + "-" + side + "-" + new Date().valueOf() + "-" + files[0].name.split(' ').join('-');
        console.log(fileName)
        if (key === "logo") {
            setInputState({...inputState, logo: {file: files[0], filename: fileName}})
        } else if (key === "background") {
            setInputState({...inputState, background: {type: "IMAGE", value: {file: files[0], filename: fileName}}})
        }
    }

    const handleUpload = () => {
        let promises = []
        if (inputState.background.type === "IMAGE" && inputState.background.value.length != 0) {
            const backgroundUpload = async () => {
                try {
                    const res = await utils.imageUploadV2(inputState.background.value.file, inputState.background.value.filename);
                    return {status: res.status, url: res.url}
                } catch (error) {
                    console.log(error);
                    return {status: 400, error}
                }
            }
            promises.push(backgroundUpload())
        }

        if (inputState.logo.file && inputState.logo.filename) {
            const logoUpload = async () => {
                try {
                    const res = await utils.imageUploadV2(inputState.logo.file, inputState.logo.filename);
                    return {status: res.status, url: res.url}
                } catch (error) {
                    return {status: 400, error}
                }
            }
            promises.push(logoUpload());
        }
        return Promise.all(promises)
    }


    return (
        <>
            <Block display="grid" gridTemplateColumns="1fr" gridTemplateRows="repeat(2, max-content)" width="100%" height="100%" minWidth="320px" alignItems="flex-start">
                {/*Image Section*/}
                <Block position="relative" height="100%" padding={["8px 16px 16px", null, null, "40px 20px 20px"]} backgroundColor={["#F7F7F7", null, null, "white"]}>
                    <Block position="relative" display="grid" gridTemplateColumns="1fr" gridRowGap="8px" justifyItems="center" width="100%" maxWidth="343px" margin="auto">
                        <Block position="relative" width="90px" height="90px" margin="auto">
                            {Object.keys(label).map((s, index) => {
                                return (
                                    <Block key={s} position="absolute" bottom={0} left="50%" display="flex" flexDirection="column" width="fit-content" paddingTop="2px"
                                           $style={{transform: "translate(-50%, 0) rotate(-" + index * 90 + "deg)", transformOrigin: "50% 0"}}
                                    >
                                        <Canvas width="60px" selected={s === side} part={part} $style={{aspectRatio: "1.5"}}/>
                                    </Block>)
                            })}
                        </Block>
                        <Block position="absolute" left={0} top="50%" width="max-content" color="MinXPrimaryText" $style={{textTransform: "capitalize", transform: "translateY(-50%)"}}>
                            <Block marginBottom="4px" font="MinXHeading19">Side {label[side]}</Block>
                            <Block font="MinXParagraph16">{part}</Block>
                        </Block>
                    </Block>
                </Block>
                {/*Selection Section*/}
                <Block position="relative" height="100%" padding={["16px", null, null, "20px"]}>
                    <Block position="relative" display="grid" gridTemplateColumns="1fr" gridRowGap={["8px", null, null, "16px"]} justifyItems="center" width="100%" maxWidth="343px" margin="auto" font="MinXHeading14"
                           color="MinXPrimaryText">
                        <Block font="MinXParagraph14" color="MinXSecondaryText">You will get a mockup based on the information you provide here.</Block>
                        {part === "peak" ? (
                            <>
                                <Accordion overrides={{
                                    PanelContainer: {
                                        style: {
                                            marginBottom: "8px",
                                            borderBottomWidth: 0,
                                            ":last-child": {marginBottom: 0},
                                            "@media (min-width: 1056px)": {marginBottom: "16px"},
                                        }
                                    },
                                    Header: {
                                        style: {
                                            minHeight: "48px",
                                            paddingTop: "12px", paddingRight: "0px", paddingBottom: "12px", paddingLeft: "0px",
                                            fontSize: "inherit", fontWeight: "inherit", fontFamily: "inherit", color: "inherit", backgroundColor: "transparent"
                                        }
                                    },
                                    Content: {
                                        style: {
                                            paddingTop: "0px", paddingRight: "0px", paddingBottom: "0px", paddingLeft: "0px",
                                            fontSize: "inherit", fontWeight: "400", fontFamily: "inherit", color: "inherit",
                                            backgroundColor: "translate",
                                        }
                                    },
                                }}>
                                    <Panel title="Image">
                                        <FileUploader
                                            onDropAccepted={(e) => handleFile(e, "background")}
                                            overrides={{
                                                FileDragAndDrop: {
                                                    style: {
                                                        flexDirection: "column-reverse",
                                                        borderTopStyle: inputState.background.value.length != 0 ? "solid" : "dashed",
                                                        borderBottomStyle: inputState.background.value.length != 0 ? "solid" : "dashed",
                                                        borderLeftStyle: inputState.background.value.length != 0 ? "solid" : "dashed",
                                                        borderRightStyle: inputState.background.value.length != 0 ? "solid" : "dashed",
                                                        borderTopColor: inputState.background.value.length != 0 ? "#23A4AD" : "dashed",
                                                        borderBottomColor: inputState.background.value.length != 0 ? "#23A4AD" : "dashed",
                                                        borderLeftColor: inputState.background.value.length != 0 ? "#23A4AD" : "dashed",
                                                        borderRightColor: inputState.background.value.length != 0 ? "#23A4AD" : "dashed",
                                                        boxShadow: inputState.background.value.length != 0 ? "0px 0px 4px 2px #5FBDBE;" : "none"
                                                    }
                                                },
                                                ButtonComponent: {
                                                    props: {
                                                        overrides: {
                                                            BaseButton: {
                                                                style: {
                                                                    marginBottom: "12px"
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                        <Block className="text-center" marginTop="8px" font="MinXParagraph14">File format: .ai, .psd, png, jpg</Block>
                                    </Panel>
                                    <Panel title="Note">
                                        <Textarea placeholder="Tell us how do you want it printed."
                                                  value={inputState.printInstruction}
                                                  onChange={(e) => setInputState({...inputState, printInstruction: e.target.value})}
                                                  overrides={{
                                                      Root: {
                                                          style: {
                                                              borderTopRightRadius: "8px",
                                                              borderTopLeftRadius: "8px",
                                                              borderBottomRightRadius: "8px",
                                                              borderBottomLeftRadius: "8px",
                                                          }
                                                      },
                                                      Input: {
                                                          style: {
                                                              backgroundColor: "white",
                                                              "::placeholder": {color: "#BFBFBF"},
                                                          }
                                                      },
                                                  }}
                                        />
                                    </Panel>
                                </Accordion>
                                <Checkbox checked={inputState.applyToFullSide} labelPlacement={LABEL_PLACEMENT.right}
                                          onChange={(e) => setInputState({...inputState, applyToFullSide: !inputState.applyToFullSide})}
                                          overrides={{
                                              Root: {
                                                  style: {
                                                      marginRight: "auto"
                                                  }
                                              },
                                              Checkmark: {
                                                  props: {
                                                      className: "checkbox-whole-side"
                                                  }
                                              },
                                              Label: {
                                                  style: {fontSize: "14px", fontWeight: 400}
                                              },
                                          }}
                                >
                                    Print the same on all peaks
                                </Checkbox>
                            </>
                        ) : (
                            <>
                                <Accordion overrides={{
                                    PanelContainer: {
                                        style: {
                                            marginBottom: "8px",
                                            borderBottomWidth: 0,
                                            ":last-child": {marginBottom: 0},
                                            "@media (min-width: 1056px)": {marginBottom: "16px"},
                                        }
                                    },
                                    Header: {
                                        style: {
                                            minHeight: "48px",
                                            paddingTop: "12px", paddingRight: "0px", paddingBottom: "12px", paddingLeft: "0px",
                                            fontSize: "inherit", fontWeight: "inherit", fontFamily: "inherit", color: "inherit", backgroundColor: "transparent"
                                        }
                                    },
                                    Content: {
                                        style: {
                                            paddingTop: "0px", paddingRight: "0px", paddingBottom: "0px", paddingLeft: "0px",
                                            fontSize: "inherit", fontWeight: "400", fontFamily: "inherit", color: "inherit",
                                            backgroundColor: "translate",
                                        }
                                    },
                                }}>
                                    <Panel title="Text">
                                        <Block display="grid" gridTemplateColumns="1fr" gridRowGap="16px">
                                            <Block display="flex" alignItems="center">
                                                <Block minWidth="60px" marginRight="20px">Content</Block>
                                                <Input placeholder="The text you want to print"
                                                       value={inputState.text.content}
                                                       onChange={(e) => setInputState({...inputState, text: {...inputState.text, content: e.target.value}})}
                                                       overrides={{
                                                           Root: {
                                                               style: {
                                                                   borderTopRightRadius: "8px",
                                                                   borderTopLeftRadius: "8px",
                                                                   borderBottomRightRadius: "8px",
                                                                   borderBottomLeftRadius: "8px",
                                                               }
                                                           },
                                                           Input: {
                                                               style: {
                                                                   backgroundColor: "white",
                                                                   "::placeholder": {color: "#BFBFBF"},
                                                               }
                                                           },
                                                       }}
                                                />
                                            </Block>
                                            <Block display="flex" alignItems="center">
                                                <Block minWidth="60px" marginRight="20px">Font</Block>
                                                <Input placeholder="e.g. Roboto"
                                                       value={inputState.text.font}
                                                       onChange={(e) => setInputState({...inputState, text: {...inputState.text, font: e.target.value}})}
                                                       overrides={{
                                                           Root: {
                                                               style: {
                                                                   borderTopRightRadius: "8px",
                                                                   borderTopLeftRadius: "8px",
                                                                   borderBottomRightRadius: "8px",
                                                                   borderBottomLeftRadius: "8px",
                                                               }
                                                           },
                                                           Input: {
                                                               style: {
                                                                   backgroundColor: "white",
                                                                   "::placeholder": {color: "#BFBFBF"},
                                                               }
                                                           },
                                                       }}
                                                />
                                            </Block>
                                            <Block display="flex" alignItems="center">
                                                <Block minWidth="60px" marginRight="20px">Color</Block>
                                                <Input placeholder="e.g. #3C3C3C"
                                                       value={inputState.text.color}
                                                       onChange={(e) => setInputState({...inputState, text: {...inputState.text, color: e.target.value}})}
                                                       overrides={{
                                                           Root: {
                                                               style: {
                                                                   borderTopRightRadius: "8px",
                                                                   borderTopLeftRadius: "8px",
                                                                   borderBottomRightRadius: "8px",
                                                                   borderBottomLeftRadius: "8px",
                                                               }
                                                           },
                                                           Input: {
                                                               style: {
                                                                   backgroundColor: "white",
                                                                   "::placeholder": {color: "#BFBFBF"},
                                                               }
                                                           },
                                                       }}
                                                />
                                            </Block>
                                        </Block>
                                    </Panel>
                                    <Panel title="Note">
                                        <Textarea placeholder="Tell us how do you want it printed."
                                                  value={inputState.printInstruction}
                                                  onChange={(e) => setInputState({...inputState, printInstruction: e.target.value})}
                                                  overrides={{
                                                      Root: {
                                                          style: {
                                                              borderTopRightRadius: "8px",
                                                              borderTopLeftRadius: "8px",
                                                              borderBottomRightRadius: "8px",
                                                              borderBottomLeftRadius: "8px",
                                                          }
                                                      },
                                                      Input: {
                                                          style: {
                                                              backgroundColor: "white"
                                                          }
                                                      },
                                                  }}
                                        />
                                    </Panel>
                                </Accordion>
                                <Checkbox checked={inputState.applyToFullSide} labelPlacement={LABEL_PLACEMENT.right}
                                          onChange={(e) => setInputState({...inputState, applyToFullSide: !inputState.applyToFullSide})}
                                          overrides={{
                                              Root: {
                                                  style: {
                                                      marginRight: "auto"
                                                  }
                                              },
                                              Checkmark: {
                                                  props: {
                                                      className: "checkbox-whole-side"
                                                  }
                                              },
                                              Label: {
                                                  style: {fontSize: "14px", fontWeight: 400}
                                              },
                                          }}
                                >
                                    Print the same on all valances
                                </Checkbox>
                            </>
                        )}
                    </Block>
                </Block>
            </Block>
            {/*Button Bar*/}
            <Block display="flex" justifyContent="space-between" alignItems="center" width="100%" height={["52px", null, "58px"]} minWidth="320px" backgroundColor="MinXBackground"
                   padding={"4px clamp(16px, 50vw - " + process.env.maxWidth / 2 + "px, 50vw - " + process.env.maxWidth / 2 + "px)"}
                   position="fixed" bottom={0} left={0} $style={{borderTop: "1px solid #D9D9D9", borderBottom: "1px solid #D9D9D9", zIndex: 9}}
            >
                <Block display={["none", null, "block"]} font="MinXParagraph14" color="MinXPrimaryText">After submitting the order, we’ll email a mockup.</Block>
                <Block display="flex" flex={[1, null, 0]} justifyContent="space-between" alignItems="center" $style={{gap: "16px"}}>
                    <Button type="outline" bundle="primary" width="85px" height="40px" text="Cancel" font="MinXLabel14"
                            buttonStyle={{
                                paddingRight: "0 !important",
                                paddingLeft: "0 !important",
                                borderColor: "#BFBFBF !important",
                            }}
                            onClick={cancelAction}
                            disabled={isSaving}
                    />
                    <Button bundle="primary" width="85px" height="40px" text="Save" font="MinXLabel14"
                            buttonStyle={{
                                paddingRight: "0 !important",
                                paddingLeft: "0 !important",
                            }}
                            onClick={saveEntries}
                            isLoading={isSaving}
                    />
                </Block>
            </Block>
            <Modal type="alertdialog" isOpen={isSaving} content="loading" description="I'm saving the printing details" onClose={null}/>
        </>
    )
}
