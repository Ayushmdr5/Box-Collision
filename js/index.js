var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

canvas.width = innerWidth - 10;
canvas.height = innerHeight - 10;

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var colors = ['#00b8e6', '#50A6C2', '#ffb399', '#fb9084', '#0000A0'];

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

function Circle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.velocity = {
      x: (Math.random() - 0.5) *2, 
      y: (Math.random() - 0.5) *2,
  }
  this.radius = radius;
  this.color = color;
  this.mass = 1;

  this.update = function (circles) {
    this.draw();
    for (var i = 0; i< circles.length; i++){
        if(this === circles[i]) continue;
        if (getDistance(this.x, this.y, circles[i].x, circles[i].y) - (this.radius + circles[i].radius) <= 0){
            resolveCollision(this, circles[i])
        }
    }
    if(this.x - this.radius <= 0 || this.x + this.radius >= canvasWidth){
        this.velocity.x = -this.velocity.x;
    }
    if(this.y - this.radius <= 0 || this.y + this.radius >= canvasHeight){
        this.velocity.y = -this.velocity.y;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  };

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  };
}

let circles;

function init() {
  circles = [];

  for (var i = 0; i < 1000; i++) {
    var radius = randomNumFromRange(5, 15);
    var x = randomNumFromRange(radius, canvasWidth - radius);
    var y = randomNumFromRange(radius, canvasHeight - radius);
    var color = getRandomColor(colors);

    if (i !== 0) {
      for (var j = 0; j < circles.length; j++) {
        if (getDistance(x, y, circles[j].x, circles[j].y) - (radius + circles[j].radius) <= 0) {
          var x = randomNumFromRange(radius, canvasWidth - radius);
          var y = randomNumFromRange(radius, canvasHeight - radius);
          j = -1;
        }
      }
    }

    circles.push(new Circle(x, y, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  circles.forEach((circle) => {
    circle.update(circles);
  });
}

init();
animate();
