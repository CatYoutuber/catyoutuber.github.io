var canvas, ctx;
var columns, font_size = 15;
var drops = [];
function setup() {
    canvas = document.getElementById("c");
    ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    ctx.font = font_size + "px arial";
    columns = c.width / font_size;
    for (var x = 0; x < columns; x++)
        drops[x] = 1;
    setInterval(draw, 35);
}

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00FF00";
    for (var i = 0; i < drops.length; i++) {
        ctx.fillText(String.fromCharCode(Math.floor(2720 + Math.random() * 32)), i * font_size, drops[i] * font_size);
        if (drops[i] * font_size > canvas.height && Math.random() > 0.975)
            drops[i] = 0;
        drops[i]++;
    }
}