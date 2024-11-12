// Select HTML DOM Elements:
const qrFormEl = document.querySelector("#qrForm");
const qrCodeContainerEl = document.querySelector(".qr-code-container");
const qrCodeImgEl = qrCodeContainerEl.querySelector("#qrImg");

// Class to Craete Toast Object:
    class Toast {
        constructor(message, bgColor) {
            this.text = message;
            this.duration = 3000;
            this.close = true;
            this.gravity =  "top",
            this.position = "center",
            this.stopOnFocus = true,
            this.style = {
                textAlign: "center",
                background: bgColor === "green" ? "linear-gradient(to right, #00b09b, #96c93d)" : "linear-gradient(to right, #e33217, #ff001e)",
                cursor: "default",
            }
        }
    }

// Function to Get the QR-Code from an API:
const displayQrCode = async (qrText) => {
    const API_URL = "https://api.qrserver.com/v1/create-qr-code/?data="                                        

    try {
        //Remove starting & trailing spaces of the "qrText", and encode/convert the special characters,
        //making them safe to use in an URL, using "encodeURIComponent()":
        encodedQrText = encodeURIComponent(qrText.trim());
        qrCodeContainerEl.classList.remove("hidden"); //to display the "QR Container"
        qrCodeImgEl.src = API_URL + encodedQrText;
        Toastify(new Toast("QR-Code Generated Sucessfully!", "green")).showToast();
    }
    catch(err) {
        Toastify(new Toast(`Unable to Get the QR-Code for "${qrText}".\nPlease, try again!`, "red")).showToast();
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

    const qrText = getQrText();
    displayQrCode(qrText);
}

// Add "Submit" Event Handler for "QrFormEl":
qrFormEl.addEventListener("submit", submitHandler);