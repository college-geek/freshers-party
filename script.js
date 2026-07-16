// ======================================
// Freshers' Party Receipt Generator
// Part 1
// ======================================

// ---------- Form Inputs ----------

const receiptInput = document.getElementById("receiptInput");
const nameInput = document.getElementById("name");
const regInput = document.getElementById("regno");
const deptInput = document.getElementById("department");
const amountInput = document.getElementById("amount");
const paymentMode = document.getElementById("paymentMode");
const transactionInput = document.getElementById("transaction");
const receiverInput = document.getElementById("receiver");

// ---------- Receipt ----------

const receiptNo = document.getElementById("receiptNo");
const barcodeNumber = document.getElementById("barcodeNumber");
const fakeBarcode = document.querySelector(".fake-barcode");

const previewName = document.getElementById("previewName");
const previewReg = document.getElementById("previewReg");
const previewDept = document.getElementById("previewDept");
const previewAmount = document.getElementById("previewAmount");
const previewMode = document.getElementById("previewMode");
const previewTxn = document.getElementById("previewTxn");
const previewReceiver = document.getElementById("previewReceiver");
const previewDate = document.getElementById("date");

const upiBox = document.getElementById("upiBox");
const transactionRow = document.getElementById("transactionRow");

// ---------- Buttons ----------

const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const printBtn = document.getElementById("printBtn");


// ======================================
// Barcode Bars
// ======================================

function createBarcodeBars() {

    if (!fakeBarcode || fakeBarcode.children.length > 0) {

        return;

    }

    const barWidths = [
        2, 1, 3, 1, 4, 2, 1, 3, 2, 5,
        1, 2, 4, 1, 3, 2, 1, 5, 2, 3,
        1, 4, 2, 1, 3, 5, 1, 2, 4, 1,
        2, 3, 1, 5, 2, 4, 1, 3, 2, 1
    ];

    barWidths.forEach(function(width, index){

        const bar = document.createElement("span");

        bar.style.width = width + "px";

        bar.style.height = "100%";

        fakeBarcode.appendChild(bar);

    });

}


// ======================================
// Current Date
// ======================================

function getCurrentDate() {

    const today = new Date();

    return today.toLocaleDateString("en-IN", {

        day: "2-digit",
        month: "long",
        year: "numeric"

    });

}

previewDate.textContent = getCurrentDate();


// ======================================
// Random Receipt Number
// ======================================

function generateReceiptNumber() {

    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    return "FP2026-" + randomNumber;

}

function setRandomReceiptNumber() {

    receiptInput.value = generateReceiptNumber();

    updatePreview();

}


// ======================================
// Show / Hide UPI Field
// ======================================

function toggleUPI() {

    if (paymentMode.value === "UPI") {

        upiBox.style.display = "block";
        transactionRow.style.display = "flex";

    } else {

        upiBox.style.display = "none";
        transactionRow.style.display = "none";

        transactionInput.value = "";

        previewTxn.textContent = "-";

    }

}

paymentMode.addEventListener("change", toggleUPI);


// ======================================
// Live Preview
// ======================================

function updatePreview() {

    receiptNo.textContent =
        receiptInput.value.trim() || "-";

    barcodeNumber.textContent =
        receiptInput.value.trim() || "-";

    previewName.textContent =
        nameInput.value.trim() || "-";

    previewReg.textContent =
        regInput.value.trim() || "-";

    previewDept.textContent =
        deptInput.value.trim() || "-";

    previewAmount.textContent =
        amountInput.value
            ? "₹" + amountInput.value
            : "₹0";

    previewMode.textContent =
        paymentMode.value;

    previewTxn.textContent =
        transactionInput.value.trim() || "-";

    previewReceiver.textContent =
        receiverInput.value.trim() || "Student Council";

}


// ======================================
// Live Events
// ======================================

receiptInput.addEventListener("input", updatePreview);

nameInput.addEventListener("input", updatePreview);

regInput.addEventListener("input", updatePreview);

deptInput.addEventListener("input", updatePreview);

amountInput.addEventListener("input", updatePreview);

paymentMode.addEventListener("change", updatePreview);

transactionInput.addEventListener("input", updatePreview);

receiverInput.addEventListener("input", updatePreview);
// ======================================
// Generate Receipt
// ======================================

