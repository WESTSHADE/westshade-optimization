import React from "react";

import Image from "next/image";

import {Block} from "baseui/block";
import {AspectRatioBox, AspectRatioBoxBody} from 'baseui/aspect-ratio-box';

import styles from "./block.module.scss"

const Section = ({dataList}) => {
    return (
        <Block display="grid" gridTemplateColumns={["1fr", null, "repeat(" + dataList.length + ", minmax(auto, 410px))"]} gridColumnGap="20px" gridRowGap="24px" margin="auto" alignItems="baseline">
            {dataList.map(({url, alt, title, content, titleImageUrl}, index) =>
                <Block key={index} className={styles["block"]} display={["flex", null, "grid"]} flexDirection={[index % 2 === 0 ? "row" : "row-reverse", null, "unset"]}>
                    <Block className={styles["container-image"]} width={["130px", null, "100%"]} height={["130px", null, "300px"]}>
                        <Image src={url} alt={alt} layout="fill" objectFit="cover"/>
                    </Block>
                    <Block display="grid" flex={1} gridTemplateRows="max-content" gridRowGap={["8px", null, "16px"]}>
                        {titleImageUrl ? (
                            <AspectRatioBox aspectRatio={7 / 2} width={["56px", null, "70px"]} marginLeft={[null, null, "auto"]} marginRight="auto">
                                <AspectRatioBoxBody as={Image} src={titleImageUrl} alt={title} layout="fill" objectFit="contain"/>
                            </AspectRatioBox>
                        ) : (
                            <Block className={styles["title"]} marginLeft={[null, null, "auto"]} marginRight="auto" font={["MinXHeading16", "MinXHeading16", "MinXHeading20"]} color="MinXPrimaryText">{title}</Block>
                        )}
                        <Block justifyItems="flex-start" font="MinXParagraph16" color="MinXSecondaryText">{content}</Block>
                    </Block>
                </Block>
            )}
        </Block>
    )
}

export default Section;
