import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./footer.module.css";

import { Box, Container, Divider, Grid, IconButton, List, ListItem, ListItemText } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faFacebook, faTwitter, faInstagram, faPinterest } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
	const router = useRouter();

	return (
		<Box>
			<div className={styles["top-container"]}>
				<Container maxWidth="lg">
					<Grid container className={styles["top-container-text"]}>
						<p>1. In-stock orders are not guaranteed to ship the same day they are received. All orders received for in-stock items ship within 2 business days.</p>
						<p>
							2. Any products that are determined to be found damaged after opening must be reported to your Sales Representative within 1 day after received. Our team will work on a quick and agreeable solution to any damaged product. If
							your shipment contains extensive damage to the outer packaging upon delivery, refuse the shipment and contact us immediately at 949-522-8111 or email us at support@westshade.com.
						</p>
						<p>
							3. For all online payments by credit, debit, or check card the payment is authorized and held by your financial institution at the time the order is placed to confirm the card is valid. You will be charged for your Westshade
							purchase when the item(s) are shipped. In the event the order is canceled, the authorization hold will expire by the terms of your bank or financial institution, typically within 5 to 7 business days.
						</p>
						<p>
							4. Here at Westshade, we are taking as many precautionary steps as possible to ensure the safety and wellbeing of our Westshade team and Customers. With this, effective April 1, 2020, we will not accept returns for products
							purchased for emergency response efforts to combat the COVID-19 pandemic. Thank you for your understanding.
						</p>
						<Divider className={styles["top-container-divider"]} />
						<p>
							More ways to shop:&nbsp;
							<Link href="https://www.google.com/maps/place/Westshade+%7C+Custom+Printed+Canopy+Tents+%26+Umbrellas+Manufacturer/@33.6386335,-117.7365411,17z/data=!3m1!4b1!4m5!3m4!1s0x80dce985de651db3:0x2af0d918b783cbed!8m2!3d33.6386335!4d-117.7343524">
								Pick up at our warehouse
							</Link>
							&nbsp;or&nbsp;
							<Link href="/">Find us at online retailer store</Link>. Or call 949-522-8111.
						</p>
					</Grid>
				</Container>
			</div>
			<div className={styles["container"]}>
				<Container maxWidth="lg">
					<Grid container>
						<Grid item xs={6} sm={3}>
							<List>
								<ListItem className={styles["container-listItem"]}>
									<ListItemText primary="PRODUCT" className={styles["container-grid-titel"]} />
								</ListItem>
								<ListItem component="a" href="/canopy-tent" className={styles["container-listItem"]}>
									<ListItemText primary="Canopy Tent" className={styles["container-grid-text"]} />
								</ListItem>
								<ListItem component="a" href="/custom-printing" className={styles["container-listItem"]}>
									<ListItemText primary="Custom Printing" className={styles["container-grid-text"]} />
								</ListItem>
								<ListItem component="a" href="/market-umbrellas" className={styles["container-listItem"]}>
									<ListItemText primary="Market Umbrella" className={styles["container-grid-text"]} />
								</ListItem>
								<ListItem component="a" href="/tilt-umbrellas" className={styles["container-listItem"]}>
									<ListItemText primary="Tilt Umbrella" className={styles["container-grid-text"]} />
								</ListItem>
							</List>
						</Grid>
						<Grid item xs={6} sm={3}>
							<List>
								<ListItem className={styles["container-listItem"]}>
									<ListItemText primary="COMPANY" className={styles["container-grid-titel"]} />
								</ListItem>
								<ListItem component="a" href="/about-us" className={styles["container-listItem"]}>
									<ListItemText primary="About Us" className={styles["container-grid-text"]} />
								</ListItem>
								<ListItem component="a" href="/contact-us" className={styles["container-listItem"]}>
									<ListItemText primary="Contact Us" className={styles["container-grid-text"]} />
								</ListItem>
								<ListItem component="a" href="/shipping-return" className={styles["container-listItem"]}>
									<ListItemText primary="Shipping and Return" className={styles["container-grid-text"]} />
								</ListItem>
								<ListItem component="a" href="/warranty" className={styles["container-listItem"]}>
									<ListItemText primary="Warranty" className={styles["container-grid-text"]} />
								</ListItem>
								{/*<ListItem*/}
								{/*    component="a"*/}
								{/*    href="/blog"*/}
								{/*    className={styles["container-listItem"]}*/}
								{/*>*/}
								{/*    <ListItemText*/}
								{/*        primary="Blog"*/}
								{/*        className={styles["container-grid-text"]}*/}
								{/*    />*/}
								{/*</ListItem>*/}
							</List>
						</Grid>
						<Grid item xs={12} sm={6} style={{ position: "relative" }}>
							<List>
								<ListItem className={styles["container-listItem"]}>
									<ListItemText primary="CONNECT WITH US" className={styles["container-grid-titel"]} />
								</ListItem>
								<ListItem className={styles["container-listItem"]}>
									<div className={styles["container-social-group"]}>
										<Link href="https://www.facebook.com/Westshadeus/">
											<IconButton classes={{ root: styles["container-social"] }} disableRipple>
												<FontAwesomeIcon icon={faFacebook} color="white" />
											</IconButton>
										</Link>
										<Link href="https://twitter.com/westshadeus">
											<IconButton classes={{ root: styles["container-social"] }} disableRipple>
												<FontAwesomeIcon icon={faTwitter} color="white" />
											</IconButton>
										</Link>
										<Link href="https://www.instagram.com/westshadeus/">
											<IconButton classes={{ root: styles["container-social"] }} disableRipple>
												<FontAwesomeIcon icon={faInstagram} color="white" />
											</IconButton>
										</Link>
										<Link href="https://youtube.com/channel/UC8pXBuKL5mVy15ECrmoAPWw" size="small">
											<IconButton classes={{ root: styles["container-social"] }} disableRipple>
												<FontAwesomeIcon icon={faYoutube} color="white" />
											</IconButton>
										</Link>
										<Link href="https://www.pinterest.com/westshadeus/_saved" size="small">
											<IconButton classes={{ root: styles["container-social"] }} disableRipple>
												<FontAwesomeIcon icon={faPinterest} color="white" />
											</IconButton>
										</Link>
									</div>
								</ListItem>
							</List>
							<img className={styles["container-image"]} src="/images/image-28@2x.png" />
						</Grid>
						<Grid container item sm={12} md={3} justifyContent="center" className={`${styles["container-grid"]} ${styles["left"]}`}>
							<List>
								<ListItem className={`${styles["container-listItem"]} ${styles["center"]}`}>
									<ListItemText primary="support@westshade.com" className={styles["text-bottom"]} style={{ marginRight: "12px" }} />
									<ListItemText primary="949-522-8111" className={`${styles["text-bottom"]} ${styles["text-phone"]}`} />
								</ListItem>
							</List>
						</Grid>
						<Grid container item sm={12} md={3} justifyContent="center">
							<List className={styles["container-list-horizon"]}>
								<ListItem className={`${styles["container-listItem"]} ${styles["image"]}`}>
									<img src="/images/component/footer/icon_visa.png" />
								</ListItem>
								<ListItem className={`${styles["container-listItem"]} ${styles["image"]}`}>
									<img src="/images/component/footer/icon_master.png" />
								</ListItem>
								<ListItem className={`${styles["container-listItem"]} ${styles["image"]}`}>
									<img src="/images/component/footer/icon_amex.png" />
								</ListItem>
								<ListItem className={`${styles["container-listItem"]} ${styles["image"]}`}>
									<img src="/images/component/footer/icon_discover.png" />
								</ListItem>
							</List>
						</Grid>
						<Grid container item sm={12} md={3} justifyContent="center">
							<List className={styles["container-list-horizon"]}>
								<ListItem className={`${styles["container-listItem"]} ${styles["center"]} ${styles["text-bottom"]}`} component="a" onClick={() => router.push("/terms-and-conditions")}>
									<ListItemText primary={"Terms & Condition"} />
								</ListItem>
								<Divider orientation="vertical" flexItem className={styles["divider-vertical"]} />
								<ListItem className={`${styles["container-listItem"]} ${styles["center"]} ${styles["text-bottom"]}`} component="a" onClick={() => router.push("/privacy")}>
									<ListItemText primary={"Privacy Policy"} />
								</ListItem>
							</List>
						</Grid>
						<Grid item sm={12} md={3} container justifyContent="center" className={`${styles["container-grid"]} ${styles["right"]}`}>
							<List>
								<ListItem className={`${styles["container-listItem"]} ${styles["center"]}`}>
									<ListItemText primary="© 2021 WESTSHADE. All rights reserved" className={styles["text-bottom"]} />
								</ListItem>
							</List>
						</Grid>
					</Grid>
				</Container>
			</div>
		</Box>
	);
}
