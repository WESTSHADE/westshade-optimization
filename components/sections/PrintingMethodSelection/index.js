import {useStyletron} from "baseui"
import {Block} from "baseui/block"
import Image from "next/image"
import {useState} from "react"
import MButton from "../../button-n"
import {Modal} from "../../surfaces"
import styles from "./PrintingMethodSelection.module.scss"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from "react-responsive-carousel"

const PrintingMethodCard = ({method, active, onClick}) => {
    const [css] = useStyletron();
    const [hovered, setHovered] = useState(false)

    const createCopy = (copy) => {
        return {__html: copy}
    }

    return (
        <>
                <Block onClick={onClick} width="100%" backgroundColor="MinXTableHeader" className={`${styles.card} ${ active ? styles.active : ""}`}>
                    <Block width="100%" display="flex" flexDirection="column" alignItems="center">
                        <Block width="100%" className={styles.cardTitle}>
                            {method.label}
                        </Block>
                        <Block width="100%" className={styles.cardDetails}>
                            <Block className={styles.cardDetails__item}>
                                <Block className={styles.cardDetails__item__label} font="MinXParagraph14" color="#8c8c8c">
                                    Fastness
                                </Block>
                                <Block className={styles.cardDetails__item__value}>
                                    <span>{method.fastness}</span> year*
                                </Block>
                            </Block>
                            <Block className={styles.cardDetails__item}>
                                <Block className={styles.cardDetails__item__label} font="MinXParagraph14" color="#8c8c8c">
                                    Thickness
                                </Block>
                                <Block display="flex" flexDirection="column" alignItems="center" className={styles.cardDetails__item__value}>
                                    <Block marginTop="10px" marginBottom="10px" width="70px">
                                        <Image src={method.thicknessImage} height={22} width={78} layout="responsive" objectFit="contain" quality={10}/>
                                    </Block>
                                    {method.thickness}
                                </Block>
                            </Block>
                            <Block className={styles.cardDetails__item}>
                                <Block className={styles.cardDetails__item__label} font="MinXParagraph14" color="#8c8c8c">
                                    Fabric
                                </Block>
                                <Block className={styles.cardDetails__item__value} dangerouslySetInnerHTML={createCopy(method.fabric)}/>
                            </Block>
                        </Block>
                        <Block display="flex" flexDirection="column" alignItems="center" className={styles.cardImage}>
                            <div>
                                <Image src={method.image} width={336} height={180} layout="responsive" quality={30} objectFit="cover"/>
                                <Block $style={{opacity: hovered ? 1 : 0}}>
                                    <Image src={method.originalImage} width={336} height={180} layout="responsive" quality={30} objectFit="cover"/>
                                </Block>
                                <Block as="span" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} minWidth="163px" position="absolute" top="50%" left="50%" $style={{zIndex: "10", transform: "translate(-50%,-50%)"}}>
                                    <MButton
                                        buttonClassName={css({
                                            background: "rgba(255, 255, 255, 0.6) !important",
                                            backdropFilter: "blur(6px) !important",
                                            transition: "all .3s ease-in",
                                            padding: "9px 18px !important",
                                            ':hover': {background: "rgba(255, 255, 255, 0.85) !important"}
                                        })}
                                        width="100%"
                                        color="MinXTitle"
                                        font="MinXParagraph14"
                                        startEnhancer={() => <Block as="i" display="grid" placeItems="center"><Image src="/images/icon/icon-pointer.png" alt="hover" width={14} height={17} layout="fixed"/></Block>}
                                        text="See original image"
                                    />
                                </Block>
                            </div>
                            <Block marginTop="2px" $style={{textAlign: "center"}} color="MinXTitle" font="MinXParagraph12">
                                {`This sample is printed on ${method.fabricPrinted} fabric.`}
                            </Block>
                        </Block>
                        <Block marginTop="16px" width="100%" className={styles.cardCta}>
                            <MButton height="auto"
                            onClick={onClick}
                            buttonStyle={{
                                backgroundColor: "transparent !important",
                                color: "#262626 !important",
                                fontFamily: "Roboto !important",
                                fontSize: "14px !important",
                                fontWeight: "500 !important",
                                width: "100% !important",
                                borderTopWidth: "2px",
                                borderBottomWidth: "2px",
                                borderLeftWidth: "2px",
                                borderRightWidth: "2px",
                                borderTopStyle: "solid",
                                borderBottomStyle: "solid",
                                borderRightStyle: "solid",
                                borderLeftStyle: "solid",
                                borderColor: "#bfbfbf",
                                paddingTop: "16px !important",
                                paddingBottom: "16px !important",
                            }}
                            text={`Select ${method.label}`}/>
                        </Block>
                    </Block>
                </Block>
                {
                    method.note &&
                    <Block $style={{textAlign: "center"}} font="MinXParagraph14" color="MinXSecondaryText">
                        {method.note}
                    </Block>
                }
        </>
    )
}

