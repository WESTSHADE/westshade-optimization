import {Modal} from "../surfaces";
import {Block} from "baseui/block";
import {PLACEMENT, StatefulTooltip, TRIGGER_TYPE} from "baseui/tooltip";
import MButton from "../button-n";
import React, {useState} from "react";

export default function custom_printing_roof({isOpen, onClose, selectedRoofList, selectedRoofListTemp}) {
    const [printDetailIsOpen, setPrintDetailIsOpen] = useState(false);

    const [tempList, setTempList] = useState(JSON.parse(JSON.stringify(selectedRoofListTemp)));

    const openPrintingDetail = () => {
        const temp = JSON.parse(JSON.stringify(selectedRoofListTemp));
        setTempList(temp);

        setPrintDetailIsOpen(true)
    };


    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} content="customPrintingRoof"
                   bodyClassName={"custom-printing-roof-modal-body"} footerClassName={"custom-printing-roof-modal-footer"}
                   selectedRoofList={selectedRoofList} selectedRoofListTemp={selectedRoofListTemp}
                   openDetailModal={() => openPrintingDetail()}
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
                                        onClick={() => closeCustomPrintingModal()}
                               />
                               <MButton type="solid" width="100%" height="40px" font="MinXParagraph16" text='Save' color="white"
                                        buttonStyle={{paddingRight: "24px !important", paddingLeft: "24px !important"}}
                                        onClick={() => closeCustomPrintingModal(true)}
                               />
                           </Block>
                       </Block>
                   }
            />
            <Modal isOpen={printDetailIsOpen} onClose={() => closeCustomPrintingDetailModal()} content="customPrintingRoofDetail"
                   selectedRoofListTempTemp={tempList}
                   bodyClassName={"custom-printing-roof-modal-body"} footerClassName={"custom-printing-roof-modal-footer"}
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
                           <Block display="flex" flexDirection="row">
                               <Block minWidth={["85px"]} height={"40px"} marginRight={"24px"}>
                                   <MButton type="outline" width="100%" height="100%" font="MinXParagraph16" text='Cancel' color="MinXButton"
                                            buttonStyle={{paddingTop: "4px !important", paddingRight: "24px !important", paddingBottom: "4px !important", paddingLeft: "24px !important", borderColor: "#23A4AD"}}
                                            onClick={() => closeCustomPrintingDetailModal()}
                                   />
                               </Block>
                               <Block minWidth={["85px"]} height={"40px"}>
                                   <MButton type="solid" width="100%" height="100%" font="MinXParagraph16" text='Save' color="white"
                                            buttonStyle={{paddingTop: "4px !important", paddingRight: "24px !important", paddingBottom: "4px !important", paddingLeft: "24px !important"}}
                                            onClick={() => closeCustomPrintingDetailModal(true)}
                                   />
                               </Block>
                           </Block>
                       </Block>
                   }
            />
        </>
    )
}
