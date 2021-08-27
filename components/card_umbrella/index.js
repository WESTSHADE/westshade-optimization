import React from "react";

import {Grid, Paper, Typography} from "@material-ui/core";
import CLink from "../link";

import styles from "./card.module.css";

class Card_Umbrella extends React.Component {
    render() {
        const {backgroundColor, descBackgroundColor, imageBackgroundColor, src, tag, title, subtitle, description, price = "0", href} = this.props;

        return (
            <div className={styles["container"]}>
                {tag ? (<div className={styles["tag"]}>{tag}</div>) : null}
                <Paper classes={{root: styles["root-item-umbrella"]}} style={{backgroundColor: backgroundColor, borderTopLeftRadius: tag ? 0 : ""}} elevation={0}>
                    <div className={styles["upper-section"]}>
                        <Typography variant="h6"><strong>{title}</strong></Typography>
                        <Typography classes={{root: styles["root-card-subtitle"]}}>{subtitle}</Typography>
                    </div>
                    <div className={styles["image-section"]}>
                        <img className={styles["image"]} src={src}/>
                    </div>
                    <div className={styles["lower-section"]}
                         style={{backgroundColor: imageBackgroundColor}}
                    >
                        <div className={styles["card-description"]}
                             style={{backgroundColor: descBackgroundColor}}
                        >
                            {description}
                        </div>
                        <div className={styles["card-price"]}>
                            <Grid container direction="row" alignItems="center" justifyContent="space-between">
                                <Typography variant="subtitle1">From <strong>{"$" + price}</strong></Typography>
                                <CLink backgroundColor={"black"} href={href} size="large">Shop</CLink>
                            </Grid>
                        </div>
                    </div>
                    <div className={styles["background"]} style={{backgroundColor: imageBackgroundColor}}/>
                </Paper>
            </div>
        )
    }
}

export default Card_Umbrella;