const PrintingMethodSelection = ({printingMethods, printingMethodValue, setMethod}) => {
    const [showPrintingTechnology, setShowPrintingTechnology] = useState(false);

    return (
        <>
            <Block width="100%" display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
                <Block width="100%" display="flex" flexDirection="column" justifyContent="center">
                    <Block font="MinXSubtitle20" color="MinXTitle">
                        Please select prefered printing method.
                    </Block>
                    <Block width="100%"  marginTop="2px" padding="6px 0" display="flex" justifyContent="space-between" alignItems="center">
                        <Block font="MinXParagraph16" color="#808080">
                            {printingMethods.length} methods available
                        </Block>
                        <MButton height="32px" onClick={() => setShowPrintingTechnology(true)} buttonStyle={{backgroundColor: "#F2F2F2 !important", color: "#808080 !important", fontFamily: "Roboto !important", fontSize: "14px"}}
                            text="Compare"/>
                    </Block>
                </Block>
            </Block>
            <Block className={styles.methodsContainer__desktop} width="100%" justifyContent="center" alignItems="stretch" $style={{flexWrap:"nowrap"}} marginTop="16px">
                {
                    printingMethods.map((method) => (
                        <Block className={styles.cardWrapper}>
                            <PrintingMethodCard
                                key={method.value}
                                method={method}
                                active={printingMethodValue === method.value}
                                onClick={() => setMethod({pMethod: method.value})}
                            />
                        </Block>
                    ))
                }
            </Block>
            <Block width="100%" marginTop="16px" className={styles.methodsContainer__mobile}>
                <Carousel
                    className={styles.methodsContainer__mobile__carousel}
                    emulateTouch
                    showIndicators
                    showStatus={false}
                    showArrows={false}
                    renderIndicator={(onClickHandler, isSelected, index, label) => {
                        return (
                            <Block
                                value={index}
                                key={index}
                                role="button"
                                tabIndex={0}
                                title={`${label} ${index + 1}`}
                                aria-label={`${label} ${index + 1}`}
                                $style={{
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "50%",
                                    backgroundColor: isSelected ? "#262626" : "#D9D9D9",
                                    margin: "0 4px",
                                    display: "inline-block",
                                    bottom: "100%"
                                }}
                            />
                        );
                    }}
                >
                    {
                        printingMethods.map((method) => (
                            <Block className={styles.cardWrapper}>
                                <PrintingMethodCard
                                    key={method.value}
                                    method={method}
                                    active={printingMethodValue === method.value}
                                    onClick={() => setMethod({pMethod: method.value})}
                                />
                            </Block>
                        ))
                    }
                </Carousel>
            </Block>
            <Modal type="alertdialog" isOpen={showPrintingTechnology} onClose={() => setShowPrintingTechnology(false)} content="technique" dialogStyles={{transform: "translateY(0) !important"}}/>
        </>
    )
}

export default PrintingMethodSelection
