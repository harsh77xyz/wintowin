document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const message = document.querySelector(".message");

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    ctx.fillStyle = "#bbb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let isScratching = false;

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

    canvas.addEventListener("mousedown", () => isScratching = true);
    canvas.addEventListener("mouseup", () => isScratching = false);
    canvas.addEventListener("mousemove", scratch);

    canvas.addEventListener("touchstart", () => isScratching = true);
    canvas.addEventListener("touchend", () => isScratching = false);
    canvas.addEventListener("touchmove", scratch);

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
            message.style.display = "block";
        }
    }

    setInterval(checkScratch, 500);
});
