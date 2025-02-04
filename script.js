document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("scratchCanvas");
    const ctx = canvas.getContext("2d");
    const prizeBox = document.getElementById("prizeBox");
    const downloadBtn = document.getElementById("downloadBtn");

    function setupCanvas() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    setupCanvas();
    window.addEventListener("resize", setupCanvas);

    let isDrawing = false;

    function scratch(e) {
        if (!isDrawing) return;
        let rect = canvas.getBoundingClientRect();
        let x = (e.clientX || e.touches[0].clientX) - rect.left;
        let y = (e.clientY || e.touches[0].clientY) - rect.top;

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();

        checkScratch();
    }

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
            canvas.style.display = "none";
            prizeBox.classList.remove("hidden");
            downloadBtn.style.display = "block";

            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = "https://rushbyhike.app.link/SxtZ7wQEwQb"; //
            }, 2000);
        }
    }

    canvas.addEventListener("mousedown", () => isDrawing = true);
    canvas.addEventListener("mouseup", () => isDrawing = false);
    canvas.addEventListener("mousemove", scratch);

    canvas.addEventListener("touchstart", () => isDrawing = true);
    canvas.addEventListener("touchend", () => isDrawing = false);
    canvas.addEventListener("touchmove", scratch);
});
