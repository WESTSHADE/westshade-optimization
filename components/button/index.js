import { Button } from "@material-ui/core";

import styles from "./button.module.css";

export default function Custom_Button(props) {
	const { type } = props;

	if (type === "underline") {
		return (
			<Button
				classes={{
					root: styles["root"],
					label: styles["label"],
				}}
				disableRipple
				{...props}
			/>
		);
	} else {
		return <Button disableRipple {...props} />;
	}
}
