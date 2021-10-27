import React, {useEffect, useRef, useState} from "react";

import Head from "next/head";
import {withRouter} from "next/router";

import {Section} from "../../components/sections";

function Accessories({router, size}) {
    return (
        <React.Fragment>
            <Head>
                <title>Accessories - WESTSHADE</title>
                {/*    <meta name="description"*/}
                {/*          content="Industry Leading Dependable Canopies & Umbrellas Welcome to the #1 dependable canopy manufacturer in the U.S! We are your exclusive supplier of indoor."/>*/}
            </Head>
        </React.Fragment>
    )
}

export default withRouter(Accessories);
