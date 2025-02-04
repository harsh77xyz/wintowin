document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let scratchCard = document.getElementById("scratch-card");
    let hiddenContent = document.getElementById("hidden-content");
    let downloadBtn = document.getElementById("download-btn");

    canvas.width = 320;
    canvas.height = 280;
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    
    scratchCard.appendChild(canvas);

    let isScratching = false;
    let totalScratched = 0;
    let scratchThreshold = 60; // % of area to be scratched

    function initScratchCard() {
        ctx.fillStyle = "#ccc";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "30px Arial";
        ctx.fillStyle = "#888";
        ctx.textAlign = "center";
        ctx.fillText("Scratch Here", canvas.width / 2, canvas.height / 2);
    }

    function scratch(e) {
        if (!isScratching) return;

        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        let radius = 20;

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.fill();

        calculateScratchPercentage();
    }

    function calculateScratchPercentage() {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let pixels = imageData.data;
        let clearedPixels = 0;

        for (let i = 0; i < pixels.length; i += 4) {
            if (pixels[i + 3] === 0) {
                clearedPixels++;
            }
        }

        let percentScratched = (clearedPixels / (canvas.width * canvas.height)) * 100;

        if (percentScratched > scratchThreshold) {
            revealContent();
        }
    }

    function revealContent() {
        canvas.style.display = "none"; // Hide the scratch cover
        hiddenContent.style.display = "flex"; // Show the prize content
        downloadBtn.style.display = "block"; // Show the download button
    }

    canvas.addEventListener("mousedown", () => { isScratching = true; });
    canvas.addEventListener("mouseup", () => { isScratching = false; });
    canvas.addEventListener("mousemove", scratch);
    canvas.addEventListener("touchstart", () => { isScratching = true; });
    canvas.addEventListener("touchend", () => { isScratching = false; });
    canvas.addEventListener("touchmove", (e) => {
        let touch = e.touches[0];
        scratch({ clientX: touch.clientX, clientY: touch.clientY });
    });

    downloadBtn.addEventListener("click", function () {
        window.location.href = "https://rushbyhike.app.link/SxtZ7wQEwQb"; //
    });

    initScratchCard();
});
