import Link from "next/link";
import styles from "./section.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function section_Social_Group() {
	return (
		<div className={styles["social-group-container"]}>
			<Link href="https://www.facebook.com/Westshadeus/">
				<div className={`${styles["social-container"]} ${styles["facebook"]}`}>
					<FontAwesomeIcon icon={faFacebook} size="2x" color="white" />
				</div>
			</Link>
			<Link href="https://www.youtube.com/c/Westshade/featured">
				<div className={`${styles["social-container"]} ${styles["youtube"]}`}>
					<FontAwesomeIcon icon={faYoutube} size="2x" color="white" />
				</div>
			</Link>
			<Link href="https://www.instagram.com/westshadeus/">
				<div className={`${styles["social-container"]} ${styles["instagram"]}`}>
					<FontAwesomeIcon icon={faInstagram} size="2x" color="white" />
				</div>
			</Link>
			<Link href="https://twitter.com/westshadeus">
				<div className={`${styles["social-container"]} ${styles["twitter"]}`}>
					<FontAwesomeIcon icon={faTwitter} size="2x" color="white" />
				</div>
			</Link>
		</div>
	);
}
