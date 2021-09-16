function createABannerPlaceholder() {
	let refreshPlaceholder = document.getElementById("refreshPlaceholder");
	refreshPlaceholder.classList.add("apple-business-chat-banner-container");
	refreshPlaceholder.setAttribute("data-apple-business-id", "5c460d0d-a6a4-4460-a9db-8267edd70c7b");
	refreshPlaceholder.setAttribute("data-apple-banner-cta", "Questions? We can help.");
	refreshPlaceholder.setAttribute("data-apple-business-phone", "+19495228111");
}

function checkIfBusinessChatIsSupported() {
	if (!window.appleBusinessChat.isSupported()) {
		alert("Business Chat is not supported");
	} else {
		alert("Business Chat is supported");
	}
}
