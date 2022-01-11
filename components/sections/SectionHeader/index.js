import { Block } from "baseui/block";
import styles from "./SectionHeader.module.scss";

const SectionHeader = ({title, subTitle, body, containerClassName}) => {
    return (
        <Block maxWidth="676px" width="100%" className={`${styles.sectionHeader} ${containerClassName ? containerClassName : ""}`}>
            <Block as="h4" color="#33DED2">
                {subTitle}
            </Block>
            <Block marginTop={["8px","8px","16px"]} as="h2" color="MinXPrimaryText">
                {title}
            </Block>
            <Block marginTop={["8px","8px","16px"]} as="p" color="#8c8c8c">
                {body}
            </Block>
        </Block>
    )
}

export default SectionHeader
