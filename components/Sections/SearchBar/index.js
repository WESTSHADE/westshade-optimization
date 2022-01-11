import React, {useEffect, useRef, useState} from "react";

import {Block} from "baseui/block";
import {Input} from "baseui/input";
import {Search} from 'baseui/icon'

import Button from "../../Button";

import styles from "./searchBar.module.scss";


const recommendationList = ["Custom printed canopy tent", "Y7 Aluminum canopy tent", "Kapri umbrella", "Custom printed table cover"];

const SearchBar = ({router}) => {
    const inputRef = useRef(null);

    const [historyList, setHistoryList] = useState([]);

    // For Desktop
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [searchDesktopStyle, setSearchDesktopStyle] = useState({height: "52px"});
    // For Tablet, Mobile
    const [showSearchMobile, setShowSearchMobile] = useState(false);
    const [searchMobileStyle, setSearchMobileStyle] = useState({opacity: 0});

    const [keyWord, setKeyWord] = useState("");

    const saveSearchHistory = () => {
        let hList = JSON.parse(JSON.stringify(historyList));

        let idx = hList.findIndex((item) => item === keyWord);

        if (idx === -1) {
            if (hList.length === 5) {
                hList.pop();
            }
            hList.unshift(keyWord);
            localStorage.setItem("searchHistoryList", JSON.stringify(hList));

            setTimeout(() => setHistoryList(hList), 500);
        }
    }

    const search = (type, word) => {
        if (type === 0) {
            hideDropdown();

            setShowBackdrop(false);

        } else if (type === 1) {
            hideBar();
        }

        saveSearchHistory();

        router.push("/search?q=" + word);
    }

    const keyPressEnter = (type, key) => {
        if (key === "Enter") search(type, keyWord);
    }

    const showDropdown = () => {
        setShowBackdrop(true);

        let reHeight = 46 + recommendationList.length * 48;
        let hisHeight = historyList.length * 48;

        setSearchDesktopStyle({height: 52 + 6 + hisHeight + reHeight + "px"});
        setTimeout(() => setShowSearchDropdown(true), 150);
    }

    const hideDropdown = () => {
        setSearchDesktopStyle({height: "52px"});
        setTimeout(() => setShowSearchDropdown(false), 150);
    }

    const showBar = () => {
        setShowSearchMobile(true);
        setTimeout(() => setSearchMobileStyle({opacity: 1}), 0);
    }

    const hideBar = () => {
        setSearchMobileStyle({opacity: 0})
        setTimeout(() => setShowSearchMobile(false), 250);
    }

    useEffect(() => {
        const searchHistoryList = JSON.parse(localStorage.getItem('searchHistoryList')) || [];
        setHistoryList(searchHistoryList);
    }, []);

    // useEffect(() => {
    //     const delaySearchKeyword = setTimeout(() => search(keyWord), 750);
    //
    //     return () => clearTimeout(delaySearchKeyword);
    // }, [keyWord]);

    return (
        <>
            {showBackdrop ? <Block className={styles["search-backdrop"]} onClick={() => setShowBackdrop(false)}/> : null}
            {/*For Desktop*/}
            <Block className={styles["search-content-desktop"]} display={["none", null, null, "flex"]} font="MinXParagraph14" $style={{...searchDesktopStyle}}
                   onMouseEnter={() => {
                       if (inputRef && inputRef.current && inputRef.current.state.isFocused) {
                           showDropdown()
                       }
                   }}
                   onMouseLeave={() => hideDropdown()}
            >
                <Input ref={inputRef} value={keyWord} placeholder="Search westshade.com" startEnhancer={<Search size={24} color="#BFBFBF"/>}
                       onFocus={() => showDropdown()}
                       onChange={(e) => setKeyWord(e.target.value)}
                       onKeyPress={(e) => keyPressEnter(0, e.key)}
                       overrides={{
                           Root: {
                               props: {className: styles["input-root"]},
                               style: ({$isFocused}) => ({
                                   backgroundColor: $isFocused ? "white" : "#F0F0F0",
                                   borderBottomColor: $isFocused ? "#23A4AD" : "transparent",
                                   borderRightColor: $isFocused ? "#23A4AD" : "transparent",
                                   borderTopColor: $isFocused ? "#23A4AD" : "transparent",
                                   borderLeftColor: $isFocused ? "#23A4AD" : "transparent",
                               })
                           },
                           StartEnhancer: {props: {className: styles["input-startEnhancer"]}},
                           InputContainer: {props: {className: styles["input-container"]}},
                           Input: {props: {className: styles["input"]}}
                       }}
                />
                {showSearchDropdown ? (
                    <Block flex={1} width="100%" overflow="scroll">
                        {historyList.map((item, idx) => (
                            <Block key={item} className={styles["search-history-item"]} font="MinXParagraph16" color="MinXPrimaryText" onClick={() => search(0, item)}>
                                <Search size={20} color="#BFBFBF"/><Block>{item}</Block>
                            </Block>
                        ))}
                        <Block className={styles["recommendations"]} padding="16px" font="MinXLabel14">Recommendations</Block>
                        {recommendationList.map((item, idx) => (
                            <Block key={item} className={styles["search-result-item"]} font="MinXParagraph16" color="MinXPrimaryText" onClick={() => search(0, item)}>
                                {item}
                            </Block>
                        ))}
                    </Block>
                ) : null}
            </Block>
            {/*For Tablet, Mobile*/}
            <Block display={["flex", null, null, "none"]} alignItems="center" onClick={() => showBar()}><Search size={24}/></Block>
            {showSearchMobile ? (
                <Block className={styles["search-content-mobile"]} $style={{...searchMobileStyle}}>
                    <Block display="flex" alignItems="center" width="100%" height="56px" padding={["8px 16px", null, "8px 20px"]} backgroundColor="#F2F2F2" $style={{gap: "16px"}}>
                        <Input value={keyWord} placeholder="Search westshade.com" startEnhancer={<Search size={24} color="#BFBFBF"/>}
                               onChange={(e) => setKeyWord(e.target.value)}
                               onKeyPress={(e) => keyPressEnter(1, e.key)}
                               overrides={{
                                   Root: {
                                       props: {className: styles["input-root"]},
                                       style: ({$isFocused}) => ({
                                           borderBottomColor: $isFocused ? "#23A4AD" : "transparent",
                                           borderRightColor: $isFocused ? "#23A4AD" : "transparent",
                                           borderTopColor: $isFocused ? "#23A4AD" : "transparent",
                                           borderLeftColor: $isFocused ? "#23A4AD" : "transparent",
                                       })
                                   },
                                   StartEnhancer: {props: {className: styles["input-startEnhancer"]}},
                                   InputContainer: {props: {className: styles["input-container"]}},
                                   Input: {props: {className: styles["input"]}}
                               }}
                        />
                        <Button.V1 type="text" text="Cancel" font="MinXLabel16" color="#43878C" buttonStyle={{fontWeight: "400 !important"}} onClick={() => hideBar()}/>
                    </Block>
                    <>
                        <Block flex={1} width="100%" overflow="scroll">
                            {historyList.map((item, index) => (
                                <Block key={index} className={styles["search-history-item"]} font="MinXParagraph16" color="MinXPrimaryText" onClick={() => search(1, item)}>
                                    <Search size={20} color="#BFBFBF"/><Block>{item}</Block>
                                </Block>
                            ))}
                            <Block className={styles["recommendations"]} padding="16px 20px" font="MinXLabel14">Recommendations</Block>
                            {recommendationList.map((item, index) => (
                                <Block key={index} className={styles["search-result-item"]} font="MinXParagraph16" color="MinXPrimaryText" onClick={() => search(1, item)}>
                                    {item}
                                </Block>
                            ))}
                        </Block>
                    </>
                </Block>
            ) : null}
            {/*Result Page*/}
            {/*{showResultPage ? (*/}
            {/*    <Block position="fixed" right={0} left={0} bottom={0} width="100vw" height="calc(100vh - 92px)" backgroundColor="white" $style={{zIndex: "0"}}>*/}
            {/*        <Block display="flex" flexDirection="column" width="100%" height="100%" maxWidth={process.env.maxWidth + "px"} margin="auto" padding={["0 16px", null, "0 20px"]}>*/}
            {/*            <Block display="flex" alignItems="center" height="48px" paddingTop={["10px", null, "18px"]}>*/}
            {/*                <Block font={["MinXHeading14", "MinXHeading14", "MinXHeading32"]} color="MinXPrimaryText" $style={{fontWeight: "500", lineHeight: 1}}>{`${resultList.length} items found`}</Block>*/}
            {/*            </Block>*/}
            {/*            <Block display="grid" gridTemplateColumns={["1fr", null, "repeat(3, 1fr)", "repeat(4, 1fr)"]} gridColumnGap={["16px", null, "20px"]} gridRowGap={["16px", null, "20px"]}>*/}
            {/*                {resultList.map((item, index) => {*/}
            {/*                    let imageUrl = "";*/}
            {/*                    if (item.hasOwnProperty("images")) {*/}
            {/*                        imageUrl = item.images[0].src;*/}
            {/*                    } else if (item.hasOwnProperty("image")) {*/}
            {/*                        imageUrl = item.image.src;*/}
            {/*                    }*/}

            {/*                    return (*/}
            {/*                        <Block key={item.name} padding={["8px 8px 8px 0", null, "8px"]}>*/}
            {/*                            <Block position="relative" width={["100%", null, "190px"]} margin="auto">*/}
            {/*                                <Image src={imageUrl} alt={item.name} width={1024} height={1024} layout="responsive" objectFit="contain" loader={({src, width}) => src} unoptimized/>*/}
            {/*                            </Block>*/}
            {/*                            <Block display="grid" gridTemplateRows="1fr auto" gridRowGap="8px" marginBottom="8px" color="MinXPrimaryText">*/}
            {/*                                <Block font="MinXLabel16" $style={{fontWeight: "500", lineHeight: 1}}>{item.name}</Block>*/}
            {/*                                <Block className={styles["text-ellipsis"]} height={item.short_description ? "60px" : "unset"} font="MinXParagraph14" overflow="hidden" dangerouslySetInnerHTML={{__html: item.short_description}}/>*/}
            {/*                            </Block>*/}
            {/*                            <Block font="MinXLabel14" color="MinXPrimaryText" $style={{fontWeight: "500", lineHeight: 1}}>From <NumberFormat thousandSeparator={true} prefix={"$"} value={item.price} displayType={"text"}/></Block>*/}
            {/*                        </Block>*/}
            {/*                    )*/}
            {/*                })}*/}
            {/*            </Block>*/}
            {/*        </Block>*/}
            {/*    </Block>*/}
            {/*) : null}*/}
        </>
    )
}

export default SearchBar;
