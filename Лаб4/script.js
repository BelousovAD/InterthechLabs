const figures = [
    ["circle",50,50,10],
    ["square",150,50,25],
    ["ellipse",200,200,30,40]
];

var canvas;
var ctx;
var vect = 2;
var rot = 0;

function init(){
  canvas = document.getElementById("canvas");
  canvas.addEventListener("click", () => {
        alert("Hello!")
    });
  ctx = canvas.getContext("2d");
  window.setInterval(draw,50);
}

function draw() {
    figures[2][1] += vect;
    rot += vect*0.1;

    if (figures[2][1] > 500 || figures[2][1] < 200) {
        vect *= -1;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "blue";

    ctx.fillRect(figures[1][1], figures[1][2], figures[1][3], figures[1][3]);

    ctx.fillStyle = "green";

    ctx.ellipse(figures[0][1], figures[0][2], figures[0][3], figures[0][3], 0, 0, 2 * Math.PI);
    
    ctx.ellipse(figures[2][1], figures[2][2], figures[2][3], figures[2][4], rot, 0, 2 * Math.PI);
    
    ctx.fill();

    ctx.fillStyle = "black"

    ctx.beginPath();
    ctx.moveTo(50, 150);
    ctx.bezierCurveTo(230, 200, 150, 260, 50, 300);
    ctx.stroke();
    ctx.beginPath();
}
