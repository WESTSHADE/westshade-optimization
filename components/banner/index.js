import React from "react";
import {Container, Grid, Typography} from "@material-ui/core";
import clsx from "clsx";

import Image from "next/image";

import styles from "./banner.module.css";

class Banner extends React.Component {
    render() {
        const {children, title, content, backgroundImage, align, containerStyle} = this.props;

        return (
            <div className={clsx([styles["container-full-screen"], styles["container-banner"]])} style={{...containerStyle}}>
                <Image src={backgroundImage} alt="canopy tent banner" layout="fill" objectFit="cover" placeholder="blur"/>
                <Container maxWidth="md" classes={{root: styles["root-container"]}}>
                    {align === "left" ? (
                        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
                            {title ? (
                                <Typography variant="h6" classes={{h6: styles["typography-title"]}} paragraph={true} align="center">
                                    {title}
                                </Typography>
                            ) : null}
                            {content ? (
                                <Typography variant="h3" classes={{h3: styles["typography-title"]}} align="center">
                                    {content}
                                </Typography>
                            ) : null}
                            {children}
                        </Grid>
                    ) : (
                        <Grid>
                            {title ? (
                                <Typography variant="h6" classes={{h6: styles["typography-title"]}} paragraph={true} align="center">
                                    {title}
                                </Typography>
                            ) : null}
                            {content ? (
                                <Typography variant="h3" classes={{h3: styles["typography-title"]}} align="center">
                                    {content}
                                </Typography>
                            ) : null}
                            {children}
                        </Grid>
                    )}
                </Container>
            </div>
        );
    }
}

export default Banner;
