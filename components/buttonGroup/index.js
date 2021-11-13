import {Button, ButtonGroup, CircularProgress, Grid} from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import clsx from "clsx";
import styles from "./button.module.scss";

function Checkout(props) {
    const type = props.type || "purchase";
    const available = props.available || false;
    const progress = props.progress || false;

    return (
        <Grid container direction="row" alignItems="center" classes={{root: styles["container-product-cart"]}}>
            {type !== "purchase" ? (
                <Button variant="contained" classes={{contained: styles["product-cart-quote"]}} color="inherit" onClick={props.onClick}>
                    Get Quote
                </Button>
            ) : (
                <>
                    <ButtonGroup classes={{root: styles["product-cart-quantity"]}}>
                        <Button aria-label="minus" onClick={props.onClickLeft}>
                            <RemoveRoundedIcon/>
                        </Button>
                        <div className={styles["cart-quantity"]}>{props.count}</div>
                        <Button aria-label="plus" onClick={props.onClickRight}>
                            <AddRoundedIcon/>
                        </Button>
                    </ButtonGroup>
                    <Button variant="contained" classes={{contained: clsx([styles["product-cart-checkout"], !available ? styles["disable"] : ""])}} color="inherit" onClick={props.onClick} disabled={!available || progress}>
                        {progress ? (
                            <>
                                <CircularProgress classes={{root: styles["progress"]}} size={18} color="inherit"/>
                                <span>Add to Cart</span>
                            </>
                        ) : (
                            "Add to Cart"
                        )}
                    </Button>
                </>
            )}
        </Grid>
    );
}

export default Checkout;
