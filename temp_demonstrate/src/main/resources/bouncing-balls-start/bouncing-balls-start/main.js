// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let scoreshow=document.querySelector('p');
let score=25;



const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数

function random(min,max) {
  return Math.floor(Math.random()*(max-min)) + min;
}

function randomColor() {
  return 'rgb(' +
      random(0, 255) + ', ' +
      random(0, 255) + ', ' +
      random(0, 255) + ')';
}

//shape构造器

function Shape(x,y,velX,velY,exists){
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists=exists;
}


//小球实体继承shape
//此处使用原始的call
function Ball( x,y,velX,velY,exists,color, size) {
  Shape.call(this,x,y,velX,velY,exists);
  this.color = color;
  this.size = size;
}
//设置原型就要设置构造器
Ball.prototype = Object.create(Shape.prototype);

Object.defineProperty(Ball.prototype, 'constructor', {
  value: Ball,
  enumerable: false, // so that it does not appear in 'for in' loop
  writable: true });
//恶魔圈的实体

function EvilCircle(x,y,exists){
  Shape.call(this,x,y,20,20,exists);
  this.color='white';
  this.size=10;
}

EvilCircle.prototype.draw=function (){
  ctx.beginPath();
  lineWidth=3;
  ctx.strokeStyle  = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
}
EvilCircle.prototype.checkBounds=function (){
  if ((this.x + this.size) >= width) {
    this.x -= this.size;
  }

  if ((this.x - this.size) <= 0) {
    this.x += this.size;
  }

  if ((this.y + this.size) >= height) {
    this.y -= this.size;
  }

  if ((this.y - this.size) <= 0) {
    this.y += this.size;
  }
}
EvilCircle.prototype.setControls=function (e){
  window.onkeydown = e => {
    switch(e.key) {
      case 'a':
        this.x -= this.velX;
        break;
      case 'd':
        this.x += this.velX;
        break;
      case 'w':
        this.y -= this.velY;
        break;
      case 's':
        this.y += this.velY;
        break;
    }
    console.log(this);
  };
 };

EvilCircle.prototype.collisionDetect=function (){

  for (let j = 0; j < balls.length; j++) {
    if(balls[j].exists){
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists=false;
        score-=1;
        scoreshow.textContent='当前还剩：'+score+' 个球';
      }

    }
  }
}

//EvilCircle.prototype = Object.create(Shape.prototype); 不继承方法

// Object.defineProperty(EvilCircle.prototype, 'constructor', {
//   value: EvilCircle,
//   enumerable: false, // so that it does not appear in 'for in' loop
//   writable: true });



Shape.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

//let testBall = new Ball(50, 100, 4, 4, 'blue', 10);

Shape.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

let balls = [];

while (balls.length < 25) {
  let size = random(10, 20);
  let ball = new Ball(
      // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      true,
      randomColor(),
      size
  );
  balls.push(ball);
}

//创建恶魔圈
let evilCircle=new EvilCircle(300,200,true);
evilCircle.setControls();

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, width, height);


  //绘制
  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  for (let i = 0; i < balls.length; i++) {
    if(balls[i].exists){
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }

  }


  requestAnimationFrame(loop);
}

Shape.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();
      }
    }
  }
}



loop();