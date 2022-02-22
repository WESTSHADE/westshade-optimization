import {Block} from "baseui/block"
import Image from "next/image";

import styles from "./parts.module.scss";

const data = [
    {
        name: "European Made Acrylic",
        logo: "/images/icon/icon-agora.png",
        label: "",
        material: "Acrylic",
        fastness: {
            description: "Anti-aging & Light fastness",
            rating: "10/10"
        },
        uvProtection: {
            rating: 4.5
        },
        quality: "High-end profession",
        frameWarranty: "5"
    },
    {
        name: "Solution Dyed Polyster",
        logo: "",
        label: "SDP",
        material: "Polyester",
        fastness: {
            description: "Anti-aging & Light fastness",
            rating: "4/10"
        },
        uvProtection: {
            rating: 2
        },
        quality: "Profession",
        frameWarranty: "2"
    },
]

const fabric_compare = () => {
    return (
        <>
            <Block className={styles.fabric_compare}>
                <Block display="flex" width="100%" justifyContent="center">
                    {data.map((item) => (
                        <Block width="50%" key={item.name} display="flex" flexDirection="column" alignItems="center">
                            <Block className={styles.fabric_compare__logo} display="flex" flexDirection="column" alignItems="center">
                                {item.logo ?
                                    <Image src={item.logo} alt={item.name} width={70} height={24} layout="fixed" objectFit="contain"/>
                                    :
                                    <Block color="#000000" font="MinXParagraph16">{item.label}</Block>
                                }
                                <Block as="h4" marginTop="4px">{item.name}</Block>
                            </Block>
                            <Block display="flex" flexDirection="column" alignItems="center">
                                <Block as="h4" marginTop="4px">Material</Block>
                                <Block marginTop="8px" as="h3">{item.material}</Block>
                            </Block>
                            <Block display="flex" flexDirection="column" alignItems="center">
                                <Block as="h4" marginTop="4px">{item.fastness.description}</Block>
                                <Block marginTop="8px" as="h3">{item.fastness.rating}</Block>
                            </Block>
                            <Block display="flex" flexDirection="column" alignItems="center">
                                <Block as="h4" marginTop="4px">UV Protection</Block>
                                <Block marginTop="8px" as="h3">
                                    {[...Array(5)].map((_, idx) => {
                                        if (item.uvProtection.rating > idx && item.uvProtection.rating < idx + 1) {
                                            return <Block as="i" marginLeft="1.5px" marginRight="1.5px" width="18px" height="18px"><Image src="images/icon/icon-star-half.png" alt="star" width={18} height={18} layout="fixed"/></Block>
                                        } else if (item.uvProtection.rating > idx) {
                                            return <Block as="i" marginLeft="1.5px" marginRight="1.5px" width="18px" height="18px"><Image src="images/icon/icon-star-blue.png" alt="star" width={18} height={18} layout="fixed"/></Block>
                                        } else {
                                            return <Block as="i" marginLeft="1.5px" marginRight="1.5px" width="18px" height="18px"><Image src="images/icon/icon-star-blank.png" alt="star" width={18} height={18} layout="fixed"/></Block>
                                        }
                                    })}
                                </Block>
                            </Block>
                            <Block display="flex" flexDirection="column" alignItems="center">
                                <Block as="h4" marginTop="4px">Quality</Block>
                                <Block marginTop="8px" as="h3">{item.quality}</Block>
                            </Block>
                            <Block display="flex" flexDirection="column" alignItems="center">
                                <Block as="h4" marginTop="4px">Warranty</Block>
                                <Block marginTop="8px" as="h3">{item.frameWarranty} years</Block>
                            </Block>
                        </Block>
                    ))}
                </Block>
            </Block>
        </>
    )
}

export default fabric_compare
