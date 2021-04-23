
var width, height;
var score = 0;
const BLOCKSIZE = 20;

var Vector2 = function (x, y) {
    this.X = x;
    this.Y = y;
};
Vector2.prototype.add = function (other) {
    this.X += other.X;
    this.Y += other.Y;
};

var Ball = function (pos, vel) {
    this.Pos = pos;
    this.Vel = vel;
};
Ball.prototype.update = function () {
    this.Pos.add(this.Vel);
    if (this.Pos.X < BLOCKSIZE || this.Pos.X > width - BLOCKSIZE)
        this.Vel.X = -this.Vel.X;
    if (this.Pos.Y < BLOCKSIZE || this.Pos.Y > height - BLOCKSIZE)
        this.Vel.Y = -this.Vel.Y;
};
Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.Pos.X, this.Pos.Y, BLOCKSIZE, 0, Math.PI * 2);
    ctx.fill();
};

var ball = new Ball(new Vector2(100,100),new Vector2(1,1));

function load() {
    var canvas = document.getElementById("cvs");
    ctx = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;
    timeoutID = setInterval(update, 5);
}

var update = function () {
    ctx.clearRect(0, 0, width, height);
    ball.update();
    ball.draw();
};