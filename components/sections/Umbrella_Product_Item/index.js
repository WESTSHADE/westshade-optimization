import React from "react";

import {useRouter} from "next/router";
import Image from "next/image";

import {Block} from "baseui/block";
import {AspectRatioBox, AspectRatioBoxBody} from "baseui/aspect-ratio-box";

import Button from "../../button-n";

let imageSrc = '/images/product/default-product.webp';

const ProductItem = ({detail}) => {
    const router = useRouter();

    let link = 'https://www.westshade.com/products/accessories/?id=' + detail.id;

    const setMainImage = (images) => {
        if (!images || images.length === 0) return;
        imageSrc = images[0].src.replace(/^http:\/\/54\.212\.246\.17/i, "https://checkout.westshade.com");
    };

    if (detail.hasOwnProperty("image")) {
        setMainImage([detail.image]);
    } else if (detail.hasOwnProperty("images")) {
        setMainImage(detail.images);
    }

    return (
        <Block display="grid" gridRowGap="14px" justifyItems="center" width="100%" maxWidth="120px" margin="auto">
            <AspectRatioBox aspectRatio={1} width="inherit">
                <AspectRatioBoxBody as={Image} src={imageSrc} alt="umbrella accessories" layout="fill" objectFit="contain"/>
            </AspectRatioBox>
            <Block className="text-center" font="MinXLabel14" color="MinXPrimaryText">{detail.name}</Block>
            <Button height="28px" font="MinXLabel12" text='Learn More' bundle="primary" onClick={() => router.push(link)}/>
        </Block>
    )
}

export default ProductItem;