generateBtn.addEventListener("click", function () {

    // Required Field Validation

    if (receiptInput.value.trim() === "") {

        setRandomReceiptNumber();

    }

    if (nameInput.value.trim() === "") {

        alert("Please enter Student Name.");

        nameInput.focus();

        return;

    }

    if (regInput.value.trim() === "") {

        alert("Please enter Registration Number.");

        regInput.focus();

        return;

    }

    if (amountInput.value.trim() === "") {

        alert("Please enter Amount.");

        amountInput.focus();

        return;

    }

    if (
        paymentMode.value === "UPI" &&
        transactionInput.value.trim() === ""
    ) {

        alert("Please enter UPI Transaction ID.");

        transactionInput.focus();

        return;

    }

    // Refresh Preview

    updatePreview();

    previewDate.textContent = getCurrentDate();

    // Button Animation

    generateBtn.disabled = true;

    generateBtn.innerHTML =
        '<i class="fa-solid fa-circle-check"></i> Receipt Generated';

    setTimeout(() => {

        generateBtn.disabled = false;

        generateBtn.innerHTML =
            '<i class="fa-solid fa-receipt"></i> Generate Receipt';

    }, 1500);

});


// ======================================
// Press Enter to Generate
// ======================================

document.addEventListener("keydown", function(e){

    if(e.key==="Enter"){

        e.preventDefault();

        generateBtn.click();

    }

});


// ======================================
// Auto Uppercase Receipt ID
// ======================================

receiptInput.addEventListener("input", function(){

    this.value=this.value.toUpperCase();

    updatePreview();

});


// ======================================
// Auto Trim Transaction ID
// ======================================

transactionInput.addEventListener("input", function(){

    this.value=this.value.trim();

    updatePreview();

});


// ======================================
// Auto Refresh Date Every Minute
// ======================================

setInterval(function(){

    previewDate.textContent = getCurrentDate();

},60000);
// ======================================
// Download Receipt as PNG
// ======================================

downloadBtn.addEventListener("click", function () {

    updatePreview();

    if (typeof html2canvas !== "function") {

        alert("Download library is still loading. Please try again in a moment.");

        return;

    }

    const receiptWrapper = document.querySelector(".receipt-wrapper");

    const captureBox = document.createElement("div");

    captureBox.className = "download-capture";

    captureBox.appendChild(receiptWrapper.cloneNode(true));

    document.body.appendChild(captureBox);

    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();

    fontsReady.then(function(){

        return html2canvas(captureBox, {

            scale: 3,
            useCORS: true,
            backgroundColor: "#eef4ff"

        });

    }).then(function(canvas){

        const link = document.createElement("a");

        const fileName =
            receiptInput.value.trim() || "Receipt";

        link.download = fileName + ".png";

        link.href = canvas.toDataURL("image/png");

        link.click();

    }).finally(function(){

        captureBox.remove();

    });

});


// ======================================
// Print Receipt
// ======================================

printBtn.addEventListener("click", function () {

    updatePreview();

    window.print();

});


// ======================================
// Auto Format Student Name
// ======================================

nameInput.addEventListener("blur", function(){

    this.value = this.value
        .toLowerCase()
        .replace(/\b\w/g, c => c.toUpperCase());

    updatePreview();

});


// ======================================
// Auto Format Department
// ======================================

deptInput.addEventListener("blur", function(){

    this.value = this.value.toUpperCase();

    updatePreview();

});


// ======================================
// Amount Validation
// ======================================

amountInput.addEventListener("input", function(){

    if(Number(this.value) < 0){

        this.value = "";

    }

    updatePreview();

});


// ======================================
// Initial Page Load
// ======================================

toggleUPI();

createBarcodeBars();

setRandomReceiptNumber();

updatePreview();

previewDate.textContent = getCurrentDate();


// ======================================
// Optional Keyboard Shortcuts
// ======================================

// Ctrl + P  → Print

document.addEventListener("keydown", function(e){

    if(e.ctrlKey && e.key.toLowerCase() === "p"){

        e.preventDefault();

        printBtn.click();

    }

});

// Ctrl + S → Download PNG

document.addEventListener("keydown", function(e){

    if(e.ctrlKey && e.key.toLowerCase() === "s"){

        e.preventDefault();

        downloadBtn.click();

    }

});


// ======================================
// Console Message
// ======================================

console.log(
    "🎉 Freshers' Party Receipt Generator Loaded Successfully!"
);
