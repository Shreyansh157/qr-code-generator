// Selecting HTML elements
let imgBox = document.querySelector(".img-box"); // Container for the QR code image
let qrImage = document.querySelector(".qr-image"); // The actual QR code image
let qrText = document.querySelector(".qr-text"); // Input field for entering text
let generateBtn = document.querySelector(".generate-button"); // Button to generate QR code
let downloadBtn = document.querySelector(".download-button"); // Button to download QR code
let preValue = ""; // Store previous input value

// Add event listener to generate button for click to generate button
generateBtn.addEventListener("click", generateQR);

// Add event listener to generate button for Enter key press
window.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    generateQR();
  }
});

// Add event listener to download button
downloadBtn.addEventListener("click", () => {
  downloadQRImage();
});

// Function to generate QR code
function generateQR() {
  let qrValue = qrText.value.trim(); //It removes whitespace from both sides of a string.
  let qrSize = document.querySelector("#qr-size"); // Select the QR size dropdown
  let qrSizeValue = qrSize.value; // Get selected size

  if (!qrValue) return; // If empty input, exit
  preValue = qrValue; // Store the current value

  // Combine text and size to detect changes
  let currentValue = qrValue + "|" + qrSizeValue;

  if (preValue === currentValue) return; // If both text & size same, skip
  preValue = currentValue; // Store current text + size

  // Build QR image source with size and data
  qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSizeValue}&data=${qrValue}`;

  generateBtn.innerText = "Generating QR Code..."; // Update button text

  // Use onload instead of addEventListener to avoid multiple bindings
  qrImage.onload = () => {
    document.querySelector(".container").classList.add("active");
    generateBtn.textContent = "Generate QR Code";
    showDownloadButton();
  };
}

// Update UI when QR text input changes
qrText.addEventListener("keyup", () => {
  if (!qrText.value.trim()) {
    document.querySelector(".container").classList.remove("active"); // Hide image container
    preValue = "";
    hideDownloadButton(); // Hide download button if input is empty
  }
});

// Function to initiate image download
function downloadQRImage() {
  let qrValue = qrText.value.trim(); //It removes whitespace from both sides of a string.
  let qrSize = document.querySelector("#qr-size"); // Select the QR size dropdown
  let qrSizeValue = qrSize.value; // Get selected size

  let imageURL = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSizeValue}&data=${qrValue}&margin=10`;

  // Create a temporary anchor element to trigger the download
  const link = document.createElement("a");
  link.href = imageURL;
  link.setAttribute("target", "_blank");
  link.download = "qrcode.png";
  link.click();
  // window.open(imageURL, "_blank"); //works same as link.click()
}

// Function to show the download button
function showDownloadButton() {
  downloadBtn.style.display = "block";
}

// Function to hide the download button
function hideDownloadButton() {
  downloadBtn.style.display = "none";
}
