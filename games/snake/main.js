// JavaScript source code

var Block = function (row, col) {
    this.Row = row;
    this.Column = col;
};
Block.prototype.draw = function (style) {
    ctx.fillStyle = style;
    ctx.fillRect(this.Column * BLOCKSIZE, this.Row * BLOCKSIZE, BLOCKSIZE, BLOCKSIZE);
};
Block.prototype.Equals = function (other) {
    return this.Row == other.Row && this.Column == other.Column;
};

var gameOver = function () {
    clearTimeout(timeoutID);
    ctx.font = "48px Arial";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseLine = "middle";
    ctx.fillText("GAME OVER!", width / 2, height / 2);
};

let Directions = {
    Up: 1,
    Down: 2,
    Right: 4,
    Left: 8,
}

var ctx;
var width, height;
var score = 0;
var timeoutID;
const BLOCKSIZE = 20;
var snakeBlocks = [
    new Block(2, 2),
    new Block(2, 3),
    new Block(2, 4),
]
var Boxes = [

];
var food = new Block(4,4);
var direction = Directions.Right;

var update = function () {
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "rgb(128,128,128)";
    ctx.fillRect(0, 0, width, BLOCKSIZE);
    ctx.fillRect(0, 0, BLOCKSIZE, height);
    ctx.fillRect(0, height - BLOCKSIZE, width, BLOCKSIZE);
    ctx.fillRect(width - BLOCKSIZE, 0, BLOCKSIZE, height);

    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.textBaseLine = "top";
    ctx.fillText("Score: " + score/* + " Food R:" + food.Row + " C: " + food.Column*/, BLOCKSIZE - 4, BLOCKSIZE - 4);

    var head = snakeBlocks[snakeBlocks.length - 1];
    switch (direction) {
        case Directions.Up:
            snakeBlocks.push(new Block(head.Row - 1,head.Column))
            break;
        case Directions.Down:
            snakeBlocks.push(new Block(head.Row + 1,head.Column))
            break;
        case Directions.Right:
            snakeBlocks.push(new Block(head.Row,head.Column + 1))
            break;
        case Directions.Left:
            snakeBlocks.push(new Block(head.Row,head.Column - 1))
            break;
    }
    if (head.Row == food.Row && head.Column == food.Column) {
        score++;
        food = GetRandomBlock();
        /*while (Boxes.indexOf(food) == -1) {
            food = GetRandomBlock();
		}*/
    }
    else
        snakeBlocks.shift();
    for (var i = 0; i < snakeBlocks.length; i++)
        snakeBlocks[i].draw((i == snakeBlocks.length - 1) ? "blue" : "lime");
    food.draw("red")
    for (var i = 0; i < Boxes.length; i++) {
        Boxes[i].draw("yellow");
        if (head.Equals(Boxes[i]))
            gameOver();
    }
    var head = snakeBlocks[snakeBlocks.length - 1];
    for (var i = 0; i < snakeBlocks.length - 1; i++) {
        if (head.Row == snakeBlocks[i].Row && head.Column == snakeBlocks[i].Column)
            gameOver();
    }

    if (head.Row < 1 || head.Row > (height / BLOCKSIZE) - 2 ||
        head.Column < 1 || head.Column > (width / BLOCKSIZE) - 2)
        gameOver();
}
function load() {
    var canvas = document.getElementById("cvs");
    canvas.width = window.innerWidth - BLOCKSIZE;
    canvas.height = window.innerHeight - BLOCKSIZE;
    ctx = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;
    var boxesConut = Math.ceil(Math.sqrt((width / BLOCKSIZE) * (height / BLOCKSIZE)) / 2);
    for (var i = 0; i < boxesConut; i++)
        Boxes.push(GetRandomBlock())
    window.onkeypress = keyPress;
    timeoutID = setInterval(update, 500);
}

function keyPress(keyEvent) {
    switch (String.fromCharCode(keyEvent.keyCode)) {
        case "w":
            if(direction != Directions.Down)
                direction = Directions.Up;
            break;
        case "s":
            if(direction != Directions.Up)
                direction = Directions.Down;
            break;
        case "d":
            if(direction != Directions.Left)
                direction = Directions.Right;
            break;
        case "a":
            if(direction != Directions.Right)
                direction = Directions.Left;
            break;
    }
}

function GetRandomBlock() {
    /* old
    return new Block(
        Math.floor(Math.random() * (height / BLOCKSIZE) - 4) + 2,
        Math.floor(Math.random() * (width / BLOCKSIZE) - 4) + 2);
    */
    return new Block(
        Math.min(Math.floor(height / BLOCKSIZE) - 2,Math.max(2,Math.floor(Math.random() * (height / BLOCKSIZE)))),
        Math.min(Math.floor(width / BLOCKSIZE) - 2,Math.max(2,Math.floor(Math.random() * (width / BLOCKSIZE)))));
}