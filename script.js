// 🔹 Canvas aur Scratch Functionality Add Kar Raha Hai
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const scratchCard = document.querySelector(".scratch-card");
const message = document.querySelector(".message");

// Canvas Ka Size Set Karna
canvas.width = scratchCard.clientWidth;
canvas.height = scratchCard.clientHeight;
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
scratchCard.appendChild(canvas);

// Scratch Effect Ke Liye Background Set Karna
ctx.fillStyle = "#bbb";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Mouse Aur Touch Event Handlers
let isScratching = false;

function startScratch(e) {
    isScratching = true;
    scratch(e);
}

function endScratch() {
    isScratching = false;
}

function scratch(e) {
    if (!isScratching) return;
    
    let rect = canvas.getBoundingClientRect();
    let x = (e.clientX || e.touches[0].clientX) - rect.left;
    let y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
}

// Event Listeners (Mouse + Touch)
canvas.addEventListener("mousedown", startScratch);
canvas.addEventListener("mouseup", endScratch);
canvas.addEventListener("mousemove", scratch);

canvas.addEventListener("touchstart", startScratch);
canvas.addEventListener("touchend", endScratch);
canvas.addEventListener("touchmove", scratch);

// Check Scratch Completion
function checkScratch() {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let totalPixels = imageData.data.length / 4;
    let clearedPixels = 0;

    for (let i = 0; i < totalPixels; i++) {
        if (imageData.data[i * 4 + 3] === 0) {
            clearedPixels++;
        }
    }

    if (clearedPixels > totalPixels * 0.5) {
        canvas.style.display = "none"; // Scratch Card Ko Hide Karein
        message.style.display = "block"; // Message Show Karein
    }
}

// Interval To Check Scratch Completion
setInterval(checkScratch, 500);

