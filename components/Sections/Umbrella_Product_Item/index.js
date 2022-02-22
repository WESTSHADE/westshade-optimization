import React from "react";

import {useRouter} from "next/router";
import Image from "next/image";

import {Block} from "baseui/block";
import {AspectRatioBox, AspectRatioBoxBody} from "baseui/aspect-ratio-box";

import Button from "../../Button/V1";

let imageSrc = '/images/product/default-product.webp';

const ProductItem = ({detail}) => {
    const router = useRouter();

    let link = 'https://www.westshade.com/products/accessories/' + detail.id;

    const setMainImage = (images) => {
        if (!images || images.length === 0) return;
        imageSrc = images[0].src;
    };

    if (detail.hasOwnProperty("image")) {
        setMainImage([detail.image]);
    } else if (detail.hasOwnProperty("images")) {
        setMainImage(detail.images);
    }

    return (
        <Block display="grid" gridRowGap="14px" justifyItems="center" width="100%" maxWidth="120px" margin="auto">
            <AspectRatioBox width="inherit">
                <AspectRatioBoxBody as={Image} src={imageSrc} alt="umbrella accessories" layout="fill" objectFit="contain" loader={({src, width}) => src}/>
            </AspectRatioBox>
            <Block className="text-center" font="MinXLabel14" color="MinXPrimaryText">{detail.name}</Block>
            <Button height="28px" font="MinXLabel12" text='Learn More' bundle="primary" onClick={() => router.push(link)}/>
        </Block>
    )
}

export default ProductItem;
