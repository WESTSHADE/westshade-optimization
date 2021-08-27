import dynamic from "next/dynamic";
import {Box, Container} from "@material-ui/core";

const SectionSocialGroup = dynamic(() => import("../section_social_group"));

export default function Section_Easy_Set_Up() {
    return (
        <Box className="section-container" style={{textAlign: "center"}}>
            <h3
                className="section-title"
                style={{fontSize: "2.125rem", lineHeight: "2.25rem"}}
            >
                Easy set up. Even easier to disassemble.
            </h3>
            <p className="section-content-entend">
                Our patio canopy tents tents are designed to fold up and expand quickly
                and easily.
                <br/>
                The tent can be fully assembled by 2 people in 45 seconds.
            </p>
            <Container maxWidth="md">
                <img
                    className="section-image"
                    style={{padding: "8px"}}
                    src="/images/set-up@1x.png"
                />
            </Container>
            <p className="section-content-entend" style={{marginBottom: "30px"}}>
                Follow us on social media to stay up to date with our canopy tent news
                and special offers!
            </p>
            <SectionSocialGroup/>
        </Box>
    );
}
