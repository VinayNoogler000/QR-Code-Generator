// Select HTML DOM Elements:
const qrFormEl = document.querySelector("#qrForm");
const txtInpEl = qrFormEl.querySelector("#qrTextInp");
const qrCodeContainerEl = document.querySelector(".qr-code-container");
const qrCodeImgEl = qrCodeContainerEl.querySelector("#qrImg");

// Class to Craete Toast Object:
    class Toast {
        constructor(message, bgColor, duration) {
            this.text = message;
            this.duration = duration != null ? duration : 3000;
            this.close = true;
            this.gravity =  "top",
            this.position = "center",
            this.stopOnFocus = true,
            this.style = {
                textAlign: "center",
                background: bgColor === "green" ? "linear-gradient(to right, #00b09b, #96c93d)" : bgColor === "red" ? "linear-gradient(to right, #e33217, #ff001e)" : "linear-gradient(to right, #ADD8E6, #008080)",
                cursor: "default",
            }
        }
    }

// Function to Hide the "QR-Code-Container" when the "Text Input El" is empty:
const hideQrContainer = (event) => {
    if(!event.target.value ) {
        qrCodeContainerEl.classList.remove("show");
    }
}

// Function to Show to QR-Container, as the QR-Code-Image gets loaded:
const displayQrContainer = () => {
    setTimeout( () => {
        qrCodeContainerEl.classList.add("show");
        displayToast("QR-Code Generated Sucessfully!", "green");
    }, 500);
}

// Function to Display Toast using Toastify-js:
const displayToast = (message, bgColor, duration) => {
    Toastify(new Toast(message, bgColor, duration)).showToast();
}

// Function to Get the QR-Code:
const getQrCode = (qrText) => {
    const API_URL = "https://api.qrserver.com/v1/create-qr-code/?data="                                     

    try {
        //Remove starting & trailing spaces of the "qrText", and encode/convert the special characters,
        //making them safe to use in an URL, using "encodeURIComponent()":
        encodedQrText = encodeURIComponent(qrText.trim());
        qrCodeImgEl.src = API_URL + encodedQrText;
        displayToast("Generating QR Code!", "blue", 1000);   
        qrCodeImgEl.addEventListener("load", displayQrContainer);
    }
    catch(err) {
        displayToast(`Unable to Get the QR-Code for "${qrText}".\nPlease, try again!`, "red");
        console.log(err);
    }
}

// Function to Get the Text entered by the user in the Input box, or to Get the Form Data:
const getQrText = () => {
    const formData = new FormData(qrFormEl);
    return formData.get("qrText");
}

// Function to handle Form "Submit" Event:
const submitHandler = (event) => {
    event.preventDefault(); //to prevent the default submission behaviour of form

    qrCodeContainerEl.classList.remove("show"); //hide or reset the "QR-Container"
    const qrText = getQrText();
    getQrCode(qrText);
}

// Add "Submit" Event Handler for "qrFormEl":
qrFormEl.addEventListener("submit", submitHandler);

// Add "Change" Event Handler for "inputEl":
txtInpEl.addEventListener("input", hideQrContainer);