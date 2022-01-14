const printingMethods = [
    {
        color: "Vivid color; good contrast",
        fabric: "<span class='highlighted'> 600D, 288 gsm </span> polyester <br/> with PU coating",
        fabricPrinted: "600D",
        fastness: "1",
        thickness: "thick",
        thicknessImage: "/images/icon/icon-thick.png",
        image: "/images/custom-printed-canopy-tent/pmt-dye-sublimation-v2.webp",
        originalImage: "/images/custom-printed-canopy-tent/pmt-original.png",
        value: "DYE SUBLIMATION PRINTING",
        label: "Dye Sublimation",
        years: "2-3",
        note: "*Color fastness depends on usage and weather condition."
    },
    {
        color: " <span class='highlighted'> More vivid; great contrast </span>",
        fabric: " <span class='highlighted'> 900D, 360 gsm </span> polyester <br/> with PU coating",
        fabricPrinted: "900D",
        fastness: "4-5",
        thickness: "thicker",
        thicknessImage: "/images/icon/icon-thicker.png",
        image: "/images/custom-printed-canopy-tent/pmt-uv-printing-v2.webp",
        originalImage: "/images/custom-printed-canopy-tent/pmt-original.png",
        value: "UV PRINTING",
        label: "UV Printing",
        years: "4-5",
        note: ""
    }
]
const frameTypes = [
    {
        image: "/images/canopy-tent/tent/y7.webp",
        value: "Y7",
        label: "Heavy-Duty Aluminum Frame",
        description: "Y7 range is the most heavy duty pop-up canopy on the market with unchallenged strength and durability. It is perfect for outdoor events, job fairs, trade fair exhibitors and wedding venues.",
        price: "0"
    },
    {
        image: "/images/canopy-tent/tent/y6.webp",
        value: "Y6",
        label: "Commercial Aluminum Frame",
        description: "Y6 range is an ideal entry level of aluminum tent. It's lightweight yet remaining the strength of heavy duty steel frame. It is ideal for the regular professional user.",
        price: "0"
    },
    {
        image: "/images/canopy-tent/tent/y5.webp",
        value: "Y5",
        label: "Economical Steel Frame",
        description: "Y5 ranges is a commercial grade heavy duty steel frame, friendly budget, suitable for the regular user and start-up traders. It is designed for everyday use, performs exceptionally well all year round.",
        price: "0"
    },
]
const tentSizes = {
    Y7: [
        {size: "10x10", label: "10'x10'", image: "/images/icon/icon-10x10.png"},
        {size: "10x15", label: "10'x15'", image: "/images/icon/icon-10x15.png"},
        {size: "10x20", label: "10'x20'", image: "/images/icon/icon-10x20.png"},
        {size: "13x13", label: "13'x13'", image: "/images/icon/icon-13x13.png"},
        {size: "13x20", label: "13'x20'", image: "/images/icon/icon-13x20.png"},
        {size: "13x26", label: "13'x26'", image: "/images/icon/icon-13x26.png"},
        {size: "16x16", label: "16'x16'", image: "/images/icon/icon-16x16.png"},
        {size: "20x20", label: "20'x20'", image: "/images/icon/icon-20x20.png"},
    ],
    Y6: [
        {size: "10x10", label: "10'x10'", image: "/images/icon/icon-10x10.png"},
        {size: "10x15", label: "10'x15'", image: "/images/icon/icon-10x15.png"},
        {size: "10x20", label: "10'x20'", image: "/images/icon/icon-10x20.png"},
    ],
    Y5: [
        {size: "10x10", label: "10'x10'", image: "/images/icon/icon-10x10.png"},
        {size: "10x15", label: "10'x15'", image: "/images/icon/icon-10x15.png"},
        {size: "10x20", label: "10'x20'", image: "/images/icon/icon-10x20.png"},
    ]
}

export {printingMethods, frameTypes, tentSizes}
