import React, {useEffect, useState} from "react";

import {Block} from "baseui/block";
import {PLACEMENT, StatefulTooltip, TRIGGER_TYPE} from "baseui/tooltip";

import {Modal} from "../surfaces";
import MButton from "../Button/V1";

export default function CustomPrintingRoof({isOpen, onClose, selectedRoofList, applyToFullSide, setApplyToFullSide}) {
    const [printDetailIsOpen, setPrintDetailIsOpen] = useState(false);

    const [selectedRoofSlide, setSelectedRoofSlide] = useState(null);
    const [selectedSlidePart, setSelectedSlidePart] = useState(0);

    const [tempList, setTempList] = useState(JSON.parse(JSON.stringify(selectedRoofList)));
    const [tempTempList, setTempTempList] = useState(JSON.parse(JSON.stringify(selectedRoofList)));

    const [applyToFullSideTemp, setApplyToFullSideTemp] = useState([false, false]);

    useEffect(() => {
        if (isOpen) {
            setTempList(JSON.parse(JSON.stringify(selectedRoofList)));
            setApplyToFullSideTemp(JSON.parse(JSON.stringify(applyToFullSide)))
        }
    }, [isOpen]);

    const openPrintingDetail = (part) => {
        const temp = JSON.parse(JSON.stringify(tempList));
        setTempTempList(temp);

        const tempFull = JSON.parse(JSON.stringify(applyToFullSide));
        setApplyToFullSideTemp(tempFull);

        setSelectedSlidePart(part);
        setPrintDetailIsOpen(true)
    };

    const closePrintingDetail = (save, list) => {
        if (save) {
            const temp = JSON.parse(JSON.stringify(list));

            if (selectedSlidePart === 0) {
                Object.keys(temp[selectedRoofSlide].peak).forEach(key => temp[selectedRoofSlide].peak[key] === "" ? delete temp[selectedRoofSlide].peak[key] : {});
            } else if (selectedSlidePart === 1) {
                Object.keys(temp[selectedRoofSlide].valance).forEach(key => temp[selectedRoofSlide].valance[key] === "" ? delete temp[selectedRoofSlide].valance[key] : {});
            }

            let peak = temp[selectedRoofSlide].peak;
            let valance = temp[selectedRoofSlide].valance;
            if (applyToFullSideTemp[selectedSlidePart]) {
                temp.map(item => {
                    if (selectedSlidePart === 0) {
                        item.peak = {...peak};
                    } else if (selectedSlidePart === 1) {
                        item.peak = {...valance};
                    }
                })
            }
            setTempList(temp);

            const tempFull = JSON.parse(JSON.stringify(applyToFullSideTemp));
            setApplyToFullSide(tempFull);
        }
        setPrintDetailIsOpen(false)
    }

    const clearAttr = (slide, part) => {
        const temp = JSON.parse(JSON.stringify(tempList));
        if (part === 0) {
            temp[slide].peak = {};
        } else if (part === 1) {
            temp[slide].valance = {};
        }
        setTempList(temp);

        const tempFull = JSON.parse(JSON.stringify(applyToFullSide));
        tempFull[selectedSlidePart] = false;
        setApplyToFullSide(tempFull);
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={() => onClose()} content="customPrintingRoof"
                   bodyClassName={"custom-printing-roof-modal-body"} footerClassName={"custom-printing-roof-modal-footer"}
                   selectedRoofList={selectedRoofList} selectedRoofListTemp={tempList} setSelectedRoofListTemp={setTempList}
                   selectedRoofSlide={selectedRoofSlide} selectedSlidePart={selectedSlidePart}
                   onSelectedRoofSlide={setSelectedRoofSlide} onSelectedSlidePart={setSelectedSlidePart}
                   openDetailModal={openPrintingDetail} removeDetail={clearAttr}
                   footer={
                       <Block width="100%" height={["54px", "70px", "80px"]} backgroundColor="white" display="flex" alignItems="center" justifyContent="space-between" padding="0 16px">
                           <Block>
                               <Block display={["none", "block"]}>
                                   <div style={{fontSize: "12px", marginRight: "24px", textAlign: "left"}}>After submitting the order, we’ll contact you with a free mockup based on
                                       the information you provide us here.
                                   </div>
                               </Block>
                               <Block display={["block", "none"]}>
                                   <StatefulTooltip placement={PLACEMENT.top} triggerType={TRIGGER_TYPE.click} content={() => <div style={{zIndex: 999}}>xxx</div>}>
                                       <div className="container-icon-custom-printing-note">!</div>
                                   </StatefulTooltip>
                               </Block>
                           </Block>
                           <Block display="grid" gridTemplateColumns="repeat(2, minmax(85px, auto))" gridColumnGap="24px">
                               <MButton type="outline" width="100%" height="40px" font="MinXParagraph16" text='Cancel' color="MinXButton"
                                        buttonStyle={{paddingRight: "24px !important", paddingLeft: "24px !important", borderColor: "#23A4AD"}}
                                        onClick={() => onClose()}
                               />
                               <MButton type="solid" width="100%" height="40px" font="MinXParagraph16" text='Save' color="white"
                                        buttonStyle={{paddingRight: "24px !important", paddingLeft: "24px !important"}}
                                        onClick={() => onClose(true, tempList)}
                               />
                           </Block>
                       </Block>
                   }
            />
            <Modal isOpen={printDetailIsOpen} onClose={() => closePrintingDetail()} content="customPrintingRoofDetail"
                   selectedRoofListTemp={tempTempList} setSelectedRoofListTemp={setTempTempList}
                   selectedRoofSlide={selectedRoofSlide} selectedSlidePart={selectedSlidePart}
                   applyToFullSide={applyToFullSideTemp} setApplyToFullSide={setApplyToFullSideTemp}
                   footerClassName={"custom-printing-roof-modal-footer"}
                   footer={
                       <Block width={"100%"} height={["54px", "70px", "80px"]} backgroundColor={"white"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} paddingLeft={"16px"} paddingRight={"16px"}>
                           <Block>
                               <Block display={["none", "block"]}>
                                   <div style={{fontSize: "12px", marginRight: "24px", textAlign: "left"}}>After submitting the order, we’ll contact you with a free mockup based on
                                       the information you provide us here.
                                   </div>
                               </Block>
                               <Block display={["block", "none"]}>
                                   <StatefulTooltip placement={PLACEMENT.top} triggerType={TRIGGER_TYPE.click} content={() => <div style={{zIndex: 999}}>xxx</div>}>
                                       <div className="container-icon-custom-printing-note">!</div>
                                   </StatefulTooltip>
                               </Block>
                           </Block>
                           <Block display="grid" gridTemplateColumns="repeat(2, minmax(85px, auto))" gridColumnGap="24px">
                               <MButton type="outline" width="100%" height="40px" minWidth="85px" font="MinXParagraph16" text='Cancel' color="MinXButton"
                                        buttonStyle={{paddingRight: "24px !important", paddingLeft: "24px !important", borderColor: "#23A4AD"}}
                                        onClick={() => closePrintingDetail()}
                               />
                               <MButton type="solid" width="100%" height="40px" minWidth="85px" font="MinXParagraph16" text='Save' color="white"
                                        buttonStyle={{paddingRight: "24px !important", paddingLeft: "24px !important"}}
                                        onClick={() => closePrintingDetail(true, tempTempList)}
                               />
                           </Block>
                       </Block>
                   }
            />
        </>
    )
}
