import React from "react";
// import ReactDOM from "react-dom";
import clsx from "clsx";

import {Block} from "baseui/block";
import {Modal, ModalHeader, ModalBody, ModalFooter, SIZE, ROLE} from "baseui/modal";

import FrameCompare from "./parts/frame_compare";
import SizeGuide from "./parts/size_guide";
import OrderSummary from "./parts/order_summary";
import Technique from "./parts/printing_technique";
import Loading from "./parts/loading";
import CustomPrintingRoof from "./parts/custom_printing_roof";
import CustomPrintingRoofDetail from "./parts/custom_printing_roof_detail";
import FabricCompare from "./parts/fabric_compare";

import styles from "./modal.module.scss";

const modal = (props) => {
    const {
        isOpen = false,
        onClose,
        size = SIZE.full,
        type,
        header,
        children,
        footer,
        dialogContainerStyles,
        dialogClassName,
        dialogStyles,
        bodyClassName,
        footerClassName = "",
        content = "",
        dataTable,
        selectedRoofListTemp, setSelectedRoofListTemp,
        openDetailModal, removeDetail,
        selectedRoofSlide, selectedSlidePart, onSelectedRoofSlide, onSelectedSlidePart,
        applyToFullSide, setApplyToFullSide
    } = props;

    return (
        <Modal onClose={onClose} isOpen={isOpen} animate autoFocus size={size} role={type === "alertdialog" ? ROLE.alertdialog : ROLE.dialog} unstable_ModalBackdropScroll={true}
               overrides={{
                   Root: {
                       props: {
                           className: type === "alertdialog" ? styles["container-root-alert"] : type === "dialog" ? clsx(styles["container-root-dialog"], "hideScrollBar") : clsx(styles["container-root"], "hideScrollBar"),
                       },
                   },
                   DialogContainer: {
                       props: {
                           className: styles["container-dialog"],
                       },
                       style: {...dialogContainerStyles}
                   },
                   Dialog: {
                       props: {
                           className: clsx([styles["dialog"], dialogClassName]),
                       },
                       style: {...dialogStyles}
                   },
                   Close: {
                       props: {
                           className: styles["close"],
                       },
                   },
               }}
        >
            {content ? content === "size" ? (
                <ModalHeader className={styles["container-header"]}><Block font="MinXLabel20">Size Guide</Block></ModalHeader>
            ) : null : header ? (
                <ModalHeader className={styles["container-header"]}>{header}</ModalHeader>
            ) : null}
            <ModalBody className={clsx([styles["container-body"], "hideScrollBar", bodyClassName])}>
                {content ? content === "frame" ? <FrameCompare/> :
                    content === "fabric" ? <FabricCompare/> :
                        content === "size" ? <SizeGuide/> :
                            content === "summary" ? <OrderSummary dataTable={dataTable}/> :
                                content === "loading" ? <Loading/> :
                                    content === "technique" ? <Technique/> :
                                        content === "customPrintingRoof" ?
                                            <CustomPrintingRoof selectedListTemp={selectedRoofListTemp} openDetailModal={openDetailModal} removeDetail={removeDetail}
                                                                selectedRoofSlide={selectedRoofSlide} onSelectedRoofSlide={onSelectedRoofSlide}
                                            /> :
                                            content === "customPrintingRoofDetail" ?
                                                <CustomPrintingRoofDetail selectedListTemp={selectedRoofListTemp} setSelectedRoofListTemp={setSelectedRoofListTemp}
                                                                        selectedRoofSlide={selectedRoofSlide} selectedSlidePart={selectedSlidePart}
                                                                        applyToFullSide={applyToFullSide} setApplyToFullSide={setApplyToFullSide}
                                                /> : null : children}
            </ModalBody>
            {footer ? (
                <ModalFooter className={clsx([styles["container-footer"], footerClassName])}>
                    {footer}
                </ModalFooter>
            ) : null}
        </Modal>
    );
};

export default modal;

// ReactDOM.createPortal(modalContent, document.getElementById("modal-root"));
