import {Box, Button, Container, Grid} from "@material-ui/core";
import {useRouter} from "next/router";

export default function Section_Products_Offered() {
    const router = useRouter();

    return (
        <Box className="section-container" style={{textAlign: "center"}}>
            <Container maxWidth="md">
                <h3
                    className="section-title"
                    style={{fontSize: "1.25rem", marginBottom: "24px"}}
                >
                    Other products we offered
                </h3>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div
                            className="banner-container"
                            style={{
                                backgroundImage: "url('/images/rectangle-78-5@2x.png')",
                                minHeight: "240px",
                            }}
                        >
                            <Button
                                variant="contained"
                                className="contained-button-black"
                                onClick={() => router.push("/custom-printing-umbrella")}
                            >
                                Custom printing
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div
                            className="banner-container"
                            style={{
                                backgroundImage: "url('/images/rectangle-79-5@2x.png')",
                                minHeight: "240px",
                            }}
                        >
                            <Button
                                variant="contained"
                                className="contained-button-black"
                                onClick={() => router.push("/accessories")}
                            >
                                Accessories
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
