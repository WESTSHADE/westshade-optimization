import React, {useState} from "react";
import clsx from "clsx";

import Image from "next/image";

import {FILL, Tab, Tabs} from "baseui/tabs-motion";

import styles from "./section.module.scss";

const printingTechnologySample = [
    {title: "UV Printing", imageUrl: "/images/custom-printed-canopy-tent/pmt-uv-printing-v2.webp"},
    {title: "Dye Sublimation", imageUrl: "/images/custom-printed-canopy-tent/pmt-dye-sublimation-v2.webp"},
    {title: "Actual Digital Image", imageUrl: "/images/custom-printed-canopy-tent/pmt-original.png"},
];

const Section = () => {
    const [activePrintingSample, setActivePrintingSample] = useState("0");

    return (
        <Tabs activeKey={activePrintingSample} onChange={({activeKey}) => setActivePrintingSample(activeKey + "")} fill={FILL.fixed}
              overrides={{
                  TabList: {
                      props: {
                          className: styles["container-tabs"]
                      }
                  },
                  TabBorder: {props: {hidden: true}, style: {display: "none"}}, TabHighlight: {props: {hidden: true}, style: {display: "none"}}
              }}
        >
            {printingTechnologySample.map((simple, idx) => (
                <Tab key={idx} title={simple.title}
                     overrides={{
                         Tab: {
                             props: {
                                 className: clsx([styles["container-tab"], "basic-transition"])
                             },
                             style: ({$isActive}) => ({
                                 borderColor: $isActive ? "#23A4AD" : "#D0D9D9",
                                 boxShadow: $isActive ? "rgb(35 164 173 / 20%) 0 0 0 6px" : "none",
                             }),
                         },
                         TabPanel: {
                             props: {
                                 className: styles["container-tab-panel"]
                             }
                         }
                     }}
                >
                    <Image src={simple.imageUrl} alt={simple.title} layout="fill" objectFit="cover" objectPosition="center"/>
                </Tab>
            ))}
        </Tabs>
    );
}

export default Section;
