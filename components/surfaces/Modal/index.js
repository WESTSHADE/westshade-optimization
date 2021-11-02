import React from "react";
// import ReactDOM from "react-dom";
import clsx from "clsx";

import {Block} from "baseui/block";
import {Modal, ModalHeader, ModalBody, ModalFooter, SIZE, ROLE} from "baseui/modal";

import FrameCompare from "./frame_compare";
import SizeGuide from "./size_guide";
import OrderSummary from "./order_summary";
import Technique from "./printing_technique";
import Loading from "./loading";

import styles from "./modal.module.scss";

const modal = (props) => {
    const {isOpen = false, onClose, size = SIZE.full, type, header, children, footer, dialogClassName, dialogStyles, content = "", dataTable} = props;

    return (
        <Modal onClose={onClose} isOpen={isOpen} animate autoFocus size={size} role={type === "alertdialog" ? ROLE.alertdialog : ROLE.dialog}
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
                   },
                   Dialog: {
                       props: {
                           className: clsx(styles["dialog"], dialogClassName),
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
            <ModalBody className={clsx(styles["container-body"], "hideScrollBar")}>
                {content ? content === "frame" ? <FrameCompare/> :
                    content === "size" ? <SizeGuide/> :
                        content === "summary" ? <OrderSummary dataTable={dataTable}/> :
                            content === "loading" ? <Loading/> :
                                content === "technique" ? <Technique/> :
                                    null : children}
            </ModalBody>
            {footer ? (
                <ModalFooter className={styles["container-footer"]}>
                    {footer}
                </ModalFooter>
            ) : null}
        </Modal>
    );
};

export default modal;

// ReactDOM.createPortal(modalContent, document.getElementById("modal-root"));
