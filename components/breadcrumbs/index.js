import React from "react";
import clsx from "clsx";

import styles from "./breadcrumbs.module.css";

class Breadcrumbs extends React.Component {
    render() {
        const {children, className, style} = this.props;

        let list = [], styleList = [];
        if (className) {
            list = className.split(" ");
            styleList = list.map(c => styles[c]);
        }

        return (
            <div className={clsx(styles["container"], [...styleList])} style={{...style}}>
                {children}
            </div>
        )
    }
}

export default Breadcrumbs;
