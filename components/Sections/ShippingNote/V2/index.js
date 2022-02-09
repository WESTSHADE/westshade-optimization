import React, {useEffect, useState} from "react";
import moment from 'moment';

import Image from "next/image";
import Link from "next/link";

import {Block} from "baseui/block";
import {AspectRatioBox} from "baseui/aspect-ratio-box";

import {DateFn} from "Utils/tools";

const dateFn = new DateFn();

// const shippedDay = dateFn.getReceivedDay();

const getRemainTime = () => {
    let now = moment().zone("-08:00");
    let end = moment().zone("-08:00").endOf('day').subtract(8, "hour").subtract(30, "minute");
    let diffH = Math.trunc(end.diff(now, "h", true));
    let diffM = end.diff(now, "m") % 60;
    let diffS = end.diff(now, "s") % 60;

    return diffM >= 0 ? {hour: diffH, min: diffM, sec: diffS} : null;
}

const ShippingNote = (props) => {
    const [shippedDay, setShippedDay] = useState("Today");
    const [remain, setRemain] = useState(null);

    useEffect(() => {
        setRemain(getRemainTime());

        const interval = setInterval(() => setRemain(getRemainTime()), 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => setShippedDay(dateFn.getReceivedDayV2(remain)), [remain]);

    return (
        <Block display="flex" flexDirection="row" {...props}>
            <AspectRatioBox aspectRatio={1} width="16px" height="16px" marginRight="12px">
                <Image src="/images/icon/delivery.png" alt="free shipping" layout="fill" objectFit="contain"/>
            </AspectRatioBox>
            <Block font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph12", "MinXParagraph14"]} flex={1}>
                <Block>FREE shipping on orders over $149; {remain ? <>Order within <Block as="span" color="#23A4AD">{remain.hour > 0 ? remain.hour + " hours " : ""}{remain.min + " minutes "}{remain.sec + " seconds"}</Block>, </> : null}
                    shipped by <Block as="span" $style={{fontWeight: "bold !important"}}>{shippedDay}</Block>.
                    <Block as="span" marginLeft="4px" color="#356DB6"><Link href="/shipping-return">Detail</Link></Block>
                </Block>
                <Block>Accept return within 30 days of purchase.<Block as="span" marginLeft="4px" color="#356DB6"><Link href="/shipping-return?tab=1" as="/shipping-return">Detail</Link></Block></Block>
            </Block>
        </Block>
    )
}

export default ShippingNote;
