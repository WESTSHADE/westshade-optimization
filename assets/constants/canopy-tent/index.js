const data = {
    "trade-show": {
        name: "Trade Fair",
        hasVariants: true,
        accessories: [19927, 19214, 19378, 19336],
        variants: [
            {
                id: "stock-color-tent",
                name: "Stock Color",
                label: "Stock Color Tent",
                parts: [
                    {
                        name: "10x10 Canopy Tent",
                        productId: 26406,
                        product: {},
                        isPackage: false,
                    },
                    {
                        name: "10x15 Canopy Tent",
                        productId: 26407,
                        product: {},
                        isPackage: false,
                    },
                ]
            },
            {
                id: "custom-printed-tent",
                name: "Custom Printed",
                label: "Custom Printed Tent",
                parts: [
                    {
                        name: "10x10 Custom Printed Canopy Tent",
                        productId: 62118,
                        product: {},
                        isPackage: true,
                    },
                    {
                        name: "10x15 Custom Printed Canopy Tent",
                        productId: 62205,
                        product: {},
                        isPackage: true,
                    },
                ]
            },
        ],
        parts: [],
        description: "Your event whether it is a farmers market, trade show, art show, or pet show would not be complete without the coverage of a high quality water and scratch resistant pop-up tent. Our pop up tents come with UV resistant and fire retardant fabric that can withstand all weather conditions. So whether you’re in the market for selling produce or art; our pop up tents can take your business to higher levels. We provide free mock-ups and also free shipping. We are here to provide custom canopy tents that help your brand.",
    },
    "restaurant": {
        name: "Restaurant",
        hasVariants: false,
        accessories: [19927, 20510, 19212, 19214],
        variants: [],
        parts: [
            {
                name: "10x15 Canopy Tent",
                productId: 26407,
                product: {},
                isPackage: false,
            },
            {
                name: "10x15 Custom Printed Canopy Tent",
                productId: 62205,
                product: {},
                isPackage: true,
            },
            {
                name: "10x20 Custom Printed Canopy Tent",
                productId: 62205,
                product: {},
                isPackage: true,
            },
        ],
        description: "There’s always something magical about outdoor dining. The warm, sunny outdoors, fresh breeze and amazing food are enticing. That is why Pop up canopies are perfect for your cafe or restaurant needs. The pop-up canopies are heavy duty, wind resistant, fire retardant, long-lasting fabric and also detachable sidewalls that make it perfect to provide more shade. Get your free mock-up and also free shipping! We help your brand create custom canopy tents that stand out of the crowd. Our canopies are commercial quality grade and come with a comprehensive shelter. Fade resistant printing also keeps your logo looking fresh year after year."
    },
}

const specs = {
    "10x10": {
        peakHeight: `10'10"`,
        heightAdjustment: {
            summary: `5'2"-6'8"`,
            all: `5'2"(158cm) / 6'1"(187cm) / 6'8"(203cm)`
        },
        weight: {
            pounds: "98.9lbs",
            kilograms: "44.9kg"
        },
        packageVolume: {
            summary: `65"x13"x13"`,
            all: `65" * 13" * 13" (164cm * 34cm * 34cm)`
        },
        // frameWarranty: "10 years",
        // frameWarranty: "1 year",
        windResistance: true,
        waterResistance: true,
        fireRetardant: "CPAI-84",
        uvProtection: "UVP 50+"
    },
    "10x15": {
        peakHeight: `10'10"`,
        heightAdjustment: {
            summary: `5'2"-6'8"`,
            all: `5'2"(158cm) / 6'1"(187cm) / 6'8"(203cm)`
        },
        weight: {
            pounds: "98.9lbs",
            kilograms: "44.9kg"
        },
        packageVolume: {
            summary: `65"x13"x13"`,
            all: `65" * 13" * 13" (164cm * 34cm * 34cm)`
        },
        // frameWarranty: "10 years",
        // frameWarranty: "1 year",
        windResistance: true,
        waterResistance: true,
        fireRetardant: "CPAI-85",
        uvProtection: "UVP 50+"
    },
}

export {data, specs}
