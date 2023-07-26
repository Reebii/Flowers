/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;
ctx.lineWidth = 0.1;
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.shadowColor = 'rgba(0,0,0,0.5)';

class Root {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.maxSize = Math.random() * 7 + 5;
        this.size = Math.random() * 1 + 2;
        this.variableSpeed = Math.random() * 0.2 + 0.05;
        this.angleX = Math.random() * 6.2;
        this.variableAngleX = Math.random() * 0.6 - 0.3;
        this.angleY = Math.random() * 6.2;
        this.variableAngleY = Math.random() * 0.6 - 0.3;
        this.light = 10;
    }
    update() {
        this.x += this.speedX + Math.sin(this.angleX);
        this.y += this.speedY + Math.sin(this.angleY);
        this.size += this.variableSpeed;
        this.angleX += this.variableAngleX;
        this.angleY += this.variableAngleY;
        if (this.light < 70) this.light += 0.55;
        if (this.size < this.maxSize) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'hsl(140,100%,' + this.light + '%)';
            ctx.fill();
            ctx.stroke();
            requestAnimationFrame(this.update.bind(this));
        } else {
            const flower = new Flower(this.x, this.y, this.size);
            flower.growing();
        }
    }
}
class Flower {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.vs = Math.random() * 0.2 + 0.3;
        this.maxFlowerSize = this.size + Math.random() * 80;
        this.image = new Image();
        this.image.src = 'flowers.png'
        this.frameSize = 100;
        this.frameX = Math.floor(Math.random() * 3);
        this.frameY = Math.floor(Math.random() * 3);
        this.size > 11.5 ? this.willflower = true : this.willflower = false;
        this.angle = 0;
        this.velAngle = Math.random() * 0.05 - 0.025;

    };
    growing() {
        if (this.size < this.maxFlowerSize && this.willflower) {
            this.size += this.vs;
            this.angle += this.velAngle;

            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.drawImage(this.image, this.frameSize * this.frameX, this.frameSize * this.frameY, this.frameSize, this.frameSize, 0 - this.size / 2, 0 - this.size / 2, this.size, this.size);
            ctx.restore();


            requestAnimationFrame(this.growing.bind(this));
        }


    }

}
window.addEventListener('mousemove', function (e) {
    if (draw) {
        for (let i = 0; i < 3; i++) {
            const root = new Root(e.x, e.y);
            root.update();
        }
    }
});

window.addEventListener('mousedown', function (e) {
    draw = true;
    for (let i = 0; i < 40; i++) {
        const root = new Root(e.x, e.y);
        root.update();
    }
});
window.addEventListener('mouseup', function () {
    draw = false;
});
