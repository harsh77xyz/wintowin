const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 200;

// Gray color fill for scratch area
ctx.fillStyle = "gray";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Scratch functionality
canvas.addEventListener("mousedown", function () {
    canvas.addEventListener("mousemove", scratch);
});

canvas.addEventListener("mouseup", function () {
    canvas.removeEventListener("mousemove", scratch);
    
    // Delay ke baad redirect karega
    setTimeout(() => {
        window.location.href = "https://rushbyhike.app.link/SxtZ7wQEwQb"; // 
    }, 1000);
});

function scratch(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.clearRect(x, y, 20, 20);
}
