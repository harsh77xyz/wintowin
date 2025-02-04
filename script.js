document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.getElementById("scratchCanvas");
    let ctx = canvas.getContext("2d");
    let scratchCard = document.getElementById("scratch-card");
    let hiddenContent = document.getElementById("hidden-content");
    let downloadBtn = document.getElementById("download-btn");

    canvas.width = scratchCard.clientWidth;
    canvas.height = scratchCard.clientHeight;

    let isScratching = false;
    let totalScratched = 0;
    let scratchThreshold = 50; // 50% area scratch karna padega

    function initScratchCard() {
        ctx.fillStyle = "#cccccc";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "24px Arial";
        ctx.fillStyle = "#888";
        ctx.textAlign = "center";
        ctx.fillText("Scratch Here", canvas.width / 2, canvas.height / 2);
    }

    function scratch(e) {
        if (!isScratching) return;

        let rect = canvas.getBoundingClientRect();
        let x = (e.clientX || e.touches[0].clientX) - rect.left;
        let y = (e.clientY || e.touches[0].clientY) - rect.top;
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
        canvas.style.display = "none"; // Hide scratch layer
        hiddenContent.style.display = "flex"; // Show prize content
        downloadBtn.style.display = "block"; // Show button
    }

    canvas.addEventListener("mousedown", () => { isScratching = true; });
    canvas.addEventListener("mouseup", () => { isScratching = false; });
    canvas.addEventListener("mousemove", scratch);
    canvas.addEventListener("touchstart", () => { isScratching = true; });
    canvas.addEventListener("touchend", () => { isScratching = false; });
    canvas.addEventListener("touchmove", scratch);

    downloadBtn.addEventListener("click", function () {
        window.location.href = "https://rushbyhike.app.link/SxtZ7wQEwQb"; //
    });

    initScratchCard();
});
