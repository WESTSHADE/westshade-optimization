function createABannerPlaceholder() {
    let refreshPlaceholder = document.getElementById("refreshPlaceholder");
    refreshPlaceholder.classList.add("apple-business-chat-banner-container");
    refreshPlaceholder.setAttribute("data-apple-business-id", "5c460d0d-a6a4-4460-a9db-8267edd70c7b");
    refreshPlaceholder.setAttribute("data-apple-banner-background-color", "rgb(247, 247, 247)");
    refreshPlaceholder.setAttribute("data-apple-banner-icon-background-color", "rgb(255, 255, 255)");
    refreshPlaceholder.setAttribute("data-apple-banner-cta", "Talk to us.");
    refreshPlaceholder.setAttribute("data-apple-banner-context", "Talk to a customer service if you got any questions.");
    refreshPlaceholder.setAttribute("data-apple-business-phone", "+19497511070");
    refreshPlaceholder.setAttribute("data-apple-banner-orientation", "vertical");
}

function checkIfBusinessChatIsSupported() {
    if (!window.appleBusinessChat.isSupported()) {
        alert("Business Chat is not supported");
    } else {
        alert("Business Chat is supported");
    }
}
